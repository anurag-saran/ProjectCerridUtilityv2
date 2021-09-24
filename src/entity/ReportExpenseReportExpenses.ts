import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MasterCompany } from "./MasterCompany";
import { ReportExpenseReport } from "./ReportExpenseReport";

@Index("Report_ExpenseReport_Expenses_pkey", ["id"], { unique: true })
@Entity("Report_ExpenseReport_Expenses", { schema: "public" })
export class ReportExpenseReportExpenses {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "monthname" })
  EXPENSENAME: string;

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

  @ManyToOne(
    () => ReportExpenseReport,
    (reportExpenseReport) => reportExpenseReport.id
  )
  @JoinColumn([{ name: "report_expense_id", referencedColumnName: "id" }])
  reportExpense: ReportExpenseReport;
}
