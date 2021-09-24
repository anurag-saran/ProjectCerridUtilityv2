import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MasterLedger } from "./MasterLedger";
import { VouchersLedgerEntries } from "./VouchersLedgerEntries";

@Index("Vouchers_LedgerEntries_BankAllocations_pkey", ["id"], { unique: true })
@Entity("Vouchers_LedgerEntries_BankAllocations", { schema: "public" })
export class VouchersLedgerEntriesBankAllocations {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("date", { name: "vchdate", nullable: true })
  DATE: string | null;

  @Column("date", { name: "instrumentdate", nullable: true })
  INSTRUMENTDATE: string | null;

  @Column("character varying", { name: "transactiontype", nullable: true })
  TRANSACTIONTYPE: string | null;

  @Column("character varying", { name: "paymentfavouring", nullable: true })
  PAYMENTFAVOURING: string | null;

  @Column("character varying", { name: "paymentmode", nullable: true })
  PAYMENTMODE: string | null;

  @Column("character varying", { name: "bankpartyname", nullable: true })
  BANKPARTYNAME: string | null;

  @Column("character varying", { name: "amount", nullable: true })
  AMOUNT: string | null;

  @ManyToOne(
    () => MasterLedger,
    (masterLedger) => masterLedger.vouchersLedgerEntriesBankAllocations
  )
  @JoinColumn([{ name: "paymentfavouringid", referencedColumnName: "LEDGERID" }])
  PAYMENTFAVOURINGID: MasterLedger;

  @ManyToOne(
    () => VouchersLedgerEntries,
    (vouchersLedgerEntries) => vouchersLedgerEntries.id
  )
  @JoinColumn([{ name: "ledgerserialid", referencedColumnName: "id" }])
  ledgerserialid: VouchersLedgerEntries;
}
