"""
Later move this to env file
"""
import os
from dotenv import load_dotenv
from backend.utils import logger
load_dotenv()
DATABASE_URI = os.getenv('DATABASE_URI', None)
AUTH0_DOMAIN = os.getenv('AUTH0_DOMAIN', None)
ALGORITHMS = ['RS256']
AUTH0_API_AUDIENCE = os.getenv('AUTH0_API_AUDIENCE', None)
AUTH0_CLIENT_ID = os.getenv('AUTH0_CLIENT_ID', None)
AUTH0_CLIENT_SECRET = os.getenv('AUTH0_CLIENT_SECRET', None)
logger.info("Initialized all the env variables in config constants!!!")





