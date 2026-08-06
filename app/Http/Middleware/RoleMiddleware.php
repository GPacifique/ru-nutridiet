<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * Roles supported:
     * admin, agent, owner, buyer
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        // 1. Check if user is logged in
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();

        // 2. Check if user role exists
        if (!$user->role) {
            abort(403, 'Role not assigned.');
        }

        // 3. Check if user has permission
        if (!in_array($user->role, $roles)) {
            abort(403, 'Unauthorized access.');
        }

        return $next($request);
    }
}