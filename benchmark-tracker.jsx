// Use globals instead of imports
const { useState, useEffect } = React;

// Simple icon components using HTML entities or text
const Calendar = ({className}) => <span className={className}>📅</span>;
const Plus = ({className}) => <span className={className}>+</span>;
const User = ({className}) => <span className={className}>👤</span>;
const FileText = ({className}) => <span className={className}>📄</span>;
const AlertCircle = ({className}) => <span className={className}>⚠️</span>;
const Clock = ({className}) => <span className={className}>⏰</span>;
const CheckCircle = ({className}) => <span className={className}>✅</span>;
const XCircle = ({className}) => <span className={className}>❌</span>;

const BenchmarkTracker = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [services, setServices] = useState([]);
  const [addingService, setAddingService] = useState(false);
  const [newService, setNewService] = useState({
    participantName: '',
    serviceType: 'Career Camp',
    serviceCategory: '',
    startDate: '',
    benchmarks: []
  });
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [showServiceDetails, setShowServiceDetails] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);

  const serviceTypes = [
    'Career Camp',
    'Customized Employment',
    'Discovery Customized Service',
    'Employment Services',
    'On the Job Training',
    'Postsecondary Educational Counseling',
    'Adult Project SEARCH',
    'Project SEARCH-Y',
    'Self-advocacy training Services',
    'Self-Employment',
    'Supported Employment Services',
    'Work-Based Learning Experience',
    'Work Readiness Training',
    'Employment Services "A la Carte"',
    'Youth Peer Mentoring'
  ];

  const getServiceCategories = (serviceType) => {
    switch(serviceType) {
      case 'Career Camp':
        return ['Job Exploration Counseling', 'Counseling on Enrollment Opportunities', 'Instruction in Self-Advocacy', 'Work-Based Learning Experiences', 'Workplace Readiness Training'];
      case 'Customized Employment':
        return ['Customized Employment Plan', 'Customized Employment Placement', 'Customized Employment 30-Day Job Retention', 'Customized Employment Stabilization', 'Customized Employment Transition', 'Customized Employment Successful Employment Outcome'];
      case 'Discovery Customized Service':
        return ['Discovery Home Visits and Observations', 'Community Observations and Interviews', 'Vocational Themes', 'Discovery Profile Report or Discovery Staging Record', 'Post Discovery Planning Meeting'];
      case 'Employment Services':
        return ['Pre-Placement Training (PPT)', 'Employment Service Plan', 'Placement', '30-Day Job Retention', '60-Day Job Retention', '90-Day Job Retention'];
      case 'On the Job Training':
        return ['OJT Plan', 'OJT Agreement', 'OJT Final Report', 'OJT Wage Reimbursement'];
      case 'Postsecondary Educational Counseling':
        return ['Postsecondary Education Counseling', 'Postsecondary Education Campus Tours'];
      case 'Adult Project SEARCH':
        return ['PS Initial Skills Assessment', 'PS Worksite Agreement', 'PS End of Rotation Report (First Rotation)', 'PS End of Rotation Report (Second Rotation)', 'PS End of Rotation Report (Third Rotation)', 'PS Final Skills Summary'];
      case 'Project SEARCH-Y':
        return ['Project SEARCH Initial Skills Assessment', 'PS Worksite Agreement', 'PS End of Rotation Report (First Rotation)', 'PS End of Rotation Report (Second Rotation)', 'PS End of Rotation Report (Third Rotation)', 'PS Final Skills Summary'];
      case 'Self-advocacy training Services':
        return ['Self-advocacy training: Self-Awareness', 'Self-advocacy training: Self-efficacy', 'Self-advocacy training: Self-determination'];
      case 'Self-Employment':
        return ['Initial Self-Employment Exploration Meeting', 'Business Concept Development', 'Market Research and Benefit Analysis', 'Business Financials and Marketing Plan', 'Business Plan Development', 'Completed Business Plan', 'Implementation Hours'];
      case 'Supported Employment Services':
        return ['Supported Pre-Placement Training', 'Career Support Inventory (CSI)', 'Supported Employment Job Placement', 'Supported Employment 30-Day Job Retention', 'Supported Employment Stabilization', 'Supported Employment Transition', 'Supported Employment Successful Employment Outcome'];
      case 'Work-Based Learning Experience':
        return ['WBLE – Informational Interview', 'WBLE – Job Shadowing/Workplace Tour', 'WBLE – Work Experience Plan', 'WBLE – Worksite Agreement', 'WBLE Final Report', 'WBLE Wage Reimbursement'];
      case 'Work Readiness Training':
        return ['Youth Work Readiness Training', 'Travel Training-Youth'];
      case 'Employment Services "A la Carte"':
        return ['Travel Training', 'Alternative Resume and Portfolio', 'Personal Identification/Documentation', 'Job Coaching'];
      case 'Youth Peer Mentoring':
        return ['Youth Peer Mentoring Plan and Mentor Assignment', 'Youth Peer Mentoring Activities Monthly Progress Report', 'Youth Peer Mentoring Final Report'];
      default:
        return [];
    }
  };

  const getBenchmarks = (serviceType, serviceCategory) => {
    // Each benchmark includes a sequence number to determine order
    if (serviceType === 'Employment Services') {
      return [
        { 
          name: 'Placement', 
          completed: false, 
          dueDate: null, 
          notes: '',
          sequence: 1,
          description: 'Submit payment request within 30 days of the placement date'
        },
        { 
          name: '30-Day Job Retention', 
          completed: false, 
          dueDate: null, 
          notes: '',
          sequence: 2,
          description: 'Submit within 30 days after the participant reaches 30 days of continuous employment'
        },
        { 
          name: '60-Day Job Retention', 
          completed: false, 
          dueDate: null, 
          notes: '',
          sequence: 3,
          description: 'Submit within 30 days after reaching 60 days of employment'
        },
        { 
          name: '90-Day Job Retention', 
          completed: false, 
          dueDate: null, 
          notes: '',
          sequence: 4,
          description: 'Submit within 30 days after reaching 90 days of continuous employment'
        }
      ];
    } else if (serviceType === 'Supported Employment Services') {
      return [
        { 
          name: 'Job Placement', 
          completed: false, 
          dueDate: null, 
          notes: '',
          sequence: 1,
          description: 'Submit within 30 days of the placement date'
        },
        { 
          name: '30-Day Job Retention', 
          completed: false, 
          dueDate: null, 
          notes: '',
          sequence: 2,
          description: 'Submit within 30 days after 30 days of employment'
        },
        { 
          name: 'Stabilization', 
          completed: false, 
          dueDate: null, 
          notes: '',
          sequence: 3,
          description: 'Submit within 30 days after the participant demonstrates acceptable, stable job performance'
        },
        { 
          name: 'Transition', 
          completed: false, 
          dueDate: null, 
          notes: '',
          sequence: 4,
          description: 'Submit within 30 days after achieving the transition milestone (after 60 days of stabilized employment)'
        },
        { 
          name: 'Successful Outcome', 
          completed: false, 
          dueDate: null, 
          notes: '',
          sequence: 5,
          description: 'Submit within 30 days after the successful outcome milestone (minimum 90 days of stabilized employment post-transition)'
        }
      ];
    } else if (serviceType === 'On the Job Training') {
      return [
        { 
          name: 'OJT Plan/Agreement', 
          completed: false, 
          dueDate: null, 
          notes: '',
          sequence: 1,
          description: 'Must be completed before training begins'
        },
        { 
          name: 'OJT Final Report', 
          completed: false, 
          dueDate: null, 
          notes: '',
          sequence: 2,
          description: 'Submit within 30 days following training completion'
        }
      ];
    } else if (serviceType === 'Work-Based Learning Experience') {
      return [
        { 
          name: 'WBLE Final Report & Wage Reimbursement', 
          completed: false, 
          dueDate: null, 
          notes: '',
          sequence: 1,
          description: 'Submit within 30 days after the WBLE session is completed'
        }
      ];
    }
    
    // Default set of benchmarks if specific ones aren't defined
    return [
      { 
        name: 'Complete required documentation', 
        completed: false, 
        dueDate: null, 
        notes: '',
        sequence: 1,
        description: 'Complete all required documentation for this service'
      }
    ];
  };

  // Calculate dates for benchmarks when a new service is created
  const calculateBenchmarkDates = (startDate, benchmarks) => {
    const start = new Date(startDate);
    
    return benchmarks.map(benchmark => {
      let dueDate = null;
      
      // Set due dates based on benchmark names - this would be expanded
      // to cover all the various benchmarks and their timing requirements
      if (benchmark.name.includes('90 days prior')) {
        dueDate = new Date(start);
        dueDate.setDate(dueDate.getDate() - 90);
      } else if (benchmark.name.includes('60 days prior')) {
        dueDate = new Date(start);
        dueDate.setDate(dueDate.getDate() - 60);
      } else if (benchmark.name.includes('45 days prior')) {
        dueDate = new Date(start);
        dueDate.setDate(dueDate.getDate() - 45);
      } else if (benchmark.name.includes('30 days prior')) {
        dueDate = new Date(start);
        dueDate.setDate(dueDate.getDate() - 30);
      } else if (benchmark.name.includes('within 30 days')) {
        dueDate = new Date(start);
        dueDate.setDate(dueDate.getDate() + 30);
      } else if (benchmark.name.includes('within 60 days')) {
        dueDate = new Date(start);
        dueDate.setDate(dueDate.getDate() + 60);
      } else if (benchmark.name === 'Submit Monthly Progress Report') {
        // Set to end of next month from start date
        dueDate = new Date(start);
        dueDate.setMonth(dueDate.getMonth() + 1);
        dueDate.setDate(30); // Set to approx. end of month
      }
      
      return { ...benchmark, dueDate: dueDate ? dueDate.toISOString().split('T')[0] : null };
    });
  };

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedServices = localStorage.getItem('vrServiceBenchmarks');
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    }
  }, []);

  // Save to localStorage whenever services change
  useEffect(() => {
    localStorage.setItem('vrServiceBenchmarks', JSON.stringify(services));
    updateFilteredServices();
  }, [services, searchQuery]);

  // Update upcoming deadlines
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const nextTwoWeeks = new Date(today);
    nextTwoWeeks.setDate(today.getDate() + 14);
    
    const upcoming = [];
    
    services.forEach(service => {
      service.benchmarks.forEach(benchmark => {
        if (!benchmark.completed && benchmark.dueDate) {
          const dueDate = new Date(benchmark.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          
          if (dueDate >= today && dueDate <= nextTwoWeeks) {
            upcoming.push({
              participantName: service.participantName,
              serviceType: service.serviceType,
              serviceCategory: service.serviceCategory,
              benchmarkName: benchmark.name,
              dueDate: benchmark.dueDate,
              serviceId: service.id
            });
          }
        }
      });
    });
    
    // Sort by due date
    upcoming.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    
    setUpcomingDeadlines(upcoming);
  }, [services]);

  const updateFilteredServices = () => {
    if (!searchQuery) {
      setFilteredServices(services);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = services.filter(service => 
      service.participantName.toLowerCase().includes(query) ||
      service.serviceType.toLowerCase().includes(query) ||
      service.serviceCategory.toLowerCase().includes(query)
    );
    
    setFilteredServices(filtered);
  };

  const handleServiceTypeChange = (e) => {
    const type = e.target.value;
    setNewService({
      ...newService,
      serviceType: type,
      serviceCategory: '',
      benchmarks: []
    });
  };

  const handleServiceCategoryChange = (e) => {
    const category = e.target.value;
    setNewService({
      ...newService,
      serviceCategory: category,
      benchmarks: getBenchmarks(newService.serviceType, category)
    });
  };

  const handleAddService = () => {
    if (!newService.participantName || !newService.serviceType || !newService.serviceCategory || !newService.startDate) {
      setAlertMessage('Please fill in all required fields');
      setAlertType('error');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    const serviceWithBenchmarks = {
      ...newService,
      id: Date.now().toString(),
      benchmarks: calculateBenchmarkDates(
        newService.startDate, 
        getBenchmarks(newService.serviceType, newService.serviceCategory)
      )
    };

    setServices([...services, serviceWithBenchmarks]);
    setNewService({
      participantName: '',
      serviceType: 'Career Camp',
      serviceCategory: '',
      startDate: '',
      benchmarks: []
    });
    setAddingService(false);
    
    setAlertMessage('Service added successfully');
    setAlertType('success');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const deleteService = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(service => service.id !== id));
      setSelectedService(null);
      setShowServiceDetails(false);
      
      setAlertMessage('Service deleted successfully');
      setAlertType('success');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  // Calculate the next benchmark's due date based on the current benchmark
  const calculateNextBenchmarkDueDate = (currentBenchmark, completionDate) => {
    const date = new Date(completionDate);
    
    // For retention benchmarks, add the retention period plus 30 days for submission
    if (currentBenchmark.name === 'Placement') {
      date.setDate(date.getDate() + 60); // 30 days retention + 30 days to submit
    } else if (currentBenchmark.name === '30-Day Job Retention') {
      date.setDate(date.getDate() + 60); // Additional 30 days retention + 30 days to submit
    } else if (currentBenchmark.name === '60-Day Job Retention') {
      date.setDate(date.getDate() + 60); // Additional 30 days retention + 30 days to submit
    } else {
      // Default: 30 days to submit
      date.setDate(date.getDate() + 30);
    }
    
    return date.toISOString().split('T')[0];
  };

  const toggleBenchmarkCompletion = (serviceId, benchmarkIndex) => {
    setServices(services.map(service => {
      if (service.id === serviceId) {
        const updatedBenchmarks = [...service.benchmarks];
        const currentBenchmark = updatedBenchmarks[benchmarkIndex];
        const isCompleting = !currentBenchmark.completed;
        
        // Update the current benchmark
        updatedBenchmarks[benchmarkIndex] = {
          ...currentBenchmark,
          completed: isCompleting,
          completionDate: isCompleting ? new Date().toISOString().split('T')[0] : null
        };
        
        // If completing a benchmark, update the next benchmark's due date
        if (isCompleting && benchmarkIndex < updatedBenchmarks.length - 1) {
          const nextBenchmark = updatedBenchmarks[benchmarkIndex + 1];
          updatedBenchmarks[benchmarkIndex + 1] = {
            ...nextBenchmark,
            dueDate: calculateNextBenchmarkDueDate(currentBenchmark, new Date().toISOString().split('T')[0])
          };
        }
        
        // If we're toggling the selected service, update it too
        if (selectedService && selectedService.id === serviceId) {
          setSelectedService({
            ...service,
            benchmarks: updatedBenchmarks
          });
        }
        
        return {
          ...service,
          benchmarks: updatedBenchmarks
        };
      }
      return service;
    }));
  };

  const updateBenchmarkNote = (serviceId, benchmarkIndex, note) => {
    setServices(services.map(service => {
      if (service.id === serviceId) {
        const updatedBenchmarks = [...service.benchmarks];
        updatedBenchmarks[benchmarkIndex] = {
          ...updatedBenchmarks[benchmarkIndex],
          notes: note
        };
        
        // If we're updating the selected service, update it too
        if (selectedService && selectedService.id === serviceId) {
          setSelectedService({
            ...service,
            benchmarks: updatedBenchmarks
          });
        }
        
        return {
          ...service,
          benchmarks: updatedBenchmarks
        };
      }
      return service;
    }));
  };

  const viewServiceDetails = (service) => {
    setSelectedService(service);
    setShowServiceDetails(true);
  };

  const startEditService = (service) => {
    setEditingService({
      ...service
    });
  };

  const saveEditedService = () => {
    if (!editingService.participantName || !editingService.serviceType || !editingService.serviceCategory) {
      setAlertMessage('Please fill in all required fields');
      setAlertType('error');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    setServices(services.map(service => 
      service.id === editingService.id ? editingService : service
    ));
    
    // Update the selected service if it's the one being edited
    if (selectedService && selectedService.id === editingService.id) {
      setSelectedService(editingService);
    }
    
    setEditingService(null);
    
    setAlertMessage('Service updated successfully');
    setAlertType('success');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const cancelEditService = () => {
    setEditingService(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDaysRemaining = (dueDate) => {
    if (!dueDate) return null;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  // Get the next incomplete benchmark for a service
  const getNextBenchmark = (benchmarks) => {
    return benchmarks.find(b => !b.completed);
  };

  const getBenchmarkStatus = (benchmark) => {
    if (benchmark.completed) return 'completed';
    if (!benchmark.dueDate) return 'no-date';
    
    const daysRemaining = getDaysRemaining(benchmark.dueDate);
    
    if (daysRemaining < 0) return 'overdue';
    if (daysRemaining <= 7) return 'urgent';
    if (daysRemaining <= 14) return 'approaching';
    return 'on-track';
  };

  const calculateServiceProgress = (benchmarks) => {
    if (!benchmarks || benchmarks.length === 0) return 0;
    const completed = benchmarks.filter(b => b.completed).length;
    return Math.round((completed / benchmarks.length) * 100);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">VR Service Benchmark Tracker</h1>
        <p className="text-sm">Track service timelines and submission requirements</p>
      </header>
      
      {/* Navigation */}
      <nav className="bg-blue-800 text-white p-2">
        <div className="container mx-auto flex space-x-4">
          <button 
            className={`px-3 py-1 rounded ${activeTab === 'dashboard' ? 'bg-white text-blue-800' : 'hover:bg-blue-700'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`px-3 py-1 rounded ${activeTab === 'services' ? 'bg-white text-blue-800' : 'hover:bg-blue-700'}`}
            onClick={() => {
              setActiveTab('services');
              setSelectedService(null);
              setShowServiceDetails(false);
            }}
          >
            Services
          </button>
          <button 
            className={`px-3 py-1 rounded ${activeTab === 'deadlines' ? 'bg-white text-blue-800' : 'hover:bg-blue-700'}`}
            onClick={() => setActiveTab('deadlines')}
          >
            Upcoming Deadlines
          </button>
        </div>
      </nav>
      
      {/* Alert Message */}
      {showAlert && (
        <div className={`fixed top-4 right-4 p-4 rounded shadow-lg z-50 ${alertType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          <div className="flex items-center">
            {alertType === 'success' ? (
              <CheckCircle className="mr-2 h-5 w-5" />
            ) : (
              <AlertCircle className="mr-2 h-5 w-5" />
            )}
            <span>{alertMessage}</span>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <main className="flex-grow p-4">
        <div className="container mx-auto">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow">
                  <h2 className="text-xl font-semibold mb-2 flex items-center">
                    <User className="mr-2 h-5 w-5 text-blue-500" />
                    Participants
                  </h2>
                  <p className="text-3xl font-bold">{services.length}</p>
                  <p className="text-sm text-gray-500">Total participants with services</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow">
                  <h2 className="text-xl font-semibold mb-2 flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-yellow-500" />
                    Next Benchmarks
                  </h2>
                  <p className="text-3xl font-bold">
                    {services.filter(service => getNextBenchmark(service.benchmarks)).length}
                  </p>
                  <p className="text-sm text-gray-500">Services with pending benchmarks</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow">
                  <h2 className="text-xl font-semibold mb-2 flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-green-500" />
                    Services
                  </h2>
                  <p className="text-3xl font-bold">
                    {services.reduce((total, service) => {
                      const completed = service.benchmarks.filter(b => b.completed).length;
                      return total + completed;
                    }, 0)}
                  </p>
                  <p className="text-sm text-gray-500">Completed benchmarks</p>
                </div>
              </div>
              
              {upcomingDeadlines.length > 0 && (
                <div className="bg-white p-4 rounded shadow">
                  <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Participant</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Service</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Benchmark</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Due Date</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Days Left</th>
                        </tr>
                      </thead>
                      <tbody>
                        {upcomingDeadlines.slice(0, 5).map((deadline, index) => {
                          const daysLeft = getDaysRemaining(deadline.dueDate);
                          let statusClass = "text-gray-800";
                          if (daysLeft < 0) statusClass = "text-red-600";
                          else if (daysLeft <= 3) statusClass = "text-orange-500";
                          else if (daysLeft <= 7) statusClass = "text-yellow-500";
                          
                          return (
                            <tr key={index} className="border-b hover:bg-gray-50">
                              <td className="px-4 py-2">{deadline.participantName}</td>
                              <td className="px-4 py-2">{deadline.serviceCategory}</td>
                              <td className="px-4 py-2">{deadline.benchmarkName}</td>
                              <td className="px-4 py-2">{formatDate(deadline.dueDate)}</td>
                              <td className={`px-4 py-2 font-medium ${statusClass}`}>
                                {daysLeft < 0 
                                  ? `${Math.abs(daysLeft)} days overdue` 
                                  : daysLeft === 0 
                                    ? "Due today"
                                    : `${daysLeft} days`}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {upcomingDeadlines.length > 5 && (
                    <div className="mt-3 text-right">
                      <button 
                        className="text-blue-600 hover:text-blue-800 text-sm"
                        onClick={() => setActiveTab('deadlines')}
                      >
                        View all {upcomingDeadlines.length} deadlines
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              <div className="bg-white p-4 rounded shadow">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Recent Services</h2>
                  <button 
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center"
                    onClick={() => {
                      setActiveTab('services');
                      setAddingService(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Service
                  </button>
                </div>
                
                {services.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No services added yet</p>
                    <button 
                      className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm inline-flex items-center"
                      onClick={() => {
                        setActiveTab('services');
                        setAddingService(true);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add your first service
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Participant</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Service Type</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Service Category</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Progress</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Start Date</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {services.slice(0, 5).map(service => (
                          <tr key={service.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2">{service.participantName}</td>
                            <td className="px-4 py-2">{service.serviceType}</td>
                            <td className="px-4 py-2">{service.serviceCategory}</td>
                            <td className="px-4 py-2">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className="bg-blue-600 h-2.5 rounded-full" 
                                  style={{ width: `${calculateServiceProgress(service.benchmarks)}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-500">{calculateServiceProgress(service.benchmarks)}%</span>
                            </td>
                            <td className="px-4 py-2">{formatDate(service.startDate)}</td>
                            <td className="px-4 py-2">
                              <button 
                                className="text-blue-600 hover:text-blue-800 text-sm"
                                onClick={() => {
                                  viewServiceDetails(service);
                                  setActiveTab('services');
                                }}
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                
                {services.length > 5 && (
                  <div className="mt-3 text-right">
                    <button 
                      className="text-blue-600 hover:text-blue-800 text-sm"
                      onClick={() => setActiveTab('services')}
                    >
                      View all {services.length} services
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'services' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Services</h2>
                {!addingService && !showServiceDetails && (
                  <button 
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                    onClick={() => setAddingService(true)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Service
                  </button>
                )}
              </div>
              
              {addingService ? (
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="text-lg font-semibold mb-4">Add New Service</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Participant Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={newService.participantName}
                        onChange={(e) => setNewService({...newService, participantName: e.target.value})}
                        placeholder="Enter participant name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded"
                        value={newService.startDate}
                        onChange={(e) => setNewService({...newService, startDate: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service Type
                      </label>
                      <select
                        className="w-full p-2 border rounded"
                        value={newService.serviceType}
                        onChange={handleServiceTypeChange}
                      >
                        {serviceTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service Category
                      </label>
                      <select
                        className="w-full p-2 border rounded"
                        value={newService.serviceCategory}
                        onChange={handleServiceCategoryChange}
                        disabled={!newService.serviceType}
                      >
                        <option value="">Select category...</option>
                        {getServiceCategories(newService.serviceType).map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <button 
                      className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                      onClick={() => setAddingService(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      onClick={handleAddService}
                    >
                      Add Service
                    </button>
                  </div>
                </div>
              ) : showServiceDetails ? (
                <div className="bg-white p-4 rounded shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                      Service Details: {selectedService.participantName}
                    </h3>
                    <div className="flex space-x-2">
                      {!editingService && (
                        <>
                          <button
                            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm"
                            onClick={() => {
                              setShowServiceDetails(false);
                              setSelectedService(null);
                            }}
                          >
                            Back
                          </button>
                          <button
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                            onClick={() => startEditService(selectedService)}
                          >
                            Edit
                          </button>
                          <button
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                            onClick={() => deleteService(selectedService.id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {editingService ? (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Participant Name
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={editingService.participantName}
                            onChange={(e) => setEditingService({
                              ...editingService, 
                              participantName: e.target.value
                            })}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date
                          </label>
                          <input
                            type="date"
                            className="w-full p-2 border rounded"
                            value={editingService.startDate}
                            onChange={(e) => setEditingService({
                              ...editingService, 
                              startDate: e.target.value
                            })}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <button
                          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                          onClick={cancelEditService}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                          onClick={saveEditedService}
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Service Type</h4>
                          <p>{selectedService.serviceType}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Service Category</h4>
                          <p>{selectedService.serviceCategory}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Start Date</h4>
                          <p>{formatDate(selectedService.startDate)}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Progress</h4>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div 
                                className="bg-blue-600 h-2.5 rounded-full" 
                                style={{ width: `${calculateServiceProgress(selectedService.benchmarks)}%` }}
                              ></div>
                            </div>
                            <span>{calculateServiceProgress(selectedService.benchmarks)}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <h4 className="text-lg font-medium mb-3">Benchmarks</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Benchmark</th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Due Date</th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Notes</th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedService.benchmarks.map((benchmark, index) => {
                              const status = getBenchmarkStatus(benchmark);
                              let statusClass = "";
                              let statusText = "";
                              
                              switch(status) {
                                case 'completed':
                                  statusClass = "bg-green-100 text-green-800";
                                  statusText = "Completed";
                                  break;
                                case 'overdue':
                                  statusClass = "bg-red-100 text-red-800";
                                  statusText = "Overdue";
                                  break;
                                case 'urgent':
                                  statusClass = "bg-orange-100 text-orange-800";
                                  statusText = "Urgent";
                                  break;
                                case 'approaching':
                                  statusClass = "bg-yellow-100 text-yellow-800";
                                  statusText = "Approaching";
                                  break;
                                case 'on-track':
                                  statusClass = "bg-blue-100 text-blue-800";
                                  statusText = "On Track";
                                  break;
                                default:
                                  statusClass = "bg-gray-100 text-gray-800";
                                  statusText = "No Due Date";
                              }
                              
                              return (
                                <tr key={index} className="border-b hover:bg-gray-50">
                              <td className="px-4 py-2">
                                <div>
                                  {benchmark.name}
                                  {getNextBenchmark(selectedService.benchmarks)?.name === benchmark.name && (
                                    <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                                      Next Benchmark
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {benchmark.description}
                                </div>
                              </td>
                              <td className="px-4 py-2">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
                                  {statusText}
                                </span>
                              </td>
                                  <td className="px-4 py-2">
                                    {benchmark.dueDate ? (
                                      <div>
                                        {formatDate(benchmark.dueDate)}
                                        {!benchmark.completed && getDaysRemaining(benchmark.dueDate) !== null && (
                                          <div className="text-xs text-gray-500">
                                            {getDaysRemaining(benchmark.dueDate) < 0 
                                              ? `${Math.abs(getDaysRemaining(benchmark.dueDate))} days overdue` 
                                              : getDaysRemaining(benchmark.dueDate) === 0 
                                                ? "Due today"
                                                : `${getDaysRemaining(benchmark.dueDate)} days remaining`}
                                          </div>
                                        )}
                                      </div>
                                    ) : (
                                      <span className="text-gray-400">Not set</span>
                                    )}
                                  </td>
                                  <td className="px-4 py-2">
                                    <input
                                      type="text"
                                      className="w-full p-1 text-sm border rounded"
                                      placeholder="Add notes..."
                                      value={benchmark.notes || ''}
                                      onChange={(e) => updateBenchmarkNote(selectedService.id, index, e.target.value)}
                                    />
                                  </td>
                                  <td className="px-4 py-2">
                                    <button
                                      className={`px-2 py-1 rounded text-xs font-medium ${benchmark.completed ? 'bg-gray-100 hover:bg-gray-200 text-gray-800' : 'bg-green-100 hover:bg-green-200 text-green-800'}`}
                                      onClick={() => toggleBenchmarkCompletion(selectedService.id, index)}
                                    >
                                      {benchmark.completed ? 'Mark Incomplete' : 'Mark Complete'}
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="mb-4">
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="Search by participant name, service type or category..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  {filteredServices.length === 0 ? (
                    <div className="bg-white p-8 rounded shadow text-center">
                      {searchQuery ? (
                        <p className="text-gray-500">No services match your search criteria</p>
                      ) : (
                        <div>
                          <p className="text-gray-500 mb-4">No services added yet</p>
                          <button 
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 inline-flex items-center"
                            onClick={() => setAddingService(true)}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add your first service
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="overflow-x-auto bg-white p-4 rounded shadow">
                      <table className="min-w-full table-auto">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Participant</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Service Type</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Service Category</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Progress</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Start Date</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredServices.map(service => (
                            <tr key={service.id} className="border-b hover:bg-gray-50">
                              <td className="px-4 py-2">{service.participantName}</td>
                              <td className="px-4 py-2">{service.serviceType}</td>
                              <td className="px-4 py-2">{service.serviceCategory}</td>
                              <td className="px-4 py-2">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                  <div 
                                    className="bg-blue-600 h-2.5 rounded-full" 
                                    style={{ width: `${calculateServiceProgress(service.benchmarks)}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-500">{calculateServiceProgress(service.benchmarks)}%</span>
                              </td>
                              <td className="px-4 py-2">{formatDate(service.startDate)}</td>
                              <td className="px-4 py-2">
                                <button 
                                  className="text-blue-600 hover:text-blue-800 text-sm mr-2"
                                  onClick={() => viewServiceDetails(service)}
                                >
                                  View
                                </button>
                                <button 
                                  className="text-red-600 hover:text-red-800 text-sm"
                                  onClick={() => deleteService(service.id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'deadlines' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Upcoming Deadlines</h2>
              
              {upcomingDeadlines.length === 0 ? (
                <div className="bg-white p-8 rounded shadow text-center">
                  <p className="text-gray-500">No upcoming deadlines in the next 14 days</p>
                </div>
              ) : (
                <div className="bg-white p-4 rounded shadow">
                  <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Participant</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Service</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Benchmark</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Due Date</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Days Left</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {upcomingDeadlines.map((deadline, index) => {
                          const daysLeft = getDaysRemaining(deadline.dueDate);
                          let statusClass = "text-gray-800";
                          if (daysLeft < 0) statusClass = "text-red-600";
                          else if (daysLeft <= 3) statusClass = "text-orange-500";
                          else if (daysLeft <= 7) statusClass = "text-yellow-500";
                          
                          return (
                            <tr key={index} className="border-b hover:bg-gray-50">
                              <td className="px-4 py-2">{deadline.participantName}</td>
                              <td className="px-4 py-2">{deadline.serviceCategory}</td>
                              <td className="px-4 py-2">{deadline.benchmarkName}</td>
                              <td className="px-4 py-2">{formatDate(deadline.dueDate)}</td>
                              <td className={`px-4 py-2 font-medium ${statusClass}`}>
                                {daysLeft < 0 
                                  ? `${Math.abs(daysLeft)} days overdue` 
                                  : daysLeft === 0 
                                    ? "Due today"
                                    : `${daysLeft} days`}
                              </td>
                              <td className="px-4 py-2">
                                <button
                                  className="text-blue-600 hover:text-blue-800 text-sm"
                                  onClick={() => {
                                    // Find the service
                                    const service = services.find(s => s.id === deadline.serviceId);
                                    if (service) {
                                      viewServiceDetails(service);
                                      setActiveTab('services');
                                    }
                                  }}
                                >
                                  View Details
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center text-sm">
        <p>VR Service Benchmark Tracker &copy; {new Date().getFullYear()}</p>
        <p className="text-gray-400 text-xs mt-1">Based on the Florida DVR Programmatic Operations Resource Guide Handbook</p>
      </footer>
    </div>
  );
};

// Add this at the end of the file to render the app
const rootElement = document.getElementById('root');

// Try React 18 method first, then fall back to older method if needed
try {
  ReactDOM.createRoot(rootElement).render(<BenchmarkTracker />);
} catch (error) {
  console.error("Error with createRoot method:", error);
  // Fallback to React 17 and earlier method
  try {
    ReactDOM.render(<BenchmarkTracker />, rootElement);
  } catch (err) {
    console.error("Both rendering methods failed:", err);
    rootElement.innerHTML = '<div style="color:red;padding:20px;">Error loading application. Check console for details.</div>';
  }
}
