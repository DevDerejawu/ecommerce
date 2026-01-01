import { NavLink } from "react-router-dom";

function FeaturedTabs() {
  const featuredNavTabs = [
    { name: "New Arrival", path: "/new_arrival_products" },
    { name: "Best Selling", path: "/top_selling_products" },
    { name: "Top Rated", path: "/top_rated_products" },
    { name: "Cheap Products", path: "/cheap_products" },
    { name: "Featured Products", path: "/featured_products" },
  ];

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-center font-semibold text-2xl">Featured Products</h2>
      <div className="flex flex-wrap gap-x-6 my-5 mx-auto px-3">
        {featuredNavTabs.map(({ name, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `cursor-pointer pb-2 hover:text-green-500 ${
                isActive ? "border-b-2 border-blue-500 text-blue-500" : ""
              }`
            }
          >
            {name}
          </NavLink>
        ))}
      </div>
    </section>
  );
}

export default FeaturedTabs;
