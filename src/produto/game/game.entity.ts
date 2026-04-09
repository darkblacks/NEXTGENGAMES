import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Produto } from '../produto.entity';
import { ConsoleEntity } from '../console/console.entity';

@Entity('tb_games')
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80 })
  genero: string;

  @Column({ length: 20 })
  classificacaoIndicativa: string;

  @Column()
  anoLancamento: number;

  @Column({ default: false })
  multiplayer: boolean;

  @OneToOne(() => Produto, (produto) => produto.game, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  produto: Produto;

  @ManyToMany(() => ConsoleEntity, (console) => console.games)
  @JoinTable({
    name: 'tb_games_consoles',
    joinColumn: {
      name: 'game_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'console_id',
      referencedColumnName: 'id',
    },
  })
  consoles: ConsoleEntity[];
}