import { authenticate } from "../shopify.server/shopify";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};
