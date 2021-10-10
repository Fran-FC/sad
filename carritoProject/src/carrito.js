const {MongoClient} = require("mongodb");
const url = "mongodb+srv://fran:3kiWdowwOoROcE8o@cluster0.6chou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dbname = "compras";

// for each access to the carrito collection in mongoDB it is opened a new connection and then closed
class Carrito {
	// constructor method that creates a document and inserts it in the mongodb collection
	// by calling to #initializeDocument
	constructor (cliente){
		this.cliente = cliente;
	}

	async #connectDB(){
		const dbclient = new MongoClient(url);
		try {
			await dbclient.connect();
			const db = dbclient.db(dbname);
			const col = db.collection("carros");

			return [col, dbclient];
		} catch (err) {
			console.error(err.stack);
		} 
	}

	async #closeDB(dbclient){
		dbclient.close();
	}

	async cogerCarrito() {
		const document = {
			"owner": this.cliente,
			"productos":{}
		}
		const [col, dbclient] = await this.#connectDB();
		const resp = await col.insertOne(document);
		this.id = resp["insertedId"];

		this.#closeDB(dbclient);
	}

	// returns a promise with the content of the document queried
	async toString(){
		const [col, dbclient] = await this.#connectDB();

		const resp = await col.findOne({_id:this.id});
		this.#closeDB(dbclient);

		return resp;
	}

	async add (producto, cantidad=1){
		const [col, dbclient] = await this.#connectDB();

		const myDoc = await col.findOne({_id:this.id});//.toArray();

		if (producto in myDoc["productos"])  {
			myDoc["productos"][producto] += cantidad;
		}
		else {
			myDoc["productos"][producto] = cantidad;
		}
		
		const newValues = { $set : {productos:myDoc["productos"]}};
		const queryValue = {_id:this.id};

		await col.updateOne(queryValue, newValues);

		this.#closeDB(dbclient);
	}

	async remove (producto, cantidad=1){
		const [col, dbclient] = await this.#connectDB();

		const myDoc = await col.findOne({_id:this.id});//.toArray();
		if (producto in myDoc["productos"])  {
			myDoc["productos"][producto] -= cantidad;
		}
		else {
			// throw error?
			await this.#closeDB(dbclient);
			throw Error("Ha intentado eliminar un producto que no está en el carro");
		}
		
		const newValues = { $set : {productos:myDoc["productos"]}};
		const queryValue = {_id:this.id};

		await col.updateOne(queryValue, newValues);

		this.#closeDB(dbclient);
	}
}

module.exports = {
	Carrito: Carrito
}