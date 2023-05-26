import { setJewelryState, transientState } from "./transientState.js"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//generate jewelry choices radio buttons//

export const selectJewelryType = async () => {
    const response = await fetch("http://localhost:8088/jewelries")
    const jewelry = await response.json()


    let jewelryHTML = "<br>"

    // Use map() to generate new array of strings
    const divStringArray = jewelry.map(
        (jewelry) => {
            if (transientState.jewelryId === jewelry.id) {
                return `<input type='radio' name='jewelry' value='${jewelry.id}' customorder='${jewelry.customOrder}' checked='checked'/>${jewelry.customOrder}`
            } else {
                return `<input type='radio' name='jewelry' value='${jewelry.id}' customorder='${jewelry.customOrder}'/>${jewelry.customOrder}`
            }
        }
    )

    document.addEventListener("change", handleJewelryChoice)
    // This function needs to return a single string, not an array of strings
    jewelryHTML += divStringArray.join("")

    return jewelryHTML
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const handleJewelryChoice = (event) => {
    if (event.target.name === "jewelry") {
        setJewelryState(parseInt(event.target.value))
        const customEvent = new CustomEvent("newTransientStateChange")
        document.dispatchEvent(customEvent)
    }
}