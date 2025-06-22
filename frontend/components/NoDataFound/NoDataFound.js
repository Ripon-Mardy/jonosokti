const NoDataFound = ({ icon, text, subText }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-8 w-full">
      <div className="text-gray-400">{icon}</div>
      <h2 className="text-sm  text-gray-600">{text}</h2>
      <p className="text-xs text-paraColor mt-2">{subText}</p>
    </div>
  );
};

export default NoDataFound;
