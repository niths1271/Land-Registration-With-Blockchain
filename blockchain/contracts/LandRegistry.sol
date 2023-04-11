pragma solidity ^0.5.0;

contract LandRegistry {
    struct User {
        string name;
        address payable account;
        bool registered;
    }

    struct Land {
        uint256 id;
        string name;
        address payable owner;
        bool forSale;
        uint256 price;
    }

    mapping(address => User) public users;
    mapping(uint256 => Land) public lands;

    uint256 public landCount;

    event UserRegistered(address payable account, string name);
    event LandAdded(uint256 id, string name, address payable owner);
    event LandBought(uint256 id, address payable buyer, uint256 price);


    function getLandCount() public view returns (uint) {
        return landCount;
    }

    function getLandDetails(uint i) public view returns (uint) {
        return lands[i].price;
    }

    function registerUser(string memory _name) public {
        require(!users[msg.sender].registered, "User already registered");

        User memory newUser = User({
            name: _name,
            account: msg.sender,
            registered: true
        });

        users[msg.sender] = newUser;

        emit UserRegistered(msg.sender, _name);
    }

    function addLand(string memory _name, uint256 _price) public {

        Land memory newLand = Land({
            id: landCount,
            name: _name,
            owner: msg.sender,
            forSale: false,
            price: _price
        });

        lands[landCount] = newLand;
        landCount++;

        emit LandAdded(newLand.id, newLand.name, newLand.owner);
    }

    function buyLand(uint256 _id) public payable {
        Land memory land = lands[_id];
        
        require(land.forSale, "Land not for sale");
        require(msg.value == land.price, "Incorrect price");

        address payable oldOwner = land.owner;
        address payable newOwner = msg.sender;

        oldOwner.transfer(msg.value);

        land.owner = newOwner;
        land.forSale = false;
        lands[_id] = land;

        emit LandBought(_id, newOwner, msg.value);
    }
}
