pragma solidity ^0.4.24;

// Base contract that can be destroyed by owner. 
// All funds in contract will be sent to the owner.
import "openzeppelin-solidity/contracts/lifecycle/Destructible.sol";

contract ImageRegister is Destructible {
  struct Image {
    string ipfsHash;
    string title;
    string description;
    string metadata;
  }

  // Storage
  mapping (address => Image[]) public ownerToImages;

  // events
  event LogImage(
    address indexed _owner, 
    string _ipfsHash, 
    string _title, 
    string _description, 
    string _metadata
  );

  // Store an image IPFS hash and metadata
  function setImage(
    string _ipfsHash, 
    string _title, 
    string _description, 
    string _metadata
    ) public returns (bool _success) {

    Image memory image = Image(
      _ipfsHash,
      _title,
      _description,
      _metadata
    );

    ownerToImages[msg.sender].push(image);

    emit LogImage(
      msg.sender,
      _ipfsHash,
      _title,
      _description,
      _metadata
    );

    _success = true;
  }

  function getImageCount(address _owner) public view returns (uint256) {
    return ownerToImages[_owner].length;
  }

  // Return an owner's IPFS hashes 
  function getImage(address _owner, uint8 _index) public view returns (
    string _ipfsHash, 
    string _title, 
    string _description, 
    string _metadata
    ) {
    Image storage image = ownerToImages[_owner][_index];
    return (image.ipfsHash, image.title, image.description, image.metadata);
  }
}