import React, { useState } from "react";
import { Link, NavLink } from 'react-router-dom';

const Register_Page = () => {
     const [position, setPosition] = useState("");

     const handleSubmit = (e) => {
       e.preventDefault();
       console.log("ตำแหน่งที่เลือก:", position);
       // ตรงนี้สามารถเพิ่ม logic ส่งข้อมูลไป backend ได้
     };

     const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-center text-xl font-semibold text-gray-800 mb-6">
          สมัครสมาชิกสำหรับผู้สมัครงาน
        </h2>

        <form className="space-y-4">
          {/* ชื่อ-นามสกุล */}
          <div>
            <input
              type="text"
              placeholder="ชื่อ-นามสกุล"
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            />
          </div>
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="อีเมล"
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="รหัสผ่าน"
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? "👁️‍🗨️" : "🙈"}
            </button>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="ยืนยันรหัสผ่าน"
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? "👁️‍🗨️" : "🙈"}
            </button>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">ตำแหน่งที่สมัคร</label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            >
              <option value="">-- เลือกตำแหน่ง --</option>
              <option value="พนักงานบริการ">พนักงานบริการ</option>
              <option value="พนักงานล้างรถ">พนักงานล้างรถ</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2.5 rounded-md transition"
          >
            สมัครสมาชิก
          </button>

          <div className="text-center mt-6 text-gray-600 text-sm">
          มีสมาชิกอยู่แล้ว?{" "}
          <Link
            to="/register"
            className="text-purple-500 hover:text-purple-600 font-medium transition"
          >
            เข้าสู่ระบบ
          </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register_Page;