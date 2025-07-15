
import { Button } from '@/components/ui/button';
import { Bell, LogOut, Search, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = () => {
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/');
  };

  const handleHome = () => {
    navigate('/')
  }

  return (
    <nav className="bg-[#1A1D23] border-b border-[#2A2F36] px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
         <button
          onClick={handleHome}
         >
           <img 
            src="/logo.png" 
            alt="NeuraBridge" 
            className="h-8 rounded-2xl" 
          />
         </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-[#B0B0B0]">
            <User className="w-4 h-4" />
            <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleSignOut}
            className="border-[#2A2F36] text-[#B0B0B0] hover:bg-[#2A2F36] hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;