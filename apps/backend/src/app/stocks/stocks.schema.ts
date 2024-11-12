import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StockDocument = Stock & Document;

@Schema()
export class Stock {
  @Prop({ required: true })
  symbol: string;

  @Prop()
  exchange: string;

  @Prop()
  name: string;

  @Prop()
  exchangeShortName: string;

  @Prop()
  price: number;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
