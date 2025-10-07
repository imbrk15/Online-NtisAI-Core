import React from 'react';
import { usePermission } from '../Contexts/PermissionContext';
import { useLocation } from 'react-router-dom';
import { Badge } from './ui/badge';
import { Eye, Edit, Shield, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface PermissionIndicatorProps {
    showAlert?: boolean;
    className?: string;
}

export default function PermissionIndicator({ showAlert = false, className = '' }: PermissionIndicatorProps) {
    const { userPermissions, routePermissions } = usePermission();
    const location = useLocation();

    // Get permission key for current route
    const permissionKey = routePermissions[location.pathname];
    if (!permissionKey) return null;

    const permissionLevel = userPermissions[permissionKey] || 'none';

    const getPermissionConfig = () => {
        switch (permissionLevel) {
            case 'view':
                return {
                    icon: <Eye className="w-4 h-4" />,
                    text: 'View Only',
                    variant: 'secondary' as const,
                    description: 'You have read-only access to this page'
                };
            case 'modify':
                return {
                    icon: <Edit className="w-4 h-4" />,
                    text: 'Edit Access',
                    variant: 'default' as const,
                    description: 'You can view and modify data on this page'
                };
            case 'full':
                return {
                    icon: <Shield className="w-4 h-4" />,
                    text: 'Full Access',
                    variant: 'default' as const,
                    description: 'You have complete control over this page'
                };
            default:
                return {
                    icon: <AlertCircle className="w-4 h-4" />,
                    text: 'Limited Access',
                    variant: 'outline' as const,
                    description: 'Your access level may be restricted'
                };
        }
    };

    const config = getPermissionConfig();

    if (showAlert) {
        return (
            <Alert className={className}>
                <div className="flex items-center gap-2">
                    {config.icon}
                    <AlertDescription className="flex-1">
                        <span className="font-medium">{config.text}:</span> {config.description}
                    </AlertDescription>
                </div>
            </Alert>
        );
    }

    return (
        <Badge variant={config.variant} className={`flex items-center gap-1 ${className}`}>
            {config.icon}
            <span className="text-xs">{config.text}</span>
        </Badge>
    );
}
