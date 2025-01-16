import { Controller, Post, Body} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { User } from './entities/user.entity';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto,  } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Post('register')
  @ApiOperation({ summary: 'Crea un nuevo usuario y devuelve un JWT' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente', type: User })
  @ApiResponse({ status: 400, description: 'Error en los datos enviados' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
  @Post('login')
  @ApiOperation({ summary: 'Inicia sesión y devuelve un JWT' })
  @ApiResponse({ status: 201, description: 'Inicio de sesión exitoso'})
  @ApiResponse({ status: 401, description: 'Error en los datos enviados' })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }


 
}
