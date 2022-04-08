const { expect } = require('chai')
const Caver = require('../index')
const testRPCURL = require('./testrpc')

const caver = new Caver(testRPCURL)

describe('get block', () => {
    it('should have specific property', async () => {
        const blockInfo = await caver.klay.getBlock(1)
        expect(blockInfo.receiptsRoot).to.exist
    })

    it('should return error when calling on non-existent block', done => {
        caver.klay.getBlockNumber().then(currentBlockNumber => {
            const queryBlockNumber = currentBlockNumber + 10000
            caver.klay
                .getBlock(queryBlockNumber)
                .then(() => {
                    done(false)
                })
                .catch(err => {
                    expect(err).to.be.null
                    done()
                })
        })
    })
})
