export class User {
  id: number = 0;
  username: string = "";
  firstname: string = "";
  lastname: string = "";
  name?: string = "";
  email: string = "";
  avatar: string = "defaultAvatarUrl"; // Replace with your default avatar URL
  title?: string;
  bio?: string;
  dob: string = "";
  gender?: string;
  role?: any = "";
  status?: string = "";
  phone?: string = "";
  claims?: Claim[] = [];
  topics?: Topic[] = [];
  followersCount?: number = 0;
  followers?: User[] = [];
  following?: User[] = [];
  followingCount?: number = 0;
  isFollowing?: boolean = false;
  updatedAt?: string = "";
  createdAt?: string = "";
}

export const emptyUser = new User();

export interface UserRole {}

export interface Claim {
  // Define the Claim interface based on your requirements
}

export interface Topic {
  // Define the Topic interface based on your requirements
}

export const RESOURCE_ACTIONS = {
  LIST: "LIST",
  GET: "GET",
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  CLAIM: "CLAIM",
};

type ResourceActions = {
  LIST: boolean;
  GET: boolean;
  CREATE: boolean;
  UPDATE: boolean;
  DELETE: boolean;
};

const defaultActions: ResourceActions = {
  LIST: true,
  GET: true,
  CREATE: true,
  UPDATE: true,
  DELETE: true,
};

export interface UserPermissions {
  MODERATION: ResourceActions;
}
