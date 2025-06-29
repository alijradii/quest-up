<?php

namespace App\Models;

use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quest extends Model
{
    use HasFactory;

    // Optional constants for status and difficulty
    public const STATUS_PENDING = 'pending';
    public const STATUS_COMPLETE = 'complete';
    public const STATUS_EXPIRED = 'expired';

    public const DIFFICULTY_EASY = 'easy';
    public const DIFFICULTY_MEDIUM = 'medium';
    public const DIFFICULTY_HARD = 'hard';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'title',
        'description',
        'status',
        'difficulty',
        'completed_at',
        'expire_at',
        'user_id',
    ];

    /**
     * The attributes that should be cast to native types.
     */
    protected $casts = [
        'completed_at' => 'datetime',
        'expire_at' => 'datetime',
        'categories' => 'array',
    ];

    /**
     * Get the user that owns the quest.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The categories that belong to the quest.
     */
    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    /**
     * Check if the quest is complete.
     */
    public function isComplete(): bool
    {
        return $this->status === self::STATUS_COMPLETE;
    }

    /**
     * Mark the quest as completed.
     */
    public function markAsComplete(): void
    {
        $this->status = self::STATUS_COMPLETE;
        $this->completed_at = now();
        $this->save();
    }

    public static function activeForUser($userId)
    {
        $today = Carbon::today();

        return self::with('categories')
            ->where('user_id', $userId)
            ->where(function ($query) use ($today) {
                $query->where('status', 'pending')
                    ->orWhereDate('completed_at', $today)
                    ->orWhereDate('expire_at', $today);
            })
            ->get();
    }

    public static function questsForUser($userId)
    {
        return self::with('categories')->where('user_id', $userId)->get();
    }
}
