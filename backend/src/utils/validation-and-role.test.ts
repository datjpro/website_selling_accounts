import { describe, expect, it } from 'vitest';
import { loginSchema, registerSchema, createOrderSchema, promotionValidateSchema } from './validation-schemas';
import { hasRequiredRole } from './role';

describe('validation schemas', () => {
  it('accepts valid register payload', () => {
    const payload = {
      username: 'validuser',
      email: 'valid@example.com',
      password: 'Pass@123456',
      fullName: 'Valid User',
      phone: '0123456789',
    };
    const result = registerSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it('accepts valid login payload', () => {
    const result = loginSchema.safeParse({ email: 'valid@example.com', password: 'Pass@123456' });
    expect(result.success).toBe(true);
  });

  it('accepts valid order payload', () => {
    const result = createOrderSchema.safeParse({
      customerName: 'Order User',
      customerEmail: 'order@example.com',
      paymentMethod: 'bank_transfer',
      items: [
        { productId: '123e4567-e89b-42d3-a456-426614174000', quantity: 1 },
      ],
      promotionCode: 'SAVE10',
    });
    expect(result.success).toBe(true);
  });

  it('accepts valid promotion validate payload', () => {
    const result = promotionValidateSchema.safeParse({ code: 'SAVE10', orderAmount: 100000 });
    expect(result.success).toBe(true);
  });
});

describe('role hierarchy', () => {
  it('allows admin to access vip and user resources', () => {
    expect(hasRequiredRole('admin', 'vip')).toBe(true);
    expect(hasRequiredRole('admin', 'user')).toBe(true);
  });

  it('allows vip to access user resources but not admin resources', () => {
    expect(hasRequiredRole('vip', 'user')).toBe(true);
    expect(hasRequiredRole('vip', 'admin')).toBe(false);
  });

  it('allows user only user resources', () => {
    expect(hasRequiredRole('user', 'user')).toBe(true);
    expect(hasRequiredRole('user', 'vip')).toBe(false);
  });
});

