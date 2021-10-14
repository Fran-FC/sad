# EJERCICIO CARRITO



### Lista de scripts

  - carrito.js -> Contiene la clase Carrito y los métodos para acceder a mongoDB y cambiar el estado del carrito.
  - mongodbwiper.js -> Script para borrar todos los documentos de la colección carros tras realizar muchas pruebas, especificar el owner de los documentos.
  - pruebacarrito.js -> Hace uso de la clase Carrito.

## Uso del Carrito (pruebaCarrito.js)

Para utilizar el módulo se ha de importar mediante require("./carrito"). En este módulo cada método es async, por lo que habrá que resolver la promesa en el caso del método toString() para obtener el resultado de la invocacion asíncrona.

Para ejecutar el script de prueba simplemente usar node:

`$ node pruebaCarrito.js`

prueaCarrito.js es un script que pone un listener de eventos de entrada en stdin utilizando el módulo readline y nos ofrece, de manera interactiva por consola, las operaciones del módulo Carrito.


## Módulo Carrito

Este módulo contiene la clase Carrito que será la que dará la estructura y incluirá las operaciones pertinentes. Entre esas operaciones tenemos: add para añadir productos, remove para eliminar productos del carrito y toString para mostrar el contenido del mismo. También ofrece una función cogerCarrito para inicializar un carrito vacío. Dentro de estas funciones interacturemos con mongoDB. Todas las operaciones con mongoDB se realizan a través del del módulo MongoCarro (mongoCarro.js) que es utilizado por Carrito.

Los métodos de la clase serán `async` y las llamadas a la base de datos se englobarán en la operación `await` para esperar a resolver cada operación.

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

