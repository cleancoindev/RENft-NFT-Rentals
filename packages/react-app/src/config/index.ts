import Web3 from 'web3/types';
import abis from './abis';
import addresses from './addresses';

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
// 3. await contract.methods.rent(borrower, duration, nft, tokenId)

// Return NFT
// External function to have the latest price setup before in our submission we have to mention that is a workaround for the hack I.e the extra transaction
// 1. await contract .methods.fetchNFTPriceBeforeReturn(url)
// 3. await contract.methods.return(nftAddress, tokenId)

const API_NFT_PRICE_BASE_URL = process.env.REACT_APP_API_NFT_PRICE_BASE_URL;
// default is approve our smart contract to withdraw DAI up to 21 billion tokens
const defaultDaiApproveAmount = String(21000000000 * 1e18);

// this needs to be removed
export const NftAddress = '0x527E95AE7B40FCBD60D67DE1D7E1C6A7CB14D42B';
export const tokenId = '12316';

// TODO: when we go live, we simply change the API_NFT_PRICE_BASE_URL for opensea.io and then this uses url "match"
// on the front-end and we easily get the prices for the NFTs. (if available)
// TODO: the plan is also to let the leaser specify the daily collateral himself
// eventally, we will be able to advise them on the rate
const API_NFT_PRICE_RELATIVE_URL = `/api/v1/asset/${NftAddress}/${tokenId}/`;

// NOTE=> Using any since was getting an error approve does not exist on type Contract
export const renftContract: any = (web3: Web3) => {
  return new web3.eth.Contract(abis.renft, addresses.renft);
};

export const nftContract: any = (web3: Web3, nftAddress: string) => {
  return new web3.eth.Contract(abis.erc721, nftAddress);
};

export const daiContract: any = (web3: Web3, daiAddress: string) =>
  new web3.eth.Contract(abis.erc20, daiAddress);

/**
 * **READ CAREFULLY**
 * @param nftToAddAddress
 * @param nftToAddTokenId
 * @param duration
 * @param account
 */
export const addProduct = async (
  web3: any,
  nftToAddAddress: string,
  nftToAddTokenId: string,
  duration: number,
  account: any
) => {
  const nftContractInstance = nftContract(web3, nftToAddAddress);
  const renftContractInstance = renftContract(web3);
  await nftContractInstance.methods
    .approve(addresses.renft, nftToAddTokenId)
    .send({ from: account });
  await renftContractInstance.methods
    .addProduct(
      nftToAddAddress,
      nftToAddTokenId,
      duration,
      `${API_NFT_PRICE_BASE_URL}${API_NFT_PRICE_RELATIVE_URL}`
    )
    .send({ from: account });
};

// TODO: writing this here because this I am editing it now and I recalled something
// TODO: we are using transfer calls in the smart contract
// we should sub them all for safeTransfer equivalents
// TODO: another thing
// we should divide in the very end here (from the quick look without thinking about it: IMTV (acronym for In My Thoughtless View)):
// Viraz - to remove the loop i did this to save the call and it has been tested
// https://github.com/RENTFT/contracts/blob/master/contracts/rentft.sol#L175
// TODO: sanity check the daiApproveAmount (i.e. that is in vicinity of k * 1e18 for all k in natural numbers)

/**
 * **READ CAREFULLY**
 * @param web3
 * @param borrower
 * @param duration
 * @param nftToRentAddress <- IGNORED WHEN FETCHING PRICE. not used right now because OpenSea & Aave do not share any testnets. We have mocked the OpenSea API responses, so when we deploy to mainnet, all we have to do is change the BASE_URL env var
 // Viraz => Apoorv tested this with real url can't we have this populated
 * @param nftToRentTokenId <- IGNORED WHEN FETCHING PRICE. smae as above
 * @param daiContract - // do we need this can't we use the contract instance defined above
 * @param daiApproveAmount
 * @param account
 */
export const rent = async (
  web3: any,
  borrower: string,
  duration: number,
  nftToRentAddress: string,
  nftToRentTokenId: string,
  account: any
) => {
  // TODO: try catch this merhaps (all of it)
  // TODO: or perhaps, the ErrorBoundary can catch this
  // user must approve our contract spending their DAI
  const daiInstance = daiContract(web3, addresses.dai);

  await daiInstance.methods.approve(
    addresses.renft,
    defaultDaiApproveAmount
      ? String(defaultDaiApproveAmount)
      : defaultDaiApproveAmount
  );

  const renft = renftContract(web3);

  // hardcoded for now (the URL bit)
  // this will update the price of the NFT
  // this is required so that we correctly compute the
  // collateral the leaser has to pay for the NFT
  const priceFetchReceipt = await renft.methods
    .fetchNFTPriceBeforeReturn(
      `${API_NFT_PRICE_BASE_URL}${API_NFT_PRICE_RELATIVE_URL}`
    )
    .send({ from: account });

  // TODO: !!!!!!!!! HARDCODED tokenId and NftAddress
  const rentReceipt = await renft.methods
    .rent(borrower, duration, nftToRentAddress, nftToRentTokenId)
    .send({ from: account });

  return { priceFetchReceipt, rentReceipt };
};

/**
 * returns the NFT you have previously rented. Eventually, you will have to pay up if you
 * (i)  damaged the properties of the NFT
 * (ii) returned the NFT later
 * You will get blacklisted if you fail to return the NFT within a month
 * @param nftToReturnAddress <- IGNORED WHEN FETCHING PRICE. not used right now because OpenSea & Aave do not share any testnets. We have mocked the OpenSea API responses, so when we deploy to mainnet, all we have to do is change the BASE_URL env var
 * @param nftToReturnTokenId
 */
export const returnNft = async (
  web3: any,
  nftToReturnAddress: string,
  nftToReturnTokenId: string,
  account: any
) => {
  const renft = renftContract(web3);

  // hardcoded for now (the URL bit)
  // this will update the price of the NFT
  // this is required so that we correctly compute the
  // collateral the leaser has to pay for the NFT
  const priceFetchReceipt = await renft.methods
    .fetchNFTPriceBeforeReturn(
      `${API_NFT_PRICE_BASE_URL}${API_NFT_PRICE_RELATIVE_URL}`
    )
    .send({ from: account });

  const returnNftReceipt = await renft.methods
    .returnNFT(nftToReturnAddress, nftToReturnTokenId)
    .send({ from: account });

  return { priceFetchReceipt, returnNftReceipt };
};

/**
 * to be called by owner to claim the interest and principal in case of a fraud
 *
 * @param nftToReturnAddress <- IGNORED WHEN FETCHING PRICE. not used right now because OpenSea & Aave do not share any testnets. We have mocked the OpenSea API responses, so when we deploy to mainnet, all we have to do is change the BASE_URL env var
 * @param nftToReturnTokenId
 */
export const ownerClaim = async (
  web3: Web3,
  nftToReturnAddress: string,
  nftToReturnTokenId: string,
  account: any
) => {
  const renft = renftContract(web3);

  const claimReceipt = await renft.methods
    .redeemCollateral(nftToReturnAddress, nftToReturnTokenId)
    .send({ from: account });

  return { claimReceipt };
};

export { abis, addresses };
