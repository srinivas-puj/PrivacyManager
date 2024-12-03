function findEmailInputFields() {
    const emailInputs = [];
    
    // Find input fields with email-related attributes or types
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      const isEmailField = 
        input.type === 'email' || 
        input.name.toLowerCase().includes('email') || 
        input.id.toLowerCase().includes('email') || 
        input.placeholder.toLowerCase().includes('email');
      
      if (isEmailField) {
        emailInputs.push({
          id: input.id,
          name: input.name,
          placeholder: input.placeholder
        });
      }
    });
    
    return emailInputs;
  }
  
  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'detectEmailFields') {
      const emailFields = findEmailInputFields();
      sendResponse({ emailFields });
    }
    
    if (request.action === 'fillEmail') {
      const inputField = document.querySelector(`input[id="${request.fieldId}"], input[name="${request.fieldId}"]`);
      if (inputField) {
        inputField.value = request.email;
        inputField.dispatchEvent(new Event('input', { bubbles: true }));
        inputField.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
    
    return true;
  });