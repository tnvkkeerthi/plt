const getStock = require('./stockDetails').getStock
const getTransactions = require('./transactionDetails').getTransactions


/**
 * @name calculateStock
 * @description  Gives the current stock value for a given SKU ID
 * @param {string} sku SKU ID
 * 
 * @returns {Promise} resolves with result - JSON object with sku, qty properties | rejects with error
 */
function calculateStock(sku) {
    return new Promise(function (resolve, reject) {
        try {
            let result = {};
            getStock(sku)
                .then((currentStock) => {
                    getTransactions(sku).then((transactionsList) => {
                        if (!currentStock && transactionsList.length == 0) {
                            return reject('SKU doesnot exist')
                        }
                        else {
                            //initializes the base stock value to 0 if there is no data against given SKU in stock file
                            currentStock = (currentStock) ? currentStock.stock : 0
                            calculateBalanceStock(transactionsList, currentStock || 0)
                                .then((stockValue) => {
                                    console.log(`Initial stock value : ${currentStock}`)
                                    console.log(`Current stock value : ${stockValue}`)
                                    result.sku = sku;
                                    result.qty = stockValue;
                                    return resolve(result)
                                })
                                .catch((error) => {
                                    console.error(`Error while calculating the stock value : ${error}`);
                                    return reject(error)
                                })
                        }
                    })
                })
        }
        catch (error) {
            return reject(error)
        }
    })
}


/**
 * @name calculateBalanceStock
 * @description  Calculates the current stock value from the list of transactions, for a given SKU ID
 * @param {number} stock SKU ID
 * @param {Array} transactionsList Array of JSON objects with sku, type, qty properties
 * @returns {Promise} resolves with finalStockVal - number | rejects with error
 */
function calculateBalanceStock(transactionsList, stock) {
    return new Promise((resolve, reject) => {
        try {
            const finalStockVal = transactionsList.reduce((stockVal, currentVal) => {
                if (currentVal.type == 'refund')
                    stockVal = stockVal + currentVal.qty
                else
                    stockVal = stockVal - currentVal.qty

                return stockVal

            }, stock)

            resolve(finalStockVal)
        }
        catch (error) {
            return reject(error)
        }
    })
}


module.exports = {
    calculateStock , 
    calculateBalanceStock
}
