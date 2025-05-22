import { useState } from "react";

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

function UpdatesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = dummyData
    .filter((item) =>
      filter === "All" ? true : item.type === filter.toLowerCase()
    )
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="updates-page-container w-full updates-content">
      <h1 className="text-3xl font-bold mb-6 text-center">Announcements</h1>
      {/* Search */}
      <input
        type="text"
        placeholder="Search announcements..."
        className="w-full p-3 mb-6 rounded-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ border: "1px solid #000000" }}
      />

      {/* Filters */}
      <div className="flex sorting-cont">
        {filters.map((f) => (
          <button
            key={f}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-4 updates-items-cont">
        {filtered.map(({ id, date, title, description }) => (
          <div
            key={id}
            className="bg-white updated-items p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="text-sm text-gray-500 mb-1">{date}</div>
            <hr className="bg-gray-500 h-11 w-0.5" />
            <div>
              <div className="text-lg font-semibold">{title}</div>
              <div className="text-gray-600 text-sm">{description}</div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-gray-500 text-center py-6">
            No announcements found.
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdatesPage;
