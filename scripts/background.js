var isEnabled = false;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getToggleState") {
    sendResponse({ isEnabled: isEnabled });
  } else if (request.action === "updateToggleState") {
    isEnabled = request.isEnabled;
    sendResponse({ success: true });
  }
});

chrome.storage.sync.get("owlPlusEnabled", function(result) {
  isEnabled = result.owlPlusEnabled;
});

chrome.storage.sync.set({ owlPlusEnabled: isEnabled });


console.log("Toggle state:", isEnabled);

function sendMessageToContentScript() {
  var message = {
    action: "showNotification",
    message: "Hello from the background script!"
  };

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
      console.log("Response from content script:", response);
    });
  });
}

function listenForToggleStateChanges() {
  // Simulating a toggle state change
  isEnabled = !isEnabled;

  chrome.storage.sync.set({ owlPlusEnabled: isEnabled });

  console.log("Updated toggle state:", isEnabled);
}

sendMessageToContentScript();
listenForToggleStateChanges();
