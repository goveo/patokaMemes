var app = new Vue({
    el: '#app',
    data: {
        showSidebar: false,
    },
    methods: {
        chooseMeme: function (event) {
            console.log($(event.currentTarget).attr('param_id'));
            console.log('need to change memes and push info to db');
        },
        login: function() {
            let login = $("#usernameLoginInput").val();
            let password = $("#usernamePasswordInput").val();
            console.log('login : ', login);
            console.log('password : ', password);   
        }
    },
    created: function () {
        console.log('created');
        $('.special.cards .image').dimmer({
            on: 'hover'
        });
    }
});