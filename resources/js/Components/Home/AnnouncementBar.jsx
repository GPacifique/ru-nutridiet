export default function AnnouncementBar({ announcements = [] }) {
    if (!announcements.length) return null;
    return (
        <div className="bg-[#B8325A] text-white">
            <div className="mx-auto flex max-w-7xl flex-wrap gap-x-10 gap-y-1 px-6 py-2 text-sm lg:px-8">
                {announcements.map((a) => (
                    <p key={a.id}><span className="font-semibold">{a.title}</span>{a.body ? ` ${String(a.body).slice(0, 90)}` : ''}</p>
                ))}
            </div>
        </div>
    );
}
