import { setStylesState, transientState } from "./transientState.js"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const StyleOptions = async () => {
    const response = await fetch("http://localhost:8088/styles")
    const styles = await response.json()

    let optionsHTML = ""

    // Use map() to generate new array of strings
    const divStringArray = styles.map(
        (style) => {
            if (transientState.styleId === style.id) {
                return `<div>
            <input type='radio' name='style' value='${style.id}' price='${style.price}' checked='checked'/>${style.style}
            </div>`
            } else {
                return `<div>
                <input type='radio' name='style' value='${style.id}' price='${style.price}'/>${style.style}
                </div>`
            }
        }
    )
    document.addEventListener("change", handleStylesChoice)
    // This function needs to return a single string, not an array of strings
    optionsHTML += divStringArray.join("")

    return optionsHTML
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const handleStylesChoice = (event) => {
    // Make sure you change this condition if you named your inputs differently
    if (event.target.name === "style") {
        setStylesState(parseInt(event.target.value))
        const customEvent = new CustomEvent("newTransientStateChange")
        document.dispatchEvent(customEvent)
    }
}