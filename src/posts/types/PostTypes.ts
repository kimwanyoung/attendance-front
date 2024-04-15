interface PostModel {
    id: number;
    title: string;
    contents: string;
    location: string;
    eventDate: string;
    voteDuration: number;
    author: string;
}

interface PostModalProps {
    show: boolean
    onHide: () => void;
}

interface CreatePostProps extends Pick<PostModel, 'title' | 'contents' | 'location' | 'eventDate' | 'voteDuration'> {
}

export type {PostModel, PostModalProps, CreatePostProps};