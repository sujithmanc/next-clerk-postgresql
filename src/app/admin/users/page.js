import { getAllUser } from "@/app/quiz/_services/userService";
import { Users, Mail, Calendar } from "lucide-react";

export default async function AdminPage() {
    const userList = await getAllUser();

    return (
        <div className="min-h-screen bg-base-200 p-6">

            {/* Header */}
            <div className="max-w-6xl mx-auto mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <Users className="w-6 h-6 opacity-70" />
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                </div>
                <p className="text-base-content/70">
                    Manage users, view insights, and control your platform.
                </p>
            </div>

            {/* Stats */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="stat bg-base-100 shadow rounded-box">
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value">{userList.length}</div>
                </div>

                <div className="stat bg-base-100 shadow rounded-box">
                    <div className="stat-title">Active Today</div>
                    <div className="stat-value">{userList.length}</div>
                </div>

                <div className="stat bg-base-100 shadow rounded-box">
                    <div className="stat-title">Growth</div>
                    <div className="stat-value">+12%</div>
                </div>
            </div>

            {/* Users Table */}
            <div className="max-w-6xl mx-auto card bg-base-100 shadow-xl border border-base-300">
                <div className="card-body">

                    <h2 className="card-title mb-4">Users</h2>

                    <div className="overflow-x-auto">
                        <table className="table">

                            {/* Head */}
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Created</th>
                                </tr>
                            </thead>

                            <tbody>
                                {userList.map((user) => (
                                    <tr key={user.id} className="hover">

                                        {/* User Info */}
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="w-10 rounded-full">
                                                        <img src={user.imageUrl} alt={user.name} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-semibold">{user.name}</div>
                                                    <div className="text-xs opacity-60">{user.id}</div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Email */}
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <Mail size={14} className="opacity-60" />
                                                <span>{user.email}</span>
                                            </div>
                                        </td>

                                        {/* Created */}
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="opacity-60" />
                                                <span>
                                                    {new Date(user.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                </div>
            </div>

        </div>
    );
}