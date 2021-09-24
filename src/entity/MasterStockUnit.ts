import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MasterCompany } from "./MasterCompany";

@Index("Master_StockUnit_guid_key", ["GUID"], { unique: true })
@Index("Master_StockUnit_pkey", ["id"], { unique: true })
@Entity("Master_StockUnit", { schema: "public" })
export class MasterStockUnit {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "guid", nullable: true, unique: true })
  GUID: string | null;

  @Column("character varying", { name: "name" })
  NAME: string;

  @Column("character varying", { name: "formalname" })
  FORMALNAME: string;

  @Column("character varying", { name: "noofdecimal" })
  NOOFDECIMAL: string;

  @Column("integer", { name: "alterid" })
  ALTERID: number;

  @ManyToOne(
    () => MasterCompany,
    (masterCompany) => masterCompany.masterStockUnits
  )
  @JoinColumn([{ name: "companyguid", referencedColumnName: "COMPANYGUID" }])
  COMPANYGUID: MasterCompany;
}
