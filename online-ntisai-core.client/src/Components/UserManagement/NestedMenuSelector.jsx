import React, { useState } from "react";
import { ChevronRight, ChevronDown, Folder, FileText } from "lucide-react";
import { cn } from "../ui/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export function NestedMenuSelector({
    items,
    screenPermissions,
    onPermissionChange,
    parentPath = "",
    level = 0
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
                            className="p-0.5 hover:bg-muted rounded flex-shrink-0"
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

                        {/* Permission Selector for screens */}
                        {item.type === 'screen' && (
                            <Select
                                value={currentPermission}
                                onValueChange={(value) => onPermissionChange(fullPath, value)}
                            >
                                <SelectTrigger className="w-[120px] h-7 text-xs flex-shrink-0">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none" className="text-xs">None</SelectItem>
                                    <SelectItem value="view" className="text-xs">View</SelectItem>
                                    <SelectItem value="modify" className="text-xs">Modify</SelectItem>
                                    <SelectItem value="full" className="text-xs">Full Access</SelectItem>
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