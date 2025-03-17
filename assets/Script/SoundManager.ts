import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SoundManager')
export class SoundManager extends Component {
    public static instance: SoundManager
    @property(AudioSource)
    audio: AudioSource

    @property(AudioClip)
    clips: AudioClip[] = [];

    @property(AudioClip)
    sai: AudioClip[] = [];


    @property(AudioClip)
    thoai: AudioClip[] = [];

    @property(AudioClip)
    sao: AudioClip[] = [];

    @property(AudioClip)
    clipSai: AudioClip

    @property(AudioClip)
    sound: AudioClip

    @property(AudioClip)
    clipDung: AudioClip
    protected onLoad(): void {
        SoundManager.instance = this;
    }

    indexKen = 0
    playKhen() {
        if (this.indexKen < 3) {
            this.audio.stop()
            let randomNumber = Math.floor(Math.random() * 3) + 1;
            this.audio.playOneShot(this.clips[randomNumber - 1], 0.3)

            this.indexKen++
        }

        this.audio.playOneShot(this.clipDung)

    }

    indexSai = 0
    playSai() {
        this.audio.playOneShot(this.clipSai)
        if (this.indexSai > 3) return;
        let randomNumber = Math.floor(Math.random() * 2) + 1;
        this.audio.playOneShot(this.sai[randomNumber - 1], 0.3)

        this.indexSai++
    }
    isThoai = false
    playThoai(index) {
        if (this.isThoai == true) return
        this.audio.playOneShot(this.thoai[index], 1)
        this.isThoai = true;
        this.scheduleOnce(() => {
            this.isThoai = false;
        }, 2)

    }

    playSao(index) {
        this.audio.playOneShot(this.sao[index], 0.5)
    }
}


