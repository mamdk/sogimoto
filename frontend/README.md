# Next.js Sugimoto Challenge

A modern e-commerce platform built with Next.js, featuring product listings, individual product pages with reviews/commenting system, and AI-powered product analysis.

## Features

- Product listing page (`/products`)
- Dynamic single product pages (`/products/[id]`)
- Review and comment system
- AI-powered features:
    - Product information summarization
    - Review sentiment analysis
    - Intelligent insights generation

## Tech Stack

- Next.js (App Router)
- React.js
- Tailwind CSS (or your styling solution)
- AI integration (OpenAI API or your chosen solution)

## Getting Started

### Prerequisites

- Node.js 22+
- npm/yarn/pnpm
- API keys for your AI service (if applicable)

### Installation

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
    ```

2. Navigate to the project directory:
   ```bash
    cd your-project-name
    ```
3. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```
#### Environment Variables
Create a `.env` file in the root directory with the following variables in `.env.example`
#### Running the Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Open http://localhost:3000 in your browser.
#### Building for Production
```bash
npm run build
# or
yarn build
# or
pnpm build
```
To start the production server:
```bash
npm run start
# or
yarn start
# or
pnpm start
```