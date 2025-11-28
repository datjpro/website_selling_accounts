import { Request, Response } from 'express';
import { AccountModel } from '../models/accountModel';
import { CreateAccountDTO, UpdateAccountDTO } from '../types/account';

export class AccountController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const accounts = await AccountModel.findAll();
      res.json(accounts);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      res.status(500).json({ error: 'Failed to fetch accounts' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const account = await AccountModel.findById(id);
      
      if (!account) {
        res.status(404).json({ error: 'Account not found' });
        return;
      }
      
      res.json(account);
    } catch (error) {
      console.error('Error fetching account:', error);
      res.status(500).json({ error: 'Failed to fetch account' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateAccountDTO = req.body;
      
      if (!data.title || !data.description || !data.price || !data.category) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }
      
      const account = await AccountModel.create(data);
      res.status(201).json(account);
    } catch (error) {
      console.error('Error creating account:', error);
      res.status(500).json({ error: 'Failed to create account' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const data: UpdateAccountDTO = req.body;
      
      const account = await AccountModel.update(id, data);
      
      if (!account) {
        res.status(404).json({ error: 'Account not found' });
        return;
      }
      
      res.json(account);
    } catch (error) {
      console.error('Error updating account:', error);
      res.status(500).json({ error: 'Failed to update account' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const deleted = await AccountModel.delete(id);
      
      if (!deleted) {
        res.status(404).json({ error: 'Account not found' });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting account:', error);
      res.status(500).json({ error: 'Failed to delete account' });
    }
  }
}
