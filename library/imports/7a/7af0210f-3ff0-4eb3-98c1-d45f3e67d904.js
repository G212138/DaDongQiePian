"use strict";
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