import Vue from 'vue'

export default Vue.mixin({
    data: function () {
        return {
            token: null,
            user: null
        }
    },
    watch: {
        token: 'setToken',
        user: 'setUser'
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
            if (localStorage.user) {
                this.user = JSON.parse(localStorage.user)
            }
        },
        setToken: function () {
            localStorage.setItem('token', this.token)
        },
        setUser: function () {
            localStorage.setItem('user', JSON.stringify(this.user))
        }
    }
})
