import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  blogPostId: string;
}

export class UpdateCommentDto {
  @ApiProperty()
  readonly author?: string;

  @ApiProperty()
  readonly content?: string;
}
