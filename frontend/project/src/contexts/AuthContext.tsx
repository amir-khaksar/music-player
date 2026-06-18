import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

type AuthContextType = {
    session: Session | null;
    role: string | null;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
    session: null,
    role: null,
    loading: true,
});

const fetchRole = async (userId: string) => {
    const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

    if (error) {
        console.error("error:", error.message);
        return null;
    }
    return data?.role ?? null;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);

            if (data.session) {
                setRole(await fetchRole(data.session.user.id));
            }
            setLoading(false);
        };

        init();

        const { data: listener } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setSession(session);
                setRole(session ? await fetchRole(session.user.id) : null);
            },
        );

        return () => listener.subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ session, role, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
