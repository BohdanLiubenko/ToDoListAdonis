import { AuthenticationException } from '@adonisjs/auth/build/standalone'
import type { GuardsList } from '@ioc:Adonis/Addons/Auth'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Role } from 'Contracts/enums'

export default class AuthMiddleware {
  protected redirectTo = '/user/register'

  protected async authenticate(
    request: HttpContextContract['request'],
    response: HttpContextContract['response'],
    auth: HttpContextContract['auth'],
    guards: (keyof GuardsList)[]
  ) {
    let guardLastAttempted: string | undefined

    for (let guard of guards) {
      guardLastAttempted = guard

      if (await auth.use(guard).check()) {
        auth.defaultGuard = guard
        if (request.url().startsWith('/admin') && auth.user?.role !== Role.ADMIN) {
          return response.redirect().back()
        } else {
          return true
        }
      }
    }

    throw new AuthenticationException(
      'Unauthorized access',
      'E_UNAUTHORIZED_ACCESS',
      guardLastAttempted,
      this.redirectTo
    )
  }

  public async handle(
    { auth, request, response }: HttpContextContract,
    next: () => Promise<void>,
    customGuards: (keyof GuardsList)[]
  ) {
    const guards = customGuards.length ? customGuards : [auth.name]
    await this.authenticate(request, response, auth, guards)
    await next()
  }
}
