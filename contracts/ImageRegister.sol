pragma solidity ^0.4.24;

// Base contract that can be destroyed by owner. 
import "openzeppelin-solidity/contracts/lifecycle/Destructible.sol";

/** 
 * @title ImageRegister
 * @author Irvin M. Waldman (@irvinwaldman)
 * @dev Stores IPFS image hashes by address along with metadata
 */
contract ImageRegister is Destructible {

  /// @dev Represents a single image which is owned by someone. 
  struct Image {
    // IPFS hash
    string ipfsHash;
    // Metadata
    string title;
    string description;
    string metadata;
  }

  // Maps owner to the owner's images
  mapping (address => Image[]) public ownerToImages;

  /**
   * @notice Indicates that a user has uploaded an image
   * @param _owner The owner of the image
   * @param _ipfsHash The IPFS image hash
   * @param _title The image title
   * @param _description The image description
   * @param _metadata The image metadata
   */
  event LogImage(
    address indexed _owner, 
    string _ipfsHash, 
    string _title, 
    string _description, 
    string _metadata
  );

   /** 
    * @dev associate a image entry with the sender address
    * @param _ipfsHash The IPFS hash
    * @param _title The image title
    * @param _description The image description
    * @param _metadata The image tag(s)
    */
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

  /** 
   * @dev returns the number of images associated with the given address
   * @param _owner owner address
   * @return number of images associated with a given address
   */
  function getImageCount(address _owner) public view returns (uint256) {
    return ownerToImages[_owner].length;
  }

  /** 
   * @dev returns the 
   * @param _owner owner address
   * @param _index next image to return
   * @return _ipfsHash IPFS hash
   * @return _title image title
   * @return _description image description
   * @return _metadata image metadata
   */ 
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