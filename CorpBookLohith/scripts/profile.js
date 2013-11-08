function profileInit(e) {
    var loggedUser = localStorage["CorpBook.User"];

    var filter = { 'Email': loggedUser};
    
    var data = app.el.data('Employee');
    var loggedUserPic,loggedUserView;
   
    var loggedTemplate = new kendo.template($("#profileTemplate").html());
    data.get(filter)
    .then(function(data) {
        localStorage["CorpBook.User.GamerScore"] = data.result[0].GamerScore;
        loggedUserView = loggedTemplate(data.result[0]);
        $("#loggedUserDetails").html(loggedUserView);
        loggedUserPic = app.el.Files.getDownloadUrl(data.result[0].PictureFile);
        console.log(loggedUserPic);
        $("#userPicture").attr("src", loggedUserPic);
    }, 
  
          function(error) {
              console.log(JSON.stringify(error));
          });
}

function capturePhoto() {
    alert("The photo has been taken");
    navigator.camera.getPicture(onPhotoDataSuccess, function(message) {
    // Show a helpful message
}, 
    {
        quality: 50,
        destinationType: destinationType.DATA_URL,
        sourceType: 1
    });
    
}

function onPhotoDataSuccess(imageData) {
    var smallImage = document.getElementById('userPicture'); 
    smallImage.src = "data:image/jpeg;base64," + imageData;
}
