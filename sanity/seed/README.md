# Sanity Seed Data

This folder contains import-ready documents for Adley Enterprises:

- `adley-seed.json`: full JSON array (useful for review/version control)
- `adley-seed.ndjson`: newline-delimited JSON for `sanity dataset import`

## Regenerate Seed Files

```bash
npm run seed:generate
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
