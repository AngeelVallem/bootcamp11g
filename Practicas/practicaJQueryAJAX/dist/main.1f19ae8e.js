// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
var cardsRow = $("#cards-c");
$("form").hide();
$("#alert-deleted").alert("close");

var setMentor = function setMentor() {
  var newMentor = {};
  $('form input[type="text"]').each(function () {
    newMentor[this.name] = this.value;
  });
  saveData(newMentor);
  printMentors(getData());
  $('form input[type="text"]').each(function () {
    this.value = "";
  });
  $("form").hide();
  $("#show-form").show("slow");
  $("#modal-save").modal("show");
};

$("#save").click(function () {
  return setMentor();
});

var getData = function getData() {
  var mentorsCollections;
  $.ajax({
    method: "GET",
    url: "https://ajaxclass-1ca34.firebaseio.com/11g/angel/mentors.json",
    success: function success(response) {
      mentorsCollections = response;
    },
    error: function error(_error) {
      console.log(_error);
    },
    async: false
  });
  return mentorsCollections;
};

var saveEdit = function saveEdit(event) {
  var key = event.target.dataset.mentorKey;
  var editMentor = {};
  $('.md-form input[type="text"]').each(function () {
    editMentor[this.name] = this.value;
  });
  putData(key, editMentor);
  $("#modal-edit").modal("hide");
  $("#modal-edited").modal("show");
  printMentors(getData());
};

var getDataByKey = function getDataByKey(event) {
  var key = event.target.dataset.mentorKey;
  var mentorObj;
  $("#modal-edit").modal("show");
  $.ajax({
    method: "GET",
    url: "https://ajaxclass-1ca34.firebaseio.com/11g/angel/mentors/".concat(key, ".json"),
    success: function success(response) {
      mentorObj = response;
    },
    error: function error(_error2) {
      console.log(_error2);
    },
    async: false
  });
  var _mentorObj = mentorObj,
      name = _mentorObj.name,
      age = _mentorObj.age,
      phone = _mentorObj.phone;
  var editMentor = {
    key: key
  };
  $('.md-form input[type="text"]').each(function () {
    if (this.name == "name") {
      this.value = name;
    } else if (this.name == "age") {
      this.value = age;
    } else {
      this.value = phone;
    }
  });
  var saveButton = $(".save-button");
  saveButton.children().remove();
  var button = "<button  data-mentor-key=".concat(key, " class=\"btn btn-primary\" id=\"save-edit\">Save</button>");
  saveButton.append(button);
  $("#save-edit").click(saveEdit);
};

var deleteData = function deleteData(event) {
  var key = event.target.dataset.mentorKey;
  $.ajax({
    method: "DELETE",
    url: "https://ajaxclass-1ca34.firebaseio.com/11g/angel/mentors/".concat(key, ".json"),
    success: function success(response) {
      return response;
    },
    error: function error(_error3) {
      console.log(_error3);
    },
    async: false
  });
  $("#modal-delete").modal("show");
  $("#alert-deleted").alert();
  printMentors(getData());
};

var printMentors = function printMentors(arr) {
  cardsRow.children().remove();
  var editIcon = '<i class="bi bi-pencil-square"></i>';

  for (key in arr) {
    var _arr$key = arr[key],
        name = _arr$key.name,
        age = _arr$key.age,
        phone = _arr$key.phone;
    var card = "<div class=\"col-12 col-md-4 col-lg-3\"><div class=\"card mb-4 shadow-sm\">\n    <div class=\"card-body\">\n        <div class=\"card-title d-flex justify-content-between w-100 align-items-center\">".concat(name, " \n        <button data-mentor-key=\"").concat(key, "\" class=\"btn btn-warning btn-edit\">").concat(editIcon, "</button>\n        </div> \n        <div class=\"card-text\">").concat(age, "</div>\n        <div class=\"card-text\">").concat(phone, "</div>\n        <button data-mentor-key=\"").concat(key, "\" class=\"btn btn-outline-danger btn-delete mt-2\">delete</button>\n    </div> </div>");
    cardsRow.append(card);
  }

  $(".btn-delete").click(deleteData);
  $(".btn-edit").click(getDataByKey);
};

printMentors(getData());

var saveData = function saveData(object) {
  $.ajax({
    method: "POST",
    url: "https://ajaxclass-1ca34.firebaseio.com/11g/angel/mentors.json",
    data: JSON.stringify(object),
    success: function success(response) {},
    error: function error(_error4) {
      console.log(_error4);
    },
    async: false
  });
};

var putData = function putData(key, obj) {
  $.ajax({
    method: "PUT",
    url: "https://ajaxclass-1ca34.firebaseio.com/11g/angel/mentors/".concat(key, ".json"),
    data: JSON.stringify(obj),
    success: function success(response) {
      console.log(response);
    },
    error: function error(_error5) {
      console.log(_error5);
    },
    async: false
  });
};

var showForm = function showForm() {
  $("#show-form").hide();
  $("form").show("slow");
};

$("#show-form").click(showForm);
$("#hide-form").click(function () {
  $("form").hide();
  $("#show-form").show("slow");
  $('form input[type="text"]').each(function () {
    this.value = "";
  });
});
console.log(cardsRow);
},{}],"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57998" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map