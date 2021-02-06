import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Card, ResourceList, Stack, TextStyle, Thumbnail } from '@shopify/polaris';
import store from 'store-js';

const GET_PRODUCT_BY_ID = gql`
query getProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        title
        handle
        id
        images(first: 1) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              price
              id
            }
          }
        }
      }
    }
  }
`;

function ProductList() {
    const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, { variables: { ids: store.get('ids') } });

    if(loading) return <div>Loading...</div>;

    if(error) return <div>{error.message}</div>;

    console.log('this is data', data);

    return (
        <div>
            <h1>Hello from ProductList</h1>
        </div>
    )
}

export default ProductList;