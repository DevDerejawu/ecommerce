import { Truck, ShieldCheck, RefreshCcw, Headphones } from "lucide-react";
function BannerSectionWithServices() {
  const services = [
    {
      title: "Free Shipping",
      description: "Free shipping is available based on delivery date.",
      icon: Truck,
    },
    {
      title: "Secure Payment",
      description: "100% secure payment system.",
      icon: ShieldCheck,
    },
    {
      title: "100% Money Back",
      description: "30 days money back guarantee.",
      icon: RefreshCcw,
    },
    {
      title: "Online Support",
      description: "24/7 customer support available.",
      icon: Headphones,
    },
  ];

  const banners = [
    {
      heading: "Latest Electronic Gadget, discount: Up to 50% off",
      imageUrl: "https://loremflickr.com/300/300/product?lock=10",
    },
    {
      heading: "Latest Women's Fassion, discount: Up to 70% off",
      imageUrl: "https://loremflickr.com/300/300/product?lock=11",
    },
  ];
  return (
    <section className="flex flex-col gap-4 items-center justify-center">
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {services.map(({ title, description, icon: Icon }) => (
          <div key={title} className="flex items-start gap-3">
            <Icon className="h-8 w-8 text-blue-600" />

            <div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-2 items-center justify-center gap-4 my-5">
        {banners.map(({ heading, imageUrl, discount }) => (
          <section
            key={heading + imageUrl}
            className="group relative rounded-xl bg-gray-100 p-8"
          >
            {/* Left content */}
            <div className="flex-1 z-10 absolute left-0 top-1 right-auto">
              <h2 className="text-2xl font-bold">{heading}</h2>
              <p className="mt-2 text-gray-600 word-break">{discount}</p>

              <button className="mt-4 inline-block rounded bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700">
                Shop Now
              </button>
            </div>

            <img
              src={imageUrl}
              alt="Banner image"
              className="
        w-full max-w-sm mx-auto
        transform transition-all duration-500
        group-hover:translate-x-6 group-hover:scale-105
      "
            />
          </section>
        ))}
      </section>
    </section>
  );
}

export default BannerSectionWithServices;
