'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { navigate } from '@/lib/utils';

const Login = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { user, error } = await login(formData.email, formData.password);

    if (error) {
      toast({
        title: 'Login Failed',
        description: error,
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    if (user) {
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      });
      navigate('/'); // Redirect to home page after successful login
    }

    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="from-background to-muted/20 flex min-h-screen items-center justify-center bg-gradient-to-br px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        <Card className="glass-card shadow-2xl">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="font-heading text-primary text-3xl font-bold">
              {t('auth.login.title')}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {t('auth.login.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  {t('auth.login.email')}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  {t('auth.login.password')}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    // className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex items-center pr-3 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                // className="bg-accent text-accent-foreground hover:bg-accent/90 w-full"
                // size="lg"
                disabled={loading}
              >
                {loading ? 'Logging in...' : t('auth.login.submit')}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                {t('auth.login.noAccount')}{' '}
                <button
                  onClick={() => navigate('/signup')}
                  // className="text-accent hover:text-accent/80 font-medium transition-colors"
                >
                  {t('auth.login.signUpLink')}
                </button>
              </p>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/')}
                // className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                ← Back to Home
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
