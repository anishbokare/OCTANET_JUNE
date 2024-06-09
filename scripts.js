document.addEventListener("DOMContentLoaded", function() {
    const inputField = document.querySelector('.input');
    const scheduleDateField = document.querySelector('.schedule-date');
    const addButton = document.querySelector('.add-task-button');
    const todosListBody = document.querySelector('.todos-list-body');
    const filterBtns = document.querySelectorAll('.dropdown-content li');
    const deleteAllBtn = document.querySelector('.delete-all-btn');

    // Array to store todos
    let todos = [];

    // Function to render todos
    function renderTodos() {
        todosListBody.innerHTML = '';
        todos.forEach(todo => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${todo.task}</td>
                <td>${todo.dueDate}</td>
                <td>${todo.status}</td>
                <td>
                    <button class="delete-btn" data-id="${todo.id}">Delete</button>
                </td>
            `;
            todosListBody.appendChild(tr);
        });
    }

    // Function to add todo
    function addTodo() {
        const task = inputField.value.trim();
        const dueDate = scheduleDateField.value.trim();
        if (task !== '') {
            const newTodo = {
                id: Date.now(),
                task: task,
                dueDate: dueDate,
                status: 'Pending'
            };
            todos.push(newTodo);
            renderTodos();
            inputField.value = '';
            scheduleDateField.value = '';
        } else {
            alert('Please enter a task!');
        }
    }

    // Function to filter todos
    function filterTodos(status) {
        if (status === 'all') {
            renderTodos();
        } else {
            const filteredTodos = todos.filter(todo => todo.status.toLowerCase() === status.toLowerCase());
            todosListBody.innerHTML = '';
            filteredTodos.forEach(todo => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${todo.task}</td>
                    <td>${todo.dueDate}</td>
                    <td>${todo.status}</td>
                    <td>
                        <button class="delete-btn" data-id="${todo.id}">Delete</button>
                    </td>
                `;
                todosListBody.appendChild(tr);
            });
        }
    }

    // Event listener for add todo button
    addButton.addEventListener('click', addTodo);

    // Event listener for filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterTodos(btn.textContent.trim().toLowerCase());
        });
    });

    // Event listener for delete all button
    deleteAllBtn.addEventListener('click', () => {
        todos = [];
        renderTodos();
    });

    // Event delegation for delete buttons
    todosListBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const id = parseInt(event.target.dataset.id);
            todos = todos.filter(todo => todo.id !== id);
            renderTodos();
        }
    });
});
