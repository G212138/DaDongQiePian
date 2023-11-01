
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/game/scripts/Components/DragSync.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0ccc7AgbEVFBIAWgd69Ebr0', 'DragSync');
// game/scripts/Components/DragSync.ts

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
var T2M_1 = require("../../../frame/scripts/SDK/T2M");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DragSync = /** @class */ (function (_super) {
    __extends(DragSync, _super);
    function DragSync() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rootNode = null;
        _this.touchStartEvents = [];
        _this.touchMovingEvents = [];
        _this.touchEndEvents = [];
        _this.isEnable = true;
        _this.isTouching = false;
        _this.isTouch = false;
        //根据触摸时间判断是否为点击事件
        _this.isClickEvent = false;
        _this.touchStartData = null;
        //触摸开始位置
        _this.touchStartPos = null;
        return _this;
    }
    DragSync_1 = DragSync;
    DragSync.prototype.onLoad = function () {
        this.rootNode = cc.find('Canvas/GamePanel');
        var index = this.node.getSiblingIndex();
        this.node.attr({
            id: index,
            initParent: this.node.parent,
            initPos: { x: this.node.x, y: this.node.y },
            initSiblingIndex: index,
        });
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
        this.tagId = this.node.name + this.node.parent.name + this.node.getSiblingIndex();
        this.addEventByT2M();
    };
    DragSync.prototype.setEnable = function (isEnable) {
        this.isEnable = isEnable;
    };
    DragSync.prototype.addTouchEvent = function (target, component, handlers) {
        this.touchStartEvents.push(new DragSync_1.EventHandler());
        this.touchStartEvents[0].target = target;
        this.touchStartEvents[0].component = component;
        this.touchStartEvents[0].handler = handlers[0];
        this.touchMovingEvents.push(new DragSync_1.EventHandler());
        this.touchMovingEvents[0].target = target;
        this.touchMovingEvents[0].component = component;
        this.touchMovingEvents[0].handler = handlers[1];
        this.touchEndEvents.push(new DragSync_1.EventHandler());
        this.touchEndEvents[0].target = target;
        this.touchEndEvents[0].component = component;
        this.touchEndEvents[0].handler = handlers[2];
    };
    DragSync.prototype.touchStart = function (event) {
        if (!this.isEnable)
            return;
        this.isTouching = true;
        this.isTouch = true;
        var pos = this.rootNode.convertToNodeSpaceAR(event.getLocation());
        var prevLocation = this.rootNode.convertToNodeSpaceAR(event.getPreviousLocation());
        var type = 'touchStart' + this.tagId;
        var data = { pos: { x: pos.x, y: pos.y }, prevLocation: { x: prevLocation.x, y: prevLocation.y } };
        T2M_1.T2M.dispatch(type, data);
    };
    DragSync.prototype.touchMove = function (event) {
        if (!this.isEnable || !this.isTouching)
            return;
        var pos = this.rootNode.convertToNodeSpaceAR(event.getLocation());
        var prevLocation = this.rootNode.convertToNodeSpaceAR(event.getPreviousLocation());
        var type = 'touchMove' + this.tagId;
        var data = { pos: { x: pos.x, y: pos.y }, prevLocation: { x: prevLocation.x, y: prevLocation.y } };
        T2M_1.T2M.dispatch(type, data, true);
    };
    DragSync.prototype.touchEnd = function (event) {
        this.isTouching = false;
        if (!this.isEnable || !this.isTouch)
            return;
        this.isTouch = false;
        var pos = this.rootNode.convertToNodeSpaceAR(event.getLocation());
        var prevLocation = this.rootNode.convertToNodeSpaceAR(event.getPreviousLocation());
        var type = 'touchEnd' + this.tagId;
        var data = { pos: { x: pos.x, y: pos.y }, prevLocation: { x: prevLocation.x, y: prevLocation.y } };
        T2M_1.T2M.dispatch(type, data);
    };
    DragSync.prototype.addEventByT2M = function () {
        T2M_1.T2M.addSyncEventListener('touchStart' + this.tagId, this.touchStartHandler.bind(this));
        T2M_1.T2M.addSyncEventListener('touchMove' + this.tagId, this.touchMoveHandler.bind(this));
        T2M_1.T2M.addSyncEventListener('touchEnd' + this.tagId, this.touchEndHandler.bind(this));
    };
    DragSync.prototype.touchStartHandler = function (data) {
        if (!this.isEnable)
            return;
        this.touchStartPos = cc.v2(data.pos.x, data.pos.y);
        this.isClickEvent = true;
        this.touchStartData = data;
    };
    DragSync.prototype.handleTouchStart = function (data) {
        this.node.parent = this.rootNode;
        this.node.position = cc.v3(this.touchStartData.pos.x, this.touchStartData.pos.y);
        for (var _i = 0, _a = this.touchStartEvents; _i < _a.length; _i++) {
            var eventHandler = _a[_i];
            eventHandler.emit([{ pos: this.touchStartData.pos, target: this.node, prevLocation: this.touchStartData.prevLocation }]);
        }
    };
    DragSync.prototype.touchMoveHandler = function (data) {
        //判断当前位置与触摸开始位置的距离，如果超过一定距离，则不再判断为点击事件
        if (this.isClickEvent && this.touchStartPos) {
            var distance = this.touchStartPos.sub(cc.v2(data.pos.x, data.pos.y)).mag();
            if (distance > 10) {
                this.isClickEvent = false;
                this.handleTouchStart(this.touchStartData);
                this.touchStartData = null;
            }
        }
        else {
            this.node.position = cc.v3(data.pos.x, data.pos.y);
            for (var _i = 0, _a = this.touchMovingEvents; _i < _a.length; _i++) {
                var eventHandler = _a[_i];
                eventHandler.emit([{ pos: data.pos, target: this.node, prevLocation: data.prevLocation }]);
            }
        }
    };
    DragSync.prototype.touchEndHandler = function (data) {
        if (this.isClickEvent && this.touchStartPos) {
            var distance = this.touchStartPos.sub(cc.v2(data.pos.x, data.pos.y)).mag();
            if (distance <= 10) {
                this.isClickEvent = true;
            }
        }
        else {
            this.node.position = cc.v3(data.pos.x, data.pos.y);
        }
        for (var _i = 0, _a = this.touchEndEvents; _i < _a.length; _i++) {
            var eventHandler = _a[_i];
            eventHandler.emit([{ pos: data.pos, target: this.node, isClick: this.isClickEvent, prevLocation: data.prevLocation }]);
        }
    };
    var DragSync_1;
    __decorate([
        property(cc.Node)
    ], DragSync.prototype, "rootNode", void 0);
    __decorate([
        property({ type: [cc.Component.EventHandler] })
    ], DragSync.prototype, "touchStartEvents", void 0);
    __decorate([
        property({ type: [cc.Component.EventHandler] })
    ], DragSync.prototype, "touchMovingEvents", void 0);
    __decorate([
        property({ type: [cc.Component.EventHandler] })
    ], DragSync.prototype, "touchEndEvents", void 0);
    DragSync = DragSync_1 = __decorate([
        ccclass
    ], DragSync);
    return DragSync;
}(cc.Component));
exports.default = DragSync;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZVxcc2NyaXB0c1xcQ29tcG9uZW50c1xcRHJhZ1N5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQXFEO0FBRS9DLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBK0lDO1FBN0lXLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsc0JBQWdCLEdBQWdDLEVBQUUsQ0FBQztRQUVuRCx1QkFBaUIsR0FBZ0MsRUFBRSxDQUFDO1FBRXBELG9CQUFjLEdBQWdDLEVBQUUsQ0FBQztRQUdqRCxjQUFRLEdBQVksSUFBSSxDQUFDO1FBQ3pCLGdCQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGFBQU8sR0FBWSxLQUFLLENBQUM7UUE2RWpDLGlCQUFpQjtRQUNULGtCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLG9CQUFjLEdBQVEsSUFBSSxDQUFDO1FBRW5DLFFBQVE7UUFDQSxtQkFBYSxHQUFZLElBQUksQ0FBQzs7SUFnRDFDLENBQUM7aUJBL0lvQixRQUFRO0lBZXpCLHlCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM1QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ1gsRUFBRSxFQUFFLEtBQUs7WUFDVCxVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQzVCLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVB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RUFBRSxDQUFDO3VEQUNZO0lBRTVEO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDO29EQUNTO0lBUnhDLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0ErSTVCO0lBQUQsZUFBQztDQS9JRCxBQStJQyxDQS9JcUMsRUFBRSxDQUFDLFNBQVMsR0ErSWpEO2tCQS9Jb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFQyTSB9IGZyb20gJy4uLy4uLy4uL2ZyYW1lL3NjcmlwdHMvU0RLL1QyTSc7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmFnU3luYyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSByb290Tm9kZTogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KHsgdHlwZTogW2NjLkNvbXBvbmVudC5FdmVudEhhbmRsZXJdIH0pXG4gICAgcHJpdmF0ZSB0b3VjaFN0YXJ0RXZlbnRzOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyW10gPSBbXTtcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcl0gfSlcbiAgICBwcml2YXRlIHRvdWNoTW92aW5nRXZlbnRzOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyW10gPSBbXTtcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcl0gfSlcbiAgICBwcml2YXRlIHRvdWNoRW5kRXZlbnRzOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyW10gPSBbXTtcblxuICAgIHByaXZhdGUgdGFnSWQ6IHN0cmluZztcbiAgICBwcml2YXRlIGlzRW5hYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwcml2YXRlIGlzVG91Y2hpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIGlzVG91Y2g6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5yb290Tm9kZSA9IGNjLmZpbmQoJ0NhbnZhcy9HYW1lUGFuZWwnKTtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5ub2RlLmdldFNpYmxpbmdJbmRleCgpO1xuICAgICAgICB0aGlzLm5vZGUuYXR0cih7XG4gICAgICAgICAgICBpZDogaW5kZXgsXG4gICAgICAgICAgICBpbml0UGFyZW50OiB0aGlzLm5vZGUucGFyZW50LFxuICAgICAgICAgICAgaW5pdFBvczogeyB4OiB0aGlzLm5vZGUueCwgeTogdGhpcy5ub2RlLnkgfSxcbiAgICAgICAgICAgIGluaXRTaWJsaW5nSW5kZXg6IGluZGV4LFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLnRvdWNoU3RhcnQsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy50b3VjaE1vdmUsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLnRvdWNoRW5kLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy50b3VjaEVuZCwgdGhpcyk7XG4gICAgICAgIHRoaXMudGFnSWQgPSB0aGlzLm5vZGUubmFtZSArIHRoaXMubm9kZS5wYXJlbnQubmFtZSArIHRoaXMubm9kZS5nZXRTaWJsaW5nSW5kZXgoKTtcbiAgICAgICAgdGhpcy5hZGRFdmVudEJ5VDJNKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEVuYWJsZShpc0VuYWJsZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmlzRW5hYmxlID0gaXNFbmFibGU7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZFRvdWNoRXZlbnQodGFyZ2V0OiBjYy5Ob2RlLCBjb21wb25lbnQ6IHN0cmluZywgaGFuZGxlcnM6IHN0cmluZ1tdKSB7XG4gICAgICAgIHRoaXMudG91Y2hTdGFydEV2ZW50cy5wdXNoKG5ldyBEcmFnU3luYy5FdmVudEhhbmRsZXIoKSk7XG4gICAgICAgIHRoaXMudG91Y2hTdGFydEV2ZW50c1swXS50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgIHRoaXMudG91Y2hTdGFydEV2ZW50c1swXS5jb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgICAgIHRoaXMudG91Y2hTdGFydEV2ZW50c1swXS5oYW5kbGVyID0gaGFuZGxlcnNbMF07XG5cbiAgICAgICAgdGhpcy50b3VjaE1vdmluZ0V2ZW50cy5wdXNoKG5ldyBEcmFnU3luYy5FdmVudEhhbmRsZXIoKSk7XG4gICAgICAgIHRoaXMudG91Y2hNb3ZpbmdFdmVudHNbMF0udGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICB0aGlzLnRvdWNoTW92aW5nRXZlbnRzWzBdLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgICAgICAgdGhpcy50b3VjaE1vdmluZ0V2ZW50c1swXS5oYW5kbGVyID0gaGFuZGxlcnNbMV07XG5cbiAgICAgICAgdGhpcy50b3VjaEVuZEV2ZW50cy5wdXNoKG5ldyBEcmFnU3luYy5FdmVudEhhbmRsZXIoKSk7XG4gICAgICAgIHRoaXMudG91Y2hFbmRFdmVudHNbMF0udGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICB0aGlzLnRvdWNoRW5kRXZlbnRzWzBdLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgICAgICAgdGhpcy50b3VjaEVuZEV2ZW50c1swXS5oYW5kbGVyID0gaGFuZGxlcnNbMl07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0b3VjaFN0YXJ0KGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0VuYWJsZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmlzVG91Y2hpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzVG91Y2ggPSB0cnVlO1xuICAgICAgICBsZXQgcG9zID0gdGhpcy5yb290Tm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihldmVudC5nZXRMb2NhdGlvbigpKTtcbiAgICAgICAgbGV0IHByZXZMb2NhdGlvbiA9IHRoaXMucm9vdE5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZXZlbnQuZ2V0UHJldmlvdXNMb2NhdGlvbigpKTtcbiAgICAgICAgbGV0IHR5cGUgPSAndG91Y2hTdGFydCcgKyB0aGlzLnRhZ0lkO1xuICAgICAgICBsZXQgZGF0YSA9IHsgcG9zOiB7IHg6IHBvcy54LCB5OiBwb3MueSB9LCBwcmV2TG9jYXRpb246IHsgeDogcHJldkxvY2F0aW9uLngsIHk6IHByZXZMb2NhdGlvbi55IH0gfTtcbiAgICAgICAgVDJNLmRpc3BhdGNoKHR5cGUsIGRhdGEpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdG91Y2hNb3ZlKGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0VuYWJsZSB8fCAhdGhpcy5pc1RvdWNoaW5nKSByZXR1cm47XG4gICAgICAgIGxldCBwb3MgPSB0aGlzLnJvb3ROb2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGV2ZW50LmdldExvY2F0aW9uKCkpO1xuICAgICAgICBsZXQgcHJldkxvY2F0aW9uID0gdGhpcy5yb290Tm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihldmVudC5nZXRQcmV2aW91c0xvY2F0aW9uKCkpO1xuICAgICAgICBsZXQgdHlwZSA9ICd0b3VjaE1vdmUnICsgdGhpcy50YWdJZDtcbiAgICAgICAgbGV0IGRhdGEgPSB7IHBvczogeyB4OiBwb3MueCwgeTogcG9zLnkgfSwgcHJldkxvY2F0aW9uOiB7IHg6IHByZXZMb2NhdGlvbi54LCB5OiBwcmV2TG9jYXRpb24ueSB9IH07XG4gICAgICAgIFQyTS5kaXNwYXRjaCh0eXBlLCBkYXRhLCB0cnVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHRvdWNoRW5kKGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XG4gICAgICAgIHRoaXMuaXNUb3VjaGluZyA9IGZhbHNlO1xuICAgICAgICBpZiAoIXRoaXMuaXNFbmFibGUgfHwgIXRoaXMuaXNUb3VjaCkgcmV0dXJuO1xuICAgICAgICB0aGlzLmlzVG91Y2ggPSBmYWxzZTtcbiAgICAgICAgbGV0IHBvcyA9IHRoaXMucm9vdE5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZXZlbnQuZ2V0TG9jYXRpb24oKSk7XG4gICAgICAgIGxldCBwcmV2TG9jYXRpb24gPSB0aGlzLnJvb3ROb2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGV2ZW50LmdldFByZXZpb3VzTG9jYXRpb24oKSk7XG4gICAgICAgIGxldCB0eXBlID0gJ3RvdWNoRW5kJyArIHRoaXMudGFnSWQ7XG4gICAgICAgIGxldCBkYXRhID0geyBwb3M6IHsgeDogcG9zLngsIHk6IHBvcy55IH0sIHByZXZMb2NhdGlvbjogeyB4OiBwcmV2TG9jYXRpb24ueCwgeTogcHJldkxvY2F0aW9uLnkgfSB9O1xuICAgICAgICBUMk0uZGlzcGF0Y2godHlwZSwgZGF0YSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRFdmVudEJ5VDJNKCkge1xuICAgICAgICBUMk0uYWRkU3luY0V2ZW50TGlzdGVuZXIoJ3RvdWNoU3RhcnQnICsgdGhpcy50YWdJZCwgdGhpcy50b3VjaFN0YXJ0SGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICAgICAgVDJNLmFkZFN5bmNFdmVudExpc3RlbmVyKCd0b3VjaE1vdmUnICsgdGhpcy50YWdJZCwgdGhpcy50b3VjaE1vdmVIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgICAgICBUMk0uYWRkU3luY0V2ZW50TGlzdGVuZXIoJ3RvdWNoRW5kJyArIHRoaXMudGFnSWQsIHRoaXMudG91Y2hFbmRIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIC8v5qC55o2u6Kem5pG45pe26Ze05Yik5pat5piv5ZCm5Li654K55Ye75LqL5Lu2XG4gICAgcHJpdmF0ZSBpc0NsaWNrRXZlbnQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHRvdWNoU3RhcnREYXRhOiBhbnkgPSBudWxsO1xuXG4gICAgLy/op6bmkbjlvIDlp4vkvY3nva5cbiAgICBwcml2YXRlIHRvdWNoU3RhcnRQb3M6IGNjLlZlYzIgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSB0b3VjaFN0YXJ0SGFuZGxlcihkYXRhKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0VuYWJsZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLnRvdWNoU3RhcnRQb3MgPSBjYy52MihkYXRhLnBvcy54LCBkYXRhLnBvcy55KTtcbiAgICAgICAgdGhpcy5pc0NsaWNrRXZlbnQgPSB0cnVlO1xuICAgICAgICB0aGlzLnRvdWNoU3RhcnREYXRhID0gZGF0YTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZVRvdWNoU3RhcnQoZGF0YSkge1xuICAgICAgICB0aGlzLm5vZGUucGFyZW50ID0gdGhpcy5yb290Tm9kZTtcbiAgICAgICAgdGhpcy5ub2RlLnBvc2l0aW9uID0gY2MudjModGhpcy50b3VjaFN0YXJ0RGF0YS5wb3MueCwgdGhpcy50b3VjaFN0YXJ0RGF0YS5wb3MueSk7XG4gICAgICAgIGZvciAobGV0IGV2ZW50SGFuZGxlciBvZiB0aGlzLnRvdWNoU3RhcnRFdmVudHMpIHtcbiAgICAgICAgICAgIGV2ZW50SGFuZGxlci5lbWl0KFt7IHBvczogdGhpcy50b3VjaFN0YXJ0RGF0YS5wb3MsIHRhcmdldDogdGhpcy5ub2RlICwgcHJldkxvY2F0aW9uOiB0aGlzLnRvdWNoU3RhcnREYXRhLnByZXZMb2NhdGlvbn1dKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdG91Y2hNb3ZlSGFuZGxlcihkYXRhKSB7XG4gICAgICAgIC8v5Yik5pat5b2T5YmN5L2N572u5LiO6Kem5pG45byA5aeL5L2N572u55qE6Led56a777yM5aaC5p6c6LaF6L+H5LiA5a6a6Led56a777yM5YiZ5LiN5YaN5Yik5pat5Li654K55Ye75LqL5Lu2XG4gICAgICAgIGlmICh0aGlzLmlzQ2xpY2tFdmVudCAmJiB0aGlzLnRvdWNoU3RhcnRQb3MpIHtcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IHRoaXMudG91Y2hTdGFydFBvcy5zdWIoY2MudjIoZGF0YS5wb3MueCwgZGF0YS5wb3MueSkpLm1hZygpO1xuICAgICAgICAgICAgaWYgKGRpc3RhbmNlID4gMTApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQ2xpY2tFdmVudCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlVG91Y2hTdGFydCh0aGlzLnRvdWNoU3RhcnREYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdWNoU3RhcnREYXRhID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5wb3NpdGlvbiA9IGNjLnYzKGRhdGEucG9zLngsIGRhdGEucG9zLnkpO1xuICAgICAgICAgICAgZm9yIChsZXQgZXZlbnRIYW5kbGVyIG9mIHRoaXMudG91Y2hNb3ZpbmdFdmVudHMpIHtcbiAgICAgICAgICAgICAgICBldmVudEhhbmRsZXIuZW1pdChbeyBwb3M6IGRhdGEucG9zLCB0YXJnZXQ6IHRoaXMubm9kZSwgcHJldkxvY2F0aW9uOiBkYXRhLnByZXZMb2NhdGlvbiB9XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHRvdWNoRW5kSGFuZGxlcihkYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQ2xpY2tFdmVudCAmJiB0aGlzLnRvdWNoU3RhcnRQb3MpIHtcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IHRoaXMudG91Y2hTdGFydFBvcy5zdWIoY2MudjIoZGF0YS5wb3MueCwgZGF0YS5wb3MueSkpLm1hZygpO1xuICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDw9IDEwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0NsaWNrRXZlbnQgPSB0cnVlOyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5wb3NpdGlvbiA9IGNjLnYzKGRhdGEucG9zLngsIGRhdGEucG9zLnkpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGV2ZW50SGFuZGxlciBvZiB0aGlzLnRvdWNoRW5kRXZlbnRzKSB7XG4gICAgICAgICAgICBldmVudEhhbmRsZXIuZW1pdChbeyBwb3M6IGRhdGEucG9zLCB0YXJnZXQ6IHRoaXMubm9kZSwgaXNDbGljazogdGhpcy5pc0NsaWNrRXZlbnQgLCBwcmV2TG9jYXRpb246IGRhdGEucHJldkxvY2F0aW9ufV0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19