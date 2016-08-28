function search() {
  document.getElementById("result").style.maxHeight = '0';
  var start = new Date().getTime();
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      setTimeout(function() {
        var pushes = JSON.parse(xhttp.responseText);
        document.getElementById("result").innerHTML = '<table></table>';
        var table = document.getElementsByTagName("table")[0];
        pushes.forEach(function(entry) {
            var row = table.insertRow();

            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);

            cell1.innerHTML = entry.url;
            cell2.innerHTML = entry.etag;
            cell3.innerHTML = entry.step;
        });

        document.getElementById("result").style.maxHeight = '400px';
      }, 1000 - (new Date().getTime() - start));
    };

    }

  xhttp.open("GET", "https://api.http2-push.io/?url=" + document.getElementById('website').value, true);
  xhttp.send();
}
