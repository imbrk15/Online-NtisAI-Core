import React, { useState } from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import { usePermission } from '../../Contexts/PermissionContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ChevronDown, ChevronUp, Eye, Edit, Shield, Lock } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

export default function PermissionDebugger() {
    const { user } = useAuth();
    const { userPermissions, routePermissions } = usePermission();
    const [isOpen, setIsOpen] = useState(false);

    if (!user) return null;

    const getPermissionIcon = (level: string) => {
        switch (level) {
            case 'none': return <Lock className="w-4 h-4" />;
            case 'view': return <Eye className="w-4 h-4" />;
            case 'modify': return <Edit className="w-4 h-4" />;
            case 'full': return <Shield className="w-4 h-4" />;
            default: return <Lock className="w-4 h-4" />;
        }
    };

    const getPermissionVariant = (level: string) => {
        switch (level) {
            case 'none': return 'destructive';
            case 'view': return 'secondary';
            case 'modify': return 'default';
            case 'full': return 'default';
            default: return 'outline';
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 max-w-md">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <Card className="shadow-lg">
                    <CardHeader className="pb-3">
                        <CollapsibleTrigger asChild>
                            <div className="flex items-center justify-between cursor-pointer">
                                <div>
                                    <CardTitle className="text-lg">Permission Debugger</CardTitle>
                                    <CardDescription className="text-sm">
                                        User: {user.username} ({user.role})
                                    </CardDescription>
                                </div>
                                <Button variant="ghost" size="sm">
                                    {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                                </Button>
                            </div>
                        </CollapsibleTrigger>
                    </CardHeader>
                    <CollapsibleContent>
                        <CardContent className="max-h-96 overflow-y-auto space-y-2">
                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold">Route Permissions:</h4>
                                {Object.entries(routePermissions).map(([route, permKey]) => {
                                    const level = userPermissions[permKey] || 'none';
                                    return (
                                        <div key={route} className="flex items-center justify-between p-2 rounded border bg-muted/30">
                                            <div className="flex-1">
                                                <p className="text-xs font-medium">{route}</p>
                                                <p className="text-xs text-muted-foreground">{permKey}</p>
                                            </div>
                                            <Badge 
                                                variant={getPermissionVariant(level)}
                                                className="flex items-center gap-1"
                                            >
                                                {getPermissionIcon(level)}
                                                <span className="text-xs capitalize">{level}</span>
                                            </Badge>
                                        </div>
                                    );
                                })}
                            </div>

                            {user.additionalPermissions && user.additionalPermissions.length > 0 && (
                                <div className="space-y-2 mt-4 pt-4 border-t">
                                    <h4 className="text-sm font-semibold">Additional Permissions:</h4>
                                    {user.additionalPermissions.map((servicePerm, idx) => (
                                        <div key={idx} className="space-y-2">
                                            <p className="text-xs font-medium text-primary">{servicePerm.service}</p>
                                            {Object.entries(servicePerm.categories).map(([category, screens]) => (
                                                <div key={category} className="pl-3 space-y-1">
                                                    <p className="text-xs font-medium text-muted-foreground">{category}</p>
                                                    {screens.map((screen, screenIdx) => (
                                                        <div key={screenIdx} className="flex items-center justify-between p-1 rounded text-xs">
                                                            <span className="truncate flex-1">{screen.screenPath}</span>
                                                            <Badge 
                                                                variant={getPermissionVariant(screen.permission)}
                                                                className="ml-2 flex items-center gap-1"
                                                            >
                                                                {getPermissionIcon(screen.permission)}
                                                                <span className="text-xs capitalize">{screen.permission}</span>
                                                            </Badge>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </CollapsibleContent>
                </Card>
            </Collapsible>
        </div>
    );
}
