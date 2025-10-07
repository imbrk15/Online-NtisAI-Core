// src/Components/UserManagement/PagePermissionsSection.jsx
import React from 'react';
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { usePermission } from "../../Contexts/PermissionContext";

const PagePermissionsSection = ({
    servicePermissions,
    onPermissionChange,
    isEditMode = false
}) => {
    const { getAvailablePermissions, PERMISSION_LEVELS } = usePermission();

    const permissions = getAvailablePermissions();

    // Group permissions by category
    const groupedPermissions = {
        main_pages: permissions.filter(p => p.category === 'main_pages'),
        master_main_sections: permissions.filter(p => p.category === 'master_main_sections'),
        assessment_components: permissions.filter(p => p.category === 'assessment_components'),
        amc_components: permissions.filter(p => p.category === 'amc_components'),
        cv_components: permissions.filter(p => p.category === 'cv_components')
    };

    const handlePagePermissionChange = (permissionKey, level) => {
        const screenPath = getScreenPathFromPermissionKey(permissionKey);
        let category = 'Page Access';

        // Determine the category based on permission type
        if (permissionKey.includes('master_access')) {
            category = 'Master Main Sections';
        } else if (permissionKey.includes('_master')) {
            if (permissionKey.includes('amc_')) {
                category = 'AMC Components';
            } else if (permissionKey.includes('cv_')) {
                category = 'CV Components';
            } else {
                category = 'Assessment Components';
            }
        }

        if (onPermissionChange) {
            onPermissionChange('Property Tax', category, screenPath, level);
        }
    };

    const getScreenPathFromPermissionKey = (permissionKey) => {
        const mapping = {
            // Main pages
            'property_tax_access': 'Property Tax Dashboard',
            'property_tax_collection': 'Property Tax Collection',
            'property_tax_billing': 'Property Tax Billing',
            'property_search': 'Property Search',
            'property_details_view': 'Property Details',
            'wadhghat_history': 'Wadhghat History',
            'ferfar_history': 'Ferfar History',
            'master_data_access': 'Master Data',
            'assessment_qc': 'Assessment QC',
            'user_management': 'User Management',

            // Master Main Sections
            'assessment_master_access': 'Assessment Master',
            'amc_master_access': 'AMC Master',
            'cv_master_access': 'CV Master',

            // Assessment Components
            'type_of_use_master': 'Type Of Use Master',
            'apply_taxes_master': 'Apply Taxes Master',
            'floor_master': 'Floor Master',
            'construction_type_master': 'Construction Type Master',
            'zone_master': 'Zone Master',
            'rate_master': 'Rate Master',
            'property_description_master': 'Property Description Master',
            'condition_master': 'Condition Master',
            'depreciation_master': 'Depreciation Master',

            // AMC Components
            'penalty_master': 'Penalty Master',
            'amc_option2_master': 'AMC Option 2 Master',
            'amc_option3_master': 'AMC Option 3 Master',

            // CV Components
            'subzone_master': 'Sub Zone Master',
            'combine_tax_master': 'Combine Tax Master',
            'depreciation_cv_master': 'Depreciation Master for CV',
            'open_plot_rate_master': 'Open Plot Rate Master for CV',
            'city_survey_master': 'City Survey Master',
            'building_rate_master': 'Building Rate Master for CV',
            'cv_factors_master': 'CV Factors Master'
        };

        return mapping[permissionKey] || permissionKey;
    };

    const getCurrentPermissionLevel = (permissionKey) => {
        const screenPath = getScreenPathFromPermissionKey(permissionKey);
        let category = 'Page Access';

        if (permissionKey.includes('master_access')) {
            category = 'Master Main Sections';
        } else if (permissionKey.includes('_master')) {
            if (permissionKey.includes('amc_')) {
                category = 'AMC Components';
            } else if (permissionKey.includes('cv_')) {
                category = 'CV Components';
            } else {
                category = 'Assessment Components';
            }
        }

        const permissions = servicePermissions['Property Tax']?.[category] || [];
        const screenPerm = permissions.find(p => p.screenPath === screenPath);
        return screenPerm?.permission || 'none';
    };

    const PermissionSection = ({ title, permissions, description }) => {
        // Don't render section if there are no permissions in this category
        if (!permissions || permissions.length === 0) {
            return null;
        }

        return (
            <div className="border border-slate-200 rounded-lg p-4 space-y-4 bg-white/80 backdrop-blur-sm shadow-sm">
                <div>
                    <Label className="text-sm font-medium">{title}</Label>
                    <p className="text-xs text-muted-foreground mt-1">{description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {permissions.map(permission => {
                        const currentLevel = getCurrentPermissionLevel(permission.key);

                        return (
                            <div key={permission.key} className="border rounded-md p-3 bg-slate-50/50">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <h5 className="text-sm font-medium">{permission.label}</h5>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {permission.description}
                                        </p>
                                    </div>
                                    <Badge
                                        variant={
                                            currentLevel === 'full' ? 'default' :
                                                currentLevel === 'modify' ? 'secondary' :
                                                    currentLevel === 'view' ? 'outline' : 'secondary'
                                        }
                                        className="text-xs ml-2 flex-shrink-0"
                                    >
                                        {currentLevel === 'full' ? 'Full' :
                                            currentLevel === 'modify' ? 'Modify' :
                                                currentLevel === 'view' ? 'View' : 'None'}
                                    </Badge>
                                </div>

                                <RadioGroup
                                    value={currentLevel}
                                    onValueChange={(value) => handlePagePermissionChange(permission.key, value)}
                                    className="flex flex-wrap gap-1"
                                >
                                    <div className="flex items-center space-x-1">
                                        <RadioGroupItem value="none" id={`${permission.key}-none`} />
                                        <Label htmlFor={`${permission.key}-none`} className="text-xs cursor-pointer">None</Label>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <RadioGroupItem value="view" id={`${permission.key}-view`} />
                                        <Label htmlFor={`${permission.key}-view`} className="text-xs cursor-pointer">View</Label>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <RadioGroupItem value="modify" id={`${permission.key}-modify`} />
                                        <Label htmlFor={`${permission.key}-modify`} className="text-xs cursor-pointer">Modify</Label>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <RadioGroupItem value="full" id={`${permission.key}-full`} />
                                        <Label htmlFor={`${permission.key}-full`} className="text-xs cursor-pointer">Full</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        );
                    })}
                </div>

                {/* Bulk Actions for this section */}
                <div className="flex items-center gap-2 pt-2 border-t">
                    <span className="text-xs text-muted-foreground">Quick set all:</span>
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => {
                            permissions.forEach(perm => {
                                handlePagePermissionChange(perm.key, 'view');
                            });
                        }}
                    >
                        All View
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => {
                            permissions.forEach(perm => {
                                handlePagePermissionChange(perm.key, 'modify');
                            });
                        }}
                    >
                        All Modify
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => {
                            permissions.forEach(perm => {
                                handlePagePermissionChange(perm.key, 'full');
                            });
                        }}
                    >
                        All Full
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-destructive hover:text-destructive"
                        onClick={() => {
                            permissions.forEach(perm => {
                                handlePagePermissionChange(perm.key, 'none');
                            });
                        }}
                    >
                        Clear All
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Only show sections that have permissions */}
            {groupedPermissions.main_pages.length > 0 && (
                <PermissionSection
                    title="Main Pages Access"
                    permissions={groupedPermissions.main_pages}
                    description="Control access to main application pages"
                />
            )}

            {groupedPermissions.master_main_sections.length > 0 && (
                <PermissionSection
                    title="Master Main Sections"
                    permissions={groupedPermissions.master_main_sections}
                    description="Control access to main master sections (Assessment, AMC, CV)"
                />
            )}

            {groupedPermissions.assessment_components.length > 0 && (
                <PermissionSection
                    title="Assessment Master Components"
                    permissions={groupedPermissions.assessment_components}
                    description="Control access to individual Assessment Master components"
                />
            )}

            {groupedPermissions.amc_components.length > 0 && (
                <PermissionSection
                    title="AMC Master Components"
                    permissions={groupedPermissions.amc_components}
                    description="Control access to individual AMC Master components"
                />
            )}

            {groupedPermissions.cv_components.length > 0 && (
                <PermissionSection
                    title="CV Master Components"
                    permissions={groupedPermissions.cv_components}
                    description="Control access to individual CV Master components"
                />
            )}
        </div>
    );
};

export default PagePermissionsSection;