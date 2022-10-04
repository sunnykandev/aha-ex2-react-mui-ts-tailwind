export default function TagCard({ tagName = "", resultCount = 0 }) {
  return (
    <div className="w-full">
      <div className="flex flex-col rounded-lg bg-white bg-opacity-5 w-full aspect-square">
        <div className="flex-1"></div>
        <div className="max-w-[100%] mx-2.5 mb-3.5 rounded-[10px] border-[5px] border-white text-2xl text-white px-2 py-1 ">
          <div className="overflow-ellipsis whitespace-nowrap overflow-hidden">
            {tagName}
          </div>
        </div>
      </div>
      <div className="text-white text-base mt-2 overflow-ellipsis whitespace-nowrap overflow-hidden">
        {tagName}
      </div>
      <div className="text-[#B2B2B2] text-xs">{resultCount} Results</div>
    </div>
  );
}
