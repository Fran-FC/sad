# EJERCICIO 3. CARRITO REST

## Arquitectura distribuida

Este ejercicio se ha realizado y desplegado en una única máquina, por lo que cada componente tendrá un puerto distinto desde el que estarán escuchando, ya que solo hay una única dirección IP disponible (127.0.0.1).

En la figura se muestra el esquema de los servicios una vez los dos (Carro y MongoDB Client) se han registrado en el Service Registry. Posteriormente, cuando se quiera acceder por primera vez a uno de los servicios, se deberá preguntar al service registry cual es la url necesaria para comunicarse con este. Una vez se haya obtenido, ya no hará falta volver a preguntarle.

<img src="imgs/diagramaCarroREST1.png">
