async function sendMessage(convoToken, message) {
  if (message.replace(/\s/g, "") === "") {
    return false;
  }

  const url = "https://flow.spookysrv.com/reply";
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  // Construct urlencoded body
  const body = new URLSearchParams({
    device: convoToken || "",
    message: message,
  }).toString();

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (response.status === 418) {
      console.log("Success");
      return true;
    } else {
      const text = await response.text();
      console.log(`Error: ${response.status} ${text}`);
      return false;
    }
  } catch (error) {
    console.log("Fetch error:", error);
    return false;
  }
}

const currentUrl = window.location.href;
chrome.storage.local.get({ convoToken: "unknown" }, (items) => {
  const convoToken = items.convoToken.replaceAll('"', "");
  if (convoToken !== "unknown") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0]) {
        let currentUrl = tabs[0].url;
        sendMessage(convoToken, currentUrl).then((success) => {
          if (success) {
            document.getElementById("statusIcon").src = "checkmark.svg";
            document.getElementById("status").textContent = "Sent to Flow";
          } else {
            document.getElementById("statusIcon").style.display = "none";
            document.getElementById("status").textContent =
              "❌ Failed to send message";
            window.open(
              "https://app.flow.spookysrv.com/?webExtLogin",
              "_blank"
            );
          }
        });
      }
    });
  } else {
    document.getElementById("status").innerHTML = "No token found";
    browser.permissions.request({
      origins: ["https://app.flow.spookysrv.com/*"],
    });
    browser.tabs.create({
      url: "https://app.flow.spookysrv.com/?webExtLogin",
    });
    window.close();
  }
});
