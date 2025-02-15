const { addReevaluationDetailsRepo} = require('../repositories/addReevaluationDetailsStudentRepository')

async function applyForReevaluationService(reevaluationDetails) {
  console.log("question paper details is : ", reevaluationDetails);
  obj = {
    subjectId: reevaluationDetails.subject.id,
    remarks: reevaluationDetails.remarks,
    issueTypes: reevaluationDetails.issueTypes,
  }
  console.log("Subject id is given by ayush : ",obj.subjectId)
  console.log("remarks is given by ayush : ",obj.remarks)
  console.log("issueTypes id is given by ayush : ",obj.issueTypes)
  // return {message: "Repo layers responds correctly"}
  try{
    const response = addReevaluationDetailsRepo(obj)
    if(response){
      console.log("repo layer responds correctly");
      return {message: "Repo layers responds correctly"}
    }
  } catch(error){
    console.log("Error : ",error);
  }

}

module.exports = {
  applyForReevaluationService,
};
