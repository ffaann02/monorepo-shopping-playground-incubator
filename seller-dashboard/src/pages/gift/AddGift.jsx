import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useDataFetch } from '../../hooks/useDataFetch';
import { LuImagePlus } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";

const AddGift = () => {

    const { insertDataWithParams, loading } = useDataFetch();
    const [imageBase64, setImageBase64] = useState(null);

    const [giftDetails, setGiftDetails] = useState({
        name: "",
        category: "อื่นๆ",
        brand: "",
        description: "",
        variant: {
            name: "",
            value: ""
        },
        quantity: 0,
        weight: 0,
        price: 0
    });

    const resizeImageToSquare = (img, size) => {
        const canvas = document.createElement('canvas');
        const maxSize = size;
        const scaleFactor = maxSize / Math.max(img.width, img.height);
        canvas.width = img.width * scaleFactor;
        canvas.height = img.height * scaleFactor;
        const ctx = canvas.getContext('2d');

        // Calculate the position to draw the image at the center
        const offsetX = (maxSize - canvas.width) / 2;
        const offsetY = (maxSize - canvas.height) / 2;

        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Get the resized base64 string from canvas
        return canvas.toDataURL('image/jpeg').split(',')[1]; // Remove the prefix
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    // Resize the image to a square with a fixed size of 300 pixels
                    const base64String = resizeImageToSquare(img, 300);
                    console.log(base64String);
                    // Set the resized image base64 string
                    setImageBase64(base64String);
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e, field) => {
        const { value } = e.target;
        setGiftDetails(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleVariantChange = (e, field) => {
        const { value } = e.target;
        setGiftDetails(prevState => ({
            ...prevState,
            variant: {
                ...prevState.variant,
                [field]: value
            }
        }));
    };

    const [isGonnaDeteleImage, setISGonnaDeleteImage] = useState(false);

    const handleSaveButton = () => {
        const data = {
            giftDetails: giftDetails,
            imageBase64: imageBase64
        }
        insertDataWithParams('/product/add-gift', data);
        console.log(giftDetails);
    }

    return (
        <div className='w-full h-full pt-10 max-w-6xl pl-16 pr-20 mx-auto'>
            <div className='flex justify-between'>
                <div className=''>
                    <p className='text-2xl font-semibold'>เพิ่มของแถม</p>
                    <div className='mt-1'>
                        <p className='text-md font-normal'>เลือกสินค้าที่เป็นของแถม สามารถใช้เป็นของรางวัลแจกได้ในเกมประจำร้านของคุณ</p>
                        {/* <p className='text-md font-normal'> <span className='text-green-600'>MyShop</span> หรือใช้ระบบคัดลอกคำอัตโนมัติจากรูปภาพ</p> */}
                    </div>
                </div>
            </div>
            <div className='bg-white w-full mt-6 pt-4 p-5 rounded-lg drop-shadow-sm'>
                <p className='text-lg font-semibold text-slate-600'>รูปภาพ</p>
                {!imageBase64 ? <div className="bg-neutral-100 w-full rounded-lg pb-5 h-40 relative cursor-pointer hover:bg-neutral-200 mt-2">
                    <div className='absolute text-xl w-full h-full flex'>
                        <LuImagePlus className='text-3xl m-auto text-slate-600' />
                    </div>
                    <input
                        className='w-full h-full opacity-0 bg-red-200 cursor-pointer'
                        type='file'
                        accept='image/*'
                        onChange={handleImageChange}
                    />
                </div> :
                    <div className='w-fit relative rounded-xl mt-2 flex border border-dashed bg-neutral-50 mx-auto justify-center items-center overflow-hidden'>
                        <div className='absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300'></div>
                        <div className='absolute z-[10] right-2 top-2 bg-slate-500 p-2 text-white rounded-full cursor-pointer hover:bg-slate-600'
                            onMouseEnter={()=>{setISGonnaDeleteImage(true)}}>
                            <FaRegTrashAlt className="" onClick={() => setImageBase64(null)} />
                        </div>
                        <img src={`data:image/jpeg;base64,${imageBase64}`} className="z-5 border p-4 rounded-xl"/>
                    </div>}
            </div>
            <div className='bg-white w-full mt-6 pt-4 p-5 rounded-lg drop-shadow-sm'>
                <p className='text-lg font-semibold text-slate-600'>รายละเอียด</p>
                <div className='flex flex-col gap-y-4 mt-2'>
                    <div className="bg-neutral-100 w-full grid grid-cols-2 rounded-lg pb-5">
                        <div className='p-4 pb-0 rounded-md col-span-full'>
                            <p className='text-sm text-slate-500'>ชื่อของแถม</p>
                            <input
                                type='text'
                                className='w-full border border-slate-200 rounded-md p-2 pl-2.5 mt-1 focus:outline-none'
                                value={giftDetails.code}
                                onChange={(e) => handleInputChange(e, 'name')}
                            />
                        </div>
                        <div className='p-4 pb-0 rounded-md'>
                            <p className='text-sm text-slate-500'>หมวดหมู่ของแถม</p>
                            <input
                                type='text'
                                disabled
                                className='w-full border text-slate-500 border-slate-200 rounded-md p-2 pl-2.5 mt-1 focus:outline-none disabled:bg-slate-50'
                                value={giftDetails.value}
                            />
                        </div>
                        <div className='p-4 pb-0 rounded-md'>
                            <p className='text-sm text-slate-500'>แบรนด์ / ยี่ห้อ</p>
                            <input
                                type='text'
                                className='w-full border border-slate-200 rounded-md p-2 pl-2.5 mt-1 focus:outline-none'
                                value={giftDetails.brand}
                                onChange={(e) => handleInputChange(e, 'brand')}
                            />
                        </div>
                        <div className='p-4 pb-0 rounded-md col-span-full'>
                            <p className='text-sm text-slate-500'>รายละเอียดของแถม</p>
                            <textarea
                                type='text'
                                className='w-full border h-24 border-slate-200 rounded-md p-2 pl-2.5 mt-1 focus:outline-none textarea'
                                value={giftDetails.description}
                                onChange={(e) => handleInputChange(e, 'description')}
                            />
                        </div>
                        <div className='p-4 pt-2 pb-0 rounded-md col-span-full drop-shadow-sm'>
                            <p className='text-sm text-slate-500'>คุณสมบัติเพิ่มเติม</p>
                            <div className='bg-white mt-2 p-4 pt-3 border grid grid-cols-3 gap-x-3 rounded-md'>
                                <div className="col-span-1">
                                    <p className='text-sm text-slate-500'>ชื่อคุณสมบัติ</p>
                                    <input
                                        placeholder='เช่น สี, ขนาด, ความจุ'
                                        type='text'
                                        className='w-full border border-slate-200 rounded-md text-sm p-2 pl-2.5 mt-1 focus:outline-none'
                                        value={giftDetails.variant.name}
                                        onChange={(e) => handleVariantChange(e, 'name')}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <p className='text-sm text-slate-500'>ค่าคุณสมบัติ</p>
                                    <input
                                        placeholder='เช่น สีชมพู, ไซส์ L, 10 GB,'
                                        type='text'
                                        className='w-full border border-slate-200 rounded-md text-sm p-2 pl-2.5 mt-1 focus:outline-none'
                                        value={giftDetails.variant.value}
                                        onChange={(e) => handleVariantChange(e, 'value')}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white w-full mt-6 pt-4 p-5 rounded-lg drop-shadow-sm'>
                <p className='text-lg font-semibold text-slate-600'>ข้อมูลตัวเลข</p>
                <div className='flex flex-col gap-y-4 mt-2'>
                    <div className="bg-neutral-100 w-full grid grid-cols-2 rounded-lg pb-5">
                        <div className='p-4 pb-0 rounded-md'>
                            <p className='text-sm text-slate-500'>จำนวนของแถมในคลัง</p>
                            <input
                                type='text'
                                className='w-full border border-slate-200 rounded-md p-2 pl-2.5 mt-1 focus:outline-none'
                                value={giftDetails.quantity}
                                onChange={(e) => handleInputChange(e, 'quantity')}
                            />
                        </div>
                        <div className='p-4 pb-0 rounded-md'>
                            <p className='text-sm text-slate-500'>น้ำหนัก (กิโลกรัม)</p>
                            <input
                                type='text'
                                className='w-full border text-slate-500 border-slate-200 rounded-md p-2 pl-2.5 mt-1 focus:outline-none disabled:bg-slate-50'
                                value={giftDetails.weight}
                                onChange={(e) => handleInputChange(e, 'weight')}
                            />
                        </div>
                        <div className='p-4 pb-0 rounded-md'>
                            <p className='text-sm text-slate-500'>ราคา</p>
                            <input
                                type='text'
                                className='w-full border border-slate-200 rounded-md p-2 pl-2.5 mt-1 focus:outline-none'
                                value={giftDetails.price}
                                onChange={(e) => handleInputChange(e, 'price')}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-6 gap-x-3 flex'>
                <button className='h-fit my-auto px-4 py-2 rounded-md border border-blue-400
                 text-blue-500 bg-blue-50 hover:bg-blue-100' onClick={handleSaveButton}>
                    บันทึก
                </button>
                <button className='h-fit my-auto px-4 py-2 rounded-md border border-slate-400
                 text-slate-500 bg-slate-100 hover:bg-slate-200'>
                    ยกเลิก
                </button>
            </div>
        </div>
    )
}

export default AddGift;