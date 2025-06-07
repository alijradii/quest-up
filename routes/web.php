<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\QuestController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth'])->get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::middleware(['auth'])->prefix('quests')->name('quests.')->group(function () {
    Route::get('/dashboard', [QuestController::class, 'index'])->name('index');
    Route::post('/create', [QuestController::class, 'createQuest'])->name('create');
    Route::put('/{quest}', [QuestController::class, 'updateQuest'])->name('update');
});


Route::get('/leaderboard', function () {
    return Inertia::render('Leaderboard');
})->middleware(['auth'])->name('leaderboard');

Route::get('/admin', function () {
    return Inertia::render('Admin');
})->middleware(['auth'])->name('admin');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/hello', function () {
    return Inertia::render('HelloWorld');
})->name('hello');

require __DIR__ . '/auth.php';
