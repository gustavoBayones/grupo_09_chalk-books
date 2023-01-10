module.exports = function (sequelize, dataTypes) {

    let alias = "Libros";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title:{
            type: dataTypes.STRING,
        } ,
        autors_id:{
            type: dataTypes.INTEGER,
        },
        description:{
            type: dataTypes.STRING,
        },
        price:{
            type: dataTypes.INTEGER,
        },
        stock:{
            type: dataTypes.INTEGER,
        },
        genres_id:{
            type: dataTypes.INTEGER,
        },
        editorial:{
            type: dataTypes.STRING,
        },
        published:{
            type: dataTypes.INTEGER,
        },
        portada:{
            type: dataTypes.STRING,
        }

    };
    let config = {
        tableName: "books",
        timestamps: false
    }


    const Libro = sequelize.define(alias, cols, config);
    
    // Libro.associate = function (models) {
    //     Libro.belongsTo(models.Autor, {
    //       as: 'autor',
    //       foreignKey: 'autors_id',
    //     });
      
    //     Libro.belongsTo(models.Genero, {
    //       as: 'genero',
    //       foreignKey: 'genres_id',
    //     });
    //   };

    return Libro
}