import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

import { CreateUserDto, LoginUserDto } from './dto/';
import { User } from './entities/user.entity';
import { CommonService } from 'src/common/common.service';
import { JwtPayload } from './interfaces';



@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository : Repository<User>,

    private readonly commonService : CommonService,

    private readonly jwtService : JwtService
  ){}

  async register(createUserDto: CreateUserDto) {

    try {
      const { password, ...userData } = createUserDto

      const user = this.userRepository.create({
      ...userData,
      password: bcrypt.hashSync(password, 10),
    })

    await this.userRepository.save(user)

    delete user.password

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    }

    } catch (error) {
      return this.commonService.handleDBExceptions( error )
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

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    }
    
  }

  private getJwtToken ( payload : JwtPayload ){
    const token = this.jwtService.sign( payload )
    return token
  }

}
