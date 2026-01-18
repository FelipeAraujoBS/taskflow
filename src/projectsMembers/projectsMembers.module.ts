import { Module, Global } from '@nestjs/common';
import { ProjectsMembersController } from './projectsMembers.controller';
import { ProjectsMembersService } from './projectsMembers.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'string',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [ProjectsMembersService],
  controllers: [ProjectsMembersController],
})
export class ProjectsMembersModule {}
