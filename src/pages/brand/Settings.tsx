import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/firebase';
import { useState } from 'react';
import { User as UserIcon, Bell, Shield, CreditCard, Globe, LogOut, Edit3, Save, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';

export default function Settings() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);

  // Brand profile state (all fields empty/default)
  const [brandProfile, setBrandProfile] = useState({
    name: '',
    industry: '',
    description: '',
    website: '',
    email: '',
    niches: [] as string[],
    socialMedia: {
      instagram: '',
      facebook: '',
      twitter: '',
      youtube: '',
      linkedin: '',
      tiktok: ''
    }
  });

  // Payment method state (empty/default)
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    holderName: ''
  });

  // Notification toggles (all enabled by default)
  const [emailNotifications, setEmailNotifications] = useState([
    { label: 'New campaign applications', description: 'Get notified when creators apply to your campaigns', enabled: true },
    { label: 'Campaign milestones', description: 'Updates on campaign progress and completion', enabled: true },
    { label: 'Payment confirmations', description: 'Notifications for successful payments and transactions', enabled: true },
    { label: 'Weekly reports', description: 'Weekly summary of your campaign performance', enabled: false }
  ]);
  const [pushNotifications, setPushNotifications] = useState([
    { label: 'Real-time updates', description: 'Instant notifications for important events', enabled: true },
    { label: 'Marketing tips', description: 'Weekly tips to improve your campaigns', enabled: false }
  ]);

  // Brand categories
  const brandNiches = [
    { id: 1, name: 'Beauty', icon: '💄' },
    { id: 2, name: 'Fashion', icon: '👗' },
    { id: 3, name: 'Technology', icon: '📱' },
    { id: 4, name: 'Lifestyle', icon: '🌟' },
    { id: 5, name: 'Food & Beverage', icon: '🍽️' },
    { id: 6, name: 'Fitness', icon: '💪' },
    { id: 7, name: 'Travel', icon: '✈️' },
    { id: 8, name: 'Home & Decor', icon: '🏠' },
    { id: 9, name: 'Automotive', icon: '🚗' },
    { id: 10, name: 'Finance', icon: '💰' },
    { id: 11, name: 'Education', icon: '📚' },
    { id: 12, name: 'Entertainment', icon: '🎬' }
  ];

  // Billing info (empty/default)
  const [billingInfo, setBillingInfo] = useState({
    companyName: '',
    gstNumber: '',
    billingAddress: ''
  });

  // API keys/webhooks (empty/default)
  const [apiKeys] = useState({
    production: '',
    test: ''
  });
  const [webhooks] = useState<{ name: string; url: string; active: boolean }[]>([]);

  // Handlers
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleProfileChange = (field: keyof typeof brandProfile, value: any) => {
    setBrandProfile(prev => ({ ...prev, [field]: value }));
  };
  const handleSocialMediaChange = (platform: keyof typeof brandProfile.socialMedia, value: string) => {
    setBrandProfile(prev => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [platform]: value }
    }));
  };
  const handleNicheToggle = (nicheName: string) => {
    setBrandProfile(prev => ({
      ...prev,
      niches: prev.niches.includes(nicheName)
        ? prev.niches.filter(n => n !== nicheName)
        : [...prev.niches, nicheName]
    }));
  };
  const handleSaveProfile = () => {
    // Save logic here
    setIsEditing(false);
  };
  const handleEmailNotifChange = (idx: number) => {
    setEmailNotifications(prev => prev.map((n, i) => i === idx ? { ...n, enabled: !n.enabled } : n));
  };
  const handlePushNotifChange = (idx: number) => {
    setPushNotifications(prev => prev.map((n, i) => i === idx ? { ...n, enabled: !n.enabled } : n));
  };
  const handleBillingChange = (field: keyof typeof billingInfo, value: string) => {
    setBillingInfo(prev => ({ ...prev, [field]: value }));
  };
  const handleAddPaymentMethod = () => {
    // Add payment method logic here
    setShowAddPaymentModal(false);
    setNewPaymentMethod({ type: 'card', cardNumber: '', expiryDate: '', cvv: '', holderName: '' });
  };

  // Sidebar sections
  const settingSections = [
    { id: 'profile', label: 'Brand Profile', icon: <UserIcon className="h-5 w-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="h-5 w-5" /> },
    { id: 'security', label: 'Security', icon: <Shield className="h-5 w-5" /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'api', label: 'API & Integrations', icon: <Globe className="h-5 w-5" /> }
  ];

  // Section renderers
  const renderProfileSection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Brand Profile</CardTitle>
        <CardDescription>Configure your brand information and categories.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold flex-1">{brandProfile.name || 'Brand Name'}</h2>
          <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? <X className="mr-2 h-4 w-4" /> : <Edit3 className="mr-2 h-4 w-4" />}
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="brand-name">Brand Name</Label>
            <Input id="brand-name" value={brandProfile.name} onChange={e => handleProfileChange('name', e.target.value)} disabled={!isEditing} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input id="industry" value={brandProfile.industry} onChange={e => handleProfileChange('industry', e.target.value)} disabled={!isEditing} />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="description">Description</Label>
            <input id="description" value={brandProfile.description} onChange={e => handleProfileChange('description', e.target.value)} disabled={!isEditing} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F1D35] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 resize-none" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input id="website" value={brandProfile.website} onChange={e => handleProfileChange('website', e.target.value)} disabled={!isEditing} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Contact Email</Label>
            <Input id="email" value={brandProfile.email} onChange={e => handleProfileChange('email', e.target.value)} disabled={!isEditing} />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Brand Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {brandNiches.map(niche => (
              <label key={niche.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={brandProfile.niches.includes(niche.name)}
                  onChange={() => handleNicheToggle(niche.name)}
                  disabled={!isEditing}
                  className="w-4 h-4 rounded border-gray-300 text-[#9F1D35] focus:ring-[#9F1D35] focus:ring-2 disabled:opacity-50"
                />
                <span className="text-sm">{niche.icon}</span>
                <span className="text-sm text-gray-700">{niche.name}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Social Media</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(brandProfile.socialMedia).map(([platform, handle]) => (
              <div key={platform} className="space-y-2">
                <Label htmlFor={platform} className="capitalize">{platform}</Label>
                <Input id={platform} value={handle} onChange={e => handleSocialMediaChange(platform as keyof typeof brandProfile.socialMedia, e.target.value)} disabled={!isEditing} />
              </div>
            ))}
          </div>
        </div>
        {isEditing && (
          <div className="flex justify-end">
            <Button onClick={handleSaveProfile} className="bg-[#9F1D35] text-white">
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
          <Button variant="outline">Manage 2FA</Button>
        </div>
        <div className="p-4 border rounded-lg flex items-center justify-between">
          <div>
            <Label className="font-medium">Password</Label>
            <p className="text-sm text-muted-foreground">Last changed 3 months ago.</p>
          </div>
          <Button variant="outline">Change Password</Button>
        </div>
        <div className="p-4 border rounded-lg flex items-center justify-between">
          <div>
            <Label className="font-medium">Login Sessions</Label>
            <p className="text-sm text-muted-foreground">Manage your active login sessions.</p>
          </div>
          <Button variant="outline">View Sessions</Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderBillingSection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Billing</CardTitle>
        <CardDescription>Manage your billing and payment information.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input id="companyName" value={billingInfo.companyName} onChange={e => handleBillingChange('companyName', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gstNumber">GST Number</Label>
            <Input id="gstNumber" value={billingInfo.gstNumber} onChange={e => handleBillingChange('gstNumber', e.target.value)} />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="billingAddress">Billing Address</Label>
            <input id="billingAddress" value={billingInfo.billingAddress} onChange={e => handleBillingChange('billingAddress', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F1D35] focus:border-transparent" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
          <div className="space-y-3">
            {/* Example payment method (could be dynamic in the future) */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <CreditCard size={20} className="text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900">Visa ending in 0000</div>
                  <div className="text-sm text-gray-600">Expires --/--</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                  Default
                </span>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </div>
            <Button 
              onClick={() => setShowAddPaymentModal(true)}
              variant="outline"
              className="w-full flex items-center justify-center gap-2 border-dashed border-2"
            >
              <Plus size={20} />
              Add Payment Method
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderAPISection = () => (
    <Card>
      <CardHeader>
        <CardTitle>API & Integrations</CardTitle>
        <CardDescription>Manage your API keys and webhooks.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">API Keys</h3>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg flex items-center justify-between">
              <div>
                <Label className="font-medium">Production API Key</Label>
                <p className="text-sm text-muted-foreground">Use this key for production integrations</p>
                <div className="bg-gray-50 p-3 rounded font-mono text-sm mt-2">{apiKeys.production || 'No key generated'}</div>
              </div>
              <Button variant="outline">Regenerate</Button>
            </div>
            <div className="p-4 border rounded-lg flex items-center justify-between">
              <div>
                <Label className="font-medium">Test API Key</Label>
                <p className="text-sm text-muted-foreground">Use this key for testing and development</p>
                <div className="bg-gray-50 p-3 rounded font-mono text-sm mt-2">{apiKeys.test || 'No key generated'}</div>
              </div>
              <Button variant="outline">Regenerate</Button>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Webhooks</h3>
          <div className="space-y-3">
            {webhooks.length === 0 ? (
              <div className="text-sm text-muted-foreground">No webhooks added yet.</div>
            ) : (
              webhooks.map((wh, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{wh.name}</div>
                    <div className="text-sm text-gray-600">{wh.url}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {wh.active && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Active</span>
                    )}
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              ))
            )}
            <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-dashed border-2">
              + Add Webhook
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Main render
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 w-full">
      <nav className="lg:col-span-1">
        <div className="space-y-2">
          {settingSections.map(section => (
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
        {activeSection === 'profile' && renderProfileSection()}
        {activeSection === 'notifications' && renderNotificationsSection()}
        {activeSection === 'security' && renderSecuritySection()}
        {activeSection === 'billing' && renderBillingSection()}
        {activeSection === 'api' && renderAPISection()}
      </main>

      {/* Add Payment Method Modal */}
      <Dialog open={showAddPaymentModal} onOpenChange={setShowAddPaymentModal}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>Enter your new payment method details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={newPaymentMethod.cardNumber}
                onChange={e => setNewPaymentMethod(prev => ({ ...prev, cardNumber: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="text"
                  placeholder="MM/YY"
                  value={newPaymentMethod.expiryDate}
                  onChange={e => setNewPaymentMethod(prev => ({ ...prev, expiryDate: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  type="text"
                  placeholder="123"
                  value={newPaymentMethod.cvv}
                  onChange={e => setNewPaymentMethod(prev => ({ ...prev, cvv: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="holderName">Cardholder Name</Label>
              <Input
                id="holderName"
                type="text"
                placeholder="John Doe"
                value={newPaymentMethod.holderName}
                onChange={e => setNewPaymentMethod(prev => ({ ...prev, holderName: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={handleAddPaymentMethod} className="bg-[#9F1D35] text-white">Add Payment Method</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 