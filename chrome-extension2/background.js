// background.js

// Function to fetch email address from the Flask server
async function fetchEmailFromServer() {
    try {
      const response = await fetch('http://172.25.7.18:5000/api/get_email');
      if (response.ok) {
        const data = await response.json();
        return data.email_addr || null;
      } else {
        console.error('Failed to fetch email:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error fetching email:', error);
      return null;
    }
  }
  
  // Listen for a message from content script to autofill email
  chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === 'getEmail') {
      const email = await fetchEmailFromServer();
      sendResponse({ email });
    }
    return true;  // Asynchronous response
  });
  