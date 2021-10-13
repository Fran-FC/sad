const {MongoCarro} = require("./mongoCarro")

class Carrito {
	// constructor method that creates a document and inserts it in the mongodb collection
	// by calling to #initializeDocument
	constructor (cliente){
		this.mongo = new MongoCarro();
		this.cliente = cliente;
	}

	async cogerCarrito() {
		const document = {
			"owner": this.cliente,
			"productos":{}
		}
		const resp = await this.mongo.insertar(document);
		this.id = resp["insertedId"];
	}

	// returns a promise with the content of the document queried
	async toString(){
		const resp = await this.mongo.buscar({_id:this.id});
		return resp;
	}

	async add (producto, cantidad=1){
		const myDoc = await this.mongo.buscar({_id:this.id});//.toArray();
		if (producto in myDoc["productos"])  {
			myDoc["productos"][producto] += cantidad;
		}
		else {
			myDoc["productos"][producto] = cantidad;
		}
		const newValues = { $set : {productos:myDoc["productos"]}};
		const queryValue = {_id:this.id};
		await this.mongo.actualizar(queryValue, newValues);
	}

	async remove (producto, cantidad=1){
		const myDoc = await this.mongo.buscar({_id:this.id});
		if (producto in myDoc["productos"])  {
			cantidad = myDoc["productos"][producto] - cantidad;
			cantidad = cantidad < 0? 0: cantidad;
			myDoc["productos"][producto] = cantidad;
		}
		else {
			// throw error?
			throw Error("Ha intentado eliminar un producto que no está en el carro");
		}
		const newValues = { $set : {productos:myDoc["productos"]}};
		const queryValue = {_id:this.id};
		await this.mongo.actualizar(queryValue, newValues);
	}
}

module.exports = {
	Carrito: Carrito
}