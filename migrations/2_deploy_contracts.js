const ImageRegister = artifacts.require('./ImageRegister.sol')

module.exports = function(deployer) {
  deployer.deploy(ImageRegister)
}
