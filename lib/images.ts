// Image paths as string constants
export const IMAGE_PATHS = {
  ADRI_PORTAL: '/adri-portal.jpg',
  COACHING_PORTAL: '/coaching-portal.jpg',
  HERO_PORTAL: '/hero-portal.jpg',
  MEDICAL_PORTAL: '/medical-portal.jpg',
  SALES_PORTAL: '/sales-portal.jpg',
} as const;

// Full public URLs for the images (same as IMAGE_PATHS in this case)
export const IMAGE_URLS = {
  ...IMAGE_PATHS,
} as const;

// Type for image keys
export type ImageKey = keyof typeof IMAGE_PATHS;

// Helper function to get image URL by key
export const getImageUrl = (key: ImageKey): string => {
  return IMAGE_URLS[key];
};

// Default export with all images
export default {
  ...IMAGE_URLS,
  getImageUrl,
};
