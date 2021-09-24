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
import { ReportExpenseReportExpenses } from "./ReportExpenseReportExpenses";

@Index("Report_ExpenseReport_pkey", ["id"], { unique: true })
@Entity("Report_ExpenseReport", { schema: "public" })
export class ReportExpenseReport {
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
    (masterCompany) => masterCompany.reportExpenseReports
  )
  @JoinColumn([{ name: "companyguid", referencedColumnName: "COMPANYGUID" }])
  COMPANYGUID: MasterCompany;

  @OneToMany(
    () => ReportExpenseReportExpenses,
    (reportExpenseReportExpenses) => reportExpenseReportExpenses.reportExpense,
    { cascade: true, eager: true }
  )
  EXPENSES: ReportExpenseReportExpenses[];
}
