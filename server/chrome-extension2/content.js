// content.js
document.addEventListener("DOMContentLoaded", function () {

    symbol.classList.add('email-symbol');

    // Function to fetch the email from the Flask server
    async function fetchEmail() {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/get_email');
            const data = await response.json();

            if (data.email_addr) {
                autofillEmail(data.email_addr);
            } else {
                console.error("No email found in response");
            }
        } catch (error) {
            console.error("Failed to fetch email: ", error);
        }
    }

    // Function to autofill the email input field
    function autofillEmail(email) {
        const emailInputFields = document.querySelectorAll('input[type="email"], input[name*="email"], input[id*="email"]');

        if (emailInputFields.length > 0) {
            emailInputFields.forEach(field => {
                if (!field.value) { // Only autofill empty fields
                    field.value = email;
                    console.log(`Autofilled email: ${email}`);
                }
            });
        } else {
            console.error("No email input field found on the page.");
        }
    }

    // Function to add a clickable symbol next to email input fields
    function addEmailSymbolToInputFields() {
        const emailInputFields = document.querySelectorAll('input[type="email"], input[name*="email"], input[id*="email"]');
        
        emailInputFields.forEach(field => {
            if (!field.value) { // Only show the symbol for empty email fields
                const symbol = document.createElement('span');
                symbol.innerHTML = '🖋️'; // Example symbol, you can customize this
                symbol.style.cursor = 'pointer';
                symbol.style.fontSize = '18px';
                symbol.style.marginLeft = '8px';

                // Add the symbol next to the input field
                field.parentNode.style.position = 'relative'; // Ensure relative positioning for the symbol
                field.parentNode.appendChild(symbol);

                // Add a click event to the symbol
                symbol.addEventListener('click', function() {
                    fetchEmail(); // Fetch and autofill the email
                });
            }
        });
    }

    // Call the function to add the symbol to email fields
    addEmailSymbolToInputFields();
});
