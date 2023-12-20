import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { Role } from 'Contracts/enums'

export default class extends BaseSeeder {
  public async run() {
    await User.create({
      email: 'a@a.com',
      password: 'aa',
      username: 'admin',
      role: Role.ADMIN,
    })
  }
}
