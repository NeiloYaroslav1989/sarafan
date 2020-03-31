function getIndex(list, id) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            return i;
        }
    }
    return -1;
}

var messageApi = Vue.resource('/message{/id}');

Vue.component('message-form', {
    props: ['messages', 'messageAttr'],
    data: function() {
        return {
            id: '',
            text: ''
        }
    },
    watch: {
        messageAttr: function (newMessageValue, oldMessageValue) {
            this.text = newMessageValue.text;
            this.id = newMessageValue.id
        }
    },
    template:
       '<div>' +
            '<input type="text" placeholder="Write something" v-model="text">' +
            '<input type="button" value="Save" v-on:click="save">' +
       '</div>',
    methods: {
        save: function () {
            var message = { text: this.text };

            if (this.id) {
                messageApi.update({id: this.id}, message).then(result =>
                    result.json().then(data => {
                        var index = getIndex(this.messages, data.id);
                        this.messages.splice(index, 1, data);
                        this.text = '';
                        this.id = '';
                }))
            } else {
                messageApi.save({}, message).then(result =>
                    result.json().then(data => {
                        this.messages.push(data);
                        this.text = '';
                    }))
            }
        }
    }
});

Vue.component('message-row', {
   props: ['message', 'editMethod', 'messages'],
    template: '<div>' +
        '<i>({{message.id}})</i> {{message.text}}' +
        '<span style="position: absolute; right: 0;">' +
            '<input type="button" value="Edit" v-on:click="edit"/>' +
            '<input type="button" value="Delete" v-on:click="del"/>' +
        '</span>' +
        '</div>',
    methods: {
       edit: function () {
            this.editMethod(this.message)
       },
        del: function () {
            messageApi.remove({id: this.message.id}).then(result =>{
                if (result.ok) {
                    this.messages.splice(this.messages.indexOf(this.message), 1)
                }
            })
        }
    }
});

//Блок объявления компонента должен идти до его использования
Vue.component('messages-list', { //Название компонента
    props: ['messages'], //Указываем параметры, которые ожидаем получить :messages
    data: function() {
        return {
            message: null
        }
    },
    template: '<div style="position: relative; width: 300px;">' +
        '<message-form :messages="messages" :messageAttr="message" />' +
        '<message-row v-for="message in messages" :key="message.id" :message="message"' +
        ' :editMethod="editMethod" :messages="messages" />' +
        '</div>', //Шаблон, который мы будем использовать
    //v-for="message in messages" - обход в цикле, где messages имя переменной коллекции,
    // message - имя одного элемента из этой колекции
    // message.text - каждый элемент коллекции messages имеет поля text и id
    created: function() {
        messageApi.get().then(result =>
            result.json().then(data =>
                data.forEach(message => this.messages.push(message))
            )
        )
    },
    methods: {
        editMethod: function (message) {
            this.message = message;
        }
    }
});

var app = new Vue({
    el: '#app', //Идентификатор блока, в котором лежат переменные, с которыми работает Vue
    template: '<messages-list :messages="messages"/>',
    data: {
        messages: []
    }
});

