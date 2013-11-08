(function (global) {
        
    app = global.app = global.app || {};
    
    app.applicationSettings = {
        emptyGuid: '00000000-0000-0000-0000-000000000000',
        apiKey: 'VjJXja95aNJmqz0M' // set your API Key here
    };
    
     app.el = new Everlive({
        apiKey: app.applicationSettings.apiKey
    });
    
})(window)