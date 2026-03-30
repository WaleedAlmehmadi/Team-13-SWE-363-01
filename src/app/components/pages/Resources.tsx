import { useEffect, useState } from "react";
import { Search, Filter, BookOpen, Video, FileText, Link as LinkIcon } from "lucide-react";
import { useLocation } from "react-router";
import { resources, type Resource } from "../../data/resources";

export function Resources() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get("q") ?? "");
  }, [location.search]);

  const categories = ["All", ...Array.from(new Set(resources.map((r) => r.category)))];

  const filteredResources = resources.filter((resource) => {
    const normalizedQuery = searchQuery.toLowerCase();
    const matchesSearch =
      resource.title.toLowerCase().includes(normalizedQuery) ||
      resource.description.toLowerCase().includes(normalizedQuery) ||
      resource.category.toLowerCase().includes(normalizedQuery) ||
      resource.author.toLowerCase().includes(normalizedQuery);
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: Resource["type"]) => {
    switch (type) {
      case "video":
        return Video;
      case "article":
        return FileText;
      case "book":
        return BookOpen;
      case "link":
        return LinkIcon;
    }
  };

  const getTypeColor = (type: Resource["type"]) => {
    switch (type) {
      case "video":
        return "bg-red-100 text-red-600";
      case "article":
        return "bg-blue-100 text-blue-600";
      case "book":
        return "bg-green-100 text-green-600";
      case "link":
        return "bg-purple-100 text-purple-600";
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">Resource Library</h1>
        <p className="text-gray-600 dark:text-gray-400">Curated learning materials for your academic journey</p>
      </div>

      <div className="mb-8 rounded-[16px] border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-[#F8FAFC] py-3 pl-12 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-2xl border border-gray-200 bg-[#F8FAFC] px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const Icon = getTypeIcon(resource.type);

          return (
            <div
              key={resource.id}
              className="group cursor-pointer rounded-[16px] border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${getTypeColor(resource.type)}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-1">
                  <svg className="h-4 w-4 fill-current text-yellow-400" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">{resource.rating}</span>
                </div>
              </div>

              <h3 className="mb-2 font-semibold text-gray-900 transition-colors group-hover:text-[#06B6D4]">
                {resource.title}
              </h3>

              <p className="mb-4 line-clamp-2 text-sm text-gray-600">{resource.description}</p>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{resource.author}</span>
                {resource.duration && <span className="text-gray-500">{resource.duration}</span>}
              </div>

              <div className="mt-4 border-t border-gray-100 pt-4">
                <span className="inline-block rounded-full bg-[#F8FAFC] px-3 py-1 text-xs text-gray-600">
                  {resource.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500">No resources found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
