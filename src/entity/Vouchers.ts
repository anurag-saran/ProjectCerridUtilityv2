import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ReportBillVouchers } from "./ReportBillVouchers";
import { ReportBills } from "./ReportBills";
import { MasterCompany } from "./MasterCompany";
import { MasterLedger } from "./MasterLedger";
import { MasterVoucherType } from "./MasterVoucherType";
import { VouchersInventoryEntries } from "./VouchersInventoryEntries";
import { VouchersLedgerEntries } from "./VouchersLedgerEntries";

@Index("Vouchers_guid_key", ["VOUCHERID"], { unique: true })
@Index("Vouchers_pkey", ["id"], { unique: true })
@Entity("Vouchers", { schema: "public" })
export class Vouchers {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "guid", nullable: true, unique: true })
  VOUCHERID: string | null;

  @Column("date", { name: "vchdate" })
  DATE: string;

  @Column("character varying", { name: "vouchernumber", nullable: true })
  VOUCHERNUMBER: string | null;

  @Column("character varying", { name: "refernce", nullable: true })
  REFERENCE: string | null;

  @Column("date", { name: "referncedate", nullable: true })
  REFERENCEDATE: string | null;

  @Column("character varying", { name: "partyname" })
  PARTYNAME: string;

  @Column("character varying", { name: "vouchertypename" })
  VOUCHERTYPENAME: string;

  @Column("integer", { name: "alterid" })
  ALTERID: number;

  @Column("integer", { name: "cgstamount", nullable: true })
  CGSTAMOUNT: number | null;

  @Column("integer", { name: "sgstamount", nullable: true })
  SGSTAMOUNT: number | null;

  @Column("integer", { name: "igstamount", nullable: true })
  IGSTAMOUNT: number | null;

  @Column("integer", { name: "vatamount", nullable: true })
  VATAMOUNT: number | null;

  @Column("integer", { name: "finalamount", nullable: true })
  FINALAMOUNT: number | null;

  @Column("character varying", { name: "allocationledger", nullable: true })
  ALLOCATIONLEDGER: string | null;

  @Column("character varying", { name: "narration", nullable: true })
  NARRATION: string | null;

  @Column("boolean", { name: "isinvoice" })
  ISINVOICE: boolean;

  @Column("boolean", { name: "isoptional" })
  isoptional: boolean;

  @OneToMany(
    () => ReportBillVouchers,
    (reportBillVouchers) => reportBillVouchers.VOUCHERID
  )
  reportBillVouchers: ReportBillVouchers[];

  @OneToMany(() => ReportBills, (reportBills) => reportBills.BILLID)
  reportBills: ReportBills[];

  @ManyToOne(() => MasterCompany, (masterCompany) => masterCompany.vouchers)
  @JoinColumn([{ name: "companyguid", referencedColumnName: "COMPANYGUID" }])
  COMPANYGUID: MasterCompany;

  @ManyToOne(() => MasterLedger, (masterLedger) => masterLedger.vouchers)
  @JoinColumn([{ name: "allocationledgerid", referencedColumnName: "LEDGERID" }])
  ALLOCATIONLEDGERID: MasterLedger;

  @ManyToOne(() => MasterLedger, (masterLedger) => masterLedger.vouchers2)
  @JoinColumn([{ name: "partyid", referencedColumnName: "LEDGERID" }])
  PARTYID: MasterLedger;

  @ManyToOne(
    () => MasterVoucherType,
    (masterVoucherType) => masterVoucherType.vouchers
  )
  @JoinColumn([{ name: "vouchertypeguid", referencedColumnName: "VOUCHERTYPEID" }])
  VOUCHERTYPEGUID: MasterVoucherType;

  @OneToMany(
    () => VouchersInventoryEntries,
    (vouchersInventoryEntries) => vouchersInventoryEntries.voucherguid,
    { cascade: true, eager: true }
  )
  INVENTORYENTRIES: VouchersInventoryEntries[];

  @OneToMany(
    () => VouchersLedgerEntries,
    (vouchersLedgerEntries) => vouchersLedgerEntries.voucherguid,
    { cascade: true, eager: true }
  )
  LEDGERENTRIES: VouchersLedgerEntries[];
  
}
