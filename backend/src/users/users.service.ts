import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(email: string, password: string) {
    return this.prisma.client.user.create({
      data: { email, password }
    })
  }

  findByEmail(email: string) {
    return this.prisma.client.user.findUnique({
      where: { email }
    })
  }

  findAll() {
    return this.prisma.client.user.findMany()
  }
}
