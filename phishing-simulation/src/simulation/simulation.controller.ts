import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { CreatePhishingAttemptDto } from './dto/create-phishing-attempt.dto';
import { PhishingAttempt } from './schemas/phishing-attempt.schema';

@Controller('phishing')
export class SimulationController {
  constructor(private readonly simulationService: SimulationService) {}

  @Post('send')
  async sendPhishingEmail(
    @Body() createPhishingAttemptDto: CreatePhishingAttemptDto,
  ): Promise<PhishingAttempt> {
    return this.simulationService.sendPhishingEmail(createPhishingAttemptDto);
  }

  @Get('click/:id')
  async updatePhishingAttemptStatus(
    @Param('id') id: string,
  ): Promise<PhishingAttempt> {
    return this.simulationService.updatePhishingAttemptStatus(id);
  }
}
