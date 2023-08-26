import { ApiProperty } from '@nestjs/swagger';

export class UserCredentialDto {
    @ApiProperty({ type: String })
    name: string;

    @ApiProperty({ type: String })
    password;
}
