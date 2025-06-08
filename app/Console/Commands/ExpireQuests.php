<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Quest;
use Carbon\Carbon;

class ExpireQuests extends Command
{
    protected $signature = 'quests:expire';
    protected $description = 'Set quests as expired if past expiration date';

    public function handle()
    {
        $now = Carbon::now();

        $expiredCount = Quest::where('expire_at', '<', $now)
            ->where('status', '!=', 'expired')
            ->update(['status' => 'expired']);

        $this->info("Marked {$expiredCount} quests as expired.");
    }
}
