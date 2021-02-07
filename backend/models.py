from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from flask_sqlalchemy import SQLAlchemy
from config import DATABASE_URL
# Comment in debug mode!!!
from casting_agency_app import app
from sqlalchemy.orm import relationship
from backend.utils import logger
db = SQLAlchemy()

'''
setup_db(app)
    binds a flask application and a SQLAlchemy service
'''


def setup_db(app, db_uri):
    app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)


# Wire db to the app. Comment in debug mode
setup_db(app, DATABASE_URL)

"""
Models definitions. Includes a helper class that defines
insert, get, get all, update, delete and delete all
"""


class CRUDMain(db.Model):
    __abstract__ = True

    @classmethod
    def insert(cls, **kwargs):
        try:
            instance = cls()
            for key, value in kwargs.items():
                setattr(instance, key, value)
            db.session.add(instance)
            db.session.commit()
            return instance
        except Exception as e:
            logger.error(
                f'Cannot insert new record for '
                f'Reason: {str(e)}')
            return None

    @classmethod
    def update(cls, filter_by, **kwargs):
        try:
            instance = db.session.query(cls).filter(filter_by).one()
            if instance is None:
                logger.error(
                    f'Cannot find the instance'
                    f' with filter {filter_by}')
                return None
            for key, value in kwargs.items():
                setattr(instance, key, value)
            db.session.commit()
            return instance
        except Exception as e:
            logger.error(
                f'Cannot Update instance!!!! Reason: {str(e)}')
            return None

    @classmethod
    def delete(cls, filter_by):
        if filter_by is None:
            logger.error(
                'Cannot delete record as '
                'filter by for delete is unknown!!!!')
            return None
        try:
            instance = db.session.query(cls)\
                .filter(filter_by).one()
            if instance is None:
                logger.error(
                    f'Cannot find the instance for the '
                    f'given model {cls}'
                    f' with filter {filter_by}')
                return None
            db.session.delete(instance)
            db.session.commit()
            return instance
        except Exception as e:
            logger.error(
                f'Cannot delete {cls}'
                f' instance!!!! Reason: {str(e)}')
            return None

    @classmethod
    def delete_all(cls, filter_by):
        if filter_by is None:
            logger.error(
                'Cannot delete record as '
                'filter by for delete is unknown!!!!')
            return None
        try:
            instances_deleted = db.session.query(
                cls).filter(filter_by).delete()
            db.session.commit()
            return instances_deleted >= 1
        except Exception as e:
            logger.error(
                f'Cannot delete {cls}'
                f' instance!!!! Reason: {str(e)}')
            return None

    @classmethod
    def get_all(cls, filter_by=None):
        if filter_by is not None:
            return db.session.query(cls)\
                .filter(filter_by).all()
        return db.session.query(cls).all()

    @classmethod
    def get(cls, filter_by):
        return db.session.query(cls)\
            .filter(filter_by).one()


class Movie(CRUDMain):
    __tablename__ = 'movies'
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    release_date = Column(DateTime, nullable=False)
    actors = relationship('Actor', secondary='movies_actors_link')


class Actor(CRUDMain):
    __tablename__ = 'actors'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String, nullable=False)
    movies = relationship('Movie', secondary='movies_actors_link')


class MovieActorLink(CRUDMain):
    __tablename__ = "movies_actors_link"
    movie_id = Column(
        Integer,
        ForeignKey(
            'movies.id',
            ondelete='cascade'),
        primary_key=True)
    actor_id = Column(
        Integer,
        ForeignKey(
            'actors.id',
            ondelete='cascade'),
        primary_key=True)
