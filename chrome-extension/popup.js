// popup.js

document.getElementById('fetchEmail').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'getEmail' }, (response) => {
        if (response.email) {
            console.log(`Fetched Email: ${response.email}`);
            // Send this email to content script to fill in the input field
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'fillEmailField', email: response.email });
            });
        } else {
            console.error(response.error);
        }
    });
});