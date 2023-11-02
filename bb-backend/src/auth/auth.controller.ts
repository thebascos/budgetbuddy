import {
  Post,
  Body,
  Controller,
  UseGuards,
  Get,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from 'src/dtos/signup.dto';
import { LogInDTO } from 'src/dtos/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { BudgetDTO } from 'src/dtos/budget.dto';
import { ExpenseDTO } from 'src/dtos/expense.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @UseGuards(AuthGuard('jwt'))
  @Get('/budgets')
  async getTickets(@Request() req) {
    return await this.authservice.getBudgets(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create-expense')
  createExpense(@Body() expenseData: ExpenseDTO) {
    return this.authservice.createExpense(expenseData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('upload-file')
  @UseInterceptors(FileInterceptor('file', { dest: 'images' }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const baseUrl = 'http://localhost:3000';
    const filePathWithoutImages = file.path.replace('images/', ''); // Remove 'images' from the path

    const fileUrl = `${baseUrl}/${filePathWithoutImages}`;
    console.log('Uploaded file:', file);
    return {
      message: 'File uploaded successfully',
      fileUrl,
      fileName: file.originalname,
    };
  }
}
