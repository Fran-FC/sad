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
        var carrito = await search({owner:owner});
        if (!carrito) {
            await insert({owner: owner, products:{}});
            inMemory.carritos.push(owner);
            carrito = {owner: owner,products:{}};
        }         
        //console.log(carrito);
        return {
            carrito:{
                owner:owner,
                products:carrito.products
            }
        };
    },

    add: async carrito =>{ 
        const {owner, product, quantity} = carrito;
        //console.log({owner, product, quantity});

        const myDoc = await search({owner:owner});
		if (product in myDoc["products"])  {
			myDoc["products"][product] += parseInt(quantity);
		}
		else {
			myDoc["products"][product] = quantity;
		}

		const newValues = { $set : {products:myDoc["products"]}};

        const resp  = await update({owner:owner} , newValues);
        //console.log(resp);
        return null;
    } ,

    delete: async carrito =>{
        const {product, owner, quantity} = carrito;
        const myDoc = await search({owner:owner});

		if (product in myDoc["products"])  {
			var newQuantity = myDoc["products"][product] - quantity;
            if(newQuantity === 0) {
                delete myDoc["products"][product];
            } else {
                myDoc["products"][product] = newQuantity;
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



