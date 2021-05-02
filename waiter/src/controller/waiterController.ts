import { Application, Request, Response } from "express";

class WaiterController {

    app: Application;

    constructor(app: Application) {
        this.app = app
    }

    routes():void {
        this.app.post('/order', createOrder)
    }
}


const createOrder = (req: Request, res: Response) => {
    res.send('OK')
}


export { WaiterController }