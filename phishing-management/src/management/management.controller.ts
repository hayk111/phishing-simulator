import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PhishingManagementService } from './phishing-management.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { PhishingAttempt } from './schemas/phishing-attempt.schema';

@Controller('management')
export class PhishingManagementController {
  constructor(
    private readonly phishingManagementService: PhishingManagementService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.phishingManagementService.register(createUserDto);
  }

  @Post('login')
  async login(
    @Body() loginDto: { email: string; password: string },
  ): Promise<string> {
    return this.phishingManagementService.login(
      loginDto.email,
      loginDto.password,
    );
  }

  @Get('attempts')
  async getAllPhishingAttempts(): Promise<PhishingAttempt[]> {
    return this.phishingManagementService.getAllPhishingAttempts();
  }

  @Get('attempt/:id')
  async getPhishingAttempt(@Param('id') id: string): Promise<PhishingAttempt> {
    return this.phishingManagementService.getPhishingAttempt(id);
  }
}
