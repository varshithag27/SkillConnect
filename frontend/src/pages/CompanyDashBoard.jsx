import React, { useState } from 'react';
import { Briefcase, Users, Clock, CheckCircle, XCircle, Bell, Upload, Eye, FileText, Mail, Phone, Calendar, MapPin, Building } from 'lucide-react';

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Software Engineer Intern',
      type: 'Internship',
      location: 'Remote',
      duration: '3 months',
      status: 'approved',
      applications: 12,
      postedDate: '2024-10-01',
      description: 'Looking for talented interns to join our engineering team'
    },
    {
      id: 2,
      title: 'Product Manager',
      type: 'Full-time',
      location: 'San Francisco, CA',
      duration: 'Permanent',
      status: 'pending',
      applications: 0,
      postedDate: '2024-10-10',
      description: 'Experienced PM to lead product strategy'
    }
  ]);

  const [applications, setApplications] = useState([
    {
      id: 1,
      jobId: 1,
      jobTitle: 'Software Engineer Intern',
      studentName: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 234-567-8900',
      university: 'MIT',
      degree: 'Computer Science',
      gpa: '3.8',
      appliedDate: '2024-10-05',
      status: 'new',
      resume: 'john_doe_resume.pdf'
    },
    {
      id: 2,
      jobId: 1,
      jobTitle: 'Software Engineer Intern',
      studentName: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+1 234-567-8901',
      university: 'Stanford',
      degree: 'Software Engineering',
      gpa: '3.9',
      appliedDate: '2024-10-06',
      status: 'reviewed',
      resume: 'jane_smith_resume.pdf'
    }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Your job post "Product Manager" is pending admin approval', time: '2 hours ago', read: false },
    { id: 2, message: 'New application received for "Software Engineer Intern"', time: '1 day ago', read: false },
    { id: 3, message: 'Your job post "Software Engineer Intern" was approved', time: '9 days ago', read: true }
  ]);

  const [showJobForm, setShowJobForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const [newJob, setNewJob] = useState({
    title: '',
    type: 'Internship',
    location: '',
    duration: '',
    description: '',
    requirements: '',
    salary: ''
  });

  const handleJobSubmit = (e) => {
    e.preventDefault();
    const job = {
      id: jobs.length + 1,
      ...newJob,
      status: 'pending',
      applications: 0,
      postedDate: new Date().toISOString().split('T')[0]
    };
    setJobs([...jobs, job]);
    setNotifications([
      { id: notifications.length + 1, message: `Your job post "${newJob.title}" has been submitted for admin approval`, time: 'Just now', read: false },
      ...notifications
    ]);
    setNewJob({ title: '', type: 'Internship', location: '', duration: '', description: '', requirements: '', salary: '' });
    setShowJobForm(false);
    setActiveTab('jobs');
  };

  const stats = {
    totalJobs: jobs.length,
    pendingApproval: jobs.filter(j => j.status === 'pending').length,
    activeJobs: jobs.filter(j => j.status === 'approved').length,
    totalApplications: jobs.reduce((sum, job) => sum + job.applications, 0)
  };

  const markNotificationRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Building className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">TechCorp Inc.</h1>
                <p className="text-sm text-gray-500">Company Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-600 cursor-pointer" onClick={() => setActiveTab('notifications')} />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                TC
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
          <nav className="flex border-b border-gray-200 overflow-x-auto">
            {['dashboard', 'jobs', 'applications', 'notifications'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Jobs</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalJobs}</p>
                  </div>
                  <Briefcase className="h-12 w-12 text-blue-600" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending Approval</p>
                    <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.pendingApproval}</p>
                  </div>
                  <Clock className="h-12 w-12 text-yellow-600" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Jobs</p>
                    <p className="text-3xl font-bold text-green-600 mt-1">{stats.activeJobs}</p>
                  </div>
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Applications</p>
                    <p className="text-3xl font-bold text-purple-600 mt-1">{stats.totalApplications}</p>
                  </div>
                  <Users className="h-12 w-12 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Jobs</h3>
                <div className="space-y-3">
                  {jobs.slice(0, 3).map(job => (
                    <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{job.title}</p>
                        <p className="text-sm text-gray-500">{job.type} • {job.location}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        job.status === 'approved' ? 'bg-green-100 text-green-800' :
                        job.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h3>
                <div className="space-y-3">
                  {applications.slice(0, 3).map(app => (
                    <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{app.studentName}</p>
                        <p className="text-sm text-gray-500">{app.jobTitle}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        app.status === 'new' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Jobs View */}
        {activeTab === 'jobs' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Job Postings</h2>
              <button
                onClick={() => setShowJobForm(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Upload className="h-5 w-5" />
                <span>Post New Job</span>
              </button>
            </div>

            {showJobForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full my-8">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900">Create New Job Post</h3>
                  </div>
                  <form onSubmit={handleJobSubmit} className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                      <input
                        type="text"
                        required
                        value={newJob.title}
                        onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Software Engineer Intern"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                        <select
                          value={newJob.type}
                          onChange={(e) => setNewJob({...newJob, type: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option>Internship</option>
                          <option>Full-time</option>
                          <option>Part-time</option>
                          <option>Contract</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          required
                          value={newJob.location}
                          onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Remote or City"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                        <input
                          type="text"
                          required
                          value={newJob.duration}
                          onChange={(e) => setNewJob({...newJob, duration: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., 3 months"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range (Optional)</label>
                        <input
                          type="text"
                          value={newJob.salary}
                          onChange={(e) => setNewJob({...newJob, salary: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., $50k - $70k"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                      <textarea
                        required
                        value={newJob.description}
                        onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Describe the role and responsibilities..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                      <textarea
                        required
                        value={newJob.requirements}
                        onChange={(e) => setNewJob({...newJob, requirements: e.target.value})}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="List required skills and qualifications..."
                      />
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowJobForm(false)}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Submit for Approval
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              {jobs.map(job => (
                <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                          {job.type}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                          <MapPin className="h-3 w-3 mr-1" />
                          {job.location}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                          <Calendar className="h-3 w-3 mr-1" />
                          {job.duration}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                      <span className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        job.status === 'approved' ? 'bg-green-100 text-green-800' :
                        job.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {job.status === 'approved' ? 'Approved' : job.status === 'pending' ? 'Pending Admin Approval' : 'Rejected'}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Posted: {job.postedDate}</span>
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {job.applications} applications
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Applications View */}
        {activeTab === 'applications' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Applications Received</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Position</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">University</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GPA</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applications.map(app => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                              {app.studentName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{app.studentName}</div>
                              <div className="text-sm text-gray-500">{app.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.jobTitle}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.university}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.gpa}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.appliedDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            app.status === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => setSelectedApplication(app)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Notifications View */}
        {activeTab === 'notifications' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
              {notifications.map(notif => (
                <div
                  key={notif.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${!notif.read ? 'bg-blue-50' : ''}`}
                  onClick={() => markNotificationRead(notif.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <Bell className={`h-5 w-5 mt-0.5 ${!notif.read ? 'text-blue-600' : 'text-gray-400'}`} />
                      <div className="flex-1">
                        <p className={`text-sm ${!notif.read ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                          {notif.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                      </div>
                    </div>
                    {!notif.read && (
                      <div className="h-2 w-2 rounded-full bg-blue-600 mt-2"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">{selectedJob.type}</span>
                    <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">{selectedJob.location}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600">{selectedJob.description}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium">{selectedJob.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Posted Date</p>
                    <p className="font-medium">{selectedJob.postedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      selectedJob.status === 'approved' ? 'bg-green-100 text-green-800' :
                      selectedJob.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedJob.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Applications</p>
                    <p className="font-medium">{selectedJob.applications}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedApplication.studentName}</h3>
                  <p className="text-gray-500 mt-1">Applied for: {selectedApplication.jobTitle}</p>
                </div>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center space-x-2 text-gray-600 mb-1">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm font-medium">Email</span>
                  </div>
                  <p className="text-gray-900">{selectedApplication.email}</p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 text-gray-600 mb-1">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm font-medium">Phone</span>
                  </div>
                  <p className="text-gray-900">{selectedApplication.phone}</p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 text-gray-600 mb-1">
                    <Building className="h-4 w-4" />
                    <span className="text-sm font-medium">University</span>
                  </div>
                  <p className="text-gray-900">{selectedApplication.university}</p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 text-gray-600 mb-1">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm font-medium">Degree</span>
                  </div>
                  <p className="text-gray-900">{selectedApplication.degree}</p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 text-gray-600 mb-1">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">GPA</span>
                  </div>
                  <p className="text-gray-900">{selectedApplication.gpa}</p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 text-gray-600 mb-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">Applied Date</span>
                  </div>
                  <p className="text-gray-900">{selectedApplication.appliedDate}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center space-x-2 text-gray-600 mb-3">
                  <FileText className="h-5 w-5" />
                  <span className="font-medium">Resume</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{selectedApplication.resume}</p>
                      <p className="text-xs text-gray-500">PDF Document</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Download
                  </button>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => {
                    setApplications(applications.map(a => 
                      a.id === selectedApplication.id ? {...a, status: 'reviewed'} : a
                    ));
                    setSelectedApplication(null);
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Mark as Reviewed
                </button>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Contact Candidate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;