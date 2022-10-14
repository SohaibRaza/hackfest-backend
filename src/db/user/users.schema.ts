import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { USER_ROLES } from '~src/common/contants';

export type UserDocument = User & mongoose.Document;

@Schema({ timestamps: true })
export class User {
  id: string;

  @Prop({ unique: true, isRequired: true, trim: true })
  email: string;

  @Prop({ isRequired: true })
  password: string;

  @Prop({
    type: String,
    enum: USER_ROLES,
    default: 'user',
  })
  role: string;

  @Prop({ unique: true, isRequired: true })
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
