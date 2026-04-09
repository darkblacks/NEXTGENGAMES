import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Venda } from '../venda/venda.entity';

@Entity('tb_vendedores')
export class Vendedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 10 })
  matricula: string;

  @Column({ length: 120 })
  nome: string;

  @Column({ type: 'date' })
  dataDeNascimento: Date;

  @Column({ type: 'date' })
  dataDeRegistro: Date;

  @OneToMany(() => Venda, (venda) => venda.vendedor)
  vendas: Venda[];
}