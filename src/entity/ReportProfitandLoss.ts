import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MasterCompany } from "./MasterCompany";
import { ReportProfitandLossExpense } from "./ReportProfitandLossExpense";
import { ReportProfitandLossGrossProfit } from "./ReportProfitandLossGrossProfit";
import { ReportProfitandLossIncome } from "./ReportProfitandLossIncome";
import { ReportProfitandLossNetProfit } from "./ReportProfitandLossNetProfit";

@Index("Report_ProfitandLoss_pkey", ["id"], { unique: true })
@Entity("Report_ProfitandLoss", { schema: "public" })
export class ReportProfitandLoss {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "monthname" })
  MONTHNAME: string;

  @ManyToOne(
    () => MasterCompany,
    (masterCompany) => masterCompany.reportProfitandLosses
  )
  @JoinColumn([{ name: "companyguid", referencedColumnName: "COMPANYGUID" }])
  COMPANYGUID: MasterCompany;

  @OneToMany(
    () => ReportProfitandLossIncome,
    (reportProfitandLossIncome) => reportProfitandLossIncome.profitLossId,
    { cascade: true, eager: true }
  )
  INCOME: ReportProfitandLossIncome[];

  @OneToMany(
    () => ReportProfitandLossExpense,
    (reportProfitandLossExpense) => reportProfitandLossExpense.profitLossId,
    { cascade: true, eager: true }
  )
  EXPENSE: ReportProfitandLossExpense[];

  @OneToMany(
    () => ReportProfitandLossGrossProfit,
    (reportProfitandLossGrossProfit) => reportProfitandLossGrossProfit.profitLossId,
    { cascade: true, eager: true }
  )
  GROSSPROFIT: ReportProfitandLossGrossProfit[];

  @OneToMany(
    () => ReportProfitandLossNetProfit,
    (reportProfitandLossNetProfit) => reportProfitandLossNetProfit.profitLossId,
    { cascade: true, eager: true }
  )
  NETPROFIT: ReportProfitandLossNetProfit[];
}
