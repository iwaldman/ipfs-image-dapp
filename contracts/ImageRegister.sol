pragma solidity ^0.4.24;

// Base contract that can be destroyed by owner. 
import "openzeppelin-solidity/contracts/lifecycle/Destructible.sol";

/** 
 * @title ImageRegister
 * @author Irvin M. Waldman 
 * @notice This contract represents a registry of image ownership. 
 * Due to storage limitations, images are stored on IPFS.  
 * The IPFS hash along with metadata are stored onchain.
 */
contract ImageRegister is Destructible {

  /** 
   * @title Represents a single image which is owned by someone. 
   */
  struct Image {
    string ipfsHash;
    string title;
    string description;
    string tags;
    uint256 uploadedOn;
  }

  // Maps owner to their images
  mapping (address => Image[]) public ownerToImages;

  /**
   * @dev Indicates that a user has uploaded a new image
   * @param _owner The owner of the image
   * @param _ipfsHash The IPFS hash
   * @param _title The image title
   * @param _description The image description
   * @param _tags The image tags
   * @param _uploadedOn The upload timestamp
   */
  event ImageUploaded(
    address indexed _owner, 
    string _ipfsHash, 
    string _title, 
    string _description, 
    string _tags,
    uint256 _uploadedOn
  );

   /** 
    * @notice associate an image entry with the owner i.e. sender address
    * @param _ipfsHash The IPFS hash
    * @param _title The image title
    * @param _description The image description
    * @param _tags The image tag(s)
    */
  function uploadImage(
    string _ipfsHash, 
    string _title, 
    string _description, 
    string _tags
    ) public returns (bool _success) {

    uint256 uploadedOn = now;
    Image memory image = Image(
      _ipfsHash,
      _title,
      _description,
      _tags,
      uploadedOn
    );

    ownerToImages[msg.sender].push(image);

    emit ImageUploaded(
      msg.sender,
      _ipfsHash,
      _title,
      _description,
      _tags,
      uploadedOn
    );

    _success = true;
  }

  /** 
   * @notice Returns the number of images associated with the given address
   * @param _owner The owner address
   * @return The number of images associated with a given address
   */
  function getImageCount(address _owner) public view returns (uint256) {
    return ownerToImages[_owner].length;
  }

  /** 
   * @notice Returns the image at index in the ownership array
   * @param _owner The owner address
   * @param _index The index of the image to return
   * @return _ipfsHash The IPFS hash
   * @return _title The image title
   * @return _description The image description
   * @return _tags image Then image tags
   * @return _uploadedOn The uploaded timestamp
   */ 
  function getImage(address _owner, uint8 _index) public view returns (
    string _ipfsHash, 
    string _title, 
    string _description, 
    string _tags,
    uint256 _uploadedOn
    ) {

    Image storage image = ownerToImages[_owner][_index];
    
    return (
      image.ipfsHash, 
      image.title, 
      image.description, 
      image.tags, 
      image.uploadedOn
    );
  }
}