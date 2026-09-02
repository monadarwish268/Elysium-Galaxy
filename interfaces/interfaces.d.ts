/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IResponse<T = undefined> {
  data?: T;
  message?: string;
  status?: number;
}

export interface IBooking {
  psychologistId?: string;
  scheduledAt?: string | Date;
  status?: string;
}

export interface Booking {
  id: string;
  userId: string;
  psychologistId: string;
  scheduledAt: string;
  status: string;
  createdAt: string;
}
