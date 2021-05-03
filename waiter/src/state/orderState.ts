import { Order } from "../model/order"

class OrderState {
    isFoodReady = false
    isDrinksReady = false
    order:Order

    constructor(order: Order) {
        this.order = order
        if(!order.drinks) {
            this.setDrinksReady()
        } 
        if(!order.food)  {
            this.setFoodReady()
        }

    }

    setFoodReady() {
        console.log(`food ready on order ${this.getOrderAsString()}` )
        this.isFoodReady = true
        this.checkReady()
    }

    setDrinksReady() {
        console.log(`drinks ready on order ${this.getOrderAsString()}` )
        this.isDrinksReady = true
        this.checkReady()
    }


    checkReady() {
        if(this.isFoodReady && this.isDrinksReady) {
            const {id, table, food, drinks} = this.order
            const toTable = {food, drinks}
            console.log(`Delivering table ${this.order.table} order: ${JSON.stringify(toTable)}`)
            tracker.delete(id)
        }
    }

    getOrderAsString() {
        return `${this.order.id} ${this.order.table} - drinks: [${this.order.drinks}] food: [${this.order.food}]` 
    }

}



const tracker: Map<String, OrderState> = new Map()

export { tracker, OrderState }