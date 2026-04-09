import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categoria } from '../categoria/categoria.entity';
import { ConsoleEntity } from './console/console.entity';
import { Game } from './game/game.entity';
import { PrecoProduto } from './preco/preco-produto.entity';
import { ItemVenda } from '../venda/item-venda.entity';

@Entity('tb_produtos')
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  nome: string;

  @Column({ length: 255 })
  descricao: string;

  @Column()
  quantidadeEstoque: number;

  @Column({ default: true })
  tipoProduto: boolean; // true = console | false = game

  @ManyToOne(() => Categoria, (categoria) => categoria.produtos, {
    eager: true,
  })
  categoria: Categoria;

  @OneToOne(() => ConsoleEntity, (console) => console.produto)
  console: ConsoleEntity;

  @OneToOne(() => Game, (game) => game.produto)
  game: Game;

  @OneToMany(() => PrecoProduto, (preco) => preco.produto)
  precos: PrecoProduto[];

  @OneToMany(() => ItemVenda, (itemVenda) => itemVenda.produto)
  itensVenda: ItemVenda[];
}