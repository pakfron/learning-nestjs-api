import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  NotFoundException,
  Session,
  UseGuards,
  
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrenUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from 'src/interceptors/current-user.interceptor';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  
  @Get('/colors/:color')
  setColor(@Param('color') color: string, @Session() Session: any) {
    Session.color = color;
  }

  @Get('colors')
  getColor(@Session() Session: any) {
    return Session.color;
  }

  // @Get('/whoami')
  // WhoAmI(@Session() Session:any){
  //   return this.usersService.findOne(Session.userId)
  // }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  WhoAmI(@CurrenUser() user:User) {
    return user
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto ,@Session() session:any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id
    return user
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session:any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id
    return user
  }

  @Post('/signout')
  signOut(@Session() session:any){
    session.userId = null
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
