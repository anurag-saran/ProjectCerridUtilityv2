import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MasterCompany } from "./MasterCompany";

@Index("Report_Register_pkey", ["id"], { unique: true })
@Entity("Report_Register", { schema: "public" })
export class ReportRegister {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "monthname" })
  MONTHNAME: string;

  @Column("character varying", { name: "vouchertypename" })
  VOUCHERTYPENAME: string;

  @Column("character varying", { name: "debit", nullable: true })
  DEBIT: number | null;

  @Column("character varying", { name: "credit", nullable: true })
  CREDIT: number | null;

  @Column("character varying", { name: "closing", nullable: true })
  CLOSING: number | null;

  @ManyToOne(
    () => MasterCompany,
    (masterCompany) => masterCompany.reportRegisters
  )
  @JoinColumn([{ name: "companyguid", referencedColumnName: "COMPANYGUID" }])
  COMPANYGUID: MasterCompany;
}
