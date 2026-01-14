import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/projects.dto';
import { JwtAuthGuard } from 'src/Guards/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createProject(@Body() createProjectDto: CreateProjectDto, @Req() req) {
    const ownerId = req.user.id;
    return this.projectsService.createProjects(createProjectDto, ownerId);
  }

  @Get('find')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async readProject(@Req() req) {
    const ownerId = req.user.id;
    return this.projectsService.readProjects(ownerId);
  }

  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async updateProject(
    @Param('id', ParseIntPipe) projectId: number,
    @Body() updateProjectDto: UpdateProjectDto,
    @Req() req,
  ) {
    const ownerId = req.user.id;

    return this.projectsService.updateProject(
      projectId,
      updateProjectDto,
      ownerId,
    );
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async deleteProject(
    @Param('id', ParseIntPipe) projectId: number,
    @Req() req,
  ) {
    const ownerId = req.user.id;

    return this.projectsService.deleteProject(projectId, ownerId);
  }
}
