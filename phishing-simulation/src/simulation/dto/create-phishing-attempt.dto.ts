import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreatePhishingAttemptDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  message: string;
}
