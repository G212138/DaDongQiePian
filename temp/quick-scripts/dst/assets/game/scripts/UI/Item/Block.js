
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/game/scripts/UI/Item/Block.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '17969r1hoJE84o4r29gr9KX', 'Block');
// game/scripts/UI/Item/Block.ts

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
var SyncDataManager_1 = require("../../../../frame/scripts/Manager/SyncDataManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Block = /** @class */ (function (_super) {
    __extends(Block, _super);
    function Block() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._xIndex = 0;
        _this._yIndex = 0;
        _this._zIndex = 0;
        _this.isClicked = false;
        return _this;
    }
    Block.prototype.init = function (xIndex, yIndex, zIndex) {
        this.node.getChildByName("icon").active = false;
        this._xIndex = xIndex;
        this._yIndex = zIndex;
        this._zIndex = yIndex;
    };
    Block.prototype.onHandleClickCube = function (data) {
        // if (data.xIndex == null && data.yIndex == this._yIndex && data.zIndex == this._zIndex) {
        //     this.node.getChildByName("icon").active = true;
        // } else if (data.yIndex == null && data.xIndex == this._xIndex && data.zIndex == this._zIndex) {
        //     this.node.getChildByName("icon").active = true;
        // } else if (data.zIndex == null && data.xIndex == this._xIndex && data.yIndex == this._yIndex) {
        //     this.node.getChildByName("icon").active = true;
        // }
    };
    Block.prototype.reset = function () {
        // this.node.getChildByName("icon").active = false;
    };
    Block.prototype.onClickBlock = function () {
        this.isClicked = !this.isClicked;
        this.node.getChildByName("icon").active = this.isClicked;
        if (this.isClicked) {
            SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.qiepianClickArr.push(this.node.name);
        }
        else {
            var index = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.qiepianClickArr.indexOf(this.node.name);
            SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.qiepianClickArr.splice(index, 1);
        }
    };
    Block = __decorate([
        ccclass
    ], Block);
    return Block;
}(cc.Component));
exports.default = Block;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZVxcc2NyaXB0c1xcVUlcXEl0ZW1cXEJsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFGQUFvRjtBQUU5RSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFtQyx5QkFBWTtJQUEvQztRQUFBLHFFQXdDQztRQXRDVyxhQUFPLEdBQVcsQ0FBQyxDQUFDO1FBQ3BCLGFBQU8sR0FBVyxDQUFDLENBQUM7UUFDcEIsYUFBTyxHQUFXLENBQUMsQ0FBQztRQUVwQixlQUFTLEdBQVksS0FBSyxDQUFDOztJQWtDdkMsQ0FBQztJQWhDVSxvQkFBSSxHQUFYLFVBQVksTUFBYyxFQUFFLE1BQWMsRUFBRSxNQUFjO1FBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDMUIsQ0FBQztJQUVNLGlDQUFpQixHQUF4QixVQUF5QixJQUFzRDtRQUMzRSwyRkFBMkY7UUFDM0Ysc0RBQXNEO1FBQ3RELGtHQUFrRztRQUNsRyxzREFBc0Q7UUFDdEQsa0dBQWtHO1FBQ2xHLHNEQUFzRDtRQUN0RCxJQUFJO0lBQ1IsQ0FBQztJQUVNLHFCQUFLLEdBQVo7UUFDSSxtREFBbUQ7SUFDdkQsQ0FBQztJQUVPLDRCQUFZLEdBQXBCO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDekQsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLGlDQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNyRjthQUFNO1lBQ0gsSUFBSSxLQUFLLEdBQUcsaUNBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pHLGlDQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2pGO0lBQ0wsQ0FBQztJQXRDZ0IsS0FBSztRQUR6QixPQUFPO09BQ2EsS0FBSyxDQXdDekI7SUFBRCxZQUFDO0NBeENELEFBd0NDLENBeENrQyxFQUFFLENBQUMsU0FBUyxHQXdDOUM7a0JBeENvQixLQUFLIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3luY0RhdGFNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1lL3NjcmlwdHMvTWFuYWdlci9TeW5jRGF0YU1hbmFnZXJcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCbG9jayBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBwcml2YXRlIF94SW5kZXg6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfeUluZGV4OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX3pJbmRleDogbnVtYmVyID0gMDtcblxuICAgIHByaXZhdGUgaXNDbGlja2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwdWJsaWMgaW5pdCh4SW5kZXg6IG51bWJlciwgeUluZGV4OiBudW1iZXIsIHpJbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImljb25cIikuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3hJbmRleCA9IHhJbmRleDtcbiAgICAgICAgdGhpcy5feUluZGV4ID0gekluZGV4O1xuICAgICAgICB0aGlzLl96SW5kZXggPSB5SW5kZXg7XG4gICAgfVxuXG4gICAgcHVibGljIG9uSGFuZGxlQ2xpY2tDdWJlKGRhdGE6IHt4SW5kZXg6IG51bWJlciwgeUluZGV4OiBudW1iZXIsIHpJbmRleDogbnVtYmVyfSkge1xuICAgICAgICAvLyBpZiAoZGF0YS54SW5kZXggPT0gbnVsbCAmJiBkYXRhLnlJbmRleCA9PSB0aGlzLl95SW5kZXggJiYgZGF0YS56SW5kZXggPT0gdGhpcy5fekluZGV4KSB7XG4gICAgICAgIC8vICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpY29uXCIpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIC8vIH0gZWxzZSBpZiAoZGF0YS55SW5kZXggPT0gbnVsbCAmJiBkYXRhLnhJbmRleCA9PSB0aGlzLl94SW5kZXggJiYgZGF0YS56SW5kZXggPT0gdGhpcy5fekluZGV4KSB7XG4gICAgICAgIC8vICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpY29uXCIpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIC8vIH0gZWxzZSBpZiAoZGF0YS56SW5kZXggPT0gbnVsbCAmJiBkYXRhLnhJbmRleCA9PSB0aGlzLl94SW5kZXggJiYgZGF0YS55SW5kZXggPT0gdGhpcy5feUluZGV4KSB7XG4gICAgICAgIC8vICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpY29uXCIpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcmVzZXQoKSB7XG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImljb25cIikuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNsaWNrQmxvY2soKSB7XG4gICAgICAgIHRoaXMuaXNDbGlja2VkID0gIXRoaXMuaXNDbGlja2VkO1xuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpY29uXCIpLmFjdGl2ZSA9IHRoaXMuaXNDbGlja2VkO1xuICAgICAgICBpZiAodGhpcy5pc0NsaWNrZWQpIHtcbiAgICAgICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnFpZXBpYW5DbGlja0Fyci5wdXNoKHRoaXMubm9kZS5uYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnFpZXBpYW5DbGlja0Fyci5pbmRleE9mKHRoaXMubm9kZS5uYW1lKTtcbiAgICAgICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnFpZXBpYW5DbGlja0Fyci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=