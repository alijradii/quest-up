<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\QuestController;

use App\Http\Controllers\UserController;
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
    Route::delete('/{quest}', [QuestController::class, 'deleteQuest'])->name('delete');
    Route::put('/{quest}/complete', [QuestController::class, 'completeQuest'])->name('complete');
});

Route::middleware(['auth'])->get('/leaderboard', [UserController::class, 'index'])->name('leaderboard');

Route::middleware(['auth'])->get('/admin', [AdminController::class, 'index'])->name('admin.index');

Route::middleware(['auth'])->post('/admin/ban/{user}', [AdminController::class, 'banUser'])->name('admin.ban');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/hello', function () {
    return Inertia::render('HelloWorld');
})->name('hello');

require __DIR__ . '/auth.php';
