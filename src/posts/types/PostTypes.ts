interface PostModel {
    id: number;
    title: string;
    contents: string;
    location: string;
    eventDate: string;
    voteDuration: number;
    author: { name: string };
    createdAt: string;
    endDate: string;
}

interface PostModalProps {
    show: boolean
    onHide: () => void;
}

interface CreatePostProps extends Pick<PostModel, 'title' | 'contents' | 'location' | 'eventDate' | 'voteDuration'> {
}

interface DetailPostProps extends Pick<PostModel,
    'title' |
    'contents' |
    'location' |
    'eventDate' |
    'author' |
    'id' |
    'createdAt' |
    'endDate'
> {
}

export type {PostModel, PostModalProps, CreatePostProps, DetailPostProps};