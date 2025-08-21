export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

// Log pageviews
export const pageview = (url) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Log specific events (optional)
export const event = ({ action, category, label, value }) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
