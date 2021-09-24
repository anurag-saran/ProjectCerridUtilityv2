import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Vouchers } from "./Vouchers";
import { MasterLedger } from "./MasterLedger";
import { ReportBills } from "./ReportBills";

@Index("Report_Bill_Vouchers_pkey", ["id"], { unique: true })
@Entity("Report_Bill_Vouchers", { schema: "public" })
export class ReportBillVouchers {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("date", { name: "invoicedate" })
  INVOICEDATE: string;

  @Column("character varying", { name: "partyname" })
  PARTYNAME: string;

  @Column("character varying", { name: "vouchername" })
  VOUCHERNAME: string;

  @Column("character varying", { name: "amount", nullable: true })
  AMOUNT: number | null;

  @Column("character varying", {
    name: "amounttype",
    nullable: true,
    length: 5,
  })
  AMOUNTTYPE: string | null;

  @ManyToOne(() => ReportBills, (reportBills) => reportBills.BILLID)
  @JoinColumn([{ name: "billid", referencedColumnName: "BILLID" }])
  BILLID: ReportBills;

  @ManyToOne(
    () => MasterLedger,
    (masterLedger) => masterLedger.reportBillVouchers
  )
  @JoinColumn([{ name: "partyid", referencedColumnName: "LEDGERID" }])
  PARTYID: MasterLedger;

  @ManyToOne(() => Vouchers, (vouchers) => vouchers.reportBillVouchers)
  @JoinColumn([{ name: "voucherid", referencedColumnName: "VOUCHERID" }])
  VOUCHERID: Vouchers;
}
