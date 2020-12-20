from flask import Flask, request
from flask import jsonify
from werkzeug.exceptions import InternalServerError, BadRequest
from utils import logger, to_dict
app = Flask(__name__)


@app.route("/", methods=['GET'])
def app_index():
    return 'Casting app is working fine. Welcome !!!!'


# Actor API
@app.route("/v1/actors", methods=['POST'])
def create_actor():
    from models import Actor
    req_data = request.get_json()
    actor = Actor.insert(**req_data)
    if actor is None:
        return jsonify({'success': False, 'msg': 'Not able to insert new actor'}), BadRequest
    return jsonify({'success': True, 'data': to_dict(actor)})


@app.route("/v1/actors", methods=['GET'])
def get_actors():
    from models import Actor, CrudHelper
    actors = CrudHelper.get_all(Actor)
    return jsonify({'success': True, 'data': [to_dict(actor) for actor in actors]})


@app.route("/v1/actors/<actor_id>", methods=['DELETE'])
def delete_actor(actor_id):
    from models import Actor
    filter_by = (Actor.id == actor_id)
    actor = Actor.delete(filter_by)
    if actor is None:
        return jsonify({'success': False, 'msg': 'Not able to delete actor!!!!'}), BadRequest
    return jsonify({'success': True})


@app.route("/v1/actors/<actor_id>", methods=['GET'])
def get_actor(actor_id):
    from models import Actor, CrudHelper
    actor = CrudHelper.get(Actor, (Actor.id == actor_id))
    if actor is None:
        return jsonify({'success': False, 'msg': 'Not able to fetch actor'}), BadRequest
    return jsonify({'success': True, 'data': to_dict(actor)})


# Movies API
@app.route("/v1/movies", methods=['GET'])
def get_movies():
    from models import Movie, CrudHelper
    movies = CrudHelper.get_all(Movie)
    return jsonify({'success': True, 'data': [to_dict(movie) for movie in movies]})


@app.route("/v1/movies", methods=['POST'])
def create_movie():
    from models import Movie
    req_data = request.get_json()
    movie = Movie.insert(**req_data)
    if movie is None:
        return jsonify({'success': False, 'msg': 'Not able to insert new actor'}), BadRequest
    return jsonify({'success': True, 'data': to_dict(movie)})


@app.route("/v1/movies/<movie_id>", methods=['GET'])
def get_movie(movie_id):
    from models import Movie, CrudHelper
    movie = CrudHelper.get(Movie, (Movie.id == movie_id))
    if movie is None:
        return jsonify({'success': False, 'msg': 'Not able to fetch movie'}), BadRequest
    return jsonify({'success': True, 'data': to_dict(movie)})


@app.route("/v1/movies/<movie_id>", methods=['DELETE'])
def delete_movie(movie_id):
    from models import Movie
    filter_by = (Movie.id == movie_id)
    movie = Movie.delete(filter_by)
    if movie is None:
        return jsonify({'success': False, 'msg': 'Not able to delete movie!!!!'}), BadRequest
    return jsonify({'success': True})


@app.errorhandler(InternalServerError)
def handle_internal_error(e):
    msg = f'Error processing the request. Reason: {str(e)}'
    logger.error(msg)
    return jsonify({
        'success': False,
        'msg': e.description
    }), e.code


@app.errorhandler(BadRequest)
def handle_client_error(e):
    msg = f'Error processing the request. Reason: {str(e)}'
    logger.error(msg)
    return jsonify({
        'success': False,
        'msg': e.description
    }), e.code

# if __name__ == '__main__':
#     app.run(debug=True)


