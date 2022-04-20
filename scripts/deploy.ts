import { ethers, network } from "hardhat";
import config from "../config";

const currentNetwork = network.name;

const main = async (withVRFOnTestnet: boolean = true) => {
  const PeakFinanceLottery = await ethers.getContractFactory("PeakFinanceLottery");
  
  // ChainLink Update pending
  /*
  const RandomNumberGenerator = await ethers.getContractFactory("RandomNumberGenerator");
  const randomNumberGenerator = await RandomNumberGenerator.deploy(
    config.VRFCoordinator[currentNetwork],
    config.LinkToken[currentNetwork]
  );

  await randomNumberGenerator.deployed();
  console.log("RandomNumberGenerator deployed to:", randomNumberGenerator.address);

  // Set fee
  await randomNumberGenerator.setFee(config.FeeInLink[currentNetwork]);

  // Set key hash
  await randomNumberGenerator.setKeyHash(config.KeyHash[currentNetwork]);
  */

  const peakFinanceLottery = await PeakFinanceLottery.deploy(
    config.PeakToken,
    "0x0000000000000000000000000000000000000000"
  );

  await peakFinanceLottery.deployed();
  console.log("PeakFinanceLottery deployed to:", peakFinanceLottery.address);

  // Set lottery address
  // await randomNumberGenerator.setLotteryAddress(peakFinanceLottery.address);

  // Set operator & treasury adresses
  await peakFinanceLottery.setOperatorAndTreasuryAndInjectorAddresses(
    config.OperatorAddress,
    config.TreasuryAddress,
    config.InjectorAddress
  );
};

main(true)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
