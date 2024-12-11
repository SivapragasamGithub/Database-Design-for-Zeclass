//Find all topics and tasks taught in October:

db.topics.find({ date: { $gte: "2020-10-01", $lte: "2020-10-31" } });
db.tasks.find({ assigned_date: { $gte: "2020-10-01", $lte: "2020-10-31" } });

//Find all company drives between 15-Oct-2020 and 31-Oct-2020:

db.company_drives.find({ date: { $gte: "2020-10-15", $lte: "2020-10-31" } });

//Find all students who appeared for placement:
db.company_drives.aggregate([
  { $unwind: "$eligible_students" },
  {
    $lookup: {
      from: "users",
      localField: "eligible_students",
      foreignField: "_id",
      as: "students_info"
    }
  }
]);

//Find the number of problems solved by a user in CodeKata:
db.codekata.find({ user_id: "user_id" }, { problems_solved: 1 });

//Find mentors with more than 15 mentees:
db.mentors.find({ "mentees.15": { $exists: true } });

//Find users absent and who did not submit tasks between 15-Oct-2020 and 31-Oct-2020:
db.attendance.aggregate([
  { $match: { date: { $gte: "2020-10-15", $lte: "2020-10-31" }, status: "absent" } },
  {
    $lookup: {
      from: "tasks",
      localField: "user_id",
      foreignField: "submitted_by",
      as: "task_info"
    }
  },
  { $match: { "task_info": { $size: 0 } } }
]);

