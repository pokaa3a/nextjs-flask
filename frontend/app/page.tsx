'use client';
import axios from 'axios';
import { useState } from 'react';
import { ItemType, Item } from '@/components/item';

export default function Home() {

  const [items, setItems] = useState<ItemType[]>([]);
  const [inputId, setItemId] = useState(0);
  const [inputMetadata, setMetadata] = useState("default metadata");
  const [inputPayload, setPayload] = useState("default payload");

  const getItem = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/items/${inputId}`);
      console.log(response.data["metadata"]);
      const itemList: ItemType[] = [{ id: inputId, metadata: response.data["metadata"], payload: response.data["payload"] }];
      setItems(itemList);
    } catch (error) {
      console.error('Error reading data:', error);
    }
  };

  const delItem = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/items/${inputId}`);
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  const putItem = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:5000/items/${inputId}`,
        { "metadata": inputMetadata, "payload": inputPayload });
      console.log(response.data);
    } catch (e) {
      console.error("Error putting item", e);
    }
  };

  const getItemList = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/items");
      console.log(response.data);
      const itemList: ItemType[] = [];
      for (const id in response.data) {
        itemList.push({id: Number(id), metadata: response.data[id]["metadata"], payload: response.data[id]["payload"]})
      }
      setItems(itemList);
    } catch (e) {
      console.error("Error reading item list:", e);
    }
  };

  const postItemList = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/items",
        { "metadata": inputMetadata, "payload": inputPayload });
      console.log(response.data);
    } catch (e) {
      console.error("Error posting item list: ", e)
    }
  };

  const handleInputIdNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const re = /^[0-9\b]+$/; //rules
    if (event.target.value === "" || re.test(event.target.value)) {
      setItemId(Number(event.target.value));
    }
  };

  return (
    <div className="container pt-16 mx-auto">
      <div className="-mx-4 flex flex-wrap items-center">
        <div className="w-fit px-4">
          <div className="mb-8 md:mb-0 lg:mb-12">
            <h1 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-3xl">
              React {'<'}-{'>'} Flask
            </h1>
            <p className="text-base font-medium leading-relaxed text-body-color">
              This project demonstrates how React communicates with Flask via REST APIs.
            </p>
          </div>
          <div className="flex flex-wrap w-full">
            <input type="number" className="px-4 py-2 rounded shadow-sm text-black mt-4" placeholder="ID" onChange={handleInputIdNumber} />
            <input type="text"   className="px-4 py-2 rounded shadow-sm text-black mt-4 ml-4" placeholder="Metadata" onChange={(event) => setMetadata(event.target.value)} />
            <input type="text"   className="px-4 py-2 rounded shadow-sm text-black mt-4 ml-4" placeholder="Payload"  onChange={(event) => setPayload(event.target.value)} />
          </div>
          <div className="flex flex-wrap items-center justify-between">
            <button
              className="flex h-10 items-center rounded-lg bg-blue-600 px-4 mt-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={getItem}
            >
              GET Item
            </button>
            <button
              className="flex h-10 items-center rounded-lg bg-blue-600 px-4 mt-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={delItem}
            >
              DEL Item
            </button>
            <button
              className="flex h-10 items-center rounded-lg bg-blue-600 px-4 mt-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={putItem}
            >
              PUT Item
            </button>
            <button
              className="flex h-10 items-center rounded-lg bg-blue-600 px-4 mt-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={getItemList}
            >
              GET ItemList
            </button>
            <button
              className="flex h-10 items-center rounded-lg bg-blue-600 px-4 mt-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={postItemList}
            >
              POST ItemList
            </button>
          </div>
          <div className="my-4">
            {items.map((item, idx) => {
              return (
                <Item item={item} key={idx}></Item>
              )
            })}
          </div>
        </div>
      </div>    
    </div>
  );
}
