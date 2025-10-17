import { json } from "@remix-run/node";
import { authenticate } from "../../shopify.server/shopify";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  
  const url = new URL(request.url);
  const query = url.searchParams.get("query") || "";
  
  const response = await admin.graphql(`
    query SearchProducts($query: String!) {
      products(first: 10, query: $query) {
        edges {
          node {
            id
            title
            featuredImage {
              url
              altText
            }
          }
        }
      }
    }
  `, {
    variables: { query },
  });

  const result = await response.json();
  const products = result.data?.products?.edges?.map(edge => ({
    id: edge.node.id.replace("gid://shopify/Product/", ""),
    title: edge.node.title,
    image: edge.node.featuredImage?.url,
  })) || [];

  return json({ products });
};
