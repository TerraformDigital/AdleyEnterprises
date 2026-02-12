# Adley Enterprises — Site Icons Implementation Guide

## Files Included

### Favicons
| File | Size | Purpose |
|---|---|---|
| `favicon.ico` | 16/32/48px | Multi-size ICO — universal browser tab icon |
| `favicon-16x16.png` | 16×16 | Small browser tab icon |
| `favicon-32x32.png` | 32×32 | Standard browser tab icon |
| `favicon-48x48.png` | 48×48 | Large browser tab icon |

### Apple Touch Icons
| File | Size | Purpose |
|---|---|---|
| `apple-touch-icon.png` | 180×180 | Default iOS home screen icon |
| `apple-touch-icon-152x152.png` | 152×152 | iPad (non-Retina) |
| `apple-touch-icon-120x120.png` | 120×120 | iPhone (Retina) |
| `apple-touch-icon-76x76.png` | 76×76 | iPad (non-Retina, older) |
| `apple-touch-icon-60x60.png` | 60×60 | iPhone (non-Retina, older) |

### Android / PWA
| File | Size | Purpose |
|---|---|---|
| `android-chrome-192x192.png` | 192×192 | Android home screen icon |
| `android-chrome-512x512.png` | 512×512 | Android splash screen / PWA install |

### Microsoft Tiles
| File | Size | Purpose |
|---|---|---|
| `mstile-70x70.png` | 70×70 | Small tile |
| `mstile-150x150.png` | 150×150 | Medium tile |
| `mstile-310x150.png` | 310×150 | Wide tile |
| `mstile-310x310.png` | 310×310 | Large tile |

### Config Files
| File | Purpose |
|---|---|
| `site.webmanifest` | PWA manifest (Android/Chrome) |
| `browserconfig.xml` | Microsoft tile configuration |

---

## Next.js Implementation

### Option A: App Router (recommended for this project)

Place all icon files in `/app` directory root:

```
app/
├── favicon.ico
├── apple-icon.png          ← rename apple-touch-icon.png to this
├── icon.png                ← use android-chrome-512x512.png
├── manifest.ts             ← or use site.webmanifest in /public
└── ...
```

Or for more control, add metadata in `app/layout.tsx`:

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Adley Enterprises LLC | Fiberglass Boat Repair in Melrose, MN',
  description: 'Fiberglass boat repair and adjustable transducer mounts in Melrose, MN.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/favicon-32x32.png', color: '#dc2626' },
    ],
  },
  manifest: '/site.webmanifest',
}
```

### Option B: Public Directory (simpler)

Place all files in `/public` at root level:

```
public/
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── favicon-48x48.png
├── apple-touch-icon.png
├── apple-touch-icon-152x152.png
├── apple-touch-icon-120x120.png
├── apple-touch-icon-76x76.png
├── apple-touch-icon-60x60.png
├── android-chrome-192x192.png
├── android-chrome-512x512.png
├── mstile-70x70.png
├── mstile-150x150.png
├── mstile-310x150.png
├── mstile-310x310.png
├── site.webmanifest
└── browserconfig.xml
```

Then add to `<head>` in your layout (or via Next.js metadata):

```html
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="msapplication-TileColor" content="#111111">
<meta name="msapplication-config" content="/browserconfig.xml">
<meta name="theme-color" content="#111111">
```

---

## Color Notes

- `theme_color` and `background_color` set to `#111111` to match the site's dark theme
- `TileColor` for Microsoft tiles also set to `#111111`
- The red accent from the "A" logo mark (`~#dc2626`) is used for `mask-icon` color
