import express, { Request, Response, NextFunction } from "express";
exports.globalErrHandler = (err:any, req: Request, res:Response, next:NextFunction) => {
    res
      .status(err.statuscode ? err.statuscode : 500)
      .json({ status: err.status, message: err.message /*stack: err.stack */ });
  };
  