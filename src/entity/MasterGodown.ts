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
import { VouchersInventoryEntriesBatchAllocation } from "./VouchersInventoryEntriesBatchAllocation";

@Index("Master_Godown_guid_key", ["GODOWNID"], { unique: true })
@Index("Master_Godown_pkey", ["id"], { unique: true })
@Entity("Master_Godown", { schema: "public" })
export class MasterGodown {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "guid", nullable: true, unique: true })
  GODOWNID: string | null;

  @Column("character varying", { name: "name" })
  GODOWNNAME: string;

  @Column("character varying", { name: "parentgroupid" })
  GODOWNPARENTID: string;

  @Column("character varying", { name: "parentgroupname" })
  GODOWNPARENTNAME: string;

  @Column("integer", { name: "alterid" })
  GODOWNALTERID: number;

  @ManyToOne(
    () => MasterCompany,
    (masterCompany) => masterCompany.masterGodowns
  )
  @JoinColumn([{ name: "companyguid", referencedColumnName: "COMPANYGUID" }])
  COMPANYGUID: MasterCompany;

  @OneToMany(
    () => VouchersInventoryEntriesBatchAllocation,
    (vouchersInventoryEntriesBatchAllocation) =>
      vouchersInventoryEntriesBatchAllocation.GODOWNID
  )
  vouchersInventoryEntriesBatchAllocations: VouchersInventoryEntriesBatchAllocation[];
}
