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
import { MasterLedgerOpeningBalance } from "./MasterLedgerOpeningBalance";
import { ReportBillVouchers } from "./ReportBillVouchers";
import { Vouchers } from "./Vouchers";
import { VouchersLedgerEntries } from "./VouchersLedgerEntries";
import { VouchersLedgerEntriesBankAllocations } from "./VouchersLedgerEntriesBankAllocations";

@Index("Master_Ledger_guid_key", ["LEDGERID"], { unique: true })
@Index("Master_Ledger_pkey", ["id"], { unique: true })
@Entity("Master_Ledger", { schema: "public" })
export class MasterLedger {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "guid", nullable: true, unique: true })
  LEDGERID: string | null;

  @Column("character varying", { name: "name" })
  NAME: string;

  @Column("character varying", { name: "parentgroupid" })
  parentgroupid: string;

  @Column("character varying", { name: "parentgroupname" })
  parentgroupname: string;

  @Column("character varying", { name: "primarygroupid" })
  LEDGERGROUPID: string;

  @Column("character varying", { name: "primarygroupname" })
  LEDGERGROUPNAME: string;

  @Column("character varying", { name: "adress", nullable: true })
  ADDRESS: string | null;

  @Column("character varying", { name: "statename", nullable: true })
  STATENAME: string | null;

  @Column("character varying", { name: "countryname", nullable: true })
  COUNTRYNAME: string | null;

  @Column("character varying", { name: "pincode", nullable: true })
  PINCODE: string | null;

  @Column("character varying", { name: "phoneno", nullable: true })
  PHONENO: string | null;

  @Column("character varying", { name: "mobileno", nullable: true })
  MOBILENO: string | null;

  @Column("character varying", { name: "emailid", nullable: true })
  EMAILID: string | null;

  @Column("character varying", { name: "contactpersonname", nullable: true })
  CONTACTPERSONNAME: string | null;

  @Column("date", { name: "openingbalancedate", nullable: true })
  OPENINGBALANCEDATE: string | null;

  @Column("character varying", { name: "partygstin", nullable: true })
  PARTYGSTIN: string | null;

  @Column("character varying", { name: "panno", nullable: true })
  PANNO: string | null;

  @Column("boolean", { name: "isinventoryapplicable", nullable: true })
  ISINVENTORYAPPLICABLE: boolean | null;

  @Column("boolean", { name: "iscostcentreapplicable", nullable: true })
  ISCOSTCENTERAPPLICABLE: boolean | null;

  @Column("boolean", { name: "isbillbybillapplicable", nullable: true })
  ISBILLBYBILLAPPLICABLE: boolean | null;

  @Column("numeric", {
    name: "openingbalanceamount",
    nullable: true,
    precision: 50,
    scale: 2,
  })
  OPENINGBALANCEAMOUNT: string | null;

  @Column("character varying", { name: "openingbalancetype", nullable: true })
  OPENINGBALANCETYPE: string | null;

  @Column("numeric", {
    name: "closingbalanceamount",
    nullable: true,
    precision: 50,
    scale: 2,
  })
  closingbalanceamount: string | null;

  @Column("character varying", { name: "closingbalancetype", nullable: true })
  closingbalancetype: string | null;

  @Column("character varying", { name: "creditperiod", nullable: true })
  creditperiod: string | null;

  @Column("numeric", {
    name: "creditlimit",
    nullable: true,
    precision: 50,
    scale: 2,
  })
  creditlimit: string | null;

  @Column("integer", { name: "alterid" })
  ALTERID: number;

  @Column("character varying", {
    name: "partybankname",
    nullable: true,
    length: 30,
  })
  PARTYBANKNAME: string | null;

  @Column("character varying", { name: "partyifscode", nullable: true })
  PARTYIFSCODE: string | null;

  @Column("character varying", {
    name: "partyaccountno",
    nullable: true,
    length: 30,
  })
  PartyAccountNo: string | null;

  @Column("character varying", { name: "alias", nullable: true })
  ALIAS: string | null;

  @Column("character varying", { name: "gstregistrationtype", nullable: true })
  GSTREGISTRATIONTYPE: string | null;

  @ManyToOne(
    () => MasterCompany,
    (masterCompany) => masterCompany.masterLedgers
  )
  @JoinColumn([{ name: "companyguid", referencedColumnName: "COMPANYGUID" }])
  COMPANYGUID: MasterCompany;

  @OneToMany(
    () => MasterLedgerOpeningBalance,
    (masterLedgerOpeningBalance) => masterLedgerOpeningBalance.LEDGERID,
    { cascade: true, eager: true }
  )
  OPENINGBALANCE: MasterLedgerOpeningBalance[];

  @OneToMany(
    () => ReportBillVouchers,
    (reportBillVouchers) => reportBillVouchers.PARTYID
  )
  reportBillVouchers: ReportBillVouchers[];

  @OneToMany(() => Vouchers, (vouchers) => vouchers.ALLOCATIONLEDGERID)
  vouchers: Vouchers[];

  @OneToMany(() => Vouchers, (vouchers) => vouchers.PARTYID)
  vouchers2: Vouchers[];

  @OneToMany(
    () => VouchersLedgerEntries,
    (vouchersLedgerEntries) => vouchersLedgerEntries.LEDGERID
  )
  vouchersLedgerEntries: VouchersLedgerEntries[];

  @OneToMany(
    () => VouchersLedgerEntriesBankAllocations,
    (vouchersLedgerEntriesBankAllocations) =>
      vouchersLedgerEntriesBankAllocations.PAYMENTFAVOURINGID
  )
  vouchersLedgerEntriesBankAllocations: VouchersLedgerEntriesBankAllocations[];
}
