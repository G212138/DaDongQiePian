
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
        this.BASE = this.isOnlineEnv
            ? 'https://courseware-online.speiyou.com'
            : 'https://ceshi-courseware.speiyou.com'; /*  */
        // public readonly BASE = this.isOnlineEnv ? 'https://courseware-online.saasp.vdyoo.com' : 'https://ceshi-courseware-online.saasp.vdyoo.com';
        // public readonly COS_URL = this.isOnlineEnv ?
        //     'https://classroom-api-online.saasp.vdyoo.com/micro-class/storage/v1/tencent/sts'
        //     : 'https://test-class-api-online.saasp.vdyoo.com/micro-class/storage/v1/tencent/sts';
        // public readonly COS_BASE_URL = this.isOnlineEnv ? 'https://micro-class.xuepeiyou.com' : 'https://micro-class-test.xuepeiyou.com';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVcXHNjcmlwdHNcXEh0dHBcXE5ldFdvcmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQW1FO0FBQ25FLGtEQUFpRDtBQUNqRCwwQ0FBcUM7QUFDckMsMENBQXlDO0FBQ3pDO0lBQUE7UUFHSSw0QkFBNEI7UUFDWixnQkFBVyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxRQUFRLENBQUM7UUFDN0QsbUNBQW1DO1FBQ25CLFdBQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDNUIsU0FBSSxHQUFHLElBQUksQ0FBQyxXQUFXO1lBQ25DLENBQUMsQ0FBQyx1Q0FBdUM7WUFDekMsQ0FBQyxDQUFDLHNDQUFzQyxDQUFDLENBQUEsTUFBTTtRQUNuRCw2SUFBNkk7UUFDN0ksK0NBQStDO1FBQy9DLHdGQUF3RjtRQUN4Riw0RkFBNEY7UUFDNUYsb0lBQW9JO1FBRXBILGlCQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFDbEMsc0JBQWlCLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUM7UUFDOUMsY0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO1FBQ3JDLFFBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUN6QixXQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDL0IsVUFBSyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1FBRXRDLFVBQUssR0FBWSxLQUFLLENBQUMsQ0FBQyw2QkFBNkI7UUFFNUQsT0FBTztRQUNBLFdBQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxNQUFNO1FBQ3JCLGNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPO1FBQ3pCLGlCQUFZLEdBQUcsSUFBSSxDQUFDLENBQUMsc0JBQXNCO1FBQzNDLFlBQU8sR0FBRyxJ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QUFFLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDL0IsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFTSxrQ0FBVyxHQUFsQjtRQUNJLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMxQixRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3ZDO1FBQ0QsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FyUUEsQUFxUUMsSUFBQTtBQXJRWSxvQ0FBWTtBQXVRWixRQUFBLE9BQU8sR0FBRyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25zdFZhbHVlIH0gZnJvbSAnLi4vLi4vLi4vZ2FtZS9zY3JpcHRzL0RhdGEvQ29uc3RWYWx1ZSc7XG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tICcuLi9NYW5hZ2VyL1VJTWFuYWdlcic7XG5pbXBvcnQgR2FtZU1zZyBmcm9tICcuLi9TREsvR2FtZU1zZyc7XG5pbXBvcnQgeyBVSUhlbHAgfSBmcm9tICcuLi9VdGlscy9VSUhlbHAnO1xuZXhwb3J0IGNsYXNzIE5ldFdvcmtDbGFzcyB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IE5ldFdvcmtDbGFzcztcblxuICAgIC8v5Yik5pat5piv5ZCm5piv57q/5LiKICAgVVJM6YeM5LiN5Yqg5Y+C5pWw5YiZ6buY6K6k5Li65rWL6K+V546v5aKDXG4gICAgcHVibGljIHJlYWRvbmx5IGlzT25saW5lRW52ID0gdGhpcy5HZXRJc09ubGluZSgpID09ICdvbmxpbmUnO1xuICAgIC8v5Yik5pat5piv5ZCm5pivcGPpooTliqDovb3nmoTljY/orq4gICAgVVJM6YeM5LiN5Yqg5Y+C5pWw5YiZ6buY6K6k5Li66Z2e6aKE5Yqg6L29XG4gICAgcHVibGljIHJlYWRvbmx5IGlzT3djciA9IHRoaXMuR2V0QlByZWxvYWQoKTtcbiAgICBwdWJsaWMgcmVhZG9ubHkgQkFTRSA9IHRoaXMuaXNPbmxpbmVFbnZcbiAgICAgICAgPyAnaHR0cHM6Ly9jb3Vyc2V3YXJlLW9ubGluZS5zcGVpeW91LmNvbSdcbiAgICAgICAgOiAnaHR0cHM6Ly9jZXNoaS1jb3Vyc2V3YXJlLnNwZWl5b3UuY29tJzsvKiAgKi9cbiAgICAvLyBwdWJsaWMgcmVhZG9ubHkgQkFTRSA9IHRoaXMuaXNPbmxpbmVFbnYgPyAnaHR0cHM6Ly9jb3Vyc2V3YXJlLW9ubGluZS5zYWFzcC52ZHlvby5jb20nIDogJ2h0dHBzOi8vY2VzaGktY291cnNld2FyZS1vbmxpbmUuc2Fhc3AudmR5b28uY29tJztcbiAgICAvLyBwdWJsaWMgcmVhZG9ubHkgQ09TX1VSTCA9IHRoaXMuaXNPbmxpbmVFbnYgP1xuICAgIC8vICAgICAnaHR0cHM6Ly9jbGFzc3Jvb20tYXBpLW9ubGluZS5zYWFzcC52ZHlvby5jb20vbWljcm8tY2xhc3Mvc3RvcmFnZS92MS90ZW5jZW50L3N0cydcbiAgICAvLyAgICAgOiAnaHR0cHM6Ly90ZXN0LWNsYXNzLWFwaS1vbmxpbmUuc2Fhc3AudmR5b28uY29tL21pY3JvLWNsYXNzL3N0b3JhZ2UvdjEvdGVuY2VudC9zdHMnO1xuICAgIC8vIHB1YmxpYyByZWFkb25seSBDT1NfQkFTRV9VUkwgPSB0aGlzLmlzT25saW5lRW52ID8gJ2h0dHBzOi8vbWljcm8tY2xhc3MueHVlcGVpeW91LmNvbScgOiAnaHR0cHM6Ly9taWNyby1jbGFzcy10ZXN0Lnh1ZXBlaXlvdS5jb20nO1xuXG4gICAgcHVibGljIHJlYWRvbmx5IEdFVF9RVUVTVElPTiA9IHRoaXMuQkFTRSArICcvZ2V0JztcbiAgICBwdWJsaWMgcmVhZG9ubHkgR0VUX1VTRVJfUFJPR1JFU1MgPSB0aGlzLkJBU0UgKyAnL2dldC9hbnN3ZXInO1xuICAgIHB1YmxpYyByZWFkb25seSBHRVRfVElUTEUgPSB0aGlzLkJBU0UgKyAnL2dldC90aXRsZSc7XG4gICAgcHVibGljIHJlYWRvbmx5IEFERCA9IHRoaXMuQkFTRSArICcvYWRkJztcbiAgICBwdWJsaWMgcmVhZG9ubHkgTU9ESUZZID0gdGhpcy5CQVNFICsgJy9tb2RpZnknO1xuICAgIHB1YmxpYyByZWFkb25seSBDTEVBUiA9IHRoaXMuQkFTRSArICcvY2xlYXInO1xuXG4gICAgcHVibGljIGVtcHR5OiBib29sZWFuID0gZmFsc2U7IC8v5riF55CG6ISP5pWw5o2u55qE5byA5YWz77yM5ZyoVVJM6YeM6Z2i5ou85q2k5Y+C5pWwID0gdHJ1Ze+8m1xuXG4gICAgLy/mlrDor77loILlj4LmlbBcbiAgICBwdWJsaWMgdXNlcklkID0gbnVsbDsgLy/nlKjmiLdpZFxuICAgIHB1YmxpYyBjaGFwdGVySWQgPSBudWxsOyAvL+ebtOaSreiusmlkXG4gICAgcHVibGljIGNvdXJzZXdhcmVJZCA9IG51bGw7IC8v6aKY55uu5L+h5oGvICAg55So5LqO5Lqk5LqS5ri45oiP6Ieq6Lqr5p+l6aKY55uu5L+h5oGvXG4gICAgcHVibGljIHRpdGxlSWQgPSBudWxsOyAvL+S6pOS6kua4uOaIj+e7keWummlkICAg57uR5a6a55qE5pe25YCZ55So77yI55uR6K++5bmz5Y+w77yJICDlrabnlJ/nq6/kuI3kvKBcbiAgICBwdWJsaWMgYkxpdmUgPSBudWxsOyAvL+aYr+WQpuaYr+ebtOaSrVxuICAgIHB1YmxpYyBiUHJlbG9hZCA9IG51bGw7IC8v5piv5ZCm6aKE5Yqg6L29ICDvvIhjZG4vemlwKVxuICAgIHB1YmxpYyBlbnYgPSBudWxsOyAvL+i/kOihjOeOr+Wig++8iOe6v+S4ii/mtYvor5XvvIlcbiAgICBwdWJsaWMgYXBwID0gbnVsbDsgLy9BcHDlkI3np7BcbiAgICBwdWJsaWMgcGxhdGZvcm0gPSBudWxsOyAvL+ehrOS7tuW5s+WPsOS/oeaBr++8iHBjL2lQYWQvYW5kcm9pZC9hbmRyb2lkUGFkL3dlYu+8iVxuICAgIHB1YmxpYyBjaGFubmVsID0gbnVsbDsgLy/kvb/nlKjmlrko6L6F5a+856uv44CB5a2m55Sf56uv44CB5pyq5p2l6buR5p2/44CB6YWN6b2Q44CB5pWZ56CU5LqR44CB4oCm4oCm77yJXG4gICAgcHVibGljIGJyb3dzZXIgPSBudWxsOyAvL+a1j+iniOWZqOS/oeaBr++8iOWGheaguOWPiueJiOacrO+8iVxuICAgIHB1YmxpYyBhcHBWZXJzaW9uID0gbnVsbDsgLy/nq6/nmoTniYjmnKzkv6Hmga9cbiAgICBwdWJsaWMgaXNUZWFjaGVyID0gZmFsc2U7IC8v5piv5ZCm5Li65pWZ5biI77yI6YCa6L+H5ZCM5q2l55qEZ2V0X3JvbGXov5Tlm57nmoTmmK/lkKbkuLondGVhY2hlcifvvIlcbiAgICBwdWJsaWMgaXNTeW5jID0gZmFsc2U7IC8v5piv5ZCm5Li65ZCM5q2l77yI6YCa6L+H5ZCM5q2l55qEZ2V0X2lzX3N5bmPov5Tlm57mmK/lkKbkuLoxL3RydWXvvIlcbiAgICBwdWJsaWMgaXNPZmZsaW5lID0gMDsgLy/mmK/lkKbkuLrnprvnur/mqKHlvI9cbiAgICBwdWJsaWMgaXNNYXN0ZXIgPSBudWxsOyAvL+aYr+WQpuaYr+S4u+WKqOWPkeW/g+i3s+eahOS4gOaWuVxuICAgIHB1YmxpYyBpc1N1cHBvcnRLZWVwUGxheSA9IGZhbHNlOyAvL+aYr+WQpuaUr+aMgeaOpeedgOeOqemHjeaWsOeOqVxuXG4gICAgcHVibGljIHRoZVJlcXVlc3QgPSBudWxsO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBOZXRXb3JrQ2xhc3MoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0SXNTeW5jKGlzU3luYzogYm9vbGVhbikge1xuICAgICAgICBpc1N5bmMgPSBpc1N5bmMgPT0gbnVsbCA/IGZhbHNlIDogaXNTeW5jO1xuICAgICAgICBOZXRXb3JrLmlzU3luYyA9IGlzU3luYztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0SXNUZWFjaGVyKHJvbGU6IHN0cmluZykge1xuICAgICAgICBsZXQgaXNUZWFjaGVyID0gcm9sZSA9PSAndGVhY2hlcic7XG4gICAgICAgIE5ldFdvcmsuaXNUZWFjaGVyID0gaXNUZWFjaGVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRJc1ByZWxvYWQoaXNQcmVsb2FkOiBib29sZWFuKSB7XG4gICAgICAgIGlzUHJlbG9hZCA9IGlzUHJlbG9hZCA9PSBudWxsID8gZmFsc2UgOiBpc1ByZWxvYWQ7XG4gICAgICAgIFVJTWFuYWdlci5pc0dhbWVTaG93aW5nID0gIWlzUHJlbG9hZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0SXNNYXN0ZXIoaXNNYXN0ZXI6IGJvb2xlYW4pIHtcbiAgICAgICAgaXNNYXN0ZXIgPSBpc01hc3RlciA9PSBudWxsID8gZmFsc2UgOiBpc01hc3RlcjtcbiAgICAgICAgTmV0V29yay5pc01hc3RlciA9IGlzTWFzdGVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRJc1N1cHBvcnRLZWVwUGxheShpc1N1cHBvcnRLZWVwUGxheTogYm9vbGVhbikge1xuICAgICAgICBOZXRXb3JrLmlzU3VwcG9ydEtlZXBQbGF5ID0gaXNTdXBwb3J0S2VlcFBsYXk7XG4gICAgICAgIGlmICghaXNTdXBwb3J0S2VlcFBsYXkpIHtcbiAgICAgICAgICAgIE5ldFdvcmsuaXNNYXN0ZXIgPSBOZXRXb3JrLmlzVGVhY2hlcjtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhgaXNTdXBwb3J0S2VlcFBsYXk6ICR7aXNTdXBwb3J0S2VlcFBsYXl9YCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K+35rGC572R57ucUG9zdCAw5oiQ5YqfIDHotoXml7ZcbiAgICAgKiBAcGFyYW0gdXJsXG4gICAgICogQHBhcmFtIG9wZW5UeXBlXG4gICAgICogQHBhcmFtIGNvbnRlbnRUeXBlXG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHBhcmFtc1xuICAgICAqL1xuICAgIHB1YmxpYyBodHRwUmVxdWVzdCh1cmw6IHN0cmluZywgb3BlblR5cGUsIGNvbnRlbnRUeXBlLCBjYWxsYmFjayA9IG51bGwsIHBhcmFtcyA9ICcnKSB7XG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0t56a757q/5qih5byPLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBpZiAodGhpcy5pc09mZmxpbmUgJiYgdXJsLnN1YnN0cmluZygwLCB0aGlzLkdFVF9RVUVTVElPTi5sZW5ndGgpID09IHRoaXMuR0VUX1FVRVNUSU9OKSB7XG4gICAgICAgICAgICBHYW1lTXNnLnJlY3ZfanNvbl9kYXRhKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlY3ZfanNvbl9kYXRhOicsIGRhdGEpO1xuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAmJiBkYXRhLmpzb25EYXRhLmVycmNvZGUgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhmYWxzZSwgZGF0YS5qc29uRGF0YSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgVUlIZWxwLnNob3dFcnJvclBhbmVsKFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5qc29uRGF0YS5lcnJtc2cgKyAnLOivt+iBlOezu+Wuouacje+8gScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ+ehruWumicsXG4gICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5odHRwUmVxdWVzdCh1cmwsIG9wZW5UeXBlLCBjb250ZW50VHlwZSwgY2FsbGJhY2ssIHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBHYW1lTXNnLnJlcXVlc3RfanNvbl9kYXRhKHsgY291cnNld2FyZUlkOiB0aGlzLmNvdXJzZXdhcmVJZCB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChDb25zdFZhbHVlLklTX1RFQUNIRVIpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy50aXRsZUlkKSB7XG4gICAgICAgICAgICAgICAgLy/mlZnluIjnq6/msqHmnIl0aXRsZUlk55qE5oOF5Ya1XG4gICAgICAgICAgICAgICAgVUlIZWxwLnNob3dFcnJvclBhbmVsKCdVUkzlj4LmlbDplJnor68s57y65bCRdGl0bGVJZCzor7fogZTns7vmioDmnK/kurrlkZjvvIEnLCAnJywgJycsICfnoa7lrponKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL+aWsOivvuWgguWtpueUn+erryAg5Yik5pat5omA5pyJ5Y+C5pWwXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgIUNvbnN0VmFsdWUuSVNfVEVBQ0hFUiAmJlxuICAgICAgICAgICAgICAgICghdGhpcy51c2VySWQgfHwgIXRoaXMuY291cnNld2FyZUlkIHx8ICF0aGlzLmVudiB8fCAhdGhpcy5hcHAgfHwgIXRoaXMuY2hhbm5lbCB8fCAhdGhpcy5icm93c2VyKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgR2FtZU1zZy5VUkxFcnJvcih0aGlzLnRoZVJlcXVlc3QpO1xuICAgICAgICAgICAgICAgIFVJSGVscC5zaG93RXJyb3JQYW5lbCgnVVJM5Y+C5pWw6ZSZ6K+vLOivt+iBlOezu+Wuouacje+8gScsICcnLCAnJywgJ+ehruWumicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9wZW4ob3BlblR5cGUsIHVybCk7XG4gICAgICAgIHhoci50aW1lb3V0ID0gMTAwMDA7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCBjb250ZW50VHlwZSk7XG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXG4gICAgICAgIC8v5Zue6LCDXG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAnaHR0cFJlcXVlc3QgcnNwIHN0YXR1cycsXG4gICAgICAgICAgICAgICAgeGhyLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAnICAgICAgICB4aHIucmVhZHlTdGF0ZScsXG4gICAgICAgICAgICAgICAgeGhyLnJlYWR5U3RhdGUsXG4gICAgICAgICAgICAgICAgJyAgICAgICAgeGhyLnJlc3BvbnNlVGV4dCcsXG4gICAgICAgICAgICAgICAgeGhyLnJlc3BvbnNlVGV4dCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiB4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDw9IDQwMCkge1xuICAgICAgICAgICAgICAgIGxldCByZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrICYmIHJlc3BvbnNlLmVycmNvZGUgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhmYWxzZSwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIEdhbWVNc2cuaHR0cEVycm9yKHJlc3BvbnNlLmVycm1zZyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChDb25zdFZhbHVlLklTX0VESVRJT05TKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBVSUhlbHAuc2hvd0Vycm9yUGFuZWwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZXJybXNnICsgJyzor7fogZTns7vlrqLmnI3vvIEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICfnoa7lrponLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5odHRwUmVxdWVzdCh1cmwsIG9wZW5UeXBlLCBjb250ZW50VHlwZSwgY2FsbGJhY2ssIHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy/otoXml7blm57osINcbiAgICAgICAgeGhyLm9udGltZW91dCA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgR2FtZU1zZy5odHRwVGltZU91dCgn572R57uc5LiN5L2z77yM6K+356iN5ZCO6YeN6K+VJyk7XG4gICAgICAgICAgICBpZiAoQ29uc3RWYWx1ZS5JU19FRElUSU9OUykge1xuICAgICAgICAgICAgICAgIFVJSGVscC5zaG93RXJyb3JQYW5lbChcbiAgICAgICAgICAgICAgICAgICAgJ+e9kee7nOS4jeS9s++8jOivt+eojeWQjumHjeivlScsXG4gICAgICAgICAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgICAgICAgICAn6Iul6YeN5paw6L+e5o6l5peg5pWI77yM6K+36IGU57O75a6i5pyNJyxcbiAgICAgICAgICAgICAgICAgICAgJ+mHjeaWsOi/nuaOpScsXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaHR0cFJlcXVlc3QodXJsLCBvcGVuVHlwZSwgY29udGVudFR5cGUsIGNhbGxiYWNrLCBwYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaHR0cFJlcXVlc3QgdGltZW91dCcpO1xuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2sodHJ1ZSwgbnVsbCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy/lh7rplJlcbiAgICAgICAgeGhyLm9uZXJyb3IgPSAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGlmIChDb25zdFZhbHVlLklTX0VESVRJT05TKSB7XG4gICAgICAgICAgICAgICAgVUlIZWxwLnNob3dFcnJvclBhbmVsKFxuICAgICAgICAgICAgICAgICAgICAn572R57uc5Ye66ZSZ77yM6K+356iN5ZCO6YeN6K+VJyxcbiAgICAgICAgICAgICAgICAgICAgJ+iLpemHjeaWsOi/nuaOpeaXoOaViO+8jOivt+iBlOezu+WuouacjScsXG4gICAgICAgICAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgICAgICAgICAn6YeN5paw6L+e5o6lJyxcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5odHRwUmVxdWVzdCh1cmwsIG9wZW5UeXBlLCBjb250ZW50VHlwZSwgY2FsbGJhY2ssIHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdodHRwUmVxdWVzdCBlcnJvcicpO1xuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2sodHJ1ZSwgbnVsbCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgeGhyLnNlbmQocGFyYW1zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5Z1cmzlj4LmlbBcbiAgICAgKi9cbiAgICBwdWJsaWMgR2V0UmVxdWVzdCgpIHtcbiAgICAgICAgaWYgKHRoaXMudGhlUmVxdWVzdCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50aGVSZXF1ZXN0O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGhlUmVxdWVzdCA9IG5ldyBPYmplY3QoKTtcbiAgICAgICAgdmFyIHVybCA9IGxvY2F0aW9uLnNlYXJjaDsgLy/ojrflj5Z1cmzkuK1cIj9cIuespuWQjueahOWtl+S4slxuXG4gICAgICAgIGlmICh1cmwuaW5kZXhPZignPycpICE9IC0xKSB7XG4gICAgICAgICAgICB2YXIgc3RyID0gdXJsLnN1YnN0cigxKTtcbiAgICAgICAgICAgIHZhciBzdHJzID0gc3RyLnNwbGl0KCcmJyk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRoZVJlcXVlc3Rbc3Ryc1tpXS5zcGxpdCgnPScpWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChzdHJzW2ldLnNwbGl0KCc9JylbMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy/mlrDor77loIJ1cmzlv4XpnIDlj4LmlbBcbiAgICAgICAgdGhpcy51c2VySWQgPSB0aGlzLnRoZVJlcXVlc3RbJ3VzZXJJZCddO1xuICAgICAgICB0aGlzLmNoYXB0ZXJJZCA9IHRoaXMudGhlUmVxdWVzdFsnY2hhcHRlcklkJ107XG4gICAgICAgIHRoaXMuY291cnNld2FyZUlkID0gdGhpcy50aGVSZXF1ZXN0Wydjb3Vyc2V3YXJlSWQnXTtcbiAgICAgICAgdGhpcy50aXRsZUlkID0gdGhpcy50aGVSZXF1ZXN0Wyd0aXRsZUlkJ107XG4gICAgICAgIHRoaXMuYkxpdmUgPSB0aGlzLnRoZVJlcXVlc3RbJ2JMaXZlJ107XG4gICAgICAgIHRoaXMuYlByZWxvYWQgPSB0aGlzLnRoZVJlcXVlc3RbJ2JQcmVsb2FkJ107XG4gICAgICAgIHRoaXMuZW52ID0gdGhpcy50aGVSZXF1ZXN0WydlbnYnXTtcbiAgICAgICAgdGhpcy5hcHAgPSB0aGlzLnRoZVJlcXVlc3RbJ2FwcCddO1xuICAgICAgICB0aGlzLnBsYXRmb3JtID0gdGhpcy50aGVSZXF1ZXN0WydwbGF0Zm9ybSddO1xuICAgICAgICB0aGlzLmNoYW5uZWwgPSB0aGlzLnRoZVJlcXVlc3RbJ2NoYW5uZWwnXTtcbiAgICAgICAgdGhpcy5icm93c2VyID0gdGhpcy50aGVSZXF1ZXN0Wydicm93c2VyJ107XG4gICAgICAgIHRoaXMuYXBwVmVyc2lvbiA9IHRoaXMudGhlUmVxdWVzdFsnYXBwVmVyc2lvbiddO1xuICAgICAgICB0aGlzLmVtcHR5ID0gdGhpcy50aGVSZXF1ZXN0WydlbXB0eSddO1xuICAgICAgICB0aGlzLmlzT2ZmbGluZSA9IHBhcnNlSW50KHRoaXMudGhlUmVxdWVzdFsnaXNPZmZsaW5lJ10pOyAvL+emu+e6v+aooeW8j1xuXG4gICAgICAgIHJldHVybiB0aGlzLnRoZVJlcXVlc3Q7XG4gICAgfVxuXG4gICAgcHVibGljIEdldEJQcmVsb2FkKCkge1xuICAgICAgICBsZXQgQlByZWxvYWQgPSAwO1xuICAgICAgICBpZiAodGhpcy5HZXRSZXF1ZXN0KClbJ2JQcmVsb2FkJ10pIHtcbiAgICAgICAgICAgIEJQcmVsb2FkID0gdGhpcy5HZXRSZXF1ZXN0KClbJ2JQcmVsb2FkJ107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEJQcmVsb2FkO1xuICAgIH1cblxuICAgIHB1YmxpYyBHZXRJc09ubGluZSgpIHtcbiAgICAgICAgbGV0IGlzT25saW5lID0gJ3Rlc3QnO1xuICAgICAgICBpZiAodGhpcy5HZXRSZXF1ZXN0KClbJ2VudiddKSB7XG4gICAgICAgICAgICBpc09ubGluZSA9IHRoaXMuR2V0UmVxdWVzdCgpWydlbnYnXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNPbmxpbmU7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgTmV0V29yayA9IE5ldFdvcmtDbGFzcy5nZXRJbnN0YW5jZSgpO1xuIl19