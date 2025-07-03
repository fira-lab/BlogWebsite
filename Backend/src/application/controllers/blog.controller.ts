import { Injectable } from '@nestjs/common';
import { Blog } from '@domain/entities/Blog';
import { CreateBlogDto } from '@application/dto/create-blog.dto';
import { BlogRepository } from '@infrastructure/repository/blog.repository';
import { QueryBus } from '@nestjs/cqrs';
// Update the import path below to the correct relative path if needed
import { FindBlogsQuery } from '../blog/query/find-blogs.query';
import { FindBlogByIdQuery } from '@application/blog/query/find-blog-by-id.query';
import { LoggerService, Context } from '@domain/services/logger.service';
import { Category } from '@domain/entities/enums/category.enum';

@Injectable()
export class BlogService {
  constructor(
    private readonly repository: BlogRepository,
    private readonly queryBus: QueryBus,
    private readonly logger: LoggerService,
  ) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const context: Context = { module: 'BlogService', method: 'create' };
    this.logger.logger(
      `Creating blog with title: ${createBlogDto.title}`,
      context,
    );
    return await this.repository.create(createBlogDto);
  }

  async find(): Promise<Blog[]> {
    const context: Context = { module: 'BlogService', method: 'find' };
    this.logger.logger('Fetching all blogs', context);
    return this.queryBus.execute(new FindBlogsQuery());
  }

  async findById(id: string): Promise<Blog | null> {
    const context: Context = { module: 'BlogService', method: 'findById' };
    this.logger.logger(`Fetching blog for id: ${id}`, context);
    return this.queryBus.execute(new FindBlogByIdQuery(id));
  }

  async findByCategory(category: Category): Promise<Blog[]> {
    const context: Context = {
      module: 'BlogService',
      method: 'findByCategory',
    };
    this.logger.logger(`Fetching blogs with category: ${category}`, context);
    return this.repository.findBlogsByCategory(category);
  }
}
