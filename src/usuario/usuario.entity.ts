// src/usuario/usuario.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 100, unique: true })
  usuario: string;

  @Column({ length: 255 })
  senha: string;

  @Column({ length: 500, nullable: true })
  foto?: string;
}