import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MasterCompany } from "./MasterCompany";

@Index("Report_Balance_pkey", ["id"], { unique: true })
@Entity("Report_Balance", { schema: "public" })
export class ReportBalance {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("date", { name: "repdate" })
  DATE: string;

  @Column("character varying", { name: "cashinhand", nullable: true })
  CASHINHAND: number | null;

  @Column("character varying", { name: "bankbalance", nullable: true })
  BANKBALANCE: number | null;

  @Column("character varying", { name: "balance", nullable: true })
  BALANCE: number | null;

  @ManyToOne(
    () => MasterCompany,
    (masterCompany) => masterCompany.reportBalances
  )
  @JoinColumn([{ name: "companyguid", referencedColumnName: "COMPANYGUID" }])
  COMPANYGUID: MasterCompany;
}
