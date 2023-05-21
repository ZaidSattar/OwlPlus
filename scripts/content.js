// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "enableDarkMode") {
    enableDarkMode();
    saveDarkModeState(true);
  } else if (request.action === "disableDarkMode") {
    disableDarkMode();
    saveDarkModeState(false);
  }
});

// Function to enable dark mode
function enableDarkMode() {
  document.querySelector("html").style.filter = "invert(1) hue-rotate(180deg) brightness(85%)";
  document.querySelector("html").style.backgroundColor = "#121212";
  document.querySelector("html").style.color = "#ffffff";

  let media = document.querySelectorAll("img,picture,video");

  media.forEach((mediaItem) => {
    mediaItem.style.filter = "invert(1) hue-rotate(180deg)";
  });

  // Change the background color of the .Mrphs-topHeader element to yellow
  let topHeader = document.querySelector(".Mrphs-topHeader");
  if (topHeader) {
    topHeader.style.backgroundColor = "yellow";
  }
}

// Function to disable dark mode
function disableDarkMode() {
  document.querySelector("html").style.filter = "";
  document.querySelector("html").style.backgroundColor = "";
  document.querySelector("html").style.color = "";
  //document.querySelectorAll("html").style.color="";

  let media = document.querySelectorAll("img,picture,video");

  media.forEach((mediaItem) => {
    mediaItem.style.filter = "";
  });

  // Reset the background color of the .Mrphs-topHeader element
  let topHeader = document.querySelector(".Mrphs-topHeader");
  if (topHeader) {
    topHeader.style.backgroundColor = "";
  }
}

// Function to save dark mode state
function saveDarkModeState(enabled) {
  chrome.storage.local.set({ darkModeEnabled: enabled });
}

// Function to retrieve dark mode state
function getDarkModeState() {
  return new Promise((resolve) => {
    chrome.storage.local.get("darkModeEnabled", function(result) {
      resolve(result.darkModeEnabled);
    });
  });
}

// On page load, check and apply the saved dark mode state
getDarkModeState().then((enabled) => {
  if (enabled) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});
