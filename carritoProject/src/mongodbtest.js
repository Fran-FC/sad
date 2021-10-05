const {MongoClient} = require("mongodb");
const url = "mongodb+srv://fran:3kiWdowwOoROcE8o@cluster0.6chou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbname = "compras"

async function run() {
    try {
        await client.connect();
        console.log("connected correctly to db");
        const db = client.db(dbname);

        const col = db.collection("carros");

        let carroDocument = {
            "owner" : {
                "name":"Fran",
                "email":"frafolcm@gmail.com"
            },
            "productos" : {
                "manzana" : 1,
                "platano" : 3,
                "arroz" : 2
            }
        }

        const p = await col.insertOne(carroDocument);
        //const myDoc = await col.deleteMany({"owner":"Fran"});
        const myDoc = await col.findOne();
        console.log(myDoc);

    } catch (err) {
       console.log(err.stack); 
    } finally {
        await client.close();
    }
}

run().catch(console.dir);