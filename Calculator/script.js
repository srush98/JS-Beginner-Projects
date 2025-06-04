const input = document.getElementById('input');
const btn = document.querySelectorAll("button");

btn.forEach(element => {
    element.addEventListener("click", (e) => {
        if (e.target.textContent === "C") {
            input.innerText = "";
        } else if (e.target.textContent === "<") {
            input.innerText = input.innerText.slice(0, -1);
        } else if (e.target.textContent === "=") {
            input.innerText = eval(input.innerText);
        }
        else {
            input.innerText += e.target.textContent;
        }
        input.scrollLeft = input.scrollWidth;
    })
})