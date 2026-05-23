import base64
from flask import Flask, render_template, request, jsonify
from openai import OpenAI

app = Flask(__name__)

# Initialize the client (Use your real OpenRouter key here!)
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key="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",
    default_headers={"HTTP-Referer": "http://localhost:5000"} 
)

# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route('/generate', methods=['POST'])
# def generate():
#     # 1. Get the image file from the request
#     image_file = request.files.get('image')
#     if not image_file:
#         return jsonify({"error": "No image uploaded"}), 400

#     # 2. Convert image to base64
#     encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
    
#     # 3. Send to a Vision-capable model (like google/gemini-flash-1.5)
#     response = client.chat.completions.create(
#         model="google/gemini-flash-1.5", 
#         messages=[{
#             "role": "user",
#             "content": [
#                 {"type": "text", "text": "Write a funny, sarcastic meme caption for this image."},
#                 {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{encoded_image}"}}
#             ]
#         }]
#     )
    
#     return jsonify({"reply": response.choices[0].message.content})

# if __name__ == '__main__':
#     app.run(debug=True)


@app.route('/api/run', methods=['POST'])
def run_tool():
    data = request.json
    tool = data['tool']
    prompt = data['prompt']
    
    # Example logic using your Claude API
    if tool == 'copilot':
        response = client.messages.create(
            model="claude-3-5-sonnet-20240620",
            messages=[{"role": "user", "content": f"You are a coding assistant: {prompt}"}]
        )
        return jsonify({"result": response.content[0].text})
        
    return jsonify({"result": "Feature in progress!"})