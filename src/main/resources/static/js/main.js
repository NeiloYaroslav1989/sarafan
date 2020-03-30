Vue.component('message-row', {
   props: ['message'],
    template: '<div><i>({{message.id}})</i> {{message.text}}</div>'
});

//Блок объявления компонента должен идти до его использования
Vue.component('messages-list', { //Название компонента
    props: ['messages'], //Указываем параметры, которые ожидаем получить :messages
    template: '<div>' +
        '<message-row v-for="message in messages" :key="message.id" :message="message" />' +
        '</div>' //Шаблон, который мы будем использовать
    //v-for="message in messages" - обход в цикле, где messages имя переменной коллекции,
    // message - имя одного элемента из этой колекции
    // message.text - каждый элемент коллекции messages имеет поля text и id
});

var app = new Vue({
    el: '#app', //Идентификатор блока, в котором лежат переменные, с которыми работает Vue
    template: '<messages-list :messages="messages"/>',
    data: {
        messages: [
            {id: '3', text: 'Wow'},
            {id: '1', text: 'More'},
            {id: '2', text: 'Another'}
        ]
    }
});

