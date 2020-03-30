var app = new Vue({
    el: '#app1', //Идентификатор блока, в котором лежат переменные, с которыми работает Vue
    data: {
        message: 'Привет, Vue!', //В блоке в {{***}} мы пишем имя переменной-ключа, по которой будет доступо значение
        start: 'Let`s code!'
    }
});

var app2 = new Vue({
    el: '#app-2',
    data: {
        message: 'Вы загрузили эту страницу: ' + new Date().toLocaleString()
    }
});

var app3 = new Vue({
    el: '#app-3',
    data: {
        seen: true
    }
});

var app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [
            { text: 'Изучить JavaScript' },
            { text: 'Изучить Vue' },
            { text: 'Создать что-нибудь классное' },
            { text: 'Дополнительная моя строка' },
            { text: 'Дубль 2' },
            { text: 'Еще одна строка' }
        ],
        show: true
    }
});

var exampleList = new Vue({
    el: '#example-list',
    data: {
        show: true,
        todos: [
            { text: 'Анимация' },
            { text: 'зашкаливает' },
            { text: '!' }
        ]
    }
});

var demo = new Vue({
    el: '#demo',
    data: {
        show: true
    }
});

var example2 = new Vue({
    el: '#example-2',
    data: {
        show: true
    }
});

var app5 = new Vue({
    el: '#app-5',
    data: {
        message: 'Привет, Vue.js!'
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
        }
    }
});

var app6 = new Vue({
    el: '#app-6',
    data: {
        message: 'Привет, Vue!'
    },
    methods: {
        reverseWords: function () {
            this.message = this.message.split(' ').reverse().join(' ')
        },
        reverseChars: function () {
            this.message = this.message.split('').reverse().join('')
        }
    }
});