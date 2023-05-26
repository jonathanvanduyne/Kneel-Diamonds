//create a default transient state object//
export const transientState = {
    "metalId": null,
    "sizeId": null,
    "styleId": null,
    "jewelryId": null
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//create functions to change the transient state when clicked on//
//pass the functions into each dynamic html module through their respective click events//

export const setMetalsState = (chosenMetal) => {
    transientState.metalId = chosenMetal
    console.log(transientState)
}

export const setSizesState = (chosenSize) => {
    transientState.sizeId = chosenSize
    console.log(transientState)
}

export const setStylesState = (chosenStyle) => {
    transientState.styleId = chosenStyle
    console.log(transientState)
}

export const setJewelryState = (chosenJewelry) => {
    transientState.jewelryId = chosenJewelry
    console.log(transientState)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//create a function to post a new order to the JSON database when clicked on//

export const placeOrder = async () => {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transientState)
    }

    // Send the transient state to your API
    await fetch("http://localhost:8088/orders", postOptions)

    const customEvent = new CustomEvent("newOrderSubmitted")
    document.dispatchEvent(customEvent)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////