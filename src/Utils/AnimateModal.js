export default function AnimateModal(el, cb, className, animationName=className) {
    if(el) {
        el.classList.add(className);
        el.onanimationend = (e) => {
            e.animationName === animationName && cb();
        };
    }
}