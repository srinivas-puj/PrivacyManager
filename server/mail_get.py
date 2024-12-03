import requests

# API endpoint
URL = "http://api.guerrillamail.com/ajax.php"

# Cookie string (if required by the server, add it properly in headers)
COOKIES = {'PHPSESSID': 'besk386tgsap9iig87b8m0lja9'}

# Defining a params dictionary for the parameters to be sent to the API
PARAMS = {
    'f': 'get_email_list',
    'offset': '0',
    'seq': '0',
    'ip': '127.0.0.1',  # Corrected parameter format
    'agent': 'Mozilla_5.0'
}

# Sending GET request with the specified URL, params, and cookies
r = requests.get(url=URL, params=PARAMS, cookies=COOKIES)

# Checking if the request was successful
if r.status_code == 200:
    # Extracting data in JSON format
    try:
        data = r.json()
        print(data)
    except ValueError:
        print("Error: Could not parse JSON response.")
else:
    print(f"Request failed with status code: {r.status_code}")


