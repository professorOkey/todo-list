const toDoCreatorBlock = document.querySelector(".todo__creator");
const toDoInput = document.querySelector(".input__text");
const toDoCreateButton = document.querySelector(".input__submit");
const toDoContainer = document.querySelector(".todo__items");
const toDoClearAllButton = document.querySelector(".clear");

let id = 0;
const todos = JSON.parse(localStorage.getItem("todos")) ?? [];
console.log(todos);
todos.forEach((todo) => {
  id = todo.id;
  toDoBuild(todo);
});

console.log(localStorage);

toDoCreateButton.addEventListener("click", function () {
  if (toDoInput.value.length > 0) {
    id++;
    const todo = {
      value: toDoInput.value,
      done: false,
      id: id,
    };
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    toDoBuild(toDoInput);
    toDoInput.value = "";
  }
});

toDoClearAllButton.addEventListener("click", function () {
  localStorage.clear();
  const items = document.querySelectorAll(".items__item");
  items.forEach((item) => {
    item.classList.add("remove");
    setTimeout(() => {
      item.remove();
    }, 400);
  });
  id = 0;
});

function toDoBuild(toDo) {
  toDoContainer.insertAdjacentHTML(
    "beforeend",
    `
      <div class="items__item">
          <p class="item__text">${toDo.value}</p>
          <div class="item__controls">
              <label class="controls__checkbox">
                  <input type="checkbox" ${
                    toDo.done && "checked"
                  } class="checkbox__confirmation${id}">
                  <span class="checkbox"></span>
              </label>
              <button class="controls__delete" id="${id}"></button>
          </div>
      </div>
      `
  );

  const checkbox = document.querySelector(`.checkbox__confirmation${id}`);

  checkbox.addEventListener("click", function (event) {
    const doneId = event.target.classList.value.split("").slice(-1).join();
    todos.forEach((todo) => {
      if (todo.id == doneId) {
        todo.done = !todo.done;
        console.log(todo);
      }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
  });

  toDoRemove(id);
}

function toDoRemove(toDoId) {
  const toDoDeleteButton = document.getElementById(`${toDoId}`);

  toDoDeleteButton.addEventListener("click", function () {
    todos.forEach((todo) => {
      if (todo.id === toDoId) {
        const deleteTargetIndex = todos.indexOf(todo);
        todos.splice(deleteTargetIndex, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    });

    toDoDeleteButton.parentNode.parentNode.classList.add("remove");
    setTimeout(() => {
      toDoDeleteButton.parentNode.parentNode.remove();
    }, 400);
  });
}
