import * as $ from 'jquery';

function CreateAnalytics(): object {
    let counter = 0;
    let isDestroyed: boolean = false;
    const listener = (): number => counter++;
    $(document).on('click', listener);
    return {
        destroy() {
            $(document).off('click', listener);
            isDestroyed = true;
        },
        getClick() {
            if (isDestroyed) {
                return 'Analytics is destroyed';
            }
            return `Total: ${counter}`;
        },
    };
}
window['analytics'] = CreateAnalytics();