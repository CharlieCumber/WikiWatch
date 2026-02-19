"""created timestamp

Revision ID: 10d1615b80b7
Revises: 22c7200e254
Create Date: 2023-05-01 16:33:24.853645

"""

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "0d1615b80b7"
down_revision = "22c7200e254"
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table("edit_event", schema=None) as batch_op:
        batch_op.add_column(
            sa.Column("created", sa.DateTime(timezone=True), nullable=True)
        )


def downgrade():
    with op.batch_alter_table("edit_event", schema=None) as batch_op:
        batch_op.drop_column("created")
