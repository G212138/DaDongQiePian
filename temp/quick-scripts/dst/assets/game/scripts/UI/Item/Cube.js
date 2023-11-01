
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/game/scripts/UI/Item/Cube.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '402defmy1xNR6or/0nZbjE9', 'Cube');
// game/scripts/UI/Item/Cube.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Cube = /** @class */ (function (_super) {
    __extends(Cube, _super);
    function Cube() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //上面的面
        _this.upFace = null;
        //下面的面
        _this.downFace = null;
        //左面的面
        _this.leftFace = null;
        //右面的面
        _this.rightFace = null;
        //前面的面
        _this.frontFace = null;
        //后面的面
        _this.backFace = null;
        _this.isHide = false;
        _this.initPos = cc.v3();
        return _this;
    }
    Cube.prototype.init = function (xCount, yCount, zCount) {
        this.xIndex = xCount;
        this.yIndex = yCount;
        this.zIndex = zCount;
        this.initPos = this.node.position;
        this.onChangeColor();
    };
    Cube.prototype.clickCube = function (clckName) {
        var enableClick = false;
        var data = { xIndex: null, yIndex: null, zIndex: null };
        switch (clckName) {
            case "up":
                enableClick = this.yIndex == 5;
                data.xIndex = this.xIndex;
                data.zIndex = this.zIndex;
                break;
            case "down":
                enableClick = this.yIndex == 0;
                data.xIndex = this.xIndex;
                data.zIndex = this.zIndex;
                break;
            case "left":
                enableClick = this.xIndex == 0;
                data.yIndex = this.yIndex;
                data.zIndex = this.zIndex;
                break;
            case "right":
                enableClick = this.xIndex == 5;
                data.yIndex = this.yIndex;
                data.zIndex = this.zIndex;
                break;
            case "front":
                enableClick = this.zIndex == 5;
                data.xIndex = this.xIndex;
                data.yIndex = this.yIndex;
                break;
            case "back":
                enableClick = this.zIndex == 0;
                data.xIndex = this.xIndex;
                data.yIndex = this.yIndex;
                break;
            default:
                break;
        }
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.cubeClickArr.push(data);
        ListenerManager_1.ListenerManager.dispatch(EventType_1.EventType.CLICK_CUBE, data);
    };
    Cube.prototype.handleCubeClick = function (data) {
        if (data.xIndex == null && data.yIndex == this.yIndex && data.zIndex == this.zIndex) {
            this.isHide = true;
            this.node.active = false;
        }
        else if (data.yIndex == null && data.xIndex == this.xIndex && data.zIndex == this.zIndex) {
            this.isHide = true;
            this.node.active = false;
        }
        else if (data.zIndex == null && data.xIndex == this.xIndex && data.yIndex == this.yIndex) {
            this.isHide = true;
            this.node.active = false;
        }
    };
    Cube.prototype.handleOpen = function (pos) {
        this.node.setPosition(pos.x, pos.y, pos.z);
    };
    Cube.prototype.handleClose = function () {
        this.node.setPosition(this.initPos);
    };
    Cube.prototype.reset = function () {
        this.isHide = false;
        this.node.active = true;
    };
    Cube.prototype.onChangeColor = function () {
        if (this.xIndex == 0) {
            var material = this.leftFace.getComponent(cc.MeshRenderer).getMaterial(0);
            var color = new cc.Color().fromHEX("#2DB97A");
            material.setProperty("diffuseColor", color, 0);
        }
        if (this.xIndex == SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.xCount - 1) {
            var material = this.rightFace.getComponent(cc.MeshRenderer).getMaterial(0);
            var color = new cc.Color().fromHEX("#2DB97A");
            material.setProperty("diffuseColor", color, 0);
        }
        if (this.yIndex == 0) {
            var material = this.downFace.getComponent(cc.MeshRenderer).getMaterial(0);
            var color = new cc.Color().fromHEX("#2DB97A");
            material.setProperty("diffuseColor", color, 0);
        }
        if (this.yIndex == SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.yCount - 1) {
            var material = this.upFace.getComponent(cc.MeshRenderer).getMaterial(0);
            var color = new cc.Color().fromHEX("#2DB97A");
            material.setProperty("diffuseColor", color, 0);
        }
        if (this.zIndex == 0) {
            var material = this.backFace.getComponent(cc.MeshRenderer).getMaterial(0);
            var color = new cc.Color().fromHEX("#2DB97A");
            material.setProperty("diffuseColor", color, 0);
        }
        if (this.zIndex == SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.zCount - 1) {
            var material = this.frontFace.getComponent(cc.MeshRenderer).getMaterial(0);
            var color = new cc.Color().fromHEX("#2DB97A");
            material.setProperty("diffuseColor", color, 0);
        }
    };
    __decorate([
        property(cc.Node)
    ], Cube.prototype, "upFace", void 0);
    __decorate([
        property(cc.Node)
    ], Cube.prototype, "downFace", void 0);
    __decorate([
        property(cc.Node)
    ], Cube.prototype, "leftFace", void 0);
    __decorate([
        property(cc.Node)
    ], Cube.prototype, "rightFace", void 0);
    __decorate([
        property(cc.Node)
    ], Cube.prototype, "frontFace", void 0);
    __decorate([
        property(cc.Node)
    ], Cube.prototype, "backFace", void 0);
    Cube = __decorate([
        ccclass
    ], Cube);
    return Cube;
}(cc.Component));
exports.default = Cube;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZVxcc2NyaXB0c1xcVUlcXEl0ZW1cXEN1YmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUZBQW9GO0FBQ3BGLHFGQUFvRjtBQUNwRixrREFBaUQ7QUFHM0MsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBa0Msd0JBQVk7SUFBOUM7UUFBQSxxRUEySUM7UUExSUcsTUFBTTtRQUVFLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFDL0IsTUFBTTtRQUVFLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFDakMsTUFBTTtRQUVFLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFDakMsTUFBTTtRQUVFLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFDbEMsTUFBTTtRQUVFLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFDbEMsTUFBTTtRQUVFLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFRekIsWUFBTSxHQUFZLEtBQUssQ0FBQztRQUV4QixhQUFPLEdBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDOztJQStHdkMsQ0FBQztJQTdHVSxtQkFBSSxHQUFYLFVBQVksTUFBYyxFQUFFLE1BQWMsRUFBRSxNQUFjO1FBQ3RELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDbEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFTyx3QkFBUyxHQUFqQixVQUFrQixRQUFnQjtRQUM5QixJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxJQUFJLEdBQUcs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UyxHQTJJN0M7a0JBM0lvQixJQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGlzdGVuZXJNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1lL3NjcmlwdHMvTWFuYWdlci9MaXN0ZW5lck1hbmFnZXJcIjtcbmltcG9ydCB7IFN5bmNEYXRhTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZS9zY3JpcHRzL01hbmFnZXIvU3luY0RhdGFNYW5hZ2VyXCI7XG5pbXBvcnQgeyBFdmVudFR5cGUgfSBmcm9tIFwiLi4vLi4vRGF0YS9FdmVudFR5cGVcIjtcblxuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3ViZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgLy/kuIrpnaLnmoTpnaJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcml2YXRlIHVwRmFjZTogY2MuTm9kZSA9IG51bGw7XG4gICAgLy/kuIvpnaLnmoTpnaJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcml2YXRlIGRvd25GYWNlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICAvL+W3pumdoueahOmdolxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgbGVmdEZhY2U6IGNjLk5vZGUgPSBudWxsO1xuICAgIC8v5Y+z6Z2i55qE6Z2iXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSByaWdodEZhY2U6IGNjLk5vZGUgPSBudWxsO1xuICAgIC8v5YmN6Z2i55qE6Z2iXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBmcm9udEZhY2U6IGNjLk5vZGUgPSBudWxsO1xuICAgIC8v5ZCO6Z2i55qE6Z2iXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBiYWNrRmFjZTogY2MuTm9kZSA9IG51bGw7XG5cblxuICAgIC8v5pa55Z2X55qE6KGM5YiX5bGC57Si5byVXG4gICAgcHJpdmF0ZSB4SW5kZXg6IG51bWJlcjtcbiAgICBwcml2YXRlIHlJbmRleDogbnVtYmVyO1xuICAgIHByaXZhdGUgekluZGV4OiBudW1iZXI7XG5cbiAgICBwcml2YXRlIGlzSGlkZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBpbml0UG9zOiBjYy5WZWMzID0gY2MudjMoKTtcblxuICAgIHB1YmxpYyBpbml0KHhDb3VudDogbnVtYmVyLCB5Q291bnQ6IG51bWJlciwgekNvdW50OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy54SW5kZXggPSB4Q291bnQ7XG4gICAgICAgIHRoaXMueUluZGV4ID0geUNvdW50O1xuICAgICAgICB0aGlzLnpJbmRleCA9IHpDb3VudDtcbiAgICAgICAgdGhpcy5pbml0UG9zID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQ29sb3IoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNsaWNrQ3ViZShjbGNrTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBlbmFibGVDbGljayA9IGZhbHNlO1xuICAgICAgICBsZXQgZGF0YSA9IHt4SW5kZXg6IG51bGwsIHlJbmRleDogbnVsbCwgekluZGV4OiBudWxsfVxuICAgICAgICBzd2l0Y2ggKGNsY2tOYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwidXBcIjpcbiAgICAgICAgICAgICAgICBlbmFibGVDbGljayA9IHRoaXMueUluZGV4ID09IDU7XG4gICAgICAgICAgICAgICAgZGF0YS54SW5kZXggPSB0aGlzLnhJbmRleDtcbiAgICAgICAgICAgICAgICBkYXRhLnpJbmRleCA9IHRoaXMuekluZGV4O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImRvd25cIjpcbiAgICAgICAgICAgICAgICBlbmFibGVDbGljayA9IHRoaXMueUluZGV4ID09IDA7XG4gICAgICAgICAgICAgICAgZGF0YS54SW5kZXggPSB0aGlzLnhJbmRleDtcbiAgICAgICAgICAgICAgICBkYXRhLnpJbmRleCA9IHRoaXMuekluZGV4O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgICAgICAgICBlbmFibGVDbGljayA9IHRoaXMueEluZGV4ID09IDA7XG4gICAgICAgICAgICAgICAgZGF0YS55SW5kZXggPSB0aGlzLnlJbmRleDtcbiAgICAgICAgICAgICAgICBkYXRhLnpJbmRleCA9IHRoaXMuekluZGV4O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgICAgICAgICAgZW5hYmxlQ2xpY2sgPSB0aGlzLnhJbmRleCA9PSA1O1xuICAgICAgICAgICAgICAgIGRhdGEueUluZGV4ID0gdGhpcy55SW5kZXg7XG4gICAgICAgICAgICAgICAgZGF0YS56SW5kZXggPSB0aGlzLnpJbmRleDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJmcm9udFwiOlxuICAgICAgICAgICAgICAgIGVuYWJsZUNsaWNrID0gdGhpcy56SW5kZXggPT0gNTtcbiAgICAgICAgICAgICAgICBkYXRhLnhJbmRleCA9IHRoaXMueEluZGV4O1xuICAgICAgICAgICAgICAgIGRhdGEueUluZGV4ID0gdGhpcy55SW5kZXg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYmFja1wiOlxuICAgICAgICAgICAgICAgIGVuYWJsZUNsaWNrID0gdGhpcy56SW5kZXggPT0gMDtcbiAgICAgICAgICAgICAgICBkYXRhLnhJbmRleCA9IHRoaXMueEluZGV4O1xuICAgICAgICAgICAgICAgIGRhdGEueUluZGV4ID0gdGhpcy55SW5kZXg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmN1YmVDbGlja0Fyci5wdXNoKGRhdGEpO1xuICAgICAgICBMaXN0ZW5lck1hbmFnZXIuZGlzcGF0Y2goRXZlbnRUeXBlLkNMSUNLX0NVQkUsIGRhdGEpOyAgICAgICAgXG4gICAgfVxuXG4gICAgcHVibGljIGhhbmRsZUN1YmVDbGljayhkYXRhOiB7eEluZGV4OiBudW1iZXIsIHlJbmRleDogbnVtYmVyLCB6SW5kZXg6IG51bWJlcn0pIHtcbiAgICAgICAgaWYgKGRhdGEueEluZGV4ID09IG51bGwgJiYgZGF0YS55SW5kZXggPT0gdGhpcy55SW5kZXggJiYgZGF0YS56SW5kZXggPT0gdGhpcy56SW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNIaWRlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLnlJbmRleCA9PSBudWxsICYmIGRhdGEueEluZGV4ID09IHRoaXMueEluZGV4ICYmIGRhdGEuekluZGV4ID09IHRoaXMuekluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLmlzSGlkZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS56SW5kZXggPT0gbnVsbCAmJiBkYXRhLnhJbmRleCA9PSB0aGlzLnhJbmRleCAmJiBkYXRhLnlJbmRleCA9PSB0aGlzLnlJbmRleCkge1xuICAgICAgICAgICAgdGhpcy5pc0hpZGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGhhbmRsZU9wZW4ocG9zOiB7eDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcn0pIHtcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHBvcy54LCBwb3MueSwgcG9zLnopO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVDbG9zZSgpIHtcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHRoaXMuaW5pdFBvcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlc2V0KCkge1xuICAgICAgICB0aGlzLmlzSGlkZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2hhbmdlQ29sb3IoKSB7XG4gICAgICAgIGlmICh0aGlzLnhJbmRleCA9PSAwKSB7XG4gICAgICAgICAgICBsZXQgbWF0ZXJpYWwgPSB0aGlzLmxlZnRGYWNlLmdldENvbXBvbmVudChjYy5NZXNoUmVuZGVyZXIpLmdldE1hdGVyaWFsKDApO1xuICAgICAgICAgICAgbGV0IGNvbG9yID0gbmV3IGNjLkNvbG9yKCkuZnJvbUhFWChcIiMyREI5N0FcIik7XG4gICAgICAgICAgICBtYXRlcmlhbC5zZXRQcm9wZXJ0eShcImRpZmZ1c2VDb2xvclwiLCBjb2xvciwgMClcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy54SW5kZXggPT0gU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEueENvdW50IC0gMSkge1xuICAgICAgICAgICAgbGV0IG1hdGVyaWFsID0gdGhpcy5yaWdodEZhY2UuZ2V0Q29tcG9uZW50KGNjLk1lc2hSZW5kZXJlcikuZ2V0TWF0ZXJpYWwoMCk7XG4gICAgICAgICAgICBsZXQgY29sb3IgPSBuZXcgY2MuQ29sb3IoKS5mcm9tSEVYKFwiIzJEQjk3QVwiKTtcbiAgICAgICAgICAgIG1hdGVyaWFsLnNldFByb3BlcnR5KFwiZGlmZnVzZUNvbG9yXCIsIGNvbG9yLCAwKVxuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMueUluZGV4ID09IDApIHtcbiAgICAgICAgICAgIGxldCBtYXRlcmlhbCA9IHRoaXMuZG93bkZhY2UuZ2V0Q29tcG9uZW50KGNjLk1lc2hSZW5kZXJlcikuZ2V0TWF0ZXJpYWwoMCk7XG4gICAgICAgICAgICBsZXQgY29sb3IgPSBuZXcgY2MuQ29sb3IoKS5mcm9tSEVYKFwiIzJEQjk3QVwiKTtcbiAgICAgICAgICAgIG1hdGVyaWFsLnNldFByb3BlcnR5KFwiZGlmZnVzZUNvbG9yXCIsIGNvbG9yLCAwKVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnlJbmRleCA9PSBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS55Q291bnQgLSAxKSB7XG4gICAgICAgICAgICBsZXQgbWF0ZXJpYWwgPSB0aGlzLnVwRmFjZS5nZXRDb21wb25lbnQoY2MuTWVzaFJlbmRlcmVyKS5nZXRNYXRlcmlhbCgwKTtcbiAgICAgICAgICAgIGxldCBjb2xvciA9IG5ldyBjYy5Db2xvcigpLmZyb21IRVgoXCIjMkRCOTdBXCIpO1xuICAgICAgICAgICAgbWF0ZXJpYWwuc2V0UHJvcGVydHkoXCJkaWZmdXNlQ29sb3JcIiwgY29sb3IsIDApXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuekluZGV4ID09IDApIHtcbiAgICAgICAgICAgIGxldCBtYXRlcmlhbCA9IHRoaXMuYmFja0ZhY2UuZ2V0Q29tcG9uZW50KGNjLk1lc2hSZW5kZXJlcikuZ2V0TWF0ZXJpYWwoMCk7XG4gICAgICAgICAgICBsZXQgY29sb3IgPSBuZXcgY2MuQ29sb3IoKS5mcm9tSEVYKFwiIzJEQjk3QVwiKTtcbiAgICAgICAgICAgIG1hdGVyaWFsLnNldFByb3BlcnR5KFwiZGlmZnVzZUNvbG9yXCIsIGNvbG9yLCAwKVxuICAgICAgICB9IFxuICAgICAgICBpZiAodGhpcy56SW5kZXggPT0gU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuekNvdW50IC0gMSkge1xuICAgICAgICAgICAgbGV0IG1hdGVyaWFsID0gdGhpcy5mcm9udEZhY2UuZ2V0Q29tcG9uZW50KGNjLk1lc2hSZW5kZXJlcikuZ2V0TWF0ZXJpYWwoMCk7XG4gICAgICAgICAgICBsZXQgY29sb3IgPSBuZXcgY2MuQ29sb3IoKS5mcm9tSEVYKFwiIzJEQjk3QVwiKTtcbiAgICAgICAgICAgIG1hdGVyaWFsLnNldFByb3BlcnR5KFwiZGlmZnVzZUNvbG9yXCIsIGNvbG9yLCAwKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgXG59XG4iXX0=