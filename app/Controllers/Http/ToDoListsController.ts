import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ToDoList from 'App/Models/ToDoList'

export default class ToDoListsController {
  public async create({ request, response, auth }: HttpContextContract) {
    const { name, description } = request.all()
    const data = { name, description, user_id: auth.user?.id }
    await ToDoList.create(data)

    return response.redirect('/')
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { name, description, isDone } = request.all()
    await ToDoList.query().where('id', params.id).update({ name, description, is_done: isDone })

    return response.status(200)
  }

  public async delete({ params, response }: HttpContextContract) {
    await ToDoList.query().where('id', params.id).delete()

    return response.status(200)
  }

  public async renderIndex({ view, auth }: HttpContextContract) {
    const id = (await auth.authenticate()).id
    const toDoLists = await ToDoList.query()
      .where('user_id', id)
      .orderBy('is_done', 'asc')
      .orderBy('id', 'asc')
      .exec()

    return view.render('index', { toDoLists })
  }
}
