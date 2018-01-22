var app = new Vue({
    el: '#app',
    data: {
        loginError: false,
        registerError: false,
        errorText: "",
        avatar: "",
        avatarHover: false,
        leftMeme: {},
        rightMeme: {}
    },
    watch: {
        avatarHover: function(value) {
            if (value == true) {
                $('.image').dimmer('show');
            } else {
                $('.image').dimmer('hide');
            }
        } 
    },
    methods: {
        changeAvatar: function () {
            console.log('changeAvatar');
            console.log($('#avatar-input').val());
        },
        chooseMeme: function (event) {
            let memeID = $(event.currentTarget).attr('param_id');
            console.log("memeID : ", memeID);
            console.log('need to change memes and push info to db');
        },
        registerPost: function (username, password) {
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
                    if (response.status == 'success') {
                        console.log('registered');
                        app.loginPost(username, password);
                    } else {
                        app.errorText = response.message;
                        app.registerError = true;
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },
        loginPost: function (username, password) {
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
                    if (response.status == 'success') {
                        console.log('logined');
                        window.location = "/profile";
                    } else {
                        app.errorText = response.message;
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
                app.errorText = "Passwords are different";
                app.registerError = true;
            } else {
                app.registerPost(username, password);
            }
        },
        logout: function () {
            window.location = "/logout";
        },
        getMemes: function() {
            axios.get('/memes/current/')
                .then((response) => {
                    console.log('data : ', response.data);
                    app.leftMeme = response.data.left;
                    app.rightMeme = response.data.right;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
    created() {
        this.getMemes();
        console.log('created');
    }
});