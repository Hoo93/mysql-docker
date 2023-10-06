import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { attendanceType } from '../attendanceType.enum';

export class CreateAttendanceDto {
    @ApiProperty({
        type: String,
        description: '출석부 제목',
        example: 'this is attendance title',
    })
    @IsString()
    @MinLength(2)
    title: string;

    @ApiProperty({
        type: String,
        description: '출석부 설명',
        example: 'this is attendance description',
    })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({
        type: 'enum',
        enum: attendanceType,
        description: '출석부 타입 ( 주중 / 주말 )',
        example: 'Weekend',
    })
    @IsEnum(attendanceType)
    type: attendanceType;
}
