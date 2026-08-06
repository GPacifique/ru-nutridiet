<?php

namespace App\Http\Controllers;

use App\Models\Proposal;
use Illuminate\Http\Request;

class ProposalController extends Controller
{
    public function store(Request $request)
    {
        return Proposal::create([
            'project_id' => $request->project_id,
            'freelancer_id' => auth()->id(),
            'cover_letter' => $request->cover_letter,
            'price' => $request->price,
            'duration' => $request->duration,
            'status' => 'pending'
        ]);
    }
}