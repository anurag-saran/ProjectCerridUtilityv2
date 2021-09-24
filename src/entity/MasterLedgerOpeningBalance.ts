import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MasterLedger } from "./MasterLedger";

@Index("Master_LedgerOpeningBalance_pkey", ["id"], { unique: true })
@Entity("Master_LedgerOpeningBalance", { schema: "public" })
export class MasterLedgerOpeningBalance {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("date", { name: "invoicedate", nullable: true })
  INVOICEDATE: string | null;

  @Column("character varying", { name: "invoiceno", nullable: true })
  INVOICENO: string | null;

  @Column("date", { name: "duedate", nullable: true })
  DUEDATE: string | null;

  @Column("numeric", {
    name: "amount",
    nullable: true,
    precision: 50,
    scale: 2,
  })
  AMOUNT: string | null;

  @Column("character varying", { name: "amounttype", nullable: true })
  AMOUNTTYPE: string | null;

  @ManyToOne(
    () => MasterLedger,
    (masterLedger) => masterLedger.OPENINGBALANCE
  )
  @JoinColumn([{ name: "ledgerguid", referencedColumnName: "LEDGERID" }])
  LEDGERID: MasterLedger;
}
