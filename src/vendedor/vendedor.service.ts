// vendedor.service.ts
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

  async findAll(): Promise<Vendedor[]> {
    const vendedores = await this.vendedorRepository.find({
      relations: ['vendas'],
    });

    if (vendedores.length === 0) {
      throw new NotFoundException('Nada Encontrado');
    }

    return vendedores;
  }

  async findById(id: number): Promise<Vendedor> {
    const vendedor = await this.vendedorRepository.findOne({
      where: { id },
      relations: ['vendas'],
    });

    if (!vendedor) {
      throw new NotFoundException('Vendedor não encontrado!');
    }

    return vendedor;
  }

  async findByNome(nome: string): Promise<Vendedor[]> {
    const vendedores = await this.vendedorRepository.find({
      where: { nome: ILike(`%${nome}%`) },
      relations: ['vendas'],
    });

    if (vendedores.length === 0) {
      throw new NotFoundException('Nada Encontrado');
    }

    return vendedores;
  }

  async create(vendedor: Vendedor): Promise<Vendedor> {
    return this.vendedorRepository.save(vendedor);
  }

  async update(vendedor: Vendedor): Promise<Vendedor> {
    await this.findById(vendedor.id);
    return this.vendedorRepository.save(vendedor);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.vendedorRepository.delete(id);
  }
}