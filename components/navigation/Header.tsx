import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const Header = () => {
  const { data } = useSession();
  return (
    <div
      className='flex justify-between items-center w-full lg:max-w-6xl bg-black
     text-white  box-border mx-auto h-[65px]'
    >
      <h2 className='font-bold'>
        <Link href='/'>Wrapp3D</Link>
      </h2>
      <ul className='flex items-center justify-center box-border child:my-auto child:px-[17px] font-bold'>
        <li>
          <Link href='/top-tracks'>Tracks</Link>
        </li>
        <li>
          <Link href='/top-artists'>Artists</Link>
        </li>
        <li>
          <Link href='https://github.com'>Source</Link>
        </li>
        <li className='font-normal'>|</li>
        <li>
          <img
            className='w-10 inline-block rounded-full '
            src={data?.user.image!}
          />
          <span className='mx-2.5'>{data?.user.name}</span>

          <svg viewBox='0 0 1024 1024' className='fill-white w-3 inline-block'>
            <path d='M476.455 806.696L95.291 425.532Q80.67 410.911 80.67 390.239t14.621-34.789 35.293-14.117 34.789 14.117L508.219 698.8l349.4-349.4q14.621-14.117 35.293-14.117t34.789 14.117 14.117 34.789-14.117 34.789L546.537 800.142q-19.159 19.159-38.318 19.159t-31.764-12.605z' />
          </svg>
        </li>
      </ul>
    </div>
  );
};

export default Header;
