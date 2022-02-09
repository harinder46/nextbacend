import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { AuthService } from './auth.service';
import { RegisterDTO } from '../users/register.dto';
import { LoginDTO } from './login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
        
      ) {}
 @Get("onlyauth")
 @UseGuards(AuthGuard("jwt"))
 
  async hiddenInformation(){
    return  "hidden information";
  }
  
       @Get("anyone")

async publicInformation(){
return  "this can be seen by anyone";
}

    @Post('register')
    async register(@Body() RegisterDTO: RegisterDTO) {
      const user = await this.userService.create(RegisterDTO);
      const payload = {
      
        email: user.email,
      };
  
      const token = await this.authService.signPayload(payload);
      return { user, token };
    }
    @Post('login')
    async login(@Body() UserDTO: LoginDTO) {
      const user = await this.userService.findByLogin(UserDTO);
      const payload = {
        email: user.email,
      };
      const token = await this.authService.signPayload(payload);
      return { user, token};
      // all change
    }

}

