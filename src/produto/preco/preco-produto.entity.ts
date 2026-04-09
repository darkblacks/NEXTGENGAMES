import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Produto } from '../produto.entity';
import { ItemVenda } from '../../venda/item-venda.entity';

@Entity('tb_precos_produtos')
export class PrecoProduto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  valor: number;

  @Column({ type: 'date' })
  dataInicio: Date;

  @Column({ type: 'date', nullable: true })
  dataFim: Date | null;

  @Column({ default: true })
  ativo: boolean;

  @ManyToOne(() => Produto, (produto) => produto.precos, {
    eager: true,
    onDelete: 'CASCADE',
  })
  produto: Produto;

  @OneToMany(() => ItemVenda, (itemVenda) => itemVenda.precoProduto)
  itensVenda: ItemVenda[];
}