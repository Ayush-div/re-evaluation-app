const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');
const QuestionPaper = require('../schema/organization/addQuestionPaperSchema');

const uploadSolution = async (req, res) => {
    try {
        const { paperId, questionId, partNumber, subpartNumber, metadata } = req.body;
        const videoFile = req.file;
        const parsedMetadata = JSON.parse(metadata);

        const cloudinaryResponse = await uploadToCloudinary(videoFile);

        const solutionVideo = {
            url: cloudinaryResponse.url,
            public_id: cloudinaryResponse.public_id,
            uploadedAt: new Date(),
            uploadedBy: parsedMetadata.uploadedBy,
            duration: cloudinaryResponse.duration,
            format: cloudinaryResponse.format
        };

        let updateQuery = {};
        let arrayFilters = [];

        if (subpartNumber) {
            updateQuery = {
                $set: {
                    'questions.$[q].subparts.$[p].subsubparts.$[sp].videoSolution': solutionVideo
                }
            };
            arrayFilters = [
                { 'q.id': parseInt(questionId) },
                { 'p.id': parseInt(partNumber) },
                { 'sp.id': parseInt(subpartNumber) }
            ];
        } else if (partNumber) {
            updateQuery = {
                $set: {
                    'questions.$[q].subparts.$[p].videoSolution': solutionVideo
                }
            };
            arrayFilters = [
                { 'q.id': parseInt(questionId) },
                { 'p.id': parseInt(partNumber) }
            ];
        } else {
            updateQuery = {
                $set: {
                    'questions.$[q].videoSolution': solutionVideo
                }   
            };
            arrayFilters = [
                { 'q.id': parseInt(questionId) }
            ];
        }

        console.log('Update Query:', updateQuery);
        console.log('Array Filters:', arrayFilters);

        const updatedPaper = await QuestionPaper.findByIdAndUpdate(
            paperId,
            updateQuery,
            {
                arrayFilters,
                new: true,
                runValidators: true
            }
        );

        if (!updatedPaper) {
            throw new Error('Failed to update question paper');
        }

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