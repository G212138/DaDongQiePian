
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/game/scripts/Data/CustomSyncData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f6665ym0IlJNYKq4da/THmw', 'CustomSyncData');
// game/scripts/Data/CustomSyncData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomSyncData = void 0;
/**
 * 需要同步的自定义数据
 * 游戏业务层同步数据在这里添加
 */
var CustomSyncData = /** @class */ (function () {
    function CustomSyncData() {
        this.curLevel = 0; // 当前关卡(第一关为0)
        // TODO 自定义
        this.xCount = 6; // x轴方块数量
        this.yCount = 6; // y轴方块数量
        this.zCount = 6; // z轴方块数量
        this.cubeOpened = false; // 方块是否打开
        this.cubeClickArr = []; // 点击的方块数组
        this.enableClick = false; // 是否允许点击
        this.qiepianClickArr = []; // 切片点击的方块数组
        this.enableReset = false; // 是否允许重置
    }
    return CustomSyncData;
}());
exports.CustomSyncData = CustomSyncData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZVxcc2NyaXB0c1xcRGF0YVxcQ3VzdG9tU3luY0RhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7OztHQUdHO0FBQ0g7SUFBQTtRQUNXLGFBQVEsR0FBVyxDQUFDLENBQUMsQ0FBQyxjQUFjO1FBQzNDLFdBQVc7UUFFSixXQUFNLEdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUztRQUM3QixXQUFNLEdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUztRQUM3QixXQUFNLEdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUztRQUM3QixlQUFVLEdBQVksS0FBSyxDQUFDLENBQUMsU0FBUztRQUN0QyxpQkFBWSxHQUF1RCxFQUFFLENBQUMsQ0FBQyxVQUFVO1FBQ2pGLGdCQUFXLEdBQVksS0FBSyxDQUFDLENBQUMsU0FBUztRQUN2QyxvQkFBZSxHQUFhLEVBQUUsQ0FBQyxDQUFDLFlBQVk7UUFDNUMsZ0JBQVcsR0FBWSxLQUFLLENBQUMsQ0FBQyxTQUFTO0lBRWxELENBQUM7SUFBRCxxQkFBQztBQUFELENBYkEsQUFhQyxJQUFBO0FBYlksd0NBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcblxuLyoqXG4gKiDpnIDopoHlkIzmraXnmoToh6rlrprkuYnmlbDmja5cbiAqIOa4uOaIj+S4muWKoeWxguWQjOatpeaVsOaNruWcqOi/memHjOa3u+WKoFxuICovXG5leHBvcnQgY2xhc3MgQ3VzdG9tU3luY0RhdGEge1xuICAgIHB1YmxpYyBjdXJMZXZlbDogbnVtYmVyID0gMDsgLy8g5b2T5YmN5YWz5Y2hKOesrOS4gOWFs+S4ujApXG4gICAgLy8gVE9ETyDoh6rlrprkuYlcbiAgICBcbiAgICBwdWJsaWMgeENvdW50OiBudW1iZXIgPSA2OyAvLyB46L205pa55Z2X5pWw6YePXG4gICAgcHVibGljIHlDb3VudDogbnVtYmVyID0gNjsgLy8geei9tOaWueWdl+aVsOmHj1xuICAgIHB1YmxpYyB6Q291bnQ6IG51bWJlciA9IDY7IC8vIHrovbTmlrnlnZfmlbDph49cbiAgICBwdWJsaWMgY3ViZU9wZW5lZDogYm9vbGVhbiA9IGZhbHNlOyAvLyDmlrnlnZfmmK/lkKbmiZPlvIBcbiAgICBwdWJsaWMgY3ViZUNsaWNrQXJyOiB7eEluZGV4OiBudW1iZXIsIHlJbmRleDogbnVtYmVyLCB6SW5kZXg6IG51bWJlcn1bXSA9IFtdOyAvLyDngrnlh7vnmoTmlrnlnZfmlbDnu4RcbiAgICBwdWJsaWMgZW5hYmxlQ2xpY2s6IGJvb2xlYW4gPSBmYWxzZTsgLy8g5piv5ZCm5YWB6K6454K55Ye7XG4gICAgcHVibGljIHFpZXBpYW5DbGlja0Fycjogc3RyaW5nW10gPSBbXTsgLy8g5YiH54mH54K55Ye755qE5pa55Z2X5pWw57uEXG4gICAgcHVibGljIGVuYWJsZVJlc2V0OiBib29sZWFuID0gZmFsc2U7IC8vIOaYr+WQpuWFgeiuuOmHjee9rlxuICAgIFxufVxuIl19