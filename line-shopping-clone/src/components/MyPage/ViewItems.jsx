
const Carouselitem = [
    {
        url: "https://i.ibb.co/FD7VkfC/s860p.webp",
    },
    {
        url: "https://d.line-scdn.net/obs/r/ect/ect/image_16868888793851790746c6a658t11c8089f",
    },
    {
        url: "https://d.line-scdn.net/obs/r/ect/ect/image_164378388366970488419cd2866t0f364dbb",
    },
    {
        url: "https://d.line-scdn.net/obs/r/ect/ect/image_166186241969776498419d07487t104a2903",
    },
];

const ViewItems = () => {

    return (
        <div className="mt-5 px-3">
            <div className="flex justify-between">
                <div className="font-bold my-auto text-base">Recently viewed items</div>
                <div className="border border-slate-200 rounded-lg px-3 py-2 my-auto">
                    <div className="text-xs font-bold">
                        Edit
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap mt-4">
                {Carouselitem.map((image, index) => (
                    <div key={index} className={`w-1/3 pr-0.5 ${index === 0 ? 'rounded-tl-lg' : ''
                        } ${index === 2 ? 'rounded-tr-lg' : ''} ${index >= Carouselitem.length - 3 ? 'rounded-bl-lg' : ''
                        } ${index >= Carouselitem.length - 1 ? 'rounded-br-lg' : ''}`}>
                        <div className="bg-slate-200">
                            <img src={image.url} alt={`Image ${index}`} className="max-w-full h-auto object-cover opacity-90" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-16 mb-20">
                <p className="font-bold text-sm text-gray-400">©</p>
                <p className="font-bold text-sm text-gray-500 ml-1">LY Corperation</p>
            </div>
        </div>
    )
}

export default ViewItems;