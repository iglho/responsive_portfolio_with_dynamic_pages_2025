# Interactive Portfolio Projects

This folder contains static, browser-only portfolio demos by Prabeen Khatri.

## Pages

- `index.html` — searchable project catalog for public GitHub repositories
- `tools.html` — interactive educational tools
- `projects.js` — catalog data and filtering
- `tools.js` — subnet calculator, binary-search walkthrough, and password hygiene checklist

## Preview locally

From the repository root:

```bash
python -m http.server 8000
```

Open:

- `http://localhost:8000/showcase/`
- `http://localhost:8000/showcase/tools.html`

No build step or third-party JavaScript package is required.

## Demo limitations

- The subnet calculator is educational; verify edge cases and your network design separately.
- The binary-search demo requires sorted input and uses zero-based indices.
- The password checklist is a simple heuristic, not a password-cracking or breach-detection tool. Use made-up examples only; never enter actual passwords.
- No backend, analytics, storage, or network submission is implemented in these demos.

## Deployment

These pages become publicly reachable only if the repository's existing hosting setup publishes this folder. Review hosting configuration before merging. This proposal does not change the custom domain, DNS, or deployment workflow.
