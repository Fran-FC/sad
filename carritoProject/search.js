const {MongoClient} = require("mongodb");

const owner = "fran";

const run = async ()=>{
	const dbclient = new MongoClient("mongodb+srv://fran:3kiWdowwOoROcE8o@cluster0.6chou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
	await dbclient.connect();
	const db = dbclient.db("compras");
	const col = db.collection("carros");

	const resp = await col.findOne({owner:owner});
	
	console.log(resp);

	await dbclient.close();
}

run();

