import { IsString, IsNumber } from 'class-validator';

export class UpdateDts {
  @IsString()
  name?: string;

  @IsString()
  public about?: string;

  @IsString()
  public address?: string;

  @IsString()
  public phone?: string;
}
