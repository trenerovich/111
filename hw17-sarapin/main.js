function UserTable({ form, content, userInfo, addButton }) {
    this.init = function () {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.addUser(
                form.elements['name'].value,
                form.elements['phone'].value,
                form.elements['age'].value
            )
        })
        addButton.addEventListener('click', function () {
            form.reset();
            form.classList.add('open');
        })
        content.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn-delete')) {
                const currentUsers = JSON.parse(localStorage.getItem('users')) || [];
                const userId = parseInt(event.target.closest('tr').querySelector('td').textContent);
                const userIndex = currentUsers.findIndex(user => user.id === userId);
                if (userIndex !== -1) {
                    currentUsers.splice(userIndex, 1);
                    localStorage.setItem('users', JSON.stringify(currentUsers));
                    event.target.closest('tr').remove();
                }
            }
        })
        this.loadUsers();
    }
    this.addUser = function (name, phone, age) {
        const user = {
            id: Math.floor(Math.random() * 100),
            name,
            phone,
            age,
        }
        this.userTemplate(user);
        form.reset();
        form.classList.remove('open');
        const currentUsers = JSON.parse(localStorage.getItem('users')) || [];
        currentUsers.push(user);
        localStorage.setItem('users', JSON.stringify(currentUsers))
    }
    this.loadUsers = function () {
        const users = JSON.parse(localStorage.getItem('users'));
        if (users) {
            users.forEach(user => this.userTemplate(user))
        }
    }
    this.userTemplate = function (user) {
        content.insertAdjacentHTML('beforeend', (
            `<tr>`+
                `<td>${user.id}</td>`+
                `<td>${user.name}</td>`+
                `<td>${user.phone}</td>`+
                `<td>${user.age}</td>`+
                `<td><button class="btn">View</button><button class="btn">Edit</button><button class="btn btn-delete">Delete</button></td>`+
            `</tr>`
        ))
    }
}

(new UserTable({
    form: document.querySelector('.js--form'),
    userInfo: document.querySelector('.js--user'),
    addButton: document.querySelector('.js--add'),
    content: document.querySelector('.js--content'),
})).init();
