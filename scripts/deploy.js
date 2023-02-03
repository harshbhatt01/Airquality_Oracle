const hre = require("hardhat");
const { Contract, ethers } = require('ethers');
const axios = require('axios');

async function main() {


  const api = await hre.ethers.getContractFactory("AirQualityContract");
  const _api = await api.deploy();

  await _api.deployed();

  console.log(
    "Address :", _api.address
  );
  
  
  const transactionResponse = await _api.requestAirQuality(202440)
  const transactionReceipt = await transactionResponse.wait()
  console.log(transactionReceipt.events[0].args.location_id)
  // Name = transactionReceipt.events[0].args._first


  try {
        location_id_ = transactionReceipt.events[0].args.location_id
        //const location_id = 202440
        const apiKey = 'OBkMF3NSKDpiQiay2yt6hEevco5uPYkl';
        const AirQualityAPI = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${location_id_}?apikey=${apiKey}&details=true`;
        const response = await axios.get(AirQualityAPI);
        const AirQualityData = response.data;
        const Air = AirQualityData.DailyForecasts[0].AirAndPollen[0].Category
        //console.log(AirQualityData.DailyForecasts);
        console.log(Air);
        
        const updateData = await _api.updateAirQuality(location_id_,Air);
        console.log(updateData);
        const finalData = await _api.getAirQuality(location_id_)
        console.log(finalData)

  } catch (e) {
    console.error(e);
}
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});