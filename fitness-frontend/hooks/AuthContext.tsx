"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import API from "@/lib/api";

interface Decodedtoken {
    sub: string;    // email
    userId: string;
    exp: number;
}

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const decoded = jwtDecode<Decodedtoken>(token);

                // Check if token expired
                if (decoded.exp * 1000 < Date.now()) {
                    localStorage.removeItem("token");
                    setLoading(false);
                    router.push("/");
                    return;
                }

                // Adds JWT + handles 401
                const res = await API.get(`/users/${decoded.userId}`);
                const userData = typeof res.data === "string" ? JSON.parse(res.data) : res.data;
                setUser(userData);
            } catch (error) {
                console.error("Error fetching user: ", error);
                localStorage.removeItem("token");
                router.push("/");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router]);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/");
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Reusable hook
export const useAuth = () => useContext(AuthContext);