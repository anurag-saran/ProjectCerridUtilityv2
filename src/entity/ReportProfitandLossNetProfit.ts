import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ReportProfitandLoss } from "./ReportProfitandLoss";

@Index("Report_ProfitandLoss_NetProfit_pkey", ["id"], { unique: true })
@Entity("Report_ProfitandLoss_NetProfit", { schema: "public" })
export class ReportProfitandLossNetProfit {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name" })
  NAME: string;

  @Column("character varying", { name: "amount", nullable: true })
  AMOUNT: number | null;

  @ManyToOne(
    () => ReportProfitandLoss,
    (reportProfitandLoss) => reportProfitandLoss.id
  )
  @JoinColumn([{ name: "profit_loss_id", referencedColumnName: "id" }])
  profitLossId: ReportProfitandLoss;
}
