import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeEntity } from 'src/BaseTimeEntity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ schema: 'healthRecord', name: 'Board' })
export class Board extends BaseTimeEntity {
    @ApiProperty({ description: '글 제목', example: 'board title', minLength: 1, maxLength: 50 })
    @Column()
    title: string;

    @ApiProperty({
        description: '글 내용',
        example: 'this is board description',
        minLength: 1,
        maxLength: 50,
    })
    @Column()
    description: string;

    @ApiProperty({
        description: 'this is foreign key of category',
        example: 'board title',
    })
    @Column()
    categoryCode: string;

    @ManyToOne(() => User, (user) => user.boards)
    user: User;
}
