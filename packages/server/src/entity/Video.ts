import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Video extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  hash: string;

  @Column()
  path: string;

  @Column({ nullable: true, default: "Pending" })
  status: string;

  @Column()
  magnetLink: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
