import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    Max,
    Min,
    max,
    min,
} from 'class-validator';
import { BaseTimeEntity } from 'src/BaseTimeEntity';
import { User } from '../entities/user.entity';

export class CreateUserDto {
    @ApiProperty({ type: String })
    @IsString()
    @Min(2)
    @Max(10)
    name: string;

    @ApiProperty({ type: String })
    @IsString()
    @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^*])[A-Za-z\d!@#$%^*]+$/)
    @Min(6)
    @Max(10)
    password: string;

    @ApiProperty({ type: String })
    @IsEmail()
    email: string;

    public toEntity(): User {
        const now = new Date();
        return User.signup(this.name, this.password, this.email, now, now);
    }
}
