import { Injectable } from '@nestjs/common';
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
  ) {}

  async getAllPhishingAttempts(): Promise<PhishingAttempt[]> {
    return this.phishingAttemptModel.find().exec();
  }

  async getPhishingAttemptById(id: string): Promise<PhishingAttempt> {
    return this.phishingAttemptModel.findById(id).exec();
  }

  async sendPhishingEmail(email: string, message: string): Promise<any> {
    // const phishingAttempt = new this.phishingAttemptModel({ email, message });
    // return phishingAttempt.save();
  }
}
