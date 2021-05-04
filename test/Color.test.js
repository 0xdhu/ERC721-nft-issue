const { assert } = require('chai')

const Color = artifacts.require('./Color.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Color', (accounts)=>{
    // console.log(accounts)
    // let contract
    
    // This will be done before 
    before(async () => {
        contract = await Color.deployed()
    })

    describe('deployment', async () => {
        it('successfully deployment', async () => {
            const address = contract.address
            assert.notEqual(address, null)
            assert.notEqual(address, 0x0)
            assert.notEqual(address, undefined)
            assert.notEqual(address, '')
        })

        it('has a name', async () => {
            const name = await contract.name()
            assert.equal(name, 'Color')
        })

        it('has a symbol', async () => {
            const symbol = await contract.symbol()
            assert.equal(symbol, 'COLOR')
        })
    })

    describe('minting', async()=>{
        it('creates a new token', async() => {
            const result = await contract.mint("#FFFFFF")
            const totalSupply = await contract.totalSupply()
            // SUCCESS
            assert.equal(totalSupply, 1)
            const event = result.logs[0].args
            assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
            assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
            assert.equal(event.to, accounts[0], 'to is corrrect')

            // FAILURE: cannot mint same color twice
            await contract.mint("#FFFFFF").should.be.rejected;
        })
    })

    describe('indexing', async () => {
        it('list colors', async () => {
            await contract.mint("#e1701a")
            await contract.mint("#e7d4b5")
            await contract.mint("#f6e6cb")
            await contract.mint("#e3cdc1")

            const totalSupply = await contract.totalSupply()

            let color;
            let result = []

            for(var i = 1; i <= totalSupply; i++) {
                color = await contract.colors(i - 1)
                result.push(color)
            }

            let expected = ['#FFFFFF','#e1701a', '#e7d4b5', '#f6e6cb', '#e3cdc1']
            assert.equal(result.join(','), expected.join(','))
        })
    })

})