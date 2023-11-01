import { ListenerManager } from "../../../../frame/scripts/Manager/ListenerManager";
import { SyncDataManager } from "../../../../frame/scripts/Manager/SyncDataManager";
import { EventType } from "../../Data/EventType";
import Cube from "../Item/Cube";
import GameUI from "../Item/GameUI";
import ThreeNode from "../Item/ThreeDNode";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameLayer extends cc.Component {
    @property(ThreeNode)
    private threeDNode: ThreeNode = null;
    @property(GameUI)
    private gameUI: GameUI = null;

    @property(cc.Node)
    private threeDCamera: cc.Node = null;
    @property(cc.Node)
    private cubeRootNode: cc.Node = null;
    @property(cc.Node)
    private addMinus: cc.Node = null;
    @property(cc.Node)
    private img_huangbian: cc.Node[] = [];

    private touchEventId: number;

    onLoad() {
        ListenerManager.on(EventType.ENTER_GAME, this.handleEnterGame, this);

        // this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        // this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
        // this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
    }
    onDestroy() {
        ListenerManager.off(EventType.ENTER_GAME, this.handleEnterGame, this);

        // this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        // this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
        // this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
    }

    private handleEnterGame() {
        this.threeDNode.init();
        this.gameUI.init();
    }

    private onDragStart(data) {
        this.addMinus.active = false;
        this.img_huangbian[0].active = false;
        this.img_huangbian[1].active = false;
        this.img_huangbian[2].active = false;
    }

    private onDragMove(data) {
        let pos = data.target.parent.convertToWorldSpaceAR(cc.v2(data.pos.x, data.pos.y));
        let prevPos = data.target.parent.convertToWorldSpaceAR(cc.v2(data.prevLocation.x, data.prevLocation.y));
        let prevLocation = cc.v2(prevPos.x, prevPos.y);
        let curLocation = cc.v2(pos.x, pos.y);

        let vel = curLocation.sub(prevLocation);
        let disX = vel.x;
        let disY = vel.y;

        let eulerX = this.cubeRootNode.eulerAngles.x;
        let eulerY = this.cubeRootNode.eulerAngles.y;
        let eulerZ = this.cubeRootNode.eulerAngles.z;
        let quat = new cc.Quat()
        cc.Quat.fromEuler(quat, eulerX, eulerY, eulerZ)
        let changed = false
        if (Math.abs(disX) > 0.1) {
            let angle = (disX / 2436 * 180);
            cc.Quat.rotateAround(quat, quat, cc.Vec3.UP, cc.misc.degreesToRadians(angle))
            changed = true
        }
        if (Math.abs(disY) > 0.1) {
            let angle = -(disY / 2436 * 180);
            cc.Quat.rotateAround(quat, quat, this.threeDCamera.right, cc.misc.degreesToRadians(angle))
            changed = true
        }
        if (changed) {
            let outEuler = cc.v3()
            quat.toEuler(outEuler)
            this.onChangeBigCubeEuler(outEuler.x, outEuler.y, outEuler.z)
        }
    }

    private onDragEnd(data) {
        if (data.isClick) {
            this.addMinus.active = false;
            this.img_huangbian[0].active = false;
            this.img_huangbian[1].active = false;
            this.img_huangbian[2].active = false;
        }
        this.node.position = cc.Vec3.ZERO;
        if (data.isClick && SyncDataManager.getSyncData().customSyncData.enableClick) {
            let pos = data.target.parent.convertToWorldSpaceAR(cc.v2(data.pos.x, data.pos.y));
            let location = cc.v2(pos.x, pos.y);
            let ray = cc.Camera.main.getRay(location);
            let results = cc.geomUtils.intersect.raycast(this.cubeRootNode, ray, null, null);
            for (let i = 0; i < results.length; i++) {
                if (results[0].node.parent.getComponent(Cube)) {
                    results[0].node.parent.getComponent(Cube).clickCube(results[1].node.name);
                }
                return;
            }
        }
    }

    private onChangeBigCubeEuler(eulerX: number, eulerY: number, eulerZ: number) {
        let rotation = cc.quat();
        cc.Quat.fromEuler(rotation, eulerX, eulerY, eulerZ);
        this.cubeRootNode.setRotation(rotation);
    }

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
