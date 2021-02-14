import Vue from 'vue'

export default Vue.mixin({
    data: function () {
        return {
            token: null
        }
    },
    watch: {
        token: 'setToken'
    },
    created: function () {
        this.restoreToken();
    },
    methods: {
        usersApiURL: function () {
            return 'http://localhost:8081';
        },
        booksApiURL: function () {
            return 'http://localhost:8082';
        },
        getHeaders: function () {
            return {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': this.token
                }
            };
        },
        restoreToken: function () {
            if (localStorage.token) {
                this.token = localStorage.token
            }
        },
        setToken: function () {
            localStorage.setItem('token', this.token)
        }
    }
})
