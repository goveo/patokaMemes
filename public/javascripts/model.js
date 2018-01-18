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
            let login = $("#usernameSigninInput").val();
            let password = $("#passwordSigninInput").val();
            console.log('login : ', login);
            console.log('password : ', password);   
        },
        register: function() {
            let login = $("#usernameSignupInput").val();
            let password = $("#passwordSignupInput").val();
            let passwordAgain = $("#passwordAgainSignupInput").val();
            console.log('login : ', login);
            console.log('password : ', password);  
            console.log('passwordAgain : ', passwordAgain);  
        }
    },
    created: function () {
        console.log('created');
        $('.special.cards .image').dimmer({
            on: 'hover'
        });
    }
});