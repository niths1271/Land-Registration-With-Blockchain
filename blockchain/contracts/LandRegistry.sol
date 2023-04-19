pragma solidity ^0.5.0;

contract LandRegistry {

// Struct declaration for User
    struct User {
        string name;
        address payable account;
        uint256 age;
        string email;
        string aadharIpfsHash;
        string pan_num;
        string phone_num;
        bool verified;
    }

// Struct declaration for land
    struct Land {
        uint id;
        string hissa;
        string survey;
        string pid;
        string doc_hash;
        address payable owner;
        string price;
        bool verified;
    }

// Struct declaration for Admin
    struct Admin {
        uint id;
        address account;
        string name;
        uint age;
        string phone_num;
    }

// Declare an admin object
    Admin admin;

// Constructor to initialize the account of admin to the address of person who deployed the contract
     constructor() public{
        admin.account = msg.sender ;
    }


// Mappings
    mapping(address => User) public users;
    mapping(uint256 => Land) public lands;
    mapping(address => bool) public registrationMapping;


// Variables
    uint256 public landCount;
    uint256 public userCount;


// Events
    // event UserRegistered(address payable account, string name);
    // event LandAdded(uint256 id, string name, address payable owner);
    // event LandBought(uint256 id, address payable buyer, uint256 price);
    event UserVerified(address userAddress, bool status);
    event LandVerified(uint id, bool status);
    event UserRegistered(string name,uint age,string email,string aadharIpfsHash,string pan_num, string phone_num);
    event LandAdded(uint id,string _hissa,address payable owner,string _doc_hash, string _survey,string _pid, string _price);


// Check whether user is registered to our network
    function isRegistered(address userAddress)public view returns (bool){
        if(registrationMapping[userAddress])
            return true;
    }

// Verify User by Admin
    function verifyUser(address userAddress,bool _status) public{
        require(msg.sender == address(admin.account));
        users[userAddress].verified=_status;

        emit UserVerified(userAddress, _status);
    }

// Verify Land by Admin
    function verifyLand(uint _id,bool _status) public{
        require(msg.sender == address(admin.account));
        lands[_id].verified=_status;

        emit LandVerified(_id,_status);
    }

// Get User verification status
    function getUserVerificationStatus(address _userAddress) public view returns (bool){
        return users[_userAddress].verified;
    }

// Get land verification status
    function getLandVerificationStatus(address _userAddress) public view returns (bool){
        return users[_userAddress].verified;
    }


// To get land count
    function getLandCount() public view returns (uint) {
        return landCount;
    }

// Get Land details
    function getLandDetails(uint _id) public view returns (string memory,string memory,string memory,string memory,string memory, address){
        Land memory l = lands[_id];
        return (l.hissa, l.doc_hash, l.pid, l.survey, l.price, l.owner);
    }



// Register User into the network
    function registerUser(string memory _name,uint256 _age,string memory _email,string memory _aadharIpfsHash,string memory _pan_num,string memory _phone_num) public {
        require(!registrationMapping[msg.sender]);
        User memory newUser = User({
            name: _name,
            account: msg.sender,
            age: _age,
            email: _email,
            aadharIpfsHash: _aadharIpfsHash,
            pan_num: _pan_num,
            phone_num: _phone_num,
            verified:false
        });

        registrationMapping[msg.sender]=true;
        users[msg.sender] = newUser;

        emit UserRegistered(_name,_age,_email,_aadharIpfsHash,_pan_num,_phone_num);
    }

// Get the user details
     function getUserDetails(address i) public view returns (string memory, uint, string memory, string memory, string memory, string memory,bool) {
        return (users[i].name,users[i].age,users[i].email,users[i].aadharIpfsHash,users[i].pan_num,users[i].phone_num,users[i].verified);
    }

    // Add land 
    function addLand(string memory _hissa, string memory _doc_hash, string memory _survey, string memory _pid, string memory _price) public {

        Land memory newLand = Land({
            id: landCount,
            hissa: _hissa,
            owner: msg.sender,
            doc_hash: _doc_hash,
            survey: _survey,
            pid: _pid,
            verified: false,
            price : _price
        });

        lands[landCount] = newLand;
        landCount++;

        emit LandAdded(newLand.id, _hissa, newLand.owner, _doc_hash, _survey, _pid, _price);
    }

}