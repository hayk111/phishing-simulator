import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ManagementService } from './phishing-management.service';
import { ManagementController } from './phishing-management.controller';
import { User, UserSchema } from './schemas/user.schema';
import {
  PhishingAttempt,
  PhishingAttemptSchema,
} from './schemas/phishing-attempt.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: PhishingAttempt.name, schema: PhishingAttemptSchema },
    ]),
  ],
  controllers: [ManagementController],
  providers: [ManagementService],
})
export class ManagementModule {}
