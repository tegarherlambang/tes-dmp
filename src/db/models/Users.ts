import {DataType, DataTypes, Model, Optional} from "sequelize";
import db from "../../config/db";

interface UserAttributes {
    id?:number,
    username?:string|null,
    password?: string|null,
    createdAt?:Date,
    updatedAt?:Date
}

export interface UsersInput extends Optional<UserAttributes,'id'>{}
export interface UsersOutput extends Required<UserAttributes>{}

class Users extends Model<UserAttributes, UsersInput> implements UserAttributes{
    public id!:number
    public username!:string
    public password!:string
    public readonly createdAt!: Date;
    public readonly updatedAt!:Date;
}

Users.init({
    id:{
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        type:DataTypes.BIGINT
    },
    username:{
        allowNull:true,
        type:DataTypes.STRING
    },
    password:{
        allowNull:true,
        type:DataTypes.STRING
    }
},{
    timestamps:true,
    sequelize:db,
    underscored:false
})

export default Users