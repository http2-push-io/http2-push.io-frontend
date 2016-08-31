function search() {
  var button = document.getElementsByClassName("button")[0];
  if (document.getElementById('website').value.substr(0, 8) !== "https://") {
    if (document.getElementById('website').value.substr(0, 7) !== "http://") {
      var errorDiv = document.getElementsByClassName("error")[0];
      errorDiv.getElementsByTagName("p")[0].innerHTML = "Error: URL is not using the HTTPS protocol";
      errorDiv.style.display = "block";
      button.getElementsByTagName("span")[0].style.display = "inline";
      button.getElementsByTagName("div")[0].style.display = "none";
    }
    else {
      console.log("werks");
      document.getElementById('website').value = "https://" + document.getElementById('website').value;
      search();
    }
  }
  if (button.getElementsByTagName("span")[0].style.display !== "none") {
    document.getElementById("result").style.maxHeight = '0';
    document.getElementsByClassName("error")[0].style.display = "none";;
    var start = new Date().getTime();
    var xhttp = new XMLHttpRequest();
    button.getElementsByTagName("span")[0].style.display = "none";
    button.getElementsByTagName("div")[0].style.display = "inline-block";
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        setTimeout(function() {
          var pushes = JSON.parse(xhttp.responseText);

          if(pushes.error != null) {
            var errorDiv = document.getElementsByClassName("error")[0];
            errorDiv.getElementsByTagName("p")[0].innerHTML = "Error: " + pushes.error;
            errorDiv.style.display = "block";
            button.getElementsByTagName("span")[0].style.display = "inline";
            button.getElementsByTagName("div")[0].style.display = "none";
          } else {
            document.getElementById("result").innerHTML = '<table></table>';
            var table = document.getElementsByTagName("table")[0];

            var header = table.createTHead();
            var hRow = header.insertRow(0);
            var hCell1 = hRow.insertCell(0);
            var hCell2 = hRow.insertCell(1);
            var hCell3 = hRow.insertCell(2);
            hCell1.innerHTML = "Path";
            hCell2.innerHTML = "Hash";
            hCell3.innerHTML = "Status";
            var body = table.createTBody();

            pushes.forEach(function(entry) {
                var row = body.insertRow();

                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);

                cell1.innerHTML = entry.url;
                cell2.innerHTML = entry.etag;
                cell3.innerHTML = entry.step;
            });

            document.getElementById("result").style.maxHeight = '400px';

            button.getElementsByTagName("span")[0].style.display = "inline";
            button.getElementsByTagName("div")[0].style.display = "none";
          }
        }, 1000 - (new Date().getTime() - start));
      }
    }
    xhttp.open("GET", "https://api.http2-push.io/?url=" + document.getElementById('website').value, true);
    xhttp.send();
  }
}

function keySearch(event) {
   if (event.keyCode == 13) {
     search();
   }
}
