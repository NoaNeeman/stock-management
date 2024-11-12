import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'user_portfolios' })
export class UserPortfolio extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({
    type: [
      {
        stock: { type: Types.ObjectId, ref: 'Stock' }, // Reference to the Stock model
        quantity: { type: Number, required: true },
      },
    ],
    required: true,
  })
  stocks: { stock: Types.ObjectId; quantity: number }[];
}

export const UserPortfolioSchema = SchemaFactory.createForClass(UserPortfolio);
