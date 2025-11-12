// utils/repoStorage.js
export const repoStorage = {
  // Save a repository
  saveRepo(repo) {
    const saved = this.getSavedRepos();

    // Check if already saved
    const exists = saved.some((r) => r.fullname === repo.fullname);
    if (exists) {
      return { success: false, message: "Already saved" };
    }

    saved.push({
      ...repo,
      savedAt: new Date().toISOString(),
    });

    localStorage.setItem("savedRepos", JSON.stringify(saved));
    return { success: true, message: "Repository saved" };
  },

  // Remove a repository
  removeRepo(fullname) {
    const saved = this.getSavedRepos();
    const filtered = saved.filter((r) => r.fullname !== fullname);
    localStorage.setItem("savedRepos", JSON.stringify(filtered));
    return { success: true, message: "Repository removed" };
  },

  // Get all saved repositories
  getSavedRepos() {
    const saved = localStorage.getItem("savedRepos");
    return saved ? JSON.parse(saved) : [];
  },

  // Check if a repo is saved
  isRepoSaved(fullname) {
    const saved = this.getSavedRepos();
    return saved.some((r) => r.fullname === fullname);
  },

  // Clear all saved repos
  clearAll() {
    localStorage.removeItem("savedRepos");
    return { success: true, message: "All repositories cleared" };
  },

  // Get count of saved repos
  getCount() {
    return this.getSavedRepos().length;
  },
};
