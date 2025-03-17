import { _decorator, Animation, Camera, Canvas, Component, director, EventMouse, instantiate, Label, log, Node, randomRange, randomRangeInt, Skeleton, sp, Sprite, SpriteFrame, Tween, tween, UIOpacity, UITransform, Vec2, Vec3 } from 'cc';
import { NhanVat } from './NhanVat';
import { Thoai } from './Thoai';
import { SoundManager } from './SoundManager';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(Sprite)
    kem: Sprite = null;

    @property(SpriteFrame)
    kems: SpriteFrame[] = [];

    @property(sp.Skeleton)
    xekem: sp.Skeleton = null;

    @property(Node)
    nhanvats: Node[] = [];

    @property(Label)
    title: Label;
    @property(Label)
    time: Label;

    @property(Node)
    bantay: Node

    _camera: Camera;

    listThoai = []

    countKem = 0;


    startPosKem = null

    isMoveKem = true;


    countTime = 0;
    isHetTime = false

    scheduleTime = null

    tweenSao = null

    timestart = null

    @property(Node)
    kemTutorial: Node = null

    protected start(): void {
        this.startGame()
      
    }


    startGame() {
        SoundManager.instance.playThoai(10)
        this.title.string = "Bé hãy giúp bác Hổ phát đúng loại kem cho các bạn nhé!"
        this.timestart = new Date().getTime();
        this.kem.spriteFrame = this.kems[this.countKem]
        this.startPosKem = this.kem.node.position.clone();

        let random = Math.random()
        this.listThoai = (random > 0.5) ? Thoai.listVoid1 : Thoai.listVoid2
        this.kem.node.on(Node.EventType.TOUCH_MOVE, this.onMouseMove, this);
        this.kem.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.kem.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        this.ListererEventAnimationHo();
        this.scheduleOnce(() => {
            this.Lamkem();
        }, 1)

        const canvas = this.node.scene.getComponentInChildren(Canvas);
        if (canvas) {
            this._camera = canvas.cameraComponent;
        }
        let time = 90;
        let isPlayA = false
        this.scheduleTime = () => {
            time--
            if (time >= 10) {
                this.time.string = "00:" + time
            }

            else {
                if (isPlayA == false) {
                    isPlayA = true
                    this.time.node.getComponent(Animation).play("TimeLb")
                    this.time.node.parent.getComponent(Animation).play("time")
                }
                this.time.string = "00:0" + time
            }


            if (time == 0) {
                this.unschedule(this.scheduleTime)
                if (this.isHetTime == false) {
                    this.time.node.getComponent(Animation).stop()
                    this.time.node.parent.getComponent(Animation).stop()
                    this.isHetTime = true;
                    this.tinhdiem()
                }

            }
        }
        this.schedule(this.scheduleTime, 1)
    }

    onTouchEnd() {
        this.countTime = 0
        let isChoose = false
        this.nhanvats.forEach((element, index) => {

            let nv = element.getComponent(NhanVat)
            if (nv.isCoKem == true) return;
            if (nv.isChoose == true) {
                isChoose = true
                if (this.listThoai[this.countKem].index == index) {
                    nv.isCoKem = true
                    nv.SetAnimationLayKem()
                    this.kem.node.active = false
                    this.kem.node.position = this.startPosKem
                    this.isMoveKem = true
                    this.countKem++;
                    let kem = instantiate(this.kem.node)
                    nv.pos.addChild(kem)
                    nv.scaleKem()
                    kem.position = new Vec3(0, 0, 0)
                    kem.active = true;
                    this.xekem.setAnimation(0, "votay", false);
                    SoundManager.instance.playKhen();
                    this.title.node.parent.active = false;
                    this.Lamkem();
                    this.unschedule(this.countTimeSchedule)
                    this.countTime = 0
                    element.getComponent(Animation).stop();
                    this.bantay.active = false
                    if (this.tweenSao)
                        this.tweenSao.stop();
                    element.getComponent(UIOpacity).opacity = 255;
                    this.isNghe = false
                }
                else {
                    nv.SetAnimationLayBuon()
                    SoundManager.instance.playSai();
                    tween(this.kem.node)
                        .to(0.5, { position: this.startPosKem })
                        .call(() => {
                            this.isMoveKem = true
                        })
                        .start()
                }
            }
        })


        if (isChoose == false) {
            tween(this.kem.node)
                .to(0.5, { position: this.startPosKem })
                .call(() => {
                    this.isMoveKem = true
                })
                .start()
        }
    }


    CountTime() {
        this.countTimeSchedule = () => {
            this.countTime++;
            if (this.countTime == 10) {
                this.nhanvats[this.listThoai[this.countKem].index].getComponent(Animation).play("nhapnhay")
                this.bantay.active = true
                this.bantay.worldPosition = this.kem.node.worldPosition.clone();
                this.tweenSao = tween(this.bantay)
                    .to(1, { worldPosition: this.nhanvats[this.listThoai[this.countKem].index].worldPosition.clone() })
                    .call(() => {
                        this.bantay.worldPosition = this.kem.node.worldPosition.clone();
                        this.tweenSao.start();
                    })
                this.tweenSao.start();
                this.unschedule(this.countTimeSchedule)
            }
        }
        this.schedule(this.countTimeSchedule, 1)
    }
    countTimeSchedule;
    ListererEventAnimationHo() {
        this.xekem.setCompleteListener((entry: sp.spine.TrackEntry) => {
            if (entry.animation.name == "duakem") {
                this.title.node.parent.active = true;
                this.isNghe = true;
                this.title.string = this.listThoai[this.countKem].text;
                SoundManager.instance.playThoai(this.listThoai[this.countKem].thoai)
                this.CountTime()
            }

            if (entry.animation.name == "votay") {

                this.kem.node.active = true;
                this.kem.node.scale = new Vec3(1, 1, 1)
                this.kem.node.position = new Vec3(224.139, -239.852, 0)
                this.kem.node.angle = 180

            }
        });


        this.xekem.setStartListener((entry: sp.spine.TrackEntry) => {
            log(entry.animation.name)
            if (entry.animation.name == 'muckem') {
                this.scheduleOnce(() => {
                    this.kem.node.scale = new Vec3(3, 3, 3)
                    this.kem.node.position = new Vec3(224.138, 600, 0)
                    this.kem.node.angle = 0
                    this.kem.node.active = true;
                    this.startPosKem = this.kem.node.position.clone();
                }, 2)
            }
        })



    }

    isNghe = false
    NgheLai() {
        if (this.isNghe == true)
            SoundManager.instance.playThoai(this.listThoai[this.countKem].thoai)
    }

    onMouseMove(event: EventMouse) {
        if (this.isMoveKem == true) {
            const mouseLocation = event.getUILocation();  // Lấy tọa độ màn hình của chuột
            let ui = this.node.getChildByName("ui")
            // Lấy thành phần UITransform của node cha (Canvas hoặc node cha của node cần di chuyển)
            const parentNode = this.kem.node.parent;
            const uiTransform = parentNode.getComponent(UITransform);

            // Chuyển đổi tọa độ màn hình của chuột sang tọa độ cục bộ của node cha
            const localPos = uiTransform.convertToNodeSpaceAR(new Vec3(mouseLocation.x, mouseLocation.y, 0));
            console.log(localPos);
            // Đặt vị trí của node (cây kem) theo tọa độ mới
            this.kem.node.setPosition(localPos);
            for (let i = 0; i < this.nhanvats.length; i++) {
                let nv = this.nhanvats[i].getComponent(NhanVat);
                if (nv.isCoKem) continue;
                if (this.nhanvats[i] && this.isNodeInsideTarget(this.kem.node, this.nhanvats[i])) {
                    if (this.tweenSao)
                        this.tweenSao.stop()
                    this.bantay.active = false;
                    this.nhanvats[i].getComponent(UIOpacity).opacity = 255;
                    if (nv.isChoose == false) {
                        nv.isChoose = true;
                        nv.SetAnimationXinKem();
                    }
                }
                else {
                    if (nv.isChoose == true) {
                        nv.isChoose = false;
                        nv.SetAnimationIdle();
                    }
                }
            }
        }

    }

    isNodeInsideTarget(movingNode: Node, targetNode: Node): boolean {
        const targetTransform = targetNode.getComponent(UITransform);
        // Lấy tọa độ trung tâm của movingNode trong hệ tọa độ thế giới
        const movingNodeWorldPos = movingNode.getWorldPosition();

        const localPos = targetTransform.convertToNodeSpaceAR(movingNodeWorldPos);

        // Lấy kích thước của targetNode
        const targetWidth = targetTransform.width;
        const targetHeight = targetTransform.height;

        // Kiểm tra xem vị trí localPos của movingNode có nằm trong kích thước của targetNode hay không
        const halfWidth = targetWidth / 2;
        const halfHeight = targetHeight / 2;

        return localPos.x >= -halfWidth && localPos.x <= halfWidth &&
            localPos.y >= -halfHeight && localPos.y <= halfHeight;
    }
    Lamkem() {
        if (this.countKem <= 9) {

            this.kem.spriteFrame = this.kems[this.countKem]
            this.xekem.addAnimation(0, "muckem", false);
            this.xekem.addAnimation(0, "duakem", false);
            this.xekem.addAnimation(0, "idle_duakem", true);
        }
        else {
            if (this.isHetTime == false) {
                this.isHetTime = true;
                this.tinhdiem();
            }
            this.showNode()
        }

    }

    diem = 0;
    tinhdiem() {
        if (this.countKem >= 9) {
            this.diem = 3
        }
        else {
            if (this.countKem >= 5) {
                this.diem = 2
            }
            else {
                if (this.countKem >= 1) {
                    this.diem = 1
                }
                else {
                    this.diem = 0
                }

            }
        }


    }


    @property(Node)
    nodetinhsao: Node
    @property(Node)
    board: Node

    @property(Node)
    sao1: Node

    @property(Node)
    sao2: Node

    @property(Node)
    sao3: Node

    showNode() {

        let timeEnd = new Date().getTime();
        console.log(`[RESULT]: ${(timeEnd - this.timestart) / 1000} - ${this.diem}`)
        this.nodetinhsao.active = true;
        tween(this.nodetinhsao).to(0.5, { scale: new Vec3(0.4, 0.4, 1) })
            .call(() => {
                tween(this.board).to(0.5, { scale: new Vec3(1, 1, 1) })
                    .call(() => {
                        if (this.diem == 1) {
                            SoundManager.instance.playSao(0)
                            this.sao1.active = true
                            tween(this.sao1).to(0.2, { scale: new Vec3(1, 1, 1) })
                                .call(() => {
                                    this.sao1.getComponent(Animation).play("scale")
                                })
                                .start()

                        }

                        if (this.diem == 2) {
                            this.sao1.active = true
                            this.sao2.active = true
                            SoundManager.instance.playSao(0)
                            tween(this.sao1).to(0.2, { scale: new Vec3(1, 1, 1) })
                                .call(() => {
                                    SoundManager.instance.playSao(1)
                                    this.sao1.getComponent(Animation).play("scale")
                                    tween(this.sao2).to(0.2, { scale: new Vec3(1, 1, 1) })
                                        .call(() => {
                                            this.sao2.getComponent(Animation).play("scale")
                                        })
                                        .start()
                                })
                                .start()

                        }

                        if (this.diem == 3) {
                            this.sao1.active = true
                            this.sao2.active = true
                            this.sao3.active = true
                            SoundManager.instance.playSao(0)
                            tween(this.sao1).to(0.2, { scale: new Vec3(1, 1, 1) })
                                .call(() => {
                                    SoundManager.instance.playSao(1)
                                    this.sao1.getComponent(Animation).play("scale")
                                    tween(this.sao2).to(0.2, { scale: new Vec3(1, 1, 1) })
                                        .call(() => {
                                            SoundManager.instance.playSao(2)
                                            this.sao2.getComponent(Animation).play("scale")
                                            tween(this.sao3).to(0.2, { scale: new Vec3(1, 1, 1) })
                                                .call(() => {
                                                    this.sao3.getComponent(Animation).play("scale")
                                                })
                                                .start()
                                        })
                                        .start()
                                })
                                .start()
                        }
                    })
                    .start();
            })
            .start();
    }

    btnReset() {
        SoundManager.instance = null;
        director.loadScene("Gameplay")
    }

    btnBackGame() {
        console.log("[ACTION]: BACK")
    }

    btnNextGame() {
        console.log("[ACTION]: NEXTGAME")
    }

    btnListgame() {
        console.log("[ACTION]: SHOWLISTGAME")
    }

}


