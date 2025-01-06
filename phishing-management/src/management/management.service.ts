import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import {
  PhishingAttempt,
  PhishingAttemptDocument,
} from './schemas/phishing-attempt.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ManagementService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(PhishingAttempt.name)
    private phishingAttemptModel: Model<PhishingAttemptDocument>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userModel.findOne({ email, password }).exec();
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.jwtService.sign({ email: user.email, sub: user._id });
  }

  async getAllPhishingAttempts(): Promise<PhishingAttempt[]> {
    return this.phishingAttemptModel.find().exec();
  }

  async getPhishingAttempt(id: string): Promise<PhishingAttempt> {
    return this.phishingAttemptModel.findById(id).exec();
  }
}
