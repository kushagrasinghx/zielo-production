import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/firebase';
import React, { useState, useEffect } from 'react';
import { User as UserIcon, Bell, Shield, CreditCard, Globe, LogOut, Camera, Edit3, Save, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";

export default function Settings() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const currentUser = auth.currentUser;

  const [profileData, setProfileData] = useState({
    displayName: currentUser?.displayName || 'Demo User',
    email: currentUser?.email || 'demo@example.com',
    phone: '+91 98765 43210',
    bio: 'Content creator passionate about lifestyle, travel, and authentic storytelling. Love collaborating with brands that align with my values.',
    location: 'Mumbai, India',
    website: 'https://demouser.com',
    profileImage: currentUser?.photoURL || 'https://github.com/shadcn.png',
    socialMedia: {
      instagram: '@demo_user',
      youtube: 'Demo User',
      twitter: '@demo_user',
      tiktok: '@demo_user'
    }
  });

  const [contentTypes, setContentTypes] = useState({
    Posts: true,
    Stories: true,
    Reels: true,
    Videos: false,
    Reviews: false,
    Tutorials: false,
  });
  const [industries, setIndustries] = useState({
    Fashion: true,
    Beauty: true,
    Technology: false,
    Lifestyle: true,
    Food: false,
    Travel: false,
    Fitness: false,
    'Home Decor': false,
  });
  const [collabTypes, setCollabTypes] = useState({
    'Product Gifting': true,
    'Paid Collaborations': true,
    'Commission-Based': true,
    'Long-term Partnerships': true,
  });
  const [minBudget, setMinBudget] = useState('0');

  const [emailNotifications, setEmailNotifications] = useState([
    { label: 'New collaboration opportunities', description: 'Get notified when brands invite you to campaigns', enabled: true },
    { label: 'Campaign updates', description: 'Updates on your active campaigns and deadlines', enabled: true },
    { label: 'Payment notifications', description: 'Notifications for payments and earnings', enabled: true },
    { label: 'Weekly summary', description: 'Weekly summary of your performance and opportunities', enabled: false },
  ]);
  const [pushNotifications, setPushNotifications] = useState([
    { label: 'Real-time updates', description: 'Instant notifications for important events', enabled: true },
    { label: 'Creator tips', description: 'Weekly tips to improve your content and collaborations', enabled: false },
  ]);

  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [viewSessionsOpen, setViewSessionsOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
  const [sessions] = useState([
    { id: 1, device: 'Chrome on Windows', location: 'Mumbai, India', lastActive: '2 min ago' },
    { id: 2, device: 'Safari on iPhone', location: 'Delhi, India', lastActive: '1 day ago' },
  ]);

  useEffect(() => {
    if (currentUser) {
      setProfileData(prev => ({
        ...prev,
        displayName: currentUser.displayName || 'Demo User',
        email: currentUser.email || 'demo@example.com',
        profileImage: currentUser.photoURL || 'https://github.com/shadcn.png',
      }));
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSaveProfile = () => {
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  const handleProfileChange = (field: keyof Omit<typeof profileData, 'socialMedia' | 'profileImage'>, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSocialMediaChange = (platform: keyof typeof profileData.socialMedia, value: string) => {
    setProfileData(prev => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [platform]: value }
    }));
  };

  const handleContentTypeChange = (type: keyof typeof contentTypes) => {
    setContentTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };
  const handleIndustryChange = (industry: keyof typeof industries) => {
    setIndustries((prev) => ({ ...prev, [industry]: !prev[industry] }));
  };
  const handleCollabTypeChange = (type: keyof typeof collabTypes) => {
    setCollabTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };
  const handleMinBudgetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMinBudget(e.target.value);
  };

  const handleEmailNotifChange = (idx: number) => {
    setEmailNotifications((prev) => prev.map((n, i) => i === idx ? { ...n, enabled: !n.enabled } : n));
  };
  const handlePushNotifChange = (idx: number) => {
    setPushNotifications((prev) => prev.map((n, i) => i === idx ? { ...n, enabled: !n.enabled } : n));
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password change logic
    setChangePasswordOpen(false);
  };

  const settingSections = [
    { id: 'profile', label: 'Profile', icon: <UserIcon className="h-5 w-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="h-5 w-5" /> },
    { id: 'security', label: 'Security', icon: <Shield className="h-5 w-5" /> },
    { id: 'payments', label: 'Payments', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'preferences', label: 'Preferences', icon: <Globe className="h-5 w-5" /> }
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile': return renderProfileSection();
      case 'notifications': return renderNotificationsSection();
      case 'security': return renderSecuritySection();
      case 'payments': return renderPaymentsSection();
      case 'preferences': return renderPreferencesSection();
      default: return null;
    }
  };

  const renderProfileSection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>This is how others will see you on the site.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img src={profileData.profileImage} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-background" />
            <Button size="icon" className="absolute bottom-0 right-0 w-8 h-8 rounded-full">
              <Camera size={16} />
            </Button>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold">{profileData.displayName}</h2>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? <X className="mr-2 h-4 w-4" /> : <Edit3 className="mr-2 h-4 w-4" />}
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>
            <p className="text-muted-foreground">{profileData.email}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span>📍 {profileData.location}</span>
              <span>🌐 Creator</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input id="displayName" value={profileData.displayName} onChange={(e) => handleProfileChange('displayName', e.target.value)} disabled={!isEditing} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={profileData.email} onChange={(e) => handleProfileChange('email', e.target.value)} disabled={!isEditing} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" value={profileData.phone} onChange={(e) => handleProfileChange('phone', e.target.value)} disabled={!isEditing} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={profileData.location} onChange={(e) => handleProfileChange('location', e.target.value)} disabled={!isEditing} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            {/* <Textarea id="bio" rows={4} value={profileData.bio} onChange={(e) => handleProfileChange('bio', e.target.value)} disabled={!isEditing} className="resize-none" /> */}
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input id="website" type="url" value={profileData.website} onChange={(e) => handleProfileChange('website', e.target.value)} disabled={!isEditing} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Social Media</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(profileData.socialMedia).map(([platform, handle]) => (
              <div key={platform} className="space-y-2">
                <Label htmlFor={platform} className="capitalize">{platform}</Label>
                <Input id={platform} value={handle} onChange={(e) => handleSocialMediaChange(platform as keyof typeof profileData.socialMedia, e.target.value)} disabled={!isEditing} />
              </div>
            ))}
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end">
            <Button onClick={handleSaveProfile}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderNotificationsSection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Manage how you get notified.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
          <div className="space-y-4">
            {emailNotifications.map((n, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor={`email-notif-${i}`} className="font-medium">{n.label}</Label>
                  <p className="text-sm text-muted-foreground mt-1">{n.description}</p>
                </div>
                <Switch id={`email-notif-${i}`} checked={n.enabled} onCheckedChange={() => handleEmailNotifChange(i)} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Push Notifications</h3>
          <div className="space-y-4">
            {pushNotifications.map((n, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor={`push-notif-${i}`} className="font-medium">{n.label}</Label>
                  <p className="text-sm text-muted-foreground">{n.description}</p>
                </div>
                <Switch id={`push-notif-${i}`} checked={n.enabled} onCheckedChange={() => handlePushNotifChange(i)} />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderSecuritySection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>Manage your account security.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 border rounded-lg flex items-center justify-between">
          <div>
            <Label className="font-medium">Two-Factor Authentication</Label>
            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
          </div>
          <Button variant="outline">Enable 2FA</Button>
        </div>
        <div className="p-4 border rounded-lg flex items-center justify-between">
          <div>
            <Label className="font-medium">Password</Label>
            <p className="text-sm text-muted-foreground">Last changed 2 months ago.</p>
          </div>
          <Dialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Change Password</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
                <DialogDescription>Update your account password below.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="current">Current Password</Label>
                  <input
                    id="current"
                    name="current"
                    type="password"
                    value={passwordForm.current}
                    onChange={handlePasswordInput}
                    className="mt-1 w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="new">New Password</Label>
                  <input
                    id="new"
                    name="new"
                    type="password"
                    value={passwordForm.new}
                    onChange={handlePasswordInput}
                    className="mt-1 w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="confirm">Confirm New Password</Label>
                  <input
                    id="confirm"
                    name="confirm"
                    type="password"
                    value={passwordForm.confirm}
                    onChange={handlePasswordInput}
                    className="mt-1 w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-[#9F1D35] text-white">Change Password</Button>
                  <DialogClose asChild>
                    <Button type="button" variant="ghost">Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="p-4 border rounded-lg flex items-center justify-between">
          <div>
            <Label className="font-medium">Login Sessions</Label>
            <p className="text-sm text-muted-foreground">Manage your active login sessions.</p>
          </div>
          <Dialog open={viewSessionsOpen} onOpenChange={setViewSessionsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">View Sessions</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Active Sessions</DialogTitle>
                <DialogDescription>These are your currently active sessions.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {sessions.map((s) => (
                  <div key={s.id} className="border rounded p-3 flex flex-col">
                    <div className="font-medium">{s.device}</div>
                    <div className="text-sm text-muted-foreground">{s.location}</div>
                    <div className="text-xs text-gray-400 mb-2">Last active: {s.lastActive}</div>
                    <Button size="sm" variant="destructive">Sign out</Button>
                  </div>
                ))}
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="ghost">Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );

  const renderPaymentsSection = () => (
    <Card>
        <CardHeader>
            <CardTitle>Payments</CardTitle>
            <CardDescription>Manage your payment and tax information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="bank-account">Bank Account Number</Label>
                        <Input id="bank-account" defaultValue="****1234" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ifsc">IFSC Code</Label>
                        <Input id="ifsc" defaultValue="HDFC0001234" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="account-holder">Account Holder Name</Label>
                        <Input id="account-holder" defaultValue="Demo User" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="pan">PAN Number</Label>
                        <Input id="pan" defaultValue="ABCDE1234F" />
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-4">Tax Information</h3>
                <div className="p-4 border rounded-lg flex items-center justify-between">
                    <div>
                        <Label className="font-medium">GST Registration</Label>
                        <p className="text-sm text-muted-foreground">GST Number: 29ABCDE1234F1Z5</p>
                    </div>
                    <Button variant="outline">Update GST</Button>
                </div>
            </div>
            <div className="flex justify-end">
                <Button>Save Payment Details</Button>
            </div>
        </CardContent>
    </Card>
  );

  const renderPreferencesSection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Content Preferences</CardTitle>
        <CardDescription>Set your content and collaboration preferences.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Preferred Content Types</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(Object.keys(contentTypes) as Array<keyof typeof contentTypes>).map((type: keyof typeof contentTypes) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={contentTypes[type]}
                  onChange={() => handleContentTypeChange(type)}
                  className="accent-[#9F1D35] w-4 h-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Preferred Industries</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(Object.keys(industries) as Array<keyof typeof industries>).map((industry: keyof typeof industries) => (
              <label key={industry} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={industries[industry]}
                  onChange={() => handleIndustryChange(industry)}
                  className="accent-[#9F1D35] w-4 h-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">{industry}</span>
              </label>
            ))}
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-semibold mb-4">Collaboration Preferences</h3>
          <div className="mb-6">
            <Label htmlFor="min-budget">Minimum Campaign Budget</Label>
            <select
              id="min-budget"
              value={minBudget}
              onChange={handleMinBudgetChange}
              className="block mt-3 w-full rounded-lg border-2 border-[#9F1D35] px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#9F1D35]"
            >
              <option value="0">No minimum</option>
              <option value="5000">₹5,000+</option>
              <option value="10000">₹10,000+</option>
              <option value="25000">₹25,000+</option>
              <option value="50000">₹50,000+</option>
            </select>
          </div>
          <div>
            <Label>Collaboration Types</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {(Object.keys(collabTypes) as Array<keyof typeof collabTypes>).map((type: keyof typeof collabTypes) => (
                <div key={type} className="flex items-center gap-3">
                  <Switch checked={collabTypes[type]} onCheckedChange={() => handleCollabTypeChange(type)} id={type} />
                  <Label htmlFor={type} className="text-sm font-normal cursor-pointer">{type}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="bg-[#9F1D35] hover:bg-[#8a1a2e] text-white px-6 py-2 rounded-lg font-medium">Save Preferences</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 w-full">
      <nav className="lg:col-span-1">
         <div className="space-y-2">
            {settingSections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? 'default' : 'ghost'}
                onClick={() => setActiveSection(section.id)}
                className="w-full justify-start gap-3 px-3 py-2"
              >
                {section.icon}
                <span className="text-sm font-medium">{section.label}</span>
              </Button>
            ))}
            <Separator className="my-4" />
             <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start gap-3 px-3 py-2 text-destructive hover:text-destructive"
              >
                <LogOut className="h-5 w-5" />
                <span className="text-sm font-medium">Logout</span>
              </Button>
         </div>
      </nav>
      <main className="lg:col-span-4">
        {renderSectionContent()}
      </main>
    </div>
  );
} 