'use client'
import { useRouter,  usePathname } from 'next/navigation';
import Image from 'next/image';
import './header.css'
import Group from '../../../../public/images/Group.svg';
import Home from '../../../../public/images/Home.svg';
import menu from '../../../../public/images/menu-toggle.svg';
import Hat from '../../../../public/images/hat.svg';
import users from '../../../../public/images/users.svg';
import credit from '../../../../public/images/credit.svg';
import adderss from '../../../../public/images/address.svg';
import product from '../../../../public/images/new-product.png';
import {BsFillBox2Fill} from 'react-icons/bs'
import { TbBrandCodesandbox} from 'react-icons/tb'
import { RiPlayListAddLine} from 'react-icons/ri'
import { BiSolidCategoryAlt} from 'react-icons/bi'
import { MdCategory} from 'react-icons/md'
import { TbDiscount2} from 'react-icons/tb'
import Link from 'next/link';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <div className="menu_bar bg_fount">
        <div className="hero_bar mb-8 p-5">
          <Image src={Group} alt="" width={48} height={48} />
          <h2 className="wrap">
            SELLO
          </h2>
          <Image src={menu} alt="" width={32} height={32} />
        </div>
        <div className="pl-5 pr-5">
          <hr />
        </div>

        <div>
          <Link href="/private/report">
            <li className={pathname === '/private/report' ? 'menu_active mb-5 pl-5' : 'menu_item mb-5 pl-5'}>
              <Image
                className="menu_image"
                src={Home}
                alt=""
                width={20}
                height={20}
              />
              <p className="menu_text">Report</p>
              <span className="menu_span"></span>
            </li>
          </Link>
          <Link href="/private/product">
            <li className={pathname === '/private/product' ? 'menu_active mb-5 pl-5' : 'menu_item mb-5 pl-5'}>
           
              <BsFillBox2Fill color="white"/>
              <p className="menu_text">Products</p>
              <span className="menu_span"></span>
            </li>
          </Link>
          <Link href="/private/brends">
            <li className={pathname === '/private/brends' ? 'menu_active mb-5 pl-5' : 'menu_item mb-5 pl-5'}>
          
              <TbBrandCodesandbox color="white" style={{ width: '24px', height: '24px' }}/>
              <p className="menu_text">Brends</p>
              <span className="menu_span"></span>
            </li>
          </Link>
          <Link href="/private/catalog">
            <li className={pathname === '/private/catalog' ? 'menu_active mb-5 pl-5' : 'menu_item mb-5 pl-5'}>
       
            <RiPlayListAddLine className="catalog_icon" style={{ width: '24px', height: '24px' }} />
              <p className="menu_text">Catalogs</p>
              <span className="menu_span"></span>
            </li>
          </Link>
          <Link href="/private/category">
            <li className={pathname === '/private/category' ? 'menu_active mb-5 pl-5' : 'menu_item mb-5 pl-5'}>
           <BiSolidCategoryAlt className="catalog_icon" style={{width: '24px', height: '24px' }}/>
              <p className="menu_text">Category</p>
              <span className="menu_span"></span>
            </li>
          </Link>
          <Link href="/private/subcategory">
            <li className={pathname === '/private/subcategory' ? 'menu_active mb-5 pl-5' : 'menu_item mb-5 pl-5'}>
           <MdCategory className="catalog_icon" style={{width: '24px', height: '24px' }}/>
              <p className="menu_text">Subcategory</p>
              <span className="menu_span"></span>
            </li>
          </Link>
          <Link href="/private/discount">
            <li className={pathname === '/private/discount' ? 'menu_active mb-5 pl-5' : 'menu_item mb-5 pl-5'}>
           <TbDiscount2 className="catalog_icon" style={{width: '24px', height: '24px' }}/>
              <p className="menu_text">Discount</p>
              <span className="menu_span"></span>
            </li>
          </Link>
        </div>
      </div>
    </>
  );
}