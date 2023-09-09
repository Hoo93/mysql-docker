import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Repository 구현 방법 1
// 문제점 : test 코드 작성이 어려움
// nest test 를 사용하는 방법으로 repository pattern 구현하는 방법이 없을 까 ?
// @Injectable()
// export class UserRepository extends Repository<User> {
//     constructor(private readonly dataSource: DataSource) {
//         super(User, dataSource.createEntityManager());
//     }
// }

// Repository 구현 방법 2
// 문제점 : 의존성 문제 해결이 안됨 ..
// @Injectable()
// export class UserRepository extends Repository<User> {
//     constructor(
//         @InjectRepository(User)
//         private repositoy: Repository<User>,
//     ) {
//         super(repositoy.target, repositoy.manager, repositoy.queryRunner);
//     }
// }

// Repository 구현 방법 3
// Repository class 구현하지 않고 service 에 @InjectRepository로 바로 구현 -> 공식문서
// 장점 : test code 구현 가능 !
// 단점 : 추후에 커스터마이징 불가능 ?!
