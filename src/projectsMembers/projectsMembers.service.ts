import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddMemberDto } from './dto/projectsMembers.dto';

@Injectable()
export class ProjectsMembersService {
  constructor(private readonly prismaService: PrismaService) {}

  async addProjectMember(projectId: number, addMemberDto: AddMemberDto) {
    const { userId, role } = addMemberDto;

    const existingProjectMember =
      await this.prismaService.projectMember.findUnique({
        where: {
          projectId_userId: {
            projectId,
            userId,
          },
        },
      });

    if (existingProjectMember) {
      throw new ConflictException('Usuario já cadastrado a esse projeto!');
    }

    return this.prismaService.projectMember.create({
      data: {
        projectId,
        userId,
        role,
      },
    });
  }
}
