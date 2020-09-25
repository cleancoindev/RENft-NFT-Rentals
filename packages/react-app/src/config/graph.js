import web3 from "web3";

// to be used in dashboard page code in rentable => index.tsx
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
// to be used in overview page code in overview => index.tsx
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
// to be used in user profile page
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

