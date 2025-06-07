<?php

namespace App\Http\Controllers;

use App\Models\Quest;
use Illuminate\Support\Facades\Auth;

use Inertia\Inertia;
use Illuminate\Http\Request;


class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'user' => Auth::user(),
            'activeQuests' => Quest::activeForUser(Auth::id()),
        ]);
    }
}
