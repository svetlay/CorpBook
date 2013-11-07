(function (global) {
    var mobileSkin = "",
        app = global.app = global.app || {},
        os = kendo.support.mobileOS,
        statusBarStyle = os.ios && os.flatVersion >= 700 ? "black-translucent" : "black";

    document.addEventListener('deviceready', function () {
        navigator.splashscreen.hide();
    }, false);
    
    app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout", statusBarStyle: statusBarStyle, skin : "flat",initial:"Views/profile.html" });

    var applicationSettings = {
        emptyGuid: '00000000-0000-0000-0000-000000000000',
        apiKey: 'VjJXja95aNJmqz0M' // set your API Key here
    };
    
    localStorage["CorpBook.User"] = "Abhishek.Kant@telerik.com";
    
    // initialize Everlive SDK
    app.el = new Everlive({
        apiKey: applicationSettings.apiKey
    });
    
    /*var filter = app.el.Query();
    filter.where().eq('${Email}':'Abhishek.Kant@telerik.com');
    */
    
    
        
    
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