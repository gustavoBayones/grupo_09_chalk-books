module.exports = function (sequelize, dataTypes) {
    let alias = "roles";
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
        tableName: "rol",
        timestamps: false
    }


    const Rol = sequelize.define(alias, cols, config);


    return Rol
}