import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PhishingAttemptDocument = PhishingAttempt & Document;

@Schema()
export class PhishingAttempt {
  @Prop({ required: true })
  email: string;

  @Prop()
  message?: string;

  @Prop({ default: false })
  clicked: boolean;
}

export const PhishingAttemptSchema =
  SchemaFactory.createForClass(PhishingAttempt);
