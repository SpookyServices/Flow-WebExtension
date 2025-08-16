let sidePanelOpen = false;

chrome.commands.onCommand.addListener((command) => {
  if (command === "openSidePanel") {
    chrome.windows.getCurrent({}, (window) => {
      if (window && window.id !== chrome.windows.WINDOW_ID_NONE) {
        if (sidePanelOpen) {
          // Close the side panel by setting it to null/undefined path
          chrome.sidePanel.setOptions({
            enabled: false
          });
          chrome.sidePanel.setOptions({
            enabled: true
          });
          sidePanelOpen = false;
        } else {
          // Open the side panel
          chrome.sidePanel.setOptions({
            enabled: true
          });
          chrome.sidePanel.open({ windowId: window.id });
          sidePanelOpen = true;
        }
      }
    });
  }
});