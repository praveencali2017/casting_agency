from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from flask_sqlalchemy import SQLAlchemy
from config import DATABASE_URI
from casting_agency_app import app
from sqlalchemy.orm import relationship
from config import logger
db = SQLAlchemy()

'''
setup_db(app)
    binds a flask application and a SQLAlchemy service
'''


def setup_db(app):
    app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URI
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)


'''
db_drop_and_create_all()
    drops the database tables and starts fresh
    can be used to initialize a clean database
    !!NOTE you can change the database_filename variable to have multiple verisons of a database
'''


def db_drop_and_create_all():
    db.drop_all()
    db.create_all()


# Wire db to the app
setup_db(app)

"""
Models definitions
"""


class CrudHelper:

    @staticmethod
    def insert(model_class=None, **kwargs):
        if model_class is None:
            logger.error('Cannot perform insert when model is not supplied!!!!')
            return None
        try:
            instance = model_class()
            for key, value in kwargs.items():
                setattr(instance, key, value)
            db.session.add(instance)
            db.session.commit()
            return instance
        except Exception as e:
            logger.error(f'Cannot insert new record for model class {model_class}!!!! Reason: {str(e)}')
            return None

    @staticmethod
    def update(filter_by, model_class=None, **kwargs):
        if model_class is None or filter_by is None:
            logger.error('Cannot update Model as model or filter by for update is unknown!!!!')
            return None
        try:
            instance = db.session.query(model_class).filter(filter_by)
            if instance is None:
                logger.error(f'Cannot find the instance for the given model class {model_class} with filter {filter_by}')
                return None
            for key, value in kwargs.items():
                setattr(instance, key, value)
            db.session.commit()
            return instance
        except Exception as e:
            logger.error(f'Cannot Update {model_class} instance!!!! Reason: {str(e)}')
            return None

    @staticmethod
    def delete(filter_by, model_class=None):
        if model_class is None or filter_by is None:
            logger.error('Cannot delete record as model class or filter by for delete is unknown!!!!')
            return None
        try:
            instance = db.session.query(model_class).filter(filter_by)
            if instance is None:
                logger.error(
                    f'Cannot find the instance for the given model class {model_class} with filter {filter_by}')
                return None
            db.session.delete(instance)
            db.session.commit()
            return instance
        except Exception as e:
            logger.error(f'Cannot delete {model_class} instance!!!! Reason: {str(e)}')
            return None


class Movie(db.Model):
    __tablename__ = 'movies'
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    release_date = Column(DateTime, nullable=False)
    actors = relationship('Actor', secondary= 'movie_actor_link')

    @classmethod
    def insert(cls,**kwargs):
        return CrudHelper.insert(cls, **kwargs)

    @classmethod
    def update(cls, filter_by, **kwargs):
        return CrudHelper.update(filter_by=filter_by, model_class=cls, **kwargs)

    @classmethod
    def delete(cls, filter_by):
        return CrudHelper.delete(filter_by=filter_by, model_class=cls)


class Actor(db.Model):
    __tablename__ = 'actors'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String, nullable=False)
    movies = relationship('Movie', secondary='movie_actor_link')

    @classmethod
    def insert(cls, **kwargs):
        return CrudHelper.insert(cls, **kwargs)

    @classmethod
    def update(cls, filter_by, **kwargs):
        return CrudHelper.update(filter_by=filter_by, model_class=cls, **kwargs)

    @classmethod
    def delete(cls, filter_by):
        return CrudHelper.delete(filter_by=filter_by, model_class=cls)


class MovieActorLink(db.Model):
    __tablename__ ="movies_actors_link"
    movie_id = Column(Integer, ForeignKey('movies.id'), primary_key= True)
    actor_id = Column(Integer, ForeignKey('actors.id'), primary_key = True)

    @classmethod
    def insert(cls, **kwargs):
        return CrudHelper.insert(cls, **kwargs)

    @classmethod
    def update(cls, filter_by, **kwargs):
        return CrudHelper.update(filter_by=filter_by, model_class=cls, **kwargs)

    @classmethod
    def delete(cls, filter_by):
        return CrudHelper.delete(filter_by=filter_by, model_class=cls)
