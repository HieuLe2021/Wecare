import Box from "@component/Box";
import Container from "@component/Container";
import Grid from "@component/grid/Grid";
import Typography, { Paragraph } from "@component/Typography";

import { Image } from "~/components/image";
import { Link } from "~/components/link";
// CUSTOM DATA
import { aboutLinks, customerCareLinks } from "./data";
// STYLED COMPONENTS
import { StyledLink } from "./styles";

export default function Footer() {
  return (
    <footer>
      <Box bg="#0F3460">
        <Container p="1rem" color="white">
          <Box overflow="hidden" className="pb-16 pt-4 lg:py-20">
            <Grid container spacing={6}>
              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Typography
                  mb="1.25rem"
                  lineHeight="1.3"
                  fontSize="25px"
                  fontWeight="600"
                >
                  Công ty cổ phần Wecare Group
                </Typography>

                <Typography py="0.3rem" color="gray.500">
                  Trụ sở: Lô B39 KCN Phú Tài, Trần Quang Diệu, Quy Nhơn, Bình
                  Định
                </Typography>

                <Typography py="0.3rem" color="gray.500">
                  Email: supportwecare@gmail.com
                </Typography>

                <Typography py="0.3rem" mb="1rem" color="gray.500">
                  Phone: +84 378 339 009
                </Typography>
              </Grid>

              <Grid item lg={2} md={6} sm={6} xs={12}>
                <Typography
                  mb="1.25rem"
                  lineHeight="1.3"
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
                  lineHeight="1.3"
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

              <Grid item lg={4} md={6} sm={6} xs={12}>
                <Link href="/kho-van" className="flex items-center">
                  <Image
                    src="/assets/images/logo.svg"
                    alt="logo"
                    width={40}
                    height={40}
                  />
                  <h6 className="bg-gradient-to-r from-sky-400 to-sky-800 bg-clip-text pl-2 text-3xl font-bold leading-[30px] text-transparent">
                    WECARE
                  </h6>
                </Link>

                <Paragraph mb="1.25rem" color="gray.500" className="py-3">
                  Cung cấp giải pháp cung ứng toàn diện về vật tư, nguyên vật
                  liệu, phụ kiện, phụ trợ cho các nhà máy, ngành công nghiệp.
                </Paragraph>

                {/* <AppStore /> */}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
