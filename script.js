// Login Functionality
const loginForm = document.getElementById('loginForm');
const validateLogin = (username, password, callback) => {
    if (username === 'admin' && password === '12345') {
        callback(true);
    } else {
        callback(false);
    }
};

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        validateLogin(username, password, (isValid) => {
            if (isValid) {
                window.location.href = 'main.html';
            } else {
                alert('Invalid Credentials!');
            }
        });
    });
}

// Logout Functionality
const logoutLink = document.getElementById('logoutLink');
if (logoutLink) {
    logoutLink.addEventListener('click', () => {
        window.location.href = 'login.html';
    });
}

// Fetch and Display Todos
const todoList = document.getElementById('todoList');
let completedCount = 0;

if (todoList) {
    const fetchTodos = () => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(data => {
                displayTodos(data);
            })
            .catch(error => console.error('Error fetching todos:', error));
    };

    const displayTodos = (todos) => {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerHTML = `
                <input type="checkbox" class="form-check-input me-2" ${todo.completed ? 'checked disabled' : ''}>
                <span>${todo.title}</span>
            `;

            if (!todo.completed) {
                listItem.querySelector('input').addEventListener('change', (e) => {
                    if (e.target.checked) {
                        completedCount++;
                        checkCompletedTasks();
                    } else {
                        completedCount--;
                    }
                });
            }

            todoList.appendChild(listItem);
        });
    };

    const checkCompletedTasks = () => {
        return new Promise((resolve) => {
            if (completedCount === 5) {
                resolve('Congrats. 5 Tasks have been Successfully Completed');
            }
        }).then(message => {
            alert(message);
        });
    };

    fetchTodos();
}
