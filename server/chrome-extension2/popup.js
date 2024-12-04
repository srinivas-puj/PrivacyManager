document.getElementById('autofill-btn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => {
                // Find the email input field
                const emailField = document.querySelector(
                    'input[type="email"], input[name="email"], input[id="email"]'
                );

                if (emailField) {
                    // Function to get a specific cookie by name
                    const getCookie = (name) => {
                        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
                        return match ? match[2] : null;
                    };

                    // Check if PHPSESSID cookie exists
                    let sessionCookie = getCookie('PHPSESSID');
                    if (!sessionCookie) {
                        console.warn('PHPSESSID cookie not found!');
                        sessionCookie = 'fkn2fpg9ki2sesmn29d97ma83c'; // Hardcoded session ID (fallback value)
                    }

                    // Define API parameters for getting the email address
                    const url = "https://api.guerrillamail.com/ajax.php";
                    const params = new URLSearchParams({
                        f: 'get_email_address',
                        ip: '127.0.0.1', // Replace with your IP address
                        agent: 'Mozilla_foo_bar', // Replace with your user-agent string
                    });

                    // Send request to fetch email address
                    fetch(`${url}?${params.toString()}`, {
                        method: 'GET',
                        headers: {
                            'Cookie': `PHPSESSID=${sessionCookie}`, // Include session cookie
                        }
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            if (data.email_addr) {
                                // Fill the email input field with the retrieved email address
                                emailField.value = data.email_addr;

                                // Trigger the input event to save the email value
                                const inputEvent = new Event('input', { bubbles: true });
                                emailField.dispatchEvent(inputEvent);

                                // Save the email address in localStorage
                                localStorage.setItem("Email", data.email_addr);

                                console.log('Email autofilled with:', data.email_addr);

                                // Now, check for the newest email
                                const checkEmailParams = new URLSearchParams({
                                    f: 'check_email',
                                    ip: '127.0.0.1', // Replace with your IP address
                                    agent: 'Mozilla_foo_bar', // Replace with your user-agent string
                                    seq: 0 // Start from the most recent email
                                });

                                fetch(`${url}?${checkEmailParams.toString()}`, {
                                    method: 'GET',
                                    headers: {
                                        'Cookie': `PHPSESSID=${sessionCookie}`, // Include session cookie
                                    }
                                })
                                    .then(response => response.json())
                                    .then(emailData => {
                                        if (emailData.list && emailData.list.length > 0) {
                                            const newestEmail = emailData.list[0]; // Get the most recent email
                                            console.log("Newest email details:");
                                            console.log("From:", newestEmail.mail_from);
                                            console.log("Subject:", newestEmail.mail_subject);
                                            console.log("Snippet:", newestEmail.mail_excerpt);
                                            console.log("Received at:", new Date(newestEmail.mail_timestamp * 1000).toLocaleString());
                                        } else {
                                            console.log("No new emails.");
                                        }
                                    })
                                    .catch(error => {
                                        console.error('Error fetching emails:', error);
                                    });
                            } else {
                                console.error('Failed to fetch email address');
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching email address:', error);
                        });
                } else {
                    console.warn('No email input field found on this page.');
                }
            },
        });
    });
});

