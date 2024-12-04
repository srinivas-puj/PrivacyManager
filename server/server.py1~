from flask import Flask, jsonify, request
from flask_restful import Resource, Api
import uuid
import requests

# creating the flask app
app = Flask(__name__)
# creating an API object
api = Api(app)

# Simple Hello World endpoint
class Hello(Resource):
    def get(self):
        return jsonify({'message': 'hello world'})

    def post(self):
        data = request.get_json()  # status code
        return jsonify({'data': data}), 201

# Endpoint for calculating square
class Square(Resource):
    def get(self, num):
        return jsonify({'square': num**2})

# Endpoint for generating UUID
class Uuid(Resource):
    def get(self):
        token = uuid.uuid4().hex
        return jsonify({'uuid': token})

# Inbox endpoint for fetching Guerrilla Mail inbox
class Inbox(Resource):
    def get(self):
        URL = "http://api.guerrillamail.com/ajax.php"
        
        # Cookie string (PHPSESSID should be updated to match a valid session)
        COOKIES = {'PHPSESSID': 'rr8pbfjosa0coj2klfposdsr8a'}  # Example session cookie

        # Parameters for the API request
        PARAMS = {
            'f': 'get_email_list',
            'offset': '0',  # Start from the first email
            'seq': '0',     # Sequence number, 0 for starting point
            'ip': '127.0.0.1',  # IP Address of the client
            'agent': 'Mozilla_5.0'  # User agent string
        }

        try:
            # Send the GET request to Guerrilla Mail API
            r = requests.get(url=URL, params=PARAMS, cookies=COOKIES)

            # Check if the request was successful (status code 200)
            if r.status_code == 200:
                try:
                    # Parse the JSON response from Guerrilla Mail
                    data = r.json()

                    # Check if 'list' key exists in the response data
                    if 'list' in data:
                        # Return the email list as JSON
                        return jsonify({'emails': data['list']})

                    # If no emails found, return a custom message
                    return jsonify({'message': 'No emails found.'}), 200
                except ValueError:
                    return jsonify({'error': 'Error: Could not parse JSON response from Guerrilla Mail.'}), 500
            else:
                return jsonify({'error': f'Request failed with status code: {r.status_code}'}), 400
        except requests.RequestException as e:
            return jsonify({'error': f'Request failed: {str(e)}'}), 500

class Email_Get(Resource) :
	
	def get(self):
	# Replace with the actual session ID

# Define the API URL
		url = "http://api.guerrillamail.com/ajax.php"

# Set up the parameters for the GET request
		params = {
    			'f': 'get_email_address',
    			'ip': '127.0.0.1',  # Replace with your IP address
    			'agent': 'Mozilla_foo_bar'  # Replace with your user-agent string
		}

		# Set up the cookies (using PHPSESSID)
		cookies = ''

		# Send the GET request
		response = requests.get(url, params=params, cookies=cookies)

		# Check if the request was successful
		if response.status_code == 200:
    			data = response.json()
    # Print the current email address
    			return jsonify(data)
		else:
    			print(f"Failed to fetch email address. Status Code: {response.status_code}")


# Add the defined resources along with their corresponding URLs
api.add_resource(Hello, '/')
api.add_resource(Square, '/square/<int:num>')
api.add_resource(Uuid, '/api/uuid/new')
api.add_resource(Inbox, '/inbox')
api.add_resource(Inbox, '/get_email')

# driver function
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)


