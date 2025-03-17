import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Thoai')
export class Thoai extends Component {
    public static listVoid1 = [
        { text: "Hãy đưa cây kem cho bạn đứng thứ 2 trong hàng.", index: 1, thoai: 1 },
        { text: "Hãy đưa cây kem cho bạn tre 5 đốt trong hàng.", index: 9, thoai: 6 },
        { text: "Hãy đưa cây kem cho bạn đứng đầu tiên trong hàng.", index: 0, thoai: 0 },
        { text: "Hãy đưa cây kem cho bạn tre thứ 2 trong hàng.", index: 3, thoai: 7 },
        { text: "Hãy đưa cây kem cho bạn tre thứ 3 trong hàng.", index: 5, thoai: 8 },
        { text: "Hãy đưa cây kem cho bạn đứng thứ 5 trong hàng.", index: 4, thoai: 3 },
        { text: "Hãy đưa cây kem cho bạn tre thứ 4 trong hàng.", index: 7, thoai: 9 },
        { text: "Hãy đưa cây kem cho bạn đứng thứ 3 trong hàng.", index: 2, thoai: 2 },
        { text: "Hãy đưa cây kem cho bạn đứng thứ 7 trong hàng.", index: 6, thoai: 4 },
        { text: "Hãy đưa cây kem cho bạn đứng thứ 9 trong hàng.", index: 8, thoai: 5 },

    ]

    public static listVoid2 = [
        { text: "Hãy đưa cây kem cho bạn đứng thứ 9 trong hàng.", index: 8 , thoai: 5},
        { text: "Hãy đưa cây kem cho bạn tre 2 đốt trong hàng.", index: 3 ,thoai: 11 },
        { text: "Hãy đưa cây kem cho bạn tre thứ 5 trong hàng.", index: 9, thoai: 13 },
        { text: "Hãy đưa cây kem cho bạn đứng đầu tiên trong hàng.", index: 0, thoai: 0 },
        { text: "Hãy đưa cây kem cho bạn tre thứ 3 trong hàng.", index: 5 , thoai: 8},
        { text: "Hãy đưa cây kem cho bạn đứng thứ 5 trong hàng.", index: 4, thoai: 3 },
        { text: "Hãy đưa cây kem cho bạn tre 4 đốt trong hàng.", index: 7, thoai: 12 },
        { text: "Hãy đưa cây kem cho bạn đứng thứ 3 trong hàng.", index: 2, thoai: 2},
        { text: "Hãy đưa cây kem cho bạn đứng thứ 7 trong hàng.", index: 6,  thoai: 4},
        { text: "Hãy đưa cây kem cho bạn đứng thứ 2 trong hàng.", index: 1, thoai: 1},
    ]

}


