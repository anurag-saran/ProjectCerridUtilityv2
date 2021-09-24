import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Vouchers } from "./Vouchers";
import { VouchersLedgerEntries } from "./VouchersLedgerEntries";

@Index("Vouchers_LedgerEntries_BillAllocations_pkey", ["id"], { unique: true })
@Entity("Vouchers_LedgerEntries_BillAllocations", { schema: "public" })
export class VouchersLedgerEntriesBillAllocations {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "billname", nullable: true })
  BILLNAME: string | null;

  @Column("character varying", { name: "vouchertypename", nullable: true })
  VOUCHERTYPENAME: string | null;

  @Column("character varying", { name: "billtype" })
  BILLTYPE: string;

  @Column("character varying", { name: "amount", nullable: true })
  AMOUNT: string | null;

  @ManyToOne(
    () => Vouchers,
    (vouchers) => vouchers.VOUCHERID
  )
  @JoinColumn([{ name: "voucherid", referencedColumnName: "VOUCHERID" }])
  VOUCHERID: Vouchers;

  @ManyToOne(
    () => VouchersLedgerEntries,
    (vouchersLedgerEntries) => vouchersLedgerEntries.id
  )
  @JoinColumn([{ name: "ledgerserialid", referencedColumnName: "id" }])
  ledgerserialid: VouchersLedgerEntries;
}
