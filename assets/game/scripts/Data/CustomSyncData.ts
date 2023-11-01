

/**
 * 需要同步的自定义数据
 * 游戏业务层同步数据在这里添加
 */
export class CustomSyncData {
    public curLevel: number = 0; // 当前关卡(第一关为0)
    // TODO 自定义
    
    public xCount: number = 6; // x轴方块数量
    public yCount: number = 6; // y轴方块数量
    public zCount: number = 6; // z轴方块数量
    public cubeOpened: boolean = false; // 方块是否打开
    public cubeClickArr: {xIndex: number, yIndex: number, zIndex: number}[] = []; // 点击的方块数组
    public enableClick: boolean = false; // 是否允许点击
    public qiepianClickArr: string[] = []; // 切片点击的方块数组
    public enableReset: boolean = false; // 是否允许重置
    
}
