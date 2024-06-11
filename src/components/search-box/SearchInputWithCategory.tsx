import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Box from "@component/Box";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import Menu from "@component/Menu";
import MenuItem from "@component/MenuItem";
import TextField from "@component/text-field";
import { Span } from "@component/Typography";
import { debounce } from "lodash";
import { ChevronDown } from "lucide-react";

import StyledSearchBox from "./styled";

export default function SearchInputWithCategory() {
  const [resultList, setResultList] = useState<string[]>([]);
  const [category, setCategory] = useState("Tất cả danh mục");

  const handleCategoryChange = (cat: string) => () => setCategory(cat);

  const search = debounce((e) => {
    const value = e.target?.value;

    if (!value) setResultList([]);
    else setResultList(dummySearchResult);
  }, 200);

  const hanldeSearch = useCallback((event: any) => {
    event.persist();
    search(event);
  }, []);

  const handleDocumentClick = () => setResultList([]);

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);

  return (
    <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
      <StyledSearchBox>
        <Icon className="search-icon" size="18px">
          search
        </Icon>

        <TextField
          id="search-with-category"
          fullwidth
          onChange={hanldeSearch}
          className="search-field"
          placeholder="Tìm kiếm và nhấn enter..."
        />

        <Menu
          direction="right"
          className="category-dropdown"
          handler={
            <FlexBox className="dropdown-handler" alignItems="center">
              <span>{category}</span>
              <ChevronDown className="h-5 w-5" />
            </FlexBox>
          }
        >
          {categories.map((item) => (
            <MenuItem key={item} onClick={handleCategoryChange(item)}>
              {item}
            </MenuItem>
          ))}
        </Menu>
      </StyledSearchBox>

      {/* {!!resultList.length && (
        <Card position="absolute" top="100%" py="0.5rem" width="100%" boxShadow="large" zIndex={99}>
          {resultList.map((item) => (
            <Link href={`/product/search/${item}`} key={item}>
              <MenuItem key={item}>
                <Span fontSize="14px">{item}</Span>
              </MenuItem>
            </Link>
          ))}
        </Card>
      )} */}
    </Box>
  );
}

const categories = [
  "Tất cả danh mục",
  "Kim khí & phụ kiện",
  "Bao bì",
  "Hoá chất",
  "Vật tư tiêu hao",
  "Công cụ - dụng cụ",
  "Phụ tùng thay thế",
];

const dummySearchResult = [
  "Băng keo xốp",
  "Băng keo 2 mặt",
  "Băng keo giấy",
  "Băng keo điện",
];
