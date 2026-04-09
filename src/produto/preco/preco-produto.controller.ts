import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PrecoProduto } from './preco-produto.entity';
import { PrecoProdutoService } from './preco-produto.service';

@Controller('/precos')
export class PrecoProdutoController {
  constructor(private readonly precoService: PrecoProdutoService) {}

  @Get()
  findAll(): Promise<PrecoProduto[]> {
    return this.precoService.findAll();
  }

  @Get('/:id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<PrecoProduto | null> {
    return this.precoService.findById(id);
  }

  @Get('/produto/:produtoId')
  findByProduto(
    @Param('produtoId', ParseIntPipe) produtoId: number,
  ): Promise<PrecoProduto[]> {
    return this.precoService.findByProduto(produtoId);
  }

  @Get('/produto/:produtoId/ativo')
  findAtivoByProduto(
    @Param('produtoId', ParseIntPipe) produtoId: number,
  ): Promise<PrecoProduto | null> {
    return this.precoService.findAtivoByProduto(produtoId);
  }

  @Post()
  create(@Body() preco: PrecoProduto): Promise<PrecoProduto> {
    return this.precoService.create(preco);
  }

  @Put()
  update(@Body() preco: PrecoProduto): Promise<PrecoProduto> {
    return this.precoService.update(preco);
  }

  @HttpCode(204)
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.precoService.delete(id);
  }
}