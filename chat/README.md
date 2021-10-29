# SAD (Servicios y Aplicaciones Distribuidas)
# MEMORIA 2

En esta actividad debemos utilizar websockets para implementar un chat. Nos basaremos en el código proporcionado para implementar las siguientes funcionalidades:

1. Enviar un mensaje a todos los usuarios conectados cuando alguien se
conecta o se desconecta.
2. Añadir la posibilidad de usar nicknames.
3. Que el usuario que envía el mensaje no reciba el mensaje.
4. Añadir un mensaje que nos indique si algún usuario está escribiendo.
5. Mostrar una lista con los usuarios conectados.
6. Añadir soporte para mensajes privados.

# index.js
Para la realización de esta actividad se ha realizado un módulo llamado index.js que se encarga de servir la página y manejar los eventos que se van recibiendo de los sockets.

En primer lugar, definimos la clase usuario para establecer el módelo que van a seguir los usuarios del programa. A continuación, le indicamos que el contenido que debe servir la aplicación se encuentra en el fichero HTML index.html. Más tarde, definimos una función para obtener la lista de usuarios conectados para cumplir con el objetivo número 5. Por último, definimos el evento que sucede cuando un usuario conecta con el socket. En esa parte inicializamos los listeners que se encargarán de la lógica de la aplicación como enviar mensaje, suscribirse, desuscribirse o writing. Cada vez que uno de estos eventos se dispare, se emitirá de vuelta el resultado correspondiente.

# index.html
Además, en la parte del index.html hemos incluido un script con las funciones que se encargarán de disparar los eventos en la aplicación:
1. Connect - Se encarga de enviar el evento de conexión de un usuario.
2. Disconnect - Se encarga de enviar el evento de desconexión.
3. Writing - Se encarga de enviar el evento correspondiente a que un usuario esté escribiendo.
4. $("#msgForm").submit - Se encarga de enviar el mensaje a la aplicación.

Por otro lado, en el script se inicializan los listeners de los eventos que proceden de la aplicación:
1. Mensaje de usuario.
2. Usuario escribiendo.
3. Usuario conectado.
4. Usuario desconectado.
Cuando uno de estos eventos sucede se modifica la página para que el usuario lo visualize.

# Puesta en marcha

Para la prueba de la aplicación ejecutaríamos en node el módulo index.js y nos conectaríamos desde un navegador

