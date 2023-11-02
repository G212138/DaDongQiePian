
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
var NetWork_1 = require("../../../../frame/scripts/Http/NetWork");
var ListenerManager_1 = require("../../../../frame/scripts/Manager/ListenerManager");
var SyncDataManager_1 = require("../../../../frame/scripts/Manager/SyncDataManager");
var T2M_1 = require("../../../../frame/scripts/SDK/T2M");
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
    }
    GameLayer.prototype.onLoad = function () {
        ListenerManager_1.ListenerManager.on(EventType_1.EventType.ENTER_GAME, this.handleEnterGame, this);
        ListenerManager_1.ListenerManager.on(EventType_1.EventType.GAME_RECONNECT, this.handleEnterGame, this);
        T2M_1.T2M.addSyncEventListener(EventType_1.EventType.DRAG_END, this.handleDragEnd.bind(this));
        // this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        // this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
        // this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
    };
    GameLayer.prototype.onDestroy = function () {
        ListenerManager_1.ListenerManager.off(EventType_1.EventType.ENTER_GAME, this.handleEnterGame, this);
        ListenerManager_1.ListenerManager.off(EventType_1.EventType.GAME_RECONNECT, this.handleEnterGame, this);
        T2M_1.T2M.removeSyncEventListener(EventType_1.EventType.DRAG_END);
        // this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        // this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
        // this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
    };
    GameLayer.prototype.handleEnterGame = function () {
        this.threeDNode.init();
        this.gameUI.init();
        var eulerX = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.eulerX;
        var eulerY = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.eulerY;
        var eulerZ = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.eulerZ;
        var rotation = cc.quat();
        cc.Quat.fromEuler(rotation, eulerX, eulerY, eulerZ);
        this.cubeRootNode.setRotation(rotation);
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
            var ray = this.threeDCamera.getComponent(cc.Camera).getRay(location);
            var results = cc.geomUtils.intersect.raycast(this.cubeRootNode, ray, null, null);
            for (var i = 0; i < results.length; i++) {
                if (results[0].node.parent.getComponent(Cube_1.default) && results[1]) {
                    results[0].node.parent.getComponent(Cube_1.default).clickCube(results[1].node.name);
                }
                return;
            }
        }
        if (NetWork_1.NetWork.isMaster || !NetWork_1.NetWork.isSync) {
            var data_1 = {
                eulerX: SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.eulerX,
                eulerY: SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.eulerY,
                eulerZ: SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.eulerZ
            };
            T2M_1.T2M.dispatch(EventType_1.EventType.DRAG_END, data_1);
        }
    };
    GameLayer.prototype.onChangeBigCubeEuler = function (eulerX, eulerY, eulerZ) {
        var rotation = cc.quat();
        cc.Quat.fromEuler(rotation, eulerX, eulerY, eulerZ);
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.eulerX = eulerX;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.eulerY = eulerY;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.eulerZ = eulerZ;
        this.cubeRootNode.setRotation(rotation);
    };
    GameLayer.prototype.handleDragEnd = function (data) {
        var rotation = cc.quat();
        cc.Quat.fromEuler(rotation, data.eulerX, data.eulerY, data.eulerZ);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZVxcc2NyaXB0c1xcVUlcXExheWVyXFxHYW1lTGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0VBQWlFO0FBQ2pFLHFGQUFvRjtBQUNwRixxRkFBb0Y7QUFDcEYseURBQXdEO0FBQ3hELGtEQUFpRDtBQUNqRCxxQ0FBZ0M7QUFDaEMseUNBQW9DO0FBQ3BDLGlEQUEyQztBQUVyQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF1Qyw2QkFBWTtJQUFuRDtRQUFBLHFFQXFJQztRQW5JVyxnQkFBVSxHQUFjLElBQUksQ0FBQztRQUU3QixZQUFNLEdBQVcsSUFBSSxDQUFDO1FBR3RCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRTdCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRTdCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsbUJBQWEsR0FBYyxFQUFFLENBQUM7O0lBd0gxQyxDQUFDO0lBcEhHLDBCQUFNLEdBQU47UUFDSSxpQ0FBZSxDQUFDLEVBQUUsQ0FBQyxxQkFBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JFLGlDQUFlLENBQUMsRUFBRSxDQUFDLHFCQUFTLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFekUsU0FBRyxDQUFDLG9CQUFvQixDQUFDLHFCQUFTLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDNUUsdUVBQXVFO1FBQ3ZFLHFFQUFxRTtRQUNyRSxtRUFBbUU7SUFDdkUsQ0FBQztJQUNELDZCQUFTLEdBQVQ7UUFDSSxpQ0FBZSxDQUFDLEdBQUcsQ0FBQyxxQkFBUyxDQUFDLFVB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ZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV0V29yayB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZS9zY3JpcHRzL0h0dHAvTmV0V29ya1wiO1xuaW1wb3J0IHsgTGlzdGVuZXJNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1lL3NjcmlwdHMvTWFuYWdlci9MaXN0ZW5lck1hbmFnZXJcIjtcbmltcG9ydCB7IFN5bmNEYXRhTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZS9zY3JpcHRzL01hbmFnZXIvU3luY0RhdGFNYW5hZ2VyXCI7XG5pbXBvcnQgeyBUMk0gfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWUvc2NyaXB0cy9TREsvVDJNXCI7XG5pbXBvcnQgeyBFdmVudFR5cGUgfSBmcm9tIFwiLi4vLi4vRGF0YS9FdmVudFR5cGVcIjtcbmltcG9ydCBDdWJlIGZyb20gXCIuLi9JdGVtL0N1YmVcIjtcbmltcG9ydCBHYW1lVUkgZnJvbSBcIi4uL0l0ZW0vR2FtZVVJXCI7XG5pbXBvcnQgVGhyZWVOb2RlIGZyb20gXCIuLi9JdGVtL1RocmVlRE5vZGVcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVMYXllciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgQHByb3BlcnR5KFRocmVlTm9kZSlcbiAgICBwcml2YXRlIHRocmVlRE5vZGU6IFRocmVlTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KEdhbWVVSSlcbiAgICBwcml2YXRlIGdhbWVVSTogR2FtZVVJID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgdGhyZWVEQ2FtZXJhOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcml2YXRlIGN1YmVSb290Tm9kZTogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBhZGRNaW51czogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBpbWdfaHVhbmdiaWFuOiBjYy5Ob2RlW10gPSBbXTtcblxuICAgIHByaXZhdGUgdG91Y2hFdmVudElkOiBudW1iZXI7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIExpc3RlbmVyTWFuYWdlci5vbihFdmVudFR5cGUuRU5URVJfR0FNRSwgdGhpcy5oYW5kbGVFbnRlckdhbWUsIHRoaXMpO1xuICAgICAgICBMaXN0ZW5lck1hbmFnZXIub24oRXZlbnRUeXBlLkdBTUVfUkVDT05ORUNULCB0aGlzLmhhbmRsZUVudGVyR2FtZSwgdGhpcyk7XG5cbiAgICAgICAgVDJNLmFkZFN5bmNFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5EUkFHX0VORCwgdGhpcy5oYW5kbGVEcmFnRW5kLmJpbmQodGhpcykpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaFN0YXJ0LCB0aGlzKVxuICAgICAgICAvLyB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5vblRvdWNoTW92ZSwgdGhpcylcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kLCB0aGlzKVxuICAgIH1cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIExpc3RlbmVyTWFuYWdlci5vZmYoRXZlbnRUeXBlLkVOVEVSX0dBTUUsIHRoaXMuaGFuZGxlRW50ZXJHYW1lLCB0aGlzKTtcbiAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLm9mZihFdmVudFR5cGUuR0FNRV9SRUNPTk5FQ1QsIHRoaXMuaGFuZGxlRW50ZXJHYW1lLCB0aGlzKTtcblxuICAgICAgICBUMk0ucmVtb3ZlU3luY0V2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLkRSQUdfRU5EKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5vblRvdWNoU3RhcnQsIHRoaXMpXG4gICAgICAgIC8vIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5vblRvdWNoTW92ZSwgdGhpcylcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaEVuZCwgdGhpcylcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUVudGVyR2FtZSgpIHtcbiAgICAgICAgdGhpcy50aHJlZUROb2RlLmluaXQoKTtcbiAgICAgICAgdGhpcy5nYW1lVUkuaW5pdCgpO1xuXG4gICAgICAgIGxldCBldWxlclggPSBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5ldWxlclg7XG4gICAgICAgIGxldCBldWxlclkgPSBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5ldWxlclk7XG4gICAgICAgIGxldCBldWxlclogPSBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5ldWxlclo7XG4gICAgICAgIGxldCByb3RhdGlvbiA9IGNjLnF1YXQoKTtcbiAgICAgICAgY2MuUXVhdC5mcm9tRXVsZXIocm90YXRpb24sIGV1bGVyWCwgZXVsZXJZLCBldWxlclopO1xuICAgICAgICB0aGlzLmN1YmVSb290Tm9kZS5zZXRSb3RhdGlvbihyb3RhdGlvbik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkRyYWdTdGFydChkYXRhKSB7XG4gICAgICAgIHRoaXMuYWRkTWludXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW1nX2h1YW5nYmlhblswXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbWdfaHVhbmdiaWFuWzFdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmltZ19odWFuZ2JpYW5bMl0uYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkRyYWdNb3ZlKGRhdGEpIHtcbiAgICAgICAgbGV0IHBvcyA9IGRhdGEudGFyZ2V0LnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoZGF0YS5wb3MueCwgZGF0YS5wb3MueSkpO1xuICAgICAgICBsZXQgcHJldlBvcyA9IGRhdGEudGFyZ2V0LnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoZGF0YS5wcmV2TG9jYXRpb24ueCwgZGF0YS5wcmV2TG9jYXRpb24ueSkpO1xuICAgICAgICBsZXQgcHJldkxvY2F0aW9uID0gY2MudjIocHJldlBvcy54LCBwcmV2UG9zLnkpO1xuICAgICAgICBsZXQgY3VyTG9jYXRpb24gPSBjYy52Mihwb3MueCwgcG9zLnkpO1xuXG4gICAgICAgIGxldCB2ZWwgPSBjdXJMb2NhdGlvbi5zdWIocHJldkxvY2F0aW9uKTtcbiAgICAgICAgbGV0IGRpc1ggPSB2ZWwueDtcbiAgICAgICAgbGV0IGRpc1kgPSB2ZWwueTtcblxuICAgICAgICBsZXQgZXVsZXJYID0gdGhpcy5jdWJlUm9vdE5vZGUuZXVsZXJBbmdsZXMueDtcbiAgICAgICAgbGV0IGV1bGVyWSA9IHRoaXMuY3ViZVJvb3ROb2RlLmV1bGVyQW5nbGVzLnk7XG4gICAgICAgIGxldCBldWxlclogPSB0aGlzLmN1YmVSb290Tm9kZS5ldWxlckFuZ2xlcy56O1xuICAgICAgICBsZXQgcXVhdCA9IG5ldyBjYy5RdWF0KClcbiAgICAgICAgY2MuUXVhdC5mcm9tRXVsZXIocXVhdCwgZXVsZXJYLCBldWxlclksIGV1bGVyWilcbiAgICAgICAgbGV0IGNoYW5nZWQgPSBmYWxzZVxuICAgICAgICBpZiAoTWF0aC5hYnMoZGlzWCkgPiAwLjEpIHtcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IChkaXNYIC8gMjQzNiAqIDE4MCk7XG4gICAgICAgICAgICBjYy5RdWF0LnJvdGF0ZUFyb3VuZChxdWF0LCBxdWF0LCBjYy5WZWMzLlVQLCBjYy5taXNjLmRlZ3JlZXNUb1JhZGlhbnMoYW5nbGUpKVxuICAgICAgICAgICAgY2hhbmdlZCA9IHRydWVcbiAgICAgICAgfVxuICAgICAgICBpZiAoTWF0aC5hYnMoZGlzWSkgPiAwLjEpIHtcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IC0oZGlzWSAvIDI0MzYgKiAxODApO1xuICAgICAgICAgICAgY2MuUXVhdC5yb3RhdGVBcm91bmQocXVhdCwgcXVhdCwgdGhpcy50aHJlZURDYW1lcmEucmlnaHQsIGNjLm1pc2MuZGVncmVlc1RvUmFkaWFucyhhbmdsZSkpXG4gICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICAgICAgICBsZXQgb3V0RXVsZXIgPSBjYy52MygpXG4gICAgICAgICAgICBxdWF0LnRvRXVsZXIob3V0RXVsZXIpXG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlQmlnQ3ViZUV1bGVyKG91dEV1bGVyLngsIG91dEV1bGVyLnksIG91dEV1bGVyLnopXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRHJhZ0VuZChkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhLmlzQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMuYWRkTWludXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmltZ19odWFuZ2JpYW5bMF0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmltZ19odWFuZ2JpYW5bMV0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmltZ19odWFuZ2JpYW5bMl0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlLnBvc2l0aW9uID0gY2MuVmVjMy5aRVJPO1xuICAgICAgICBpZiAoZGF0YS5pc0NsaWNrICYmIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmVuYWJsZUNsaWNrKSB7XG4gICAgICAgICAgICBsZXQgcG9zID0gZGF0YS50YXJnZXQucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MihkYXRhLnBvcy54LCBkYXRhLnBvcy55KSk7XG4gICAgICAgICAgICBsZXQgbG9jYXRpb24gPSBjYy52Mihwb3MueCwgcG9zLnkpO1xuICAgICAgICAgICAgbGV0IHJheSA9IHRoaXMudGhyZWVEQ2FtZXJhLmdldENvbXBvbmVudChjYy5DYW1lcmEpLmdldFJheShsb2NhdGlvbik7XG4gICAgICAgICAgICBsZXQgcmVzdWx0cyA9IGNjLmdlb21VdGlscy5pbnRlcnNlY3QucmF5Y2FzdCh0aGlzLmN1YmVSb290Tm9kZSwgcmF5LCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRzWzBdLm5vZGUucGFyZW50LmdldENvbXBvbmVudChDdWJlKSAmJiByZXN1bHRzWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHNbMF0ubm9kZS5wYXJlbnQuZ2V0Q29tcG9uZW50KEN1YmUpLmNsaWNrQ3ViZShyZXN1bHRzWzFdLm5vZGUubmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChOZXRXb3JrLmlzTWFzdGVyIHx8ICFOZXRXb3JrLmlzU3luYykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgZXVsZXJYOiBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5ldWxlclgsXG4gICAgICAgICAgICAgICAgZXVsZXJZOiBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5ldWxlclksXG4gICAgICAgICAgICAgICAgZXVsZXJaOiBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5ldWxlclpcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFQyTS5kaXNwYXRjaChFdmVudFR5cGUuRFJBR19FTkQsIGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNoYW5nZUJpZ0N1YmVFdWxlcihldWxlclg6IG51bWJlciwgZXVsZXJZOiBudW1iZXIsIGV1bGVyWjogbnVtYmVyKSB7XG4gICAgICAgIGxldCByb3RhdGlvbiA9IGNjLnF1YXQoKTtcbiAgICAgICAgY2MuUXVhdC5mcm9tRXVsZXIocm90YXRpb24sIGV1bGVyWCwgZXVsZXJZLCBldWxlclopO1xuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5ldWxlclggPSBldWxlclg7XG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmV1bGVyWSA9IGV1bGVyWTtcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuZXVsZXJaID0gZXVsZXJaO1xuICAgICAgICB0aGlzLmN1YmVSb290Tm9kZS5zZXRSb3RhdGlvbihyb3RhdGlvbik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVEcmFnRW5kKGRhdGE6IGFueSkge1xuICAgICAgICBsZXQgcm90YXRpb24gPSBjYy5xdWF0KCk7XG4gICAgICAgIGNjLlF1YXQuZnJvbUV1bGVyKHJvdGF0aW9uLCBkYXRhLmV1bGVyWCwgZGF0YS5ldWxlclksIGRhdGEuZXVsZXJaKTtcbiAgICAgICAgdGhpcy5jdWJlUm9vdE5vZGUuc2V0Um90YXRpb24ocm90YXRpb24pO1xuICAgIH1cbn1cbiJdfQ==