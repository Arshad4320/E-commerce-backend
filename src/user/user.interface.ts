interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  role?: "admin" | "seller" | "buyer";
  avatar?: string;
}
export default IUser;
