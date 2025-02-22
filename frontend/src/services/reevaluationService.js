import axios from 'axios';

// Using a relative URL will send the request to your backend when a proxy is configured.
// Otherwise, replace with the full backend URL, for example:
// const BASE_URL = 'http://localhost:5000';
const BASE_URL = 'http://localhost:5000';

export const submitReevaluationApplication = async (selectedPaper, selectedQuestions, paymentId) => {
  const payload = {
    paper: selectedPaper, // must include _id and subjectName at minimum
    selectedQuestions,    // e.g. ['q1', 'q2']
    paymentId             // e.g. 'rzp_payment_id_12345'
  };

  // Axios sends the POST request to your backend endpoint
  const response = await axios.post(`${BASE_URL}/api/students/apply-reevaluation`, payload, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
  });
  return response.data;
};
