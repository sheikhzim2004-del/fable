'use client';

export const useAuth = () => {
    return {
        user: {
            email: 'reader@fable.com',
            photoURL: 'https://i.pravatar.cc/150?img=12',
        },
        logout: () => console.log('Logged out'),
    };
};
