import { testableForm, dispatchPressEnter, dispatchClick, simulateTabFrom, dispatchSpacePress } from "../lib/dom-testing.js";
import { fetchSUT } from "./_helpers.js";


describe("Given I load the main page", () => {

    let mainList;
    let sut;
    beforeEach(async () => {
        sut = await fetchSUT();
        mainList = sut.querySelector("ul.main-list");
    });

    describe("And there are three to-dos", () => {

        let newTaskBox;
        beforeEach(() => {
            const newTaskForm = testableForm(sut, "form.new-task");
            newTaskBox = newTaskForm.querySelector("input.task-name");
            ["Shopping", "Clean the car", "Do my homework"].forEach(name => {
                newTaskBox.value = name;
                dispatchPressEnter(newTaskBox);
            });
            expect(mainList.querySelectorAll(".task").length).toBe(3); // setup verification
        });

        describe("When I click on first task's name on the list", () => {

            let firstTask;
            beforeEach(() => {
                firstTask = mainList.querySelector(".task");
                dispatchClick(firstTask.querySelector(".name"));
            });

            it("Then the task should be marked as complete", () => expect(firstTask.classList).toContain("completed"));

        });

        describe("When I tab to the first task on the list", () => {

            let firstTask;
            beforeEach(() => {
                firstTask = mainList.querySelector(".task");
                newTaskBox.focus();
                simulateTabFrom(newTaskBox);
            });

            it("Then the first task should be focused", () => expect(firstTask.classList).toContain("focused"));

            describe("And I press the space bar", () => {

                beforeEach(() => {
                    console.log("focused", sut.activeElement);
                    dispatchSpacePress(sut.activeElement);
                });

                it("Then the first task should be marked as complete", () => expect(firstTask.classList).toContain("completed"));
            });

        });

    });
});