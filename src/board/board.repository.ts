import { DataSource, Repository } from 'typeorm';
import { Board } from './entities/board.entity';

export class BoardRepository extends Repository<Board> {
    constructor(private readonly dataSource: DataSource) {
        super(Board, dataSource.createEntityManager());
    }
}
