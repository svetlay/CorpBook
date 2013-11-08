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

function ShowQuestion()
{
    
    var questionTemplate = new kendo.template($("#questionTemplate").html());
    var questionType = GetRandomQuestionType();    
    
    var employee = GetRandomEmployee();
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

function OnAnswerClick()
{
    var userAnswer = this.wrapper[0].attributes["data-answer"].nodeValue;
    
    var qType = currentQuestion.Type;
    
    var question = "";
    
    if(qType.type === "name")
    {
        question = currentQuestion.Employee.FirstName + " " + currentQuestion.Employee.LastName;
    }
    else if(qType.type === "role")
    {
        question = currentQuestion.Employee.Role;
    }
    else
    {
        question = currentQuestion.Employee.Office;
    }
    console.log("question : " + question)
    console.log("answer : " + userAnswer)
    
    if(question === userAnswer)
    {
        console.log("correct");
        $("#message").css("background-color","green");
        $("#message").text("Correct !!!");
    }
    else
    {
        console.log("wrong");
        $("#message").css("background-color","red");
        $("#message").text("Wrong !!!");
    }
    
    
}