<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class DashboardRedirectController extends Controller
{
    /**
     * GET /dashboard — sends each role to its real dashboard route.
     * Every actual dashboard controller lives behind a role-specific URL below.
     */
    public function __invoke(Request $request): RedirectResponse
    {
        $role = $request->user()->role;

        $routeName = match ($role) {
            'super_admin' => 'super-admin.dashboard',
            'admin'       => 'admin.dashboard',
            'editor'      => 'editor.dashboard',
            'author'      => 'author.dashboard',
            'moderator'   => 'moderator.dashboard',
            'subscriber'  => 'subscriber.dashboard',
            'premium'     => 'premium.dashboard',
            default       => abort(403, 'Unauthorized.'),
        };

        return redirect()->route($routeName);
    }
}