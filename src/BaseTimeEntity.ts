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

    @ApiProperty({ type: String, description: '생성자' })
    @Column()
    creator: string;

    @ApiProperty({ type: Date })
    @Column()
    updatedAt: Date;

    @ApiProperty({ type: String, description: '변경자' })
    @Column()
    updator: string;
}
