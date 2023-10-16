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
        },
      });
      return newBudget;
    } catch (error) {
      throw new Error('error siya kay bogo ka');
    }
  }

  async getBudgets(userId: string) {
    try {
      const budgets = await this.prisma.budget.findMany({
        include: {
          user: true,
        },
        where: {
          userId: userId,
        },
      });
      return budgets;
    } catch (error) {
      throw new Error('Error in fetching budgets');
    }
  }
}
