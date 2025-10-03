"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    sub: string;    // email
    userId: string; // user id
    exp: number;    // expiry
}

export function useAuth(redirect = true) {
    const [user, setUser] = useState<DecodedToken | any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            if (redirect) router.push("/login");
            setLoading(false);
            return;
        }

        try {
            const decoded = jwtDecode<DecodedToken>(token);

            // Check if token expired
            if (decoded.exp * 1000 < Date.now()) {
                localStorage.removeItem("token");
                if (redirect) router.push("/login");
            } else {
                setUser(decoded);
            }
        } catch {
            localStorage.removeItem("token");
            if (redirect) router.push("/login");
        }
        setLoading(false);
    }, [router, redirect]);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        router.push("login");
    };

    return { user, loading, logout };
}