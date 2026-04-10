// produto.service.ts
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

  async findAll(): Promise<Produto[]> {
    const produtos = await this.produtoRepository.find({
      relations: ['precos', 'console', 'game'],
    });

    if (produtos.length === 0) {
      throw new NotFoundException('Nada Encontrado');
    }

    return produtos;
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: ['precos', 'console', 'game'],
    });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado!');
    }

    return produto;
  }

  async findByNome(nome: string): Promise<Produto[]> {
    const produtos = await this.produtoRepository.find({
      where: { nome: ILike(`%${nome}%`) },
      relations: ['precos', 'console', 'game'],
    });

    if (produtos.length === 0) {
      throw new NotFoundException('Nada Encontrado');
    }

    return produtos;
  }

  async create(produto: Produto): Promise<Produto> {
    return this.produtoRepository.save(produto);
  }

  async update(produto: Produto): Promise<Produto> {
    await this.findById(produto.id);
    return this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.produtoRepository.delete(id);
  }
}