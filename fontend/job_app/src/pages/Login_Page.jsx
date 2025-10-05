import React, { useState } from "react";
import { Link, NavLink } from 'react-router-dom';

const Login_Page = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-center text-xl font-semibold text-gray-800 mb-6">
          เข้าสู่ระบบสำหรับผู้สมัครงาน
        </h2>

        <form className="space-y-4">
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

          {/* Forgot password */}
          <div className="text-right">
          <NavLink to="/profile" >
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-orange-500 transition"
            >
              
              ลืมรหัสผ่าน
            </a>
          </NavLink>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2.5 rounded-md transition"
          >
            เข้าสู่ระบบ
          </button>

          <div className="text-center mt-6 text-gray-600 text-sm">
          ยังไม่ได้เป็นสมาชิก?{" "}
          <Link
            to="/register"
            className="text-purple-500 hover:text-purple-600 font-medium transition"
          >
            สมัครสมาชิก
          </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login_Page;