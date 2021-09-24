import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MasterStockItem } from "./MasterStockItem";
import { Vouchers } from "./Vouchers";
import { VouchersInventoryEntriesBatchAllocation } from "./VouchersInventoryEntriesBatchAllocation";

@Index("Vouchers_InventoryEntries_pkey", ["id"], { unique: true })
@Entity("Vouchers_InventoryEntries", { schema: "public" })
export class VouchersInventoryEntries {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "stockitemname" })
  STOCKITEMNAME: string;

  @Column("integer", { name: "actualqty", nullable: true })
  ACTUALQTY: number | null;

  @Column("integer", { name: "billedqty", nullable: true })
  BILLEDQTY: number | null;

  @Column("integer", { name: "rate", nullable: true })
  RATE: number | null;

  @Column("character varying", { name: "amount", nullable: true })
  AMOUNT: string | null;

  @ManyToOne(
    () => MasterStockItem,
    (masterStockItem) => masterStockItem.vouchersInventoryEntries
  )
  @JoinColumn([{ name: "stockid", referencedColumnName: "GUID" }])
  STOCKID: MasterStockItem;

  @ManyToOne(() => Vouchers, (vouchers) => vouchers.INVENTORYENTRIES)
  @JoinColumn([{ name: "voucherguid", referencedColumnName: "VOUCHERID" }])
  voucherguid: Vouchers;

  @OneToMany(
    () => VouchersInventoryEntriesBatchAllocation,
    (vouchersInventoryEntriesBatchAllocation) =>
    vouchersInventoryEntriesBatchAllocation.stockserialid,
      { cascade: true, eager: true }
  )
  BATCHALLOCATIONS: VouchersInventoryEntriesBatchAllocation[];
}
