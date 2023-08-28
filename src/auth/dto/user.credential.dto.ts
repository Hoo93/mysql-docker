import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UserCredentialDto {
    @ApiProperty({ type: String })
    @IsString()
    @MinLength(2)
    name: string;

    @ApiProperty({ type: String })
    @IsString()
    @MinLength(2)
    password: string;
}
