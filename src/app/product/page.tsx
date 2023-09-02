"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import search from "../../../public/images/search.svg";
import "./product.css";
import axios from "axios";
import Link from "next/link";
import { MdDeleteSweep } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";

interface RefType {
  current: HTMLDivElement | null;
}

//Function

export default function Products(): JSX.Element {
  const [brend, setBrend] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [categori, setCategori] = useState([]);
  const [subcategori, setSubcategori] = useState([]);
  const [product, setProduct] = useState([]);
  const [productId, setProductId] = useState([]);
  const [modal, setModal] = useState("hidden");

  const renderTitle = (title: string) => {
    if (title.length > 30) {
      return title.substring(0, 30) + "...";
    }
    return title;
  };

  const files = useRef<any>(null);
  const title = useRef<any>(null);
  const title1 = useRef<any>(null);
  const amount = useRef<any>(null);
  const price = useRef<any>(null);
  const productInfo = useRef<any>(null);
  const brendId = useRef<any>(1);
  const catalogId = useRef<any>(null);
  const categoriesId = useRef<any>(null);
  const description = useRef<any>(null);
  const subcategoryId = useRef<any>(null);

  //Get
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch("http://157.230.2.35/api/brand");
        const data1 = await response1.json();
        setBrend(data1.data);
        const response2 = await fetch("http://157.230.2.35/api/catalog");
        const data2 = await response2.json();
        setCatalog(data2.data);
        const response3 = await fetch("http://157.230.2.35/api/category");
        const data3 = await response3.json();
        setCategori(data3.data);

        const response4 = await fetch("http://157.230.2.35/api/subcategory");
        const data4 = await response4.json();
        setSubcategori(data4.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const myfuns = async () => {
      const response5 = await fetch("http://157.230.2.35/api/product");
      const data5 = await response5.json();
      setProduct(data5);
    };
    myfuns();
  }, []);
  // useEffect(() => {
  //   const myfuns = async () => {

  //   };
  //   myfuns();
  // }, []);

  console.log(brend);

  //Post
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log(files.current.files[0]);
    console.log(title.current);

    console.log("salom");

    //     const hendlepic = async () => {
    //       const formData = new FormData();
    //       formData.append("file", files.current?.files[0]);
    //       try {
    //         const response = await axios.post(
    //           "http://157.230.2.35/api/file",
    //           formData
    //         );
    //         const data = response.data;
    // console.log(data.error);

    //         // const productInfos = productInfo.current.value;
    //         const datas = {
    //           product_image: data,
    //           title: title.current.value,
    //           product_count: +amount.current.value,
    //           price: +price.current.value,
    //           product_info:productInfo.current.value,
    //           brand_id: +brendId.current.value,
    //           catalog_id: +catalogId.current.value,
    //           category_id: +categoriesId.current.value,
    //           description: description.current.value,
    //           subcategory_id: +subcategoryId.current.value,
    //         };

    //         console.log(datas);

    //         fetch("http://157.230.2.35/api/product", {
    //           method: "POST",
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify(datas),
    //         })
    //           .then((res) => res.json())
    //           .then((data) => {
    //             if (data.errors) {
    //               console.log(data.errors);
    //             } else {
    //               console.log(data);
    //             }

    //             setProduct(data);
    //           });
    //       } catch (error) {
    //         console.error(error);
    //       }
    //     };

    // hendlepic();
  };

  //Delete
  const handleDeleteProduct = (index: number) => {
    fetch(`http://157.230.2.35/api/product/${index}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.errors) {
          console.log(data.errors);
        } else {
          console.log(data);
          const response5 = await fetch("http://157.230.2.35/api/product");
          const data5 = await response5.json();
          setProduct(data5);
        }
      });
    console.log(index);
  };

  //Modal

  const handleModal = () => {
    setModal("hidden");
  };

  const hendlEdit = () => {
    setModal("block");
  };

  console.log(product);

  return (
    <>
      <div className="container ">
        <div>
          <h1 className="header fount p-5">Products</h1>
        </div>
        <div className="body_Wrapper">
          <form className="pl-8 mb-20 p-8" onSubmit={handleSubmit}>
            <h2 className="form_title fount mb-8">Add new products</h2>
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
                <label className="block">Picture </label>
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
                <label className="block">Price</label>
                <input
                  ref={price}
                  type="number"
                  className="w-80 p-3 rounded-lg focus:outline-none focus:ring"
                  placeholder="Narxi"
                />
              </li>
            </ol>
            <ol className="flex items-center justify-between mb-8">
              <li>
                <label className="block">Amount</label>
                <input
                  ref={amount}
                  type="number"
                  className="w-80 p-3 rounded-lg focus:outline-none focus:ring"
                  placeholder="Miqdori"
                />
              </li>
              <li>
                <label className="block">ProductInfo</label>

                <input
                  ref={productInfo}
                  onClick={() => {}}
                  className="w-80 p-3 rounded-lg focus:outline-none focus:ring"
                  placeholder="Mahsulot malumotlari"
                />
              </li>

              <li>
                <label className="block">Brend</label>
                <select
                  ref={brendId}
                  typeof="number"
                  className="hidden_pleceholder w-80 p-3 rounded-lg focus:outline-none focus:ring"
                >
                  {brend.map((el: any) => (
                    <option typeof="number" value={+el.id}>
                      {el.brand_name}
                    </option>
                  ))}
                </select>
              </li>
            </ol>
            <ol className="flex items-center justify-between mb-8">
              <li>
                <label className="block">Catalog</label>
                <select
                  ref={catalogId}
                  className="hidden_pleceholder w-80 p-3 rounded-lg focus:outline-none focus:ring"
                >
                  <option value="" disabled hidden>
                    Ona-tili
                  </option>
                  {catalog.map((el: any) => (
                    <option value={el.id}>{el.catalog_name}</option>
                  ))}
                </select>
              </li>
              <li>
                <label className="block">Categori</label>
                <select
                  ref={categoriesId}
                  className="hidden_pleceholder w-80 p-3 rounded-lg focus:outline-none focus:ring"
                >
                  <option value="" disabled hidden>
                    Ona-tili
                  </option>
                  {categori.map((el: any) => (
                    <option value={el.id}>{el.category_name}</option>
                  ))}
                </select>
              </li>
              <li>
                <label className="block">Subcategory</label>

                <select
                  ref={subcategoryId}
                  className="hidden_pleceholder w-80 p-3 rounded-lg focus:outline-none focus:ring"
                >
                  <option value="" disabled hidden></option>
                  {subcategori.map((el: any) => (
                    <option value={el.id}>{el.subcategory_name}</option>
                  ))}
                </select>
              </li>
            </ol>
            <div className="flex items-end">
              <div className="">
                <label className="block">Description</label>
                <textarea
                  ref={description}
                  value="Matn qiymati"
                  className="hidden_pleceholder w-80 p-3 rounded-lg focus:outline-none focus:ring"
                  id="story"
                  name="story"
                  rows={3}
                  cols={33}
                />
              </div>
              <button
                className="submit h-12 bg_fount text-center rounded-lg"
                type="submit"
              >
                Qo’shish
              </button>
            </div>
          </form>

          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="form_title fount pl-8">Our products</h2>
            </div>
            <hr className="border-2 bg_fount" />
            {/* ========== */}

            {/* product */}
            <ol className="m-0 p-0  flex flex-wrap gap-5 ">
              {product.map((el: any) => (
                <li className="list_item  max-w-[250px] min-w-[250px] border mt-8 rounded-xl bg-white drop-shadow-lg ">
                  <Image
                    className="inline w-full h-[250px]  rounded-xl p-1"
                    src={`http://157.230.2.35//${el.product_image}`}
                    alt=""
                    width="200"
                    height="300"
                  />

                  <div className=" p-3">
                    <p className="text-sm max-w-[200px] font-bold pl-1 ">
                      {renderTitle(el.title)}
                    </p>
                    <p className="text-sm font-bold pl-1  mb-8">
                      {el.price} so'm
                    </p>

                    <div className="flex items-center ml-auto">
                      <button
                        onClick={() => {
                          hendlEdit();
                        }}
                        className=" flex bg_fount text-white rounded-lg   border-2 p-2 mr-2"
                      >
                        <BiSolidEditAlt
                          color="yellow"
                          style={{ width: "24px", height: "24px" }}
                        />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(el.id)}
                        className="flex bg_fount text-white rounded-lg  bg-red border-2 p-2"
                      >
                        <MdDeleteSweep
                          style={{
                            color: "red",
                            width: "24px",
                            height: "24px",
                          }}
                        />
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Modal */}
        <div className={`border-black madal ${modal}`}>
          <button
            onClick={() => handleModal()}
            className="madal_button ml-auto block border-5 border-blue"
            type="button"
          >
            x
          </button>

          <form className="pl-8 mb-4 p-2" onSubmit={handleSubmit}>
            <h2 className="form_title fount mb-4">Edit products</h2>
            <ol className="flex items-center justify-between mb-4">
              <li>
                <label className="block fount mb-1">Title</label>
                <input
                  ref={title1}
                  type="text"
                  className="w-64 p-3 rounded-lg focus:outline-none focus:ring"
                  placeholder="Title"
                />
              </li>
              <li>
                <label className="block fount mb-1">Picture </label>
                <input
                  ref={files}
                  // onChange={handleFileChange}
                  className="w-64 p-3 rounded-lg focus:outline-none focus:ring file:mr-4 file:py-0 file:px-2
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-800
      hover:file:bg-violet-100"
                  placeholder="download"
                  type="file"
                />
              </li>

              <li>
                <label className="block fount mb-1">Price</label>
                <input
                  ref={price}
                  type="number"
                  className="w-64 p-3 rounded-lg focus:outline-none focus:ring"
                  placeholder="Price"
                />
              </li>
            </ol>
            <ol className="flex items-center justify-between mb-4">
              <li>
                <label className="block fount mb-1">Amount</label>
                <input
                  ref={amount}
                  type="number"
                  className="w-50 p-3 rounded-lg focus:outline-none focus:ring"
                  placeholder="Amount"
                />
              </li>
              <li>
                <label className="block fount mb-1">ProductInfo</label>

                <input
                  ref={productInfo}
                  onClick={() => {}}
                  className="w-62 p-3 rounded-lg focus:outline-none focus:ring"
                  placeholder="ProductInfo"
                />
              </li>

              <li>
                <label className="block fount">Brend</label>
                <select
                  ref={brendId}
                  typeof="number"
                  className="hidden_pleceholder w-64 p-3 rounded-lg focus:outline-none focus:ring"
                >
                  {brend.map((el: any) => (
                    <option typeof="number" value={+el.id}>
                      {el.brand_name}
                    </option>
                  ))}
                </select>
              </li>
            </ol>
            <ol className="flex items-center justify-between mb-4">
              <li>
                <label className="block fount mb-1">Catalog</label>
                <select
                  ref={catalogId}
                  className="hidden_pleceholder w-64 p-3 rounded-lg focus:outline-none focus:ring"
                >
                  <option value="" disabled hidden>
                    Ona-tili
                  </option>
                  {catalog.map((el: any) => (
                    <option value={el.id}>{el.catalog_name}</option>
                  ))}
                </select>
              </li>
              <li>
                <label className="block fount mb-1">Categori</label>
                <select
                  ref={categoriesId}
                  className="hidden_pleceholder w-64 p-3 rounded-lg focus:outline-none focus:ring"
                >
                  <option value="" disabled hidden>
                    Ona-tili
                  </option>
                  {categori.map((el: any) => (
                    <option value={el.id}>{el.category_name}</option>
                  ))}
                </select>
              </li>
              <li>
                <label className="block fount mb-1">Subcategory</label>

                <select
                  ref={subcategoryId}
                  className="hidden_pleceholder w-64 p-3 rounded-lg focus:outline-none focus:ring"
                >
                  <option value="" disabled hidden></option>
                  {subcategori.map((el: any) => (
                    <option value={el.id}>{el.subcategory_name}</option>
                  ))}
                </select>
              </li>
            </ol>
            <div className="flex items-end">
              <div className="">
                <label className="block fount mb-1">Description</label>
                <textarea
                  ref={description}
                  className="hidden_pleceholder w-62 p-3 rounded-lg focus:outline-none focus:ring"
                  id="story"
                  name="story"
                  rows={3}
                  cols={33}
                  placeholder="Description"
                />
              </div>
              <button
                className="submit h-12 bg_fount text-center rounded-lg"
                type="submit"
              >
                Qo’shish
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
