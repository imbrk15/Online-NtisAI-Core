//import "./user1.css"
//import "./user.css"
import React, { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
//import HomeNavbar from "./HomePage/HomeNavbar";
import HomeNavbar from "../HomePage/HomeNavbar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { ScrollArea } from "../ui/scroll-area";
import { Switch } from "../ui/switch";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { UserPlus, Shield, Key, FileText, Users, Pencil, Trash2, Lock, UserCog, FileLock, BarChart3, Database, Eye, ArrowLeft, Info, Search } from "lucide-react";
import { NestedMenuSelector } from "./NestedMenuSelector";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";

function UserManagement() {
    const {
        users,
        createUser,
        updateUser,
        deleteUser,
        securityLayers,
        createSecurityLayer,
        deleteSecurityLayer,
        toggleLayerStatus,
        getLayerPermissions,
        updateLayerPermissions,
        addUserToLayer,
        removeUserFromLayer,
        getUsersInLayer,
        updateUserLayerAssignment,
        userLayerAssignments,
        getAvailableServices
    } = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [showLayerModal, setShowLayerModal] = useState(false);
    const [showManageLayer, setShowManageLayer] = useState(false);
    const [showAddUserToLayerModal, setShowAddUserToLayerModal] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteLayerDialogOpen, setDeleteLayerDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [layerToDelete, setLayerToDelete] = useState(null);
    const [selectedLayerId, setSelectedLayerId] = useState("");
    const [permissions, setPermissions] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState("userName");
    const [searchText, setSearchText] = useState("");
    const [selectedUserForLayer, setSelectedUserForLayer] = useState(null);
    const [selectedUsersInLayer, setSelectedUsersInLayer] = useState([]);
    const [addUserLayerId, setAddUserLayerId] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [layerFormData, setLayerFormData] = useState({
        name: "",
        description: "",
    });
    const [showPermissions, setShowPermissions] = useState(false);
    const [selectedPermissionLayer, setSelectedPermissionLayer] = useState("");
    const [servicePermissions, setServicePermissions] = useState({});
    const [showManageLayerPermissions, setShowManageLayerPermissions] = useState(false);
    const [customLayerPermissions, setCustomLayerPermissions] = useState([]);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [editUserLayerSelection, setEditUserLayerSelection] = useState("");
    const [editUserServicePermissions, setEditUserServicePermissions] = useState({});
    const [editUserCustomLayerPermissions, setEditUserCustomLayerPermissions] = useState([]);
    const [editUserSelectedPermissionLayer, setEditUserSelectedPermissionLayer] = useState("");
    const [existingUsersSearch, setExistingUsersSearch] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateUser = () => {
        if (!formData.username || !formData.password) {
            alert("Please fill all fields");
            return;
        }

        // Convert servicePermissions to array format
        const additionalPermissions = Object.entries(servicePermissions)
            .filter(([service, categories]) => {
                // Only include services that have at least one screen with non-'none' permission
                return Object.values(categories).some(screenPerms =>
                    screenPerms.some(sp => sp.permission !== 'none')
                );
            })
            .map(([service, categories]) => ({
                service,
                categories
            }));

        // Only include custom permissions if they were modified
        const hasCustomPermissions = customLayerPermissions.length > 0 &&
            customLayerPermissions.some(perm => !perm.none || perm.view || perm.modify || perm.fullControl);

        createUser({
            ...formData,
            permissionLayer: selectedPermissionLayer || "1", // Default to L1 if not specified
            additionalPermissions: additionalPermissions,
            customLayerPermissions: hasCustomPermissions ? customLayerPermissions : undefined
        });
        setFormData({ username: "", password: "" });
        setSelectedPermissionLayer("");
        setServicePermissions({});
        setCustomLayerPermissions([]);
        setShowPermissions(false);
        setShowManageLayerPermissions(false);
        setShowModal(false);
    };

    const handleScreenPermissionChange = (service, category, screenPath, permission) => {
        setServicePermissions(prev => {
            const newPerms = { ...prev };
            if (!newPerms[service]) {
                newPerms[service] = {};
            }
            if (!newPerms[service][category]) {
                newPerms[service][category] = [];
            }

            const existingIndex = newPerms[service][category].findIndex(p => p.screenPath === screenPath);

            if (permission === 'none') {
                // Remove the permission if set to none
                if (existingIndex > -1) {
                    newPerms[service][category] = newPerms[service][category].filter(p => p.screenPath !== screenPath);
                }
                // Clean up empty categories
                if (newPerms[service][category].length === 0) {
                    delete newPerms[service][category];
                }
                // Clean up empty services
                if (Object.keys(newPerms[service]).length === 0) {
                    delete newPerms[service];
                }
            } else {
                // Add or update the permission
                if (existingIndex > -1) {
                    newPerms[service][category][existingIndex].permission = permission;
                } else {
                    newPerms[service][category].push({ screenPath, permission });
                }
            }

            return newPerms;
        });
    };

    const getScreenPermissionsForCategory = (service, category, isEditMode = false) => {
        if (isEditMode) {
            return editUserServicePermissions[service]?.[category] || [];
        }
        return servicePermissions[service]?.[category] || [];
    };

    // Get all screen paths from a menu tree
    const getAllScreenPaths = (items, parentPath = "") => {
        let paths = [];

        items.forEach(item => {
            const fullPath = parentPath ? `${parentPath} > ${item.name}` : item.name;

            if (item.type === 'screen') {
                paths.push(fullPath);
            }

            if (item.children && item.children.length > 0) {
                paths = [...paths, ...getAllScreenPaths(item.children, fullPath)];
            }
        });

        return paths;
    };

    // Bulk set permissions for all screens in a category
    const handleBulkSetPermissions = (service, category, menuItems, permission) => {
        const allScreenPaths = getAllScreenPaths(menuItems);

        setServicePermissions(prev => {
            const newPerms = { ...prev };

            if (permission === 'none') {
                // Clear all permissions for this category
                if (newPerms[service]?.[category]) {
                    delete newPerms[service][category];
                }
                // Clean up empty services
                if (newPerms[service] && Object.keys(newPerms[service]).length === 0) {
                    delete newPerms[service];
                }
            } else {
                // Set all screens to the specified permission
                if (!newPerms[service]) {
                    newPerms[service] = {};
                }

                newPerms[service][category] = allScreenPaths.map(screenPath => ({
                    screenPath,
                    permission
                }));
            }

            return newPerms;
        });
    };

    // Bulk set permissions for all screens in a service (all categories)
    const handleBulkSetServicePermissions = (service, categories, permission, isEditMode = false) => {
        const setPerms = isEditMode ? setEditUserServicePermissions : setServicePermissions;

        setPerms(prev => {
            const newPerms = { ...prev };

            if (permission === 'none') {
                // Clear all permissions for this service
                delete newPerms[service];
            } else {
                // Set all screens in all categories to the specified permission
                if (!newPerms[service]) {
                    newPerms[service] = {};
                }

                Object.entries(categories).forEach(([category, menuItems]) => {
                    const allScreenPaths = getAllScreenPaths(menuItems);
                    newPerms[service][category] = allScreenPaths.map(screenPath => ({
                        screenPath,
                        permission
                    }));
                });
            }

            return newPerms;
        });
    };

    const handleLayerSelectionChange = (layerId) => {
        setSelectedPermissionLayer(layerId);
        // Load the layer's default permissions
        const layerPerms = getLayerPermissions(layerId);
        setCustomLayerPermissions(JSON.parse(JSON.stringify(layerPerms)));
    };

    const handleCustomPermissionChange = (index, field) => {
        const newPermissions = [...customLayerPermissions];

        // Reset all checkboxes for this row
        newPermissions[index] = {
            ...newPermissions[index],
            none: false,
            view: false,
            modify: false,
            fullControl: false
        };

        // Set the selected one
        newPermissions[index][field] = true;

        setCustomLayerPermissions(newPermissions);
    };

    // Edit User Permission Handlers
    const handleEditUserScreenPermissionChange = (service, category, screenPath, permission) => {
        setEditUserServicePermissions(prev => {
            const newPerms = { ...prev };
            if (!newPerms[service]) {
                newPerms[service] = {};
            }
            if (!newPerms[service][category]) {
                newPerms[service][category] = [];
            }

            const existingIndex = newPerms[service][category].findIndex(p => p.screenPath === screenPath);

            if (permission === 'none') {
                if (existingIndex > -1) {
                    newPerms[service][category] = newPerms[service][category].filter(p => p.screenPath !== screenPath);
                }
                if (newPerms[service][category].length === 0) {
                    delete newPerms[service][category];
                }
                if (Object.keys(newPerms[service]).length === 0) {
                    delete newPerms[service];
                }
            } else {
                if (existingIndex > -1) {
                    newPerms[service][category][existingIndex].permission = permission;
                } else {
                    newPerms[service][category].push({ screenPath, permission });
                }
            }

            return newPerms;
        });
    };

    const handleEditUserBulkSetPermissions = (service, category, menuItems, permission) => {
        const getAllScreenPaths = (items, parentPath = "") => {
            let paths = [];
            items.forEach(item => {
                const fullPath = parentPath ? `${parentPath} > ${item.name}` : item.name;
                if (item.type === 'screen') {
                    paths.push(fullPath);
                }
                if (item.children && item.children.length > 0) {
                    paths = [...paths, ...getAllScreenPaths(item.children, fullPath)];
                }
            });
            return paths;
        };

        const allScreenPaths = getAllScreenPaths(menuItems);

        setEditUserServicePermissions(prev => {
            const newPerms = { ...prev };

            if (permission === 'none') {
                if (newPerms[service]?.[category]) {
                    delete newPerms[service][category];
                }
                if (newPerms[service] && Object.keys(newPerms[service]).length === 0) {
                    delete newPerms[service];
                }
            } else {
                if (!newPerms[service]) {
                    newPerms[service] = {};
                }

                newPerms[service][category] = allScreenPaths.map(screenPath => ({
                    screenPath,
                    permission
                }));
            }

            return newPerms;
        });
    };

    const handleEditUserLayerSelectionChange = (layerId) => {
        setEditUserSelectedPermissionLayer(layerId);
        const layerPerms = getLayerPermissions(layerId);
        setEditUserCustomLayerPermissions(JSON.parse(JSON.stringify(layerPerms)));
    };

    const handleEditUserCustomPermissionChange = (index, field) => {
        const newPermissions = [...editUserCustomLayerPermissions];

        newPermissions[index] = {
            ...newPermissions[index],
            none: false,
            view: false,
            modify: false,
            fullControl: false
        };

        newPermissions[index][field] = true;

        setEditUserCustomLayerPermissions(newPermissions);
    };

    const handleDeleteClick = (username) => {
        setUserToDelete(username);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (userToDelete) {
            deleteUser(userToDelete);
            setDeleteDialogOpen(false);
            setUserToDelete(null);
        }
    };

    const handleEditClick = (username) => {
        setEditingUser(username);
        // Find user's current layer assignment
        const user = users.find(u => u.username === username);
        if (user) {
            // Get the user's layer from userLayerAssignments via getUsersInLayer check
            const userLayer = securityLayers.find(layer =>
                getUsersInLayer?.(layer.id).some(u => u.username === username)
            );
            setEditUserLayerSelection(userLayer?.id || "1"); // Default to L1

            // Load user's existing additional permissions
            if (user.additionalPermissions && user.additionalPermissions.length > 0) {
                const permsObj = {};
                user.additionalPermissions.forEach(servicePerm => {
                    permsObj[servicePerm.service] = servicePerm.categories;
                });
                setEditUserServicePermissions(permsObj);
            } else {
                setEditUserServicePermissions({});
            }

            // Load user's existing custom layer permissions
            if (user.customLayerPermissions && user.customLayerPermissions.length > 0) {
                setEditUserCustomLayerPermissions(JSON.parse(JSON.stringify(user.customLayerPermissions)));
                setEditUserSelectedPermissionLayer(userLayer?.id || "1");
            } else if (userLayer) {
                // Load default permissions from the layer
                const layerPerms = getLayerPermissions(userLayer.id);
                setEditUserCustomLayerPermissions(JSON.parse(JSON.stringify(layerPerms)));
                setEditUserSelectedPermissionLayer(userLayer.id);
            } else {
                setEditUserCustomLayerPermissions([]);
                setEditUserSelectedPermissionLayer("");
            }
        }
        setShowEditUserModal(true);
    };

    const handleSaveUserEdit = () => {
        if (editingUser && editUserLayerSelection) {
            // Convert servicePermissions to array format
            const additionalPermissions = Object.entries(editUserServicePermissions)
                .filter(([service, categories]) => {
                    // Only include services that have at least one screen with non-'none' permission
                    return Object.values(categories).some(screenPerms =>
                        screenPerms.some(sp => sp.permission !== 'none')
                    );
                })
                .map(([service, categories]) => ({
                    service,
                    categories
                }));

            // Only include custom permissions if they were modified
            const hasCustomPermissions = editUserCustomLayerPermissions.length > 0 &&
                editUserCustomLayerPermissions.some(perm => !perm.none || perm.view || perm.modify || perm.fullControl);

            updateUser(editingUser, {
                permissionLayer: editUserLayerSelection,
                additionalPermissions: additionalPermissions.length > 0 ? additionalPermissions : [],
                customLayerPermissions: hasCustomPermissions ? editUserCustomLayerPermissions : undefined
            });

            const layerName = securityLayers.find(l => l.id === editUserLayerSelection)?.name;
            toast.success(`User ${editingUser} updated successfully`);
            setShowEditUserModal(false);
            setEditingUser(null);
            setEditUserLayerSelection("");
            setEditUserServicePermissions({});
            setEditUserCustomLayerPermissions([]);
            setEditUserSelectedPermissionLayer("");
        }
    };

    const handleLayerChange = (e) => {
        setLayerFormData({ ...layerFormData, [e.target.name]: e.target.value });
    };

    const handleCreateLayer = () => {
        if (!layerFormData.name || !layerFormData.description) {
            alert("Please fill all fields");
            return;
        }
        createSecurityLayer(layerFormData);
        setLayerFormData({ name: "", description: "" });
        setShowLayerModal(false);
    };

    const handleDeleteLayerClick = (id) => {
        setLayerToDelete(id);
        setDeleteLayerDialogOpen(true);
    };

    const handleConfirmDeleteLayer = () => {
        if (layerToDelete) {
            deleteSecurityLayer(layerToDelete);
            setDeleteLayerDialogOpen(false);
            setLayerToDelete(null);
        }
    };

    const handleManageLayerClick = () => {
        if (securityLayers.length > 0) {
            const firstLayerId = securityLayers[0].id;
            setSelectedLayerId(firstLayerId);
            setPermissions(getLayerPermissions(firstLayerId));
        }
        setShowManageLayer(true);
    };

    const handleLayerSelection = (layerId) => {
        setSelectedLayerId(layerId);
        setPermissions(getLayerPermissions(layerId));
    };

    const handlePermissionChange = (index, field) => {
        const newPermissions = [...permissions];

        // Reset all checkboxes for this row
        newPermissions[index] = {
            ...newPermissions[index],
            none: false,
            view: false,
            modify: false,
            fullControl: false
        };

        // Set the selected one
        newPermissions[index][field] = true;

        setPermissions(newPermissions);
    };

    const handleSavePermissions = () => {
        if (selectedLayerId) {
            updateLayerPermissions(selectedLayerId, permissions);
            alert("Permissions saved successfully!");
        }
    };

    const handleOpenAddUserToLayer = () => {
        if (securityLayers.length > 0) {
            setAddUserLayerId(securityLayers[0].id);
        }
        setSearchText("");
        setSelectedUserForLayer(null);
        setSelectedUsersInLayer([]);
        setShowAddUserToLayerModal(true);
    };

    const handleAddUserToLayer = () => {
        if (selectedUserForLayer && addUserLayerId) {
            const layerName = securityLayers.find(l => l.id === addUserLayerId)?.name;
            addUserToLayer(selectedUserForLayer, addUserLayerId);
            toast.success(`${selectedUserForLayer} added to ${layerName}`);
            setSelectedUserForLayer(null);
        }
    };

    const handleRemoveUsersFromLayer = () => {
        if (addUserLayerId && selectedUsersInLayer.length > 0) {
            const layerName = securityLayers.find(l => l.id === addUserLayerId)?.name;
            selectedUsersInLayer.forEach(username => {
                removeUserFromLayer(username, addUserLayerId);
            });
            toast.success(`${selectedUsersInLayer.length} user(s) removed from ${layerName}`);
            setSelectedUsersInLayer([]);
        }
    };

    const handleSaveUserLayerChanges = () => {
        toast.success("User-layer assignments saved successfully!");
        setShowAddUserToLayerModal(false);
    };

    const handleClearUserLayer = () => {
        setSelectedUserForLayer(null);
        setSelectedUsersInLayer([]);
        setSearchText("");
    };

    const filteredUsers = users.filter(user => {
        if (!searchText) return true;
        if (searchCriteria === "userName") {
            return user.username.toLowerCase().includes(searchText.toLowerCase());
        }
        return user.username.toLowerCase().includes(searchText.toLowerCase());
    });

    const usersInSelectedLayer = addUserLayerId ? getUsersInLayer(addUserLayerId) : [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
            <HomeNavbar />

            {/* Background Pattern */}
            <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="max-w-7xl mx-auto p-6 space-y-6">
                {/* Header Section */}
                <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-slate-200">
                    <div>
                        <h1 className="mb-2 bg-gradient-to-r from-[#004c8c] to-[#0369a1] bg-clip-text text-transparent">User Management</h1>
                        <p className="text-slate-600">
                            Manage users, security layers, and access control
                        </p>
                    </div>
                    <div className="flex items-center gap-3 bg-gradient-to-r from-[#004c8c]/10 to-blue-500/10 px-4 py-2 rounded-lg border border-[#004c8c]/20">
                        <Users className="w-5 h-5 text-[#004c8c]" />
                        <span className="text-slate-700 font-medium">{users.length} users</span>
                    </div>
                </div>

                {/* Tabs Section */}
                <Tabs defaultValue="user-creation" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm">
                        <TabsTrigger
                            value="user-creation"
                            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md"
                        >
                            <UserPlus className="w-4 h-4" />
                            <span className="hidden sm:inline">User Creation</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="security-layer"
                            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md"
                        >
                            <Shield className="w-4 h-4" />
                            <span className="hidden sm:inline">Security Layer</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="document-layer"
                            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md"
                        >
                            <FileLock className="w-4 h-4" />
                            <span className="hidden sm:inline">Document Layer</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="report-layer"
                            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-md"
                        >
                            <BarChart3 className="w-4 h-4" />
                            <span className="hidden sm:inline">Report Layer</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="data-sync-layer"
                            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-md"
                        >
                            <Database className="w-4 h-4" />
                            <span className="hidden sm:inline">Data Sync Layer</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Tab 1: User Creation */}
                    <TabsContent value="user-creation" className="space-y-4 mt-6">
                        <div className="flex items-center justify-between mb-4 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-slate-200">
                            <div>
                                <h3 className="text-slate-800">User Creation</h3>
                                <p className="text-slate-600 text-sm">Create and manage system users</p>
                            </div>
                            <Button
                                onClick={() => setShowModal(true)}
                                className="bg-gradient-to-r from-[#004c8c] to-[#0369a1] hover:from-[#003d70] hover:to-[#025a8a] shadow-md hover:shadow-lg transition-all"
                            >
                                <UserPlus className="w-4 h-4 mr-2" />
                                Create User
                            </Button>
                        </div>

                        <Card className="shadow-md border-slate-200 bg-white/90 backdrop-blur-sm">
                            <CardHeader>
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <CardTitle>Existing Users</CardTitle>
                                        <CardDescription>
                                            View and manage all users in the system
                                        </CardDescription>
                                    </div>
                                    <div className="relative w-64">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            type="text"
                                            placeholder="Search users..."
                                            value={existingUsersSearch}
                                            onChange={(e) => setExistingUsersSearch(e.target.value)}
                                            className="pl-9"
                                        />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {users.length === 0 ? (
                                    <div className="text-center py-12 text-muted-foreground">
                                        <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                        <p>No users found</p>
                                        <p className="text-sm">Create your first user to get started</p>
                                    </div>
                                ) : (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Username</TableHead>
                                                <TableHead>Security Layer</TableHead>
                                                <TableHead>
                                                    <div className="flex items-center gap-1">
                                                        Additional Permissions
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Info className="w-3 h-3 text-muted-foreground cursor-help" />
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p className="text-xs">V: View | M: Modify | F: Full Access</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </div>
                                                </TableHead>
                                                <TableHead>Custom Permissions</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {users.filter(user =>
                                                user.username.toLowerCase().includes(existingUsersSearch.toLowerCase())
                                            ).map((u, idx) => {
                                                const userLayers = getUsersInLayer ?
                                                    securityLayers.filter(layer => getUsersInLayer(layer.id).some(user => user.username === u.username)) :
                                                    [];
                                                return (
                                                    <TableRow key={idx}>
                                                        <TableCell>{u.username}</TableCell>
                                                        <TableCell>
                                                            <div className="flex flex-wrap gap-1">
                                                                {userLayers.length > 0 ? (
                                                                    userLayers.map(layer => (
                                                                        <Badge
                                                                            key={layer.id}
                                                                            variant="secondary"
                                                                            className="text-xs"
                                                                        >
                                                                            {layer.name}
                                                                        </Badge>
                                                                    ))
                                                                ) : (
                                                                    <Badge variant="outline" className="text-xs">None</Badge>
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex flex-wrap gap-1">
                                                                {u.additionalPermissions && u.additionalPermissions.length > 0 ? (
                                                                    u.additionalPermissions.map(perm => {
                                                                        const allScreenPerms = Object.values(perm.categories).flat();
                                                                        const totalScreens = allScreenPerms.length;
                                                                        const viewCount = allScreenPerms.filter(sp => sp.permission === 'view').length;
                                                                        const modifyCount = allScreenPerms.filter(sp => sp.permission === 'modify').length;
                                                                        const fullCount = allScreenPerms.filter(sp => sp.permission === 'full').length;

                                                                        return (
                                                                            <div key={perm.service} className="inline-flex items-center gap-1 mb-1">
                                                                                <Badge
                                                                                    variant="outline"
                                                                                    className="text-xs bg-blue-50 dark:bg-blue-50"
                                                                                >
                                                                                    {perm.service}
                                                                                </Badge>
                                                                                {viewCount > 0 && (
                                                                                    <Badge variant="outline" className="text-xs">
                                                                                        V:{viewCount}
                                                                                    </Badge>
                                                                                )}
                                                                                {modifyCount > 0 && (
                                                                                    <Badge variant="secondary" className="text-xs">
                                                                                        M:{modifyCount}
                                                                                    </Badge>
                                                                                )}
                                                                                {fullCount > 0 && (
                                                                                    <Badge variant="default" className="text-xs">
                                                                                        F:{fullCount}
                                                                                    </Badge>
                                                                                )}
                                                                            </div>
                                                                        );
                                                                    })
                                                                ) : (
                                                                    <span className="text-xs text-muted-foreground">None</span>
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            {u.customLayerPermissions ? (
                                                                <Badge variant="default" className="text-xs bg-green-600">
                                                                    <Key className="w-3 h-3 mr-1" />
                                                                    Custom
                                                                </Badge>
                                                            ) : (
                                                                <span className="text-xs text-muted-foreground">Default</span>
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="p-0"
                                                                    onClick={() => handleEditClick(u.username)}
                                                                >
                                                                    <Pencil className="h-4 w-4" />
                                                                    <span className="sr-only">Edit user</span>
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="text-destructive hover:text-destructive"
                                                                    onClick={() => handleDeleteClick(u.username)}
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                    <span className="sr-only">Delete user</span>
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Tab 2: Security Layer Creation */}
                    <TabsContent value="security-layer" className="space-y-4 mt-6">
                        {!showManageLayer ? (
                            <>
                                <div className="mb-6 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-slate-200">
                                    <h3 className="text-slate-800">Security Layer Creation</h3>
                                    <p className="text-slate-600 text-sm">Create and configure security layers for access control</p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Left Side: Create New Layer Card, Manage Layer Card, and Add User to Layer Card */}
                                    <div className="lg:col-span-1 space-y-3">
                                        <Card
                                            className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-slate-200 hover:border-[#004c8c]/50 group bg-white/90 backdrop-blur-sm"
                                            onClick={() => setShowLayerModal(true)}
                                        >
                                            <CardHeader className="pb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/20 group-hover:from-blue-500/20 group-hover:to-blue-600/30 transition-colors">
                                                        <Shield className="w-6 h-6 text-blue-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <CardTitle className="text-base">Create New Layer</CardTitle>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="pt-2 pb-3">
                                                <CardDescription className="text-sm">
                                                    Set up new security layer with custom permissions
                                                </CardDescription>
                                            </CardContent>
                                        </Card>

                                        <Card
                                            className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-slate-200 hover:border-[#004c8c]/50 group bg-white/90 backdrop-blur-sm"
                                            onClick={handleManageLayerClick}
                                        >
                                            <CardHeader className="pb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-600/20 group-hover:from-emerald-500/20 group-hover:to-emerald-600/30 transition-colors">
                                                        <Lock className="w-6 h-6 text-emerald-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <CardTitle className="text-base">Manage Layer</CardTitle>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="pt-2 pb-3">
                                                <CardDescription className="text-sm">
                                                    Configure existing layers and access controls
                                                </CardDescription>
                                            </CardContent>
                                        </Card>

                                        <Card
                                            className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-slate-200 hover:border-[#004c8c]/50 group bg-white/90 backdrop-blur-sm"
                                            onClick={handleOpenAddUserToLayer}
                                        >
                                            <CardHeader className="pb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500/10 to-violet-600/20 group-hover:from-violet-500/20 group-hover:to-violet-600/30 transition-colors">
                                                        <UserCog className="w-6 h-6 text-violet-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <CardTitle className="text-base">Add User to Layer</CardTitle>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="pt-2 pb-3">
                                                <CardDescription className="text-sm">
                                                    Assign users to security layers
                                                </CardDescription>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* Right Side: Security Layers List */}
                                    <div className="lg:col-span-2">
                                        <Card className="shadow-md border-slate-200 bg-white/90 backdrop-blur-sm">
                                            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/30 border-b border-slate-200">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <CardTitle className="text-slate-800">Security Layers</CardTitle>
                                                        <CardDescription className="text-slate-600">
                                                            All configured security layers in the system
                                                        </CardDescription>
                                                    </div>
                                                    <Badge variant="secondary" className="ml-2 bg-[#004c8c]/10 text-[#004c8c] border-[#004c8c]/20">
                                                        {securityLayers.length} layers
                                                    </Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                {securityLayers.length === 0 ? (
                                                    <div className="text-center py-12 text-muted-foreground">
                                                        <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                                        <p>No security layers found</p>
                                                        <p className="text-sm">Create your first security layer to get started</p>
                                                    </div>
                                                ) : (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {securityLayers.map((layer) => (
                                                            <Card key={layer.id} className="border-2 border-slate-200 hover:border-[#004c8c]/30 hover:shadow-lg transition-all bg-white/80 backdrop-blur-sm">
                                                                <CardHeader className="pb-3">
                                                                    <div className="flex items-start justify-between">
                                                                        <div className="flex-1">
                                                                            <div className="flex items-center gap-3">
                                                                                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/20">
                                                                                    <Shield className="w-5 h-5 text-blue-600" />
                                                                                </div>
                                                                                <div className="flex-1">
                                                                                    <CardTitle className="text-base">{layer.name}</CardTitle>
                                                                                    <div className="flex items-center gap-2 mt-1">
                                                                                        <Badge
                                                                                            variant={layer.status === "Active" ? "default" : "secondary"}
                                                                                            className={layer.status === "Active" ? "bg-green-600" : ""}
                                                                                        >
                                                                                            {layer.status}
                                                                                        </Badge>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <CardDescription className="mt-3">
                                                                                {layer.description}
                                                                            </CardDescription>
                                                                            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                                                                                <span className="flex items-center gap-1">
                                                                                    <Users className="w-3 h-3" />
                                                                                    {layer.createdBy}
                                                                                </span>
                                                                                <span>{layer.createdAt}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-center gap-3 ml-2">
                                                                            <div className="flex flex-col items-end gap-1">
                                                                                <span className="text-xs text-muted-foreground">
                                                                                    {layer.status === "Active" ? "Enabled" : "Disabled"}
                                                                                </span>
                                                                                <Switch
                                                                                    checked={layer.status === "Active"}
                                                                                    onCheckedChange={() => toggleLayerStatus(layer.id)}
                                                                                    className="h-[20px] w-[36px] data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300"
                                                                                />
                                                                            </div>
                                                                            <Button
                                                                                variant="ghost"
                                                                                size="sm"
                                                                                className="text-destructive hover:text-destructive"
                                                                                onClick={() => handleDeleteLayerClick(layer.id)}
                                                                            >
                                                                                <Trash2 className="h-5 w-5" />
                                                                                <span className="sr-only">Delete layer</span>
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </CardHeader>
                                                            </Card>
                                                        ))}
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Manage Layer Interface */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <Button
                                                variant="outline"
                                                onClick={() => setShowManageLayer(false)}
                                                className="gap-2"
                                            >
                                                <ArrowLeft className="w-4 h-4" />
                                                Back
                                            </Button>
                                            <div>
                                                <h3>Manage Security Layer</h3>
                                                <p className="text-muted-foreground text-sm">Configure forms and access rights for selected layer</p>
                                            </div>
                                        </div>
                                        <Button onClick={handleSavePermissions} className="gap-2">
                                            <Shield className="w-4 h-4" />
                                            Save
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                                        {/* Left Side: Layer Selector */}
                                        <div className="lg:col-span-1">
                                            <Card>
                                                <CardHeader className="pb-0">
                                                    <CardTitle className="text-base">Select Security Layer</CardTitle>
                                                </CardHeader>
                                                <CardContent className="mb-2">
                                                    <Select value={selectedLayerId} onValueChange={handleLayerSelection} >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Choose layer" />
                                                        </SelectTrigger>
                                                            <SelectContent className="w-[180px]">
                                                            {securityLayers.map((layer) => (
                                                                <SelectItem key={layer.id} value={layer.id}>
                                                                    {layer.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </CardContent>
                                            </Card>
                                        </div>

                                        {/* Right Side: Permissions Table */}
                                        <div className="lg:col-span-3">
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>Forms And Access Rights</CardTitle>
                                                    <CardDescription>
                                                        Configure access permissions for each screen
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent className="overflow-auto">
                                                    <ScrollArea className="h-[600px] pr-4">
                                                        <Table>
                                                            <TableHeader>
                                                                <TableRow>
                                                                    <TableHead className="w-[40%]">Screen Name</TableHead>
                                                                    <TableHead className="text-center w-[15%]">None</TableHead>
                                                                    <TableHead className="text-center w-[15%]">View</TableHead>
                                                                    <TableHead className="text-center w-[15%]">Modify</TableHead>
                                                                    <TableHead className="text-center w-[15%]">Full Control</TableHead>
                                                                </TableRow>
                                                            </TableHeader>
                                                            <TableBody>
                                                                {permissions.map((perm, index) => (
                                                                    <TableRow key={index} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                                                                        <TableCell>{perm.screenName}</TableCell>
                                                                        <TableCell className="text-center">
                                                                            <div className="flex justify-center">
                                                                                <Checkbox
                                                                                    checked={perm.none}
                                                                                    onCheckedChange={() => handlePermissionChange(index, 'none')}
                                                                                    className="border-4 border-gray-900 data-[state=checked]:border-blue-600"
                                                                                />
                                                                            </div>
                                                                        </TableCell>
                                                                        <TableCell className="text-center">
                                                                            <div className="flex justify-center">
                                                                                <Checkbox
                                                                                    checked={perm.view}
                                                                                    onCheckedChange={() => handlePermissionChange(index, 'view')}
                                                                                    className="border-4 border-gray-900 data-[state=checked]:border-blue-600"
                                                                                />
                                                                            </div>
                                                                        </TableCell>
                                                                        <TableCell className="text-center">
                                                                            <div className="flex justify-center">
                                                                                <Checkbox
                                                                                    checked={perm.modify}
                                                                                    onCheckedChange={() => handlePermissionChange(index, 'modify')}
                                                                                    className="border-4 border-gray-900 data-[state=checked]:border-blue-600"
                                                                                />
                                                                            </div>
                                                                        </TableCell>
                                                                        <TableCell className="text-center">
                                                                            <div className="flex justify-center">
                                                                                <Checkbox
                                                                                    checked={perm.fullControl}
                                                                                    onCheckedChange={() => handlePermissionChange(index, 'fullControl')}
                                                                                    className="border-4 border-gray-900 data-[state=checked]:border-blue-600"
                                                                                />
                                                                            </div>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </ScrollArea>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </TabsContent>

                    {/* Tab 3: Document Security Layer */}
                    <TabsContent value="document-layer" className="space-y-4 mt-6">
                        <div className="mb-6 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-slate-200">
                            <h3 className="text-slate-800">Document Security Layer</h3>
                            <p className="text-slate-600 text-sm">Manage document-level security and access control</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <Card className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-slate-200 hover:border-purple-500/50 group bg-white/90 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-600/20 group-hover:from-emerald-500/20 group-hover:to-emerald-600/30 transition-colors">
                                            <FileLock className="w-8 h-8 text-emerald-600" />
                                        </div>
                                    </div>
                                    <CardTitle className="mt-4">Document Access Rules</CardTitle>
                                    <CardDescription>
                                        Define who can view, edit, or delete documents
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-slate-200 hover:border-purple-500/50 group bg-white/90 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="p-3 rounded-lg bg-gradient-to-br from-sky-500/10 to-sky-600/20 group-hover:from-sky-500/20 group-hover:to-sky-600/30 transition-colors">
                                            <FileText className="w-8 h-8 text-sky-600" />
                                        </div>
                                    </div>
                                    <CardTitle className="mt-4">Category Permissions</CardTitle>
                                    <CardDescription>
                                        Set permissions based on document categories
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-slate-200 hover:border-purple-500/50 group bg-white/90 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="p-3 rounded-lg bg-gradient-to-br from-amber-500/10 to-amber-600/20 group-hover:from-amber-500/20 group-hover:to-amber-600/30 transition-colors">
                                            <Lock className="w-8 h-8 text-amber-600" />
                                        </div>
                                    </div>
                                    <CardTitle className="mt-4">Encryption Settings</CardTitle>
                                    <CardDescription>
                                        Configure document encryption policies
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-slate-200 hover:border-purple-500/50 group bg-white/90 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="p-3 rounded-lg bg-gradient-to-br from-rose-500/10 to-rose-600/20 group-hover:from-rose-500/20 group-hover:to-rose-600/30 transition-colors">
                                            <Shield className="w-8 h-8 text-rose-600" />
                                        </div>
                                    </div>
                                    <CardTitle className="mt-4">Watermark Rules</CardTitle>
                                    <CardDescription>
                                        Apply watermarks to sensitive documents
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-slate-200 hover:border-purple-500/50 group bg-white/90 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="p-3 rounded-lg bg-gradient-to-br from-violet-500/10 to-violet-600/20 group-hover:from-violet-500/20 group-hover:to-violet-600/30 transition-colors">
                                            <Users className="w-8 h-8 text-violet-600" />
                                        </div>
                                    </div>
                                    <CardTitle className="mt-4">Sharing Controls</CardTitle>
                                    <CardDescription>
                                        Manage document sharing and collaboration
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-slate-200 hover:border-purple-500/50 group bg-white/90 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/10 to-cyan-600/20 group-hover:from-cyan-500/20 group-hover:to-cyan-600/30 transition-colors">
                                            <FileText className="w-8 h-8 text-cyan-600" />
                                        </div>
                                    </div>
                                    <CardTitle className="mt-4">Version Control</CardTitle>
                                    <CardDescription>
                                        Manage document versioning and history
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Tab 4: Report Security Layer */}
                    <TabsContent value="report-layer" className="space-y-4 mt-6">
                        <div className="mb-6 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-slate-200">
                            <h3 className="text-slate-800">Report Security Layer</h3>
                            <p className="text-slate-600 text-sm">Manage report-level security and access permissions</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <Card className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-slate-200 hover:border-orange-500/50 group bg-white/90 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/20 group-hover:from-blue-500/20 group-hover:to-blue-600/30 transition-colors">
                                            <BarChart3 className="w-8 h-8 text-blue-600" />
                                        </div>
                                    </div>
                                    <CardTitle className="mt-4">Report Access Control</CardTitle>
                                    <CardDescription>
                                        Define who can view and generate reports
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-slate-200 hover:border-orange-500/50 group bg-white/90 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="p-3 rounded-lg bg-gradient-to-br from-teal-500/10 to-teal-600/20 group-hover:from-teal-500/20 group-hover:to-teal-600/30 transition-colors">
                                            <Shield className="w-8 h-8 text-teal-600" />
                                        </div>
                                    </div>
                                    <CardTitle className="mt-4">Data Masking</CardTitle>
                                    <CardDescription>
                                        Configure sensitive data masking in reports
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-slate-200 hover:border-orange-500/50 group bg-white/90 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="p-3 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-600/20 group-hover:from-orange-500/20 group-hover:to-orange-600/30 transition-colors">
                                            <FileText className="w-8 h-8 text-orange-600" />
                                        </div>
                                    </div>
                                    <CardTitle className="mt-4">Export Permissions</CardTitle>
                                    <CardDescription>
                                        Control report export and download rights
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-slate-200 hover:border-orange-500/50 group bg-white/90 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-600/20 group-hover:from-purple-500/20 group-hover:to-purple-600/30 transition-colors">
                                            <Users className="w-8 h-8 text-purple-600" />
                                        </div>
                                    </div>
                                    <CardTitle className="mt-4">Scheduled Reports</CardTitle>
                                    <CardDescription>
                                        Manage automated report distribution
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-slate-200 hover:border-orange-500/50 group bg-white/90 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="p-3 rounded-lg bg-gradient-to-br from-pink-500/10 to-pink-600/20 group-hover:from-pink-500/20 group-hover:to-pink-600/30 transition-colors">
                                            <Lock className="w-8 h-8 text-pink-600" />
                                        </div>
                                    </div>
                                    <CardTitle className="mt-4">Filter Restrictions</CardTitle>
                                    <CardDescription>
                                        Limit data filters based on user roles
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-slate-200 hover:border-orange-500/50 group bg-white/90 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-500/10 to-indigo-600/20 group-hover:from-indigo-500/20 group-hover:to-indigo-600/30 transition-colors">
                                            <BarChart3 className="w-8 h-8 text-indigo-600" />
                                        </div>
                                    </div>
                                    <CardTitle className="mt-4">Analytics Dashboard</CardTitle>
                                    <CardDescription>
                                        View report access analytics and usage
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Tab 5: Data Synchronization Security Layer */}
                    <TabsContent value="data-sync-layer" className="space-y-4 mt-6">
                        <div className="mb-6 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-slate-200">
                            <h3 className="text-slate-800">Data Synchronization Security Layer</h3>
                            <p className="text-slate-600 text-sm">Manage data synchronization security and access control</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <Card className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-slate-200 hover:border-cyan-500/50 group bg-white/90 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/20 group-hover:from-green-500/20 group-hover:to-green-600/30 transition-colors">
                                            <Database className="w-8 h-8 text-green-600" />
                                        </div>
                                    </div>
                                    <CardTitle className="mt-4">Sync Rules</CardTitle>
                                    <CardDescription>
                                        Configure data synchronization rules and policies
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-slate-200 hover:border-cyan-500/50 group bg-white/90 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/10 to-cyan-600/20 group-hover:from-cyan-500/20 group-hover:to-cyan-600/30 transition-colors">
                                            <Shield className="w-8 h-8 text-cyan-600" />
                                        </div>
                                    </div>
                                    <CardTitle className="mt-4">Encryption in Transit</CardTitle>
                                    <CardDescription>
                                        Set up encryption for data in transit
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-slate-200 hover:border-cyan-500/50 group bg-white/90 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-500/10 to-yellow-600/20 group-hover:from-yellow-500/20 group-hover:to-yellow-600/30 transition-colors">
                                            <Lock className="w-8 h-8 text-yellow-600" />
                                        </div>
                                    </div>
                                    <CardTitle className="mt-4">Access Tokens</CardTitle>
                                    <CardDescription>
                                        Manage API tokens and authentication
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-slate-200 hover:border-cyan-500/50 group bg-white/90 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="p-3 rounded-lg bg-gradient-to-br from-red-500/10 to-red-600/20 group-hover:from-red-500/20 group-hover:to-red-600/30 transition-colors">
                                            <FileText className="w-8 h-8 text-red-600" />
                                        </div>
                                    </div>
                                    <CardTitle className="mt-4">Sync Logs</CardTitle>
                                    <CardDescription>
                                        View synchronization logs and audit trails
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-slate-200 hover:border-cyan-500/50 group bg-white/90 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="p-3 rounded-lg bg-gradient-to-br from-violet-500/10 to-violet-600/20 group-hover:from-violet-500/20 group-hover:to-violet-600/30 transition-colors">
                                            <Users className="w-8 h-8 text-violet-600" />
                                        </div>
                                    </div>
                                    <CardTitle className="mt-4">User Permissions</CardTitle>
                                    <CardDescription>
                                        Control who can initiate data sync operations
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-slate-200 hover:border-cyan-500/50 group bg-white/90 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="p-3 rounded-lg bg-gradient-to-br from-slate-500/10 to-slate-600/20 group-hover:from-slate-500/20 group-hover:to-slate-600/30 transition-colors">
                                            <Database className="w-8 h-8 text-slate-600" />
                                        </div>
                                    </div>
                                    <CardTitle className="mt-4">Conflict Resolution</CardTitle>
                                    <CardDescription>
                                        Configure rules for sync conflict handling
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Create User Dialog */}
            <Dialog open={showModal} onOpenChange={(open) => {
                setShowModal(open);
                if (!open) {
                    // Reset form when closing
                    setFormData({ username: "", password: "" });
                    setSelectedPermissionLayer("");
                    setServicePermissions({});
                    setCustomLayerPermissions([]);
                    setShowPermissions(false);
                    setShowManageLayerPermissions(false);
                }
            }}>
                <DialogContent className="sm:max-w-[900px] lg:max-w-[1000px] max-h-[90vh] flex flex-col mx-auto my-8 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white via-slate-50 to-blue-50/30 overflow-auto">
                    <DialogHeader className="flex-shrink-0 px-6 pt-6 pb-4 bg-gradient-to-r from-[#004c8c] to-[#0369a1] text-white rounded-t-lg">
                        <DialogTitle className="text-white">Create New User</DialogTitle>
                        <DialogDescription className="text-blue-50">
                            Add a new user to the system. Users will have L1 layer access by default.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 overflow-auto px-6">
                        <ScrollArea className="h-full ">
                            <div className="grid gap-4 pb-4 pt-4">
                                <div className="grid gap-2 bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-slate-200 shadow-sm">
                                    <Label htmlFor="username" className="flex items-center gap-2">
                                        <UserPlus className="w-4 h-4 text-[#004c8c]" />
                                        Username
                                    </Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        placeholder="Enter username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="bg-white border-slate-300 focus:border-[#004c8c] focus:ring-[#004c8c]"
                                    />
                                </div>

                                <div className="grid gap-2 bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-slate-200 shadow-sm">
                                    <Label htmlFor="password" className="flex items-center gap-2">
                                        <Lock className="w-4 h-4 text-[#004c8c]" />
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Enter password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="bg-white border-slate-300 focus:border-[#004c8c] focus:ring-[#004c8c]"
                                    />
                                </div>

                                {/* Permissions Section */}
                                <div className="border border-slate-200 rounded-lg p-4 space-y-3 bg-gradient-to-br from-blue-50/50 to-slate-50/50 backdrop-blur-sm shadow-sm">
                                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowPermissions(!showPermissions)}>
                                        <Label className="cursor-pointer">Permissions (Optional)</Label>
                                        <Badge variant="secondary" className="text-xs">
                                            {showPermissions ? "Hide" : "Show"}
                                        </Badge>
                                    </div>

                                    {showPermissions && (
                                        <div className="space-y-4 pt-2 max-w-full">
                                            {/* Layer Selection */}
                                            <div className="grid gap-2">
                                                <Label htmlFor="permissionLayer" className="text-sm">Assign to Security Layer</Label>
                                                <Select value={selectedPermissionLayer} onValueChange={handleLayerSelectionChange}>
                                                    <SelectTrigger id="permissionLayer">
                                                        <SelectValue placeholder="L1 (Default)" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white w-[53rem]">
                                                        {securityLayers.map((layer) => (
                                                            <SelectItem key={layer.id} value={layer.id}>
                                                                {layer.name} - {layer.description}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <p className="text-xs text-muted-foreground">
                                                    Select the security layer for this user. Services and screens from the selected layer will be available.
                                                </p>
                                            </div>

                                            {/* Manage Layer Permissions */}
                                            {selectedPermissionLayer && (
                                                <div className="border rounded-lg p-4 space-y-3 bg-background">
                                                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowManageLayerPermissions(!showManageLayerPermissions)}>
                                                        <Label className="cursor-pointer text-sm">Manage Permissions (Optional)</Label>
                                                        <Badge variant="outline" className="text-xs flex-shrink-0 ml-2">
                                                            {showManageLayerPermissions ? "Hide" : "Show"}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">
                                                        Customize screen permissions for this user without affecting the layer's default permissions.
                                                    </p>

                                                    {showManageLayerPermissions && customLayerPermissions.length > 0 && (
                                                        <div className="mt-3">
                                                            <div className="border rounded-md overflow-auto">
                                                                <ScrollArea className="h-[400px]">
                                                                    <Table>
                                                                        <TableHeader className="sticky top-0 bg-background z-10">
                                                                            <TableRow>
                                                                                <TableHead className="min-w-[200px]">Screen Name</TableHead>
                                                                                <TableHead className="text-center w-20">None</TableHead>
                                                                                <TableHead className="text-center w-20">View</TableHead>
                                                                                <TableHead className="text-center w-20">Modify</TableHead>
                                                                                <TableHead className="text-center w-20">Full</TableHead>
                                                                            </TableRow>
                                                                        </TableHeader>
                                                                        <TableBody>
                                                                            {customLayerPermissions.map((perm, index) => (
                                                                                <TableRow key={index} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                                                                                    <TableCell className="text-sm py-2.5">{perm.screenName}</TableCell>
                                                                                    <TableCell className="text-center py-2.5">
                                                                                        <div className="flex justify-center">
                                                                                            <Checkbox
                                                                                                checked={perm.none}
                                                                                                onCheckedChange={() => handleCustomPermissionChange(index, 'none')}
                                                                                                className="border-4 border-gray-900 data-[state=checked]:border-blue-600"
                                                                                            />
                                                                                        </div>
                                                                                    </TableCell>
                                                                                    <TableCell className="text-center py-2.5">
                                                                                        <div className="flex justify-center">
                                                                                            <Checkbox
                                                                                                checked={perm.view}
                                                                                                onCheckedChange={() => handleCustomPermissionChange(index, 'view')}
                                                                                                className="border-4 border-gray-900 data-[state=checked]:border-blue-600"
                                                                                            />
                                                                                        </div>
                                                                                    </TableCell>
                                                                                    <TableCell className="text-center py-2.5">
                                                                                        <div className="flex justify-center">
                                                                                            <Checkbox
                                                                                                checked={perm.modify}
                                                                                                onCheckedChange={() => handleCustomPermissionChange(index, 'modify')}
                                                                                                className="border-4 border-gray-900 data-[state=checked]:border-blue-600"
                                                                                            />
                                                                                        </div>
                                                                                    </TableCell>
                                                                                    <TableCell className="text-center py-2.5">
                                                                                        <div className="flex justify-center">
                                                                                            <Checkbox
                                                                                                checked={perm.fullControl}
                                                                                                onCheckedChange={() => handleCustomPermissionChange(index, 'fullControl')}
                                                                                                className="border-4 border-gray-900 data-[state=checked]:border-blue-600"
                                                                                            />
                                                                                        </div>
                                                                                    </TableCell>
                                                                                </TableRow>
                                                                            ))}
                                                                        </TableBody>
                                                                    </Table>
                                                                </ScrollArea>
                                                            </div>
                                                            <div className="flex items-center justify-between mt-2">
                                                                <p className="text-xs text-muted-foreground">
                                                                    Showing all {customLayerPermissions.length} screens from the selected layer. Changes apply only to this user.
                                                                </p>
                                                                <Badge variant="secondary" className="text-xs">
                                                                    {customLayerPermissions.filter(p => !p.none).length} active
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Additional Permissions */}
                                            <div className="grid gap-3">
                                                <Label className="text-sm">Additional Permissions</Label>
                                                <p className="text-xs text-muted-foreground">
                                                    Set individual permission levels for each screen within services.
                                                </p>

                                                {/* Info Box */}
                                                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md p-3">
                                                    <div className="flex gap-2">
                                                        <Eye className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                                        <div className="space-y-1 text-xs">
                                                            <p className="text-blue-900 dark:text-blue-900">
                                                                <strong>Permission Levels:</strong>
                                                            </p>
                                                            <ul className="space-y-1 text-blue-800 dark:text-blue-900 pl-4 list-disc">
                                                                <li><strong>None:</strong> No access to this screen</li>
                                                                <li><strong>View:</strong> Can only view data (read-only)</li>
                                                                <li><strong>Modify:</strong> Can view and edit data</li>
                                                                <li><strong>Full Access:</strong> Complete control including delete</li>
                                                            </ul>
                                                            <p className="text-blue-800 dark:text-blue-900 mt-2">
                                                                <strong>💡 Tip:</strong> Use "Quick Set" buttons to apply the same permission to all screens in a category at once, or set individual permissions using the dropdowns.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Accordion type="multiple" className="w-full">
                                                    {Object.entries(getAvailableServices()).map(([service, categories]) => {
                                                        const totalScreensWithPermissions = servicePermissions[service]
                                                            ? Object.values(servicePermissions[service]).flat().filter(p => p.permission !== 'none').length
                                                            : 0;

                                                        return (
                                                            <AccordionItem key={service} value={service} className="border rounded-md px-4 mb-2">
                                                                <AccordionTrigger className="text-sm py-3 hover:no-underline">
                                                                    <div className="flex items-center gap-2 flex-wrap w-full mr-2">
                                                                        <span className="flex-1 text-left">{service}</span>
                                                                        {totalScreensWithPermissions > 0 && (
                                                                            <Badge variant="secondary" className="text-xs">
                                                                                {totalScreensWithPermissions} screens configured
                                                                            </Badge>
                                                                        )}
                                                                    </div>
                                                                </AccordionTrigger>
                                                                <AccordionContent className="pb-3">
                                                                    <div className="space-y-3 pt-2">
                                                                        {/* Service-level Bulk Actions */}
                                                                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 rounded-md p-3 mb-3">
                                                                            <div className="flex items-center justify-between gap-2 flex-wrap">
                                                                                <div className="flex items-center gap-2">
                                                                                    <Shield className="w-4 h-4 text-blue-600" />
                                                                                    <span className="text-sm">Apply to entire service:</span>
                                                                                </div>
                                                                                <div className="flex items-center gap-1">
                                                                                    <Button
                                                                                        variant="outline"
                                                                                        size="sm"
                                                                                        className="h-8 text-xs px-3 bg-white dark:bg-slate-200"
                                                                                        onClick={() => handleBulkSetServicePermissions(service, categories, 'view')}
                                                                                    >
                                                                                        All View
                                                                                    </Button>
                                                                                    <Button
                                                                                        variant="outline"
                                                                                        size="sm"
                                                                                        className="h-8 text-xs px-3 bg-white dark:bg-slate-200"
                                                                                        onClick={() => handleBulkSetServicePermissions(service, categories, 'modify')}
                                                                                    >
                                                                                        All Modify
                                                                                    </Button>
                                                                                    <Button
                                                                                        variant="outline"
                                                                                        size="sm"
                                                                                        className="h-8 text-xs px-3 bg-white dark:bg-slate-200"
                                                                                        onClick={() => handleBulkSetServicePermissions(service, categories, 'full')}
                                                                                    >
                                                                                        All Full Access
                                                                                    </Button>
                                                                                    <Button
                                                                                        variant="ghost"
                                                                                        size="sm"
                                                                                        className="h-8 text-xs px-3 text-destructive hover:text-destructive"
                                                                                        onClick={() => handleBulkSetServicePermissions(service, categories, 'none')}
                                                                                    >
                                                                                        Clear All
                                                                                    </Button>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="border-t pt-3">
                                                                            <p className="text-xs text-muted-foreground mb-3">Or configure permissions by category:</p>
                                                                        </div>

                                                                        {Object.entries(categories).map(([category, menuItems]) => {
                                                                            const categoryPermissions = getScreenPermissionsForCategory(service, category);
                                                                            const totalScreensInCategory = getAllScreenPaths(menuItems).length;

                                                                            return (
                                                                                <div key={category} className="border rounded-md p-3 bg-muted/30">
                                                                                    <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
                                                                                        <h5 className="text-sm flex items-center gap-2">
                                                                                            {category}
                                                                                            <span className="text-xs text-muted-foreground">
                                                                                                ({categoryPermissions.length}/{totalScreensInCategory} configured)
                                                                                            </span>
                                                                                        </h5>

                                                                                        {/* Bulk Actions */}
                                                                                        <div className="flex items-center gap-1">
                                                                                            <span className="text-xs text-muted-foreground mr-1">Quick Set:</span>
                                                                                            <Button
                                                                                                variant="outline"
                                                                                                size="sm"
                                                                                                className="h-7 text-xs px-2"
                                                                                                onClick={() => handleBulkSetPermissions(service, category, menuItems, 'view')}
                                                                                            >
                                                                                                All View
                                                                                            </Button>
                                                                                            <Button
                                                                                                variant="outline"
                                                                                                size="sm"
                                                                                                className="h-7 text-xs px-2"
                                                                                                onClick={() => handleBulkSetPermissions(service, category, menuItems, 'modify')}
                                                                                            >
                                                                                                All Modify
                                                                                            </Button>
                                                                                            <Button
                                                                                                variant="outline"
                                                                                                size="sm"
                                                                                                className="h-7 text-xs px-2"
                                                                                                onClick={() => handleBulkSetPermissions(service, category, menuItems, 'full')}
                                                                                            >
                                                                                                All Full
                                                                                            </Button>
                                                                                            <Button
                                                                                                variant="ghost"
                                                                                                size="sm"
                                                                                                className="h-7 text-xs px-2 text-destructive hover:text-destructive"
                                                                                                onClick={() => handleBulkSetPermissions(service, category, menuItems, 'none')}
                                                                                            >
                                                                                                Clear
                                                                                            </Button>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="max-h-[350px] overflow-y-auto pr-2">
                                                                                        <NestedMenuSelector
                                                                                            items={menuItems}
                                                                                            screenPermissions={getScreenPermissionsForCategory(service, category)}
                                                                                            onPermissionChange={(path, permission) => handleScreenPermissionChange(service, category, path, permission)}
                                                                                            enableMenuPermissions={service === "Property Tax" && category === "NTIS"}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                </AccordionContent>
                                                            </AccordionItem>
                                                        );
                                                    })}
                                                </Accordion>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ScrollArea>
                    </div>

                    <DialogFooter className="flex-shrink-0 px-6 py-4 gap-2 sm:gap-0 border-t border-slate-200 bg-slate-50/50">
                        <Button variant="outline" onClick={() => setShowModal(false)} className="border-slate-300">
                            Cancel
                        </Button>
                        <Button onClick={handleCreateUser} className="gap-2 bg-gradient-to-r from-[#004c8c] to-[#0369a1] hover:from-[#003d70] hover:to-[#025a8a] shadow-md">
                            <UserPlus className="w-4 h-4" />
                            Create User
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete User Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent className="fixed left-[50%] top-[50%] z-50 max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the user <span className="font-medium text-foreground">{userToDelete}</span>.
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Create Security Layer Dialog */}
            <Dialog open={showLayerModal} onOpenChange={setShowLayerModal}>
                <DialogContent className="sm:max-w-[900px] lg:max-w-[1000px] max-h-[90vh] flex flex-col mx-auto my-8 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white via-slate-50 to-blue-50/30 overflow-auto">
                    <DialogHeader className="bg-gradient-to-r from-[#004c8c] to-[#0369a1] text-white rounded-t-lg -mx-6 -mt-6 px-6 pt-6 pb-4 mb-4">
                        <DialogTitle className="text-white">Create New Security Layer</DialogTitle>
                        <DialogDescription className="text-blue-50">
                            Set up a new security layer with custom permissions and access rules.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2 bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-slate-200 shadow-sm">
                            <Label htmlFor="layerName" className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-[#004c8c]" />
                                Layer Name
                            </Label>
                            <Input
                                id="layerName"
                                name="name"
                                placeholder="e.g., Finance Department, Executive Access"
                                value={layerFormData.name}
                                onChange={handleLayerChange}
                                className="bg-white border-slate-300 focus:border-[#004c8c] focus:ring-[#004c8c]"
                            />
                        </div>

                        <div className="grid gap-2 bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-slate-200 shadow-sm">
                            <Label htmlFor="layerDescription" className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-[#004c8c]" />
                                Description
                            </Label>
                            <Textarea
                                id="layerDescription"
                                name="description"
                                placeholder="Describe the purpose and scope of this security layer"
                                value={layerFormData.description}
                                onChange={handleLayerChange}
                                rows={4}
                                className="bg-white border-slate-300 focus:border-[#004c8c] focus:ring-[#004c8c]"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowLayerModal(false)} className="border-slate-300">
                            Cancel
                        </Button>
                        <Button onClick={handleCreateLayer} className="bg-gradient-to-r from-[#004c8c] to-[#0369a1] hover:from-[#003d70] hover:to-[#025a8a] shadow-md">
                            <Shield className="w-4 h-4 mr-2" />
                            Create Layer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Security Layer Confirmation Dialog */}
            <AlertDialog open={deleteLayerDialogOpen} onOpenChange={setDeleteLayerDialogOpen}>
                <AlertDialogContent className="fixed left-[50%] top-[50%] z-50 max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Security Layer?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete this security layer and remove all associated permissions.
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmDeleteLayer}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete Layer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Add User to Layer Modal */}
            <Dialog open={showAddUserToLayerModal} onOpenChange={setShowAddUserToLayerModal}>
                <DialogContent className="sm:max-w-[900px] lg:max-w-[1000px] max-h-[90vh] flex flex-col mx-auto my-8 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#F5F2F4] via-[#F5F2F4] to-[#9DADC7] overflow-auto">
                    <DialogHeader>
                        <DialogTitle>Add User to Layer</DialogTitle>
                        <DialogDescription>
                            Assign users to security layers and manage user-layer relationships
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-2 gap-8 py-4">
                        {/* Left Side: Search User */}
                        <div className="space-y-4">
                            <div>
                                <h4 className="mb-3">Search User</h4>

                                {/* Search Criteria */}
                                <div className="mb-3">
                                    <Label className="mb-2 block text-sm">Search Criteria</Label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="searchCriteria"
                                                value="userId"
                                                checked={searchCriteria === "userId"}
                                                onChange={(e) => setSearchCriteria("userId")}
                                                className="w-4 h-4"
                                            />
                                            <span className="text-sm">UserID</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="searchCriteria"
                                                value="userName"
                                                checked={searchCriteria === "userName"}
                                                onChange={(e) => setSearchCriteria("userName")}
                                                className="w-4 h-4"
                                            />
                                            <span className="text-sm">User Name</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Search Text */}
                                <div className="mb-3">
                                    <Label htmlFor="searchText" className="mb-2 block text-sm">Search Text</Label>
                                    <Input
                                        id="searchText"
                                        placeholder="Enter search text..."
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Users Table */}
                            <div className="border rounded-md">
                                <ScrollArea className="h-[400px]">
                                    <Table>
                                        <TableHeader className="sticky top-0 bg-background">
                                            <TableRow>
                                                <TableHead className="w-12">Select</TableHead>
                                                <TableHead>UserID</TableHead>
                                                <TableHead>User Name</TableHead>
                                                <TableHead>Full Name</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredUsers.map((user, idx) => (
                                                <TableRow
                                                    key={idx}
                                                    className={selectedUserForLayer === user.username ? "bg-blue-50" : ""}
                                                >
                                                    <TableCell>
                                                        <Checkbox
                                                            checked={selectedUserForLayer === user.username}
                                                            onCheckedChange={(checked) => {
                                                                setSelectedUserForLayer(checked ? user.username : null);
                                                            }}
                                                                className = "border-4 border-gray-900 data-[state=checked]:border-blue-600"
                                                        />
                                                    </TableCell>
                                                    <TableCell>{idx + 1}</TableCell>
                                                    <TableCell>{user.username}</TableCell>
                                                    <TableCell>{user.username}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </ScrollArea>
                            </div>
                        </div>

                        {/* Right Side: Add user to layer */}
                        <div className="space-y-4">
                            <div>
                                <h4 className="mb-3">Add user to layer</h4>

                                {/* Layer Name Dropdown */}
                                <div className="mb-3">
                                    <Label htmlFor="layerName" className="mb-2 block text-sm">Layer Name</Label>
                                    <Select value={addUserLayerId} onValueChange={setAddUserLayerId}>
                                        <SelectTrigger id="layerName">
                                            <SelectValue placeholder="Select layer" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {securityLayers.map((layer) => (
                                                <SelectItem key={layer.id} value={layer.id}>
                                                    {layer.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Users in Layer Table */}
                            <div className="border rounded-md">
                                <ScrollArea className="h-[400px]">
                                    <Table>
                                        <TableHeader className="sticky top-0 bg-background">
                                            <TableRow>
                                                <TableHead className="w-12">Select</TableHead>
                                                <TableHead>UserID</TableHead>
                                                <TableHead>User Name</TableHead>
                                                <TableHead>Full Name</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {usersInSelectedLayer.map((user, idx) => (
                                                <TableRow
                                                    key={idx}
                                                    className={selectedUsersInLayer.includes(user.username) ? "bg-blue-50" : ""}
                                                >
                                                    <TableCell>
                                                        <Checkbox
                                                            checked={selectedUsersInLayer.includes(user.username)}
                                                            onCheckedChange={(checked) => {
                                                                if (checked) {
                                                                    setSelectedUsersInLayer([...selectedUsersInLayer, user.username]);
                                                                } else {
                                                                    setSelectedUsersInLayer(selectedUsersInLayer.filter(u => u !== user.username));
                                                                }
                                                            }}
                                                            className="border-4 border-gray-900 data-[state=checked]:border-blue-600"
                                                        />
                                                    </TableCell>
                                                    <TableCell>{idx + 1}</TableCell>
                                                    <TableCell>{user.username}</TableCell>
                                                    <TableCell>{user.username}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </ScrollArea>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="flex justify-between sm:justify-between">
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={handleAddUserToLayer}
                                disabled={!selectedUserForLayer || !addUserLayerId}
                            >
                                Add User
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleRemoveUsersFromLayer}
                                disabled={selectedUsersInLayer.length === 0}
                            >
                                Remove User
                            </Button>
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={handleSaveUserLayerChanges}>
                                Save Changes
                            </Button>
                            <Button variant="outline" onClick={handleClearUserLayer}>
                                Clear
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit User Dialog */}
            <Dialog open={showEditUserModal} onOpenChange={(open) => {
                setShowEditUserModal(open);
                if (!open) {
                    setEditingUser(null);
                    setEditUserLayerSelection("");
                    setEditUserServicePermissions({});
                    setEditUserCustomLayerPermissions([]);
                    setEditUserSelectedPermissionLayer("");
                }
            }}>
                <DialogContent className="sm:max-w-[900px] lg:max-w-[1000px] max-h-[90vh] flex flex-col mx-auto my-8 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white via-slate-50 to-blue-50/30 overflow-auto">
                    <DialogHeader className="flex-shrink-0 px-6 pt-6 pb-4 bg-gradient-to-r from-[#004c8c] to-[#0369a1] text-white rounded-t-lg">
                        <DialogTitle className="text-white">Edit User: {editingUser}</DialogTitle>
                        <DialogDescription className="text-blue-50">
                            Update security layer assignment and permissions for this user
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 overflow-auto px-6">
                        <ScrollArea className="h-full pr-4">
                            <div className="grid gap-4 pb-4 pt-4">
                                <div className="grid gap-2 bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-slate-200 shadow-sm">
                                    <Label htmlFor="editLayer" className="flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-[#004c8c]" />
                                        Security Layer
                                    </Label>
                                    <Select value={editUserLayerSelection} onValueChange={setEditUserLayerSelection}>
                                        <SelectTrigger id="editLayer" className="bg-white border-slate-300 focus:border-[#004c8c] focus:ring-[#004c8c]">
                                            <SelectValue placeholder="Select security layer" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white w-[52rem]">
                                            {securityLayers.map((layer) => (
                                                <SelectItem key={layer.id} value={layer.id}>
                                                    {layer.name} - {layer.description}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <p className="text-xs text-slate-600 mt-1">
                                        Changing the security layer will update the user's base permissions according to the selected layer.
                                    </p>
                                </div>

                                {/* Edit User Additional Permissions Section */}
                                <div className="border border-slate-200 rounded-lg p-4 space-y-3 bg-gradient-to-br from-blue-50/50 to-slate-50/50 backdrop-blur-sm shadow-sm">
                                    <Label className="text-sm">Additional Permissions (Optional)</Label>

                                    {/* Manage Layer Permissions */}
                                    {editUserSelectedPermissionLayer && (
                                        <div className="border rounded-lg p-4 space-y-3 bg-background">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-sm">Layer-Based Permissions</Label>
                                                <Badge variant="outline" className="text-xs flex-shrink-0 ml-2">
                                                    {editUserSelectedPermissionLayer && securityLayers.find(l => l.id === editUserSelectedPermissionLayer)?.name}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                Customize screen permissions for this user without affecting the layer's default permissions.
                                            </p>

                                            {editUserCustomLayerPermissions.length > 0 && (
                                                <div className="mt-3">
                                                    <div className="border rounded-md overflow-auto">
                                                        <ScrollArea className="h-[400px]">
                                                            <Table>
                                                                <TableHeader className="sticky top-0 bg-background z-10">
                                                                    <TableRow>
                                                                        <TableHead className="min-w-[200px]">Screen Name</TableHead>
                                                                        <TableHead className="text-center w-20">None</TableHead>
                                                                        <TableHead className="text-center w-20">View</TableHead>
                                                                        <TableHead className="text-center w-20">Modify</TableHead>
                                                                        <TableHead className="text-center w-20">Full</TableHead>
                                                                    </TableRow>
                                                                </TableHeader>
                                                                <TableBody>
                                                                    {editUserCustomLayerPermissions.map((perm, index) => (
                                                                        <TableRow key={index} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                                                                            <TableCell className="text-sm py-2.5">{perm.screenName}</TableCell>
                                                                            <TableCell className="text-center py-2.5">
                                                                                <div className="flex justify-center">
                                                                                    <Checkbox
                                                                                        checked={perm.none}
                                                                                        onCheckedChange={() => handleEditUserCustomPermissionChange(index, 'none')}
                                                                                        className="border-4 border-gray-900 data-[state=checked]:border-blue-600"
                                                                                    />
                                                                                </div>
                                                                            </TableCell>
                                                                            <TableCell className="text-center py-2.5">
                                                                                <div className="flex justify-center">
                                                                                    <Checkbox
                                                                                        checked={perm.view}
                                                                                        onCheckedChange={() => handleEditUserCustomPermissionChange(index, 'view')}
                                                                                        className="border-4 border-gray-900 data-[state=checked]:border-blue-600"
                                                                                    />
                                                                                </div>
                                                                            </TableCell>
                                                                            <TableCell className="text-center py-2.5">
                                                                                <div className="flex justify-center">
                                                                                    <Checkbox
                                                                                        checked={perm.modify}
                                                                                        onCheckedChange={() => handleEditUserCustomPermissionChange(index, 'modify')}
                                                                                        className="border-4 border-gray-900 data-[state=checked]:border-blue-600"
                                                                                    />
                                                                                </div>
                                                                            </TableCell>
                                                                            <TableCell className="text-center py-2.5">
                                                                                <div className="flex justify-center">
                                                                                    <Checkbox
                                                                                        checked={perm.fullControl}
                                                                                        onCheckedChange={() => handleEditUserCustomPermissionChange(index, 'fullControl')}
                                                                                        className="border-4 bg-transparent border-gray-900 data-[state=checked]:border-blue-600"
                                                                                    />
                                                                                </div>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </ScrollArea>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-2">
                                                        <p className="text-xs text-muted-foreground">
                                                            Showing all {editUserCustomLayerPermissions.length} screens from the selected layer.
                                                        </p>
                                                        <Badge variant="secondary" className="text-xs">
                                                            {editUserCustomLayerPermissions.filter(p => !p.none).length} active
                                                        </Badge>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Service-Based Additional Permissions */}
                                    <div className="grid gap-3 mt-4">
                                        <Label className="text-sm">Service-Based Permissions</Label>
                                        <p className="text-xs text-muted-foreground">
                                            Set individual permission levels for each screen within services.
                                        </p>

                                        {/* Info Box */}
                                        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md p-3">
                                            <div className="flex gap-2">
                                                <Eye className="w-4 h-4 text-blue-900 flex-shrink-0 mt-0.5" />
                                                <div className="space-y-1 text-xs">
                                                    <p className="text-blue-900 dark:text-blue-900">
                                                        <strong>Permission Levels:</strong>
                                                    </p>
                                                    <ul className="space-y-1 text-blue-800 dark:text-blue-900 pl-4 list-disc">
                                                        <li><strong>None:</strong> No access to this screen</li>
                                                        <li><strong>View:</strong> Can only view data (read-only)</li>
                                                        <li><strong>Modify:</strong> Can view and edit data</li>
                                                        <li><strong>Full Access:</strong> Complete control including delete</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <Accordion type="multiple" className="w-full">
                                            {Object.entries(getAvailableServices()).map(([service, categories]) => {
                                                const totalScreensWithPermissions = editUserServicePermissions[service]
                                                    ? Object.values(editUserServicePermissions[service]).flat().filter(p => p.permission !== 'none').length
                                                    : 0;

                                                return (
                                                    <AccordionItem key={service} value={service} className="border rounded-md px-4 mb-2">
                                                        <AccordionTrigger className="text-sm py-3 hover:no-underline">
                                                            <div className="flex items-center gap-2 flex-wrap w-full mr-2">
                                                                <span className="flex-1 text-left">{service}</span>
                                                                {totalScreensWithPermissions > 0 && (
                                                                    <Badge variant="secondary" className="text-xs">
                                                                        {totalScreensWithPermissions} screens configured
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                        </AccordionTrigger>
                                                        <AccordionContent className="pb-3">
                                                            <div className="space-y-3 pt-2">
                                                                {/* Service-level Bulk Actions */}
                                                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 rounded-md p-3 mb-3">
                                                                    <div className="flex items-center justify-between gap-2 flex-wrap">
                                                                        <div className="flex items-center gap-2">
                                                                            <Shield className="w-4 h-4 text-blue-600" />
                                                                            <span className="text-sm">Apply to entire service:</span>
                                                                        </div>
                                                                        <div className="flex items-center gap-1">
                                                                            <Button
                                                                                variant="outline"
                                                                                size="sm"
                                                                                className="h-8 text-xs px-3 bg-white dark:bg-slate-200"
                                                                                onClick={() => handleBulkSetServicePermissions(service, categories, 'view', true)}
                                                                            >
                                                                                All View
                                                                            </Button>
                                                                            <Button
                                                                                variant="outline"
                                                                                size="sm"
                                                                                className="h-8 text-xs px-3 bg-white dark:bg-slate-200"
                                                                                onClick={() => handleBulkSetServicePermissions(service, categories, 'modify', true)}
                                                                            >
                                                                                All Modify
                                                                            </Button>
                                                                            <Button
                                                                                variant="outline"
                                                                                size="sm"
                                                                                className="h-8 text-xs px-3 bg-white dark:bg-slate-100"
                                                                                onClick={() => handleBulkSetServicePermissions(service, categories, 'full', true)}
                                                                            >
                                                                                All Full Access
                                                                            </Button>
                                                                            <Button
                                                                                variant="ghost"
                                                                                size="sm"
                                                                                className="h-8 text-xs px-3 text-destructive hover:text-destructive"
                                                                                onClick={() => handleBulkSetServicePermissions(service, categories, 'none', true)}
                                                                            >
                                                                                Clear All
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="border-t pt-3">
                                                                    <p className="text-xs text-muted-foreground mb-3">Or configure permissions by category:</p>
                                                                </div>

                                                                {Object.entries(categories).map(([category, menuItems]) => {
                                                                    const categoryPermissions = getScreenPermissionsForCategory(service, category, true);
                                                                    const totalScreensInCategory = getAllScreenPaths(menuItems).length;

                                                                    return (
                                                                        <div key={category} className="border rounded-md p-3 bg-muted/30">
                                                                            <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
                                                                                <h5 className="text-sm flex items-center gap-2">
                                                                                    {category}
                                                                                    <span className="text-xs text-muted-foreground">
                                                                                        ({categoryPermissions.length}/{totalScreensInCategory} configured)
                                                                                    </span>
                                                                                </h5>

                                                                                {/* Bulk Actions */}
                                                                                <div className="flex items-center gap-1">
                                                                                    <span className="text-xs text-muted-foreground mr-1">Quick Set:</span>
                                                                                    <Button
                                                                                        variant="outline"
                                                                                        size="sm"
                                                                                        className="h-7 text-xs px-2"
                                                                                        onClick={() => handleEditUserBulkSetPermissions(service, category, menuItems, 'view')}
                                                                                    >
                                                                                        View
                                                                                    </Button>
                                                                                    <Button
                                                                                        variant="outline"
                                                                                        size="sm"
                                                                                        className="h-7 text-xs px-2"
                                                                                        onClick={() => handleEditUserBulkSetPermissions(service, category, menuItems, 'modify')}
                                                                                    >
                                                                                        Modify
                                                                                    </Button>
                                                                                    <Button
                                                                                        variant="outline"
                                                                                        size="sm"
                                                                                        className="h-7 text-xs px-2"
                                                                                        onClick={() => handleEditUserBulkSetPermissions(service, category, menuItems, 'full')}
                                                                                    >
                                                                                        Full
                                                                                    </Button>
                                                                                    <Button
                                                                                        variant="ghost"
                                                                                        size="sm"
                                                                                        className="h-7 text-xs px-2 text-destructive hover:text-destructive"
                                                                                        onClick={() => handleEditUserBulkSetPermissions(service, category, menuItems, 'none')}
                                                                                    >
                                                                                        Clear
                                                                                    </Button>
                                                                                </div>
                                                                            </div>

                                                                            <NestedMenuSelector
                                                                                items={menuItems}
                                                                                onPermissionChange={(screenPath, permission) =>
                                                                                    handleEditUserScreenPermissionChange(service, category, screenPath, permission)
                                                                                }
                                                                                screenPermissions={categoryPermissions}
                                                                                enableMenuPermissions={service === "Property Tax" && category === "NTIS"}
                                                                            />
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                );
                                            })}
                                        </Accordion>
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                    </div>

                    <DialogFooter className="flex-shrink-0 border-t border-slate-200 bg-slate-50/50 px-6 py-4">
                        <Button variant="outline" onClick={() => setShowEditUserModal(false)} className="border-slate-300">
                            Cancel
                        </Button>
                        <Button onClick={handleSaveUserEdit} className="bg-gradient-to-r from-[#004c8c] to-[#0369a1] hover:from-[#003d70] hover:to-[#025a8a] shadow-md">
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete User Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent className="fixed left-[50%] top-[50%] z-50 max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the user "{userToDelete}" and remove them from all security layers.
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete User
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Delete Layer Confirmation Dialog */}
            <AlertDialog open={deleteLayerDialogOpen} onOpenChange={setDeleteLayerDialogOpen}>
                <AlertDialogContent className="fixed left-[50%] top-[50%] z-50 max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Security Layer?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the security layer "{securityLayers.find(l => l.id === layerToDelete)?.name}".
                            All users assigned to this layer will be removed from it. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmDeleteLayer} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete Layer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default UserManagement;