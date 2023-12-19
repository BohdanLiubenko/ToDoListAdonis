/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import View from '@ioc:Adonis/Core/View'

// Route.get('/', async ({ view }) => {
//   return view.render('welcome')
// }).middleware('auth')
//Route.on('').render('index').middleware('auth')
// Route.get('/', 'Users/AuthController.renderIndex').middleware('auth')

Route.get('', 'ToDoListsController.renderIndex').middleware('auth')

Route.group(() => {
  Route.post('/register', 'Users/AuthController.register').as('register')
  //Route.get('/register', 'Users/AuthController.index')
  Route.on('/register').render('register')

  Route.on('/login').render('login')
  Route.post('/login', 'Users/AuthController.login')

  Route.get('/logout', 'Users/AuthController.logout')
}).prefix('/user')

Route.group(() => {
  Route.post('', 'ToDoListsController.create').middleware('auth')
  Route.put('/:id', 'ToDoListsController.update').middleware('auth')
  Route.delete('/:id', 'ToDoListsController.delete').middleware('auth')
}).prefix('/todos')
