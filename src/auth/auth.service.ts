// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { UsuarioLogin } from './usuario-login';
import { Bcrypt } from './bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(usuario: string, senha: string): Promise<any> {
    const usuarioBanco = await this.usuarioService.findByUsuario(usuario);

    const senhaValida = await Bcrypt.compararSenhas(
      senha,
      usuarioBanco.senha,
    );

    if (!senhaValida) {
      throw new UnauthorizedException('Usuário ou senha inválidos!');
    }

    const { senha: _, ...resultado } = usuarioBanco;
    return resultado;
  }

  async login(usuarioLogin: UsuarioLogin) {
    const payload = { sub: usuarioLogin.usuario };

    return {
      id: usuarioLogin.id,
      nome: usuarioLogin.nome,
      usuario: usuarioLogin.usuario,
      foto: usuarioLogin.foto,
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }
}