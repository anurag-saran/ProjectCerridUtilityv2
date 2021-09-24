import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MasterCompany } from "./MasterCompany";

@Index("Master_LedgerGrp_guid_key", ["LEDGERGROUPID"], { unique: true })
@Index("Master_LedgerGrp_pkey", ["id"], { unique: true })
@Entity("Master_LedgerGrp", { schema: "public" })
export class MasterLedgerGrp {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "guid", nullable: true, unique: true })
  LEDGERGROUPID: string | null;

  @Column("character varying", { name: "name" })
  LEDGERGROUPNAME: string;

  @Column("character varying", { name: "primarygroupid" })
  PRIMARYGROUPID: string;

  @Column("character varying", { name: "primarygroupname" })
  PRIMARYGROUPNAME: string;

  @Column("character varying", { name: "parentgroupid" })
  PARENTLEDGERGROUPID: string;

  @Column("character varying", { name: "parentgroupname" })
  PARENTLEDGERGROUPNAME: string;

  @Column("integer", { name: "alterid" })
  ALTERID: number;

  @ManyToOne(
    () => MasterCompany,
    (masterCompany) => masterCompany.masterLedgerGrps
  )
  @JoinColumn([{ name: "companyguid", referencedColumnName: "COMPANYGUID" }])
  COMPANYGUID: MasterCompany;
}
