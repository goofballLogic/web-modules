export default function renderTemplate(container, selector, postProcessing) {
    const mainTemplate = document.querySelector(selector);
    const content = mainTemplate.content.cloneNode(true)
    if(postProcessing) postProcessing(content);
    container.appendChild(content);
}