import React, { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import HomeNavbar from "../HomePage/HomeNavbar";

const screens = [
    "home",
    "propertyTaxSurvey",
    "propertyTaxCollection",
    "propertyTaxBilling",
    "propertySearch",
    "propertySearchDetails",
    "wadhghatHistory",
    "ferfarHistory",
    "master",
    "assessmentQC",
    "user-management",
];

function UserManagement() {
    const { users, createUser, assignPermissions } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [showPermissionModal, setShowPermissionModal] = useState(false);
    const [formData, setFormData] = useState({ username: "", password: "", role: "User" });
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleCreateUser = () => {
        if (!formData.username || !formData.password) return alert("Please fill all fields");
        createUser(formData);
        setFormData({ username: "", password: "", role: "User" });
        setShowModal(false);
    };

    const handleAssignPermissions = () => {
        if (!selectedUser) return alert("Select a user first");
        assignPermissions(selectedUser.username, selectedPermissions);
        setShowPermissionModal(false);
        alert("Permissions updated!");
    };

    return (
        <div className="p-6">
            <HomeNavbar />
            <h1 className="text-2xl font-semibold mb-4 mt-5">User Management</h1>

            <div className="flex gap-4 mb-6 mt-5">
                <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setShowModal(true)}>Create User</button>
                <button className="bg-yellow-600 text-white px-4 py-2 rounded" onClick={() => setShowPermissionModal(true)}>Assign Permission</button>
            </div>

            <h2 className="text-lg font-medium mb-2">Existing Users</h2>
            <table className="w-full border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-2 py-1">Username</th>
                        <th className="border px-2 py-1">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u, idx) => (
                        <tr key={idx} onClick={() => setSelectedUser(u)} className={selectedUser?.username === u.username ? "bg-blue-50" : ""}>
                            <td className="border px-2 py-1">{u.username}</td>
                            <td className="border px-2 py-1">{u.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Create User Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white p-6 rounded shadow-md w-96">
                        <h2 className="text-xl font-semibold mb-4">Create New User</h2>
                        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="border p-2 w-full mb-3 rounded" />
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="border p-2 w-full mb-3 rounded" />
                        <select name="role" value={formData.role} onChange={handleChange} className="border p-2 w-full mb-3 rounded">
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
                            <button onClick={handleCreateUser} className="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Assign Permission Modal */}
            {showPermissionModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white p-6 rounded shadow-md w-96">
                        <h2 className="text-xl font-semibold mb-4">Assign Permissions</h2>
                        {selectedUser ? (
                            <>
                                {screens.map((s) => (
                                    <div key={s} className="flex items-center gap-2 mb-1">
                                        <input type="checkbox" checked={selectedPermissions.includes(s)} onChange={(e) => {
                                            if (e.target.checked) setSelectedPermissions([...selectedPermissions, s]);
                                            else setSelectedPermissions(selectedPermissions.filter(p => p !== s));
                                        }} />
                                        <label>{s}</label>
                                    </div>
                                ))}
                                <div className="flex justify-end gap-2 mt-2">
                                    <button onClick={() => setShowPermissionModal(false)} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
                                    <button onClick={handleAssignPermissions} className="px-4 py-2 bg-blue-600 text-white rounded">Assign</button>
                                </div>
                            </>
                        ) : (
                            <p>Select a user from the table first.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserManagement;
