import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server/shopify";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return null;
};
