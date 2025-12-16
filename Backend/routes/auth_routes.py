from flask import Blueprint, request, jsonify
from models.user_model import add_user, get_user_by_email
import hashlib

auth_bp = Blueprint("auth_bp", __name__)

# Register User
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    
    if get_user_by_email(email):
        return jsonify({"error": "User already exists"}), 400

    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    add_user(name, email, hashed_password)
    return jsonify({"message": "User registered successfully"}), 201

# Login User
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = get_user_by_email(email)
    if not user:
        return jsonify({"error": "User not found"}), 404

    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    if hashed_password != user[3]:
        return jsonify({"error": "Incorrect password"}), 401

    return jsonify({"message": "Login successful", "user": {"id": user[0], "name": user[1], "email": user[2]}})
