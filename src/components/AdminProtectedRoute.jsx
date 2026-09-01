import { Navigate, Outlet } from "react-router-dom";

export default function AdminProtectedRoute() {
  const adminData = sessionStorage.getItem(
    "munder-main-admin"
  );

  if (!adminData) {
    return (
      <Navigate
        to="/admin-login"
        replace
      />
    );
  }

  try {
    const admin = JSON.parse(adminData);

    if (
      admin.role !== "MAIN_ADMIN"
    ) {
      sessionStorage.removeItem(
        "munder-main-admin"
      );

      return (
        <Navigate
          to="/admin-login"
          replace
        />
      );
    }

    return <Outlet />;
  } catch (error) {
    sessionStorage.removeItem(
      "munder-main-admin"
    );

    return (
      <Navigate
        to="/admin-login"
        replace
      />
    );
  }
}
