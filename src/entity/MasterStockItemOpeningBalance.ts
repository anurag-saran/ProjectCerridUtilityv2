import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MasterStockItem } from "./MasterStockItem";

@Index("Master_StockItemOpeningBalance_pkey", ["id"], { unique: true })
@Entity("Master_StockItemOpeningBalance", { schema: "public" })
export class MasterStockItemOpeningBalance {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "godownguid" })
  godownguid: string;

  @Column("character varying", { name: "godownname" })
  godownname: string;

  @Column("character varying", { name: "batchname" })
  batchname: string;

  @Column("integer", { name: "openingbalance", nullable: true })
  openingbalance: number | null;

  @Column("integer", { name: "openingrate", nullable: true })
  openingrate: number | null;

  @Column("integer", { name: "openingvalue", nullable: true })
  openingvalue: number | null;

  @ManyToOne(
    () => MasterStockItem,
    (masterStockItem) => masterStockItem.masterStockItemOpeningBalances
  )
  @JoinColumn([{ name: "stockitemid", referencedColumnName: "GUID" }])
  stockitem: MasterStockItem;
}
