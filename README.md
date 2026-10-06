# WETCOAL Website

A modern, professional cleantech marketing website for **WETCOAL**, specializing in patented Aqua Phase Reforming (APR) technology that converts sewage sludge into Biocoal and Biochar.

Designed with a premium dark industrial-tech aesthetic, optimized for search engines (SEO), and fully responsive.

## Features

- **Aqua Phase Reforming (APR) Flowchart**: Clean vector animation explaining the patented technology.
- **Product Segmentation**: Amber-themed biocoal section and green-themed biochar/soil enhancer section.
- **Client Cards**: Clean iconography representing the various target sectors (municipal STPs, institutions, industrial, agricultural).
- **Interactive Forms**: Responsive contact form with built-in client type picker and validation.
- **Rich Call Actions**: Custom integration redirecting directly to Gmail Compose with pre-filled contents or standard dialers on mobile.
- **Optimized for Vercel**: Ready for instantaneous static hosting.

## Technical Details

- **Language Stack**: Plain HTML5, CSS3 (Vanilla Custom Properties), and vanilla JavaScript.
- **Icon Set**: Lucide Icons loaded via CDN.
- **Typography**: Space Grotesk (Headings) and Inter (Body) loaded via Google Fonts.
- **Animations**: CSS transitions triggered via JS Intersection Observer.

## Local Development

Since this is a static website, you can view it directly by opening `index.html` in your browser.

To run a local development server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .
```

## Vercel Deployment

Deploy instantly to Vercel using the Vercel CLI:
```bash
# Install Vercel CLI if you haven't already
npm install -g vercel

# Deploy
vercel
```
Alternatively, push this repository to GitHub/GitLab/Bitbucket and connect it to your Vercel Dashboard for automated continuous deployment (zero configuration needed).

## Custom Form Integrations

The form action is intercepted in `js/script.js`. You can connect a custom backend handler (like Formspree or EmailJS) by locating the `TODO: Connect form handler` block in `js/script.js` and replacing it with your API endpoint.
