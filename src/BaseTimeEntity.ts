import { ApiProperty } from '@nestjs/swagger';
import {
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BaseTimeEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ type: CreateDateColumn })
    createdAt: string;

    @ApiProperty({ type: UpdateDateColumn })
    updatedAt: string;
}
