import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MasterCompany } from "./MasterCompany";
import { ReportBalanceSheet } from "./ReportBalanceSheet";

@Index("Report_BalanceSheet_Liabilities_pkey", ["id"], { unique: true })
@Entity("Report_BalanceSheet_Liabilities", { schema: "public" })
export class ReportBalanceSheetLiabilities {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name" })
  NAME: string;

  @Column("character varying", { name: "amount", nullable: true })
  AMOUNT: number | null;

  @ManyToOne(
    () => ReportBalanceSheet,
    (reportBalanceSheet) => reportBalanceSheet.id
  )
  @JoinColumn([{ name: "balancesheet_id", referencedColumnName: "id" }])
  balanceSheetId: ReportBalanceSheet;
}
