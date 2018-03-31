function search() {
  var button = document.getElementsByClassName("button")[0];
  if (document.getElementById('website').value.substr(0, 8) !== "https://") {
    if (document.getElementById('website').value.substr(0, 7) === "http://") {
      var errorDiv = document.getElementsByClassName("error")[0];
      errorDiv.getElementsByTagName("p")[0].innerHTML = "Error: URL is not using the HTTPS protocol";
      errorDiv.style.maxHeight = "100px";
      button.getElementsByTagName("span")[0].style.display = "inline";
      button.getElementsByTagName("div")[0].style.display = "none";
    } else if (document.getElementById('website').value == "") {
      document.getElementById('website').value = "https://http2-push.io/";
      search();
    } else {
      document.getElementById('website').value = "https://" + document.getElementById('website').value;
      search();
    }
  } else {
    if (button.getElementsByTagName("span")[0].style.display !== "none") {
      document.getElementById("result").style.maxHeight = '0';
      document.getElementsByClassName("error")[0].style.maxHeight = "0";
      var start = new Date().getTime();
      var xhttp = new XMLHttpRequest();
      button.getElementsByTagName("span")[0].style.display = "none";
      button.getElementsByTagName("div")[0].style.display = "inline-block";
      xhttp.onreadystatechange = function() {
        if (true) {
          setTimeout(function() {
            var errorDiv = document.getElementsByClassName("error")[0];
            if(xhttp.status == 500) {
              errorDiv.getElementsByTagName("p")[0].innerHTML = "Error";
              errorDiv.style.maxHeight = "100px";
              button.getElementsByTagName("span")[0].style.display = "inline";
              button.getElementsByTagName("div")[0].style.display = "none";
              return;
            }
            var pushes = JSON.parse(xhttp.responseText);
            if(pushes.length == 0) {
              errorDiv.getElementsByTagName("p")[0].innerHTML = "Error: No pushes found";
              errorDiv.style.maxHeight = "100px";
              button.getElementsByTagName("span")[0].style.display = "inline";
              button.getElementsByTagName("div")[0].style.display = "none";
            } else {
              document.getElementById("result").innerHTML = '<div class="table table-gen">\
              					<div class="table-head table-gen">\
              						<div class="table-data">I found these pushed paths:</div>\
              					</div>\
              					<div class="table-body table-gen">\
                                </div>\
                            </div>';
              var content = document.getElementsByClassName("table-body")[0];


              pushes.forEach(function(entry) {
                  content.innerHTML += ' 						<div class="table-row table-gen">\
                  							<div class="table-data">' + entry + '</div>\
                  						</div>'
              });

              document.getElementById("result").style.maxHeight = '400px';

              button.getElementsByTagName("span")[0].style.display = "inline";
              button.getElementsByTagName("div")[0].style.display = "none";
            }
          }, 1000 - (new Date().getTime() - start));
        }
      }
      xhttp.open("GET", "https://cors-anywhere.herokuapp.com/https://http2-push-api.appspot.com/?url=" + document.getElementById('website').value, true);
      xhttp.send();
    }
  }
}

function keySearch(event) {
   if (event.keyCode == 13) {
     search();
   }
}
