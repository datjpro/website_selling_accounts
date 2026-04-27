import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError } from '../utils/api-error';

const queryMock = vi.fn();
const loginMock = vi.fn();
const registerMock = vi.fn();
const getMeMock = vi.fn();
const updateProfileMock = vi.fn();
const changePasswordMock = vi.fn();
const listUsersMock = vi.fn();
const listCategoriesMock = vi.fn();
const listProductsMock = vi.fn();
const listOrdersMock = vi.fn();
const listPromotionsMock = vi.fn();

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

vi.mock('../services/admin-service', () => ({
  AdminService: {
    listUsers: listUsersMock,
    listCategories: listCategoriesMock,
    listProducts: listProductsMock,
    listOrders: listOrdersMock,
    listPromotions: listPromotionsMock,
    createCategory: vi.fn(),
    updateCategory: vi.fn(),
    deleteCategory: vi.fn(),
    createProduct: vi.fn(),
    updateProduct: vi.fn(),
    deleteProduct: vi.fn(),
    createPromotion: vi.fn(),
    updatePromotion: vi.fn(),
    deletePromotion: vi.fn(),
    updateOrderStatus: vi.fn(),
  },
}));

vi.mock('../middleware/require-auth', () => ({
  requireAuth: (_req: unknown, _res: unknown, next: () => void) => next(),
}));

vi.mock('../middleware/require-admin', () => ({
  requireAdmin: (_req: unknown, _res: unknown, next: () => void) => next(),
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
    registerMock.mockRejectedValueOnce(ApiError.conflict('Email đã được đăng ký'));

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
    expect(response.body.message).toBe('Email đã được đăng ký');
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

  it('GET /api/admin/products returns list payload', async () => {
    listProductsMock.mockResolvedValueOnce([{ id: 'prod-1', name: 'Account A', slug: 'account-a' }]);
    const { createApp } = await import('../app');
    const app = createApp();

    const response = await request(app).get('/api/admin/products');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(1);
  });

  it('GET /api/admin/orders returns list payload', async () => {
    listOrdersMock.mockResolvedValueOnce([{ id: 'order-1', orderNumber: 'ORD-202601010001' }]);
    const { createApp } = await import('../app');
    const app = createApp();

    const response = await request(app).get('/api/admin/orders');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data[0].orderNumber).toBe('ORD-202601010001');
  });

  it('GET /api/admin/categories returns list payload', async () => {
    listCategoriesMock.mockResolvedValueOnce([{ id: 1, name: 'Liên Minh' }]);
    const { createApp } = await import('../app');
    const app = createApp();

    const response = await request(app).get('/api/admin/categories');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data[0].name).toBe('Liên Minh');
  });

  it('GET /api/admin/promotions returns list payload', async () => {
    listPromotionsMock.mockResolvedValueOnce([{ id: 10, code: 'HELLO10' }]);
    const { createApp } = await import('../app');
    const app = createApp();

    const response = await request(app).get('/api/admin/promotions');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data[0].code).toBe('HELLO10');
  });

  it('GET /api/admin/users returns list payload', async () => {
    listUsersMock.mockResolvedValueOnce([{ id: 'user-1', username: 'tester' }]);
    const { createApp } = await import('../app');
    const app = createApp();

    const response = await request(app).get('/api/admin/users');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data[0].username).toBe('tester');
  });
});
