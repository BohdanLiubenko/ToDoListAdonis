import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  registerValidation,
  registerValidationMessages,
} from 'App/Validators/UserRegisterValidator'

export default class AuthController {
  public async register({ request, response, auth }: HttpContextContract) {
    const { username, email, password } = request.all()

    await request.validate({
      schema: registerValidation,
      messages: registerValidationMessages,
      bail: false,
    })

    const user = await User.create({ username, email, password })
    await auth.login(user)

    return response.redirect('/')
  }

  public async login({ request, response, auth, session }: HttpContextContract) {
    const { email, password, rememberMe } = request.all()
    const user = await User.query().where('email', email).first()

    if (!user) {
      session.flash({ emailError: 'No user with such email' })
      return response.redirect().back()
    } else if (!(await Hash.verify(user.password, password))) {
      console.log('bad')

      session.flash({ passwordError: 'Password not right' })
      return response.redirect().back()
    }

    await auth.login(user, rememberMe)

    if (auth.isLoggedIn) {
      return response.redirect('/')
    }
  }

  public async logout({ auth, response }) {
    await auth.logout()
    return response.redirect('/')
  }
}
