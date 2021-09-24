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
import { Vouchers } from "./Vouchers";

@Index("Master_VoucherType_guid_key", ["VOUCHERTYPEID"], { unique: true })
@Index("Master_VoucherType_pkey", ["id"], { unique: true })
@Entity("Master_VoucherType", { schema: "public" })
export class MasterVoucherType {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "guid", nullable: true, unique: true })
  VOUCHERTYPEID: string | null;

  @Column("character varying", { name: "name" })
  VOUCHERTYPENAME: string;

  @Column("character varying", { name: "parentgroupid" })
  PARENTVOUCHERTYPEID: string;

  @Column("character varying", { name: "parentgroupname" })
  PARENTVOUCHERTYPENAME: string;

  @Column("integer", { name: "alterid" })
  ALTERID: number;

  @Column("character varying", { name: "vouchertypeprintname", nullable: true })
  VOUCHERTYPEPRINTNAME: string | null;

  @Column("character varying", { name: "vouchernumbering" })
  VOUCHERNUMBERING: string;

  @Column("character varying", { name: "defaultbankname", nullable: true })
  DEFAULTBANKNAME: string | null;

  @Column("character varying", { name: "defaultbanknameid", nullable: true })
  DEFAULTBANKNAMEID: string | null;

  @Column("character varying", { name: "vchprefix", nullable: true })
  vchprefix: string | null;

  @Column("character varying", { name: "vchsuffix", nullable: true })
  vchsuffix: string | null;

  @ManyToOne(
    () => MasterCompany,
    (masterCompany) => masterCompany.masterVoucherTypes
  )
  @JoinColumn([{ name: "companyguid", referencedColumnName: "COMPANYGUID" }])
  COMPANYGUID: MasterCompany;

  @OneToMany(() => Vouchers, (vouchers) => vouchers.VOUCHERTYPEGUID)
  vouchers: Vouchers[];
}
