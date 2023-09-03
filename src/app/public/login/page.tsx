"use client";
import Image from "next/image";
import loginimage from "../../../../public/images/login.jpg";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";


export default function Login() {

 

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 

  const hendleSubmit = (e: any) => {
    e.preventDefault();
    // Kirishni tekshirish logikasini yozing
    const emailDB = "admin@gmail.com";
    const passwordDB = "admin";

    if (email === emailDB && password === passwordDB) {
      localStorage.setItem("password", password);
      localStorage.setItem("email", email);
      router.push("/private/report");
    } else {
      router.push("/public/login");
      alert("Siz admin emassiz  yoki xato ko'de");
    }
  };

  return (
    <div className="flex flex-col ml-42 mr-auto bg-wihte items-center md:flex-row md:h-screen">
      <div className="flex items-center justify-center w-full md:w-1/2 mr-12 ">
        <Image src={loginimage} alt="Login Image" width={1000} height={800} />
      </div>
      <div className="flex flex-col items-center p-8 w-72 justify-center rounded-lg border-2 border-sky  w-full md:w-1/4">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-2xl font-bold">Welcome admin!</h1>
            <p className="mt-2 text-gray-600">Please sign in to admin page</p>
          </div>
          <form onSubmit={hendleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block font-bold text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block font-bold text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// const token = localStorage.getItem('username')
// const password1 = localStorage.getItem('password')

// console.log(token,password1);

//   return (
//     <div>
//       <h1>Login Page</h1>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={Login}>Login</button>
//     </div>
//   );
// }
