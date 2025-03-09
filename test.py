from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app)  # Enable CORS on all routes

@app.route('/post', methods=['POST'])
def receive_post(): 
    data = request.get_json()  # Get JSON data from the request
    print("Received POST data:", data)  # Print the received data
    return "Data received", 200  # Respond with a success message and HTTP status code 200

if __name__ == '__main__':
    app.run(debug=True)