import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useDataFetch } from '../../hooks/useDataFetch';
import { LuImagePlus } from "react-icons/lu";

const AddCoupon = () => {

    const { insertDataWithParams, loading } = useDataFetch();
    const [imageBase64, setImageBase64] = useState(null);

    const [couponDetails, setCouponDetails] = useState({
        code: "",
        type: "",
        value: "",
        startDate: "",
        endDate: "",
        quantity: 0,
        minPurchaseQuantity: "-",
        limitPerUser: "-",
        termsAndConditions: ""
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                setImageBase64(base64String);
                handleProcessImage(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProcessImage = (base64String) => {
        console.log("image vision processing...");
        const data = {
            imageBase64: base64String
        }
        insertDataWithParams("/gemini/image-vision", data)
            .then(res => {
                console.log(res);
                setCouponDetails(res);
                document.getElementById('modal_upload_image').close();
            })
            .catch(error => {
                console.error("Error post image to gemini vision:", error);
                document.getElementById('modal_upload_image').close();
            });
    }

    const handleSaveButton = () => {
        insertDataWithParams('/mysql/insert-coupon', couponDetails )
        .then(res => {
            console.log(res);
        })
        .catch(error => {
            console.error("Error insert coupon:", error);
        });
    }

    return (
        <div className='w-full h-full pt-10 max-w-6xl pr-20 mx-auto'>
            <dialog id="modal_upload_image" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-semibold text-lg">อัปโหลดรูปภาพข้อมูลคูปองจาก <span className='text-green-600'>MyShop</span></h3>
                    {!loading ? <div className='relative cursor-pointer bg-neutral-200 w-full h-32 hover:bg-neutral-300 rounded-md border border-slate-400 mt-1 transition-all duration-100 ease-linear'>
                        <div className='absolute text-xl w-full h-full flex'>
                            <LuImagePlus className='text-3xl m-auto text-slate-600' />
                        </div>
                        <input
                            className='w-full h-full opacity-0 cursor-pointer'
                            type='file'
                            accept='image/*'
                            onChange={handleImageChange}
                        />
                    </div> :
                        <span className="loading loading-dots text-green-500 w-20 justify-center mx-auto flex my-2"></span>
                    }
                    {/* <button onClick={handleProcessImage} className='border rounded-[0.25rem] text-green-600 border-green-600 px-2 mt-2'>
                        <span>อัปโหลด</span>
                    </button> */}
                    {/* {imageBase64 && (
                        <div>
                            <h2>Preview:</h2>
                            <img src={`data:image/jpeg;base64,${imageBase64}`} alt="Uploaded" style={{ maxWidth: '100%' }} />
                        </div>
                    )} */}
                </div>
            </dialog>
            <div className='flex justify-between'>
                <div className=''>
                    <p className='text-2xl font-semibold'>เพิ่มคูปอง</p>
                    <div className='mt-1'>
                        <p className='text-md font-normal'>คูปองส่วนลดแบบลับแจกเฉพาะลูกค้า สามารถใช้เป็นของรางวัลแจกได้ในเกมประจำร้านของคุณ</p>
                        <p className='text-md font-normal'>กรอกข้อมูลส่วนลดจาก <span className='text-green-600'>MyShop</span> หรือใช้ระบบคัดลอกคำอัตโนมัติจากรูปภาพ</p>
                    </div>
                </div>
                <button className='h-fit my-auto px-4 py-3 rounded-md border border-slate-400
                 text-slate-500 bg-slate-100 hover:bg-slate-200' onClick={() => {
                        document.getElementById('modal_upload_image').showModal();
                    }}>อัปโหลดรูป
                </button>
            </div>
            <div className='bg-white w-full mt-6 pt-4 p-5 rounded-lg'>
                <p className='text-lg font-semibold text-slate-600'>ข้อมูลคูปอง</p>
                <div className='flex flex-col gap-y-4 mt-2'>
                    <div className="bg-neutral-100 w-full grid grid-cols-2 rounded-lg pb-5">
                        <div className='p-4 pb-0 rounded-md'>
                            <p className='text-sm text-slate-500'>รหัสคูปอง</p>
                            <input
                                type='text'
                                className='w-full border border-slate-200 rounded-md p-2 pl-2.5 mt-1 focus:outline-none'
                                value={couponDetails.code}
                                onChange={(e) => setCouponDetails({ ...couponDetails, code: e.target.value })}
                            />
                        </div>
                        <div className='p-4 pb-0 rounded-md'>
                            <p className='text-sm text-slate-500'>ประเภทคูปอง</p>
                            <input
                                type='text'
                                className='w-full border border-slate-200 rounded-md p-2 pl-2.5 mt-1 focus:outline-none disabled:bg-slate-50 text-slate-500'
                                value="ส่วนลดสินค้า"
                                disabled
                            />
                        </div>
                        <div className='p-4 pb-0 rounded-md'>
                            <p className='text-sm text-slate-500'>มูลค่าส่วนลด</p>
                            <input
                                type='text'
                                className='w-full border border-slate-200 rounded-md p-2 pl-2.5 mt-1 focus:outline-none'
                                value={couponDetails.value}
                                onChange={(e) => setCouponDetails({ ...couponDetails, value: e.target.value })}
                            />
                        </div>
                        <div className='p-4 pb-0 rounded-md'>
                            <p className='text-sm text-slate-500'>วันเริ่ม</p>
                            <input
                                type='text'
                                className='w-full border border-slate-200 rounded-md p-2 pl-2.5 mt-1 focus:outline-none'
                                value={couponDetails.startDate}
                                onChange={(e) => setCouponDetails({ ...couponDetails, startDate: e.target.value })}
                            />
                        </div>
                        <div className='p-4 pb-0 rounded-md'>
                            <p className='text-sm text-slate-500'>วันสิ้นสุด</p>
                            <input
                                type='text'
                                className='w-full border border-slate-200 rounded-md p-2 pl-2.5 mt-1 focus:outline-none'
                                value={couponDetails.endDate}
                                onChange={(e) => setCouponDetails({ ...couponDetails, endDate: e.target.value })}
                            />
                        </div>
                        <div className='p-4 pb-0 rounded-md'>
                            <p className='text-sm text-slate-500'>จำนวนคูปอง</p>
                            <input
                                type='text'
                                className='w-full border border-slate-200 rounded-md p-2 pl-2.5 mt-1 focus:outline-none'
                                value={couponDetails.quantity}
                                onChange={(e) => setCouponDetails({ ...couponDetails, quantity: e.target.value })}
                            />
                        </div>
                        <div className='p-4 pb-0 rounded-md'>
                            <p className='text-sm text-slate-500'>จำนวนสิทธิต่อคน</p>
                            <input
                                type='text'
                                className='w-full border border-slate-200 rounded-md p-2 pl-2.5 mt-1 focus:outline-none'
                                value={couponDetails.limitPerUser}
                                onChange={(e) => setCouponDetails({ ...couponDetails, limitPerUser: e.target.value })}
                            />
                        </div>
                        <div className='p-4 pb-0 rounded-md'>
                            <p className='text-sm text-slate-500'>จำนวนสั่งซื้อต่อคน</p>
                            <input
                                type='text'
                                className='w-full border border-slate-200 rounded-md p-2 pl-2.5 mt-1 focus:outline-none'
                                value={couponDetails.minPurchaseQuantity}
                                onChange={(e) => setCouponDetails({ ...couponDetails, minPurchaseQuantity: e.target.value })}
                            />
                        </div>
                        <div className='p-4 pb-0 rounded-md'>
                            <p className='text-sm text-slate-500'>กติกาและเงื่อนไขการใช้งาน</p>
                            <textarea
                                type='text'
                                className='w-full border border-slate-200 rounded-md p-2 pl-2.5 mt-1 focus:outline-none textarea'
                                value={couponDetails.termsAndConditions}
                                onChange={(e) => setCouponDetails({ ...couponDetails, termsAndConditions: e.target.value })}
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

export default AddCoupon