import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MasterGodown } from "./MasterGodown";
import { VouchersInventoryEntries } from "./VouchersInventoryEntries";

@Index("Vouchers_InventoryEntries_BatchAllocation_pkey", ["id"], {
  unique: true,
})
@Entity("Vouchers_InventoryEntries_BatchAllocation", { schema: "public" })
export class VouchersInventoryEntriesBatchAllocation {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "batchname", nullable: true })
  BATCHNAME: string | null;

  @Column("character varying", { name: "godownname", nullable: true })
  GODOWNNAME: string | null;

  @Column("integer", { name: "actualqty", nullable: true })
  ACTUALQTY: number | null;

  @Column("integer", { name: "billedqty", nullable: true })
  BILLEDQTY: number | null;

  @Column("integer", { name: "rate", nullable: true })
  RATE: number | null;

  @Column("character varying", { name: "amount", nullable: true })
  AMOUNT: string | null;

  @Column("character varying", { name: "trackingnumber", nullable: true })
  TRACKINGNUMBER: string | null;

  @Column("character varying", { name: "orderno", nullable: true })
  ORDERNO: string | null;

  @Column("date", { name: "orderduedate", nullable: true })
  ORDERDUEDATE: string | null;

  @ManyToOne(
    () => MasterGodown,
    (masterGodown) => masterGodown.vouchersInventoryEntriesBatchAllocations
  )
  @JoinColumn([{ name: "godownid", referencedColumnName: "GODOWNID" }])
  GODOWNID: MasterGodown;

  @ManyToOne(
    () => VouchersInventoryEntries,
    (vouchersInventoryEntries) => vouchersInventoryEntries.BATCHALLOCATIONS
  )
  @JoinColumn([{ name: "stockserialid", referencedColumnName: "id" }])
  stockserialid: VouchersInventoryEntries;
}
