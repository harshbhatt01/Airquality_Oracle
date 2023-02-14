// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AirQualityOracle is Ownable{

    struct AirdataStruct{
        string _quality;
    }

    mapping(uint => AirdataStruct) public data;
    address public payer;

    struct idOfCity{
        uint cityID;
        address sender;
    }

    int public id = -1;
    event AirDataUpdated(uint cityID, address sender, int id);

     modifier onlyPayer{
        require(tx.origin == payer, "Not the payer broooo");
        _;
    }

    idOfCity[] public people;

    function add(uint cityID, address payable sender) public onlyPayer returns (uint,address,int){
        people.push(idOfCity({cityID : cityID,sender : sender}));
        id++;
        emit AirDataUpdated(cityID,sender,id);
        return (cityID,sender,id);
    }

    function payForAirData() public payable returns(bool){
        require(msg.value >= 1 ether, "Payment must be at least 1 ether");
        payer = payable(tx.origin);
        return true;
    }

     function storeAirData(string memory quality, uint _id) onlyOwner public {
        data[_id] = AirdataStruct(quality);
    }

    function getAirData(uint _id) public view onlyPayer returns (string memory){
        return( data[_id]._quality);
    }
    
}
