import web3 from 'web3';

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

export type Product = {
  id: string;
  address: string;
  owner: string;
  borrower: string;
  duration: number;
  borrowedAt: number;
  price: number;
  collateral: number;
  available: boolean;
};
export type ProductProps = {
  product?: Product;
};

export type Profile = {
  id: string;
  nftRented: Product[];
  nftOwned: Product[];
}
export type ProfileProps = {
  user?: Profile;
};

// to be used in overview page code in overview => index.tsx
export const productQuery = (nftId: string): string => {
  return ` {
      product(id: "${nftId}") {
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
export const userProfileQuery = (user): string => {
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
