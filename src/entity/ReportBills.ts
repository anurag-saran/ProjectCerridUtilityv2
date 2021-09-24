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
import { ReportBillVouchers } from "./ReportBillVouchers";
import { Vouchers } from "./Vouchers";

@Index("Report_Bills_pkey", ["id"], { unique: true })
@Entity("Report_Bills", { schema: "public" })
export class ReportBills {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "billid" })
  BILLID: string;

  @Column("date", { name: "billdate" })
  BILLDATE: string;

  @Column("character varying", { name: "billrefno" })
  BILLREFNO: string;

  @Column("character varying", { name: "partyname" })
  PARTYNAME: string;

  @Column("character varying", { name: "partyid" })
  PARTYID: string;

  @Column("character varying", { name: "pendingamt", nullable: true })
  PENDINGAMT: number | null;

  @Column("character varying", { name: "paidamt", nullable: true })
  PAIDAMT: number | null;

  @Column("character varying", { name: "totalamt", nullable: true })
  TOTALAMT: number | null;

  @Column("date", { name: "dueon", nullable: true })
  DUEON: string | null;

  @Column("character varying", { name: "overduedays", nullable: true })
  OVERDUEDAYS: string | null;

  @Column("boolean", { name: "isrecievable", nullable: true })
  ISRECIEVABLE: boolean | null;

  @Column("boolean", { name: "ispayable", nullable: true })
  ISPAYABLE: boolean | null;

  @Column("boolean", { name: "iscleared", nullable: true })
  ISCLEARED: boolean | null;

  @Column("boolean", { name: "isonlyopeningbalance", nullable: true })
  ISONLYOPENINGBALANCE: boolean | null;

  @Column("character varying", { name: "cgstamount", nullable: true })
  CGSTAMOUNT: number | null;

  @Column("character varying", { name: "sgstamount", nullable: true })
  SGSTAMOUNT: number | null;

  @Column("character varying", { name: "igstamount", nullable: true })
  IGSTAMOUNT: number | null;

  @Column("character varying", { name: "vatamount", nullable: true })
  VATAMOUNT: number | null;

  @ManyToOne(() => MasterCompany, (masterCompany) => masterCompany.reportBills)
  @JoinColumn([{ name: "companyguid", referencedColumnName: "COMPANYGUID" }])
  COMPANYGUID: MasterCompany;

  @OneToMany(
    () => ReportBillVouchers,
    (reportBillVouchers) => reportBillVouchers.BILLID,
    { cascade: true, eager: true }
  )
  VOUCHERS: ReportBillVouchers[];
  
}
