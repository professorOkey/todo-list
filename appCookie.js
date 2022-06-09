const toDoCreatorBlock = document.querySelector(".todo__creator");
const toDoInput = document.querySelector(".input__text");
const toDoCreateButton = document.querySelector(".input__submit");
const toDoContainer = document.querySelector(".todo__items");
const toDoClearAllButton = document.querySelector(".clear");
let id = 1;

toDoCreateButton.addEventListener("click", function () {
  if (toDoInput.value.length > 0) {
    toDoBuild(toDoInput.value);
    toDoInput.value = "";
    id++;
  }
});

toDoClearAllButton.addEventListener("click", function () {
  const items = document.querySelectorAll(".items__item");
  items.forEach((item) => {
    item.classList.add("remove");
    setTimeout(() => {
      item.remove();
    }, 400);
  });
  id = 1;
});

function toDoBuild(toDoText) {
  toDoContainer.insertAdjacentHTML(
    "beforeend",
    `
    <div class="items__item">
        <p class="item__text">${toDoText}</p>
        <div class="item__controls">
            <label class="controls__checkbox">
                <input type="checkbox" class="checbox__confirmation${id}">
                <span class="checkbox"></span>
            </label>
            <button class="controls__delete" id="${id}"></button>
        </div>
    </div>
    `
  );

  document.cookie = `toDo ${id}=${toDoText}; path=/; max-age=10`;
  toDoRemoveFromButton(id);
}

function toDoRemoveFromButton(toDoId) {
  const toDoDeleteButton = document.getElementById(`${toDoId}`);
  toDoDeleteButton.addEventListener("click", function (event) {
    event.target.parentNode.parentNode.classList.add("remove");
    setTimeout(() => {
      event.target.parentNode.parentNode.remove();
    }, 400);
  });
}

function toDoRemoveFromCookie(toDoId) {
  const toDoCurrent = document.getElementById(`${toDoId}`);
  toDoCurrent.parentNode.parentNode.classList.add("remove");
  setTimeout(() => {
    toDoCurrent.parentNode.parentNode.remove();
  }, 400);
}

window.cookieStore.addEventListener("change", function (event) {
  if (event.deleted.length > 0) {
    const deletedToDoId = +event.deleted[0].name.split(" ").slice(1).join();
    toDoRemoveFromCookie(deletedToDoId);
  }
});
