import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import { FaPenNib } from "react-icons/fa6";

const LatestBlog = () => {
  const blogs = [
    {
      id: 1,
      image: "/blogimage1.png",
      blogger: "Saber Ali",
      date: "August 21, 2020",
      title: "Top essential Trends in 2021",
      description:
        "More off this less hello samlande lied much over tightly circa horse taped mightly",
    },
    {
      id: 2,
      image: "/blogimage2.png",
      blogger: "Surfauxion",
      date: "August 21, 2020",
      title: "Tips for Modern Living",
      description:
        "Learn essential tips to optimize your living space and bring modern aesthetics to life.",
    },
    {
      id: 3,
      image: "/blogimage3.png",
      blogger: "Alex Johnson",
      date: "August 21, 2020",
      title: "Creating Cozy Spaces",
      description:
        "More off this less hello samlande lied much over tightly circa horse taped mightly",
    },
  ];

  return (
    <div className="py-12 bg-white max-w-7xl mx-auto px-4 sm:px-6">
      {/* Section Title */}
      <h1 className="text-3xl font-bold text-center text-[#151875] mb-8">
        Leatest Blog
      </h1>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden w-[300px] h-[380px] mx-auto transition-transform transform hover:scale-105"
          >
            {/* Blog Image */}
            <div className="h-[200px] w-full overflow-hidden">
              <Image
                src={blog.image}
                alt={blog.title}
                width={280}
                height={160}
                objectFit="cover"
                className="w-full h-full"
              />
            </div>

            {/* Blog Content */}
            <div className="p-4">
              {/* Blogger Info */}
              <div className="flex items-center text-gray-700 text-xs mb-2">
                <span className="flex items-center mr-4">
                  <FaPenNib className="mr-1 text-red-600" />
                  {blog.blogger}
                </span>
                <span className="flex items-center">
                  <FaCalendarAlt className="text-yellow-500 mr-1" />
                  {blog.date}
                </span>
              </div>

              {/* Blog Title */}
              <h2
                className={`text-sm font-bold mb-2 ${
                  blog.id === 2 ? "text-pink-500" : "text-[#151875]"
                }`}
              >
                {blog.title}
              </h2>

              {/* Blog Description */}
              <p className="text-gray-400 text-xs mb-4">{blog.description}</p>

              {/* Read More Button */}
              <button
                className={`px-1 py-1 text-sm border-b-2 transition ${
                  blog.id === 2
                    ? "text-pink-500 hover:text-pink-600 border-pink-500"
                    : "text-[#151875] hover:text-[#1e2a8a] border-[#151875]"
                }`}
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBlog;
