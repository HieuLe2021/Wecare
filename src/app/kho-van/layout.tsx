import type { ReactNode } from "react";
import { headers } from "next/headers";
import Container from "@component/Container";
import Grid from "@component/grid/Grid";
import Sticky from "@component/sticky";

import Footer from "./_components/footer";
import { Header } from "./_components/header";
import { MobileNavigationBar } from "./_components/mobile-navigation";
import { Sidebar } from "./_components/sidebar";
import { Topbar } from "./_components/topbar";
import {
  getAllProductGroups,
  getCustomer,
  getMenuNodes,
} from "./_utils/server";
import { StyledAppLayout } from "./styles";

export default async function Layout(props: { children: ReactNode }) {
  const { children } = props;
  const customerId = new URLSearchParams(
    headers().get("x-url")?.split("?").at(-1),
  ).get("customer");
  const [allProductGroups, menuNodes, customer] = await Promise.all([
    getAllProductGroups(),
    getMenuNodes(),
    customerId ? getCustomer(customerId) : undefined,
  ]);

  return (
    <StyledAppLayout>
      <Sticky fixedOn={0} scrollDistance={300}>
        <Header
          allProductGroups={allProductGroups}
          menuNodes={menuNodes}
          customer={customer}
        />
      </Sticky>

      <MobileNavigationBar />

      <Container
        my="2rem"
        className="flex min-h-[calc(100vh-428px-112px-64px)] flex-col"
      >
        <Grid container spacing={6} className="lg:w-[1280px] lg:px-10">
          <div className="relative box-border flex shrink-0 flex-col">
            <section className="relative mx-auto box-border flex h-screen w-full max-w-[1200px] shrink-0 grow flex-col self-stretch bg-zinc-950 bg-cover bg-center bg-no-repeat px-5 pb-5 pt-10 max-md:h-screen">
              <div className="mx-auto mt-9 flex h-auto w-full grow-[0px] flex-col max-md:flex max-md:h-auto max-md:w-full max-md:grow-0 max-md:self-center max-sm:flex">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex w-[19%] flex-col max-md:ml-0 max-md:w-full">
                    <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F51715ebb7b4649e992a0a8056b79a9a1?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F51715ebb7b4649e992a0a8056b79a9a1?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F51715ebb7b4649e992a0a8056b79a9a1?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F51715ebb7b4649e992a0a8056b79a9a1?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F51715ebb7b4649e992a0a8056b79a9a1?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F51715ebb7b4649e992a0a8056b79a9a1?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F51715ebb7b4649e992a0a8056b79a9a1?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F51715ebb7b4649e992a0a8056b79a9a1"
                      className="m-auto box-border aspect-[0.95] min-h-[20px] w-full min-w-[20px] max-w-[226px] shrink-0 overflow-hidden rounded-xl object-cover max-md:hidden max-sm:hidden"
                    />
                  </div>
                  <div className="ml-5 flex w-[19%] flex-col max-md:ml-0 max-md:w-full">
                    <div className="m-auto flex w-full flex-col justify-start gap-4 self-stretch">
                      <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F6beee29f58e64b5b895157261b99b027?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F6beee29f58e64b5b895157261b99b027?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F6beee29f58e64b5b895157261b99b027?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F6beee29f58e64b5b895157261b99b027?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F6beee29f58e64b5b895157261b99b027?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F6beee29f58e64b5b895157261b99b027?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F6beee29f58e64b5b895157261b99b027?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F6beee29f58e64b5b895157261b99b027"
                        className="box-border aspect-[1.51] min-h-[20px] w-full min-w-[20px] shrink-0 grow overflow-hidden rounded-xl object-cover max-md:hidden max-sm:hidden"
                      />
                      <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F1cede4d160c64a00952fe92e84d9be7c?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F1cede4d160c64a00952fe92e84d9be7c?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F1cede4d160c64a00952fe92e84d9be7c?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F1cede4d160c64a00952fe92e84d9be7c?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F1cede4d160c64a00952fe92e84d9be7c?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F1cede4d160c64a00952fe92e84d9be7c?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F1cede4d160c64a00952fe92e84d9be7c?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F1cede4d160c64a00952fe92e84d9be7c"
                        className="box-border aspect-[0.8] min-h-[20px] w-full min-w-[20px] shrink-0 grow overflow-hidden rounded-xl object-cover max-md:hidden max-sm:hidden"
                      />
                    </div>
                  </div>
                  <div className="ml-5 flex w-[21%] flex-col max-md:ml-0 max-md:w-full">
                    <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F1aaf2cb476064f32829e236758e85cc2?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F1aaf2cb476064f32829e236758e85cc2?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F1aaf2cb476064f32829e236758e85cc2?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F1aaf2cb476064f32829e236758e85cc2?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F1aaf2cb476064f32829e236758e85cc2?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F1aaf2cb476064f32829e236758e85cc2?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F1aaf2cb476064f32829e236758e85cc2?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F1aaf2cb476064f32829e236758e85cc2"
                      className="mx-auto box-border aspect-[0.51] h-auto min-h-[20px] w-full min-w-[20px] shrink-0 grow overflow-hidden rounded-xl object-cover max-md:hidden max-md:h-auto max-md:grow-0 max-sm:hidden"
                    />
                  </div>
                  <div className="ml-5 flex w-[19%] flex-col max-md:ml-0 max-md:w-full">
                    <div className="my-auto flex flex-col items-start justify-start gap-4">
                      <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F1cede4d160c64a00952fe92e84d9be7c?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F1cede4d160c64a00952fe92e84d9be7c?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F1cede4d160c64a00952fe92e84d9be7c?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F1cede4d160c64a00952fe92e84d9be7c?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F1cede4d160c64a00952fe92e84d9be7c?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F1cede4d160c64a00952fe92e84d9be7c?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F1cede4d160c64a00952fe92e84d9be7c?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F1cede4d160c64a00952fe92e84d9be7c"
                        className="mt-px box-border aspect-[0.83] min-h-[20px] w-full min-w-[20px] shrink-0 grow overflow-hidden rounded-xl object-cover max-md:hidden max-sm:hidden"
                      />
                      <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F6beee29f58e64b5b895157261b99b027?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F6beee29f58e64b5b895157261b99b027?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F6beee29f58e64b5b895157261b99b027?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F6beee29f58e64b5b895157261b99b027?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F6beee29f58e64b5b895157261b99b027?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F6beee29f58e64b5b895157261b99b027?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F6beee29f58e64b5b895157261b99b027?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F6beee29f58e64b5b895157261b99b027"
                        className="box-border aspect-[1.51] min-h-[20px] w-full min-w-[20px] shrink-0 grow overflow-hidden rounded-xl object-cover max-md:hidden max-sm:hidden"
                      />
                    </div>
                  </div>
                  <div className="ml-5 flex w-[19%] flex-col max-md:ml-0 max-md:w-full">
                    <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F105dd5e0f08240999074aecbd9cae77e?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F105dd5e0f08240999074aecbd9cae77e?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F105dd5e0f08240999074aecbd9cae77e?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F105dd5e0f08240999074aecbd9cae77e?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F105dd5e0f08240999074aecbd9cae77e?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F105dd5e0f08240999074aecbd9cae77e?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F105dd5e0f08240999074aecbd9cae77e?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2F481ecd094abe46c49a3ee5256ef72179%2F105dd5e0f08240999074aecbd9cae77e"
                      className="m-auto box-border aspect-[0.9] min-h-[20px] w-full min-w-[20px] max-w-[278px] shrink-0 overflow-hidden rounded-xl object-cover max-md:hidden max-sm:hidden"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Grid>
      </Container>
      <Footer />
    </StyledAppLayout>
  );
}
