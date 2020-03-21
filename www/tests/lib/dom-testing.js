function submitNearestForm(element) {
    if(!element) return false;
    if(element.tagName === "FORM") {
        const button = element.ownerDocument.createElement("BUTTON");
        element.appendChild(button);
        button.click();
        button.remove();
        return true;
    }
    return submitNearestForm(element.parentElement);
}

export function installEventHelpers(document) {
    document.addEventListener("keypress", e => {
        if(e.isTrusted) return;
        switch(e.target.type) {
            case "checkbox":
                if(e.code === "Space") {
                    e.target.checked = !e.target.checked;
                    e.target.dispatchEvent(new Event("change", { bubbles: true }));
                }
        }
        console.log(e.target.tagName, e.bubbles, e.type, e.code);
        switch(e.target.tagName) {
            case "INPUT":
            case "BUTTON":
                if(e.code === "Enter")
                    submitNearestForm(e.target);
        }
    });
}

function requireElement(element, why) {
    if(!element) throw new Error("No element " + why);
    return element;
}

const keyboardEvent = (name, element, key, code) =>
    new KeyboardEvent(name, { view: element.window, bubbles: true, cancelable: true, key, code });

export function dispatchPressEnter(element) {
    requireElement(element, "to press enter on").dispatchEvent(keyboardEvent("keypress", element, "Enter", "Enter"));
}

export function dispatchSpacePress(element) {
    requireElement(element, "to press space on").dispatchEvent(keyboardEvent("keypress", element, " ", "Space"));
}

export function simulateTabFrom(element) {
    const inputs = Array.from(element.ownerDocument.querySelectorAll("input,textarea,button"));
    const elementIndex = inputs.indexOf(element);
    if(elementIndex < 0) throw new Error("Current element not found in list of inputs");
    const newFocus = inputs[elementIndex + 1];
    if(!newFocus) throw new Error("Focus leaves the current document");
    newFocus.focus();
    newFocus.dispatchEvent(new Event("focusin", { bubbles: true }));
}

export function dispatchClick(element) {
    requireElement(element, "to click").click();
}

export function makeFormTestable(container, selector) {
    if(!form) throw new Error("No form supplied");
    form.addEventListener("keypress", e => {
        if(!e.isTrusted && e.code === "Enter") {
            // probably came from a test script

        }
    });
}
export function testableForm(container, selector) {
    const form = container.querySelector(selector);

    return form;
}

export async function appStartedListener(appWindow) {

    appWindow.document.stale = true;
    appWindow.location.reload();
    await new Promise(resolve => {
        const check = () => setTimeout(
            () => appWindow.document.stale ? check() : resolve(),
            10
        );
        check();
    });
    await new Promise(resolve => appWindow.document.addEventListener("app-started", resolve));

}