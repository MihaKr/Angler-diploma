// components/DataFetcher.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface DataFetcherProps {
    url: string;
    setData: React.Dispatch<React.SetStateAction<any>>;
}

const DataFetcher: React.FC<DataFetcherProps> = ({ url, setData }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setData(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [url, setData]);

    return null; // Server-side component doesn't render anything
};

export default DataFetcher;
