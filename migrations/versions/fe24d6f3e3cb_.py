"""empty message

Revision ID: fe24d6f3e3cb
Revises: 312c66fd140f
Create Date: 2021-01-29 16:28:00.396823

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fe24d6f3e3cb'
down_revision = '312c66fd140f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('movies_actors_link_actor_id_fkey', 'movies_actors_link', type_='foreignkey')
    op.drop_constraint('movies_actors_link_movie_id_fkey', 'movies_actors_link', type_='foreignkey')
    op.create_foreign_key('movies_actors_link_movies_cascade', 'movies_actors_link', 'movies', ['movie_id'], ['id'], ondelete='cascade')
    op.create_foreign_key('movies_actors_link_actors_cascade', 'movies_actors_link', 'actors', ['actor_id'], ['id'], ondelete='cascade')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('movies_actors_link_movies_cascade', 'movies_actors_link', type_='foreignkey')
    op.drop_constraint('movies_actors_link_actors_cascade', 'movies_actors_link', type_='foreignkey')
    op.create_foreign_key('movies_actors_link_movie_id_fkey', 'movies_actors_link', 'movies', ['movie_id'], ['id'])
    op.create_foreign_key('movies_actors_link_actor_id_fkey', 'movies_actors_link', 'actors', ['actor_id'], ['id'])
    # ### end Alembic commands ###
