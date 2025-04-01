import { useState } from 'react';
import JobCard from './JobCardComponent';
import JobPostingComponent from './JobPostingComponent';

const JobList = ({ jobs }) => {
  const [selectedJob, setSelectedJob] = useState(null);

  if (selectedJob) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 font-epilogue">
        <button
          onClick={() => setSelectedJob(null)}
          className="mb-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700 hover:text-white shadow-lg"
        >
          ← Back to Jobs
        </button>
        <JobPostingComponent job={selectedJob} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 font-epilogue">
      <div className="p-4 w-full">
        <h2 className="text-2xl font-bold text-gray-900">Opportunities</h2>
        <p className="text-gray-500 text-sm">Showing {jobs.length} results</p>
        <div className="flex justify-end items-center mt-2">
          <span className="text-gray-500 text-sm">Sort by:</span>
          <select className="text-gray-900 font-semibold text-sm bg-transparent ml-1 focus:outline-none">
            <option>Most relevant</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {jobs.map((job) => (
          <JobCard
            key={job.title}
            job={job}
            onTitleClick={() => setSelectedJob(job)}
          />
        ))}
      </div>
    </div>
  );
};

export default JobList;