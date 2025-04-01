// src/utils/jobDataAdapter.js
export const transformJobData = (apiData) => {
  // Helper function to format dates
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return {
    // Common fields
    title: apiData.title,
    company: apiData.orgName,
    image: apiData.logoUrl,

    // JobPostingComponent specific fields
    description: apiData.description,
    responsibilities: apiData.responsibilities?.split("\n") || [],
    ideal_candidate: {
      age: "N/A", // Not present in API
      gender: "Any", // Not present in API
      traits: apiData.idealCandidate?.split(". ") || [],
    },
    when_where: apiData.whenAndWhere,

    // About section
    about: {
      posted_on: formatDate(apiData.datePosted),
      deadline: formatDate(apiData.deadline),
      location: apiData.location?.join(", ") || "",
      start_date: formatDate(apiData.startDate),
      end_date: formatDate(apiData.endDate),
      categories: apiData.categories || [],
      required_skills: apiData.requiredSkills || [],
    },

    // JobCard specific fields
    tags: [
      apiData.opType || "General",
      ...(apiData.categories?.slice(0, 2) || []),
    ],
  };
};
