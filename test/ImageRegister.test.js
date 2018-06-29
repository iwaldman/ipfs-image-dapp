const ImageRegister = artifacts.require('./ImageRegister.sol')
const truffleAssert = require('truffle-assertions')

// test suite
contract('ImageRegister', (accounts) => {
  // Contract instance
  let imageRegisterInstance

  // A few owner accounts
  const owner = accounts[0]
  const bob = accounts[1]
  const sally = accounts[2]
  const emptyAddress = '0x0000000000000000000000000000000000000000'

  // Imaage 1 details
  const ipfsHash1 = 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t'
  const title1 = 'Columbia Deep'
  const description1 = 'Wall Dive on Columbia Reef at 150 feet'
  const tags1 = 'Scuba Diving, Cozumel, Reef'

  // Imaage 2 details
  const ipfsHash2 = 'QmWzQSuPMSa6XcBZKpEjPHPUZN2NjB3YrhJHTsV4X3bv1t'
  const title2 = 'Palacar Caves'
  const description2 = 'Shallow cave dive at 60 feet'
  const tags2 = 'Scuba Diving, Cozumel, Reef'

  // Create a new instance of the contract before each test
  beforeEach('setup contract for each test', async () => {
    imageRegisterInstance = await ImageRegister.new(accounts[0])
  })

  // It should have an owner
  it('has an owner', async () => {
    assert.equal(await imageRegisterInstance.owner(), owner, 'has an owner')
  })

  // It should support self-destruction i.e. mortal pattern
  it('should selfdestruct', async () => {
    try {
      await imageRegisterInstance.destroy()
    } catch (err) {
      assert.fail('owner unable to selfdestruct')
    }
  })

  // It should store an image on the blockchain
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

  // It should return details of an image previously stored on the blockchain
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

    assert.equal(
      image[0],
      ipfsHash1,
      'the IPFS hash does not match the expected value'
    )
    assert.equal(
      image[1],
      title1,
      'the title does not match the expected value'
    )
    assert.equal(
      image[2],
      description1,
      'the description does not match the expected value'
    )
    assert.equal(image[3], tags1, 'the tags do not match the expected value')
    assert.notEqual(image[4], 0, 'the uploadedOn date should be non-zero')
  })

  // It should return the correct image count
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

    assert.equal(count.toNumber(), 2, 'image count should be 2')
  })

  // It should store images for any owner
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

    // Upload two images for bob
    await imageRegisterInstance.uploadImage(
      ipfsHash1,
      title1,
      description1,
      tags1,
      {
        from: bob,
      }
    )

    await imageRegisterInstance.uploadImage(
      ipfsHash2,
      title2,
      description2,
      tags2,
      {
        from: bob,
      }
    )

    // Upload one image for sally
    await imageRegisterInstance.uploadImage(
      ipfsHash1,
      title1,
      description1,
      tags1,
      {
        from: sally,
      }
    )

    assert.equal(
      (await imageRegisterInstance.getImageCount(owner)).toNumber(),
      1,
      'image count should be 1 for primary owner'
    )

    assert.equal(
      (await imageRegisterInstance.getImageCount(bob)).toNumber(),
      2,
      'image count should be 2 for bob'
    )

    assert.equal(
      (await imageRegisterInstance.getImageCount(sally)).toNumber(),
      1,
      'image count should be 1 for sally'
    )
  })

  // It should require a valid IPFS hash
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

  // It should require a valid title where the length cannot be greater than 256
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

  // It should require a valid description where the length cannot be greater than 1024
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

  // It should require tags where the combined list length cannot be greater than 256
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

  // It should require an owner address when retriving the image count
  it('should require a valid address when retrieving image count', async () => {
    try {
      await imageRegisterInstance.getImageCount(emptyAddress)
      assert.fail('Expected throw not received')
    } catch (error) {
      assert(
        error.message.indexOf('revert') >= 0,
        'error message must contain revert'
      )
    }
  })

  // It should require a valid index when retrieving image details
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

  // Only the contracgt owner can perform an emergency stop
  it('should allow the owner to perform an emergency stop', async () => {
    await imageRegisterInstance.emergencyStop(true, { from: owner })
  })

  // It should fail if anyone other than the contract owner attempts to
  // perform an emergency stop
  it('should disallow a non-owner to perform an emergency stop', async () => {
    try {
      await imageRegisterInstance.emergencyStop(true, { from: bob })
      assert.fail('Expected throw not received')
    } catch (error) {
      assert(
        error.message.indexOf('revert') >= 0,
        'error message must contain revert'
      )
    }
  })

  // It should disallow uploading an image when the contract is paused
  it('should disallow uploading an image when there is an emergency stop', async () => {
    await imageRegisterInstance.emergencyStop(true, { from: owner })

    try {
      await imageRegisterInstance.uploadImage(
        ipfsHash1,
        title1,
        description1,
        '',
        {
          from: bob,
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

  // It should log an LogEmergency event when pausing / restarting a contract
  it('should emit a LogEmergencyStop event when performing an emergency stop', async () => {
    const tx = await imageRegisterInstance.emergencyStop(true, { from: owner })

    truffleAssert.eventEmitted(tx, 'LogEmergencyStop', (ev) => {
      return ev._owner === owner && ev._stop === true
    })
  })
})
