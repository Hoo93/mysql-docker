import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseTimeEntity {
    @ApiProperty({ type: String, example: 1, description: 'user ID' })
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ type: Date })
    createdAt: Date;

    @ApiProperty({ type: Date })
    updatedAt: Date;
}
