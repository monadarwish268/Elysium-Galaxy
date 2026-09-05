// 1. الواجهة الأساسية
export interface IActivity {
  id: string;
  planetId: string;
  title: string;
  description: string;
  type: string;
  duration: string | null; 
  createdAt?: string;
}

// 2. DTO لإنشاء activity جديد (بدون id و createdAt)
export type CreateActivityDTO = Omit<IActivity, 'id' | 'createdAt'>;

// 3. DTO لتعديل activity (كل الحقول اختيارية ما عدا id و planetId)
export type UpdateActivityDTO = Partial<Omit<IActivity, 'id' | 'planetId'>>;

// 4. استجابة الـ API الموحدة
export interface ApiResponse<T = unknown> {
  status: number;
  message: string;
  data?: T;
}