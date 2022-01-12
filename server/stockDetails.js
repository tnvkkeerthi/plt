const stockFile = require('../stock.json')

/**
 * @name getStock
 * @description  Retrieves the initial stock value for a given SKU ID from stock.json file
 * @param {string} sku SKU ID
 * 
 * @returns {Promise} resolves stockrow - JSON object with sku, stock properties | rejects with error
 */
const getStock = (sku) => {
    return new Promise((resolve, reject) => {
        try {
            let stockrow = stockFile.find(stock => {
                return stock.sku === sku
            })
            resolve(stockrow)
        }
        catch (error) {
            return reject(error)
        }
    })
}

module.exports = {
    getStock
}