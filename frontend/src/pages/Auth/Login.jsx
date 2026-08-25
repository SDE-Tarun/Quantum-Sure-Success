import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

import "./auth.css";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await loginUser(form);

      login(response.data);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-card__heading">
          <span>Quantum Sure Success</span>

          <h1>Welcome back</h1>

          <p>
            Login to continue to your account.
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          <div className="form-field">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="button button--primary"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-card__footer">
          Don't have an account?{" "}
          <Link to="/register">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;