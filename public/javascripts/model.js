var app = new Vue({
    el: '#app',
    data: {
        showSidebar: false,
    },
    methods: {
        chooseMeme: function (event) {
            console.log($(event.currentTarget).attr('param_id'));
            console.log('need to change memes and push info to db');
        }
    },
    created: function () {
        console.log('created');
        $('.special.cards .image').dimmer({
            on: 'hover'
        });
    }
});