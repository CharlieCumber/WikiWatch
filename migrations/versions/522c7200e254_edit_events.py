"""edit events

Revision ID: 522c7200e254
Revises:
Create Date: 2023-05-01 16:04:04.715035

"""

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "22c7200e254"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "edit_event",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("page_title", sa.String(length=300), nullable=True),
        sa.Column("change_size", sa.Integer(), nullable=True),
        sa.Column("is_anon", sa.Boolean(), nullable=True),
        sa.Column("is_bot", sa.Boolean(), nullable=True),
        sa.Column("is_minor", sa.Boolean(), nullable=True),
        sa.Column("is_new", sa.Boolean(), nullable=True),
        sa.Column("is_unpatrolled", sa.Boolean(), nullable=True),
        sa.Column("user", sa.String(length=300), nullable=True),
        sa.Column("city", sa.String(length=300), nullable=True),
        sa.Column("country", sa.String(length=300), nullable=True),
        sa.Column("region", sa.String(length=300), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )


def downgrade():
    op.drop_table("edit_event")
