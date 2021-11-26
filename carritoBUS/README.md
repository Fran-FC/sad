# PROPUESTA ARQUITECTURA POR BUSES DE EVENTOS

## Francesc Folch Company

Se propone una solución para las operaciones con carritos que ofrece consistencia utilizando el concepto de buses de eventos. Existirá un bus principal de eventos, que actuará como base de datos distribuida.

Los carritos publicarán en el bus de eventos cuando completen una compra los productos que tenían seleccionados, la ventaja está en que el carrito siempre será consistente con el stock total. Esto se consigue con un agente middleware que estará suscrito al bus de eventos, y que cuando haya una compra, o se añada/elimine un producto del carro, este actualizará, en el caso de ser necesario, la disponibilidad de dichos productos en los carritos de los clientes, a través de un bus individual por cada carrito.

<img src="arquitectura_bus.drawio.png"/>
