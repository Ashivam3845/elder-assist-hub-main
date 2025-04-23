
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center p-6">
        <h1 className="text-6xl font-bold text-elder-purple mb-4">404</h1>
        <p className="text-xl text-slate-600 mb-6">
          Oops! We couldn't find the page you're looking for.
        </p>
        <Button onClick={() => navigate("/")} size="lg">
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
