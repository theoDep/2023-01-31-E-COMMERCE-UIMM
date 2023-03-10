import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

export default ({ itemsTotal, itemsCost, items }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { addToCart, decreaseQuantity } = useCart();
  const handleLogout = async (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };
  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/signin");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/">
          <a className="btn btn-ghost normal-case text-xl">⛫ Hylian Shop</a>
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {itemsTotal ? itemsTotal : 0}
              </span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">
                {itemsTotal ? itemsTotal : 0} Items
              </span>
              {items.map((item) => (
                <>
                  <div className="flex justify-between">
                    <span>
                      {item.attributes.name} x{item.quantity}: {item.subtotal}
                    </span>
                    <span>
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item)}
                      >
                        -
                      </button>{" "}
                      <button type="button" onClick={() => addToCart(item)}>
                        +
                      </button>
                    </span>
                  </div>
                </>
              ))}
              <span className="text-info">
                Subtotal: {itemsCost ? itemsCost : 0} 💎
              </span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://avatarfiles.alphacoders.com/598/thumb-59816.jpg" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              {user ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <button onClick={handleLogin}>Login</button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
