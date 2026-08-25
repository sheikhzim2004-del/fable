"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Table, Chip, Button, Avatar } from "@heroui/react";
import {
    TrashBin,
    PencilToLine,
    ShieldCheck,
    Persons,
    TriangleExclamation
} from "@gravity-ui/icons";
import { deleteUser, updateUserRole } from "@/lib/api/books";

// রোল অনুযায়ী চিপের কালার ভ্যারিয়েন্ট
const roleColorMap = {
    admin: "danger",
    writer: "primary",
    user: "default",
    reader: "default",
};

export default function ManageUsersTable({ initialUsers = [] }) {

    // console.log("initialUsers", initialUsers)

    const [users, setUsers] = useState(initialUsers);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [newRole, setNewRole] = useState("");

    // ১. রোল পরিবর্তনের ডায়ালগ ওপেন
    const handleOpenRoleModal = (user) => {
        setSelectedUser(user);
        setNewRole(user?.role || "user");
        setIsRoleModalOpen(true);
    };

    // ২. ডিলিট কনফার্মেশন ডায়ালগ ওপেন
    const handleOpenDeleteModal = (user) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    // ৩. রোল আপডেট কনফার্মেশন
    const handleConfirmRoleChange = async () => {
        if (!selectedUser) return;


        // update role API here (e.g., await updateUserRole(selectedUser._id, newRole))
        await updateUserRole(selectedUser._id, newRole)
        console.log(`Update user ${selectedUser._id} to role: ${newRole}`);

        // লোকাল স্টেট আপডেট (ডেমো)
        setUsers((prev) =>
            prev.map((u) => (u._id === selectedUser._id ? { ...u, role: newRole } : u))
        );
        setIsRoleModalOpen(false);
        setSelectedUser(null);
    };

    // ৪. ইউজার ডিলিট কনফার্মেশন
    const handleConfirmDelete = async () => {
        if (!selectedUser) return;

        // delete user API here (e.g., await deleteUser(selectedUser._id))
        await deleteUser(selectedUser._id)
        console.log(`Delete user ${selectedUser._id}`);

        // লোকাল স্টেট থেকে রিমুভ (ডেমো)
        setUsers((prev) => prev.filter((u) => u._id !== selectedUser._id));
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
    };

    const getInitial = (name) => name?.trim()?.[0]?.toUpperCase() || "U";

    const getAvatarGradient = (name = "") => {
        const gradients = [
            "from-purple-500 to-indigo-600",
            "from-cyan-500 to-blue-600",
            "from-emerald-500 to-teal-600",
            "from-amber-500 to-orange-600",
            "from-rose-500 to-pink-600",
            "from-fuchsia-500 to-pink-500",
        ];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return gradients[Math.abs(hash) % gradients.length];
    };

    return (
        <div className="m-6 space-y-6">
            {/* হেডার সেকশন */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-text-primary">
                        Manage Users
                    </h2>
                    <p className="text-sm text-text-secondary">
                        Control user permissions, update system roles, or remove accounts.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Chip variant="flat" color="primary" className="font-semibold">
                        Total Users: {users.length}
                    </Chip>
                </div>
            </div>

            {/* HeroUI Table Container with Framer Motion Animation */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-border-main bg-bg-secondary p-2 shadow-sm overflow-hidden"
            >
                <Table className="min-w-full">
                    <Table.ScrollContainer>
                        <Table.Content aria-label="Users management table" className="w-full">
                            <Table.Header className="border-b border-border-main bg-bg-primary/50 text-xs font-bold uppercase text-text-secondary">
                                <Table.Column isRowHeader className="py-3.5 px-4 text-left">User</Table.Column>
                                <Table.Column className="py-3.5 px-4 text-left">Email</Table.Column>
                                <Table.Column className="py-3.5 px-4 text-left">Current Role</Table.Column>
                                <Table.Column className="py-3.5 px-4 text-right">Actions</Table.Column>
                            </Table.Header>

                            <Table.Body className="divide-y divide-border-main">
                                {users.length > 0 ? (
                                    users.map((user) => (
                                        <Table.Row
                                            key={user._id || user.id}
                                            className="transition-colors hover:bg-bg-primary/40"
                                        >
                                            {/* Name & Avatar */}
                                            <Table.Cell className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    {user?.image || user?.avatar ? (
                                                        <Avatar src={user.image || user.avatar} className="size-9 ring-1 ring-border-main" />
                                                    ) : (
                                                        <div
                                                            className={`flex size-9 items-center justify-center rounded-full bg-gradient-to-tr text-xs font-bold text-white shadow-sm ring-1 ring-border-main ${getAvatarGradient(user?.name || "U")}`}
                                                        >
                                                            {getInitial(user?.name)}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="text-sm font-semibold text-text-primary">
                                                            {user?.name || "Unnamed User"}
                                                        </p>
                                                        <span className="text-[11px] text-text-secondary block">
                                                            ID: {user?._id?.slice(-6) || "N/A"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Table.Cell>

                                            {/* Email */}
                                            <Table.Cell className="py-4 px-4 text-sm text-text-secondary">
                                                {user?.email || "No email"}
                                            </Table.Cell>

                                            {/* Role Chip */}
                                            <Table.Cell className="py-4 px-4">
                                                <Chip
                                                    variant="flat"
                                                    size="sm"
                                                    color={roleColorMap[user?.role?.toLowerCase()] || "default"}
                                                    className="font-semibold capitalize text-xs tracking-wide"
                                                >
                                                    {user?.role || "user"}
                                                </Chip>
                                            </Table.Cell>

                                            {/* Actions */}
                                            <Table.Cell className="py-4 px-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {/* Change Role Button */}
                                                    <Button
                                                        size="sm"
                                                        variant="flat"
                                                        color="primary"
                                                        onPress={() => handleOpenRoleModal(user)}
                                                        className="rounded-lg font-medium text-xs gap-1.5 h-8 px-3"
                                                        startContent={<PencilToLine className="size-3.5" />}
                                                    >
                                                        Change Role
                                                    </Button>

                                                    {/* Delete User Button */}
                                                    <Button
                                                        size="sm"
                                                        variant="flat"
                                                        color="danger"
                                                        onPress={() => handleOpenDeleteModal(user)}
                                                        className="rounded-lg font-medium text-xs gap-1.5 h-8 px-3"
                                                        startContent={<TrashBin className="size-3.5" />}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                ) : (
                                    <Table.Row>
                                        <Table.Cell colSpan={4} className="py-12 text-center text-text-secondary">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <Persons className="size-8 text-text-secondary/50" />
                                                <p className="text-sm font-medium">No users found in database.</p>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </motion.div>

            {/* Change Role Custom Dialog / Modal */}
            <AnimatePresence>
                {isRoleModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-md rounded-2xl border border-border-main bg-bg-secondary p-6 shadow-2xl space-y-5"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                                    <ShieldCheck className="size-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-text-primary">Update User Role</h3>
                                    <p className="text-xs text-text-secondary">Assign a new role to {selectedUser?.name}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Select Role
                                </label>
                                <select
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value)}
                                    className="w-full rounded-xl border border-border-main bg-bg-primary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-brand-primary"
                                >
                                    <option value="user">User / Reader</option>
                                    <option value="writer">Writer</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <Button
                                    variant="bordered"
                                    onPress={() => setIsRoleModalOpen(false)}
                                    className="rounded-xl border-border-main font-medium text-xs"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={handleConfirmRoleChange}
                                    className="rounded-xl font-semibold text-xs"
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-md rounded-2xl border border-border-main bg-bg-secondary p-6 shadow-2xl space-y-5"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-xl bg-danger/10 text-danger">
                                    <TriangleExclamation className="size-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-text-primary">Delete User</h3>
                                    <p className="text-xs text-text-secondary">Are you sure you want to proceed?</p>
                                </div>
                            </div>

                            <p className="text-sm text-text-secondary leading-relaxed">
                                This will permanently remove <strong className="text-text-primary">{selectedUser?.name}</strong> (<span className="text-xs opacity-75">{selectedUser?.email}</span>) from the system. This action cannot be undone.
                            </p>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <Button
                                    variant="bordered"
                                    onPress={() => setIsDeleteModalOpen(false)}
                                    className="rounded-xl border-border-main font-medium text-xs"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    color="danger"
                                    onPress={handleConfirmDelete}
                                    className="rounded-xl font-semibold text-xs text-white"
                                >
                                    Confirm Delete
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}