const openTab = (url) => {
  browser.tabs.create({
    url: url,
  });
};
