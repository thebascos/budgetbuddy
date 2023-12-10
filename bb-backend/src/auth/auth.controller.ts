import {
  Post,
  Body,
  Controller,
  UseGuards,
  Get,
  Request,
  UseInterceptors,
  UploadedFile,
  Query,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from 'src/dtos/signup.dto';
import { LogInDTO } from 'src/dtos/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { BudgetDTO } from 'src/dtos/budget.dto';
import { ExpenseDTO } from 'src/dtos/expense.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBillDTO } from 'src/dtos/bills.dto';
import { Stripe } from 'stripe';
import { CreateIncomeDTO } from 'src/dtos/income.dto';
import { AddSavingDTO, CreateSavingDTO } from 'src/dtos/saving.dto';

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
  async getTickets(@Request() req, @Query('incomeId') incomeId: string) {
    return await this.authservice.getBudgets(req.user.id, incomeId);
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

  @UseGuards(AuthGuard('jwt'))
  @Get('/expenses')
  async getExpenses(@Query('budgetId') budgetId: string) {
    return await this.authservice.getExpenses(budgetId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create-bill')
  createBill(@Body() billData: CreateBillDTO, @Request() req) {
    return this.authservice.createBill(billData, req.user.id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Put('/expense/:id')
  async updateExpense(
    @Param('id') id: string,
    @Body() expenseData: ExpenseDTO,
  ): Promise<any> {
    return this.authservice.updateExpense(id, expenseData);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete('/expense/:id')
  async deleteExpense(@Param('id') id: string): Promise<void> {
    this.authservice.deleteExpense(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/bills')
  async getBills(@Request() req) {
    return await this.authservice.getBills(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/reset-bill')
  async resetBill(@Body() billData: CreateBillDTO) {
    this.authservice.editBill(billData.id, {
      isPaid: false,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create-checkout-session')
  async createCheckoutSession(@Body() billData: CreateBillDTO) {
    try {
      // Initialize the Stripe client with your secret key
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2023-10-16',
      });

      // Create a Checkout Session with the invoice details
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'php',
              product_data: {
                name: billData.biller,
              },
              unit_amount: billData.amount * 100, // Convert the amount to cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:4200/home/bills',
        cancel_url: 'http://localhost:4200/home/bills',
      });

      // Call the editInvoice service to update the invoice status to 'true'
      // await this.authservice.createBill(billData, req.user.id);
      const updatedBill = await this.authservice.editBill(billData.id, {
        isPaid: true,
      });

      if (!updatedBill) {
        return { error: 'Bill not found' };
      }

      return { checkoutSessionId: session.id };
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error for proper error handling middleware to catch
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create-income')
  createIncome(@Body() incomeData: CreateIncomeDTO, @Request() req) {
    return this.authservice.createIncome(incomeData, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/incomes')
  async getIncomes(@Request() req) {
    return await this.authservice.getIncomes(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create-saving')
  createSaving(@Body() savingData: CreateSavingDTO, @Request() req) {
    return this.authservice.createSaving(savingData, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/savings')
  async getSavings(@Request() req) {
    return await this.authservice.getSavings(req.user.is);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/add-saving')
  AddSaving(@Body() addSavingData: AddSavingDTO) {
    return this.authservice.addSaving(addSavingData);
  }
}
