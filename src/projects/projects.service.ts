import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/projects.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProjects(createProjectDto: CreateProjectDto, ownerId) {
    const projects = await this.prismaService.project.create({
      data: {
        ...createProjectDto,
        ownerId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        color: true,
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        tasks: true,
      },
    });

    return projects;
  }
}
