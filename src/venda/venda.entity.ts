import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vendedor } from '../vendedor/vendedor.entity';
import { ItemVenda } from './item-venda.entity';

@Entity('tb_vendas')
export class Venda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  dataVenda: Date;

  @Column({ length: 50 })
  formaPagamento: string;

  @Column({ length: 50 })
  status: string;

  @ManyToOne(() => Vendedor, (vendedor) => vendedor.vendas, {
    eager: true,
  })
  vendedor: Vendedor;

  @OneToMany(() => ItemVenda, (item) => item.venda, {
    cascade: true,
    eager: true,
  })
  itens: ItemVenda[];
}