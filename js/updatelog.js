function numberWord(mode, text) {
  var numToWord = {"1": "one", "2": "two", "3": "three", "4": "four", "5": "five", "6": "six", "7": "seven", "8": "eight", "9": "nine", "10": "ten"};
 
  var wordToNum = Object.entries(numToWord).reduce((dict, keyvalue) => { dict[keyvalue[1]] = keyvalue[0]; return dict }, {}); // essentially numToWord but in reverse

  text = text.toString()
  
  if (mode == "returnWord") {
    return numToWord[text];
  } else if (mode == "returnNum") {
    return wordToNum[text];
  }
}

$(document).ready(async function() {
  try {
    let res = await fetch('/js/updatelog.json');
    res = await res.json();

    var update = $('#update_log'); // the container for this madness that we will push to eventually
    var item = "";
    var version = "";
    var button = "";
    var desc = "";
    var accord_body = "";
    var list_groups = "";
    var minor_list = "";
    var ul = "";
    for (const [ver, info] of Object.entries(res)) {
      item = $('<div class="accordion-item"></div>');
      version = $(`<h2 class="accordion-header" id="${ver}-target"></h2>`);
      button = $(`<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${ver}" aria-expanded="false" aria-controls="${ver}"></button>`);
      desc = $(`<div id="${ver}" class="accordion-collapse collapse" aria-labelledby="#${ver}-target" data-bs-parent="#update_log"></div>`);
      accord_body = $('<div id="accordion-body"></div>');
      list_groups = $('<div id="list-groups"></div>');
      
      if (info["date"]) {
        button.text(`${ver.split("-").reduce((num_list, word) => { num_list.push(numberWord("returnNum", word)); return num_list }, []).join(".")} (${info["date"]})`);
      } else if (!info["date"]) {
        button.text(`${ver.split("-").reduce((num_list, word) => { num_list.push(numberWord("returnNum", word)); return num_list }, []).join(".")}`);
      }
        
      version.append(button);
      item.append(version);
      
      for (let thingy of info["desc"]) {
        list_groups.append($(`<li class="list-group-item list-group-item-action">${thingy}</li>`));
      }

      if (info["minor_vers"]) {
        for (const [ver_name, minor_ver] of Object.entries(info["minor_vers"])) {
          minor_list = $('<li class="list-group-item list-group-item-action"></li>');
          ul = $('<div id="list-groups"></div>');

          if (minor_ver["date"]) {
            minor_list.append($(`<span><strong>${ver_name.split("-").reduce((num_list, word) => { num_list.push(numberWord("returnNum", word)); return num_list }, []).join(".")}</strong> (${minor_ver["date"]})</span>`));
          } else if (!minor_ver["date"]) {
            minor_list.append($(`<span>${ver_name.split("-").reduce((num_list, word) => { num_list.push(numberWord("returnNum", word)); return num_list }, []).join(".")}</span>`));
          }
          
          for (let thingy2 of minor_ver["desc"]) {
            ul.append($(`<li class="list-group-item list-group-item-action">${thingy2}</li>`));
          }
          
          minor_list.append(ul);
          list_groups.append(minor_list);
        }
        minor_list = "";
      }
      
      /*if (info["minor_vers"]) {
        for (const [ver_name, minor_ver] of Object.entries(info["minor_vers"])) {
          minor_list = $('<li class="list-group-item list-group-item-action"></li>');
          ul = $('<ul></ul>');

          for (let thingy2 of minor_ver["desc"]) {
            ul.append($(`<li class="list-group-item list-group-item-action">${thingy2}</li>`));
          }

          minor_list.append(ul);
          //...
          if (minor_ver["date"]) {
            minor_list.text(`${ver.split("-").reduce((num_list, word) => { num_list.push(numberWord("returnNum", word)); return num_list }, []).join(".")} ${minor_ver["date"]}`);
          } else (!minor_ver["date"]) {
            minor_list.text(`${ver.split("-").reduce((num_list, word) => { num_list.push(numberWord("returnNum", word)); return num_list }, []).join(".")}`);
          }
        }
      }*/

      accord_body.append(list_groups);
      desc.append(accord_body);
      item.append(desc);
      update.append(item);
    }
  } catch (e) {
    if (e instanceof SyntaxError) {
      alert("Pranesh must've broken something again... pls tell him the JSON file syntax is probably off");
      alert(`Try to understand the following error. If not, just go ask Pranesh and he'll fix it after 10 minutes. Error: ${e}`)
      window.location.replace('index.html');
    } else {
      alert("some new foreign error that's not supposed to happen occured");
      alert(e);
    }
  }
});
/*
<div class="accordion" id="update_log" style="padding: 0% 25% 0% 25%">
      <!--v1.1.5-->
      <div class="accordion-item">
        <h2 class="accordion-header" id="#v1-1-6-target">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#v1-1-6" aria-expanded="false" aria-controls="v1-1-6">
            v1.1.6 (2/28/2022)
          </button>
        </h2>
        <div id="v1-1-6" class="accordion-collapse collapse" aria-labelledby="#v1-1-6-target" data-bs-parent="#update_log">
          <div class="accordion-body">
            <div class="list-groups">
              <li class="list-group-item list-group-item-action"><a href="binder.html">Homework</a> updated</li>
              <li class="list-group-item list-group-item-action">Change <a href="binder.html">homework</a> to be updated via JSON</li>        
            </div>
          </div>
        </div>
      </div>
      
      <!--v1.1.5-->
      <div class="accordion-item">
        <h2 class="accordion-header" id="#v1-1-5-target">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#v1-1-5" aria-expanded="false" aria-controls="v1-1-5">
            v1.1.5 (2/23/2022)
          </button>
        </h2>
        <div id="v1-1-5" class="accordion-collapse collapse" aria-labelledby="#v1-1-5-target" data-bs-parent="#update_log">
          <div class="accordion-body">
            <div class="list-groups">
              <li class="list-group-item list-group-item-action"><a href="binder.html">Homework</a> updated <strong>(PRELIMINARY)</strong></li>
              <li class="list-group-item list-group-item-action">Spiced up <a href="updatelog.html">update log</a> page </li>              
            </div>
          </div>
        </div>
      </div>
      
      <!--v1.1.4-->
      <div class="accordion-item">
        <h2 class="accordion-header" id="#v1-1-4-target">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#v1-1-4" aria-expanded="false" aria-controls="v1-1-4">
            v1.1.4
          </button>
        </h2>
        <div id="v1-1-4" class="accordion-collapse collapse" aria-labelledby="#v1-1-4-target" data-bs-parent="#update_log">
          <div class="accordion-body">
            <div class="list-groups">
              <li class="list-group-item list-group-item-action"><a href="binder.html">Homework</a> updated</li>
              <li class="list-group-item list-group-item-action">New icon for <a href="status.html">Status</a> page</li> 
              <li class="list-group-item list-group-item-action"><a href="about.html">About Us</a> page small revamp</li>
              <li class="list-group-item list-group-item-action">New icon for <a href="about.html">About Us</a> page</li>
            </div>
          </div>
        </div>
      </div>

      <!--v1.1.3-->
      <div class="accordion-item">
        <h2 class="accordion-header" id="#v1-1-3-target">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#v1-1-3" aria-expanded="false" aria-controls="v1-1-3">
            v1.1.3
          </button>
        </h2>
        <div id="v1-1-3" class="accordion-collapse collapse" aria-labelledby="#v1-1-3-target" data-bs-parent="#update_log">
          <div class="accordion-body">
            <div class="list-groups">
              <li class="list-group-item list-group-item-action"><a href="homework.html">Homework</a> updated</li>
              <li class="list-group-item list-group-item-action">Typos corrected</li>
              <li class="list-group-item list-group-item-action">Color revamp</li>
              <li class="list-group-item list-group-item-action">New animated icon</li>
              <li class="list-group-item list-group-item-action">New <a href="status.html">status</a> page</li>
            </div>
          </div>
        </div>
      </div>

      <!--v1.1.2-->
      <div class="accordion-item">
        <h2 class="accordion-header" id="#v1-1-2-target">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#v1-1-2" aria-expanded="false" aria-controls="v1-1-2">
            v1.1.2
          </button>
        </h2>
        <div id="v1-1-2" class="accordion-collapse collapse" aria-labelledby="#v1-1-2-target" data-bs-parent="#update_log">
          <div class="accordion-body">
            <div class="list-groups">
              <li class="list-group-item list-group-item-action"><a href="binder.html">Homework</a> updated</li>
            </div>
          </div>
        </div>
      </div>

      <!--v1.1.1-->
      <div class="accordion-item">
        <h2 class="accordion-header" id="#v1-1-1-target">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#v1-1-1" aria-expanded="false" aria-controls="v1-1-1">
            v1.1.1
          </button>
        </h2>
        <div id="v1-1-1" class="accordion-collapse collapse" aria-labelledby="#v1-1-1-target" data-bs-parent="#update_log">
          <div class="accordion-body">
            <div class="list-groups">
              <li class="list-group-item list-group-item-action"><a href="forms.html">Forms</a> and <a href="news.html">news</a> coming soon</li>
              <li class="list-group-item list-group-item-action"><a href="binder.html">Binder</a> glitch fixed</li>
              <li class="list-group-item list-group-item-action">New <a href="about.html">About Us</a> page</li>
            </div>
          </div>
        </div>
      </div>
    </div>
*/