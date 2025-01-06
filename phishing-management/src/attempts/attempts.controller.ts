import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { AttemptsService } from './attempts.service';
import { JwtAuthGuard } from '../jwt-auth.guard';

@Controller('attempts')
export class AttemptsController {
  constructor(private attemptsService: AttemptsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllPhishingAttempts() {
    return this.attemptsService.getAllPhishingAttempts();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getPhishingAttemptById(@Param('id') id: string) {
    return this.attemptsService.getPhishingAttemptById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('send')
  async sendPhishingEmail(@Body() body: { email: string; message: string }) {
    return this.attemptsService.sendPhishingEmail(body.email, body.message);
  }
}
