var app = new Vue({
    el: '#app',
    data: {
        loginError: false,
        registerError: false,
        differentPassError: false
    },
    methods: {
        chooseMeme: function (event) {
            let memeID = $(event.currentTarget).attr('param_id');
            console.log("memeID : ", memeID);
            console.log('need to change memes and push info to db');
        },
        registerPost: function(username, password) {
            let data = {
                username: username,
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
                success: function (response) {
                    console.log('response : ');
                    console.log(response);
                    if (response == 'success') {
                        console.log('registered');
                        app.loginPost(username, password);
                    } else {
                        app.registerError = true;
                    }
                },  
                error: function (error) {
                    console.log(error);
                }
            });
        },
        loginPost: function(username, password) {
            let data = {
                username: username,
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
                    console.log('response : ');
                    console.log(response);
                    if (response == 'success') {
                        window.location = "/profile";
                    } else {
                        app.loginError = true;
                    }
                },  
                error: function (error) {
                    console.log('We are sorry but our servers are having an issue right now');
                    console.log(error);
                }
            });
        },
        login: function () {
            let username = $("#usernameSigninInput").val();
            let password = $("#passwordSigninInput").val();
            console.log('username : ', username);
            console.log('password : ', password);
            app.loginPost(username, password);
        },
        register: function () {
            let username = $("#usernameSignupInput").val();
            let password = $("#passwordSignupInput").val();
            let passwordAgain = $("#passwordAgainSignupInput").val();
            console.log('username : ', username);
            console.log('password : ', password);
            console.log('passwordAgain : ', passwordAgain);

            if (password != passwordAgain) {
                app.differentPassError = true;
            } else {
                app.registerPost(username, password);
            }
        },
        logout: function () {
            window.location = "/logout";
        }
    },
    created: function () {
        console.log('created');
        $('.special.cards .image').dimmer({
            on: 'hover'
        });
    }
});