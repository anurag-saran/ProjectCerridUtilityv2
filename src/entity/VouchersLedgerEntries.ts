import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MasterLedger } from "./MasterLedger";
import { Vouchers } from "./Vouchers";
import { VouchersLedgerEntriesBankAllocations } from "./VouchersLedgerEntriesBankAllocations";
import { VouchersLedgerEntriesBillAllocations } from "./VouchersLedgerEntriesBillAllocations";

@Index("Vouchers_LedgerEntries_pkey", ["id"], { unique: true })
@Entity("Vouchers_LedgerEntries", { schema: "public" })
export class VouchersLedgerEntries {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "ledgername" })
  LEDGERNAME: string;

  @Column("boolean", { name: "ispartyledger" })
  ISPARTYLEDGER: boolean;

  @Column("character varying", { name: "debit", nullable: true })
  DEBIT: string | null;

  @Column("character varying", { name: "credit", nullable: true })
  CREDIT: string | null;

  @ManyToOne(
    () => MasterLedger,
    (masterLedger) => masterLedger.vouchersLedgerEntries
  )
  @JoinColumn([{ name: "ledgerid", referencedColumnName: "LEDGERID" }])
  LEDGERID: MasterLedger;

  @ManyToOne(() => Vouchers, (vouchers) => vouchers.LEDGERENTRIES)
  @JoinColumn([{ name: "voucherguid", referencedColumnName: "VOUCHERID" }])
  voucherguid: Vouchers;

  @OneToMany(
    () => VouchersLedgerEntriesBillAllocations,
    (vouchersLedgerEntriesBillAllocations) =>
      vouchersLedgerEntriesBillAllocations.ledgerserialid,
      { cascade: true, eager: true }
  )
  BILLALLOCATIONS: VouchersLedgerEntriesBillAllocations[];

  @OneToMany(
    () => VouchersLedgerEntriesBankAllocations,
    (vouchersLedgerEntriesBankAllocations) =>
    vouchersLedgerEntriesBankAllocations.ledgerserialid,
      { cascade: true, eager: true }
  )
  BANKALLOCATIONS: VouchersLedgerEntriesBankAllocations[];
}

