// Set up the URL and parameters for the GET request
const url = "http://api.guerrillamail.com/ajax.php";
const params = new URLSearchParams({
  f: 'get_email_address',
  ip: '127.0.0.1',  // Replace with your IP address
  agent: 'Mozilla_foo_bar'  // Replace with your user-agent string
});

// Set up the cookies (using PHPSESSID)
const cookies = 'PHPSESSID=873rkpb0h8oe0hnsfg229nvhvr';  // Replace with actual PHPSESSID

// Send the GET request with cookies
fetch(`${url}?${params.toString()}`, {
  method: 'GET',
  headers: {
    'Cookie': cookies
  }
})
.then(response => response.json())  // Assuming the response is JSON
.then(data => {
  console.log('Response:', data);  // Handle the response data here
  console.log("Email is:", data.email_addr);
})
.catch(error => {
  console.error('Error:', error);  // Handle any errors here
});
localStorage.setItem("Email", data.email_addr);
