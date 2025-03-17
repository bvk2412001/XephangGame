import { _decorator, Component, EventMouse, Node, sp, UITransform, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NhanVat')
export class NhanVat extends Component {
    @property(sp.Skeleton)
    skeleton: sp.Skeleton;

    @property(Node)
    pos: Node

    isChoose: boolean = false;
    isCoKem: boolean = false;
    start() {

        this.skeleton = this.node.getChildByName("Node").getComponent(sp.Skeleton);
        this.pos = this.skeleton.node.getChildByName("pos")
        this.SetAnimationIdle();
    }


    public SetAnimationIdle() {
        this.skeleton.setAnimation(0, "idle", true)
    }


    public SetAnimationXinKem() {
        this.skeleton.setAnimation(0, "xinkem", true)
    }

    public SetAnimationLayKem() {
        this.skeleton.setAnimation(0, "nhankem", true)
        //this.skeleton.addAnimation(0, "liemkem", true)
    }

    public SetAnimationLayBuon() {
        this.skeleton.setAnimation(0, "buon", false)
        this.skeleton.addAnimation(0, "idle", true)
    }

    public SetAnimationLayNhay() {
        this.skeleton.setAnimation(0, "nhay", true)
    }

    public scaleKem() {
        switch (this.node.name) {
            case "Cu":
                this.pos.children[0].setScale(new Vec3(1, 1))
                break;
            case "Tre1":
                this.pos.children[0].setScale(new Vec3(0.3, 0.3))
                break;
            case "Tre5":
                this.pos.children[0].setScale(new Vec3(0.2, 0.2))
                break;
            case "Tre2":
                this.pos.children[0].setScale(new Vec3(0.25, 0.25))
                break;
            case "Tre3":
                this.pos.children[0].setScale(new Vec3(0.25, 0.25))
                break;
            case "Tre4":
                this.pos.children[0].setScale(new Vec3(0.25, 0.25))
                break;
            case "Nghe":
                this.pos.children[0].setScale(new Vec3(0.25, 0.25))
                this.pos.children[0].angle = 90
                break;
            case "CaVoi":
                this.pos.children[0].setScale(new Vec3(1, 1))
                break;
            case "Lung":
                this.pos.children[0].setScale(new Vec3(0.15, 0.15))
                break;
            case "TK":
                this.pos.children[0].setScale(new Vec3(0.15, 0.15))
                break;

        }
    }


}


