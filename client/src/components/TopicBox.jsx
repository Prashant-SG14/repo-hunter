import { useState } from "react";

function TopicBox({ topics }) {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);

    // NEW: only clicked topics will be searched
    const [selectedTopics, setSelectedTopics] = useState([]);

    if (!topics || topics.length === 0) return null;

    // NEW: toggle topics
    const toggleTopic = (topic) => {
        setSelectedTopics((prev) =>
            prev.includes(topic)
                ? prev.filter((t) => t !== topic)
                : [...prev, topic]
        );
    };

    const fetchRepos = async () => {
        try {
            setLoading(true);

            // ONLY SEARCH SELECTED TOPICS NOW 🔥
            const res = await fetch("http://localhost:5000/api/repos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topics: selectedTopics }),
            });

            const data = await res.json();
            setRepos(data);
        } catch (err) {
            console.error("Repo search failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="panel-animate w-full rounded-md border border-[var(--border-muted)] bg-[var(--bg-secondary)] p-5 text-left shadow-inner shadow-[var(--shadow)]/60 sm:p-6">

                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-[var(--text-strong)] sm:text-xl">
                        Topics from selected domains
                    </h3>

                    <div className="flex items-center gap-3">
                        {/* CHANGED: show how many are selected */}
                        <span className="rounded-full border border-[var(--border-muted)] bg-[var(--bg-fourth)] px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
                            {selectedTopics.length} selected
                        </span>

                        <button
                            onClick={fetchRepos}
                            className="rounded-md bg-[var(--button-primary-bg)] px-4 py-1.5 text-sm font-medium text-white shadow-sm shadow-[var(--button-primary-bg)]/30 hover:bg-[var(--button-primary-hover)] transition-all"
                        >
                            {loading ? "Searching..." : "Search"}
                        </button>
                    </div>
                </div>

                {/* TOPIC CHIPS (CLICKABLE NOW) */}
                <div className="flex flex-wrap gap-2">
                    {topics.map((topic, idx) => (
                        <span
                            key={idx}

                            // NEW: toggle UI based on selected
                            onClick={() => toggleTopic(topic)}
                            className={`cursor-pointer rounded-full border px-3 py-1 text-sm transition-all
                                ${selectedTopics.includes(topic)
                                    ? "bg-[var(--button-primary-bg)] text-white border-transparent"
                                    : "border-[var(--border-muted)] bg-[var(--bg-fourth)] text-[var(--text-tertiary)]"
                                }`}
                        >
                            {topic}
                        </span>
                    ))}
                </div>
            </div>

            {/* REPO RESULTS SAME AS BEFORE */}
            {repos.length > 0 && (
                <div className="mt-6 w-full rounded-md border border-[var(--border-muted)] bg-[var(--bg-secondary)] p-5 shadow-sm shadow-[var(--shadow)]/50">
                    <h3 className="mb-4 text-lg font-semibold text-[var(--text-strong)]">
                        Search Results ({repos.length})
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {repos.map((repo, idx) => (
                            <a
                                key={idx}
                                href={repo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block rounded-lg border border-[var(--border-muted)] bg-[var(--bg-fourth)] p-4 transition-all hover:border-[var(--text-tertiary)] hover:bg-[var(--bg-hover)]"
                            >
                                <h4 className="font-semibold text-[var(--text-strong)]">
                                    {repo.fullname}
                                </h4>
                                <p className="text-sm text-[var(--text-tertiary)]">
                                    ⭐ {repo.stars} • 🍴 {repo.forks}
                                </p>
                                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                    {repo.language || "Unknown"}
                                </p>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default TopicBox;
