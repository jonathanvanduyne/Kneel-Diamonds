import { setSizesState, transientState } from "./transientState.js"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const SizeOptions = async () => {
    const response = await fetch("http://localhost:8088/sizes")
    const sizes = await response.json()


    let optionsHTML = ""

    // Use map() to generate new array of strings
    const divStringArray = sizes.map(
        (size) => {
            if (transientState.sizeId === size.id) {
                return `<div><input type='radio' name='size' value='${size.id}' price='${size.price}' checked='checked'/>${size.carets}</div>`
            } else {
                return `<div><input type='radio' name='size' value='${size.id}' price='${size.price}'/>${size.carets}</div>`
            }
        }
    )

    document.addEventListener("change", handleSizeChoice)
    // This function needs to return a single string, not an array of strings
    optionsHTML += divStringArray.join("")

    return optionsHTML
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const handleSizeChoice = (event) => {
    // Make sure you change this condition if you named your inputs differently
    if (event.target.name === "size") {
        setSizesState(parseInt(event.target.value))
        const customEvent = new CustomEvent("newTransientStateChange")
        document.dispatchEvent(customEvent)
    }
}