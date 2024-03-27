// components/DataFetcher.tsx

import axios from 'axios';
import React from "react";


const dataFetch = async (setData: React.Dispatch<React.SetStateAction<any>>, url: string) => {
    try {
        const response = await axios.get(url);
        console.log("dataf")
        setData(response.data)
        console.log('Response data:', response.data);
    } catch (error) {
        console.error('Error:', error);
    }
    //TODO: Naredi reload
    //router.reload();
}

export default dataFetch;
