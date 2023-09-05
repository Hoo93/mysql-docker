import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeEntity } from 'src/BaseTimeEntity';
import { Column } from 'typeorm';

export class Board extends BaseTimeEntity {
    @ApiProperty()
    @Column()
    title: string;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty()
    @Column()
    category: string;
}
