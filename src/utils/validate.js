import Vue from 'vue'

/**
 *  实现功能
 *  1、默认情况下只禁止空格输入
 *  2、限制只能输入整数
 *  3、限制只能输入整数和小数（价格类）
 */
const trigger = (el, type) => {
    const e = document.createEvent('HTMLEvents')
    e.initEvent(type, true, true)
    el.dispatchEvent(e)
}
const intFilter = function (el) {
    el.value = el.value.replace(/\D/g, '').length > 1 ? el.value.replace(/\D|\b(0+)/g, '') : el.value.replace(/\D/g, '')
    trigger(el, 'input')
}
const int0Filter = function (el) {
    el.value = el.value.replace(/\D/g, '').length > 1 ? el.value.replace(/\D|\b(0+)/g, '') : el.value.replace(/\D/g, '')
    el.value = el.value.replace(/\D/g, '') == '' ? 0 : el.value.replace(/\D/g, '')
    trigger(el, 'input')
}
const priceFilter = function (el) {
    el.value = el.value.match(/\d+(\.\d{0,2})?/) ? (el.value.match(/\d+(\.\d{0,2})?/)[0]) : ''
    if (el.value.indexOf(".") < 0 && el.value != "") {
        el.value = parseFloat(el.value).toString().slice(0, 8);
    } else {
        el.value = el.value.match(/\d{0,8}[.]\d{0,2}/)
    }
    if (isNaN(el.value)) {
        el.value = 0
    }
    trigger(el, 'input')
}
const specialFilter = function (el) {
    el.value = el.value.replace(/•|▪/g, '·').replace(/(^\s*)|(\s*$)|[\r\n]/g, '').replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig, '')
    console.log(el.value)
    trigger(el, 'input')
}
const intAZFilter = function (el) {
    el.value = el.value.toUpperCase().replace(/_/g, '').replace(/[\W]/g, '').slice(0, 18)
    trigger(el, 'input')
}
const telFilter = function (el) {
    el.value = el.value.replace(/[^0-9-]+/, '')
    trigger(el, 'input')
}
const carnumFilter = function (el) {
    el.value = el.value.toUpperCase().replace(/•|▪/g, '·')
    el.value = el.value.replace(/O|I/g, '')

    console.log(el.value)
    trigger(el, 'input')
}
const vinFilter = function (el) {
    el.value = el.value.toUpperCase().replace(/•|▪/g, '·')
    el.value = el.value.replace(/O|I|Q/g, '')

    console.log(el.value)
    trigger(el, 'input')
}
const switchfilter = function (el, arg) {
    const changeList = {
        'int': intFilter, //手机号类型
        'price': priceFilter, //价格小数点
        'special': specialFilter, //地址过滤特殊字符
        'intAZ': intAZFilter, //数字字母组合
        'tel': telFilter, //电话数字 - 类型
        'int0': int0Filter, //数字类型，为空填充0
        'vinF': vinFilter, //车架号校验
        'carF': carnumFilter // 发动几号和车辆型号
    }
    changeList[arg](el)
}
const filterFunction = function (el, arg) {
    var doing = false;
    el.addEventListener('compositionstart', function (e) {
        doing = true;
    }, false);
    el.addEventListener('keyup', function (e) {
        if (!doing) {
            switchfilter(el, arg);
        }
    }, false);

    el.addEventListener('compositionend', function (e) {
        doing = false;
        setTimeout(function () {
            switchfilter(el, arg);
        }, 10)
    }, false);
}
var inputFilter = {
    bind(el, binding, vnode) {
        if (el.tagName.toLowerCase() !== 'input') {
            el = el.getElementsByTagName('input')[0] ? el.getElementsByTagName('input')[0] : el.getElementsByTagName('textarea')[0]
        }
        filterFunction(el, binding.arg)
    }
}
Vue.directive('inputFilter', inputFilter)

Vue.directive('dialogDrag', {
    bind(el, binding, vnode, oldVnode) {
        //弹框可拉伸最小宽高
        let minWidth = 400;
        let minHeight = 150;
        //初始非全屏
        let isFullScreen = false;
        //当前高度
        let nowHight = 0;
        //当前宽高
        let nowWidth = 0;
        //当前顶部高度
        let nowMarginTop = 0;
        //获取弹框头部（这部分可双击全屏）
        const dialogHeaderEl = el.querySelector('.el-card__header');
        //弹窗
        const dragDom = el;
        //给弹窗加上overflow auto；不然缩小时框内的标签可能超出dialog；
        dragDom.style.overflow = "hidden";
        //清除选择头部文字效果
        //dialogHeaderEl.onselectstart = new Function("return false");
        //头部加上可拖动cursor
        dialogHeaderEl.style.cursor = 'move';
        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
        let moveDown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft;
            const disY = e.clientY - dialogHeaderEl.offsetTop;
            // 获取到的值带px 正则匹配替换
            let styL, styT;
            // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
            if (sty.left.includes('%')) {
                styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
                styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
            } else {
                styL = +sty.left.replace(/\px/g, '');
                styT = +sty.top.replace(/\px/g, '');
            };
            document.onmousemove = function (e) {
                // 通过事件委托，计算移动的距离
                const l = e.clientX - disX;
                const t = e.clientY - disY;
                // 移动当前元素 
                dragDom.style.setProperty('left', `${l + styL}px`);
                dragDom.style.setProperty('top', `${t + styT}px`);
                //将此时的位置传出去
                //binding.value({x:e.pageX,y:e.pageY})
            };
            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }
        dialogHeaderEl.onmousedown = moveDown;
    }
})


