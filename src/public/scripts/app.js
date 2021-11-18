var parseXml;
if (typeof window.DOMParser != "undefined") {
    parseXml = function(xmlStr) {
        return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
    };
} else if (typeof window.ActiveXObject != "undefined" &&
    new window.ActiveXObject("Microsoft.XMLDOM")) {
    parseXml = function(xmlStr) {
        var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(xmlStr);
        return xmlDoc;
    };
} else {
    throw new Error("No XML parser found");
}



$(document).ready(function(e) {
    $("#btn-submit").on('click', onXMLSubmit);
    $("#btn-submit-xml").on('click', onDirSubmit);

    
  $("#opencompreq").val(`<ENVELOPE>
  <HEADER>	
      <VERSION>1</VERSION>	
      <TALLYREQUEST>Export</TALLYREQUEST>
      <TYPE>DATA</TYPE>
      <ID>XMLIntCompany</ID>
  </HEADER>
  <BODY>
      <DESC>
          <STATICVARIABLES>
              <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
              <SVCurrentCompany>$$CurrentCompany</SVCurrentCompany><!--Company Name Input Field, Note: $$CurrentCompany is used to fetch data of current Active Company-->
              <SVFromDate>$$SystemPeriodFrom</SVFromDate><!--From Date Input Field, Note: $$SystemPeriodFrom Means Starting Date of Company-->
              <SVToDate>$$SystemPeriodTo</SVToDate><!--To Date Input Field, Note: $$SystemPeriodTo Means Ending Date of Company-->
          </STATICVARIABLES>
          <TDL>
              <TDLMESSAGE>
                  <REPORT NAME="XMLIntCompany">
                      <FORMS>XMLIntCompany</FORMS>
                  </REPORT>
                  
                  <FORM NAME="XMLIntCompany">
                      <TOPPARTS>XMLIntCompany</TOPPARTS>
                  </FORM>
                  
                  <PART NAME="XMLIntCompany">
                      <TOPLINES>XMLIntCompany</TOPLINES>
                      <REPEAT>XMLIntCompany: CompanyMasters</REPEAT>
                      <SCROLLED>Vertical</SCROLLED>
                  </PART>
                  
                  <LINE NAME="XMLIntCompany">
                      <LEFTFIELDS>XMLIntCGuid,XMLIntCName,XMLIntCAddress,XMLIntCStateName,XMLIntCCountryName,XMLIntCPhone,XMLIntCEmail</LEFTFIELDS>
                      <LEFTFIELDS>XMLIntCFinancialFrom,XMLIntCBooksFrom,XMLIntCurrency, XMLIntGstin, XMLIntPanNo, XMLIntStartingFrom, XMLIntNumVouchers, XMLIntAlterID</LEFTFIELDS>
                      <XMLTAG>&quot;Companies&quot;</XMLTAG>
                  </LINE>
                  
                  <FIELD NAME="XMLIntCGuid">
                      <XMLTAG>&quot;CompanyGUID&quot;</XMLTAG>
                      <SET>$$String:$Guid + ($$RemoveBrackets:@@CmpNumStatusStr)</SET>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntCName">
                      <XMLTAG>&quot;Name&quot;</XMLTAG>
                      <SET>$Name</SET>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntCAddress">
                      <XMLTAG>&quot;Address&quot;</XMLTAG>
                      <SET>$$FullListEx:&quot;;&quot;:Address:$Address</SET>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntCStateName">
                      <XMLTAG>&quot;StateName&quot;</XMLTAG>
                      <SET>$StateName</SET>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntCCountryName">
                      <XMLTAG>&quot;CountryName&quot;</XMLTAG>
                      <SET>$CountryName</SET>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntCPhone">
                      <XMLTAG>&quot;TelNo&quot;</XMLTAG>
                      <SET>$Phonenumber</SET>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntCEmail">
                      <XMLTAG>&quot;Email&quot;</XMLTAG>
                      <SET>$Email</SET>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntCFinancialFrom">
                      <XMLTAG>&quot;FinancialPeriodFromDate&quot;</XMLTAG>
                      <SET>$$DDMMYYDateFormat:$startingfrom:"-"</SET>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntCBooksFrom">
                      <XMLTAG>&quot;BooksBeginningFromDate&quot;</XMLTAG>
                      <SET>$$DDMMYYDateFormat:$BooksFrom:"-"</SET>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntCurrency">
                      <XMLTAG>&quot;Currency&quot;</XMLTAG>
                      <SET>$FormalName:Currency:$CurrencyName</SET>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntGstin">
                      <XMLTAG>&quot;Gstin&quot;</XMLTAG>
                      <SET>@@CMPGSTaxNumber</SET>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntPanNo">
                      <XMLTAG>&quot;PanNo&quot;</XMLTAG>
                      <SET>$IncomeTaxNumber</SET>
                  </FIELD>

                  <FIELD NAME="XMLIntStartingFrom">
                      <XMLTAG>&quot;StartingFrom&quot;</XMLTAG>
                      <SET>$StartingFrom</SET>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntNumVouchers">
                  <XMLTAG>&quot;NumVouchers&quot;</XMLTAG>
                  <SET>$$FilterNumTotal:VouchersofMultipleCompanies:IsCurrentCompany1:$TotalVch</SET>
                  </FIELD>
                      <FIELD NAME="XMLIntAlterID">
                  <XMLTAG>&quot;AlterID&quot;</XMLTAG>
                  <SET>$AlterID</SET>
                  </FIELD>
                  <SYSTEM TYPE="Formulae" NAME="IsCurrentCompany1">$OwnerCompany=#XMLIntCName</SYSTEM>
                  
                  <COLLECTION NAME="XMLIntVouchers">
                  <ParmVar>SVFromDate:Date:$$Date:"01-01-10"</ParmVar>
                  <ParmVar>SVToDate:Date:$$Date:"01-01-30"</ParmVar>
                  <Type>VoucherType</Type>
                  <Compute>OwnerCompany:$$LoopCollObj:$Name</Compute>
                  <Compute>TotalVch:$$FromValue:##SVFromDate:$$ToValue:##SVToDate:($$DirectTotalVch:$Name)</Compute>
                  <Fetch>Name, _TotalVouchers</Fetch>
                  </COLLECTION>
                  
                  <COLLECTION NAME="CompanyMasters">
                  <TYPE>Company</TYPE>
                  <BELONGSTO>Yes</BELONGSTO>
                  </COLLECTION>
                  
                  <COLLECTION NAME="VouchersofMultipleCompanies">
                  <Collection>XMLIntVouchers:CompanyMasters</Collection>
                  </COLLECTION>
                  
              </TDLMESSAGE>
          </TDL>
      </DESC>
  </BODY>
</ENVELOPE>`);

$("#ledgergrpreq").val(`<ENVELOPE>
  <HEADER>
      <VERSION>1</VERSION>
      <TALLYREQUEST>Export</TALLYREQUEST>
      <TYPE>Data</TYPE>
      <ID>XMLIntLedgersGrp</ID>
  </HEADER>
  <BODY>
      <DESC>
          <STATICVARIABLES>
              <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
              <SVCurrentCompany>$$CurrentCompany</SVCurrentCompany><!--Company Name Input Field, Note: $$CurrentCompany is used to fetch data of current Active Company-->
              <SVFromDate>$$SystemPeriodFrom</SVFromDate><!--From Date Input Field, Note: $$SystemPeriodFrom Means Starting Date of Company-->
              <SVToDate>$$SystemPeriodTo</SVToDate><!--To Date Input Field, Note: $$SystemPeriodTo Means Ending Date of Company-->
          </STATICVARIABLES> 
          <TDL>  
              <TDLMESSAGE>
                 <REPORT NAME="XMLIntLedgersGrp">
                  <Forms>XMLIntLedgersGrp</Forms>
                 </REPORT>
                 
                 <FORM NAME="XMLIntLedgersGrp">
                  <TopParts>XMLIntLedgersGrpBody</TopParts>
                  <Buttons>ExportButton</Buttons>
                 </FORM>
                 
                 <PART NAME="XMLIntLedgersGrpBody">
                  <TopLines>XMLIntLedgersGrpBody</TopLines>
                  <Repeat>XMLIntLedgersGrpBody:Group</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntLedgersGrpBody">
                  <LeftFields>XMLIntPLCmpGuid, XMLIntLGGuid, XMLIntLGName,XMLIntLGPrimaryGrpID, XMLIntLGPrimaryGrpName, XMLIntLGGroupID,XMLIntLGGroup, XMLIntLGAlterID</LeftFields>
                  <XMLTag>&quot;Groups&quot;</XMLTag>
                 </LINE>
                                        <FIELD NAME="XMLIntPLCmpGuid">
                      <Use>Name Field</Use>
                      <Set>$$SprintF:"%s%s":@GUID:@DataNo</Set>
                      <LocalFormula>GUID:$Guid:Company:$$CurrentCompany</LocalFormula>
                      <LocalFormula>DataNo:$CompanyNumber:Company:$$CurrentCompany</LocalFormula>
                      <XMLTag>&quot;CompanyGUID&quot;</XMLTag>
                 </FIELD>
                 <FIELD NAME="XMLIntLGGuid">
                  <Use>Name Field</Use>
                  <Set>$Guid</Set>
                  <XMLTag>&quot;LedgerGroupID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntLGName">
                  <Use>Name Field</Use>
                  <Set>$Name</Set>
                  <XMLTag>&quot;LedgerGroupName&quot;</XMLTag>
                 </FIELD>				   
                 
                     <FIELD NAME="XMLIntLGPrimaryGrpID">
                  <Use>Name Field</Use>
                  <Set>$GUID:Group:$_PrimaryGroup</Set>
                  <XMLTag>&quot;PrimaryGroupID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntLGPrimaryGrpName">
                  <Use>Name Field</Use>
                  <Set>$_PrimaryGroup</Set>
                  <XMLTag>&quot;PrimaryGroupName&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntLGGroupID">
                  <Use>Name Field</Use>
                  <Set>$GUID:Group:$Parent</Set>
                  <XMLTag>&quot;ParentLedgerGroupID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntLGGroup">
                  <Use>Name Field</Use>
                  <Set>If $$IsSysName:$Parent Then "Primary" Else $Parent</Set>
                  <XMLTag>&quot;ParentLedgerGroupName&quot;</XMLTag>
                 </FIELD>
      
                  <FIELD NAME="XMLIntLGAlterID">
                  <Set>$AlterID</Set>
                  <XMLTag>&quot;AlterID&quot;</XMLTag>
                  </FIELD>
                  
              </TDLMESSAGE>
          </TDL>
      </DESC>
  </BODY>
</ENVELOPE>`);

$("#ledgerreq").val(`<ENVELOPE>
  <HEADER>
      <VERSION>1</VERSION>
      <TALLYREQUEST>Export</TALLYREQUEST>
      <TYPE>Data</TYPE>
      <ID>XMLIntLedgers</ID>
  </HEADER>
  <BODY>
      <DESC>
          <STATICVARIABLES>
              <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
              <SVCurrentCompany>$$CurrentCompany</SVCurrentCompany><!--Company Name Input Field, Note: $$CurrentCompany is used to fetch data of current Active Company-->
              <SVFromDate>$$SystemPeriodFrom</SVFromDate><!--From Date Input Field, Note: $$SystemPeriodFrom Means Starting Date of Company-->
              <SVToDate>$$SystemPeriodTo</SVToDate><!--To Date Input Field, Note: $$SystemPeriodTo Means Ending Date of Company-->
          </STATICVARIABLES> 
          <TDL>  
              <TDLMESSAGE>
                 <REPORT NAME="XMLIntLedgers">
                  <Forms>XMLIntLedgers</Forms>
                 </REPORT>
                 
                 <FORM NAME="XMLIntLedgers">
                  <TopParts>XMLIntLedgersBody</TopParts>
                  <Buttons>ExportButton</Buttons>
                 </FORM>
                 
                 <PART NAME="XMLIntLedgersBody">
                  <TopLines>XMLIntLedgersBody</TopLines>
                  <Repeat>XMLIntLedgersBody:XMLIntLedger</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntLedgersBody">
                  <LeftFields>XMLIntPLCmpGuid, XMLIntLGuid, XMLIntLName,XMLIntLNGroupID,XMLIntLNGroup, XMLIntLNPrimaryGroupID, XMLIntLNPrimaryGroup, XMLIntLAddress, XMLIntLState, XMLIntLCountry</LeftFields>
                  <LeftFields> XMLIntLPinCode, XMLIntLPhone,XMLIntLMobile, XMLIntLEmail,XMLIntLContactPerson, XMLIntLOpeningAsPer</LeftFields>
                  <LeftFields>XMLIntLPartyGSTIN, XMLIntLPanNo, XMLIntLIsInventoryApplicable, XMLIntLIsCostCenterApplicable, XMLIntLIsBillByBillApplicable</LeftFields>
                  <LeftFields>XMLIntLOpeningBalance, XMLIntLCrDrType, XMLIntLClosingBalance, XMLIntLClosingCrDrType, XMLIntLCreditPeriod, XMLIntLCreditLimit, XMLIntLAlterID, XMLIntLBankName, XMLIntLIFSCCode, XMLIntLAcNo, XMLIntLAlias, XMLIntLGSTRegistrationType</LeftFields>
                  <XMLTag>&quot;Ledgers&quot;</XMLTag>
                  <Explode>XMLIntLExplodeOpeningBalance</Explode>
                 </LINE>
                 <FIELD NAME="XMLIntPLCmpGuid">
                  <Use>Name Field</Use>
                  <Set>$$SprintF:"%s%s":@GUID:@DataNo</Set>
                  <LocalFormula>GUID:$Guid:Company:$$CurrentCompany</LocalFormula>
                  <LocalFormula>DataNo:$CompanyNumber:Company:$$CurrentCompany</LocalFormula>
                  <XMLTag>&quot;CompanyGUID&quot;</XMLTag>
                 </FIELD>
                 <FIELD NAME="XMLIntLGuid">
                  <Use>Name Field</Use>
                  <Set>$Guid</Set>
                  <XMLTag>&quot;LedgerID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntLName">
                  <Use>Name Field</Use>
                  <Set>$Name</Set>
                  <XMLTag>&quot;Name&quot;</XMLTag>
                 </FIELD>				   
                 
                 <FIELD NAME="XMLIntLNGroupID">
                  <Use>Name Field</Use>
                  <Set>$GUID:Group:$Parent</Set>
                  <XMLTag>&quot;ParentGroupID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntLNGroup">
                  <Use>Name Field</Use>
                  <Set>$Parent</Set>
                  <XMLTag>&quot;ParentGroupName&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntLNPrimaryGroupID">
                  <Use>Name Field</Use>
                  <Set>$GUID:Group:$_PrimaryGroup</Set>
                  <XMLTag>&quot;PrimaryGroupID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntLNPrimaryGroup">
                  <Use>Name Field</Use>
                  <Set>$_PrimaryGroup</Set>
                  <XMLTag>&quot;PrimaryGroupName&quot;</XMLTag>
                 </FIELD>
               
                  <FIELD NAME="XMLIntLAddress">
                  <Set>$$FullList:ADDRESS:$Address</Set>
                  <XMLTag>&quot;Address&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntLState">
                  <Set>$LedStateName</Set>
                  <XMLTag>&quot;StateName&quot;</XMLTag>
                  </FIELD>
                              
                  <FIELD NAME="XMLIntLCountry">
                  <Use>Name Field</Use>
                  <Set>$CountryName</Set>
                  <XMLTag>&quot;CountryName&quot;</XMLTag>
                 </FIELD>
                 
                     <FIELD NAME="XMLIntLPinCode">
                  <Set>$PinCode</Set>
                  <XMLTag>&quot;PinCode&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntLPhone">
                  <Set>$LedgerPhone</Set>
                  <XMLTag>&quot;PhoneNo&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntLMobile">
                  <Set>$LedgerMobile</Set>
                  <XMLTag>&quot;MobileNo&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntLEmail">
                  <Set>$Email</Set>
                  <XMLTag>&quot;EmailID&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntLContactPerson">
                  <Set>$LedgerContact</Set>
                  <XMLTag>&quot;ContactPersonName&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntLOpeningAsPer">
                  <Set>$$DDMMYYDateFormat:($BooksFrom:Company:$$CurrentCompany):"-"</Set>
                  <XMLTag>&quot;OPENINGBALANCEDATE&quot;</XMLTag>
                  </FIELD>
                  
                  
                  <FIELD NAME="XMLIntLPartyGSTIN">
                  <Set>$PartyGSTIN</Set>
                  <XMLTag>&quot;PartyGSTIN&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntLPanNo">
                  <Set>$IncomeTaxNumber</Set>
                  <XMLTag>&quot;PanNo&quot;</XMLTag>
                  </FIELD>

                  <FIELD NAME="XMLIntLIsInventoryApplicable">
                  <Set>$AffectsStock</Set>
                  <XMLTag>&quot;IsInventoryApplicable&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntLIsCostCenterApplicable">
                  <Set>$IsCostCentresOn</Set>
                  <XMLTag>&quot;IsCostCenterApplicable&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntLIsBillByBillApplicable">
                  <Set>$IsBillWiseOn</Set>
                  <XMLTag>&quot;IsBillByBillApplicable&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntLOpeningBalance">
                  <Type>Number</Type>
                  <Set>$OpeningBalance</Set>
                  <XMLTag>&quot;OpeningBalanceAmount&quot;</XMLTag>
                  <Format>"Decimal:2"</Format>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntLCrDrType">
                  <Set>If $$IsDr:$OpeningBalance Then "Dr" Else "Cr"</Set>
                  <XMLTag>&quot;OpeningBalanceType&quot;</XMLTag>
                  </FIELD>

                  <FIELD NAME="XMLIntLClosingBalance">
                  <Type>Number</Type>
                  <Set>$ClosingBalance</Set>
                  <XMLTag>&quot;ClosingBalance&quot;</XMLTag>
                  <Format>"Decimal:2"</Format>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntLClosingCrDrType">
                  <Set>If $$IsDr:$ClosingBalance Then "Dr" Else "Cr"</Set>
                  <XMLTag>&quot;ClosingBalanceeType&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntLCreditPeriod">
                  <Set>$BillCreditPeriod</Set>
                  <XMLTag>&quot;CreditPeriod&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntLCreditLimit">
                  <Type>Number</Type>
                  <Set>$CreditLimit</Set>
                  <XMLTag>&quot;CreditLimit&quot;</XMLTag>
                  <Format>"Decimal:2"</Format>
                  </FIELD>
                  

                 <FIELD NAME="XMLIntLAlterID">
                  <Use>Name Field</Use>
                  <Set>$AlterID</Set>
                  <XMLTag>&quot;AlterID&quot;</XMLTag>
                 </FIELD>

                 <FIELD NAME="XMLIntLBankName">
                  <Set>$$CollectionField:$BankName:1:PAYMENTDETAILS</Set>
                  <XMLTag>&quot;PartyBankName&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntLIFSCCode">
                  <Set>$$CollectionField:$IFSCode:1:PAYMENTDETAILS</Set>
                  <XMLTag>&quot;PartyIFSCode&quot;</XMLTag>
                  </FIELD>

                 <FIELD NAME="XMLIntLAcNo">
                  <Use>Name Field</Use>
                  <Set>$$CollectionField:$AccountNumber:1:PAYMENTDETAILS</Set>
                  <XMLTag>&quot;PartyAccountNo&quot;</XMLTag>
                 </FIELD>
                 
                  <FIELD NAME="XMLIntLAlias">
                  <Set>$$Alias</Set>
                  <XMLTag>&quot;Alias&quot;</XMLTag>
                  </FIELD>

                 <FIELD NAME="XMLIntLGSTRegistrationType">
                  <Use>Name Field</Use>
                  <Set>$GSTRegistrationType</Set>
                  <XMLTag>&quot;GSTRegistrationType&quot;</XMLTag>
                 </FIELD>
                 
                  <PART NAME="XMLIntLExplodeOpeningBalance">
                  <TopLines>XMLIntLExplodeOpeningBalance</TopLines>
                  <Repeat>XMLIntLExplodeOpeningBalance:BILLALLOCATIONS</Repeat>
                  <Scrolled>Vertical</Scrolled>
                 </PART>
                 
                 <LINE NAME="XMLIntLExplodeOpeningBalance">
                  <LeftFields>XMLIntLGuid,XMLIntLEDate,XMLIntLEName,XMLIntLECreditDays,XMLIntLEAmount, XMLIntLEAmountType</LeftFields>
                  <XMLTag>&quot;OpeningBalance&quot;</XMLTag>
                 </LINE>
                  
                  <FIELD NAME="XMLIntLEDate">
                  <Set>$$DDMMYYDateFormat:$BillDate:"-"</Set>
                  <XMLTag>&quot;InvoiceDate&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntLEName">
                  <Set>$Name</Set>
                  <XMLTag>&quot;InvoiceNo&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntLECreditDays">
                  <Set>$BILLCREDITPERIOD</Set>
                  <XMLTag>&quot;Due Date&quot;</XMLTag>
                  </FIELD>
      
                  <FIELD NAME="XMLIntLEAmount">
                  <Type>Number</Type>
                  <Set>$OPENINGBALANCE</Set>
                  <XMLTag>&quot;Amount&quot;</XMLTag>
                  <Format>"Decimal:2"</Format>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntLEAmountType">
                  <Set>If $$IsDr:$OPENINGBALANCE Then "Dr" ELse "Cr"</Set>
                  <XMLTag>&quot;AmountType&quot;</XMLTag>
                  </FIELD>
                  
                 <COLLECTION NAME="XMLIntLedger">
                  <Type>Ledger</Type>
                  <NativeMethod>*.*</NativeMethod>
                 </COLLECTION>
              </TDLMESSAGE>
          </TDL>
      </DESC>
  </BODY>
</ENVELOPE>
`);

$("#stockgrpreq").val(
  `    <ENVELOPE>
  <HEADER>
      <VERSION>1</VERSION>
      <TALLYREQUEST>Export</TALLYREQUEST>
      <TYPE>Data</TYPE>
      <ID>XMLIntStockGrp</ID>
  </HEADER>
  <BODY>
      <DESC>
          <STATICVARIABLES>
              <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
              <SVCurrentCompany>$$CurrentCompany</SVCurrentCompany><!--Company Name Input Field, Note: $$CurrentCompany is used to fetch data of current Active Company-->
              <SVFromDate>$$SystemPeriodFrom</SVFromDate><!--From Date Input Field, Note: $$SystemPeriodFrom Means Starting Date of Company-->
              <SVToDate>$$SystemPeriodTo</SVToDate><!--To Date Input Field, Note: $$SystemPeriodTo Means Ending Date of Company-->
          </STATICVARIABLES> 
          <TDL>  
              <TDLMESSAGE>
                 <REPORT NAME="XMLIntStockGrp">
                  <Forms>XMLIntStockGrp</Forms>
                 </REPORT>
                 
                 <FORM NAME="XMLIntStockGrp">
                  <TopParts>XMLIntStockGrpBody</TopParts>
                  <Buttons>ExportButton</Buttons>
                 </FORM>
                 
                 <PART NAME="XMLIntStockGrpBody">
                  <TopLines>XMLIntStockGrpBody</TopLines>
                  <Repeat>XMLIntStockGrpBody:StockGroup</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntStockGrpBody">
                  <LeftFields>XMLIntPLCmpGuid, XMLIntSGGuid,XMLIntSGName, XMLIntSGAlias, XMLIntSGTaxablity</LeftFields>
                  <LeftFields>XMLIntSGIGST, XMLIntSGSGST, XMLIntSGCGST, XMLIntSGCess, XMLIntSGParentID, XMLIntSGParentName, XMLIntSGAlterID</LeftFields>
                  <XMLTag>&quot;StockGroup&quot;</XMLTag>
                  <Explode>XMLIntSGExplodeTaxRate</Explode>
                 </LINE>
                 <FIELD NAME="XMLIntPLCmpGuid">
                  <Use>Name Field</Use>
                  <Set>$$SprintF:"%s%s":@GUID:@DataNo</Set>
                  <LocalFormula>GUID:$Guid:Company:$$CurrentCompany</LocalFormula>
                  <LocalFormula>DataNo:$CompanyNumber:Company:$$CurrentCompany</LocalFormula>
                  <XMLTag>&quot;CompanyGUID&quot;</XMLTag>
                 </FIELD>
                     <FIELD NAME="XMLIntSGGuid">
                  <Use>Name Field</Use>
                  <Set>$GUID</Set>
                  <XMLTag>&quot;GUID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSGName">
                  <Use>Name Field</Use>
                  <Set>$Name</Set>
                  <XMLTag>&quot;Name&quot;</XMLTag>
                 </FIELD>
                 
                     <FIELD NAME="XMLIntSGAlias">
                  <Use>Name Field</Use>
                  <Set>$$Alias</Set>
                  <XMLTag>&quot;Alias&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSGTaxablity">
                  <Use>Name Field</Use>
                  <Set>$GSTDETAILS[Last].TAXABILITY</Set>
                  <XMLTag>&quot;TAXABILITY&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSGIGST">
                  <Use>Name Field</Use>
                  <Set>$GSTDETAILS[Last].STATEWISEDETAILS[Last].RATEDETAILS[1, @@IsIGST].GSTRATE</Set>
                  <XMLTag>&quot;IGST&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSGSGST">
                  <Use>Name Field</Use>
                  <Set>$GSTDETAILS[Last].STATEWISEDETAILS[Last].RATEDETAILS[1, @@IsSGST].GSTRATE</Set>
                  <XMLTag>&quot;SGST&quot;</XMLTag>
                 </FIELD>

                 <FIELD NAME="XMLIntSGCGST">
                  <Use>Name Field</Use>
                  <Set>$GSTDETAILS[Last].STATEWISEDETAILS[Last].RATEDETAILS[1, @@IsCGST].GSTRATE</Set>
                  <XMLTag>&quot;CGST&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSGCess">
                  <Set>$STATEWISEDETAILS[$$Line].RATEDETAILS[1, @@IsAddlCess].GSTRATE</Set>
                  <XMLTag>&quot;Cess&quot;</XMLTag>
                  </FIELD>
                 
                 <FIELD NAME="XMLIntSGParentID">
                  <Use>Name Field</Use>
                  <Set>$guid:StockGroup:$name</Set>
                  <XMLTag>&quot;ParentGroupID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSGParentName">
                  <Use>Name Field</Use>
                  <Set>If $$IsSysName:$Parent Then "Primary" Else $Parent</Set>
                  <XMLTag>&quot;ParentGroupName&quot;</XMLTag>
                 </FIELD>

                 <FIELD NAME="XMLIntSGAlterID">
                  <Use>Name Field</Use>
                  <Set>$AlterID</Set>
                  <XMLTag>&quot;AlterID&quot;</XMLTag>
                 </FIELD>
                             
                  <PART NAME="XMLIntSGExplodeTaxRate">
                  <TopLines>XMLIntSGExplodeTaxRate</TopLines>
                  <Repeat>XMLIntSGExplodeTaxRate:GSTDETAILS</Repeat>
                  <Scrolled>Vertical</Scrolled>
                 </PART>
                 
                 <LINE NAME="XMLIntSGExplodeTaxRate">
                  <LeftFields>XMLIntSGGuid, XMLIntSGTaxRateApplicableFrom, XMLIntSGTaxRateHSNCode,XMLIntSGTaxRateTaxablity, XMLIntSGTaxRateIGST</LeftFields>
                  <LeftFields>XMLIntSGTaxRateSGST, XMLIntSGTaxRateCGST, XMLIntSGTaxRateCess</LeftFields>
                  <XMLTag>&quot;TaxHistory&quot;</XMLTag>
                 </LINE>
                  
                  <FIELD NAME="XMLIntSGTaxRateApplicableFrom">
                  <Set>$APPLICABLEFROM</Set>
                  <XMLTag>&quot;APPLICABLEFROM&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSGTaxRateHSNCode">
                  <Set>$HSNCode</Set>
                  <XMLTag>&quot;HSNCode&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSGTaxRateTaxablity">
                  <Set>$TAXABILITY</Set>
                  <XMLTag>&quot;TAXABILITY&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSGTaxRateIGST">
                  <Set>$STATEWISEDETAILS[$$Line].RATEDETAILS[1, @@IsIGST].GSTRATE</Set>
                  <XMLTag>&quot;IGST&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSGTaxRateSGST">
                  <Set>$STATEWISEDETAILS[$$Line].RATEDETAILS[1, @@IsSGST].GSTRATE</Set>
                  <XMLTag>&quot;SGST&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSGTaxRateCGST">
                  <Set>$STATEWISEDETAILS[$$Line].RATEDETAILS[1, @@IsCGST].GSTRATE</Set>
                  <XMLTag>&quot;CGST&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSGTaxRateCess">
                  <Set>$STATEWISEDETAILS[$$Line].RATEDETAILS[1, @@IsAddlCess].GSTRATE</Set>
                  <XMLTag>&quot;Cess&quot;</XMLTag>
                  </FIELD>

              </TDLMESSAGE>
          </TDL>
      </DESC>
  </BODY>
</ENVELOPE>`
);

$("#stockcatreq").val(
  `<ENVELOPE>
  <HEADER>
      <VERSION>1</VERSION>
      <TALLYREQUEST>Export</TALLYREQUEST>
      <TYPE>Data</TYPE>
      <ID>XMLIntStockCategory</ID>
  </HEADER>
  <BODY>
      <DESC>
          <STATICVARIABLES>
              <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
              <SVCurrentCompany>$$CurrentCompany</SVCurrentCompany><!--Company Name Input Field, Note: $$CurrentCompany is used to fetch data of current Active Company-->
              <SVFromDate>$$SystemPeriodFrom</SVFromDate><!--From Date Input Field, Note: $$SystemPeriodFrom Means Starting Date of Company-->
              <SVToDate>$$SystemPeriodTo</SVToDate><!--To Date Input Field, Note: $$SystemPeriodTo Means Ending Date of Company-->
          </STATICVARIABLES> 
          <TDL>  
              <TDLMESSAGE>
                 <REPORT NAME="XMLIntStockCategory">
                  <Forms>XMLIntStockCategory</Forms>
                 </REPORT>
                 
                 <FORM NAME="XMLIntStockCategory">
                  <TopParts>XMLIntStockCategoryBody</TopParts>
                  <Buttons>ExportButton</Buttons>
                 </FORM>
                 
                 <PART NAME="XMLIntStockCategoryBody">
                  <TopLines>XMLIntStockCategoryBody</TopLines>
                  <Repeat>XMLIntStockCategoryBody:StockCategory</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntStockCategoryBody">
                  <LeftFields>XMLIntPLCmpGuid, XMLIntSCGuid,XMLIntSCName, XMLIntSCAlias, XMLIntSCParentID, XMLIntSCParentName, XMLIntSCAlterID</LeftFields>
                  <XMLTag>&quot;StockCategory&quot;</XMLTag>
                 </LINE>
                   <FIELD NAME="XMLIntPLCmpGuid">
                  <Use>Name Field</Use>
                  <Set>$$SprintF:"%s%s":@GUID:@DataNo</Set>
                  <LocalFormula>GUID:$Guid:Company:$$CurrentCompany</LocalFormula>
                  <LocalFormula>DataNo:$CompanyNumber:Company:$$CurrentCompany</LocalFormula>
                  <XMLTag>&quot;CompanyGUID&quot;</XMLTag>
                 </FIELD>
                     <FIELD NAME="XMLIntSCGuid">
                  <Use>Name Field</Use>
                  <Set>$GUID</Set>
                  <XMLTag>&quot;GUID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSCName">
                  <Use>Name Field</Use>
                  <Set>$Name</Set>
                  <XMLTag>&quot;Name&quot;</XMLTag>
                 </FIELD>
                 
                     <FIELD NAME="XMLIntSCAlias">
                  <Use>Name Field</Use>
                  <Set>$$Alias</Set>
                  <XMLTag>&quot;Alias&quot;</XMLTag>
                 </FIELD>

                 <FIELD NAME="XMLIntSCParentID">
                  <Use>Name Field</Use>
                  <Set>$guid:StockCategory:$name</Set>
                  <XMLTag>&quot;ParentGroupID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSCParentName">
                  <Use>Name Field</Use>
                  <Set>If $$IsSysName:$Parent Then "Primary" Else $Parent</Set>
                  <XMLTag>&quot;ParentGroupName&quot;</XMLTag>
                 </FIELD>

                 <FIELD NAME="XMLIntSCAlterID">
                  <Use>Name Field</Use>
                  <Set>$AlterID</Set>
                  <XMLTag>&quot;AlterID&quot;</XMLTag>
                 </FIELD>

              </TDLMESSAGE>
          </TDL>
      </DESC>
  </BODY>
</ENVELOPE>`
);

$("#stockunitreq").val(
  `<ENVELOPE>
  <HEADER>
      <VERSION>1</VERSION>
      <TALLYREQUEST>Export</TALLYREQUEST>
      <TYPE>Data</TYPE>
      <ID>XMLIntStockUnits</ID>
  </HEADER>
  <BODY>
      <DESC>
          <STATICVARIABLES>
              <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
              <SVCurrentCompany>$$CurrentCompany</SVCurrentCompany><!--Company Name Input Field, Note: $$CurrentCompany is used to fetch data of current Active Company-->
              <SVFromDate>$$SystemPeriodFrom</SVFromDate><!--From Date Input Field, Note: $$SystemPeriodFrom Means Starting Date of Company-->
              <SVToDate>$$SystemPeriodTo</SVToDate><!--To Date Input Field, Note: $$SystemPeriodTo Means Ending Date of Company-->
          </STATICVARIABLES> 
          <TDL>  
              <TDLMESSAGE>
                 <REPORT NAME="XMLIntStockUnits">
                  <Forms>XMLIntStockUnits</Forms>
                 </REPORT>
                 
                 <FORM NAME="XMLIntStockUnits">
                  <TopParts>XMLIntStockUnitsBody</TopParts>
                  <Buttons>ExportButton</Buttons>
                 </FORM>
                 
                 <PART NAME="XMLIntStockUnitsBody">
                  <TopLines>XMLIntStockUnitsBody</TopLines>
                  <Repeat>XMLIntStockUnitsBody:Unit</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntStockUnitsBody">
                  <LeftFields>XMLIntPLCmpGuid, XMLIntSUGuid,XMLIntSUSymbol, XMLIntSUFormalName, XMLIntSUNoofDecimal, XMLIntSUAlterID</LeftFields>
                  <XMLTag>&quot;Unit&quot;</XMLTag>
                 </LINE>
                 <FIELD NAME="XMLIntPLCmpGuid">
                  <Use>Name Field</Use>
                  <Set>$$SprintF:"%s%s":@GUID:@DataNo</Set>
                  <LocalFormula>GUID:$Guid:Company:$$CurrentCompany</LocalFormula>
                  <LocalFormula>DataNo:$CompanyNumber:Company:$$CurrentCompany</LocalFormula>
                  <XMLTag>&quot;CompanyGUID&quot;</XMLTag>
                 </FIELD>
                     <FIELD NAME="XMLIntSUGuid">
                  <Use>Name Field</Use>
                  <Set>$GUID</Set>
                  <XMLTag>&quot;GUID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSUSymbol">
                  <Use>Name Field</Use>
                  <Set>$Symbol</Set>
                  <XMLTag>&quot;Name&quot;</XMLTag>
                 </FIELD>
                 
                     <FIELD NAME="XMLIntSUFormalName">
                  <Use>Name Field</Use>
                  <Set>$OriginalSymbol</Set>
                  <XMLTag>&quot;FormalName&quot;</XMLTag>
                 </FIELD>

                 <FIELD NAME="XMLIntSUNoofDecimal">
                  <Use>Name Field</Use>
                  <Set>$DecimalPlaces</Set>
                  <XMLTag>&quot;NoofDecimal&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSUAlterID">
                  <Use>Name Field</Use>
                  <Set>$AlterID</Set>
                  <XMLTag>&quot;AlterID&quot;</XMLTag>
                 </FIELD>

              </TDLMESSAGE>
          </TDL>
      </DESC>
  </BODY>
</ENVELOPE>`
);

$("#stockitemreq").val(
  `<ENVELOPE>
  <HEADER>
      <VERSION>1</VERSION>
      <TALLYREQUEST>Export</TALLYREQUEST>
      <TYPE>Data</TYPE>
      <ID>XMLIntStockItem</ID>
  </HEADER>
  <BODY>
      <DESC>
          <STATICVARIABLES>
              <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
              <SVCurrentCompany>$$CurrentCompany</SVCurrentCompany><!--Company Name Input Field, Note: $$CurrentCompany is used to fetch data of current Active Company-->
              <SVFromDate>$$SystemPeriodFrom</SVFromDate><!--From Date Input Field, Note: $$SystemPeriodFrom Means Starting Date of Company-->
              <SVToDate>$$SystemPeriodTo</SVToDate><!--To Date Input Field, Note: $$SystemPeriodTo Means Ending Date of Company-->
          </STATICVARIABLES> 
          <TDL>  
              <TDLMESSAGE>
                 <REPORT NAME="XMLIntStockItem">
                  <Forms>XMLIntStockItem</Forms>
                 </REPORT>
                 
                 <FORM NAME="XMLIntStockItem">
                  <TopParts>XMLIntStockItemBody</TopParts>
                  <Buttons>ExportButton</Buttons>
                 </FORM>
                 
                 <PART NAME="XMLIntStockItemBody">
                  <TopLines>XMLIntStockItemBody</TopLines>
                  <Repeat>XMLIntStockItemBody:XMLIntStockItem</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntStockItemBody">
                  <LeftFields>XMLIntPLCmpGuid, XMLIntSGuid,XMLIntSName, XMLIntSAlias, XMLIntSPartNo, XMLIntSDescription, XMLIntSRemarks, XMLIntSGSTApplicable</LeftFields>
                  <LeftFields>XMLIntSCalculationType,XMLIntSTaxablity, XMLIntSIGST, XMLIntSSGST, XMLIntSCGST, XMLIntSCess, XMLIntSHSNCode, XMLIntSMRPRate</LeftFields>
                  <LeftFields>XMLIntSCategoryGuid, XMLIntSCategoryName,XMLIntSGroupGuid, XMLIntSGroup,XMLIntSUnitID, XMLIntSUnit, XMLIntSOpeningBalance</LeftFields>
                  <LeftFields>XMLIntSOpeningRate,XMLIntSOpeningValue, XMLIntSAlterID, XMLIntSIsBatchWiseOn</LeftFields>
                  <XMLTag>&quot;StockItems&quot;</XMLTag>
                  <Explode>XMLIntSExplodeOpeningBalance</Explode>
                  <Explode>XMLIntSExplodeTaxRate</Explode>
                  <Explode>XMLIntSExplodeMRPRate</Explode>
                 </LINE>
                                    <FIELD NAME="XMLIntPLCmpGuid">
                  <Use>Name Field</Use>
                  <Set>$$SprintF:"%s%s":@GUID:@DataNo</Set>
                  <LocalFormula>GUID:$Guid:Company:$$CurrentCompany</LocalFormula>
                  <LocalFormula>DataNo:$CompanyNumber:Company:$$CurrentCompany</LocalFormula>
                  <XMLTag>&quot;CompanyGUID&quot;</XMLTag>
                 </FIELD>
                     <FIELD NAME="XMLIntSGuid">
                  <Use>Name Field</Use>
                  <Set>$GUID</Set>
                  <XMLTag>&quot;GUID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSName">
                  <Use>Name Field</Use>
                  <Set>$Name</Set>
                  <XMLTag>&quot;Name&quot;</XMLTag>
                 </FIELD>
                 
                     <FIELD NAME="XMLIntSAlias">
                  <Use>Name Field</Use>
                  <Set>$$Alias</Set>
                  <XMLTag>&quot;Alias&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSPartNo">
                  <Use>Name Field</Use>
                  <Set>$PartNo</Set>
                  <XMLTag>&quot;PartNo&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSDescription">
                  <Use>Name Field</Use>
                  <Set>$Description</Set>
                  <XMLTag>&quot;Description&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSRemarks">
                  <Use>Name Field</Use>
                  <Set>$Narration</Set>
                  <XMLTag>&quot;Remarks&quot;</XMLTag>
                 </FIELD>

                 <FIELD NAME="XMLIntSGSTApplicable">
                  <Use>Name Field</Use>
                  <Set>If $$SysName:Applicable=$GSTApplicable Then "Applicable" Else if $$SysName:NotApplicable=$GSTApplicable Then "Not Applicable" Else ""</Set>
                  <XMLTag>&quot;IsGSTApplicable&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSCalculationType">
                  <Use>Name Field</Use>
                  <Set>$GSTDetails[Last].CalculationType</Set>
                  <XMLTag>&quot;CalculationType&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSTaxablity">
                  <Use>Name Field</Use>
                  <Set>$GSTDetails[Last].Taxability</Set>
                  <XMLTag>&quot;Taxability&quot;</XMLTag>
                 </FIELD>

                 <FIELD NAME="XMLIntSIGST">
                  <Use>Name Field</Use>
                  <Set>$GSTDetails[Last].StatewiseDetails[1, @@IsAnyState].RateDetails[1, @@IsIGST].GSTRate</Set>
                  <XMLTag>&quot;IGST&quot;</XMLTag>
                 </FIELD>
                                    
                 <FIELD NAME="XMLIntSSGST">
                  <Use>Name Field</Use>
                  <Set>$GSTDetails[Last].StatewiseDetails[1, @@IsAnyState].RateDetails[1, @@IsSGST].GSTRate</Set>
                  <XMLTag>&quot;SGST&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSCGST">
                  <Use>Name Field</Use>
                  <Set>$GSTDetails[Last].StatewiseDetails[1, @@IsAnyState].RateDetails[1, @@IsCGST].GSTRate</Set>
                  <XMLTag>&quot;CGST&quot;</XMLTag>
                 </FIELD>

                 <FIELD NAME="XMLIntSCess">
                  <Use>Name Field</Use>
                  <Set>$GSTDetails[Last].StatewiseDetails[1, @@IsAnyState].RateDetails[1, @@IsAddlCess].GSTRate</Set>
                  <XMLTag>&quot;Cess&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSHSNCode">
                  <Use>Name Field</Use>
                  <Set>$GSTDetails[Last].HSNCode</Set>
                  <XMLTag>&quot;HSNCode&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSMRPRate">
                  <Use>Name Field</Use>
                  <Set>$MRPDETAILS[Last].MRPRATEDETAILS[Last].MRPRATE</Set>
                  <XMLTag>&quot;MRPRATE&quot;</XMLTag>
                 </FIELD>
                 
                     <FIELD NAME="XMLIntSCategoryGuid">
                  <Use>Name Field</Use>
                  <Set>$guid:StockCategory:$Category</Set>
                  <XMLTag>&quot;CategoryID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSCategoryName">
                  <Use>Name Field</Use>
                  <Set>If $$IsSysName:$Category Then "Primary" Else $Category</Set>
                  <XMLTag>&quot;CategoryName&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSGroupGuid">
                  <Use>Name Field</Use>
                  <Set>$guid:StockGroup:$Parent</Set>
                  <XMLTag>&quot;GroupID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSGroup">
                  <Use>Name Field</Use>
                  <Set>If $$IsSysName:$Parent Then "Primary" Else $Parent</Set>
                  <XMLTag>&quot;GroupName&quot;</XMLTag>
                 </FIELD>
                    
                 <FIELD NAME="XMLIntSUnitID">
                  <Use>Name Field</Use>
                  <Set>$guid:Unit:$BaseUnits</Set>
                  <XMLTag>&quot;UNITID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSUnit">
                  <Use>Name Field</Use>
                  <Set>If $$isSysName:$BaseUnits Then "Not Applicable" Else $BaseUnits</Set>
                  <XMLTag>&quot;UNITName&quot;</XMLTag>
                 </FIELD>

                 <FIELD NAME="XMLIntSOpeningBalance">
                  <Type>Number</Type>
                  <Set>$OpeningBalance</Set>
                  <XMLTag>&quot;OpeningBalance&quot;</XMLTag>
                  </FIELD>
                 
                 <FIELD NAME="XMLIntSOpeningRate">
                  <Type>Number</Type>
                  <Set>$OpeningRate</Set>
                  <XMLTag>&quot;Rate&quot;</XMLTag>
                  <Format>"Decimal:2"</Format>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSOpeningValue">
                  <Type>Number</Type>
                  <Set>$OpeningValue</Set>
                  <XMLTag>&quot;Amount&quot;</XMLTag>
                  <Format>"Decimal:2"</Format>
                  </FIELD>
                  
                 <FIELD NAME="XMLIntSAlterID">
                  <Set>$AlterID</Set>
                  <XMLTag>&quot;AlterID&quot;</XMLTag>
                  </FIELD>
                  
                 <FIELD NAME="XMLIntSIsBatchWiseOn">
                  <Set>$IsBatchWiseOn</Set>
                  <XMLTag>&quot;IsBatchWiseOn&quot;</XMLTag>
                  </FIELD>
                  
                  <PART NAME="XMLIntSExplodeOpeningBalance">
                  <TopLines>XMLIntSExplodeOpeningBalance</TopLines>
                  <Repeat>XMLIntSExplodeOpeningBalance:BATCHALLOCATIONS</Repeat>
                  <Scrolled>Vertical</Scrolled>
                 </PART>
                 
                 <LINE NAME="XMLIntSExplodeOpeningBalance">
                  <LeftFields>XMLIntSEGodownNameID, XMLIntSEGodownName,XMLIntSEBatchName,XMLIntSEOpeningBalance, XMLIntSEOpeningRate, XMLIntSEOpeningValue</LeftFields>
                  <XMLTag>&quot;OpeningBalance&quot;</XMLTag>
                 </LINE>
                  
                  <FIELD NAME="XMLIntSEGodownNameID">
                  <Set>$guid:Godown:$GodownName</Set>
                  <XMLTag>&quot;GodownGUID&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSEGodownName">
                  <Set>$GodownName</Set>
                  <XMLTag>&quot;GodownName&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSEBatchName">
                  <Set>$BatchName</Set>
                  <XMLTag>&quot;BatchName&quot;</XMLTag>
                  </FIELD>
                              
                  <FIELD NAME="XMLIntSEOpeningBalance">
                  <Type>Number</Type>
                  <Set>$OPENINGBALANCE</Set>
                  <XMLTag>&quot;OpeningBalance&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSEOpeningRate">
                  <Type>Number</Type>
                  <Set>$OpeningRate</Set>
                  <XMLTag>&quot;OpeningRate&quot;</XMLTag>
                  <Format>"Decimal:2"</Format>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSEOpeningValue">
                  <Type>Number</Type>
                  <Set>$OPENINGVALUE</Set>
                  <XMLTag>&quot;OPENINGVALUE&quot;</XMLTag>
                  <Format>"Decimal:2"</Format>
                  </FIELD>
                  
                  
                  <PART NAME="XMLIntSExplodeTaxRate">
                  <TopLines>XMLIntSExplodeTaxRate</TopLines>
                  <Repeat>XMLIntSExplodeTaxRate:GSTDETAILS</Repeat>
                  <Scrolled>Vertical</Scrolled>
                 </PART>
                 
                 <LINE NAME="XMLIntSExplodeTaxRate">
                  <LeftFields>XMLIntSETaxRateApplicableFrom, XMLIntSETaxRateHSNCode,XMLIntSETaxRateCalculationType,XMLIntSETaxRateTaxablity, XMLIntSETaxRateIGST</LeftFields>
                  <LeftFields>XMLIntSETaxRateSGST, XMLIntSETaxRateCGST, XMLIntSETaxRateCess</LeftFields>
                  <XMLTag>&quot;TaxHistory&quot;</XMLTag>
                 </LINE>
                  
                  <FIELD NAME="XMLIntSETaxRateApplicableFrom">
                  <Set>$APPLICABLEFROM</Set>
                  <XMLTag>&quot;APPLICABLEFROM&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSETaxRateHSNCode">
                  <Set>$HSNCode</Set>
                  <XMLTag>&quot;HSNCode&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSETaxRateCalculationType">
                  <Set>$CALCULATIONTYPE</Set>
                  <XMLTag>&quot;CALCULATIONTYPE&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSETaxRateTaxablity">
                  <Set>$TAXABILITY</Set>
                  <XMLTag>&quot;TAXABILITY&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSETaxRateIGST">
                  <Set>$STATEWISEDETAILS[$$Line].RATEDETAILS[1, @@IsIGST].GSTRATE</Set>
                  <XMLTag>&quot;IGST&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSETaxRateSGST">
                  <Set>$STATEWISEDETAILS[$$Line].RATEDETAILS[1, @@IsSGST].GSTRATE</Set>
                  <XMLTag>&quot;SGST&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSETaxRateCGST">
                  <Set>$STATEWISEDETAILS[$$Line].RATEDETAILS[1, @@IsCGST].GSTRATE</Set>
                  <XMLTag>&quot;CGST&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSETaxRateCess">
                  <Set>$STATEWISEDETAILS[$$Line].RATEDETAILS[1, @@IsAddlCess].GSTRATE</Set>
                  <XMLTag>&quot;Cess&quot;</XMLTag>
                  </FIELD>

                  <PART NAME="XMLIntSExplodeMRPRate">
                  <TopLines>XMLIntSExplodeMRPRate1</TopLines>
                  <Repeat>XMLIntSExplodeMRPRate1:MRPDETAILS</Repeat>
                  <Scrolled>Vertical</Scrolled>
                 </PART>
                 
                 <LINE NAME="XMLIntSExplodeMRPRate1">
                  <LeftFields>XMLIntSExplodeMRPRateFromDate, XMLIntSExplodeMRPRate</LeftFields>
                  <XMLTag>&quot;MRPHistory&quot;</XMLTag>
                 </LINE>
                 
                     <FIELD NAME="XMLIntSExplodeMRPRateFromDate">
                  <Set>$$DDMMYYDateFormat:$FROMDATE:"-"</Set>
                  <XMLTag>&quot;FROMDATE&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSExplodeMRPRate">
                  <Set>$MRPRATEDETAILS[$$Line].MRPRATE</Set>
                  <XMLTag>&quot;MRPRATE&quot;</XMLTag>
                  </FIELD>
                  
                  <COLLECTION NAME="XMLIntStockItem">
                  <Type>StockItem</Type>
                  <NativeMethod>*.*</NativeMethod>
                 </COLLECTION>
                  
              </TDLMESSAGE>
          </TDL>
      </DESC>
  </BODY>
</ENVELOPE>`
);

$("#godownreq").val(
  `<ENVELOPE>
  <HEADER>
      <VERSION>1</VERSION>
      <TALLYREQUEST>Export</TALLYREQUEST>
      <TYPE>Data</TYPE>
      <ID>XMLIntStockItem</ID>
  </HEADER>
  <BODY>
      <DESC>
          <STATICVARIABLES>
              <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
              <SVCurrentCompany>$$CurrentCompany</SVCurrentCompany><!--Company Name Input Field, Note: $$CurrentCompany is used to fetch data of current Active Company-->
              <SVFromDate>$$SystemPeriodFrom</SVFromDate><!--From Date Input Field, Note: $$SystemPeriodFrom Means Starting Date of Company-->
              <SVToDate>$$SystemPeriodTo</SVToDate><!--To Date Input Field, Note: $$SystemPeriodTo Means Ending Date of Company-->
          </STATICVARIABLES> 
          <TDL>  
              <TDLMESSAGE>
                 <REPORT NAME="XMLIntStockItem">
                  <Forms>XMLIntStockItem</Forms>
                 </REPORT>
                 
                 <FORM NAME="XMLIntStockItem">
                  <TopParts>XMLIntStockItemBody</TopParts>
                  <Buttons>ExportButton</Buttons>
                 </FORM>
                 
                 <PART NAME="XMLIntStockItemBody">
                  <TopLines>XMLIntStockItemBody</TopLines>
                  <Repeat>XMLIntStockItemBody:XMLIntStockItem</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntStockItemBody">
                  <LeftFields>XMLIntPLCmpGuid, XMLIntSGuid,XMLIntSName, XMLIntSAlias, XMLIntSPartNo, XMLIntSDescription, XMLIntSRemarks, XMLIntSGSTApplicable</LeftFields>
                  <LeftFields>XMLIntSCalculationType,XMLIntSTaxablity, XMLIntSIGST, XMLIntSSGST, XMLIntSCGST, XMLIntSCess, XMLIntSHSNCode, XMLIntSMRPRate</LeftFields>
                  <LeftFields>XMLIntSCategoryGuid, XMLIntSCategoryName,XMLIntSGroupGuid, XMLIntSGroup,XMLIntSUnitID, XMLIntSUnit, XMLIntSOpeningBalance</LeftFields>
                  <LeftFields>XMLIntSOpeningRate,XMLIntSOpeningValue, XMLIntSAlterID, XMLIntSIsBatchWiseOn</LeftFields>
                  <XMLTag>&quot;StockItems&quot;</XMLTag>
                  <Explode>XMLIntSExplodeOpeningBalance</Explode>
                  <Explode>XMLIntSExplodeTaxRate</Explode>
                  <Explode>XMLIntSExplodeMRPRate</Explode>
                 </LINE>
                                    <FIELD NAME="XMLIntPLCmpGuid">
                  <Use>Name Field</Use>
                  <Set>$$SprintF:"%s%s":@GUID:@DataNo</Set>
                  <LocalFormula>GUID:$Guid:Company:$$CurrentCompany</LocalFormula>
                  <LocalFormula>DataNo:$CompanyNumber:Company:$$CurrentCompany</LocalFormula>
                  <XMLTag>&quot;CompanyGUID&quot;</XMLTag>
                 </FIELD>
                     <FIELD NAME="XMLIntSGuid">
                  <Use>Name Field</Use>
                  <Set>$GUID</Set>
                  <XMLTag>&quot;GUID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSName">
                  <Use>Name Field</Use>
                  <Set>$Name</Set>
                  <XMLTag>&quot;Name&quot;</XMLTag>
                 </FIELD>
                 
                     <FIELD NAME="XMLIntSAlias">
                  <Use>Name Field</Use>
                  <Set>$$Alias</Set>
                  <XMLTag>&quot;Alias&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSPartNo">
                  <Use>Name Field</Use>
                  <Set>$PartNo</Set>
                  <XMLTag>&quot;PartNo&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSDescription">
                  <Use>Name Field</Use>
                  <Set>$Description</Set>
                  <XMLTag>&quot;Description&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSRemarks">
                  <Use>Name Field</Use>
                  <Set>$Narration</Set>
                  <XMLTag>&quot;Remarks&quot;</XMLTag>
                 </FIELD>

                 <FIELD NAME="XMLIntSGSTApplicable">
                  <Use>Name Field</Use>
                  <Set>If $$SysName:Applicable=$GSTApplicable Then "Applicable" Else if $$SysName:NotApplicable=$GSTApplicable Then "Not Applicable" Else ""</Set>
                  <XMLTag>&quot;IsGSTApplicable&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSCalculationType">
                  <Use>Name Field</Use>
                  <Set>$GSTDetails[Last].CalculationType</Set>
                  <XMLTag>&quot;CalculationType&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSTaxablity">
                  <Use>Name Field</Use>
                  <Set>$GSTDetails[Last].Taxability</Set>
                  <XMLTag>&quot;Taxability&quot;</XMLTag>
                 </FIELD>

                 <FIELD NAME="XMLIntSIGST">
                  <Use>Name Field</Use>
                  <Set>$GSTDetails[Last].StatewiseDetails[1, @@IsAnyState].RateDetails[1, @@IsIGST].GSTRate</Set>
                  <XMLTag>&quot;IGST&quot;</XMLTag>
                 </FIELD>
                                    
                 <FIELD NAME="XMLIntSSGST">
                  <Use>Name Field</Use>
                  <Set>$GSTDetails[Last].StatewiseDetails[1, @@IsAnyState].RateDetails[1, @@IsSGST].GSTRate</Set>
                  <XMLTag>&quot;SGST&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSCGST">
                  <Use>Name Field</Use>
                  <Set>$GSTDetails[Last].StatewiseDetails[1, @@IsAnyState].RateDetails[1, @@IsCGST].GSTRate</Set>
                  <XMLTag>&quot;CGST&quot;</XMLTag>
                 </FIELD>

                 <FIELD NAME="XMLIntSCess">
                  <Use>Name Field</Use>
                  <Set>$GSTDetails[Last].StatewiseDetails[1, @@IsAnyState].RateDetails[1, @@IsAddlCess].GSTRate</Set>
                  <XMLTag>&quot;Cess&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSHSNCode">
                  <Use>Name Field</Use>
                  <Set>$GSTDetails[Last].HSNCode</Set>
                  <XMLTag>&quot;HSNCode&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSMRPRate">
                  <Use>Name Field</Use>
                  <Set>$MRPDETAILS[Last].MRPRATEDETAILS[Last].MRPRATE</Set>
                  <XMLTag>&quot;MRPRATE&quot;</XMLTag>
                 </FIELD>
                 
                     <FIELD NAME="XMLIntSCategoryGuid">
                  <Use>Name Field</Use>
                  <Set>$guid:StockCategory:$Category</Set>
                  <XMLTag>&quot;CategoryID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSCategoryName">
                  <Use>Name Field</Use>
                  <Set>If $$IsSysName:$Category Then "Primary" Else $Category</Set>
                  <XMLTag>&quot;CategoryName&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSGroupGuid">
                  <Use>Name Field</Use>
                  <Set>$guid:StockGroup:$Parent</Set>
                  <XMLTag>&quot;GroupID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSGroup">
                  <Use>Name Field</Use>
                  <Set>If $$IsSysName:$Parent Then "Primary" Else $Parent</Set>
                  <XMLTag>&quot;GroupName&quot;</XMLTag>
                 </FIELD>
                    
                 <FIELD NAME="XMLIntSUnitID">
                  <Use>Name Field</Use>
                  <Set>$guid:Unit:$BaseUnits</Set>
                  <XMLTag>&quot;UNITID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSUnit">
                  <Use>Name Field</Use>
                  <Set>If $$isSysName:$BaseUnits Then "Not Applicable" Else $BaseUnits</Set>
                  <XMLTag>&quot;UNITName&quot;</XMLTag>
                 </FIELD>

                 <FIELD NAME="XMLIntSOpeningBalance">
                  <Type>Number</Type>
                  <Set>$OpeningBalance</Set>
                  <XMLTag>&quot;OpeningBalance&quot;</XMLTag>
                  </FIELD>
                 
                 <FIELD NAME="XMLIntSOpeningRate">
                  <Type>Number</Type>
                  <Set>$OpeningRate</Set>
                  <XMLTag>&quot;Rate&quot;</XMLTag>
                  <Format>"Decimal:2"</Format>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSOpeningValue">
                  <Type>Number</Type>
                  <Set>$OpeningValue</Set>
                  <XMLTag>&quot;Amount&quot;</XMLTag>
                  <Format>"Decimal:2"</Format>
                  </FIELD>
                  
                 <FIELD NAME="XMLIntSAlterID">
                  <Set>$AlterID</Set>
                  <XMLTag>&quot;AlterID&quot;</XMLTag>
                  </FIELD>
                  
                 <FIELD NAME="XMLIntSIsBatchWiseOn">
                  <Set>$IsBatchWiseOn</Set>
                  <XMLTag>&quot;IsBatchWiseOn&quot;</XMLTag>
                  </FIELD>
                  
                  <PART NAME="XMLIntSExplodeOpeningBalance">
                  <TopLines>XMLIntSExplodeOpeningBalance</TopLines>
                  <Repeat>XMLIntSExplodeOpeningBalance:BATCHALLOCATIONS</Repeat>
                  <Scrolled>Vertical</Scrolled>
                 </PART>
                 
                 <LINE NAME="XMLIntSExplodeOpeningBalance">
                  <LeftFields>XMLIntSEGodownNameID, XMLIntSEGodownName,XMLIntSEBatchName,XMLIntSEOpeningBalance, XMLIntSEOpeningRate, XMLIntSEOpeningValue</LeftFields>
                  <XMLTag>&quot;OpeningBalance&quot;</XMLTag>
                 </LINE>
                  
                  <FIELD NAME="XMLIntSEGodownNameID">
                  <Set>$guid:Godown:$GodownName</Set>
                  <XMLTag>&quot;GodownGUID&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSEGodownName">
                  <Set>$GodownName</Set>
                  <XMLTag>&quot;GodownName&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSEBatchName">
                  <Set>$BatchName</Set>
                  <XMLTag>&quot;BatchName&quot;</XMLTag>
                  </FIELD>
                              
                  <FIELD NAME="XMLIntSEOpeningBalance">
                  <Type>Number</Type>
                  <Set>$OPENINGBALANCE</Set>
                  <XMLTag>&quot;OpeningBalance&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSEOpeningRate">
                  <Type>Number</Type>
                  <Set>$OpeningRate</Set>
                  <XMLTag>&quot;OpeningRate&quot;</XMLTag>
                  <Format>"Decimal:2"</Format>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSEOpeningValue">
                  <Type>Number</Type>
                  <Set>$OPENINGVALUE</Set>
                  <XMLTag>&quot;OPENINGVALUE&quot;</XMLTag>
                  <Format>"Decimal:2"</Format>
                  </FIELD>
                  
                  
                  <PART NAME="XMLIntSExplodeTaxRate">
                  <TopLines>XMLIntSExplodeTaxRate</TopLines>
                  <Repeat>XMLIntSExplodeTaxRate:GSTDETAILS</Repeat>
                  <Scrolled>Vertical</Scrolled>
                 </PART>
                 
                 <LINE NAME="XMLIntSExplodeTaxRate">
                  <LeftFields>XMLIntSETaxRateApplicableFrom, XMLIntSETaxRateHSNCode,XMLIntSETaxRateCalculationType,XMLIntSETaxRateTaxablity, XMLIntSETaxRateIGST</LeftFields>
                  <LeftFields>XMLIntSETaxRateSGST, XMLIntSETaxRateCGST, XMLIntSETaxRateCess</LeftFields>
                  <XMLTag>&quot;TaxHistory&quot;</XMLTag>
                 </LINE>
                  
                  <FIELD NAME="XMLIntSETaxRateApplicableFrom">
                  <Set>$APPLICABLEFROM</Set>
                  <XMLTag>&quot;APPLICABLEFROM&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSETaxRateHSNCode">
                  <Set>$HSNCode</Set>
                  <XMLTag>&quot;HSNCode&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSETaxRateCalculationType">
                  <Set>$CALCULATIONTYPE</Set>
                  <XMLTag>&quot;CALCULATIONTYPE&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSETaxRateTaxablity">
                  <Set>$TAXABILITY</Set>
                  <XMLTag>&quot;TAXABILITY&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSETaxRateIGST">
                  <Set>$STATEWISEDETAILS[$$Line].RATEDETAILS[1, @@IsIGST].GSTRATE</Set>
                  <XMLTag>&quot;IGST&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSETaxRateSGST">
                  <Set>$STATEWISEDETAILS[$$Line].RATEDETAILS[1, @@IsSGST].GSTRATE</Set>
                  <XMLTag>&quot;SGST&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSETaxRateCGST">
                  <Set>$STATEWISEDETAILS[$$Line].RATEDETAILS[1, @@IsCGST].GSTRATE</Set>
                  <XMLTag>&quot;CGST&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSETaxRateCess">
                  <Set>$STATEWISEDETAILS[$$Line].RATEDETAILS[1, @@IsAddlCess].GSTRATE</Set>
                  <XMLTag>&quot;Cess&quot;</XMLTag>
                  </FIELD>

                  <PART NAME="XMLIntSExplodeMRPRate">
                  <TopLines>XMLIntSExplodeMRPRate1</TopLines>
                  <Repeat>XMLIntSExplodeMRPRate1:MRPDETAILS</Repeat>
                  <Scrolled>Vertical</Scrolled>
                 </PART>
                 
                 <LINE NAME="XMLIntSExplodeMRPRate1">
                  <LeftFields>XMLIntSExplodeMRPRateFromDate, XMLIntSExplodeMRPRate</LeftFields>
                  <XMLTag>&quot;MRPHistory&quot;</XMLTag>
                 </LINE>
                 
                     <FIELD NAME="XMLIntSExplodeMRPRateFromDate">
                  <Set>$$DDMMYYDateFormat:$FROMDATE:"-"</Set>
                  <XMLTag>&quot;FROMDATE&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntSExplodeMRPRate">
                  <Set>$MRPRATEDETAILS[$$Line].MRPRATE</Set>
                  <XMLTag>&quot;MRPRATE&quot;</XMLTag>
                  </FIELD>
                  
                  <COLLECTION NAME="XMLIntStockItem">
                  <Type>StockItem</Type>
                  <NativeMethod>*.*</NativeMethod>
                 </COLLECTION>
                  
              </TDLMESSAGE>
          </TDL>
      </DESC>
  </BODY>
</ENVELOPE>`
);

$("#vouchertypereq").val(
  `<ENVELOPE>
  <HEADER>
      <VERSION>1</VERSION>
      <TALLYREQUEST>Export</TALLYREQUEST>
      <TYPE>Data</TYPE>
      <ID>XMLIntVoucherType</ID>
  </HEADER>
  <BODY>
      <DESC>
          <STATICVARIABLES>
              <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
              <SVCurrentCompany>$$CurrentCompany</SVCurrentCompany><!--Company Name Input Field, Note: $$CurrentCompany is used to fetch data of current Active Company-->
              <SVFromDate>$$SystemPeriodFrom</SVFromDate><!--From Date Input Field, Note: $$SystemPeriodFrom Means Starting Date of Company-->
              <SVToDate>$$SystemPeriodTo</SVToDate><!--To Date Input Field, Note: $$SystemPeriodTo Means Ending Date of Company-->
          </STATICVARIABLES> 
          <TDL>  
              <TDLMESSAGE>
                 <REPORT NAME="XMLIntVoucherType">
                  <Forms>XMLIntVoucherType</Forms>
                 </REPORT>
                 
                 <FORM NAME="XMLIntVoucherType">
                  <TopParts>XMLIntVoucherTypeBody</TopParts>
                  <Buttons>ExportButton</Buttons>
                 </FORM>
                 
                 <PART NAME="XMLIntVoucherTypeBody">
                  <TopLines>XMLIntVoucherTypeBody</TopLines>
                  <Repeat>XMLIntVoucherTypeBody:VoucherType</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntVoucherTypeBody">
                  <LeftFields>XMLIntPLCmpGuid, XMLIntVGuid,XMLIntVName,XMLIntVParentVchTypeID, XMLIntVParentVchTypeName</LeftFields>
                  <LeftFields>XMLIntVPrintName, XMLIntVNumbering,XMLIntVBankName, XMLIntVBankID, XMLIntVAlterID</LeftFields>
                  <XMLTag>&quot;VoucherType&quot;</XMLTag>
                  <Explode>XMLIntVoucherTypeNumberingPrefix</Explode>
                  <Explode>XMLIntVoucherTypeNumberingSuffix</Explode>
                 </LINE>
                                        <FIELD NAME="XMLIntPLCmpGuid">
                  <Use>Name Field</Use>
                  <Set>$$SprintF:"%s%s":@GUID:@DataNo</Set>
                  <LocalFormula>GUID:$Guid:Company:$$CurrentCompany</LocalFormula>
                  <LocalFormula>DataNo:$CompanyNumber:Company:$$CurrentCompany</LocalFormula>
                  <XMLTag>&quot;CompanyGUID&quot;</XMLTag>
                 </FIELD>
                     <FIELD NAME="XMLIntVGuid">
                  <Use>Name Field</Use>
                  <Set>$GUID</Set>
                  <XMLTag>&quot;VoucherTypeID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVName">
                  <Use>Name Field</Use>
                  <Set>$Name</Set>
                  <XMLTag>&quot;VoucherTypeName&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVParentVchTypeID">
                  <Use>Name Field</Use>
                  <Set>$guid:VoucherType:$Parent</Set>
                  <XMLTag>&quot;ParentVoucherTypeID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVParentVchTypeName">
                  <Use>Name Field</Use>
                  <Set>$Parent</Set>
                  <XMLTag>&quot;ParentVoucherTypeName&quot;</XMLTag>
                 </FIELD>
                 
                     <FIELD NAME="XMLIntVPrintName">
                  <Use>Name Field</Use>
                  <Set>$VCHPrintTitle</Set>
                  <XMLTag>&quot;VoucherTypePrintName&quot;</XMLTag>
                 </FIELD>

                 <FIELD NAME="XMLIntVNumbering">
                  <Use>Name Field</Use>
                  <Set>$NumberingMethod</Set>
                  <XMLTag>&quot;VoucherNumbering&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVBankName">
                  <Use>Name Field</Use>
                  <Set>$VchPrintBankName</Set>
                  <XMLTag>&quot;DefaultBankName&quot;</XMLTag>
                 </FIELD>
                 
                  <FIELD NAME="XMLIntVBankID">
                  <Use>Name Field</Use>
                  <Set>$guid:Ledger:$VchPrintBankName</Set>
                  <XMLTag>&quot;DefaultBankNameID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVAlterID">
                  <Use>Name Field</Use>
                  <Set>$AlterID</Set>
                  <XMLTag>&quot;AlterID&quot;</XMLTag>
                 </FIELD>
                 
                 <PART NAME="XMLIntVoucherTypeNumberingPrefix">
                  <TopLines>XMLIntVoucherTypeNumberingPrefix</TopLines>
                  <Repeat>XMLIntVoucherTypeNumberingPrefix:PREFIXLIST</Repeat>
                  <Scrolled>Vertical</Scrolled>
                 </PART>
                 
                 <LINE NAME="XMLIntVoucherTypeNumberingPrefix">
                  <LeftFields>XMLIntVNPDate,XMLIntVNPName</LeftFields>
                  <XMLTag>&quot;Prefix&quot;</XMLTag>
                 </LINE>
                 
                     <FIELD NAME="XMLIntVNPDate">
                  <Use>Name Field</Use>
                  <Set>$$DDMMYYDateFormat:$Date:"-"</Set>
                  <XMLTag>&quot;ApplicableFrom&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVNPName">
                  <Use>Name Field</Use>
                  <Set>$Name</Set>
                  <XMLTag>&quot;Prefix&quot;</XMLTag>
                 </FIELD>
                 
                 <PART NAME="XMLIntVoucherTypeNumberingSuffix">
                  <TopLines>XMLIntVoucherTypeNumberingSuffix</TopLines>
                  <Repeat>XMLIntVoucherTypeNumberingSuffix:SUFFIXLIST</Repeat>
                  <Scrolled>Vertical</Scrolled>
                 </PART>
                 
                 <LINE NAME="XMLIntVoucherTypeNumberingSuffix">
                  <LeftFields>XMLIntVNSDate,XMLIntVNSName</LeftFields>
                  <XMLTag>&quot;Suffix&quot;</XMLTag>
                 </LINE>
                 
                     <FIELD NAME="XMLIntVNSDate">
                  <Use>Name Field</Use>
                  <Set>$Date</Set>
                  <XMLTag>&quot;ApplicableFrom&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVNSName">
                  <Use>Name Field</Use>
                  <Set>$Name</Set>
                  <XMLTag>&quot;Suffix&quot;</XMLTag>
                 </FIELD>
                 
                 
              </TDLMESSAGE>
          </TDL>
      </DESC>
  </BODY>
</ENVELOPE>`
);

$("#voucherreq").val(
    `<ENVELOPE>
  <HEADER>
      <VERSION>1</VERSION>
      <TALLYREQUEST>Export</TALLYREQUEST>
      <TYPE>Data</TYPE>
      <ID>XMLIntVouchers</ID>
  </HEADER>
  <BODY>
      <DESC>
          <STATICVARIABLES>
              <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
              <SVCurrentCompany>$$CurrentCompany</SVCurrentCompany><!--Company Name Input Field, Note: $$CurrentCompany is used to fetch data of current Active Company-->
              <SVFromDate>$$SystemPeriodFrom</SVFromDate><!--From Date Input Field, Note: $$SystemPeriodFrom Means Starting Date of Company-->
              <SVToDate>$$SystemPeriodTo</SVToDate><!--To Date Input Field, Note: $$SystemPeriodTo Means Starting Date of Company-->
          </STATICVARIABLES> 
          <TDL>  
              <TDLMESSAGE>
                 <REPORT NAME="XMLIntVouchers">
                  <Forms>XMLIntVouchers</Forms>
                 </REPORT>
                 
                 <FORM NAME="XMLIntVouchers">
                  <TopParts>XMLIntVouchersBody</TopParts>
                  <Buttons>ExportButton</Buttons>
                 </FORM>
                 
                 <PART NAME="XMLIntVouchersBody">
                  <TopLines>XMLIntVouchersBody</TopLines>
                  <Repeat>XMLIntVouchersBody:XMLIntVouchers</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntVouchersBody">
                  <LeftFields>XMLIntPLCmpGuid, XMLIntVDate, XMLIntVVchNo, XMLIntVRefNo, XMLIntVRefDate, XMLIntVPartyName, XMLIntVPartyID, XMLIntVGuid, XMLIntVTypeName, XMLIntVTypeID, XMLIntVAlterID</LeftFields>
                  <LeftFields>XMLIntCGSTAmount,XMLIntSGSTAmount,XMLIntIGSTAmount,XMLIntVATAmount,XMLIntFinalAmount,XMLIntVAllocationLedger,XMLIntVAllocationLedgerID, XMLIntVNarration, XMLIntVIsInvoice</LeftFields>
                  <LeftFields>XMLIntVPendingAmount</LeftFields>
                  <XMLTag>&quot;Vouchers&quot;</XMLTag>
                  <Explode>XMLIntVouchersInv</Explode>
                  <Explode>XMLIntVouchersLed</Explode>
                 </LINE>

                   <FIELD NAME="XMLIntPLCmpGuid">
                  <Use>Name Field</Use>
                  <Set>$$SprintF:"%s%s":@GUID:@DataNo</Set>
                  <LocalFormula>GUID:$Guid:Company:$$CurrentCompany</LocalFormula>
                  <LocalFormula>DataNo:$CompanyNumber:Company:$$CurrentCompany</LocalFormula>
                  <XMLTag>&quot;CompanyGUID&quot;</XMLTag>
                 </FIELD>
                 <FIELD NAME="XMLIntVDate">
                  <Use>Name Field</Use>
                  <Set>$$DDMMYYDateFormat:$Date:"-"</Set>
                  <XMLTag>&quot;Date&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVVchNo">
                  <Use>Name Field</Use>
                  <Set>$VoucherNumber</Set>
                  <XMLTag>&quot;VoucherNumber&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVRefNo">
                  <Use>Name Field</Use>
                  <Set>$Reference</Set>
                  <XMLTag>&quot;Reference&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVRefDate">
                  <Use>Name Field</Use>
                  <Set>$$DDMMYYDateFormat:$ReferenceDate:"-"</Set>
                  <XMLTag>&quot;ReferenceDate&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVPartyName">
                  <Use>Name Field</Use>
                  <Set>$PartyLedgerName</Set>
                  <XMLTag>&quot;PartyName&quot;</XMLTag>
                 </FIELD>
                 
                     <FIELD NAME="XMLIntVPartyID">
                  <Use>Name Field</Use>
                  <Set>$Guid:Ledger:$PartyLedgerName</Set>
                  <XMLTag>&quot;PartyID&quot;</XMLTag>
                 </FIELD>
                 
                     <FIELD NAME="XMLIntVGuid">
                  <Use>Name Field</Use>
                  <Set>$Guid</Set>
                  <XMLTag>&quot;VoucherID&quot;</XMLTag>
                 </FIELD>

                     <FIELD NAME="XMLIntVTypeName">
                  <Use>Name Field</Use>
                  <Set>$VoucherTypeName</Set>
                  <XMLTag>&quot;VoucherTypeName&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVTypeID">
                  <Use>Name Field</Use>
                  <Set>$Guid:VoucherType:$VoucherTypeName</Set>
                  <XMLTag>&quot;VoucherTypeGuid&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVAlterID">
                  <Use>Name Field</Use>
                  <Set>$AlterID</Set>
                  <XMLTag>&quot;AlterID&quot;</XMLTag>
                 </FIELD>
                 
                     <FIELD NAME="XMLIntCGSTAmount">
                  <Use>Number Field</Use>
                  <Set>$$FilterAmtTotal:LedgerEntries:IsCGST1:$Amount</Set>
                  <Format>"Decimal:2"</Format>
                  <XMLTag>&quot;CGSTAmount&quot;</XMLTag>
                 </FIELD>
                 
                     <FIELD NAME="XMLIntSGSTAmount">
                  <Use>Number Field</Use>
                  <Set>$$FilterAmtTotal:LedgerEntries:IsSGST1:$Amount</Set>
                  <Format>"Decimal:2"</Format>
                  <XMLTag>&quot;SGSTAmount&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntIGSTAmount">
                  <Use>Number Field</Use>
                  <Set>$$FilterAmtTotal:LedgerEntries:IsIGST1:$Amount</Set>
                  <Format>"Decimal:2"</Format>
                  <XMLTag>&quot;IGSTAmount&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVATAmount">
                  <Use>Number Field</Use>
                  <Set>$$FilterAmtTotal:LedgerEntries:IsVAT1:$Amount</Set>
                  <Format>"Decimal:2"</Format>
                  <XMLTag>&quot;VATAmount&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntFinalAmount">
                  <Use>Number Field</Use>
                  <Set>$Amount</Set>
                  <Format>"Decimal:2"</Format>
                  <XMLTag>&quot;FinalAmount&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVAllocationLedger">
                  <Use>Name Field</Use>
                  <Set>$$CollectionField:$LedgerAlloc:1:InventoryEntries</Set>
                  <XMLTag>&quot;AllocationLedger&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVAllocationLedgerID">
                  <Use>Name Field</Use>
                  <Set>$Guid:Ledger:($$CollectionField:$LedgerAlloc:1:InventoryEntries)</Set>
                  <XMLTag>&quot;AllocationLedgerID&quot;</XMLTag>
                 </FIELD>
                 
                  <FIELD NAME="XMLIntVNarration">
                  <Use>Name Field</Use>
                  <Set>$Narration</Set>
                  <XMLTag>&quot;Narration&quot;</XMLTag>
                 </FIELD>
                 
                     <FIELD NAME="XMLIntVIsInvoice">
                  <Use>Name Field</Use>
                  <Set>$IsInvoice</Set>
                  <XMLTag>&quot;IsInvoice&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVPendingAmount">
                  <Use>Number Field</Use>
                  <Set>If $$IsSales:$VoucherTypeName Or $$IsPurchase:$VoucherTypeName Then $$FetchBillDetails:$PartyLedgerName:@BillName:"ClosingBalance" Else  0</Set>
                  <LocalFormula>BillName:$LedgerEntries[1].BillAllocations[1, @@IsNewAdvanceRef].Name</LocalFormula>
                  <XMLTag>&quot;PendingAmount&quot;</XMLTag>
                 </FIELD>

                 <PART NAME="XMLIntVouchersInv">
                  <TopLines>XMLIntVouchersInv</TopLines>
                  <Repeat>XMLIntVouchersInv:InventoryEntries</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntVouchersInv">
                  <LeftFields>XMLIntVIStkName, XMLIntVIStkID, XMLIntVIActualQty, XMLIntVIBilledQty, XMLIntVIRate, XMLIntVIAmount</LeftFields>
                  <XMLTag>&quot;InventoryEntries&quot;</XMLTag>
                  <Explode>XMLIntVouchersInvBatch</Explode>
                 </LINE>
                 
                 <FIELD NAME="XMLIntVIStkName">
                  <Use>Name Field</Use>
                  <Set>$StockItemName</Set>
                  <XMLTag>&quot;StockItemName&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVIStkID">
                  <Use>Name Field</Use>
                  <Set>$guid:StockItem:$StockItemName</Set>
                  <XMLTag>&quot;StockId&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVIActualQty">
                  <Use>Number Field</Use>
                  <Set>$ActualQty</Set>
                  <XMLTag>&quot;ActualQty&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVIBilledQty">
                  <Use>Number Field</Use>
                  <Set>$BilledQty</Set>
                  <XMLTag>&quot;BilledQty&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVIRate">
                  <Use>Number Field</Use>
                  <Set>$Rate</Set>
                  <XMLTag>&quot;Rate&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVIAmount">
                  <Use>Number Field</Use>
                  <Set>$Amount</Set>
                  <Format>"Decimal:2"</Format>
                  <XMLTag>&quot;Amount&quot;</XMLTag>
                  </FIELD>	   

                  <PART NAME="XMLIntVouchersInvBatch">
                  <TopLines>XMLIntVouchersInvBatch</TopLines>
                  <Repeat>XMLIntVouchersInvBatch:BatchAllocations</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntVouchersInvBatch">
                  <LeftFields>XMLIntVIBBatchName, XMLIntVIBGodownName, XMLIntVIBGodownID, XMLIntVIBActualQty, XMLIntVIBBilledQty, XMLIntVIBRate, XMLIntVIBAmount</LeftFields>
                  <LeftFields>XMLIntVIBTrackingNumber, XMLIntVIBOrderNo, XMLIntVIBOrderDueDate </LeftFields>
                  <XMLTag>&quot;BatchAllocations&quot;</XMLTag>
                 </LINE>
                 
                 <FIELD NAME="XMLIntVIBBatchName">
                  <Use>Name Field</Use>
                  <Set>$BatchName</Set>
                  <XMLTag>&quot;BatchName&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVIBGodownName">
                  <Use>Name Field</Use>
                  <Set>$GodownName</Set>
                  <XMLTag>&quot;GodownName&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVIBGodownID">
                  <Use>Name Field</Use>
                  <Set>$guid:Godown:$GodownName</Set>
                  <XMLTag>&quot;GodownID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVIBActualQty">
                  <Use>Number Field</Use>
                  <Set>$ActualQty</Set>
                  <XMLTag>&quot;ActualQty&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVIBBilledQty">
                  <Use>Number Field</Use>
                  <Set>$BilledQty</Set>
                  <XMLTag>&quot;BilledQty&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVIBRate">
                  <Use>Number Field</Use>
                  <Set>$Rate</Set>
                  <XMLTag>&quot;Rate&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVIBAmount">
                  <Use>Number Field</Use>
                  <Set>$Amount</Set>
                  <Format>"Decimal:2"</Format>
                  <XMLTag>&quot;Amount&quot;</XMLTag>
                  </FIELD>
             
                 <FIELD NAME="XMLIntVIBTrackingNumber">
                  <Use>Name Field</Use>
                  <Set>If $$IsSysName:$TrackingNumber Then "Not Applicable" Else $TrackingNumber</Set>
                  <XMLTag>&quot;TrackingNumber&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVIBOrderNo">
                  <Use>Name Field</Use>
                  <Set>If $$IsSysName:$OrderNo Then "Not Applicable" Else $OrderNo</Set>
                  <XMLTag>&quot;OrderNo&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntVIBOrderDueDate">
                  <Use>Name Field</Use>
                  <Set>$$DDMMYYDateFormat:$OrderDueDate:"-"</Set>
                  <XMLTag>&quot;OrderDueDate&quot;</XMLTag>
                  </FIELD>
                  
                  <PART NAME="XMLIntVouchersLed">
                  <TopLines>XMLIntVouchersLed</TopLines>
                  <Repeat>XMLIntVouchersLed:LedgerEntries</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntVouchersLed">
                  <LeftFields>XMLIntVouchersLedName, XMLIntVouchersLedID, XMLIntVouchersLedIsPartyLedger, XMLIntVouchersLedDebit, XMLIntVouchersLedCredit</LeftFields>
                  <XMLTag>&quot;LedgerEntries&quot;</XMLTag>
                  <Explode>XMLIntVLedInvAlloc</Explode>
                  <Explode>XMLIntVLedBillAlloc</Explode>
                  <Explode>XMLIntVLedBankAlloc</Explode>
                 </LINE>
                 
                 <FIELD NAME="XMLIntVouchersLedName">
                  <Use>Name Field</Use>
                  <Set>$LedgerName</Set>
                  <XMLTag>&quot;LedgerName&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVouchersLedID">
                  <Use>Name Field</Use>
                  <Set>$guid:Ledger:$LedgerName</Set>
                  <XMLTag>&quot;LedgerID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVouchersLedIsPartyLedger">
                  <Use>Name Field</Use>
                  <Set>$IsPartyLedger</Set>
                  <XMLTag>&quot;IsPartyLedger&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVouchersLedDebit">
                  <Use>Number Field</Use>
                  <Set>If $$IsDr:$Amount Then $Amount Else ""</Set>
                  <Format>"Decimal:2"</Format>
                  <XMLTag>&quot;Debit&quot;</XMLTag>
                 </FIELD>
                 
                     <FIELD NAME="XMLIntVouchersLedCredit">
                  <Use>Number Field</Use>
                  <Set>If $$IsDr:$Amount Then "" Else $Amount</Set>
                  <Format>"Decimal:2"</Format>
                  <XMLTag>&quot;Credit&quot;</XMLTag>
                 </FIELD>
                  
                  <PART NAME="XMLIntVLedInvAlloc">
                  <TopLines>XMLIntVouchersInv</TopLines>
                  <Repeat>XMLIntVouchersInv:InventoryAllocations</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                  <Local>Line:XMLIntVouchersInv:XMLTag:"InventoryAllocations"</Local>
                 </PART>
                 
                  <PART NAME="XMLIntVLedBillAlloc">
                  <TopLines>XMLIntVLedBillAlloc</TopLines>
                  <Repeat>XMLIntVLedBillAlloc:BillAllocations</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntVLedBillAlloc">
                  <LeftFields>XMLIntVLedBillAllocName, XMLIntVLedBillID,XMLIntVLedVchTypeName, XMLIntVLedBillAllocBillType, XMLIntVLedBillAllocAmount</LeftFields>
                  <XMLTag>&quot;BillAllocations&quot;</XMLTag>
                 </LINE>
                 
                 <FIELD NAME="XMLIntVLedBillAllocName">
                  <Use>Name Field</Use>
                  <Set>$Name</Set>
                  <XMLTag>&quot;BillName&quot;</XMLTag>
                 </FIELD>
                 
                     <FIELD NAME="XMLIntVLedBillID">
                  <Use>Name Field</Use>
                  <Set>$$FetchBillDetails:#XMLIntVouchersLedName:$Name:"LedgerEntries.Guid"</Set>
                  <XMLTag>&quot;VoucherID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVLedVchTypeName">
                  <Use>Name Field</Use>
                  <Set>$Parent:VoucherType:($$FetchBillDetails:#XMLIntVouchersLedName:$Name:"LedgerEntries.VoucherTypeName")</Set>
                  <XMLTag>&quot;VoucherTypeName&quot;</XMLTag>
                 </FIELD>
                 
                 <Function Name="FetchBillDetails">
                 <Parameter>LedName:String</Parameter>
                 <Parameter>BillName:String</Parameter>
                 <Parameter>MethodName:String</Parameter>
                 <Variable>ReturnValue:String</Variable>
                 <Variable>vBillKey:String:$$Sprintf:"%s%s%s":##BillName:$$SeparatorChar:##LedName</Variable>
                 <FetchObject>Bill: ##vBillKey: Name, LedgerEntries.*, LedgerEntries.AllLedgerEntries.*</FetchObject>
                 <Action>000:Set Object:(Bill, ##vBillKey).</Action>
                 <Action>010:Set:ReturnValue:$$Sprintf:"$%s":##MethodName</Action>
                 <Action>020:Set:ReturnValue:$$Evaluate:##ReturnValue</Action>
                 <Action>030:Return:##ReturnValue</Action>
                 </Function>
                 
                 <FIELD NAME="XMLIntVLedBillAllocBillType">
                  <Use>Name Field</Use>
                  <Set>$BillType</Set>
                  <XMLTag>&quot;BillType&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVLedBillAllocAmount">
                  <Use>Number Field</Use>
                  <Set>$Amount</Set>
                  <Format>"Decimal:2"</Format>
                  <XMLTag>&quot;Amount&quot;</XMLTag>
                 </FIELD>
                 
                 <PART NAME="XMLIntVLedBankAlloc">
                  <TopLines>XMLIntVLedBankAlloc</TopLines>
                  <Repeat>XMLIntVLedBankAlloc:BankAllocations</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntVLedBankAlloc">
                  <LeftFields>XMLIntVLedBankAllocDate, XMLIntVLedBankAllocInstrumentDate, XMLIntVLedBankAllocTransactionType, XMLIntVLedBankAllocPaymentFavouring</LeftFields>
                  <LeftFields>XMLIntVLedBankAllocPaymentMode, XMLIntVLedBankAllocBankName, XMLIntVLedBankAllocBankID, XMLIntVLedBankAllocAmount</LeftFields>
                  <XMLTag>&quot;BankAllocations&quot;</XMLTag>
                 </LINE>
                 
                 <FIELD NAME="XMLIntVLedBankAllocDate">
                  <Use>Name Field</Use>
                  <Set>$$DDMMYYDateFormat:$Date:"-"</Set>
                  <XMLTag>&quot;Date&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVLedBankAllocInstrumentDate">
                  <Use>Name Field</Use>
                  <Set>$$DDMMYYDateFormat:$InstrumentDate:"-"</Set>
                  <XMLTag>&quot;InstrumentDate&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVLedBankAllocTransactionType">
                  <Use>Name Field</Use>
                  <Set>$TransactionType</Set>
                  <XMLTag>&quot;TransactionType&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVLedBankAllocPaymentFavouring">
                  <Use>Name Field</Use>
                  <Set>$PaymentFavouring</Set>
                  <XMLTag>&quot;PaymentFavouring&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVLedBankAllocPaymentMode">
                  <Use>Name Field</Use>
                  <Set>$PaymentMode</Set>
                  <XMLTag>&quot;PaymentMode&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVLedBankAllocBankName">
                  <Use>Name Field</Use>
                  <Set>$BankPartyName</Set>
                  <XMLTag>&quot;BankPartyName&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVLedBankAllocBankID">
                  <Use>Name Field</Use>
                  <Set>$guid:Ledger:$BankPartyName</Set>
                  <XMLTag>&quot;PaymentFavouringID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVLedBankAllocAmount">
                  <Use>Number Field</Use>
                  <Set>$Amount</Set>
                  <Format>"Decimal:2"</Format>
                  <XMLTag>&quot;Amount&quot;</XMLTag>
                 </FIELD>
                 
                 
                 <COLLECTION NAME="XMLIntVouchers">
                  <ParmVar>SVFromDate:Date:$$Date:""</ParmVar>
                 <ParmVar>SVToDate:Date:$$Date:""</ParmVar>
                  <Type>Vouchers</Type>
                  <Fetch>Date, VoucherNumber, Reference, ReferenceDate, PartyLedgerName, Guid, AlterID, Narration, IsInvoice, IsCancelled</Fetch>
                  <Fetch>InventoryEntries.*, LedgerEntries.*, LedgerEntries.BillAllocations.*</Fetch>
                 <Filter>CancelledFil</Filter> 
                </COLLECTION>
                 
                <System Type="Formulae" Name="CancelledFil">!$IsCancelled</System>
                <System Type="Formulae" Name="IsCGST1">($Name:Ledger:$LedgerName) Contains "CGST"</System>
                <System Type="Formulae" Name="IsSGST1">($Name:Ledger:$LedgerName) Contains "SGST"</System>
                <System Type="Formulae" Name="IsIGST1">($Name:Ledger:$LedgerName) Contains "IGST"</System>
                <System Type="Formulae" Name="IsVAT1">($Name:Ledger:$LedgerName) Contains "VAT"</System>
              </TDLMESSAGE>
          </TDL>
      </DESC>
  </BODY>
</ENVELOPE>`
)

$("#billreq").val(
    `<ENVELOPE>
  <HEADER>
      <VERSION>1</VERSION>
      <TALLYREQUEST>Export</TALLYREQUEST>
      <TYPE>Data</TYPE>
      <ID>XMLIntBills</ID>
  </HEADER>
  <BODY>
      <DESC>
          <STATICVARIABLES>
              <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
              
          </STATICVARIABLES> 
          <TDL>  
              <TDLMESSAGE>
                 <REPORT NAME="XMLIntBills">
                  <Forms>XMLIntBills</Forms>
                 </REPORT>
                 
                 <FORM NAME="XMLIntBills">
                  <TopParts>XMLIntBillsBody</TopParts>
                  <Buttons>ExportButton</Buttons>
                 </FORM>
                 
                 <PART NAME="XMLIntBillsBody">
                  <TopLines>XMLIntBillsBody</TopLines>
                  <Repeat>XMLIntBillsBody:XMLIntBills</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntBillsBody">
                  <LeftFields>XMLIntPLCmpGuid, XMLIntBDate, XMLIntBRefNo, XMLIntBPartyName, XMLIntBPartyID,XMLIntBPendingAmt,XMLIntBPaidAmt,XMLIntBTotalAmt, XMLIntBGuid, XMLIntBDueOn, XMLIntBOverDueDays, XMLIntBIsRecievable</LeftFields>
                  <LeftFields>XMLIntBIsPayable, XMLIntBIsCleared, XMLIntBIsOnlyOpeningBalance, XMLIntBCGSTAmount, XMLIntBSGSTAmount, XMLIntBIGSTAmount, XMLIntBVATAmount</LeftFields>
                  <XMLTag>&quot;Bills&quot;</XMLTag>
                  <Explode>XMLIntBillsVoucher</Explode>
                 </LINE>
                     <FIELD NAME="XMLIntPLCmpGuid">
                      <Use>Name Field</Use>
                      <Set>$$SprintF:"%s%s":@GUID:@DataNo</Set>
                      <LocalFormula>GUID:$Guid:Company:$$CurrentCompany</LocalFormula>
                      <LocalFormula>DataNo:$CompanyNumber:Company:$$CurrentCompany</LocalFormula>
                      <XMLTag>&quot;CompanyGUID&quot;</XMLTag>
                 </FIELD>
                 <FIELD NAME="XMLIntBDate">
                  <Use>Name Field</Use>
                  <Set>$$DDMMYYDateFormat:$BillDate:"-"</Set>
                  <XMLTag>&quot;BillDate&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntBRefNo">
                  <Use>Name Field</Use>
                  <Set>$Name</Set>
                  <XMLTag>&quot;BillRefNo&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntBPartyName">
                  <Use>Name Field</Use>
                  <Set>$DSPAccName:Ledger:$Parent</Set>
                  <XMLTag>&quot;PartyName&quot;</XMLTag>
                 </FIELD>
                 
                     <FIELD NAME="XMLIntBPartyID">
                  <Use>Name Field</Use>
                  <Set>$Guid:Ledger:($DSPAccName:Ledger:$Parent)</Set>
                  <XMLTag>&quot;PartyID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntBPendingAmt">
                  <Type>Number</Type>
                  <Set>$ClosingBalance</Set>
                  <XMLTag>&quot;PendingAmt&quot;</XMLTag>
                  <Format>"Decimal:2"</Format>
                  </FIELD>
         
                     <FIELD NAME="XMLIntBPaidAmt">
                  <Type>Number</Type>
                  <Set>#XMLIntBTotalAmt - #XMLIntBPendingAmt</Set>
                  <XMLTag>&quot;PaidAmt&quot;</XMLTag>
                  <Format>"Decimal:2"</Format>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntBTotalAmt">
                  <Type>Number</Type>
                  <Set>If #XMLIntBIsOnlyOpeningBalance Then $OpeningBalance Else If #XMLIntBIsRecievable Then $$FilterNumTotal:LedgerEntries:IsReceivable1:$Amount Else $$FilterNumTotal:LedgerEntries:IsPayable1:$Amount </Set>
                  <XMLTag>&quot;TotalAmt&quot;</XMLTag>
                  <Format>"Decimal:2"</Format>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntBDueOn">
                  <Set>$$DDMMYYDateFormat:@@CreditPeriod:"-"</Set>
                  <XMLTag>&quot;DueOn&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntBGuid">
                  <Use>NameField</Use>
                  <Set>If #XMLIntBIsOnlyOpeningBalance Then "" Else $$CollectionField:$GUID:1:LedgerEntries</Set>
                  <SetAlways>Yes</SetAlways>
                  <XMLTag>&quot;BILLID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntBOverDueDays">
                  <Set>If #XMLIntBIsCleared Then "" Else ##SVCurrentDate - $BillDate</Set>
                  <XMLTag>&quot;OverDueDays&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntBIsRecievable">
                  <Set>$$IsDr:$ClosingBalance</Set>
                  <XMLTag>&quot;IsRecievable&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntBIsPayable">
                  <Set>NOT $$IsDr:$ClosingBalance</Set>
                  <XMLTag>&quot;IsPayable&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntBIsCleared">
                  <Set>Not $$IsEmpty:$ClearedOn</Set>
                  <XMLTag>&quot;IsCleared&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntBIsOnlyOpeningBalance">
                  <Set>$BillDate &#60; ($BooksFrom:Company:##SVCurrentCompany)</Set>
                  <XMLTag>&quot;IsOnlyOpeningBalance&quot;</XMLTag>
                  </FIELD>
                 
                     <FIELD NAME="XMLIntBCGSTAmount">
                  <Use>Number Field</Use>
                  <Set>$$CollectionField:$CGST:1:LedgerEntries</Set>
                  <Format>"Decimal:2"</Format>
                  <XMLTag>&quot;CGSTAmount&quot;</XMLTag>
                 </FIELD>
                 
                     <FIELD NAME="XMLIntBSGSTAmount">
                  <Use>Number Field</Use>
                  <Set>$$CollectionField:$SGST:1:LedgerEntries</Set>
                  <Format>"Decimal:2"</Format>
                  <XMLTag>&quot;SGSTAmount&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntBIGSTAmount">
                  <Use>Number Field</Use>
                  <Set>$$CollectionField:$IGST:1:LedgerEntries</Set>
                  <Format>"Decimal:2"</Format>
                  <XMLTag>&quot;IGSTAmount&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntBVATAmount">
                  <Use>Number Field</Use>
                  <Set>$$CollectionField:$VAT:1:LedgerEntries</Set>
                  <Format>"Decimal:2"</Format>
                  <XMLTag>&quot;VATAmount&quot;</XMLTag>
                 </FIELD>
                 
                 
                 <PART NAME="XMLIntBillsVoucher">
                  <TopLines>XMLIntBillsVoucher</TopLines>
                  <Repeat>XMLIntBillsVoucher:Ledger Entries</Repeat>
                  <Scrolled>Vertical</Scrolled>
                 </PART>
                 
                 <LINE NAME="XMLIntBillsVoucher">
                  <LeftFields>XMLIntBVDate,XMLIntBVPartyName,XMLIntBVPartyID,XMLIntBVVoucherType,XMLIntBVVoucherID, XMLIntBVAmount, XMLIntBVAmountType</LeftFields>
                  <XMLTag>&quot;Vouchers&quot;</XMLTag>
                  <RemoveIf>#XMLIntBGuid=$Guid</RemoveIf>
                 </LINE>
                  
                  <FIELD NAME="XMLIntBVDate">
                  <Set>$$DDMMYYDateFormat:$Date:"-"</Set>
                  <XMLTag>&quot;InvoiceDate&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntBVPartyName">
                  <Set>$PartyLedgerName</Set>
                  <XMLTag>&quot;PartyName&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntBVPartyID">
                  <Set>$Guid:Ledger:$PartyLedgerName</Set>
                  <XMLTag>&quot;PartyID&quot;</XMLTag>
                  </FIELD>
      
                  <FIELD NAME="XMLIntBVVoucherType">
                  <Set>$Parent:VoucherType:$VoucherTypeName</Set>
                  <XMLTag>&quot;VoucherName&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntBVVoucherID">
                  <Set>$guid</Set>
                  <XMLTag>&quot;VoucherID&quot;</XMLTag>
                  </FIELD>
                  
                  <FIELD NAME="XMLIntBVAmount">
                  <Type>Number</Type>
                  <Set>$Amount</Set>
                  <XMLTag>&quot;Amount&quot;</XMLTag>
                  <Format>"Decimal:2"</Format>
                  </FIELD>
      
                  <FIELD NAME="XMLIntBVAmountType">
                  <Set>If $$IsDr:$Amount Then "Dr" Else "Cr"</Set>
                  <XMLTag>&quot;AmountType&quot;</XMLTag>
                  </FIELD>
                  
                 <COLLECTION NAME="XMLIntBills">
                  <Collections>XMLIntListOfClearedBills,XMLIntListOfUnClearedBills</Collections>
                 </COLLECTION>
                 
                 <COLLECTION NAME="XMLIntListOfClearedBills">
                 <Use>FilterCollection</Use>
                  <Type>Bills</Type>
                  <BelongsTo>Yes</BelongsTo>
                  <Cleared>Yes</Cleared>
                 </COLLECTION>
              
                 
                 <COLLECTION NAME="XMLIntListOfUnClearedBills">
                 <Use>FilterCollection</Use>
                  <Type>Bills</Type>
                  <BelongsTo>Yes</BelongsTo>
                  <Cleared>No</Cleared>
                 </COLLECTION>

                  <COLLECTION NAME="FilterCollection">
                  <ParmVar>SVFromDate:Date:$$Date:""</ParmVar>
                  <ParmVar>SVToDate:Date:$$Date:""</ParmVar>
                  <Filter>InvoiceFilter5</Filter>
                 </COLLECTION>

                <System Type="Formulae" Name="InvoiceFilter5">$BillDate >= $$Date:"01-10-10" and $BillDate &#60;= $$Date:"01-11-30"</System>
                <System Type="Formulae" Name="IsReceivable1">$$IsDr:$Amount</System>
                <System Type="Formulae" Name="IsPayable1">!($$IsDr:$Amount)</System>
                <System Type="Formulae" Name="IsCGST1">($Name:Ledger:$LedgerName) Contains "CGST"</System>
                <System Type="Formulae" Name="IsSGST1">($Name:Ledger:$LedgerName) Contains "SGST"</System>
                <System Type="Formulae" Name="IsIGST1">($Name:Ledger:$LedgerName) Contains "IGST"</System>
                <System Type="Formulae" Name="IsVAT1">($Name:Ledger:$LedgerName) Contains "VAT"</System>

              </TDLMESSAGE>
              
              <TDLMESSAGE>
                  <OBJECT NAME="Voucher" ISINITIALIZE="Yes">
                      <LOCALFORMULA> CGST:$$FilterAmtTotal:LedgerEntries:IsCGST1:$Amount</LOCALFORMULA>
                      <LOCALFORMULA> SGST:$$FilterAmtTotal:LedgerEntries:IsSGST1:$Amount</LOCALFORMULA>
                      <LOCALFORMULA> IGST:$$FilterAmtTotal:LedgerEntries:IsIGST1:$Amount</LOCALFORMULA>
                      <LOCALFORMULA> VAT:$$FilterAmtTotal:LedgerEntries:IsVAT1:$Amount</LOCALFORMULA>
                  </OBJECT>
              </TDLMESSAGE>
          </TDL>
      </DESC>
  </BODY>
</ENVELOPE>`
)

  $("#balancesheetreq").val(
      `<ENVELOPE>
  <HEADER>
      <VERSION>1</VERSION>
      <TALLYREQUEST>Export</TALLYREQUEST>
      <TYPE>Data</TYPE>
      <ID>XMLIntBalanceSheet</ID>
  </HEADER>
  <BODY>
      <DESC>
          <STATICVARIABLES>
              <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
              <SVCurrentCompany>$$CurrentCompany</SVCurrentCompany><!--Company Name Input Field, Note: $$CurrentCompany is used to fetch data of current Active Company-->
              <SVFromDate>$$SystemPeriodFrom</SVFromDate><!--From Date Input Field, Note: $$SystemPeriodFrom Means Starting Date of Company-->
              <SVToDate>$$SystemPeriodTo</SVToDate><!--To Date Input Field, Note: $$SystemPeriodTo Means Starting Date of Company-->
              <SVPeriodicity>Monthly</SVPeriodicity>
          </STATICVARIABLES> 
          <TDL>  
              <TDLMESSAGE>
                 <REPORT NAME="XMLIntBalanceSheet">
                  <Forms>XMLIntBalanceSheet</Forms>
                 </REPORT>
                 
                 <FORM NAME="XMLIntBalanceSheet">
                  <TopParts>XMLIntBalanceSheetBody</TopParts>
                  <Buttons>ExportButton</Buttons>
                 </FORM>
                 
                 
                 <PART NAME="XMLIntBalanceSheetBody">
                  <TopLines>XMLIntBalanceSheetBody</TopLines>
                  <Repeat>XMLIntBalanceSheetBody:Periodic Details</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntBalanceSheetBody">
                  <LeftFields>XMLIntPLCmpGuid, XMLIntBSMonthName</LeftFields>
                  <XMLTag>&quot;MonthsBalanceSheet&quot;</XMLTag>
                  <Explode>XMLIntBalanceSLBody:Yes</Explode>
                  <Explode>XMLIntBalanceSABody:Yes</Explode>
                 </LINE>
                  <FIELD NAME="XMLIntPLCmpGuid">
                      <Use>Name Field</Use>
                      <Set>$$SprintF:"%s%s":@GUID:@DataNo</Set>
                      <LocalFormula>GUID:$Guid:Company:$$CurrentCompany</LocalFormula>
                      <LocalFormula>DataNo:$CompanyNumber:Company:$$CurrentCompany</LocalFormula>
                      <XMLTag>&quot;CompanyGUID&quot;</XMLTag>
                 </FIELD>
                 <FIELD NAME="XMLIntBSMonthName">
                  <Use>Name Field</Use>
                  <Set>$$String:@MonthName + "-" + $$String:@YearName</Set>
                  <LocalFormula>MonthName:$$FullMonthName:$$PeriodDateFrom</LocalFormula>
                  <LocalFormula>YearName:$$YearOfDate:$$PeriodDateFrom</LocalFormula>
                  <XMLTag>&quot;MonthName&quot;</XMLTag>
                 </FIELD>

                 <PART NAME="XMLIntBalanceSABody">
                  <TopLines>XMLIntBalanceSABody</TopLines>
                  <Repeat>XMLIntBalanceSABody:BS Assets</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntBalanceSABody">
                  <LeftFields>XMLIntBSAName, XMLIntBSAClosing</LeftFields>
                  <XMLTag>&quot;Assets&quot;</XMLTag>
                  <RemoveIf>$$IsEmpty:$BSClosing</RemoveIf>
                 </LINE>
                 


                 <FIELD NAME="XMLIntBSAName">
                  <Use>Name Field</Use>
                  <Set>$Name</Set>
                  <XMLTag>&quot;Name&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntBSAClosing">
                 <Type>Number</Type>
                  <Set>$$FromValue:@FromDate:$$ToValue:@ToDate:$BSClosing</Set>
                  <LocalFormula>FromDate:$$MonthStart:($$Date:#XMLIntBSMonthName)</LocalFormula>
                  <LocalFormula>ToDate:$$MonthEnd:($$Date:#XMLIntBSMonthName)</LocalFormula>
                  <XMLTag>&quot;Amount&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2, NoComma"</Format>
                 </FIELD>
                 
                 <COLLECTION NAME="Balance Sheet Template" IsModify="Yes">
                  <ParmVar>SVFromDate:Date:$$MonthStart:($$Date:#XMLIntBSMonthName)</ParmVar>
                  <ParmVar>SVToDate:Date:$$MonthEnd:($$Date:#XMLIntBSMonthName)</ParmVar>
                 </COLLECTION>
                 
                  <PART NAME="XMLIntBalanceSLBody">
                  <TopLines>XMLIntBalanceSLBody</TopLines>
                  <Repeat>XMLIntBalanceSLBody:BS Liabs</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntBalanceSLBody">
                  <LeftFields>XMLIntBSLName, XMLIntBSLClosing</LeftFields>
                  <XMLTag>&quot;Liablities&quot;</XMLTag>
                  <RemoveIf>$$IsEmpty:$BSClosing</RemoveIf>
                 </LINE>
                 
                 <FIELD NAME="XMLIntBSLName">
                  <Use>Name Field</Use>
                  <Set>$Name</Set>
                  <XMLTag>&quot;Name&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntBSLClosing">
                 <Type>Number</Type>
                  <Set>$$FromValue:@FromDate:$$ToValue:@ToDate:$BSClosing</Set>
                  <LocalFormula>FromDate:$$MonthStart:($$Date:#XMLIntBSMonthName)</LocalFormula>
                  <LocalFormula>ToDate:$$MonthEnd:($$Date:#XMLIntBSMonthName)</LocalFormula>
                  <XMLTag>&quot;Amount&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2, NoComma"</Format>
                 </FIELD>
                 
              </TDLMESSAGE>
          </TDL>
      </DESC>
  </BODY>
</ENVELOPE>`
  )

  $("#registerreq").val(
      `<ENVELOPE>
  <HEADER>
      <VERSION>1</VERSION>
      <TALLYREQUEST>Export</TALLYREQUEST>
      <TYPE>Data</TYPE>
      <ID>XMLIntVoucherReport</ID>
  </HEADER>
  <BODY>
      <DESC>
          <STATICVARIABLES>
              <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
              <SVCurrentCompany>$$CurrentCompany</SVCurrentCompany><!--Company Name Input Field, Note: $$CurrentCompany is used to fetch data of current Active Company-->
              <SVFromDate>$$SystemPeriodFrom</SVFromDate><!--From Date Input Field, Note: $$SystemPeriodFrom Means Starting Date of Company-->
              <SVToDate>$$SystemPeriodTo</SVToDate><!--To Date Input Field, Note: $$SystemPeriodTo Means Starting Date of Company-->
              <SVPeriodicity>Monthly</SVPeriodicity>
          </STATICVARIABLES> 
          <TDL>  
              <TDLMESSAGE>
                 <REPORT NAME="XMLIntVoucherReport">
                 <Variable>VoucherTypeName</Variable>
                  <Forms>XMLIntVoucherReport</Forms>
                  <Set>VoucherTypeName:"Sales"</Set><!--Value will be Sales in case of Sales Register and Purchase in case of Purchase Register-->
                 </REPORT>
                 
                 <FORM NAME="XMLIntVoucherReport">
                  <TopParts>XMLIntVoucherRBody</TopParts>
                  <Buttons>ExportButton</Buttons>
                 </FORM>
                 
                 <PART NAME="XMLIntVoucherRBody">
                  <TopLines>XMLIntVoucherRBody</TopLines>
                  <Repeat>XMLIntVoucherRBody:Periodic Details</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntVoucherRBody">
                  <LeftFields>XMLIntPLCmpGuid, XMLIntVRMonthName, XMLIntVRVCHName, XMLIntVRDebit, XMLIntVRCredit, XMLIntVRClosing</LeftFields>
                  <XMLTag>&quot;MonthsRegister&quot;</XMLTag>
                 </LINE>
                 
                 <FIELD NAME="XMLIntPLCmpGuid">
                      <Use>Name Field</Use>
                      <Set>$$SprintF:"%s%s":@GUID:@DataNo</Set>
                      <LocalFormula>GUID:$Guid:Company:$$CurrentCompany</LocalFormula>
                      <LocalFormula>DataNo:$CompanyNumber:Company:$$CurrentCompany</LocalFormula>
                      <XMLTag>&quot;CompanyGUID&quot;</XMLTag>
                 </FIELD>

                 <FIELD NAME="XMLIntVRMonthName">
                  <Use>Name Field</Use>
                  <Set>$$String:@MonthName + "-" + $$String:@YearName</Set>
                  <LocalFormula>MonthName:$$FullMonthName:$$PeriodDateFrom</LocalFormula>
                  <LocalFormula>YearName:$$YearOfDate:$$PeriodDateFrom</LocalFormula>
                  <XMLTag>&quot;MonthName&quot;</XMLTag>
                 </FIELD>
                     
                  <FIELD NAME="XMLIntVRVCHName">
                      <Use>Name Field</Use>
                      <Set>##VoucherTypeName</Set>
                      <XMLTag>&quot;VoucherTypeName&quot;</XMLTag>
                 </FIELD>

                 <FIELD NAME="XMLIntVRDebit">
                 <Type>Number</Type>
                  <Set>If $$IsDr:($TBalDebits:VoucherType:##VoucherTypeName) Then ($TBalDebits:VoucherType:##VoucherTypeName) Else 0</Set>
                  <XMLTag>&quot;Debit&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2, NoComma"</Format>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVRCredit">
                  <Type>Number</Type>
                  <Set>If $$IsDr:($TBalCredits:VoucherType:##VoucherTypeName) Then 0 Else ($TBalCredits:VoucherType:##VoucherTypeName)</Set>
                  <XMLTag>&quot;Credit&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2, NoComma"</Format>
                 </FIELD>
                 
                     <FIELD NAME="XMLIntVRClosing">
                  <Type>Amount</Type>
                  <Set>$TBalClosing:VoucherType:##VoucherTypeName</Set>
                  <XMLTag>&quot;Closing&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2, NoComma"</Format>
                 </FIELD>
                 
              </TDLMESSAGE>
          </TDL>
      </DESC>
  </BODY>
</ENVELOPE>`
  ) 

  $("#expensereportreq").val(`<ENVELOPE>
  <HEADER>
      <VERSION>1</VERSION>
      <TALLYREQUEST>Export</TALLYREQUEST>
      <TYPE>Data</TYPE>
      <ID>XMLIntExpenseReport</ID>
  </HEADER>
  <BODY>
      <DESC>
          <STATICVARIABLES>
              <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
              <SVCurrentCompany>$$CurrentCompany</SVCurrentCompany><!--Company Name Input Field, Note: $$CurrentCompany is used to fetch data of current Active Company-->
              <SVFromDate>$$SystemPeriodFrom</SVFromDate><!--From Date Input Field, Note: $$SystemPeriodFrom Means Starting Date of Company-->
              <SVToDate>$$SystemPeriodTo</SVToDate><!--To Date Input Field, Note: $$SystemPeriodTo Means Starting Date of Company-->
              <SVPeriodicity>Monthly</SVPeriodicity>
          </STATICVARIABLES> 
          <TDL>  
              <TDLMESSAGE>
                 <REPORT NAME="XMLIntExpenseReport">
                  <Forms>XMLIntExpenseReport</Forms>
                 </REPORT>
                 
                 <FORM NAME="XMLIntExpenseReport">
                  <TopParts>XMLIntVoucherRBody</TopParts>
                  <Buttons>ExportButton</Buttons>
                 </FORM>
                 
                 <PART NAME="XMLIntVoucherRBody">
                  <TopLines>XMLIntVoucherRBody</TopLines>
                  <Repeat>XMLIntVoucherRBody:Periodic Details</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntVoucherRBody">
                  <LeftFields>XMLIntPLCmpGuid, XMLIntVRMonthName, XMLIntVRDebit, XMLIntVRCredit, XMLIntVRClosing</LeftFields>
                  <XMLTag>&quot;MonthsExpenseReport&quot;</XMLTag>
                  <Explode>XMLIntExplode:Yes</Explode>
                 </LINE>
                  
                  <FIELD NAME="XMLIntPLCmpGuid">
                      <Use>Name Field</Use>
                      <Set>$$SprintF:"%s%s":@GUID:@DataNo</Set>
                      <LocalFormula>GUID:$Guid:Company:$$CurrentCompany</LocalFormula>
                      <LocalFormula>DataNo:$CompanyNumber:Company:$$CurrentCompany</LocalFormula>
                      <XMLTag>&quot;CompanyGUID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVRMonthName">
                  <Use>Name Field</Use>
                  <Set>$$String:@MonthName + "-" + $$String:@YearName</Set>
                  <LocalFormula>MonthName:$$FullMonthName:$$PeriodDateFrom</LocalFormula>
                  <LocalFormula>YearName:$$YearOfDate:$$PeriodDateFrom</LocalFormula>
                  <XMLTag>&quot;MonthName&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVRDebit">
                 <Type>Number</Type>
                  <Set>($DebitTotals:Group:$$GroupIndirectExpenses) + ($DebitTotals:Group:$$GroupDirectExpenses)</Set>
                  <XMLTag>&quot;Debit&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2, NoComma"</Format>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVRCredit">
                  <Type>Number</Type>
                  <Set>($CreditTotals:Group:$$GroupIndirectExpenses) + ($CreditTotals:Group:$$GroupDirectExpenses)</Set>
                  <XMLTag>&quot;Credit&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2, NoComma"</Format>
                 </FIELD>
                 
                     <FIELD NAME="XMLIntVRClosing">
                  <Type>Number</Type>
                  <Set>($BSClosing:Group:$$GroupIndirectExpenses) + ($BSClosing:Group:$$GroupDirectExpenses)</Set>
                  <XMLTag>&quot;Closing&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2, NoComma"</Format>
                 </FIELD>
                 
                 <PART NAME="XMLIntExplode">
                  <TopLines>XMLIntExplode</TopLines>
                  <Repeat>XMLIntExplode:XMLIntExpLedger</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntExplode">
                  <LeftFields>XMLIntEName, XMLIntEDebit, XMLIntECredit, XMLIntEClosing</LeftFields>
                  <XMLTag>&quot;Expenses&quot;</XMLTag>
                  <RemoveIf>$$IsEmpty:$pBSClosing</RemoveIf>
                 </LINE>
                 
                 <FIELD NAME="XMLIntEName">
                  <Use>Name Field</Use>
                  <Set>$Name</Set>
                  <XMLTag>&quot;ExpenseName&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntEDebit">
                 <Type>Number</Type>
                  <Set>$pDebitTotals</Set>
                  <XMLTag>&quot;Debit&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2, NoComma"</Format>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntECredit">
                  <Type>Number</Type>
                  <Set>$pCreditTotals</Set>
                  <XMLTag>&quot;Credit&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2, NoComma"</Format>
                 </FIELD>
                 
                     <FIELD NAME="XMLIntEClosing">
                  <Type>Number</Type>
                  <Set>$pBSClosing</Set>
                  <XMLTag>&quot;Closing&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2, NoComma"</Format>
                 </FIELD>
                 
                  <COLLECTION NAME="XMLIntExpLedger">
                  <ParmVar>SVFromDate1:Date:$$MonthStart:($$Date:#XMLIntVRMonthName)</ParmVar>
                  <ParmVar>SVToDate1:Date:$$MonthEnd:($$Date:#XMLIntVRMonthName)</ParmVar>
                  <Type>Ledger</Type>
                  <Compute>pDebitTotals:$$FromValue:##SVFromDate1:$$ToValue:##SVToDate1:$DebitTotals</Compute>
                  <Compute>pCreditTotals:$$FromValue:##SVFromDate1:$$ToValue:##SVToDate1:$CreditTotals</Compute>
                  <Compute>pBSClosing:$$FromValue:##SVFromDate1:$$ToValue:##SVToDate1:$BSClosing</Compute>
                  <Filter>IsExpense2</Filter>
                 </COLLECTION>
                 
                 <System Type="Formulae" Name="IsExpense2">$$IsBelongsTo:$$GroupIndirectExpenses Or  $$IsBelongsTo:$$GroupDirectExpenses</System>
                 
              </TDLMESSAGE>
          </TDL>
      </DESC>
  </BODY>
</ENVELOPE>`)

$("#inventoryreportreq").val(
  `<ENVELOPE>
  <HEADER>
      <VERSION>1</VERSION>
      <TALLYREQUEST>Export</TALLYREQUEST>
      <TYPE>Data</TYPE>
      <ID>XMLIntInventoryReport</ID>
  </HEADER>
  <BODY>
      <DESC>
          <STATICVARIABLES>
              <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
              <SVCurrentCompany>$$CurrentCompany</SVCurrentCompany><!--Company Name Input Field, Note: $$CurrentCompany is used to fetch data of current Active Company-->
          </STATICVARIABLES> 
          <TDL>  
              <TDLMESSAGE>
                 <REPORT NAME="XMLIntInventoryReport">
                  <Forms>XMLIntInventoryReport</Forms>
                 </REPORT>
                 
                 <FORM NAME="XMLIntInventoryReport">
                  <TopParts>XMLIntStockRBody</TopParts>
                  <Buttons>ExportButton</Buttons>
                 </FORM>
                 
                 <PART NAME="XMLIntStockRBody">
                  <TopLines>XMLIntStockRBody</TopLines>
                  <Repeat>XMLIntStockRBody:StockItem</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntStockRBody">
                  <LeftFields>XMLIntPLCmpGuid, XMLIntSRName, XMLIntSRItemCode, XMLIntSRItemUnit, XMLIntSRPurchasePrice, XMLIntSRSellingPrice, XMLIntSRClosingBalance, XMLIntSRClosingValue </LeftFields>
                  <XMLTag>&quot;InventoryReportStockItem&quot;</XMLTag>
                 </LINE>
                 
                  <FIELD NAME="XMLIntPLCmpGuid">
                      <Use>Name Field</Use>
                      <Set>$$SprintF:"%s%s":@GUID:@DataNo</Set>
                      <LocalFormula>GUID:$Guid:Company:$$CurrentCompany</LocalFormula>
                      <LocalFormula>DataNo:$CompanyNumber:Company:$$CurrentCompany</LocalFormula>
                      <XMLTag>&quot;CompanyGUID&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSRName">
                  <Use>Name Field</Use>
                  <Set>$Name</Set>
                  <XMLTag>&quot;Name&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSRItemCode">
                  <Set>$$Alias:1</Set>
                  <XMLTag>&quot;ItemCode&quot;</XMLTag>
                 </FIELD>
                 
                  <FIELD NAME="XMLIntSRItemUnit">
                  <Set>$BaseUnits</Set>
                  <XMLTag>&quot;ItemUnit&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSRPurchasePrice">
                  <Type>Number</Type>
                  <Set>$_InwardValue/$_InwardQuantity</Set>
                  <XMLTag>&quot;PurchasePrice&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2"</Format>
                 </FIELD>
                 
                     <FIELD NAME="XMLIntSRSellingPrice">
                  <Type>Number</Type>
                  <Set>$_OutwardValue/$_OutwardQuantity</Set>
                  <XMLTag>&quot;SellingPrice&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2"</Format>
                 </FIELD>
                 
                     <FIELD NAME="XMLIntSRClosingBalance">
                  <Type>Number</Type>
                  <Set>$ClosingBalance</Set>
                  <XMLTag>&quot;StockQuantity&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntSRClosingValue">
                  <Type>Number</Type>
                  <Set>$_ClosingValue</Set>
                  <XMLTag>&quot;Credit&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2"</Format>
                 </FIELD>
                 
              </TDLMESSAGE>
          </TDL>
      </DESC>
  </BODY>
</ENVELOPE>`
)

$("#profit_loss_req").val(
  `<ENVELOPE>
  <HEADER>
      <VERSION>1</VERSION>
      <TALLYREQUEST>Export</TALLYREQUEST>
      <TYPE>Data</TYPE>
      <ID>XMLIntProfitNLoss</ID>
  </HEADER>
  <BODY>
      <DESC>
          <STATICVARIABLES>
              <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
              <SVCurrentCompany>$$CurrentCompany</SVCurrentCompany><!--Company Name Input Field, Note: $$CurrentCompany is used to fetch data of current Active Company-->
              <SVFromDate>$$SystemPeriodFrom</SVFromDate><!--From Date Input Field, Note: $$SystemPeriodFrom Means Starting Date of Company-->
              <SVToDate>$$SystemPeriodTo</SVToDate><!--To Date Input Field, Note: $$SystemPeriodTo Means Starting Date of Company-->
          </STATICVARIABLES> 
          <TDL>  
              <TDLMESSAGE>
                 <REPORT NAME="XMLIntProfitNLoss">
                  <Forms>XMLIntProfitNLoss</Forms>
                 </REPORT>
                 
                 <FORM NAME="XMLIntProfitNLoss">
                  <TopParts>XMLIntProfitNLossBody</TopParts>
                  <Buttons>ExportButton</Buttons>
                 </FORM>
                 
                 
                   <PART NAME="XMLIntProfitNLossBody">
                  <TopLines>XMLIntProfitNLossBody</TopLines>
                  <Repeat>XMLIntProfitNLossBody:Periodic Details</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntProfitNLossBody">
                  <LeftFields>XMLIntPLCmpGuid, XMLIntPLMonthName</LeftFields>
                  <XMLTag>&quot;ProfitAndLoss&quot;</XMLTag>
                  <Explode>XMLIntProfitIBody:Yes</Explode>
                  <Explode>XMLIntProfitGrossProfitBody:Yes</Explode>
                  <Explode>XMLIntProfitEBody:Yes</Explode>
                  <Explode>XMLIntProfitNetProfit:Yes</Explode>
                 </LINE>
                 
                  <FIELD NAME="XMLIntPLCmpGuid">
                      <Use>Name Field</Use>
                      <Set>$$SprintF:"%s%s":@GUID:@DataNo</Set>
                      <LocalFormula>GUID:$Guid:Company:$$CurrentCompany</LocalFormula>
                      <LocalFormula>DataNo:$CompanyNumber:Company:$$CurrentCompany</LocalFormula>
                      <XMLTag>&quot;CompanyGUID&quot;</XMLTag>
                 </FIELD> 

                 <FIELD NAME="XMLIntPLMonthName">
                  <Use>Name Field</Use>
                  <Set>$$String:@MonthName + "-" + $$String:@YearName</Set>
                  <LocalFormula>MonthName:$$FullMonthName:$$PeriodDateFrom</LocalFormula>
                  <LocalFormula>YearName:$$YearOfDate:$$PeriodDateFrom</LocalFormula>
                  <XMLTag>&quot;MonthName&quot;</XMLTag>
                 </FIELD>
                 
                 <PART NAME="XMLIntProfitIBody">
                  <TopLines>XMLIntProfitIBody</TopLines>
                  <Repeat>XMLIntProfitIBody:PLIncome</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntProfitIBody">
                  <LeftFields>XMLIntPIName, XMLIntPIClosing</LeftFields>
                  <XMLTag>&quot;Income&quot;</XMLTag>
                  <RemoveIf>($$IsEmpty:#XMLIntPIClosing) Or $IsPLObject</RemoveIf>
                 </LINE>
                 
                 <FIELD NAME="XMLIntPIName">
                  <Use>Name Field</Use>
                  <Set>$Name</Set>
                  <XMLTag>&quot;Name&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntPIClosing">
                  <Type>Number</Type>
                  <Set>$$FromValue:@FromDate:$$ToValue:@ToDate:$BSClosing</Set>
                  <LocalFormula>FromDate:$$MonthStart:($$Date:#XMLIntPLMonthName)</LocalFormula>
                  <LocalFormula>ToDate:$$MonthEnd:($$Date:#XMLIntPLMonthName)</LocalFormula>
                  <XMLTag>&quot;Amount&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2, NoComma"</Format>
                 </FIELD>
                                    
                 <COLLECTION NAME="PLHorz Template" IsModify="Yes">
                  <ParmVar>SVFromDate:Date:$$MonthStart:($$Date:#XMLIntPLMonthName)</ParmVar>
                  <ParmVar>SVToDate:Date:$$MonthEnd:($$Date:#XMLIntPLMonthName)</ParmVar>
                 </COLLECTION>
                 
                 <COLLECTION NAME="GPBFasIncome" IsModify="Yes">
                  <Use>PLHorz Template</Use>
                 </COLLECTION>
                 
                 <PART NAME="XMLIntProfitGrossProfitBody">
                  <TopLines>XMLIntProfitGrossProfitBody</TopLines>
                  <Repeat>XMLIntProfitGrossProfitBody:GPBFasIncome</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntProfitGrossProfitBody">
                  <LeftFields>XMLIntPGPName, XMLIntPGPClosing</LeftFields>
                  <XMLTag>&quot;GrossProfit&quot;</XMLTag>
                  <RemoveIf>($$IsEmpty:#XMLIntPGPClosing)</RemoveIf>
                 </LINE>
                 
                 <FIELD NAME="XMLIntPGPName">
                  <Use>Name Field</Use>
                  <Set>$Name</Set>
                  <XMLTag>&quot;Name&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntPGPClosing">
                 <Type>Number</Type>
                  <Set>$$FromValue:@FromDate:$$ToValue:@ToDate:$BSClosing</Set>
                  <LocalFormula>FromDate:$$MonthStart:($$Date:#XMLIntPLMonthName)</LocalFormula>
                  <LocalFormula>ToDate:$$MonthEnd:($$Date:#XMLIntPLMonthName)</LocalFormula>
                  <XMLTag>&quot;Amount&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2, NoComma"</Format>
                 </FIELD>

                 
                 
                  <PART NAME="XMLIntProfitEBody">
                  <TopLines>XMLIntProfitEBody</TopLines>
                  <Repeat>XMLIntProfitEBody:PLExpenses</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntProfitEBody">
                  <LeftFields>XMLIntPEName, XMLIntPEClosing</LeftFields>
                  <XMLTag>&quot;Expense&quot;</XMLTag>
                  <RemoveIf>($$IsEmpty:#XMLIntPEClosing) or $IsPLObject</RemoveIf>
                 </LINE>
                 
                 <FIELD NAME="XMLIntPEName">
                  <Use>Name Field</Use>
                  <Set>$Name</Set>
                  <XMLTag>&quot;Name&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntPEClosing">
                 <Type>Number</Type>
                  <Set>$$FromValue:@FromDate:$$ToValue:@ToDate:$BSClosing</Set>
                  <LocalFormula>FromDate:$$MonthStart:($$Date:#XMLIntPLMonthName)</LocalFormula>
                  <LocalFormula>ToDate:$$MonthEnd:($$Date:#XMLIntPLMonthName)</LocalFormula>
                  <XMLTag>&quot;Amount&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2, NoComma"</Format>
                 </FIELD>
                 
                  <PART NAME="XMLIntProfitNetProfit">
                  <TopLines>XMLIntProfitNetProfit</TopLines>
                  <Repeat>XMLIntProfitNetProfit:ProfitAsIncome1</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntProfitNetProfit">
                  <LeftFields>XMLIntPNPName, XMLIntPNPClosing</LeftFields>
                  <XMLTag>&quot;NetProfit&quot;</XMLTag>
                  <RemoveIf>$$IsEmpty:#XMLIntPNPClosing</RemoveIf>
                 </LINE>
                 
                 <FIELD NAME="XMLIntPNPName">
                  <Use>Name Field</Use>
                  <Set>$Name</Set>
                  <XMLTag>&quot;Name&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntPNPClosing">
                 <Type>Number</Type>
                  <Set>$$FromValue:@FromDate:$$ToValue:@ToDate:$BSClosing</Set>
                  <LocalFormula>FromDate:$$MonthStart:($$Date:#XMLIntPLMonthName)</LocalFormula>
                  <LocalFormula>ToDate:$$MonthEnd:($$Date:#XMLIntPLMonthName)</LocalFormula>
                  <XMLTag>&quot;Amount&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2, NoComma"</Format>
                 </FIELD>
                 
                 <COLLECTION NAME="ProfitAsIncome1">
                  <Use>PLHorz Template</Use>
                  <Object>ProfitObject</Object>
                  <Fetch>Name, BSClosing, SortPosition, IsGPCOLine, IsGPBFLine ,IsPLObject</Fetch>
                 </COLLECTION>
                 
              </TDLMESSAGE>
          </TDL>
      </DESC>
  </BODY>
</ENVELOPE>`
)
$("#balancereq").val(
   `<ENVELOPE>
  <HEADER>
      <VERSION>1</VERSION>
      <TALLYREQUEST>Export</TALLYREQUEST>
      <TYPE>Data</TYPE>
      <ID>XMLIntBalance</ID>
  </HEADER>
  <BODY>
      <DESC>
          <STATICVARIABLES>
              <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
              <SVCurrentCompany>$$CurrentCompany</SVCurrentCompany><!--Company Name Input Field, Note: $$CurrentCompany is used to fetch data of current Active Company-->
              <SVFromDate>$$SystemPeriodFrom</SVFromDate><!--From Date Input Field, Note: $$SystemPeriodFrom Means Starting Date of Company-->
              <SVToDate>$$SystemPeriodTo</SVToDate><!--To Date Input Field, Note: $$SystemPeriodTo Means Starting Date of Company-->
              <SVPeriodicity>Daily</SVPeriodicity>
          </STATICVARIABLES> 
          <TDL>  
              <TDLMESSAGE>
                 <REPORT NAME="XMLIntBalance">
                  <Forms>XMLIntBalance</Forms>
                 </REPORT>
                 
                 <FORM NAME="XMLIntBalance">
                  <TopParts>XMLIntBalanceBody</TopParts>
                  <Buttons>ExportButton</Buttons>
                 </FORM>
                 
                 <PART NAME="XMLIntBalanceBody">
                  <TopLines>XMLIntBalanceBody</TopLines>
                  <Repeat>XMLIntBalanceBody:Periodic Details</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntBalanceBody">
                  <LeftFields>XMLIntPLCmpGuid, XMLIntBRDate, XMLIntBRCashInHand, XMLIntBRBankBalance, XMLIntBRBalance</LeftFields>
                  <XMLTag>&quot;DailyBalance&quot;</XMLTag>
                 </LINE>
                                    
                  <FIELD NAME="XMLIntPLCmpGuid">
                      <Use>Name Field</Use>
                      <Set>$$SprintF:"%s%s":@GUID:@DataNo</Set>
                      <LocalFormula>GUID:$Guid:Company:$$CurrentCompany</LocalFormula>
                      <LocalFormula>DataNo:$CompanyNumber:Company:$$CurrentCompany</LocalFormula>
                      <XMLTag>&quot;CompanyGUID&quot;</XMLTag>
                 </FIELD> 
                 
                 <FIELD NAME="XMLIntBRDate">
                  <Use>Name Field</Use>
                  <Set>If $$Line=1 Then ##SVFROMDATE  Else $$PrevObj:##SVFROMDATE + ($$Line-1)</Set>
                  <XMLTag>&quot;Date&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntBRCashInHand">
                 <Type>Number</Type>
                  <Set>$$FromValue:#XMLIntBRDate:$$ToValue:#XMLIntBRDate:$ClosingBalance:Group:$$GroupCash</Set>
                  <XMLTag>&quot;CashInHand&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2, NoComma"</Format>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntBRBankBalance">
                  <Type>Number</Type>
                  <Set>$$FromValue:#XMLIntBRDate:$$ToValue:#XMLIntBRDate:$ClosingBalance:Group:$$GroupBank</Set>
                  <XMLTag>&quot;BankBalance&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2, NoComma"</Format>
                 </FIELD>
                 
                     <FIELD NAME="XMLIntBRBalance">
                  <Type>Number</Type>
                  <Set>#XMLIntBRCashInHand + #XMLIntBRBankBalance</Set>
                  <XMLTag>&quot;Balance&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2, NoComma"</Format>
                 </FIELD>
                 
              </TDLMESSAGE>
          </TDL>
      </DESC>
  </BODY>
</ENVELOPE>`
)

$("#cashflowreq").val(
    `<ENVELOPE>
  <HEADER>
      <VERSION>1</VERSION>
      <TALLYREQUEST>Export</TALLYREQUEST>
      <TYPE>Data</TYPE>
      <ID>XMLIntCashFlow</ID>
  </HEADER>
  <BODY>
      <DESC>
          <STATICVARIABLES>
              <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
              <SVCurrentCompany>$$CurrentCompany</SVCurrentCompany><!--Company Name Input Field, Note: $$CurrentCompany is used to fetch data of current Active Company-->
              <SVFromDate>$$SystemPeriodFrom</SVFromDate><!--From Date Input Field, Note: $$SystemPeriodFrom Means Starting Date of Company-->
              <SVToDate>$$SystemPeriodTo</SVToDate><!--To Date Input Field, Note: $$SystemPeriodTo Means Starting Date of Company-->
              <SVPeriodicity>Monthly</SVPeriodicity>
          </STATICVARIABLES> 
          <TDL>  
              <TDLMESSAGE>
                 <REPORT NAME="XMLIntCashFlow">
                  <Forms>XMLIntCashFlow</Forms>
                 </REPORT>
                 
                 <FORM NAME="XMLIntCashFlow">
                  <TopParts>XMLIntCashFlowRBody</TopParts>
                  <Buttons>ExportButton</Buttons>
                 </FORM>
                 
                 <PART NAME="XMLIntCashFlowRBody">
                  <TopLines>XMLIntCashFlowRBody</TopLines>
                  <Repeat>XMLIntCashFlowRBody:Periodic Details</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntCashFlowRBody">
                  <LeftFields>XMLIntPLCmpGuid, XMLIntVRMonthName, XMLIntVRDebit, XMLIntVRCredit, XMLIntVRClosing</LeftFields>
                  <XMLTag>&quot;MonthlyCashFlow&quot;</XMLTag>
                  <Explode>XMLIntCashFlowExplodeInFlow:Yes</Explode>
                  <Explode>XMLIntCashFlowExplodeOutFlow:Yes</Explode>
                 </LINE>
                 
                  <FIELD NAME="XMLIntPLCmpGuid">
                      <Use>Name Field</Use>
                      <Set>$$SprintF:"%s%s":@GUID:@DataNo</Set>
                      <LocalFormula>GUID:$Guid:Company:$$CurrentCompany</LocalFormula>
                      <LocalFormula>DataNo:$CompanyNumber:Company:$$CurrentCompany</LocalFormula>
                      <XMLTag>&quot;CompanyGUID&quot;</XMLTag>
                 </FIELD> 

                 <FIELD NAME="XMLIntVRMonthName">
                  <Use>Name Field</Use>
                  <Set>$$String:@MonthName + "-" + $$String:@YearName</Set>
                  <LocalFormula>MonthName:$$FullMonthName:$$PeriodDateFrom</LocalFormula>
                  <LocalFormula>YearName:$$YearOfDate:$$PeriodDateFrom</LocalFormula>
                  <XMLTag>&quot;MonthName&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVRDebit">
                 <Type>Number</Type>
                  <Set>If $$IsDr:($CashInFlow:Company:$$CurrentCompany) Then ($CashInFlow:Company:$$CurrentCompany) Else 0</Set>
                  <XMLTag>&quot;Debit&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2, NoComma"</Format>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVRCredit">
                  <Type>Number</Type>
                  <Set>If $$IsDr:($CashOutFlow:Company:$$CurrentCompany) Then 0 Else ($CashOutFlow:Company:$$CurrentCompany)</Set>
                  <XMLTag>&quot;Credit&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2, NoComma"</Format>
                 </FIELD>
                 
                     <FIELD NAME="XMLIntVRClosing">
                  <Type>Amount</Type>
                  <Set>($$NettAmount:@CashInFlow:@CashOutFlow)</Set>
                  <LocalFormula>CashInFlow:$CashInFlow:Company:$$CurrentCompany</LocalFormula>
                  <LocalFormula>CashOutFlow:$CashOutFlow:Company:$$CurrentCompany</LocalFormula>
                  <XMLTag>&quot;Closing&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2, NoComma"</Format>
                 </FIELD>
                 
                     <PART NAME="XMLIntCashFlowExplodeInFlow">
                  <TopLines>XMLIntCashFlowExplodeInFlow</TopLines>
                  <Repeat>XMLIntCashFlowExplodeInFlow:CashFlowGroups1</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntCashFlowExplodeInFlow">
                  <LeftFields>XMLIntCInFlowName, XMLIntCInFlowAmount</LeftFields>
                  <XMLTag>&quot;InFlow&quot;</XMLTag>
                  <RemoveIf>$$IsEmpty:$_CashInFlowValue1</RemoveIf>
                 </LINE>
                 
                 <FIELD NAME="XMLIntCInFlowName">
                  <Use>Name Field</Use>
                  <Set>$$Name</Set>
                  <XMLTag>&quot;ExpenseName&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntCInFlowAmount">
                 <Type>Number</Type>
                  <Set>$_CashInFlowValue1</Set>
                  <XMLTag>&quot;Amount&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2, NoComma"</Format>
                 </FIELD>
                 
                 <PART NAME="XMLIntCashFlowExplodeOutFlow">
                  <TopLines>XMLIntCashFlowExplodeOutFlow</TopLines>
                  <Repeat>XMLIntCashFlowExplodeOutFlow:CashFlowGroups1</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntCashFlowExplodeOutFlow">
                  <LeftFields>XMLIntCOutFlowName, XMLIntCOutFlowAmount</LeftFields>
                  <XMLTag>&quot;OutFlow&quot;</XMLTag>
                  <RemoveIf>$$IsEmpty:$_CashOutFlowValue1</RemoveIf>
                 </LINE>
                 
                 <FIELD NAME="XMLIntCOutFlowName">
                  <Use>Name Field</Use>
                  <Set>$$Name</Set>
                  <XMLTag>&quot;ExpenseName&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntCOutFlowAmount">
                 <Type>Number</Type>
                  <Set>$_CashOutFlowValue1</Set>
                  <XMLTag>&quot;Amount&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2, NoComma"</Format>
                 </FIELD>
                 
                 <COLLECTION NAME="CashFlowGroups1">
                  <ParmVar>SVFromDate1:Date:$$MonthStart:($$Date:#XMLIntVRMonthName)</ParmVar>
                  <ParmVar>SVToDate1:Date:$$MonthEnd:($$Date:#XMLIntVRMonthName)</ParmVar>
                  <Use>CashFlowGroups</Use>
                  <Compute>_CashInFlowValue1:$$FromValue:##SVFromDate1:$$ToValue:##SVToDate1:$CashInFlow</Compute>
                  <Compute>_CashOutFlowValue1:$$FromValue:##SVFromDate1:$$ToValue:##SVToDate1:$CashOutFlow</Compute>
                 </COLLECTION>
                 
                 
              </TDLMESSAGE>
          </TDL>
      </DESC>
  </BODY>
</ENVELOPE>`
)

$("#registerdailyreq").val(
    `<ENVELOPE>
  <HEADER>
      <VERSION>1</VERSION>
      <TALLYREQUEST>Export</TALLYREQUEST>
      <TYPE>Data</TYPE>
      <ID>XMLIntSVoucherReport</ID>
  </HEADER>
  <BODY>
      <DESC>
          <STATICVARIABLES>
              <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
              <SVCurrentCompany>$$CurrentCompany</SVCurrentCompany><!--Company Name Input Field, Note: $$CurrentCompany is used to fetch data of current Active Company-->
              <SVFromDate>$$SystemPeriodFrom</SVFromDate><!--From Date Input Field, Note: $$SystemPeriodFrom Means Starting Date of Company-->
              <SVToDate>$$SystemPeriodTo</SVToDate><!--To Date Input Field, Note: $$SystemPeriodTo Means Starting Date of Company-->
              <SVPeriodicity>Daily</SVPeriodicity>
          </STATICVARIABLES> 
          <TDL>  
              <TDLMESSAGE>
                 <REPORT NAME="XMLIntSVoucherReport">
                 <Variable>VoucherTypeName</Variable>
                  <Forms>XMLIntSVoucherReport</Forms>
                  <Set>SVPeriodicity:"Daily"</Set>
                  <Set>VoucherTypeName:"Sales"</Set><!--Value will be Sales in case of Sales Register and Purchase in case of Purchase Register-->
                 </REPORT>
                 
                 <FORM NAME="XMLIntSVoucherReport">
                  <TopParts>XMLIntSVoucherBody</TopParts>
                  <Buttons>ExportButton</Buttons>
                 </FORM>
                 
                 <PART NAME="XMLIntSVoucherBody">
                  <TopLines>XMLIntSVoucherBody</TopLines>
                  <Repeat>XMLIntSVoucherBody:XMLIntDailyColl</Repeat>
                  <Scrolled>Vertical</Scrolled>
                  <Width>100% Page</Width>
                  <Height>100% Page</Height>
                 </PART>
                 
                 <LINE NAME="XMLIntSVoucherBody">
                  <LeftFields>XMLIntPLCmpGuid, XMLIntVRMonthName, XMLIntVRDebit, XMLIntVRCredit, XMLIntVRClosing</LeftFields>
                  <XMLTag>&quot;DailyRegister&quot;</XMLTag>
                 </LINE>
                  
                  <FIELD NAME="XMLIntPLCmpGuid">
                      <Use>Name Field</Use>
                      <Set>$$SprintF:"%s%s":@GUID:@DataNo</Set>
                      <LocalFormula>GUID:$Guid:Company:$$CurrentCompany</LocalFormula>
                      <LocalFormula>DataNo:$CompanyNumber:Company:$$CurrentCompany</LocalFormula>
                      <XMLTag>&quot;CompanyGUID&quot;</XMLTag>
                 </FIELD>

                 <FIELD NAME="XMLIntVRMonthName">
                  <Use>Name Field</Use>
                  <Set>If $$Line=1 Then ##SVFROMDATE  Else $$PrevObj:##SVFROMDATE + ($$Line-1)</Set>
                  <XMLTag>&quot;Date&quot;</XMLTag>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVRDebit">
                 <Type>Number</Type>
                  <Set>If $$IsDr:($TBalDebits:VoucherType:##VoucherTypeName) Then $$FromValue:#XMLIntVRMonthName:$$ToValue:#XMLIntVRMonthName:($TBalDebits:VoucherType:##VoucherTypeName) Else 0</Set>
                  <XMLTag>&quot;Debit&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2, NoComma"</Format>
                 </FIELD>
                 
                 <FIELD NAME="XMLIntVRCredit">
                  <Type>Number</Type>
                  <Set>If $$IsDr:($TBalCredits:VoucherType:##VoucherTypeName) Then 0 Else $$FromValue:#XMLIntVRMonthName:$$ToValue:#XMLIntVRMonthName:($TBalCredits:VoucherType:##VoucherTypeName)</Set>
                  <XMLTag>&quot;Credit&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2, NoComma"</Format>
                 </FIELD>
                 
                     <FIELD NAME="XMLIntVRClosing">
                  <Type>Amount</Type>
                  <Set>$$FromValue:#XMLIntVRMonthName:$$ToValue:#XMLIntVRMonthName:$TBalClosing:VoucherType:##VoucherTypeName</Set>
                  <XMLTag>&quot;Closing&quot;</XMLTag>
                  <Format>"NoZero, Decimal:2, NoComma"</Format>
                 </FIELD>
                 
                 <COLLECTION NAME="XMLIntDailyColl">
                  <Type>Period</Type>
                  <Repeat>Day</Repeat>
                  <BelongsTo>Yes</BelongsTo>
                 </COLLECTION>
                 
                 
              </TDLMESSAGE>
          </TDL>
      </DESC>
  </BODY>
</ENVELOPE>`
)

$(".toggle-accordion-header").on("click", function (e) {
  $(this).parents(".row").next().slideToggle();
  $(this).toggleClass("close");
});
});


var xmlObj;
function onDirSubmit() {
    var xmlString = $("#xmlentry").val();
    console.log('Dir coming:- ' + xmlString);
    $.ajax({
        method: "POST",
        url: "/api/v2",
        data: {
            xmld: xmlString
        },
        success: function (res) {
            console.log('result ' + res);
            if (res.status == "success") {
                $("#msg").html('<div class="alert alert-success">' + res.message + ' ' + res.count + '</div>')
            } else {
                $("#msg").html('<div class="alert alert-danger">' + res.message + '</div>')
            }
        }
    });  
}

function onXMLSubmit() {
    var xmlString = $("#xmlentry").val();    
    if (xmlString == "") {
        return false;
    }   
    xmlObj = parseXml(xmlString);
    console.log('data ' + xmlObj);


    $.ajax({
        method: "POST",
        url: "/api/v1",
        data: {
            xmld: xmlString
        },
        success: function (res) {
            console.log('result ' + res);
            if (res.status == "success") {
                $("#msg").html('<div class="alert alert-success">' + res.message + ' ' + res.count + '</div>')
            } else {
                $("#msg").html('<div class="alert alert-danger">' + res.message + '</div>')
            }
        }
    });    
}

function onProcessAllRequest() {
    var arr = [];
    arr.push($("#opencompreq").val());
    arr.push($("#ledgergrpreq").val());
    arr.push($("#ledgerreq").val());
    arr.push($("#stockgrpreq").val());
    arr.push($("#stockcatreq").val());
    arr.push($("#stockunitreq").val());
    arr.push($("#stockitemreq").val());
    arr.push($("#godownreq").val());
    arr.push($("#vouchertypereq").val());
    arr.push($("#voucherreq").val());
    arr.push($("#billreq").val());
    arr.push($("#balancesheetreq").val());
    arr.push($("#registerreq").val());
    arr.push($("#expensereportreq").val());
    arr.push($("#inventoryreportreq").val());
    arr.push($("#profit_loss_req").val());
    arr.push($("#balancereq").val());
    arr.push($("#cashflowreq").val());
    arr.push($("#registerdailyreq").val());
    var xmlString = $("#opencompreq").val();    
    if (xmlString == "") {
        return false;
    }   
    xmlObj = parseXml(xmlString);
    console.log('data ' + xmlObj);
    console.log('data ' + arr.length);   
    $.ajax({
        method: "POST",
        url: "/tally",
        data: {
            data: arr
        },
        success: function (res) {
            console.log('result ');
            console.log('result ' + res.status);
            $("#opencompres").val(res.data[0]);
            $("#ledgergrpres").val(res.data[1]);
            $("#ledgerres").val(res.data[2]);
            $("#stockgrpres").val(res.data[3]);
            $("#stockcatres").val(res.data[4]);
            $("#stockunitres").val(res.data[5]);
            $("#stockitemres").val(res.data[6]);
            $("#godownres").val(res.data[7]);
            $("#vouchertyperes").val(res.data[8]);
            $("#voucherres").val(res.data[9]);
            $("#billres").val(res.data[10]);
            $("#balancesheetres").val(res.data[11]);
            $("#registerres").val(res.data[12]);
            $("#expensereportres").val(res.data[13]);
            $("#inventoryreportres").val(res.data[14]);
            $("#profit_loss_res").val(res.data[15]);
            $("#balanceres").val(res.data[16]);
            $("#cashflowres").val(res.data[17]);
            $("#registerdailyres").val(res.data[18]);
        }
    });     
        
}

