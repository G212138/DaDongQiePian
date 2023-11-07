
(function () {
var scripts = [{"deps":{"./assets/game/scripts/Data/CustomSyncData":47,"./assets/game/scripts/Data/EventType":43,"./assets/game/scripts/Data/ConstValue":49,"./assets/game/scripts/Manager/EditorManager":44,"./assets/game/scripts/SkeletonExt":5,"./assets/game/scripts/Components/DragSync":50,"./assets/game/scripts/UI/Item/GameUI":42,"./assets/game/scripts/UI/Item/QiepianPanel":48,"./assets/game/scripts/UI/Item/SoundConfig":53,"./assets/game/scripts/UI/Item/ThreeDNode":51,"./assets/game/scripts/UI/Item/Block":52,"./assets/game/scripts/UI/Layer/GameLayer":46,"./assets/game/scripts/UI/panel/TeacherPanel":45,"./assets/game/scripts/UI/panel/GamePanel":55,"./assets/game/scripts/UI/Item/Cube":54,"./assets/frame/scripts/Data/FrameConstValue":3,"./assets/frame/scripts/Http/NetWork":6,"./assets/frame/scripts/Manager/ReportManager":14,"./assets/frame/scripts/Manager/SoundManager":4,"./assets/frame/scripts/Manager/SyncDataManager":11,"./assets/frame/scripts/Manager/UIManager":12,"./assets/frame/scripts/Manager/ListenerManager":10,"./assets/frame/scripts/SDK/T2M":7,"./assets/frame/scripts/SDK/GameMsg":16,"./assets/frame/scripts/UI/BaseFrameUI":13,"./assets/frame/scripts/UI/BaseUI":18,"./assets/frame/scripts/UI/BindNode":15,"./assets/frame/scripts/UI/GameMain":20,"./assets/frame/scripts/UI/AdaptiveScreen":17,"./assets/frame/scripts/UI/Item/MaskRecover":19,"./assets/frame/scripts/UI/Item/TeacherPanelLoading":1,"./assets/frame/scripts/UI/Item/Tip":26,"./assets/frame/scripts/UI/Item/TitleNode":28,"./assets/frame/scripts/UI/Item/replayBtn":21,"./assets/frame/scripts/UI/Item/MaskGlobal":22,"./assets/frame/scripts/UI/Panel/BaseGamePanel":24,"./assets/frame/scripts/UI/Panel/BaseTeacherPanel":8,"./assets/frame/scripts/UI/Panel/ErrorPanel":23,"./assets/frame/scripts/UI/Panel/LoadingUI":27,"./assets/frame/scripts/UI/Panel/OverTips":30,"./assets/frame/scripts/UI/Panel/StarCount":25,"./assets/frame/scripts/UI/Panel/SubmissionPanel":33,"./assets/frame/scripts/UI/Panel/TipUI":29,"./assets/frame/scripts/UI/Panel/UploadAndReturnPanel":31,"./assets/frame/scripts/UI/Panel/AffirmTips":34,"./assets/frame/scripts/Utils/BoundingBoxDemo":9,"./assets/frame/scripts/Utils/BoundingBoxHelp":32,"./assets/frame/scripts/Utils/HitTest":36,"./assets/frame/scripts/Utils/MathUtils":35,"./assets/frame/scripts/Utils/Tools":39,"./assets/frame/scripts/Utils/UIHelp":41,"./assets/frame/scripts/Utils/AudioPlayExtension":38,"./assets/frame/scripts/Data/FrameMsgType":37,"./assets/frame/scripts/Data/FrameSyncData":40,"./assets/game/scripts/Components/ButtonSync":2},"path":"preview-scripts/__qc_index__.js"},{"deps":{"../../Data/FrameMsgType":37,"../../Manager/ListenerManager":10,"../BindNode":15},"path":"preview-scripts/assets/frame/scripts/UI/Item/TeacherPanelLoading.js"},{"deps":{"../../../frame/scripts/SDK/T2M":7},"path":"preview-scripts/assets/game/scripts/Components/ButtonSync.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Data/FrameConstValue.js"},{"deps":{"../Data/FrameConstValue":3,"../Data/FrameMsgType":37,"../Http/NetWork":6,"../SDK/GameMsg":16,"./ListenerManager":10,"./UIManager":12},"path":"preview-scripts/assets/frame/scripts/Manager/SoundManager.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/SkeletonExt.js"},{"deps":{"../Manager/UIManager":12,"../SDK/GameMsg":16,"../Utils/UIHelp":41,"../../../game/scripts/Data/ConstValue":49},"path":"preview-scripts/assets/frame/scripts/Http/NetWork.js"},{"deps":{"../Data/FrameMsgType":37,"../Http/NetWork":6,"../Manager/ListenerManager":10,"../Manager/SyncDataManager":11,"../Utils/UIHelp":41,"./GameMsg":16},"path":"preview-scripts/assets/frame/scripts/SDK/T2M.js"},{"deps":{"../../../../game/scripts/Data/ConstValue":49,"../../Http/NetWork":6,"../../Utils/UIHelp":41,"../BaseUI":18},"path":"preview-scripts/assets/frame/scripts/UI/Panel/BaseTeacherPanel.js"},{"deps":{"./BoundingBoxHelp":32},"path":"preview-scripts/assets/frame/scripts/Utils/BoundingBoxDemo.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Manager/ListenerManager.js"},{"deps":{"../../../frame/scripts/Data/FrameSyncData":40,"../../../frame/scripts/Manager/ReportManager":14,"../../../game/scripts/Data/CustomSyncData":47},"path":"preview-scripts/assets/frame/scripts/Manager/SyncDataManager.js"},{"deps":{"../UI/BaseUI":18},"path":"preview-scripts/assets/frame/scripts/Manager/UIManager.js"},{"deps":{"../Data/FrameConstValue":3,"./BaseUI":18},"path":"preview-scripts/assets/frame/scripts/UI/BaseFrameUI.js"},{"deps":{"../../../game/scripts/Data/ConstValue":49,"../../../game/scripts/Manager/EditorManager":44,"../SDK/GameMsg":16},"path":"preview-scripts/assets/frame/scripts/Manager/ReportManager.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/UI/BindNode.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/SDK/GameMsg.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/UI/AdaptiveScreen.js"},{"deps":{"../Data/FrameConstValue":3,"../Manager/ListenerManager":10,"./BindNode":15},"path":"preview-scripts/assets/frame/scripts/UI/BaseUI.js"},{"deps":{"../../Data/FrameMsgType":37,"../../Manager/ListenerManager":10,"../../Manager/UIManager":12,"../BindNode":15},"path":"preview-scripts/assets/frame/scripts/UI/Item/MaskRecover.js"},{"deps":{"../../../game/scripts/Manager/EditorManager":44,"../Data/FrameMsgType":37,"../Http/NetWork":6,"../Manager/ListenerManager":10,"../Manager/ReportManager":14,"../Manager/SoundManager":4,"../Manager/SyncDataManager":11,"../Manager/UIManager":12,"../SDK/GameMsg":16,"../SDK/T2M":7,"../Utils/UIHelp":41},"path":"preview-scripts/assets/frame/scripts/UI/GameMain.js"},{"deps":{"../../Data/FrameMsgType":37,"../../SDK/T2M":7},"path":"preview-scripts/assets/frame/scripts/UI/Item/replayBtn.js"},{"deps":{"../../Data/FrameMsgType":37,"../../Manager/ListenerManager":10,"../../Manager/UIManager":12,"../../Utils/UIHelp":41,"../BindNode":15},"path":"preview-scripts/assets/frame/scripts/UI/Item/MaskGlobal.js"},{"deps":{"../../Utils/UIHelp":41,"./../../Manager/SoundManager":4,"./../../SDK/GameMsg":16,"./../BaseFrameUI":13},"path":"preview-scripts/assets/frame/scripts/UI/Panel/ErrorPanel.js"},{"deps":{"../../../../game/scripts/Data/ConstValue":49,"../../../../game/scripts/Manager/EditorManager":44,"../../Data/FrameMsgType":37,"../../Http/NetWork":6,"../../Manager/ListenerManager":10,"../../Manager/ReportManager":14,"../../Manager/SoundManager":4,"../../Manager/SyncDataManager":11,"../../Manager/UIManager":12,"../../SDK/GameMsg":16,"../../SDK/T2M":7,"../../Utils/UIHelp":41,"../BaseUI":18},"path":"preview-scripts/assets/frame/scripts/UI/Panel/BaseGamePanel.js"},{"deps":{"./../../Manager/SoundManager":4,"../../Utils/Tools":39,"../BaseFrameUI":13,"../../../../game/scripts/Manager/EditorManager":44,"../../Manager/ReportManager":14,"../../Utils/UIHelp":41,"../../../../game/scripts/Data/ConstValue":49},"path":"preview-scripts/assets/frame/scripts/UI/Panel/StarCount.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/UI/Item/Tip.js"},{"deps":{"../../../../game/scripts/Data/ConstValue":49,"../../../../game/scripts/UI/panel/GamePanel":55,"../../../../game/scripts/UI/panel/TeacherPanel":45,"../../Http/NetWork":6,"../../Manager/SoundManager":4,"../../Manager/UIManager":12,"../../SDK/GameMsg":16,"../BaseFrameUI":13},"path":"preview-scripts/assets/frame/scripts/UI/Panel/LoadingUI.js"},{"deps":{"../../Data/FrameMsgType":37,"../../Manager/ListenerManager":10},"path":"preview-scripts/assets/frame/scripts/UI/Item/TitleNode.js"},{"deps":{"../BaseFrameUI":13,"../Item/Tip":26},"path":"preview-scripts/assets/frame/scripts/UI/Panel/TipUI.js"},{"deps":{"./../../Manager/SoundManager":4,"../../Utils/Tools":39,"../BaseFrameUI":13,"../../Utils/UIHelp":41,"../../Manager/UIManager":12,"../../SDK/T2M":7,"../../Data/FrameMsgType":37,"../../../../game/scripts/Data/ConstValue":49},"path":"preview-scripts/assets/frame/scripts/UI/Panel/OverTips.js"},{"deps":{"./../../Manager/ListenerManager":10,"../BaseFrameUI":13,"../../Data/FrameMsgType":37,"../../Utils/UIHelp":41,"../../Manager/ReportManager":14,"../../Manager/SoundManager":4,"../../SDK/T2M":7,"../../../../game/scripts/Manager/EditorManager":44,"../../Manager/UIManager":12,"../../../../game/scripts/UI/panel/TeacherPanel":45},"path":"preview-scripts/assets/frame/scripts/UI/Panel/UploadAndReturnPanel.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Utils/BoundingBoxHelp.js"},{"deps":{"../../Http/NetWork":6,"../BaseFrameUI":13,"../../Utils/UIHelp":41,"../../../../game/scripts/Data/ConstValue":49,"../../../../game/scripts/Manager/EditorManager":44},"path":"preview-scripts/assets/frame/scripts/UI/Panel/SubmissionPanel.js"},{"deps":{"../../Data/FrameMsgType":37,"../../SDK/T2M":7,"../../Utils/UIHelp":41,"../BaseFrameUI":13},"path":"preview-scripts/assets/frame/scripts/UI/Panel/AffirmTips.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Utils/MathUtils.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Utils/HitTest.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Data/FrameMsgType.js"},{"deps":{"./../Manager/SoundManager":4},"path":"preview-scripts/assets/frame/scripts/Utils/AudioPlayExtension.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Utils/Tools.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Data/FrameSyncData.js"},{"deps":{"../../../game/scripts/UI/panel/GamePanel":55,"../../../game/scripts/UI/panel/TeacherPanel":45,"../Data/FrameMsgType":37,"../Manager/ListenerManager":10,"../Manager/UIManager":12,"../UI/Panel/AffirmTips":34,"../UI/Panel/ErrorPanel":23,"../UI/Panel/OverTips":30,"../UI/Panel/StarCount":25,"../UI/Panel/SubmissionPanel":33,"../UI/Panel/TipUI":29,"../UI/Panel/UploadAndReturnPanel":31},"path":"preview-scripts/assets/frame/scripts/Utils/UIHelp.js"},{"deps":{"../../../../frame/scripts/Manager/ListenerManager":10,"../../../../frame/scripts/Manager/SoundManager":4,"../../../../frame/scripts/Manager/SyncDataManager":11,"../../Data/EventType":43,"./Cube":54,"./QiepianPanel":48,"./SoundConfig":53,"./ThreeDNode":51},"path":"preview-scripts/assets/game/scripts/UI/Item/GameUI.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Data/EventType.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Manager/EditorManager.js"},{"deps":{"../../../../frame/scripts/Data/FrameMsgType":37,"../../../../frame/scripts/Manager/ListenerManager":10,"../../../../frame/scripts/Manager/ReportManager":14,"../../../../frame/scripts/Manager/UIManager":12,"../../../../frame/scripts/UI/Panel/BaseTeacherPanel":8,"../../../../frame/scripts/Utils/UIHelp":41,"../../Manager/EditorManager":44,"./GamePanel":55},"path":"preview-scripts/assets/game/scripts/UI/panel/TeacherPanel.js"},{"deps":{"../../Data/EventType":43,"../Item/GameUI":42,"../Item/ThreeDNode":51,"../Item/Cube":54,"../../../../frame/scripts/Manager/ListenerManager":10,"../../../../frame/scripts/SDK/T2M":7,"../../../../frame/scripts/Http/NetWork":6,"../../../../frame/scripts/Manager/SyncDataManager":11},"path":"preview-scripts/assets/game/scripts/UI/Layer/GameLayer.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Data/CustomSyncData.js"},{"deps":{"../../../../frame/scripts/Manager/SyncDataManager":11,"./Block":52},"path":"preview-scripts/assets/game/scripts/UI/Item/QiepianPanel.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Data/ConstValue.js"},{"deps":{"../../../frame/scripts/SDK/T2M":7},"path":"preview-scripts/assets/game/scripts/Components/DragSync.js"},{"deps":{"../../../../frame/scripts/Manager/ListenerManager":10,"../../../../frame/scripts/Manager/SyncDataManager":11,"../../Data/EventType":43,"./Cube":54},"path":"preview-scripts/assets/game/scripts/UI/Item/ThreeDNode.js"},{"deps":{"../../../../frame/scripts/Manager/SoundManager":4,"../../../../frame/scripts/Manager/SyncDataManager":11,"./SoundConfig":53},"path":"preview-scripts/assets/game/scripts/UI/Item/Block.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/UI/Item/SoundConfig.js"},{"deps":{"../../../../frame/scripts/Manager/ListenerManager":10,"../../../../frame/scripts/Manager/SoundManager":4,"../../../../frame/scripts/Manager/SyncDataManager":11,"../../Data/EventType":43,"./SoundConfig":53},"path":"preview-scripts/assets/game/scripts/UI/Item/Cube.js"},{"deps":{"../../../../frame/scripts/Manager/ListenerManager":10,"../../../../frame/scripts/UI/Panel/BaseGamePanel":24,"../../Data/EventType":43},"path":"preview-scripts/assets/game/scripts/UI/panel/GamePanel.js"}];
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
    