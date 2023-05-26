import { placeOrder, transientState } from "./transientState.js"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//generate order button//

export const saveOrder = () => {

    document.addEventListener("click", handleOrderClick)
    return `<br><input type='button' class='button' id='orderbutton' value='Create Custom Order'/>`
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//handle the order button click event//

const handleOrderClick = async (clickEvent) => {
    if (clickEvent.target.id === "orderbutton") {
        if (transientState.metalId !== null && transientState.sizeId !== null && transientState.styleId !== null && transientState.jewelryId !== null) {
            placeOrder()
        }
    }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////
//generate the orders dynamic html linked to the json server//

export const Orders = async () => {
    const response = await fetch("http://localhost:8088/orders?_expand=metal&_expand=style&_expand=size&_expand=jewelry")
    const orders = await response.json()

    let ordersHTML = orders.map(
        (order) => {
            const orderPrice = order.metal.price + order.style.price + order.size.price 

            if (order.jewelryId === "1") {
                orderPrice = orderPrice
            }
            else if (order.jewelryId === "2") {
                orderPrice = orderPrice * 2
            }
            else if (order.jewelryId === "3") {
                orderPrice = orderPrice * 4
            }
            const formattedPrice = orderPrice.toLocaleString("en-US", { style: "currency", currency: "USD" })

            return `<div>
            Order #${order.id} costs ${formattedPrice}
            </div>`
        }
    )

    return ordersHTML.join(" ")
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////