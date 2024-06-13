import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";

import { Image } from "~/components/image";

// ==============================================================
type MobileCategoryImageBoxProps = {
  icon?: string;
  title: string;
  imgUrl?: string | null;
};
// ==============================================================

export default function MobileCategoryImageBox({
  title,
  imgUrl,
}: MobileCategoryImageBoxProps) {
  return (
    <FlexBox flexDirection="column" alignItems="center" justifyContent="center">
      <Image
        loading="lazy"
        src={imgUrl}
        className="aspect-[1.11] h-[70px] w-[70px] self-center rounded-lg object-cover pt-1 group-hover:scale-110"
        width={80}
        height={80}
        alt={""}
      />

      <Typography
        className="ellipsis"
        textAlign="center"
        fontSize="11px"
        lineHeight="1"
        mt="0.5rem"
        height="24px"
      >
        {title}
      </Typography>
    </FlexBox>
  );
}
