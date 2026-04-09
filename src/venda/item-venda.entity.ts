import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Venda } from './venda.entity';
import { Produto } from '../produto/produto.entity';
import { PrecoProduto } from '../produto/preco/preco-produto.entity';

@Entity('tb_itens_venda')
export class ItemVenda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantidade: number;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @ManyToOne(() => Venda, (venda) => venda.itens, {
    onDelete: 'CASCADE',
  })
  venda: Venda;

  @ManyToOne(() => Produto, (produto) => produto.itensVenda, {
    eager: true,
  })
  produto: Produto;

  @ManyToOne(() => PrecoProduto, (precoProduto) => precoProduto.itensVenda, {
    eager: true,
  })
  precoProduto: PrecoProduto;
}