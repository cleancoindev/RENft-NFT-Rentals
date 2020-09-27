import renft from "../abis/renft.json";
import erc721 from "../abis/erc721.json";
import erc20 from "../abis/erc20.json";

// types
import { AbiItem } from "web3-utils/types";

type abisT = {
  renft: AbiItem[];
  erc721: AbiItem[];
  erc20: AbiItem[];
};

// ! TODO: as is a hack. Need a type guard for this in the future
const abis: abisT = {
  renft: renft as AbiItem[],
  erc721: erc721 as AbiItem[],
  erc20: erc20 as AbiItem[],
};

export default abis;
