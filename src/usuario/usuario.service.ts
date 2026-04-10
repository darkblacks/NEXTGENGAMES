// src/usuario/usuario.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Bcrypt } from '../auth/bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    const usuarios = await this.usuarioRepository.find();

    if (usuarios.length === 0) {
      throw new NotFoundException('Nada Encontrado');
    }

    return usuarios;
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    return usuario;
  }

  async findByUsuario(usuario: string): Promise<Usuario> {
    const busca = await this.usuarioRepository.findOne({
      where: { usuario },
    });

    if (!busca) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    return busca;
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const existeUsuario = await this.usuarioRepository.findOne({
      where: { usuario: usuario.usuario },
    });

    if (existeUsuario) {
      throw new BadRequestException('O usuário já existe!');
    }

    usuario.senha = await Bcrypt.criptografarSenha(usuario.senha);
    return this.usuarioRepository.save(usuario);
  }

  async update(usuario: Usuario): Promise<Usuario> {
    await this.findById(usuario.id);

    const outroUsuario = await this.usuarioRepository.findOne({
      where: { usuario: usuario.usuario },
    });

    if (outroUsuario && outroUsuario.id !== usuario.id) {
      throw new BadRequestException('O usuário já existe!');
    }

    usuario.senha = await Bcrypt.criptografarSenha(usuario.senha);
    return this.usuarioRepository.save(usuario);
  }
}