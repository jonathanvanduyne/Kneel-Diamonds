import { setMetalsState, transientState } from "./transientState.js"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const MetalOptions = async () => {
    const response = await fetch("http://localhost:8088/metals")
    const metals = await response.json()

    let optionsHTML = ""

    // Use map() to generate new array of strings
    const divStringArray = metals.map(
        (metal) => {
            if (transientState.metalId === metal.id) {
                return `<div>
                <input type='radio' name='metal' value='${metal.id}' checked="checked"/> ${metal.metal}
                </div>`
            } else {
                return `<div>
                <input type='radio' name='metal' value='${metal.id}'/> ${metal.metal}
                </div>`
            }
        }
    )

    document.addEventListener("change", handleMetalChoice)
    // This function needs to return a single string, not an array of strings
    optionsHTML += divStringArray.join("")
    return optionsHTML
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const handleMetalChoice = (event) => {
    // Make sure you change this condition if you named your inputs differently
    if (event.target.name === "metal") {
        setMetalsState(parseInt(event.target.value))
        const customEvent = new CustomEvent("newTransientStateChange")
        document.dispatchEvent(customEvent)
    }
}