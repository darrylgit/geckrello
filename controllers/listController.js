const mongoose = require("mongoose");
const List = require("../models/List");

const catchAsync = require("../utilities/catchAsync");

exports.getAllLists = catchAsync(async (req, res, next) => {
  const lists = await List.find();

  res.status(200).json({
    status: "success",
    data: lists
  });
});

exports.getList = catchAsync(async (req, res, next) => {});

exports.createList = catchAsync(async (req, res, next) => {
  const { boardHome, title } = req.body;

  const newList = await List.create({ boardHome, title });

  res.status(200).json({
    status: "success",
    data: newList
  });
});

exports.updateList = catchAsync(async (req, res, next) => {});

exports.deleteList = catchAsync(async (req, res, next) => {});
