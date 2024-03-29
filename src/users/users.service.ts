import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

   async findOne(id: number) {
    if(!id){
      return null
    }
    // findOne with findOne
    const user = await this.repo.findOne({ where: { id } });
    
    return user
    
    //find user where id raw query
    // return this.repo.query(`SELECT * FROM "User" where id = ${id}`);
  }
  find(email: string) {
    //find
    return this.repo.find({ where: { email } });
    // return this.repo.query(`SELECT * FROM "User" where email = ${email}`)
  }

  async update(id: number, attr: Partial<User>) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attr);
    return this.repo.save(user);
  }
  async remove(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }
}
