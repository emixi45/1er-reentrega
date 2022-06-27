const container = require('./contenedor')

const nuevoContenedor = new container('./productos.json')

const prodDisponibles = async () => {
    return await nuevoContenedor.leer()
}



module.exports = prodDisponibles