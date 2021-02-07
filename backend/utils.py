import logging
logging.basicConfig(level=logging.NOTSET)
logger = logging.getLogger('casting-app-logger')


def to_dict(orm_instance):
    return {column.name: getattr(orm_instance, column.name)
            for column in orm_instance.__table__.columns}
