
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/game/scripts/UI/Item/ThreeDNode.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '888f7crmYBPp5pwHHEmIA6V', 'ThreeDNode');
// game/scripts/UI/Item/ThreeDNode.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ListenerManager_1 = require("../../../../frame/scripts/Manager/ListenerManager");
var SyncDataManager_1 = require("../../../../frame/scripts/Manager/SyncDataManager");
var EventType_1 = require("../../Data/EventType");
var Cube_1 = require("./Cube");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ThreeNode = /** @class */ (function (_super) {
    __extends(ThreeNode, _super);
    function ThreeNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cubePrefab = null;
        _this.cubeRootNode = null;
        return _this;
    }
    ThreeNode.prototype.onLoad = function () {
        ListenerManager_1.ListenerManager.on(EventType_1.EventType.CUBE_OPEN, this.onCubeOpen, this);
        ListenerManager_1.ListenerManager.on(EventType_1.EventType.CLICK_CUBE, this.onClickCube, this);
    };
    ThreeNode.prototype.onDestroy = function () {
        ListenerManager_1.ListenerManager.off(EventType_1.EventType.CUBE_OPEN, this.onCubeOpen, this);
        ListenerManager_1.ListenerManager.off(EventType_1.EventType.CLICK_CUBE, this.onClickCube, this);
    };
    ThreeNode.prototype.init = function () {
        this.initBigCube();
    };
    ThreeNode.prototype.reset = function () {
        this.cubeRootNode.setRotation(cc.quat());
        this.initBigCube();
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.cubeClickArr = [];
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.cubeOpened = false;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.qiepianClickArr = [];
    };
    //初始化大正方体
    ThreeNode.prototype.initBigCube = function () {
        var xCount = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.xCount;
        var yCount = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.yCount;
        var zCount = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.zCount;
        this.changeBigCubeSize(xCount, yCount, zCount);
    };
    ThreeNode.prototype.changeBigCubeSize = function (xCount, yCount, zCount) {
        //先清空
        this.cubeRootNode.removeAllChildren();
        //创建xCount行yCount列zCount层的大正方体，并且以大正方体的中心点为原点
        var cubeWidth = 1;
        var cubeHeight = 1;
        var cubeLength = 1;
        var cubeDis = 0;
        var cubeXDis = cubeWidth + cubeDis;
        var cubeYDis = cubeHeight + cubeDis;
        var cubeZDis = cubeLength + cubeDis;
        var cubeXCount = xCount;
        var cubeYCount = yCount;
        var cubeZCount = zCount;
        var cubeXTotalDis = cubeXCount * cubeXDis;
        var cubeYTotalDis = cubeYCount * cubeYDis;
        var cubeZTotalDis = cubeZCount * cubeZDis;
        var cubeXStart = -cubeXTotalDis / 2 + cubeXDis / 2;
        var cubeYStart = -cubeYTotalDis / 2 + cubeYDis / 2;
        var cubeZStart = -cubeZTotalDis / 2 + cubeZDis / 2;
        for (var i = 0; i < cubeXCount; i++) {
            for (var j = 0; j < cubeYCount; j++) {
                for (var k = 0; k < cubeZCount; k++) {
                    var cubeNode = cc.instantiate(this.cubePrefab);
                    cubeNode.parent = this.cubeRootNode;
                    cubeNode.setPosition(cubeXStart + i * cubeXDis, cubeYStart + j * cubeYDis, cubeZStart + k * cubeZDis);
                    cubeNode.getComponent(Cube_1.default).init(i, j, k);
                }
            }
        }
    };
    ThreeNode.prototype.onCubeOpen = function (isOpen) {
        if (isOpen) {
            //将大正方体的按层分开一定距离
            var cubeWidth = 1;
            var cubeHeight = 1;
            var cubeLength = 1;
            var cubeDis = 0.8;
            var cubeXDis = cubeWidth;
            var cubeYDis = cubeHeight + cubeDis;
            var cubeZDis = cubeLength;
            var cubeXCount = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.xCount;
            var cubeYCount = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.yCount;
            var cubeZCount = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.zCount;
            var cubeXTotalDis = cubeXCount * cubeXDis;
            var cubeYTotalDis = cubeYCount * cubeYDis;
            var cubeZTotalDis = cubeZCount * cubeZDis;
            var cubeXStart = -cubeXTotalDis / 2 + cubeXDis / 2;
            var cubeYStart = -cubeYTotalDis / 2 + cubeYDis / 2;
            var cubeZStart = -cubeZTotalDis / 2 + cubeZDis / 2;
            var openPosArr = [];
            for (var i = 0; i < cubeXCount; i++) {
                for (var j = 0; j < cubeYCount; j++) {
                    for (var k = 0; k < cubeZCount; k++) {
                        openPosArr.push({ x: cubeXStart + i * cubeXDis, y: cubeYStart + j * cubeYDis, z: cubeZStart + k * cubeZDis });
                    }
                }
            }
            for (var i = 0; i < this.cubeRootNode.children.length; i++) {
                var cubeNode = this.cubeRootNode.children[i];
                cubeNode.getComponent(Cube_1.default).handleOpen(openPosArr[i]);
            }
        }
        else {
            for (var i = 0; i < this.cubeRootNode.children.length; i++) {
                var cubeNode = this.cubeRootNode.children[i];
                cubeNode.getComponent(Cube_1.default).handleClose();
            }
        }
    };
    ThreeNode.prototype.onClickCube = function (data) {
        for (var i = 0; i < this.cubeRootNode.children.length; i++) {
            var cubeNode = this.cubeRootNode.children[i];
            cubeNode.getComponent(Cube_1.default).handleCubeClick(data);
        }
    };
    __decorate([
        property(cc.Prefab)
    ], ThreeNode.prototype, "cubePrefab", void 0);
    __decorate([
        property(cc.Node)
    ], ThreeNode.prototype, "cubeRootNode", void 0);
    ThreeNode = __decorate([
        ccclass
    ], ThreeNode);
    return ThreeNode;
}(cc.Component));
exports.default = ThreeNode;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZVxcc2NyaXB0c1xcVUlcXEl0ZW1cXFRocmVlRE5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUZBQW9GO0FBQ3BGLHFGQUFvRjtBQUNwRixrREFBaUQ7QUFDakQsK0JBQTBCO0FBRXBCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBb0hDO1FBbEhXLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRTdCLGtCQUFZLEdBQVksSUFBSSxDQUFDOztJQWdIekMsQ0FBQztJQTVHRywwQkFBTSxHQUFOO1FBQ0ksaUNBQWUsQ0FBQyxFQUFFLENBQUMscUJBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRCxpQ0FBZSxDQUFDLEVBQUUsQ0FBQyxxQkFBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCw2QkFBUyxHQUFUO1FBQ0ksaUNBQWUsQ0FBQyxHQUFHLENBQUMscUJBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNoRSxpQ0FBZSxDQUFDLEdBQUcsQ0FBQyxxQkFBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3JFLENBQUM7SUFFTSx3QkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSx5QkFBSyxHQUFaO1FBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFdBQVcs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QkFBVyxHQUFuQixVQUFvQixJQUF3RDtRQUN4RSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdDLFFBQVEsQ0FBQyxZQUFZLENBQUMsY0FBSSxDQUFDLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JEO0lBQ0wsQ0FBQztJQWpIRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2lEQUNpQjtJQUVyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO21EQUNtQjtJQUpwQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBb0g3QjtJQUFELGdCQUFDO0NBcEhELEFBb0hDLENBcEhzQyxFQUFFLENBQUMsU0FBUyxHQW9IbEQ7a0JBcEhvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGlzdGVuZXJNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1lL3NjcmlwdHMvTWFuYWdlci9MaXN0ZW5lck1hbmFnZXJcIjtcbmltcG9ydCB7IFN5bmNEYXRhTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZS9zY3JpcHRzL01hbmFnZXIvU3luY0RhdGFNYW5hZ2VyXCI7XG5pbXBvcnQgeyBFdmVudFR5cGUgfSBmcm9tIFwiLi4vLi4vRGF0YS9FdmVudFR5cGVcIjtcbmltcG9ydCBDdWJlIGZyb20gXCIuL0N1YmVcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRocmVlTm9kZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBwcml2YXRlIGN1YmVQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBjdWJlUm9vdE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSB0b3VjaEV2ZW50SWQ6IG51bWJlcjtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLm9uKEV2ZW50VHlwZS5DVUJFX09QRU4sIHRoaXMub25DdWJlT3BlbiwgdGhpcyk7XG4gICAgICAgIExpc3RlbmVyTWFuYWdlci5vbihFdmVudFR5cGUuQ0xJQ0tfQ1VCRSwgdGhpcy5vbkNsaWNrQ3ViZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBMaXN0ZW5lck1hbmFnZXIub2ZmKEV2ZW50VHlwZS5DVUJFX09QRU4sIHRoaXMub25DdWJlT3BlbiwgdGhpcyk7XG4gICAgICAgIExpc3RlbmVyTWFuYWdlci5vZmYoRXZlbnRUeXBlLkNMSUNLX0NVQkUsIHRoaXMub25DbGlja0N1YmUsIHRoaXMpXG4gICAgfVxuXG4gICAgcHVibGljIGluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdEJpZ0N1YmUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuY3ViZVJvb3ROb2RlLnNldFJvdGF0aW9uKGNjLnF1YXQoKSk7XG4gICAgICAgIHRoaXMuaW5pdEJpZ0N1YmUoKTtcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuY3ViZUNsaWNrQXJyID0gW107XG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmN1YmVPcGVuZWQgPSBmYWxzZTtcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEucWllcGlhbkNsaWNrQXJyID0gW107XG4gICAgfVxuXG4gICAgLy/liJ3lp4vljJblpKfmraPmlrnkvZNcbiAgICBwcml2YXRlIGluaXRCaWdDdWJlKCkge1xuICAgICAgICBsZXQgeENvdW50ID0gU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEueENvdW50O1xuICAgICAgICBsZXQgeUNvdW50ID0gU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEueUNvdW50O1xuICAgICAgICBsZXQgekNvdW50ID0gU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuekNvdW50O1xuICAgICAgICB0aGlzLmNoYW5nZUJpZ0N1YmVTaXplKHhDb3VudCwgeUNvdW50LCB6Q291bnQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlQmlnQ3ViZVNpemUoeENvdW50OiBudW1iZXIsIHlDb3VudDogbnVtYmVyLCB6Q291bnQ6IG51bWJlcikge1xuICAgICAgICAvL+WFiOa4heepulxuICAgICAgICB0aGlzLmN1YmVSb290Tm9kZS5yZW1vdmVBbGxDaGlsZHJlbigpO1xuXG4gICAgICAgIC8v5Yib5bu6eENvdW506KGMeUNvdW505YiXekNvdW505bGC55qE5aSn5q2j5pa55L2T77yM5bm25LiU5Lul5aSn5q2j5pa55L2T55qE5Lit5b+D54K55Li65Y6f54K5XG4gICAgICAgIGxldCBjdWJlV2lkdGggPSAxO1xuICAgICAgICBsZXQgY3ViZUhlaWdodCA9IDE7XG4gICAgICAgIGxldCBjdWJlTGVuZ3RoID0gMTtcbiAgICAgICAgbGV0IGN1YmVEaXMgPSAwO1xuICAgICAgICBsZXQgY3ViZVhEaXMgPSBjdWJlV2lkdGggKyBjdWJlRGlzO1xuICAgICAgICBsZXQgY3ViZVlEaXMgPSBjdWJlSGVpZ2h0ICsgY3ViZURpcztcbiAgICAgICAgbGV0IGN1YmVaRGlzID0gY3ViZUxlbmd0aCArIGN1YmVEaXM7XG4gICAgICAgIGxldCBjdWJlWENvdW50ID0geENvdW50O1xuICAgICAgICBsZXQgY3ViZVlDb3VudCA9IHlDb3VudDtcbiAgICAgICAgbGV0IGN1YmVaQ291bnQgPSB6Q291bnQ7XG4gICAgICAgIGxldCBjdWJlWFRvdGFsRGlzID0gY3ViZVhDb3VudCAqIGN1YmVYRGlzO1xuICAgICAgICBsZXQgY3ViZVlUb3RhbERpcyA9IGN1YmVZQ291bnQgKiBjdWJlWURpcztcbiAgICAgICAgbGV0IGN1YmVaVG90YWxEaXMgPSBjdWJlWkNvdW50ICogY3ViZVpEaXM7XG4gICAgICAgIGxldCBjdWJlWFN0YXJ0ID0gLWN1YmVYVG90YWxEaXMgLyAyICsgY3ViZVhEaXMgLyAyO1xuICAgICAgICBsZXQgY3ViZVlTdGFydCA9IC1jdWJlWVRvdGFsRGlzIC8gMiArIGN1YmVZRGlzIC8gMjtcbiAgICAgICAgbGV0IGN1YmVaU3RhcnQgPSAtY3ViZVpUb3RhbERpcyAvIDIgKyBjdWJlWkRpcyAvIDI7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3ViZVhDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGN1YmVZQ291bnQ7IGorKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgY3ViZVpDb3VudDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdWJlTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY3ViZVByZWZhYik7XG4gICAgICAgICAgICAgICAgICAgIGN1YmVOb2RlLnBhcmVudCA9IHRoaXMuY3ViZVJvb3ROb2RlO1xuICAgICAgICAgICAgICAgICAgICBjdWJlTm9kZS5zZXRQb3NpdGlvbihjdWJlWFN0YXJ0ICsgaSAqIGN1YmVYRGlzLCBjdWJlWVN0YXJ0ICsgaiAqIGN1YmVZRGlzLCBjdWJlWlN0YXJ0ICsgayAqIGN1YmVaRGlzKTtcbiAgICAgICAgICAgICAgICAgICAgY3ViZU5vZGUuZ2V0Q29tcG9uZW50KEN1YmUpLmluaXQoaSwgaiwgayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkN1YmVPcGVuKGlzT3BlbjogYm9vbGVhbikge1xuICAgICAgICBpZiAoaXNPcGVuKSB7XG4gICAgICAgICAgICAvL+WwhuWkp+ato+aWueS9k+eahOaMieWxguWIhuW8gOS4gOWumui3neemu1xuICAgICAgICAgICAgbGV0IGN1YmVXaWR0aCA9IDE7XG4gICAgICAgICAgICBsZXQgY3ViZUhlaWdodCA9IDE7XG4gICAgICAgICAgICBsZXQgY3ViZUxlbmd0aCA9IDE7XG4gICAgICAgICAgICBsZXQgY3ViZURpcyA9IDAuODtcbiAgICAgICAgICAgIGxldCBjdWJlWERpcyA9IGN1YmVXaWR0aDtcbiAgICAgICAgICAgIGxldCBjdWJlWURpcyA9IGN1YmVIZWlnaHQgKyBjdWJlRGlzO1xuICAgICAgICAgICAgbGV0IGN1YmVaRGlzID0gY3ViZUxlbmd0aDtcbiAgICAgICAgICAgIGxldCBjdWJlWENvdW50ID0gU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEueENvdW50O1xuICAgICAgICAgICAgbGV0IGN1YmVZQ291bnQgPSBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS55Q291bnQ7XG4gICAgICAgICAgICBsZXQgY3ViZVpDb3VudCA9IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnpDb3VudDtcbiAgICAgICAgICAgIGxldCBjdWJlWFRvdGFsRGlzID0gY3ViZVhDb3VudCAqIGN1YmVYRGlzO1xuICAgICAgICAgICAgbGV0IGN1YmVZVG90YWxEaXMgPSBjdWJlWUNvdW50ICogY3ViZVlEaXM7XG4gICAgICAgICAgICBsZXQgY3ViZVpUb3RhbERpcyA9IGN1YmVaQ291bnQgKiBjdWJlWkRpcztcbiAgICAgICAgICAgIGxldCBjdWJlWFN0YXJ0ID0gLWN1YmVYVG90YWxEaXMgLyAyICsgY3ViZVhEaXMgLyAyO1xuICAgICAgICAgICAgbGV0IGN1YmVZU3RhcnQgPSAtY3ViZVlUb3RhbERpcyAvIDIgKyBjdWJlWURpcyAvIDI7XG4gICAgICAgICAgICBsZXQgY3ViZVpTdGFydCA9IC1jdWJlWlRvdGFsRGlzIC8gMiArIGN1YmVaRGlzIC8gMjtcbiAgICAgICAgICAgIGxldCBvcGVuUG9zQXJyID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1YmVYQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY3ViZVlDb3VudDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgY3ViZVpDb3VudDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuUG9zQXJyLnB1c2goeyB4OiBjdWJlWFN0YXJ0ICsgaSAqIGN1YmVYRGlzLCB5OiBjdWJlWVN0YXJ0ICsgaiAqIGN1YmVZRGlzLCB6OiBjdWJlWlN0YXJ0ICsgayAqIGN1YmVaRGlzIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmN1YmVSb290Tm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBjdWJlTm9kZSA9IHRoaXMuY3ViZVJvb3ROb2RlLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgIGN1YmVOb2RlLmdldENvbXBvbmVudChDdWJlKS5oYW5kbGVPcGVuKG9wZW5Qb3NBcnJbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmN1YmVSb290Tm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBjdWJlTm9kZSA9IHRoaXMuY3ViZVJvb3ROb2RlLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgIGN1YmVOb2RlLmdldENvbXBvbmVudChDdWJlKS5oYW5kbGVDbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNsaWNrQ3ViZShkYXRhOiB7IHhJbmRleDogbnVtYmVyLCB5SW5kZXg6IG51bWJlciwgekluZGV4OiBudW1iZXIgfSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY3ViZVJvb3ROb2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY3ViZU5vZGUgPSB0aGlzLmN1YmVSb290Tm9kZS5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGN1YmVOb2RlLmdldENvbXBvbmVudChDdWJlKS5oYW5kbGVDdWJlQ2xpY2soZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=