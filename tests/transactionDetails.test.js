const getTransactions = require('../server/transactionDetails').getTransactions

describe('Test suite for Transactions', () => {

    test('getTransactions function exists', () => {
        expect(typeof getTransactions).toEqual('function');
      });
    
    test('Transaction exists for a given SKU ID', () => {
        const skuID = 'YPU346838/42/51'
        return getTransactions(skuID).then(data => {
            expect(Array.isArray([data])).toBe(true);
            expect(data).toEqual( expect.arrayContaining([
                expect.objectContaining({sku: skuID })
              ])) 
        })
      });
      
    test('Transaction does not exist for a given SKU ID', () => {
        return getTransactions('TVN783304/18/16').then(data => {
            expect(Array.isArray([data])).toBe(true);
            expect(data).toHaveLength(0) 
        })
      });

})
