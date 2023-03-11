function Tasks(_formInput, _todosWrapper) {
    this.todosWrapper = document.querySelector(_todosWrapper);
    this.addItem = (event) => {
        event.preventDefault();
        this.input = event.target.querySelector(_formInput);
        this.todosWrapper.insertAdjacentHTML('beforeend', this.createTemplate(this.input.value));
        this.input.value = '';
        document.querySelectorAll('.js--delete').forEach(item => {
            item.addEventListener('click', this.delete);
        })
        const check = document.querySelectorAll('.js--checked');
        check.forEach((check, index) => {
            check.addEventListener('click', () => {
                if (check.checked) {
                    document.querySelectorAll('.todo-item__description')[index].classList.add('todo-item--checked');
                } else {
                    document.querySelectorAll('.todo-item__description')[index].classList.remove('todo-item--checked');
                }
            });
        });
    }
    this.delete = function (event) {
        event.target.closest('.js--todo-item').remove();
    }
    this.createTemplate = function (description) {
        return `
            <div class="todo-item js--todo-item">
                    <input type="checkbox" class="js--checked">
                    <div class="todo-item__description">${description}</div>
                    <button class="todo-item__delete js--delete">Удалить</button>
            </div> 
        `
    }
}
const task = new Tasks(
    '.js--form__input',
    '.js--todos-wrapper',
);

document.querySelector('.js--form').addEventListener('submit', task.addItem);


