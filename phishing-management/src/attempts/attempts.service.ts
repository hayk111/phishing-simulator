import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PhishingAttempt,
  PhishingAttemptDocument,
} from './schemas/phishing-attempt.schema';

@Injectable()
export class AttemptsService {
  constructor(
    @InjectModel(PhishingAttempt.name)
    private phishingAttemptModel: Model<PhishingAttemptDocument>,
    private httpService: HttpService,
  ) {}

  async getAllPhishingAttempts(): Promise<PhishingAttempt[]> {
    return this.phishingAttemptModel.find().exec();
  }

  async getPhishingAttemptById(id: string): Promise<PhishingAttempt> {
    return this.phishingAttemptModel.findById(id).exec();
  }

  async sendPhishingEmail(email: string, message: string): Promise<any> {
    const response = await this.httpService
      .post(`${process.env.SIMULATION_SERVICE_URL}/phishing/send`, {
        email,
        message,
      })
      .toPromise();
    return response.data;
  }
}
