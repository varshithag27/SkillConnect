import React, { useState } from 'react';
import { CheckCircle, XCircle, Users, Briefcase, FileText, Download, Search, Filter, Eye, Calendar, MapPin, Clock } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Sample data for posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: 'Tech Solutions Inc',
      type: 'internship',
      location: 'Remote',
      duration: '3 months',
      stipend: '₹15,000/month',
      postedDate: '2024-10-10',
      status: 'pending',
      description: 'Looking for a talented frontend developer with React experience',
      selectedStudents: []
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'InnovateTech',
      type: 'job',
      location: 'Bangalore',
      duration: 'Full-time',
      stipend: '₹8-12 LPA',
      postedDate: '2024-10-12',
      status: 'pending',
      description: 'Seeking experienced full stack developer for our core team',
      selectedStudents: []
    },
    {
      id: 3,
      title: 'Data Science Intern',
      company: 'Analytics Pro',
      type: 'internship',
      location: 'Hyderabad',
      duration: '6 months',
      stipend: '₹20,000/month',
      postedDate: '2024-10-08',
      status: 'approved',
      selectedStudents: [
        { id: 1, name: 'Rahul Sharma', email: 'rahul@email.com', phone: '+91 98765 43210', cgpa: '8.5' },
        { id: 2, name: 'Priya Patel', email: 'priya@email.com', phone: '+91 98765 43211', cgpa: '9.1' }
      ]
    },
    {
      id: 4,
      title: 'UI/UX Designer',
      company: 'Creative Studio',
      type: 'job',
      location: 'Mumbai',
      duration: 'Full-time',
      stipend: '₹6-9 LPA',
      postedDate: '2024-10-05',
      status: 'approved',
      selectedStudents: [
        { id: 3, name: 'Amit Kumar', email: 'amit@email.com', phone: '+91 98765 43212', cgpa: '8.8' }
      ]
    },
    {
      id: 5,
      title: 'Backend Developer Intern',
      company: 'CloudTech Systems',
      type: 'internship',
      location: 'Pune',
      duration: '4 months',
      stipend: '₹18,000/month',
      postedDate: '2024-10-14',
      status: 'rejected',
      description: 'Node.js and MongoDB experience required',
      selectedStudents: []
    }
  ]);

  const [selectedPost, setSelectedPost] = useState(null);

  const handleApprove = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, status: 'approved' } : post
    ));
  };

  const handleReject = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, status: 'rejected' } : post
    ));
  };

  const filteredPosts = posts.filter(post => {
    const matchesTab = post.status === activeTab;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || post.type === filterType;
    return matchesTab && matchesSearch && matchesType;
  });

  const stats = {
    totalPosts: posts.length,
    pending: posts.filter(p => p.status === 'pending').length,
    approved: posts.filter(p => p.status === 'approved').length,
    rejected: posts.filter(p => p.status === 'rejected').length,
    totalStudents: posts.reduce((acc, post) => acc + post.selectedStudents.length, 0)
  };

  const downloadReport = () => {
    const approvedPosts = posts.filter(p => p.status === 'approved' && p.selectedStudents.length > 0);
    let reportContent = 'Job/Internship Selection Report\n\n';
    reportContent += `Generated on: ${new Date().toLocaleString()}\n`;
    reportContent += `Total Posts: ${approvedPosts.length}\n`;
    reportContent += `Total Selected Students: ${stats.totalStudents}\n\n`;
    reportContent += '='.repeat(80) + '\n\n';

    approvedPosts.forEach(post => {
      reportContent += `Position: ${post.title}\n`;
      reportContent += `Company: ${post.company}\n`;
      reportContent += `Type: ${post.type.toUpperCase()}\n`;
      reportContent += `Location: ${post.location}\n`;
      reportContent += `Compensation: ${post.stipend}\n`;
      reportContent += `Students Selected: ${post.selectedStudents.length}\n\n`;
      
      post.selectedStudents.forEach((student, idx) => {
        reportContent += `  ${idx + 1}. ${student.name}\n`;
        reportContent += `     Email: ${student.email}\n`;
        reportContent += `     Phone: ${student.phone}\n`;
        reportContent += `     CGPA: ${student.cgpa}\n\n`;
      });
      
      reportContent += '-'.repeat(80) + '\n\n';
    });

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `placement_report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Admin Dashboard</h1>
              <p className="text-slate-600 text-sm mt-1">Manage job and internship postings</p>
            </div>
            <button
              onClick={downloadReport}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
            >
              <Download size={18} />
              <span className="font-medium">Download Report</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Posts</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{stats.totalPosts}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Briefcase className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-amber-600 mt-2">{stats.pending}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-lg">
                <Clock className="text-amber-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Approved</p>
                <p className="text-3xl font-bold text-emerald-600 mt-2">{stats.approved}</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-lg">
                <CheckCircle className="text-emerald-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Rejected</p>
                <p className="text-3xl font-bold text-rose-600 mt-2">{stats.rejected}</p>
              </div>
              <div className="bg-rose-100 p-3 rounded-lg">
                <XCircle className="text-rose-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Selected Students</p>
                <p className="text-3xl font-bold text-violet-600 mt-2">{stats.totalStudents}</p>
              </div>
              <div className="bg-violet-100 p-3 rounded-lg">
                <Users className="text-violet-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6">
          <div className="border-b border-slate-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4">
              <div className="flex gap-2 overflow-x-auto w-full sm:w-auto">
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    activeTab === 'pending'
                      ? 'bg-amber-100 text-amber-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Pending ({stats.pending})
                </button>
                <button
                  onClick={() => setActiveTab('approved')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    activeTab === 'approved'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Approved ({stats.approved})
                </button>
                <button
                  onClick={() => setActiveTab('rejected')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    activeTab === 'rejected'
                      ? 'bg-rose-100 text-rose-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Rejected ({stats.rejected})
                </button>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="all">All Types</option>
                  <option value="job">Jobs</option>
                  <option value="internship">Internships</option>
                </select>
              </div>
            </div>
          </div>

          {/* Posts List */}
          <div className="p-4">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="mx-auto text-slate-300 mb-4" size={48} />
                <p className="text-slate-500 text-lg">No posts found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPosts.map(post => (
                  <div key={post.id} className="border border-slate-200 rounded-lg p-5 hover:shadow-md transition-all bg-slate-50">
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start gap-3 mb-3">
                          <h3 className="text-xl font-bold text-slate-900">{post.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            post.type === 'job' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-purple-100 text-purple-700'
                          }`}>
                            {post.type.toUpperCase()}
                          </span>
                        </div>
                        
                        <p className="text-slate-700 font-medium mb-3">{post.company}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span>{post.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={16} />
                            <span>{post.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            <span>{new Date(post.postedDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <p className="text-emerald-600 font-semibold">{post.stipend}</p>
                        
                        {post.description && (
                          <p className="text-slate-600 text-sm mt-3">{post.description}</p>
                        )}
                        
                        {post.selectedStudents.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-slate-300">
                            <p className="text-sm font-semibold text-slate-700 mb-2">
                              Selected Students ({post.selectedStudents.length})
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {post.selectedStudents.map(student => (
                                <div key={student.id} className="bg-white px-3 py-2 rounded-lg border border-slate-200 text-sm">
                                  <p className="font-medium text-slate-900">{student.name}</p>
                                  <p className="text-slate-600 text-xs">{student.email}</p>
                                  <p className="text-slate-600 text-xs">CGPA: {student.cgpa}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex lg:flex-col gap-2">
                        {post.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(post.id)}
                              className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-lg hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md flex-1 lg:flex-initial"
                            >
                              <CheckCircle size={18} />
                              <span className="font-medium">Approve</span>
                            </button>
                            <button
                              onClick={() => handleReject(post.id)}
                              className="flex items-center justify-center gap-2 bg-rose-600 text-white px-4 py-2.5 rounded-lg hover:bg-rose-700 transition-all shadow-sm hover:shadow-md flex-1 lg:flex-initial"
                            >
                              <XCircle size={18} />
                              <span className="font-medium">Reject</span>
                            </button>
                          </>
                        )}
                        {post.status === 'approved' && (
                          <div className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2.5 rounded-lg font-medium">
                            <CheckCircle size={18} />
                            Approved
                          </div>
                        )}
                        {post.status === 'rejected' && (
                          <div className="flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2.5 rounded-lg font-medium">
                            <XCircle size={18} />
                            Rejected
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;