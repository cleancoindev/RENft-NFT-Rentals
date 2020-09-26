import abis from "./abis";
import addresses from "./addresses";

// types
import Web3 from "web3/types";
import { Contract } from "web3-eth-contract";

// All contract calls in sequence required
// 1. const contract = web3.eth.Contract(renftabi, renftaddress)
// 2. const nftcontract = web3.eth.Contract(nftabi, nftaddress)
// 3. const daicontract = web3.eth.Contract(daiabi, daiaddress)

// To add NFT to our platform
// 1. await nftcontract.methods.approve(contract, nftid)
// 2. await contract.methods.addProduct(nftAddress, nftId, duration, _url);

// Rent NFT
// 1. await daicontract.methods.approve(renftaddress, amount)
// external function to have the latest price setup before in our submission we have to mention that is a workaround for the hack i.e. the extra transaction
// 2. await contract.methods.fetchNFTPriceBeforeReturn(url)
// 3. await contract.methods.rent(not, tokenid)

// Return NFT
// External function to have the latest price setup before in our submission we have to mention that is a workaround for the hack I.e the extra transaction
// 1. await contract .methods.fetchNFTPriceBeforeReturn(url)
// 3. await contract.methods.return(_borrower, _duration, _nft, _tokenId)

const defaultDaiApproveAmount = String(1000 * 1e18);

export const renftContract = (web3: Web3) =>
  new web3.eth.Contract(abis.renft, addresses.renft);

export const nftContract = (web3: Web3, nftAddress: string) =>
  new web3.eth.Contract(abis.erc721, nftAddress);

export const daiContract = (web3: Web3, daiAddress: string) =>
  new web3.eth.Contract(abis.erc20, daiAddress);

export const rent = async (
  web3: Web3,
  nftToRentAddress: string,
  collateral: number,
  daiContract: Contract,
  amount?: number
) => {
  // user must approve our contract spending their DAI
  await daiContract.methods.approve(
    addresses.renft,
    amount ? String(amount) : defaultDaiApproveAmount
  );

  const renft = renftContract(web3);

  // hardcoded for now (the URL bit)
  await renft.methods.fetchNFTPriceBeforeReturn();
};

export { abis, addresses };
export * from "./addresses";
