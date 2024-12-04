// Event Listener for Email Autofill
document.getElementById('autofill-email-btn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          // Find email input field
          const emailField = document.querySelector(
            'input[type="email"], input[name*="email"], input[id*="email"]'
          );
  
          if (emailField) {
            const url = "https://api.guerrillamail.com/ajax.php";
            const params = new URLSearchParams({
              f: 'get_email_address',
              ip: '127.0.0.1',
              agent: 'Mozilla_foo_bar',
            });
  
            const cookies = 'PHPSESSID=873rkpb0h8oe0hnsfg229nvhvr';
  
            fetch(`${url}?${params.toString()}`, {
              method: 'GET',
              headers: {
                'Cookie': cookies,
              },
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
              })
              .then((data) => {
                const email = data.email_addr || "example@example.com";
                emailField.value = email;
  
                const inputEvent = new Event('input', { bubbles: true });
                emailField.dispatchEvent(inputEvent);
  
                console.log('Email autofilled with:', email);
              })
              .catch((error) => {
                console.error('Error fetching email address:', error);
              });
          } else {
            console.warn('No email input field found on this page.');
          }
        },
      });
    });
  });
  
  // Event Listener for Password Autofill
  document.getElementById('autofill-password-btn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          // Find password input field
          const passwordField = document.querySelector(
            'input[type="password"], input[name*="pass"], input[id*="pass"], input[autocomplete="new-password"], input[autocomplete="current-password"]'
          );
  
          if (passwordField) {
            // Generate a secure random password
            const generatePassword = (length = 12) => {
              const chars =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
              let password = '';
              for (let i = 0; i < length; i++) {
                password += chars.charAt(Math.floor(Math.random() * chars.length));
              }
              return password;
            };
  
            const password = generatePassword();
  
            // Autofill the password field
            passwordField.value = password;
  
            const inputEvent = new Event('input', { bubbles: true });
            passwordField.dispatchEvent(inputEvent);
  
            console.log('Password autofilled with:', password);
          } else {
            console.warn('No password input field found on this page.');
          }
        },
      });
    });
  });
  
  // Event Listener for OTP Autofill (Random 6-Digit OTP)
  document.getElementById("autofill-code-btn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          // Function to generate a random 6-digit OTP
          const generateRandomOTP = () => {
            return Math.floor(100000 + Math.random() * 900000).toString();
          };
  
          const autofillRandomOTP = () => {
            const otp = generateRandomOTP();
            // Enhanced query selector to find any input field related to code/OTP
            const codeFields = document.querySelectorAll(
              'input[placeholder*="Code"i], input[aria-label*="Code"i], ' +
              'input[name*="code"i], input[id*="code"i], ' +
              'input[placeholder*="OTP"i], input[aria-label*="OTP"i], ' +
              'input[name*="otp"i], input[id*="otp"i], ' +
              'input[type="tel"], input[type="number"], input[type="text"]'
            );
  
            if (codeFields.length > 0) {
              codeFields.forEach((field, index) => {
                console.log(`Attempting to autofill OTP in input field #${index + 1}:`, field);
                field.focus();
                field.value = otp;
                ['input', 'change', 'blur'].forEach(eventType => {
                  field.dispatchEvent(new Event(eventType, { bubbles: true }));
                });
              });
  
              console.log("OTP autofilled successfully:", otp);
            } else {
              console.warn("No code/OTP input field found on this page.");
            }
          };
  
          // Execute autofill for random OTP
          autofillRandomOTP();
        },
      });
    });
  });
  