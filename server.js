const express = require('express')
const fs = require('fs')

const PORT = 3000
const POSTS_DIR = 'posts'

const app = express()

if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR)
}

app.set('view engine', 'ejs')

// middleware que procesa el body de la request
app.use(express.urlencoded({ extended: true }))

// endpoint "home"
app.get('/', (req, res) => {
  res.send('Ok')
})

// endpoint que envía el formulario de crear post
app.get('/nuevo', (req, res) => {
  res.render('form')
})

// endpoint que guarda el post
app.post('/nuevo', (req, res, next) => {
  fs.writeFile(
    POSTS_DIR + '/' + req.body.titulo,
    req.body.cuerpo,
    (err, data) => {
      if (err) {
        return next(err)
      }
      res.redirect('/')
    }
  )
})

// middleware que maneja las peticiones
// que no matchean con las rutas declaradas.
// genera un error, se le pasa al manejador con `next`
app.use((req, res, next) => {
  next({ status: 404, mensaje: 'Not found' })
})

// manejador de errores
// último middleware
app.use((err, req, res, next) => {
  console.error(err)
  const error = {
    status: err.status || 500,
    mensaje: err.mensaje || err.message
  }
  res.render('error', { error })
})

app.listen(PORT, () => console.log('Server en puerto ' + PORT))
