"use strict";
cc._RF.push(module, 'f5171dGpWFGFZGEuFaQdUkt', 'AudioPlayExtension');
// frame/scripts/Utils/AudioPlayExtension.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioPlayExtension = void 0;
var SoundManager_1 = require("./../Manager/SoundManager");
/**期望发音与'resources/audio'文件夹下资源名称的对应配置 */
var AudioConfig = {
    例: 'sfx_buttn',
    子: 'sfx_error',
};
/**音频播放扩展方法 */
var AudioPlayExtension = /** @class */ (function () {
    function AudioPlayExtension() {
    }
    /**
     * 播放多个音频资源组成的一段内容
     * @param content AudioConfig中的key组成的内容, eg: '例子例子'
     * @param finish 完成回调
     */
    AudioPlayExtension.playJoinAudio = function (content, finish) {
        if (content.length == 0) {
            console.warn('playJoinAudio : 内容为空!');
            finish();
            return;
        }
        var idx = 0;
        function next() {
            if (idx > content.length - 1) {
                console.log("'" + content + "' \u64AD\u653E\u5B8C\u6210.");
                finish();
                return;
            }
            SoundManager_1.SoundManager.playEffect(AudioConfig[content[idx]], false, false, false, next);
            idx++;
        }
        next();
    };
    return AudioPlayExtension;
}());
exports.AudioPlayExtension = AudioPlayExtension;

cc._RF.pop();