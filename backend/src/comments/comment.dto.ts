import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  readonly author: string;

  @ApiProperty()
  readonly content: string;
}

export class UpdateCommentDto {
  @ApiProperty()
  readonly author?: string;

  @ApiProperty()
  readonly content?: string;
}
