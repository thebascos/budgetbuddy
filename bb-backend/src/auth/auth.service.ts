import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDTO } from 'src/dtos/signup.dto';
import { LogInDTO } from 'src/dtos/login.dto';
import { BudgetDTO } from 'src/dtos/budget.dto';
import { ExpenseDTO } from 'src/dtos/expense.dto';
import { CreateBillDTO } from 'src/dtos/bills.dto';
import { CreateIncomeDTO } from 'src/dtos/income.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUserById(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });
    return user;
  }

  async generateToken(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async addUser(user: SignUpDTO) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new HttpException(
        'Email address is already in use',
        HttpStatus.CONFLICT,
      );
    }

    const newUser = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    return newUser;
  }

  public async validateUser(user: LogInDTO) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!existingUser) {
      throw new NotFoundException('User does not exist');
    }

    if (user.password === existingUser.password) {
      return existingUser;
    } else {
      throw new UnauthorizedException('Wrong password!');
    }
  }

  async createBudget(budget: BudgetDTO, userId: 'sfdsdfsdfsd'): Promise<any> {
    try {
      const newBudget = await this.prisma.budget.create({
        data: {
          description: budget.description,
          amount: budget.amount,
          userId: userId,
          incomeId: budget.incomeId,
        },
      });
      return newBudget;
    } catch (error) {
      throw new Error('error siya kay bogo ka');
    }
  }

  async getBudgets(userId: string, incomeId: string) {
    try {
      const budgets = await this.prisma.budget.findMany({
        include: {
          user: true,
          income: true,
        },
        where: {
          userId: userId,
          incomeId: incomeId,
        },
      });
      return budgets;
    } catch (error) {
      throw new Error('Error in fetching budgets');
    }
  }

  async createExpense(expenseData: ExpenseDTO): Promise<any> {
    try {
      const newExpense = await this.prisma.expense.create({
        data: {
          description: expenseData.description,
          amount: expenseData.amount,
          attachment: expenseData.attachment,
          budgetId: expenseData.budgetId,
        },
      });
      return newExpense;
    } catch (error) {
      throw error;
    }
  }

  async getExpenses(budgetId: string | null) {
    try {
      const expenses = await this.prisma.expense.findMany({
        include: {
          budget: true,
        },
        where: budgetId ? { budgetId } : undefined,
      });
      return expenses;
    } catch (error) {
      throw error;
    }
  }

  async updateExpense(expenseId: string, expense: ExpenseDTO): Promise<any> {
    try {
      const updatedExpense = await this.prisma.expense.update({
        where: {
          id: expenseId,
        },
        data: {
          description: expense.description,
          amount: expense.amount,
          budgetId: expense.budgetId,
        },
      });
      return updatedExpense;
    } catch (error) {
      throw new Error('Failed to update expense. Please try again later.');
    }
  }

  async deleteExpense(expenseId: string): Promise<void> {
    try {
      await this.prisma.expense.delete({
        where: {
          id: expenseId,
        },
      });
    } catch (error) {
      console.error('Failed to delete expense:', error);
      throw new Error('Failed to delete expense. Please try again later.');
    }
  }

  async createBill(billData: CreateBillDTO, userId: string): Promise<any> {
    try {
      const newBill = await this.prisma.bill.create({
        data: {
          userId: userId,
          biller: billData.biller,
          amount: billData.amount,
          isPaid: billData.isPaid,
          dueDay: billData.dueDay,
        },
      });
      return newBill;
    } catch (error) {
      throw error;
    }
  }
  async getBills(userId: string) {
    try {
      const bills = await this.prisma.bill.findMany({
        include: {
          user: true,
        },
        where: {
          userId: userId,
        },
      });
      return bills;
    } catch (error) {
      throw new Error('Error in fetching budgets');
    }
  }

  async editBill(
    billId: string,
    updatedBillData: Partial<CreateBillDTO>,
  ): Promise<CreateBillDTO> {
    const existingBill = await this.prisma.bill.findUnique({
      where: { id: billId },
    });

    if (!existingBill) {
      return null;
    }

    // Update the existing invoice with the new data
    const updatedBill = await this.prisma.bill.update({
      where: { id: billId },
      data: updatedBillData,
    });

    return updatedBill;
  }

  async createIncome(
    incomeData: CreateIncomeDTO,
    userId: string,
  ): Promise<any> {
    try {
      const newIncome = await this.prisma.income.create({
        data: {
          source: incomeData.source,
          source_account: incomeData.source_account,
          amount: incomeData.amount,
          userId: userId,
        },
      });
      return newIncome;
    } catch (error) {
      throw error;
    }
  }

  async getIncomes(userId: string) {
    try {
      const incomes = await this.prisma.income.findMany({
        include: {
          user: true,
        },
        where: {
          userId: userId,
        },
      });

      const totalIncomes = incomes.reduce(
        (sum, income) => sum + income.amount,
        0,
      );
      return { incomes, totalIncomes };
    } catch (error) {
      throw new Error('Error in fetching budgets');
    }
  }
}
