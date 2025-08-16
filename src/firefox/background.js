browser.action.onClicked.addListener(() => {
  browser.permissions.request({
    origins: ["*://*.reddit.com/"],
  });
});
