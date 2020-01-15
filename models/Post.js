const query = require('../bd')

class Post {
  constructor (titulo, cuerpo) {
    this.titulo = titulo
    this.cuerpo = cuerpo
  }

  guardar () {
    return query(
      'INSERT INTO posts (titulo, cuerpo) VALUES (?, ?)',
      [this.titulo, this.cuerpo]
    )
  }

  static listar () {
    return query(`SELECT p.id, p.titulo, COUNT(1) AS comentarios
     FROM posts p
     JOIN comentarios c
     ON c.post_id = p.id
     GROUP BY p.id`)
  }

  static buscarPorId (id) {
    return query('SELECT * FROM posts WHERE id = ?', [id])
      .then(posts => {
        return posts[0]
      })
  }
}

module.exports = Post
