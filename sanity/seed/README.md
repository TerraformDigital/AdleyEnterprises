# Sanity Seed Data

This folder contains import-ready documents for Adley Enterprises:

- `adley-seed.json`: full JSON array (useful for review/version control)
- `adley-seed.ndjson`: newline-delimited JSON for `sanity dataset import`

## Regenerate Seed Files

```bash
npm run seed:generate
```

## Optional: Pull Blog Image Metadata from Unsplash

Requires `UNSPLASH_ACCESS_KEY` in your environment.

```bash
npm run images:blogs:unsplash
```

To also inject image fields into `adley-seed.json` and `adley-seed.ndjson`:

```bash
npm run images:blogs:unsplash:apply-seed
```

## Import to Sanity Dataset

```bash
sanity dataset import sanity/seed/adley-seed.ndjson production --replace
```

If you want to preserve existing documents, remove `--replace` and import into a temporary dataset first.

## Included Documents

- 1 `siteSettings`
- 5 `service`
- 10 `locationPage`
- 1 `product`
- 10 `faqItem`
- 10 `blogPost`
