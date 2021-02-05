import unittest
from casting_agency_app import app
from datetime import datetime
from backend.models import db
from config import DB_NAME, AUTH0_DOMAIN, AUTH0_API_AUDIENCE, DATABASE_URI


def get_user_token(user_type='ep'):
    import json
    import requests
    users = {
        'ep': {'test_executive_prod@pravcasting.com': 'pravCasting2021'},
        'cd': {'test_casting_dir@pravcasting.com': 'pravCasting2021'},
        'ca': {'test_casting_assist@pravcasting.com': 'pravCasting2021'}
    }
    url = f'https://{AUTH0_DOMAIN}/oauth/token'
    headers = {'content-type': 'application/json'}
    user_email = list(users[user_type].keys())[0]
    password = users[user_type][user_email]
    parameter = { "client_id": "DavU4i56mMk4qPck3ruSla263xEczzJ5",
                  "client_secret": "oFhSZCsuq7KD-aTcwN1YFUaOQU8aCxTAzNYoi7YlQ2MWK3mfPQ-xAYoYTq7A1gE6",
                  "audience": AUTH0_API_AUDIENCE,
                  "grant_type": "password",
                  "username": user_email,
                  "password": password}
    resdata = json.loads(requests.post(url, json=parameter, headers=headers).text)
    return resdata['access_token']


headers_ep = {
            'authorization': f"Bearer {get_user_token('ep')}"
        }
headers_cd = {
            'authorization': f"Bearer {get_user_token('cd')}"
        }
headers_ca = {
    'authorization': f"Bearer {get_user_token('ca')}"
}

class CastingTestCase(unittest.TestCase):
    """
    This class represents the test cases for the casting app
    """
    def setUp(self):
        """
        Executed before each test case. Place to define test variables required for test cases.
        :return:
        """
        from sqlalchemy_utils import create_database, database_exists
        app.config['TESTING'] = True
        self.database_uri = DATABASE_URI
        # db.create_all(app=app)
        self.client = app.test_client()
        self.app = app
        if 'test' not in self.database_uri:
            self.skipTest(reason='Cannot create db!!!!')
        if not database_exists(self.database_uri):
            create_database(self.database_uri)
        db.create_all()
        self.req_content_type = 'application/json'

    def tearDown(self):
        # Todo: Clean resources after test cases
        db.drop_all()

    # Movie API Test cases #######

    def test_add_movie_success(self):
        """
        Test the post method to add the new movie to the system
        :return: None
        """
        response = self.client.post('/v1/movies',json={
            'title': 'test_movie',
            'release_date': datetime.now()
        }, headers = headers_ep, content_type = self.req_content_type)
        self.assertEqual(200, response.status_code)
        res_data = response.json
        self.assertEqual(True, res_data['success'])
        self.assertEqual('test_movie', res_data['data']['title'])

    def test_add_movie_fail(self):
        """
        Test the post method fail while adding the new movie to the system (title cannot be null)
        :return: None
        """
        response = self.client.post('/v1/movies',json={
            'title': None,
            'release_date': datetime.now()
        }, headers = headers_ep, content_type = self.req_content_type)
        self.assertEqual(400, response.status_code)

    def test_get_movie_success(self):
        """
        Test the get method, that fetches available movies
        :return: None
        """
        self.create_dummy_movie()
        response = self.client.get('/v1/movies', headers = headers_ep, content_type = self.req_content_type)
        res_data = response.json
        self.assertListEqual([1, 200], [len(res_data['data']), response.status_code])

    def test_get_movie_fail(self):
        """
        Test the get method (Fail), that fetches available movies (Typo error, it has to be /movies)
        :return: None
        """
        response = self.client.get('/v1/movie', headers = headers_ep, content_type = self.req_content_type)
        self.assertEqual(404, response.status_code)

    def test_movie_update(self):
        """
        Test the patch method for movie update.
        :return:
        """
        res_data = self.create_dummy_movie()
        movie = res_data['data']
        response = self.client.patch(f'/v1/movies/{movie["id"]}', json={'title': 'test_movie_update'
        }, headers=headers_ep, content_type=self.req_content_type)
        self.assertEqual('test_movie_update', response.json['data']['title'])

    def test_movie_update_fail(self):
        """
        Test the patch method for movie update (Failure, Try to update movie, with the movie id that doesn't exists)
        :return:
        """
        res_data = self.create_dummy_movie()
        _ = res_data['data']
        response = self.client.patch(f'/v1/movies/nf', json={'title': 'test_movie_update'
        }, headers=headers_ep, content_type=self.req_content_type)
        self.assertEqual(400, response.status_code)

    def test_movie_delete_success(self):
        """
        Test the movie delete API.
        :return:
        """
        res_data = self.create_dummy_movie()
        movie = res_data['data']
        response = self.client.delete(f'/v1/movies/{movie["id"]}', headers=headers_ep, content_type=self.req_content_type)
        self.assertEqual(200, response.status_code)
        response = self.client.get(f'/v1/movies', headers=headers_ep,
                                      content_type=self.req_content_type)
        self.assertEqual(0, len(response.json['data']))

    def test_movie_delete_fail(self):
        """
        Test the movie delete API. Failure (Cannot delete a movie with wrong id)
        :return:
        """
        res_data = self.create_dummy_movie()
        _ = res_data['data']
        response = self.client.delete(f'/v1/movies/wrong_id', headers=headers_ep, content_type=self.req_content_type)
        self.assertEqual(400, response.status_code)



    # Actor API test cases #######

    def test_add_actor_success(self):
        """
        Test the post method, that adds new actor to the system
        :return: None
        """
        response = self.create_dummy_actor()
        self.assertEqual(200, response.status_code)
        res_data = response.json
        self.assertListEqual(['prav', True], [res_data['data']['name'], res_data['success']])

    def test_add_actor_fail(self):
        """
        Test the post method, that adds new actor to the system (Should fail, since age is not a number)
        :return: None
        """
        response = self.client.post('/v1/actors',json={
            'name': 'prav',
            'age': 'NAN',
            'gender': 'male'
        }, headers = headers_ep, content_type=self.req_content_type)
        self.assertEqual(400, response.status_code)

    def test_update_actor_success(self):
        """
        Test the update method, that update the existing actor database object
        :return:
        """
        res_data = self.create_dummy_actor(need_response_obj=False)
        actor = res_data['data']
        response = self.client.patch(f'/v1/actors/{actor["id"]}', json={
            'name': 'john',
            'age': 31,
            'gender': 'male'
        }, headers=headers_ep, content_type=self.req_content_type)
        self.assertEqual(200, response.status_code)
        res_data = response.json['data']
        self.assertListEqual(['john', 31],[res_data['name'], res_data['age']])

    def test_update_actor_failure(self):
        """
        Test the update method. Failure (try to update age with nan)
        :return:
        """
        res_data = self.create_dummy_actor(need_response_obj=False)
        actor = res_data['data']
        response = self.client.patch(f'/v1/actors/{actor["id"]}', json={
            'name': 'john',
            'age': 'nan',
            'gender': 'male'
        }, headers=headers_ep, content_type=self.req_content_type)
        self.assertEqual(400, response.status_code)

    def test_get_actors_success(self):
        """
        Test fetch actors endpoint.
        :return:
        """
        # we don't have any unique constraint defined, so let's create same record twice and validate the count
        _ = self.create_dummy_actor(need_response_obj=False)
        _ = self.create_dummy_actor(need_response_obj=False)
        response = self.client.get(f'/v1/actors', headers=headers_ep, content_type=self.req_content_type)
        res_data = response.json['data']
        self.assertEqual(2, len(res_data))

    def test_get_actors_failure(self):
        """
        Test fetch actors endpoint. Failure (Wrong endpoint : typo)
        :return:
        """
        # we don't have any unique constraint defined, so let's create same record twice and validate the count
        _ = self.create_dummy_actor(need_response_obj=False)
        _ = self.create_dummy_actor(need_response_obj=False)
        response = self.client.get(f'/v1/actor', headers=headers_ep, content_type=self.req_content_type)
        self.assertEqual(404, response.status_code)

    def test_delete_actors_success(self):
        """
        Test the delete actors endpoint
        :return:
        """
        actor = self.create_dummy_actor(need_response_obj=False)['data']
        response = self.client.delete(f'/v1/actors/{actor["id"]}', headers=headers_ep, content_type=self.req_content_type)
        self.assertEqual(200, response.status_code)
        self.assertEqual(True, response.json['success'])

    def test_delete_actors_failure(self):
        """
        Test the delete actors endpoint. Failure(Trying to delete with actor id that is not found)
        :return:
        """
        _ = self.create_dummy_actor(need_response_obj=False)['data']
        response = self.client.delete(f'/v1/actors/22', headers=headers_ep, content_type=self.req_content_type)
        self.assertEqual(400, response.status_code)
        self.assertEqual(False, response.json['success'])

    # Movie cast API test cases !!!
    def test_movie_cast_add_success(self):
        """
        Creates movie, actor and associate both (inserts to movie_actors_link table).
        Later will validate whether the endpoint returns success on association
        :return:
        """
        movie = self.create_dummy_movie()['data']
        actor = self.create_dummy_actor(need_response_obj=False)['data']
        response = self.client.post('/v1/movies_cast', json={
            'movie_id': movie['id'],
            'actor_id': actor['id']
        }, headers=headers_ep, content_type=self.req_content_type)
        self.assertEqual(200,response.status_code)
        self.assertEqual(True, response.json['success'])

    def test_movie_cast_add_failure(self):
        """
        Check for actor id, that doesn't exists.
        Failure: Since there is no id exists in the system and association should cause error
        :return:
        """
        movie = self.create_dummy_movie()['data']
        actor = self.create_dummy_actor(need_response_obj=False)['data']
        response = self.client.post('/v1/movies_cast', json={
            'movie_id': movie['id'],
            'actor_id': int(actor['id'])+1
        }, headers=headers_ep, content_type=self.req_content_type)
        self.assertEqual(400,response.status_code)
        self.assertEqual(False, response.json['success'])

    def test_movie_cast_get_success(self):
        """
        Fetches movie_cast records
        Success: Get movie_cast records from movie_actors_link table
        :return:
        """
        movie = self.create_dummy_movie()['data']
        actor = self.create_dummy_actor(need_response_obj=False)['data']
        response = self.client.post('/v1/movies_cast', json={
            'movie_id': movie['id'],
            'actor_id': actor['id']
        }, headers=headers_ep, content_type=self.req_content_type)
        # Now, let's try to fetch from movies_cast endpoint. It should give back movie and actor ids (association)
        res_validate = self.client.get('/v1/movies_cast', headers=headers_ep, content_type=self.req_content_type)
        res_data = res_validate.json['data'][0]
        res_actor = res_data['actors'][0]
        res_movie = res_data['movie']
        self.assertEqual(200,res_validate.status_code)
        self.assertEqual(movie, res_movie)
        self.assertEqual(actor, res_actor)

    def test_movie_cast_get_failure(self):
        """
        Fetches movie_cast records
        Failure: Typo error
        :return:
        """
        movie = self.create_dummy_movie()['data']
        actor = self.create_dummy_actor(need_response_obj=False)['data']
        _ = self.client.post('/v1/movies_cast', json={
            'movie_id': movie['id'],
            'actor_id': actor['id']
        }, headers=headers_ep, content_type=self.req_content_type)
        # Now, let's try to fetch from movies_cast endpoint. Should Fail, since there is a typo in the endpoint url
        res_validate = self.client.get('/v1/movie_cast', headers=headers_ep, content_type=self.req_content_type)
        self.assertEqual(404, res_validate.status_code)

    def test_delete_actor_from_movie_success(self):
        """
        Validates delete endpoint for movies cast API
        Success: Should return success as True
        :return:
        """
        movie = self.create_dummy_movie()['data']
        actor = self.create_dummy_actor(need_response_obj=False)['data']
        _ = self.client.post('/v1/movies_cast', json={
            'movie_id': movie['id'],
            'actor_id': actor['id']
        }, headers=headers_ep, content_type=self.req_content_type)
        # Let's use the movie's id and actor's id to delete the association
        response = self.client.delete(f'/v1/movies_cast?movie_id={movie["id"]}&actor_id={actor["id"]}',
                                      headers=headers_ep, content_type=self.req_content_type)
        self.assertEqual(200, response.status_code)
        self.assertEqual(True, response.json['success'])

    def test_delete_actor_from_movie_failure(self):
        """
        Validates delete endpoint for movies cast API
        Failure: Should return success as False. Reason, wrong movie id
        :return:
        """
        movie = self.create_dummy_movie()['data']
        actor = self.create_dummy_actor(need_response_obj=False)['data']
        _ = self.client.post('/v1/movies_cast', json={
            'movie_id': movie['id'],
            'actor_id': actor['id']
        }, headers=headers_ep, content_type=self.req_content_type)
        # Let's use the dummy movie id to break the case (Not found)
        movie_id = int(movie["id"]+10)
        response = self.client.delete(f'/v1/movies_cast?movie_id={movie_id}&actor_id={actor["id"]}',
                                      headers=headers_ep, content_type=self.req_content_type)
        self.assertEqual(400, response.status_code)
        self.assertEqual(False, response.json['success'])

    # RBAC test cases!!!
    def test_executive_producer_create_movie(self):
        """
        Executive producer should be able to create a movie
        :return:
        """
        response = self.client.post('/v1/movies', json={
            'title': 'test_movie_ep',
            'release_date': datetime.now()
        }, headers=headers_ep, content_type=self.req_content_type)
        self.assertEqual(200, response.status_code)

    def test_executive_producer_create_actor(self):
        """
        Executive producer should be able to create a actor (Since this role has all the permissions of the casting director)
        :return:
        """
        response = self.client.post('/v1/actors', json={
            'name': 'test_name_ep',
            'age': 30,
            'gender': 'female'
        }, headers=headers_ep, content_type=self.req_content_type)
        self.assertEqual(200, response.status_code)

    def test_casting_director_create_movie(self):
        """
        Casting director cannot create a movie. This should raise unauthorized error in the response
        :return:
        """
        response = self.client.post('/v1/movies', json={
            'title': 'test_movie_ep',
            'release_date': datetime.now()
        }, headers=headers_cd, content_type=self.req_content_type)
        self.assertEqual(401, response.status_code)

    def test_casting_director_create_actor(self):
        """
        Casting director should be able to create an actor
        :return:
        """
        response = self.client.post('/v1/actors', json={
            'name': 'test_name_cd',
            'age': 30,
            'gender': 'female'
        }, headers=headers_cd, content_type=self.req_content_type)
        self.assertEqual(200, response.status_code)

    def test_casting_assistant_create_actor(self):
        """
        Casting assistant cannot create actor
        :return:
        """
        response = self.client.post('/v1/actors', json={
            'name': 'test_name_ca',
            'age': 30,
            'gender': 'female'
        }, headers=headers_ca, content_type=self.req_content_type)
        self.assertEqual(401, response.status_code)

    def test_casting_assistant_get_actor(self):
        """
        Casting assistant cannot create actor
        :return:
        """
        actor = self.create_dummy_actor(need_response_obj=False)['data']
        response = self.client.get('/v1/actors', headers=headers_ca, content_type=self.req_content_type)
        self.assertEqual(200, response.status_code)
        self.assertEqual(actor['name'], response.json['data'][0]['name'])

    # End of test cases !!!!!

    def create_dummy_movie(self):
        response_add_mov = self.client.post('/v1/movies', json={
            'title': 'test_movie',
            'release_date': datetime.now()
        }, headers=headers_ep, content_type=self.req_content_type)
        return response_add_mov.json

    def create_dummy_actor(self, need_response_obj=True):
        response = self.client.post('/v1/actors', json={
            'name': 'prav',
            'age': 30,
            'gender': 'male'
        }, headers=headers_ep, content_type=self.req_content_type)
        return response if need_response_obj else response.json



if __name__ == '__main__':
    unittest.main()