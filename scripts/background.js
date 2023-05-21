// Variable to store the toggle state
var isEnabled = false;

// Message listener to handle message passing between content script and background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getToggleState") {
    sendResponse({ isEnabled: isEnabled });
  } else if (request.action === "updateToggleState") {
    isEnabled = request.isEnabled;
    sendResponse({ success: true });
  }
});

// Initialize the toggle state based on the saved state in chrome.storage
chrome.storage.sync.get("owlPlusEnabled", function(result) {
  isEnabled = result.owlPlusEnabled;
});

// Save and retrieve the toggle state using chrome.storage if needed
chrome.storage.sync.set({ owlPlusEnabled: isEnabled });

