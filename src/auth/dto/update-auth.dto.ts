import { PartialType } from '@nestjs/swagger';
import { CreateAuthDto } from './user.credential.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
