function search() {
  var button = document.getElementsByClassName("button")[0];
  if (button.getElementsByTagName("span")[0].style.display !== "none") {
    document.getElementById("result").style.maxHeight = '0';
    var start = new Date().getTime();
    var xhttp = new XMLHttpRequest();
    button.getElementsByTagName("span")[0].style.display = "none";
    button.getElementsByTagName("div")[0].style.display = "inline-block";
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        setTimeout(function() {
          var pushes = JSON.parse(xhttp.responseText);

          if(pushes.error != null) {
            console.log(pushes.error);
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

function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}
