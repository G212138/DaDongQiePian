
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frame/scripts/Http/NetWork.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9cd01aQNbFMUY4sUMN0yYH5', 'NetWork');
// frame/scripts/Http/NetWork.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetWork = exports.NetWorkClass = void 0;
var ConstValue_1 = require("../../../game/scripts/Data/ConstValue");
var UIManager_1 = require("../Manager/UIManager");
var GameMsg_1 = require("../SDK/GameMsg");
var UIHelp_1 = require("../Utils/UIHelp");
var NetWorkClass = /** @class */ (function () {
    function NetWorkClass() {
        //判断是否是线上   URL里不加参数则默认为测试环境
        this.isOnlineEnv = this.GetIsOnline() == 'online';
        //判断是否是pc预加载的协议    URL里不加参数则默认为非预加载
        this.isOwcr = this.GetBPreload();
        // public readonly BASE = this.isOnlineEnv
        //     ? 'https://courseware-online.speiyou.com'
        //     : 'https://ceshi-courseware.speiyou.com';/*  */
        this.BASE = this.isOnlineEnv ? 'https://courseware-online.saasp.vdyoo.com' : 'https://ceshi-courseware-online.saasp.vdyoo.com';
        this.COS_URL = this.isOnlineEnv ?
            'https://classroom-api-online.saasp.vdyoo.com/micro-class/storage/v1/tencent/sts'
            : 'https://test-class-api-online.saasp.vdyoo.com/micro-class/storage/v1/tencent/sts';
        this.COS_BASE_URL = this.isOnlineEnv ? 'https://micro-class.xuepeiyou.com' : 'https://micro-class-test.xuepeiyou.com';
        this.GET_QUESTION = this.BASE + '/get';
        this.GET_USER_PROGRESS = this.BASE + '/get/answer';
        this.GET_TITLE = this.BASE + '/get/title';
        this.ADD = this.BASE + '/add';
        this.MODIFY = this.BASE + '/modify';
        this.CLEAR = this.BASE + '/clear';
        this.empty = false; //清理脏数据的开关，在URL里面拼此参数 = true；
        //新课堂参数
        this.userId = null; //用户id
        this.chapterId = null; //直播讲id
        this.coursewareId = null; //题目信息   用于交互游戏自身查题目信息
        this.titleId = null; //交互游戏绑定id   绑定的时候用（监课平台）  学生端不传
        this.bLive = null; //是否是直播
        this.bPreload = null; //是否预加载  （cdn/zip)
        this.env = null; //运行环境（线上/测试）
        this.app = null; //App名称
        this.platform = null; //硬件平台信息（pc/iPad/android/androidPad/web）
        this.channel = null; //使用方(辅导端、学生端、未来黑板、配齐、教研云、……）
        this.browser = null; //浏览器信息（内核及版本）
        this.appVersion = null; //端的版本信息
        this.isTeacher = false; //是否为教师（通过同步的get_role返回的是否为'teacher'）
        this.isSync = false; //是否为同步（通过同步的get_is_sync返回是否为1/true）
        this.isOffline = 0; //是否为离线模式
        this.isMaster = null; //是否是主动发心跳的一方
        this.isSupportKeepPlay = false; //是否支持接着玩重新玩
        this.theRequest = null;
    }
    NetWorkClass.getInstance = function () {
        if (this.instance == null) {
            this.instance = new NetWorkClass();
        }
        return this.instance;
    };
    NetWorkClass.prototype.setIsSync = function (isSync) {
        isSync = isSync == null ? false : isSync;
        exports.NetWork.isSync = isSync;
    };
    NetWorkClass.prototype.setIsTeacher = function (role) {
        var isTeacher = role == 'teacher';
        exports.NetWork.isTeacher = isTeacher;
    };
    NetWorkClass.prototype.setIsPreload = function (isPreload) {
        isPreload = isPreload == null ? false : isPreload;
        UIManager_1.UIManager.isGameShowing = !isPreload;
    };
    NetWorkClass.prototype.setIsMaster = function (isMaster) {
        isMaster = isMaster == null ? false : isMaster;
        exports.NetWork.isMaster = isMaster;
    };
    NetWorkClass.prototype.setIsSupportKeepPlay = function (isSupportKeepPlay) {
        exports.NetWork.isSupportKeepPlay = isSupportKeepPlay;
        if (!isSupportKeepPlay) {
            exports.NetWork.isMaster = exports.NetWork.isTeacher;
        }
        console.log("isSupportKeepPlay: " + isSupportKeepPlay);
    };
    /**
     * 请求网络Post 0成功 1超时
     * @param url
     * @param openType
     * @param contentType
     * @param callback
     * @param params
     */
    NetWorkClass.prototype.httpRequest = function (url, openType, contentType, callback, params) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        if (params === void 0) { params = ''; }
        //------------------离线模式-------------------------
        if (this.isOffline && url.substring(0, this.GET_QUESTION.length) == this.GET_QUESTION) {
            GameMsg_1.default.recv_json_data(function (data) {
                console.log('recv_json_data:', data);
                if (callback && data.jsonData.errcode == 0) {
                    callback(false, data.jsonData);
                }
                else {
                    UIHelp_1.UIHelp.showErrorPanel(data.jsonData.errmsg + ',请联系客服！', '', '', '确定', function () {
                        _this.httpRequest(url, openType, contentType, callback, params);
                    }, false);
                }
            });
            GameMsg_1.default.request_json_data({ coursewareId: this.coursewareId });
            return;
        }
        if (ConstValue_1.ConstValue.IS_TEACHER) {
            if (!this.titleId) {
                //教师端没有titleId的情况
                UIHelp_1.UIHelp.showErrorPanel('URL参数错误,缺少titleId,请联系技术人员！', '', '', '确定');
                return;
            }
        }
        else {
            //新课堂学生端  判断所有参数
            if (!ConstValue_1.ConstValue.IS_TEACHER &&
                (!this.userId || !this.coursewareId || !this.env || !this.app || !this.channel || !this.browser)) {
                GameMsg_1.default.URLError(this.theRequest);
                UIHelp_1.UIHelp.showErrorPanel('URL参数错误,请联系客服！', '', '', '确定');
                return;
            }
        }
        var xhr = new XMLHttpRequest();
        xhr.open(openType, url);
        xhr.timeout = 10000;
        xhr.setRequestHeader('Content-Type', contentType);
        xhr.withCredentials = true;
        //回调
        xhr.onreadystatechange = function () {
            console.log('httpRequest rsp status', xhr.status, '        xhr.readyState', xhr.readyState, '        xhr.responseText', xhr.responseText);
            if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status <= 400) {
                var response = JSON.parse(xhr.responseText);
                if (callback && response.errcode == 0) {
                    callback(false, response);
                }
                else {
                    GameMsg_1.default.httpError(response.errmsg);
                    if (ConstValue_1.ConstValue.IS_EDITIONS) {
                        UIHelp_1.UIHelp.showErrorPanel(response.errmsg + ',请联系客服！', '', '', '确定', function () {
                            _this.httpRequest(url, openType, contentType, callback, params);
                        }, false);
                    }
                }
            }
        };
        //超时回调
        xhr.ontimeout = function (event) {
            GameMsg_1.default.httpTimeOut('网络不佳，请稍后重试');
            if (ConstValue_1.ConstValue.IS_EDITIONS) {
                UIHelp_1.UIHelp.showErrorPanel('网络不佳，请稍后重试', '', '若重新连接无效，请联系客服', '重新连接', function () {
                    _this.httpRequest(url, openType, contentType, callback, params);
                }, true);
            }
            console.log('httpRequest timeout');
            callback && callback(true, null);
        };
        //出错
        xhr.onerror = function (error) {
            if (ConstValue_1.ConstValue.IS_EDITIONS) {
                UIHelp_1.UIHelp.showErrorPanel('网络出错，请稍后重试', '若重新连接无效，请联系客服', '', '重新连接', function () {
                    _this.httpRequest(url, openType, contentType, callback, params);
                }, true);
            }
            console.log('httpRequest error');
            callback && callback(true, null);
        };
        xhr.send(params);
    };
    /**
     * 获取url参数
     */
    NetWorkClass.prototype.GetRequest = function () {
        if (this.theRequest != null) {
            return this.theRequest;
        }
        this.theRequest = new Object();
        var url = location.search; //获取url中"?"符后的字串
        if (url.indexOf('?') != -1) {
            var str = url.substr(1);
            var strs = str.split('&');
            for (var i = 0; i < strs.length; i++) {
                this.theRequest[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1]);
            }
        }
        //新课堂url必需参数
        this.userId = this.theRequest['userId'];
        this.chapterId = this.theRequest['chapterId'];
        this.coursewareId = this.theRequest['coursewareId'];
        this.titleId = this.theRequest['titleId'];
        this.bLive = this.theRequest['bLive'];
        this.bPreload = this.theRequest['bPreload'];
        this.env = this.theRequest['env'];
        this.app = this.theRequest['app'];
        this.platform = this.theRequest['platform'];
        this.channel = this.theRequest['channel'];
        this.browser = this.theRequest['browser'];
        this.appVersion = this.theRequest['appVersion'];
        this.empty = this.theRequest['empty'];
        this.isOffline = parseInt(this.theRequest['isOffline']); //离线模式
        return this.theRequest;
    };
    NetWorkClass.prototype.GetBPreload = function () {
        var BPreload = 0;
        if (this.GetRequest()['bPreload']) {
            BPreload = this.GetRequest()['bPreload'];
        }
        return BPreload;
    };
    NetWorkClass.prototype.GetIsOnline = function () {
        var isOnline = 'test';
        if (this.GetRequest()['env']) {
            isOnline = this.GetRequest()['env'];
        }
        return isOnline;
    };
    return NetWorkClass;
}());
exports.NetWorkClass = NetWorkClass;
exports.NetWork = NetWorkClass.getInstance();

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVcXHNjcmlwdHNcXEh0dHBcXE5ldFdvcmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQW1FO0FBQ25FLGtEQUFpRDtBQUNqRCwwQ0FBcUM7QUFDckMsMENBQXlDO0FBQ3pDO0lBQUE7UUFHSSw0QkFBNEI7UUFDWixnQkFBVyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxRQUFRLENBQUM7UUFDN0QsbUNBQW1DO1FBQ25CLFdBQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDNUMsMENBQTBDO1FBQzFDLGdEQUFnRDtRQUNoRCxzREFBc0Q7UUFDdEMsU0FBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLDJDQUEyQyxDQUFDLENBQUMsQ0FBQyxpREFBaUQsQ0FBQztRQUMxSCxZQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3hDLGlGQUFpRjtZQUNqRixDQUFDLENBQUMsa0ZBQWtGLENBQUM7UUFDekUsaUJBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLENBQUMsd0NBQXdDLENBQUM7UUFFakgsaUJBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUNsQyxzQkFBaUIsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQztRQUM5QyxjQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7UUFDckMsUUFBRyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLFdBQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUMvQixVQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7UUFFdEMsVUFBSyxHQUFZLEtBQUssQ0FBQyxDQUFDLDZCQUE2QjtRQUU1RCxPQUFPO1FB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QUFDLE1BQU07UUFFL0QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFFTSxrQ0FBVyxHQUFsQjtRQUNJLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUMvQixRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVNLGtDQUFXLEdBQWxCO1FBQ0ksSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzFCLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdkM7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQXJRQSxBQXFRQyxJQUFBO0FBclFZLG9DQUFZO0FBdVFaLFFBQUEsT0FBTyxHQUFHLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0VmFsdWUgfSBmcm9tICcuLi8uLi8uLi9nYW1lL3NjcmlwdHMvRGF0YS9Db25zdFZhbHVlJztcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gJy4uL01hbmFnZXIvVUlNYW5hZ2VyJztcbmltcG9ydCBHYW1lTXNnIGZyb20gJy4uL1NESy9HYW1lTXNnJztcbmltcG9ydCB7IFVJSGVscCB9IGZyb20gJy4uL1V0aWxzL1VJSGVscCc7XG5leHBvcnQgY2xhc3MgTmV0V29ya0NsYXNzIHtcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogTmV0V29ya0NsYXNzO1xuXG4gICAgLy/liKTmlq3mmK/lkKbmmK/nur/kuIogICBVUkzph4zkuI3liqDlj4LmlbDliJnpu5jorqTkuLrmtYvor5Xnjq/looNcbiAgICBwdWJsaWMgcmVhZG9ubHkgaXNPbmxpbmVFbnYgPSB0aGlzLkdldElzT25saW5lKCkgPT0gJ29ubGluZSc7XG4gICAgLy/liKTmlq3mmK/lkKbmmK9wY+mihOWKoOi9veeahOWNj+iuriAgICBVUkzph4zkuI3liqDlj4LmlbDliJnpu5jorqTkuLrpnZ7pooTliqDovb1cbiAgICBwdWJsaWMgcmVhZG9ubHkgaXNPd2NyID0gdGhpcy5HZXRCUHJlbG9hZCgpO1xuICAgIC8vIHB1YmxpYyByZWFkb25seSBCQVNFID0gdGhpcy5pc09ubGluZUVudlxuICAgIC8vICAgICA/ICdodHRwczovL2NvdXJzZXdhcmUtb25saW5lLnNwZWl5b3UuY29tJ1xuICAgIC8vICAgICA6ICdodHRwczovL2Nlc2hpLWNvdXJzZXdhcmUuc3BlaXlvdS5jb20nOy8qICAqL1xuICAgIHB1YmxpYyByZWFkb25seSBCQVNFID0gdGhpcy5pc09ubGluZUVudiA/ICdodHRwczovL2NvdXJzZXdhcmUtb25saW5lLnNhYXNwLnZkeW9vLmNvbScgOiAnaHR0cHM6Ly9jZXNoaS1jb3Vyc2V3YXJlLW9ubGluZS5zYWFzcC52ZHlvby5jb20nO1xuICAgIHB1YmxpYyByZWFkb25seSBDT1NfVVJMID0gdGhpcy5pc09ubGluZUVudiA/XG4gICAgICAgICdodHRwczovL2NsYXNzcm9vbS1hcGktb25saW5lLnNhYXNwLnZkeW9vLmNvbS9taWNyby1jbGFzcy9zdG9yYWdlL3YxL3RlbmNlbnQvc3RzJ1xuICAgICAgICA6ICdodHRwczovL3Rlc3QtY2xhc3MtYXBpLW9ubGluZS5zYWFzcC52ZHlvby5jb20vbWljcm8tY2xhc3Mvc3RvcmFnZS92MS90ZW5jZW50L3N0cyc7XG4gICAgcHVibGljIHJlYWRvbmx5IENPU19CQVNFX1VSTCA9IHRoaXMuaXNPbmxpbmVFbnYgPyAnaHR0cHM6Ly9taWNyby1jbGFzcy54dWVwZWl5b3UuY29tJyA6ICdodHRwczovL21pY3JvLWNsYXNzLXRlc3QueHVlcGVpeW91LmNvbSc7XG5cbiAgICBwdWJsaWMgcmVhZG9ubHkgR0VUX1FVRVNUSU9OID0gdGhpcy5CQVNFICsgJy9nZXQnO1xuICAgIHB1YmxpYyByZWFkb25seSBHRVRfVVNFUl9QUk9HUkVTUyA9IHRoaXMuQkFTRSArICcvZ2V0L2Fuc3dlcic7XG4gICAgcHVibGljIHJlYWRvbmx5IEdFVF9USVRMRSA9IHRoaXMuQkFTRSArICcvZ2V0L3RpdGxlJztcbiAgICBwdWJsaWMgcmVhZG9ubHkgQUREID0gdGhpcy5CQVNFICsgJy9hZGQnO1xuICAgIHB1YmxpYyByZWFkb25seSBNT0RJRlkgPSB0aGlzLkJBU0UgKyAnL21vZGlmeSc7XG4gICAgcHVibGljIHJlYWRvbmx5IENMRUFSID0gdGhpcy5CQVNFICsgJy9jbGVhcic7XG5cbiAgICBwdWJsaWMgZW1wdHk6IGJvb2xlYW4gPSBmYWxzZTsgLy/muIXnkIbohI/mlbDmja7nmoTlvIDlhbPvvIzlnKhVUkzph4zpnaLmi7zmraTlj4LmlbAgPSB0cnVl77ybXG5cbiAgICAvL+aWsOivvuWgguWPguaVsFxuICAgIHB1YmxpYyB1c2VySWQgPSBudWxsOyAvL+eUqOaIt2lkXG4gICAgcHVibGljIGNoYXB0ZXJJZCA9IG51bGw7IC8v55u05pKt6K6yaWRcbiAgICBwdWJsaWMgY291cnNld2FyZUlkID0gbnVsbDsgLy/popjnm67kv6Hmga8gICDnlKjkuo7kuqTkupLmuLjmiI/oh6rouqvmn6Xpopjnm67kv6Hmga9cbiAgICBwdWJsaWMgdGl0bGVJZCA9IG51bGw7IC8v5Lqk5LqS5ri45oiP57uR5a6aaWQgICDnu5HlrprnmoTml7blgJnnlKjvvIjnm5Hor77lubPlj7DvvIkgIOWtpueUn+err+S4jeS8oFxuICAgIHB1YmxpYyBiTGl2ZSA9IG51bGw7IC8v5piv5ZCm5piv55u05pKtXG4gICAgcHVibGljIGJQcmVsb2FkID0gbnVsbDsgLy/mmK/lkKbpooTliqDovb0gIO+8iGNkbi96aXApXG4gICAgcHVibGljIGVudiA9IG51bGw7IC8v6L+Q6KGM546v5aKD77yI57q/5LiKL+a1i+ivle+8iVxuICAgIHB1YmxpYyBhcHAgPSBudWxsOyAvL0FwcOWQjeensFxuICAgIHB1YmxpYyBwbGF0Zm9ybSA9IG51bGw7IC8v56Gs5Lu25bmz5Y+w5L+h5oGv77yIcGMvaVBhZC9hbmRyb2lkL2FuZHJvaWRQYWQvd2Vi77yJXG4gICAgcHVibGljIGNoYW5uZWwgPSBudWxsOyAvL+S9v+eUqOaWuSjovoXlr7znq6/jgIHlrabnlJ/nq6/jgIHmnKrmnaXpu5Hmnb/jgIHphY3pvZDjgIHmlZnnoJTkupHjgIHigKbigKbvvIlcbiAgICBwdWJsaWMgYnJvd3NlciA9IG51bGw7IC8v5rWP6KeI5Zmo5L+h5oGv77yI5YaF5qC45Y+K54mI5pys77yJXG4gICAgcHVibGljIGFwcFZlcnNpb24gPSBudWxsOyAvL+err+eahOeJiOacrOS/oeaBr1xuICAgIHB1YmxpYyBpc1RlYWNoZXIgPSBmYWxzZTsgLy/mmK/lkKbkuLrmlZnluIjvvIjpgJrov4flkIzmraXnmoRnZXRfcm9sZei/lOWbnueahOaYr+WQpuS4uid0ZWFjaGVyJ++8iVxuICAgIHB1YmxpYyBpc1N5bmMgPSBmYWxzZTsgLy/mmK/lkKbkuLrlkIzmraXvvIjpgJrov4flkIzmraXnmoRnZXRfaXNfc3luY+i/lOWbnuaYr+WQpuS4ujEvdHJ1Ze+8iVxuICAgIHB1YmxpYyBpc09mZmxpbmUgPSAwOyAvL+aYr+WQpuS4uuemu+e6v+aooeW8j1xuICAgIHB1YmxpYyBpc01hc3RlciA9IG51bGw7IC8v5piv5ZCm5piv5Li75Yqo5Y+R5b+D6Lez55qE5LiA5pa5XG4gICAgcHVibGljIGlzU3VwcG9ydEtlZXBQbGF5ID0gZmFsc2U7IC8v5piv5ZCm5pSv5oyB5o6l552A546p6YeN5paw546pXG5cbiAgICBwdWJsaWMgdGhlUmVxdWVzdCA9IG51bGw7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IE5ldFdvcmtDbGFzcygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRJc1N5bmMoaXNTeW5jOiBib29sZWFuKSB7XG4gICAgICAgIGlzU3luYyA9IGlzU3luYyA9PSBudWxsID8gZmFsc2UgOiBpc1N5bmM7XG4gICAgICAgIE5ldFdvcmsuaXNTeW5jID0gaXNTeW5jO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRJc1RlYWNoZXIocm9sZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBpc1RlYWNoZXIgPSByb2xlID09ICd0ZWFjaGVyJztcbiAgICAgICAgTmV0V29yay5pc1RlYWNoZXIgPSBpc1RlYWNoZXI7XG4gICAgfVxuXG4gICAgcHVibGljIHNldElzUHJlbG9hZChpc1ByZWxvYWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgaXNQcmVsb2FkID0gaXNQcmVsb2FkID09IG51bGwgPyBmYWxzZSA6IGlzUHJlbG9hZDtcbiAgICAgICAgVUlNYW5hZ2VyLmlzR2FtZVNob3dpbmcgPSAhaXNQcmVsb2FkO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRJc01hc3Rlcihpc01hc3RlcjogYm9vbGVhbikge1xuICAgICAgICBpc01hc3RlciA9IGlzTWFzdGVyID09IG51bGwgPyBmYWxzZSA6IGlzTWFzdGVyO1xuICAgICAgICBOZXRXb3JrLmlzTWFzdGVyID0gaXNNYXN0ZXI7XG4gICAgfVxuXG4gICAgcHVibGljIHNldElzU3VwcG9ydEtlZXBQbGF5KGlzU3VwcG9ydEtlZXBQbGF5OiBib29sZWFuKSB7XG4gICAgICAgIE5ldFdvcmsuaXNTdXBwb3J0S2VlcFBsYXkgPSBpc1N1cHBvcnRLZWVwUGxheTtcbiAgICAgICAgaWYgKCFpc1N1cHBvcnRLZWVwUGxheSkge1xuICAgICAgICAgICAgTmV0V29yay5pc01hc3RlciA9IE5ldFdvcmsuaXNUZWFjaGVyO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGBpc1N1cHBvcnRLZWVwUGxheTogJHtpc1N1cHBvcnRLZWVwUGxheX1gKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDor7fmsYLnvZHnu5xQb3N0IDDmiJDlip8gMei2heaXtlxuICAgICAqIEBwYXJhbSB1cmxcbiAgICAgKiBAcGFyYW0gb3BlblR5cGVcbiAgICAgKiBAcGFyYW0gY29udGVudFR5cGVcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0gcGFyYW1zXG4gICAgICovXG4gICAgcHVibGljIGh0dHBSZXF1ZXN0KHVybDogc3RyaW5nLCBvcGVuVHlwZSwgY29udGVudFR5cGUsIGNhbGxiYWNrID0gbnVsbCwgcGFyYW1zID0gJycpIHtcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS3nprvnur/mqKHlvI8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIGlmICh0aGlzLmlzT2ZmbGluZSAmJiB1cmwuc3Vic3RyaW5nKDAsIHRoaXMuR0VUX1FVRVNUSU9OLmxlbmd0aCkgPT0gdGhpcy5HRVRfUVVFU1RJT04pIHtcbiAgICAgICAgICAgIEdhbWVNc2cucmVjdl9qc29uX2RhdGEoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVjdl9qc29uX2RhdGE6JywgZGF0YSk7XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrICYmIGRhdGEuanNvbkRhdGEuZXJyY29kZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGZhbHNlLCBkYXRhLmpzb25EYXRhKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBVSUhlbHAuc2hvd0Vycm9yUGFuZWwoXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmpzb25EYXRhLmVycm1zZyArICcs6K+36IGU57O75a6i5pyN77yBJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAn56Gu5a6aJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmh0dHBSZXF1ZXN0KHVybCwgb3BlblR5cGUsIGNvbnRlbnRUeXBlLCBjYWxsYmFjaywgcGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIEdhbWVNc2cucmVxdWVzdF9qc29uX2RhdGEoeyBjb3Vyc2V3YXJlSWQ6IHRoaXMuY291cnNld2FyZUlkIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKENvbnN0VmFsdWUuSVNfVEVBQ0hFUikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnRpdGxlSWQpIHtcbiAgICAgICAgICAgICAgICAvL+aVmeW4iOerr+ayoeaciXRpdGxlSWTnmoTmg4XlhrVcbiAgICAgICAgICAgICAgICBVSUhlbHAuc2hvd0Vycm9yUGFuZWwoJ1VSTOWPguaVsOmUmeivryznvLrlsJF0aXRsZUlkLOivt+iBlOezu+aKgOacr+S6uuWRmO+8gScsICcnLCAnJywgJ+ehruWumicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8v5paw6K++5aCC5a2m55Sf56uvICDliKTmlq3miYDmnInlj4LmlbBcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAhQ29uc3RWYWx1ZS5JU19URUFDSEVSICYmXG4gICAgICAgICAgICAgICAgKCF0aGlzLnVzZXJJZCB8fCAhdGhpcy5jb3Vyc2V3YXJlSWQgfHwgIXRoaXMuZW52IHx8ICF0aGlzLmFwcCB8fCAhdGhpcy5jaGFubmVsIHx8ICF0aGlzLmJyb3dzZXIpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBHYW1lTXNnLlVSTEVycm9yKHRoaXMudGhlUmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgVUlIZWxwLnNob3dFcnJvclBhbmVsKCdVUkzlj4LmlbDplJnor68s6K+36IGU57O75a6i5pyN77yBJywgJycsICcnLCAn56Gu5a6aJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIub3BlbihvcGVuVHlwZSwgdXJsKTtcbiAgICAgICAgeGhyLnRpbWVvdXQgPSAxMDAwMDtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIGNvbnRlbnRUeXBlKTtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cbiAgICAgICAgLy/lm57osINcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICdodHRwUmVxdWVzdCByc3Agc3RhdHVzJyxcbiAgICAgICAgICAgICAgICB4aHIuc3RhdHVzLFxuICAgICAgICAgICAgICAgICcgICAgICAgIHhoci5yZWFkeVN0YXRlJyxcbiAgICAgICAgICAgICAgICB4aHIucmVhZHlTdGF0ZSxcbiAgICAgICAgICAgICAgICAnICAgICAgICB4aHIucmVzcG9uc2VUZXh0JyxcbiAgICAgICAgICAgICAgICB4aHIucmVzcG9uc2VUZXh0LFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0ICYmIHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPD0gNDAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgJiYgcmVzcG9uc2UuZXJyY29kZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGZhbHNlLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1zZy5odHRwRXJyb3IocmVzcG9uc2UuZXJybXNnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKENvbnN0VmFsdWUuSVNfRURJVElPTlMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFVJSGVscC5zaG93RXJyb3JQYW5lbChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5lcnJtc2cgKyAnLOivt+iBlOezu+Wuouacje+8gScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ+ehruWumicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmh0dHBSZXF1ZXN0KHVybCwgb3BlblR5cGUsIGNvbnRlbnRUeXBlLCBjYWxsYmFjaywgcGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvL+i2heaXtuWbnuiwg1xuICAgICAgICB4aHIub250aW1lb3V0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBHYW1lTXNnLmh0dHBUaW1lT3V0KCfnvZHnu5zkuI3kvbPvvIzor7fnqI3lkI7ph43or5UnKTtcbiAgICAgICAgICAgIGlmIChDb25zdFZhbHVlLklTX0VESVRJT05TKSB7XG4gICAgICAgICAgICAgICAgVUlIZWxwLnNob3dFcnJvclBhbmVsKFxuICAgICAgICAgICAgICAgICAgICAn572R57uc5LiN5L2z77yM6K+356iN5ZCO6YeN6K+VJyxcbiAgICAgICAgICAgICAgICAgICAgJycsXG4gICAgICAgICAgICAgICAgICAgICfoi6Xph43mlrDov57mjqXml6DmlYjvvIzor7fogZTns7vlrqLmnI0nLFxuICAgICAgICAgICAgICAgICAgICAn6YeN5paw6L+e5o6lJyxcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5odHRwUmVxdWVzdCh1cmwsIG9wZW5UeXBlLCBjb250ZW50VHlwZSwgY2FsbGJhY2ssIHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdodHRwUmVxdWVzdCB0aW1lb3V0Jyk7XG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayh0cnVlLCBudWxsKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvL+WHuumUmVxuICAgICAgICB4aHIub25lcnJvciA9IChlcnJvcikgPT4ge1xuICAgICAgICAgICAgaWYgKENvbnN0VmFsdWUuSVNfRURJVElPTlMpIHtcbiAgICAgICAgICAgICAgICBVSUhlbHAuc2hvd0Vycm9yUGFuZWwoXG4gICAgICAgICAgICAgICAgICAgICfnvZHnu5zlh7rplJnvvIzor7fnqI3lkI7ph43or5UnLFxuICAgICAgICAgICAgICAgICAgICAn6Iul6YeN5paw6L+e5o6l5peg5pWI77yM6K+36IGU57O75a6i5pyNJyxcbiAgICAgICAgICAgICAgICAgICAgJycsXG4gICAgICAgICAgICAgICAgICAgICfph43mlrDov57mjqUnLFxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmh0dHBSZXF1ZXN0KHVybCwgb3BlblR5cGUsIGNvbnRlbnRUeXBlLCBjYWxsYmFjaywgcGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2h0dHBSZXF1ZXN0IGVycm9yJyk7XG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayh0cnVlLCBudWxsKTtcbiAgICAgICAgfTtcblxuICAgICAgICB4aHIuc2VuZChwYXJhbXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPlnVybOWPguaVsFxuICAgICAqL1xuICAgIHB1YmxpYyBHZXRSZXF1ZXN0KCkge1xuICAgICAgICBpZiAodGhpcy50aGVSZXF1ZXN0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRoZVJlcXVlc3Q7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50aGVSZXF1ZXN0ID0gbmV3IE9iamVjdCgpO1xuICAgICAgICB2YXIgdXJsID0gbG9jYXRpb24uc2VhcmNoOyAvL+iOt+WPlnVybOS4rVwiP1wi56ym5ZCO55qE5a2X5LiyXG5cbiAgICAgICAgaWYgKHVybC5pbmRleE9mKCc/JykgIT0gLTEpIHtcbiAgICAgICAgICAgIHZhciBzdHIgPSB1cmwuc3Vic3RyKDEpO1xuICAgICAgICAgICAgdmFyIHN0cnMgPSBzdHIuc3BsaXQoJyYnKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3Rycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMudGhlUmVxdWVzdFtzdHJzW2ldLnNwbGl0KCc9JylbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHN0cnNbaV0uc3BsaXQoJz0nKVsxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL+aWsOivvuWggnVybOW/hemcgOWPguaVsFxuICAgICAgICB0aGlzLnVzZXJJZCA9IHRoaXMudGhlUmVxdWVzdFsndXNlcklkJ107XG4gICAgICAgIHRoaXMuY2hhcHRlcklkID0gdGhpcy50aGVSZXF1ZXN0WydjaGFwdGVySWQnXTtcbiAgICAgICAgdGhpcy5jb3Vyc2V3YXJlSWQgPSB0aGlzLnRoZVJlcXVlc3RbJ2NvdXJzZXdhcmVJZCddO1xuICAgICAgICB0aGlzLnRpdGxlSWQgPSB0aGlzLnRoZVJlcXVlc3RbJ3RpdGxlSWQnXTtcbiAgICAgICAgdGhpcy5iTGl2ZSA9IHRoaXMudGhlUmVxdWVzdFsnYkxpdmUnXTtcbiAgICAgICAgdGhpcy5iUHJlbG9hZCA9IHRoaXMudGhlUmVxdWVzdFsnYlByZWxvYWQnXTtcbiAgICAgICAgdGhpcy5lbnYgPSB0aGlzLnRoZVJlcXVlc3RbJ2VudiddO1xuICAgICAgICB0aGlzLmFwcCA9IHRoaXMudGhlUmVxdWVzdFsnYXBwJ107XG4gICAgICAgIHRoaXMucGxhdGZvcm0gPSB0aGlzLnRoZVJlcXVlc3RbJ3BsYXRmb3JtJ107XG4gICAgICAgIHRoaXMuY2hhbm5lbCA9IHRoaXMudGhlUmVxdWVzdFsnY2hhbm5lbCddO1xuICAgICAgICB0aGlzLmJyb3dzZXIgPSB0aGlzLnRoZVJlcXVlc3RbJ2Jyb3dzZXInXTtcbiAgICAgICAgdGhpcy5hcHBWZXJzaW9uID0gdGhpcy50aGVSZXF1ZXN0WydhcHBWZXJzaW9uJ107XG4gICAgICAgIHRoaXMuZW1wdHkgPSB0aGlzLnRoZVJlcXVlc3RbJ2VtcHR5J107XG4gICAgICAgIHRoaXMuaXNPZmZsaW5lID0gcGFyc2VJbnQodGhpcy50aGVSZXF1ZXN0Wydpc09mZmxpbmUnXSk7IC8v56a757q/5qih5byPXG5cbiAgICAgICAgcmV0dXJuIHRoaXMudGhlUmVxdWVzdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgR2V0QlByZWxvYWQoKSB7XG4gICAgICAgIGxldCBCUHJlbG9hZCA9IDA7XG4gICAgICAgIGlmICh0aGlzLkdldFJlcXVlc3QoKVsnYlByZWxvYWQnXSkge1xuICAgICAgICAgICAgQlByZWxvYWQgPSB0aGlzLkdldFJlcXVlc3QoKVsnYlByZWxvYWQnXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQlByZWxvYWQ7XG4gICAgfVxuXG4gICAgcHVibGljIEdldElzT25saW5lKCkge1xuICAgICAgICBsZXQgaXNPbmxpbmUgPSAndGVzdCc7XG4gICAgICAgIGlmICh0aGlzLkdldFJlcXVlc3QoKVsnZW52J10pIHtcbiAgICAgICAgICAgIGlzT25saW5lID0gdGhpcy5HZXRSZXF1ZXN0KClbJ2VudiddO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc09ubGluZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBOZXRXb3JrID0gTmV0V29ya0NsYXNzLmdldEluc3RhbmNlKCk7XG4iXX0=