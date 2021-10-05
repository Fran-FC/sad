const {MongoClient} = require("mongodb");
const {ObjectId} = require("mongodb").ObjectId;
const url = "mongodb+srv://fran:3kiWdowwOoROcE8o@cluster0.6chou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbname = "compras"

async function wipe(){
    const owner = "Fran";
    console.log(owner);
    
   // {
   //     "name":"Fran",
   //     "email":"frafolcm@gmail.com"
   // }
    try {
        await client.connect();
        const db = client.db(dbname);
        const collection = db.collection("carros");

        const p = await collection.deleteMany({"owner": owner});
        console.log(p);
    } catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }
}
wipe().catch(console.dir);