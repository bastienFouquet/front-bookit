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
        baseApiURL: function () {
            return 'http://localhost:8081';
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
