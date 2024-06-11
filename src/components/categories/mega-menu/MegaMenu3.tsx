import Link from "next/link";

import Box from "@component/Box";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import NavLink from "@component/nav-link";
import NextImage from "@component/NextImage";
import Typography, { H3, SemiSpan, Small } from "@component/Typography";
import { StyledMegaMenu1 } from "./styles";
import { MegaMenu3Props } from "./type";

import bagImage from "../../../../public/assets/images/products/paper-bag.png";
import { clsm } from "@component/index";

export default function MegaMenu3({
  data: { categories },
  minWidth = "760px"
}: MegaMenu3Props) {
  return categories ? (
    <StyledMegaMenu1 className="mega-menu">
      <Card ml="1rem" minWidth={minWidth} boxShadow="regular" overflow="hidden" borderRadius={8}>
        <FlexBox px="1.25rem" py="0.875rem">
          <Box flex="1 1 0">
            <Grid container spacing={4} className="min-w-[600px]">
              {categories?.map((item, ind) => (
                <Grid item md={3} key={ind}>
                  {item.href ? (
                    <NavLink className="title-link" href={item.href}>
                      {item.title}
                    </NavLink>
                  ) : (
                    <div className={clsm("border rounded-md flex items-center flex-col p-2 h-full gap-2 cursor-pointer", "hover:scale-105")}>
                      <div className="w-[80px] h-[80px] relative">
                        {item.imgUrl &&
                          <NextImage src={item.imgUrl} fill
                            sizes="80px"
                            alt={item.title} className="object-cover" />
                        }
                      </div>
                      <SemiSpan className="title-link text-center">
                        {item.title}
                      </SemiSpan>
                    </div>
                  )}
                  {item.subCategories?.map((sub, ind) => (
                    <NavLink key={ind} className="child-link" href={sub.href}>
                      {sub.title}
                    </NavLink>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Box>
        </FlexBox>

        <Link href="/sale-page-2">
          <Grid
            container
            spacing={0}
            flexWrap="wrap-reverse"
            containerHeight="100%"
            alignItems="center">
            <Grid item sm={6} xs={12}>
              <Box px="1.25rem">
                <H3 mb="0.5rem">Big Sale Upto 60% Off</H3>

                <Typography color="text.muted" mb="0.5rem">
                  Handcrafted from genuine Italian Leather
                </Typography>

                <Small fontWeight="700" borderBottom="2px solid" borderColor="primary.main">
                  SHOP NOW
                </Small>
              </Box>
            </Grid>

            <Grid item sm={6} xs={12}>
              <FlexBox
                width={160}
                margin="auto"
                position="relative"
                flexDirection="column"
                justifyContent="flex-end">
                <NextImage src={bagImage} alt="model" style={{ objectFit: "contain" }} />
              </FlexBox>
            </Grid>
          </Grid>
        </Link>
      </Card>
    </StyledMegaMenu1>
  ) : null;
}
