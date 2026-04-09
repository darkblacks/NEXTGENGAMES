import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Produto } from './produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) {}

  findAll(): Promise<Produto[]> {
    return this.produtoRepository.find({
      relations: ['precos', 'console', 'game'],
    });
  }

  findById(id: number): Promise<Produto | null> {
    return this.produtoRepository.findOne({
      where: { id },
      relations: ['precos', 'console', 'game'],
    });
  }

  findByNome(nome: string): Promise<Produto[]> {
    return this.produtoRepository.find({
      where: { nome: ILike(`%${nome}%`) },
      relations: ['precos', 'console', 'game'],
    });
  }

  async create(produto: Produto): Promise<Produto> {
    return this.produtoRepository.save(produto);
  }

  async update(produto: Produto): Promise<Produto> {
    const existe = await this.findById(produto.id);

    if (!existe) {
      throw new NotFoundException('Produto não encontrado!');
    }

    return this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<void> {
    const existe = await this.findById(id);

    if (!existe) {
      throw new NotFoundException('Produto não encontrado!');
    }

    await this.produtoRepository.delete(id);
  }
}