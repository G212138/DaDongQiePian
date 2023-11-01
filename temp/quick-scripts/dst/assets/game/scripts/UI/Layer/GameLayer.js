
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/game/scripts/UI/Layer/GameLayer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7af02EPP/BOs5jB1F8+Z9kE', 'GameLayer');
// game/scripts/UI/Layer/GameLayer.ts

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
var Cube_1 = require("../Item/Cube");
var GameUI_1 = require("../Item/GameUI");
var ThreeDNode_1 = require("../Item/ThreeDNode");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameLayer = /** @class */ (function (_super) {
    __extends(GameLayer, _super);
    function GameLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.threeDNode = null;
        _this.gameUI = null;
        _this.threeDCamera = null;
        _this.cubeRootNode = null;
        _this.addMinus = null;
        _this.img_huangbian = [];
        return _this;
        // private isAllowTouch: boolean = false;
        // private onTouchStart(event: cc.Event.EventTouch) {
        //     this.isAllowTouch = true;
        //     let eventID = event.getID();
        //     if (this.touchEventId != null) {
        //         return
        //     }
        //     this.touchEventId = eventID;
        // }
        // private onTouchMove(event: cc.Event.EventTouch) {
        //     let eventID = event.getID();
        //     if (this.touchEventId != null && eventID == this.touchEventId) {
        //         //（滑的距离/1000）*180=旋转的角度
        //         let prevLocation = event.getPreviousLocation()
        //         let curLocation = event.getLocation()
        //         let vel = curLocation.sub(prevLocation);
        //         let disX = vel.x;
        //         let disY = vel.y;
        //         let eulerX = this.cubeRootNode.eulerAngles.x;
        //         let eulerY = this.cubeRootNode.eulerAngles.y;
        //         let eulerZ = this.cubeRootNode.eulerAngles.z;
        //         let quat = new cc.Quat()
        //         cc.Quat.fromEuler(quat, eulerX, eulerY, eulerZ)
        //         let changed = false
        //         if (Math.abs(disX) > 0.1) {
        //             let angle = (disX / 2436 * 180);
        //             cc.Quat.rotateAround(quat, quat, cc.Vec3.UP, cc.misc.degreesToRadians(angle))
        //             changed = true
        //         }
        //         if (Math.abs(disY) > 0.1) {
        //             let angle = -(disY / 2436 * 180);
        //             cc.Quat.rotateAround(quat, quat, this.threeDCamera.right, cc.misc.degreesToRadians(angle))
        //             changed = true
        //         }
        //         if (changed) {
        //             this.isAllowTouch = false;
        //             let outEuler = cc.v3()
        //             quat.toEuler(outEuler)
        //             this.onChangeBigCubeEuler(outEuler.x, outEuler.y, outEuler.z)
        //         }
        //     }
        // }
        // private onTouchEnd(event: cc.Event.EventTouch) {
        //     let eventID = event.getID();
        //     if (this.touchEventId != null && eventID == this.touchEventId) {
        //         this.touchEventId = null
        //         if (this.isAllowTouch) {
        //             let location = event.getLocation();
        //             let ray = cc.Camera.main.getRay(location);
        //             let results = cc.geomUtils.intersect.raycast(this.cubeRootNode, ray, null, null);
        //             for (let i = 0; i < results.length; i++) {
        //                 if (results[0].node.parent.getComponent(Cube)) {
        //                     results[0].node.parent.getComponent(Cube).clickCube(results[0].node.name);
        //                 }
        //                 return;
        //             }
        //         }
        //     }
        //     this.isAllowTouch = true;
        // }
    }
    GameLayer.prototype.onLoad = function () {
        ListenerManager_1.ListenerManager.on(EventType_1.EventType.ENTER_GAME, this.handleEnterGame, this);
        // this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        // this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
        // this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
    };
    GameLayer.prototype.onDestroy = function () {
        ListenerManager_1.ListenerManager.off(EventType_1.EventType.ENTER_GAME, this.handleEnterGame, this);
        // this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        // this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
        // this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
    };
    GameLayer.prototype.handleEnterGame = function () {
        this.threeDNode.init();
        this.gameUI.init();
    };
    GameLayer.prototype.onDragStart = function (data) {
        this.addMinus.active = false;
        this.img_huangbian[0].active = false;
        this.img_huangbian[1].active = false;
        this.img_huangbian[2].active = false;
    };
    GameLayer.prototype.onDragMove = function (data) {
        var pos = data.target.parent.convertToWorldSpaceAR(cc.v2(data.pos.x, data.pos.y));
        var prevPos = data.target.parent.convertToWorldSpaceAR(cc.v2(data.prevLocation.x, data.prevLocation.y));
        var prevLocation = cc.v2(prevPos.x, prevPos.y);
        var curLocation = cc.v2(pos.x, pos.y);
        var vel = curLocation.sub(prevLocation);
        var disX = vel.x;
        var disY = vel.y;
        var eulerX = this.cubeRootNode.eulerAngles.x;
        var eulerY = this.cubeRootNode.eulerAngles.y;
        var eulerZ = this.cubeRootNode.eulerAngles.z;
        var quat = new cc.Quat();
        cc.Quat.fromEuler(quat, eulerX, eulerY, eulerZ);
        var changed = false;
        if (Math.abs(disX) > 0.1) {
            var angle = (disX / 2436 * 180);
            cc.Quat.rotateAround(quat, quat, cc.Vec3.UP, cc.misc.degreesToRadians(angle));
            changed = true;
        }
        if (Math.abs(disY) > 0.1) {
            var angle = -(disY / 2436 * 180);
            cc.Quat.rotateAround(quat, quat, this.threeDCamera.right, cc.misc.degreesToRadians(angle));
            changed = true;
        }
        if (changed) {
            var outEuler = cc.v3();
            quat.toEuler(outEuler);
            this.onChangeBigCubeEuler(outEuler.x, outEuler.y, outEuler.z);
        }
    };
    GameLayer.prototype.onDragEnd = function (data) {
        if (data.isClick) {
            this.addMinus.active = false;
            this.img_huangbian[0].active = false;
            this.img_huangbian[1].active = false;
            this.img_huangbian[2].active = false;
        }
        this.node.position = cc.Vec3.ZERO;
        if (data.isClick && SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.enableClick) {
            var pos = data.target.parent.convertToWorldSpaceAR(cc.v2(data.pos.x, data.pos.y));
            var location = cc.v2(pos.x, pos.y);
            var ray = cc.Camera.main.getRay(location);
            var results = cc.geomUtils.intersect.raycast(this.cubeRootNode, ray, null, null);
            for (var i = 0; i < results.length; i++) {
                if (results[0].node.parent.getComponent(Cube_1.default)) {
                    results[0].node.parent.getComponent(Cube_1.default).clickCube(results[1].node.name);
                }
                return;
            }
        }
    };
    GameLayer.prototype.onChangeBigCubeEuler = function (eulerX, eulerY, eulerZ) {
        var rotation = cc.quat();
        cc.Quat.fromEuler(rotation, eulerX, eulerY, eulerZ);
        this.cubeRootNode.setRotation(rotation);
    };
    __decorate([
        property(ThreeDNode_1.default)
    ], GameLayer.prototype, "threeDNode", void 0);
    __decorate([
        property(GameUI_1.default)
    ], GameLayer.prototype, "gameUI", void 0);
    __decorate([
        property(cc.Node)
    ], GameLayer.prototype, "threeDCamera", void 0);
    __decorate([
        property(cc.Node)
    ], GameLayer.prototype, "cubeRootNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameLayer.prototype, "addMinus", void 0);
    __decorate([
        property(cc.Node)
    ], GameLayer.prototype, "img_huangbian", void 0);
    GameLayer = __decorate([
        ccclass
    ], GameLayer);
    return GameLayer;
}(cc.Component));
exports.default = GameLayer;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZVxcc2NyaXB0c1xcVUlcXExheWVyXFxHYW1lTGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUZBQW9GO0FBQ3BGLHFGQUFvRjtBQUNwRixrREFBaUQ7QUFDakQscUNBQWdDO0FBQ2hDLHlDQUFvQztBQUNwQyxpREFBMkM7QUFFckMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBdUMsNkJBQVk7SUFBbkQ7UUFBQSxxRUE0S0M7UUExS1csZ0JBQVUsR0FBYyxJQUFJLENBQUM7UUFFN0IsWUFBTSxHQUFXLElBQUksQ0FBQztRQUd0QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUU3QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUU3QixjQUFRLEdBQVksSUFBSSxDQUFDO1FBRXpCLG1CQUFhLEdBQWMsRUFBRSxDQUFDOztRQTRGdEMseUNBQXlDO1FBQ3pDLHFEQUFxRDtRQUNyRCxnQ0FBZ0M7UUFDaEMsbUNBQW1DO1FBQ25DLHVDQUF1QztRQUN2QyxpQkFBaUI7UUFDakIsUUFBUTtRQUNSLG1DQUFtQztRQUNuQyxJQUFJO1FBRUosb0RBQW9EO1FBQ3BELG1DQUFtQztRQUNuQyx1RUFBdUU7UUFDdkUsa0NBQWtDO1FBQ2xDLHlEQUF5RDtRQUN6RCxnREFBZ0Q7UUFDaEQsbURBQW1EO1FBQ25ELDRCQUE0QjtRQUM1Qiw0QkFBNEI7UUFFNUIsd0RBQXdEO1FBQ3hELHdEQUF3RDtRQUN4RCx3REFBd0Q7UUFDeEQsbUNBQW1DO1FBQ25DLDBEQUEwRDtRQUMxRCw4QkFBOEI7UUFDOUIsc0NBQXNDO1FBQ3RDLCtDQUErQztRQUMvQyw0RkFBNEY7UUFDNUYsNkJBQTZCO1FBQzdCLFlBQVk7UUFDWixzQ0FBc0M7UUFDdEMsZ0RBQWdEO1FBQ2hELHlHQUF5RztRQUN6Ryw2QkFBNkI7UUFD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QUNvQjtJQWJyQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBNEs3QjtJQUFELGdCQUFDO0NBNUtELEFBNEtDLENBNUtzQyxFQUFFLENBQUMsU0FBUyxHQTRLbEQ7a0JBNUtvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGlzdGVuZXJNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1lL3NjcmlwdHMvTWFuYWdlci9MaXN0ZW5lck1hbmFnZXJcIjtcbmltcG9ydCB7IFN5bmNEYXRhTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZS9zY3JpcHRzL01hbmFnZXIvU3luY0RhdGFNYW5hZ2VyXCI7XG5pbXBvcnQgeyBFdmVudFR5cGUgfSBmcm9tIFwiLi4vLi4vRGF0YS9FdmVudFR5cGVcIjtcbmltcG9ydCBDdWJlIGZyb20gXCIuLi9JdGVtL0N1YmVcIjtcbmltcG9ydCBHYW1lVUkgZnJvbSBcIi4uL0l0ZW0vR2FtZVVJXCI7XG5pbXBvcnQgVGhyZWVOb2RlIGZyb20gXCIuLi9JdGVtL1RocmVlRE5vZGVcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVMYXllciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgQHByb3BlcnR5KFRocmVlTm9kZSlcbiAgICBwcml2YXRlIHRocmVlRE5vZGU6IFRocmVlTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KEdhbWVVSSlcbiAgICBwcml2YXRlIGdhbWVVSTogR2FtZVVJID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgdGhyZWVEQ2FtZXJhOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcml2YXRlIGN1YmVSb290Tm9kZTogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBhZGRNaW51czogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBpbWdfaHVhbmdiaWFuOiBjYy5Ob2RlW10gPSBbXTtcblxuICAgIHByaXZhdGUgdG91Y2hFdmVudElkOiBudW1iZXI7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIExpc3RlbmVyTWFuYWdlci5vbihFdmVudFR5cGUuRU5URVJfR0FNRSwgdGhpcy5oYW5kbGVFbnRlckdhbWUsIHRoaXMpO1xuXG4gICAgICAgIC8vIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5vblRvdWNoU3RhcnQsIHRoaXMpXG4gICAgICAgIC8vIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLm9uVG91Y2hNb3ZlLCB0aGlzKVxuICAgICAgICAvLyB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpXG4gICAgfVxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLm9mZihFdmVudFR5cGUuRU5URVJfR0FNRSwgdGhpcy5oYW5kbGVFbnRlckdhbWUsIHRoaXMpO1xuXG4gICAgICAgIC8vIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaFN0YXJ0LCB0aGlzKVxuICAgICAgICAvLyB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25Ub3VjaE1vdmUsIHRoaXMpXG4gICAgICAgIC8vIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVFbnRlckdhbWUoKSB7XG4gICAgICAgIHRoaXMudGhyZWVETm9kZS5pbml0KCk7XG4gICAgICAgIHRoaXMuZ2FtZVVJLmluaXQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRHJhZ1N0YXJ0KGRhdGEpIHtcbiAgICAgICAgdGhpcy5hZGRNaW51cy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbWdfaHVhbmdiaWFuWzBdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmltZ19odWFuZ2JpYW5bMV0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW1nX2h1YW5nYmlhblsyXS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRHJhZ01vdmUoZGF0YSkge1xuICAgICAgICBsZXQgcG9zID0gZGF0YS50YXJnZXQucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MihkYXRhLnBvcy54LCBkYXRhLnBvcy55KSk7XG4gICAgICAgIGxldCBwcmV2UG9zID0gZGF0YS50YXJnZXQucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MihkYXRhLnByZXZMb2NhdGlvbi54LCBkYXRhLnByZXZMb2NhdGlvbi55KSk7XG4gICAgICAgIGxldCBwcmV2TG9jYXRpb24gPSBjYy52MihwcmV2UG9zLngsIHByZXZQb3MueSk7XG4gICAgICAgIGxldCBjdXJMb2NhdGlvbiA9IGNjLnYyKHBvcy54LCBwb3MueSk7XG5cbiAgICAgICAgbGV0IHZlbCA9IGN1ckxvY2F0aW9uLnN1YihwcmV2TG9jYXRpb24pO1xuICAgICAgICBsZXQgZGlzWCA9IHZlbC54O1xuICAgICAgICBsZXQgZGlzWSA9IHZlbC55O1xuXG4gICAgICAgIGxldCBldWxlclggPSB0aGlzLmN1YmVSb290Tm9kZS5ldWxlckFuZ2xlcy54O1xuICAgICAgICBsZXQgZXVsZXJZID0gdGhpcy5jdWJlUm9vdE5vZGUuZXVsZXJBbmdsZXMueTtcbiAgICAgICAgbGV0IGV1bGVyWiA9IHRoaXMuY3ViZVJvb3ROb2RlLmV1bGVyQW5nbGVzLno7XG4gICAgICAgIGxldCBxdWF0ID0gbmV3IGNjLlF1YXQoKVxuICAgICAgICBjYy5RdWF0LmZyb21FdWxlcihxdWF0LCBldWxlclgsIGV1bGVyWSwgZXVsZXJaKVxuICAgICAgICBsZXQgY2hhbmdlZCA9IGZhbHNlXG4gICAgICAgIGlmIChNYXRoLmFicyhkaXNYKSA+IDAuMSkge1xuICAgICAgICAgICAgbGV0IGFuZ2xlID0gKGRpc1ggLyAyNDM2ICogMTgwKTtcbiAgICAgICAgICAgIGNjLlF1YXQucm90YXRlQXJvdW5kKHF1YXQsIHF1YXQsIGNjLlZlYzMuVVAsIGNjLm1pc2MuZGVncmVlc1RvUmFkaWFucyhhbmdsZSkpXG4gICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGlmIChNYXRoLmFicyhkaXNZKSA+IDAuMSkge1xuICAgICAgICAgICAgbGV0IGFuZ2xlID0gLShkaXNZIC8gMjQzNiAqIDE4MCk7XG4gICAgICAgICAgICBjYy5RdWF0LnJvdGF0ZUFyb3VuZChxdWF0LCBxdWF0LCB0aGlzLnRocmVlRENhbWVyYS5yaWdodCwgY2MubWlzYy5kZWdyZWVzVG9SYWRpYW5zKGFuZ2xlKSlcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgICAgIGxldCBvdXRFdWxlciA9IGNjLnYzKClcbiAgICAgICAgICAgIHF1YXQudG9FdWxlcihvdXRFdWxlcilcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2VCaWdDdWJlRXVsZXIob3V0RXVsZXIueCwgb3V0RXVsZXIueSwgb3V0RXVsZXIueilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25EcmFnRW5kKGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEuaXNDbGljaykge1xuICAgICAgICAgICAgdGhpcy5hZGRNaW51cy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaW1nX2h1YW5nYmlhblswXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaW1nX2h1YW5nYmlhblsxXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaW1nX2h1YW5nYmlhblsyXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vZGUucG9zaXRpb24gPSBjYy5WZWMzLlpFUk87XG4gICAgICAgIGlmIChkYXRhLmlzQ2xpY2sgJiYgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuZW5hYmxlQ2xpY2spIHtcbiAgICAgICAgICAgIGxldCBwb3MgPSBkYXRhLnRhcmdldC5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKGRhdGEucG9zLngsIGRhdGEucG9zLnkpKTtcbiAgICAgICAgICAgIGxldCBsb2NhdGlvbiA9IGNjLnYyKHBvcy54LCBwb3MueSk7XG4gICAgICAgICAgICBsZXQgcmF5ID0gY2MuQ2FtZXJhLm1haW4uZ2V0UmF5KGxvY2F0aW9uKTtcbiAgICAgICAgICAgIGxldCByZXN1bHRzID0gY2MuZ2VvbVV0aWxzLmludGVyc2VjdC5yYXljYXN0KHRoaXMuY3ViZVJvb3ROb2RlLCByYXksIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdHNbMF0ubm9kZS5wYXJlbnQuZ2V0Q29tcG9uZW50KEN1YmUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHNbMF0ubm9kZS5wYXJlbnQuZ2V0Q29tcG9uZW50KEN1YmUpLmNsaWNrQ3ViZShyZXN1bHRzWzFdLm5vZGUubmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25DaGFuZ2VCaWdDdWJlRXVsZXIoZXVsZXJYOiBudW1iZXIsIGV1bGVyWTogbnVtYmVyLCBldWxlclo6IG51bWJlcikge1xuICAgICAgICBsZXQgcm90YXRpb24gPSBjYy5xdWF0KCk7XG4gICAgICAgIGNjLlF1YXQuZnJvbUV1bGVyKHJvdGF0aW9uLCBldWxlclgsIGV1bGVyWSwgZXVsZXJaKTtcbiAgICAgICAgdGhpcy5jdWJlUm9vdE5vZGUuc2V0Um90YXRpb24ocm90YXRpb24pO1xuICAgIH1cblxuICAgIC8vIHByaXZhdGUgaXNBbGxvd1RvdWNoOiBib29sZWFuID0gZmFsc2U7XG4gICAgLy8gcHJpdmF0ZSBvblRvdWNoU3RhcnQoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcbiAgICAvLyAgICAgdGhpcy5pc0FsbG93VG91Y2ggPSB0cnVlO1xuICAgIC8vICAgICBsZXQgZXZlbnRJRCA9IGV2ZW50LmdldElEKCk7XG4gICAgLy8gICAgIGlmICh0aGlzLnRvdWNoRXZlbnRJZCAhPSBudWxsKSB7XG4gICAgLy8gICAgICAgICByZXR1cm5cbiAgICAvLyAgICAgfVxuICAgIC8vICAgICB0aGlzLnRvdWNoRXZlbnRJZCA9IGV2ZW50SUQ7XG4gICAgLy8gfVxuXG4gICAgLy8gcHJpdmF0ZSBvblRvdWNoTW92ZShldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xuICAgIC8vICAgICBsZXQgZXZlbnRJRCA9IGV2ZW50LmdldElEKCk7XG4gICAgLy8gICAgIGlmICh0aGlzLnRvdWNoRXZlbnRJZCAhPSBudWxsICYmIGV2ZW50SUQgPT0gdGhpcy50b3VjaEV2ZW50SWQpIHtcbiAgICAvLyAgICAgICAgIC8v77yI5ruR55qE6Led56a7LzEwMDDvvIkqMTgwPeaXi+i9rOeahOinkuW6plxuICAgIC8vICAgICAgICAgbGV0IHByZXZMb2NhdGlvbiA9IGV2ZW50LmdldFByZXZpb3VzTG9jYXRpb24oKVxuICAgIC8vICAgICAgICAgbGV0IGN1ckxvY2F0aW9uID0gZXZlbnQuZ2V0TG9jYXRpb24oKVxuICAgIC8vICAgICAgICAgbGV0IHZlbCA9IGN1ckxvY2F0aW9uLnN1YihwcmV2TG9jYXRpb24pO1xuICAgIC8vICAgICAgICAgbGV0IGRpc1ggPSB2ZWwueDtcbiAgICAvLyAgICAgICAgIGxldCBkaXNZID0gdmVsLnk7XG5cbiAgICAvLyAgICAgICAgIGxldCBldWxlclggPSB0aGlzLmN1YmVSb290Tm9kZS5ldWxlckFuZ2xlcy54O1xuICAgIC8vICAgICAgICAgbGV0IGV1bGVyWSA9IHRoaXMuY3ViZVJvb3ROb2RlLmV1bGVyQW5nbGVzLnk7XG4gICAgLy8gICAgICAgICBsZXQgZXVsZXJaID0gdGhpcy5jdWJlUm9vdE5vZGUuZXVsZXJBbmdsZXMuejtcbiAgICAvLyAgICAgICAgIGxldCBxdWF0ID0gbmV3IGNjLlF1YXQoKVxuICAgIC8vICAgICAgICAgY2MuUXVhdC5mcm9tRXVsZXIocXVhdCwgZXVsZXJYLCBldWxlclksIGV1bGVyWilcbiAgICAvLyAgICAgICAgIGxldCBjaGFuZ2VkID0gZmFsc2VcbiAgICAvLyAgICAgICAgIGlmIChNYXRoLmFicyhkaXNYKSA+IDAuMSkge1xuICAgIC8vICAgICAgICAgICAgIGxldCBhbmdsZSA9IChkaXNYIC8gMjQzNiAqIDE4MCk7XG4gICAgLy8gICAgICAgICAgICAgY2MuUXVhdC5yb3RhdGVBcm91bmQocXVhdCwgcXVhdCwgY2MuVmVjMy5VUCwgY2MubWlzYy5kZWdyZWVzVG9SYWRpYW5zKGFuZ2xlKSlcbiAgICAvLyAgICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgICAgaWYgKE1hdGguYWJzKGRpc1kpID4gMC4xKSB7XG4gICAgLy8gICAgICAgICAgICAgbGV0IGFuZ2xlID0gLShkaXNZIC8gMjQzNiAqIDE4MCk7XG4gICAgLy8gICAgICAgICAgICAgY2MuUXVhdC5yb3RhdGVBcm91bmQocXVhdCwgcXVhdCwgdGhpcy50aHJlZURDYW1lcmEucmlnaHQsIGNjLm1pc2MuZGVncmVlc1RvUmFkaWFucyhhbmdsZSkpXG4gICAgLy8gICAgICAgICAgICAgY2hhbmdlZCA9IHRydWVcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgLy8gICAgICAgICAgICAgdGhpcy5pc0FsbG93VG91Y2ggPSBmYWxzZTtcbiAgICAvLyAgICAgICAgICAgICBsZXQgb3V0RXVsZXIgPSBjYy52MygpXG4gICAgLy8gICAgICAgICAgICAgcXVhdC50b0V1bGVyKG91dEV1bGVyKVxuICAgIC8vICAgICAgICAgICAgIHRoaXMub25DaGFuZ2VCaWdDdWJlRXVsZXIob3V0RXVsZXIueCwgb3V0RXVsZXIueSwgb3V0RXVsZXIueilcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuXG5cbiAgICAvLyBwcml2YXRlIG9uVG91Y2hFbmQoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcbiAgICAvLyAgICAgbGV0IGV2ZW50SUQgPSBldmVudC5nZXRJRCgpO1xuICAgIC8vICAgICBpZiAodGhpcy50b3VjaEV2ZW50SWQgIT0gbnVsbCAmJiBldmVudElEID09IHRoaXMudG91Y2hFdmVudElkKSB7XG4gICAgLy8gICAgICAgICB0aGlzLnRvdWNoRXZlbnRJZCA9IG51bGxcblxuICAgIC8vICAgICAgICAgaWYgKHRoaXMuaXNBbGxvd1RvdWNoKSB7XG4gICAgLy8gICAgICAgICAgICAgbGV0IGxvY2F0aW9uID0gZXZlbnQuZ2V0TG9jYXRpb24oKTtcbiAgICAvLyAgICAgICAgICAgICBsZXQgcmF5ID0gY2MuQ2FtZXJhLm1haW4uZ2V0UmF5KGxvY2F0aW9uKTtcbiAgICAvLyAgICAgICAgICAgICBsZXQgcmVzdWx0cyA9IGNjLmdlb21VdGlscy5pbnRlcnNlY3QucmF5Y2FzdCh0aGlzLmN1YmVSb290Tm9kZSwgcmF5LCBudWxsLCBudWxsKTtcbiAgICAvLyAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdHNbMF0ubm9kZS5wYXJlbnQuZ2V0Q29tcG9uZW50KEN1YmUpKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICByZXN1bHRzWzBdLm5vZGUucGFyZW50LmdldENvbXBvbmVudChDdWJlKS5jbGlja0N1YmUocmVzdWx0c1swXS5ub2RlLm5hbWUpO1xuICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgdGhpcy5pc0FsbG93VG91Y2ggPSB0cnVlO1xuICAgIC8vIH1cblxufVxuIl19