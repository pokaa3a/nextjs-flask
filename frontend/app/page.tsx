'use client';
import axios from 'axios';
import { useEffect } from 'react';

export default function Home() {

  const getRequest = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/');
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const postRequest = async () => {
    try {
      const responese = await axios.post('http://127.0.0.1:5000/', {
        message: 'Hello from Next.js'
      });
      console.log(responese.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container pt-16 mx-auto">
      <div className="-mx-4 flex flex-wrap items-center">
        <div className="w-full px-4 md:w-8/12 lg:w-7/12">
          <div className="mb-8 md:mb-0 lg:mb-12">
            <h1 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-3xl">
              React {'<'}-{'>'} Flask
            </h1>
            <p className="text-base font-medium leading-relaxed text-body-color">
              This project demonstrates how React communicates with Flask via REST APIs.
            </p>
          </div>
          <button
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={getRequest}
          >
            GET
          </button>
        </div>
      </div>    
    </div>
  );
}
