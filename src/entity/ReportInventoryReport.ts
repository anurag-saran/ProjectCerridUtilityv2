import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MasterCompany } from "./MasterCompany";

@Index("Report_InventoryReport_pkey", ["id"], { unique: true })
@Entity("Report_InventoryReport", { schema: "public" })
export class ReportInventoryReport {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name" })
  NAME: string;

  @Column("character varying", { name: "itemcode", nullable: true })
  ITEMCODE: string | null;

  @Column("character varying", { name: "itemunit", nullable: true })
  ITEMUNIT: string | null;

  @Column("character varying", { name: "purchaseprice", nullable: true })
  PURCHASEPRICE: number | null;

  @Column("character varying", { name: "sellingprice", nullable: true })
  SELLINGPRICE: number | null;

  @Column("integer", { name: "stockqty", nullable: true })
  STOCKQUANTITY: number | null;

  @Column("character varying", { name: "credit", nullable: true })
  CREDIT: number | null;

  @ManyToOne(
    () => MasterCompany,
    (masterCompany) => masterCompany.reportInventoryReports
  )
  @JoinColumn([{ name: "companyguid", referencedColumnName: "COMPANYGUID" }])
  COMPANYGUID: MasterCompany;
}
