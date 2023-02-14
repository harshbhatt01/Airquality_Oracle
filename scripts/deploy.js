const hre = require("hardhat");
const axios = require('axios');

async function main() {

  const airQualityOracle = await hre.ethers.getContractFactory("AirQualityOracle");
  const _airQualityOracle = await airQualityOracle.deploy();

  await _airQualityOracle.deployed();

  console.log(
    "AirQuality_Oracle_Address :", _airQualityOracle.address
  );

  const UserContract = await hre.ethers.getContractFactory("UserContract");
  const _UserContract = await UserContract.deploy(_airQualityOracle.address);

  await _UserContract.deployed();

  console.log(
    "UserContract_Address :", _UserContract.address
  );
}
main()