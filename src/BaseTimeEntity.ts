import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseTimeEntity {
    @ApiProperty({ type: String, example: 1, description: 'table ID' })
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ type: Date })
    @Column()
    createdAt: Date;

    @ApiProperty({ type: Date })
    @Column()
    updatedAt: Date;
}
