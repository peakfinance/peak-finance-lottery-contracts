import { ethers, network, upgrades } from "hardhat";
import config from "../config";

const main = async () => {
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
  const accounts = await ethers.getSigners();
  const account = accounts[0];
  const PeakFactory = await ethers.getContractFactory("MockERC20");
  const Peak = await PeakFactory.deploy("PEAKER", "PEAKER", ethers.utils.parseEther("10000"));
  await Peak.deployed();
  console.log("Peak deployed to:", Peak.address);

  const peakFinanceLottery = await upgrades.deployProxy( PeakFinanceLottery, [Peak.address]);

  await peakFinanceLottery.deployed();
  console.log("PeakFinanceLottery deployed to:", peakFinanceLottery.address);

  await peakFinanceLottery.setOperatorAndTreasuryAndInjectorAddresses(
    config.OperatorAddress,
    config.TreasuryAddress,
    config.InjectorAddress
  );

  await Peak.mintTokens(ethers.utils.parseEther("100"));
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
