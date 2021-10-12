const {MongoClient} = require("mongodb");
const url = "mongodb+srv://fran:3kiWdowwOoROcE8o@cluster0.6chou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dbname = "compras";

class MongoCarro {
	async #connectDB(){
		const dbclient = new MongoClient(url);
		try {
			await dbclient.connect(); //Inicia conexion
			const db = dbclient.db(dbname); //Se conecta a la BD compras
			const col = db.collection("carros"); //Con la conexion establecida obtiene la coleccion carros
            return [col, dbclient];
		} catch (err) {
			console.error(err.stack);
		} 
	}
	async #closeDB(dbclient){
		dbclient.close();
	}

    async buscar(query){
        const [col, dbclient] = await this.#connectDB();
        const resp = await col.findOne(query);
        await this.#closeDB(dbclient);
        return resp;
    }
    async insertar(doc) {
        const [col, dbclient] = await this.#connectDB();
        const resp = await col.insertOne(doc);
        await this.#closeDB(dbclient);
        return resp;
    }
    async actualizar(query, valores) {
        const [col, dbclient] = await this.#connectDB();
        const resp = await col.updateOne(query, valores);
        await this.#closeDB(dbclient);
        return resp;
    }
}

module.exports = {
	MongoCarro: MongoCarro
}