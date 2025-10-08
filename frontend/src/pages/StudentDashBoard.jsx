import React, { useState } from 'react';
import { Upload, Briefcase, Search, Filter, TrendingUp, CheckCircle, Clock, XCircle, FileText, MapPin, DollarSign, Calendar } from 'lucide-react';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDomain, setFilterDomain] = useState('all');
  const [selectedSkills, setSelectedSkills] = useState(["React", "Python", "Machine Learning", "Node.js", "SQL"]);
  const [newSkill, setNewSkill] = useState('');
  const [showSkillInput, setShowSkillInput] = useState(false);

  const studentProfile = {
    name: "Venkantesh Raju",
    email: "venkateshraju761@gmail.com",
    domain: "Computer Science",
    year: "3rd Year"
  };

  const availableSkills = [
    "React", "Python", "Machine Learning", "Node.js", "SQL", "JavaScript",
    "Java", "C++", "TypeScript", "MongoDB", "PostgreSQL", "Docker",
    "Kubernetes", "AWS", "Azure", "Git", "TensorFlow", "PyTorch",
    "Django", "Flask", "Express", "Vue.js", "Angular", "Tailwind CSS",
    "HTML", "CSS", "REST API", "GraphQL", "Redis", "Kafka"
  ];

  const jobOpportunities = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechCorp Inc.",
      location: "Remote",
      type: "Internship",
      duration: "3 months",
      stipend: "$1000/month",
      domain: "Web Development",
      skills: ["React", "JavaScript", "CSS"],
      status: "applied",
      appliedDate: "2024-10-01",
      matchScore: 95
    },
    {
      id: 2,
      title: "ML Engineer Intern",
      company: "AI Solutions",
      location: "San Francisco, CA",
      type: "Internship",
      duration: "6 months",
      stipend: "$2000/month",
      domain: "Machine Learning",
      skills: ["Python", "TensorFlow", "Machine Learning"],
      status: "interview",
      appliedDate: "2024-09-28",
      matchScore: 88
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "StartupHub",
      location: "New York, NY",
      type: "Full-time",
      duration: "Permanent",
      stipend: "$80k/year",
      domain: "Web Development",
      skills: ["React", "Node.js", "MongoDB"],
      status: "shortlisted",
      appliedDate: "2024-09-25",
      matchScore: 92
    },
    {
      id: 4,
      title: "Data Analyst Intern",
      company: "DataViz Corp",
      location: "Remote",
      type: "Internship",
      duration: "4 months",
      stipend: "$1200/month",
      domain: "Data Science",
      skills: ["Python", "SQL", "Tableau"],
      status: "applied",
      appliedDate: "2024-10-03",
      matchScore: 78
    },
    {
      id: 5,
      title: "Backend Developer",
      company: "CloudSystems",
      location: "Austin, TX",
      type: "Full-time",
      duration: "Permanent",
      stipend: "$75k/year",
      domain: "Backend Development",
      skills: ["Node.js", "Python", "Docker"],
      status: "rejected",
      appliedDate: "2024-09-20",
      matchScore: 85
    },
    {
      id: 6,
      title: "React Native Developer",
      company: "MobileFirst",
      location: "Boston, MA",
      type: "Internship",
      duration: "5 months",
      stipend: "$1500/month",
      domain: "Mobile Development",
      skills: ["React", "JavaScript", "React Native"],
      status: "applied",
      appliedDate: "2024-10-05",
      matchScore: 90
    }
  ];

  const statusColors = {
    applied: "bg-blue-100 text-blue-800 border-blue-200",
    interview: "bg-yellow-100 text-yellow-800 border-yellow-200",
    shortlisted: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200"
  };

  const statusIcons = {
    applied: <Clock className="w-4 h-4" />,
    interview: <TrendingUp className="w-4 h-4" />,
    shortlisted: <CheckCircle className="w-4 h-4" />,
    rejected: <XCircle className="w-4 h-4" />
  };

  const stats = {
    applied: jobOpportunities.filter(j => j.status === 'applied').length,
    interview: jobOpportunities.filter(j => j.status === 'interview').length,
    shortlisted: jobOpportunities.filter(j => j.status === 'shortlisted').length,
    rejected: jobOpportunities.filter(j => j.status === 'rejected').length
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeUploaded(true);
    }
  };

  const addSkill = (skill) => {
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
    setNewSkill('');
    setShowSkillInput(false);
  };

  const removeSkill = (skillToRemove) => {
    setSelectedSkills(selectedSkills.filter(skill => skill !== skillToRemove));
  };

  const handleAddCustomSkill = () => {
    if (newSkill.trim()) {
      addSkill(newSkill.trim());
    }
  };

  const filteredJobs = jobOpportunities.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = filterDomain === 'all' || job.domain === filterDomain;
    return matchesSearch && matchesDomain;
  });

  const calculateMatchScore = (jobSkills) => {
    const matchingSkills = jobSkills.filter(skill => selectedSkills.includes(skill));
    return Math.round((matchingSkills.length / jobSkills.length) * 100);
  };

  const domains = [...new Set(jobOpportunities.map(j => j.domain))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Career Dashboard
              </h1>
              <p className="text-gray-600 text-sm mt-1">Welcome back, {studentProfile.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{studentProfile.name}</p>
                <p className="text-xs text-gray-500">{studentProfile.domain} • {studentProfile.year}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                {studentProfile.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 sm:gap-2 overflow-x-auto">
            {['dashboard', 'opportunities', 'resume'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 py-3 text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Applied</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{stats.applied}</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Interviews</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{stats.interview}</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Shortlisted</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{stats.shortlisted}</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Rejected</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{stats.rejected}</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Skills & Profile */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Your Skills</h2>
                  <button
                    onClick={() => setShowSkillInput(!showSkillInput)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                  >
                    + Add Skill
                  </button>
                </div>
                
                {showSkillInput && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-3">Select from popular skills:</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {availableSkills.filter(skill => !selectedSkills.includes(skill)).slice(0, 12).map((skill, idx) => (
                        <button
                          key={idx}
                          onClick={() => addSkill(skill)}
                          className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
                        >
                          + {skill}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddCustomSkill()}
                        placeholder="Or type custom skill..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleAddCustomSkill}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-200 flex items-center gap-2 group"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="text-indigo-400 hover:text-red-500 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-sm p-6 text-white">
                <h2 className="text-lg font-semibold mb-2">Resume Status</h2>
                <div className="mt-4">
                  {resumeUploaded ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm">Resume uploaded successfully</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <XCircle className="w-5 h-5" />
                      <span className="text-sm">No resume uploaded</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Applications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h2>
              <div className="space-y-3">
                {jobOpportunities.slice(0, 3).map((job) => (
                  <div
                    key={job.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-600">{job.company}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-2 sm:mt-0">
                      <span className="text-xs text-gray-500">{job.appliedDate}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${statusColors[job.status]}`}>
                        {statusIcons[job.status]}
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'opportunities' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search opportunities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={filterDomain}
                    onChange={(e) => setFilterDomain(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="all">All Domains</option>
                    {domains.map((domain) => (
                      <option key={domain} value={domain}>{domain}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Job Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredJobs.map((job) => {
                const matchScore = calculateMatchScore(job.skills);
                return (
                  <div
                    key={job.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                        <p className="text-gray-600 font-medium mt-1">{job.company}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-indigo-600">{matchScore}%</div>
                        <div className="text-xs text-gray-500">Match</div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span>{job.stipend}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{job.duration} • {job.type}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Required Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              selectedSkills.includes(skill)
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${statusColors[job.status]}`}>
                        {statusIcons[job.status]}
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500">Applied: {job.appliedDate}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'resume' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Resume</h2>
                  <p className="text-gray-600">Upload your resume to get personalized job recommendations</p>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 sm:p-12 text-center hover:border-indigo-500 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-700 font-medium mb-2">
                    {resumeUploaded ? 'Resume Uploaded Successfully!' : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">PDF, DOC, DOCX (Max 5MB)</p>
                  <label className="inline-block">
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                    />
                    <span className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium cursor-pointer hover:from-indigo-700 hover:to-purple-700 transition-all inline-block">
                      {resumeUploaded ? 'Upload New Resume' : 'Choose File'}
                    </span>
                  </label>
                </div>

                {resumeUploaded && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Your resume has been analyzed successfully!</span>
                    </div>
                    <p className="text-sm text-green-700 mt-2">
                      We've matched your skills with {jobOpportunities.length} opportunities.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}