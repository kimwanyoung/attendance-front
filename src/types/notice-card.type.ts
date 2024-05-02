interface NoticeCardType {
    author?: { name: string };
    contents: string;
    createdAt: string
    id: number;
    title: string;
}

export type {NoticeCardType}