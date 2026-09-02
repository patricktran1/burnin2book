# dist/

Generated output. Run `npm run build` from the repository root to produce:

- `burn-in-v2.md` — the merged manuscript
- `index.html` and one HTML page per chapter — the reading preview
- `print.html` — print-friendly single-file HTML
- `burn-in-v2.epub`, `burn-in-v2.docx` — only if Pandoc is installed
- `burn-in-v2.pdf` — only if a PDF engine (Chromium, wkhtmltopdf, or WeasyPrint) is available
- `build-report.json` — what was built and what was skipped, with reasons

Everything here except this file is ignored by git.
