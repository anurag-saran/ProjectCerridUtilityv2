import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MasterCompany } from "./MasterCompany";
import { MasterStockGrpTaxHistory } from "./MasterStockGrpTaxHistory";

@Index("Master_StockGrp_guid_key", ["GUID"], { unique: true })
@Index("Master_StockGrp_pkey", ["id"], { unique: true })
@Entity("Master_StockGrp", { schema: "public" })
export class MasterStockGrp {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "guid", nullable: true, unique: true })
  GUID: string | null;

  @Column("character varying", { name: "name" })
  NAME: string;

  @Column("character varying", { name: "alias", nullable: true })
  ALIAS: string | null;

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

  @Column("character varying", { name: "parentgroupid" })
  PARENTGROUPID: string;

  @Column("character varying", { name: "parentgroupname" })
  PARENTGROUPNAME: string;

  @Column("integer", { name: "alterid" })
  ALTERID: number;

  @ManyToOne(
    () => MasterCompany,
    (masterCompany) => masterCompany.masterStockGrps
  )
  @JoinColumn([{ name: "companyguid", referencedColumnName: "COMPANYGUID" }])
  COMPANYGUID: MasterCompany;

  @OneToMany(
    () => MasterStockGrpTaxHistory,
    (masterStockGrpTaxHistory) => masterStockGrpTaxHistory.GUID,
    { cascade: true, eager: true }
  )
  TAXHISTORY: MasterStockGrpTaxHistory[];
}
