let loaded = false
document.querySelector('iframe').addEventListener('load', function () {
    if (!loaded) {
        loaded = true;
    } else {
        window.location.reload();
    }
    // Place your code to handle reload here
});