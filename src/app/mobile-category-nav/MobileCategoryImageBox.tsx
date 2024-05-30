import FlexBox from "@component/FlexBox";
import NextImage from "@component/NextImage";
import Typography from "@component/Typography";
import styled from "styled-components";

// GLOBAL CUSTOM COMPONENTS
import { Image } from "~/components/image";

// STYLED COMPONENT
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledImage = styled(NextImage)`
  border-radius: 5px;
  object-fit: cover;
`;

// ==============================================================
type MobileCategoryImageBoxProps = {
  icon?: string;
  title: string;
  imgUrl?: string;
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
        src={imgUrl ? imgUrl : "https://placehold.co/400"}
        className="aspect-[1.11] h-[80px] w-[80px] self-center object-cover pt-1 group-hover:scale-110"
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
