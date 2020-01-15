const express =  require("express");
const router = express.Router()
const Comentario = require('../models/Comentarios');




router.post('/posts/:id/comentarios',(req,res,next)=>{
    const comentario = new Comentario(req.params.id, req.body.texto) 
    comentario.guardar()
    .then(()=> res.sendStatus(201))
    .catch(err => next(err))
})

module.exports = router