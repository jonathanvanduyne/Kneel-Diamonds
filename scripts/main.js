import { selectJewelryType } from "./Jewelry.js";
import { MetalOptions } from "./MetalOptions.js";
import { Orders, saveOrder} from "./PlaceOrder.js";
import { SizeOptions } from "./SizeOptions.js";
import { StyleOptions } from "./StyleOptions.js";


let container = document.querySelector("#container")

const render = async () => {
    const metalOptionsHTML = await MetalOptions()
    const styleOptionsHTML = await StyleOptions()
    const sizeOptionsHTML = await SizeOptions()
    const jewelryHTML = await selectJewelryType()
    const orderButtonHTML = await saveOrder()
    const customOrderHTML = await Orders()

    const composedHTML = `
        <h1>Kneel Diamonds</h1>

        <article class="choices">
            <section class="choices__metals options">
                <h2>Metals</h2>
                ${metalOptionsHTML}
            </section>

            <section class="choices__sizes options">
                <h2>Sizes</h2>
                ${sizeOptionsHTML}
            </section>

            <section class="choices__styles options">
                <h2>Styles</h2>
                ${styleOptionsHTML}
            </section>
        </article>

        <article class="jewelry">
            ${jewelryHTML}
        </article>

        <article class="order">
            ${orderButtonHTML}
        </article>

        <article class="customOrders">
            <h2>Custom Jewelry Orders</h2>
            ${customOrderHTML}
        </article>
    `

    container.innerHTML = composedHTML
}

render()

document.addEventListener("newOrderSubmitted", (event) => {
    console.log("State of data has changed. Regenerating HTML...")
    render()
})

document.addEventListener("newTransientStateChange", (event) => {
    console.log("State of data has changed. Regenerating HTML...")
    render()
})


