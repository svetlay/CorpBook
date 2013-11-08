var quizDataSource = null;

var questionTypes = [
    {id:1,type:"name",question:"WHO IS THIS PERSON?"},
    {id:1,type:"role",question:"WHAT IS THIS PERSONS ROLE?"},
    {id:1,type:"office",question:"WHERE DOES THIS PERSON WORK?",}
]

var currentQuestion = null;

var QuestionModel = function(qType, emp, opt1, opt2, opt3)
{
    this.Type = qType;
    this.Employee = emp;
    this.Option1 = opt1;
    this.Option2 = opt2;
    this.Option3 = opt3;
    this.answered = false;
    this.Evaluate = function(selected)
    {
        if(this.Type.type === "name" )
        {
            if(selected === this.Employee.FirstName + " " + this.Employee.LastName)
            {
                return true;
            }
            return false;
        }
        
        if(this.Type.type === "role" )
        {
            if(selected === this.Employee.Role)
            {
                return true;
            }
            return false;
        }
        if(this.Type.type === "office" )
        {
            if(selected === this.Employee.Office)
            {
                return true;
            }
            return false;
        }
        
    }
}

function OnQuizViewInit()
{
    app.application.showLoading();
    var data = app.el.data('Employee');
    var query =  new Everlive.Query();
    query.order('FirstName');
    data.get(query)
        .then(function(data){
            app.application.hideLoading();
            quizDataSource = data.result;
            ShowQuestion();
        },
        function(error){
            alert(JSON.stringify(error));
        });
}


var currentQuestion = null;

function GetRandomQuestionType(){
    var randomQType  = Math.ceil( Math.random()*3)-1;
    return questionTypes[randomQType];    
}

function GetRandomEmployee(){
    var randomEmp = Math.ceil(Math.random()*quizDataSource.length)-1;
    return quizDataSource[randomEmp];    
}
var employeeEmail;
function ShowQuestion()
{
    
    var questionTemplate = new kendo.template($("#questionTemplate").html());
    var questionType = GetRandomQuestionType();    
    
    var employee = GetRandomEmployee();
    employeeEmail = employee.Email;
    var employee1 = GetRandomEmployee();
    var employee2 = GetRandomEmployee();
    var opt1 = "", opt2 = "", opt3 = "";
    if(questionType.type === "name")
    {
        opt1 = employee1.FirstName + " " + employee1.LastName;
        opt2 = employee.FirstName + " " + employee.LastName;
        opt3 = employee2.FirstName + " " + employee2.LastName;
    }
    else if(questionType.type === "role")
    {
        opt1 = employee1.Role;
        opt2 = employee.Role;
        opt3 = employee2.Role;
    }
    else 
    {
        opt1 = employee1.Office;
        opt2 = employee.Office;
        opt3 = employee2.Office;
    }
    currentQuestion = new QuestionModel(questionType,employee,opt1, opt2, opt3);
    var output = questionTemplate(currentQuestion);
    $("#questionpanel").html(output);
    kendo.init($("#questionpanel"),kendo.mobile.ui);
}
function SendFlagEmail ()
{

    console.log(employeeEmail);
    
    var recipients = {
    "Recipients": [
        employeeEmail
        ],
    "Context":{
        "SpecialOffer":"Free popcorn for a year"
    }
};

$.ajax({
    type: "POST",
    url: 'http://api.everlive.com/v1/Metadata/Applications/VjJXja95aNJmqz0M/EmailTemplates/352737e0-4890-11e3-b9be-c76c12ebd876/send',
    contentType: "application/json",
    headers: { "Authorization" : "Accountkey 9lITIOSh8RCK8Wi07L7p01vxg049av3Pe5wQATeifSElxpP1" },
    data: JSON.stringify(recipients),
    success: function(data){
        alert("Email successfully sent.");
    },
    error: function(error){
        alert(JSON.stringify(error));
    }
});

  
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
   
};
    
 
    
    
    
    
    
function OnAnswerClick()
{
    if(currentQuestion.answered)
    {
         $("#message").css("background-color","orange");
        $("#message").text("Question Answered. Click Next!");   
        return;
    }
    currentQuestion.answered = true;
    
    var userAnswer = this.wrapper[0].attributes["data-answer"].nodeValue;
    var gamerScore = parseInt(localStorage["CorpBook.User.GamerScore"],10);
    var isAnswerCorrect = false;
    if(currentQuestion.Evaluate(userAnswer))
    {
        isAnswerCorrect = true;
        console.log("correct");
        $("#message").css("background-color","green");
        $("#message").text("Correct !!!");
        localStorage["CorpBook.User.GamerScore"] = ++gamerScore;
        
        
        
        
    }
    else
    {
        console.log("wrong");
        $("#message").css("background-color","red");
        $("#message").text("Wrong !!!");
        localStorage["CorpBook.User.GamerScore"] = --gamerScore;
    }
    app.el.data('Employee').updateSingle({ Id: localStorage["CorpBook.User.Id"], 'GamerScore': gamerScore },
                                        function(data){
                                            
                                            console.log("recognition");
                                            var filter = { 'Id': currentQuestion.Employee.Id};
                                            app.el.data('Employee').get(filter)
                                                                    .then(function(empdata){
                                                                        
                                                                        var rPlus = empdata.result[0].RecognitionPlus;
                                                                        var rMinus = empdata.result[0].Recognitionminus;
                                                                        if(isAnswerCorrect)
                                                                        {
                                                                            ++rPlus;
                                                                        }
                                                                        else
                                                                        {
                                                                            --rPlus;
                                                                        }
                                                                        
                                                                        
                                                                        app.el.data("Employee").update(
                                                                                    { 'RecognitionPlus': rPlus, 'Recognitionminus': rMinus }, // data
                                                                                    { Id : currentQuestion.Employee.Id }, // filter
                                                                        
                                                                                    function(upddata){
                                                                                        console.log((upddata));
                                                                                    },
                                                                                    function(error){
                                                                                        alert(JSON.stringify(error));
                                                                                    } );
                                                                        
                                                                        
                                                                    },
                                                                    function(error){
                                                                        alert(JSON.stringify(error));
                                                                    });
                                            
                                            
                                        },
                                        function(error){
                                            alert(JSON.stringify(error));
                                        } );
    
}