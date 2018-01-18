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
        login: function () {
            let login = $("#usernameSigninInput").val();
            let password = $("#passwordSigninInput").val();
            console.log('login : ', login);
            console.log('password : ', password);
            let data = {
                username: login,
                password: password
            };

            $.ajax({
                type: 'post',
                url: '/login',   
                data: data,
                xhrFields: {
                    withCredentials: false
                },  
                headers: {}, 
                success: function (response) {
                    console.log('Success');
                    console.log(response);
                },  
                error: function (error) {
                    console.log('We are sorry but our servers are having an issue right now');
                    console.log(error);
                }
            });
        },
        register: function () {
            let login = $("#usernameSignupInput").val();
            let password = $("#passwordSignupInput").val();
            let passwordAgain = $("#passwordAgainSignupInput").val();
            console.log('login : ', login);
            console.log('password : ', password);
            console.log('passwordAgain : ', passwordAgain);

            let data = {
                username: login,
                password: password
            };
            
            $.ajax({
                type: 'post',
                url: '/register',   
                data: data,
                xhrFields: {
                    withCredentials: false
                },  
                headers: {}, 
                success: function (data) {
                    console.log('Success');
                    console.log(data);
                },  
                error: function () {
                    console.log('We are sorry but our servers are having an issue right now');
                }
            })
        }
    },
    created: function () {
        console.log('created');
        $('.special.cards .image').dimmer({
            on: 'hover'
        });
    }
});