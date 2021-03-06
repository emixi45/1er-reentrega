const express = require('express');

const routerProductos = express.Router()
const authorize = require('./auth/autenticacion');
const container = require('./contenedor');

const prodDisponibles = require('./testproductos')
const datos = new container('./productos.json')

/* Mostrar productos */
routerProductos.get('/', async (req, res) => {
   let productos = await prodDisponibles()
   res.render('productos', { productos })
})

/* Mostrar producto por id */
routerProductos.get('/:id', async(req, res) =>{
    const { id } = req.params
    let productos = await prodDisponibles()
    let prodId = productos.filter(productos => productos.id === parseInt(id))
    res.send(prodId)
})

/*Guardar*/
routerProductos.post('/guardar',authorize, async(req, res) => {
    let prod = req.body
    prod.timestamp = Date.now()
    console.log(prod)
    datos.escribir(prod)
    res.redirect('/productos')
})

/* Borrar por id*/
routerProductos.delete('/borrar/:id', authorize,async(req, res) =>{
    const { id } = req.params
    datos.borrarPorId(id)
    res.json(await prodDisponibles())
    //res.send('/productos')
}) 

/* Modificar un producto */
routerProductos.put('/modificar/:id', authorize,async(req, res) => {
    let prodNuevo = req.body
    const { id } = req.params
    datos.modificarPorId(prodNuevo, id)
    //res.redirect('/productos')
})

module.exports = routerProductos