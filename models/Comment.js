const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model{}

Comment.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id'
            },
        },
        post_id: {
            type: DataTypes.UUID,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true, // inits createdAt and updatedAt values
        modelName: 'comment',
        freezeTableName: true
    }
)

module.exports = Comment;