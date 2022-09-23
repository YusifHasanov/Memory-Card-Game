class UI {
    constructor() {
    }

    static displayMessage(type, content, container) {
        let div = document.createElement("div");
        div.innerHTML =
            `
            <div class=${type}>
             ${content}
            </div>
            `
        container.append(div);
        setTimeout(() => {
            div.remove()
        }, 2000)
    }
}