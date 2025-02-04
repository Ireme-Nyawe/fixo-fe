export interface IUser {
  _id?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  username?: string;
  status?: boolean;
  phone: string
}


export interface ICategory {
  _id: mongoose.Types.ObjectId | string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface IProductCategory {
  _id?: mongoose.Types.ObjectId | string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProduct {
  _id?: mongoose.Types.ObjectId | string;
  name: string;
  description?: string;
  price: number;
  category: ObjectId;
  stock: number;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
}