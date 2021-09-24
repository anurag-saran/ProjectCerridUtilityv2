import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MasterStockGrp } from "./MasterStockGrp";

@Index("Master_StockGrpTaxHistory_pkey", ["id"], { unique: true })
@Entity("Master_StockGrpTaxHistory", { schema: "public" })
export class MasterStockGrpTaxHistory {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("date", { name: "applicablefrom", nullable: true })
  APPLICABLEFROM: string | null;

  @Column("character varying", { name: "hsncode", nullable: true })
  HSNCODE: string | null;

  @Column("character varying", { name: "taxablity", nullable: true })
  TAXABILITY: string | null;

  @Column("character varying", { name: "igst", nullable: true })
  IGST: number | null;

  @Column("character varying", { name: "sgst", nullable: true })
  SGST: number | null;

  @Column("character varying", { name: "cgst", nullable: true })
  CGST: number | null;

  @Column("character varying", { name: "cess", nullable: true })
  CESS: number | null;

  @ManyToOne(
    () => MasterStockGrp,
    (masterStockGrp) => masterStockGrp.TAXHISTORY
  )
  @JoinColumn([{ name: "stockgroupguid", referencedColumnName: "GUID" }])
  GUID: MasterStockGrp;
}
