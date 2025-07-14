import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

interface SignupProps {
  onToggleMode: () => void;
}

const Signup = ({ onToggleMode }: SignupProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Signup attempt:', formData);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-sm mx-auto border rounded-2xl p-6">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-50">Create account</h2>
        <p className="text-gray-60 mt-1 text-sm">Join us and start your journey</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name" className="text-sm">Full Name</Label>
          <div className="relative">
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className="pl-8 text-sm text-black"
              required
            />
            <User className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="email" className="text-sm">Email</Label>
          <div className="relative">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="pl-8 sm:h-0 md:h-8 text-sm text-black"
              required
            />
            <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="password" className="text-sm">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className="pl-8 pr-8 sm:h-0 md:h-8 text-sm text-black"
              required
            />
            <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="pl-8 pr-8 sm:h-0 md:h-8 text-sm text-black"
              required
            />
            <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            </button>
          </div>
        </div>
        <br />
        <Button 
          type="submit" 
          onClick={handleSubmit}
          className="w-full bg-red-500 hover:bg-red-600 sm:h-0 md:h-8 text-sm"
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </Button>
      </div>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={onToggleMode}
          className="text-red-500 hover:text-red-600 font-medium text-sm"
        >
          Already have an account? Sign in
        </button>
      </div>
    </div>
  );
};

export default Signup;