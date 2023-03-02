// This script runs in the context of the web page that the extension interacts with
// It can modify the DOM and interact with the web page's JavaScript

// Listen for messages from the extension popup or background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // Handle the message and modify the web page if needed
});

// Modify the web page as needed
