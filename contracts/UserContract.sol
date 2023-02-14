// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "./AirQualityOracle.sol";

contract UserContract {
    AirQualityOracle c1;
    bool payment;


    constructor(address _c1) public {
        c1 = AirQualityOracle(_c1);
    }

    uint public location_id;
    address public sender_address;
    int public _id;

    function requestAirData(uint _location_id, address payable _sender_address) public payable returns (uint, address, int, bool){
        (bool success) = c1.payForAirData{value:msg.value}();

        location_id = _location_id;
        sender_address = _sender_address;
        (uint loc_id, address sender, int id) = c1.add(_location_id, _sender_address);
         _id = c1.id();
        return (loc_id,sender,id,success);
    }

    function getData() public view returns(uint, address, int){
        return(location_id,sender_address, _id);
    }

    function retreiveData(uint id) public view returns(string memory){
        return c1.getAirData(id);
    }
}