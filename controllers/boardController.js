const mongoose = require("mongoose");
const Board = require("../models/Board");

const catchAsync = require("../utilities/catchAsync");

const User = mongoose.model("users");

exports.getAllBoards = catchAsync(async (req, res, next) => {
  const boards = await Board.find();

  res.status(200).json({
    status: "success",
    data: {
      data: boards
    }
  });
});

exports.getBoard = catchAsync(async (req, res, next) => {
  let query = Board.findById(req.params.id);

  const board = await query;

  res.status(200).json({
    status: "success",
    data: {
      data: board
    }
  });
});

exports.createBoard = catchAsync(async (req, res, next) => {
  const { title, background } = req.body;
  const newBoard = await Board.create({
    title,
    background,
    users: [req.user.id]
  });

  const boards = [newBoard.id, ...req.user.boards];

  await User.findByIdAndUpdate(req.user.id, { boards });

  res.status(201).json({
    status: "success",
    data: { data: newBoard }
  });
});

exports.updateBoard = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const board = await Board.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });

  res.status(200).json({
    status: "success",
    data: {
      data: board
    }
  });
});

exports.deleteBoard = catchAsync(async (req, res, next) => {});
