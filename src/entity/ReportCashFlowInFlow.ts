import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ReportCashFlow } from "./ReportCashFlow";

@Index("Report_CashFlow_InFlow_pkey", ["id"], { unique: true })
@Entity("Report_CashFlow_InFlow", { schema: "public" })
export class ReportCashFlowInFlow {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "expensename" })
  EXPENSENAME: string;

  @Column("character varying", { name: "amount", nullable: true })
  AMOUNT: number | null;

  @ManyToOne(
    () => ReportCashFlow,
    (reportCashFlow) => reportCashFlow.MONTHNAME
  )
  @JoinColumn([{ name: "monthname", referencedColumnName: "MONTHNAME" }])
  MONTHNAME: ReportCashFlow;
}
