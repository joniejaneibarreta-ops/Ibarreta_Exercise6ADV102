import { createContext, ReactNode, useContext, useState } from "react";

type User = {
  email: string;
  nickname?: string;
  profileImage?: string;
};

type AuthContextType = {
  user: User | null;
  registered: boolean;
  needsSetup: boolean;
  register: (email: string) => void;
  login: (email: string) => void;
  logout: () => void;
  updateProfile: (name: string, imageUri: string | null) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);
  const [needsSetup, setNeedsSetup] = useState(false);

  function register(email: string) {
    setRegisteredEmail(email);

    // create temporary user
    setUser({ email });

    // require setup page
    setNeedsSetup(true);
  }

  function login(email: string) {
    if (email === registeredEmail) {
      setUser({ email });
    }
  }

  function logout() {
    setUser(null);
    setNeedsSetup(false);
  }

  function updateProfile(name: string, imageUri: string | null) {
    setUser((prev) => {
      const email = prev?.email || registeredEmail || "";
      return {
        email,
        nickname: name,
        profileImage: imageUri ?? prev?.profileImage,
      };
    });

    // setup completed
    setNeedsSetup(false);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        registered: !!registeredEmail,
        needsSetup,
        register,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext missing");
  return context;
}
