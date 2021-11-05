const {
    inDataBase,
    inMemory
} = require('../../database');

const MongoClient = inDataBase.MongoClient;
const mongoUrl = inDataBase.url;
const dbname = inDataBase.dbname;

const connectDB = async function connectDB() {
    const dbclient = new MongoClient(mongoUrl);
    try {
        await dbclient.connect(); //Inicia conexion
        const db = dbclient.db(dbname); //Se conecta a la BD compras
        const col = db.collection("carros"); //Con la conexion establecida obtiene la coleccion carros
        return [col, dbclient];
    } catch (err) {
        console.error(err.stack);
    } 
}

const closeDB = async function closeDB (dbclient) {
    dbclient.close();
}

const search = async function buscar(query){
    const [col, dbclient] = await connectDB();
    const resp = await col.findOne(query);
    await closeDB(dbclient);
    return resp;
}

const insert = async function insertar(doc) {
    const [col, dbclient] = await connectDB();
    const resp = await col.insertOne(doc);
    await closeDB(dbclient);
    return resp;
}

const update  = async function actualizar(query, valores) {
    const [col, dbclient] = await connectDB();
    const resp = await col.updateOne(query, valores);
    await closeDB(dbclient);
    return resp;
}

module.exports= {
    get: async owner =>{
        var carrito;
        carrito = inMemory.carritos.find(item => item === owner);
        if (!carrito) {
            carrito = await insert({owner: owner, products:{}});
            inMemory.carritos.push(owner);
        } else {
            carrito = await search({owner:owner});
        }
        return carrito;
    },

    add: async carrito =>{ 
        const myDoc = await search({owner:carrito["owner"]});
		if (p in myDoc["products"])  {
			myDoc["products"][p] += carrito["quantity"];
		}
		else {
			myDoc["products"][p] = carrito["quantity"];
		}

		const newValues = { $set : {products:myDoc["products"]}};

        await update({owner:owner} , newValues);
        return null;
    } ,

    delete: async carrito =>{
        const myDoc = await search({owner:carrito["owner"]});
		if (p in myDoc["products"])  {
			var newQuantity = myDoc["products"][p] - carrito["quantity"];
            if(newQuantity === 0) {
                delete myDoc["product"][p];
            }
		}
		else {
            throw new Error("Product not in carrito ");
		}

		const newValues = { $set : {products:myDoc["products"]}};
        
        await update({owner:owner} , newValues);
        return null;
    }
} 



