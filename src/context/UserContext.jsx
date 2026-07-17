import {
    createContext,
    useContext,
    useState
} from 'react';

import axios from 'axios';

const { VITE_BACKEND_URL } = import.meta.env;

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
    /*
     * Quando la pagina viene ricaricata, recupera l'utente
     * precedentemente salvato nel localStorage.
     */
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('user');

            return savedUser
                ? JSON.parse(savedUser)
                : null;
        } catch (error) {
            console.error(
                'Errore durante il recupero dell’utente:',
                error
            );

            return null;
        }
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') || null;
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const signUp = async (email, password) => {
        if (loading) {
            return;
        }

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

            return response.data;
        } catch (error) {
            console.error(
                'Errore durante la registrazione:',
                error.response?.data || error
            );

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
        if (loading) {
            return;
        }

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

            console.log('Risposta login:', response.data);

            /*
             * Adatta queste due righe alla risposta effettiva
             * del tuo backend.
             */
            const authToken =
                response.data.token ||
                response.data.accessToken;

            const authenticatedUser =
                response.data.user ||
                response.data.authors ||
                response.data.author;

            if (!authToken) {
                throw new Error(
                    'Il backend non ha restituito un token'
                );
            }

            if (!authenticatedUser) {
                throw new Error(
                    'Il backend non ha restituito i dati dell’utente'
                );
            }

            setUser(authenticatedUser);
            setToken(authToken);

            localStorage.setItem(
                'user',
                JSON.stringify(authenticatedUser)
            );

            localStorage.setItem(
                'token',
                authToken
            );

            return {
                user: authenticatedUser,
                token: authToken
            };
        } catch (error) {
            console.error(
                'Errore durante il login:',
                error.response?.data || error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                error.message ||
                'Errore durante il login'
            );

            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logOut = () => {
        setUser(null);
        setToken(null);
        setError(null);

        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const value = {
        user,
        token,
        signUp,
        logIn,
        logOut,
        error,
        loading,
        isAuthenticated: Boolean(token)
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
            'useUser deve essere utilizzato dentro UserProvider'
        );
    }

    return context;
};