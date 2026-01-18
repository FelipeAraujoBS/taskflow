import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { LoginModule } from './login/login.module';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsMembersModule } from './projectsMembers/projectsMembers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    PrismaModule,
    ProjectsModule,
    LoginModule,
    TasksModule,
    ProjectsMembersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
