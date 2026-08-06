<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display all users.
     */
    public function index(Request $request): Response
    {
        $users = User::query()
            ->when($request->search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('professional_registration_number', 'like', "%{$search}%")
                        ->orWhere('license_number', 'like', "%{$search}%");
                });
            })
            ->when($request->role, function ($query, $role) {
                $query->where('role', $role);
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Users/Index', [
            'users' => $users,
            'filters' => [
                'search' => $request->search,
                'role' => $request->role,
                'status' => $request->status,
            ],
        ]);
    }

    /**
     * Show the create user page.
     */
    public function create(): Response
    {
        return Inertia::render('Users/Create');
    }

    /**
     * Store a new user.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],

            'email' => [
                'required',
                'email',
                'max:255',
                'unique:users,email',
            ],

            'phone' => ['nullable', 'string', 'max:30'],

            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
            ],

            'profile_image' => [
                'nullable',
                'image',
                'max:2048',
            ],

            'bio' => ['nullable', 'string'],

            'address' => ['nullable', 'string', 'max:255'],

            'role' => [
                'required',
                'in:admin,nutritionist',
            ],

            'professional_registration_number' => [
                'nullable',
                'string',
                'max:255',
                'unique:users,professional_registration_number',
            ],

            'license_number' => [
                'nullable',
                'string',
                'max:255',
                'unique:users,license_number',
            ],

            'organization' => [
                'nullable',
                'string',
                'max:255',
            ],

            'country' => [
                'nullable',
                'string',
                'max:255',
            ],

            'status' => [
                'required',
                'in:pending,approved,rejected,suspended,inactive',
            ],
        ]);

        if ($request->hasFile('profile_image')) {
            $validated['profile_image'] = $request
                ->file('profile_image')
                ->store('profile-images', 'public');
        }

        $validated['password'] = Hash::make(
            $validated['password']
        );

        User::create($validated);

        return redirect()
            ->route('users.index')
            ->with('success', 'User created successfully.');
    }

    /**
     * Display a specific user.
     */
    public function show(User $user): Response
    {
        return Inertia::render('Users/Show', [
            'user' => $user,
        ]);
    }

    /**
     * Show the edit user page.
     */
    public function edit(User $user): Response
    {
        return Inertia::render('Users/Edit', [
            'user' => $user,
        ]);
    }

    /**
     * Update a user.
     */
    public function update(
        Request $request,
        User $user
    ): RedirectResponse {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],

            'email' => [
                'required',
                'email',
                'max:255',
                'unique:users,email,' . $user->id,
            ],

            'phone' => ['nullable', 'string', 'max:30'],

            'password' => [
                'nullable',
                'string',
                'min:8',
                'confirmed',
            ],

            'profile_image' => [
                'nullable',
                'image',
                'max:2048',
            ],

            'bio' => ['nullable', 'string'],

            'address' => ['nullable', 'string', 'max:255'],

            'role' => [
                'required',
                'in:admin,nutritionist',
            ],

            'professional_registration_number' => [
                'nullable',
                'string',
                'max:255',
                'unique:users,professional_registration_number,' . $user->id,
            ],

            'license_number' => [
                'nullable',
                'string',
                'max:255',
                'unique:users,license_number,' . $user->id,
            ],

            'organization' => [
                'nullable',
                'string',
                'max:255',
            ],

            'country' => [
                'nullable',
                'string',
                'max:255',
            ],

            'status' => [
                'required',
                'in:pending,approved,rejected,suspended,inactive',
            ],
        ]);

        if ($request->hasFile('profile_image')) {
            $validated['profile_image'] = $request
                ->file('profile_image')
                ->store('profile-images', 'public');
        }

        if (empty($validated['password'])) {
            unset($validated['password']);
        } else {
            $validated['password'] = Hash::make(
                $validated['password']
            );
        }

        $user->update($validated);

        return redirect()
            ->route('users.index')
            ->with('success', 'User updated successfully.');
    }

    /**
     * Delete a user.
     */
    public function destroy(User $user): RedirectResponse
    {
        $user->delete();

        return redirect()
            ->route('users.index')
            ->with('success', 'User deleted successfully.');
    }

    /**
     * Approve a nutritionist account.
     */
    public function approve(User $user): RedirectResponse
    {
        $user->update([
            'status' => 'approved',
        ]);

        return back()->with(
            'success',
            'User approved successfully.'
        );
    }

    /**
     * Suspend a user.
     */
    public function suspend(User $user): RedirectResponse
    {
        $user->update([
            'status' => 'suspended',
        ]);

        return back()->with(
            'success',
            'User suspended successfully.'
        );
    }
}