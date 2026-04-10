// preco-produto.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrecoProduto } from './preco-produto.entity';

@Injectable()
export class PrecoProdutoService {
  constructor(
    @InjectRepository(PrecoProduto)
    private readonly precoRepository: Repository<PrecoProduto>,
  ) {}

  async findAll(): Promise<PrecoProduto[]> {
    const precos = await this.precoRepository.find();

    if (precos.length === 0) {
      throw new NotFoundException('Nada Encontrado');
    }

    return precos;
  }

  async findById(id: number): Promise<PrecoProduto> {
    const preco = await this.precoRepository.findOne({
      where: { id },
    });

    if (!preco) {
      throw new NotFoundException('Preço não encontrado!');
    }

    return preco;
  }

  async findByProduto(produtoId: number): Promise<PrecoProduto[]> {
    const precos = await this.precoRepository.find({
      where: {
        produto: { id: produtoId },
      },
      order: {
        dataInicio: 'DESC',
      },
    });

    if (precos.length === 0) {
      throw new NotFoundException('Nada Encontrado');
    }

    return precos;
  }

  async findAtivoByProduto(produtoId: number): Promise<PrecoProduto> {
    const preco = await this.precoRepository.findOne({
      where: {
        produto: { id: produtoId },
        ativo: true,
      },
      order: {
        dataInicio: 'DESC',
      },
    });

    if (!preco) {
      throw new NotFoundException('Nada Encontrado');
    }

    return preco;
  }

  async create(preco: PrecoProduto): Promise<PrecoProduto> {
    return this.precoRepository.save(preco);
  }

  async update(preco: PrecoProduto): Promise<PrecoProduto> {
    await this.findById(preco.id);
    return this.precoRepository.save(preco);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.precoRepository.delete(id);
  }
}