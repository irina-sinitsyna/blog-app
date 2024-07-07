import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogPostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}

export class UpdateBlogPostDto {
  @IsString()
  title?: string;

  @IsString()
  content?: string;
}
