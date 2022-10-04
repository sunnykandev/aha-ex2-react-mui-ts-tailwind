import ImageWithFallback from "../../components/ImageWithFallback";
import { AnimalModel } from "../../../models";

export default function AnimalItem({
  avater = "/images/Image1.svg",
  name = "This is a title",
  username = "by username",
}: AnimalModel) {
  return (
    <div className="mx-1 mb-[40px] md:m-[18px] md:mb-[11px]">
      <ImageWithFallback
        fallbackSrc={"/images/Image1.svg"}
        src={avater}
        alt="animal-image"
        height={130}
        style={{ width: "100%" }}
      />
      <div className="text-white  text-[15px] pt-[22px] md:pt-[14px] pb-[1px]">
        {name}
      </div>
      <div className="text-[#B2B2B2] text-xs">{username}</div>
    </div>
  );
}
