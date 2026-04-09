import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Produto } from '../produto.entity';
import { Game } from '../game/game.entity';

@Entity('tb_consoles')
export class ConsoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80 })
  fabricante: string;

  @Column({ length: 100 })
  modelo: string;

  @Column({ length: 50 })
  armazenamento: string;

  @Column({ length: 50 })
  cor: string;

  @OneToOne(() => Produto, (produto) => produto.console, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  produto: Produto;

  @ManyToMany(() => Game, (game) => game.consoles)
  games: Game[];
}