// filepath: src/simulation/simulation.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PhishingAttempt,
  PhishingAttemptDocument,
} from './schemas/phishing-attempt.schema';
import { CreatePhishingAttemptDto } from './dto/create-phishing-attempt.dto';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class SimulationService {
  constructor(
    @InjectModel(PhishingAttempt.name)
    private phishingAttemptModel: Model<PhishingAttemptDocument>,
  ) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendPhishingEmail(
    createPhishingAttemptDto: CreatePhishingAttemptDto,
  ): Promise<PhishingAttempt> {
    const createdAttempt = new this.phishingAttemptModel(
      createPhishingAttemptDto,
    );
    await createdAttempt.save();

    const msg = {
      to: createPhishingAttemptDto.email,
      from: 'hayk.atoyan333@gmail.com',
      replyTo: 'hayk.atoyan111@gmail.com',
      subject: 'Phishing Test',
      text: `${createPhishingAttemptDto.message || 'Click the link to complete the phishing test:'} ${process.env.BASE_URL}/phishing/click/${createdAttempt._id}`,
    };

    await sgMail.send(msg);

    return createdAttempt;
  }

  async updatePhishingAttemptStatus(id: string): Promise<PhishingAttempt> {
    return this.phishingAttemptModel
      .findByIdAndUpdate(id, { clicked: true }, { new: true })
      .exec();
  }
}
