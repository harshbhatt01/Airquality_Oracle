const { Contract, ethers } = require('ethers');
const axios = require('axios');
const {UserContract_ABI, AirQualityOracle_ABI} = require("../Constraints/abi.js")

async function getStockData(){
    const userContractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
    const AirQualityoracleContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
    const provider = new ethers.providers.JsonRpcProvider();
    const signer = provider.getSigner()
    const userContract = new Contract(userContractAddress, UserContract_ABI, signer)
    const oracleContract = new Contract(AirQualityoracleContractAddress, AirQualityOracle_ABI, signer)
   
    const xyz = await userContract.requestAirData(202440,"0x2546BcD3c84621e976D8185a91A922aE77ECEc30",{value:ethers.utils.parseEther("2"), gasLimit : 300000})
    const data = await userContract.getData()

    const location_ID = data[0]
    const address_of_sender = data[1]
    const id = data[2]

    const transactionResponse = await oracleContract.add(location_ID,address_of_sender)
    const transactionReceipt = await transactionResponse.wait()
    console.log("Id of Location :",transactionReceipt.events[0].args.cityID.toString())
    console.log("Sender address input :",transactionReceipt.events[0].args.sender)
  
    try {
        location_id_ = transactionReceipt.events[0].args.cityID.toString()
        //const location_id = 202440
        const apiKey = 'OBkMF3NSKDpiQiay2yt6hEevco5uPYkl';
        const AirQualityAPI = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${location_id_}?apikey=${apiKey}&details=true`;
        const response = await axios.get(AirQualityAPI);
        const AirQualityData = response.data;
        const Air = AirQualityData.DailyForecasts[0].AirAndPollen[0].Category
        //console.log(AirQualityData.DailyForecasts);
        console.log(Air);
        
        const updateData = await oracleContract.storeAirData(Air,id);
        console.log(updateData);
        const finalData = await oracleContract.getAirData(id)
        console.log(finalData)

        //retreving back in user's contract
        const getdata = await userContract.retreiveData(id)
        console.log(getdata);

    } catch (e) {
    console.error(e);
    }
  }
  
  getStockData().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });