from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# In-memory data store for demonstration purposes
todo_list = [
    {"id": 1, "task": "Setup project architecture"},
    {"id": 2, "task": "Review code with the team"}
]
current_id = 3

@app.route('/')
def index():
    """Serves the main frontend HTML page."""
    return render_template('index.html')

@app.route('/contact')
def contact():
    """Serves the contact form page."""
    return render_template('contact.html')

@app.route('/api/todos', methods=['GET'])
def get_todos():
    """API endpoint to fetch all todo items."""
    return jsonify(todo_list)

@app.route('/api/todos', methods=['POST'])
def add_todo():
    """API endpoint to create a new todo item."""
    global current_id
    data = request.get_json()
    
    if not data or 'task' not in data or not data['task'].strip():
        return jsonify({"error": "Task content cannot be empty"}), 400
        
    new_todo = {
        "id": current_id,
        "task": data['task'].strip()
    }
    todo_list.append(new_todo)
    current_id += 1
    
    return jsonify(new_todo), 201

@app.route('/api/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    """API endpoint to delete a specific todo item by ID."""
    global todo_list
    initial_length = len(todo_list)
    todo_list = [item for item in todo_list if item['id'] != todo_id]
    
    if len(todo_list) == initial_length:
        return jsonify({"error": "Todo item not found"}), 404
        
    return jsonify({"success": True}), 200

if __name__ == '__main__':
    # Running in debug mode makes development easier (auto-reloads on save)
    app.run(debug=True, port=5000)