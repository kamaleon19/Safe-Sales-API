import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

import { CreateUserDto, LoginUserDto } from './dto/';
import { User } from './entities/user.entity';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository : Repository<User>
  ){}

  async register(createUserDto: CreateUserDto) {

    try {
      const { password, ...userData } = createUserDto

    const user = await this.userRepository.create({
      ...userData,
      password: bcrypt.hashSync(password, 10),
    })

    await this.userRepository.save(user)

    delete user.password

    return user

    } catch (error) {
      return error
    }
  }

  async login(loginUserDto: LoginUserDto) {
    
    const { email, password } = loginUserDto

    const user = await this.userRepository.findOne({
      where: { email },
      select: { id: true, email: true, name: true, password: true }
    })

    if(!user){
      throw new UnauthorizedException(`Invalid credentials (email)`)
    }

    if(!bcrypt.compareSync(password, user.password)){
      throw new UnauthorizedException(`Invalid credentials (passowrd)`)
    }

    delete user.password

    return user
    
  }

}
