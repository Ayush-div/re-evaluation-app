const mongoose = require('mongoose');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { Organization } = require('../schema/organization/organizationSchema.js');
const { Teacher } = require('../schema/teacher/teacher.schema.js');

// Helper: construct filter for question based on questionId type
function getQuestionFilter(questionId) {
    if (mongoose.isValidObjectId(questionId)) {
        return { 'q._id': new mongoose.Types.ObjectId(questionId) };
    }
    // Assume numeric id stored in the "id" field
    return { 'q.id': parseInt(questionId) };
}

const uploadSolution = async (req, res) => {
    try {
        console.log(req.body);
        const { paperId, questionId, partNumber, subpartNumber, metadata } = req.body;
        const videoFile = req.file;
        const parsedMetadata = JSON.parse(metadata);

        if (!mongoose.isValidObjectId(paperId)) {
            throw new Error("Invalid paperId provided");
        }
        // No strict check for questionId if it is numeric:
        const questionFilter = getQuestionFilter(questionId);

        const cloudinaryResponse = await uploadToCloudinary(videoFile);
        console.log(req.teacher)
        const solutionVideo = {
            url: cloudinaryResponse.url,
            public_id: cloudinaryResponse.public_id,
            uploadedAt: new Date(),
            uploadedBy: {
                id: req.teacher._id,
                name: req.teacher.teacherName,
                email: req.teacher.email,
                department: req.teacher.department
            },
            duration: cloudinaryResponse.duration,
            format: cloudinaryResponse.format,
            subject: parsedMetadata.subject,
            paperName: parsedMetadata.paperName,
            questionNumber: parsedMetadata.questionNumber,
            partNumber: parsedMetadata.partNumber,
            subpartNumber: parsedMetadata.subpartNumber,
            marks: parsedMetadata.marks
        };

        console.log("solution video is-> ")
        console.log(solutionVideo)

        let updateQuery = {};
        let arrayFilters = [];

        if (subpartNumber) {
            updateQuery = {
                $set: {
                    'questionPapers.$[qp].questions.$[q].subparts.$[p].subsubparts.$[sp].videoSolution': solutionVideo
                }
            };
            arrayFilters = [
                { 'qp._id': new mongoose.Types.ObjectId(paperId) },
                questionFilter,
                { 'p.id': parseInt(partNumber) },
                { 'sp.id': parseInt(subpartNumber) }
            ];
        } else if (partNumber) {
            updateQuery = {
                $set: {
                    'questionPapers.$[qp].questions.$[q].subparts.$[p].videoSolution': solutionVideo
                }
            };
            arrayFilters = [
                { 'qp._id': new mongoose.Types.ObjectId(paperId) },
                questionFilter,
                { 'p.id': parseInt(partNumber) }
            ];
        } else {
            updateQuery = {
                $set: {
                    'questionPapers.$[qp].questions.$[q].videoSolution': solutionVideo
                }
            };
            arrayFilters = [
                { 'qp._id': new mongoose.Types.ObjectId(paperId) },
                questionFilter
            ];
        }

        console.log('Update Query:', updateQuery);
        console.log('Array Filters:', arrayFilters);

        const updatedOrg = await Organization.findOneAndUpdate(
            { _id: req.organization._id },
            updateQuery,
            {
                arrayFilters,
                new: true,
                runValidators: true
            }
        );

        if (!updatedOrg) {
            throw new Error('Failed to update organization with solution video');
        }

        // Push the full solutionVideo object into teacher's videoSolutions array
        await Teacher.findByIdAndUpdate(
            req.teacher._id,
            { $push: { videoSolutions: solutionVideo } },
            { new: true }
        );

        res.json({
            success: true,
            message: 'Solution video uploaded successfully',
            data: {
                videoUrl: cloudinaryResponse.url,
                duration: cloudinaryResponse.duration,
                format: cloudinaryResponse.format
            }
        });
    } catch (error) {
        console.error('Error in uploadSolution:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to upload solution video'
        });
    }
};

module.exports = { uploadSolution };