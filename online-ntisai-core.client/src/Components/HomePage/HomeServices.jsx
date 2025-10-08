import React from "react";
import { services } from "./data/services";
import HomeServiceCard from "./data/HomeServiceCard";
import { usePermission } from "../../Contexts/PermissionContext";
import { useAuth } from "../../Contexts/AuthContext";
import { Lock, Eye, Edit, Shield } from 'lucide-react';
import { Badge } from "../ui/badge";
function HomeServices() {
    const { hasPermission, userPermissions } = usePermission();
    const { user } = useAuth();

    // Get permission level icon and text
    const getPermissionBadge = (permissionKey) => {
        const level = userPermissions[permissionKey];
        if (!level || level === 'none') {
            return { icon: <Lock className="w-3 h-3" />, text: 'No Access', variant: 'destructive' };
        }
        if (level === 'view') {
            return { icon: <Eye className="w-3 h-3" />, text: 'View Only', variant: 'secondary' };
        }
        if (level === 'modify') {
            return { icon: <Edit className="w-3 h-3" />, text: 'Edit Access', variant: 'default' };
        }
        if (level === 'full') {
            return { icon: <Shield className="w-3 h-3" />, text: 'Full Access', variant: 'default' };
        }
        return { icon: <Lock className="w-3 h-3" />, text: 'No Access', variant: 'outline' };
    };

    // Define permission keys for each service
    const servicePermissions = {
        '/propertyTax': 'property_tax_access',
        '/water-tax': 'water_tax_access',
        '/bajar-parwana': 'bajar_parwana_access',
        '/birth-death-certificates': 'birth_death_access',
        '/garbage-collection': 'garbage_collection_access',
        '/building-permission': 'building_permission_access',
        '/grievance-redressal': 'grievance_access',
        '/rts': 'rts_access',
        '/municipal-assets': 'municipal_assets_access'
    };

    // Filter services based on permissions
    const accessibleServices = services.filter(service =>
        hasPermission(service.link, 'view')
    );

    const inaccessibleServices = services.filter(service =>
        !hasPermission(service.link, 'view')
    );
    return (
        <section className="bg-gray-100 p-4 sm:p-6 max-w-7xl mx-auto min-h-[250px]">
            {accessibleServices.length > 0 && (
                <>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-4 mb-8">
                        {accessibleServices.map((service) => {
                            const permissionKey = servicePermissions[service.link];
                            const permissionBadge = getPermissionBadge(permissionKey);

                            return (
                                <div key={service.id} className="relative group">
                                    <HomeServiceCard {...service} />
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Badge variant={permissionBadge.variant} className="flex items-center gap-1 text-xs">
                                            {permissionBadge.icon}
                                            {permissionBadge.text}
                                        </Badge>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {inaccessibleServices.length > 0 && (
                <>
                    <h3 className="text-xl font-semibold mb-4 text-gray-600">Restricted Services</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-4">
                        {inaccessibleServices.map((service) => {
                            const permissionKey = servicePermissions[service.link];
                            const permissionBadge = getPermissionBadge(permissionKey);

                            return (
                                <div key={service.id} className="relative opacity-60 cursor-not-allowed">
                                    <div className="pointer-events-none">
                                        <HomeServiceCard {...service} />
                                    </div>
                                    <div className="absolute top-2 right-2">
                                        <Badge variant={permissionBadge.variant} className="flex items-center gap-1 text-xs">
                                            {permissionBadge.icon}
                                            {permissionBadge.text}
                                        </Badge>
                                    </div>
                                    <div className="absolute inset-0 bg-gray-200 bg-opacity-50 rounded-2xl flex items-center justify-center">
                                        <Lock className="w-8 h-8 text-gray-600" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {accessibleServices.length === 0 && (
                <div className="text-center py-12">
                    <Lock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h2 className="text-2xl font-bold mb-2 text-gray-600">No Services Available</h2>
                    <p className="text-gray-500">
                        You don't have access to any services yet. Please contact your administrator.
                    </p>
                </div>
            )}
        </section>
    );
}

export default HomeServices;
