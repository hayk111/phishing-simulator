import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SimulationDocument = Simulation & Document;

@Schema()
export class Simulation {
  @Prop({ required: true })
  title: string;

  @Prop({ default: false })
  done: boolean;
}

export const SimulationSchema = SchemaFactory.createForClass(Simulation);
