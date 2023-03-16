const timeoutInMilliseconds = 60000000000;
const message = 'Are you still here';

const timer = setTimeout(() => {
    if (confirm(message)) {
        clearTimeout(timer);
    } else {
        window.close();
    }
}, timeoutInMilliseconds);

document.addEventListener('click', () => {
    clearTimeout(timer);
});
