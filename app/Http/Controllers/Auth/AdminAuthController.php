<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminAuthController extends Controller
{
    /**
     * Show the admin page
     */
    public function  showLogin() {
        return Inertia::render('auth/login', [
            'isAdmin' => true,
        ]);
    }

    /**
     * Handle admin login
     */
    public function  login(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            // check if user is admin
            if($user->role !== 'admin') {
                Auth::logout();
                return back()->withErrors([
                    'email' => 'You are not autorize as admin.',
                ]);
            }

            $request->session()->regenerate();
            return redirect;
        }
        return Inertia::render('auth/login', [
            'isAdmin' => true,
        ]);
    }
}
