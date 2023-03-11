import express, {Request, Response} from 'express';
import asyncHandler from 'express-async-handler';
import { apiError } from '../utils/apiError';


export const createOne = (Model:any) =>
  asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ data: newDoc });
  });

export const updateOne = (Model:any, name = "document") =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndUpdate(id, req.body, { new: true });

    if (!document) {
      return next(new apiError(`No ${name} for this id ${id}`, 404));
    }

    document.save();
    res.status(200).json({ data: document });
  });

  export const deleteOne = (Model:any, name = "document") =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
      return next(new apiError(`No ${name} for this id ${req.params.id}`, 404));
    }

    res.status(204).json({message:"comment deleted"});
  });


export const getOne = (Model:any, name = "document") =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findById(req.params.id);
    if (!document) {
      return next(new apiError(`No ${name} for this id ${req.params.id}`, 404));
    }
    res.status(200).json({ data: document });
  });

export const getAll = (Model:any) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.find();

    res.status(200).json({ size: document.length, data: document });
  });
