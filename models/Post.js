const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model{}

Post.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
            },
        }
    },
    {
        sequelize,
        timestamps: true, // inits createdAt and updatedAt values
        modelName: 'post',
        freezeTableName: true
    }
)

module.exports = Post;