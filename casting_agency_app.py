from flask import Flask
from flask import jsonify
app = Flask(__name__)


@app.route("/", methods=['GET'])
def app_index():
    return jsonify({'success': True, 'msg': 'Casting app is working fine. Welcome !!!!'})

