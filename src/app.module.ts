import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriaModule } from './categoria/categoria.module';
import { VendedorModule } from './vendedor/vendedor.module';
import { ProdutoModule } from './produto/produto.module';
import { PrecoProdutoModule } from './produto/preco/preco-produto.module';
import { VendaModule } from './venda/venda.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: Number(config.get('DB_PORT')),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    CategoriaModule,
    VendedorModule,
    ProdutoModule,
    PrecoProdutoModule,
    VendaModule,
    UsuarioModule,
    AuthModule,
  ],
})
export class AppModule {}