export interface IUser {
  _id?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  username?: string;
  status?: boolean;
  phone?: string
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
  category: any;
  stock: number;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMessage {
  _id?: mongoose.Types.ObjectId | string;
  senderId?: mongoose.Types.ObjectId | string;
  receiverId: mongoose.Types.ObjectId | string;
  content: string;
  isRead?: Boolean;
  createdAt?: any;
  updatedAt?: Date;
}

export interface iMessageChat {
  _id?: mongoose.Types.ObjectId | string;
  lastMessage?: string;
  lastMessageDate?: any;
  lastMessageisRead?: Boolean;
  userId?: mongoose.Types.ObjectId | string;
  username?: mongoose.Types.ObjectId | string;
  firstName?: string;
  lastName?: string;
}

export interface SignalData {
  senderId: string;
  receiverId: string;
  offer?: RTCSessionDescriptionInit;
  answer?: RTCSessionDescriptionInit;
  candidate?: RTCIceCandidateInit;
}


export interface Transaction {
  id: string;
  type: 'in' | 'out';
  netIncome: number;
  description: string;
  createdAt: string;
}

export interface IResourceContent {
  _id?: string;
  type: 'article' | 'video' | 'audio' | 'image' | 'pdf';
  title?: string;
  order?: number;
  htmlContent?: string;
  url?: string;
  mimeType?: string;
  fileSize?: number;
  duration?: number;
  caption?: string;
  captionUrl?: string;
  transcript?: string;
  altText?: string;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IResource {
  _id?: string;
  title: string;
  description: string;
  createdBy: string;
  slug?: string;
  category?: string;
  tags?: string[];
  coverImage?: string;
  status?: 'draft' | 'published' | 'archived';
  order?: number;
  contents?: IResourceContent[];
  createdAt?: Date;
  updatedAt?: Date;
}


export interface ITraining {
  _id?: string;
  title: string;
  description?: string;
  category: string;
  coverImage?: string;
  location: string;
  directions: string;
  startTime: string | Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ITrainingStats {
  total: number;
  upcoming: number;
  past: number;
}
