<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        $users = User::with('quests.categories')->get();

        return Inertia::render('Admin', [
            'user' => Auth::user(),
            'users' => $users
        ]);
    }

    public function banUser(User $user) {
        $user->delete();

        return redirect('/dashboard')->with('success', 'User was banned successfully.');
    }
}
