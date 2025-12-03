// Shopify API configuration and helper functions
// Environment variables are managed through Vercel project settings
// Sync with: vercel env pull

const STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const ADMIN_API_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;
const STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;

if (!STOREFRONT_ACCESS_TOKEN || !STORE_DOMAIN) {
  throw new Error(
    "Missing required Shopify environment variables. Set SHOPIFY_STOREFRONT_ACCESS_TOKEN and SHOPIFY_STORE_DOMAIN in Vercel project settings."
  );
}

const STOREFRONT_API_ENDPOINT = `https://${STORE_DOMAIN}/api/2024-10/graphql.json`;
const ADMIN_API_ENDPOINT = `https://${STORE_DOMAIN}/admin/api/2024-10/graphql.json`;

/**
 * Make a request to Shopify Storefront API
 */
export async function shopifyStorefrontFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  if (!STOREFRONT_ACCESS_TOKEN) {
    throw new Error("Missing SHOPIFY_STOREFRONT_ACCESS_TOKEN");
  }

  const response = await fetch(STOREFRONT_API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`Shopify GraphQL error: ${JSON.stringify(data.errors)}`);
  }

  return data.data as T;
}

/**
 * Make a request to Shopify Admin API
 */
export async function shopifyAdminFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  if (!ADMIN_API_ACCESS_TOKEN) {
    throw new Error("Missing SHOPIFY_ADMIN_API_ACCESS_TOKEN");
  }

  const response = await fetch(ADMIN_API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": ADMIN_API_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`Shopify Admin API error: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(
      `Shopify Admin GraphQL error: ${JSON.stringify(data.errors)}`
    );
  }

  return data.data as T;
}

/**
 * Get store information
 */
export async function getStoreInfo(): Promise<{
  name: string;
  description: string;
}> {
  const query = `
    query {
      shop {
        name
        description
      }
    }
  `;

  const result = await shopifyStorefrontFetch<{
    shop: {
      name: string;
      description: string;
    };
  }>(query);

  return result.shop;
}

/**
 * Get all products
 */
export async function getProducts(first: number = 10): Promise<
  Array<{
    id: string;
    title: string;
    handle: string;
    description: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    featuredImage: {
      url: string;
      altText: string;
    };
  }>
> {
  const query = `
    query ($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              url
              altText
            }
          }
        }
      }
    }
  `;

  const result = await shopifyStorefrontFetch<{
    products: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          handle: string;
          description: string;
          priceRange: {
            minVariantPrice: {
              amount: string;
              currencyCode: string;
            };
          };
          featuredImage: {
            url: string;
            altText: string;
          };
        };
      }>;
    };
  }>(query, { first });

  return result.products.edges.map((edge) => edge.node);
}

/**
 * Get a single product by handle
 */
export async function getProductByHandle(handle: string): Promise<{
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: Array<{
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
  }>;
  images: Array<{
    url: string;
    altText: string;
  }>;
} | null> {
  const query = `
    query ($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
            }
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
      }
    }
  `;

  const result = await shopifyStorefrontFetch<{
    productByHandle: {
      id: string;
      title: string;
      handle: string;
      description: string;
      priceRange: {
        minVariantPrice: {
          amount: string;
          currencyCode: string;
        };
      };
      variants: {
        edges: Array<{
          node: {
            id: string;
            title: string;
            price: {
              amount: string;
              currencyCode: string;
            };
          };
        }>;
      };
      images: {
        edges: Array<{
          node: {
            url: string;
            altText: string;
          };
        }>;
      };
    } | null;
  }>(query, { handle });

  if (!result.productByHandle) {
    return null;
  }

  return {
    ...result.productByHandle,
    variants: result.productByHandle.variants.edges.map((edge) => edge.node),
    images: result.productByHandle.images.edges.map((edge) => edge.node),
  };
}

/**
 * Create a cart
 */
export async function createCart(lineItems: Array<{
  merchandiseId: string;
  quantity: number;
}>): Promise<{
  id: string;
  checkoutUrl: string;
  lines: Array<{
    id: string;
    quantity: number;
  }>;
}> {
  const query = `
    mutation ($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
                quantity
              }
            }
          }
        }
      }
    }
  `;

  const result = await shopifyStorefrontFetch<{
    cartCreate: {
      cart: {
        id: string;
        checkoutUrl: string;
        lines: {
          edges: Array<{
            node: {
              id: string;
              quantity: number;
            };
          }>;
        };
      };
    };
  }>(query, {
    input: {
      lines: lineItems,
    },
  });

  return {
    id: result.cartCreate.cart.id,
    checkoutUrl: result.cartCreate.cart.checkoutUrl,
    lines: result.cartCreate.cart.lines.edges.map((edge) => edge.node),
  };
}
