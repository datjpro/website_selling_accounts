import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError } from '../utils/api-error';

const queryMock = vi.fn();
const loginMock = vi.fn();
const registerMock = vi.fn();
const getMeMock = vi.fn();
const updateProfileMock = vi.fn();
const changePasswordMock = vi.fn();

vi.mock('../config/database', () => ({
  default: {
    query: queryMock,
  },
}));

vi.mock('../services/auth-service', () => ({
  AuthService: {
    login: loginMock,
    register: registerMock,
    getMe: getMeMock,
    updateProfile: updateProfileMock,
    changePassword: changePasswordMock,
  },
}));

describe('api endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('GET /api/health returns connected status', async () => {
    queryMock.mockResolvedValueOnce([[{ one: 1 }], []]);
    const { createApp } = await import('../app');
    const app = createApp();

    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.database).toBe('connected');
  });

  it('POST /api/auth/register returns success payload', async () => {
    registerMock.mockResolvedValueOnce({
      token: 'jwt-token',
      user: {
        id: '123e4567-e89b-42d3-a456-426614174000',
        username: 'tester123',
        email: 'tester@example.com',
        role: 'user',
        status: 'active',
        balance: 0,
        totalSpent: 0,
        totalOrders: 0,
        createdAt: new Date().toISOString(),
      },
    });

    const { createApp } = await import('../app');
    const app = createApp();

    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'tester123',
        email: 'tester@example.com',
        password: 'Password@123',
        fullName: 'Tester',
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.token).toBe('jwt-token');
  });

  it('POST /api/auth/register returns 400 for invalid payload', async () => {
    const { createApp } = await import('../app');
    const app = createApp();

    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'ab',
        email: 'bad-email',
        password: '123',
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it('POST /api/auth/register returns conflict message from service', async () => {
    registerMock.mockRejectedValueOnce(ApiError.conflict('Email dã du?c dang ký'));

    const { createApp } = await import('../app');
    const app = createApp();

    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'tester123',
        email: 'tester@example.com',
        password: 'Password@123',
      });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('Email dã du?c dang ký');
  });

  it('POST /api/auth/login returns success payload', async () => {
    loginMock.mockResolvedValueOnce({
      token: 'jwt-token',
      user: {
        id: '123e4567-e89b-42d3-a456-426614174000',
        username: 'tester123',
        email: 'tester@example.com',
        role: 'user',
        status: 'active',
        balance: 0,
        totalSpent: 0,
        totalOrders: 0,
        createdAt: new Date().toISOString(),
      },
    });

    const { createApp } = await import('../app');
    const app = createApp();

    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'tester@example.com',
        password: 'Password@123',
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.token).toBe('jwt-token');
  });
});
