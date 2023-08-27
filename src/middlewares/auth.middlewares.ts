import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
//여기에 유저 엔티티 임포트 해야함

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: any, res: any, next: Function) {
    const authHeader = req.cookies;
    if (!authHeader) {
      throw new UnauthorizedException('JWT not found');
    }

    let token: string;
    try {
      const authkey = authHeader.Authentication;
      const [authType, token] = authkey.split(' ');
      if (authType !== 'Bearer' || !token) {
        throw new UnauthorizedException('It is not Bearer type of token or abnormal token');
      }

      const payload = await this.jwtService.verify(token);
      req.user = payload;

      next();
    } catch (err) {
      throw new UnauthorizedException(`Invalid JWT: ${token}`);
    }
  }
}
