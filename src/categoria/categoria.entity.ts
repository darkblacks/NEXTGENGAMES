import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Produto } from '../produto/produto.entity';

@Entity('tb_categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 255 })
  descricao: string;

  @OneToMany(() => Produto, (produto) => produto.categoria)
  produtos: Produto[];
}