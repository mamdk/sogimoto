import dotenv from 'dotenv';
dotenv.config();

import application from "./config/bootstrap";
import Routes from "./routes";
import Middlewares from "./middlewares";

// handle middlewares
Middlewares.init()

// handle Routes
Routes.init()

// handle final middlewares
Middlewares.finalInit()

// start server
application.start()