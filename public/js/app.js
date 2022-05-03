const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.getElementById("message-one");
const messageTwo = document.getElementById("message-two");

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    messageTwo.innerText = "";
    messageOne.innerText = "Loading...";
    fetch("http://localhost:3000/weather?address=" + search.value)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.error) {
                messageOne.innerText = data.error;
                messageTwo.innerText = "";
                return;
            }
            messageOne.innerText = data.location;
            messageTwo.innerText = data.forecast;
        });
});
