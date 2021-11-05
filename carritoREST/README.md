# EJERCICIO 3. CARRITO REST

## Arquitectura distribuida

Este ejercicio se ha realizado y desplegado en una única máquina, por lo que cada componente tendrá un puerto distinto desde el que estarán escuchando, ya que solo hay una única dirección IP disponible (127.0.0.1).

En la figura se muestra el esquema de los servicios una vez los dos (Carro y MongoDB Client) se han registrado en el Service Registry. Posteriormente, cuando se quiera acceder por primera vez a uno de los servicios, se deberá preguntar al service registry cual es la url necesaria para comunicarse con este. Una vez se haya obtenido, ya no hará falta volver a preguntarle.

<img src="imgs/diagramaCarroREST1.png">

## Service Registry

El Service Registy es el proveedor de la "ubicación" de cada servicio a quien lo recueste, y guardará la url de los servicios que quieran ofrecerse al mundo. Por lo tanto, será el primer componente en ponerse en marcha. 

La implementación de este Service Registry que se nos proporciona es algo limitada, ya que no tiene una persistencia fuerte, esto quiere decir que si por algún motivo el componente "muere", perderá todas las entradas de los servicios previamente guardados, y estos servicios deberán registrarse de nuevo. Como propuesta alternativa, se puede implementar un fichero json donde se guarden los servicios, y que sea independiente a la ejecución del programa, de esta manera, los cambios sucederían de manera permanente.

Para ofrecer siempre servicios "vivos", cada servicio tendrá un timeout de 10 segundos por defecto, una vez pasado el timeout, se eliminará el servicio. Esto va a requerir que cada componente registre su servicio cada 10 segundos (por lo menos) si quiere ser accesible en todo momento. Por otro lado, si un cliente quiere acceder a un servicio y obtiene una respuesta 404 puede volver a intentarlo en un tiempo o cancelar la opercación.

## Puesta en marcha

Para poner en marcha la aplicación tenemos que ejecutar el ServiceRegistry para poder registrar los servicios de la aplicación. Además, después iniciamos el módulo APICarro para instanciar el servicio y obtener la conexión con MongoDB y ya responder al cliente REST. Más adelante,  hay que iniciar el script index.js en Node. el módulo index se encarga de inicializar la aplicación que hará las llamadas al servicio que a su vez proviene del módulo src/app.js. 

El módulo app es el que crea la arquitectura de la aplicación. Para crear la arquitectura sigue los siguientes pasos:
    1. Se utiliza la función json de Express para indicar que se puedan parsear payloads en formato JSON.
    2. Utilizamos la función urlencoded para parsear peticiones con formato urlencoded.
    3. Usamos express.text para parsear peticiones que vengane en formato string.
    4. Inicializamos la lógica de enrutamiento con app.use(API_PREFIX, routes(dependencies)), que obtiene todas las rutas de los servicios que ofrece la aplicación.
    5. Le asociamos un manejador de errores con app.use(ErrorHandler).
    6. Con toda la configuración hecha ponemos la aplicación a escuchar el puerto que tendremos definido en la constante PORT y mostraremos en la consola que efectivamente el servidor está en marcha.
