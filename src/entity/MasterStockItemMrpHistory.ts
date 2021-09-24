import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MasterStockItem } from "./MasterStockItem";

@Index("Master_StockItemMRPHistory_pkey", ["id"], { unique: true })
@Entity("Master_StockItemMRPHistory", { schema: "public" })
export class MasterStockItemMrpHistory {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("date", { name: "fromdate" })
  fromdate: string;

  @Column("integer", { name: "mrprate", nullable: true })
  mrprate: number | null;

  @ManyToOne(
    () => MasterStockItem,
    (masterStockItem) => masterStockItem.masterStockItemMrpHistories
  )
  @JoinColumn([{ name: "stockitemid", referencedColumnName: "GUID" }])
  stockitem: MasterStockItem;
}
