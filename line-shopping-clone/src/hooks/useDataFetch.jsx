import { useEffect, useState } from 'react';
import axios from 'axios';

export const EndPoint = import.meta.env.VITE_SERVER_ENDPOINT;

export const useDataFetch = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // const loadingPopup = document.getElementById("loading_popup");
        // if (loading) {
        //     loadingPopup.style.display = "flex";
        // } else {
        //     loadingPopup.style.display = "none";
        // }
    }, [loading]);

    const fetchData = async (url) => {
        setLoading(true);
        try {
            const response = await axios.get(`${EndPoint}${url}`);
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            setError(error);
            throw error;
        }
    };

    const fetchDataWithParams = async (url, pathParams) => {
        setLoading(true);
        try {
            const response = await axios.get(`${EndPoint}${url}`, { params: pathParams });
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            setError(error);
            throw error;
        }
    };

    const insertDataWithParams = async (url, bodyParams) => {
        setLoading(true);
        try {
            const response = await axios.post(`${EndPoint}${url}`, bodyParams);
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            setError(error);
            throw error;
        }
    };

    const updateDataWithParams = async (url, bodyParams) => {
        setLoading(true);
        try {
            const response = await axios.post(`${EndPoint}${url}`, bodyParams);
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            setError(error);
            throw error;
        }
    };

    return {
        loading,
        error,
        fetchData,
        fetchDataWithParams,
        insertDataWithParams,
        updateDataWithParams,
    };
};
