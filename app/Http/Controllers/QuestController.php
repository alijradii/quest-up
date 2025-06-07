<?php

namespace App\Http\Controllers;

use App\Models\Quest;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class QuestController extends Controller
{
    public function createQuest(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'categories' => 'nullable|array',
            'categories.*' => 'string',
            'difficulty' => 'required|in:easy,medium,hard',
            'expire_at' => 'nullable|date',
        ]);

        $quest = Quest::create([
            'user_id' => Auth::id(),
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'categories' => $validated['categories'] ?? [],
            'difficulty' => $validated['difficulty'],
            'expire_at' => $validated['expire_at'] ?? null,
        ]);

        return response()->json($quest, 201);
    }

    public function updateQuest(Request $request, Quest $quest)
    {
        if ($quest->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'categories' => 'nullable|array',
            'categories.*' => 'string',
            'difficulty' => 'in:easy,medium,hard',
            'status' => 'in:pending,complete,expired',
            'completed_at' => 'nullable|date',
            'expire_at' => 'nullable|date',
        ]);

        $quest->update($validated);

        return response()->json($quest);
    }

    public function getQuest(Quest $quest)
    {
        if ($quest->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($quest);
    }


    public function getActiveQuests()
    {
        $today = Carbon::today();

        $quests = Quest::where('user_id', Auth::id())
            ->where(function ($query) use ($today) {
                $query->where('status', 'pending')
                    ->orWhereDate('completed_at', $today)
                    ->orWhereDate('expire_at', $today);
            })
            ->get();

        return response()->json($quests);
    }

    /**
     * used by admins to get user quests
     */
    public function getUserQuests($userId)
    {
        $user = Auth::user();
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $quests = Quest::where('user_id', $userId)->get();
        return response()->json($quests);
    }
}