import { authWithEmailAndPassword, getAuthForm } from "./auth";
import { Question } from "./question";
import css from "./styles.css";
import { isValid } from "./utils";
import { createModal } from "./utils";

const form = document.getElementById("form");
const modalBtn = document.getElementById("modal-btn");
//console.log(form);
const input = form.querySelector("#question-input");
//console.log(input);
const submitBtn = form.querySelector("#submit");
//console.log(submitBtn);
//console.log("App working...");

window.addEventListener("load", Question.renderList);
form.addEventListener("submit", submitFormHandler);
modalBtn.addEventListener("click", openModal);
input.addEventListener("input", () => {
    submitBtn.disabled = !isValid(input.value);
});

function submitFormHandler(event) {
    event.preventDefault();

    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON(),
        };

        submitBtn.disabled = true;

        //Асинхронный запрос на сервер для сохранения вопроса

        Question.create(question).then(() => {
            console.log("Question", question);
            input.value = "";
            input.className = "";
            submitBtn.disabled = false;
        });
    }
}

function openModal() {
    createModal("Авторизация", getAuthForm());
    document
        .getElementById("auth-form")
        .addEventListener("submit", authFormHandler, { once: true });
}

function authFormHandler(event) {
    event.preventDefault();
    const email = event.target.querySelector("#email").value;
    const password = event.target.querySelector("#password").value;

    authWithEmailAndPassword(email, password)
        .then(Question.fetch)
        .then(renderModalAfterAuth);
}

function renderModalAfterAuth(content) {
    console.log("Content", content);
}