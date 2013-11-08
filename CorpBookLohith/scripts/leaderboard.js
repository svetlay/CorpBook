
function leaderBoardInit()
{
    console.log("hello");
  var leadersBoardDataSource = new kendo.data.DataSource({
                                 type: 'everlive',
                             transport: {
                             typeName: 'Employee'
                             },
                             schema: {
                             model: { id: Everlive.idField }
                             },
                              sort: { field: "GamerScore", dir: "desc" }
                             
                            });
    
  leadersBoardDataSource.fetch();
  console.log(leadersBoardDataSource);
  var leaderBoardTemplate =  new kendo.template($("#leaderboardtemplate").text());
  $("#leaderboardlistview").kendoMobileListView({
     dataSource: leadersBoardDataSource,
     template: leaderBoardTemplate
 });
  
};
