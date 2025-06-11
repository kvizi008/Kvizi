const { createApp } = Vue;

// Компонент элемента списка дел
const TodoItem = {
    props: ['todo'],
    template: `
        <li :class="{ completed: todo.completed }">
            <span @click="$emit('toggle')" class="todo-text">
                {{ todo.text }}
            </span>
            <button @click="$emit('remove')" class="remove-btn">×</button>
        </li>
    `
};

// Основное приложение
const app = createApp({
    components: {
        TodoItem
    },
    data() {
        return {
            newTodo: '',
            todos: []
        };
    },
    computed: {
        completedCount() {
            return this.todos.filter(todo => todo.completed).length;
        }
    },
    methods: {
        addTodo() {
            if (this.newTodo.trim() === '') return;
            
            this.todos.push({
                id: Date.now(),
                text: this.newTodo,
                completed: false
            });
            
            this.newTodo = '';
        },
        removeTodo(index) {
            this.todos.splice(index, 1);
        },
        toggleTodo(index) {
            this.todos[index].completed = !this.todos[index].completed;
        }
    }
});

app.mount('#app');