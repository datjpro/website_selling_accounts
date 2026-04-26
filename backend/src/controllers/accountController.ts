import { Request, Response } from 'express';
import { AccountModel } from '../models/accountModel';
import { CreateAccountDTO, UpdateAccountDTO } from '../types/account';
import { ApiError } from '../utils/api-error';
import { ApiResponse } from '../utils/api-response';
import { asyncHandler } from '../utils/async-handler';

export class AccountController {
  static getAll = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    const accounts = await AccountModel.findAll();
    res.json(new ApiResponse('Accounts loaded', accounts));
  });

  static getById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const account = await AccountModel.findById(req.params.id);
    if (!account) throw ApiError.notFound('Account not found');
    res.json(new ApiResponse('Account loaded', account));
  });

  static create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const data: CreateAccountDTO = req.body;
    if (!data.title || !data.description || !data.price) throw ApiError.badRequest('Missing required fields');
    const account = await AccountModel.create(data);
    res.status(201).json(new ApiResponse('Account created', account));
  });

  static update = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const data: UpdateAccountDTO = req.body;
    const account = await AccountModel.update(req.params.id, data);
    if (!account) throw ApiError.notFound('Account not found');
    res.json(new ApiResponse('Account updated', account));
  });

  static delete = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const deleted = await AccountModel.delete(req.params.id);
    if (!deleted) throw ApiError.notFound('Account not found');
    res.status(204).send();
  });
}
