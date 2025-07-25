import cors from "cors";
import bodyParser from "body-parser";
import errorHandler from "../middlewares/error_handler";
import application from "../config/bootstrap";

class Middlewares {
    static init() {
        application.app.use(cors());
        application.app.use(bodyParser.json());
    }

    static finalInit() {
        application.app.use(errorHandler);
    }
}

export default Middlewares