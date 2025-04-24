import { createContext, useState, useContext } from "react";
import axios from "axios"; // Importa axios se non già fatto
const { VITE_BACKEND_URL } = import.meta.env;

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(false); 

    const signUp = async (email, password) => {
        if (loading) return;

        setError(null);
        setLoading(true);

        try {
            const body = { email, password };
            const { data: user } = await axios.post(`${VITE_BACKEND_URL}/signup`, body);
            setUser(user);
        } catch (error) {
            console.error(error);
            setError(error.response.data);
        } finally {
            setLoading(false);
        }
    };

    const logIn = async (email, password) => {
        if (loading) return;

        setError(null);
        setLoading(true);

        try {
            const body = { email, password };
            const { data: user } = await axios.post(`${VITE_BACKEND_URL}/login`, body);
            setUser(user);
        } catch (error) {
            console.error(error);
            setError(error.response.data);
        } finally {
            setLoading(false);
        }
    };

    // Valore da fornire a tutto il contesto
    const value = {
        user,         // Stato dell'utente
        signUp,       // Funzione di registrazione
        logIn,        // Funzione di login
        error,        // Stato di errore
        loading,      // Stato di caricamento
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('hai provato ad usare useUser senza UserProvider.');
    }
    return context;
};
