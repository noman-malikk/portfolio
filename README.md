# Noman Ali Malik - Portfolio

Single-page personal portfolio site with About, Resume, Portfolio, Certifications, and Contact sections. Built as a static HTML/CSS/JS site with interactive filtering and a contact form.

## Features

- Sidebar contact card with social links
- Section navigation without page reloads
- Filterable portfolio projects
- Contact form wired to Formspree with client-side validation
- Google Maps embed for location

## Tech Stack

- HTML5 for structure
- CSS3 with custom properties (see `assets/css/style.css`)
- Vanilla JavaScript for UI interactions (`assets/js/script.js`)
- Google Fonts (Poppins) and Ionicons

## Project Structure

- `index.html` - Main page markup and content
- `assets/css/style.css` - Styling and theme variables
- `assets/js/script.js` - Navigation, filters, and form logic
- `assets/images/` - Images and icons used across the site

## Getting Started

Open `index.html` directly in a browser or serve it locally:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Customization

- Update text, links, and sections in `index.html`.
- Replace images in `assets/images/` and update their paths in `index.html`.
- Adjust colors and typography in `assets/css/style.css` (CSS variables near the top).
- Keep the `data-*` attributes in `index.html` so the JavaScript behaviors continue to work.

## Contact Form

The form posts to Formspree:

- Current action: `https://formspree.io/f/xbdrpjez`

Replace the `action` value in `index.html` with your own Formspree endpoint if you fork this project.

## Credits and License

- Original template and styling by codewithsadee.
- Licensed under the MIT License. See `LICENSE`.
