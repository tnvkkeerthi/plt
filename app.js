const calculateStock = require('./server/calculate').calculateStock
const skuID = process.argv.slice(2)[0] 

if(!skuID){
    console.log(`Please provide a valid SKU ID in the arguments`)
}
else {
    calculateStock(skuID)
        .then((value) => console.log(`The stock value for ${skuID} is :: ${JSON.stringify(value)}`))
        .catch((error) => console.log(`Error while getting the stock value : ${error}`))
        .finally(() => console.log("Done !!"));
}
