from flask import Flask, request, jsonify
import openai
import google.auth
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

app = Flask(__name__)

# Google Gemini API client initialization
def get_gemini_response(prompt):
    try:
        credentials, project = google.auth.default()
        service = build('gemini', 'v1', credentials=credentials)
        request_body = {
            'prompt': prompt,
            'temperature': 0.7,
            'max_tokens': 150,
        }
        
        response = service.completions().generate(body=request_body).execute()
        return response['choices'][0]['text']
    except HttpError as err:
        return f"Error: {err}"

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    if user_input:
        response = get_gemini_response(user_input)
        return jsonify({"response": response})
    return jsonify({"error": "No message provided!"}), 400

if __name__ == '__main__':
    app.run(debug=True)
