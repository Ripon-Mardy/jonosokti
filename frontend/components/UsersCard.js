
import customProfile from "@/public/images/profile.jpg";
import Link from "next/link";
import Image from "next/image";
import userImage from "@/public/images/user.png";
import varified from "@/public/images/verify-badge.png";
import {
  MapPin,
  CircleDollarSign,
  Clock10,
  CircleCheck,
  MessageSquareMore,
} from "lucide-react";
import { FaStar } from "react-icons/fa6";

const UsersCard = ({user}) => {

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-3">
        <div>
          {/* image content  */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Image + Badge */}
            <div className="relative w-16 h-16 rounded-full">
              <Image
                src={userImage}
                alt="user image"
                className="rounded-full object-cover"
                fill
              />
              <Image
                src={varified}
                alt="verified"
                className="w-5 h-5 absolute -right-1 -top-1"
              />
            </div>

            {/* Text Info */}
            <div className="flex flex-col">
              <h2 className="text-textHeadingColor font-bold text-base truncate w-[200px]">
                {user?.first_name} {user?.last_name}
              </h2>
              <h3 className="text-textBannerColor text-sm font-semibold">
                Emergency Plumbing
              </h3>
              <span className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                <FaStar className="w-4 h-4 text-yellow-500" /> 4.9 (47 reviews)
              </span>
            </div>
          </div>

          {/* details  */}
          <div className="mt-4 space-y-3">
            <span className="flex items-center justify-start gap-2 text-xs text-gray-600">
              <MapPin className="w-3 h-3" /> Dhanmondi, Dhaka
            </span>
            <span className="flex items-center justify-start gap-2 text-xs text-gray-600">
              <CircleDollarSign className="w-3 h-3" /> ৳800/hour
            </span>
            <span className="flex items-center justify-start gap-2 text-xs text-gray-600">
              <Clock10 className="w-3 h-3" /> Responds in 30 mins 
            </span>
            <span className="flex items-center justify-start gap-2 text-xs text-gray-600">
              <CircleCheck className="w-3 h-3" /> 234 jobs completed
            </span>
          </div>

          {/* services  */}
          <div className="mt-4">
            <span className="text-sm text-gray-600 font-medium">Services:</span>
            <div className="space-x-1">
              {["Pipe Repair", "Leak Fixing", "Drain Cleaning"].slice(0,3).map((service, index) => (
                <span key={index} className="bg-blue-100 px-2 text-xs rounded-md text-blue-700 p-0.5">
                {service}
              </span>
              ))}
              <span className="text-xs text-gray-600  bg-gray-200 px-2 rounded-full"> {["Pipe Repair", "Leak Fixing", "Drain Cleaning", "Washing", 'plumber'].length - 3} + more </span>
            </div>
          </div>
          {/* hire now  */}
          <div className="mt-4 flex gap-3 items-center justify-center">
            <Link href={`/in/profile/${user?._id}`} className=" btn w-full">Hire Now</Link>
            {/* <button className="w-1/2 flex items-center justify-center border border-gray-300 py-2 rounded-full text-gray-600">
              <MessageSquareMore className="w-5 h-5" />
            </button> */}
          </div>


        </div>
      </div>
    </>
  );
};

export default UsersCard;
