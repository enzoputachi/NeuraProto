import { AuthContextType, User } from "@/components/types/auth";
import { createContext, ReactNode, useEffect, useState } from "react";


const AuthContext = createContext<AuthContextType | undefined>(undefined);

const baseUrl = import.meta.env.VITE_APP_URL;



interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [ user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Check for existing session on app load
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    setIsLoading(false);
                    return;
                }
                

                // Verify token with backend
                const response = await fetch(`${baseUrl}/verify`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const userData: User = await response.json();
                    setUser(userData);
                } else {
                    localStorage.removeItem('authToken')
                }
               
            } catch (error) {
                console.error();
                localStorage.removeItem('authToken');                
            } finally {
                setIsLoading(false)
            }
        }

        checkAuthStatus()   
    }, [])


    const login = async (email: string, password: string) => {
      try {
        const response = await fetch(`${baseUrl}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Login failed");
        }

        localStorage.setItem('authToken', result.token);
        setUser(result.user);

        return {
          success: true,
          user: result.user,
          token: result.token,
        };
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error ? error.message : "Login failed",
        };
      } finally {
        setIsLoading(false);
      }
    };

    const signup = async ( name: string,   email: string,   password: string ) => {
        try {
          const response = await fetch(`${baseUrl}/users/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
          });

          const result = await response.json();

          if (!response.ok) {
            return {
              success: false,
              message: result.message || "Signup failed",
            };
          }

          // Auto-login after signup
          localStorage.setItem("authToken", result.token);
          setUser(result.user);

          return {
            success: true,
            user: result.user,
            token: result.token,
          };
        } catch (error) {
          return {
            success: false,
            message: error instanceof Error ? error.message : "Signup failed",
          };
        }
      };

    const logout = (): void => {
        localStorage.removeItem("authToken");
        setUser(null);
      };

      const value: AuthContextType = {
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        isLoading,
      };


    return (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export { AuthContext }