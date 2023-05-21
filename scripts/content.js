chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "enableDarkMode") {
    enableDarkMode();
    saveDarkModeState(true);
    sendResponse({ success: true });
  } else if (request.action === "disableDarkMode") {
    disableDarkMode();
    saveDarkModeState(false);
    sendResponse({ success: true });
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

function disableDarkMode() {
  document.querySelector("html").style.filter = "";
  document.querySelector("html").style.backgroundColor = "";
  document.querySelector("html").style.color = "";
  //document.querySelectorAll("html").style.color="";

  let media = document.querySelectorAll("img,picture,video");

  media.forEach((mediaItem) => {
    mediaItem.style.filter = "";
  });

  let topHeader = document.querySelector(".Mrphs-topHeader");
  if (topHeader) {
    topHeader.style.backgroundColor = "";
  }
}

function saveDarkModeState(enabled) {
  chrome.storage.local.set({ darkModeEnabled: enabled });
}

function getDarkModeState() {
  return new Promise((resolve) => {
    chrome.storage.local.get("darkModeEnabled", function(result) {
      resolve(result.darkModeEnabled);
    });
  });
}

getDarkModeState().then((enabled) => {
  if (enabled) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});


function displayNotification() {
  const notification = document.createElement("div");
  notification.textContent = "Dark mode has been enabled!";
  notification.style.background = "black";
  notification.style.color = "white";
  notification.style.padding = "10px";
  notification.style.position = "fixed";
  notification.style.top = "10px";
  notification.style.left = "10px";
  notification.style.zIndex = "9999";
  document.body.appendChild(notification);
}

// Call the example function
displayNotification();
