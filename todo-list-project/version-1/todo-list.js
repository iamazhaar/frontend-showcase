let todoObjectArray = JSON.parse(localStorage.getItem('todoObjectArray')) || [];

// Saving The Data
function addTodo() {
    // Fetching the todo name, date from the input html elements
    let nameInputElement = document.querySelector('.js-todo-input');
    const name = nameInputElement.value;

    const dateInputElement = document.querySelector('.js-date-input');
    const dueDate = dateInputElement.value;

    // Adding fetched values as JS Object to todoObjectArray
    todoObjectArray.push({
        name,
        dueDate
    })

    // Setting the todoObjectArray in localStorage
    localStorage.setItem('todoObjectArray', JSON.stringify(todoObjectArray));

    // Setting the input element back to default
    nameInputElement.value = '';
    dateInputElement.value = '';

    // Rendering todoObjectArray into the browser
    renderTodo();
}

function renderTodo() {
    // Generating The HTML
    let todoHTML = '';
    for (let i = 0; i < todoObjectArray.length; i++) {
        const todoObject = todoObjectArray[i];
        const { name, dueDate } = todoObject;
        const todoObjectHTML = `
        <div>${name}</div>
        <div>${dueDate}</div>
        <button onclick="todoObjectArray.splice(${i}, 1);
                        renderTodo();
                        localStorage.setItem('todoObjectArray', JSON.stringify(todoObjectArray));"
                class="delete-todo-button">
            Delete
        </button>
        `

        todoHTML += todoObjectHTML;
    }

    // Making It Interactive
    document.querySelector('.js-display-contents')
        .innerHTML = todoHTML;
}

// Displays todo from localStorage even after the page reload
renderTodo();