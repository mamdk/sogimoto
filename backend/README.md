# 🚀 Product API with Express.js

A clean, structured Express.js API for product management with AI-powered summarization features.

## 📂 Project Structure

```plaintext
src/
├── config/        # Configuration files
├── controllers/   # Route controllers (class-based)
├── middlewares/   # Custom express middlewares  
├── routes/        # Route definitions
├── utils/         # Helper functions
├── validator/     # Request validation
└── app.ts         # Main application entry point
```

## 🌐 API Endpoints

### 🛍️ Product Routes

| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| GET    | `/products/:id`           | Get product details by ID       |
| GET    | `/products/:id/reviews`   | Get all product reviews         |
| POST   | `/products/:id/reviews`   | Add new product review          |

### 🤖 AI Services

| Method | Endpoint          | Description                          |
|--------|-------------------|--------------------------------------|
| POST   | `/Ai/summary`     | Generate AI summary (uses LLM model) |

## 🛠️ Installation

```bash
git clone https://github.com/mamdk/sogimoto.git
cd sogimoto
npm install
```

## 📜 Available Commands

```bash
# Development
npm run dev  

# Build with esbuild
npm run build

# Production start
npm start
```

## ⚠️ Error Handling

The API implements:
- 400 Bad Request
- 404 Not Found
- 500 Server Error
- Custom validation errors
- Structured error responses

## ⚙️ Configuration

Create `.env` file like `.env.example`

## 📄 License

MIT Licensed. See [LICENSE](https://github.com/mamdk/sogimoto/blob/main/LICENSE) file.