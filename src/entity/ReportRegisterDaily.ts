import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MasterCompany } from "./MasterCompany";

@Index("Report_Register_Daily_pkey", ["id"], { unique: true })
@Entity("Report_Register_Daily", { schema: "public" })
export class ReportRegisterDaily {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("date", { name: "repdate" })
  DATE: string;

  @Column("integer", { name: "debit", nullable: true })
  DEBIT: number | null;

  @Column("integer", { name: "credit", nullable: true })
  CREDIT: number | null;

  @Column("integer", { name: "closing", nullable: true })
  CLOSING: number | null;

  @ManyToOne(
    () => MasterCompany,
    (masterCompany) => masterCompany.reportRegisterDailies
  )
  @JoinColumn([{ name: "companyguid", referencedColumnName: "COMPANYGUID" }])
  COMPANYGUID: MasterCompany;
}
