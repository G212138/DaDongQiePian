
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/game/scripts/UI/Item/GameUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3f05fPAQipNXooynbRVeysu', 'GameUI');
// game/scripts/UI/Item/GameUI.ts

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
var QiepianPanel_1 = require("./QiepianPanel");
var ThreeDNode_1 = require("./ThreeDNode");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameUI = /** @class */ (function (_super) {
    __extends(GameUI, _super);
    function GameUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.threeDNode = null;
        _this.qiepianNode = null;
        _this.qiepianPanel_prefab = null;
        _this.addMinus = null;
        _this.lbl_xCount = null;
        _this.lbl_yCount = null;
        _this.lbl_zCount = null;
        _this.img_huangbian = [];
        _this.inputType = 0;
        return _this;
    }
    GameUI.prototype.onLoad = function () {
        ListenerManager_1.ListenerManager.on(EventType_1.EventType.CLICK_CUBE, this.handleClickCube, this);
    };
    GameUI.prototype.onDestroy = function () {
        ListenerManager_1.ListenerManager.off(EventType_1.EventType.CLICK_CUBE, this.handleClickCube, this);
    };
    GameUI.prototype.init = function () {
        this.lbl_xCount.string = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.xCount.toString();
        this.lbl_yCount.string = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.zCount.toString();
        this.lbl_zCount.string = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.yCount.toString();
    };
    GameUI.prototype.onClickBtnOpen = function () {
        this.addMinus.active = false;
        this.img_huangbian[0].active = false;
        this.img_huangbian[1].active = false;
        this.img_huangbian[2].active = false;
        if (!SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.cubeOpened) {
            SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.cubeOpened = true;
            ListenerManager_1.ListenerManager.dispatch(EventType_1.EventType.CUBE_OPEN, true);
            this.showQiepianPanel();
            this.handleClickCube();
        }
        else {
            SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.cubeOpened = false;
            ListenerManager_1.ListenerManager.dispatch(EventType_1.EventType.CUBE_OPEN, false);
            this.qiepianNode.active = false;
        }
    };
    GameUI.prototype.onClickReset = function () {
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.cubeOpened = false;
        this.threeDNode.reset();
        this.qiepianNode.active = false;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.cubeClickArr = [];
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.qiepianClickArr = [];
        this.node.getChildByName("btnBack").getChildByName('disable').active = true;
    };
    GameUI.prototype.onClickBack = function () {
        this.addMinus.active = false;
        this.img_huangbian[0].active = false;
        this.img_huangbian[1].active = false;
        this.img_huangbian[2].active = false;
        if (SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.cubeClickArr.length > 0) {
            SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.cubeClickArr.pop();
            // for (let j = 0; j < this.qiepianNode.childrenCount; j++) {
            //     this.qiepianNode.children[j].getComponent(QiepianPanel).resetBlock();
            // }
            // for (let i = 0; i < SyncDataManager.getSyncData().customSyncData.cubeClickArr.length; i++) {
            //     for (let j = 0; j < this.qiepianNode.childrenCount; j++) {
            //         this.qiepianNode.children[j].getComponent(QiepianPanel).onHandleClickCube(SyncDataManager.getSyncData().customSyncData.cubeClickArr[i]);
            //     }
            // }
            this.cubeClickBack();
        }
    };
    GameUI.prototype.onClickEnanleClick = function () {
        this.addMinus.active = false;
        this.img_huangbian[0].active = false;
        this.img_huangbian[1].active = false;
        this.img_huangbian[2].active = false;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.enableClick = !SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.enableClick;
        this.node.getChildByName("btnEnanleClick").getChildByName('xuanzhong').active = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.enableClick;
    };
    GameUI.prototype.cubeClickBack = function () {
        var cubeRootNode = this.threeDNode.node.getChildByName("cubeRootNode");
        for (var i = 0; i < cubeRootNode.childrenCount; i++) {
            cubeRootNode.children[i].getComponent(Cube_1.default).reset();
            for (var j = 0; j < SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.cubeClickArr.length; j++) {
                cubeRootNode.children[i].getComponent(Cube_1.default).handleCubeClick(SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.cubeClickArr[j]);
            }
        }
        this.node.getChildByName("btnBack").getChildByName('disable').active = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.cubeClickArr.length <= 0;
    };
    GameUI.prototype.showQiepianPanel = function () {
        this.qiepianNode.active = true;
        this.qiepianNode.removeAllChildren();
        for (var i = 0; i < SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.yCount; i++) {
            var qiepianPanel = cc.instantiate(this.qiepianPanel_prefab);
            qiepianPanel.parent = this.qiepianNode;
            qiepianPanel.getComponent(QiepianPanel_1.default).init(i);
        }
    };
    GameUI.prototype.handleClickCube = function () {
        // for (let i = 0; i < SyncDataManager.getSyncData().customSyncData.cubeClickArr.length; i++) {
        //     for (let j = 0; j < this.qiepianNode.childrenCount; j++) {
        //         this.qiepianNode.children[j].getComponent(QiepianPanel).onHandleClickCube(SyncDataManager.getSyncData().customSyncData.cubeClickArr[i]);
        //     }
        // }
        this.node.getChildByName("btnBack").getChildByName('disable').active = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.cubeClickArr.length <= 0;
    };
    GameUI.prototype.onClick_xCount = function () {
        this.addMinus.active = true;
        this.addMinus.x = -140;
        this.inputType = 0;
        this.handleBtnState(SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.xCount);
        this.img_huangbian[0].active = true;
        this.img_huangbian[1].active = false;
        this.img_huangbian[2].active = false;
    };
    GameUI.prototype.onClick_yCount = function () {
        this.addMinus.active = true;
        this.addMinus.x = 0;
        this.inputType = 1;
        this.handleBtnState(SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.zCount);
        this.img_huangbian[0].active = false;
        this.img_huangbian[1].active = true;
        this.img_huangbian[2].active = false;
    };
    GameUI.prototype.onClick_zCount = function () {
        this.addMinus.active = true;
        this.addMinus.x = 140;
        this.inputType = 2;
        this.handleBtnState(SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.yCount);
        this.img_huangbian[0].active = false;
        this.img_huangbian[1].active = false;
        this.img_huangbian[2].active = true;
    };
    GameUI.prototype.onClickAdd = function () {
        if (this.inputType == 0 && SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.xCount < 6) {
            SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.xCount++;
            this.lbl_xCount.string = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.xCount.toString();
            this.handleBtnState(SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.xCount);
        }
        else if (this.inputType == 1 && SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.zCount < 6) {
            SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.zCount++;
            this.lbl_yCount.string = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.zCount.toString();
            this.handleBtnState(SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.zCount);
        }
        else if (this.inputType == 2 && SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.yCount < 6) {
            SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.yCount++;
            this.lbl_zCount.string = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.yCount.toString();
            this.handleBtnState(SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.yCount);
        }
        this.threeDNode.reset();
        this.qiepianNode.active = false;
    };
    GameUI.prototype.onClickMinus = function () {
        if (this.inputType == 0 && SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.xCount > 1) {
            SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.xCount--;
            this.lbl_xCount.string = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.xCount.toString();
            this.handleBtnState(SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.xCount);
        }
        else if (this.inputType == 1 && SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.zCount > 1) {
            SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.zCount--;
            this.lbl_yCount.string = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.zCount.toString();
            this.handleBtnState(SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.zCount);
        }
        else if (this.inputType == 2 && SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.yCount > 1) {
            SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.yCount--;
            this.lbl_zCount.string = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.yCount.toString();
            this.handleBtnState(SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.yCount);
        }
        this.threeDNode.reset();
        this.qiepianNode.active = false;
    };
    GameUI.prototype.handleBtnState = function (count) {
        if (count <= 1) {
            this.addMinus.getChildByName("btnMinusSize").getChildByName("Label").color = new cc.Color().fromHEX("#74BBF2");
        }
        else {
            this.addMinus.getChildByName("btnMinusSize").getChildByName("Label").color = new cc.Color().fromHEX("#2094EE");
        }
        if (count >= 6) {
            this.addMinus.getChildByName("btnAddSize").getChildByName("Label").color = new cc.Color().fromHEX("#74BBF2");
        }
        else {
            this.addMinus.getChildByName("btnAddSize").getChildByName("Label").color = new cc.Color().fromHEX("#2094EE");
        }
    };
    __decorate([
        property(ThreeDNode_1.default)
    ], GameUI.prototype, "threeDNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameUI.prototype, "qiepianNode", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameUI.prototype, "qiepianPanel_prefab", void 0);
    __decorate([
        property(cc.Node)
    ], GameUI.prototype, "addMinus", void 0);
    __decorate([
        property(cc.Label)
    ], GameUI.prototype, "lbl_xCount", void 0);
    __decorate([
        property(cc.Label)
    ], GameUI.prototype, "lbl_yCount", void 0);
    __decorate([
        property(cc.Label)
    ], GameUI.prototype, "lbl_zCount", void 0);
    __decorate([
        property(cc.Node)
    ], GameUI.prototype, "img_huangbian", void 0);
    GameUI = __decorate([
        ccclass
    ], GameUI);
    return GameUI;
}(cc.Component));
exports.default = GameUI;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZVxcc2NyaXB0c1xcVUlcXEl0ZW1cXEdhbWVVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxxRkFBb0Y7QUFDcEYscUZBQW9GO0FBQ3BGLGtEQUFpRDtBQUNqRCwrQkFBMEI7QUFDMUIsK0NBQTBDO0FBQzFDLDJDQUFxQztBQUUvQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFvQywwQkFBWTtJQUFoRDtRQUFBLHFFQXFNQztRQWxNVyxnQkFBVSxHQUFjLElBQUksQ0FBQztRQUU3QixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUU1Qix5QkFBbUIsR0FBYyxJQUFJLENBQUM7UUFFdEMsY0FBUSxHQUFZLElBQUksQ0FBQztRQUV6QixnQkFBVSxHQUFhLElBQUksQ0FBQztRQUU1QixnQkFBVSxHQUFhLElBQUksQ0FBQztRQUU1QixnQkFBVSxHQUFhLElBQUksQ0FBQztRQUU1QixtQkFBYSxHQUFjLEVBQUUsQ0FBQztRQW9HOUIsZUFBUyxHQUFXLENBQUMsQ0FBQzs7SUFnRmxDLENBQUM7SUFsTEcsdUJBQU0sR0FBTjtRQUNJLGlDQUFlLENBQUMsRUFBRSxDQUFDLHFCQUFTLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELDBCQUFTLEdBQVQ7UUFDSSxpQ0FBZSxDQUFDLEdBQUcsQ0FBQyxxQkFBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3pFLENBQUM7SUFFTSxxQkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsaUNBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FB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QUVwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzhDQUNpQjtJQUVwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNvQjtJQWpCckIsTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQXFNMUI7SUFBRCxhQUFDO0NBck1ELEFBcU1DLENBck1tQyxFQUFFLENBQUMsU0FBUyxHQXFNL0M7a0JBck1vQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBMaXN0ZW5lck1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWUvc2NyaXB0cy9NYW5hZ2VyL0xpc3RlbmVyTWFuYWdlclwiO1xuaW1wb3J0IHsgU3luY0RhdGFNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1lL3NjcmlwdHMvTWFuYWdlci9TeW5jRGF0YU1hbmFnZXJcIjtcbmltcG9ydCB7IEV2ZW50VHlwZSB9IGZyb20gXCIuLi8uLi9EYXRhL0V2ZW50VHlwZVwiO1xuaW1wb3J0IEN1YmUgZnJvbSBcIi4vQ3ViZVwiO1xuaW1wb3J0IFFpZXBpYW5QYW5lbCBmcm9tIFwiLi9RaWVwaWFuUGFuZWxcIjtcbmltcG9ydCBUaHJlZU5vZGUgZnJvbSBcIi4vVGhyZWVETm9kZVwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVVJIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShUaHJlZU5vZGUpXG4gICAgcHJpdmF0ZSB0aHJlZUROb2RlOiBUaHJlZU5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgcWllcGlhbk5vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgcHJpdmF0ZSBxaWVwaWFuUGFuZWxfcHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgYWRkTWludXM6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxibF94Q291bnQ6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYmxfeUNvdW50OiBjYy5MYWJlbCA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGJsX3pDb3VudDogY2MuTGFiZWwgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgaW1nX2h1YW5nYmlhbjogY2MuTm9kZVtdID0gW107XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIExpc3RlbmVyTWFuYWdlci5vbihFdmVudFR5cGUuQ0xJQ0tfQ1VCRSwgdGhpcy5oYW5kbGVDbGlja0N1YmUsIHRoaXMpO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLm9mZihFdmVudFR5cGUuQ0xJQ0tfQ1VCRSwgdGhpcy5oYW5kbGVDbGlja0N1YmUsIHRoaXMpXG4gICAgfVxuXG4gICAgcHVibGljIGluaXQoKSB7XG4gICAgICAgIHRoaXMubGJsX3hDb3VudC5zdHJpbmcgPSBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS54Q291bnQudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5sYmxfeUNvdW50LnN0cmluZyA9IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnpDb3VudC50b1N0cmluZygpO1xuICAgICAgICB0aGlzLmxibF96Q291bnQuc3RyaW5nID0gU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEueUNvdW50LnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNsaWNrQnRuT3BlbigpIHtcbiAgICAgICAgdGhpcy5hZGRNaW51cy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbWdfaHVhbmdiaWFuWzBdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmltZ19odWFuZ2JpYW5bMV0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW1nX2h1YW5nYmlhblsyXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgaWYgKCFTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5jdWJlT3BlbmVkKSB7XG4gICAgICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5jdWJlT3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIExpc3RlbmVyTWFuYWdlci5kaXNwYXRjaChFdmVudFR5cGUuQ1VCRV9PUEVOLCB0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd1FpZXBpYW5QYW5lbCgpO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDbGlja0N1YmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmN1YmVPcGVuZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIExpc3RlbmVyTWFuYWdlci5kaXNwYXRjaChFdmVudFR5cGUuQ1VCRV9PUEVOLCBmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLnFpZXBpYW5Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNsaWNrUmVzZXQoKSB7XG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmN1YmVPcGVuZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aHJlZUROb2RlLnJlc2V0KCk7XG4gICAgICAgIHRoaXMucWllcGlhbk5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmN1YmVDbGlja0FyciA9IFtdO1xuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5xaWVwaWFuQ2xpY2tBcnIgPSBbXTtcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuQmFja1wiKS5nZXRDaGlsZEJ5TmFtZSgnZGlzYWJsZScpLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNsaWNrQmFjaygpIHtcbiAgICAgICAgdGhpcy5hZGRNaW51cy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbWdfaHVhbmdiaWFuWzBdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmltZ19odWFuZ2JpYW5bMV0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW1nX2h1YW5nYmlhblsyXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgaWYgKFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmN1YmVDbGlja0Fyci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5jdWJlQ2xpY2tBcnIucG9wKCk7XG4gICAgICAgICAgICAvLyBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMucWllcGlhbk5vZGUuY2hpbGRyZW5Db3VudDsgaisrKSB7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5xaWVwaWFuTm9kZS5jaGlsZHJlbltqXS5nZXRDb21wb25lbnQoUWllcGlhblBhbmVsKS5yZXNldEJsb2NrKCk7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmN1YmVDbGlja0Fyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy8gICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5xaWVwaWFuTm9kZS5jaGlsZHJlbkNvdW50OyBqKyspIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5xaWVwaWFuTm9kZS5jaGlsZHJlbltqXS5nZXRDb21wb25lbnQoUWllcGlhblBhbmVsKS5vbkhhbmRsZUNsaWNrQ3ViZShTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5jdWJlQ2xpY2tBcnJbaV0pO1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIHRoaXMuY3ViZUNsaWNrQmFjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNsaWNrRW5hbmxlQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuYWRkTWludXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW1nX2h1YW5nYmlhblswXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbWdfaHVhbmdiaWFuWzFdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmltZ19odWFuZ2JpYW5bMl0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmVuYWJsZUNsaWNrID0gIVN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmVuYWJsZUNsaWNrO1xuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5FbmFubGVDbGlja1wiKS5nZXRDaGlsZEJ5TmFtZSgneHVhbnpob25nJykuYWN0aXZlID0gU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuZW5hYmxlQ2xpY2s7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjdWJlQ2xpY2tCYWNrKCkge1xuICAgICAgICBsZXQgY3ViZVJvb3ROb2RlID0gdGhpcy50aHJlZUROb2RlLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjdWJlUm9vdE5vZGVcIik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3ViZVJvb3ROb2RlLmNoaWxkcmVuQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgY3ViZVJvb3ROb2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChDdWJlKS5yZXNldCgpO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5jdWJlQ2xpY2tBcnIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjdWJlUm9vdE5vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KEN1YmUpLmhhbmRsZUN1YmVDbGljayhTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5jdWJlQ2xpY2tBcnJbal0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bkJhY2tcIikuZ2V0Q2hpbGRCeU5hbWUoJ2Rpc2FibGUnKS5hY3RpdmUgPSBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5jdWJlQ2xpY2tBcnIubGVuZ3RoIDw9IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93UWllcGlhblBhbmVsKCkge1xuICAgICAgICB0aGlzLnFpZXBpYW5Ob2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMucWllcGlhbk5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS55Q291bnQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IHFpZXBpYW5QYW5lbCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucWllcGlhblBhbmVsX3ByZWZhYik7XG4gICAgICAgICAgICBxaWVwaWFuUGFuZWwucGFyZW50ID0gdGhpcy5xaWVwaWFuTm9kZTtcbiAgICAgICAgICAgIHFpZXBpYW5QYW5lbC5nZXRDb21wb25lbnQoUWllcGlhblBhbmVsKS5pbml0KGkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVDbGlja0N1YmUoKSB7XG4gICAgICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuY3ViZUNsaWNrQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMucWllcGlhbk5vZGUuY2hpbGRyZW5Db3VudDsgaisrKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5xaWVwaWFuTm9kZS5jaGlsZHJlbltqXS5nZXRDb21wb25lbnQoUWllcGlhblBhbmVsKS5vbkhhbmRsZUNsaWNrQ3ViZShTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5jdWJlQ2xpY2tBcnJbaV0pO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bkJhY2tcIikuZ2V0Q2hpbGRCeU5hbWUoJ2Rpc2FibGUnKS5hY3RpdmUgPSBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5jdWJlQ2xpY2tBcnIubGVuZ3RoIDw9IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbnB1dFR5cGU6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBvbkNsaWNrX3hDb3VudCgpIHtcbiAgICAgICAgdGhpcy5hZGRNaW51cy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmFkZE1pbnVzLnggPSAtMTQwO1xuICAgICAgICB0aGlzLmlucHV0VHlwZSA9IDA7XG4gICAgICAgIHRoaXMuaGFuZGxlQnRuU3RhdGUoU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEueENvdW50KTtcbiAgICAgICAgdGhpcy5pbWdfaHVhbmdiaWFuWzBdLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuaW1nX2h1YW5nYmlhblsxXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbWdfaHVhbmdiaWFuWzJdLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25DbGlja195Q291bnQoKSB7XG4gICAgICAgIHRoaXMuYWRkTWludXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hZGRNaW51cy54ID0gMDtcbiAgICAgICAgdGhpcy5pbnB1dFR5cGUgPSAxO1xuICAgICAgICB0aGlzLmhhbmRsZUJ0blN0YXRlKFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnpDb3VudCk7XG4gICAgICAgIHRoaXMuaW1nX2h1YW5nYmlhblswXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbWdfaHVhbmdiaWFuWzFdLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuaW1nX2h1YW5nYmlhblsyXS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2xpY2tfekNvdW50KCkge1xuICAgICAgICB0aGlzLmFkZE1pbnVzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuYWRkTWludXMueCA9IDE0MDtcbiAgICAgICAgdGhpcy5pbnB1dFR5cGUgPSAyO1xuICAgICAgICB0aGlzLmhhbmRsZUJ0blN0YXRlKFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnlDb3VudCk7XG4gICAgICAgIHRoaXMuaW1nX2h1YW5nYmlhblswXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbWdfaHVhbmdiaWFuWzFdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmltZ19odWFuZ2JpYW5bMl0uYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2xpY2tBZGQoKSB7XG4gICAgICAgIGlmICh0aGlzLmlucHV0VHlwZSA9PSAwICYmIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnhDb3VudCA8IDYpIHtcbiAgICAgICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnhDb3VudCsrO1xuICAgICAgICAgICAgdGhpcy5sYmxfeENvdW50LnN0cmluZyA9IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnhDb3VudC50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVCdG5TdGF0ZShTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS54Q291bnQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaW5wdXRUeXBlID09IDEgJiYgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuekNvdW50IDwgNikge1xuICAgICAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuekNvdW50Kys7XG4gICAgICAgICAgICB0aGlzLmxibF95Q291bnQuc3RyaW5nID0gU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuekNvdW50LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUJ0blN0YXRlKFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnpDb3VudCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pbnB1dFR5cGUgPT0gMiAmJiBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS55Q291bnQgPCA2KXtcbiAgICAgICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnlDb3VudCsrO1xuICAgICAgICAgICAgdGhpcy5sYmxfekNvdW50LnN0cmluZyA9IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnlDb3VudC50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVCdG5TdGF0ZShTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS55Q291bnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGhyZWVETm9kZS5yZXNldCgpO1xuICAgICAgICB0aGlzLnFpZXBpYW5Ob2RlLmFjdGl2ZSA9IGZhbHNlOyAgICAgICAgXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNsaWNrTWludXMoKSB7XG4gICAgICAgIGlmICh0aGlzLmlucHV0VHlwZSA9PSAwICYmIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnhDb3VudCA+IDEpIHtcbiAgICAgICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnhDb3VudC0tO1xuICAgICAgICAgICAgdGhpcy5sYmxfeENvdW50LnN0cmluZyA9IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnhDb3VudC50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVCdG5TdGF0ZShTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS54Q291bnQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaW5wdXRUeXBlID09IDEgJiYgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuekNvdW50ID4gMSkge1xuICAgICAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuekNvdW50LS07XG4gICAgICAgICAgICB0aGlzLmxibF95Q291bnQuc3RyaW5nID0gU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuekNvdW50LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUJ0blN0YXRlKFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnpDb3VudCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pbnB1dFR5cGUgPT0gMiAmJiBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS55Q291bnQgPiAxKSB7XG4gICAgICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS55Q291bnQtLTtcbiAgICAgICAgICAgIHRoaXMubGJsX3pDb3VudC5zdHJpbmcgPSBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS55Q291bnQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQnRuU3RhdGUoU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEueUNvdW50KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRocmVlRE5vZGUucmVzZXQoKTtcbiAgICAgICAgdGhpcy5xaWVwaWFuTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUJ0blN0YXRlKGNvdW50Om51bWJlcil7XG4gICAgICAgIGlmIChjb3VudCA8PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmFkZE1pbnVzLmdldENoaWxkQnlOYW1lKFwiYnRuTWludXNTaXplXCIpLmdldENoaWxkQnlOYW1lKFwiTGFiZWxcIikuY29sb3IgPSBuZXcgY2MuQ29sb3IoKS5mcm9tSEVYKFwiIzc0QkJGMlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWRkTWludXMuZ2V0Q2hpbGRCeU5hbWUoXCJidG5NaW51c1NpemVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFwiKS5jb2xvciA9IG5ldyBjYy5Db2xvcigpLmZyb21IRVgoXCIjMjA5NEVFXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvdW50ID49IDYpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkTWludXMuZ2V0Q2hpbGRCeU5hbWUoXCJidG5BZGRTaXplXCIpLmdldENoaWxkQnlOYW1lKFwiTGFiZWxcIikuY29sb3IgPSBuZXcgY2MuQ29sb3IoKS5mcm9tSEVYKFwiIzc0QkJGMlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWRkTWludXMuZ2V0Q2hpbGRCeU5hbWUoXCJidG5BZGRTaXplXCIpLmdldENoaWxkQnlOYW1lKFwiTGFiZWxcIikuY29sb3IgPSBuZXcgY2MuQ29sb3IoKS5mcm9tSEVYKFwiIzIwOTRFRVwiKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==