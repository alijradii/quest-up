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
        'completedAt',
        'expireAt',
        'user_id',
    ];

    /**
     * The attributes that should be cast to native types.
     */
    protected $casts = [
        'completedAt' => 'datetime',
        'expireAt' => 'datetime',
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
        $this->completedAt = now();
        $this->save();
    }

    public static function activeForUser($userId)
    {
        $today = Carbon::today();

        return self::where('user_id', $userId)
            ->where(function ($query) use ($today) {
                $query->where('status', 'pending')
                    ->orWhereDate('completedAt', $today)
                    ->orWhereDate('expireAt', $today);
            })
            ->get();
    }
}
