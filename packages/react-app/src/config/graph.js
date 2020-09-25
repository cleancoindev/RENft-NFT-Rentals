import web3 from "web3";

export const allProductsQuery = `{
    products {
        id
        address
        owner
        borrower
        duration
        borrowedAt
        price
        collateral
        available
      }
}`;

export const productQuery = nftId => {
    const hex = web3.utils.toHex(nftId);
    return ` {
      product(id: "${hex}") {
        id
        address
        owner
        borrower
        duration
        borrowedAt
        price
        collateral
        available
      }
    }`;
};

export const userProfileQuery = (user) => {
    const hex = web3.utils.toHex(user);
    return `{
      user(id: "${hex}") {
      id
      nftRented {
        id
        address
        owner
        borrower
        duration
        borrowedAt
        price
        collateral
        available
      }
      nftOwned {
        id
        address
        owner
        borrower
        duration
        borrowedAt
        price
        collateral
        available
      }         			
      }
    }`;
};

