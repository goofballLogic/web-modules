import DOMContentLoading from "./lib/DOMContentLoading.js";
import renderTemplate from "./lib/renderTemplate.js";

(async function() {

    await DOMContentLoading;
    const main = document.querySelector("main");
    renderTemplate(main, "template#main-list");

    const mainList = document.querySelector(".main-list");
    mainList.addEventListener("change", e => {
        for(const task of mainList.querySelectorAll(".task")) {
            const completed = task.querySelector("[name=completed]").checked;
            completed ? task.classList.add("completed") : task.classList.remove("completed");
        }
    });

    function computeFocused(e) {
        if(e.target.name === "completed") {
            for(const focused of mainList.querySelectorAll(".focused"))
                focused.classList.remove("focused");
            if(e.type == "focusin")
                e.target.parentElement.parentElement.classList.add("focused");
        }
    }
    mainList.addEventListener("focusin", computeFocused);
    mainList.addEventListener("focusout", computeFocused);

    const newTaskForm = main.querySelector(".new-task");
    const newTaskName = newTaskForm.querySelector(".task-name");
    newTaskForm.addEventListener("submit", e => {

        e.preventDefault();
        const input = newTaskForm.querySelector("input.task-name");
        const value = input.value;
        input.value = "";
        renderTemplate(mainList, "template#task-item", content => {
            content.querySelector(".task .name").textContent = value;
        });

    });

    newTaskName.focus();
    document.dispatchEvent(new Event("app-started", {}));

}());