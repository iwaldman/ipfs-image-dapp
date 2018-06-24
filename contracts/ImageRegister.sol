pragma solidity ^0.4.24;

// Base contract that can be destroyed by owner. 
import "openzeppelin-solidity/contracts/lifecycle/Destructible.sol";

/** 
 * @title ImageRegister
 * @author Irvin M. Waldman (@irvinwaldman)
 * @notice This contract represents a registry of image ownership. 
 * Due to storage limitations, mages are stored on IPFS.  
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
    uint256 updatedOn;
    uint256 clearedOn;
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
   * @dev Indicates that a user has updated an existing image metadata
   * @param _owner The owner of the image
   * @param _index The index of the image in then ownership map
   * @param _ipfsHash The IPFS hash
   * @param _title The image title
   * @param _description The image description
   * @param _tags The image tags
   * @param _updatedOn The last update timestamp
   */
  event ImageUpdated(
    address indexed _owner, 
    uint256 _index, 
    string _ipfsHash, 
    string _title, 
    string _description, 
    string _tags,
    uint256 _updatedOn
  );

  /**
   * @dev Indicates that a user has cleared an existing image
   * @param _owner The owner of the image
   * @param _index The index of the image in the ownership map
   * @param _clearedOn The cleared timestampe
   */
  event ImageCleared(
    address indexed _owner, 
    uint256 _index,
    string _ipfsHash,
    uint256 _clearedOn
  );

   /** 
    * @notice associate an image entry with the sender address
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
      uploadedOn,
      0,
      0
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
   * @notice returns the number of images associated with the given address
   * @param _owner owner address
   * @return number of images associated with a given address
   */
  function getImageCount(address _owner) public view returns (uint256) {
    return ownerToImages[_owner].length;
  }

  /** 
   * @notice returns the image at index in the ownership array
   * @param _owner owner address
   * @param _index next image to return
   * @return _ipfsHash IPFS hash
   * @return _title image title
   * @return _description image description
   * @return _tags image tags
   * @return _uploadedOn The uploaded timestamp
   * @return _updatedOn The updated timestamp
   * @return _clearedOn The cleared timestamp
   */ 
  function getImage(address _owner, uint8 _index) public view returns (
    string _ipfsHash, 
    string _title, 
    string _description, 
    string _tags,
    uint256 _uploadedOn,
    uint256 _updatedOn,
    uint256 _clearedOn
    ) {
    Image storage image = ownerToImages[_owner][_index];
    return (
      image.ipfsHash, 
      image.title, 
      image.description, 
      image.tags, 
      image.uploadedOn,
      image.updatedOn,
      image.clearedOn
    );
  }
}