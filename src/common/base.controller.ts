import { Response, Request, NextFunction } from 'express';
import { NOT_FOUND } from '../constants/error';
import { customError, SuccessResponse } from '../utils';

export interface SerializerRequest extends Request {
  file?: any;
  populate?: string[];
  select?: string[];
  transform?: any;
  payloadTransform?: any;
  queryTransform?: any;
  user?: any;
}
export abstract class BaseController {
  protected processor: any;
  constructor() {
    this.processor = this.getProcessor();
  }

  protected abstract getProcessor(): any;

  create = async (
    req: SerializerRequest,
    res: Response,
    next: NextFunction
  ) => {
    let { body: payload } = req;
    try {
      const {
        payloadTransform = null,
        populate = null,
        select = null,
        transform = null,
      } = req;
      if (payloadTransform) {
        payload = payloadTransform(payload, req.user);
      }
      let record = await this.processor.create(payload);
      if (populate || select || transform) {
        record = await this.processor.find(
          { _id: record._id },
          populate,
          select
        );
        if (transform) {
          record = transform(record);
        }
      }
      SuccessResponse(res, record);
    } catch (error) {
      next(error);
    }
  };

  find = async (req: SerializerRequest, res: Response, next: NextFunction) => {
    let { query = {} } = req;
    const {
      populate = null,
      select = null,
      transform = null,
      queryTransform = null,
    } = req;
    try {
      if (queryTransform) {
        query = queryTransform(query, req.user);
      }
      let record = await this.processor.find(query, populate, select);
      if (transform) {
        record = transform(record);
      }
      SuccessResponse(res, record);
    } catch (error) {
      next(error);
    }
  };

  findOne = async (
    req: SerializerRequest,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    try {
      const { populate = null, select = null, transform = null } = req;
      let record = await this.processor.findOne({ _id: id }, populate, select);
      if (transform) {
        record = transform(record);
      }
      SuccessResponse(res, record);
    } catch (error) {
      next(error);
    }
  };

  update = async (
    req: SerializerRequest,
    res: Response,
    next: NextFunction
  ) => {
    const { query } = req.body;
    let { payload } = req.body;
    try {
      const { payloadTransform = null } = req;
      if (payloadTransform) {
        payload = payloadTransform(payload, req.user);
      }
      await this.processor.update(query, payload);
      SuccessResponse(res);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const response = await this.processor.delete({ _id: id });
      if (!response.deletedCount) throw customError(NOT_FOUND);
      SuccessResponse(res, null, 204);
    } catch (error) {
      next(error);
    }
  };
}
