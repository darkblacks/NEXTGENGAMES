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

  findAll(): Promise<PrecoProduto[]> {
    return this.precoRepository.find();
  }

  findById(id: number): Promise<PrecoProduto | null> {
    return this.precoRepository.findOne({ where: { id } });
  }

  findByProduto(produtoId: number): Promise<PrecoProduto[]> {
    return this.precoRepository.find({
      where: {
        produto: { id: produtoId },
      },
      order: {
        dataInicio: 'DESC',
      },
    });
  }

  findAtivoByProduto(produtoId: number): Promise<PrecoProduto | null> {
    return this.precoRepository.findOne({
      where: {
        produto: { id: produtoId },
        ativo: true,
      },
      order: {
        dataInicio: 'DESC',
      },
    });
  }

  async create(preco: PrecoProduto): Promise<PrecoProduto> {
    return this.precoRepository.save(preco);
  }

  async update(preco: PrecoProduto): Promise<PrecoProduto> {
    const existe = await this.findById(preco.id);

    if (!existe) {
      throw new NotFoundException('Preço não encontrado!');
    }

    return this.precoRepository.save(preco);
  }

  async delete(id: number): Promise<void> {
    const existe = await this.findById(id);

    if (!existe) {
      throw new NotFoundException('Preço não encontrado!');
    }

    await this.precoRepository.delete(id);
  }
}