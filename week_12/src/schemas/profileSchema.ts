import { z } from 'zod';

//กำหนด rule แต่ละ field
export const profileSchema = z.object({
    firstName:  z.string() .min(1, 'กรุณากรอกชื่อ'),
    lastName:   z.string() .min(1, 'กรุณากรอกนามสกุล'),
    email:      z.string() .email('อีเมลไม่ถูกต้อง'),
    bio:        z.string() .max(100, 'bio ไม่เกิน 100 ตัวอักษร').optional(),
});

// ดึง TySpeScript type จาก schema - ไม่ต้องเขียน interface ซ้ำ
export type profileFormData = z.infer<typeof profileSchema>;