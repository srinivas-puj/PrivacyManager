const fetch = require('node-fetch'); // For making HTTP requests
const cookie = require('cookie');   // For managing cookies

// Define the Guerrilla Mail API base URL
const baseUrl = 'http://api.guerrillamail.com/ajax.php';

// Function to get a random email address and initialize the session
async function getEmailAddress() {
  try {
    const response = await fetch(`${baseUrl}?f=get_email_address&ip=127.0.0.1&agent=Mozilla_foo_bar`);
    const data = await response.json();

    // Log the session info and email address
    console.log('Random Email Address:', data.email_addr);
    console.log('PHPSESSID Cookie:', data.PHPSESSID);

    // Save the PHPSESSID cookie for future requests
    const sessionCookie = cookie.parse(response.headers.get('set-cookie') || '');
    const phpsessid = sessionCookie.PHPSESSID;

    // Return email and session cookie for later use
    return { email: data.email_addr, phpsessid };
  } catch (error) {
    console.error('Error fetching email address:', error);
  }
}

// Function to set a custom email address
async function setEmailUser(email, phpsessid) {
  try {
    const response = await fetch(`${baseUrl}?f=set_email_user&email_user=${email}&lang=en&ip=127.0.0.1&agent=Mozilla_foo_bar`, {
      method: 'GET',
      headers: {
        'Cookie': `PHPSESSID=${phpsessid}` // Include the session cookie
      }
    });
    const data = await response.json();

    // Log the result
    console.log('Custom Email Set:', data.email_addr);
    return data;
  } catch (error) {
    console.error('Error setting email user:', error);
  }
}

// Function to check the inbox for new emails
async function checkEmail(phpsessid) {
  try {
    const response = await fetch(`${baseUrl}?f=check_email&ip=127.0.0.1&agent=Mozilla_foo_bar`, {
      method: 'GET',
      headers: {
        'Cookie': `PHPSESSID=${phpsessid}` // Include the session cookie
      }
    });

    const data = await response.json();

    // Log the inbox emails
    if (data.list && data.list.length > 0) {
      console.log('Inbox:');
      data.list.forEach(email => {
        console.log(`From: ${email.mail_from}, Subject: ${email.mail_subject}`);
      });
    } else {
      console.log('No new emails.');
    }
  } catch (error) {
    console.error('Error checking inbox:', error);
  }
}

// Function to get the value of a cookie by name
function getCookie(cookies, name) {
  const cookiesParsed = cookie.parse(cookies);
  return cookiesParsed[name];
}

// Run the sequence
async function run() {
  // Step 1: Get a random email address
  const { email, phpsessid } = await getEmailAddress();
  
  // Step 2: Optionally, set a custom email address
  const customEmail = 'testuser'; // Set a custom username
  await setEmailUser(customEmail, phpsessid);
  
  // Step 3: Check the inbox for new emails
  await checkEmail(phpsessid);
}

run();

