import express, { Application } from 'express';
import { WaiterController } from "./controller/waiterController"


const PORT = process.env.PORT || 3000;

const app: Application = express();
app.use(express.json());

const waiter = new WaiterController(app);
waiter.routes()



app.listen(PORT, () => {
    console.log(`Waiter-${PORT} is listening at http://localhost:${PORT}`)
});


