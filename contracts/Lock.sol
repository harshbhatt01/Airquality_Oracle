// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract AirQualityContract {

    struct AirQualityData {
        string category_name;
    }

    event air(uint location_id);

    mapping (uint => AirQualityData) public airqualityData;

    function updateAirQuality(uint location_id,  string memory _category_name) public {
        airqualityData[location_id].category_name = _category_name;
    }

    function requestAirQuality(uint location_id) public {
        emit air(location_id);
    }

    function getAirQuality(uint location_id) public view returns(string memory){
        AirQualityData memory currentairdata = airqualityData[location_id];
        return (currentairdata.category_name);
    }
}


