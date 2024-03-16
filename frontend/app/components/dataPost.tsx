// components/DataFetcher.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {router} from "next/client";
type MyData = {
    app_name: string;
    owner: string;
};

const postData = async (formData: any, url: string) => {
    console.log(formData)
    try {
        const response = await axios.post(url, formData);
        console.log('Response data:', response.data);
    } catch (error) {
        console.error('Error:', error);
    }
    //TODO: Naredi reload
    //router.reload();
}

export default postData;
