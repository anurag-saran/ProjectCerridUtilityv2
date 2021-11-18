import "reflect-metadata";
import {Connection, createConnection} from "typeorm";
import * as express from "express";
import * as cors from "cors"
import { MasterCompany } from "./entity/MasterCompany";
import { MasterGodown } from "./entity/MasterGodown";
import { MasterStockUnit } from "./entity/MasterStockUnit";
import { MasterStockCategory } from "./entity/MasterStockCategory";
import { MasterStockGrp } from "./entity/MasterStockGrp";
import { MasterLedger } from "./entity/MasterLedger";
import { MasterLedgerGrp } from "./entity/MasterLedgerGrp";
import { MasterVoucherType } from "./entity/MasterVoucherType";
import { ReportRegisterDaily } from "./entity/ReportRegisterDaily";
import { MasterStockItem } from "./entity/MasterStockItem";
import { Vouchers } from "./entity/Vouchers";
import { ReportBills } from "./entity/ReportBills";
import { ReportRegister } from "./entity/ReportRegister";
import { ReportInventoryReport } from "./entity/ReportInventoryReport";
import { ReportBalance } from "./entity/ReportBalance";
import { ReportCashFlow } from "./entity/ReportCashFlow";
import { ReportExpenseReport } from "./entity/ReportExpenseReport";
import { ReportBalanceSheet } from "./entity/ReportBalanceSheet";
import { ReportProfitandLoss } from "./entity/ReportProfitandLoss";

var convert = require('xml-js');
const fs = require('fs');
const lineReader = require('line-reader');

const app = express()
const axios = require('axios');
const PORT = process.env.PORT || 3000;
// app.use(express.urlencoded({extended: true}));	
// app.use(cors())	
// app.use(express.json())	
app.use(cors());	
app.use(express.json({limit: '50mb'}));	
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 500000}));
var path = require('path');
app.use(express.static('src/public'));
app.listen(PORT,()=>{
    console.log("server running at {}....", PORT);
})
app.get("/api",(req,res)=>{
    res.send("Welcome to API")
})
app.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/home.html'));  
});
app.get('/process-all-messages', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/allmessage.html'));  
});

app.post("/tally", async (req, res) => {
    console.log('process tally request');
    var axiosOptions = {
        headers: {
            'Content-Type': 'text/xml'
        }
    };
    var responses = [];
    for (let data of req.body.data) {
        console.log(process.env.TALLYHOST);
        let tallyres = await axios.post(process.env.TALLYHOST, data, axiosOptions);
        responses.push(tallyres.data);        
    }       
    console.log('process tally request ' + responses.length);    
    res.json({
        status: 'success',
        data: responses
    });
});

createConnection().then(async connection => {

    console.log("connected")
    // create express app
    
    app.post("/api/v1", async (req, res) => {
        var result = JSON.parse(convert.xml2json(req.body.xmld, { compact: false, spaces: 4 }));
        //console.log('name DB :- ' + JSON.stringify(result));        
        await processXmlDataAndInsert(result, res, connection);
    });
    app.post("/api/v2", async (req, res) => {        
        var fileName = req.body.xmld + '\\listfileName.csv';
        console.log(fileName);
        lineReader.eachLine(fileName, async (line, last) => {
            console.log('file DT :- ' + line);
            try {
                var insertFileName = req.body.xmld + '\\' +line;
                const data = fs.readFileSync(insertFileName, 'utf8');            
                var result = JSON.parse(convert.xml2json(data, { compact: false, spaces: 4 }));
                //console.log('name DB :- ' + JSON.stringify(result));        
                await processXmlDataAndInsert(result, res, connection);            
            } catch (err) {
                console.log('Err '+err);
            }
        });
            
    });
}).catch(error => console.log("TypeORM connection error: ", error));

async function processXmlDataAndInsert(result, res, connection) {
    var db_name = result.elements[0].elements[0].name;
        console.log(' DB :- ' + db_name);        
        // parsing xml data
        var jsonArray = [];
        for (var i = 0; i < result.elements[0].elements.length; i++) {
            var itemsList = result.elements[0].elements[i].elements;
           // console.log(itemsList);
            // console.log(result.elements[0].elements[i]);
            var dbModel = {};
            for (var j = 0; j < itemsList.length; j++) {
                var rowName = itemsList[j].name;
                var rowValue = "";
                if (typeof itemsList[j].elements == "undefined" || itemsList[j].elements == null || itemsList[j].elements == "") {
                    rowValue = null;
                } else {
                    rowValue = itemsList[j].elements[0].text;
                }
                 
                if (typeof itemsList[j].elements != "undefined" && itemsList[j].elements.length > 1) {
                    console.log(itemsList[j].elements);                    
                    var inneritemsList = itemsList[j].elements;
                    var innerArray;
                    var innerdbModel = {};
                    for (var ij = 0; ij < inneritemsList.length; ij++) {
                        var inrowName = inneritemsList[ij].name;
                        var inrowValue = "";
                        if (typeof inneritemsList[ij].elements == "undefined" || inneritemsList[ij].elements == null || inneritemsList[ij].elements == "") {
                            inrowValue = null;
                        } else {
                            inrowValue = inneritemsList[ij].elements[0].text;
                        }                        
                        innerdbModel[inrowName] = inrowValue;

                        // Sub Sub Elements... for Voucher Mostly

                        if (typeof inneritemsList[ij].elements != "undefined" && inneritemsList[ij].elements.length > 1) {
                            console.log(inneritemsList[ij].elements);                    
                            var subitemsList = inneritemsList[ij].elements;
                            var subArray;
                            var subModel = {};
                            for (var k = 0; k < subitemsList.length; k++) {
                                var subrowName = subitemsList[k].name;
                                var subrowValue = "";
                                if (typeof subitemsList[k].elements == "undefined" || subitemsList[k].elements == null || subitemsList[k].elements == "") {
                                    subrowValue = null;
                                } else {
                                    subrowValue = subitemsList[k].elements[0].text;
                                }                        
                                subModel[subrowName] = subrowValue;
                            }
                            if (typeof innerdbModel[inrowName] == "undefined") {
                                console.log('coming if Sub ' + innerdbModel[inrowName]);
                                subArray = [];                        
                            } else {
                                console.log('coming esle Sub ' + innerdbModel[inrowName]);
                                subArray = innerdbModel[inrowName];
                            }
                            subArray.push(subModel);
                            innerdbModel[inrowName] = subArray;
                            console.log(inrowName + ": " + innerdbModel);
                        } else {
                            innerdbModel[inrowName] = inrowValue;
                        }
                    }
                    console.log('existing Data ' + dbModel[rowName]);
                    if (typeof dbModel[rowName] == "undefined") {
                        console.log('coming if ' + dbModel[rowName]);
                        innerArray = [];
                        
                    } else {
                        console.log('coming else ' + dbModel[rowName]);
                        innerArray = dbModel[rowName];
                    }
                    innerArray.push(innerdbModel);
                    dbModel[rowName] = innerArray;
                    console.log(rowName + ": " + innerArray);                    
                } else {
                    dbModel[rowName] = rowValue;
                }
            }
            jsonArray.push(dbModel);
        }
        console.log("------------------INSERT INTO DB------------------");
        console.log('json Array ',JSON.stringify(jsonArray));
        const response = await recordInTable(db_name, jsonArray, connection);        
        res.json({
            status: 'success',
            message: 'Added',
            count: response
        });
}
async function recordInTable(db_name, jsonArray,connection) {
    switch (db_name) {
        case "COMPANIES":
            return insertDataCompany(connection, jsonArray);            
        case "LEDGERS":
            return insertDataLedger(connection, jsonArray);            
        case "GROUPS":
            return insertDataGroups(connection, jsonArray);            
        case "GODOWN":
            return insertDataGoDown(connection, jsonArray);            
        case "UNIT":
            return insertDataUnit(connection, jsonArray);            
        case "STOCKCATEGORY":
            return insertDataStockCategory(connection, jsonArray);            
        case "STOCKGROUP":
            return insertDataStockGroup(connection, jsonArray);
        case "STOCKITEMS":
            return insertDataStockItems(connection, jsonArray);
        case "DAILYREGISTER":
            return insertDataReportRegisterDaily(connection, jsonArray);
        case "VOUCHERTYPE":
            return insertDataVoucherType(connection, jsonArray);
        case "VOUCHERS":
            return insertDataVoucher(connection, jsonArray);
        case "BILLS":
            return insertDataBill(connection, jsonArray);
        case "MONTHSREGISTER":
            return insertDataRegister(connection, jsonArray);
        case "DAILYBALANCE":
            return insertDataBalance(connection, jsonArray);
        case "INVENTORYREPORTSTOCKITEM":
            return insertDataInventoryReport(connection, jsonArray);
        case "MONTHLYCASHFLOW":
            return insertDataCashFlow(connection, jsonArray);
        case "MONTHSEXPENSEREPORT":
            return insertDataReportExpense(connection, jsonArray);
        case "MONTHSBALANCESHEET":
            return insertDataReportBalanceSheet(connection, jsonArray);
        case "PROFITANDLOSS":
            return insertDataReportProfitAndLoss(connection, jsonArray);
        default:
            console.log('No Matching Case .. Nothing inserted... Please Configure First then insert');
            return [];        
    }
}
async function insertDataCompany(connection: Connection, jsonArray) {
    const companyRepository = connection.getRepository(MasterCompany);
    const company = await companyRepository.create(jsonArray);
    console.log(company);        
    const saveResult = await companyRepository.save(company);
    console.log(saveResult);
    return saveResult.length;    
}

async function insertDataGoDown(connection: Connection, jsonArray) {
    const goDownRepository = connection.getRepository(MasterGodown);
    const goDown = await goDownRepository.create(jsonArray);
    console.log(goDown);        
    const saveResult = await goDownRepository.save(goDown);
    console.log(saveResult);
    return saveResult.length;
}

async function insertDataUnit(connection: Connection, jsonArray) {
    const unitRepository = connection.getRepository(MasterStockUnit);
    const unit = await unitRepository.create(jsonArray);
    console.log(unit);        
    const saveResult = await unitRepository.save(unit);
    console.log(saveResult);
    return saveResult.length;
}

async function insertDataStockCategory(connection: Connection, jsonArray) {
    const categoryRepository = connection.getRepository(MasterStockCategory);
    const category = await categoryRepository.create(jsonArray);
    console.log(category);        
    const saveResult = await categoryRepository.save(category);
    console.log(saveResult);
    return saveResult.length;
}

async function insertDataStockGroup(connection: Connection, jsonArray) {
    const stockGroupRepository = connection.getRepository(MasterStockGrp);
    const stockGroup = await stockGroupRepository.create(jsonArray);
    const saveResult = await stockGroupRepository.save(stockGroup);
    console.log('stock' + saveResult);
    return saveResult.length;
}

async function insertDataStockItems(connection: Connection, jsonArray) {
    const stockItemRepository = connection.getRepository(MasterStockItem);
    const stockItems = await stockItemRepository.create(jsonArray);
    const saveResult = await stockItemRepository.save(stockItems);
    console.log('stock' + saveResult);
    return saveResult.length;
}

async function insertDataLedger(connection: Connection, jsonArray) {
    const ledgerRepository = connection.getRepository(MasterLedger);
    const ledger = await ledgerRepository.create(jsonArray);
    const saveResult = await ledgerRepository.save(ledger);
    console.log(saveResult);
    return saveResult.length;
}

async function insertDataGroups(connection: Connection, jsonArray) {
    const ledgerGrpRepository = connection.getRepository(MasterLedgerGrp);
    const ledgerGrp = await ledgerGrpRepository.create(jsonArray);
    console.log(ledgerGrp);        
    const saveResult = await ledgerGrpRepository.save(ledgerGrp);
    console.log(saveResult);
    return saveResult.length;
}

async function insertDataVoucherType(connection: Connection, jsonArray) {
    const vocherTypeRepository = connection.getRepository(MasterVoucherType);
    const vocherType = await vocherTypeRepository.create(jsonArray);
    console.log(vocherType);        
    const saveResult = await vocherTypeRepository.save(vocherType);
    console.log(saveResult);
    return saveResult.length;
}

async function insertDataVoucher(connection: Connection, jsonArray) {
    const vocherRepository = connection.getRepository(Vouchers);
    const vocher = await vocherRepository.create(jsonArray);
    console.log(vocher);        
    const saveResult = await vocherRepository.save(vocher);
    console.log(saveResult);
    return saveResult.length;
}

async function insertDataBill(connection: Connection, jsonArray) {
    const billRepository = connection.getRepository(ReportBills);
    const bill = await billRepository.create(jsonArray);
    console.log(bill);        
    const saveResult = await billRepository.save(bill);
    console.log(saveResult);
    return saveResult.length;
}

async function insertDataRegister(connection: Connection, jsonArray) {
    const registerRepository = connection.getRepository(ReportRegister);
    const register = await registerRepository.create(jsonArray);
    console.log(register);        
    const saveResult = await registerRepository.save(register);
    console.log(saveResult);
    return saveResult.length;
}

async function insertDataInventoryReport(connection: Connection, jsonArray) {
    const reportInventoryRepository = connection.getRepository(ReportInventoryReport);
    const reportInventory = await reportInventoryRepository.create(jsonArray);
    console.log(reportInventory);        
    const saveResult = await reportInventoryRepository.save(reportInventory);
    console.log(saveResult);
    return saveResult.length;
}

async function insertDataBalance(connection: Connection, jsonArray) {
    const reportBalanceRepository = connection.getRepository(ReportBalance);
    const reportBalance = await reportBalanceRepository.create(jsonArray);
    console.log(reportBalance);        
    const saveResult = await reportBalanceRepository.save(reportBalance);
    console.log(saveResult);
    return saveResult.length;
}

async function insertDataCashFlow(connection: Connection, jsonArray) {
    const reportCasFlowRepository = connection.getRepository(ReportCashFlow);
    const reportCashFlow = await reportCasFlowRepository.create(jsonArray);
    console.log(reportCashFlow);        
    const saveResult = await reportCasFlowRepository.save(reportCashFlow);
    console.log(saveResult);
    return saveResult.length;
}

async function insertDataReportExpense(connection: Connection, jsonArray) {
    const reportExpenseRepository = connection.getRepository(ReportExpenseReport);
    const reportExpense = await reportExpenseRepository.create(jsonArray);
    console.log(reportExpense);        
    const saveResult = await reportExpenseRepository.save(reportExpense);
    console.log(saveResult);
    return saveResult.length;
}

async function insertDataReportRegisterDaily(connection: Connection, jsonArray) {
    const reportRegisterDailyRepository = connection.getRepository(ReportRegisterDaily);
    const reportRegisterDaily = await reportRegisterDailyRepository.create(jsonArray);
    console.log(reportRegisterDaily);        
    const saveResult = await reportRegisterDailyRepository.save(reportRegisterDaily);
    console.log(saveResult);
    return saveResult.length;
}

async function insertDataReportBalanceSheet(connection: Connection, jsonArray) {
    const reportBalanceSheetRepository = connection.getRepository(ReportBalanceSheet);
    const reportBalanceSheet = await reportBalanceSheetRepository.create(jsonArray);
    console.log(reportBalanceSheet);        
    const saveResult = await reportBalanceSheetRepository.save(reportBalanceSheet);
    console.log(saveResult);
    return saveResult.length;
}

async function insertDataReportProfitAndLoss(connection: Connection, jsonArray) {
    const reportProfitLossRepository = connection.getRepository(ReportProfitandLoss);
    const reportProfitLoss = await reportProfitLossRepository.create(jsonArray);
    console.log(reportProfitLoss);        
    const saveResult = await reportProfitLossRepository.save(reportProfitLoss);
    console.log(saveResult);
    return saveResult.length;
}