import { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/firebase';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SignupFormProps {
  onSwitchToLogin: () => void;
  onSignupSuccess?: () => void;
}

export function SignupForm({ onSwitchToLogin, onSignupSuccess }: SignupFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      if (onSignupSuccess) onSignupSuccess();
      navigate('/');
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign up was cancelled. Please try again.');
      } else {
        setError('Failed to sign up with Google. Please try again.');
      }
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (onSignupSuccess) onSignupSuccess();
      navigate('/');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists. Please sign in instead.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address. Please check and try again.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('Email/password accounts are not enabled. Please contact support.');
      } else {
        setError('Failed to create an account. Please try again.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-medium">Create your account</CardTitle>
          <CardDescription>
            Enter your details below to sign up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <Button 
                type="button"
                variant="outline" 
                className="w-full cursor-pointer"
                onClick={handleGoogleSignIn}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 size-4" fill="none">
                  <g>
                    <path d="M21.805 12.083c0-.638-.057-1.252-.163-1.833H12v3.468h5.509a4.71 4.71 0 0 1-2.044 3.09v2.56h3.305c1.934-1.783 3.035-4.41 3.035-7.285z" fill="#4285F4"/>
                    <path d="M12 22c2.7 0 4.97-.89 6.627-2.41l-3.305-2.56c-.917.614-2.086.977-3.322.977-2.554 0-4.72-1.724-5.495-4.042H3.09v2.566A9.997 9.997 0 0 0 12 22z" fill="#34A853"/>
                    <path d="M6.505 13.965A5.996 5.996 0 0 1 6.09 12c0-.68.117-1.34.326-1.965V7.47H3.09A9.997 9.997 0 0 0 2 12c0 1.57.377 3.05 1.09 4.43l3.415-2.465z" fill="#FBBC05"/>
                    <path d="M12 6.875c1.47 0 2.78.507 3.81 1.5l2.857-2.857C16.97 3.89 14.7 3 12 3A9.997 9.997 0 0 0 3.09 7.47l3.415 2.565C7.28 8.6 9.446 6.875 12 6.875z" fill="#EA4335"/>
                  </g>
                </svg>
                Sign up with Google
              </Button>
            </div>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Your name" required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="user@example.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                {loading ? 'Creating account...' : 'Sign up'}
              </Button>
            </form>
            <div className="text-center text-sm">
              Already have an account?{' '}
              <button type="button" className="underline underline-offset-4 cursor-pointer" onClick={onSwitchToLogin}>
                Login
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
} 