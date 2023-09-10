import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from './board.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';

describe('BoardService', () => {
    let boardService: BoardService;
    let boardRepository: Repository<Board>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BoardService,
                {
                    provide: getRepositoryToken(Board),
                    useValue: {
                        create: jest.fn(),
                        update: jest.fn(),
                        save: jest.fn(),
                        findOneBy: jest.fn(),
                    },
                },
            ],
        }).compile();

        boardService = module.get<BoardService>(BoardService);
        boardRepository = module.get<Repository<Board>>(getRepositoryToken(Board));
    });

    it('should be defined', () => {
        expect(boardService).toBeDefined();
    });
});
