const mainSelect = document.getElementById("ck-select-action");
const seeDiv = document.getElementById("ck-see-ranking");
const addDiv = document.getElementById("ck-add");
const headers = { 'Accept': 'application/json', "Content-Type": "application/json" }

mainSelect.addEventListener("change", () => {
    const option = document.getElementById("ck-select-action").value;
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

const btSee = document.getElementById('ck-bt-see')
const btAdd = document.getElementById('ck-bt-add')

btSee.addEventListener('click', async() => {
    const response = await fetch('/cheesecake')
    const data = await response.json()
    console.log(data)
})


btAdd.addEventListener('click', async() => {
    const numberRes = await fetch("/burger/number");
    const number = await numberRes.json();
    const where = document.getElementById('ck-where').value
    const position = document.getElementById('ck-position').value
    if (position > number + 1) alert(`You only have ${number} cheesecakes in the ranking.`);
    else {
        const bodyData = JSON.stringify({
            where: where,
            position: position
        })
        const response = await fetch('/cheesecake', { method: 'POST', headers: headers, body: bodyData, })
    }

})