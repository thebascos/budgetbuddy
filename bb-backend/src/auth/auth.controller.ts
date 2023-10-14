import {
  Post,
  Body,
  Controller,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from 'src/dtos/signup.dto';
import { LogInDTO } from 'src/dtos/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { BudgetDTO } from 'src/dtos/budget.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('/signup')
  async signup(
    @Body() signupDTO: SignUpDTO,
  ): Promise<{ access_token: string }> {
    const user = await this.authservice.addUser(signupDTO);
    // const user = await this.authservice.validateUser(signupDTO);
    const token = await this.authservice.generateToken(user);
    return token;
  }

  @Post('/login')
  async login(@Body() loginDTO: LogInDTO): Promise<{ access_token: string }> {
    const user = await this.authservice.validateUser(loginDTO);
    const token = await this.authservice.generateToken(user);
    return token;
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  getUserInfo(@Request() req) {
    const user = req.user;
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout() {
    return { message: 'Logout successful' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create-budget')
  createTicket(@Body() budgetData: BudgetDTO, @Request() req) {
    return this.authservice.createBudget(budgetData, req.user.id);
  }
}
