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
import { ReportBalanceSheetAssest } from "./ReportBalanceSheetAssest";
import { ReportBalanceSheetLiabilities } from "./ReportBalanceSheetLiabilities";

@Index("Report_BalanceSheet_pkey", ["id"], { unique: true })
@Entity("Report_BalanceSheet", { schema: "public" })
export class ReportBalanceSheet {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "monthname" })
  MONTHNAME: string;

  @ManyToOne(
    () => MasterCompany,
    (masterCompany) => masterCompany.reportBalanceSheets
  )
  @JoinColumn([{ name: "companyguid", referencedColumnName: "COMPANYGUID" }])
  COMPANYGUID: MasterCompany;

  @OneToMany(
    () => ReportBalanceSheetAssest,
    (reportBalanceSheetAssest) => reportBalanceSheetAssest.balanceSheetId,
    { cascade: true, eager: true }
  )
  ASSETS: ReportBalanceSheetAssest[];

  @OneToMany(
    () => ReportBalanceSheetLiabilities,
    (reportBalanceSheetLiabilities) => reportBalanceSheetLiabilities.balanceSheetId,
    { cascade: true, eager: true }
  )
  LIABLITIES: ReportBalanceSheetLiabilities[];
}
