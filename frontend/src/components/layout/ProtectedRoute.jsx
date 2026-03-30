import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../features/auth/useAuthStore";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const fetchMe = useAuthStore((state) => state.fetchMe);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchMe().finally(() => {
      if (mounted) setReady(true);
    });
    return () => {
      mounted = false;
    };
  }, [fetchMe]);

  if (!ready) {
    return <div className="min-h-screen grid place-items-center text-slate-300">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}