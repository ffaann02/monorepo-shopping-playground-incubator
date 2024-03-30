import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Topbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  // get current path and set breadcrumbs
  useEffect(() => {
    const path = location.pathname;
    const pathParts = path.split('/').filter(part => part !== '');
    const newBreadcrumbs = pathParts.map(part => capitalizeFirstLetter(part.replace(/-/g, ' '))); // Replace '-' with ' ' and capitalize each word
    setBreadcrumbs(newBreadcrumbs);
  }, [location]);

  const capitalizeFirstLetter = (string) => {
    const wordsToCapitalize = ['spinner']; // Add more words as needed
    const words = string.split(' ');
    const capitalizedWords = words.map(word => {
      if (wordsToCapitalize.includes(word.toLowerCase())) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    });
    return capitalizedWords.join(' ');
  };

  const handleClick = (index) => {
    // Build the new path by joining the original breadcrumb parts up to the clicked index
    const newPath = location.pathname.split('/').filter((part, i) => i <= index + 1).join('/');
    // Navigate to the new path
    navigate(newPath);
  };

  return (
    <div className="fixed w-full z-10 bg-white top-0 border-l-[1px] drop-shadow-sm text-neutral-700">
      <div className='grid grid-cols-12 w-full'>
        <div className="col-span-2 flex border-slate-100 border-r-[1px] border-y-0 border-l-0 w-full justify-center">
          <img className='h-10 m-2' src="https://i.ibb.co/QdBW3kk/Logo-Play-Ground-2.png"/>
          {/* <h1 className='2xl:text-xl xl:text-lg text-neutral-700 font-bold 2xl:px-4 xl:px-0 py-4 mx-auto'>SHOPPING Playground</h1> */}
        </div>
        <div className="flex text-sm breadcrumbs col-span-10 pl-6 text-slate-500">
          <ul className="my-auto">
            {breadcrumbs.map((item, index) => (
              <li key={index}>
                <a onClick={() => handleClick(index)}>{item}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
