import { Module, Global } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Global()
@Module({
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
