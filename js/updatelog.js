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
    for (const [ver, info] of Object.entries(res)) {
      item = $('<div class="accordion-item"></div>');
      version = $(`<h2 class="accordion-header" id="${ver}-target"></h2>`);
      button = $(`<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${ver}" aria-expanded="false" aria-controls="${ver}"></button>`);
      desc = $(`<div id="${ver}" class="accordion-collapse collapse" aria-labelledby="#${ver}-target" data-bs-parent="#update_log"></div>`);
      accord_body = $('<div id="accordion-body"></div>');
      list_groups = $('<div id="list-groups"></div>');
      
      button.text(`${ver} (${info["date"]})`);
      
      version.append(button);
      item.append(version);

      for (thingy of info["desc"]) {
        list_groups.append($(`<li class="list-group-item list-group-item-action">${thingy}</li>`));
      }

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