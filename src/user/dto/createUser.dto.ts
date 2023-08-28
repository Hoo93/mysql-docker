import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto {
    // @ApiProperty({ type: String })
    @IsString()
    @MinLength(2)
    @MaxLength(10)
    name: string;

    // @ApiProperty({ type: String })
    @IsString()
    @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^*])[A-Za-z\d!@#$%^*]+$/)
    @MinLength(2)
    @MaxLength(10)
    password: string;

    // @ApiProperty({ type: String })
    @IsEmail()
    email: string;

    public toEntity(): User {
        const now = new Date();
        return User.signup(this.name, this.password, this.email, now, now);
    }
}
