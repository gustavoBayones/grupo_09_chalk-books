module.exports = function (sequelize, dataTypes) {
    let alias = "Generos";
    const Libro = require('./Libro')(sequelize, dataTypes);
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING,
        } ,
    };
    let config = {
        tableName: "genres",
        timestamps: false
    }


    const Genero = sequelize.define(alias, cols, config);
    // Genero.associate = function (models) {
    //     Genero.hasMany(models.Libro, {
    //       as: 'libros',
    //       foreignKey: 'genres_id',
    //     });
    //   };

    return Genero
}