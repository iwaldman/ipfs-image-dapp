const ImageRegister = artifacts.require('./ImageRegister.sol')
const truffleAssert = require('truffle-assertions')

// test suite
contract('ImageRegister', (accounts) => {
  // Contract instance
  let imageRegisterInstance

  // A few owner accounts
  const owner = accounts[0]
  const owner2 = accounts[1]
  const owner3 = accounts[2]

  // Imaage 1
  const ipfsHash1 = 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t'
  const title1 = 'Columbia Deep'
  const description1 = 'Wall Dive on Columbia Reef at 150 feet'
  const tags1 = 'Scuba Diving, Cozumel, Reef'

  // Imaage 2
  const ipfsHash2 = 'QmWzQSuPMSa6XcBZKpEjPHPUZN2NjB3YrhJHTsV4X3bv1t'
  const title2 = 'Palacar Caves'
  const description2 = 'Shallow cave dive at 60 feet'
  const tags2 = 'Scuba Diving, Cozumel, Reef'

  beforeEach('setup contract for each test', async () => {
    imageRegisterInstance = await ImageRegister.new(accounts[0])
  })

  it('has an owner', async () => {
    assert.equal(await imageRegisterInstance.owner(), owner, 'has an owner')
  })

  it('should selfdestruct', async () => {
    try {
      await imageRegisterInstance.destroy()
    } catch (err) {
      assert.fail('owner unable to selfdestruct')
    }
  })

  it('should store an image', async () => {
    const success = await imageRegisterInstance.uploadImage.call(
      ipfsHash1,
      title1,
      description1,
      tags1
    )
    assert.equal(success, true, 'it returns true')
  })

  it('should emit a LogImageUploaded event when storing an image', async () => {
    const tx = await imageRegisterInstance.uploadImage(
      ipfsHash1,
      title1,
      description1,
      tags1
    )

    truffleAssert.eventEmitted(tx, 'LogImageUploaded', (ev) => {
      return (
        ev._owner === owner &&
        ev._ipfsHash === ipfsHash1 &&
        ev._title === title1 &&
        ev._description === description1 &&
        ev._tags === tags1 &&
        ev._uploadedOn.toNumber() !== 0
      )
    })
  })

  it('should return image details', async () => {
    await imageRegisterInstance.uploadImage(
      ipfsHash1,
      title1,
      description1,
      tags1,
      {
        from: owner,
      }
    )

    const image = await imageRegisterInstance.getImage(owner, 0)

    assert.equal(image[0], ipfsHash1, 'has the correct IPFS hash')
    assert.equal(image[1], title1, 'has the correct title')
    assert.equal(image[2], description1, 'has the correct description')
    assert.equal(image[3], tags1, 'has the correct tags')
    assert.notEqual(image[4], 0, 'has an uploadedOn date')
  })

  it('should return image count', async () => {
    await imageRegisterInstance.uploadImage(
      ipfsHash1,
      title1,
      description1,
      tags1,
      {
        from: owner,
      }
    )

    await imageRegisterInstance.uploadImage(
      ipfsHash2,
      title2,
      description2,
      tags2,
      {
        from: owner,
      }
    )

    const count = await imageRegisterInstance.getImageCount(owner)

    assert.equal(count.toNumber(), 2, 'has the correct image count')
  })

  it('should store images for any number of owners', async () => {
    // Upload one image for owner 1
    await imageRegisterInstance.uploadImage(
      ipfsHash1,
      title1,
      description1,
      tags1,
      {
        from: owner,
      }
    )

    // Upload two images for owner 2
    await imageRegisterInstance.uploadImage(
      ipfsHash1,
      title1,
      description1,
      tags1,
      {
        from: owner2,
      }
    )

    await imageRegisterInstance.uploadImage(
      ipfsHash2,
      title2,
      description2,
      tags2,
      {
        from: owner2,
      }
    )

    // Upload one image for owner 3
    await imageRegisterInstance.uploadImage(
      ipfsHash1,
      title1,
      description1,
      tags1,
      {
        from: owner3,
      }
    )

    assert.equal(
      (await imageRegisterInstance.getImageCount(owner)).toNumber(),
      1,
      'has the correct image count for owner 1'
    )

    assert.equal(
      (await imageRegisterInstance.getImageCount(owner2)).toNumber(),
      2,
      'has the correct image count for owner 2'
    )

    assert.equal(
      (await imageRegisterInstance.getImageCount(owner3)).toNumber(),
      1,
      'has the correct image count for owner 3'
    )
  })

  it('should require a valid IPFS hash when uploading an image', async () => {
    const badIPFSHash = ipfsHash1.slice(0, ipfsHash1.length / 2)

    try {
      await imageRegisterInstance.uploadImage('', title1, description1, tags1, {
        from: owner,
      })
      assert.fail('Expected throw not received')
    } catch (error) {
      assert(
        error.message.indexOf('revert') >= 0,
        'error message must contain revert'
      )
    }

    try {
      await imageRegisterInstance.uploadImage(
        badIPFSHash,
        title1,
        description1,
        tags1,
        {
          from: owner,
        }
      )
      assert.fail('Expected throw not received')
    } catch (error) {
      assert(
        error.message.indexOf('revert') >= 0,
        'error message must contain revert'
      )
    }
  })

  it('should require a valid title when uploading an image', async () => {
    try {
      await imageRegisterInstance.uploadImage(
        ipfsHash1,
        '',
        description1,
        tags1,
        {
          from: owner,
        }
      )
      assert.fail('Expected throw not received')
    } catch (error) {
      assert(
        error.message.indexOf('revert') >= 0,
        'error message must contain revert'
      )
    }

    try {
      await imageRegisterInstance.uploadImage(
        ipfsHash1,
        'X'.repeat(257),
        description1,
        tags1,
        {
          from: owner,
        }
      )
      assert.fail('Expected throw not received')
    } catch (error) {
      assert(
        error.message.indexOf('revert') >= 0,
        'error message must contain revert'
      )
    }
  })

  it('should require a valid description when uploading an image', async () => {
    try {
      await imageRegisterInstance.uploadImage(ipfsHash1, title1, '', tags1, {
        from: owner,
      })
    } catch (error) {
      assert.fail('Unexpected throw received')
    }

    try {
      await imageRegisterInstance.uploadImage(
        ipfsHash1,
        title1,
        'X'.repeat(1025),
        tags1,
        {
          from: owner,
        }
      )
      assert.fail('Expected throw not received')
    } catch (error) {
      assert(
        error.message.indexOf('revert') >= 0,
        'error message must contain revert'
      )
    }
  })

  it('should require tags when uploading an image', async () => {
    try {
      await imageRegisterInstance.uploadImage(
        ipfsHash1,
        title1,
        description1,
        '',
        {
          from: owner,
        }
      )
      assert.fail('Expected throw not received')
    } catch (error) {
      assert(
        error.message.indexOf('revert') >= 0,
        'error message must contain revert'
      )
    }

    try {
      await imageRegisterInstance.uploadImage(
        ipfsHash1,
        title1,
        description1,
        'X'.repeat(257),
        {
          from: owner,
        }
      )
      assert.fail('Expected throw not received')
    } catch (error) {
      assert(
        error.message.indexOf('revert') >= 0,
        'error message must contain revert'
      )
    }
  })

  it('should require a valid address when retrieving image count', async () => {
    try {
      await imageRegisterInstance.getImageCount(0x0)
      assert.fail('Expected throw not received')
    } catch (error) {
      assert(
        error.message.indexOf('revert') >= 0,
        'error message must contain revert'
      )
    }
  })

  it('should require a valid index when retrieving image details', async () => {
    try {
      await imageRegisterInstance.getImage(owner, -1)
      assert.fail('Expected throw not received')
    } catch (error) {
      assert(
        error.message.indexOf('revert') >= 0,
        'error message must contain revert'
      )
    }

    try {
      await imageRegisterInstance.getImage(owner, 257)
      assert.fail('Expected throw not received')
    } catch (error) {
      assert(
        error.message.indexOf('revert') >= 0,
        'error message must contain revert'
      )
    }

    try {
      await imageRegisterInstance.getImage(owner, 0)
      assert.fail('Expected throw not received')
    } catch (error) {
      assert(
        error.message.indexOf('revert') >= 0,
        'error message must contain revert'
      )
    }
  })
})
