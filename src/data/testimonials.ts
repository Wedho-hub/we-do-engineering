/**
 * Customer testimonials.
 *
 * Only add GENUINE testimonials that the customer has agreed to share.
 * The homepage Testimonials section is hidden automatically while this list is empty.
 */
export type Testimonial = {
  quote: string;
  name: string;
  /** e.g. "Homeowner, Walmer" or "Maintenance Manager" — only with the customer's permission. */
  context?: string;
  category?: string;
};

export const testimonials: Testimonial[] = [];
