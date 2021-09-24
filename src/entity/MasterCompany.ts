import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MasterGodown } from "./MasterGodown";
import { MasterLedger } from "./MasterLedger";
import { MasterLedgerGrp } from "./MasterLedgerGrp";
import { MasterStockCategory } from "./MasterStockCategory";
import { MasterStockGrp } from "./MasterStockGrp";
import { MasterStockItem } from "./MasterStockItem";
import { MasterStockUnit } from "./MasterStockUnit";
import { MasterVoucherType } from "./MasterVoucherType";
import { ReportBalance } from "./ReportBalance";
import { ReportBalanceSheet } from "./ReportBalanceSheet";
import { ReportBills } from "./ReportBills";
import { ReportCashFlow } from "./ReportCashFlow";
import { ReportExpenseReport } from "./ReportExpenseReport";
import { ReportInventoryReport } from "./ReportInventoryReport";
import { ReportProfitandLoss } from "./ReportProfitandLoss";
import { ReportRegister } from "./ReportRegister";
import { ReportRegisterDaily } from "./ReportRegisterDaily";
import { Vouchers } from "./Vouchers";

@Index("Master_Company_guid_key", ["COMPANYGUID"], { unique: true })
@Index("Master_Company_pkey", ["id"], { unique: true })
@Entity("Master_Company", { schema: "public" })
export class MasterCompany {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "guid", nullable: true, unique: true })
  COMPANYGUID: string | null;

  @Column("character varying", { name: "name" })
  COMPANYNAME: string;

  @Column("character varying", { name: "adress", nullable: true })
  ADDRESS: string | null;

  @Column("character varying", { name: "statename", nullable: true })
  STATENAME: string | null;

  @Column("character varying", { name: "countryname", nullable: true })
  COUNTRYNAME: string | null;

  @Column("character varying", { name: "telno", nullable: true })
  TELNO: string | null;

  @Column("character varying", { name: "email", nullable: true })
  EMAIL: string | null;

  @Column("date", { name: "financialperiodfromdate", nullable: true })
  FINANCIALPERIODFROMDATE: string | null;

  @Column("date", { name: "booksbeginningfromdate", nullable: true })
  BOOKSBEGINNINGFROMDATE: string | null;

  @Column("character varying", { name: "currency", nullable: true })
  CURRENCY: string | null;

  @Column("character varying", { name: "gstin", nullable: true })
  GSTIN: string | null;

  @Column("character varying", { name: "panno", nullable: true })
  PANNO: string | null;

  @Column("date", { name: "startingfrom", nullable: true })
  STARTINGFROM: string | null;

  @Column("integer", { name: "numvouchers", nullable: true })
  numvouchers: number | null;

  @Column("integer", { name: "alterid" })
  alterid: number | 0;

  @OneToMany(() => MasterGodown, (masterGodown) => masterGodown.COMPANYGUID)
  masterGodowns: MasterGodown[];

  @OneToMany(() => MasterLedger, (masterLedger) => masterLedger.COMPANYGUID)
  masterLedgers: MasterLedger[];

  @OneToMany(
    () => MasterLedgerGrp,
    (masterLedgerGrp) => masterLedgerGrp.COMPANYGUID
  )
  masterLedgerGrps: MasterLedgerGrp[];

  @OneToMany(
    () => MasterStockCategory,
    (masterStockCategory) => masterStockCategory.COMPANYGUID
  )
  masterStockCategories: MasterStockCategory[];

  @OneToMany(
    () => MasterStockGrp,
    (masterStockGrp) => masterStockGrp.COMPANYGUID
  )
  masterStockGrps: MasterStockGrp[];

  @OneToMany(
    () => MasterStockItem,
    (masterStockItem) => masterStockItem.COMPANYGUID
  )
  masterStockItems: MasterStockItem[];

  @OneToMany(
    () => MasterStockUnit,
    (masterStockUnit) => masterStockUnit.COMPANYGUID
  )
  masterStockUnits: MasterStockUnit[];

  @OneToMany(
    () => MasterVoucherType,
    (masterVoucherType) => masterVoucherType.COMPANYGUID
  )
  masterVoucherTypes: MasterVoucherType[];

  @OneToMany(() => ReportBalance, (reportBalance) => reportBalance.COMPANYGUID)
  reportBalances: ReportBalance[];

  @OneToMany(
    () => ReportBalanceSheet,
    (reportBalanceSheet) => reportBalanceSheet.COMPANYGUID
  )
  reportBalanceSheets: ReportBalanceSheet[];

  @OneToMany(() => ReportBills, (reportBills) => reportBills.COMPANYGUID)
  reportBills: ReportBills[];

  @OneToMany(
    () => ReportCashFlow,
    (reportCashFlow) => reportCashFlow.COMPANYGUID
  )
  reportCashFlows: ReportCashFlow[];

  @OneToMany(
    () => ReportExpenseReport,
    (reportExpenseReport) => reportExpenseReport.COMPANYGUID
  )
  reportExpenseReports: ReportExpenseReport[];

  @OneToMany(
    () => ReportInventoryReport,
    (reportInventoryReport) => reportInventoryReport.COMPANYGUID
  )
  reportInventoryReports: ReportInventoryReport[];

  @OneToMany(
    () => ReportProfitandLoss,
    (reportProfitandLoss) => reportProfitandLoss.COMPANYGUID
  )
  reportProfitandLosses: ReportProfitandLoss[];

  @OneToMany(
    () => ReportRegister,
    (reportRegister) => reportRegister.COMPANYGUID
  )
  reportRegisters: ReportRegister[];

  @OneToMany(
    () => ReportRegisterDaily,
    (reportRegisterDaily) => reportRegisterDaily.COMPANYGUID
  )
  reportRegisterDailies: ReportRegisterDaily[];

  @OneToMany(() => Vouchers, (vouchers) => vouchers.COMPANYGUID)
  vouchers: Vouchers[];
}
