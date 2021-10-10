# EJERCICIO CARRITO

Para probar el funcionamiento editar el script pruebaCarrito.js y ejecutarlo con node.

### Lista de scripts

  - carrito.js -> Contiene la clase Carrito y los métodos para acceder a mongoDB y cambiar el estado del carrito.
  - mongodbwiper.js -> Script para borrar todos los documentos de la colección carros tras realizar muchas pruebas, especificar el owner de los documentos.
  - pruebacarrito.js -> Hace uso de la clase Carrito.

## Uso del módulo Carrito

Para utilizar el módulo se ha de importar y cada método es async, por lo que habrá que resolver la promesa que devuelve tras cada operación para poder realizar la operación siguiente.

Para ejecutar el script de prueba simplemente usar node:

`$ node pruebaCarrito.js`

## Módulo Carrito

Este módulo contiene la clase Carrito para las operaciones añadir y eliminar productos y toString para mostrar el contenido. También ofrece un método cogerCarrito para inicializar un carrito vacío. Todas las operaciones con mongoDB se realizan a través del del módulo MongoCarro (mongoCarro.js) que es utilizado por Carrito.


