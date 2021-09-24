import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MasterCompany } from "./MasterCompany";

@Index("Master_StockCategory_guid_key", ["GUID"], { unique: true })
@Index("Master_StockCategory_pkey", ["id"], { unique: true })
@Entity("Master_StockCategory", { schema: "public" })
export class MasterStockCategory {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "guid", nullable: true, unique: true })
  GUID: string | null;

  @Column("character varying", { name: "name" })
  NAME: string;

  @Column("character varying", { name: "parentgroupid" })
  PARENTGROUPID: string;

  @Column("character varying", { name: "parentgroupname" })
  PARENTGROUPNAME: string;

  @Column("integer", { name: "alterid" })
  ALTERID: number;

  @ManyToOne(
    () => MasterCompany,
    (masterCompany) => masterCompany.masterStockCategories
  )
  @JoinColumn([{ name: "companyguid", referencedColumnName: "COMPANYGUID" }])
  COMPANYGUID: MasterCompany;
}
