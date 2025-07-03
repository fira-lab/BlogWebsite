import { Category } from 'dist/domain/entities/enums/category.enum';
import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: Category,
      default: Category.GENERAL,
    },
    authorId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    toJSON: { getters: true },
    toObject: { getters: true },
  },
);

export interface Blog extends mongoose.Document {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly category: Category;
  readonly authorId: string;
  readonly createdAt: Date;
}
