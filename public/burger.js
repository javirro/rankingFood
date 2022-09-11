const mainSelect = document.getElementById("bg-select-action");
const seeDiv = document.getElementById("bg-see-ranking");
const addDiv = document.getElementById("bg-add");
const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

mainSelect.addEventListener("change", () => {
    const option = document.getElementById("bg-select-action").value;
    if (option === "1") {
        seeDiv.style.display = "block";
        addDiv.style.display = "none";
    } else if (option === "2") {
        seeDiv.style.display = "none";
        addDiv.style.display = "block";
    } else {
        seeDiv.style.display = "none";
        addDiv.style.display = "none";
    }
});

const btSee = document.getElementById("bg-bt-see");
const btAdd = document.getElementById("bg-bt-add");

btSee.addEventListener("click", async() => {
    const response = await fetch("/burger");
    const data = await response.json();
    console.log(data);
});

btAdd.addEventListener("click", async() => {
    const numberRes = await fetch("/burger/number");
    const number = await numberRes.json();
    const position = document.getElementById("bg-position").value;
    const where = document.getElementById("bg-where").value;
    if (position > number + 1) alert(`You only have ${number} burgers in the ranking.`);
    else {
        const bodyData = JSON.stringify({
            where: where,
            position: position,
        });
        const response = await fetch("/burger", {
            method: "POST",
            headers: headers,
            body: bodyData,
        });
    }
});