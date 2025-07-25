import express from "express";

class App {
    declare app;

    constructor() {
        this.app = express()
    }

    start() {
        const host = process.env.HOST || '0.0.0.0';
        const port = parseInt(process.env.PORT || '2000');
        if (isNaN(port)) {
            throw new Error('PORT must be a valid number in .env');
        }

        this.app.listen(port, host, () => {
            console.log(`Server running on: http://${host}:${port}`);
        });
    }
}

const application = new App()

export default application