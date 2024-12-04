const apiUrl = 'http://api.guerrillamail.com/ajax.php';

// Initialize the PHPSESSID here. This will be set dynamically after you get it from a previous API response.
let PHPSESSID = 'fkn2fpg9ki2sesmn29d97ma83c';  // Replace this with your actual PHPSESSID cookie value

// Function to get the email address of the current session
function getEmailAddress() {
  const params = new URLSearchParams({
    f: 'get_email_address',   // Function to get email address
    ip: '127.0.0.1',          // Example IP address (can be set to your actual IP)
    agent: 'Mozilla/5.0',      // Example User-Agent (can be customized)
    lang: 'en'                // Language code
  });

  return fetch(`${apiUrl}?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Cookie': `PHPSESSID=${PHPSESSID}`  // Send the PHPSESSID cookie for session tracking
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.email_addr) {
      console.log('Email Address:', data.email_addr);  // Output the email address
      return data.email_addr;  // Return the email address
    } else {
      console.error('Error: No email address found');
      return null;  // Return null if no email address is found
    }
  })
  .catch(error => console.error('Error fetching email address:', error));
}

// Call the function to get the email address of the current session
getEmailAddress();

