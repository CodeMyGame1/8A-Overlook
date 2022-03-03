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

async function displayMatchingVersions(startables) {
  let res = await fetch('/js/updatelog.json');
  res = await res.json();

  var update = $('#update_log'); // the container for this madness that we will push to eventually
  update.empty();
  var item = "";
  var version = "";
  var button = "";
  var desc = "";
  var accord_body = "";
  var list_groups = "";
  var minor_list = "";
  var ul = "";
  for (const [ver, info] of Object.entries(res)) {
    if (ver.split("-").reduce((num_list, word) => { num_list.push(numberWord("returnNum", word)); return num_list }, []).join(".").startsWith(startables)) {
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
      
      accord_body.append(list_groups);
      desc.append(accord_body);
      item.append(desc);
      update.append(item);
    }
  }
}

$(document).ready(async function() {
  try {
    //$('[name="versionChoose"] [name="versionSelector"]').keyup(function() {
    //  var startables = $('[name="versionChoose"] [name="versionSelector"]').val();
    $('#versionSelector').keyup(function() {
      var startables = $('#versionSelector').val()
      displayMatchingVersions(startables);
    });
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