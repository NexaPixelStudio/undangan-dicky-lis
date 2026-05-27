export interface GuestWish {
  id: string;
  name: string;
  attendance: 'hadir' | 'tidak_hadir' | 'ragu';
  guestCount: number;
  message: string;
  timestamp: string;
}

export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  category: string;
}

export interface StoryEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  image: string;
}

export interface AccountDetail {
  bankName: string;
  accountNumber: string;
  holderName: string;
  qrUrl?: string;
}
