import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Mail, LockKeyhole, Eye, EyeOff, ArrowRight } from "lucide-react";

import { getRoleRoute } from "../../../utils/getRoleRoute";

import { useLoginMutation } from "../../../features/auth/authApi";

import { setCredentials } from "../../../features/auth/authSlice";

import { loginSchema } from "../../../features/auth/authSchema";

import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data) => {
    try {
      const response = await login(data).unwrap();

      dispatch(setCredentials(response));

      navigate(getRoleRoute(response.user.role));
    } catch (error) {
      console.error(error);

      setError("root", {
        type: "server",
        message: "Invalid email or password"
      });
    }
  };

  return (
    <>
      {/* TITLE */}

      <div className="auth-form-header">
        <h2>Login to Your Account</h2>

        <p>
          Welcome back! Please enter your credentials to access your account.
        </p>
      </div>

      {/* FORM */}

      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        {/* EMAIL */}

        <div className="form-group">
          <label htmlFor="email">Email</label>

          <div className={`input-wrapper ${errors.email ? "input-error" : ""}`}>
            <Mail className="input-icon" size={21} />

            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
            />
          </div>

          {errors.email && (
            <p className="field-error">{errors.email.message}</p>
          )}
        </div>

        {/* PASSWORD */}

        <div className="form-group">
          <label htmlFor="password">Password</label>

          <div
            className={`input-wrapper ${errors.password ? "input-error" : ""}`}
          >
            <LockKeyhole className="input-icon" size={21} />

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((previous) => !previous)}
            >
              {showPassword ? <EyeOff size={21} /> : <Eye size={21} />}
            </button>
          </div>

          {errors.password && (
            <p className="field-error">{errors.password.message}</p>
          )}
        </div>

        {/* FORGOT PASSWORD */}

        <div className="forgot-password-wrapper">
          <button
            type="button"
            className="forgot-password"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot your password?
          </button>
        </div>

        {/* SERVER ERROR */}

        {errors.root && (
          <div className="server-error">{errors.root.message}</div>
        )}

        {/* LOGIN BUTTON */}

        <button type="submit" className="login-button" disabled={isLoading}>
          <span>{isLoading ? "Logging in..." : "Login"}</span>

          {!isLoading && <ArrowRight size={22} />}
        </button>
      </form>

      {/* REGISTER */}

      <div className="signup-section">
        <span>Don't have an account?</span>

        <button
          type="button"
          className="signup-button"
          onClick={() => navigate("/register")}
        >
          Sign Up
        </button>
      </div>
    </>
  );
}

export default LoginForm;
