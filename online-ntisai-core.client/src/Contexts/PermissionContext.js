// src/Contexts/PermissionContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const PermissionContext = createContext();

// Define route-to-permission mapping for ALL your App.jsx routes
export const routePermissions = {
    // Home
    '/home': 'home_access',

    // Property Tax Main Routes
    '/propertyTax': 'property_tax_access',
    '/propertyTax/collection': 'property_tax_collection',
    '/propertyTax/billing': 'property_tax_billing',

    // Property Tax Sub Routes from App.jsx
    '/propertyTax/propertySearch': 'property_search',
    '/propertyTax/propertySearch/propertyDetails': 'property_details_view',
    '/propertyTax/wadhghatHistory': 'wadhghat_history',
    '/propertyTax/ferfarHistory': 'ferfar_history',
    '/propertyTax/master': 'master_data_access',

    // Assessment QC
    '/ntisAI/AssessmentQC': 'assessment_qc',

    // User Management
    '/user-management': 'user_management',
};

// Map permission keys to human-readable names for the UI
export const permissionLabels = {
    // Main pages
    'home_access': 'Home Page Access',
    'property_tax_access': 'Property Tax Dashboard',
    'property_tax_collection': 'Property Tax Collection',
    'property_tax_billing': 'Property Tax Billing',
    'property_search': 'Property Search',
    'property_details_view': 'Property Details View',
    'wadhghat_history': 'Wadhghat History',
    'ferfar_history': 'Ferfar History',
    'master_data_access': 'Master Data Access',
    'assessment_qc': 'Assessment QC',
    'user_management': 'User Management',

    // Master Card Main Sections
    'assessment_master_access': 'Assessment Master',
    'amc_master_access': 'AMC Master',
    'cv_master_access': 'CV Master',

    // Assessment Master Components
    'type_of_use_master': 'Type Of Use Master',
    'apply_taxes_master': 'Apply Taxes Master',
    'floor_master': 'Floor Master',
    'construction_type_master': 'Construction Type Master',
    'zone_master': 'Zone Master',
    'rate_master': 'Rate Master',
    'property_description_master': 'Property Description Master',
    'condition_master': 'Condition Master',
    'depreciation_master': 'Depreciation Master',

    // AMC Master Components
    'penalty_master': 'Penalty Master',
    'amc_option2_master': 'AMC Option 2 Master',
    'amc_option3_master': 'AMC Option 3 Master',

    // CV Master Components
    'subzone_master': 'Sub Zone Master',
    'combine_tax_master': 'Combine Tax Master',
    'depreciation_cv_master': 'Depreciation Master for CV',
    'open_plot_rate_master': 'Open Plot Rate Master for CV',
    'city_survey_master': 'City Survey Master',
    'building_rate_master': 'Building Rate Master for CV',
    'cv_factors_master': 'CV Factors Master'
};

// Permission levels
export const PERMISSION_LEVELS = {
    NONE: 'none',
    VIEW: 'view',
    MODIFY: 'modify',
    FULL: 'full'
};

export function PermissionProvider({ children }) {
    const { user } = useAuth();

    const [userPermissions, setUserPermissions] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // Function to check if user has permission for a route
    const hasPermission = (route, requiredLevel = PERMISSION_LEVELS.VIEW) => {
        if (!user) return false;

        // Admin has all permissions
        if (user.role === 'Admin') return true;

        const permissionKey = routePermissions[route];

        if (!permissionKey) {
            console.warn(`No permission mapping found for route: ${route}`);
            return false;
        }

        const userPermissionLevel = userPermissions[permissionKey];

        // If no specific permission is set, deny access
        if (!userPermissionLevel) return false;

        // Check permission hierarchy
        const levelHierarchy = {
            [PERMISSION_LEVELS.NONE]: 0,
            [PERMISSION_LEVELS.VIEW]: 1,
            [PERMISSION_LEVELS.MODIFY]: 2,
            [PERMISSION_LEVELS.FULL]: 3
        };

        return levelHierarchy[userPermissionLevel] >= levelHierarchy[requiredLevel];
    };

    // Function to check component-level permissions (for MasterCards components)
    const hasComponentPermission = (componentKey, requiredLevel = PERMISSION_LEVELS.VIEW) => {
        if (!user) return false;

        // Admin has all permissions
        if (user.role === 'Admin') return true;

        const userPermissionLevel = userPermissions[componentKey];

        if (!userPermissionLevel) return false;

        const levelHierarchy = {
            [PERMISSION_LEVELS.NONE]: 0,
            [PERMISSION_LEVELS.VIEW]: 1,
            [PERMISSION_LEVELS.MODIFY]: 2,
            [PERMISSION_LEVELS.FULL]: 3
        };

        return levelHierarchy[userPermissionLevel] >= levelHierarchy[requiredLevel];
    };

    // Function to get user's permissions based on role and additional permissions
    const calculateUserPermissions = () => {
        if (!user) return {};

        let permissions = {};

        // Base permissions based on role
        switch (user.role) {
            case 'Admin':
                // Admin gets full access to everything
                Object.keys(permissionLabels).forEach(permissionKey => {
                    permissions[permissionKey] = PERMISSION_LEVELS.FULL;
                });
                break;

            case 'User':
                // Default user permissions - very limited
                permissions = {
                    home_access: PERMISSION_LEVELS.VIEW,
                    // No property tax access by default - must be explicitly granted
                };
                break;

            default:
                permissions = {
                    home_access: PERMISSION_LEVELS.VIEW,
                };
        }

        // Apply additional permissions from user object
        if (user.additionalPermissions && user.additionalPermissions.length > 0) {
            console.log('🔐 Processing permissions for user:', user.username);

            user.additionalPermissions.forEach(servicePerm => {
                if (servicePerm.service === "Property Tax" && servicePerm.categories) {
                    Object.entries(servicePerm.categories).forEach(([category, screens]) => {
                        if (!Array.isArray(screens)) {
                            console.warn(`⚠️ Invalid screens data for category "${category}":`, screens);
                            return;
                        }

                        screens.forEach(screen => {
                            // Validate screen object
                            if (!screen || !screen.screenPath) {
                                console.warn(`⚠️ Invalid screen object in category "${category}":`, screen);
                                return;
                            }

                            // Skip menu-level permissions (they're only for UI hierarchy)
                            if (isMenuPath(screen.screenPath)) {
                                console.log(`⏭️ Skipping menu path: "${screen.screenPath}"`);
                                return;
                            }

                            // Map screen paths to permission keys
                            const permissionKey = mapScreenPathToPermissionKey(screen.screenPath);
                            if (permissionKey) {
                                permissions[permissionKey] = screen.permission;
                                console.log(`✅ "${screen.screenPath}" → "${permissionKey}" = ${screen.permission}`);
                            } else {
                                console.warn(`⚠️ No mapping found for screen path: "${screen.screenPath}"`);
                            }
                        });
                    });
                }
            });
        }

        console.log('🎯 Final permissions for', user.username + ':', permissions);
        return permissions;
    };

    // Helper function to check if a screen path is a menu item (should not be mapped to routes)
    const isMenuPath = (screenPath) => {
        // Menu paths are paths that end with menu names but don't have a final screen
        const menuPaths = [
            'MasterMain',
            'MasterMain > Assessment Master',
            'MasterMain > AMC Master',
            'MasterMain > CV Master'
        ];
        return menuPaths.includes(screenPath);
    };

    // Helper function to map screen paths to permission keys
    const mapScreenPathToPermissionKey = (screenPath) => {
        // Skip menu-level paths - they're only for UI hierarchy
        if (isMenuPath(screenPath)) {
            return null;
        }

        const mapping = {
            // NTIS Section - Direct Screen Mappings
            'HomePage': 'home_access',
            'UserManagement': 'user_management',
            'PropertyTaxSurveyDashboard': 'property_tax_access',
            'PropertyTaxCollectionDashboard': 'property_tax_collection',
            'PropertyTaxBillingDashboard': 'property_tax_billing',
            'PropertyTaxMain': 'property_tax_access',
            'SearchPropertyMain': 'property_search',
            'FerfarHistoryMain': 'ferfar_history',
            'AssesmentQCPage': 'assessment_qc',

            // Assessment Master Components (with full path)
            'MasterMain > Assessment Master > Type Of Use Master': 'type_of_use_master',
            'MasterMain > Assessment Master > Apply Taxes Master': 'apply_taxes_master',
            'MasterMain > Assessment Master > Floor Master': 'floor_master',
            'MasterMain > Assessment Master > Construction Type Master': 'construction_type_master',
            'MasterMain > Assessment Master > Zone Master': 'zone_master',
            'MasterMain > Assessment Master > Rate Master': 'rate_master',
            'MasterMain > Assessment Master > Property Description & Type of Use Validation': 'property_description_master',
            'MasterMain > Assessment Master > Condition Master': 'condition_master',
            'MasterMain > Assessment Master > Depreciation Master': 'depreciation_master',

            // AMC Master Components (with full path)
            'MasterMain > AMC Master > Penalty Master': 'penalty_master',

            // CV Master Components (with full path)
            'MasterMain > CV Master > Sub Zone Master': 'subzone_master',
            'MasterMain > CV Master > Combine Tax Master': 'combine_tax_master',
            'MasterMain > CV Master > Depreciation Master for CV': 'depreciation_cv_master',
            'MasterMain > CV Master > Open Plot Rate Master for CV': 'open_plot_rate_master',
            'MasterMain > CV Master > City Survey Master': 'city_survey_master',
            'MasterMain > CV Master > Building Rate Master for CV': 'building_rate_master',
            'MasterMain > CV Master > CV Factors': 'cv_factors_master',

            // Legacy mappings for backward compatibility
            'Property Tax Dashboard': 'property_tax_access',
            'Property Tax Collection': 'property_tax_collection',
            'Property Tax Billing': 'property_tax_billing',
            'Property Search': 'property_search',
            'Property Details': 'property_details_view',
            'Wadhghat History': 'wadhghat_history',
            'Ferfar History': 'ferfar_history',
            'Master Data': 'master_data_access',
            'Assessment QC': 'assessment_qc',
        };

        return mapping[screenPath] || null;
    };

    // Get all available permissions for UI display
    const getAvailablePermissions = () => {
        return Object.entries(permissionLabels).map(([key, label]) => ({
            key,
            label,
            description: getPermissionDescription(key),
            category: getPermissionCategory(key)
        }));
    };

    const getPermissionCategory = (permissionKey) => {
        if (permissionKey.includes('master_access')) return 'master_main_sections';
        if (permissionKey.includes('_master') && !permissionKey.includes('master_access')) {
            if (permissionKey.includes('amc_')) return 'amc_components';
            if (permissionKey.includes('cv_')) return 'cv_components';
            return 'assessment_components';
        }
        return 'main_pages';
    };

    const getPermissionDescription = (permissionKey) => {
        const descriptions = {
            // Main pages
            'home_access': 'Access to the home dashboard',
            'property_tax_access': 'Access to Property Tax main dashboard',
            'property_tax_collection': 'Access to Property Tax collection features',
            'property_tax_billing': 'Access to Property Tax billing features',
            'property_search': 'Access to search properties',
            'property_details_view': 'Access to view property details',
            'wadhghat_history': 'Access to Wadhghat history records',
            'ferfar_history': 'Access to Ferfar history records',
            'master_data_access': 'Access to master data management',
            'assessment_qc': 'Access to Assessment QC features',
            'user_management': 'Access to user management system',

            // Master Main Sections
            'assessment_master_access': 'Access to Assessment Master section',
            'amc_master_access': 'Access to AMC Master section',
            'cv_master_access': 'Access to CV Master section',

            // Assessment Master Components
            'type_of_use_master': 'Manage Type Of Use master data',
            'apply_taxes_master': 'Manage Apply Taxes master data',
            'floor_master': 'Manage Floor master data',
            'construction_type_master': 'Manage Construction Type master data',
            'zone_master': 'Manage Zone master data',
            'rate_master': 'Manage Rate master data',
            'property_description_master': 'Manage Property Description master data',
            'condition_master': 'Manage Condition master data',
            'depreciation_master': 'Manage Depreciation master data',

            // AMC Master Components
            'penalty_master': 'Manage Penalty master data',
            'amc_option2_master': 'Manage AMC Option 2 master data',
            'amc_option3_master': 'Manage AMC Option 3 master data',

            // CV Master Components
            'subzone_master': 'Manage Sub Zone master data',
            'combine_tax_master': 'Manage Combine Tax master data',
            'depreciation_cv_master': 'Manage Depreciation for CV master data',
            'open_plot_rate_master': 'Manage Open Plot Rate for CV master data',
            'city_survey_master': 'Manage City Survey master data',
            'building_rate_master': 'Manage Building Rate for CV master data',
            'cv_factors_master': 'Manage CV Factors master data'
        };

        return descriptions[permissionKey] || 'System permission';
    };

    useEffect(() => {
        if (user) {
            const permissions = calculateUserPermissions();
            setUserPermissions(permissions);
        } else {
            setUserPermissions({});
        }
        setIsLoading(false);
    }, [user]);

    const value = {
        hasPermission,
        hasComponentPermission,
        userPermissions,
        PERMISSION_LEVELS,
        isLoading,
        getAvailablePermissions,
        routePermissions,
        permissionLabels
    };

    return (
        <PermissionContext.Provider value={value}>
            {children}
        </PermissionContext.Provider>
    );
}

export function usePermission() {
    const context = useContext(PermissionContext);
    if (context === undefined) {
        throw new Error('usePermission must be used within a PermissionProvider');
    }
    return context;
}