const { Student } = require('../schema/student/studentSchema');

const storeStudentDoubts = async (studentId, doubtsData) => {
    try {
        console.log('Storing doubts for student:', studentId);
        console.log('Doubts data:', doubtsData);

        const formattedDoubts = doubtsData.map(doubt => ({
            questionId: doubt.questionId,
            paperId: doubt.paperId,
            subjectName: doubt.subjectName,
            doubtType: doubt.issueType,
            description: doubt.customIssueDescription || '',
            remarks: doubt.remarks || '',
            status: 'pending',
            createdAt: new Date()
        }));

        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            { 
                $push: { 
                    doubts: { 
                        $each: formattedDoubts 
                    } 
                } 
            },
            { new: true }
        );

        console.log('Updated student doubts:', updatedStudent.doubts);
        return updatedStudent.doubts;
    } catch (error) {
        console.error('Error storing student doubts:', error);
        throw error;
    }
};

module.exports = { storeStudentDoubts };
