const transactionFile = require('../transactions.json')


/**
 * @name getTransactions
 * @description  Retrieves the list of transactions on a specific skuID from transactions.json file
 * @param {string} sku SKU ID
 * 
 * @returns {Promise} resolves with transactionsList - Array of JSON objects with sku, type, qty properties | rejects with error
 */
function getTransactions(sku) {
    return new Promise((resolve, reject) => {
        try {
            let transactionsList = transactionFile.filter(transaction => {
                return transaction.sku === sku
            })
            resolve(transactionsList)
        }
        catch (error) {
            return reject(error)
        }
    })
}


module.exports = {
    getTransactions
}