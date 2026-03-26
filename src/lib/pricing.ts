// Simple Shopify price formatting — NO custom pricing overrides.
// All prices come directly from Shopify Storefront API.

/**
 * Format a Shopify price for display.
 * Uses the amount and currencyCode exactly as returned by Shopify.
 */
export function formatShopifyAmount(amount: string | number, currencyCode: string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return `${currencyCode} 0`;
  return new Intl.NumberFormat(currencyCode === 'INR' ? 'en-IN' : 'en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: currencyCode === 'INR' ? 0 : 2,
    maximumFractionDigits: currencyCode === 'INR' ? 0 : 2,
  }).format(num);
}
