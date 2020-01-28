var rand = Math.floor(Math.random() * 100) + 1;
var numb = document.getElementById('num');
var tries = 1;

function gotMyNumber(event){
  event.preventDefault()
    if(isNaN(numb.value) || numb.value==''){
      document.getElementById('result').textContent = "Invalid number!!!";
    }
    else{
      check(numb.value);
      tries++;
    }
}

function check(num){
  if(num==rand){
    document.getElementById('result').textContent = "You Win!!";
    document.getElementById('howto').textContent = "";
    document.getElementById('num').disabled = true;
    document.querySelector('#sub').disabled = true;
    document.body.style.backgroundImage = "url('https://thumbs.gfycat.com/DeterminedFatalHornbill-size_restricted.gif')";
    let zim = new Audio('img/Zimzalabim.mp3');
    zim.play();
  }
  else{
    console.log(rand);
    if(tries===10){
      document.getElementById('result').textContent = "You lose!!"
      document.getElementById('num').disabled = true;
      document.querySelector('#sub').disabled = true;
    }
    else if(num<rand){
      document.getElementById('result').textContent = "Your number is too low!";
    }
    else if(num>rand){
      document.getElementById('result').textContent = "Your number is too high!";
    }
  }
  document.querySelector('#previousAnswer').textContent += ' ' + num;
}

function restart(){
    location.reload();
}