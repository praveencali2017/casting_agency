"""
Later move this to env file
"""
import logging
logger = logging.getLogger("casting-agency-logger")
DB_NAME = "casting_agency_db"
DATABASE_URI = f"postgresql://postgres@localhost:5432/{DB_NAME}"
