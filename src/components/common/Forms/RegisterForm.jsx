import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  CalendarDays,
  Phone,
  Droplets,
  ChevronDown,
  ArrowRight,
  Mars,
  Venus
} from "lucide-react";

import { registerSchema } from "../../../features/auth/authSchema";
import { useRegisterMutation } from "../../../features/patient/patientApi";

import "./RegisterForm.css";

function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [registerPatient, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      phone: "",
      gender: "",
      bloodType: ""
    }
  });
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  console.log("PASSWORD:", password);
  console.log("CONFIRM PASSWORD:", confirmPassword);
  const passwordMatch =
    confirmPassword.length > 0 && password === confirmPassword;
  const passwordMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  // =========================================================
  // SUBMIT
  // =========================================================

  const onSubmit = async (data) => {
    try {
      /*
       * confirmPassword sert uniquement
       * à la validation frontend.
       *
       * Il ne doit pas être envoyé au backend.
       */

      const { confirmPassword, ...formData } = data;

      const payload = {
        ...formData,
        role: "PATIENT"
      };

      await registerPatient(payload).unwrap();

      // Compte créé avec succès
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);

      const message =
        error?.data?.message ||
        error?.data?.error ||
        "Unable to create your account. Please try again.";

      setError("root", {
        type: "server",
        message
      });
    }
  };

  return (
    <div className="register-form-container">
      {/* =========================
          HEADER
      ========================= */}

      <div className="register-header">
        <h2>Create Patient Account</h2>

        <p>Enter your information to create your account.</p>
      </div>

      {/* =========================
          FORM
      ========================= */}

      <form
        className="register-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* =========================
            USERNAME + EMAIL
        ========================= */}

        <div className="register-form-row">
          {/* USERNAME */}

          <div className="form-group">
            <label htmlFor="username">Username</label>

            <div
              className={`input-wrapper ${
                errors.username ? "input-error" : ""
              }`}
            >
              <UserRound size={20} className="input-icon" />

              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                autoComplete="username"
                {...register("username")}
              />
            </div>

            {errors.username && (
              <span className="form-error">{errors.username.message}</span>
            )}
          </div>

          {/* EMAIL */}

          <div className="form-group">
            <label htmlFor="email">Email</label>

            <div
              className={`input-wrapper ${errors.email ? "input-error" : ""}`}
            >
              <Mail size={20} className="input-icon" />

              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                autoComplete="email"
                {...register("email")}
              />
            </div>

            {errors.email && (
              <span className="form-error">{errors.email.message}</span>
            )}
          </div>
        </div>

        {/* =========================
            PASSWORD
        ========================= */}

        <div className="form-group">
          <label htmlFor="password">Password</label>

          <div
            className={`input-wrapper ${errors.password ? "input-error" : ""}`}
          >
            <LockKeyhole size={20} className="input-icon" />

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              autoComplete="new-password"
              {...register("password")}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {errors.password && (
            <span className="form-error">{errors.password.message}</span>
          )}
        </div>

        {/* =========================
            CONFIRM PASSWORD
        ========================= */}

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>

          <div
            className={`input-wrapper ${
              errors.confirmPassword ? "input-error" : ""
            }`}
          >
            <LockKeyhole size={20} className="input-icon" />

            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              autoComplete="new-password"
              {...register("confirmPassword")}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {passwordMismatch && (
            <span className="form-error">Passwords do not match.</span>
          )}
          {errors.confirmPassword && (
            <span className="form-error">{errors.confirmPassword.message}</span>
          )}
        </div>

        {/* =========================
            DATE OF BIRTH + PHONE
        ========================= */}

        <div className="register-form-row">
          {/* DATE OF BIRTH */}

          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>

            <div
              className={`input-wrapper ${
                errors.dateOfBirth ? "input-error" : ""
              }`}
            >
              <CalendarDays size={20} className="input-icon" />

              <input
                id="dateOfBirth"
                type="date"
                max={new Date().toISOString().split("T")[0]}
                {...register("dateOfBirth")}
              />
            </div>

            {errors.dateOfBirth && (
              <span className="form-error">{errors.dateOfBirth.message}</span>
            )}
          </div>

          {/* PHONE */}

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>

            <div
              className={`phone-input-wrapper ${
                errors.phone ? "input-error" : ""
              }`}
            >
              <div className="phone-country">
                <Phone size={19} />

                <span>+212</span>

                <ChevronDown size={16} />
              </div>

              <input
                id="phone"
                type="tel"
                placeholder="6 12 34 56 78"
                autoComplete="tel"
                {...register("phone")}
              />
            </div>

            {errors.phone && (
              <span className="form-error">{errors.phone.message}</span>
            )}
          </div>
        </div>

        {/* =========================
            GENDER
        ========================= */}

        <div className="form-group gender-group">
          <label>Gender</label>

          <div className="gender-options">
            {/* MALE */}

            <label className="gender-option">
              <input type="radio" value="MALE" {...register("gender")} />

              <span className="custom-radio">
                <span />
              </span>

              <Mars size={24} />

              <span>Male</span>
            </label>

            {/* FEMALE */}

            <label className="gender-option">
              <input type="radio" value="FEMALE" {...register("gender")} />

              <span className="custom-radio">
                <span />
              </span>

              <Venus size={24} />

              <span>Female</span>
            </label>
          </div>

          {errors.gender && (
            <span className="form-error">{errors.gender.message}</span>
          )}
        </div>

        {/* =========================
            BLOOD TYPE
        ========================= */}

        <div className="form-group">
          <label htmlFor="bloodType">Blood Type</label>

          <div
            className={`select-wrapper ${
              errors.bloodType ? "input-error" : ""
            }`}
          >
            <Droplets size={21} className="input-icon" />

            <select id="bloodType" {...register("bloodType")} defaultValue="">
              <option value="" disabled>
                Select your blood type
              </option>

              <option value="A_POSITIVE">A+</option>

              <option value="A_NEGATIVE">A-</option>

              <option value="B_POSITIVE">B+</option>

              <option value="B_NEGATIVE">B-</option>

              <option value="AB_POSITIVE">AB+</option>

              <option value="AB_NEGATIVE">AB-</option>

              <option value="O_POSITIVE">O+</option>

              <option value="O_NEGATIVE">O-</option>
            </select>

            <ChevronDown size={20} className="select-arrow" />
          </div>

          {errors.bloodType && (
            <span className="form-error">{errors.bloodType.message}</span>
          )}
        </div>

        {/* =========================
            SERVER ERROR
        ========================= */}

        {errors.root && (
          <div className="server-error">{errors.root.message}</div>
        )}

        {/* =========================
            CREATE ACCOUNT
        ========================= */}

        <button
          type="submit"
          className="register-submit-button"
          disabled={isLoading}
        >
          <span>{isLoading ? "Creating account..." : "Create Account"}</span>

          {!isLoading && <ArrowRight size={22} />}
        </button>

        {/* =========================
            LOGIN
        ========================= */}

        <div className="login-section">
          <span>Already have an account?</span>

          <button
            type="button"
            className="login-link"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
