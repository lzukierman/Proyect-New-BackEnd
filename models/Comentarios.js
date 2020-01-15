const query = require('../bd')

class Comentario {
  constructor (post_id,texto) {
    this.texto = texto,
    this.post_id = post_id
  }

  guardar () {
    return query(
      'INSERT INTO comentarios (post_id, texto) VALUES (?, ?)',
      [this.post_id, this.texto]
    )
  }

  static comentariosDePost (id) {
    return query('SELECT id, texto FROM comentarios WHERE post_id = ?',[id])
  }

 
}

module.exports = Comentario;
