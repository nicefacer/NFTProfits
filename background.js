// This script runs in the background of the browser
// It can listen for events and perform tasks even when the extension popup is closed

// Listen for when the extension is installed or updated
chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    // Perform setup tasks when the extension is first installed
  } else if (details.reason == "update") {
    // Perform update tasks when the extension is updated to a new version
  }
});

// Listen for messages from other parts of the extension or external sources
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // Handle the message and send a response back if needed
});

// Perform other tasks as needed
