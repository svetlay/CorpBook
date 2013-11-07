function profileInit(e)
{
    var loggedUser = localStorage["CorpBook.User"];

    var filter = { 'Email': loggedUser};
    
    var data = app.el.data('Employee');
    var loggedUserPic,loggedUserView;
        var loggedTemplate = new kendo.template($("#profileTemplate").html());
    data.get(filter)
        .then(function(data){
            console.log(JSON.stringify(data));
            loggedUserView = loggedTemplate(data.result[0]);
            loggedUserPic = app.el.Files.getDownloadUrl(data.result[0].PictureFile);
        },
        function(error){
            console.log(JSON.stringify(error));
        });
    


    $("#loggedUserDetails").html(loggedUserView);
}