
(function () {
var scripts = [{"deps":{"./assets/game/scripts/Components/ButtonSync":1,"./assets/game/scripts/UI/Item/QiepianPanel":2,"./assets/frame/scripts/UI/Item/MaskRecover":3,"./assets/game/scripts/Data/ConstValue":4,"./assets/frame/scripts/Data/FrameConstValue":5,"./assets/game/scripts/SkeletonExt":6,"./assets/game/scripts/UI/panel/TeacherPanel":7,"./assets/game/scripts/UI/Layer/GameLayer":8,"./assets/frame/scripts/Http/NetWork":9,"./assets/frame/scripts/Manager/SoundManager":10,"./assets/frame/scripts/SDK/GameMsg":11,"./assets/frame/scripts/UI/Panel/BaseTeacherPanel":12,"./assets/frame/scripts/Utils/BoundingBoxHelp":13,"./assets/game/scripts/UI/Item/ThreeDNode":14,"./assets/game/scripts/UI/panel/GamePanel":15,"./assets/game/scripts/Components/DragSync":16,"./assets/game/scripts/UI/Item/SoundConfig":17,"./assets/game/scripts/UI/Item/GameUI":18,"./assets/game/scripts/UI/Item/Block":19,"./assets/frame/scripts/Manager/SyncDataManager":20,"./assets/game/scripts/UI/Item/Cube":21,"./assets/frame/scripts/Manager/ListenerManager":22,"./assets/frame/scripts/Manager/UIManager":23,"./assets/frame/scripts/SDK/T2M":24,"./assets/frame/scripts/Manager/ReportManager":25,"./assets/frame/scripts/UI/BaseFrameUI":26,"./assets/frame/scripts/UI/GameMain":27,"./assets/frame/scripts/UI/Item/Tip":28,"./assets/frame/scripts/UI/Item/TitleNode":29,"./assets/frame/scripts/UI/BindNode":30,"./assets/frame/scripts/UI/Item/MaskGlobal":31,"./assets/frame/scripts/UI/AdaptiveScreen":32,"./assets/frame/scripts/UI/Item/replayBtn":33,"./assets/frame/scripts/UI/Panel/BaseGamePanel":34,"./assets/frame/scripts/UI/Item/TeacherPanelLoading":35,"./assets/frame/scripts/UI/Panel/OverTips":36,"./assets/frame/scripts/UI/Panel/LoadingUI":37,"./assets/frame/scripts/UI/Panel/ErrorPanel":38,"./assets/frame/scripts/UI/Panel/TipUI":39,"./assets/frame/scripts/UI/BaseUI":40,"./assets/frame/scripts/Utils/BoundingBoxDemo":41,"./assets/frame/scripts/UI/Panel/StarCount":42,"./assets/frame/scripts/UI/Panel/SubmissionPanel":43,"./assets/frame/scripts/Utils/UIHelp":44,"./assets/frame/scripts/Utils/MathUtils":45,"./assets/frame/scripts/UI/Panel/AffirmTips":46,"./assets/frame/scripts/UI/Panel/UploadAndReturnPanel":47,"./assets/frame/scripts/Data/FrameMsgType":48,"./assets/frame/scripts/Data/FrameSyncData":49,"./assets/frame/scripts/Utils/HitTest":50,"./assets/frame/scripts/Utils/AudioPlayExtension":51,"./assets/frame/scripts/Utils/Tools":52,"./assets/game/scripts/Manager/EditorManager":53,"./assets/game/scripts/Data/EventType":54,"./assets/game/scripts/Data/CustomSyncData":55},"path":"preview-scripts/__qc_index__.js"},{"deps":{"../../../frame/scripts/SDK/T2M":24},"path":"preview-scripts/assets/game/scripts/Components/ButtonSync.js"},{"deps":{"../../../../frame/scripts/Manager/SyncDataManager":20,"./Block":19},"path":"preview-scripts/assets/game/scripts/UI/Item/QiepianPanel.js"},{"deps":{"../../Data/FrameMsgType":48,"../../Manager/ListenerManager":22,"../../Manager/UIManager":23,"../BindNode":30},"path":"preview-scripts/assets/frame/scripts/UI/Item/MaskRecover.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Data/ConstValue.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Data/FrameConstValue.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/SkeletonExt.js"},{"deps":{"../../../../frame/scripts/Data/FrameMsgType":48,"../../../../frame/scripts/Manager/ListenerManager":22,"../../../../frame/scripts/Manager/ReportManager":25,"../../../../frame/scripts/Manager/UIManager":23,"../../../../frame/scripts/UI/Panel/BaseTeacherPanel":12,"../../../../frame/scripts/Utils/UIHelp":44,"../../Manager/EditorManager":53,"./GamePanel":15},"path":"preview-scripts/assets/game/scripts/UI/panel/TeacherPanel.js"},{"deps":{"../../../../frame/scripts/Http/NetWork":9,"../../../../frame/scripts/Manager/ListenerManager":22,"../../../../frame/scripts/Manager/SyncDataManager":20,"../../../../frame/scripts/SDK/T2M":24,"../../Data/EventType":54,"../Item/Cube":21,"../Item/GameUI":18,"../Item/ThreeDNode":14},"path":"preview-scripts/assets/game/scripts/UI/Layer/GameLayer.js"},{"deps":{"../../../game/scripts/Data/ConstValue":4,"../Manager/UIManager":23,"../SDK/GameMsg":11,"../Utils/UIHelp":44},"path":"preview-scripts/assets/frame/scripts/Http/NetWork.js"},{"deps":{"../Data/FrameConstValue":5,"../Data/FrameMsgType":48,"../Http/NetWork":9,"../SDK/GameMsg":11,"./ListenerManager":22,"./UIManager":23},"path":"preview-scripts/assets/frame/scripts/Manager/SoundManager.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/SDK/GameMsg.js"},{"deps":{"../../../../game/scripts/Data/ConstValue":4,"../../Http/NetWork":9,"../../Utils/UIHelp":44,"../BaseUI":40},"path":"preview-scripts/assets/frame/scripts/UI/Panel/BaseTeacherPanel.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Utils/BoundingBoxHelp.js"},{"deps":{"../../../../frame/scripts/Manager/ListenerManager":22,"../../../../frame/scripts/Manager/SyncDataManager":20,"../../Data/EventType":54,"./Cube":21},"path":"preview-scripts/assets/game/scripts/UI/Item/ThreeDNode.js"},{"deps":{"../../../../frame/scripts/Manager/ListenerManager":22,"../../../../frame/scripts/UI/Panel/BaseGamePanel":34,"../../Data/EventType":54},"path":"preview-scripts/assets/game/scripts/UI/panel/GamePanel.js"},{"deps":{"../../../frame/scripts/SDK/T2M":24},"path":"preview-scripts/assets/game/scripts/Components/DragSync.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/UI/Item/SoundConfig.js"},{"deps":{"../../../../frame/scripts/Manager/ListenerManager":22,"../../../../frame/scripts/Manager/SoundManager":10,"../../../../frame/scripts/Manager/SyncDataManager":20,"../../Data/EventType":54,"./Cube":21,"./QiepianPanel":2,"./SoundConfig":17,"./ThreeDNode":14},"path":"preview-scripts/assets/game/scripts/UI/Item/GameUI.js"},{"deps":{"../../../../frame/scripts/Manager/SoundManager":10,"../../../../frame/scripts/Manager/SyncDataManager":20,"./SoundConfig":17},"path":"preview-scripts/assets/game/scripts/UI/Item/Block.js"},{"deps":{"../../../frame/scripts/Data/FrameSyncData":49,"../../../frame/scripts/Manager/ReportManager":25,"../../../game/scripts/Data/CustomSyncData":55},"path":"preview-scripts/assets/frame/scripts/Manager/SyncDataManager.js"},{"deps":{"../../../../frame/scripts/Manager/ListenerManager":22,"../../../../frame/scripts/Manager/SoundManager":10,"../../../../frame/scripts/Manager/SyncDataManager":20,"../../Data/EventType":54,"./SoundConfig":17},"path":"preview-scripts/assets/game/scripts/UI/Item/Cube.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Manager/ListenerManager.js"},{"deps":{"../UI/BaseUI":40},"path":"preview-scripts/assets/frame/scripts/Manager/UIManager.js"},{"deps":{"../Data/FrameMsgType":48,"../Http/NetWork":9,"../Manager/ListenerManager":22,"../Manager/SyncDataManager":20,"../Utils/UIHelp":44,"./GameMsg":11},"path":"preview-scripts/assets/frame/scripts/SDK/T2M.js"},{"deps":{"../../../game/scripts/Data/ConstValue":4,"../../../game/scripts/Manager/EditorManager":53,"../SDK/GameMsg":11},"path":"preview-scripts/assets/frame/scripts/Manager/ReportManager.js"},{"deps":{"../Data/FrameConstValue":5,"./BaseUI":40},"path":"preview-scripts/assets/frame/scripts/UI/BaseFrameUI.js"},{"deps":{"../../../game/scripts/Manager/EditorManager":53,"../Data/FrameMsgType":48,"../Http/NetWork":9,"../Manager/ListenerManager":22,"../Manager/ReportManager":25,"../Manager/SoundManager":10,"../Manager/SyncDataManager":20,"../Manager/UIManager":23,"../SDK/GameMsg":11,"../SDK/T2M":24,"../Utils/UIHelp":44},"path":"preview-scripts/assets/frame/scripts/UI/GameMain.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/UI/Item/Tip.js"},{"deps":{"../../Data/FrameMsgType":48,"../../Manager/ListenerManager":22},"path":"preview-scripts/assets/frame/scripts/UI/Item/TitleNode.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/UI/BindNode.js"},{"deps":{"../../Data/FrameMsgType":48,"../../Manager/ListenerManager":22,"../../Manager/UIManager":23,"../../Utils/UIHelp":44,"../BindNode":30},"path":"preview-scripts/assets/frame/scripts/UI/Item/MaskGlobal.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/UI/AdaptiveScreen.js"},{"deps":{"../../Data/FrameMsgType":48,"../../SDK/T2M":24},"path":"preview-scripts/assets/frame/scripts/UI/Item/replayBtn.js"},{"deps":{"../../../../game/scripts/Data/ConstValue":4,"../../../../game/scripts/Manager/EditorManager":53,"../../Data/FrameMsgType":48,"../../Http/NetWork":9,"../../Manager/ListenerManager":22,"../../Manager/ReportManager":25,"../../Manager/SoundManager":10,"../../Manager/SyncDataManager":20,"../../Manager/UIManager":23,"../../SDK/GameMsg":11,"../../SDK/T2M":24,"../../Utils/UIHelp":44,"../BaseUI":40},"path":"preview-scripts/assets/frame/scripts/UI/Panel/BaseGamePanel.js"},{"deps":{"../../Data/FrameMsgType":48,"../../Manager/ListenerManager":22,"../BindNode":30},"path":"preview-scripts/assets/frame/scripts/UI/Item/TeacherPanelLoading.js"},{"deps":{"./../../Manager/SoundManager":10,"../../Utils/Tools":52,"../BaseFrameUI":26,"../../Utils/UIHelp":44,"../../Manager/UIManager":23,"../../SDK/T2M":24,"../../Data/FrameMsgType":48,"../../../../game/scripts/Data/ConstValue":4},"path":"preview-scripts/assets/frame/scripts/UI/Panel/OverTips.js"},{"deps":{"../../../../game/scripts/Data/ConstValue":4,"../../../../game/scripts/UI/panel/GamePanel":15,"../../../../game/scripts/UI/panel/TeacherPanel":7,"../../Http/NetWork":9,"../../Manager/SoundManager":10,"../../Manager/UIManager":23,"../../SDK/GameMsg":11,"../BaseFrameUI":26},"path":"preview-scripts/assets/frame/scripts/UI/Panel/LoadingUI.js"},{"deps":{"../../Utils/UIHelp":44,"./../../Manager/SoundManager":10,"./../../SDK/GameMsg":11,"./../BaseFrameUI":26},"path":"preview-scripts/assets/frame/scripts/UI/Panel/ErrorPanel.js"},{"deps":{"../BaseFrameUI":26,"../Item/Tip":28},"path":"preview-scripts/assets/frame/scripts/UI/Panel/TipUI.js"},{"deps":{"../Data/FrameConstValue":5,"../Manager/ListenerManager":22,"./BindNode":30},"path":"preview-scripts/assets/frame/scripts/UI/BaseUI.js"},{"deps":{"./BoundingBoxHelp":13},"path":"preview-scripts/assets/frame/scripts/Utils/BoundingBoxDemo.js"},{"deps":{"./../../Manager/SoundManager":10,"../../Utils/Tools":52,"../BaseFrameUI":26,"../../../../game/scripts/Manager/EditorManager":53,"../../Manager/ReportManager":25,"../../Utils/UIHelp":44,"../../../../game/scripts/Data/ConstValue":4},"path":"preview-scripts/assets/frame/scripts/UI/Panel/StarCount.js"},{"deps":{"../../Http/NetWork":9,"../BaseFrameUI":26,"../../Utils/UIHelp":44,"../../../../game/scripts/Data/ConstValue":4,"../../../../game/scripts/Manager/EditorManager":53},"path":"preview-scripts/assets/frame/scripts/UI/Panel/SubmissionPanel.js"},{"deps":{"../../../game/scripts/UI/panel/GamePanel":15,"../../../game/scripts/UI/panel/TeacherPanel":7,"../Data/FrameMsgType":48,"../Manager/ListenerManager":22,"../Manager/UIManager":23,"../UI/Panel/AffirmTips":46,"../UI/Panel/ErrorPanel":38,"../UI/Panel/OverTips":36,"../UI/Panel/StarCount":42,"../UI/Panel/SubmissionPanel":43,"../UI/Panel/TipUI":39,"../UI/Panel/UploadAndReturnPanel":47},"path":"preview-scripts/assets/frame/scripts/Utils/UIHelp.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Utils/MathUtils.js"},{"deps":{"../../Data/FrameMsgType":48,"../../SDK/T2M":24,"../../Utils/UIHelp":44,"../BaseFrameUI":26},"path":"preview-scripts/assets/frame/scripts/UI/Panel/AffirmTips.js"},{"deps":{"./../../Manager/ListenerManager":22,"../BaseFrameUI":26,"../../Data/FrameMsgType":48,"../../Utils/UIHelp":44,"../../Manager/ReportManager":25,"../../Manager/SoundManager":10,"../../SDK/T2M":24,"../../../../game/scripts/Manager/EditorManager":53,"../../Manager/UIManager":23,"../../../../game/scripts/UI/panel/TeacherPanel":7},"path":"preview-scripts/assets/frame/scripts/UI/Panel/UploadAndReturnPanel.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Data/FrameMsgType.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Data/FrameSyncData.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Utils/HitTest.js"},{"deps":{"./../Manager/SoundManager":10},"path":"preview-scripts/assets/frame/scripts/Utils/AudioPlayExtension.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Utils/Tools.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Manager/EditorManager.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Data/EventType.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Data/CustomSyncData.js"}];
var entries = ["preview-scripts/__qc_index__.js"];
var bundleScript = 'preview-scripts/__qc_bundle__.js';

/**
 * Notice: This file can not use ES6 (for IE 11)
 */
var modules = {};
var name2path = {};

// Will generated by module.js plugin
// var scripts = ${scripts};
// var entries = ${entries};
// var bundleScript = ${bundleScript};

if (typeof global === 'undefined') {
    window.global = window;
}

var isJSB = typeof jsb !== 'undefined';

function getXMLHttpRequest () {
    return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('MSXML2.XMLHTTP');
}

function downloadText(url, callback) {
    if (isJSB) {
        var result = jsb.fileUtils.getStringFromFile(url);
        callback(null, result);
        return;
    }

    var xhr = getXMLHttpRequest(),
        errInfo = 'Load text file failed: ' + url;
    xhr.open('GET', url, true);
    if (xhr.overrideMimeType) xhr.overrideMimeType('text\/plain; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
                callback(null, xhr.responseText);
            }
            else {
                callback({status:xhr.status, errorMessage:errInfo + ', status: ' + xhr.status});
            }
        }
        else {
            callback({status:xhr.status, errorMessage:errInfo + '(wrong readyState)'});
        }
    };
    xhr.onerror = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(error)'});
    };
    xhr.ontimeout = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(time out)'});
    };
    xhr.send(null);
};

function loadScript (src, cb) {
    if (typeof require !== 'undefined') {
        require(src);
        return cb();
    }

    // var timer = 'load ' + src;
    // console.time(timer);

    var scriptElement = document.createElement('script');

    function done() {
        // console.timeEnd(timer);
        // deallocation immediate whatever
        scriptElement.remove();
    }

    scriptElement.onload = function () {
        done();
        cb();
    };
    scriptElement.onerror = function () {
        done();
        var error = 'Failed to load ' + src;
        console.error(error);
        cb(new Error(error));
    };
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.setAttribute('charset', 'utf-8');
    scriptElement.setAttribute('src', src);

    document.head.appendChild(scriptElement);
}

function loadScripts (srcs, cb) {
    var n = srcs.length;

    srcs.forEach(function (src) {
        loadScript(src, function () {
            n--;
            if (n === 0) {
                cb();
            }
        });
    })
}

function formatPath (path) {
    let destPath = window.__quick_compile_project__.destPath;
    if (destPath) {
        let prefix = 'preview-scripts';
        if (destPath[destPath.length - 1] === '/') {
            prefix += '/';
        }
        path = path.replace(prefix, destPath);
    }
    return path;
}

window.__quick_compile_project__ = {
    destPath: '',

    registerModule: function (path, module) {
        path = formatPath(path);
        modules[path].module = module;
    },

    registerModuleFunc: function (path, func) {
        path = formatPath(path);
        modules[path].func = func;

        var sections = path.split('/');
        var name = sections[sections.length - 1];
        name = name.replace(/\.(?:js|ts|json)$/i, '');
        name2path[name] = path;
    },

    require: function (request, path) {
        var m, requestScript;

        path = formatPath(path);
        if (path) {
            m = modules[path];
            if (!m) {
                console.warn('Can not find module for path : ' + path);
                return null;
            }
        }

        if (m) {
            let depIndex = m.deps[request];
            // dependence script was excluded
            if (depIndex === -1) {
                return null;
            }
            else {
                requestScript = scripts[ m.deps[request] ];
            }
        }
        
        let requestPath = '';
        if (!requestScript) {
            // search from name2path when request is a dynamic module name
            if (/^[\w- .]*$/.test(request)) {
                requestPath = name2path[request];
            }

            if (!requestPath) {
                if (CC_JSB) {
                    return require(request);
                }
                else {
                    console.warn('Can not find deps [' + request + '] for path : ' + path);
                    return null;
                }
            }
        }
        else {
            requestPath = formatPath(requestScript.path);
        }

        let requestModule = modules[requestPath];
        if (!requestModule) {
            console.warn('Can not find request module for path : ' + requestPath);
            return null;
        }

        if (!requestModule.module && requestModule.func) {
            requestModule.func();
        }

        if (!requestModule.module) {
            console.warn('Can not find requestModule.module for path : ' + path);
            return null;
        }

        return requestModule.module.exports;
    },

    run: function () {
        entries.forEach(function (entry) {
            entry = formatPath(entry);
            var module = modules[entry];
            if (!module.module) {
                module.func();
            }
        });
    },

    load: function (cb) {
        var self = this;

        var srcs = scripts.map(function (script) {
            var path = formatPath(script.path);
            modules[path] = script;

            if (script.mtime) {
                path += ("?mtime=" + script.mtime);
            }
            return path;
        });

        console.time && console.time('load __quick_compile_project__');
        // jsb can not analysis sourcemap, so keep separate files.
        if (bundleScript && !isJSB) {
            downloadText(formatPath(bundleScript), function (err, bundleSource) {
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                if (err) {
                    console.error(err);
                    return;
                }

                let evalTime = 'eval __quick_compile_project__ : ' + srcs.length + ' files';
                console.time && console.time(evalTime);
                var sources = bundleSource.split('\n//------QC-SOURCE-SPLIT------\n');
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i]) {
                        window.eval(sources[i]);
                        // not sure why new Function cannot set breakpoints precisely
                        // new Function(sources[i])()
                    }
                }
                self.run();
                console.timeEnd && console.timeEnd(evalTime);
                cb();
            })
        }
        else {
            loadScripts(srcs, function () {
                self.run();
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                cb();
            });
        }
    }
};

// Polyfill for IE 11
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
})();
    