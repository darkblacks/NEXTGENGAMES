import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Categoria } from './categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    
      if (await this.categoriaRepository.count() === 0) {
      throw new NotFoundException('Nada Encontrado');
    }

    return this.categoriaRepository.find({
      relations: ['produtos'],
    });
  }

  findById(id: number): Promise<Categoria | null> {
    return this.categoriaRepository.findOne({
      where: { id },
      relations: ['produtos'],
    });
  }


    async findByNome(nome: string): Promise<Categoria[]> {
    const categorias = await this.categoriaRepository.find({
      where: { nome: ILike(`%${nome}%`) },
      relations: ['produtos'],
    });

    if  (categorias.length === 0) {
      throw new NotFoundException('Nada Encontrado');
    }
    
    return categorias;
  }

  async create(categoria: Categoria): Promise<Categoria> {
    return this.categoriaRepository.save(categoria);
  }

  async update(categoria: Categoria): Promise<Categoria> {
    const existe = await this.findById(categoria.id);

    if (!existe) {
      throw new NotFoundException('Categoria não encontrada!');
    }

    return this.categoriaRepository.save(categoria);
  }

  async delete(id: number): Promise<void> {
    const existe = await this.findById(id);

    if (!existe) {
      throw new NotFoundException('Categoria não encontrada!');
    }

    await this.categoriaRepository.delete(id);
  }
}