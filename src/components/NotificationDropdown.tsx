import { useState } from 'react';
import { Bell } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface NotificationDropdownProps {
  notifications?: Notification[];
}

export function NotificationDropdown({ notifications = [] }: NotificationDropdownProps) {
  const [localNotifications, setLocalNotifications] = useState<Notification[]>(
    notifications.length > 0 ? notifications : [
      {
        id: '1',
        title: 'New Collaboration Request',
        message: 'Brand XYZ wants to collaborate with you on a new campaign.',
        time: '2 minutes ago',
        read: false,
        type: 'info'
      },
      {
        id: '2',
        title: 'Campaign Approved',
        message: 'Your submission for Brand ABC has been approved!',
        time: '1 hour ago',
        read: false,
        type: 'success'
      },
      {
        id: '3',
        title: 'Points Earned',
        message: 'You earned 50 points for completing a collaboration.',
        time: '3 hours ago',
        read: true,
        type: 'success'
      },
      {
        id: '4',
        title: 'New Coupon Available',
        message: 'A new coupon is available for Brand DEF.',
        time: '1 day ago',
        read: true,
        type: 'info'
      }
    ]
  );

  const unreadCount = localNotifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setLocalNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setLocalNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <div className="w-2 h-2 bg-green-500 rounded-full" />;
      case 'warning':
        return <div className="w-2 h-2 bg-yellow-500 rounded-full" />;
      case 'error':
        return <div className="w-2 h-2 bg-red-500 rounded-full" />;
      default:
        return <div className="w-2 h-2 bg-blue-500 rounded-full" />;
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="relative p-2 rounded-md hover:bg-gray-100 transition-colors">
          <Bell className="h-5 w-5 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[320px] bg-white rounded-lg shadow-lg border border-gray-200 p-0 z-50 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
          sideOffset={8}
          align="end"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {localNotifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p>No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {localNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-4 hover:bg-gray-50 transition-colors cursor-pointer",
                      !notification.read && "bg-blue-50"
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <p className={cn(
                            "text-sm font-medium",
                            !notification.read ? "text-gray-900" : "text-gray-700"
                          )}>
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {localNotifications.length > 0 && (
            <div className="p-3 border-t border-gray-100">
              <button className="w-full text-sm text-gray-600 hover:text-gray-800 font-medium">
                View all notifications
              </button>
            </div>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
} 