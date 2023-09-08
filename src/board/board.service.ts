import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
    async create(createBoardDto: CreateBoardDto) {
        return 'This action adds a new board';
    }

    async findAll() {
        return `This action returns all board`;
    }

    async findOne(id: number) {
        return `This action returns a #${id} board`;
    }

    async update(id: number, updateBoardDto: UpdateBoardDto) {
        return `This action updates a #${id} board`;
    }

    async remove(id: number) {
        return `This action removes a #${id} board`;
    }
}
