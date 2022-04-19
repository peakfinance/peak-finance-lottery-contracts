/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IRandomNumberGenerator,
  IRandomNumberGeneratorInterface,
} from "../IRandomNumberGenerator";

const _abi = [
  {
    inputs: [],
    name: "getRandomNumber",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "viewLatestLotteryId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "viewRandomResult",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IRandomNumberGenerator__factory {
  static readonly abi = _abi;
  static createInterface(): IRandomNumberGeneratorInterface {
    return new utils.Interface(_abi) as IRandomNumberGeneratorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IRandomNumberGenerator {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IRandomNumberGenerator;
  }
}
