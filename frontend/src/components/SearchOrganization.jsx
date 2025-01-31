import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { div } from 'framer-motion/client';

const SearchOrganization = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('all');
    const [recentSearches, setRecentSearches] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Simplified default org data
    const defaultOrgs = [{
        id: 'iiitpune',
        name: 'Indian Institue of Information Technology, Pune',
        type: 'university',
        location: 'Pune, Maharashtra'
    }];

    // Initialize organizations with default org
    useEffect(() => {
        setOrganizations(defaultOrgs);
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem('recentSearches');
        if (saved) setRecentSearches(JSON.parse(saved));
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Save to recent searches
        const updatedSearches = [searchQuery, ...recentSearches.slice(0, 4)];
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

        try {
            // If searching for IIIT Pune, show the default org
            if (searchQuery.toLowerCase().includes('iiit') ||
                searchQuery.toLowerCase().includes('pune')) {
                setOrganizations(defaultOrgs);
            } else {
                const response = await axios.get(`/api/organizations/search?q=${searchQuery}&filter=${filter}`);
                setOrganizations([...defaultOrgs, ...response.data]);
            }
        } catch (error) {
            setError('Failed to fetch organizations. Please try again.');
            console.error('Error searching organizations:', error);
        }
        setLoading(false);
    };

    const handleSelectOrganization = (orgId) => {
        // Check if user already has an account
        const hasAccount = false; // This should be determined by your authentication logic

        if (orgId === 'iiitpune') {
            if (hasAccount) {
                navigate('/login');
            } else {
                navigate('/register', {
                    state: {
                        organization: 'Indian Institute of Information Technology, Pune',
                        orgId: 'iiitpune'
                    }
                });
            }
        }
    };

    const handleBackToHome = () => {
        // Navigate back to home
        navigate('/');
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-white font-['Urbanist']"
        >
            {/* Header Section - make it more compact */}
            <div className="bg-[#F7F8F9] py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold text-black text-center">
                        Find Your Organization
                    </h1>
                </div>
            </div>

            {/* Search Section - adjust spacing */}
            <div className="container mx-auto px-4 py-4 max-w-5xl">
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 -mt-8">
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Enter organization name..."
                                className="flex-1 h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
                          transition-all duration-300 
                          hover:shadow-md hover:border-gray-400 
                          focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
                          placeholder:text-gray-400"
                            />
                            <button
                                onClick={handleBackToHome}
                                type="button" // Important: type="button" prevents form submission
                                className="h-[50px] px-8 bg-gray-500 text-white rounded-[8px] text-[14px]
                                         transition-all duration-300"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="h-[50px] px-8 bg-black text-white rounded-[8px] text-[14px]
                         transition-all duration-300 
                         hover:bg-gray-800 hover:shadow-lg hover:scale-[1.02]    
                         active:scale-95 active:bg-gray-900
                         focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                            >
                                Search
                            </button>
                        </div>

                        {/* Filter Pills */}
                        <div className="flex flex-wrap gap-3 justify-center">
                            {['all', 'university', 'school', 'institute'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFilter(type)}
                                    className={`px-5 py-2 rounded-[8px] text-[14px] transition-all duration-300
                    ${filter === type
                                            ? 'bg-black text-white shadow-md'
                                            : 'bg-[#F7F8F9] text-[#1E232C] hover:bg-gray-200 border border-[#DADADA]'}`}
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>
                    </form>
                </div>

                {/* Results Section - updated card styling */}
                <div className="mt-4 flex justify-center">
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="loader">
                                <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin" />
                            </div>
                        </div>
                    ) : (
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-[90vh]">
                                {organizations.map((org) => (
                                    <div
                                        key={org.id}
                                        onClick={() => handleSelectOrganization(org.id)}
                                        className={`bg-white p-3 rounded-lg border cursor-pointer
                                    hover:border-black transition-all duration-200 
                                    ${org.id === 'iiitpune' ? 'border-black' : 'border-[#DADADA]'}`}
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="text-sm font-semibold text-[#1E232C] truncate pr-2">
                                                {org.name}
                                            </h3>
                                        </div>
                                        <p className="text-[#6A707C] text-xs">{org.location}</p>
                                        <span className="text-xs text-[#6A707C] bg-[#F7F8F9] px-2 py-0.5 rounded inline-block mt-1">
                                            {org.type}
                                        </span>
                                    </div>
                                ))}
                            </div>
                    )}

                    {/* No results message - make it more compact */}
                    {organizations.length === 0 && searchQuery && !loading && (
                        <div className="text-center py-6">
                            <p className="text-[#6A707C] text-sm">No organizations found</p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="mt-2 text-black hover:underline text-sm"
                            >
                                Clear search
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default SearchOrganization;
