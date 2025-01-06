import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @MinLength(4)
  title: string;

  @IsBoolean()
  @IsOptional()
  done: boolean;
}
