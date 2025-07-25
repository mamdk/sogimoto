import productRoutes from "./products";
import aiRoutes from "./ai";
import application from "../config/bootstrap";

class Routes {
    static init() {
        application.app.get('/', (req,res) => {
            res.send('Hello from Sogimoto Challenge API')
        })

        application.app.use('/products', productRoutes);

        application.app.use('/AI', aiRoutes);
    }
}

export default Routes