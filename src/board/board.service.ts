import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,
    ) {}

    async create(createBoardDto: CreateBoardDto) {
        return 'This action adds a new board';
    }

    async findAll() {
        return `This action returns all board`;
    }

    async getOneById(id: number) {
        return `This action returns a #${id} board`;
    }

    async update(id: number, updateBoardDto: UpdateBoardDto) {
        return `This action updates a #${id} board`;
    }

    async remove(id: number) {
        return `This action removes a #${id} board`;
    }
}
