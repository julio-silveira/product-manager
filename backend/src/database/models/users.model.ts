import { Optional } from "sequelize";
import { Column, Table, Model } from "sequelize-typescript";

interface UserAttributes {
	id: number;
	email: string;
	username: string;
	password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

@Table
class Users extends Model<UserAttributes, UserCreationAttributes> {
	@Column
	email!: string;

	@Column
	username!: string;

	@Column
	password!: string;
}

export default Users;
