import React from "react";
import PropTypes from "prop-types";

const JobPostingComponent = ({ job }) => {
  return (
    <div className="mx-auto p-4 bg-white rounded-lg shadow-md font-sans flex gap-[55px] text-sm">
      {/* Left Section (a) */}
      <section className="a w-[815px] h-[1000px] pt-[46px] pb-[46px] flex flex-col gap-[55px]">
        {/* Description Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Description
          </h2>
          <p className="text-gray-600 leading-relaxed">{job.description}</p>
        </section>

        {/* Responsibilities Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Responsibilities
          </h2>
          <ul className="space-y-3">
            {job.responsibilities.map((responsibility, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <span className="text-green-500">✔️</span>
                {responsibility}
              </li>
            ))}
          </ul>
        </section>

        {/* Ideal Candidate Section */}
        <section className="mb-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Ideal Candidate we want
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li>
              <span className="font-medium">
                {job.ideal_candidate.age} year old {job.ideal_candidate.gender}
              </span>
            </li>
            {job.ideal_candidate.traits.map((trait, index) => {
              const [heading, ...description] = trait.split(":");
              return (
                <li key={index} className="list-disc list-inside">
                  <span className="font-bold">{heading}:</span>{" "}
                  {description.join(" ")}
                </li>
              );
            })}
          </ul>
        </section>

        {/* When & Where Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            When & Where
          </h2>
          <p className="text-gray-600">{job.when_where}</p>
        </section>
      </section>

      {/* Right Section (b) */}
      <section className="b w-[293.5px] h-[700px] flex flex-col gap-[20px] border-2 border-green-500 rounded-lg p-4">
        {/* About Section */}
        <section className="mb-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">About</h2>
          <div className="space-y-4 text-gray-600">
            <div className="mb-3">
              <p className="text-sm text-gray-500">Posted On</p>
              <p className="font-semibold text-gray-700">
                {job.about.posted_on}
              </p>
            </div>
            <div className="mb-3">
              <p className="text-sm text-gray-500">Deadline</p>
              <p className="font-semibold text-gray-700">
                {job.about.deadline}
              </p>
            </div>
            <div className="mb-3">
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold text-gray-700">
                {job.about.location}
              </p>
            </div>
            <div className="mb-3">
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="font-semibold text-gray-700">
                {job.about.start_date}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">End Date</p>
              <p className="font-semibold text-gray-700">
                {job.about.end_date}
              </p>
            </div>
          </div>
        </section>

        <div className="border-t border-gray-200 my-4"></div>

        {/* Categories Section */}
        <section className="mt-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {job.about.categories.map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 border border-gray-300"
              >
                {category}
              </span>
            ))}
          </div>
        </section>

        {/* Required Skills Section */}
        <section className="mb-8 mt-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Required Skills
          </h2>
          <ul className="flex flex-wrap gap-3">
            {job.about.required_skills.map((required_skill, index) => (
              <li
                key={index}
                className="text-gray-600 bg-gray-100 px-3 py-1 rounded"
              >
                {required_skill}
              </li>
            ))}
          </ul>
        </section>
      </section>
    </div>
  );
};

JobPostingComponent.propTypes = {
  job: PropTypes.shape({
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    responsibilities: PropTypes.arrayOf(PropTypes.string).isRequired,
    ideal_candidate: PropTypes.shape({
      age: PropTypes.string,
      gender: PropTypes.string,
      traits: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    when_where: PropTypes.string.isRequired,
    about: PropTypes.shape({
      posted_on: PropTypes.string.isRequired,
      deadline: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      start_date: PropTypes.string.isRequired,
      end_date: PropTypes.string.isRequired,
      categories: PropTypes.arrayOf(PropTypes.string).isRequired,
      required_skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default JobPostingComponent;
