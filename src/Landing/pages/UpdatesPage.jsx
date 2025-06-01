import { useState } from "react";
import { CalendarDays } from "lucide-react"; // Professional icon

const dummyData = Array(5)
  .fill(0)
  .map((_, i) => ({
    id: i + 1,
    date: `2025-04-${(i % 30) + 1}`.padStart(2, "0"),
    title: `Announcement Title ${i + 1}`,
    description: `This is a brief description of announcement ${i + 1}.`,
    type: i % 3 === 0 ? "new" : i % 3 === 1 ? "old" : "general",
  }));

const filters = ["All", "New", "Old"];

export default function UpdatesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = dummyData
    .filter((item) =>
      filter === "All" ? true : item.type === filter.toLowerCase()
    )
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-screen-2xl mx-auto p-8"> {/* Increased width */}
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
        Announcements
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search announcements..."
        className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 mb-6 transition-all duration-300"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filters */}
      <div className="flex gap-3 mb-6 justify-center flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-100"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-6">
        {filtered.map(({ id, date, title, description }) => (
          <div
            key={id}
            className="flex items-start gap-4 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 bg-white"
          >
            <div className="flex flex-col items-center text-blue-700">
              <CalendarDays className="w-6 h-6 mb-1" />
              <span className="text-xs">{date}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No announcements found.
          </div>
        )}
      </div>
    </div>
  );
}
