var app = new Vue({
    el: '#app',
    data: {
        showSidebar: false,
    },
    methods: {
        changeSidebarState: function() {
            console.log('changeSidebarState'); 
            this.showSidebar = !this.showSidebar;
            $('.ui.sidebar').sidebar('toggle');
        }
    }
});