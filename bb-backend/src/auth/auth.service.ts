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
import { AddSavingDTO, CreateSavingDTO } from 'src/dtos/saving.dto';

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

  async createBudget(budget: BudgetDTO, userId: string): Promise<any> {
    try {
      const newBudget = await this.prisma.budget.create({
        data: {
          description: budget.description,
          amount: budget.amount,
          userId: userId,
          incomeId: budget.incomeId,
        },
      });

      await this.prisma.income.update({
        where: {
          id: budget.incomeId,
        },
        data: {
          amount: {
            decrement: budget.amount,
          },
        },
      });

      return newBudget;
    } catch (error) {
      throw new Error('An error occurred: ' + error.message);
    }
  }

  async getBudgets(userId: string, incomeId: string) {
    try {
      const budgets = await this.prisma.budget.findMany({
        include: {
          user: true,
          income: true,
          expenses: true,
        },
        where: {
          userId: userId,
          incomeId: incomeId,
        },
      });

      return Promise.all(
        budgets.map(async (b) => {
          return {
            ...b,
            totalExpenses: await this.calculateTotalExpenses(b.id),
          };
        }),
      );
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
      console.error('Error creating expense:', error);
      throw new Error('Failed to create expense. Please try again.'); // Adjust the error message as needed
    }
  }

  async calculateTotalExpenses(budgetId: string): Promise<number> {
    const totalExpensesResult = await this.prisma.expense.aggregate({
      where: {
        budgetId: budgetId,
      },
      _sum: {
        amount: true,
      },
    });
    return totalExpensesResult._sum?.amount || 0;
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

  async createSaving(saving: CreateSavingDTO, userId: string): Promise<any> {
    try {
      const newSaving = await this.prisma.saving.create({
        data: {
          goal: saving.goal,
          goal_amount: saving.goal_amount,
          userId: userId,
        },
      });

      // await this.prisma.income.update({
      //   where: {
      //     id: b.incomeId,
      //   },
      //   data: {
      //     amount: {
      //       decrement: budget.amount,
      //     },
      //   },
      // });

      return newSaving;
    } catch (error) {
      throw new Error('An error occurred: ' + error.message);
    }
  }
  async getSavings(userId: string) {
    try {
      const savings = await this.prisma.saving.findMany({
        include: {
          user: true,
        },
        where: {
          userId: userId,
        },
      });
      return savings;
    } catch (error) {
      throw new Error('Error in fetching budgets');
    }
  }

  async addSaving(addSavingData: AddSavingDTO): Promise<any> {
    try {
      const newAddSaving = await this.prisma.addSaving.create({
        data: {
          amount: addSavingData.amount,
          savingId: addSavingData.savingId,
          incomeId: addSavingData.incomeId,
        },
      });

      // Calculate total amount for the specific savingId
      const totalAmount = await this.calculateTotalAmount(
        addSavingData.savingId,
      );

      await this.prisma.saving.update({
        where: { id: addSavingData.savingId },
        data: {
          total: totalAmount,
        },
      });

      await this.prisma.income.update({
        where: {
          id: addSavingData.incomeId,
        },
        data: {
          amount: {
            decrement: addSavingData.amount,
          },
        },
      });

      return newAddSaving;
    } catch (error) {
      console.error('Error creating expense:', error);
      throw new Error(
        'Failed to create expense. Please try again.\n' + error.stack,
      );
    }
  }

  async calculateTotalAmount(savingId: string): Promise<number> {
    const totalAmountResult = await this.prisma.addSaving.aggregate({
      where: {
        savingId: savingId,
      },
      _sum: {
        amount: true,
      },
    });

    return totalAmountResult._sum?.amount || 0;
  }
}
