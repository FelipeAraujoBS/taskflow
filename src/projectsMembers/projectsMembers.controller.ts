import {
  Controller,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AddMemberDto } from './dto/projectsMembers.dto';
import { ProjectsMembersService } from './projectsMembers.service';

@Controller('project_member')
export class ProjectsMembersController {
  constructor(private readonly projectMemberService: ProjectsMembersService) {}

  @Post(':projectId')
  @HttpCode(HttpStatus.CREATED)
  createProjectMember(
    @Body() addMemberDto: AddMemberDto,
    @Param('projectId') projectId: number,
  ) {
    return this.projectMemberService.addProjectMember(
      Number(projectId),
      addMemberDto,
    );
  }
}
