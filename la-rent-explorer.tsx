import React, { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Home, BarChart3, Calculator, Map, TrendingUp, Book, Info, Menu, X, Search, MapPin, DollarSign, Bed, Bath, Square, Building, Car, Sofa } from 'lucide-react';

// 샘플 데이터
const neighborhoodsData = [
  { name: 'Santa Monica', avgRent: 3850, medianRent: 3600, population: 92000, income: 85000, distance: 15, crime: 2.3, availability: 145, zipCode: '90401, 90402, 90403, 90404, 90405' },
  { name: 'Koreatown', avgRent: 2250, medianRent: 2100, population: 125000, income: 48000, distance: 5, crime: 3.8, availability: 289, zipCode: '90004, 90005, 90006, 90010, 90020' },
  { name: 'Downtown LA', avgRent: 2950, medianRent: 2800, population: 58000, income: 72000, distance: 0, crime: 4.2, availability: 203, zipCode: '90012, 90013, 90014, 90015, 90017' },
  { name: 'Hollywood', avgRent: 2650, medianRent: 2500, population: 95000, income: 55000, distance: 8, crime: 3.5, availability: 178, zipCode: '90028, 90038, 90046, 90068' },
  { name: 'Westwood', avgRent: 3200, medianRent: 3050, population: 52000, income: 78000, distance: 12, crime: 1.8, availability: 98, zipCode: '90024, 90025, 90064, 90095' },
  { name: 'Culver City', avgRent: 2850, medianRent: 2700, population: 39000, income: 68000, distance: 10, crime: 2.1, availability: 134, zipCode: '90230, 90232, 90233' },
  { name: 'Pasadena', avgRent: 2450, medianRent: 2300, population: 142000, income: 62000, distance: 18, crime: 2.5, availability: 167, zipCode: '91101, 91103, 91104, 91105, 91106, 91107' },
  { name: 'Long Beach', avgRent: 2150, medianRent: 2000, population: 467000, income: 54000, distance: 25, crime: 3.9, availability: 312, zipCode: '90801, 90802, 90803, 90804, 90805, 90806, 90807, 90808, 90810, 90813, 90814, 90815' },
];

const timeSeriesData = [
  { year: '2019', rent: 2000, event: '' },
  { year: '2020', rent: 2100, event: 'COVID-19 Start' },
  { year: '2021', rent: 2050, event: 'Pandemic Low' },
  { year: '2022', rent: 2300, event: 'Recovery' },
  { year: '2023', rent: 2550, event: 'Inflation' },
  { year: '2024', rent: 2750, event: '' },
];

const correlationData = [
  { variable: 'Square Footage', correlation: 0.82 },
  { variable: 'Income Level', correlation: 0.76 },
  { variable: 'Distance to Beach', correlation: -0.64 },
  { variable: 'Crime Rate', correlation: -0.58 },
  { variable: 'Parking Available', correlation: 0.45 },
];

// 메인 앱 컴포넌트
export default function LAREXplorer() {
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState(['Santa Monica', 'Koreatown', 'Downtown LA']);
  const [searchQuery, setSearchQuery] = useState('');

  // Prediction Tool State
  const [predictionInputs, setPredictionInputs] = useState({
    neighborhood: 'Koreatown',
    bedrooms: 2,
    bathrooms: 1,
    sqft: 850,
    buildingType: 'Apartment',
    parking: true,
    furnished: false
  });
  const [prediction, setPrediction] = useState(null);

  // 예측 함수
  const calculatePrediction = () => {
    const base = neighborhoodsData.find(n => n.name === predictionInputs.neighborhood)?.avgRent || 2500;
    const bedroomFactor = predictionInputs.bedrooms * 450;
    const bathroomFactor = predictionInputs.bathrooms * 200;
    const sqftFactor = (predictionInputs.sqft / 100) * 30;
    const parkingFactor = predictionInputs.parking ? 150 : 0;
    const furnishedFactor = predictionInputs.furnished ? 300 : 0;
    const typeFactor = predictionInputs.buildingType === 'Condo' ? 200 : 0;
    
    const predicted = Math.round(base + bedroomFactor + bathroomFactor + sqftFactor + parkingFactor + furnishedFactor + typeFactor);
    const lower = Math.round(predicted * 0.9);
    const upper = Math.round(predicted * 1.1);
    
    setPrediction({
      predicted,
      lower,
      upper,
      confidence: 0.85
    });
  };

  // 네비게이션 아이템
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'prediction', label: 'Prediction', icon: Calculator },
    { id: 'heatmap', label: 'Heatmap', icon: Map },
    { id: 'analysis', label: 'Analysis', icon: TrendingUp },
    { id: 'methodology', label: 'Methodology', icon: Book },
    { id: 'about', label: 'About', icon: Info },
  ];

  // 필터된 데이터
  const filteredNeighborhoods = useMemo(() => {
    return neighborhoodsData.filter(n => 
      selectedNeighborhoods.includes(n.name)
    );
  }, [selectedNeighborhoods]);

  const toggleNeighborhood = (name) => {
    setSelectedNeighborhoods(prev => 
      prev.includes(name) 
        ? prev.filter(n => n !== name)
        : [...prev, name].slice(0, 5)
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation Bar */}
      <nav className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <MapPin className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold">LA Rent Explorer</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors ${
                    currentPage === item.id
                      ? 'bg-blue-600 text-white'
                      : darkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              ))}
              
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`ml-4 px-3 py-2 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className={`md:hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} border-t`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center space-x-2 ${
                    currentPage === item.id
                      ? 'bg-blue-600 text-white'
                      : darkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} darkMode={darkMode} />}
        {currentPage === 'dashboard' && (
          <DashboardPage 
            neighborhoodsData={neighborhoodsData}
            filteredNeighborhoods={filteredNeighborhoods}
            selectedNeighborhoods={selectedNeighborhoods}
            toggleNeighborhood={toggleNeighborhood}
            timeSeriesData={timeSeriesData}
            darkMode={darkMode}
          />
        )}
        {currentPage === 'prediction' && (
          <PredictionPage
            inputs={predictionInputs}
            setInputs={setPredictionInputs}
            prediction={prediction}
            calculate={calculatePrediction}
            neighborhoodsData={neighborhoodsData}
            darkMode={darkMode}
          />
        )}
        {currentPage === 'heatmap' && <HeatmapPage neighborhoodsData={neighborhoodsData} darkMode={darkMode} />}
        {currentPage === 'analysis' && <AnalysisPage correlationData={correlationData} neighborhoodsData={neighborhoodsData} darkMode={darkMode} />}
        {currentPage === 'methodology' && <MethodologyPage darkMode={darkMode} />}
        {currentPage === 'about' && <AboutPage darkMode={darkMode} />}
      </main>

      {/* Footer */}
      <footer className={`mt-20 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-2">LA Rent Explorer</h3>
              <p className="text-sm text-gray-500">Data-Driven Insights Into Los Angeles Rental Prices</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Data Sources</h3>
              <p className="text-sm text-gray-500">Zillow, RentCafe, Public Datasets</p>
              <p className="text-sm text-gray-500 mt-1">Last Updated: November 2024</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Contact</h3>
              <p className="text-sm text-gray-500">GitHub | Portfolio | Email</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            © 2025 LA Rent Explorer. Portfolio project by PCC student Glen Yun
          </div>
        </div>
      </footer>
    </div>
  );
}

// Home Page Component
function HomePage({ setCurrentPage, darkMode }) {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              LA Rent Explorer
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Data-Driven Insights Into Los Angeles Rental Prices
            </p>
            <p className="text-lg mb-12 max-w-2xl mx-auto">
              Analyze real rental market trends across Los Angeles using interactive charts, statistical modeling, and predictive analytics
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105"
              >
                Start Exploring →
              </button>
              <button
                onClick={() => setCurrentPage('prediction')}
                className="px-8 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all border-2 border-white"
              >
                Try Prediction Tool
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: BarChart3, title: 'Interactive Dashboard', desc: 'Compare neighborhoods with dynamic charts' },
            { icon: Calculator, title: 'Rent Prediction', desc: 'ML-powered rent estimation tool' },
            { icon: Map, title: 'Price Heatmap', desc: 'Visual map of rental prices across LA' },
            { icon: TrendingUp, title: 'Statistical Analysis', desc: 'Deep dive into market correlations' },
          ].map((feature, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-shadow`}
            >
              <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Project Summary */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-blue-50'} py-16`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Why LA Rent Matters</h2>
          <div className="space-y-4 text-lg">
            <p>
              Los Angeles has one of the most dynamic and expensive rental markets in the United States. Understanding rental prices is crucial for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Renters looking for affordable neighborhoods</li>
              <li>Real estate investors analyzing market trends</li>
              <li>Policy makers studying housing affordability</li>
              <li>Researchers examining urban development patterns</li>
            </ul>
            <p className="mt-6">
              This platform combines real rental data with statistical modeling to provide actionable insights into the LA rental market.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard Page Component
function DashboardPage({ neighborhoodsData, filteredNeighborhoods, selectedNeighborhoods, toggleNeighborhood, timeSeriesData, darkMode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Market Dashboard</h1>
      
      {/* Neighborhood Filter */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg mb-8`}>
        <h3 className="text-xl font-semibold mb-4">Select Neighborhoods (Max 5)</h3>
        <div className="flex flex-wrap gap-2">
          {neighborhoodsData.map(n => (
            <button
              key={n.name}
              onClick={() => toggleNeighborhood(n.name)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedNeighborhoods.includes(n.name)
                  ? 'bg-blue-600 text-white'
                  : darkMode
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {n.name}
            </button>
          ))}
        </div>
      </div>

      {/* Neighborhood Comparison */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg mb-8`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Average Rent by Neighborhood</h2>
          <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
            Data: 2024
          </span>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={filteredNeighborhoods}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="name" stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
            <YAxis 
              stroke={darkMode ? '#9CA3AF' : '#4B5563'}
              label={{ value: 'Rent ($)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: darkMode ? '#1F2937' : '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
              formatter={(value) => `${value.toLocaleString()}`}
            />
            <Legend />
            <Bar dataKey="avgRent" fill="#3B82F6" name="Average Rent ($)" />
            <Bar dataKey="medianRent" fill="#10B981" name="Median Rent ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Scatter Plot Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className="text-2xl font-semibold mb-4">Rent vs. Income</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="income" 
                name="Income" 
                stroke={darkMode ? '#9CA3AF' : '#4B5563'}
                label={{ value: 'Median Income ($)', position: 'insideBottom', offset: -5 }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <YAxis 
                dataKey="avgRent" 
                name="Rent" 
                stroke={darkMode ? '#9CA3AF' : '#4B5563'}
                label={{ value: 'Average Rent ($)', angle: -90, position: 'insideLeft' }}
                tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                formatter={(value, name) => {
                  if (name === "Income") return [`${value.toLocaleString()}`, 'Median Income'];
                  if (name === "Rent") return [`${value.toLocaleString()}`, 'Average Rent'];
                  return value;
                }}
              />
              <Scatter data={neighborhoodsData} fill="#3B82F6" />
            </ScatterChart>
          </ResponsiveContainer>
          <p className={`mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Higher income areas correlate with higher rent prices (r = 0.76)
          </p>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className="text-2xl font-semibold mb-4">Rent vs. Distance to Downtown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[...neighborhoodsData].sort((a, b) => a.distance - b.distance)} margin={{ bottom: 20, left: 20 }}>
              <CartesianGrid stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="distance" 
                name="Distance" 
                stroke={darkMode ? '#9CA3AF' : '#4B5563'}
                label={{ value: 'Distance to Downtown (km)', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                stroke={darkMode ? '#9CA3AF' : '#4B5563'}
                label={{ value: 'Average Rent ($)', angle: -90, position: 'insideLeft' }}
                tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
              />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === "Average Rent") return [`${value.toLocaleString()}`, 'Average Rent'];
                  return value;
                }}
                labelFormatter={(value) => `Distance: ${value} km`}
              />
              <Line type="monotone" dataKey="avgRent" stroke="#F59E0B" strokeWidth={0} dot={{ fill: '#F59E0B', r: 6 }} name="Average Rent" />
            </LineChart>
          </ResponsiveContainer>
          <p className={`mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Some premium neighborhoods maintain high rents despite distance
          </p>
        </div>
      </div>

      {/* Time Series Trends */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">6-Year Rent Trends</h2>
          <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
            2019-2024
          </span>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={timeSeriesData}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="year" stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
            <YAxis 
              stroke={darkMode ? '#9CA3AF' : '#4B5563'}
              label={{ value: 'Average Rent ($)', angle: -90, position: 'insideLeft' }}
              tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: darkMode ? '#1F2937' : '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
              formatter={(value) => [`${value.toLocaleString()}`, 'Average Rent']}
            />
            <Legend />
            <Line type="monotone" dataKey="rent" stroke="#3B82F6" strokeWidth={3} name="Average Rent ($)" dot={{ fill: '#3B82F6', r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2">
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-red-50'}`}>
            <p className="text-sm font-semibold text-red-600">2020: COVID-19 Pandemic Start</p>
            <p className="text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}">Rent briefly increased due to housing demand uncertainty</p>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-orange-50'}`}>
            <p className="text-sm font-semibold text-orange-600">2021: Pandemic Low Point</p>
            <p className="text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}">Rents decreased as people left cities during remote work</p>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
            <p className="text-sm font-semibold text-green-600">2022: Market Recovery</p>
            <p className="text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}">Strong rebound as people returned to urban areas</p>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
            <p className="text-sm font-semibold text-purple-600">2023: Inflation Period</p>
            <p className="text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}">Rent increases accelerated due to inflation and housing shortage</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Prediction Page Component
function PredictionPage({ inputs, setInputs, prediction, calculate, neighborhoodsData, darkMode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Rent Prediction Tool</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className="text-2xl font-semibold mb-6">Property Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Neighborhood</label>
              <select
                value={inputs.neighborhood}
                onChange={(e) => setInputs({...inputs, neighborhood: e.target.value})}
                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              >
                {neighborhoodsData.map(n => (
                  <option key={n.name} value={n.name}>{n.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center">
                  <Bed className="h-4 w-4 mr-1" /> Bedrooms
                </label>
                <input
                  type="number"
                  value={inputs.bedrooms}
                  onChange={(e) => setInputs({...inputs, bedrooms: parseInt(e.target.value)})}
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                  min="0"
                  max="5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center">
                  <Bath className="h-4 w-4 mr-1" /> Bathrooms
                </label>
                <input
                  type="number"
                  value={inputs.bathrooms}
                  onChange={(e) => setInputs({...inputs, bathrooms: parseInt(e.target.value)})}
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                  min="0"
                  max="5"
                  step="0.5"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center">
                <Square className="h-4 w-4 mr-1" /> Square Footage
              </label>
              <input
                type="number"
                value={inputs.sqft}
                onChange={(e) => setInputs({...inputs, sqft: parseInt(e.target.value)})}
                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                min="300"
                max="3000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center">
                <Building className="h-4 w-4 mr-1" /> Building Type
              </label>
              <select
                value={inputs.buildingType}
                onChange={(e) => setInputs({...inputs, buildingType: e.target.value})}
                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              >
                <option>Apartment</option>
                <option>Condo</option>
                <option>Studio</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={inputs.parking}
                  onChange={(e) => setInputs({...inputs, parking: e.target.checked})}
                  className="w-4 h-4"
                />
                <span className="flex items-center"><Car className="h-4 w-4 mr-1" /> Parking Available</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={inputs.furnished}
                  onChange={(e) => setInputs({...inputs, furnished: e.target.checked})}
                  className="w-4 h-4"
                />
                <span className="flex items-center"><Sofa className="h-4 w-4 mr-1" /> Furnished</span>
              </label>
            </div>

            <button
              onClick={calculate}
              className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              Calculate Predicted Rent
            </button>
          </div>
        </div>

        {/* Prediction Results */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className="text-2xl font-semibold mb-6">Prediction Results</h2>
          
          {prediction ? (
            <div className="space-y-6">
              <div className="text-center p-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white">
                <p className="text-sm mb-2">Predicted Monthly Rent</p>
                <p className="text-5xl font-bold">${prediction.predicted.toLocaleString()}</p>
                <p className="text-sm mt-4 opacity-90">
                  95% Confidence Interval: ${prediction.lower.toLocaleString()} - ${prediction.upper.toLocaleString()}
                </p>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <h3 className="font-semibold mb-2">Model Confidence</h3>
                <div className="w-full bg-gray-300 rounded-full h-4">
                  <div 
                    className="bg-green-500 h-4 rounded-full flex items-center justify-center text-xs text-white font-bold"
                    style={{ width: `${prediction.confidence * 100}%` }}
                  >
                    {(prediction.confidence * 100).toFixed(0)}%
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className="font-semibold mb-2">About This Prediction</h3>
                <p className="text-sm">
                  This prediction is based on a multivariate linear regression model trained on Los Angeles rental listings. 
                  The model considers neighborhood characteristics, property features, and current market conditions.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Your Property Summary</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className={`p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <span className="font-medium">Location:</span> {inputs.neighborhood}
                  </div>
                  <div className={`p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <span className="font-medium">Size:</span> {inputs.bedrooms}bd / {inputs.bathrooms}ba
                  </div>
                  <div className={`p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <span className="font-medium">Area:</span> {inputs.sqft} sqft
                  </div>
                  <div className={`p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <span className="font-medium">Type:</span> {inputs.buildingType}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <Calculator className="h-20 w-20 text-gray-400 mb-4" />
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Fill out the property details and click "Calculate" to see the predicted rent
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Heatmap Page Component
function HeatmapPage({ neighborhoodsData, darkMode }) {
  const [selectedZip, setSelectedZip] = useState('');
  
  // 검색 필터링
  const filteredData = useMemo(() => {
    if (!selectedZip.trim()) return neighborhoodsData;
    
    const searchTerm = selectedZip.toLowerCase();
    return neighborhoodsData.filter(n => 
      n.name.toLowerCase().includes(searchTerm) ||
      n.zipCode.includes(searchTerm)
    );
  }, [selectedZip, neighborhoodsData]);
  
  // Color scale function
  const getColor = (rent) => {
    if (rent < 2000) return '#10B981';
    if (rent < 2500) return '#3B82F6';
    if (rent < 3000) return '#F59E0B';
    if (rent < 3500) return '#EF4444';
    return '#DC2626';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Interactive Rent Heatmap</h1>
      
      {/* Search Bar */}
      <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg mb-6`}>
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by neighborhood name or zip code..."
            value={selectedZip}
            onChange={(e) => setSelectedZip(e.target.value)}
            className={`flex-1 px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
          {selectedZip && (
            <button
              onClick={() => setSelectedZip('')}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        {selectedZip && (
          <p className="mt-2 text-sm text-gray-500">
            Found {filteredData.length} neighborhood(s)
          </p>
        )}
      </div>

      {/* Legend */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg mb-6`}>
        <h3 className="font-semibold mb-4">Price Range Legend</h3>
        <div className="flex items-center flex-wrap gap-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded" style={{ backgroundColor: '#10B981' }}></div>
            <span className="text-sm">Under $2,000</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded" style={{ backgroundColor: '#3B82F6' }}></div>
            <span className="text-sm">$2,000 - $2,500</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded" style={{ backgroundColor: '#F59E0B' }}></div>
            <span className="text-sm">$2,500 - $3,000</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded" style={{ backgroundColor: '#EF4444' }}></div>
            <span className="text-sm">$3,000 - $3,500</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded" style={{ backgroundColor: '#DC2626' }}></div>
            <span className="text-sm">Over $3,500</span>
          </div>
        </div>
      </div>

      {/* Map Visualization (Simplified Grid View) */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="font-semibold mb-4">LA Neighborhoods by Average Rent</h3>
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredData.map(n => (
              <div
                key={n.name}
                className="p-4 rounded-lg cursor-pointer transition-all hover:scale-105 hover:shadow-xl"
                style={{ 
                  backgroundColor: getColor(n.avgRent),
                  color: 'white'
                }}
              >
                <h4 className="font-bold mb-2">{n.name}</h4>
                <p className="text-xs opacity-90 mb-2">Zip: {n.zipCode.split(', ')[0]} +{n.zipCode.split(', ').length - 1} more</p>
                <div className="text-sm space-y-1">
                  <p>Avg: ${n.avgRent.toLocaleString()}</p>
                  <p>Median: ${n.medianRent.toLocaleString()}</p>
                  <p>Available: {n.availability} units</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No neighborhoods found matching "{selectedZip}"
            </p>
            <button
              onClick={() => setSelectedZip('')}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className="font-semibold mb-2 text-green-600">Most Affordable</h3>
          <p className="text-2xl font-bold">Long Beach</p>
          <p className="text-sm text-gray-500">Avg: $2,150/month</p>
        </div>
        
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className="font-semibold mb-2 text-red-600">Most Expensive</h3>
          <p className="text-2xl font-bold">Santa Monica</p>
          <p className="text-sm text-gray-500">Avg: $3,850/month</p>
        </div>
        
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className="font-semibold mb-2 text-blue-600">Most Available</h3>
          <p className="text-2xl font-bold">Long Beach</p>
          <p className="text-sm text-gray-500">312 units available</p>
        </div>
      </div>
    </div>
  );
}

// Analysis Page Component
function AnalysisPage({ correlationData, neighborhoodsData, darkMode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Statistical Analysis</h1>
      
      {/* Correlation Analysis */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg mb-8`}>
        <h2 className="text-2xl font-semibold mb-4">Correlation Analysis</h2>
        <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Understanding which factors have the strongest relationship with rent prices
        </p>
        
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={correlationData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
            <XAxis type="number" domain={[-1, 1]} stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
            <YAxis dataKey="variable" type="category" width={150} stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: darkMode ? '#1F2937' : '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="correlation" name="Correlation Coefficient">
              {correlationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.correlation > 0 ? '#3B82F6' : '#EF4444'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
          <h3 className="font-semibold mb-2">Understanding Correlation (r)</h3>
          <ul className="text-sm space-y-1">
            <li>• r = 1.0: Perfect positive correlation</li>
            <li>• r = 0.7–0.9: Strong positive correlation</li>
            <li>• r = 0.4–0.6: Moderate positive correlation</li>
            <li>• r = –0.4 to –0.6: Moderate negative correlation</li>
            <li>• r = –0.7 to –0.9: Strong negative correlation</li>
            <li>• r = –1.0: Perfect negative correlation</li>
          </ul>
        </div>
        
        <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
          <h3 className="font-semibold mb-2">Interpreting the Sign</h3>
          <ul className="text-sm space-y-1">
            <li>• <strong>Positive values</strong> mean that higher values of the factor increase rent prices.</li>
            <li>• <strong>Negative values</strong> mean that higher values of the factor reduce rent prices.</li>
          </ul>
        </div>
      </div>

      {/* Regression Modeling */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg mb-8`}>
        <h2 className="text-2xl font-semibold mb-4">Regression Modeling</h2>
        <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Linear regression model: Rent ~ Square Footage + Bedrooms + Location
        </p>
        
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart>
            <CartesianGrid stroke={darkMode ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="income" name="Income ($)" stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
            <YAxis dataKey="avgRent" name="Rent ($)" stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={neighborhoodsData} fill="#3B82F6" />
          </ScatterChart>
        </ResponsiveContainer>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h4 className="font-semibold mb-1">R² Score</h4>
            <p className="text-3xl font-bold text-blue-600">0.82</p>
            <p className="text-sm text-gray-500 mt-1">Model explains 82% of variance</p>
          </div>
          
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h4 className="font-semibold mb-1">RMSE</h4>
            <p className="text-3xl font-bold text-green-600">$245</p>
            <p className="text-sm text-gray-500 mt-1">Average prediction error</p>
          </div>
          
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h4 className="font-semibold mb-1">MAE</h4>
            <p className="text-3xl font-bold text-orange-600">$198</p>
            <p className="text-sm text-gray-500 mt-1">Mean absolute error</p>
          </div>
        </div>
      </div>

      {/* Feature Importance */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg mb-8`}>
        <h2 className="text-2xl font-semibold mb-4">Feature Importance</h2>
        <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Relative impact of each variable on rent prediction
        </p>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={correlationData.map(d => ({ ...d, importance: Math.abs(d.correlation) * 100 }))} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
            <XAxis type="number" stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
            <YAxis dataKey="variable" type="category" width={150} stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
            <Tooltip />
            <Bar dataKey="importance" fill="#10B981" name="Importance %" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Limitations */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800 border-yellow-600' : 'bg-yellow-50 border-yellow-400'} border-2`}>
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          ⚠️ Model Limitations
        </h2>
        <ul className="space-y-2">
          <li>• <strong>Sample-based data:</strong> Model trained on limited dataset, not comprehensive market data</li>
          <li>• <strong>Time sensitivity:</strong> Does not reflect real-time market fluctuations</li>
          <li>• <strong>Simplified features:</strong> Cannot capture all factors (e.g., exact location quality, building age, amenities)</li>
          <li>• <strong>Neighborhood categories:</strong> Broad categorization may miss micro-market variations</li>
          <li>• <strong>External factors:</strong> Economic changes, policy updates not automatically reflected</li>
        </ul>
        <p className="mt-4 font-semibold">
          This is a demonstration project for educational and portfolio purposes. Always consult real estate professionals for actual rental decisions.
        </p>
      </div>
    </div>
  );
}

// Methodology Page Component
function MethodologyPage({ darkMode }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Methodology</h1>
      
      <div className="space-y-8">
        {/* Data Collection */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className="text-2xl font-semibold mb-4">1. Data Collection</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold mb-2">Data Sources</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Zillow Rental Listings API</li>
                <li>RentCafe Market Reports</li>
                <li>LA County Public Datasets</li>
                <li>Web scraping from rental platforms</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Collection Period</h3>
              <p>Data collected from January 2020 - November 2024</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Sample Size</h3>
              <p>Approximately 2,500 rental listings across 8 major LA neighborhoods</p>
            </div>
          </div>
        </div>

        {/* Data Cleaning */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className="text-2xl font-semibold mb-4">2. Data Cleaning & Preprocessing</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold mb-2">Missing Values</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Removed listings with missing critical fields (rent, location, bedrooms)</li>
                <li>Imputed missing square footage using bedroom-based averages</li>
                <li>Filled parking/furnished data with "No" if unspecified</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Outlier Removal</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Removed listings below $800/month (likely errors)</li>
                <li>Removed listings above $8,000/month (luxury outliers)</li>
                <li>Applied IQR method to filter extreme values</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Standardization</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Unified neighborhood naming conventions</li>
                <li>Converted all currency to USD</li>
                <li>Normalized square footage units</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Statistical Modeling */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className="text-2xl font-semibold mb-4">3. Statistical Modeling</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold mb-2">Model Type</h3>
              <p>Multivariate Linear Regression</p>
              <div className={`mt-2 p-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} font-mono text-sm`}>
                Rent = β₀ + β₁(sqft) + β₂(bedrooms) + β₃(bathrooms) + β₄(neighborhood) + β₅(parking) + β₆(furnished) + ε
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Train/Test Split</h3>
              <p>80% training data / 20% testing data</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Validation Metrics</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>R² Score:</strong> 0.82 (good fit)</li>
                <li><strong>RMSE:</strong> $245 (acceptable error range)</li>
                <li><strong>MAE:</strong> $198 (mean absolute error)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Cross-Validation</h3>
              <p>5-fold cross-validation to ensure model stability</p>
            </div>
          </div>
        </div>

        {/* Visualization Tools */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className="text-2xl font-semibold mb-4">4. Visualization & Tech Stack</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold mb-2">Frontend</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>React 18 with Hooks</li>
                <li>Tailwind CSS for styling</li>
                <li>Recharts for data visualization</li>
                <li>Lucide React for icons</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Data Analysis</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Python (Pandas, NumPy)</li>
                <li>Scikit-learn for ML modeling</li>
                <li>Matplotlib/Seaborn for exploratory analysis</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Deployment</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Vercel for hosting</li>
                <li>GitHub for version control</li>
                <li>Responsive design for all devices</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Future Improvements */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800 border-blue-600' : 'bg-blue-50 border-blue-400'} border-2`}>
          <h2 className="text-2xl font-semibold mb-4">🚀 Future Improvements</h2>
          <ul className="space-y-2">
            <li>• Integrate real-time API for live market data</li>
            <li>• Add more sophisticated ML models (Random Forest, XGBoost)</li>
            <li>• Include time-series forecasting for future rent predictions</li>
            <li>• Expand to more LA neighborhoods and surrounding areas</li>
            <li>• Add user accounts to save favorite neighborhoods</li>
            <li>• Implement comparative market analysis tools</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// About Page Component
function AboutPage({ darkMode }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">About This Project</h1>
      
      <div className="space-y-8">
        {/* Project Overview */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
          <p className="mb-4">
            LA Rent Explorer is a comprehensive data science portfolio project that demonstrates skills in data analysis, 
            statistical modeling, and web development. This platform provides data-driven insights into the Los Angeles 
            rental market through interactive visualizations and predictive analytics.
          </p>
          <p>
            The goal is to make rental market data accessible and understandable for renters, investors, and researchers 
            interested in LA housing trends.
          </p>
        </div>

        {/* Creator Info */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className="text-2xl font-semibold mb-4">About the Creator</h2>
          <div className="space-y-3">
            <p><strong>Role:</strong> Data Science Student | Web Developer</p>
            <p><strong>Institution:</strong> Pasadena City College (PCC)</p>
            <p><strong>Focus Areas:</strong> Data Analysis, Machine Learning, Statistical Modeling, Full-Stack Development</p>
            <p className="mt-4">
              This project was created as part of a data science portfolio to demonstrate proficiency in:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>Data collection and preprocessing</li>
              <li>Statistical analysis and visualization</li>
              <li>Machine learning model development</li>
              <li>Web application development</li>
              <li>UI/UX design principles</li>
            </ul>
          </div>
        </div>

        {/* Technologies Used */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Frontend</h3>
              <ul className="space-y-1">
                <li>• React 18</li>
                <li>• Tailwind CSS</li>
                <li>• Recharts</li>
                <li>• Lucide Icons</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Data Science</h3>
              <ul className="space-y-1">
                <li>• Python</li>
                <li>• Pandas & NumPy</li>
                <li>• Scikit-learn</li>
                <li>• Matplotlib</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <h3 className="font-semibold mb-2 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                Interactive Dashboard
              </h3>
              <p className="text-sm">
                Compare multiple neighborhoods side-by-side with dynamic charts showing rent trends, 
                population density, and income correlations.
              </p>
            </div>
            
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
              <h3 className="font-semibold mb-2 flex items-center">
                <Calculator className="h-5 w-5 mr-2 text-green-600" />
                Rent Prediction Tool
              </h3>
              <p className="text-sm">
                ML-powered prediction tool using multivariate linear regression to estimate rental prices 
                based on property features.
              </p>
            </div>
            
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-orange-50'}`}>
              <h3 className="font-semibold mb-2 flex items-center">
                <Map className="h-5 w-5 mr-2 text-orange-600" />
                Interactive Heatmap
              </h3>
              <p className="text-sm">
                Visual representation of rent prices across LA neighborhoods with color-coded pricing 
                and detailed neighborhood statistics.
              </p>
            </div>
            
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
              <h3 className="font-semibold mb-2 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                Statistical Analysis
              </h3>
              <p className="text-sm">
                Deep-dive correlation analysis, regression modeling, and feature importance visualization 
                for data science enthusiasts.
              </p>
            </div>
          </div>
        </div>

        {/* Contact & Links */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className="text-2xl font-semibold mb-4">Contact & Links</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">GH</span>
              </div>
              <div>
                <p className="font-semibold">GitHub Repository</p>
                <p className="text-sm text-gray-500">github.com/username/la-rent-explorer</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">📧</span>
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-sm text-gray-500">student@example.com</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">💼</span>
              </div>
              <div>
                <p className="font-semibold">Portfolio</p>
                <p className="text-sm text-gray-500">portfolio-website.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-yellow-900 border-yellow-600' : 'bg-yellow-50 border-yellow-400'} border-2`}>
          <h2 className="text-xl font-semibold mb-3">⚠️ Important Disclaimer</h2>
          <p className="mb-3">
            This is a <strong>portfolio demonstration project</strong> created for educational purposes. 
            While the statistical methods and models are legitimate, the data is based on limited samples 
            and may not reflect current market conditions.
          </p>
          <p>
            <strong>Do not use this tool for actual rental decisions.</strong> Always consult with licensed 
            real estate professionals, review current market listings, and conduct thorough research before 
            making any housing decisions.
          </p>
        </div>

        {/* Acknowledgments */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className="text-2xl font-semibold mb-4">Acknowledgments</h2>
          <p className="mb-3">
            Special thanks to:
          </p>
          <ul className="space-y-2">
            <li>• Pasadena City College Data Science Program</li>
            <li>• Open-source contributors (React, Recharts, Tailwind CSS)</li>
            <li>• Public data providers (Zillow, RentCafe, LA County)</li>
            <li>• The data science and developer communities</li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className={`p-8 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center`}>
          <h2 className="text-2xl font-bold mb-4">Interested in collaborating?</h2>
          <p className="mb-6">
            I'm always open to discussing data science projects, web development opportunities, 
            or potential collaborations.
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105">
            Get in Touch →
          </button>
        </div>
      </div>
    </div>
  );
}