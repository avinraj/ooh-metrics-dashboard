import { useState, useEffect } from "react";
import StorageService from "../app/core/services/storage.serive";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const storageService = new StorageService();

    useEffect(() => {
        const checkAuth = () => {
            const token = storageService.get("local", "token");
            setIsAuthenticated(!!token);
        };

        checkAuth();
    }, [storageService]);

    return { isAuthenticated };
};
