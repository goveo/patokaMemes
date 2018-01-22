var app = new Vue({
    el: '#app',
    data: {
        loginError: false,
        registerError: false,
        errorText: "",
        avatar: "",
        avatarHover: false,
        leftMemeHover: false,
        rightMemeHover: false,
        leftMeme: {},
        rightMeme: {},
        liked_id: "",
        another_id: "",
        loading: false
    },
    watch: {
        avatarHover: function (value) {
            if (value == true) {
                $('.image').dimmer('show');
            } else {
                $('.image').dimmer('hide');
            }
        },
        leftMemeHover: function (value) {
            if (value == true) {
                $('#left-meme').dimmer('show');
            } else {
                $('#left-meme').dimmer('hide');
            }
        },
        rightMemeHover: function (value) {
            if (value == true) {
                $('#right-meme').dimmer('show');
            } else {
                $('#right-meme').dimmer('hide');
            }
        }
    },
    methods: {
        changeAvatar: function () {
            console.log('changeAvatar');
            console.log($('#avatar-input').val());
        },
        chooseMeme: function (side) {
            app.loading = true;
            console.log('app.loading = ', app.loading);
            
            if (side == 'left') {
                app.liked_id = app.leftMeme.meme_id;
                app.another_id = app.rightMeme.meme_id;
            } else {
                app.liked_id = app.rightMeme.meme_id;
                app.another_id = app.leftMeme.meme_id;
            }
            console.log("app.liked_id : ", app.liked_id);
            console.log("app.another_id : ", app.another_id);

            let data = {
                liked: app.liked_id,
                another: app.another_id
            };
            $.ajax({
                type: 'post',
                url: '/memes/choose/',
                data: data,
                xhrFields: {
                    withCredentials: false
                },
                // headers: {},
                success: function (response) {
                    if (response.status == "success") {
                        app.getMemes();
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
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
        getMemes: function () {
            axios.get('/memes/current/')
                .then((response) => {
                    console.log('data : ', response.data);
                    app.leftMeme = response.data.left;
                    app.rightMeme = response.data.right;

                    app.loading = false;
                    console.log('app.loading = ', app.loading);
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