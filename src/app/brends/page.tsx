"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import search from "../../../public/images/search.svg";
import "../product/product.css";
import axios from 'axios';

interface RefType {
  current: HTMLDivElement | null;
}

export default function Products(): JSX.Element {
  const [catalog, setCatalog] = useState([]);
  const [subcategori, setSubcategori] = useState([]);
  const [pic, setPic] = useState([]);

  const [product, setProduct] = useState([]);

  const files = useRef<any>(null);
  const title = useRef<any>(null);
  const catalogId = useRef<any>(null);
  const subcategoryId = useRef<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
   
        const response2 = await fetch("http://157.230.2.35/api/catalogs");
        const data2 = await response2.json();
        setCatalog(data2);
 

        const response4 = await fetch( "http://157.230.2.35/api/subcategories");
        const data4 = await response4.json();
        setSubcategori(data4);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit =  (e: any) => {
    e.preventDefault();
    
    // console.log(files.current.files[0].name);
    
    const hendlepic = async () => {
      try {
        const formData = new FormData();
        formData.append("file", files.current?.files[0]);
        const response = await axios.post("http://157.230.2.35/api/file", formData);
        const data = response.data;
        const datas = {
          image: data.name,
          brand_name: title.current.value,
          catalogId: +catalogId.current.value,
          subcategoryId: +subcategoryId.current.value,
        };
        console.log(datas);

         fetch("http://157.230.2.35/api/brand", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datas),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          console.log(data.errors);
        } else {
          console.log(data);
        }
        setProduct(data);
      });
      
      } catch (error) {
        console.error(error);
      }
    };
    
    hendlepic();
  };

  return (
    <>
      <div className="container">
        <div>
          <h1 className="header fount p-5">Brends</h1>
        </div>
        <div className="body_Wrapper">
          <form className="pl-8 mb-20 p-8" onSubmit={handleSubmit}>
            <h2 className="form_title fount mb-8">Add new brends</h2>
            <ol className="flex items-center justify-between mb-8">
              <li>
                <label className="block fount">Title</label>
                <input
                  ref={title}
                  type="text"
                  className="w-80 p-3 rounded-lg focus:outline-none focus:ring"
                  placeholder="Title"
                />
              </li>
              <li>
                <label className="block fount">Picture </label>
                <input
                  ref={files}
                  // onChange={handleFileChange}
                  className="w-80 p-3 rounded-lg focus:outline-none focus:ring file:mr-4 file:py-0 file:px-2
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-800
      hover:file:bg-violet-100"
                  placeholder="Yuklash"
                  type="file"
                />
              </li>

              <li>
                <label className="block fount">Catalog</label>
                <select
                  ref={catalogId}
                  className="hidden_pleceholder w-80 p-3 rounded-lg focus:outline-none focus:ring"
                >
                  <option value="" disabled hidden>
                    Catalog
                  </option>
                  {catalog.map((el: any) => (
                    <option value={el.id}>{el.catalogName}</option>
                  ))}
                </select>
              </li>
            </ol>

            <ol className="flex items-center justify-between mb-8">
              <li>
                <label className="block fount">Subcategory</label>

                <select
                  ref={subcategoryId}
                  className="hidden_pleceholder w-80 p-3 rounded-lg focus:outline-none focus:ring"
                >
                  <option value="" disabled hidden>
                  Subcategory
                  </option>
                  {subcategori.map((el: any) => (
                    <option value={el.id}>{el.name}</option>
                  ))}
                </select>
              </li>
              <div className="mt-auto">
                <button
                  className="submit h-12 bg_fount text-center rounded-lg"
                  type="submit"
                >
                  Qo’shish
                </button>
              </div>
            </ol>
          </form>
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="form_title pl-8">Bizning o’quvchilar</h2>
              <div className="search pl-4 w-80 rounded-lg">
                <Image
                  className="inline"
                  src={search}
                  alt=""
                  width={18}
                  height={18}
                />
                <input
                  className="inline border-none pt-2 pb-2 w-64"
                  type="input"
                  placeholder="Search"
                />
              </div>
            </div>
            <ol className="m-0 p-0">
              <li className="sidebar flex items-center justify-between p-4">
                <p className="sidebar_text">№</p>
                <p className="sidebar_text1">O’quvchi ismi</p>
                <p className="sidebar_text">Telefon nomer</p>
                <p className="sidebar_text">Yo’nalish</p>
                <p className="sidebar_text">Ota-ona(F.I.SH)</p>
                <p className="sidebar_text">Ota-ona (Tel)</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
