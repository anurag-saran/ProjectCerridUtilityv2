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
import { MasterStockItemMrpHistory } from "./MasterStockItemMrpHistory";
import { MasterStockItemOpeningBalance } from "./MasterStockItemOpeningBalance";
import { MasterStockItemTaxHistory } from "./MasterStockItemTaxHistory";
import { VouchersInventoryEntries } from "./VouchersInventoryEntries";

@Index("Master_StockItem_guid_key", ["GUID"], { unique: true })
@Index("Master_StockItem_pkey", ["id"], { unique: true })
@Entity("Master_StockItem", { schema: "public" })
export class MasterStockItem {
  @PrimaryGeneratedColumn({type: "integer", name: "id" })
  id: string;

  @Column("character varying", { name: "guid", nullable: true, unique: true })
  GUID: string | null;

  @Column("character varying", { name: "name" })
  NAME: string;

  @Column("character varying", { name: "alias", nullable: true })
  ALIAS: string | null;

  @Column("character varying", { name: "partno", nullable: true })
  PARTNO: string | null;

  @Column("character varying", { name: "description", nullable: true })
  DESCRIPTION: string | null;

  @Column("character varying", { name: "remarks", nullable: true })
  REMARKS: string | null;

  @Column("character varying", { name: "isgstapplicable", nullable: true })
  ISGSTAPPLICABLE: string | null;

  @Column("character varying", { name: "calculationtype", nullable: true })
  CALCULATIONTYPE: string | null;

  @Column("character varying", { name: "igst", nullable: true })
  IGST: number | null;

  @Column("character varying", { name: "sgst", nullable: true })
  SGST: number | null;

  @Column("character varying", { name: "cgst", nullable: true })
  CGST: number | null;

  @Column("character varying", { name: "cess", nullable: true })
  CESS: number | null;

  @Column("character varying", { name: "hsncode", nullable: true })
  HSNCODE: string | null;

  @Column("character varying", { name: "mrprate", nullable: true })
  MRPRATE: number | null;

  @Column("character varying", { name: "categoryid" })
  CATEGORYID: string;

  @Column("character varying", { name: "categoryname" })
  CATEGORYNAME: string;

  @Column("character varying", { name: "groupid" })
  GROUPID: string;

  @Column("character varying", { name: "groupname" })
  GROUPNAME: string;

  @Column("character varying", { name: "unitid" })
  UNITID: string;

  @Column("character varying", { name: "unitname" })
  UNITNAME: string;

  @Column("character varying", { name: "openingbalance", nullable: true })
  OPENINGBALANCE: string | null;

  @Column("character varying", { name: "rate", nullable: true })
  RATE: number | null;

  @Column("character varying", { name: "amount", nullable: true })
  AMOUNT: number | null;

  @Column("character varying", { name: "alterid" })
  ALTERID: string;

  @Column("boolean", { name: "isbatchwiseon", nullable: true })
  ISBATCHWISEON: boolean | null;

  @ManyToOne(
    () => MasterCompany,
    (masterCompany) => masterCompany.masterStockItems
  )
  @JoinColumn([{ name: "companyguid", referencedColumnName: "COMPANYGUID" }])
  COMPANYGUID: MasterCompany;

  @OneToMany(
    () => MasterStockItemMrpHistory,
    (masterStockItemMrpHistory) => masterStockItemMrpHistory.stockitem,
    { cascade: true, eager: true }
  )
  masterStockItemMrpHistories: MasterStockItemMrpHistory[];

  @OneToMany(
    () => MasterStockItemOpeningBalance,
    (masterStockItemOpeningBalance) => masterStockItemOpeningBalance.stockitem,
    { cascade: true, eager: true }
  )
  masterStockItemOpeningBalances: MasterStockItemOpeningBalance[];

  @OneToMany(
    () => MasterStockItemTaxHistory,
    (masterStockItemTaxHistory) => masterStockItemTaxHistory.stockitem,
    { cascade: true, eager: true }
  )
  TAXHISTORY: MasterStockItemTaxHistory[];

  @OneToMany(
    () => VouchersInventoryEntries,
    (vouchersInventoryEntries) => vouchersInventoryEntries.STOCKID
  )
  vouchersInventoryEntries: VouchersInventoryEntries[];
}
