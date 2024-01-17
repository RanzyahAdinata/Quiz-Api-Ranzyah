const db = require("../models");
const Quiz = db.quizzes;

//membuat data 
exports.create = async (req,res) => {

    try{
        const data = await Quiz.create(req.body)
        res.json({
            message: "quiz created successfully.",
            data: data,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
};

//Membaca data READ
exports.getAll = async(req, res) => {
    try {
        const quizzes = await Quiz.findAll()
        res.json({
            message: "Quizzes telah berhasil menerima data.",
            data: quizzes,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
};

//Mengubah data
exports.update = async(req, res) => {
    const id = req.params.id
    try {
        const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true})
        quiz.update(req.body,{
            where: {id}
        })
        res.json({
            message: "Quizzes berhasil memperbarui data",
            data: quiz,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occured while retrieving quiz",
            data: null,
        });
    }
};

//Menghapus data sesuai id
exports.delete = async(req, res) => {
    const id = req.params.id
    try {
        const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true})
        
        quiz.destroy()

        res.json({
            message: "Quizzes berhasil menghapus data."
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occured while retrieving quiz",
            data: null,
        });
    }
};

//Menampilkan data sesuai id
exports.findOne = async(req, res) => {
    const id = req.params.id
    try {
        const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true})
        res.json({
            message: `Quizzes berhasil menerima data dengan id=${id}`,
            data: quiz,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occured while retrieving quiz",
            data: null,
        });
    }
};

//Menampilkan data berdasar kategori terntenti
exports.getByCategoryId = async (req, res) => {
    const id = req.params.id;
    const quizzes = await Quiz.findAll({
      where: {
        categoryId: id,
      },
    });
    res.json({
      message: `Quizzes berhasil menerima data dengan categoryId=${id}`,
      data: quizzes,
    });
  };

//Menampilkan data berdasar level

exports.getByLevelId = async (req, res) => {
    const id = req.params.id;
    const quizzes = await Quiz.findAll({
      where: {
        levelId: id,
      },
    });
    res.json({
      message: `Quizzes berhasil menerima data dengan levelId=${id}.`,
      data: quizzes,
    });
  };

