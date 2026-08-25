import { Link } from "react-router-dom";
import { ArrowRight, FileText, ShoppingBag } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import "./dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <Navbar />

      <main className="dashboard__main">
        <div className="dashboard__container">
          <section className="dashboard__welcome">
            <span>Customer Dashboard</span>

            <h1>
              Welcome, {user?.firstName || "Customer"}
            </h1>

            <p>
              Manage your scans, orders and reports from
              one place.
            </p>
          </section>

          <section className="dashboard__grid">
            <article className="dashboard-card">
              <div className="dashboard-card__icon">
                <ShoppingBag size={22} />
              </div>

              <h2>My Orders</h2>

              <p>
                View your scan purchases and order status.
              </p>

              <Link to="/dashboard/orders">
                View Orders
                <ArrowRight size={18} />
              </Link>
            </article>

            <article className="dashboard-card">
              <div className="dashboard-card__icon">
                <FileText size={22} />
              </div>

              <h2>My Reports</h2>

              <p>
                Access your completed scan reports.
              </p>

              <Link to="/dashboard/reports">
                View Reports
                <ArrowRight size={18} />
              </Link>
            </article>
          </section>

          <section className="dashboard__profile">
            <div>
              <span>Account</span>

              <h2>Profile Information</h2>
            </div>

            <div className="profile-info">
              <div>
                <span>Name</span>
                <strong>
                  {user?.firstName || "-"}
                </strong>
              </div>

              <div>
                <span>Email</span>
                <strong>
                  {user?.email || "-"}
                </strong>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;