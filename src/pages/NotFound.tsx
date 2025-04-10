
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-orange-600 p-6">
          <div className="flex justify-center">
            <AlertTriangle className="h-16 w-16 text-white" />
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Page Not Found</h1>
          <p className="text-gray-600 mb-6 text-center">
            We couldn't find the page you were looking for. It might have been moved, deleted, or never existed.
          </p>
          <div className="flex justify-center">
            <Link to="/">
              <Button variant="default" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
