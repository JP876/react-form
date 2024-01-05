const isElementVisible = (el) => {
    if (!el) return null;
    const style = window.getComputedStyle(el);
    if (!style) return null;

    return (
        style.width !== '0' &&
        style.height !== '0' &&
        style.opacity !== '0' &&
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        el?.clientHeight !== 0 &&
        el?.clientWidth !== 0
    );
};

export default isElementVisible;
