import { Module, Global } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { UserModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'string',
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
  ],
  providers: [LoginService],
  controllers: [LoginController],
})
export class LoginModule {}
