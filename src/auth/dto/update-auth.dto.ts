import { PartialType } from '@nestjs/swagger';
import { UserCredentialDto } from './user.credential.dto';

export class UpdateAuthDto extends PartialType(UserCredentialDto) {}
