import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login_Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return form.email.trim() !== "" && form.password.trim() !== "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    console.log("ข้อมูลเข้าสู่ระบบ:", form);

    // ตัวอย่าง: สมมติว่าถ้า email มีคำว่า "hr" จะเข้าไปหน้า HR
    if (form.email.includes("hr")) {
      navigate("/hr");
    } else {
      navigate("/user");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-center text-xl font-semibold text-gray-800 mb-6">
          เข้าสู่ระบบสำหรับผู้สมัครงาน
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="อีเมล"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="รหัสผ่าน"
              value={form.password}
              onChange={handleChange}
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
            <Link
              to="/forgot-password"
              className="text-sm text-gray-500 hover:text-orange-500 transition"
            >
              ลืมรหัสผ่าน
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full py-2.5 rounded-md text-white font-semibold transition ${
              isFormValid()
                ? "bg-purple-500 hover:bg-purple-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
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
