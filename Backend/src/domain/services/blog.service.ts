import { Injectable } from '@nestjs/common';

import { Blog } from '@infrastructure/models/blog.model';
import { BlogRepository } from '@infrastructure/repository/blog.repository';

@Injectable()
export class BlogService {
  constructor(private readonly blogRepository: BlogRepository) {}

  async createBlog(blogData: Partial<Blog>): Promise<Blog> {
    return await this.blogRepository.create(blogData);
  }

  async getBlogById(id: string): Promise<Blog> {
    const blog = await this.blogRepository.findById(id);
    if (!blog) {
      throw new Error(`Blog with ID ${id} not found`);
    }
    return blog;
  }

  async getBlogByTitle(title: string): Promise<Blog> {
    const blog = await this.blogRepository.findByTitle(title);
    if (!blog) {
      throw new Error(`Blog with title ${title} not found`);
    }
    return blog;
  }

  async getBlogsByCategory(category: string): Promise<Blog[]> {
    const blogs = await this.blogRepository.findBlogsByCategory(category);
    return blogs;
  }

  async deleteBlog(id: string): Promise<void> {
    const blog = await this.blogRepository.findById(id);
    if (!blog) {
      throw new Error(`Blog with ID ${id} not found`);
    }
    await this.blogRepository.deleteById(id);
  }

  async updateBlog(id: string, blogData: Partial<Blog>): Promise<Blog> {
    const existingBlog = await this.blogRepository.findById(id);
    if (!existingBlog) {
      throw new Error(`Blog with ID ${id} not found`);
    }

    const updatedBlog = Object.assign(existingBlog, blogData);
    return await this.blogRepository.create(updatedBlog);
  }
}
