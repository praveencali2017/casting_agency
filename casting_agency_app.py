from flask import Flask, request, render_template
from flask import jsonify
from werkzeug.exceptions import InternalServerError, BadRequest
from backend.utils import logger, to_dict
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


@app.route("/")
def dashboard():
    return render_template('index.html')


@app.route("/welcome", methods=['GET'])
def app_index():
    return jsonify({'status': True, 'msg': 'Casting app is working fine. Welcome !!!!'})


# Actor API
@app.route("/v1/actors", methods=['POST'])
def create_actor():
    from backend.models import Actor
    req_data = request.get_json()
    actor = Actor.insert(**req_data)
    return build_orm_json(actor, fail_err_msg='Not able to insert new actor!!!')


@app.route("/v1/actors", methods=['GET'])
def get_actors():
    from backend.models import Actor, CrudHelper
    actors = CrudHelper.get_all(Actor)
    return jsonify({'success': True, 'data': [to_dict(actor) for actor in actors]})


@app.route("/v1/actors/<actor_id>", methods=['DELETE'])
def delete_actor(actor_id):
    from backend.models import Actor
    filter_by = (Actor.id == actor_id)
    actor = Actor.delete(filter_by)
    if actor is None:
        return jsonify({'success': False, 'msg': 'Not able to delete actor!!!'}), BadRequest
    return jsonify({'success': True})


@app.route("/v1/actors/<actor_id>", methods=['GET'])
def get_actor(actor_id):
    from backend.models import Actor, CrudHelper
    actor = CrudHelper.get(Actor, (Actor.id == actor_id))
    return build_orm_json(actor, fail_err_msg='Not able to fetch actor!!!')


@app.route("/v1/actors/<actor_id>", methods=['PATCH'])
def update_actor(actor_id):
    from backend.models import Actor
    req_data = request.get_json()
    # We should not inject id, since we are directly passing request data to model's attributes
    if 'id' in req_data:
        del req_data['id']
    actor = Actor.update((Actor.id == actor_id), **req_data)
    return build_orm_json(actor, fail_err_msg='Cannot update actor!!!')


# Movies API
@app.route("/v1/movies", methods=['GET'])
def get_movies():
    from backend.models import Movie, CrudHelper
    movies = CrudHelper.get_all(Movie)
    return jsonify({'success': True, 'data': [to_dict(movie) for movie in movies]})


@app.route("/v1/movies", methods=['POST'])
def create_movie():
    from backend.models import Movie
    req_data = request.get_json()
    movie = Movie.insert(**req_data)
    return build_orm_json(movie, fail_err_msg='Not able to insert new actor')


@app.route("/v1/movies/<movie_id>", methods=['GET'])
def get_movie(movie_id):
    from backend.models import Movie, CrudHelper
    movie = CrudHelper.get(Movie, (Movie.id == movie_id))
    return build_orm_json(movie, fail_err_msg='Not able to fetch movie!!!')


@app.route("/v1/movies/<movie_id>", methods=['DELETE'])
def delete_movie(movie_id):
    from backend.models import Movie
    filter_by = (Movie.id == movie_id)
    movie = Movie.delete(filter_by)
    return build_orm_json(movie, fail_err_msg='Not able to delete movie!!!')


@app.route("/v1/movies/<movie_id>", methods=['PATCH'])
def update_movie(movie_id):
    from backend.models import Movie
    req_data = request.get_json()
    # We should not inject id, since we are directly passing request data to model's attributes
    if 'id' in req_data:
        del req_data['id']
    movie = Movie.update((Movie.id == movie_id), **req_data)
    return build_orm_json(movie, fail_err_msg='Cannot update movie !!!')


# Association APIS [Movie and Actor]
@app.route("/v1/movie_cast", methods=['POST'])
def create_movie_cast():
    from backend.models import MovieActorLink
    req_data = request.get_json()
    movie_cast = MovieActorLink.insert(**req_data)
    if movie_cast is None:
        return jsonify({'success': False, 'msg': 'Cannot add actor to the movie!!!'})
    return jsonify({'success': True})


@app.route("/v1/movie_cast/movies/<movie_id>", methods=['GET'])
def fetch_movie_actors(movie_id):
    from backend.models import Movie, CrudHelper
    movie = CrudHelper.get(Movie, (Movie.id == movie_id))
    if movie is None:
        return jsonify({'success': False, 'msg': f'Movie with the given id {movie_id} does not exist!!!'})
    actors = movie.actors
    return jsonify({'success': True, 'data': [to_dict(actor) for actor in actors]})


@app.route("/v1/movie_cast/actors/<actor_id>", methods=['GET'])
def fetch_actor_movies(actor_id):
    from backend.models import Actor, CrudHelper
    actor = CrudHelper.get(Actor, (Actor.id == actor_id))
    if actor is None:
        return jsonify({'success': False, 'msg': f'Actor with the given id {actor_id} does not exist!!!'})
    movies = actor.movies
    return jsonify({'success': True, 'data': [to_dict(movie) for movie in movies]})


@app.route("/v1/movie_cast", methods=['DELETE'])
def remove_actor_from_movie():
    from sqlalchemy import and_
    from backend.models import MovieActorLink, CrudHelper
    actor_id = request.args.get('actor_id', None)
    movie_id = request.args.get('movie_id', None)
    if movie_id is None or actor_id is None:
        return jsonify({'success': False, 'msg': 'Actor or Movie is unknown!!! Cannot remove actor from the movie'})
    result = CrudHelper.delete_all(and_(MovieActorLink.actor_id == actor_id,
                                        MovieActorLink.movie_id == movie_id), MovieActorLink)
    if not result:
        return jsonify({'success': False, 'msg': f'Cannot remove the actor with id {actor_id}'})
    return jsonify({'success': True})


def build_orm_json(orm_model, fail_err_msg=None):
    """
    Transform ORM model to json with status code
    :param orm_model: Sqlalchemy orm model
    :param fail_err_msg: custom error message
    :return:
    """
    if orm_model is None:
        return jsonify({'success': False, 'msg': fail_err_msg}), BadRequest
    return jsonify({'success': True, 'data': to_dict(orm_model)})


# Exception Handlers
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


