import Route from '@ioc:Adonis/Core/Route'

Route.get('', 'ToDoListsController.renderIndex').middleware('auth').as('index')

Route.group(() => {
  Route.post('/register', 'Users/AuthController.register').as('register')
  Route.on('/register').render('register')

  Route.on('/login').render('login')
  Route.post('/login', 'Users/AuthController.login')

  Route.get('/logout', 'Users/AuthController.logout')
}).prefix('/user')

Route.group(() => {
  Route.post('', 'ToDoListsController.create')
  Route.put('/:id', 'ToDoListsController.update')
  Route.delete('/:id', 'ToDoListsController.delete')
})
  .prefix('/todos')
  .middleware('auth')

Route.group(() => {
  Route.get('', 'Users/AdminsController.index').as('admin')
  Route.put('/:id', 'Users/AdminsController.updateUser')
  Route.delete('/:id', 'Users/AdminsController.deleteUser')
})
  .prefix('/admin')
  .middleware('auth')
