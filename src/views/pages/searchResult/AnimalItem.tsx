import ImageWithFallback from "../../components/ImageWithFallback";

export default function AnimalItem({
  imgsrc = "",
  title = "This is a title",
  username = "by username",
}) {
  return (
    <div className="mx-1 mb-[40px] md:m-[18px] md:mb-[11px]">
      <ImageWithFallback
        fallbackSrc={"/images/Image1.svg"}
        src={imgsrc}
        alt="animal-image"
        height={130}
        style={{ width: "100%" }}
      />
      <div className="text-white  text-[15px] pt-[22px] md:pt-[14px] pb-[1px]">
        {title}
      </div>
      <div className="text-[#B2B2B2] text-xs">{username}</div>
    </div>
  );
}
