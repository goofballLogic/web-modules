import { appStartedListener, installEventHelpers } from "../lib/dom-testing.js";

beforeAll(() => {
    document.body.classList.remove("tests-complete");
});

afterAll(() => {
    document.body.classList.add("tests-complete");
});

let sut;

beforeEach(async () => {

    const sutWindow = document.querySelector("#sut").contentWindow;
    await appStartedListener(sutWindow);
    sut = sutWindow.document;
    installEventHelpers(sut);

});

export function fetchSUT() { return sut; }