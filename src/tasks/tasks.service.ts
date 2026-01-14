import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/createTask.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTasks(
    projectId: number,
    createTasksDto: CreateTaskDto,
    userId: number,
  ) {
    const project = await this.prismaService.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException('Projeto não encontrado!');
    }

    if (project.ownerId !== userId) {
      throw new ForbiddenException('Usúario sem permissão!');
    }

    const task = await this.prismaService.task.create({
      data: {
        ...createTasksDto,
        projectId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        dueDate: true,
        assignedTo: true,
      },
    });

    return task;
  }
}
