const DEFAULT_OPTIONS = { "translations": [{
    "name": "Hebrew",
    "convert_table": {
      "/"     : "q", "'"     : "w", "\u05e7": "e", "\u05e8": "r", "\u05d0": "t", "\u05d8": "y", "\u05d5": "u", "\u05df": "i",
      "\u05dd": "o", "\u05e4": "p", "\u05e9": "a", "\u05d3": "s", "\u05d2": "d", "\u05db": "f", "\u05e2": "g", "\u05d9": "h",
      "\u05d7": "j", "\u05dc": "k", "\u05da": "l", "\u05e3": ";", ","     : "'", "\u05d6": "z", "\u05e1": "x", "\u05d1": "c",
      "\u05d4": "v", "\u05e0": "b", "\u05de": "n", "\u05e6": "m", "\u05ea": ",", "\u05e5": ".", "."     : "/"
    },
    "url_re": "\u05e5\u05e0\u05df\u05d6|\u05e5\u05d1\u05e9\u05d0|\u05e5\u05d1\u05dd\u05e6|\u05e5\u05d1\u05dd\u05dd\u05e4|\u05e5\u05e7\u05d2\u05d5|\u05e5\u05e2\u05dd\u05d4|\u05e5\u05df\u05de\u05db\u05dd|\u05e5\u05df\u05de\u05d0|\u05e5\u05d7\u05dd\u05e0\u05d3|\u05e5\u05e6\u05df\u05da|\u05e5\u05e6\u05dd\u05e0\u05df|\u05e5\u05e6\u05d5\u05d3\u05e7\u05d5\u05e6|\u05e5\u05de\u05e7\u05d0|\u05e5\u05de\u05e9\u05e6\u05e7|\u05e5\u05dd\u05e8\u05e2|\u05e5\u05e4\u05e8\u05dd|\u05e5\u05d0\u05e8\u05e9\u05d4\u05e7\u05da|\u05e5\u05df\u05da|\u05e5\u05e9\u05e7\u05e8\u05dd",
    "enabled": true
  },
  {
    "name": "Greek",
    "convert_table": {
      ";"     : "q", "\u03c2": "w", "\u03b5": "e", "\u03c1": "r", "\u03c4": "t", "\u03c5": "y", "\u03b8": "u", "\u03b9": "i",
      "\u03bf": "o", "\u03c0": "p", "\u03b1": "a", "\u03c3": "s", "\u03b4": "d", "\u03c6": "f", "\u03b3": "g", "\u03b7": "h",
      "\u03be": "j", "\u03ba": "k", "\u03bb": "l", "'"     : "'", "\u03b6": "z", "\u03c7": "x", "\u03c8": "c", "\u03c9": "v",
      "\u03b2": "b", "\u03bd": "n", "\u03bc": "m"
    },
    "url_re": ".\u03b1\u03b5\u03c1\u03bf|.\u03b2\u03b9\u03b6|.\u03c8\u03b1\u03c4|.\u03c8\u03bf\u03bc|.\u03c8\u03bf\u03bf\u03c0|.\u03b5\u03b4\u03b8|.\u03b3\u03bf\u03c9|.\u03b9\u03bd\u03c6\u03bf|.\u03b9\u03bd\u03c4|.\u03be\u03bf\u03b2\u03c3|.\u03bc\u03b9\u03bb|.\u03bc\u03bf\u03b2\u03b9|.\u03bc\u03b8\u03c3\u03b5\u03b8\u03bc|.\u03bd\u03b1\u03bc\u03b5|.\u03bd\u03b5\u03c4|.\u03bf\u03c1\u03b3|.\u03c0\u03c1\u03bf|.\u03c4\u03c1\u03b1\u03c9\u03b5\u03bb|.\u03b5\u03bb",
    "enabled": true
  },
  {
    "name": "Russian",
    "convert_table": {
      "\u0439": "q", "\u0446": "w", "\u0443": "e", "\u043a": "r", "\u0435": "t", "\u043d": "y", "\u0433": "u", "\u0448": "i",
      "\u0449": "o", "\u0437": "p", "\u0445": "[", "\u044a": "]", "\u0444": "a", "\u044b": "s", "\u0432": "d", "\u0430": "f",
      "\u043f": "g", "\u0440": "h", "\u043e": "j", "\u043b": "k", "\u0434": "l", "\u0436": ";", "\u044d": "'", "\u044f": "z",
      "\u0447": "x", "\u0441": "c", "\u043c": "v", "\u0438": "b", "\u0442": "n", "\u044c": "m", "\u0431": ",", "\u044e": ".",
      "."     : "/"
    },
    "url_re": "\u044e\u0444\u0443\u043a\u0449|\u044e\u0438\u0448\u044f|\u044e\u0441\u0444\u0435|\u044e\u0441\u0449\u044c|\u044e\u0441\u0449\u0449\u0437|\u044e\u0443\u0432\u0433|\u044e\u043f\u0449\u043c|\u044e\u0448\u0442\u0430\u0449|\u044e\u0448\u0442\u0435|\u044e\u043e\u0449\u0438\u044b|\u044e\u044c\u0448\u0434|\u044e\u044c\u0449\u0438\u0448|\u044e\u044c\u0433\u044b\u0443\u0433\u044c|\u044e\u0442\u0444\u044c\u0443|\u044e\u0442\u0443\u0435|\u044e\u0449\u043a\u043f|\u044e\u0437\u043a\u0449|\u044e\u0435\u043a\u0444\u043c\u0443\u0434|\u044e\u043a\u0433",
    "enabled": true
  }],
  "searches": [{
    "name": "Google",
    "search_url_re": "https?:\\/\\/www\\.google\\.co(m|\\.[a-z]{2})\\/(.*&)?q=([^&]*)",
    "search_url_match_group": "3",
    "enabled": true
  },
  {
    "name": "Yahoo",
    "search_url_re": "http:\\/\\/search\\.yahoo\\.com\\/search.*\\?(.*&)?p=([^&]*)",
    "search_url_match_group": "2",
    "enabled": true
  }]
};

function xhr(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(data) {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var data = xhr.responseText;
        callback(data);
      } else {
        callback(null);
      }
    }
  }
  // Note that any URL fetched here must be matched by a permission in
  // the manifest.json file!
  xhr.open('GET', url, true);
  xhr.send();
};

/**
 * Handles data sent via chrome.extension.sendRequest().
 * @param request Object Data sent in the request.
 * @param sender Object Origin of the request.
 * @param callback Function The method to call when the request completes.
 */
function onRequest(request, sender, callback) {
  if (request.action == 'xhr') {
    xhr(request.url, callback);
  } else if(request.action == 'localStorage_set') {
    localStorage[request.attribute] = JSON.stringify(request.value || null);
    callback();
  } else if(request.action == 'localStorage_get') {
    callback(JSON.parse(localStorage[request.attribute] || null) || null);
  } else if(request.action == 'get_default_options') {
    callback(DEFAULT_OPTIONS);
  }
};

// Wire up the listener.
chrome.extension.onRequest.addListener(onRequest);
function tableConvert(convert_table, s) {
  var translate_re = "";
  var translate = {};
  for(var key in convert_table) {
    translate_re += key.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") + "|";
  }
  translate_re = translate_re.substr(0, translate_re.length-1);
  translate_re = new RegExp(translate_re, "g");
  return(s.replace(translate_re, function(match) { return convert_table[match];}));
}

function fixURL(url) {
  var options = (localStorage['options'] && JSON.parse(localStorage['options'])) || DEFAULT_OPTIONS;
  if(options) {
    if(url) {
      for(var current_search_url_re_index = 0; current_search_url_re_index < options["searches"].length; current_search_url_re_index++) {
        if(!options["searches"][current_search_url_re_index].enabled)
          continue;
        var search_url_re = new RegExp(options["searches"][current_search_url_re_index]["search_url_re"]);
        var re_result = search_url_re.exec(url);
        if(re_result && re_result.length > options["searches"][current_search_url_re_index]["search_url_match_group"]) {
          var search_string = re_result[options["searches"][current_search_url_re_index]["search_url_match_group"]]; //this is the URL that we mistyped
          search_string = decodeURIComponent(search_string);
          for(var current_translation_index = 0; current_translation_index < options["translations"].length; current_translation_index++) {
            if(!options["translations"][current_translation_index].enabled)
              continue;
            var url_re = new RegExp(options["translations"][current_translation_index]["url_re"]);
            if(url_re.test(search_string)) {
              var new_url = tableConvert(options["translations"][current_translation_index]["convert_table"], search_string);
              var proto_re = new RegExp("^[a-zA-Z]+\\:\\/\\/");
              if(!proto_re.test(new_url)) {
                new_url = "http://" + new_url;
              }
              return(new_url); //we did something
            }
          }
        }
      }
    }
  }
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) { var new_url = changeInfo.url && fixURL(changeInfo.url);
                                                                     if(new_url) chrome.tabs.update(tabId, {'url': new_url});
                                                                   });