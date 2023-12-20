import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AdminsController {
  public async index({ view, auth }: HttpContextContract) {
    await auth.check()
    const users = await User.query().preload('toDoLists', (toDoLists) => {
      toDoLists.orderBy('is_done', 'asc').orderBy('id', 'asc')
    })

    return view.render('admin/index', { users })
  }

  public async updateUser({ params, request, response }: HttpContextContract) {
    const { email, username, role } = request.all()
    await User.query().where('id', params.id).update({ email, username, role })

    return response.status(200)
  }

  public async deleteUser({ params, response }: HttpContextContract) {
    await User.query().where('id', params.id).delete()

    return response.status(200)
  }
}
