# TAG Echo Brand Kit

This folder centralizes brand overrides and assets for TAG Strategies.

- Place exported SVG/PNG logos in `brand/assets/`
- Adjust CSS tokens in `tag-theme.css`
- Favicons go under `brand/favicons/` (generated set recommended)

## Apply Theme

In `index.html` head:

```html
<link rel="stylesheet" href="brand/tag-theme.css">
<link rel="icon" type="image/png" href="brand/favicons/favicon-32x32.png">
```

## Tokens

Key CSS variables map to TAG brand colors and effects. Tune `--primary-blue`, `--secondary-blue`, `--primary-red`, and `--accent-gold` to match the style guide.
