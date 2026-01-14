import {
  Controller,
  Post,
  HttpStatus,
  HttpCode,
  Body,
  Req,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/Guards/jwt-auth.guard';
import { CreateTaskDto } from './dto/createTask.dto';
import { TasksService } from './tasks.service';

@Controller('task')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':projectId/tasks')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @Param('projectId', ParseIntPipe) projectId: number,
    @Req() req,
  ) {
    const userId = req.user.id;
    return this.tasksService.createTasks(projectId, createTaskDto, userId);
  }
}
