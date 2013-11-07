function profileInit(e)
{
    var loggedUser = localStorage["CorpBook.User"];

    
    var filter = { 'Email': loggedUser};
    
    var data = app.el.data('Employee');
    
    data.get(filter)
        .then(function(data){
            console.log(JSON.stringify(data));
        },
        function(error){
            console.log(JSON.stringify(error));
        });
}