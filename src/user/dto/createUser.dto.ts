import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto {
    @ApiProperty({
        description: '회원 이름',
        example: 'test name',
        pattern: `/^[ㄱ-ㅎ가-힣a-zA-Z\s+]+$/`,
        maxLength: 10,
    })
    @IsString()
    @Matches(/^[ㄱ-ㅎ가-힣a-zA-Z\s+]+$/)
    @MinLength(2)
    @MaxLength(10)
    name: string;

    @ApiProperty({
        example: 'test password',
        description: '비밀번호',
        pattern: '/^(?=.*[a-zA-Z])(?=.*d)(?=.*[!@#$%^*])[A-Za-zd!@#$%^*]+$/',
        maxLength: 12,
    })
    @IsString()
    @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^*])[A-Za-z\d!@#$%^*]+$/)
    @MinLength(2)
    @MaxLength(12)
    password: string;

    @ApiProperty({ example: 'test@email.com', description: '이메일' })
    @IsEmail()
    email: string;

    public toEntity(): User {
        const now = new Date();
        return User.signup(this.name, this.password, this.email, now, now);
    }
}
