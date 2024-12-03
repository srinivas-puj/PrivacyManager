document.getElementById('detectButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'detectEmailFields' }, (response) => {
        const fieldsContainer = document.getElementById('emailFields');
        fieldsContainer.innerHTML = ''; // Clear previous results
        
        if (response && response.emailFields.length > 0) {
          response.emailFields.forEach(field => {
            const fieldButton = document.createElement('button');
            fieldButton.textContent = `Fill ${field.id || field.name || field.placeholder}`;
            fieldButton.addEventListener('click', () => {
              fetch('http://localhost:5000/get-email')
                .then(response => response.json())
                .then(data => {
                  chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'fillEmail',
                    fieldId: field.id || field.name,
                    email: data.email
                  });
                });
            });
            fieldsContainer.appendChild(fieldButton);
          });
        } else {
          fieldsContainer.textContent = 'No email fields detected';
        }
      });
    });
  });