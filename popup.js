document.addEventListener("DOMContentLoaded", function() {
    var toggleSwitch = document.getElementById("toggleSwitch");
    var messageElement = document.getElementById("message");
  
    // Retrieve the saved toggle state from Chrome storage
    chrome.storage.local.get("owlPlusEnabled", function(result) {
      var isEnabled = result.owlPlusEnabled;
      toggleSwitch.checked = isEnabled;
  
      // Update the message based on the toggle state
      if (isEnabled) {
        messageElement.textContent = "OwlPlus enabled";
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: "enableDarkMode" });
        });
      } else {
        messageElement.textContent = "OwlPlus disabled";
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: "disableDarkMode" });
        });
      }
    });
  
    toggleSwitch.addEventListener("change", function() {
      var isEnabled = this.checked;
  
      // Save the toggle state to Chrome storage
      chrome.storage.local.set({ owlPlusEnabled: isEnabled });
  
      // Update the message based on the toggle state
      if (isEnabled) {
        messageElement.textContent = "OwlPlus enabled";
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: "enableDarkMode" });
        });
      } else {
        messageElement.textContent = "OwlPlus disabled";
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: "disableDarkMode" });
        });
      }
    });
  });
  