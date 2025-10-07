import React from 'react';
import { usePermission } from '../Contexts/PermissionContext';
import { useLocation } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Lock } from 'lucide-react';

interface PermissionGateProps {
    children: React.ReactNode;
    requiredLevel?: 'view' | 'modify' | 'full';
    fallback?: React.ReactNode;
    showMessage?: boolean;
}

/**
 * Component to conditionally render content based on user's permission level for current page
 * 
 * @example
 * // Only show delete button if user has full access
 * <PermissionGate requiredLevel="full">
 *   <Button variant="destructive">Delete</Button>
 * </PermissionGate>
 * 
 * @example
 * // Show read-only message for view-only users
 * <PermissionGate requiredLevel="modify" showMessage>
 *   <EditForm />
 * </PermissionGate>
 */
export function PermissionGate({
    children,
    requiredLevel = 'view',
    fallback = null,
    showMessage = false
}: PermissionGateProps) {
    const { userPermissions, routePermissions } = usePermission();
    const location = useLocation();

    // Get permission key for current route
    const permissionKey = routePermissions[location.pathname];
    if (!permissionKey) {
        // No permission defined for this route, allow by default
        return <>{children}</>;
    }

    const userLevel = userPermissions[permissionKey] || 'none';

    // Permission hierarchy
    const levelHierarchy: Record<string, number> = {
        none: 0,
        view: 1,
        modify: 2,
        full: 3
    };

    const hasRequiredPermission = levelHierarchy[userLevel] >= levelHierarchy[requiredLevel];

    if (hasRequiredPermission) {
        return <>{children}</>;
    }

    // User doesn't have required permission
    if (showMessage) {
        return (
            <Alert>
                <Lock className="h-4 w-4" />
                <AlertTitle>Insufficient Permissions</AlertTitle>
                <AlertDescription>
                    You need <strong>{requiredLevel}</strong> permission to access this feature.
                    Your current permission level is <strong>{userLevel}</strong>.
                </AlertDescription>
            </Alert>
        );
    }

    return <>{fallback}</>;
}

/**
 * Hook to check permission level for current page
 * 
 * @example
 * const { canModify, canView, canDelete, permissionLevel } = usePagePermission();
 * 
 * if (canModify) {
 *   // Show edit UI
 * }
 */
export default function usePagePermission() {
    const { userPermissions, routePermissions } = usePermission();
    const location = useLocation();

    const permissionKey = routePermissions[location.pathname];
    const permissionLevel = permissionKey ? (userPermissions[permissionKey] || 'none') : 'full';

    const levelHierarchy: Record<string, number> = {
        none: 0,
        view: 1,
        modify: 2,
        full: 3
    };

    return {
        permissionLevel,
        canView: levelHierarchy[permissionLevel] >= levelHierarchy.view,
        canModify: levelHierarchy[permissionLevel] >= levelHierarchy.modify,
        canDelete: levelHierarchy[permissionLevel] >= levelHierarchy.full,
        hasFullAccess: permissionLevel === 'full'
    };
}
