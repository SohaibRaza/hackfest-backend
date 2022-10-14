import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from '~src/db';
import { AuthenticationDto, LoginDto } from './dto/authentication.dto';
import { hash, compare } from '~src/lib';

@Injectable()
export class AuthenticationService {
  constructor(@InjectModel('User') private userModal: Model<UserDocument>) {}

  async signUp(params: AuthenticationDto): Promise<User> {
    const { email, username, password } = params;

    const isExisting = await this.userModal.findOne({
      $or: [{ email }, { username }],
    });

    if (isExisting) {
      throw new BadRequestException('This account is already in use');
    }

    const attrs = {
      email,
      username,
      password: await hash(password),
    };

    const user = new this.userModal(attrs);
    await user.save();

    return user;
  }

  async login(params: LoginDto): Promise<User> {
    const { email, password } = params;

    const user = await this.userModal.findOne({ email });

    if (!user) {
      throw new BadRequestException('Incorrect Credentials');
    }

    const isSamePassword = await compare(password, user.password);
    if (!isSamePassword) throw new BadRequestException('Incorrect Credentials');

    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModal.findOne({ email });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async findUserByUsername(username: string): Promise<User> {
    const user = await this.userModal.findOne({ username });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async findUserById(userId: string): Promise<User> {
    const user = await this.userModal.findById(userId);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
