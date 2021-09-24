import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MasterStockItem } from "./MasterStockItem";

@Index("Master_StockItemTaxHistory_pkey", ["id"], { unique: true })
@Entity("Master_StockItemTaxHistory", { schema: "public" })
export class MasterStockItemTaxHistory {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("date", { name: "applicablefrom" })
  APPLICABLEFROM: string;

  @Column("character varying", { name: "hsncode", nullable: true })
  HSNCODE: string | null;

  @Column("character varying", { name: "calculationtype", nullable: true })
  CALCULATIONTYPE: string | null;

  @Column("character varying", { name: "taxablity" })
  TAXABILITY: string;

  @Column("character varying", { name: "igst", nullable: true })
  IGST: number | null;

  @Column("character varying", { name: "sgst", nullable: true })
  SGST: number | null;

  @Column("character varying", { name: "cgst", nullable: true })
  CGST: number | null;

  @Column("character varying", { name: "cess", nullable: true })
  CESS: number | null;

  @ManyToOne(
    () => MasterStockItem,
    (masterStockItem) => masterStockItem.TAXHISTORY
  )
  @JoinColumn([{ name: "stockitemid", referencedColumnName: "GUID" }])
  stockitem: MasterStockItem;
}
