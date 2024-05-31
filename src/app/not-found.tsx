"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@component/buttons";
import FlexBox from "@component/FlexBox";

import { Image } from "~/components/image";

export default function NotFound() {
  const router = useRouter();
  const handleGoBack = () => router.back();

  return (
    <FlexBox
      px="1rem"
      minHeight="100vh"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Image
        src="/assets/images/illustrations/404.svg"
        height={174}
        width={320}
        className="mb-8"
        alt={""}
      />

      <FlexBox flexWrap="wrap">
        <Button
          variant="outlined"
          color="primary"
          m="0.5rem"
          onClick={handleGoBack}
        >
          Go Back
        </Button>

        <Link href="/">
          <Button variant="contained" color="primary" m="0.5rem">
            Go to Home
          </Button>
        </Link>
      </FlexBox>
    </FlexBox>
  );
}
