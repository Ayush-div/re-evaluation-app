import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { div } from 'framer-motion/client';

const SearchOrganization = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [organizations, setOrganizations] = useState([{ id: '', name: '', location: '' }]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('all');
    const [recentSearches, setRecentSearches] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const role = location.state?.role;
    console.log('Current role:', role);

    const [defaultOrgs, setDefaultOrgs] = useState([{ id: '', name: '', location: '' }]);

    useEffect(() => {
        const fetchDefaultOrgs = async () => {
            try {
                const response = await axios.get('/api/search-organization');
                const orgs = response.data.data.map(org => ({
                    id: org._id,
                    name: org.orgName,
                    location: org.orgLocation
                }));
                setDefaultOrgs(orgs);
            } catch (error) {
                console.error('Error fetching default organizations:', error);
            }
        };
        fetchDefaultOrgs();
    }, []);

    useEffect(() => {
        setOrganizations(defaultOrgs);
    }, [defaultOrgs]);

    useEffect(() => {
        const saved = localStorage.getItem('recentSearches');
        if (saved) setRecentSearches(JSON.parse(saved));
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const updatedSearches = [searchQuery, ...recentSearches.slice(0, 4)];
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

        try {
            if (searchQuery.trim() === '') {
                setOrganizations(defaultOrgs);
            } else {
                const filteredOrgs = defaultOrgs.filter(org =>
                    org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    org.location.toLowerCase().includes(searchQuery.toLowerCase())
                );

                if (filter !== 'all') {
                    const response = await axios.get(`/api/organizations/search?q=${searchQuery}&filter=${filter}`);
                    const combinedResults = [...filteredOrgs, ...response.data];
                    const uniqueResults = Array.from(new Map(combinedResults.map(org => [org.id, org])).values());
                    setOrganizations(uniqueResults);
                } else {
                    setOrganizations(filteredOrgs);
                }
            }
        } catch (error) {
            setError('Failed to fetch organizations. Please try again.');
            console.error('Error searching organizations:', error);
            setOrganizations(defaultOrgs);
        }
        setLoading(false);
    };

    const handleSelectOrganization = (orgId) => {
        const selectedOrg = organizations.find(org => org.id === orgId);
        if (selectedOrg) {
            const orgData = {
                id: selectedOrg.id,
                name: selectedOrg.name
            };

            localStorage.setItem('selectedOrg', JSON.stringify(orgData));
            // console.log(orgData)
            switch (role) {
                case 'teacher':
                    navigate('/teacher/register', { state: { organization: orgData } });
                    break;
                case 'student':
                    navigate('/student/register', { state: { organization: orgData } });
                    break;
                // case 'organization':
                //     navigate('/organization/register', { state: { organization: orgData } });
                //     break;
                default:
                    console.log('No role specified');
            }
        }
    };

    const handleBackToHome = () => {
        navigate(-1);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-white font-['Urbanist']"
        >
            <div className="bg-[#F7F8F9] py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold text-black text-center">
                        Find Your Organization
                    </h1>
                </div>
            </div>

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
                                type="button"
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

                        {/* <div className="flex flex-wrap gap-3 justify-center">
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
                        </div> */}
                    </form>
                </div>

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
                                    className={`bg-white p-3  rounded-lg border cursor-pointer
                                    hover:border-black transition-all duration-200 border-[#DADADA]
                                   `}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="text-sm font-semibold text-[#1E232C] truncate pr-2">
                                            {org.name}
                                        </h3>
                                    </div>
                                    <p className="text-[#6A707C] text-xs">{org.location}</p>
                                    {/* <span className="text-xs text-[#6A707C] bg-[#F7F8F9] px-2 py-0.5 rounded inline-block mt-1">
                                        {org.type}
                                    </span> */}
                                </div>
                            ))}
                        </div>
                    )}

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
