import React, { useEffect } from 'react';
import { SliderPicker } from 'react-color';
import { useWheelContext } from '../../../../../contexts/WheelContext';

const Decoration = ({ wheelProps, onUpdateProps }) => {

    const { gameConditionData, setGameConditionData, updateWheelState, setUpdateWheelState } = useWheelContext();

    const handleChange = (key, value) => {
        onUpdateProps({
            ...wheelProps,
            [key]: value
        });
        setUpdateWheelState({...updateWheelState, game_decoration: {
            ...wheelProps,
            [key]: value
        }})
    };

    useEffect(() => {
        if(gameConditionData){

        }
    }, [gameConditionData])

    return (
        <div>
            <p className='text-sm text-slate-500'>กำหนดสีและขนาด</p>
            <div className="pb-2 mt-0.5 text-sm">
                <div className='flex flex-col gap-y-2.5'>
                    <div className="flex flex-col p-2 rounded-md border">
                        <span className="mr-2">ความกว้างของเส้นขอบภายนอก</span>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={wheelProps.outerBorderWidth}
                            onChange={(e) => handleChange("outerBorderWidth", parseInt(e.target.value))}
                            className="range range-sm [--range-shdw:#00B900]"
                        />
                    </div>
                    <div className="flex flex-col p-2 rounded-md border">
                        <span className="mr-2">สีขอบภายนอก</span>
                        <SliderPicker
                            color={wheelProps.outerBorderColor}
                            onChange={(color) => handleChange("outerBorderColor", color.hex)}
                        />
                    </div>
                    <div className="flex flex-col p-2 rounded-md border">
                        <span className="mr-2">ความกว้างของเส้นรัศมี</span>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={wheelProps.radiusLineWidth}
                            onChange={(e) => handleChange("radiusLineWidth", parseInt(e.target.value))}
                            className="range range-sm [--range-shdw:#00B900]"
                        />
                    </div>
                    <div className="flex flex-col p-2 rounded-md border">
                        <span className="mr-2">สีเส้นรัศมี</span>
                        <div className='w-full'>
                            <SliderPicker
                                color={wheelProps.radiusLineColor}
                                onChange={(color) => handleChange("radiusLineColor", color.hex)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col p-2 rounded-md border">
                        <span className="mr-2">รัศมีภายใน</span>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={wheelProps.innerRadius}
                            onChange={(e) => handleChange("innerRadius", parseInt(e.target.value))}
                            className="range range-sm [--range-shdw:#00B900]"
                        />
                    </div>
                    <div className="flex flex-col p-2 rounded-md border">
                        <span className="mr-2">สีขอบภายใน</span>
                        <SliderPicker
                            color={wheelProps.innerBorderColor}
                            onChange={(color) => handleChange("innerBorderColor", color.hex)}
                        />
                    </div>
                    <div className="flex flex-col p-2 rounded-md border">
                        <span className="mr-2">ความกว้างของเส้นขอบภายใน</span>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={wheelProps.innerBorderWidth}
                            onChange={(e) => handleChange("innerBorderWidth", parseInt(e.target.value))}
                            className="range range-sm [--range-shdw:#00B900]"
                        />
                    </div>

                    <div className="flex flex-col p-2 rounded-md border">
                        <span className="mr-2">ระยะเวลาการหมุน</span>
                        <input
                            type="number"
                            step="0.1"
                            value={wheelProps.spinDuration}
                            onChange={(e) => handleChange("spinDuration", parseFloat(e.target.value))}
                            className="input input-sm input-bordered rounded-md w-full max-w-16 text-left"
                        />
                    </div>
                    <div className="flex flex-col p-2 rounded-md border">
                        <span className="mr-2">แหล่งที่มาของตัวชี้</span>
                        <input
                            type="text"
                            value={wheelProps.pointerProps.src}
                            onChange={(e) => handleChange("pointerProps.src", e.target.value)}
                            className="input input-sm input-bordered rounded-md"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Decoration;
