import { Auth } from './entity/auth.entity';
import { PrismaService } from './../prisma/prisma.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(email: string, password: string): Promise<Auth> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      throw new NotFoundException(`Nenhum usuário encontrado com o email: ${email}`);
    }

    const passwordValid = user.password === password;

    if (!passwordValid) {
      throw new UnauthorizedException('Senha Inválida');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
  
  validateUser(userId: string) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }
}