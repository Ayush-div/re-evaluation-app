import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterOrganization = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        orgName: '',
        orgLocation: '',
        numStudents: '',
        organisationEmail: '',
        orgWebsite: '',
        departments: [{ name: '' }],
        numDepartments: '',
        bankDetails: {
            accountNumber: '',
            ifscCode: '',
            accountHolderName: '',
            bankName: ''
        },
        contactPerson: {
            name: '',
            phone: '',
            designation: ''
        },
        verificationDetails: null,
    });

    const [departments, setDepartments] = useState([{ name: '' }]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleDepartmentChange = (index, value) => {
        const newDepartments = [...departments];
        newDepartments[index].name = value;
        setDepartments(newDepartments);

        setFormData(prev => ({
            ...prev,
            departments: newDepartments
        }));
    };

    const addDepartmentField = () => {
        setDepartments([...departments, { name: '' }]);
    };

    const removeDepartmentField = (index) => {
        const newDepartments = departments.filter((_, i) => i !== index);
        setDepartments(newDepartments);
        setFormData(prev => ({
            ...prev,
            departments: newDepartments
        }));
    };

    const handleBankDetailsChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            bankDetails: {
                ...prev.bankDetails,
                [name]: value
            }
        }));
    };

    const handleContactPersonChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            contactPerson: {
                ...prev.contactPerson,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'departments') {
                formDataToSend.append(key, JSON.stringify(departments));
            } else {
                formDataToSend.append(key, formData[key]);
            }
        });

        try {
            console.log("hello from registerorganization.jsx")
            const response = await axios.post('/api/organization/register', {
                orgName: formData.orgName,
                orgLocation: formData.orgLocation,
                departments: formData.departments,
                noOfStudents: formData.noOfStudents,
                organisationEmail: formData.organisationEmail,
                organizaitonWebsite: formData.organizaitonWebsite,
                bankDetails: formData.bankDetails,
                numDepartments: formData.numDepartments,
                contactPerson: formData.contactPerson,
                verificationDetails: formData.verificationDetails,
            });
            console.log(response.data)

            if (response.data.Success) {
                navigate('/organization/organization-registered-success')
            } else if (response.data.message === 'Organization already exists') {
                setErrorMessage('Organization already exists');
                setTimeout(() => { setErrorMessage(''); }, 2000);
            } else {
                setErrorMessage(response.data.message);
                setTimeout(() => { setErrorMessage(''); }, 2000);
            }
        } catch (error) {
            console.error('Error registering organization:', error);
            setErrorMessage('Error registering organization');
            setTimeout(() => {
                setErrorMessage('');
            }, 2000);
        }
    };

    const renderDepartmentInputs = () => (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#1E232C] pb-2 border-b">Departments</h3>
            <div className="flex justify-between items-center">
                <label className="block text-[#1E232C] font-medium text-sm">Departments/Subjects</label>
                <button
                    type="button"
                    onClick={addDepartmentField}
                    className="text-sm text-blue-600 hover:text-blue-800"
                >
                    + Add Department
                </button>
            </div>
            {departments.map((dept, index) => (
                <div key={index} className="flex gap-2">
                    <input
                        type="text"
                        value={dept.name}
                        onChange={(e) => handleDepartmentChange(index, e.target.value)}
                        className="flex-1 h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                            transition-all duration-300 hover:shadow-md hover:border-gray-400 
                            focus:outline-none focus:border-[#000000] focus:shadow-lg"
                        placeholder="Enter department name"
                    />
                    {departments.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeDepartmentField(index)}
                            className="px-3 text-red-500 hover:text-red-700"
                        >
                            ✕
                        </button>
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist']">
            <nav className="bg-white shadow-md w-full sticky top-0 z-10">
                <div className="max-w-[1440px] mx-auto px-6">
                    <div className="flex justify-between items-center h-16">
                        <div className="text-xl font-bold text-[#1E232C]">Register Organization</div>
                        <button
                            onClick={() => navigate(-1)}
                            className="text-[#6A707C] hover:text-[#000000] hover:scale-[1.1] duration-300"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-[1440px] mx-auto px-6 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-t-[12px] border border-b-0 border-[#DADADA] p-6">
                        <h2 className="text-xl font-bold text-[#1E232C]">Organization Information</h2>
                        <p className="text-[#6A707C] text-sm mt-1">Register your organization to the system</p>
                    </div>

                    <div className="bg-white rounded-b-[12px] border border-[#DADADA] p-6">
                        {errorMessage && (
                            <div
                                id="error-message"
                                className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg"
                                style={{ animation: 'fadeOut 2s forwards' }}
                            >
                                {errorMessage}
                            </div>
                        )}
                        <form className="space-y-8" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-[#1E232C] pb-2 border-b">Basic Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[#1E232C] font-medium text-sm mb-2">Organization Name</label>
                                        <input
                                            type="text"
                                            name="orgName"
                                            value={formData.orgName}
                                            onChange={handleChange}
                                            className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                               transition-all duration-300 hover:shadow-md hover:border-gray-400 
                               focus:outline-none focus:border-[#000000] focus:shadow-lg"
                                            placeholder="Enter organization name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[#1E232C] font-medium text-sm mb-2">Location</label>
                                        <input
                                            type="text"
                                            name="orgLocation"
                                            value={formData.orgLocation}
                                            onChange={handleChange}
                                            className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                               transition-all duration-300 hover:shadow-md hover:border-gray-400 
                               focus:outline-none focus:border-[#000000] focus:shadow-lg"
                                            placeholder="Enter location"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[#1E232C] font-medium text-sm mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="organisationEmail"
                                            value={formData.organisationEmail}
                                            onChange={handleChange}
                                            className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                               transition-all duration-300 hover:shadow-md hover:border-gray-400 
                               focus:outline-none focus:border-[#000000] focus:shadow-lg"
                                            placeholder="Enter email"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {renderDepartmentInputs()}

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-[#1E232C] pb-2 border-b">Bank Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[#1E232C] font-medium text-sm mb-2">Account Number</label>
                                        <input
                                            type="text"
                                            name="accountNumber"
                                            value={formData.bankDetails.accountNumber}
                                            onChange={handleBankDetailsChange}
                                            className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                               transition-all duration-300 hover:shadow-md hover:border-gray-400 
                               focus:outline-none focus:border-[#000000] focus:shadow-lg"
                                            placeholder="Enter account number"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[#1E232C] font-medium text-sm mb-2">IFSC Code</label>
                                        <input
                                            type="text"
                                            name="ifscCode"
                                            value={formData.bankDetails.ifscCode}
                                            onChange={handleBankDetailsChange}
                                            className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                               transition-all duration-300 hover:shadow-md hover:border-gray-400 
                               focus:outline-none focus:border-[#000000] focus:shadow-lg"
                                            placeholder="Enter IFSC code"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[#1E232C] font-medium text-sm mb-2">Account Holder Name</label>
                                        <input
                                            type="text"
                                            name="accountHolderName"
                                            value={formData.bankDetails.accountHolderName}
                                            onChange={handleBankDetailsChange}
                                            className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                               transition-all duration-300 hover:shadow-md hover:border-gray-400 
                               focus:outline-none focus:border-[#000000] focus:shadow-lg"
                                            placeholder="Enter account holder name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[#1E232C] font-medium text-sm mb-2">Bank Name</label>
                                        <input
                                            type="text"
                                            name="bankName"
                                            value={formData.bankDetails.bankName}
                                            onChange={handleBankDetailsChange}
                                            className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                               transition-all duration-300 hover:shadow-md hover:border-gray-400 
                               focus:outline-none focus:border-[#000000] focus:shadow-lg"
                                            placeholder="Enter bank name"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-[#1E232C] pb-2 border-b">Contact Person Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[#1E232C] font-medium text-sm mb-2">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.contactPerson.name}
                                            onChange={handleContactPersonChange}
                                            className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                               transition-all duration-300 hover:shadow-md hover:border-gray-400 
                               focus:outline-none focus:border-[#000000] focus:shadow-lg"
                                            placeholder="Enter contact person name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[#1E232C] font-medium text-sm mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.contactPerson.phone}
                                            onChange={handleContactPersonChange}
                                            className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                               transition-all duration-300 hover:shadow-md hover:border-gray-400 
                               focus:outline-none focus:border-[#000000] focus:shadow-lg"
                                            placeholder="Enter phone number"
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-[#1E232C] font-medium text-sm mb-2">Designation</label>
                                        <input
                                            type="text"
                                            name="designation"
                                            value={formData.contactPerson.designation}
                                            onChange={handleContactPersonChange}
                                            className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                               transition-all duration-300 hover:shadow-md hover:border-gray-400 
                               focus:outline-none focus:border-[#000000] focus:shadow-lg"
                                            placeholder="Enter designation"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-[#1E232C] pb-2 border-b">Verification Documents</h3>
                                <div>
                                    <label className="block text-[#1E232C] font-medium text-sm mb-2">Verification Documents (optional)</label>
                                    <input
                                        type="file"
                                        name="verificationDocs"
                                        onChange={handleChange}
                                        className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 
                             transition-all duration-300 
                             hover:shadow-md hover:border-gray-400 
                             focus:outline-none focus:border-[#000000] focus:shadow-lg"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 pt-4 border-t border-[#DADADA]">
                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="px-6 py-3 border border-[#DADADA] rounded-[8px] text-[#1E232C]
                           transition-all duration-300 hover:border-black hover:shadow-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-black text-white rounded-[8px] 
                            transition-all duration-300 hover:bg-gray-800 hover:scale-[1.02]
                            active:scale-[0.98]"
                                >
                                    Register Organization
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterOrganization;
