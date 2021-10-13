var readline = require('readline');
const internal = require('stream');
const { Carrito } = require("./carrito");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const home_msg = "--------BIENVENIDO AL PORTAL DE COMPRA ONLINE--------\n[1] AÑADIR PRODUCTO\t[2] ELIMINAR PRODUCTO\t[3] MOSTRAR CARRO"
const carro = new Carrito("Fran");

let initialized = false;
let modifyMod = false;
let addMod = false;
let deleteMod = false;

const inicio = async function(line){
    if(!initialized){
        initialized = true;
        await carro.cogerCarrito();
    }
    if(!modifyMod) {
        if(line==="1") {
            console.log("INTRODUZCA EL PRODUCTO Y LA CANTIDAD A AÑADIR SEPARADOS POR UN ESPACIO (ej. Manzanas 2)");
            modifyMod = true;
            addMod = true;
        } else if(line ==="2") {
            console.log("INTRODUZCA EL PRODUCTO Y LA CANTIDAD A ELIMINAR SEPARADOS POR UN ESPACIO (ej. Manzanas 2)"); 
            modifyMod = true;
            deleteMod = true;
        } else if(line==="3") {
            let contenidos = await carro.toString();
            console.log(contenidos["productos"]);
        }
    } else {
        let [prod, cant] = line.split(' ');
        if (prod != '') {
            if (deleteMod) {
                deleteMod  = false;
                cant = (cant === '')? cant = 1: cant;
                carro.remove(prod.toLowerCase(), cant).catch(console.log);
            } else if (addMod) {
                addMod = false;
                cant = (cant === '')? cant = 1: cant;
                carro.add(prod.toLowerCase(), cant);
            }
        }
        modifyMod = false;
    }
    if (!modifyMod) console.log(home_msg);
};

console.log(home_msg);

rl.on('line', inicio);
