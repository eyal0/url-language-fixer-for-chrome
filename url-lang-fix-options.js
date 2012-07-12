const CONVERT_PER_ROW = 6;

function save_options_click(e) {
  return(save_options());
}

// Saves options to localStorage.
function save_options(options) {
  if(options) {
    localStorage["options"] = JSON.stringify(options);
  } else {
    var options = {};
    options["translations"] = [];
    options["searches"] = [];
    
    //now read them from the page
    var translations_tbody = document.getElementById("translations_tbody");
    for(var translation_row_id = 0; translation_row_id < translations_tbody.children.length; translation_row_id++) {
      var translation_row = translations_tbody.children[translation_row_id];
      if(trueForAll(translation_row.getElementsByTagName("input"), false_or_empty) &&
         trueForAll(translation_row.getElementsByTagName("textarea"), false_or_empty))
        continue; //dont bother, nothing to save here
      var new_translation = {};
      new_translation.name = translation_row.children[0].children[0].value;
      new_translation.convert_table = {};
      trueForAll(translation_row.children[1].children[0].children[1].children,
                 function(tr) { for(var i = 0; i < tr.children.length; i+=2) {
                                    if(tr.children[i].children[0].value != "") {
                                      new_translation.convert_table[tr.children[i].children[0].value] = tr.children[i+1].children[0].value;
                                    }
                                  }
                                  return(true);
                                });
      new_translation.url_re = translation_row.children[2].children[0].value;
      new_translation.enabled = translation_row.children[3].children[0].checked;
      options["translations"][options["translations"].length] = new_translation;
    }
    
    var searches_tbody = document.getElementById("searches_tbody");
    for(var searches_row_id = 0; searches_row_id < searches_tbody.children.length; searches_row_id++) {
      var search_row = searches_tbody.children[searches_row_id];
      if(trueForAll(search_row.getElementsByTagName("input"), false_or_empty) &&
         trueForAll(search_row.getElementsByTagName("textarea"), false_or_empty))
        continue; //dont bother, nothing to save here
      var new_search = {};
      new_search.name = search_row.children[0].children[0].value;
      new_search.search_url_re = search_row.children[1].children[0].value;
      new_search.search_url_match_group = search_row.children[2].children[0].value;
      new_search.enabled = search_row.children[3].children[0].checked;
      options["searches"][options["searches"].length] = new_search;
    }
    localStorage["options"] = JSON.stringify(options);
  }
}

function trueForAll(l, f) {
  for(var index = 0; index < l.length; index++) {
    if(!f(l[index]))
      return(false);
  }
  return(true);
}

function getElementsByClass(searchClass,node,tag) {
  var classElements = new Array();
  node = node || document;
  tag = tag || '*';
  var els = node.getElementsByTagName(tag);
  var elsLen = els.length;
  var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
  for (i = 0, j = 0; i < elsLen; i++) {
    if ( pattern.test(els[i].className) ) {
      classElements[j] = els[i];
      j++;
    }
  }
  return classElements;
}

function false_or_empty(x) {
  if(x.type == "checkbox")
    return(!x.checked);
  else
    return(x.value == "");
}

function adjust_blanks() {
  //first add a blank translation if the last row is not empty
  var translations_tbody = document.getElementById("translations_tbody");
  if(translations_tbody.children.length == 0 ||
     !trueForAll(translations_tbody.lastChild.getElementsByTagName("input"), false_or_empty) ||
     !trueForAll(translations_tbody.lastChild.getElementsByTagName("textarea"), false_or_empty)) {
    add_translation(null, translations_tbody);
  }

  convert_tbodies = getElementsByClass("convert_tbody");
  for(var convert_tbody_id = 0; convert_tbody_id < convert_tbodies.length; convert_tbody_id++) {
    //round up the number of blanks per row
    for(var tr_index = 0; tr_index < convert_tbodies[convert_tbody_id].children.length; tr_index++) {
      while(convert_tbodies[convert_tbody_id].children[tr_index].children.length < CONVERT_PER_ROW*2) {
        var i0 = document.createElement("input");
        i0.type = "text";
        var td0 = document.createElement("td");
        td0.className = "fromto";
        td0.appendChild(i0);
        convert_tbodies[convert_tbody_id].children[tr_index].appendChild(td0);
      }
    }
    //now add a blank row to the end of the convert if the last row isn't empty or doesn't exist
    if(convert_tbodies[convert_tbody_id].children.length == 0 || 
       !trueForAll(convert_tbodies[convert_tbody_id].lastChild.getElementsByTagName("input"), false_or_empty) ||
       !trueForAll(convert_tbodies[convert_tbody_id].lastChild.getElementsByTagName("textarea"), false_or_empty)) {
      //add a row to the convert_table
      var current_row = document.createElement("tr");
      while(current_row.children.length < CONVERT_PER_ROW*2) {
        var i0 = document.createElement("input");
        i0.type = "text";
        var td0 = document.createElement("td");
        td0.className = "fromto";
        td0.appendChild(i0);
        current_row.appendChild(td0);
      }
      convert_tbodies[convert_tbody_id].appendChild(current_row);
    }
  }
  
  var searches_tbody = document.getElementById("searches_tbody");
  //now add a blank row to the end of the searches if the last row isn't empty or doesn't exist
  if(searches_tbody.children.length == 0 || 
     !trueForAll(searches_tbody.lastChild.getElementsByTagName("input"), false_or_empty) ||
     !trueForAll(searches_tbody.lastChild.getElementsByTagName("textarea"), false_or_empty)) {
    add_search(null, searches_tbody);
  }
  
  //finally, all inputs and textareas call this function onkeyup.
  trueForAll(document.getElementsByTagName("input"), function(x) {x.onkeyup = adjust_blanks; return true;});
  trueForAll(document.getElementsByTagName("textarea"), function(x) {x.onkeyup = adjust_blanks; return true;});
  var all_inputs = document.getElementsByTagName("input");
  for(var input_id = 0; input_id < all_inputs.length; input_id++) {
    all_inputs[input_id].onkeyup = adjust_blanks;
  }
}

//given a translation object, add to the object to a tbody
function add_translation(translation_object, translations_tbody) {
  translation_object = translation_object || {};
  var tr = document.createElement("tr");
  var td_name = document.createElement("td");
  td_name.innerHTML = '<input type="text" />';
  td_name.firstChild.value = translation_object["name"] || "";

  var td_convert_table = document.createElement("td");
  var convert_table = document.createElement("table");
  td_convert_table.appendChild(convert_table);
  convert_table.appendChild(document.createElement("thead"));
  convert_table.children[0].appendChild(document.createElement("tr"));
  for(var row_count=0; row_count < CONVERT_PER_ROW; row_count++) { //add thead elements
    var th0 = document.createElement("th");
    th0.innerHTML = "From";
    th0.className = "fromto";
    var th1 = document.createElement("th");
    th1.innerHTML = "To";
    th1.className = "fromto";
    convert_table.children[0].children[0].appendChild(th0);
    convert_table.children[0].children[0].appendChild(th1);
  }
  var tbody = document.createElement("tbody");
  tbody.className = "convert_tbody";
  convert_table.appendChild(tbody);
  var current_row;
  for(var key in translation_object["convert_table"] || {}) {  //add tbody elements
    if(!current_row) {
      current_row = document.createElement("tr");
    }

    var i0 = document.createElement("input");
    i0.type = "text";
    i0.value = key;
    var td0 = document.createElement("td");
    td0.className = "fromto";
    td0.appendChild(i0);
    
    var i1 = document.createElement("input");
    i1.type = "text";
    i1.value = translation_object["convert_table"][key];
    var td1 = document.createElement("td");
    td1.className = "fromto";
    td1.appendChild(i1);
    
    current_row.appendChild(td0);
    current_row.appendChild(td1);
    if(current_row.children.length >= CONVERT_PER_ROW*2) {
      tbody.appendChild(current_row);
      current_row = null;
    }
  }
  if(current_row)
    tbody.appendChild(current_row);

  var td_url_re = document.createElement("td");
  td_url_re.innerHTML = '<textarea />';
  td_url_re.firstChild.value = translation_object["url_re"] || "";
  
  var td_enabled = document.createElement("td");
  td_enabled.innerHTML = '<input type="checkbox" />';
  td_enabled.firstChild.checked = translation_object["enabled"];
  tr.appendChild(td_name);
  tr.appendChild(td_convert_table);
  tr.appendChild(td_url_re);
  tr.appendChild(td_enabled);
  translations_tbody.appendChild(tr);
}

function add_search(search_object, searches_tbody) {
  search_object = search_object || {};
  var tr = document.createElement("tr");
  var td_name = document.createElement("td");
  td_name.innerHTML = '<input type="text" />';
  td_name.firstChild.value = search_object["name"] || "";

  var td_search_url_re = document.createElement("td");
  td_search_url_re.innerHTML = '<textarea />';
  td_search_url_re.firstChild.value = search_object["search_url_re"] || "";

  var td_search_url_match_group = document.createElement("td");
  td_search_url_match_group.innerHTML = '<input type="text" />';
  td_search_url_match_group.firstChild.value = search_object["search_url_match_group"] || "";

  var td_enabled = document.createElement("td");
  td_enabled.innerHTML = '<input type="checkbox" />';
  td_enabled.firstChild.checked = search_object["enabled"];
  tr.appendChild(td_name);
  tr.appendChild(td_search_url_re);
  tr.appendChild(td_search_url_match_group);
  tr.appendChild(td_enabled);
  searches_tbody.appendChild(tr);
}

function display_options(options) {
  options = options || {};
  options["translations"] = options["translations"] || [];
  for(var i = 0; i < options["translations"].length; i++) {
    add_translation(options["translations"][i], document.getElementById("translations_tbody"));
  }

  options["searches"] = options["searches"] || [];
  for(var i = 0; i < options["searches"].length; i++) {
    add_search(options["searches"][i], document.getElementById("searches_tbody"));
  }
  adjust_blanks();
  return;
  //now add a blank row for searches
  var tr = document.createElement("tr");
  var td_name = document.createElement("td");
  td_name.innerHTML = '<input type="text" />';
  td_name.firstChild.value = "";

  var td_search_url_re = document.createElement("td");
  td_search_url_re.innerHTML = '<textarea />';
  td_search_url_re.firstChild.value = "";

  var td_search_url_match_group = document.createElement("td");
  td_search_url_match_group.innerHTML = '<input type="text" />';
  td_search_url_match_group.firstChild.value = "";

  var td_enabled = document.createElement("td");
  td_enabled.innerHTML = '<input type="checkbox" id="translation' + i + '_enable" />';
  td_enabled.firstChild.checked = false;
  tr.appendChild(td_name);
  tr.appendChild(td_search_url_re);
  tr.appendChild(td_search_url_match_group);
  tr.appendChild(td_enabled);
  document.getElementById("searches_tbody").appendChild(tr);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var options = localStorage['options'] && JSON.parse(localStorage['options']);
  if(options) {
    display_options(options);
  } else {
    chrome.extension.sendRequest({"action": "get_default_options"}, restore_options_helper);
  }
}

function restore_options_helper(options) {
  display_options(options);
}

document.addEventListener('DOMContentLoaded', restore_options);
document.addEventListener('DOMContentLoaded', function() { document.querySelector('button').addEventListener('click', save_options_click);});
