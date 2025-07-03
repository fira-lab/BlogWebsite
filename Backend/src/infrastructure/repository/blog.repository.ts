import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { BLOG_MODEL_PROVIDER } from '@constants';
import { Blog } from '@infrastructure/models/blog.model';
import { createBlindIndex } from 'dist/infrastructure/models/auth.model';

@Injectable()
export class BlogRepository {
  constructor(
    @Inject(BLOG_MODEL_PROVIDER) private readonly blogModel: Model<Blog>,
  ) {}

  async create(blogData: Partial<Blog>): Promise<Blog> {
    const newBlog = new this.blogModel(blogData);
    return await newBlog.save();
  }

  async findByTitle(title: string): Promise<Blog> {
    const titleHash = createBlindIndex(title);
    const query = this.blogModel.findOne({ titleHash });
    const blog = await query.exec();
    return blog;
  }

  async deleteById(id: string): Promise<void> {
    await this.blogModel.findOneAndDelete({ id }).exec();
  }

  async findById(id: string): Promise<Blog> {
    const query = this.blogModel.findOne({ id });
    return await query.exec();
  }

  async findBlogsByCategory(category: string): Promise<Blog[]> {
    const query = this.blogModel.find({ category });
    return await query.exec();
  }
}
