import { createContext, useState, useContext } from 'react';
import axios from 'axios';

const { VITE_BACKEND_URL } = import.meta.env;

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('user');

            return savedUser
                ? JSON.parse(savedUser)
                : null;
        } catch (error) {
            console.error('Errore durante il recupero utente:', error);
            return null;
        }
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const signUp = async (email, password) => {
        if (loading) return;

        setError(null);
        setLoading(true);

        try {
            const response = await axios.post(
                `${VITE_BACKEND_URL}/signup`,
                {
                    email,
                    password
                }
            );

            const createdUser = response.data;

            setUser(createdUser);
            localStorage.setItem(
                'user',
                JSON.stringify(createdUser)
            );

            return createdUser;
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                'Errore durante la registrazione'
            );

            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logIn = async (email, password) => {
        if (loading) return;

        setError(null);
        setLoading(true);

        try {
            const response = await axios.post(
                `${VITE_BACKEND_URL}/login`,
                {
                    email,
                    password
                }
            );

            const loggedUser = response.data;

            setUser(loggedUser);

            localStorage.setItem(
                'user',
                JSON.stringify(loggedUser)
            );

            return loggedUser;
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                'Errore durante il login'
            );

            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logOut = () => {
        setUser(null);
        setError(null);

        localStorage.removeItem('user');
    };

    const value = {
        user,
        signUp,
        logIn,
        logOut,
        error,
        loading,
        isAuthenticated: Boolean(user)
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error(
            'useUser deve essere usato dentro UserProvider'
        );
    }

    return context;
};