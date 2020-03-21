import { testableForm, dispatchPressEnter } from "../lib/dom-testing.js";
import { fetchSUT } from "./_helpers.js";

describe("Given I load the main page", () => {

    let mainList;
    let sut;
    let newTaskBox;
    beforeEach(async () => {
        sut = await fetchSUT();
        mainList = sut.querySelector("ul.main-list");
        const newTaskForm = testableForm(sut, "form.new-task");
        newTaskBox = newTaskForm.querySelector("input.task-name");
    });

    it("Then the main task list should be displayed", () => expect(mainList).toBeTruthy());

    it("And focus should be in the new task box", () => expect(sut.activeElement).toBe(newTaskBox));

    describe("When I enter text into the new task box", () => {

        const newTaskName = "Shopping";
        beforeEach(() => {
            newTaskBox.value = newTaskName;
        });

        describe("And I press Enter", () => {

            let firstTask;
            let firstTaskName;
            beforeEach(() => {
                dispatchPressEnter(newTaskBox);
                firstTask = mainList.querySelector("li:first-child");
                firstTaskName = firstTask && firstTask.querySelector(".name").textContent;
            });

            it("Then the task should have been added", () => expect(firstTask).toBeTruthy());

            it("And the name should match what was entered", () => expect(firstTaskName).toBe(newTaskName));

            it("And the new task box should be cleared", () => expect(newTaskBox.value).toBe(""));

            describe("And I wait for a little bit", () => {

                let currentDocument;
                beforeEach(async () => {
                    await new Promise(resolve => setTimeout(resolve, 10));
                    currentDocument = document.querySelector("#sut").contentDocument;
                });

                it("Then we should be on the same page", () => expect(currentDocument).toBe(sut, "The document was reloaded"));

            });

        });

    });
});