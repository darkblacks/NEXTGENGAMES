// venda.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venda } from './venda.entity';

@Injectable()
export class VendaService {
  constructor(
    @InjectRepository(Venda)
    private readonly vendaRepository: Repository<Venda>,
  ) {}

  async findAll(): Promise<Venda[]> {
    const vendas = await this.vendaRepository.find();

    if (vendas.length === 0) {
      throw new NotFoundException('Nada Encontrado');
    }

    return vendas;
  }

  async findById(id: number): Promise<Venda> {
    const venda = await this.vendaRepository.findOne({
      where: { id },
    });

    if (!venda) {
      throw new NotFoundException('Venda não encontrada!');
    }

    return venda;
  }

  async create(venda: Venda): Promise<Venda> {
    if (!venda.dataVenda) {
      venda.dataVenda = new Date();
    }

    return this.vendaRepository.save(venda);
  }

  async update(venda: Venda): Promise<Venda> {
    await this.findById(venda.id);
    return this.vendaRepository.save(venda);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.vendaRepository.delete(id);
  }
}