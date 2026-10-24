// app/helpers.php (autoload it via composer.json "files") or put it in a model accessor
use Illuminate\Support\Str;

function img_url(?string $path): string
{
    if (!$path) return asset('images/placeholder.png');

    // external URL: use as-is
    if (Str::startsWith($path, ['http://', 'https://'])) return $path;

    // static asset in public/images
    if (Str::startsWith($path, ['/images/', 'images/'])) return asset(ltrim($path, '/'));

    // uploaded file on the public disk
    return asset('storage/' . ltrim($path, '/'));
}