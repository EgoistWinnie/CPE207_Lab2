let firebaseConfig = {
    apiKey: "AIzaSyBrU1qR7g3W37Xp49dLd9-I_tRG94Doz_I",
    authDomain: "localhost",
    projectId: "feel-special-a7ab1",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

function validateEmail(email) {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  }

$("#sendForm").click(()=>{
    document.getElementById("form1").className="form-group";
    document.getElementById("form2").className="form-group";
    document.getElementById("form3").className="form-group";
    document.getElementById("form4").className="form-group";
    document.getElementById("error1").style.display="none";
    document.getElementById("error2").style.display="none";
    document.getElementById("error3").style.display="none";
    document.getElementById("error4").style.display="none";
    
    if($('#InputName').val()!='' && validateEmail($('#InputEmail').val())
        && $("input[name=gender]").is(":checked") && $.trim($('#ta').val()) != ''){
        db.collection("users")
        .add({
            Name: $('#InputName').val(),
            Email: $('#InputEmail').val(),
            Gender: $("input[name='gender']:checked").val(),
            Detail: $('.textarea').val(),
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            $('#InputName').val('')
            $('#InputEmail').val('')
            document.getElementById("gender1").checked = false;
            document.getElementById("gender2").checked = false;
            document.getElementById("gender3").checked = false;
            $('.textarea').val('')
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
    else{
        if($('#InputName').val()==''){
            document.getElementById("form1").className="form-group has-error";
            document.getElementById("error1").style.display="inline";
        }
        if(!validateEmail($('#InputEmail').val())){
            document.getElementById("form2").className="form-group has-error";
            document.getElementById("error2").style.display="inline";
        }
        if(!$("input[name=gender]").is(":checked")){
            document.getElementById("form3").className="form-group has-error";
            document.getElementById("error3").style.display="inline";
        }
        if($.trim($('#ta').val()) == ''){
            document.getElementById("form4").className="form-group has-error";
            document.getElementById("error4").style.display="inline";
        }
    }
});

$("#resetForm").click(()=>{
    $('#InputName').val('')
    $('#InputEmail').val('')
    document.getElementById("gender1").checked = false;
    document.getElementById("gender2").checked = false;
    document.getElementById("gender3").checked = false;
    $('.textarea').val('')

    document.getElementById("form1").className="form-group";
    document.getElementById("form2").className="form-group";
    document.getElementById("form3").className="form-group";
    document.getElementById("form4").className="form-group";

    document.getElementById("error1").style.display="none";
    document.getElementById("error2").style.display="none";
    document.getElementById("error3").style.display="none";
    document.getElementById("error4").style.display="none";
});

db.collection('users').onSnapshot(doc => {
    let table = $('#follower')[0]
    $('#follower tr').remove()
    let man = 0;
    let woman = 0;
    let other = 0;
    doc.forEach(item => {
        if(item.data().Gender=="Male") man++;
        else if(item.data().Gender=="Female") woman++;
        else other++;

        let row = table.insertRow(-1)
        let firstCell = row.insertCell(0)
        let secondCell = row.insertCell(1)
        let thirdCell = row.insertCell(2)
        let fourthCell = row.insertCell(3)
        firstCell.textContent = item.data().Name
        secondCell.textContent = item.data().Gender
        let emailx = item.data().Email.replace(/^(.)(.*)(@.*)$/,
            (_, a, b, c) => a + b.replace(/./g, '*') + c);
        thirdCell.textContent = emailx;
        
    })

    let allgender = man+woman+other;
    if(allgender==0){
        $('#gg1').text(0);
        $('#gg2').text(0);
        $('#gg3').text(0);
    }
    else{
        $('#gg1').text(100*man/allgender + '%');
        $('#gg2').text(100*woman/allgender + '%');
        $('#gg3').text(100*other/allgender + '%');
    }

})