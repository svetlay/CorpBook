(function (global) {
    var LoginViewModel,
        app = global.app = global.app || {};

    LoginViewModel = kendo.data.ObservableObject.extend({
        isLoggedIn: false,
        username: "",

        onLogin: function () {
            var that = this,
                username = that.get("username").trim();
            
            if (username === "") {
                navigator.notification.alert("Email is required!",
                    function () { }, "Login failed", 'OK');

                return;
            }
            app.application.showLoading();

            var filter = { 'Email': username};
            var empData = app.el.data('Employee');
            empData.get(filter).then(
                function(data){
                     app.application.hideLoading();
                    if(data.count === 0)
                    {
                         navigator.notification.alert("Invalid credential.!",
                        function () { }, "Login failed", 'OK');
                        return;
                    }
                    localStorage["CorpBook.User"] = username;
                    localStorage["CorpBook.User.Id"] = data.result[0].Id;
                    app.application.navigate("Views/profile.html")
                    that.set("isLoggedIn", true);
                },
                function(error)
                {
                  app.application.hideLoading();
                    navigator.notification.alert("Invalid credential.!",
                    function () { }, "Login failed", 'OK');

                }
            );
            
            
        },

        onLogout: function () {
            var that = this;

            that.clearForm();
            that.set("isLoggedIn", false);
        },

        clearForm: function () {
            var that = this;

            that.set("username", "");
            that.set("password", "");
        },

        checkEnter: function (e) {
            var that = this;

            if (e.keyCode == 13) {
                $(e.target).blur();
                that.onLogin();
            }
        }
    });

    app.loginService = {
        viewModel: new LoginViewModel()
    };
})(window);