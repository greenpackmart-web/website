Product photos live here.

How to add a photo for a category:
1. Save the photo as WebP, square, about 1200px wide.
2. Name it after the category slug, e.g. round-plates.webp
3. Open src/data/products.js and set that category's image field:
   image: 'images/products/round-plates.webp'
4. The photo then shows on the home page, the products grid and the
   category page automatically.

The image component automatically adds the correct site path for GitHub Pages.
Until an image is set, the site shows a styled placeholder instead.
