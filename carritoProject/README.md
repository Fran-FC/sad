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


## Módulo MongoCarro

Este módulo ha sido desarrollado para gestionar las operaciones relacionadas con la base de datos no relacional MongoDB. En el se implementan 5 funciones, 2 privadas y 3 pubicas accesibles desde alla donde sea exportado este módulo.
1. Funciones Privadas:
    * `connectDB()`: Se conecta a la BD _compras_, en concreto a la coleccion _carros_, y devuelve el identificador de la colección y de la sesión de conexión(_dbclient_).

    * `closeDB(dbclient)`: Función a la cual pasandole el id de sesion, cierra la conexion con la BD.

2. Funciones Públicas
    * `buscar(query)`: Establece conexion con la BD. Sobre la colección que obtiene al conectarse(_col_) ejecuta la _query_
    para posteriormente cerrar la conexion y retornar el resultado de la query.

    * `insertar(doc)`: Establece conexion con la BD. Sobre la colección que obtiene al conectarse(_col_) inserta un documento (una nueva entrada en la BD), cierra la conexion y devuelve la respuesta de ejecutar _collection.insertOne()_, que en concreto es un campo llamado _insertedId_ el cual contiene el valor _\_id_ del documento recien insertado.

    Este valor es de gran importancia ya que sera sobre este nuevo documento sobre el cual se ejecutaran los otros 2 metodos publicos (y si queremos acceder a este documento el _\_id_ es imprescindible), ya que las querys que nos pasará desde carrito.js serán así: `{_id:this.id}`.

    * `actualizar(query, valores)`: Establece conexion con la BD. Sobre la colección que obtiene al conectarse(_col_), sobre los documentos devueltos por la query se ejecuta una actualización de sus valores, en concreto sobre el campo productos de los documentos devueltos, se actualiza sus valores a los del argumento _myDoc["productos"]_.

    ```JavaScript
        { $set: { <newField>: <expression>, ... } }
        { $set : {productos:myDoc["productos"]}}
    ```