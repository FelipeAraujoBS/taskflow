import { IsInt, IsEnum, IsOptional } from 'class-validator';
import { ProjectRole } from '@prisma/client';

export class AddMemberDto {
  @IsInt()
  userId: number;

  @IsEnum(ProjectRole)
  @IsOptional()
  role?: ProjectRole;
}
