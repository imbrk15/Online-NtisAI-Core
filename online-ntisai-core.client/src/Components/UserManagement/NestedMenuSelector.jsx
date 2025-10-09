import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, Folder, FileText } from "lucide-react";
import { cn } from "../ui/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export function NestedMenuSelector({
    items,
    screenPermissions,
    onPermissionChange,
    parentPath = "",
    level = 0,
    parentPermission = null,
    enableMenuPermissions = false // New prop to enable permission selectors for menu items
}) {
    const [expandedItems, setExpandedItems] = useState(new Set());

    const toggleExpand = (itemId) => {
        setExpandedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            } else {
                newSet.add(itemId);
            }
            return newSet;
        });
    };

    const getFullPath = (itemName) => {
        return parentPath ? `${parentPath} > ${itemName}` : itemName;
    };

    const getScreenPermission = (path) => {
        const perm = screenPermissions.find(p => p.screenPath === path);
        return perm?.permission || 'none';
    };

    // Get all child screen paths recursively
    const getAllChildPaths = (item, currentPath) => {
        let paths = [];
        if (item.type === 'screen') {
            paths.push(currentPath);
        }
        if (item.children) {
            item.children.forEach(child => {
                const childPath = `${currentPath} > ${child.name}`;
                paths = [...paths, ...getAllChildPaths(child, childPath)];
            });
        }
        return paths;
    };

    // Get the maximum allowed permission based on parent
    const getMaxAllowedPermission = (parentPerm) => {
        if (!parentPerm || parentPerm === 'none') return 'full';
        if (parentPerm === 'view') return 'view';
        if (parentPerm === 'modify') return 'modify';
        return 'full';
    };

    // Check if an option should be disabled
    const isPermissionDisabled = (option, parentPerm) => {
        if (!parentPerm || parentPerm === 'none') return false;

        const permissionLevels = { none: 0, view: 1, modify: 2, full: 3 };
        const parentLevel = permissionLevels[parentPerm];
        const optionLevel = permissionLevels[option];

        return optionLevel > parentLevel;
    };

    // Check if any child has permissions set
    const hasPermissionedChildren = (item, currentPath) => {
        if (item.type === 'screen') {
            return getScreenPermission(currentPath) !== 'none';
        }

        if (item.children) {
            return item.children.some(child =>
                hasPermissionedChildren(child, getFullPath(child.name))
            );
        }

        return false;
    };

    const renderItem = (item) => {
        const fullPath = getFullPath(item.name);
        const isExpanded = expandedItems.has(item.id);
        const currentPermission = getScreenPermission(fullPath);
        const hasChildren = item.type === 'menu' && item.children && item.children.length > 0;
        const hasPermissions = hasPermissionedChildren(item, fullPath);

        // Determine if this menu item should show a permission selector
        const showMenuPermission = enableMenuPermissions && item.type === 'menu' && hasChildren;
        const currentParentPermission = parentPermission || getScreenPermission(parentPath);

        // Handle permission change for menus with cascading to children
        const handleMenuPermissionChange = (value) => {
            // First set the menu item permission
            onPermissionChange(fullPath, value);

            // Then cascade to all children
            const allChildPaths = getAllChildPaths(item, fullPath);
            allChildPaths.forEach(childPath => {
                const currentChildPerm = getScreenPermission(childPath);
                // If setting to none, clear all children
                if (value === 'none') {
                    onPermissionChange(childPath, 'none');
                }
                // If setting to a specific permission, update children that exceed this permission
                else {
                    const permissionLevels = { none: 0, view: 1, modify: 2, full: 3 };
                    const newLevel = permissionLevels[value];
                    const currentLevel = permissionLevels[currentChildPerm];

                    // If child has higher permission than new parent, downgrade it
                    if (currentLevel > newLevel) {
                        onPermissionChange(childPath, value);
                    }
                    // If child is 'none', set it to the parent's permission
                    else if (currentChildPerm === 'none') {
                        onPermissionChange(childPath, value);
                    }
                }
            });
        };

        return (
            <div key={item.id} className="select-none">
                <div
                    className={cn(
                        "flex items-center gap-2 py-1.5 px-2 rounded hover:bg-muted/50 transition-colors",
                        level > 0 && "ml-" + (level * 4)
                    )}
                    style={{ marginLeft: `${level * 16}px` }}
                >
                    {hasChildren && (
                        <button
                            onClick={() => toggleExpand(item.id)}
                            className="p-0.5 hover:bg-muted rounded flex-shrink-0 "
                        >
                            {isExpanded ? (
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            ) : (
                                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            )}
                        </button>
                    )}

                    {!hasChildren && <div className="w-5 flex-shrink-0" />}

                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        {item.type === 'menu' ? (
                            <Folder className={cn(
                                "w-4 h-4 flex-shrink-0",
                                hasPermissions ? "text-blue-600" : "text-muted-foreground"
                            )} />
                        ) : (
                            <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        )}
                        <span
                            className={cn(
                                "text-sm leading-tight truncate flex-1",
                                item.type === 'menu' && hasPermissions && "font-medium text-blue-600"
                            )}
                            title={item.name}
                        >
                            {item.name}
                        </span>

                        {/* Permission Selector for menu items (when enabled) */}
                        {showMenuPermission && (
                            <Select
                                value={currentPermission}
                                onValueChange={handleMenuPermissionChange}
                            >
                                <SelectTrigger className="max-w-[10vw] h-7 text-xs flex-shrink-0">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="none" className="text-xs max-w-[8vw]">None</SelectItem>
                                    <SelectItem
                                        value="view"
                                        className="text-xs"
                                        disabled={isPermissionDisabled('view', currentParentPermission)}
                                    >
                                        View
                                    </SelectItem>
                                    <SelectItem
                                        value="modify"
                                        className="text-xs"
                                        disabled={isPermissionDisabled('modify', currentParentPermission)}
                                    >
                                        Modify
                                    </SelectItem>
                                    <SelectItem
                                        value="full"
                                        className="text-xs"
                                        disabled={isPermissionDisabled('full', currentParentPermission)}
                                    >
                                        Full Access
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        )}

                        {/* Permission Selector for screens */}
                        {item.type === 'screen' && (
                            <Select
                                value={currentPermission}
                                onValueChange={(value) => onPermissionChange(fullPath, value)}
                            >
                                <SelectTrigger className="max-w-[10vw] h-7 text-xs flex-shrink-0">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="none" className="text-xs max-w-[8vw]">None</SelectItem>
                                    <SelectItem
                                        value="view"
                                        className="text-xs"
                                        disabled={isPermissionDisabled('view', currentParentPermission)}
                                    >
                                        View
                                    </SelectItem>
                                    <SelectItem
                                        value="modify"
                                        className="text-xs"
                                        disabled={isPermissionDisabled('modify', currentParentPermission)}
                                    >
                                        Modify
                                    </SelectItem>
                                    <SelectItem
                                        value="full"
                                        className="text-xs"
                                        disabled={isPermissionDisabled('full', currentParentPermission)}
                                    >
                                        Full Access
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                </div>

                {hasChildren && isExpanded && (
                    <div className="mt-0.5">
                        <NestedMenuSelector
                            items={item.children}
                            screenPermissions={screenPermissions}
                            onPermissionChange={onPermissionChange}
                            parentPath={fullPath}
                            level={level + 1}
                            parentPermission={showMenuPermission ? currentPermission : currentParentPermission}
                            enableMenuPermissions={enableMenuPermissions}
                        />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-0.5">
            {items.map(item => renderItem(item))}
        </div>
    );
}