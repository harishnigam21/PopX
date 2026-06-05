export default function BouncingLoading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bouncing-loader text-text p-4 m-auto">
        <div className="dot bg-[#6c25ff]"></div>
        <div className="dot bg-[#cebafb]"></div>
        <div className="dot bg-[#00cfff]"></div>
      </div>
    </div>
  );
}
