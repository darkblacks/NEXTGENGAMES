import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Vendedor } from './vendedor.entity';

@Injectable()
export class VendedorService {
  constructor(
    @InjectRepository(Vendedor)
    private readonly vendedorRepository: Repository<Vendedor>,
  ) {}

  findAll(): Promise<Vendedor[]> {
    return this.vendedorRepository.find({
      relations: ['vendas'],
    });
  }

  findById(id: number): Promise<Vendedor | null> {
    return this.vendedorRepository.findOne({
      where: { id },
      relations: ['vendas'],
    });
  }

  findByNome(nome: string): Promise<Vendedor[]> {
    return this.vendedorRepository.find({
      where: { nome: ILike(`%${nome}%`) },
      relations: ['vendas'],
    });
  }

  async create(vendedor: Vendedor): Promise<Vendedor> {
    return this.vendedorRepository.save(vendedor);
  }

  async update(vendedor: Vendedor): Promise<Vendedor> {
    const existe = await this.findById(vendedor.id);

    if (!existe) {
      throw new NotFoundException('Vendedor não encontrado!');
    }

    return this.vendedorRepository.save(vendedor);
  }

  async delete(id: number): Promise<void> {
    const existe = await this.findById(id);

    if (!existe) {
      throw new NotFoundException('Vendedor não encontrado!');
    }

    await this.vendedorRepository.delete(id);
  }
}