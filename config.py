"""
Later move this to env file (setup.sh)
"""
import os
from backend.utils import logger
DATABASE_URI = os.environ.get('DATABASE_URI')
AUTH0_DOMAIN = os.environ.get('AUTH0_DOMAIN')
ALGORITHMS = [os.environ.get('AUTH0_API_ALGORITHMS')]
AUTH0_API_AUDIENCE = os.environ.get('AUTH0_API_AUDIENCE')
AUTH0_CLIENT_ID = os.environ.get('AUTH0_CLIENT_ID')
AUTH0_CLIENT_SECRET = os.environ.get('AUTH0_CLIENT_SECRET')
# Enable while local testing
TESTING = os.environ.get('TESTING', False)
if TESTING:
    ASSISTANT = os.environ.get('ASSISTANT')
    DIRECTOR = os.environ.get('DIRECTOR')
    PRODUCER = os.environ.get('PRODUCER')
    DATABASE_URI = os.environ.get('TESTING_DATABASE_URI')
logger.info("Initialized all the env variables in the"
            " config constants (config.py)!!!")
