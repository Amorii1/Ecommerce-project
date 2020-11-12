import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Product } from "./Product";

@Entity("categories")
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  arTitle: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  arImage: string;

  @Column()
  active: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @CreateDateColumn()
  updatedAt: Date;

  // ------------------------------- Relation ------------------------------- //

  @OneToMany((type) => Product, (product) => product.category)
  products: Product[];
}
