"""
Later move this to env file
"""
import os
DB_NAME = "casting_agency_db"
DATABASE_URI = os.environ.get('DATABASE_URL', f"postgresql://postgres@localhost:5432/{DB_NAME}")


