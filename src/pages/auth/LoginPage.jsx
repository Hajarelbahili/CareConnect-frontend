import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getRoleRoute } from "../../utils/getRoleRoute";
import { useLoginMutation } from "../../features/auth/authApi";
import { setCredentials } from "../../features/auth/authSlice";
import { loginSchema } from "../../features/auth/authSchema";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    console.log("DATA SENT TO API:", data);
    try {
      const response = await login(data).unwrap();
      console.log("DATA response TO API:", response);
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
    <div>
      <h1>Connexion</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" placeholder="Email" {...register("email")} />

        {errors.email && <p>{errors.email.message}</p>}

        <br />
        <br />

        <input
          type="password"
          placeholder="Mot de passe"
          {...register("password")}
        />

        {errors.password && <p>{errors.password.message}</p>}

        <br />
        <br />
        {errors.root && <p>{errors.root.message}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Connexion..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
