namespace App\Http\Controllers;

use App\Models\NotificationCustom;
use Illuminate\Http\Request;

class NotificationCustomController extends Controller
{
    /**
     * Get user notifications
     */
    public function index()
    {
        return auth()->user()
            ->customNotifications()
            ->latest()
            ->get();
    }

    /**
     * Create notification (system use)
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'message' => 'required|string'
        ]);

        return NotificationCustom::create($data);
    }

    /**
     * Mark as read
     */
    public function update(Request $request, $id)
    {
        $notification = NotificationCustom::findOrFail($id);

        if ($notification->user_id !== auth()->id()) {
            abort(403);
        }

        $notification->update([
            'read_at' => now()
        ]);

        return response()->json(['message' => 'Marked as read']);
    }

    /**
     * Delete notification
     */
    public function destroy($id)
    {
        $notification = NotificationCustom::findOrFail($id);

        if ($notification->user_id !== auth()->id()) {
            abort(403);
        }

        $notification->delete();

        return response()->json(['message' => 'Deleted']);
    }
}