(function (global) {
    var mobileSkin = "",
        app = global.app = global.app || {},
        os = kendo.support.mobileOS,
        statusBarStyle = os.ios && os.flatVersion >= 700 ? "black-translucent" : "black";

    document.addEventListener('deviceready', function () {
        navigator.splashscreen.hide();
    }, false);
    
    var userCred = localStorage["CorpBook.User"];
    
    var initialView ="Views/profile.html";
    
    if(userCred === undefined)
    {
        initialView = "Views/login.html";    
    }
    
    app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout", statusBarStyle: statusBarStyle, skin : "flat",initial:initialView });
    
    app.changeSkin = function (e) {
        if (e.sender.element.text() === "Flat") {
            e.sender.element.text("Native");
            mobileSkin = "flat";
        }
        else {
            e.sender.element.text("Flat");
            mobileSkin = "";
        }

        app.application.skin(mobileSkin);
    };
})(window);