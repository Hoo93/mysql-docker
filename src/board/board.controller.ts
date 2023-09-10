import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Post()
    create(@Body() createBoardDto: CreateBoardDto) {
        return this.boardService.create(createBoardDto);
    }

    @Get()
    findAll() {
        return this.boardService.findAll();
    }

    @Get(':id')
    getOneById(@Param('id') id: string) {
        return this.boardService.getOneById(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
        return this.boardService.update(+id, updateBoardDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.boardService.remove(+id);
    }
}
