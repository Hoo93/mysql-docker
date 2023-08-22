import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeEntity } from 'src/BaseTimeEntity';

export class User extends BaseTimeEntity {
    @ApiProperty({ type: String })
    name: string;

    @ApiProperty({ type: String })
    password: string;

    @ApiProperty({ type: String })
    email: string;
}
