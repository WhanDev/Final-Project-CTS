const Student = require("../Models/Model_Student");
const Subject =require("../Models/Model_Subject");
const Structure = require("../Models/Model_Structure");
const {
  Transfer,
  TransferOrder,
  TransferList,
} = require("../Models/Model_Transfer");

const bcrypt = require("bcryptjs");

//เพิ่มข้อมูลนักศึกษา
exports.create = async (req, res) => {
  try {
    const { _id, fullname, password, curriculum, year, institution, branch } =
      req.body;

    if (
      !_id ||
      !fullname ||
      !password ||
      !curriculum ||
      !year ||
      !institution ||
      !branch
    ) {
      return res.status(400).send("กรุณากรอกข้อมูลให้ครบ!");
    }

    const createStudent = await Student.findOne({ _id });
    if (createStudent) {
      return res.status(400).send("รหัสนักศึกษาซ้ำ!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newStudent = new Student({
      _id,
      fullname,
      password: hashedPassword,
      curriculum,
      year,
      institution,
      branch,
    });
    await newStudent.save();

    res
      .status(201)
      .json({ message: "เพิ่มข้อมูลนักศึกษาสำเร็จ!", data: newStudent });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ!", error: err.message });
  }
};

//ดูข้อมูลนักศึกษาทั้งหมด
exports.list = async (req, res) => {
  try {
    const listStudent = await Student.find({})
      .select("-password")
      .sort({
        _id: 1,
      })
      .exec();
    res.json(listStudent);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

exports.listYear = async (req, res) => {
  try {
    const uniqueStudentYears = await Student.distinct("year");
    res.json(uniqueStudentYears);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

exports.listCurriculumAndYear = async (req, res) => {
  try {
    const curriculum = req.params.curriculum;
    const year = req.params.year;

    const listStudent = await Student.find({
      curriculum: curriculum,
      year: year,
    })
      .select("-password")
      .sort({
        _id: 1,
      })
      .exec();

    res.json(listStudent);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

//ดูข้อมูลนักศึกษาตาม _id
exports.read = async (req, res) => {
  try {
    const id = req.params._id;
    const readStudent = await Student.findOne({ _id: id }).exec();
    res.json(readStudent);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

//แก้ไขข้อมูลนักศึกษา
exports.update = async (req, res) => {
  try {
    const _id = req.params._id;
    var newData = req.body;

    const hash = await bcrypt.hash(newData.password, 10);
    newData.password = hash;

    const updatedStudent = await Student.findOneAndUpdate(
      { _id: _id },
      newData,
      {
        new: true,
      }
    ).exec();
    res.json({ message: "แก้ไขข้อมูลสำเร็จ!", data: updatedStudent });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

//แก้ไขข้อมูลนักศึกษา
exports.updatedStudent = async (req, res) => {
  try {
    const _id = req.body._id;
    var newData = req.body;

    const updatedStudent = await Student.findOneAndUpdate(
      { _id: _id },
      newData,
      {
        new: true,
      }
    ).exec();
    res.json({ message: "แก้ไขข้อมูลสำเร็จ!", data: updatedStudent });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

//ลบข้อมูลนักศึกษา
exports.remove = async (req, res) => {
  try {
    // code
    const id = req.params._id;
    const removedStudent = await Student.findOneAndDelete({
      _id: id,
    }).exec();
    res.json({ message: "ลบข้อมูลสำเร็จ!", data: removedStudent });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

const exceljs = require("exceljs");

exports.downloadTemplate = async (req, res) => {
  try {
    const workbook = new exceljs.Workbook();
    const sheet = workbook.addWorksheet("Sheet 1");

    sheet.addRow(["_id", "password", "fullname", "institution", "branch"]);
    sheet.addRow([
      "รหัสนักศึกษา",
      "รหัสผ่าน",
      "ชื่อนามกุล",
      "สถาบันเดิม",
      "สาขาวิชา",
    ]);

    const buffer = await workbook.xlsx.writeBuffer();
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=template.xlsx");
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

exports.uploadExcel = async (req, res) => {
  try {
    const { curriculum, year, studentsData } = req.body;

    if (!Array.isArray(studentsData) || studentsData.length === 0) {
      return res.status(400).json({ message: "ไม่พบข้อมูลนักศึกษา" });
    }

    const bulkOperations = await Promise.all(
      studentsData.map(async (data) => {
        const existingStudent = await Student.findOne({ _id: data[0] });

        if (existingStudent) {
          return null;
        }

        const hashedPassword = await bcrypt.hash(String(data[1]), 10);

        return {
          updateOne: {
            filter: { _id: data[0] },
            update: {
              $set: {
                _id: data[0],
                password: hashedPassword,
                fullname: data[2],
                curriculum: curriculum,
                year: year,
                institution: data[3],
                branch: data[4],
              },
            },
            upsert: true,
          },
        };
      })
    );

    const validOperations = bulkOperations.filter((op) => op !== null);

    if (validOperations.length > 0) {
      const result = await Student.bulkWrite(validOperations);
      res
        .status(201)
        .json({ message: "เพิ่มข้อมูลนักศึกษาสำเร็จ!", data: result });
    } else {
      res.status(400).json({ message: "รหัสนักศึกษาซ้ำ!" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ!", error: err.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const id = req.params._id;
    const { oldPassword, newPassword, confirmPassword } = req.body;
    var studentUser = await Student.findOne({ _id: id });
    if (studentUser) {
      const isMatch = await bcrypt.compare(oldPassword, studentUser.password);
      if (isMatch) {
        if (newPassword === confirmPassword) {
          const hashNewPass = await bcrypt.hash(newPassword, 10);
          const updatedStudent = await Student.findOneAndUpdate(
            { _id: id },
            { password: hashNewPass },
            { new: true }
          ).exec();
          return res
            .status(200)
            .json({ message: "เปลี่ยนรหัสผ่านสำเร็จ", data: hashNewPass });
        } else {
          return res
            .status(400)
            .json({ message: "รหัสผ่านใหม่ไม่ตรงกัน โปรดตรวจสอบ" });
        }
      } else {
        return res.status(400).json({ message: "รหัสผ่านเดิมไม่ถูกต้อง" });
      }
    } else {
      return res.status(400).json({ message: "ไม่พบข้อมูลนักศึกษา" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};

exports.dataDashboard = async (req, res) => {
  try {
    const id = req.params._id;

    const readStudent = await Student.findOne({ _id: id }).exec();
    const curriculum_id = readStudent.curriculum;

    const readTransfer = await TransferOrder.findOne({ student_id: id }).exec();
    if (!readTransfer) {
      return res.status(400).json({ message: "ไอ้ หน้า หี" });
    } else {
      var readTransferlist = await TransferList.findOne({
        transferOrder_id: readTransfer._id,
      })
        .select("success subject_id")
        .exec();

      const subjectIds = readTransferlist.success.map(
        (entry) => entry.subject_id
      );
      console.log(subjectIds);

      let credit = 0

      for(const subjectId of subjectIds) {
        const readSubject = await Subject.findOne({ subject_id: subjectId }).exec();
        credit += readSubject.total_credits
      }

      const listStructure = await Structure.find({
        curriculum: curriculum_id,
      }).exec();

      const totalCredits = listStructure.reduce(
        (sum, structure) => sum + structure.credit,
        0
      );

      let LearnMore = totalCredits - credit
      return res
        .status(200)
        .json({ message: "อืมๆๆ", readTransferlist, totalCredits,credit, LearnMore });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในระบบ", error: err.message });
  }
};
