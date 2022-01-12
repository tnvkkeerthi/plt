const getStock = require('../server/stockDetails').getStock

describe('Test suite for stock', () => {

    test('getStock function exists', () => {
        expect(typeof getStock).toEqual('function');
      });
    
    test('SKU id exists in the stock file', () => {
        return getStock('YPU346838/42/51').then(data => {
            expect(Boolean(data['sku']) && Boolean(data['stock'])).toBe(true)
            expect(data).toHaveProperty('sku')
            expect(data['sku']).toEqual('YPU346838/42/51')   
        })
      });
      
    test('SKU id does not exist in the stock file', () => {
        return getStock('YPU346838/42/5').then(data => {
            expect(data).toBeFalsy() 
        })
      });

})
