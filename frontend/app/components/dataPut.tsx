// components/DataFetcher.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';


const postData = async (formData: any, url: string) => {
    //console.log("data put")
    //console.log(formData)
    try {
        const response = await axios.put(url, formData);
       console.log('Response data:', response.data);
    } catch (error) {
        console.error('Error:', error);
    }
    //TODO: Naredi reload
    //router.reload();
}

export default postData;
