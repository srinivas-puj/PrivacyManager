const apiUrl = 'http://api.guerrillamail.com/ajax.php';

// Set the session ID (this should be updated with the actual session ID from your previous requests)
const PHPSESSID = 'your_session_id_here'; // Replace with the actual PHPSESSID

// Parameters for the GET request to get email address
const params = new URLSearchParams({
  f: 'get_email_address',
  ip: '127.0.0.1',   // Your IP address
  agent: 'Mozilla_foo_bar',  // Your User-Agent
  lang: 'en'          // Language (optional)
});

// Function to get the email address and session details
function getEmailAddress() {
  return fetch(`${apiUrl}?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Cookie': `PHPSESSID=${PHPSESSID}`  // Include the session cookie in the request
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('Email Address:', data.email_addr);
    console.log('Email Timestamp:', data.email_timestamp);
    console.log('Subscription Active:', data.s_active);
    return data.email_addr;  // Return the email address for later use
  })
  .catch(error => console.error('Error getting email address:', error));
}

// Function to check emails in the inbox
function checkInbox(emailAddr) {
  const emailParams = new URLSearchParams({
    f: 'check_email',
    seq: 0  // Start from the first email (0 means the oldest)
  });

  return fetch(`${apiUrl}?${emailParams.toString()}`, {
    method: 'GET',
    headers: {
      'Cookie': `PHPSESSID=${PHPSESSID}`  // Include the session cookie
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.list && data.list.length > 0) {
      console.log('Inbox:', data.list);  // Print the list of new emails
      data.list.forEach(email => {
        console.log(`From: ${email.mail_from}`);
        console.log(`Subject: ${email.mail_subject}`);
        console.log(`Snippet: ${email.mail_excerpt}`);
        console.log(`Timestamp: ${email.mail_timestamp}`);
      });
    } else {
      console.log('No new emails.');
    }
  })
  .catch(error => console.error('Error checking inbox:', error));
}

// Step 1: Get the email address and session details
getEmailAddress()
  .then(emailAddr => {
    // Step 2: Use the email address to check the inbox
    checkInbox(emailAddr);
  })
  .catch(error => console.error('Error fetching email address or inbox:', error));


