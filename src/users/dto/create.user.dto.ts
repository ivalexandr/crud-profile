import { CreateAuthDto } from 'src/auth/dto/create.auth.dto';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto extends CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
