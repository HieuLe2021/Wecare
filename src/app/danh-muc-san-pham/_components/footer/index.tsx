import Typography, { Paragraph } from "@component/Typography";
// CUSTOM DATA
import { aboutLinks, customerCareLinks, iconList } from "./data";

import AppStore from "@component/AppStore";
import Box from "@component/Box";
import Container from "@component/Container";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import Image from "@component/Image";
import Link from "next/link";
// STYLED COMPONENTS
import { StyledLink } from "./styles";

export default function Footer() {
  return (
    <footer>
      <Box bg="#0F3460">
        <Container p="1rem" color="white">
          <Box py="5rem" overflow="hidden">
            <Grid container spacing={6}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
              <Link href="/" className="flex items-center">
                <Image src="/assets/images/logo.svg" alt="logo" />
                <h6 className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-sky-800 text-transparent bg-clip-text leading-[30px]">
                  WECARE
                </h6>
              </Link>

                <Paragraph mb="1.25rem" color="gray.500" className="py-3">
                Cung cấp giải pháp cung ứng toàn diện về vật tư, nguyên vật liệu, phụ kiện, phụ trợ cho các nhà máy, ngành công nghiệp.
                </Paragraph>

                {/* <AppStore /> */}
              </Grid>

              <Grid item lg={2} md={6} sm={6} xs={12}>
                <Typography
                  mb="1.25rem"
                  lineHeight="1"
                  fontSize="25px"
                  fontWeight="600"
                >
                  Ngành hàng
                </Typography>

                <div>
                  {aboutLinks.map((item, ind) => (
                    <StyledLink href="/" key={ind}>
                      {item}
                    </StyledLink>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Typography
                  mb="1.25rem"
                  lineHeight="1"
                  fontSize="25px"
                  fontWeight="600"
                >
                  Chính sách
                </Typography>

                <div>
                  {customerCareLinks.map((item, ind) => (
                    <StyledLink href="/" key={ind}>
                      {item}
                    </StyledLink>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Typography
                  mb="1.25rem"
                  lineHeight="1"
                  fontSize="25px"
                  fontWeight="600"
                >
                  Công ty cổ phần Wecare Group
                </Typography>

                <Typography py="0.3rem" color="gray.500">
                  Trụ sở: Lô B39 KCN Phú Tài, Trần Quang Diệu, Quy Nhơn, Bình Định​
                </Typography>

                <Typography py="0.3rem" color="gray.500">
                  Email: supportwecare@gmail.com
                </Typography>

                <Typography py="0.3rem" mb="1rem" color="gray.500">
                  Phone: +84 965 167 350
                </Typography>

                {/* <FlexBox className="flex" mx="-5px">
                  {iconList.map((item) => (
                    <a
                      href={item.url}
                      target="_blank"
                      key={item.iconName}
                      rel="noreferrer noopenner"
                    >
                      <Box
                        m="5px"
                        p="10px"
                        size="small"
                        borderRadius="50%"
                        bg="rgba(0,0,0,0.2)"
                      >
                        <Icon size="12px" defaultcolor="auto">
                          {item.iconName}
                        </Icon>
                      </Box>
                    </a>
                  ))}
                </FlexBox> */}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
