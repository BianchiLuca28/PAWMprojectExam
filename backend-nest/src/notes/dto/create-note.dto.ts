import { IsNotEmpty } from 'class-validator';

// Note received in the body
export class CreateNoteDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly content: string;
}
