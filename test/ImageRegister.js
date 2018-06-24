const ImageRegister = artifacts.require('./ImageRegister.sol')
const truffleAssert = require('truffle-assertions')

// test suite
contract('ImageRegister', (accounts) => {
  let imageRegisterInstance

  const owner = accounts[0]
  const ipfsHash = 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t'
  const title = 'Columbia Deep'
  const description = 'Dive on Columbia Reef at 150 feet'
  const tags = 'Scuba Diving, Cozumel, Reef'

  beforeEach(async () => {
    imageRegisterInstance = await ImageRegister.deployed()
  })

  it('should store an image', async () => {
    const success = await imageRegisterInstance.uploadImage.call(
      ipfsHash,
      title,
      description,
      tags
    )
    assert.equal(success, true, 'it returns true')
  })

  it('should emit an ImageUploaded event when storing an image', async () => {
    const tx = await imageRegisterInstance.uploadImage(
      ipfsHash,
      title,
      description,
      tags
    )

    truffleAssert.eventEmitted(tx, 'ImageUploaded', (ev) => {
      return (
        ev._owner === owner &&
        ev._ipfsHash === ipfsHash &&
        ev._title === title &&
        ev._description === description &&
        ev._tags === tags &&
        ev._uploadedOn.toNumber() !== 0
      )
    })
  })

  it('should return mage details', async () => {
    await imageRegisterInstance.uploadImage(
      ipfsHash,
      title,
      description,
      tags,
      {
        from: owner,
      }
    )

    const image = await imageRegisterInstance.getImage(owner, 0)

    assert.equal(image._title, title, 'has the correct title')
  })
})
