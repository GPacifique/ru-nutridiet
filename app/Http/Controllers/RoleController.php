<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display all roles.
     */
    public function index()
    {
        $roles = Role::all();

        return Inertia::render('RolesPage', [
            'roles' => $roles
        ]);
    }

    /**
     * Show form to create a new role.
     */
    public function create()
    {
        return Inertia::render('CreateRolePage');
    }

    /**
     * Store a new role.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:roles,name',
        ]);

        Role::create(['name' => $request->name]);

        return redirect()->route('roles.index')->with('success', 'Role created successfully.');
    }

    /**
     * Edit a role.
     */
    public function edit(Role $role)
    {
        return Inertia::render('EditRolePage', [
            'role' => $role
        ]);
    }

    /**
     * Update a role.
     */
    public function update(Request $request, Role $role)
    {
        $request->validate([
            'name' => 'required|string|unique:roles,name,' . $role->id,
        ]);

        $role->update(['name' => $request->name]);

        return redirect()->route('roles.index')->with('success', 'Role updated successfully.');
    }

    /**
     * Delete a role.
     */
    public function destroy(Role $role)
    {
        $role->delete();

        return redirect()->route('roles.index')->with('success', 'Role deleted successfully.');
    }
}
