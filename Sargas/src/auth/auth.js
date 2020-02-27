class Auth {
    constructor() {
        this.authenticated = localStorage.getItem("isAuthenticated")==='true';
    }

    login(cb) {
        this.authenticated = true;
        localStorage.setItem("isAuthenticated", true);
        cb();
    }

    logout(cb) {
        this.authenticated = false;
        localStorage.setItem("isAuthenticated", false);
        cb();
    }
    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth()