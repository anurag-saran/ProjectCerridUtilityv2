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
import { ReportCashFlowInFlow } from "./ReportCashFlowInFlow";
import { ReportCashFlowOutFlow } from "./ReportCashFlowOutFlow";

@Index("Report_CashFlow_pkey", ["id"], { unique: true })
@Entity("Report_CashFlow", { schema: "public" })
export class ReportCashFlow {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "monthname" })
  MONTHNAME: string;

  @Column("character varying", { name: "debit", nullable: true })
  DEBIT: number | null;

  @Column("character varying", { name: "credit", nullable: true })
  CREDIT: number | null;

  @Column("character varying", { name: "closing", nullable: true })
  CLOSING: number | null;

  @ManyToOne(
    () => MasterCompany,
    (masterCompany) => masterCompany.reportCashFlows
  )
  @JoinColumn([{ name: "companyguid", referencedColumnName: "COMPANYGUID" }])
  COMPANYGUID: MasterCompany;

  @OneToMany(
    () => ReportCashFlowInFlow,
    (reportCashFlowInFlow) => reportCashFlowInFlow.MONTHNAME,
    { cascade: true, eager: true }
  )
  INFLOW: ReportCashFlowInFlow[];

  @OneToMany(
    () => ReportCashFlowOutFlow,
    (reportCashFlowOutFlow) => reportCashFlowOutFlow.MONTHNAME,
    { cascade: true, eager: true }
  )
  OUTFLOW: ReportCashFlowOutFlow[];
}
