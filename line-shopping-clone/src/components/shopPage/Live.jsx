import { BsChevronRight } from "react-icons/bs";

const Live = () => {
  return (
    <div className="px-4 pt-6 pb-2">
        <div className="mb-4 flex justify-between" id="title">
            <img src="https://sc-shopend.line-scdn.net/_nuxt/img/live-logo.f58080e.svg"/>
            <div className="flex">
                <p className="text-[#777777] text-xs flex my-auto">See all <BsChevronRight className="my-auto ml-0.5"/></p>
            </div>
        </div>
        <div className="grid grid-cols-3 gap-x-2.5">
            <div>
                <img src="https://lss-glcms.line-scdn.net/0hIv5k19_zFlkIEgWIMhdpDlZPCSBzfwNTdmoLZzNAE2hgXTcGciRbXHR6LTB5cTh4cx8BVGZzLihjXQlkNRUwQ3FHLWhsSlJ0dR8gSyhCAz9ucgp_cg8FZSVuDg"
                    className="rounded-md object-cover"/>
                <p className="text-xs pt-2 leading-normal text-[#111111]">เงินแสนต้องเป็นของคุณ!!!</p>
                <p className="text-[10px] leading-normal text-[#777777]">29 Jan 2024 10:23</p>
            </div>
            <div>
                <img src="https://lss-glcms.line-scdn.net/0hIv5k19_zFlkIEgWIMhdpDlZPCSBzfwNTdmoLZzNAE2hgXTcGciRbXHR6LTB5cTh4cx8BVGZzLihjXQlkNRUwQ3FHLWhsSlJ0dR8gSyhCAz9ucgp_cg8FZSVuDg"
                    className="rounded-md object-cover"/>
                <p className="text-xs pt-2 leading-normal text-[#111111]">เงินแสนต้องเป็นของคุณ!!!</p>
                <p className="text-[10px] leading-normal text-[#777777]">29 Jan 2024 10:23</p>
            </div>
            <div>
                <img src="https://lss-glcms.line-scdn.net/0hIv5k19_zFlkIEgWIMhdpDlZPCSBzfwNTdmoLZzNAE2hgXTcGciRbXHR6LTB5cTh4cx8BVGZzLihjXQlkNRUwQ3FHLWhsSlJ0dR8gSyhCAz9ucgp_cg8FZSVuDg"
                    className="rounded-md object-cover"/>
                <p className="text-xs pt-2 leading-normal text-[#111111]">เงินแสนต้องเป็นของคุณ!!!</p>
                <p className="text-[10px] leading-normal text-[#777777]">29 Jan 2024 10:23</p>
            </div>
        </div>
    </div>
  )
}
export default Live