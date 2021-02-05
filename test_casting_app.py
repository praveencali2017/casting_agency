import unittest
from casting_agency_app import app
from datetime import datetime
from backend.models import db
from config import DB_NAME, AUTH0_DOMAIN, AUTH0_API_AUDIENCE, DATABASE_URI


def get_user_token(user_name, user_type='ep'):
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
            self.assertFalse(msg='Cannot create db!!!!')
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
        response = self.client.post('/v1/actors',json={
            'name': 'prav',
            'age': 30,
            'gender': 'male'
        }, headers = headers_ep, content_type=self.req_content_type)
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

    def create_dummy_movie(self):
        response_add_mov = self.client.post('/v1/movies', json={
            'title': 'test_movie',
            'release_date': datetime.now()
        }, headers=headers_ep, content_type=self.req_content_type)
        return response_add_mov.json


if __name__ == '__main__':
    unittest.main()