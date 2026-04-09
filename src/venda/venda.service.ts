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

  findAll(): Promise<Venda[]> {
    return this.vendaRepository.find();
  }

  findById(id: number): Promise<Venda | null> {
    return this.vendaRepository.findOne({
      where: { id },
    });
  }

  async create(venda: Venda): Promise<Venda> {
    if (!venda.dataVenda) {
      venda.dataVenda = new Date();
    }

    return this.vendaRepository.save(venda);
  }

  async update(venda: Venda): Promise<Venda> {
    const existe = await this.findById(venda.id);

    if (!existe) {
      throw new NotFoundException('Venda não encontrada!');
    }

    return this.vendaRepository.save(venda);
  }

  async delete(id: number): Promise<void> {
    const existe = await this.findById(id);

    if (!existe) {
      throw new NotFoundException('Venda não encontrada!');
    }

    await this.vendaRepository.delete(id);
  }
}