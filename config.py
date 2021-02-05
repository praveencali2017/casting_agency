"""
Later move this to env file
"""
import os
TESTING_ENV = os.environ.get('TESTING_ENV', False)
DB_NAME = "casting_agency_db" if not TESTING_ENV else "test_casting_agency_db"
DATABASE_URI = os.environ.get('DATABASE_URL', f"postgresql://postgres@localhost:5432/{DB_NAME}")
AUTH0_DOMAIN = os.environ.get('AUTH0_DOMAIN', 'dev-prav-auth.us.auth0.com')
AUTH0_ALGORITHM = os.environ.get('AUTH0_ALGORITHMS', 'RS256')
ALGORITHMS = [AUTH0_ALGORITHM]
AUTH0_API_AUDIENCE = os.environ.get('AUTH0_API_AUDIENCE', 'casting')



