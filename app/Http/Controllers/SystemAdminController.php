<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use App\Models\User;
use App\Models\SystemLog;

class SystemAdminController extends Controller
{
    /**
     * Show system logs.
     */
    public function logs()
    {
        // Example: fetch latest 50 logs
        $logs = SystemLog::latest()->take(50)->get();

        return Inertia::render('SystemAdminDashboardPage', [
            'logs' => $logs
        ]);
    }

    /**
     * Manage roles.
     */
    public function roles()
    {
        $roles = Role::all();
        $users = User::with('roles')->get();

        return Inertia::render('SystemAdminDashboardPage', [
            'roles' => $roles,
            'users' => $users
        ]);
    }

    /**
     * Assign a role to a user.
     */
    public function assignRole(Request $request, User $user)
    {
        $request->validate([
            'role' => 'required|string|exists:roles,name',
        ]);

        $user->syncRoles([$request->role]);

        return redirect()->back()->with('success', 'Role assigned successfully.');
    }

    /**
     * Create a new role.
     */
    public function createRole(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:roles,name',
        ]);

        Role::create(['name' => $request->name]);

        return redirect()->back()->with('success', 'Role created successfully.');
    }
}
