//const timeoutInMilliseconds = 60000;
const message = 'Are you still here';

const timeoutHandler = () => {
    if (confirm(message)) {
        window.clearTimeout(timeoutHandler);
        window.setTimeout(timeoutHandler, timeoutInMilliseconds);
    } else {
        window.clearTimeout(timeoutHandler);
        window.close();
    }
}

window.setTimeout(timeoutHandler, timeoutInMilliseconds);

document.addEventListener('click', () => {
    window.clearTimeout(timeoutHandler);
});
