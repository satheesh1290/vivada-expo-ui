import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthStateModel, defaultAuthState } from "./auth.model";
import LOGIN_MUTATION from "../../components/mutations/login_mutation";
import { apolloClient } from "../../providers/apollo";
import { jwtDecode } from "jwt-decode";

type AuthStore = AuthStateModel & {
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  getDecodedToken: (token: string) => { userId: number };
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  ...defaultAuthState,
  login: async ({ email, password }) => {
    set({ isSubmittingForm: true });
    try {
      const { data } = await apolloClient.mutate({
        mutation: LOGIN_MUTATION,
        variables: { email, password },
      });
      const response = data.tokenAuth;
      if (response.success) {
        const token = response.token;
        const refreshToken = response.refreshToken;
        const user = response.user;
        const { userId } = get().getDecodedToken(token);
        console.log(userId);

        set({
          token,
          refreshToken,
          currentMember: { ...user, id: userId },
          isLoggedIn: true,
          lastLogin: user.lastLogin,
          isGoogleLoggedIn: user.googleLogin,
          isSubmittingForm: false,
        });
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("refreshToken", refreshToken);
      } else {
        set({ isSubmittingForm: false });
        console.error("Login error:", response.errors);
      }
    } catch (error: any) {
      set({ isSubmittingForm: false });
      console.error("Login error:", error.message);
    }
  },
  logout: () => {
    set({
      ...defaultAuthState,
    });
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("refreshToken");
  },

  getDecodedToken: (token: string) => {
    const decodedToken: any = jwtDecode(token);
    const expiresAt = decodedToken.exp * 1000; // Convert to milliseconds
    set({ expiresAt });
    return {
      userId: decodedToken.sub,
    };
  },
}));
