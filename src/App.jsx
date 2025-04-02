// src/App.jsx
import { useGetAllProductQuery } from "./service/dummyData";
import JobList from "./components/JobListComponent";
import { transformJobData } from "./utils/jobDataAdapter";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {
  const { data: rawData, isLoading, isError, error } = useGetAllProductQuery();

  // Transform data only when it's available
  const transformedJobs =
    rawData?.data?.map((job) => transformJobData(job)) || [];

  // Loading state
  if (isLoading) {
    return <Loader />;
  }

  // Error state
  if (isError) {
    return <ErrorMessage message={error?.message || "Failed to load jobs"} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <JobList jobs={transformedJobs} />
      </main>
    </div>
  );
};

export default App;
