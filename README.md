# npm-scanner

[![Powered by Vercel](https://badgen.net/badge/vercel/npm-scanner/black?icon=zeit)](https://npm-scanner.vercel.app)
[![Node.js CI](https://github.com/oBusk/npm-scanner/workflows/Node.js%20CI/badge.svg)](https://github.com/oBusk/npm-scanner/actions)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Dependabot: enabled](https://badgen.net/badge/dependabot/enabled/green?icon=dependabot)](https://github.com/oBusk/npm-scanner/network/updates)

> Basic virus scanning for npm packages

## Install

```bash
npm install
```

## Development

Create `.env.local` file

```env
VIRUSTOTAL_API_KEY={your-virustotal-api-key}
```

Then run

```bash
npm run dev
```

## Deployment

Deployed automagically using [Vercel](https://vercel.com/)

[https://npm-scanner.vercel.app/](https://npm-scanner.vercel.app/)

## License

ISC © Oscar Busk
