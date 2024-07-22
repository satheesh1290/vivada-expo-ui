import { User, emptyUser, UserPermissions } from "../../shared/common/model";

export interface AuthStateModel {
  authStorageType: string;
  token: string;
  expiresAt: number;
  refreshToken: string;
  isSubmittingForm: boolean;
  isUsernameExist: boolean;
  closeLoginForm: boolean;
  isLoggedIn: boolean;
  isChangePasswordEnable: boolean;
  isGoogleLoggedIn: boolean;
  isManualLogIn: boolean;
  verificationEmail: string;
  isEmailOTPGenerated: boolean;
  isEmailVerified: boolean;
  lastLogin: string;
  isSuperAdmin: boolean;
  isFullyAuthenticated: boolean;
  isFetchingCurrentMember: boolean;
  currentMember: User;
  memberShipStatus: string;
  permissions: UserPermissions;
  firstTimeSetup: boolean;
  activationEmailSent: Date;
  subscriptionsInitiated: boolean;
  isNewRegister: boolean;
}

export const defaultAuthState: AuthStateModel = {
  authStorageType: "local", // Implement the getAuthStorageTypeFromClient() logic if needed
  token: "",
  expiresAt: 0,
  refreshToken: "",
  isSubmittingForm: false,
  isUsernameExist: false,
  closeLoginForm: false,
  isLoggedIn: false,
  verificationEmail: "",
  isEmailOTPGenerated: false,
  isChangePasswordEnable: false,
  isGoogleLoggedIn: false,
  isManualLogIn: false,
  isEmailVerified: false,
  lastLogin: "",
  isSuperAdmin: false,
  isFullyAuthenticated: false,
  isFetchingCurrentMember: false,
  currentMember: emptyUser,
  memberShipStatus: "",
  permissions: {} as UserPermissions, // Define default permissions based on your requirements
  firstTimeSetup: false,
  activationEmailSent: new Date("11/11/1111"),
  subscriptionsInitiated: false,
  isNewRegister: false,
};
