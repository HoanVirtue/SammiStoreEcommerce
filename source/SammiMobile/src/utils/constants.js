import { Dimensions } from "react-native";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

export const colors = {
  grayLighter: "#ddd",
  gray: "#aaa",
  gray1: "#666",
  gray2: "#444",
  black: "#000",
  white: "#fff",
  greenLighter: "#05eb7e",
  green: "#04c469",
  green1: "#03a659",
  green2: "#018547",
  yellow: "yellow",
  red: "red",
};

export const btnColors = {
  green: "green",
  greenLighter: "#82b478",
  greenLightest: "#ade0b9",
};

export const backgroundColors = {
  greenLighter: "#82b478",
  gray: "#f1ededbf",
};

export const fontSize = {
  S: 12,
  M: 14,
  L: 15,
  XL: 16,
  XXL: 18,
};

export const headerHeight = 64;
export const headerSearchHeight = 64;
export const headerInputHeight = 48;
export const bottomTabHeight = 52;

export const addressData = {
  cities: [
    {
      id: "01",
      name: "Thành phố Hà Nội",
    },
    {
      id: "02",
      name: "Tỉnh Hà Giang",
    },
    {
      id: "04",
      name: "Tỉnh Cao Bằng",
    },
    {
      id: "06",
      name: "Tỉnh Bắc Kạn",
    },
    {
      id: "08",
      name: "Tỉnh Tuyên Quang",
    },
    {
      id: "10",
      name: "Tỉnh Lào Cai",
    },
    {
      id: "11",
      name: "Tỉnh Điện Biên",
    },
    {
      id: "12",
      name: "Tỉnh Lai Châu",
    },
    {
      id: "14",
      name: "Tỉnh Sơn La",
    },
    {
      id: "15",
      name: "Tỉnh Yên Bái",
    },
    {
      id: "17",
      name: "Tỉnh Hoà Bình",
    },
    {
      id: "19",
      name: "Tỉnh Thái Nguyên",
    },
    {
      id: "20",
      name: "Tỉnh Lạng Sơn",
    },
    {
      id: "22",
      name: "Tỉnh Quảng Ninh",
    },
    {
      id: "24",
      name: "Tỉnh Bắc Giang",
    },
    {
      id: "25",
      name: "Tỉnh Phú Thọ",
    },
    {
      id: "26",
      name: "Tỉnh Vĩnh Phúc",
    },
    {
      id: "27",
      name: "Tỉnh Bắc Ninh",
    },
    {
      id: "30",
      name: "Tỉnh Hải Dương",
    },
    {
      id: "31",
      name: "Thành phố Hải Phòng",
    },
    {
      id: "33",
      name: "Tỉnh Hưng Yên",
    },
    {
      id: "34",
      name: "Tỉnh Thái Bình",
    },
    {
      id: "35",
      name: "Tỉnh Hà Nam",
    },
    {
      id: "36",
      name: "Tỉnh Nam Định",
    },
    {
      id: "37",
      name: "Tỉnh Ninh Bình",
    },
    {
      id: "38",
      name: "Tỉnh Thanh Hóa",
    },
    {
      id: "40",
      name: "Tỉnh Nghệ An",
    },
    {
      id: "42",
      name: "Tỉnh Hà Tĩnh",
    },
    {
      id: "44",
      name: "Tỉnh Quảng Bình",
    },
    {
      id: "45",
      name: "Tỉnh Quảng Trị",
    },
    {
      id: "46",
      name: "Tỉnh Thừa Thiên Huế",
    },
    {
      id: "48",
      name: "Thành phố Đà Nẵng",
    },
    {
      id: "49",
      name: "Tỉnh Quảng Nam",
    },
    {
      id: "51",
      name: "Tỉnh Quảng Ngãi",
    },
    {
      id: "52",
      name: "Tỉnh Bình Định",
    },
    {
      id: "54",
      name: "Tỉnh Phú Yên",
    },
    {
      id: "56",
      name: "Tỉnh Khánh Hòa",
    },
    {
      id: "58",
      name: "Tỉnh Ninh Thuận",
    },
    {
      id: "60",
      name: "Tỉnh Bình Thuận",
    },
    {
      id: "62",
      name: "Tỉnh Kon Tum",
    },
    {
      id: "64",
      name: "Tỉnh Gia Lai",
    },
    {
      id: "66",
      name: "Tỉnh Đắk Lắk",
    },
    {
      id: "67",
      name: "Tỉnh Đắk Nông",
    },
    {
      id: "68",
      name: "Tỉnh Lâm Đồng",
    },
    {
      id: "70",
      name: "Tỉnh Bình Phước",
    },
    {
      id: "72",
      name: "Tỉnh Tây Ninh",
    },
    {
      id: "74",
      name: "Tỉnh Bình Dương",
    },
    {
      id: "75",
      name: "Tỉnh Đồng Nai",
    },
    {
      id: "77",
      name: "Tỉnh Bà Rịa - Vũng Tàu",
    },
    {
      id: "79",
      name: "Thành phố Hồ Chí Minh",
    },
    {
      id: "80",
      name: "Tỉnh Long An",
    },
    {
      id: "82",
      name: "Tỉnh Tiền Giang",
    },
    {
      id: "83",
      name: "Tỉnh Bến Tre",
    },
    {
      id: "84",
      name: "Tỉnh Trà Vinh",
    },
    {
      id: "86",
      name: "Tỉnh Vĩnh Long",
    },
    {
      id: "87",
      name: "Tỉnh Đồng Tháp",
    },
    {
      id: "89",
      name: "Tỉnh An Giang",
    },
    {
      id: "91",
      name: "Tỉnh Kiên Giang",
    },
    {
      id: "92",
      name: "Thành phố Cần Thơ",
    },
    {
      id: "93",
      name: "Tỉnh Hậu Giang",
    },
    {
      id: "94",
      name: "Tỉnh Sóc Trăng",
    },
    {
      id: "95",
      name: "Tỉnh Bạc Liêu",
    },
    {
      id: "96",
      name: "Tỉnh Cà Mau",
    },
  ],
  districts: [
    {
      id: "001",
      name: "Quận Ba Đình",
      CityId: "01",
    },
    {
      id: "002",
      name: "Quận Hoàn Kiếm",
      CityId: "01",
    },
    {
      id: "003",
      name: "Quận Tây Hồ",
      CityId: "01",
    },
    {
      id: "004",
      name: "Quận Long Biên",
      CityId: "01",
    },
    {
      id: "005",
      name: "Quận Cầu Giấy",
      CityId: "01",
    },
    {
      id: "006",
      name: "Quận Đống Đa",
      CityId: "01",
    },
    {
      id: "007",
      name: "Quận Hai Bà Trưng",
      CityId: "01",
    },
    {
      id: "008",
      name: "Quận Hoàng Mai",
      CityId: "01",
    },
    {
      id: "009",
      name: "Quận Thanh Xuân",
      CityId: "01",
    },
    {
      id: "016",
      name: "Huyện Sóc Sơn",
      CityId: "01",
    },
    {
      id: "017",
      name: "Huyện Đông Anh",
      CityId: "01",
    },
    {
      id: "018",
      name: "Huyện Gia Lâm",
      CityId: "01",
    },
    {
      id: "019",
      name: "Quận Nam Từ Liêm",
      CityId: "01",
    },
    {
      id: "020",
      name: "Huyện Thanh Trì",
      CityId: "01",
    },
    {
      id: "021",
      name: "Quận Bắc Từ Liêm",
      CityId: "01",
    },
    {
      id: "024",
      name: "Thành phố Hà Giang",
      CityId: "02",
    },
    {
      id: "026",
      name: "Huyện Đồng Văn",
      CityId: "02",
    },
    {
      id: "027",
      name: "Huyện Mèo Vạc",
      CityId: "02",
    },
    {
      id: "028",
      name: "Huyện Yên Minh",
      CityId: "02",
    },
    {
      id: "029",
      name: "Huyện Quản Bạ",
      CityId: "02",
    },
    {
      id: "030",
      name: "Huyện Vị Xuyên",
      CityId: "02",
    },
    {
      id: "031",
      name: "Huyện Bắc Mê",
      CityId: "02",
    },
    {
      id: "032",
      name: "Huyện Hoàng Su Phì",
      CityId: "02",
    },
    {
      id: "033",
      name: "Huyện Xín Mần",
      CityId: "02",
    },
    {
      id: "034",
      name: "Huyện Bắc Quang",
      CityId: "02",
    },
    {
      id: "035",
      name: "Huyện Quang Bình",
      CityId: "02",
    },
    {
      id: "040",
      name: "Thành phố Cao Bằng",
      CityId: "04",
    },
    {
      id: "042",
      name: "Huyện Bảo Lâm",
      CityId: "04",
    },
    {
      id: "043",
      name: "Huyện Bảo Lạc",
      CityId: "04",
    },
    {
      id: "045",
      name: "Huyện Hà Quảng",
      CityId: "04",
    },
    {
      id: "047",
      name: "Huyện Trùng Khánh",
      CityId: "04",
    },
    {
      id: "048",
      name: "Huyện Hạ Lang",
      CityId: "04",
    },
    {
      id: "049",
      name: "Huyện Quảng Hòa",
      CityId: "04",
    },
    {
      id: "051",
      name: "Huyện Hoà An",
      CityId: "04",
    },
    {
      id: "052",
      name: "Huyện Nguyên Bình",
      CityId: "04",
    },
    {
      id: "053",
      name: "Huyện Thạch An",
      CityId: "04",
    },
    {
      id: "058",
      name: "Thành Phố Bắc Kạn",
      CityId: "06",
    },
    {
      id: "060",
      name: "Huyện Pác Nặm",
      CityId: "06",
    },
    {
      id: "061",
      name: "Huyện Ba Bể",
      CityId: "06",
    },
    {
      id: "062",
      name: "Huyện Ngân Sơn",
      CityId: "06",
    },
    {
      id: "063",
      name: "Huyện Bạch Thông",
      CityId: "06",
    },
    {
      id: "064",
      name: "Huyện Chợ Đồn",
      CityId: "06",
    },
    {
      id: "065",
      name: "Huyện Chợ Mới",
      CityId: "06",
    },
    {
      id: "066",
      name: "Huyện Na Rì",
      CityId: "06",
    },
    {
      id: "070",
      name: "Thành phố Tuyên Quang",
      CityId: "08",
    },
    {
      id: "071",
      name: "Huyện Lâm Bình",
      CityId: "08",
    },
    {
      id: "072",
      name: "Huyện Na Hang",
      CityId: "08",
    },
    {
      id: "073",
      name: "Huyện Chiêm Hóa",
      CityId: "08",
    },
    {
      id: "074",
      name: "Huyện Hàm Yên",
      CityId: "08",
    },
    {
      id: "075",
      name: "Huyện Yên Sơn",
      CityId: "08",
    },
    {
      id: "076",
      name: "Huyện Sơn Dương",
      CityId: "08",
    },
    {
      id: "080",
      name: "Thành phố Lào Cai",
      CityId: "10",
    },
    {
      id: "082",
      name: "Huyện Bát Xát",
      CityId: "10",
    },
    {
      id: "083",
      name: "Huyện Mường Khương",
      CityId: "10",
    },
    {
      id: "084",
      name: "Huyện Si Ma Cai",
      CityId: "10",
    },
    {
      id: "085",
      name: "Huyện Bắc Hà",
      CityId: "10",
    },
    {
      id: "086",
      name: "Huyện Bảo Thắng",
      CityId: "10",
    },
    {
      id: "087",
      name: "Huyện Bảo Yên",
      CityId: "10",
    },
    {
      id: "088",
      name: "Thị xã Sa Pa",
      CityId: "10",
    },
    {
      id: "089",
      name: "Huyện Văn Bàn",
      CityId: "10",
    },
    {
      id: "094",
      name: "Thành phố Điện Biên Phủ",
      CityId: "11",
    },
    {
      id: "095",
      name: "Thị Xã Mường Lay",
      CityId: "11",
    },
    {
      id: "096",
      name: "Huyện Mường Nhé",
      CityId: "11",
    },
    {
      id: "097",
      name: "Huyện Mường Chà",
      CityId: "11",
    },
    {
      id: "098",
      name: "Huyện Tủa Chùa",
      CityId: "11",
    },
    {
      id: "099",
      name: "Huyện Tuần Giáo",
      CityId: "11",
    },
    {
      id: "100",
      name: "Huyện Điện Biên",
      CityId: "11",
    },
    {
      id: "101",
      name: "Huyện Điện Biên Đông",
      CityId: "11",
    },
    {
      id: "102",
      name: "Huyện Mường Ảng",
      CityId: "11",
    },
    {
      id: "103",
      name: "Huyện Nậm Pồ",
      CityId: "11",
    },
    {
      id: "105",
      name: "Thành phố Lai Châu",
      CityId: "12",
    },
    {
      id: "106",
      name: "Huyện Tam Đường",
      CityId: "12",
    },
    {
      id: "107",
      name: "Huyện Mường Tè",
      CityId: "12",
    },
    {
      id: "108",
      name: "Huyện Sìn Hồ",
      CityId: "12",
    },
    {
      id: "109",
      name: "Huyện Phong Thổ",
      CityId: "12",
    },
    {
      id: "110",
      name: "Huyện Than Uyên",
      CityId: "12",
    },
    {
      id: "111",
      name: "Huyện Tân Uyên",
      CityId: "12",
    },
    {
      id: "112",
      name: "Huyện Nậm Nhùn",
      CityId: "12",
    },
    {
      id: "116",
      name: "Thành phố Sơn La",
      CityId: "14",
    },
    {
      id: "118",
      name: "Huyện Quỳnh Nhai",
      CityId: "14",
    },
    {
      id: "119",
      name: "Huyện Thuận Châu",
      CityId: "14",
    },
    {
      id: "120",
      name: "Huyện Mường La",
      CityId: "14",
    },
    {
      id: "121",
      name: "Huyện Bắc Yên",
      CityId: "14",
    },
    {
      id: "122",
      name: "Huyện Phù Yên",
      CityId: "14",
    },
    {
      id: "123",
      name: "Huyện Mộc Châu",
      CityId: "14",
    },
    {
      id: "124",
      name: "Huyện Yên Châu",
      CityId: "14",
    },
    {
      id: "125",
      name: "Huyện Mai Sơn",
      CityId: "14",
    },
    {
      id: "126",
      name: "Huyện Sông Mã",
      CityId: "14",
    },
    {
      id: "127",
      name: "Huyện Sốp Cộp",
      CityId: "14",
    },
    {
      id: "128",
      name: "Huyện Vân Hồ",
      CityId: "14",
    },
    {
      id: "132",
      name: "Thành phố Yên Bái",
      CityId: "15",
    },
    {
      id: "133",
      name: "Thị xã Nghĩa Lộ",
      CityId: "15",
    },
    {
      id: "135",
      name: "Huyện Lục Yên",
      CityId: "15",
    },
    {
      id: "136",
      name: "Huyện Văn Yên",
      CityId: "15",
    },
    {
      id: "137",
      name: "Huyện Mù Căng Chải",
      CityId: "15",
    },
    {
      id: "138",
      name: "Huyện Trấn Yên",
      CityId: "15",
    },
    {
      id: "139",
      name: "Huyện Trạm Tấu",
      CityId: "15",
    },
    {
      id: "140",
      name: "Huyện Văn Chấn",
      CityId: "15",
    },
    {
      id: "141",
      name: "Huyện Yên Bình",
      CityId: "15",
    },
    {
      id: "148",
      name: "Thành phố Hòa Bình",
      CityId: "17",
    },
    {
      id: "150",
      name: "Huyện Đà Bắc",
      CityId: "17",
    },
    {
      id: "152",
      name: "Huyện Lương Sơn",
      CityId: "17",
    },
    {
      id: "153",
      name: "Huyện Kim Bôi",
      CityId: "17",
    },
    {
      id: "154",
      name: "Huyện Cao Phong",
      CityId: "17",
    },
    {
      id: "155",
      name: "Huyện Tân Lạc",
      CityId: "17",
    },
    {
      id: "156",
      name: "Huyện Mai Châu",
      CityId: "17",
    },
    {
      id: "157",
      name: "Huyện Lạc Sơn",
      CityId: "17",
    },
    {
      id: "158",
      name: "Huyện Yên Thủy",
      CityId: "17",
    },
    {
      id: "159",
      name: "Huyện Lạc Thủy",
      CityId: "17",
    },
    {
      id: "164",
      name: "Thành phố Thái Nguyên",
      CityId: "19",
    },
    {
      id: "165",
      name: "Thành phố Sông Công",
      CityId: "19",
    },
    {
      id: "167",
      name: "Huyện Định Hóa",
      CityId: "19",
    },
    {
      id: "168",
      name: "Huyện Phú Lương",
      CityId: "19",
    },
    {
      id: "169",
      name: "Huyện Đồng Hỷ",
      CityId: "19",
    },
    {
      id: "170",
      name: "Huyện Võ Nhai",
      CityId: "19",
    },
    {
      id: "171",
      name: "Huyện Đại Từ",
      CityId: "19",
    },
    {
      id: "172",
      name: "Thành phố Phổ Yên",
      CityId: "19",
    },
    {
      id: "173",
      name: "Huyện Phú Bình",
      CityId: "19",
    },
    {
      id: "178",
      name: "Thành phố Lạng Sơn",
      CityId: "20",
    },
    {
      id: "180",
      name: "Huyện Tràng Định",
      CityId: "20",
    },
    {
      id: "181",
      name: "Huyện Bình Gia",
      CityId: "20",
    },
    {
      id: "182",
      name: "Huyện Văn Lãng",
      CityId: "20",
    },
    {
      id: "183",
      name: "Huyện Cao Lộc",
      CityId: "20",
    },
    {
      id: "184",
      name: "Huyện Văn Quan",
      CityId: "20",
    },
    {
      id: "185",
      name: "Huyện Bắc Sơn",
      CityId: "20",
    },
    {
      id: "186",
      name: "Huyện Hữu Lũng",
      CityId: "20",
    },
    {
      id: "187",
      name: "Huyện Chi Lăng",
      CityId: "20",
    },
    {
      id: "188",
      name: "Huyện Lộc Bình",
      CityId: "20",
    },
    {
      id: "189",
      name: "Huyện Đình Lập",
      CityId: "20",
    },
    {
      id: "193",
      name: "Thành phố Hạ Long",
      CityId: "22",
    },
    {
      id: "194",
      name: "Thành phố Móng Cái",
      CityId: "22",
    },
    {
      id: "195",
      name: "Thành phố Cẩm Phả",
      CityId: "22",
    },
    {
      id: "196",
      name: "Thành phố Uông Bí",
      CityId: "22",
    },
    {
      id: "198",
      name: "Huyện Bình Liêu",
      CityId: "22",
    },
    {
      id: "199",
      name: "Huyện Tiên Yên",
      CityId: "22",
    },
    {
      id: "200",
      name: "Huyện Đầm Hà",
      CityId: "22",
    },
    {
      id: "201",
      name: "Huyện Hải Hà",
      CityId: "22",
    },
    {
      id: "202",
      name: "Huyện Ba Chẽ",
      CityId: "22",
    },
    {
      id: "203",
      name: "Huyện Vân Đồn",
      CityId: "22",
    },
    {
      id: "205",
      name: "Thị xã Đông Triều",
      CityId: "22",
    },
    {
      id: "206",
      name: "Thị xã Quảng Yên",
      CityId: "22",
    },
    {
      id: "207",
      name: "Huyện Cô Tô",
      CityId: "22",
    },
    {
      id: "213",
      name: "Thành phố Bắc Giang",
      CityId: "24",
    },
    {
      id: "215",
      name: "Huyện Yên Thế",
      CityId: "24",
    },
    {
      id: "216",
      name: "Huyện Tân Yên",
      CityId: "24",
    },
    {
      id: "217",
      name: "Huyện Lạng Giang",
      CityId: "24",
    },
    {
      id: "218",
      name: "Huyện Lục Nam",
      CityId: "24",
    },
    {
      id: "219",
      name: "Huyện Lục Ngạn",
      CityId: "24",
    },
    {
      id: "220",
      name: "Huyện Sơn Động",
      CityId: "24",
    },
    {
      id: "221",
      name: "Huyện Yên Dũng",
      CityId: "24",
    },
    {
      id: "222",
      name: "Huyện Việt Yên",
      CityId: "24",
    },
    {
      id: "223",
      name: "Huyện Hiệp Hòa",
      CityId: "24",
    },
    {
      id: "227",
      name: "Thành phố Việt Trì",
      CityId: "25",
    },
    {
      id: "228",
      name: "Thị xã Phú Thọ",
      CityId: "25",
    },
    {
      id: "230",
      name: "Huyện Đoan Hùng",
      CityId: "25",
    },
    {
      id: "231",
      name: "Huyện Hạ Hoà",
      CityId: "25",
    },
    {
      id: "232",
      name: "Huyện Thanh Ba",
      CityId: "25",
    },
    {
      id: "233",
      name: "Huyện Phù Ninh",
      CityId: "25",
    },
    {
      id: "234",
      name: "Huyện Yên Lập",
      CityId: "25",
    },
    {
      id: "235",
      name: "Huyện Cẩm Khê",
      CityId: "25",
    },
    {
      id: "236",
      name: "Huyện Tam Nông",
      CityId: "25",
    },
    {
      id: "237",
      name: "Huyện Lâm Thao",
      CityId: "25",
    },
    {
      id: "238",
      name: "Huyện Thanh Sơn",
      CityId: "25",
    },
    {
      id: "239",
      name: "Huyện Thanh Thuỷ",
      CityId: "25",
    },
    {
      id: "240",
      name: "Huyện Tân Sơn",
      CityId: "25",
    },
    {
      id: "243",
      name: "Thành phố Vĩnh Yên",
      CityId: "26",
    },
    {
      id: "244",
      name: "Thành phố Phúc Yên",
      CityId: "26",
    },
    {
      id: "246",
      name: "Huyện Lập Thạch",
      CityId: "26",
    },
    {
      id: "247",
      name: "Huyện Tam Dương",
      CityId: "26",
    },
    {
      id: "248",
      name: "Huyện Tam Đảo",
      CityId: "26",
    },
    {
      id: "249",
      name: "Huyện Bình Xuyên",
      CityId: "26",
    },
    {
      id: "250",
      name: "Huyện Mê Linh",
      CityId: "01",
    },
    {
      id: "251",
      name: "Huyện Yên Lạc",
      CityId: "26",
    },
    {
      id: "252",
      name: "Huyện Vĩnh Tường",
      CityId: "26",
    },
    {
      id: "253",
      name: "Huyện Sông Lô",
      CityId: "26",
    },
    {
      id: "256",
      name: "Thành phố Bắc Ninh",
      CityId: "27",
    },
    {
      id: "258",
      name: "Huyện Yên Phong",
      CityId: "27",
    },
    {
      id: "259",
      name: "Huyện Quế Võ",
      CityId: "27",
    },
    {
      id: "260",
      name: "Huyện Tiên Du",
      CityId: "27",
    },
    {
      id: "261",
      name: "Thành phố Từ Sơn",
      CityId: "27",
    },
    {
      id: "262",
      name: "Huyện Thuận Thành",
      CityId: "27",
    },
    {
      id: "263",
      name: "Huyện Gia Bình",
      CityId: "27",
    },
    {
      id: "264",
      name: "Huyện Lương Tài",
      CityId: "27",
    },
    {
      id: "268",
      name: "Quận Hà Đông",
      CityId: "01",
    },
    {
      id: "269",
      name: "Thị xã Sơn Tây",
      CityId: "01",
    },
    {
      id: "271",
      name: "Huyện Ba Vì",
      CityId: "01",
    },
    {
      id: "272",
      name: "Huyện Phúc Thọ",
      CityId: "01",
    },
    {
      id: "273",
      name: "Huyện Đan Phượng",
      CityId: "01",
    },
    {
      id: "274",
      name: "Huyện Hoài Đức",
      CityId: "01",
    },
    {
      id: "275",
      name: "Huyện Quốc Oai",
      CityId: "01",
    },
    {
      id: "276",
      name: "Huyện Thạch Thất",
      CityId: "01",
    },
    {
      id: "277",
      name: "Huyện Chương Mỹ",
      CityId: "01",
    },
    {
      id: "278",
      name: "Huyện Thanh Oai",
      CityId: "01",
    },
    {
      id: "279",
      name: "Huyện Thường Tín",
      CityId: "01",
    },
    {
      id: "280",
      name: "Huyện Phú Xuyên",
      CityId: "01",
    },
    {
      id: "281",
      name: "Huyện Ứng Hòa",
      CityId: "01",
    },
    {
      id: "282",
      name: "Huyện Mỹ Đức",
      CityId: "01",
    },
    {
      id: "288",
      name: "Thành phố Hải Dương",
      CityId: "30",
    },
    {
      id: "290",
      name: "Thành phố Chí Linh",
      CityId: "30",
    },
    {
      id: "291",
      name: "Huyện Nam Sách",
      CityId: "30",
    },
    {
      id: "292",
      name: "Thị xã Kinh Môn",
      CityId: "30",
    },
    {
      id: "293",
      name: "Huyện Kim Thành",
      CityId: "30",
    },
    {
      id: "294",
      name: "Huyện Thanh Hà",
      CityId: "30",
    },
    {
      id: "295",
      name: "Huyện Cẩm Giàng",
      CityId: "30",
    },
    {
      id: "296",
      name: "Huyện Bình Giang",
      CityId: "30",
    },
    {
      id: "297",
      name: "Huyện Gia Lộc",
      CityId: "30",
    },
    {
      id: "298",
      name: "Huyện Tứ Kỳ",
      CityId: "30",
    },
    {
      id: "299",
      name: "Huyện Ninh Giang",
      CityId: "30",
    },
    {
      id: "300",
      name: "Huyện Thanh Miện",
      CityId: "30",
    },
    {
      id: "303",
      name: "Quận Hồng Bàng",
      CityId: "31",
    },
    {
      id: "304",
      name: "Quận Ngô Quyền",
      CityId: "31",
    },
    {
      id: "305",
      name: "Quận Lê Chân",
      CityId: "31",
    },
    {
      id: "306",
      name: "Quận Hải An",
      CityId: "31",
    },
    {
      id: "307",
      name: "Quận Kiến An",
      CityId: "31",
    },
    {
      id: "308",
      name: "Quận Đồ Sơn",
      CityId: "31",
    },
    {
      id: "309",
      name: "Quận Dương Kinh",
      CityId: "31",
    },
    {
      id: "311",
      name: "Huyện Thuỷ Nguyên",
      CityId: "31",
    },
    {
      id: "312",
      name: "Huyện An Dương",
      CityId: "31",
    },
    {
      id: "313",
      name: "Huyện An Lão",
      CityId: "31",
    },
    {
      id: "314",
      name: "Huyện Kiến Thuỵ",
      CityId: "31",
    },
    {
      id: "315",
      name: "Huyện Tiên Lãng",
      CityId: "31",
    },
    {
      id: "316",
      name: "Huyện Vĩnh Bảo",
      CityId: "31",
    },
    {
      id: "317",
      name: "Huyện Cát Hải",
      CityId: "31",
    },
    {
      id: "318",
      name: "Huyện Bạch Long Vĩ",
      CityId: "31",
    },
    {
      id: "323",
      name: "Thành phố Hưng Yên",
      CityId: "33",
    },
    {
      id: "325",
      name: "Huyện Văn Lâm",
      CityId: "33",
    },
    {
      id: "326",
      name: "Huyện Văn Giang",
      CityId: "33",
    },
    {
      id: "327",
      name: "Huyện Yên Mỹ",
      CityId: "33",
    },
    {
      id: "328",
      name: "Thị xã Mỹ Hào",
      CityId: "33",
    },
    {
      id: "329",
      name: "Huyện Ân Thi",
      CityId: "33",
    },
    {
      id: "330",
      name: "Huyện Khoái Châu",
      CityId: "33",
    },
    {
      id: "331",
      name: "Huyện Kim Động",
      CityId: "33",
    },
    {
      id: "332",
      name: "Huyện Tiên Lữ",
      CityId: "33",
    },
    {
      id: "333",
      name: "Huyện Phù Cừ",
      CityId: "33",
    },
    {
      id: "336",
      name: "Thành phố Thái Bình",
      CityId: "34",
    },
    {
      id: "338",
      name: "Huyện Quỳnh Phụ",
      CityId: "34",
    },
    {
      id: "339",
      name: "Huyện Hưng Hà",
      CityId: "34",
    },
    {
      id: "340",
      name: "Huyện Đông Hưng",
      CityId: "34",
    },
    {
      id: "341",
      name: "Huyện Thái Thụy",
      CityId: "34",
    },
    {
      id: "342",
      name: "Huyện Tiền Hải",
      CityId: "34",
    },
    {
      id: "343",
      name: "Huyện Kiến Xương",
      CityId: "34",
    },
    {
      id: "344",
      name: "Huyện Vũ Thư",
      CityId: "34",
    },
    {
      id: "347",
      name: "Thành phố Phủ Lý",
      CityId: "35",
    },
    {
      id: "349",
      name: "Thị xã Duy Tiên",
      CityId: "35",
    },
    {
      id: "350",
      name: "Huyện Kim Bảng",
      CityId: "35",
    },
    {
      id: "351",
      name: "Huyện Thanh Liêm",
      CityId: "35",
    },
    {
      id: "352",
      name: "Huyện Bình Lục",
      CityId: "35",
    },
    {
      id: "353",
      name: "Huyện Lý Nhân",
      CityId: "35",
    },
    {
      id: "356",
      name: "Thành phố Nam Định",
      CityId: "36",
    },
    {
      id: "358",
      name: "Huyện Mỹ Lộc",
      CityId: "36",
    },
    {
      id: "359",
      name: "Huyện Vụ Bản",
      CityId: "36",
    },
    {
      id: "360",
      name: "Huyện Ý Yên",
      CityId: "36",
    },
    {
      id: "361",
      name: "Huyện Nghĩa Hưng",
      CityId: "36",
    },
    {
      id: "362",
      name: "Huyện Nam Trực",
      CityId: "36",
    },
    {
      id: "363",
      name: "Huyện Trực Ninh",
      CityId: "36",
    },
    {
      id: "364",
      name: "Huyện Xuân Trường",
      CityId: "36",
    },
    {
      id: "365",
      name: "Huyện Giao Thủy",
      CityId: "36",
    },
    {
      id: "366",
      name: "Huyện Hải Hậu",
      CityId: "36",
    },
    {
      id: "369",
      name: "Thành phố Ninh Bình",
      CityId: "37",
    },
    {
      id: "370",
      name: "Thành phố Tam Điệp",
      CityId: "37",
    },
    {
      id: "372",
      name: "Huyện Nho Quan",
      CityId: "37",
    },
    {
      id: "373",
      name: "Huyện Gia Viễn",
      CityId: "37",
    },
    {
      id: "374",
      name: "Huyện Hoa Lư",
      CityId: "37",
    },
    {
      id: "375",
      name: "Huyện Yên Khánh",
      CityId: "37",
    },
    {
      id: "376",
      name: "Huyện Kim Sơn",
      CityId: "37",
    },
    {
      id: "377",
      name: "Huyện Yên Mô",
      CityId: "37",
    },
    {
      id: "380",
      name: "Thành phố Thanh Hóa",
      CityId: "38",
    },
    {
      id: "381",
      name: "Thị xã Bỉm Sơn",
      CityId: "38",
    },
    {
      id: "382",
      name: "Thành phố Sầm Sơn",
      CityId: "38",
    },
    {
      id: "384",
      name: "Huyện Mường Lát",
      CityId: "38",
    },
    {
      id: "385",
      name: "Huyện Quan Hóa",
      CityId: "38",
    },
    {
      id: "386",
      name: "Huyện Bá Thước",
      CityId: "38",
    },
    {
      id: "387",
      name: "Huyện Quan Sơn",
      CityId: "38",
    },
    {
      id: "388",
      name: "Huyện Lang Chánh",
      CityId: "38",
    },
    {
      id: "389",
      name: "Huyện Ngọc Lặc",
      CityId: "38",
    },
    {
      id: "390",
      name: "Huyện Cẩm Thủy",
      CityId: "38",
    },
    {
      id: "391",
      name: "Huyện Thạch Thành",
      CityId: "38",
    },
    {
      id: "392",
      name: "Huyện Hà Trung",
      CityId: "38",
    },
    {
      id: "393",
      name: "Huyện Vĩnh Lộc",
      CityId: "38",
    },
    {
      id: "394",
      name: "Huyện Yên Định",
      CityId: "38",
    },
    {
      id: "395",
      name: "Huyện Thọ Xuân",
      CityId: "38",
    },
    {
      id: "396",
      name: "Huyện Thường Xuân",
      CityId: "38",
    },
    {
      id: "397",
      name: "Huyện Triệu Sơn",
      CityId: "38",
    },
    {
      id: "398",
      name: "Huyện Thiệu Hóa",
      CityId: "38",
    },
    {
      id: "399",
      name: "Huyện Hoằng Hóa",
      CityId: "38",
    },
    {
      id: "400",
      name: "Huyện Hậu Lộc",
      CityId: "38",
    },
    {
      id: "401",
      name: "Huyện Nga Sơn",
      CityId: "38",
    },
    {
      id: "402",
      name: "Huyện Như Xuân",
      CityId: "38",
    },
    {
      id: "403",
      name: "Huyện Như Thanh",
      CityId: "38",
    },
    {
      id: "404",
      name: "Huyện Nông Cống",
      CityId: "38",
    },
    {
      id: "405",
      name: "Huyện Đông Sơn",
      CityId: "38",
    },
    {
      id: "406",
      name: "Huyện Quảng Xương",
      CityId: "38",
    },
    {
      id: "407",
      name: "Thị xã Nghi Sơn",
      CityId: "38",
    },
    {
      id: "412",
      name: "Thành phố Vinh",
      CityId: "40",
    },
    {
      id: "413",
      name: "Thị xã Cửa Lò",
      CityId: "40",
    },
    {
      id: "414",
      name: "Thị xã Thái Hoà",
      CityId: "40",
    },
    {
      id: "415",
      name: "Huyện Quế Phong",
      CityId: "40",
    },
    {
      id: "416",
      name: "Huyện Quỳ Châu",
      CityId: "40",
    },
    {
      id: "417",
      name: "Huyện Kỳ Sơn",
      CityId: "40",
    },
    {
      id: "418",
      name: "Huyện Tương Dương",
      CityId: "40",
    },
    {
      id: "419",
      name: "Huyện Nghĩa Đàn",
      CityId: "40",
    },
    {
      id: "420",
      name: "Huyện Quỳ Hợp",
      CityId: "40",
    },
    {
      id: "421",
      name: "Huyện Quỳnh Lưu",
      CityId: "40",
    },
    {
      id: "422",
      name: "Huyện Con Cuông",
      CityId: "40",
    },
    {
      id: "423",
      name: "Huyện Tân Kỳ",
      CityId: "40",
    },
    {
      id: "424",
      name: "Huyện Anh Sơn",
      CityId: "40",
    },
    {
      id: "425",
      name: "Huyện Diễn Châu",
      CityId: "40",
    },
    {
      id: "426",
      name: "Huyện Yên Thành",
      CityId: "40",
    },
    {
      id: "427",
      name: "Huyện Đô Lương",
      CityId: "40",
    },
    {
      id: "428",
      name: "Huyện Thanh Chương",
      CityId: "40",
    },
    {
      id: "429",
      name: "Huyện Nghi Lộc",
      CityId: "40",
    },
    {
      id: "430",
      name: "Huyện Nam Đàn",
      CityId: "40",
    },
    {
      id: "431",
      name: "Huyện Hưng Nguyên",
      CityId: "40",
    },
    {
      id: "432",
      name: "Thị xã Hoàng Mai",
      CityId: "40",
    },
    {
      id: "436",
      name: "Thành phố Hà Tĩnh",
      CityId: "42",
    },
    {
      id: "437",
      name: "Thị xã Hồng Lĩnh",
      CityId: "42",
    },
    {
      id: "439",
      name: "Huyện Hương Sơn",
      CityId: "42",
    },
    {
      id: "440",
      name: "Huyện Đức Thọ",
      CityId: "42",
    },
    {
      id: "441",
      name: "Huyện Vũ Quang",
      CityId: "42",
    },
    {
      id: "442",
      name: "Huyện Nghi Xuân",
      CityId: "42",
    },
    {
      id: "443",
      name: "Huyện Can Lộc",
      CityId: "42",
    },
    {
      id: "444",
      name: "Huyện Hương Khê",
      CityId: "42",
    },
    {
      id: "445",
      name: "Huyện Thạch Hà",
      CityId: "42",
    },
    {
      id: "446",
      name: "Huyện Cẩm Xuyên",
      CityId: "42",
    },
    {
      id: "447",
      name: "Huyện Kỳ Anh",
      CityId: "42",
    },
    {
      id: "448",
      name: "Huyện Lộc Hà",
      CityId: "42",
    },
    {
      id: "449",
      name: "Thị xã Kỳ Anh",
      CityId: "42",
    },
    {
      id: "450",
      name: "Thành Phố Đồng Hới",
      CityId: "44",
    },
    {
      id: "452",
      name: "Huyện Minh Hóa",
      CityId: "44",
    },
    {
      id: "453",
      name: "Huyện Tuyên Hóa",
      CityId: "44",
    },
    {
      id: "454",
      name: "Huyện Quảng Trạch",
      CityId: "44",
    },
    {
      id: "455",
      name: "Huyện Bố Trạch",
      CityId: "44",
    },
    {
      id: "456",
      name: "Huyện Quảng Ninh",
      CityId: "44",
    },
    {
      id: "457",
      name: "Huyện Lệ Thủy",
      CityId: "44",
    },
    {
      id: "458",
      name: "Thị xã Ba Đồn",
      CityId: "44",
    },
    {
      id: "461",
      name: "Thành phố Đông Hà",
      CityId: "45",
    },
    {
      id: "462",
      name: "Thị xã Quảng Trị",
      CityId: "45",
    },
    {
      id: "464",
      name: "Huyện Vĩnh Linh",
      CityId: "45",
    },
    {
      id: "465",
      name: "Huyện Hướng Hóa",
      CityId: "45",
    },
    {
      id: "466",
      name: "Huyện Gio Linh",
      CityId: "45",
    },
    {
      id: "467",
      name: "Huyện Đa Krông",
      CityId: "45",
    },
    {
      id: "468",
      name: "Huyện Cam Lộ",
      CityId: "45",
    },
    {
      id: "469",
      name: "Huyện Triệu Phong",
      CityId: "45",
    },
    {
      id: "470",
      name: "Huyện Hải Lăng",
      CityId: "45",
    },
    {
      id: "471",
      name: "Huyện Cồn Cỏ",
      CityId: "45",
    },
    {
      id: "474",
      name: "Thành phố Huế",
      CityId: "46",
    },
    {
      id: "476",
      name: "Huyện Phong Điền",
      CityId: "46",
    },
    {
      id: "477",
      name: "Huyện Quảng Điền",
      CityId: "46",
    },
    {
      id: "478",
      name: "Huyện Phú Vang",
      CityId: "46",
    },
    {
      id: "479",
      name: "Thị xã Hương Thủy",
      CityId: "46",
    },
    {
      id: "480",
      name: "Thị xã Hương Trà",
      CityId: "46",
    },
    {
      id: "481",
      name: "Huyện A Lưới",
      CityId: "46",
    },
    {
      id: "482",
      name: "Huyện Phú Lộc",
      CityId: "46",
    },
    {
      id: "483",
      name: "Huyện Nam Đông",
      CityId: "46",
    },
    {
      id: "490",
      name: "Quận Liên Chiểu",
      CityId: "48",
    },
    {
      id: "491",
      name: "Quận Thanh Khê",
      CityId: "48",
    },
    {
      id: "492",
      name: "Quận Hải Châu",
      CityId: "48",
    },
    {
      id: "493",
      name: "Quận Sơn Trà",
      CityId: "48",
    },
    {
      id: "494",
      name: "Quận Ngũ Hành Sơn",
      CityId: "48",
    },
    {
      id: "495",
      name: "Quận Cẩm Lệ",
      CityId: "48",
    },
    {
      id: "497",
      name: "Huyện Hòa Vang",
      CityId: "48",
    },
    {
      id: "498",
      name: "Huyện Hoàng Sa",
      CityId: "48",
    },
    {
      id: "502",
      name: "Thành phố Tam Kỳ",
      CityId: "49",
    },
    {
      id: "503",
      name: "Thành phố Hội An",
      CityId: "49",
    },
    {
      id: "504",
      name: "Huyện Tây Giang",
      CityId: "49",
    },
    {
      id: "505",
      name: "Huyện Đông Giang",
      CityId: "49",
    },
    {
      id: "506",
      name: "Huyện Đại Lộc",
      CityId: "49",
    },
    {
      id: "507",
      name: "Thị xã Điện Bàn",
      CityId: "49",
    },
    {
      id: "508",
      name: "Huyện Duy Xuyên",
      CityId: "49",
    },
    {
      id: "509",
      name: "Huyện Quế Sơn",
      CityId: "49",
    },
    {
      id: "510",
      name: "Huyện Nam Giang",
      CityId: "49",
    },
    {
      id: "511",
      name: "Huyện Phước Sơn",
      CityId: "49",
    },
    {
      id: "512",
      name: "Huyện Hiệp Đức",
      CityId: "49",
    },
    {
      id: "513",
      name: "Huyện Thăng Bình",
      CityId: "49",
    },
    {
      id: "514",
      name: "Huyện Tiên Phước",
      CityId: "49",
    },
    {
      id: "515",
      name: "Huyện Bắc Trà My",
      CityId: "49",
    },
    {
      id: "516",
      name: "Huyện Nam Trà My",
      CityId: "49",
    },
    {
      id: "517",
      name: "Huyện Núi Thành",
      CityId: "49",
    },
    {
      id: "518",
      name: "Huyện Phú Ninh",
      CityId: "49",
    },
    {
      id: "519",
      name: "Huyện Nông Sơn",
      CityId: "49",
    },
    {
      id: "522",
      name: "Thành phố Quảng Ngãi",
      CityId: "51",
    },
    {
      id: "524",
      name: "Huyện Bình Sơn",
      CityId: "51",
    },
    {
      id: "525",
      name: "Huyện Trà Bồng",
      CityId: "51",
    },
    {
      id: "527",
      name: "Huyện Sơn Tịnh",
      CityId: "51",
    },
    {
      id: "528",
      name: "Huyện Tư Nghĩa",
      CityId: "51",
    },
    {
      id: "529",
      name: "Huyện Sơn Hà",
      CityId: "51",
    },
    {
      id: "530",
      name: "Huyện Sơn Tây",
      CityId: "51",
    },
    {
      id: "531",
      name: "Huyện Minh Long",
      CityId: "51",
    },
    {
      id: "532",
      name: "Huyện Nghĩa Hành",
      CityId: "51",
    },
    {
      id: "533",
      name: "Huyện Mộ Đức",
      CityId: "51",
    },
    {
      id: "534",
      name: "Thị xã Đức Phổ",
      CityId: "51",
    },
    {
      id: "535",
      name: "Huyện Ba Tơ",
      CityId: "51",
    },
    {
      id: "536",
      name: "Huyện Lý Sơn",
      CityId: "51",
    },
    {
      id: "540",
      name: "Thành phố Quy Nhơn",
      CityId: "52",
    },
    {
      id: "542",
      name: "Huyện An Lão",
      CityId: "52",
    },
    {
      id: "543",
      name: "Thị xã Hoài Nhơn",
      CityId: "52",
    },
    {
      id: "544",
      name: "Huyện Hoài Ân",
      CityId: "52",
    },
    {
      id: "545",
      name: "Huyện Phù Mỹ",
      CityId: "52",
    },
    {
      id: "546",
      name: "Huyện Vĩnh Thạnh",
      CityId: "52",
    },
    {
      id: "547",
      name: "Huyện Tây Sơn",
      CityId: "52",
    },
    {
      id: "548",
      name: "Huyện Phù Cát",
      CityId: "52",
    },
    {
      id: "549",
      name: "Thị xã An Nhơn",
      CityId: "52",
    },
    {
      id: "550",
      name: "Huyện Tuy Phước",
      CityId: "52",
    },
    {
      id: "551",
      name: "Huyện Vân Canh",
      CityId: "52",
    },
    {
      id: "555",
      name: "Thành phố Tuy Hoà",
      CityId: "54",
    },
    {
      id: "557",
      name: "Thị xã Sông Cầu",
      CityId: "54",
    },
    {
      id: "558",
      name: "Huyện Đồng Xuân",
      CityId: "54",
    },
    {
      id: "559",
      name: "Huyện Tuy An",
      CityId: "54",
    },
    {
      id: "560",
      name: "Huyện Sơn Hòa",
      CityId: "54",
    },
    {
      id: "561",
      name: "Huyện Sông Hinh",
      CityId: "54",
    },
    {
      id: "562",
      name: "Huyện Tây Hoà",
      CityId: "54",
    },
    {
      id: "563",
      name: "Huyện Phú Hoà",
      CityId: "54",
    },
    {
      id: "564",
      name: "Thị xã Đông Hòa",
      CityId: "54",
    },
    {
      id: "568",
      name: "Thành phố Nha Trang",
      CityId: "56",
    },
    {
      id: "569",
      name: "Thành phố Cam Ranh",
      CityId: "56",
    },
    {
      id: "570",
      name: "Huyện Cam Lâm",
      CityId: "56",
    },
    {
      id: "571",
      name: "Huyện Vạn Ninh",
      CityId: "56",
    },
    {
      id: "572",
      name: "Thị xã Ninh Hòa",
      CityId: "56",
    },
    {
      id: "573",
      name: "Huyện Khánh Vĩnh",
      CityId: "56",
    },
    {
      id: "574",
      name: "Huyện Diên Khánh",
      CityId: "56",
    },
    {
      id: "575",
      name: "Huyện Khánh Sơn",
      CityId: "56",
    },
    {
      id: "576",
      name: "Huyện Trường Sa",
      CityId: "56",
    },
    {
      id: "582",
      name: "Thành phố Phan Rang-Tháp Chàm",
      CityId: "58",
    },
    {
      id: "584",
      name: "Huyện Bác Ái",
      CityId: "58",
    },
    {
      id: "585",
      name: "Huyện Ninh Sơn",
      CityId: "58",
    },
    {
      id: "586",
      name: "Huyện Ninh Hải",
      CityId: "58",
    },
    {
      id: "587",
      name: "Huyện Ninh Phước",
      CityId: "58",
    },
    {
      id: "588",
      name: "Huyện Thuận Bắc",
      CityId: "58",
    },
    {
      id: "589",
      name: "Huyện Thuận Nam",
      CityId: "58",
    },
    {
      id: "593",
      name: "Thành phố Phan Thiết",
      CityId: "60",
    },
    {
      id: "594",
      name: "Thị xã La Gi",
      CityId: "60",
    },
    {
      id: "595",
      name: "Huyện Tuy Phong",
      CityId: "60",
    },
    {
      id: "596",
      name: "Huyện Bắc Bình",
      CityId: "60",
    },
    {
      id: "597",
      name: "Huyện Hàm Thuận Bắc",
      CityId: "60",
    },
    {
      id: "598",
      name: "Huyện Hàm Thuận Nam",
      CityId: "60",
    },
    {
      id: "599",
      name: "Huyện Tánh Linh",
      CityId: "60",
    },
    {
      id: "600",
      name: "Huyện Đức Linh",
      CityId: "60",
    },
    {
      id: "601",
      name: "Huyện Hàm Tân",
      CityId: "60",
    },
    {
      id: "602",
      name: "Huyện Phú Quí",
      CityId: "60",
    },
    {
      id: "608",
      name: "Thành phố Kon Tum",
      CityId: "62",
    },
    {
      id: "610",
      name: "Huyện Đắk Glei",
      CityId: "62",
    },
    {
      id: "611",
      name: "Huyện Ngọc Hồi",
      CityId: "62",
    },
    {
      id: "612",
      name: "Huyện Đắk Tô",
      CityId: "62",
    },
    {
      id: "613",
      name: "Huyện Kon Plông",
      CityId: "62",
    },
    {
      id: "614",
      name: "Huyện Kon Rẫy",
      CityId: "62",
    },
    {
      id: "615",
      name: "Huyện Đắk Hà",
      CityId: "62",
    },
    {
      id: "616",
      name: "Huyện Sa Thầy",
      CityId: "62",
    },
    {
      id: "617",
      name: "Huyện Tu Mơ Rông",
      CityId: "62",
    },
    {
      id: "618",
      name: "Huyện Ia H' Drai",
      CityId: "62",
    },
    {
      id: "622",
      name: "Thành phố Pleiku",
      CityId: "64",
    },
    {
      id: "623",
      name: "Thị xã An Khê",
      CityId: "64",
    },
    {
      id: "624",
      name: "Thị xã Ayun Pa",
      CityId: "64",
    },
    {
      id: "625",
      name: "Huyện KBang",
      CityId: "64",
    },
    {
      id: "626",
      name: "Huyện Đăk Đoa",
      CityId: "64",
    },
    {
      id: "627",
      name: "Huyện Chư Păh",
      CityId: "64",
    },
    {
      id: "628",
      name: "Huyện Ia Grai",
      CityId: "64",
    },
    {
      id: "629",
      name: "Huyện Mang Yang",
      CityId: "64",
    },
    {
      id: "630",
      name: "Huyện Kông Chro",
      CityId: "64",
    },
    {
      id: "631",
      name: "Huyện Đức Cơ",
      CityId: "64",
    },
    {
      id: "632",
      name: "Huyện Chư Prông",
      CityId: "64",
    },
    {
      id: "633",
      name: "Huyện Chư Sê",
      CityId: "64",
    },
    {
      id: "634",
      name: "Huyện Đăk Pơ",
      CityId: "64",
    },
    {
      id: "635",
      name: "Huyện Ia Pa",
      CityId: "64",
    },
    {
      id: "637",
      name: "Huyện Krông Pa",
      CityId: "64",
    },
    {
      id: "638",
      name: "Huyện Phú Thiện",
      CityId: "64",
    },
    {
      id: "639",
      name: "Huyện Chư Pưh",
      CityId: "64",
    },
    {
      id: "643",
      name: "Thành phố Buôn Ma Thuột",
      CityId: "66",
    },
    {
      id: "644",
      name: "Thị Xã Buôn Hồ",
      CityId: "66",
    },
    {
      id: "645",
      name: "Huyện Ea H'leo",
      CityId: "66",
    },
    {
      id: "646",
      name: "Huyện Ea Súp",
      CityId: "66",
    },
    {
      id: "647",
      name: "Huyện Buôn Đôn",
      CityId: "66",
    },
    {
      id: "648",
      name: "Huyện Cư M'gar",
      CityId: "66",
    },
    {
      id: "649",
      name: "Huyện Krông Búk",
      CityId: "66",
    },
    {
      id: "650",
      name: "Huyện Krông Năng",
      CityId: "66",
    },
    {
      id: "651",
      name: "Huyện Ea Kar",
      CityId: "66",
    },
    {
      id: "652",
      name: "Huyện M'Đrắk",
      CityId: "66",
    },
    {
      id: "653",
      name: "Huyện Krông Bông",
      CityId: "66",
    },
    {
      id: "654",
      name: "Huyện Krông Pắc",
      CityId: "66",
    },
    {
      id: "655",
      name: "Huyện Krông A Na",
      CityId: "66",
    },
    {
      id: "656",
      name: "Huyện Lắk",
      CityId: "66",
    },
    {
      id: "657",
      name: "Huyện Cư Kuin",
      CityId: "66",
    },
    {
      id: "660",
      name: "Thành phố Gia Nghĩa",
      CityId: "67",
    },
    {
      id: "661",
      name: "Huyện Đăk Glong",
      CityId: "67",
    },
    {
      id: "662",
      name: "Huyện Cư Jút",
      CityId: "67",
    },
    {
      id: "663",
      name: "Huyện Đắk Mil",
      CityId: "67",
    },
    {
      id: "664",
      name: "Huyện Krông Nô",
      CityId: "67",
    },
    {
      id: "665",
      name: "Huyện Đắk Song",
      CityId: "67",
    },
    {
      id: "666",
      name: "Huyện Đắk R'Lấp",
      CityId: "67",
    },
    {
      id: "667",
      name: "Huyện Tuy Đức",
      CityId: "67",
    },
    {
      id: "672",
      name: "Thành phố Đà Lạt",
      CityId: "68",
    },
    {
      id: "673",
      name: "Thành phố Bảo Lộc",
      CityId: "68",
    },
    {
      id: "674",
      name: "Huyện Đam Rông",
      CityId: "68",
    },
    {
      id: "675",
      name: "Huyện Lạc Dương",
      CityId: "68",
    },
    {
      id: "676",
      name: "Huyện Lâm Hà",
      CityId: "68",
    },
    {
      id: "677",
      name: "Huyện Đơn Dương",
      CityId: "68",
    },
    {
      id: "678",
      name: "Huyện Đức Trọng",
      CityId: "68",
    },
    {
      id: "679",
      name: "Huyện Di Linh",
      CityId: "68",
    },
    {
      id: "680",
      name: "Huyện Bảo Lâm",
      CityId: "68",
    },
    {
      id: "681",
      name: "Huyện Đạ Huoai",
      CityId: "68",
    },
    {
      id: "682",
      name: "Huyện Đạ Tẻh",
      CityId: "68",
    },
    {
      id: "683",
      name: "Huyện Cát Tiên",
      CityId: "68",
    },
    {
      id: "688",
      name: "Thị xã Phước Long",
      CityId: "70",
    },
    {
      id: "689",
      name: "Thành phố Đồng Xoài",
      CityId: "70",
    },
    {
      id: "690",
      name: "Thị xã Bình Long",
      CityId: "70",
    },
    {
      id: "691",
      name: "Huyện Bù Gia Mập",
      CityId: "70",
    },
    {
      id: "692",
      name: "Huyện Lộc Ninh",
      CityId: "70",
    },
    {
      id: "693",
      name: "Huyện Bù Đốp",
      CityId: "70",
    },
    {
      id: "694",
      name: "Huyện Hớn Quản",
      CityId: "70",
    },
    {
      id: "695",
      name: "Huyện Đồng Phú",
      CityId: "70",
    },
    {
      id: "696",
      name: "Huyện Bù Đăng",
      CityId: "70",
    },
    {
      id: "697",
      name: "Thị xã Chơn Thành",
      CityId: "70",
    },
    {
      id: "698",
      name: "Huyện Phú Riềng",
      CityId: "70",
    },
    {
      id: "703",
      name: "Thành phố Tây Ninh",
      CityId: "72",
    },
    {
      id: "705",
      name: "Huyện Tân Biên",
      CityId: "72",
    },
    {
      id: "706",
      name: "Huyện Tân Châu",
      CityId: "72",
    },
    {
      id: "707",
      name: "Huyện Dương Minh Châu",
      CityId: "72",
    },
    {
      id: "708",
      name: "Huyện Châu Thành",
      CityId: "72",
    },
    {
      id: "709",
      name: "Thị xã Hòa Thành",
      CityId: "72",
    },
    {
      id: "710",
      name: "Huyện Gò Dầu",
      CityId: "72",
    },
    {
      id: "711",
      name: "Huyện Bến Cầu",
      CityId: "72",
    },
    {
      id: "712",
      name: "Thị xã Trảng Bàng",
      CityId: "72",
    },
    {
      id: "718",
      name: "Thành phố Thủ Dầu Một",
      CityId: "74",
    },
    {
      id: "719",
      name: "Huyện Bàu Bàng",
      CityId: "74",
    },
    {
      id: "720",
      name: "Huyện Dầu Tiếng",
      CityId: "74",
    },
    {
      id: "721",
      name: "Thị xã Bến Cát",
      CityId: "74",
    },
    {
      id: "722",
      name: "Huyện Phú Giáo",
      CityId: "74",
    },
    {
      id: "723",
      name: "Thị xã Tân Uyên",
      CityId: "74",
    },
    {
      id: "724",
      name: "Thành phố Dĩ An",
      CityId: "74",
    },
    {
      id: "725",
      name: "Thành phố Thuận An",
      CityId: "74",
    },
    {
      id: "726",
      name: "Huyện Bắc Tân Uyên",
      CityId: "74",
    },
    {
      id: "731",
      name: "Thành phố Biên Hòa",
      CityId: "75",
    },
    {
      id: "732",
      name: "Thành phố Long Khánh",
      CityId: "75",
    },
    {
      id: "734",
      name: "Huyện Tân Phú",
      CityId: "75",
    },
    {
      id: "735",
      name: "Huyện Vĩnh Cửu",
      CityId: "75",
    },
    {
      id: "736",
      name: "Huyện Định Quán",
      CityId: "75",
    },
    {
      id: "737",
      name: "Huyện Trảng Bom",
      CityId: "75",
    },
    {
      id: "738",
      name: "Huyện Thống Nhất",
      CityId: "75",
    },
    {
      id: "739",
      name: "Huyện Cẩm Mỹ",
      CityId: "75",
    },
    {
      id: "740",
      name: "Huyện Long Thành",
      CityId: "75",
    },
    {
      id: "741",
      name: "Huyện Xuân Lộc",
      CityId: "75",
    },
    {
      id: "742",
      name: "Huyện Nhơn Trạch",
      CityId: "75",
    },
    {
      id: "747",
      name: "Thành phố Vũng Tàu",
      CityId: "77",
    },
    {
      id: "748",
      name: "Thành phố Bà Rịa",
      CityId: "77",
    },
    {
      id: "750",
      name: "Huyện Châu Đức",
      CityId: "77",
    },
    {
      id: "751",
      name: "Huyện Xuyên Mộc",
      CityId: "77",
    },
    {
      id: "752",
      name: "Huyện Long Điền",
      CityId: "77",
    },
    {
      id: "753",
      name: "Huyện Đất Đỏ",
      CityId: "77",
    },
    {
      id: "754",
      name: "Thị xã Phú Mỹ",
      CityId: "77",
    },
    {
      id: "755",
      name: "Huyện Côn Đảo",
      CityId: "77",
    },
    {
      id: "760",
      name: "Quận 1",
      CityId: "79",
    },
    {
      id: "761",
      name: "Quận 12",
      CityId: "79",
    },
    {
      id: "764",
      name: "Quận Gò Vấp",
      CityId: "79",
    },
    {
      id: "765",
      name: "Quận Bình Thạnh",
      CityId: "79",
    },
    {
      id: "766",
      name: "Quận Tân Bình",
      CityId: "79",
    },
    {
      id: "767",
      name: "Quận Tân Phú",
      CityId: "79",
    },
    {
      id: "768",
      name: "Quận Phú Nhuận",
      CityId: "79",
    },
    {
      id: "769",
      name: "Thành phố Thủ Đức",
      CityId: "79",
    },
    {
      id: "770",
      name: "Quận 3",
      CityId: "79",
    },
    {
      id: "771",
      name: "Quận 10",
      CityId: "79",
    },
    {
      id: "772",
      name: "Quận 11",
      CityId: "79",
    },
    {
      id: "773",
      name: "Quận 4",
      CityId: "79",
    },
    {
      id: "774",
      name: "Quận 5",
      CityId: "79",
    },
    {
      id: "775",
      name: "Quận 6",
      CityId: "79",
    },
    {
      id: "776",
      name: "Quận 8",
      CityId: "79",
    },
    {
      id: "777",
      name: "Quận Bình Tân",
      CityId: "79",
    },
    {
      id: "778",
      name: "Quận 7",
      CityId: "79",
    },
    {
      id: "783",
      name: "Huyện Củ Chi",
      CityId: "79",
    },
    {
      id: "784",
      name: "Huyện Hóc Môn",
      CityId: "79",
    },
    {
      id: "785",
      name: "Huyện Bình Chánh",
      CityId: "79",
    },
    {
      id: "786",
      name: "Huyện Nhà Bè",
      CityId: "79",
    },
    {
      id: "787",
      name: "Huyện Cần Giờ",
      CityId: "79",
    },
    {
      id: "794",
      name: "Thành phố Tân An",
      CityId: "80",
    },
    {
      id: "795",
      name: "Thị xã Kiến Tường",
      CityId: "80",
    },
    {
      id: "796",
      name: "Huyện Tân Hưng",
      CityId: "80",
    },
    {
      id: "797",
      name: "Huyện Vĩnh Hưng",
      CityId: "80",
    },
    {
      id: "798",
      name: "Huyện Mộc Hóa",
      CityId: "80",
    },
    {
      id: "799",
      name: "Huyện Tân Thạnh",
      CityId: "80",
    },
    {
      id: "800",
      name: "Huyện Thạnh Hóa",
      CityId: "80",
    },
    {
      id: "801",
      name: "Huyện Đức Huệ",
      CityId: "80",
    },
    {
      id: "802",
      name: "Huyện Đức Hòa",
      CityId: "80",
    },
    {
      id: "803",
      name: "Huyện Bến Lức",
      CityId: "80",
    },
    {
      id: "804",
      name: "Huyện Thủ Thừa",
      CityId: "80",
    },
    {
      id: "805",
      name: "Huyện Tân Trụ",
      CityId: "80",
    },
    {
      id: "806",
      name: "Huyện Cần Đước",
      CityId: "80",
    },
    {
      id: "807",
      name: "Huyện Cần Giuộc",
      CityId: "80",
    },
    {
      id: "808",
      name: "Huyện Châu Thành",
      CityId: "80",
    },
    {
      id: "815",
      name: "Thành phố Mỹ Tho",
      CityId: "82",
    },
    {
      id: "816",
      name: "Thị xã Gò Công",
      CityId: "82",
    },
    {
      id: "817",
      name: "Thị xã Cai Lậy",
      CityId: "82",
    },
    {
      id: "818",
      name: "Huyện Tân Phước",
      CityId: "82",
    },
    {
      id: "819",
      name: "Huyện Cái Bè",
      CityId: "82",
    },
    {
      id: "820",
      name: "Huyện Cai Lậy",
      CityId: "82",
    },
    {
      id: "821",
      name: "Huyện Châu Thành",
      CityId: "82",
    },
    {
      id: "822",
      name: "Huyện Chợ Gạo",
      CityId: "82",
    },
    {
      id: "823",
      name: "Huyện Gò Công Tây",
      CityId: "82",
    },
    {
      id: "824",
      name: "Huyện Gò Công Đông",
      CityId: "82",
    },
    {
      id: "825",
      name: "Huyện Tân Phú Đông",
      CityId: "82",
    },
    {
      id: "829",
      name: "Thành phố Bến Tre",
      CityId: "83",
    },
    {
      id: "831",
      name: "Huyện Châu Thành",
      CityId: "83",
    },
    {
      id: "832",
      name: "Huyện Chợ Lách",
      CityId: "83",
    },
    {
      id: "833",
      name: "Huyện Mỏ Cày Nam",
      CityId: "83",
    },
    {
      id: "834",
      name: "Huyện Giồng Trôm",
      CityId: "83",
    },
    {
      id: "835",
      name: "Huyện Bình Đại",
      CityId: "83",
    },
    {
      id: "836",
      name: "Huyện Ba Tri",
      CityId: "83",
    },
    {
      id: "837",
      name: "Huyện Thạnh Phú",
      CityId: "83",
    },
    {
      id: "838",
      name: "Huyện Mỏ Cày Bắc",
      CityId: "83",
    },
    {
      id: "842",
      name: "Thành phố Trà Vinh",
      CityId: "84",
    },
    {
      id: "844",
      name: "Huyện Càng Long",
      CityId: "84",
    },
    {
      id: "845",
      name: "Huyện Cầu Kè",
      CityId: "84",
    },
    {
      id: "846",
      name: "Huyện Tiểu Cần",
      CityId: "84",
    },
    {
      id: "847",
      name: "Huyện Châu Thành",
      CityId: "84",
    },
    {
      id: "848",
      name: "Huyện Cầu Ngang",
      CityId: "84",
    },
    {
      id: "849",
      name: "Huyện Trà Cú",
      CityId: "84",
    },
    {
      id: "850",
      name: "Huyện Duyên Hải",
      CityId: "84",
    },
    {
      id: "851",
      name: "Thị xã Duyên Hải",
      CityId: "84",
    },
    {
      id: "855",
      name: "Thành phố Vĩnh Long",
      CityId: "86",
    },
    {
      id: "857",
      name: "Huyện Long Hồ",
      CityId: "86",
    },
    {
      id: "858",
      name: "Huyện Mang Thít",
      CityId: "86",
    },
    {
      id: "859",
      name: "Huyện  Vũng Liêm",
      CityId: "86",
    },
    {
      id: "860",
      name: "Huyện Tam Bình",
      CityId: "86",
    },
    {
      id: "861",
      name: "Thị xã Bình Minh",
      CityId: "86",
    },
    {
      id: "862",
      name: "Huyện Trà Ôn",
      CityId: "86",
    },
    {
      id: "863",
      name: "Huyện Bình Tân",
      CityId: "86",
    },
    {
      id: "866",
      name: "Thành phố Cao Lãnh",
      CityId: "87",
    },
    {
      id: "867",
      name: "Thành phố Sa Đéc",
      CityId: "87",
    },
    {
      id: "868",
      name: "Thành phố Hồng Ngự",
      CityId: "87",
    },
    {
      id: "869",
      name: "Huyện Tân Hồng",
      CityId: "87",
    },
    {
      id: "870",
      name: "Huyện Hồng Ngự",
      CityId: "87",
    },
    {
      id: "871",
      name: "Huyện Tam Nông",
      CityId: "87",
    },
    {
      id: "872",
      name: "Huyện Tháp Mười",
      CityId: "87",
    },
    {
      id: "873",
      name: "Huyện Cao Lãnh",
      CityId: "87",
    },
    {
      id: "874",
      name: "Huyện Thanh Bình",
      CityId: "87",
    },
    {
      id: "875",
      name: "Huyện Lấp Vò",
      CityId: "87",
    },
    {
      id: "876",
      name: "Huyện Lai Vung",
      CityId: "87",
    },
    {
      id: "877",
      name: "Huyện Châu Thành",
      CityId: "87",
    },
    {
      id: "883",
      name: "Thành phố Long Xuyên",
      CityId: "89",
    },
    {
      id: "884",
      name: "Thành phố Châu Đốc",
      CityId: "89",
    },
    {
      id: "886",
      name: "Huyện An Phú",
      CityId: "89",
    },
    {
      id: "887",
      name: "Thị xã Tân Châu",
      CityId: "89",
    },
    {
      id: "888",
      name: "Huyện Phú Tân",
      CityId: "89",
    },
    {
      id: "889",
      name: "Huyện Châu Phú",
      CityId: "89",
    },
    {
      id: "890",
      name: "Huyện Tịnh Biên",
      CityId: "89",
    },
    {
      id: "891",
      name: "Huyện Tri Tôn",
      CityId: "89",
    },
    {
      id: "892",
      name: "Huyện Châu Thành",
      CityId: "89",
    },
    {
      id: "893",
      name: "Huyện Chợ Mới",
      CityId: "89",
    },
    {
      id: "894",
      name: "Huyện Thoại Sơn",
      CityId: "89",
    },
    {
      id: "899",
      name: "Thành phố Rạch Giá",
      CityId: "91",
    },
    {
      id: "900",
      name: "Thành phố Hà Tiên",
      CityId: "91",
    },
    {
      id: "902",
      name: "Huyện Kiên Lương",
      CityId: "91",
    },
    {
      id: "903",
      name: "Huyện Hòn Đất",
      CityId: "91",
    },
    {
      id: "904",
      name: "Huyện Tân Hiệp",
      CityId: "91",
    },
    {
      id: "905",
      name: "Huyện Châu Thành",
      CityId: "91",
    },
    {
      id: "906",
      name: "Huyện Giồng Riềng",
      CityId: "91",
    },
    {
      id: "907",
      name: "Huyện Gò Quao",
      CityId: "91",
    },
    {
      id: "908",
      name: "Huyện An Biên",
      CityId: "91",
    },
    {
      id: "909",
      name: "Huyện An Minh",
      CityId: "91",
    },
    {
      id: "910",
      name: "Huyện Vĩnh Thuận",
      CityId: "91",
    },
    {
      id: "911",
      name: "Thành phố Phú Quốc",
      CityId: "91",
    },
    {
      id: "912",
      name: "Huyện Kiên Hải",
      CityId: "91",
    },
    {
      id: "913",
      name: "Huyện U Minh Thượng",
      CityId: "91",
    },
    {
      id: "914",
      name: "Huyện Giang Thành",
      CityId: "91",
    },
    {
      id: "916",
      name: "Quận Ninh Kiều",
      CityId: "92",
    },
    {
      id: "917",
      name: "Quận Ô Môn",
      CityId: "92",
    },
    {
      id: "918",
      name: "Quận Bình Thuỷ",
      CityId: "92",
    },
    {
      id: "919",
      name: "Quận Cái Răng",
      CityId: "92",
    },
    {
      id: "923",
      name: "Quận Thốt Nốt",
      CityId: "92",
    },
    {
      id: "924",
      name: "Huyện Vĩnh Thạnh",
      CityId: "92",
    },
    {
      id: "925",
      name: "Huyện Cờ Đỏ",
      CityId: "92",
    },
    {
      id: "926",
      name: "Huyện Phong Điền",
      CityId: "92",
    },
    {
      id: "927",
      name: "Huyện Thới Lai",
      CityId: "92",
    },
    {
      id: "930",
      name: "Thành phố Vị Thanh",
      CityId: "93",
    },
    {
      id: "931",
      name: "Thành phố Ngã Bảy",
      CityId: "93",
    },
    {
      id: "932",
      name: "Huyện Châu Thành A",
      CityId: "93",
    },
    {
      id: "933",
      name: "Huyện Châu Thành",
      CityId: "93",
    },
    {
      id: "934",
      name: "Huyện Phụng Hiệp",
      CityId: "93",
    },
    {
      id: "935",
      name: "Huyện Vị Thuỷ",
      CityId: "93",
    },
    {
      id: "936",
      name: "Huyện Long Mỹ",
      CityId: "93",
    },
    {
      id: "937",
      name: "Thị xã Long Mỹ",
      CityId: "93",
    },
    {
      id: "941",
      name: "Thành phố Sóc Trăng",
      CityId: "94",
    },
    {
      id: "942",
      name: "Huyện Châu Thành",
      CityId: "94",
    },
    {
      id: "943",
      name: "Huyện Kế Sách",
      CityId: "94",
    },
    {
      id: "944",
      name: "Huyện Mỹ Tú",
      CityId: "94",
    },
    {
      id: "945",
      name: "Huyện Cù Lao Dung",
      CityId: "94",
    },
    {
      id: "946",
      name: "Huyện Long Phú",
      CityId: "94",
    },
    {
      id: "947",
      name: "Huyện Mỹ Xuyên",
      CityId: "94",
    },
    {
      id: "948",
      name: "Thị xã Ngã Năm",
      CityId: "94",
    },
    {
      id: "949",
      name: "Huyện Thạnh Trị",
      CityId: "94",
    },
    {
      id: "950",
      name: "Thị xã Vĩnh Châu",
      CityId: "94",
    },
    {
      id: "951",
      name: "Huyện Trần Đề",
      CityId: "94",
    },
    {
      id: "954",
      name: "Thành phố Bạc Liêu",
      CityId: "95",
    },
    {
      id: "956",
      name: "Huyện Hồng Dân",
      CityId: "95",
    },
    {
      id: "957",
      name: "Huyện Phước Long",
      CityId: "95",
    },
    {
      id: "958",
      name: "Huyện Vĩnh Lợi",
      CityId: "95",
    },
    {
      id: "959",
      name: "Thị xã Giá Rai",
      CityId: "95",
    },
    {
      id: "960",
      name: "Huyện Đông Hải",
      CityId: "95",
    },
    {
      id: "961",
      name: "Huyện Hoà Bình",
      CityId: "95",
    },
    {
      id: "964",
      name: "Thành phố Cà Mau",
      CityId: "96",
    },
    {
      id: "966",
      name: "Huyện U Minh",
      CityId: "96",
    },
    {
      id: "967",
      name: "Huyện Thới Bình",
      CityId: "96",
    },
    {
      id: "968",
      name: "Huyện Trần Văn Thời",
      CityId: "96",
    },
    {
      id: "969",
      name: "Huyện Cái Nước",
      CityId: "96",
    },
    {
      id: "970",
      name: "Huyện Đầm Dơi",
      CityId: "96",
    },
    {
      id: "971",
      name: "Huyện Năm Căn",
      CityId: "96",
    },
    {
      id: "972",
      name: "Huyện Phú Tân",
      CityId: "96",
    },
    {
      id: "973",
      name: "Huyện Ngọc Hiển",
      CityId: "96",
    },
  ],
  wards: [
    {
      id: "00001",
      name: "Phường Phúc Xá",
      DistrictId: "001",
    },
    {
      id: "00004",
      name: "Phường Trúc Bạch",
      DistrictId: "001",
    },
    {
      id: "00006",
      name: "Phường Vĩnh Phúc",
      DistrictId: "001",
    },
    {
      id: "00007",
      name: "Phường Cống Vị",
      DistrictId: "001",
    },
    {
      id: "00008",
      name: "Phường Liễu Giai",
      DistrictId: "001",
    },
    {
      id: "00010",
      name: "Phường Nguyễn Trung Trực",
      DistrictId: "001",
    },
    {
      id: "00013",
      name: "Phường Quán Thánh",
      DistrictId: "001",
    },
    {
      id: "00016",
      name: "Phường Ngọc Hà",
      DistrictId: "001",
    },
    {
      id: "00019",
      name: "Phường Điện Biên",
      DistrictId: "001",
    },
    {
      id: "00022",
      name: "Phường Đội Cấn",
      DistrictId: "001",
    },
    {
      id: "00025",
      name: "Phường Ngọc Khánh",
      DistrictId: "001",
    },
    {
      id: "00028",
      name: "Phường Kim Mã",
      DistrictId: "001",
    },
    {
      id: "00031",
      name: "Phường Giảng Võ",
      DistrictId: "001",
    },
    {
      id: "00034",
      name: "Phường Thành Công",
      DistrictId: "001",
    },
    {
      id: "00037",
      name: "Phường Phúc Tân",
      DistrictId: "002",
    },
    {
      id: "00040",
      name: "Phường Đồng Xuân",
      DistrictId: "002",
    },
    {
      id: "00043",
      name: "Phường Hàng Mã",
      DistrictId: "002",
    },
    {
      id: "00046",
      name: "Phường Hàng Buồm",
      DistrictId: "002",
    },
    {
      id: "00049",
      name: "Phường Hàng Đào",
      DistrictId: "002",
    },
    {
      id: "00052",
      name: "Phường Hàng Bồ",
      DistrictId: "002",
    },
    {
      id: "00055",
      name: "Phường Cửa Đông",
      DistrictId: "002",
    },
    {
      id: "00058",
      name: "Phường Lý Thái Tổ",
      DistrictId: "002",
    },
    {
      id: "00061",
      name: "Phường Hàng Bạc",
      DistrictId: "002",
    },
    {
      id: "00064",
      name: "Phường Hàng Gai",
      DistrictId: "002",
    },
    {
      id: "00067",
      name: "Phường Chương Dương",
      DistrictId: "002",
    },
    {
      id: "00070",
      name: "Phường Hàng Trống",
      DistrictId: "002",
    },
    {
      id: "00073",
      name: "Phường Cửa Nam",
      DistrictId: "002",
    },
    {
      id: "00076",
      name: "Phường Hàng Bông",
      DistrictId: "002",
    },
    {
      id: "00079",
      name: "Phường Tràng Tiền",
      DistrictId: "002",
    },
    {
      id: "00082",
      name: "Phường Trần Hưng Đạo",
      DistrictId: "002",
    },
    {
      id: "00085",
      name: "Phường Phan Chu Trinh",
      DistrictId: "002",
    },
    {
      id: "00088",
      name: "Phường Hàng Bài",
      DistrictId: "002",
    },
    {
      id: "00091",
      name: "Phường Phú Thượng",
      DistrictId: "003",
    },
    {
      id: "00094",
      name: "Phường Nhật Tân",
      DistrictId: "003",
    },
    {
      id: "00097",
      name: "Phường Tứ Liên",
      DistrictId: "003",
    },
    {
      id: "00100",
      name: "Phường Quảng An",
      DistrictId: "003",
    },
    {
      id: "00103",
      name: "Phường Xuân La",
      DistrictId: "003",
    },
    {
      id: "00106",
      name: "Phường Yên Phụ",
      DistrictId: "003",
    },
    {
      id: "00109",
      name: "Phường Bưởi",
      DistrictId: "003",
    },
    {
      id: "00112",
      name: "Phường Thụy Khuê",
      DistrictId: "003",
    },
    {
      id: "00115",
      name: "Phường Thượng Thanh",
      DistrictId: "004",
    },
    {
      id: "00118",
      name: "Phường Ngọc Thụy",
      DistrictId: "004",
    },
    {
      id: "00121",
      name: "Phường Giang Biên",
      DistrictId: "004",
    },
    {
      id: "00124",
      name: "Phường Đức Giang",
      DistrictId: "004",
    },
    {
      id: "00127",
      name: "Phường Việt Hưng",
      DistrictId: "004",
    },
    {
      id: "00130",
      name: "Phường Gia Thụy",
      DistrictId: "004",
    },
    {
      id: "00133",
      name: "Phường Ngọc Lâm",
      DistrictId: "004",
    },
    {
      id: "00136",
      name: "Phường Phúc Lợi",
      DistrictId: "004",
    },
    {
      id: "00139",
      name: "Phường Bồ Đề",
      DistrictId: "004",
    },
    {
      id: "00142",
      name: "Phường Sài Đồng",
      DistrictId: "004",
    },
    {
      id: "00145",
      name: "Phường Long Biên",
      DistrictId: "004",
    },
    {
      id: "00148",
      name: "Phường Thạch Bàn",
      DistrictId: "004",
    },
    {
      id: "00151",
      name: "Phường Phúc Đồng",
      DistrictId: "004",
    },
    {
      id: "00154",
      name: "Phường Cự Khối",
      DistrictId: "004",
    },
    {
      id: "00157",
      name: "Phường Nghĩa Đô",
      DistrictId: "005",
    },
    {
      id: "00160",
      name: "Phường Nghĩa Tân",
      DistrictId: "005",
    },
    {
      id: "00163",
      name: "Phường Mai Dịch",
      DistrictId: "005",
    },
    {
      id: "00166",
      name: "Phường Dịch Vọng",
      DistrictId: "005",
    },
    {
      id: "00167",
      name: "Phường Dịch Vọng Hậu",
      DistrictId: "005",
    },
    {
      id: "00169",
      name: "Phường Quan Hoa",
      DistrictId: "005",
    },
    {
      id: "00172",
      name: "Phường Yên Hoà",
      DistrictId: "005",
    },
    {
      id: "00175",
      name: "Phường Trung Hoà",
      DistrictId: "005",
    },
    {
      id: "00178",
      name: "Phường Cát Linh",
      DistrictId: "006",
    },
    {
      id: "00181",
      name: "Phường Văn Miếu",
      DistrictId: "006",
    },
    {
      id: "00184",
      name: "Phường Quốc Tử Giám",
      DistrictId: "006",
    },
    {
      id: "00187",
      name: "Phường Láng Thượng",
      DistrictId: "006",
    },
    {
      id: "00190",
      name: "Phường Ô Chợ Dừa",
      DistrictId: "006",
    },
    {
      id: "00193",
      name: "Phường Văn Chương",
      DistrictId: "006",
    },
    {
      id: "00196",
      name: "Phường Hàng Bột",
      DistrictId: "006",
    },
    {
      id: "00199",
      name: "Phường Láng Hạ",
      DistrictId: "006",
    },
    {
      id: "00202",
      name: "Phường Khâm Thiên",
      DistrictId: "006",
    },
    {
      id: "00205",
      name: "Phường Thổ Quan",
      DistrictId: "006",
    },
    {
      id: "00208",
      name: "Phường Nam Đồng",
      DistrictId: "006",
    },
    {
      id: "00211",
      name: "Phường Trung Phụng",
      DistrictId: "006",
    },
    {
      id: "00214",
      name: "Phường Quang Trung",
      DistrictId: "006",
    },
    {
      id: "00217",
      name: "Phường Trung Liệt",
      DistrictId: "006",
    },
    {
      id: "00220",
      name: "Phường Phương Liên",
      DistrictId: "006",
    },
    {
      id: "00223",
      name: "Phường Thịnh Quang",
      DistrictId: "006",
    },
    {
      id: "00226",
      name: "Phường Trung Tự",
      DistrictId: "006",
    },
    {
      id: "00229",
      name: "Phường Kim Liên",
      DistrictId: "006",
    },
    {
      id: "00232",
      name: "Phường Phương Mai",
      DistrictId: "006",
    },
    {
      id: "00235",
      name: "Phường Ngã Tư Sở",
      DistrictId: "006",
    },
    {
      id: "00238",
      name: "Phường Khương Thượng",
      DistrictId: "006",
    },
    {
      id: "00241",
      name: "Phường Nguyễn Du",
      DistrictId: "007",
    },
    {
      id: "00244",
      name: "Phường Bạch Đằng",
      DistrictId: "007",
    },
    {
      id: "00247",
      name: "Phường Phạm Đình Hổ",
      DistrictId: "007",
    },
    {
      id: "00256",
      name: "Phường Lê Đại Hành",
      DistrictId: "007",
    },
    {
      id: "00259",
      name: "Phường Đồng Nhân",
      DistrictId: "007",
    },
    {
      id: "00262",
      name: "Phường Phố Huế",
      DistrictId: "007",
    },
    {
      id: "00265",
      name: "Phường Đống Mác",
      DistrictId: "007",
    },
    {
      id: "00268",
      name: "Phường Thanh Lương",
      DistrictId: "007",
    },
    {
      id: "00271",
      name: "Phường Thanh Nhàn",
      DistrictId: "007",
    },
    {
      id: "00274",
      name: "Phường Cầu Dền",
      DistrictId: "007",
    },
    {
      id: "00277",
      name: "Phường Bách Khoa",
      DistrictId: "007",
    },
    {
      id: "00280",
      name: "Phường Đồng Tâm",
      DistrictId: "007",
    },
    {
      id: "00283",
      name: "Phường Vĩnh Tuy",
      DistrictId: "007",
    },
    {
      id: "00286",
      name: "Phường Bạch Mai",
      DistrictId: "007",
    },
    {
      id: "00289",
      name: "Phường Quỳnh Mai",
      DistrictId: "007",
    },
    {
      id: "00292",
      name: "Phường Quỳnh Lôi",
      DistrictId: "007",
    },
    {
      id: "00295",
      name: "Phường Minh Khai",
      DistrictId: "007",
    },
    {
      id: "00298",
      name: "Phường Trương Định",
      DistrictId: "007",
    },
    {
      id: "00301",
      name: "Phường Thanh Trì",
      DistrictId: "008",
    },
    {
      id: "00304",
      name: "Phường Vĩnh Hưng",
      DistrictId: "008",
    },
    {
      id: "00307",
      name: "Phường Định Công",
      DistrictId: "008",
    },
    {
      id: "00310",
      name: "Phường Mai Động",
      DistrictId: "008",
    },
    {
      id: "00313",
      name: "Phường Tương Mai",
      DistrictId: "008",
    },
    {
      id: "00316",
      name: "Phường Đại Kim",
      DistrictId: "008",
    },
    {
      id: "00319",
      name: "Phường Tân Mai",
      DistrictId: "008",
    },
    {
      id: "00322",
      name: "Phường Hoàng Văn Thụ",
      DistrictId: "008",
    },
    {
      id: "00325",
      name: "Phường Giáp Bát",
      DistrictId: "008",
    },
    {
      id: "00328",
      name: "Phường Lĩnh Nam",
      DistrictId: "008",
    },
    {
      id: "00331",
      name: "Phường Thịnh Liệt",
      DistrictId: "008",
    },
    {
      id: "00334",
      name: "Phường Trần Phú",
      DistrictId: "008",
    },
    {
      id: "00337",
      name: "Phường Hoàng Liệt",
      DistrictId: "008",
    },
    {
      id: "00340",
      name: "Phường Yên Sở",
      DistrictId: "008",
    },
    {
      id: "00343",
      name: "Phường Nhân Chính",
      DistrictId: "009",
    },
    {
      id: "00346",
      name: "Phường Thượng Đình",
      DistrictId: "009",
    },
    {
      id: "00349",
      name: "Phường Khương Trung",
      DistrictId: "009",
    },
    {
      id: "00352",
      name: "Phường Khương Mai",
      DistrictId: "009",
    },
    {
      id: "00355",
      name: "Phường Thanh Xuân Trung",
      DistrictId: "009",
    },
    {
      id: "00358",
      name: "Phường Phương Liệt",
      DistrictId: "009",
    },
    {
      id: "00361",
      name: "Phường Hạ Đình",
      DistrictId: "009",
    },
    {
      id: "00364",
      name: "Phường Khương Đình",
      DistrictId: "009",
    },
    {
      id: "00367",
      name: "Phường Thanh Xuân Bắc",
      DistrictId: "009",
    },
    {
      id: "00370",
      name: "Phường Thanh Xuân Nam",
      DistrictId: "009",
    },
    {
      id: "00373",
      name: "Phường Kim Giang",
      DistrictId: "009",
    },
    {
      id: "00376",
      name: "Thị trấn Sóc Sơn",
      DistrictId: "016",
    },
    {
      id: "00379",
      name: "Xã Bắc Sơn",
      DistrictId: "016",
    },
    {
      id: "00382",
      name: "Xã Minh Trí",
      DistrictId: "016",
    },
    {
      id: "00385",
      name: "Xã Hồng Kỳ",
      DistrictId: "016",
    },
    {
      id: "00388",
      name: "Xã Nam Sơn",
      DistrictId: "016",
    },
    {
      id: "00391",
      name: "Xã Trung Giã",
      DistrictId: "016",
    },
    {
      id: "00394",
      name: "Xã Tân Hưng",
      DistrictId: "016",
    },
    {
      id: "00397",
      name: "Xã Minh Phú",
      DistrictId: "016",
    },
    {
      id: "00400",
      name: "Xã Phù Linh",
      DistrictId: "016",
    },
    {
      id: "00403",
      name: "Xã Bắc Phú",
      DistrictId: "016",
    },
    {
      id: "00406",
      name: "Xã Tân Minh",
      DistrictId: "016",
    },
    {
      id: "00409",
      name: "Xã Quang Tiến",
      DistrictId: "016",
    },
    {
      id: "00412",
      name: "Xã Hiền Ninh",
      DistrictId: "016",
    },
    {
      id: "00415",
      name: "Xã Tân Dân",
      DistrictId: "016",
    },
    {
      id: "00418",
      name: "Xã Tiên Dược",
      DistrictId: "016",
    },
    {
      id: "00421",
      name: "Xã Việt Long",
      DistrictId: "016",
    },
    {
      id: "00424",
      name: "Xã Xuân Giang",
      DistrictId: "016",
    },
    {
      id: "00427",
      name: "Xã Mai Đình",
      DistrictId: "016",
    },
    {
      id: "00430",
      name: "Xã Đức Hoà",
      DistrictId: "016",
    },
    {
      id: "00433",
      name: "Xã Thanh Xuân",
      DistrictId: "016",
    },
    {
      id: "00436",
      name: "Xã Đông Xuân",
      DistrictId: "016",
    },
    {
      id: "00439",
      name: "Xã Kim Lũ",
      DistrictId: "016",
    },
    {
      id: "00442",
      name: "Xã Phú Cường",
      DistrictId: "016",
    },
    {
      id: "00445",
      name: "Xã Phú Minh",
      DistrictId: "016",
    },
    {
      id: "00448",
      name: "Xã Phù Lỗ",
      DistrictId: "016",
    },
    {
      id: "00451",
      name: "Xã Xuân Thu",
      DistrictId: "016",
    },
    {
      id: "00454",
      name: "Thị trấn Đông Anh",
      DistrictId: "017",
    },
    {
      id: "00457",
      name: "Xã Xuân Nộn",
      DistrictId: "017",
    },
    {
      id: "00460",
      name: "Xã Thuỵ Lâm",
      DistrictId: "017",
    },
    {
      id: "00463",
      name: "Xã Bắc Hồng",
      DistrictId: "017",
    },
    {
      id: "00466",
      name: "Xã Nguyên Khê",
      DistrictId: "017",
    },
    {
      id: "00469",
      name: "Xã Nam Hồng",
      DistrictId: "017",
    },
    {
      id: "00472",
      name: "Xã Tiên Dương",
      DistrictId: "017",
    },
    {
      id: "00475",
      name: "Xã Vân Hà",
      DistrictId: "017",
    },
    {
      id: "00478",
      name: "Xã Uy Nỗ",
      DistrictId: "017",
    },
    {
      id: "00481",
      name: "Xã Vân Nội",
      DistrictId: "017",
    },
    {
      id: "00484",
      name: "Xã Liên Hà",
      DistrictId: "017",
    },
    {
      id: "00487",
      name: "Xã Việt Hùng",
      DistrictId: "017",
    },
    {
      id: "00490",
      name: "Xã Kim Nỗ",
      DistrictId: "017",
    },
    {
      id: "00493",
      name: "Xã Kim Chung",
      DistrictId: "017",
    },
    {
      id: "00496",
      name: "Xã Dục Tú",
      DistrictId: "017",
    },
    {
      id: "00499",
      name: "Xã Đại Mạch",
      DistrictId: "017",
    },
    {
      id: "00502",
      name: "Xã Vĩnh Ngọc",
      DistrictId: "017",
    },
    {
      id: "00505",
      name: "Xã Cổ Loa",
      DistrictId: "017",
    },
    {
      id: "00508",
      name: "Xã Hải Bối",
      DistrictId: "017",
    },
    {
      id: "00511",
      name: "Xã Xuân Canh",
      DistrictId: "017",
    },
    {
      id: "00514",
      name: "Xã Võng La",
      DistrictId: "017",
    },
    {
      id: "00517",
      name: "Xã Tàm Xá",
      DistrictId: "017",
    },
    {
      id: "00520",
      name: "Xã Mai Lâm",
      DistrictId: "017",
    },
    {
      id: "00523",
      name: "Xã Đông Hội",
      DistrictId: "017",
    },
    {
      id: "00526",
      name: "Thị trấn Yên Viên",
      DistrictId: "018",
    },
    {
      id: "00529",
      name: "Xã Yên Thường",
      DistrictId: "018",
    },
    {
      id: "00532",
      name: "Xã Yên Viên",
      DistrictId: "018",
    },
    {
      id: "00535",
      name: "Xã Ninh Hiệp",
      DistrictId: "018",
    },
    {
      id: "00538",
      name: "Xã Đình Xuyên",
      DistrictId: "018",
    },
    {
      id: "00541",
      name: "Xã Dương Hà",
      DistrictId: "018",
    },
    {
      id: "00544",
      name: "Xã Phù Đổng",
      DistrictId: "018",
    },
    {
      id: "00547",
      name: "Xã Trung Mầu",
      DistrictId: "018",
    },
    {
      id: "00550",
      name: "Xã Lệ Chi",
      DistrictId: "018",
    },
    {
      id: "00553",
      name: "Xã Cổ Bi",
      DistrictId: "018",
    },
    {
      id: "00556",
      name: "Xã Đặng Xá",
      DistrictId: "018",
    },
    {
      id: "00559",
      name: "Xã Phú Thị",
      DistrictId: "018",
    },
    {
      id: "00562",
      name: "Xã Kim Sơn",
      DistrictId: "018",
    },
    {
      id: "00565",
      name: "Thị trấn Trâu Quỳ",
      DistrictId: "018",
    },
    {
      id: "00568",
      name: "Xã Dương Quang",
      DistrictId: "018",
    },
    {
      id: "00571",
      name: "Xã Dương Xá",
      DistrictId: "018",
    },
    {
      id: "00574",
      name: "Xã Đông Dư",
      DistrictId: "018",
    },
    {
      id: "00577",
      name: "Xã Đa Tốn",
      DistrictId: "018",
    },
    {
      id: "00580",
      name: "Xã Kiêu Kỵ",
      DistrictId: "018",
    },
    {
      id: "00583",
      name: "Xã Bát Tràng",
      DistrictId: "018",
    },
    {
      id: "00586",
      name: "Xã Kim Lan",
      DistrictId: "018",
    },
    {
      id: "00589",
      name: "Xã Văn Đức",
      DistrictId: "018",
    },
    {
      id: "00592",
      name: "Phường Cầu Diễn",
      DistrictId: "019",
    },
    {
      id: "00595",
      name: "Phường Thượng Cát",
      DistrictId: "021",
    },
    {
      id: "00598",
      name: "Phường Liên Mạc",
      DistrictId: "021",
    },
    {
      id: "00601",
      name: "Phường Đông Ngạc",
      DistrictId: "021",
    },
    {
      id: "00602",
      name: "Phường Đức Thắng",
      DistrictId: "021",
    },
    {
      id: "00604",
      name: "Phường Thụy Phương",
      DistrictId: "021",
    },
    {
      id: "00607",
      name: "Phường Tây Tựu",
      DistrictId: "021",
    },
    {
      id: "00610",
      name: "Phường Xuân Đỉnh",
      DistrictId: "021",
    },
    {
      id: "00611",
      name: "Phường Xuân Tảo",
      DistrictId: "021",
    },
    {
      id: "00613",
      name: "Phường Minh Khai",
      DistrictId: "021",
    },
    {
      id: "00616",
      name: "Phường Cổ Nhuế 1",
      DistrictId: "021",
    },
    {
      id: "00617",
      name: "Phường Cổ Nhuế 2",
      DistrictId: "021",
    },
    {
      id: "00619",
      name: "Phường Phú Diễn",
      DistrictId: "021",
    },
    {
      id: "00620",
      name: "Phường Phúc Diễn",
      DistrictId: "021",
    },
    {
      id: "00622",
      name: "Phường Xuân Phương",
      DistrictId: "019",
    },
    {
      id: "00623",
      name: "Phường Phương Canh",
      DistrictId: "019",
    },
    {
      id: "00625",
      name: "Phường Mỹ Đình 1",
      DistrictId: "019",
    },
    {
      id: "00626",
      name: "Phường Mỹ Đình 2",
      DistrictId: "019",
    },
    {
      id: "00628",
      name: "Phường Tây Mỗ",
      DistrictId: "019",
    },
    {
      id: "00631",
      name: "Phường Mễ Trì",
      DistrictId: "019",
    },
    {
      id: "00632",
      name: "Phường Phú Đô",
      DistrictId: "019",
    },
    {
      id: "00634",
      name: "Phường Đại Mỗ",
      DistrictId: "019",
    },
    {
      id: "00637",
      name: "Phường Trung Văn",
      DistrictId: "019",
    },
    {
      id: "00640",
      name: "Thị trấn Văn Điển",
      DistrictId: "020",
    },
    {
      id: "00643",
      name: "Xã Tân Triều",
      DistrictId: "020",
    },
    {
      id: "00646",
      name: "Xã Thanh Liệt",
      DistrictId: "020",
    },
    {
      id: "00649",
      name: "Xã Tả Thanh Oai",
      DistrictId: "020",
    },
    {
      id: "00652",
      name: "Xã Hữu Hoà",
      DistrictId: "020",
    },
    {
      id: "00655",
      name: "Xã Tam Hiệp",
      DistrictId: "020",
    },
    {
      id: "00658",
      name: "Xã Tứ Hiệp",
      DistrictId: "020",
    },
    {
      id: "00661",
      name: "Xã Yên Mỹ",
      DistrictId: "020",
    },
    {
      id: "00664",
      name: "Xã Vĩnh Quỳnh",
      DistrictId: "020",
    },
    {
      id: "00667",
      name: "Xã Ngũ Hiệp",
      DistrictId: "020",
    },
    {
      id: "00670",
      name: "Xã Duyên Hà",
      DistrictId: "020",
    },
    {
      id: "00673",
      name: "Xã Ngọc Hồi",
      DistrictId: "020",
    },
    {
      id: "00676",
      name: "Xã Vạn Phúc",
      DistrictId: "020",
    },
    {
      id: "00679",
      name: "Xã Đại áng",
      DistrictId: "020",
    },
    {
      id: "00682",
      name: "Xã Liên Ninh",
      DistrictId: "020",
    },
    {
      id: "00685",
      name: "Xã Đông Mỹ",
      DistrictId: "020",
    },
    {
      id: "00688",
      name: "Phường Quang Trung",
      DistrictId: "024",
    },
    {
      id: "00691",
      name: "Phường Trần Phú",
      DistrictId: "024",
    },
    {
      id: "00692",
      name: "Phường Ngọc Hà",
      DistrictId: "024",
    },
    {
      id: "00694",
      name: "Phường Nguyễn Trãi",
      DistrictId: "024",
    },
    {
      id: "00697",
      name: "Phường Minh Khai",
      DistrictId: "024",
    },
    {
      id: "00700",
      name: "Xã Ngọc Đường",
      DistrictId: "024",
    },
    {
      id: "00703",
      name: "Xã Kim Thạch",
      DistrictId: "030",
    },
    {
      id: "00706",
      name: "Xã Phú Linh",
      DistrictId: "030",
    },
    {
      id: "00709",
      name: "Xã Kim Linh",
      DistrictId: "030",
    },
    {
      id: "00712",
      name: "Thị trấn Phó Bảng",
      DistrictId: "026",
    },
    {
      id: "00715",
      name: "Xã Lũng Cú",
      DistrictId: "026",
    },
    {
      id: "00718",
      name: "Xã Má Lé",
      DistrictId: "026",
    },
    {
      id: "00721",
      name: "Thị trấn Đồng Văn",
      DistrictId: "026",
    },
    {
      id: "00724",
      name: "Xã Lũng Táo",
      DistrictId: "026",
    },
    {
      id: "00727",
      name: "Xã Phố Là",
      DistrictId: "026",
    },
    {
      id: "00730",
      name: "Xã Thài Phìn Tủng",
      DistrictId: "026",
    },
    {
      id: "00733",
      name: "Xã Sủng Là",
      DistrictId: "026",
    },
    {
      id: "00736",
      name: "Xã Xà Phìn",
      DistrictId: "026",
    },
    {
      id: "00739",
      name: "Xã Tả Phìn",
      DistrictId: "026",
    },
    {
      id: "00742",
      name: "Xã Tả Lủng",
      DistrictId: "026",
    },
    {
      id: "00745",
      name: "Xã Phố Cáo",
      DistrictId: "026",
    },
    {
      id: "00748",
      name: "Xã Sính Lủng",
      DistrictId: "026",
    },
    {
      id: "00751",
      name: "Xã Sảng Tủng",
      DistrictId: "026",
    },
    {
      id: "00754",
      name: "Xã Lũng Thầu",
      DistrictId: "026",
    },
    {
      id: "00757",
      name: "Xã Hố Quáng Phìn",
      DistrictId: "026",
    },
    {
      id: "00760",
      name: "Xã Vần Chải",
      DistrictId: "026",
    },
    {
      id: "00763",
      name: "Xã Lũng Phìn",
      DistrictId: "026",
    },
    {
      id: "00766",
      name: "Xã Sủng Trái",
      DistrictId: "026",
    },
    {
      id: "00769",
      name: "Thị trấn Mèo Vạc",
      DistrictId: "027",
    },
    {
      id: "00772",
      name: "Xã Thượng Phùng",
      DistrictId: "027",
    },
    {
      id: "00775",
      name: "Xã Pải Lủng",
      DistrictId: "027",
    },
    {
      id: "00778",
      name: "Xã Xín Cái",
      DistrictId: "027",
    },
    {
      id: "00781",
      name: "Xã Pả Vi",
      DistrictId: "027",
    },
    {
      id: "00784",
      name: "Xã Giàng Chu Phìn",
      DistrictId: "027",
    },
    {
      id: "00787",
      name: "Xã Sủng Trà",
      DistrictId: "027",
    },
    {
      id: "00790",
      name: "Xã Sủng Máng",
      DistrictId: "027",
    },
    {
      id: "00793",
      name: "Xã Sơn Vĩ",
      DistrictId: "027",
    },
    {
      id: "00796",
      name: "Xã Tả Lủng",
      DistrictId: "027",
    },
    {
      id: "00799",
      name: "Xã Cán Chu Phìn",
      DistrictId: "027",
    },
    {
      id: "00802",
      name: "Xã Lũng Pù",
      DistrictId: "027",
    },
    {
      id: "00805",
      name: "Xã Lũng Chinh",
      DistrictId: "027",
    },
    {
      id: "00808",
      name: "Xã Tát Ngà",
      DistrictId: "027",
    },
    {
      id: "00811",
      name: "Xã Nậm Ban",
      DistrictId: "027",
    },
    {
      id: "00814",
      name: "Xã Khâu Vai",
      DistrictId: "027",
    },
    {
      id: "00815",
      name: "Xã Niêm Tòng",
      DistrictId: "027",
    },
    {
      id: "00817",
      name: "Xã Niêm Sơn",
      DistrictId: "027",
    },
    {
      id: "00820",
      name: "Thị trấn Yên Minh",
      DistrictId: "028",
    },
    {
      id: "00823",
      name: "Xã Thắng Mố",
      DistrictId: "028",
    },
    {
      id: "00826",
      name: "Xã Phú Lũng",
      DistrictId: "028",
    },
    {
      id: "00829",
      name: "Xã Sủng Tráng",
      DistrictId: "028",
    },
    {
      id: "00832",
      name: "Xã Bạch Đích",
      DistrictId: "028",
    },
    {
      id: "00835",
      name: "Xã Na Khê",
      DistrictId: "028",
    },
    {
      id: "00838",
      name: "Xã Sủng Thài",
      DistrictId: "028",
    },
    {
      id: "00841",
      name: "Xã Hữu Vinh",
      DistrictId: "028",
    },
    {
      id: "00844",
      name: "Xã Lao Và Chải",
      DistrictId: "028",
    },
    {
      id: "00847",
      name: "Xã Mậu Duệ",
      DistrictId: "028",
    },
    {
      id: "00850",
      name: "Xã Đông Minh",
      DistrictId: "028",
    },
    {
      id: "00853",
      name: "Xã Mậu Long",
      DistrictId: "028",
    },
    {
      id: "00856",
      name: "Xã Ngam La",
      DistrictId: "028",
    },
    {
      id: "00859",
      name: "Xã Ngọc Long",
      DistrictId: "028",
    },
    {
      id: "00862",
      name: "Xã Đường Thượng",
      DistrictId: "028",
    },
    {
      id: "00865",
      name: "Xã Lũng Hồ",
      DistrictId: "028",
    },
    {
      id: "00868",
      name: "Xã Du Tiến",
      DistrictId: "028",
    },
    {
      id: "00871",
      name: "Xã Du Già",
      DistrictId: "028",
    },
    {
      id: "00874",
      name: "Thị trấn Tam Sơn",
      DistrictId: "029",
    },
    {
      id: "00877",
      name: "Xã Bát Đại Sơn",
      DistrictId: "029",
    },
    {
      id: "00880",
      name: "Xã Nghĩa Thuận",
      DistrictId: "029",
    },
    {
      id: "00883",
      name: "Xã Cán Tỷ",
      DistrictId: "029",
    },
    {
      id: "00886",
      name: "Xã Cao Mã Pờ",
      DistrictId: "029",
    },
    {
      id: "00889",
      name: "Xã Thanh Vân",
      DistrictId: "029",
    },
    {
      id: "00892",
      name: "Xã Tùng Vài",
      DistrictId: "029",
    },
    {
      id: "00895",
      name: "Xã Đông Hà",
      DistrictId: "029",
    },
    {
      id: "00898",
      name: "Xã Quản Bạ",
      DistrictId: "029",
    },
    {
      id: "00901",
      name: "Xã Lùng Tám",
      DistrictId: "029",
    },
    {
      id: "00904",
      name: "Xã Quyết Tiến",
      DistrictId: "029",
    },
    {
      id: "00907",
      name: "Xã Tả Ván",
      DistrictId: "029",
    },
    {
      id: "00910",
      name: "Xã Thái An",
      DistrictId: "029",
    },
    {
      id: "00913",
      name: "Thị trấn Vị Xuyên",
      DistrictId: "030",
    },
    {
      id: "00916",
      name: "Thị trấn Nông Trường Việt Lâm",
      DistrictId: "030",
    },
    {
      id: "00919",
      name: "Xã Minh Tân",
      DistrictId: "030",
    },
    {
      id: "00922",
      name: "Xã Thuận Hoà",
      DistrictId: "030",
    },
    {
      id: "00925",
      name: "Xã Tùng Bá",
      DistrictId: "030",
    },
    {
      id: "00928",
      name: "Xã Thanh Thủy",
      DistrictId: "030",
    },
    {
      id: "00931",
      name: "Xã Thanh Đức",
      DistrictId: "030",
    },
    {
      id: "00934",
      name: "Xã Phong Quang",
      DistrictId: "030",
    },
    {
      id: "00937",
      name: "Xã Xín Chải",
      DistrictId: "030",
    },
    {
      id: "00940",
      name: "Xã Phương Tiến",
      DistrictId: "030",
    },
    {
      id: "00943",
      name: "Xã Lao Chải",
      DistrictId: "030",
    },
    {
      id: "00946",
      name: "Xã Phương Độ",
      DistrictId: "024",
    },
    {
      id: "00949",
      name: "Xã Phương Thiện",
      DistrictId: "024",
    },
    {
      id: "00952",
      name: "Xã Cao Bồ",
      DistrictId: "030",
    },
    {
      id: "00955",
      name: "Xã Đạo Đức",
      DistrictId: "030",
    },
    {
      id: "00958",
      name: "Xã Thượng Sơn",
      DistrictId: "030",
    },
    {
      id: "00961",
      name: "Xã Linh Hồ",
      DistrictId: "030",
    },
    {
      id: "00964",
      name: "Xã Quảng Ngần",
      DistrictId: "030",
    },
    {
      id: "00967",
      name: "Xã Việt Lâm",
      DistrictId: "030",
    },
    {
      id: "00970",
      name: "Xã Ngọc Linh",
      DistrictId: "030",
    },
    {
      id: "00973",
      name: "Xã Ngọc Minh",
      DistrictId: "030",
    },
    {
      id: "00976",
      name: "Xã Bạch Ngọc",
      DistrictId: "030",
    },
    {
      id: "00979",
      name: "Xã Trung Thành",
      DistrictId: "030",
    },
    {
      id: "00982",
      name: "Xã Minh Sơn",
      DistrictId: "031",
    },
    {
      id: "00985",
      name: "Xã Giáp Trung",
      DistrictId: "031",
    },
    {
      id: "00988",
      name: "Xã Yên Định",
      DistrictId: "031",
    },
    {
      id: "00991",
      name: "Thị trấn Yên Phú",
      DistrictId: "031",
    },
    {
      id: "00994",
      name: "Xã Minh Ngọc",
      DistrictId: "031",
    },
    {
      id: "00997",
      name: "Xã Yên Phong",
      DistrictId: "031",
    },
    {
      id: "01000",
      name: "Xã Lạc Nông",
      DistrictId: "031",
    },
    {
      id: "01003",
      name: "Xã Phú Nam",
      DistrictId: "031",
    },
    {
      id: "01006",
      name: "Xã Yên Cường",
      DistrictId: "031",
    },
    {
      id: "01009",
      name: "Xã Thượng Tân",
      DistrictId: "031",
    },
    {
      id: "01012",
      name: "Xã Đường Âm",
      DistrictId: "031",
    },
    {
      id: "01015",
      name: "Xã Đường Hồng",
      DistrictId: "031",
    },
    {
      id: "01018",
      name: "Xã Phiêng Luông",
      DistrictId: "031",
    },
    {
      id: "01021",
      name: "Thị trấn Vinh Quang",
      DistrictId: "032",
    },
    {
      id: "01024",
      name: "Xã Bản Máy",
      DistrictId: "032",
    },
    {
      id: "01027",
      name: "Xã Thàng Tín",
      DistrictId: "032",
    },
    {
      id: "01030",
      name: "Xã Thèn Chu Phìn",
      DistrictId: "032",
    },
    {
      id: "01033",
      name: "Xã Pố Lồ",
      DistrictId: "032",
    },
    {
      id: "01036",
      name: "Xã Bản Phùng",
      DistrictId: "032",
    },
    {
      id: "01039",
      name: "Xã Túng Sán",
      DistrictId: "032",
    },
    {
      id: "01042",
      name: "Xã Chiến Phố",
      DistrictId: "032",
    },
    {
      id: "01045",
      name: "Xã Đản Ván",
      DistrictId: "032",
    },
    {
      id: "01048",
      name: "Xã Tụ Nhân",
      DistrictId: "032",
    },
    {
      id: "01051",
      name: "Xã Tân Tiến",
      DistrictId: "032",
    },
    {
      id: "01054",
      name: "Xã Nàng Đôn",
      DistrictId: "032",
    },
    {
      id: "01057",
      name: "Xã Pờ Ly Ngài",
      DistrictId: "032",
    },
    {
      id: "01060",
      name: "Xã Sán Xả Hồ",
      DistrictId: "032",
    },
    {
      id: "01063",
      name: "Xã Bản Luốc",
      DistrictId: "032",
    },
    {
      id: "01066",
      name: "Xã Ngàm Đăng Vài",
      DistrictId: "032",
    },
    {
      id: "01069",
      name: "Xã Bản Nhùng",
      DistrictId: "032",
    },
    {
      id: "01072",
      name: "Xã Tả Sử Choóng",
      DistrictId: "032",
    },
    {
      id: "01075",
      name: "Xã Nậm Dịch",
      DistrictId: "032",
    },
    {
      id: "01081",
      name: "Xã Hồ Thầu",
      DistrictId: "032",
    },
    {
      id: "01084",
      name: "Xã Nam Sơn",
      DistrictId: "032",
    },
    {
      id: "01087",
      name: "Xã Nậm Tỵ",
      DistrictId: "032",
    },
    {
      id: "01090",
      name: "Xã Thông Nguyên",
      DistrictId: "032",
    },
    {
      id: "01093",
      name: "Xã Nậm Khòa",
      DistrictId: "032",
    },
    {
      id: "01096",
      name: "Thị trấn Cốc Pài",
      DistrictId: "033",
    },
    {
      id: "01099",
      name: "Xã Nàn Xỉn",
      DistrictId: "033",
    },
    {
      id: "01102",
      name: "Xã Bản Díu",
      DistrictId: "033",
    },
    {
      id: "01105",
      name: "Xã Chí Cà",
      DistrictId: "033",
    },
    {
      id: "01108",
      name: "Xã Xín Mần",
      DistrictId: "033",
    },
    {
      id: "01114",
      name: "Xã Thèn Phàng",
      DistrictId: "033",
    },
    {
      id: "01117",
      name: "Xã Trung Thịnh",
      DistrictId: "033",
    },
    {
      id: "01120",
      name: "Xã Pà Vầy Sủ",
      DistrictId: "033",
    },
    {
      id: "01123",
      name: "Xã Cốc Rế",
      DistrictId: "033",
    },
    {
      id: "01126",
      name: "Xã Thu Tà",
      DistrictId: "033",
    },
    {
      id: "01129",
      name: "Xã Nàn Ma",
      DistrictId: "033",
    },
    {
      id: "01132",
      name: "Xã Tả Nhìu",
      DistrictId: "033",
    },
    {
      id: "01135",
      name: "Xã Bản Ngò",
      DistrictId: "033",
    },
    {
      id: "01138",
      name: "Xã Chế Là",
      DistrictId: "033",
    },
    {
      id: "01141",
      name: "Xã Nấm Dẩn",
      DistrictId: "033",
    },
    {
      id: "01144",
      name: "Xã Quảng Nguyên",
      DistrictId: "033",
    },
    {
      id: "01147",
      name: "Xã Nà Chì",
      DistrictId: "033",
    },
    {
      id: "01150",
      name: "Xã Khuôn Lùng",
      DistrictId: "033",
    },
    {
      id: "01153",
      name: "Thị trấn Việt Quang",
      DistrictId: "034",
    },
    {
      id: "01156",
      name: "Thị trấn Vĩnh Tuy",
      DistrictId: "034",
    },
    {
      id: "01159",
      name: "Xã Tân Lập",
      DistrictId: "034",
    },
    {
      id: "01162",
      name: "Xã Tân Thành",
      DistrictId: "034",
    },
    {
      id: "01165",
      name: "Xã Đồng Tiến",
      DistrictId: "034",
    },
    {
      id: "01168",
      name: "Xã Đồng Tâm",
      DistrictId: "034",
    },
    {
      id: "01171",
      name: "Xã Tân Quang",
      DistrictId: "034",
    },
    {
      id: "01174",
      name: "Xã Thượng Bình",
      DistrictId: "034",
    },
    {
      id: "01177",
      name: "Xã Hữu Sản",
      DistrictId: "034",
    },
    {
      id: "01180",
      name: "Xã Kim Ngọc",
      DistrictId: "034",
    },
    {
      id: "01183",
      name: "Xã Việt Vinh",
      DistrictId: "034",
    },
    {
      id: "01186",
      name: "Xã Bằng Hành",
      DistrictId: "034",
    },
    {
      id: "01189",
      name: "Xã Quang Minh",
      DistrictId: "034",
    },
    {
      id: "01192",
      name: "Xã Liên Hiệp",
      DistrictId: "034",
    },
    {
      id: "01195",
      name: "Xã Vô Điếm",
      DistrictId: "034",
    },
    {
      id: "01198",
      name: "Xã Việt Hồng",
      DistrictId: "034",
    },
    {
      id: "01201",
      name: "Xã Hùng An",
      DistrictId: "034",
    },
    {
      id: "01204",
      name: "Xã Đức Xuân",
      DistrictId: "034",
    },
    {
      id: "01207",
      name: "Xã Tiên Kiều",
      DistrictId: "034",
    },
    {
      id: "01210",
      name: "Xã Vĩnh Hảo",
      DistrictId: "034",
    },
    {
      id: "01213",
      name: "Xã Vĩnh Phúc",
      DistrictId: "034",
    },
    {
      id: "01216",
      name: "Xã Đồng Yên",
      DistrictId: "034",
    },
    {
      id: "01219",
      name: "Xã Đông Thành",
      DistrictId: "034",
    },
    {
      id: "01222",
      name: "Xã Xuân Minh",
      DistrictId: "035",
    },
    {
      id: "01225",
      name: "Xã Tiên Nguyên",
      DistrictId: "035",
    },
    {
      id: "01228",
      name: "Xã Tân Nam",
      DistrictId: "035",
    },
    {
      id: "01231",
      name: "Xã Bản Rịa",
      DistrictId: "035",
    },
    {
      id: "01234",
      name: "Xã Yên Thành",
      DistrictId: "035",
    },
    {
      id: "01237",
      name: "Thị trấn Yên Bình",
      DistrictId: "035",
    },
    {
      id: "01240",
      name: "Xã Tân Trịnh",
      DistrictId: "035",
    },
    {
      id: "01243",
      name: "Xã Tân Bắc",
      DistrictId: "035",
    },
    {
      id: "01246",
      name: "Xã Bằng Lang",
      DistrictId: "035",
    },
    {
      id: "01249",
      name: "Xã Yên Hà",
      DistrictId: "035",
    },
    {
      id: "01252",
      name: "Xã Hương Sơn",
      DistrictId: "035",
    },
    {
      id: "01255",
      name: "Xã Xuân Giang",
      DistrictId: "035",
    },
    {
      id: "01258",
      name: "Xã Nà Khương",
      DistrictId: "035",
    },
    {
      id: "01261",
      name: "Xã Tiên Yên",
      DistrictId: "035",
    },
    {
      id: "01264",
      name: "Xã Vĩ Thượng",
      DistrictId: "035",
    },
    {
      id: "01267",
      name: "Phường Sông Hiến",
      DistrictId: "040",
    },
    {
      id: "01270",
      name: "Phường Sông Bằng",
      DistrictId: "040",
    },
    {
      id: "01273",
      name: "Phường Hợp Giang",
      DistrictId: "040",
    },
    {
      id: "01276",
      name: "Phường Tân Giang",
      DistrictId: "040",
    },
    {
      id: "01279",
      name: "Phường Ngọc Xuân",
      DistrictId: "040",
    },
    {
      id: "01282",
      name: "Phường Đề Thám",
      DistrictId: "040",
    },
    {
      id: "01285",
      name: "Phường Hoà Chung",
      DistrictId: "040",
    },
    {
      id: "01288",
      name: "Phường Duyệt Trung",
      DistrictId: "040",
    },
    {
      id: "01290",
      name: "Thị trấn Pác Miầu",
      DistrictId: "042",
    },
    {
      id: "01291",
      name: "Xã Đức Hạnh",
      DistrictId: "042",
    },
    {
      id: "01294",
      name: "Xã Lý Bôn",
      DistrictId: "042",
    },
    {
      id: "01296",
      name: "Xã Nam Cao",
      DistrictId: "042",
    },
    {
      id: "01297",
      name: "Xã Nam Quang",
      DistrictId: "042",
    },
    {
      id: "01300",
      name: "Xã Vĩnh Quang",
      DistrictId: "042",
    },
    {
      id: "01303",
      name: "Xã Quảng Lâm",
      DistrictId: "042",
    },
    {
      id: "01304",
      name: "Xã Thạch Lâm",
      DistrictId: "042",
    },
    {
      id: "01309",
      name: "Xã Vĩnh Phong",
      DistrictId: "042",
    },
    {
      id: "01312",
      name: "Xã Mông Ân",
      DistrictId: "042",
    },
    {
      id: "01315",
      name: "Xã Thái Học",
      DistrictId: "042",
    },
    {
      id: "01316",
      name: "Xã Thái Sơn",
      DistrictId: "042",
    },
    {
      id: "01318",
      name: "Xã Yên Thổ",
      DistrictId: "042",
    },
    {
      id: "01321",
      name: "Thị trấn Bảo Lạc",
      DistrictId: "043",
    },
    {
      id: "01324",
      name: "Xã Cốc Pàng",
      DistrictId: "043",
    },
    {
      id: "01327",
      name: "Xã Thượng Hà",
      DistrictId: "043",
    },
    {
      id: "01330",
      name: "Xã Cô Ba",
      DistrictId: "043",
    },
    {
      id: "01333",
      name: "Xã Bảo Toàn",
      DistrictId: "043",
    },
    {
      id: "01336",
      name: "Xã Khánh Xuân",
      DistrictId: "043",
    },
    {
      id: "01339",
      name: "Xã Xuân Trường",
      DistrictId: "043",
    },
    {
      id: "01342",
      name: "Xã Hồng Trị",
      DistrictId: "043",
    },
    {
      id: "01343",
      name: "Xã Kim Cúc",
      DistrictId: "043",
    },
    {
      id: "01345",
      name: "Xã Phan Thanh",
      DistrictId: "043",
    },
    {
      id: "01348",
      name: "Xã Hồng An",
      DistrictId: "043",
    },
    {
      id: "01351",
      name: "Xã Hưng Đạo",
      DistrictId: "043",
    },
    {
      id: "01352",
      name: "Xã Hưng Thịnh",
      DistrictId: "043",
    },
    {
      id: "01354",
      name: "Xã Huy Giáp",
      DistrictId: "043",
    },
    {
      id: "01357",
      name: "Xã Đình Phùng",
      DistrictId: "043",
    },
    {
      id: "01359",
      name: "Xã Sơn Lập",
      DistrictId: "043",
    },
    {
      id: "01360",
      name: "Xã Sơn Lộ",
      DistrictId: "043",
    },
    {
      id: "01363",
      name: "Thị trấn Thông Nông",
      DistrictId: "045",
    },
    {
      id: "01366",
      name: "Xã Cần Yên",
      DistrictId: "045",
    },
    {
      id: "01367",
      name: "Xã Cần Nông",
      DistrictId: "045",
    },
    {
      id: "01372",
      name: "Xã Lương Thông",
      DistrictId: "045",
    },
    {
      id: "01375",
      name: "Xã Đa Thông",
      DistrictId: "045",
    },
    {
      id: "01378",
      name: "Xã Ngọc Động",
      DistrictId: "045",
    },
    {
      id: "01381",
      name: "Xã Yên Sơn",
      DistrictId: "045",
    },
    {
      id: "01384",
      name: "Xã Lương Can",
      DistrictId: "045",
    },
    {
      id: "01387",
      name: "Xã Thanh Long",
      DistrictId: "045",
    },
    {
      id: "01392",
      name: "Thị trấn Xuân Hòa",
      DistrictId: "045",
    },
    {
      id: "01393",
      name: "Xã Lũng Nặm",
      DistrictId: "045",
    },
    {
      id: "01399",
      name: "Xã Trường Hà",
      DistrictId: "045",
    },
    {
      id: "01402",
      name: "Xã Cải Viên",
      DistrictId: "045",
    },
    {
      id: "01411",
      name: "Xã Nội Thôn",
      DistrictId: "045",
    },
    {
      id: "01414",
      name: "Xã Tổng Cọt",
      DistrictId: "045",
    },
    {
      id: "01417",
      name: "Xã Sóc Hà",
      DistrictId: "045",
    },
    {
      id: "01420",
      name: "Xã Thượng Thôn",
      DistrictId: "045",
    },
    {
      id: "01429",
      name: "Xã Hồng Sỹ",
      DistrictId: "045",
    },
    {
      id: "01432",
      name: "Xã Quý Quân",
      DistrictId: "045",
    },
    {
      id: "01435",
      name: "Xã Mã Ba",
      DistrictId: "045",
    },
    {
      id: "01438",
      name: "Xã Ngọc Đào",
      DistrictId: "045",
    },
    {
      id: "01447",
      name: "Thị trấn Trà Lĩnh",
      DistrictId: "047",
    },
    {
      id: "01453",
      name: "Xã Tri Phương",
      DistrictId: "047",
    },
    {
      id: "01456",
      name: "Xã Quang Hán",
      DistrictId: "047",
    },
    {
      id: "01462",
      name: "Xã Xuân Nội",
      DistrictId: "047",
    },
    {
      id: "01465",
      name: "Xã Quang Trung",
      DistrictId: "047",
    },
    {
      id: "01468",
      name: "Xã Quang Vinh",
      DistrictId: "047",
    },
    {
      id: "01471",
      name: "Xã Cao Chương",
      DistrictId: "047",
    },
    {
      id: "01474",
      name: "Xã Quốc Toản",
      DistrictId: "049",
    },
    {
      id: "01477",
      name: "Thị trấn Trùng Khánh",
      DistrictId: "047",
    },
    {
      id: "01480",
      name: "Xã Ngọc Khê",
      DistrictId: "047",
    },
    {
      id: "01481",
      name: "Xã Ngọc Côn",
      DistrictId: "047",
    },
    {
      id: "01483",
      name: "Xã Phong Nậm",
      DistrictId: "047",
    },
    {
      id: "01489",
      name: "Xã Đình Phong",
      DistrictId: "047",
    },
    {
      id: "01495",
      name: "Xã Đàm Thuỷ",
      DistrictId: "047",
    },
    {
      id: "01498",
      name: "Xã Khâm Thành",
      DistrictId: "047",
    },
    {
      id: "01501",
      name: "Xã Chí Viễn",
      DistrictId: "047",
    },
    {
      id: "01504",
      name: "Xã Lăng Hiếu",
      DistrictId: "047",
    },
    {
      id: "01507",
      name: "Xã Phong Châu",
      DistrictId: "047",
    },
    {
      id: "01516",
      name: "Xã Trung Phúc",
      DistrictId: "047",
    },
    {
      id: "01519",
      name: "Xã Cao Thăng",
      DistrictId: "047",
    },
    {
      id: "01522",
      name: "Xã Đức Hồng",
      DistrictId: "047",
    },
    {
      id: "01525",
      name: "Xã Đoài Dương",
      DistrictId: "047",
    },
    {
      id: "01534",
      name: "Xã Minh Long",
      DistrictId: "048",
    },
    {
      id: "01537",
      name: "Xã Lý Quốc",
      DistrictId: "048",
    },
    {
      id: "01540",
      name: "Xã Thắng Lợi",
      DistrictId: "048",
    },
    {
      id: "01543",
      name: "Xã Đồng Loan",
      DistrictId: "048",
    },
    {
      id: "01546",
      name: "Xã Đức Quang",
      DistrictId: "048",
    },
    {
      id: "01549",
      name: "Xã Kim Loan",
      DistrictId: "048",
    },
    {
      id: "01552",
      name: "Xã Quang Long",
      DistrictId: "048",
    },
    {
      id: "01555",
      name: "Xã An Lạc",
      DistrictId: "048",
    },
    {
      id: "01558",
      name: "Thị trấn Thanh Nhật",
      DistrictId: "048",
    },
    {
      id: "01561",
      name: "Xã Vinh Quý",
      DistrictId: "048",
    },
    {
      id: "01564",
      name: "Xã Thống Nhất",
      DistrictId: "048",
    },
    {
      id: "01567",
      name: "Xã Cô Ngân",
      DistrictId: "048",
    },
    {
      id: "01573",
      name: "Xã Thị Hoa",
      DistrictId: "048",
    },
    {
      id: "01576",
      name: "Thị trấn Quảng Uyên",
      DistrictId: "049",
    },
    {
      id: "01579",
      name: "Xã Phi Hải",
      DistrictId: "049",
    },
    {
      id: "01582",
      name: "Xã Quảng Hưng",
      DistrictId: "049",
    },
    {
      id: "01594",
      name: "Xã Độc Lập",
      DistrictId: "049",
    },
    {
      id: "01597",
      name: "Xã Cai Bộ",
      DistrictId: "049",
    },
    {
      id: "01603",
      name: "Xã Phúc Sen",
      DistrictId: "049",
    },
    {
      id: "01606",
      name: "Xã Chí Thảo",
      DistrictId: "049",
    },
    {
      id: "01609",
      name: "Xã Tự Do",
      DistrictId: "049",
    },
    {
      id: "01615",
      name: "Xã Hồng Quang",
      DistrictId: "049",
    },
    {
      id: "01618",
      name: "Xã Ngọc Động",
      DistrictId: "049",
    },
    {
      id: "01624",
      name: "Xã Hạnh Phúc",
      DistrictId: "049",
    },
    {
      id: "01627",
      name: "Thị trấn Tà Lùng",
      DistrictId: "049",
    },
    {
      id: "01630",
      name: "Xã Bế Văn Đàn",
      DistrictId: "049",
    },
    {
      id: "01636",
      name: "Xã Cách Linh",
      DistrictId: "049",
    },
    {
      id: "01639",
      name: "Xã Đại Sơn",
      DistrictId: "049",
    },
    {
      id: "01645",
      name: "Xã Tiên Thành",
      DistrictId: "049",
    },
    {
      id: "01648",
      name: "Thị trấn Hoà Thuận",
      DistrictId: "049",
    },
    {
      id: "01651",
      name: "Xã Mỹ Hưng",
      DistrictId: "049",
    },
    {
      id: "01654",
      name: "Thị trấn Nước Hai",
      DistrictId: "051",
    },
    {
      id: "01657",
      name: "Xã Dân Chủ",
      DistrictId: "051",
    },
    {
      id: "01660",
      name: "Xã Nam Tuấn",
      DistrictId: "051",
    },
    {
      id: "01666",
      name: "Xã Đại Tiến",
      DistrictId: "051",
    },
    {
      id: "01669",
      name: "Xã Đức Long",
      DistrictId: "051",
    },
    {
      id: "01672",
      name: "Xã Ngũ Lão",
      DistrictId: "051",
    },
    {
      id: "01675",
      name: "Xã Trương Lương",
      DistrictId: "051",
    },
    {
      id: "01687",
      name: "Xã Hồng Việt",
      DistrictId: "051",
    },
    {
      id: "01693",
      name: "Xã Vĩnh Quang",
      DistrictId: "040",
    },
    {
      id: "01696",
      name: "Xã Hoàng Tung",
      DistrictId: "051",
    },
    {
      id: "01699",
      name: "Xã Nguyễn Huệ",
      DistrictId: "051",
    },
    {
      id: "01702",
      name: "Xã Quang Trung",
      DistrictId: "051",
    },
    {
      id: "01705",
      name: "Xã Hưng Đạo",
      DistrictId: "040",
    },
    {
      id: "01708",
      name: "Xã Bạch Đằng",
      DistrictId: "051",
    },
    {
      id: "01711",
      name: "Xã Bình Dương",
      DistrictId: "051",
    },
    {
      id: "01714",
      name: "Xã Lê Chung",
      DistrictId: "051",
    },
    {
      id: "01720",
      name: "Xã Chu Trinh",
      DistrictId: "040",
    },
    {
      id: "01723",
      name: "Xã Hồng Nam",
      DistrictId: "051",
    },
    {
      id: "01726",
      name: "Thị trấn Nguyên Bình",
      DistrictId: "052",
    },
    {
      id: "01729",
      name: "Thị trấn Tĩnh Túc",
      DistrictId: "052",
    },
    {
      id: "01732",
      name: "Xã Yên Lạc",
      DistrictId: "052",
    },
    {
      id: "01735",
      name: "Xã Triệu Nguyên",
      DistrictId: "052",
    },
    {
      id: "01738",
      name: "Xã Ca Thành",
      DistrictId: "052",
    },
    {
      id: "01744",
      name: "Xã Vũ Nông",
      DistrictId: "052",
    },
    {
      id: "01747",
      name: "Xã Minh Tâm",
      DistrictId: "052",
    },
    {
      id: "01750",
      name: "Xã Thể Dục",
      DistrictId: "052",
    },
    {
      id: "01756",
      name: "Xã Mai Long",
      DistrictId: "052",
    },
    {
      id: "01762",
      name: "Xã Vũ Minh",
      DistrictId: "052",
    },
    {
      id: "01765",
      name: "Xã Hoa Thám",
      DistrictId: "052",
    },
    {
      id: "01768",
      name: "Xã Phan Thanh",
      DistrictId: "052",
    },
    {
      id: "01771",
      name: "Xã Quang Thành",
      DistrictId: "052",
    },
    {
      id: "01774",
      name: "Xã Tam Kim",
      DistrictId: "052",
    },
    {
      id: "01777",
      name: "Xã Thành Công",
      DistrictId: "052",
    },
    {
      id: "01780",
      name: "Xã Thịnh Vượng",
      DistrictId: "052",
    },
    {
      id: "01783",
      name: "Xã Hưng Đạo",
      DistrictId: "052",
    },
    {
      id: "01786",
      name: "Thị trấn Đông Khê",
      DistrictId: "053",
    },
    {
      id: "01789",
      name: "Xã Canh Tân",
      DistrictId: "053",
    },
    {
      id: "01792",
      name: "Xã Kim Đồng",
      DistrictId: "053",
    },
    {
      id: "01795",
      name: "Xã Minh Khai",
      DistrictId: "053",
    },
    {
      id: "01801",
      name: "Xã Đức Thông",
      DistrictId: "053",
    },
    {
      id: "01804",
      name: "Xã Thái Cường",
      DistrictId: "053",
    },
    {
      id: "01807",
      name: "Xã Vân Trình",
      DistrictId: "053",
    },
    {
      id: "01810",
      name: "Xã Thụy Hùng",
      DistrictId: "053",
    },
    {
      id: "01813",
      name: "Xã Quang Trọng",
      DistrictId: "053",
    },
    {
      id: "01816",
      name: "Xã Trọng Con",
      DistrictId: "053",
    },
    {
      id: "01819",
      name: "Xã Lê Lai",
      DistrictId: "053",
    },
    {
      id: "01822",
      name: "Xã Đức Long",
      DistrictId: "053",
    },
    {
      id: "01828",
      name: "Xã Lê Lợi",
      DistrictId: "053",
    },
    {
      id: "01831",
      name: "Xã Đức Xuân",
      DistrictId: "053",
    },
    {
      id: "01834",
      name: "Phường Nguyễn Thị Minh Khai",
      DistrictId: "058",
    },
    {
      id: "01837",
      name: "Phường Sông Cầu",
      DistrictId: "058",
    },
    {
      id: "01840",
      name: "Phường Đức Xuân",
      DistrictId: "058",
    },
    {
      id: "01843",
      name: "Phường Phùng Chí Kiên",
      DistrictId: "058",
    },
    {
      id: "01846",
      name: "Phường Huyền Tụng",
      DistrictId: "058",
    },
    {
      id: "01849",
      name: "Xã Dương Quang",
      DistrictId: "058",
    },
    {
      id: "01852",
      name: "Xã Nông Thượng",
      DistrictId: "058",
    },
    {
      id: "01855",
      name: "Phường Xuất Hóa",
      DistrictId: "058",
    },
    {
      id: "01858",
      name: "Xã Bằng Thành",
      DistrictId: "060",
    },
    {
      id: "01861",
      name: "Xã Nhạn Môn",
      DistrictId: "060",
    },
    {
      id: "01864",
      name: "Xã Bộc Bố",
      DistrictId: "060",
    },
    {
      id: "01867",
      name: "Xã Công Bằng",
      DistrictId: "060",
    },
    {
      id: "01870",
      name: "Xã Giáo Hiệu",
      DistrictId: "060",
    },
    {
      id: "01873",
      name: "Xã Xuân La",
      DistrictId: "060",
    },
    {
      id: "01876",
      name: "Xã An Thắng",
      DistrictId: "060",
    },
    {
      id: "01879",
      name: "Xã Cổ Linh",
      DistrictId: "060",
    },
    {
      id: "01882",
      name: "Xã Nghiên Loan",
      DistrictId: "060",
    },
    {
      id: "01885",
      name: "Xã Cao Tân",
      DistrictId: "060",
    },
    {
      id: "01888",
      name: "Thị trấn Chợ Rã",
      DistrictId: "061",
    },
    {
      id: "01891",
      name: "Xã Bành Trạch",
      DistrictId: "061",
    },
    {
      id: "01894",
      name: "Xã Phúc Lộc",
      DistrictId: "061",
    },
    {
      id: "01897",
      name: "Xã Hà Hiệu",
      DistrictId: "061",
    },
    {
      id: "01900",
      name: "Xã Cao Thượng",
      DistrictId: "061",
    },
    {
      id: "01906",
      name: "Xã Khang Ninh",
      DistrictId: "061",
    },
    {
      id: "01909",
      name: "Xã Nam Mẫu",
      DistrictId: "061",
    },
    {
      id: "01912",
      name: "Xã Thượng Giáo",
      DistrictId: "061",
    },
    {
      id: "01915",
      name: "Xã Địa Linh",
      DistrictId: "061",
    },
    {
      id: "01918",
      name: "Xã Yến Dương",
      DistrictId: "061",
    },
    {
      id: "01921",
      name: "Xã Chu Hương",
      DistrictId: "061",
    },
    {
      id: "01924",
      name: "Xã Quảng Khê",
      DistrictId: "061",
    },
    {
      id: "01927",
      name: "Xã Mỹ Phương",
      DistrictId: "061",
    },
    {
      id: "01930",
      name: "Xã Hoàng Trĩ",
      DistrictId: "061",
    },
    {
      id: "01933",
      name: "Xã Đồng Phúc",
      DistrictId: "061",
    },
    {
      id: "01936",
      name: "Thị trấn Nà Phặc",
      DistrictId: "062",
    },
    {
      id: "01939",
      name: "Xã Thượng Ân",
      DistrictId: "062",
    },
    {
      id: "01942",
      name: "Xã Bằng Vân",
      DistrictId: "062",
    },
    {
      id: "01945",
      name: "Xã Cốc Đán",
      DistrictId: "062",
    },
    {
      id: "01948",
      name: "Xã Trung Hoà",
      DistrictId: "062",
    },
    {
      id: "01951",
      name: "Xã Đức Vân",
      DistrictId: "062",
    },
    {
      id: "01954",
      name: "Xã Vân Tùng",
      DistrictId: "062",
    },
    {
      id: "01957",
      name: "Xã Thượng Quan",
      DistrictId: "062",
    },
    {
      id: "01960",
      name: "Xã Hiệp Lực",
      DistrictId: "062",
    },
    {
      id: "01963",
      name: "Xã Thuần Mang",
      DistrictId: "062",
    },
    {
      id: "01969",
      name: "Thị trấn Phủ Thông",
      DistrictId: "063",
    },
    {
      id: "01975",
      name: "Xã Vi Hương",
      DistrictId: "063",
    },
    {
      id: "01978",
      name: "Xã Sĩ Bình",
      DistrictId: "063",
    },
    {
      id: "01981",
      name: "Xã Vũ Muộn",
      DistrictId: "063",
    },
    {
      id: "01984",
      name: "Xã Đôn Phong",
      DistrictId: "063",
    },
    {
      id: "01990",
      name: "Xã Lục Bình",
      DistrictId: "063",
    },
    {
      id: "01993",
      name: "Xã Tân Tú",
      DistrictId: "063",
    },
    {
      id: "01999",
      name: "Xã Nguyên Phúc",
      DistrictId: "063",
    },
    {
      id: "02002",
      name: "Xã Cao Sơn",
      DistrictId: "063",
    },
    {
      id: "02005",
      name: "Xã Quân Hà",
      DistrictId: "063",
    },
    {
      id: "02008",
      name: "Xã Cẩm Giàng",
      DistrictId: "063",
    },
    {
      id: "02011",
      name: "Xã Mỹ Thanh",
      DistrictId: "063",
    },
    {
      id: "02014",
      name: "Xã Dương Phong",
      DistrictId: "063",
    },
    {
      id: "02017",
      name: "Xã Quang Thuận",
      DistrictId: "063",
    },
    {
      id: "02020",
      name: "Thị trấn Bằng Lũng",
      DistrictId: "064",
    },
    {
      id: "02023",
      name: "Xã Xuân Lạc",
      DistrictId: "064",
    },
    {
      id: "02026",
      name: "Xã Nam Cường",
      DistrictId: "064",
    },
    {
      id: "02029",
      name: "Xã Đồng Lạc",
      DistrictId: "064",
    },
    {
      id: "02032",
      name: "Xã Tân Lập",
      DistrictId: "064",
    },
    {
      id: "02035",
      name: "Xã Bản Thi",
      DistrictId: "064",
    },
    {
      id: "02038",
      name: "Xã Quảng Bạch",
      DistrictId: "064",
    },
    {
      id: "02041",
      name: "Xã Bằng Phúc",
      DistrictId: "064",
    },
    {
      id: "02044",
      name: "Xã Yên Thịnh",
      DistrictId: "064",
    },
    {
      id: "02047",
      name: "Xã Yên Thượng",
      DistrictId: "064",
    },
    {
      id: "02050",
      name: "Xã Phương Viên",
      DistrictId: "064",
    },
    {
      id: "02053",
      name: "Xã Ngọc Phái",
      DistrictId: "064",
    },
    {
      id: "02059",
      name: "Xã Đồng Thắng",
      DistrictId: "064",
    },
    {
      id: "02062",
      name: "Xã Lương Bằng",
      DistrictId: "064",
    },
    {
      id: "02065",
      name: "Xã Bằng Lãng",
      DistrictId: "064",
    },
    {
      id: "02068",
      name: "Xã Đại Sảo",
      DistrictId: "064",
    },
    {
      id: "02071",
      name: "Xã Nghĩa Tá",
      DistrictId: "064",
    },
    {
      id: "02077",
      name: "Xã Yên Mỹ",
      DistrictId: "064",
    },
    {
      id: "02080",
      name: "Xã Bình Trung",
      DistrictId: "064",
    },
    {
      id: "02083",
      name: "Xã Yên Phong",
      DistrictId: "064",
    },
    {
      id: "02086",
      name: "Thị trấn Đồng Tâm",
      DistrictId: "065",
    },
    {
      id: "02089",
      name: "Xã Tân Sơn",
      DistrictId: "065",
    },
    {
      id: "02092",
      name: "Xã Thanh Vận",
      DistrictId: "065",
    },
    {
      id: "02095",
      name: "Xã Mai Lạp",
      DistrictId: "065",
    },
    {
      id: "02098",
      name: "Xã Hoà Mục",
      DistrictId: "065",
    },
    {
      id: "02101",
      name: "Xã Thanh Mai",
      DistrictId: "065",
    },
    {
      id: "02104",
      name: "Xã Cao Kỳ",
      DistrictId: "065",
    },
    {
      id: "02107",
      name: "Xã Nông Hạ",
      DistrictId: "065",
    },
    {
      id: "02110",
      name: "Xã Yên Cư",
      DistrictId: "065",
    },
    {
      id: "02113",
      name: "Xã Thanh Thịnh",
      DistrictId: "065",
    },
    {
      id: "02116",
      name: "Xã Yên Hân",
      DistrictId: "065",
    },
    {
      id: "02122",
      name: "Xã Như Cố",
      DistrictId: "065",
    },
    {
      id: "02125",
      name: "Xã Bình Văn",
      DistrictId: "065",
    },
    {
      id: "02131",
      name: "Xã Quảng Chu",
      DistrictId: "065",
    },
    {
      id: "02137",
      name: "Xã Văn Vũ",
      DistrictId: "066",
    },
    {
      id: "02140",
      name: "Xã Văn Lang",
      DistrictId: "066",
    },
    {
      id: "02143",
      name: "Xã Lương Thượng",
      DistrictId: "066",
    },
    {
      id: "02146",
      name: "Xã Kim Hỷ",
      DistrictId: "066",
    },
    {
      id: "02152",
      name: "Xã Cường Lợi",
      DistrictId: "066",
    },
    {
      id: "02155",
      name: "Thị trấn Yến Lạc",
      DistrictId: "066",
    },
    {
      id: "02158",
      name: "Xã Kim Lư",
      DistrictId: "066",
    },
    {
      id: "02161",
      name: "Xã Sơn Thành",
      DistrictId: "066",
    },
    {
      id: "02170",
      name: "Xã Văn Minh",
      DistrictId: "066",
    },
    {
      id: "02173",
      name: "Xã Côn Minh",
      DistrictId: "066",
    },
    {
      id: "02176",
      name: "Xã Cư Lễ",
      DistrictId: "066",
    },
    {
      id: "02179",
      name: "Xã Trần Phú",
      DistrictId: "066",
    },
    {
      id: "02185",
      name: "Xã Quang Phong",
      DistrictId: "066",
    },
    {
      id: "02188",
      name: "Xã Dương Sơn",
      DistrictId: "066",
    },
    {
      id: "02191",
      name: "Xã Xuân Dương",
      DistrictId: "066",
    },
    {
      id: "02194",
      name: "Xã Đổng Xá",
      DistrictId: "066",
    },
    {
      id: "02197",
      name: "Xã Liêm Thuỷ",
      DistrictId: "066",
    },
    {
      id: "02200",
      name: "Phường Phan Thiết",
      DistrictId: "070",
    },
    {
      id: "02203",
      name: "Phường Minh Xuân",
      DistrictId: "070",
    },
    {
      id: "02206",
      name: "Phường Tân Quang",
      DistrictId: "070",
    },
    {
      id: "02209",
      name: "Xã Tràng Đà",
      DistrictId: "070",
    },
    {
      id: "02212",
      name: "Phường Nông Tiến",
      DistrictId: "070",
    },
    {
      id: "02215",
      name: "Phường Ỷ La",
      DistrictId: "070",
    },
    {
      id: "02216",
      name: "Phường Tân Hà",
      DistrictId: "070",
    },
    {
      id: "02218",
      name: "Phường Hưng Thành",
      DistrictId: "070",
    },
    {
      id: "02221",
      name: "Thị trấn Na Hang",
      DistrictId: "072",
    },
    {
      id: "02227",
      name: "Xã Sinh Long",
      DistrictId: "072",
    },
    {
      id: "02230",
      name: "Xã Thượng Giáp",
      DistrictId: "072",
    },
    {
      id: "02233",
      name: "Xã Phúc Yên",
      DistrictId: "071",
    },
    {
      id: "02239",
      name: "Xã Thượng Nông",
      DistrictId: "072",
    },
    {
      id: "02242",
      name: "Xã Xuân Lập",
      DistrictId: "071",
    },
    {
      id: "02245",
      name: "Xã Côn Lôn",
      DistrictId: "072",
    },
    {
      id: "02248",
      name: "Xã Yên Hoa",
      DistrictId: "072",
    },
    {
      id: "02251",
      name: "Xã Khuôn Hà",
      DistrictId: "071",
    },
    {
      id: "02254",
      name: "Xã Hồng Thái",
      DistrictId: "072",
    },
    {
      id: "02260",
      name: "Xã Đà Vị",
      DistrictId: "072",
    },
    {
      id: "02263",
      name: "Xã Khau Tinh",
      DistrictId: "072",
    },
    {
      id: "02266",
      name: "Thị trấn Lăng Can",
      DistrictId: "071",
    },
    {
      id: "02269",
      name: "Xã Thượng Lâm",
      DistrictId: "071",
    },
    {
      id: "02275",
      name: "Xã Sơn Phú",
      DistrictId: "072",
    },
    {
      id: "02281",
      name: "Xã Năng Khả",
      DistrictId: "072",
    },
    {
      id: "02284",
      name: "Xã Thanh Tương",
      DistrictId: "072",
    },
    {
      id: "02287",
      name: "Thị trấn Vĩnh Lộc",
      DistrictId: "073",
    },
    {
      id: "02290",
      name: "Xã Bình An",
      DistrictId: "071",
    },
    {
      id: "02293",
      name: "Xã Hồng Quang",
      DistrictId: "071",
    },
    {
      id: "02296",
      name: "Xã Thổ Bình",
      DistrictId: "071",
    },
    {
      id: "02299",
      name: "Xã Phúc Sơn",
      DistrictId: "071",
    },
    {
      id: "02302",
      name: "Xã Minh Quang",
      DistrictId: "071",
    },
    {
      id: "02305",
      name: "Xã Trung Hà",
      DistrictId: "073",
    },
    {
      id: "02308",
      name: "Xã Tân Mỹ",
      DistrictId: "073",
    },
    {
      id: "02311",
      name: "Xã Hà Lang",
      DistrictId: "073",
    },
    {
      id: "02314",
      name: "Xã Hùng Mỹ",
      DistrictId: "073",
    },
    {
      id: "02317",
      name: "Xã Yên Lập",
      DistrictId: "073",
    },
    {
      id: "02320",
      name: "Xã Tân An",
      DistrictId: "073",
    },
    {
      id: "02323",
      name: "Xã Bình Phú",
      DistrictId: "073",
    },
    {
      id: "02326",
      name: "Xã Xuân Quang",
      DistrictId: "073",
    },
    {
      id: "02329",
      name: "Xã Ngọc Hội",
      DistrictId: "073",
    },
    {
      id: "02332",
      name: "Xã Phú Bình",
      DistrictId: "073",
    },
    {
      id: "02335",
      name: "Xã Hòa Phú",
      DistrictId: "073",
    },
    {
      id: "02338",
      name: "Xã Phúc Thịnh",
      DistrictId: "073",
    },
    {
      id: "02341",
      name: "Xã Kiên Đài",
      DistrictId: "073",
    },
    {
      id: "02344",
      name: "Xã Tân Thịnh",
      DistrictId: "073",
    },
    {
      id: "02347",
      name: "Xã Trung Hòa",
      DistrictId: "073",
    },
    {
      id: "02350",
      name: "Xã Kim Bình",
      DistrictId: "073",
    },
    {
      id: "02353",
      name: "Xã Hòa An",
      DistrictId: "073",
    },
    {
      id: "02356",
      name: "Xã Vinh Quang",
      DistrictId: "073",
    },
    {
      id: "02359",
      name: "Xã Tri Phú",
      DistrictId: "073",
    },
    {
      id: "02362",
      name: "Xã Nhân Lý",
      DistrictId: "073",
    },
    {
      id: "02365",
      name: "Xã Yên Nguyên",
      DistrictId: "073",
    },
    {
      id: "02368",
      name: "Xã Linh Phú",
      DistrictId: "073",
    },
    {
      id: "02371",
      name: "Xã Bình Nhân",
      DistrictId: "073",
    },
    {
      id: "02374",
      name: "Thị trấn Tân Yên",
      DistrictId: "074",
    },
    {
      id: "02377",
      name: "Xã Yên Thuận",
      DistrictId: "074",
    },
    {
      id: "02380",
      name: "Xã Bạch Xa",
      DistrictId: "074",
    },
    {
      id: "02383",
      name: "Xã Minh Khương",
      DistrictId: "074",
    },
    {
      id: "02386",
      name: "Xã Yên Lâm",
      DistrictId: "074",
    },
    {
      id: "02389",
      name: "Xã Minh Dân",
      DistrictId: "074",
    },
    {
      id: "02392",
      name: "Xã Phù Lưu",
      DistrictId: "074",
    },
    {
      id: "02395",
      name: "Xã Minh Hương",
      DistrictId: "074",
    },
    {
      id: "02398",
      name: "Xã Yên Phú",
      DistrictId: "074",
    },
    {
      id: "02401",
      name: "Xã Tân Thành",
      DistrictId: "074",
    },
    {
      id: "02404",
      name: "Xã Bình Xa",
      DistrictId: "074",
    },
    {
      id: "02407",
      name: "Xã Thái Sơn",
      DistrictId: "074",
    },
    {
      id: "02410",
      name: "Xã Nhân Mục",
      DistrictId: "074",
    },
    {
      id: "02413",
      name: "Xã Thành Long",
      DistrictId: "074",
    },
    {
      id: "02416",
      name: "Xã Bằng Cốc",
      DistrictId: "074",
    },
    {
      id: "02419",
      name: "Xã Thái Hòa",
      DistrictId: "074",
    },
    {
      id: "02422",
      name: "Xã Đức Ninh",
      DistrictId: "074",
    },
    {
      id: "02425",
      name: "Xã Hùng Đức",
      DistrictId: "074",
    },
    {
      id: "02431",
      name: "Xã Quí Quân",
      DistrictId: "075",
    },
    {
      id: "02434",
      name: "Xã Lực Hành",
      DistrictId: "075",
    },
    {
      id: "02437",
      name: "Xã Kiến Thiết",
      DistrictId: "075",
    },
    {
      id: "02440",
      name: "Xã Trung Minh",
      DistrictId: "075",
    },
    {
      id: "02443",
      name: "Xã Chiêu Yên",
      DistrictId: "075",
    },
    {
      id: "02446",
      name: "Xã Trung Trực",
      DistrictId: "075",
    },
    {
      id: "02449",
      name: "Xã Xuân Vân",
      DistrictId: "075",
    },
    {
      id: "02452",
      name: "Xã Phúc Ninh",
      DistrictId: "075",
    },
    {
      id: "02455",
      name: "Xã Hùng Lợi",
      DistrictId: "075",
    },
    {
      id: "02458",
      name: "Xã Trung Sơn",
      DistrictId: "075",
    },
    {
      id: "02461",
      name: "Xã Tân Tiến",
      DistrictId: "075",
    },
    {
      id: "02464",
      name: "Xã Tứ Quận",
      DistrictId: "075",
    },
    {
      id: "02467",
      name: "Xã Đạo Viện",
      DistrictId: "075",
    },
    {
      id: "02470",
      name: "Xã Tân Long",
      DistrictId: "075",
    },
    {
      id: "02473",
      name: "Thị trấn Yên Sơn",
      DistrictId: "075",
    },
    {
      id: "02476",
      name: "Xã Kim Quan",
      DistrictId: "075",
    },
    {
      id: "02479",
      name: "Xã Lang Quán",
      DistrictId: "075",
    },
    {
      id: "02482",
      name: "Xã Phú Thịnh",
      DistrictId: "075",
    },
    {
      id: "02485",
      name: "Xã Công Đa",
      DistrictId: "075",
    },
    {
      id: "02488",
      name: "Xã Trung Môn",
      DistrictId: "075",
    },
    {
      id: "02491",
      name: "Xã Chân Sơn",
      DistrictId: "075",
    },
    {
      id: "02494",
      name: "Xã Thái Bình",
      DistrictId: "075",
    },
    {
      id: "02497",
      name: "Xã Kim Phú",
      DistrictId: "070",
    },
    {
      id: "02500",
      name: "Xã Tiến Bộ",
      DistrictId: "075",
    },
    {
      id: "02503",
      name: "Xã An Khang",
      DistrictId: "070",
    },
    {
      id: "02506",
      name: "Xã Mỹ Bằng",
      DistrictId: "075",
    },
    {
      id: "02509",
      name: "Phường Mỹ Lâm",
      DistrictId: "070",
    },
    {
      id: "02512",
      name: "Phường An Tường",
      DistrictId: "070",
    },
    {
      id: "02515",
      name: "Xã Lưỡng Vượng",
      DistrictId: "070",
    },
    {
      id: "02518",
      name: "Xã Hoàng Khai",
      DistrictId: "075",
    },
    {
      id: "02521",
      name: "Xã Thái Long",
      DistrictId: "070",
    },
    {
      id: "02524",
      name: "Phường Đội Cấn",
      DistrictId: "070",
    },
    {
      id: "02527",
      name: "Xã Nhữ Hán",
      DistrictId: "075",
    },
    {
      id: "02530",
      name: "Xã Nhữ Khê",
      DistrictId: "075",
    },
    {
      id: "02533",
      name: "Xã Đội Bình",
      DistrictId: "075",
    },
    {
      id: "02536",
      name: "Thị trấn Sơn Dương",
      DistrictId: "076",
    },
    {
      id: "02539",
      name: "Xã Trung Yên",
      DistrictId: "076",
    },
    {
      id: "02542",
      name: "Xã Minh Thanh",
      DistrictId: "076",
    },
    {
      id: "02545",
      name: "Xã Tân Trào",
      DistrictId: "076",
    },
    {
      id: "02548",
      name: "Xã Vĩnh Lợi",
      DistrictId: "076",
    },
    {
      id: "02551",
      name: "Xã Thượng Ấm",
      DistrictId: "076",
    },
    {
      id: "02554",
      name: "Xã Bình Yên",
      DistrictId: "076",
    },
    {
      id: "02557",
      name: "Xã Lương Thiện",
      DistrictId: "076",
    },
    {
      id: "02560",
      name: "Xã Tú Thịnh",
      DistrictId: "076",
    },
    {
      id: "02563",
      name: "Xã Cấp Tiến",
      DistrictId: "076",
    },
    {
      id: "02566",
      name: "Xã Hợp Thành",
      DistrictId: "076",
    },
    {
      id: "02569",
      name: "Xã Phúc Ứng",
      DistrictId: "076",
    },
    {
      id: "02572",
      name: "Xã Đông Thọ",
      DistrictId: "076",
    },
    {
      id: "02575",
      name: "Xã Kháng Nhật",
      DistrictId: "076",
    },
    {
      id: "02578",
      name: "Xã Hợp Hòa",
      DistrictId: "076",
    },
    {
      id: "02584",
      name: "Xã Quyết Thắng",
      DistrictId: "076",
    },
    {
      id: "02587",
      name: "Xã Đồng Quý",
      DistrictId: "076",
    },
    {
      id: "02590",
      name: "Xã Tân Thanh",
      DistrictId: "076",
    },
    {
      id: "02593",
      name: "Xã Vân Sơn",
      DistrictId: "076",
    },
    {
      id: "02596",
      name: "Xã Văn Phú",
      DistrictId: "076",
    },
    {
      id: "02599",
      name: "Xã Chi Thiết",
      DistrictId: "076",
    },
    {
      id: "02602",
      name: "Xã Đông Lợi",
      DistrictId: "076",
    },
    {
      id: "02605",
      name: "Xã Thiện Kế",
      DistrictId: "076",
    },
    {
      id: "02608",
      name: "Xã Hồng Lạc",
      DistrictId: "076",
    },
    {
      id: "02611",
      name: "Xã Phú Lương",
      DistrictId: "076",
    },
    {
      id: "02614",
      name: "Xã Ninh Lai",
      DistrictId: "076",
    },
    {
      id: "02617",
      name: "Xã Đại Phú",
      DistrictId: "076",
    },
    {
      id: "02620",
      name: "Xã Sơn Nam",
      DistrictId: "076",
    },
    {
      id: "02623",
      name: "Xã Hào Phú",
      DistrictId: "076",
    },
    {
      id: "02626",
      name: "Xã Tam Đa",
      DistrictId: "076",
    },
    {
      id: "02632",
      name: "Xã Trường Sinh",
      DistrictId: "076",
    },
    {
      id: "02635",
      name: "Phường Duyên Hải",
      DistrictId: "080",
    },
    {
      id: "02641",
      name: "Phường Lào Cai",
      DistrictId: "080",
    },
    {
      id: "02644",
      name: "Phường Cốc Lếu",
      DistrictId: "080",
    },
    {
      id: "02647",
      name: "Phường Kim Tân",
      DistrictId: "080",
    },
    {
      id: "02650",
      name: "Phường Bắc Lệnh",
      DistrictId: "080",
    },
    {
      id: "02653",
      name: "Phường Pom Hán",
      DistrictId: "080",
    },
    {
      id: "02656",
      name: "Phường Xuân Tăng",
      DistrictId: "080",
    },
    {
      id: "02658",
      name: "Phường Bình Minh",
      DistrictId: "080",
    },
    {
      id: "02659",
      name: "Xã Thống Nhất",
      DistrictId: "080",
    },
    {
      id: "02662",
      name: "Xã Đồng Tuyển",
      DistrictId: "080",
    },
    {
      id: "02665",
      name: "Xã Vạn Hoà",
      DistrictId: "080",
    },
    {
      id: "02668",
      name: "Phường Bắc Cường",
      DistrictId: "080",
    },
    {
      id: "02671",
      name: "Phường Nam Cường",
      DistrictId: "080",
    },
    {
      id: "02674",
      name: "Xã Cam Đường",
      DistrictId: "080",
    },
    {
      id: "02677",
      name: "Xã Tả Phời",
      DistrictId: "080",
    },
    {
      id: "02680",
      name: "Xã Hợp Thành",
      DistrictId: "080",
    },
    {
      id: "02683",
      name: "Thị trấn Bát Xát",
      DistrictId: "082",
    },
    {
      id: "02686",
      name: "Xã A Mú Sung",
      DistrictId: "082",
    },
    {
      id: "02689",
      name: "Xã Nậm Chạc",
      DistrictId: "082",
    },
    {
      id: "02692",
      name: "Xã A Lù",
      DistrictId: "082",
    },
    {
      id: "02695",
      name: "Xã Trịnh Tường",
      DistrictId: "082",
    },
    {
      id: "02701",
      name: "Xã Y Tý",
      DistrictId: "082",
    },
    {
      id: "02704",
      name: "Xã Cốc Mỳ",
      DistrictId: "082",
    },
    {
      id: "02707",
      name: "Xã Dền Sáng",
      DistrictId: "082",
    },
    {
      id: "02710",
      name: "Xã Bản Vược",
      DistrictId: "082",
    },
    {
      id: "02713",
      name: "Xã Sàng Ma Sáo",
      DistrictId: "082",
    },
    {
      id: "02716",
      name: "Xã Bản Qua",
      DistrictId: "082",
    },
    {
      id: "02719",
      name: "Xã Mường Vi",
      DistrictId: "082",
    },
    {
      id: "02722",
      name: "Xã Dền Thàng",
      DistrictId: "082",
    },
    {
      id: "02725",
      name: "Xã Bản Xèo",
      DistrictId: "082",
    },
    {
      id: "02728",
      name: "Xã Mường Hum",
      DistrictId: "082",
    },
    {
      id: "02731",
      name: "Xã Trung Lèng Hồ",
      DistrictId: "082",
    },
    {
      id: "02734",
      name: "Xã Quang Kim",
      DistrictId: "082",
    },
    {
      id: "02737",
      name: "Xã Pa Cheo",
      DistrictId: "082",
    },
    {
      id: "02740",
      name: "Xã Nậm Pung",
      DistrictId: "082",
    },
    {
      id: "02743",
      name: "Xã Phìn Ngan",
      DistrictId: "082",
    },
    {
      id: "02746",
      name: "Xã Cốc San",
      DistrictId: "080",
    },
    {
      id: "02749",
      name: "Xã Tòng Sành",
      DistrictId: "082",
    },
    {
      id: "02752",
      name: "Xã Pha Long",
      DistrictId: "083",
    },
    {
      id: "02755",
      name: "Xã Tả Ngải Chồ",
      DistrictId: "083",
    },
    {
      id: "02758",
      name: "Xã Tung Chung Phố",
      DistrictId: "083",
    },
    {
      id: "02761",
      name: "Thị trấn Mường Khương",
      DistrictId: "083",
    },
    {
      id: "02764",
      name: "Xã Dìn Chin",
      DistrictId: "083",
    },
    {
      id: "02767",
      name: "Xã Tả Gia Khâu",
      DistrictId: "083",
    },
    {
      id: "02770",
      name: "Xã Nậm Chảy",
      DistrictId: "083",
    },
    {
      id: "02773",
      name: "Xã Nấm Lư",
      DistrictId: "083",
    },
    {
      id: "02776",
      name: "Xã Lùng Khấu Nhin",
      DistrictId: "083",
    },
    {
      id: "02779",
      name: "Xã Thanh Bình",
      DistrictId: "083",
    },
    {
      id: "02782",
      name: "Xã Cao Sơn",
      DistrictId: "083",
    },
    {
      id: "02785",
      name: "Xã Lùng Vai",
      DistrictId: "083",
    },
    {
      id: "02788",
      name: "Xã Bản Lầu",
      DistrictId: "083",
    },
    {
      id: "02791",
      name: "Xã La Pan Tẩn",
      DistrictId: "083",
    },
    {
      id: "02794",
      name: "Xã Tả Thàng",
      DistrictId: "083",
    },
    {
      id: "02797",
      name: "Xã Bản Sen",
      DistrictId: "083",
    },
    {
      id: "02800",
      name: "Xã Nàn Sán",
      DistrictId: "084",
    },
    {
      id: "02803",
      name: "Xã Thào Chư Phìn",
      DistrictId: "084",
    },
    {
      id: "02806",
      name: "Xã Bản Mế",
      DistrictId: "084",
    },
    {
      id: "02809",
      name: "Thị trấn Si Ma Cai",
      DistrictId: "084",
    },
    {
      id: "02812",
      name: "Xã Sán Chải",
      DistrictId: "084",
    },
    {
      id: "02818",
      name: "Xã Lùng Thẩn",
      DistrictId: "084",
    },
    {
      id: "02821",
      name: "Xã Cán Cấu",
      DistrictId: "084",
    },
    {
      id: "02824",
      name: "Xã Sín Chéng",
      DistrictId: "084",
    },
    {
      id: "02827",
      name: "Xã Quan Hồ Thẩn",
      DistrictId: "084",
    },
    {
      id: "02836",
      name: "Xã Nàn Xín",
      DistrictId: "084",
    },
    {
      id: "02839",
      name: "Thị trấn Bắc Hà",
      DistrictId: "085",
    },
    {
      id: "02842",
      name: "Xã Lùng Cải",
      DistrictId: "085",
    },
    {
      id: "02848",
      name: "Xã Lùng Phình",
      DistrictId: "085",
    },
    {
      id: "02851",
      name: "Xã Tả Van Chư",
      DistrictId: "085",
    },
    {
      id: "02854",
      name: "Xã Tả Củ Tỷ",
      DistrictId: "085",
    },
    {
      id: "02857",
      name: "Xã Thải Giàng Phố",
      DistrictId: "085",
    },
    {
      id: "02863",
      name: "Xã Hoàng Thu Phố",
      DistrictId: "085",
    },
    {
      id: "02866",
      name: "Xã Bản Phố",
      DistrictId: "085",
    },
    {
      id: "02869",
      name: "Xã Bản Liền",
      DistrictId: "085",
    },
    {
      id: "02872",
      name: "Xã Tà Chải",
      DistrictId: "085",
    },
    {
      id: "02875",
      name: "Xã Na Hối",
      DistrictId: "085",
    },
    {
      id: "02878",
      name: "Xã Cốc Ly",
      DistrictId: "085",
    },
    {
      id: "02881",
      name: "Xã Nậm Mòn",
      DistrictId: "085",
    },
    {
      id: "02884",
      name: "Xã Nậm Đét",
      DistrictId: "085",
    },
    {
      id: "02887",
      name: "Xã Nậm Khánh",
      DistrictId: "085",
    },
    {
      id: "02890",
      name: "Xã Bảo Nhai",
      DistrictId: "085",
    },
    {
      id: "02893",
      name: "Xã Nậm Lúc",
      DistrictId: "085",
    },
    {
      id: "02896",
      name: "Xã Cốc Lầu",
      DistrictId: "085",
    },
    {
      id: "02899",
      name: "Xã Bản Cái",
      DistrictId: "085",
    },
    {
      id: "02902",
      name: "Thị trấn N.T Phong Hải",
      DistrictId: "086",
    },
    {
      id: "02905",
      name: "Thị trấn Phố Lu",
      DistrictId: "086",
    },
    {
      id: "02908",
      name: "Thị trấn Tằng Loỏng",
      DistrictId: "086",
    },
    {
      id: "02911",
      name: "Xã Bản Phiệt",
      DistrictId: "086",
    },
    {
      id: "02914",
      name: "Xã Bản Cầm",
      DistrictId: "086",
    },
    {
      id: "02917",
      name: "Xã Thái Niên",
      DistrictId: "086",
    },
    {
      id: "02920",
      name: "Xã Phong Niên",
      DistrictId: "086",
    },
    {
      id: "02923",
      name: "Xã Gia Phú",
      DistrictId: "086",
    },
    {
      id: "02926",
      name: "Xã Xuân Quang",
      DistrictId: "086",
    },
    {
      id: "02929",
      name: "Xã Sơn Hải",
      DistrictId: "086",
    },
    {
      id: "02932",
      name: "Xã Xuân Giao",
      DistrictId: "086",
    },
    {
      id: "02935",
      name: "Xã Trì Quang",
      DistrictId: "086",
    },
    {
      id: "02938",
      name: "Xã Sơn Hà",
      DistrictId: "086",
    },
    {
      id: "02944",
      name: "Xã Phú Nhuận",
      DistrictId: "086",
    },
    {
      id: "02947",
      name: "Thị trấn Phố Ràng",
      DistrictId: "087",
    },
    {
      id: "02950",
      name: "Xã Tân Tiến",
      DistrictId: "087",
    },
    {
      id: "02953",
      name: "Xã Nghĩa Đô",
      DistrictId: "087",
    },
    {
      id: "02956",
      name: "Xã Vĩnh Yên",
      DistrictId: "087",
    },
    {
      id: "02959",
      name: "Xã Điện Quan",
      DistrictId: "087",
    },
    {
      id: "02962",
      name: "Xã Xuân Hoà",
      DistrictId: "087",
    },
    {
      id: "02965",
      name: "Xã Tân Dương",
      DistrictId: "087",
    },
    {
      id: "02968",
      name: "Xã Thượng Hà",
      DistrictId: "087",
    },
    {
      id: "02971",
      name: "Xã Kim Sơn",
      DistrictId: "087",
    },
    {
      id: "02974",
      name: "Xã Cam Cọn",
      DistrictId: "087",
    },
    {
      id: "02977",
      name: "Xã Minh Tân",
      DistrictId: "087",
    },
    {
      id: "02980",
      name: "Xã Xuân Thượng",
      DistrictId: "087",
    },
    {
      id: "02983",
      name: "Xã Việt Tiến",
      DistrictId: "087",
    },
    {
      id: "02986",
      name: "Xã Yên Sơn",
      DistrictId: "087",
    },
    {
      id: "02989",
      name: "Xã Bảo Hà",
      DistrictId: "087",
    },
    {
      id: "02992",
      name: "Xã Lương Sơn",
      DistrictId: "087",
    },
    {
      id: "02998",
      name: "Xã Phúc Khánh",
      DistrictId: "087",
    },
    {
      id: "03001",
      name: "Phường Sa Pa",
      DistrictId: "088",
    },
    {
      id: "03002",
      name: "Phường Sa Pả",
      DistrictId: "088",
    },
    {
      id: "03003",
      name: "Phường Ô Quý Hồ",
      DistrictId: "088",
    },
    {
      id: "03004",
      name: "Xã Ngũ Chỉ Sơn",
      DistrictId: "088",
    },
    {
      id: "03006",
      name: "Phường Phan Si Păng",
      DistrictId: "088",
    },
    {
      id: "03010",
      name: "Xã Trung Chải",
      DistrictId: "088",
    },
    {
      id: "03013",
      name: "Xã Tả Phìn",
      DistrictId: "088",
    },
    {
      id: "03016",
      name: "Phường Hàm Rồng",
      DistrictId: "088",
    },
    {
      id: "03019",
      name: "Xã Hoàng Liên",
      DistrictId: "088",
    },
    {
      id: "03022",
      name: "Xã Thanh Bình",
      DistrictId: "088",
    },
    {
      id: "03028",
      name: "Phường Cầu Mây",
      DistrictId: "088",
    },
    {
      id: "03037",
      name: "Xã Mường Hoa",
      DistrictId: "088",
    },
    {
      id: "03040",
      name: "Xã Tả Van",
      DistrictId: "088",
    },
    {
      id: "03043",
      name: "Xã Mường Bo",
      DistrictId: "088",
    },
    {
      id: "03046",
      name: "Xã Bản Hồ",
      DistrictId: "088",
    },
    {
      id: "03052",
      name: "Xã Liên Minh",
      DistrictId: "088",
    },
    {
      id: "03055",
      name: "Thị trấn Khánh Yên",
      DistrictId: "089",
    },
    {
      id: "03061",
      name: "Xã Võ Lao",
      DistrictId: "089",
    },
    {
      id: "03064",
      name: "Xã Sơn Thuỷ",
      DistrictId: "089",
    },
    {
      id: "03067",
      name: "Xã Nậm Mả",
      DistrictId: "089",
    },
    {
      id: "03070",
      name: "Xã Tân Thượng",
      DistrictId: "089",
    },
    {
      id: "03073",
      name: "Xã Nậm Rạng",
      DistrictId: "089",
    },
    {
      id: "03076",
      name: "Xã Nậm Chầy",
      DistrictId: "089",
    },
    {
      id: "03079",
      name: "Xã Tân An",
      DistrictId: "089",
    },
    {
      id: "03082",
      name: "Xã Khánh Yên Thượng",
      DistrictId: "089",
    },
    {
      id: "03085",
      name: "Xã Nậm Xé",
      DistrictId: "089",
    },
    {
      id: "03088",
      name: "Xã Dần Thàng",
      DistrictId: "089",
    },
    {
      id: "03091",
      name: "Xã Chiềng Ken",
      DistrictId: "089",
    },
    {
      id: "03094",
      name: "Xã Làng Giàng",
      DistrictId: "089",
    },
    {
      id: "03097",
      name: "Xã Hoà Mạc",
      DistrictId: "089",
    },
    {
      id: "03100",
      name: "Xã Khánh Yên Trung",
      DistrictId: "089",
    },
    {
      id: "03103",
      name: "Xã Khánh Yên Hạ",
      DistrictId: "089",
    },
    {
      id: "03106",
      name: "Xã Dương Quỳ",
      DistrictId: "089",
    },
    {
      id: "03109",
      name: "Xã Nậm Tha",
      DistrictId: "089",
    },
    {
      id: "03112",
      name: "Xã Minh Lương",
      DistrictId: "089",
    },
    {
      id: "03115",
      name: "Xã Thẩm Dương",
      DistrictId: "089",
    },
    {
      id: "03118",
      name: "Xã Liêm Phú",
      DistrictId: "089",
    },
    {
      id: "03121",
      name: "Xã Nậm Xây",
      DistrictId: "089",
    },
    {
      id: "03124",
      name: "Phường Noong Bua",
      DistrictId: "094",
    },
    {
      id: "03127",
      name: "Phường Him Lam",
      DistrictId: "094",
    },
    {
      id: "03130",
      name: "Phường Thanh Bình",
      DistrictId: "094",
    },
    {
      id: "03133",
      name: "Phường Tân Thanh",
      DistrictId: "094",
    },
    {
      id: "03136",
      name: "Phường Mường Thanh",
      DistrictId: "094",
    },
    {
      id: "03139",
      name: "Phường Nam Thanh",
      DistrictId: "094",
    },
    {
      id: "03142",
      name: "Phường Thanh Trường",
      DistrictId: "094",
    },
    {
      id: "03145",
      name: "Xã Thanh Minh",
      DistrictId: "094",
    },
    {
      id: "03148",
      name: "Phường Sông Đà",
      DistrictId: "095",
    },
    {
      id: "03151",
      name: "Phường Na Lay",
      DistrictId: "095",
    },
    {
      id: "03154",
      name: "Xã Sín Thầu",
      DistrictId: "096",
    },
    {
      id: "03155",
      name: "Xã Sen Thượng",
      DistrictId: "096",
    },
    {
      id: "03156",
      name: "Xã Nậm Tin",
      DistrictId: "103",
    },
    {
      id: "03157",
      name: "Xã Chung Chải",
      DistrictId: "096",
    },
    {
      id: "03158",
      name: "Xã Leng Su Sìn",
      DistrictId: "096",
    },
    {
      id: "03159",
      name: "Xã Pá Mỳ",
      DistrictId: "096",
    },
    {
      id: "03160",
      name: "Xã Mường Nhé",
      DistrictId: "096",
    },
    {
      id: "03161",
      name: "Xã Nậm Vì",
      DistrictId: "096",
    },
    {
      id: "03162",
      name: "Xã Nậm Kè",
      DistrictId: "096",
    },
    {
      id: "03163",
      name: "Xã Mường Toong",
      DistrictId: "096",
    },
    {
      id: "03164",
      name: "Xã Quảng Lâm",
      DistrictId: "096",
    },
    {
      id: "03165",
      name: "Xã Pa Tần",
      DistrictId: "103",
    },
    {
      id: "03166",
      name: "Xã Chà Cang",
      DistrictId: "103",
    },
    {
      id: "03167",
      name: "Xã Na Cô Sa",
      DistrictId: "103",
    },
    {
      id: "03168",
      name: "Xã Nà Khoa",
      DistrictId: "103",
    },
    {
      id: "03169",
      name: "Xã Nà Hỳ",
      DistrictId: "103",
    },
    {
      id: "03170",
      name: "Xã Nà Bủng",
      DistrictId: "103",
    },
    {
      id: "03171",
      name: "Xã Nậm Nhừ",
      DistrictId: "103",
    },
    {
      id: "03172",
      name: "Thị Trấn Mường Chà",
      DistrictId: "097",
    },
    {
      id: "03173",
      name: "Xã Nậm Chua",
      DistrictId: "103",
    },
    {
      id: "03174",
      name: "Xã Nậm Khăn",
      DistrictId: "103",
    },
    {
      id: "03175",
      name: "Xã Chà Tở",
      DistrictId: "103",
    },
    {
      id: "03176",
      name: "Xã Vàng Đán",
      DistrictId: "103",
    },
    {
      id: "03177",
      name: "Xã Huổi Lếnh",
      DistrictId: "096",
    },
    {
      id: "03178",
      name: "Xã Xá Tổng",
      DistrictId: "097",
    },
    {
      id: "03181",
      name: "Xã Mường Tùng",
      DistrictId: "097",
    },
    {
      id: "03184",
      name: "Xã Lay Nưa",
      DistrictId: "095",
    },
    {
      id: "03187",
      name: "Xã Chà Nưa",
      DistrictId: "103",
    },
    {
      id: "03190",
      name: "Xã Hừa Ngài",
      DistrictId: "097",
    },
    {
      id: "03191",
      name: "Xã Huổi Mí",
      DistrictId: "097",
    },
    {
      id: "03193",
      name: "Xã Pa Ham",
      DistrictId: "097",
    },
    {
      id: "03194",
      name: "Xã Nậm Nèn",
      DistrictId: "097",
    },
    {
      id: "03196",
      name: "Xã Huổi Lèng",
      DistrictId: "097",
    },
    {
      id: "03197",
      name: "Xã Sa Lông",
      DistrictId: "097",
    },
    {
      id: "03198",
      name: "Xã Phìn Hồ",
      DistrictId: "103",
    },
    {
      id: "03199",
      name: "Xã Si Pa Phìn",
      DistrictId: "103",
    },
    {
      id: "03200",
      name: "Xã Ma Thì Hồ",
      DistrictId: "097",
    },
    {
      id: "03201",
      name: "Xã Na Sang",
      DistrictId: "097",
    },
    {
      id: "03202",
      name: "Xã Mường Mươn",
      DistrictId: "097",
    },
    {
      id: "03203",
      name: "Thị trấn Điện Biên Đông",
      DistrictId: "101",
    },
    {
      id: "03205",
      name: "Xã Na Son",
      DistrictId: "101",
    },
    {
      id: "03208",
      name: "Xã Phì Nhừ",
      DistrictId: "101",
    },
    {
      id: "03211",
      name: "Xã Chiềng Sơ",
      DistrictId: "101",
    },
    {
      id: "03214",
      name: "Xã Mường Luân",
      DistrictId: "101",
    },
    {
      id: "03217",
      name: "Thị trấn Tủa Chùa",
      DistrictId: "098",
    },
    {
      id: "03220",
      name: "Xã Huổi Só",
      DistrictId: "098",
    },
    {
      id: "03223",
      name: "Xã Xín Chải",
      DistrictId: "098",
    },
    {
      id: "03226",
      name: "Xã Tả Sìn Thàng",
      DistrictId: "098",
    },
    {
      id: "03229",
      name: "Xã Lao Xả Phình",
      DistrictId: "098",
    },
    {
      id: "03232",
      name: "Xã Tả Phìn",
      DistrictId: "098",
    },
    {
      id: "03235",
      name: "Xã Tủa Thàng",
      DistrictId: "098",
    },
    {
      id: "03238",
      name: "Xã Trung Thu",
      DistrictId: "098",
    },
    {
      id: "03241",
      name: "Xã Sính Phình",
      DistrictId: "098",
    },
    {
      id: "03244",
      name: "Xã Sáng Nhè",
      DistrictId: "098",
    },
    {
      id: "03247",
      name: "Xã Mường Đun",
      DistrictId: "098",
    },
    {
      id: "03250",
      name: "Xã Mường Báng",
      DistrictId: "098",
    },
    {
      id: "03253",
      name: "Thị trấn Tuần Giáo",
      DistrictId: "099",
    },
    {
      id: "03256",
      name: "Thị trấn Mường Ảng",
      DistrictId: "102",
    },
    {
      id: "03259",
      name: "Xã Phình Sáng",
      DistrictId: "099",
    },
    {
      id: "03260",
      name: "Xã Rạng Đông",
      DistrictId: "099",
    },
    {
      id: "03262",
      name: "Xã Mùn Chung",
      DistrictId: "099",
    },
    {
      id: "03263",
      name: "Xã Nà Tòng",
      DistrictId: "099",
    },
    {
      id: "03265",
      name: "Xã Ta Ma",
      DistrictId: "099",
    },
    {
      id: "03268",
      name: "Xã Mường Mùn",
      DistrictId: "099",
    },
    {
      id: "03269",
      name: "Xã Pú Xi",
      DistrictId: "099",
    },
    {
      id: "03271",
      name: "Xã Pú Nhung",
      DistrictId: "099",
    },
    {
      id: "03274",
      name: "Xã Quài Nưa",
      DistrictId: "099",
    },
    {
      id: "03277",
      name: "Xã Mường Thín",
      DistrictId: "099",
    },
    {
      id: "03280",
      name: "Xã Tỏa Tình",
      DistrictId: "099",
    },
    {
      id: "03283",
      name: "Xã Nà Sáy",
      DistrictId: "099",
    },
    {
      id: "03284",
      name: "Xã Mường Khong",
      DistrictId: "099",
    },
    {
      id: "03286",
      name: "Xã Mường Đăng",
      DistrictId: "102",
    },
    {
      id: "03287",
      name: "Xã Ngối Cáy",
      DistrictId: "102",
    },
    {
      id: "03289",
      name: "Xã Quài Cang",
      DistrictId: "099",
    },
    {
      id: "03292",
      name: "Xã Ẳng Tở",
      DistrictId: "102",
    },
    {
      id: "03295",
      name: "Xã Quài Tở",
      DistrictId: "099",
    },
    {
      id: "03298",
      name: "Xã Chiềng Sinh",
      DistrictId: "099",
    },
    {
      id: "03299",
      name: "Xã Chiềng Đông",
      DistrictId: "099",
    },
    {
      id: "03301",
      name: "Xã Búng Lao",
      DistrictId: "102",
    },
    {
      id: "03302",
      name: "Xã Xuân Lao",
      DistrictId: "102",
    },
    {
      id: "03304",
      name: "Xã Tênh Phông",
      DistrictId: "099",
    },
    {
      id: "03307",
      name: "Xã Ẳng Nưa",
      DistrictId: "102",
    },
    {
      id: "03310",
      name: "Xã Ẳng Cang",
      DistrictId: "102",
    },
    {
      id: "03312",
      name: "Xã Nặm Lịch",
      DistrictId: "102",
    },
    {
      id: "03313",
      name: "Xã Mường Lạn",
      DistrictId: "102",
    },
    {
      id: "03316",
      name: "Xã Nà Tấu",
      DistrictId: "094",
    },
    {
      id: "03317",
      name: "Xã Nà Nhạn",
      DistrictId: "094",
    },
    {
      id: "03319",
      name: "Xã Mường Pồn",
      DistrictId: "100",
    },
    {
      id: "03322",
      name: "Xã Thanh Nưa",
      DistrictId: "100",
    },
    {
      id: "03323",
      name: "Xã Hua Thanh",
      DistrictId: "100",
    },
    {
      id: "03325",
      name: "Xã Mường Phăng",
      DistrictId: "094",
    },
    {
      id: "03326",
      name: "Xã Pá Khoang",
      DistrictId: "094",
    },
    {
      id: "03328",
      name: "Xã Thanh Luông",
      DistrictId: "100",
    },
    {
      id: "03331",
      name: "Xã Thanh Hưng",
      DistrictId: "100",
    },
    {
      id: "03334",
      name: "Xã Thanh Xương",
      DistrictId: "100",
    },
    {
      id: "03337",
      name: "Xã Thanh Chăn",
      DistrictId: "100",
    },
    {
      id: "03340",
      name: "Xã Pa Thơm",
      DistrictId: "100",
    },
    {
      id: "03343",
      name: "Xã Thanh An",
      DistrictId: "100",
    },
    {
      id: "03346",
      name: "Xã Thanh Yên",
      DistrictId: "100",
    },
    {
      id: "03349",
      name: "Xã Noong Luống",
      DistrictId: "100",
    },
    {
      id: "03352",
      name: "Xã Noọng Hẹt",
      DistrictId: "100",
    },
    {
      id: "03355",
      name: "Xã Sam Mứn",
      DistrictId: "100",
    },
    {
      id: "03356",
      name: "Xã Pom Lót",
      DistrictId: "100",
    },
    {
      id: "03358",
      name: "Xã Núa Ngam",
      DistrictId: "100",
    },
    {
      id: "03359",
      name: "Xã Hẹ Muông",
      DistrictId: "100",
    },
    {
      id: "03361",
      name: "Xã Na Ư",
      DistrictId: "100",
    },
    {
      id: "03364",
      name: "Xã Mường Nhà",
      DistrictId: "100",
    },
    {
      id: "03365",
      name: "Xã Na Tông",
      DistrictId: "100",
    },
    {
      id: "03367",
      name: "Xã Mường Lói",
      DistrictId: "100",
    },
    {
      id: "03368",
      name: "Xã Phu Luông",
      DistrictId: "100",
    },
    {
      id: "03370",
      name: "Xã Pú Nhi",
      DistrictId: "101",
    },
    {
      id: "03371",
      name: "Xã Nong U",
      DistrictId: "101",
    },
    {
      id: "03373",
      name: "Xã Xa Dung",
      DistrictId: "101",
    },
    {
      id: "03376",
      name: "Xã Keo Lôm",
      DistrictId: "101",
    },
    {
      id: "03379",
      name: "Xã Luân Giới",
      DistrictId: "101",
    },
    {
      id: "03382",
      name: "Xã Phình Giàng",
      DistrictId: "101",
    },
    {
      id: "03383",
      name: "Xã Pú Hồng",
      DistrictId: "101",
    },
    {
      id: "03384",
      name: "Xã Tìa Dình",
      DistrictId: "101",
    },
    {
      id: "03385",
      name: "Xã Háng Lìa",
      DistrictId: "101",
    },
    {
      id: "03386",
      name: "Phường Quyết Thắng",
      DistrictId: "105",
    },
    {
      id: "03387",
      name: "Phường Tân Phong",
      DistrictId: "105",
    },
    {
      id: "03388",
      name: "Phường Quyết Tiến",
      DistrictId: "105",
    },
    {
      id: "03389",
      name: "Phường Đoàn Kết",
      DistrictId: "105",
    },
    {
      id: "03390",
      name: "Thị trấn Tam Đường",
      DistrictId: "106",
    },
    {
      id: "03391",
      name: "Xã Lả Nhì Thàng",
      DistrictId: "109",
    },
    {
      id: "03394",
      name: "Xã Thèn Sin",
      DistrictId: "106",
    },
    {
      id: "03400",
      name: "Xã Tả Lèng",
      DistrictId: "106",
    },
    {
      id: "03403",
      name: "Xã Sùng Phài",
      DistrictId: "105",
    },
    {
      id: "03405",
      name: "Xã Giang Ma",
      DistrictId: "106",
    },
    {
      id: "03406",
      name: "Xã Hồ Thầu",
      DistrictId: "106",
    },
    {
      id: "03408",
      name: "Phường Đông Phong",
      DistrictId: "105",
    },
    {
      id: "03409",
      name: "Xã San Thàng",
      DistrictId: "105",
    },
    {
      id: "03412",
      name: "Xã Bình Lư",
      DistrictId: "106",
    },
    {
      id: "03413",
      name: "Xã Sơn Bình",
      DistrictId: "106",
    },
    {
      id: "03415",
      name: "Xã Nùng Nàng",
      DistrictId: "106",
    },
    {
      id: "03418",
      name: "Xã Bản Giang",
      DistrictId: "106",
    },
    {
      id: "03421",
      name: "Xã Bản Hon",
      DistrictId: "106",
    },
    {
      id: "03424",
      name: "Xã Bản Bo",
      DistrictId: "106",
    },
    {
      id: "03427",
      name: "Xã Nà Tăm",
      DistrictId: "106",
    },
    {
      id: "03430",
      name: "Xã Khun Há",
      DistrictId: "106",
    },
    {
      id: "03433",
      name: "Thị trấn Mường Tè",
      DistrictId: "107",
    },
    {
      id: "03434",
      name: "Thị trấn Nậm Nhùn",
      DistrictId: "112",
    },
    {
      id: "03436",
      name: "Xã Thu Lũm",
      DistrictId: "107",
    },
    {
      id: "03439",
      name: "Xã Ka Lăng",
      DistrictId: "107",
    },
    {
      id: "03440",
      name: "Xã Tá Bạ",
      DistrictId: "107",
    },
    {
      id: "03442",
      name: "Xã Pa ủ",
      DistrictId: "107",
    },
    {
      id: "03445",
      name: "Xã Mường Tè",
      DistrictId: "107",
    },
    {
      id: "03448",
      name: "Xã Pa Vệ Sử",
      DistrictId: "107",
    },
    {
      id: "03451",
      name: "Xã Mù Cả",
      DistrictId: "107",
    },
    {
      id: "03454",
      name: "Xã Bum Tở",
      DistrictId: "107",
    },
    {
      id: "03457",
      name: "Xã Nậm Khao",
      DistrictId: "107",
    },
    {
      id: "03460",
      name: "Xã Hua Bun",
      DistrictId: "112",
    },
    {
      id: "03463",
      name: "Xã Tà Tổng",
      DistrictId: "107",
    },
    {
      id: "03466",
      name: "Xã Bum Nưa",
      DistrictId: "107",
    },
    {
      id: "03467",
      name: "Xã Vàng San",
      DistrictId: "107",
    },
    {
      id: "03469",
      name: "Xã Kan Hồ",
      DistrictId: "107",
    },
    {
      id: "03472",
      name: "Xã Mường Mô",
      DistrictId: "112",
    },
    {
      id: "03473",
      name: "Xã Nậm Chà",
      DistrictId: "112",
    },
    {
      id: "03474",
      name: "Xã Nậm Manh",
      DistrictId: "112",
    },
    {
      id: "03475",
      name: "Xã Nậm Hàng",
      DistrictId: "112",
    },
    {
      id: "03478",
      name: "Thị trấn Sìn Hồ",
      DistrictId: "108",
    },
    {
      id: "03481",
      name: "Xã Lê Lợi",
      DistrictId: "112",
    },
    {
      id: "03484",
      name: "Xã Pú Đao",
      DistrictId: "112",
    },
    {
      id: "03487",
      name: "Xã Chăn Nưa",
      DistrictId: "108",
    },
    {
      id: "03488",
      name: "Xã Nậm Pì",
      DistrictId: "112",
    },
    {
      id: "03490",
      name: "Xã Huổi Luông",
      DistrictId: "109",
    },
    {
      id: "03493",
      name: "Xã Pa Tần",
      DistrictId: "108",
    },
    {
      id: "03496",
      name: "Xã Phìn Hồ",
      DistrictId: "108",
    },
    {
      id: "03499",
      name: "Xã Hồng Thu",
      DistrictId: "108",
    },
    {
      id: "03502",
      name: "Xã Nậm Ban",
      DistrictId: "112",
    },
    {
      id: "03503",
      name: "Xã Trung Chải",
      DistrictId: "112",
    },
    {
      id: "03505",
      name: "Xã Phăng Sô Lin",
      DistrictId: "108",
    },
    {
      id: "03508",
      name: "Xã Ma Quai",
      DistrictId: "108",
    },
    {
      id: "03509",
      name: "Xã Lùng Thàng",
      DistrictId: "108",
    },
    {
      id: "03511",
      name: "Xã Tả Phìn",
      DistrictId: "108",
    },
    {
      id: "03514",
      name: "Xã Sà Dề Phìn",
      DistrictId: "108",
    },
    {
      id: "03517",
      name: "Xã Nậm Tăm",
      DistrictId: "108",
    },
    {
      id: "03520",
      name: "Xã Tả Ngảo",
      DistrictId: "108",
    },
    {
      id: "03523",
      name: "Xã Pu Sam Cáp",
      DistrictId: "108",
    },
    {
      id: "03526",
      name: "Xã Nậm Cha",
      DistrictId: "108",
    },
    {
      id: "03527",
      name: "Xã Pa Khoá",
      DistrictId: "108",
    },
    {
      id: "03529",
      name: "Xã Làng Mô",
      DistrictId: "108",
    },
    {
      id: "03532",
      name: "Xã Noong Hẻo",
      DistrictId: "108",
    },
    {
      id: "03535",
      name: "Xã Nậm Mạ",
      DistrictId: "108",
    },
    {
      id: "03538",
      name: "Xã Căn Co",
      DistrictId: "108",
    },
    {
      id: "03541",
      name: "Xã Tủa Sín Chải",
      DistrictId: "108",
    },
    {
      id: "03544",
      name: "Xã Nậm Cuổi",
      DistrictId: "108",
    },
    {
      id: "03547",
      name: "Xã Nậm Hăn",
      DistrictId: "108",
    },
    {
      id: "03549",
      name: "Thị trấn Phong Thổ",
      DistrictId: "109",
    },
    {
      id: "03550",
      name: "Xã Sì Lở Lầu",
      DistrictId: "109",
    },
    {
      id: "03553",
      name: "Xã Mồ Sì San",
      DistrictId: "109",
    },
    {
      id: "03559",
      name: "Xã Pa Vây Sử",
      DistrictId: "109",
    },
    {
      id: "03562",
      name: "Xã Vàng Ma Chải",
      DistrictId: "109",
    },
    {
      id: "03565",
      name: "Xã Tông Qua Lìn",
      DistrictId: "109",
    },
    {
      id: "03568",
      name: "Xã Mù Sang",
      DistrictId: "109",
    },
    {
      id: "03571",
      name: "Xã Dào San",
      DistrictId: "109",
    },
    {
      id: "03574",
      name: "Xã Ma Ly Pho",
      DistrictId: "109",
    },
    {
      id: "03577",
      name: "Xã Bản Lang",
      DistrictId: "109",
    },
    {
      id: "03580",
      name: "Xã Hoang Thèn",
      DistrictId: "109",
    },
    {
      id: "03583",
      name: "Xã Khổng Lào",
      DistrictId: "109",
    },
    {
      id: "03586",
      name: "Xã Nậm Xe",
      DistrictId: "109",
    },
    {
      id: "03589",
      name: "Xã Mường So",
      DistrictId: "109",
    },
    {
      id: "03592",
      name: "Xã Sin Suối Hồ",
      DistrictId: "109",
    },
    {
      id: "03595",
      name: "Thị trấn Than Uyên",
      DistrictId: "110",
    },
    {
      id: "03598",
      name: "Thị trấn Tân Uyên",
      DistrictId: "111",
    },
    {
      id: "03601",
      name: "Xã Mường Khoa",
      DistrictId: "111",
    },
    {
      id: "03602",
      name: "Xã Phúc Khoa",
      DistrictId: "111",
    },
    {
      id: "03604",
      name: "Xã Thân Thuộc",
      DistrictId: "111",
    },
    {
      id: "03605",
      name: "Xã Trung Đồng",
      DistrictId: "111",
    },
    {
      id: "03607",
      name: "Xã Hố Mít",
      DistrictId: "111",
    },
    {
      id: "03610",
      name: "Xã Nậm Cần",
      DistrictId: "111",
    },
    {
      id: "03613",
      name: "Xã Nậm Sỏ",
      DistrictId: "111",
    },
    {
      id: "03616",
      name: "Xã Pắc Ta",
      DistrictId: "111",
    },
    {
      id: "03618",
      name: "Xã Phúc Than",
      DistrictId: "110",
    },
    {
      id: "03619",
      name: "Xã Mường Than",
      DistrictId: "110",
    },
    {
      id: "03622",
      name: "Xã Tà Mít",
      DistrictId: "111",
    },
    {
      id: "03625",
      name: "Xã Mường Mít",
      DistrictId: "110",
    },
    {
      id: "03628",
      name: "Xã Pha Mu",
      DistrictId: "110",
    },
    {
      id: "03631",
      name: "Xã Mường Cang",
      DistrictId: "110",
    },
    {
      id: "03632",
      name: "Xã Hua Nà",
      DistrictId: "110",
    },
    {
      id: "03634",
      name: "Xã Tà Hừa",
      DistrictId: "110",
    },
    {
      id: "03637",
      name: "Xã Mường Kim",
      DistrictId: "110",
    },
    {
      id: "03638",
      name: "Xã Tà Mung",
      DistrictId: "110",
    },
    {
      id: "03640",
      name: "Xã Tà Gia",
      DistrictId: "110",
    },
    {
      id: "03643",
      name: "Xã Khoen On",
      DistrictId: "110",
    },
    {
      id: "03646",
      name: "Phường Chiềng Lề",
      DistrictId: "116",
    },
    {
      id: "03649",
      name: "Phường Tô Hiệu",
      DistrictId: "116",
    },
    {
      id: "03652",
      name: "Phường Quyết Thắng",
      DistrictId: "116",
    },
    {
      id: "03655",
      name: "Phường Quyết Tâm",
      DistrictId: "116",
    },
    {
      id: "03658",
      name: "Xã Chiềng Cọ",
      DistrictId: "116",
    },
    {
      id: "03661",
      name: "Xã Chiềng Đen",
      DistrictId: "116",
    },
    {
      id: "03664",
      name: "Xã Chiềng Xôm",
      DistrictId: "116",
    },
    {
      id: "03667",
      name: "Phường Chiềng An",
      DistrictId: "116",
    },
    {
      id: "03670",
      name: "Phường Chiềng Cơi",
      DistrictId: "116",
    },
    {
      id: "03673",
      name: "Xã Chiềng Ngần",
      DistrictId: "116",
    },
    {
      id: "03676",
      name: "Xã Hua La",
      DistrictId: "116",
    },
    {
      id: "03679",
      name: "Phường Chiềng Sinh",
      DistrictId: "116",
    },
    {
      id: "03682",
      name: "Xã Mường Chiên",
      DistrictId: "118",
    },
    {
      id: "03685",
      name: "Xã Cà Nàng",
      DistrictId: "118",
    },
    {
      id: "03688",
      name: "Xã Chiềng Khay",
      DistrictId: "118",
    },
    {
      id: "03694",
      name: "Xã Mường Giôn",
      DistrictId: "118",
    },
    {
      id: "03697",
      name: "Xã Pá Ma Pha Khinh",
      DistrictId: "118",
    },
    {
      id: "03700",
      name: "Xã Chiềng Ơn",
      DistrictId: "118",
    },
    {
      id: "03703",
      name: "Xã Mường Giàng",
      DistrictId: "118",
    },
    {
      id: "03706",
      name: "Xã Chiềng Bằng",
      DistrictId: "118",
    },
    {
      id: "03709",
      name: "Xã Mường Sại",
      DistrictId: "118",
    },
    {
      id: "03712",
      name: "Xã Nậm ét",
      DistrictId: "118",
    },
    {
      id: "03718",
      name: "Xã Chiềng Khoang",
      DistrictId: "118",
    },
    {
      id: "03721",
      name: "Thị trấn Thuận Châu",
      DistrictId: "119",
    },
    {
      id: "03724",
      name: "Xã Phổng Lái",
      DistrictId: "119",
    },
    {
      id: "03727",
      name: "Xã Mường é",
      DistrictId: "119",
    },
    {
      id: "03730",
      name: "Xã Chiềng Pha",
      DistrictId: "119",
    },
    {
      id: "03733",
      name: "Xã Chiềng La",
      DistrictId: "119",
    },
    {
      id: "03736",
      name: "Xã Chiềng Ngàm",
      DistrictId: "119",
    },
    {
      id: "03739",
      name: "Xã Liệp Tè",
      DistrictId: "119",
    },
    {
      id: "03742",
      name: "Xã é Tòng",
      DistrictId: "119",
    },
    {
      id: "03745",
      name: "Xã Phổng Lập",
      DistrictId: "119",
    },
    {
      id: "03748",
      name: "Xã Phổng Lăng",
      DistrictId: "119",
    },
    {
      id: "03751",
      name: "Xã Chiềng Ly",
      DistrictId: "119",
    },
    {
      id: "03754",
      name: "Xã Noong Lay",
      DistrictId: "119",
    },
    {
      id: "03757",
      name: "Xã Mường Khiêng",
      DistrictId: "119",
    },
    {
      id: "03760",
      name: "Xã Mường Bám",
      DistrictId: "119",
    },
    {
      id: "03763",
      name: "Xã Long Hẹ",
      DistrictId: "119",
    },
    {
      id: "03766",
      name: "Xã Chiềng Bôm",
      DistrictId: "119",
    },
    {
      id: "03769",
      name: "Xã Thôm Mòn",
      DistrictId: "119",
    },
    {
      id: "03772",
      name: "Xã Tông Lạnh",
      DistrictId: "119",
    },
    {
      id: "03775",
      name: "Xã Tông Cọ",
      DistrictId: "119",
    },
    {
      id: "03778",
      name: "Xã Bó Mười",
      DistrictId: "119",
    },
    {
      id: "03781",
      name: "Xã Co Mạ",
      DistrictId: "119",
    },
    {
      id: "03784",
      name: "Xã Púng Tra",
      DistrictId: "119",
    },
    {
      id: "03787",
      name: "Xã Chiềng Pấc",
      DistrictId: "119",
    },
    {
      id: "03790",
      name: "Xã Nậm Lầu",
      DistrictId: "119",
    },
    {
      id: "03793",
      name: "Xã Bon Phặng",
      DistrictId: "119",
    },
    {
      id: "03796",
      name: "Xã Co Tòng",
      DistrictId: "119",
    },
    {
      id: "03799",
      name: "Xã Muổi Nọi",
      DistrictId: "119",
    },
    {
      id: "03802",
      name: "Xã Pá Lông",
      DistrictId: "119",
    },
    {
      id: "03805",
      name: "Xã Bản Lầm",
      DistrictId: "119",
    },
    {
      id: "03808",
      name: "Thị trấn Ít Ong",
      DistrictId: "120",
    },
    {
      id: "03811",
      name: "Xã Nậm Giôn",
      DistrictId: "120",
    },
    {
      id: "03814",
      name: "Xã Chiềng Lao",
      DistrictId: "120",
    },
    {
      id: "03817",
      name: "Xã Hua Trai",
      DistrictId: "120",
    },
    {
      id: "03820",
      name: "Xã Ngọc Chiến",
      DistrictId: "120",
    },
    {
      id: "03823",
      name: "Xã Mường Trai",
      DistrictId: "120",
    },
    {
      id: "03826",
      name: "Xã Nậm Păm",
      DistrictId: "120",
    },
    {
      id: "03829",
      name: "Xã Chiềng Muôn",
      DistrictId: "120",
    },
    {
      id: "03832",
      name: "Xã Chiềng Ân",
      DistrictId: "120",
    },
    {
      id: "03835",
      name: "Xã Pi Toong",
      DistrictId: "120",
    },
    {
      id: "03838",
      name: "Xã Chiềng Công",
      DistrictId: "120",
    },
    {
      id: "03841",
      name: "Xã Tạ Bú",
      DistrictId: "120",
    },
    {
      id: "03844",
      name: "Xã Chiềng San",
      DistrictId: "120",
    },
    {
      id: "03847",
      name: "Xã Mường Bú",
      DistrictId: "120",
    },
    {
      id: "03850",
      name: "Xã Chiềng Hoa",
      DistrictId: "120",
    },
    {
      id: "03853",
      name: "Xã Mường Chùm",
      DistrictId: "120",
    },
    {
      id: "03856",
      name: "Thị trấn Bắc Yên",
      DistrictId: "121",
    },
    {
      id: "03859",
      name: "Xã Phiêng Ban",
      DistrictId: "121",
    },
    {
      id: "03862",
      name: "Xã Hang Chú",
      DistrictId: "121",
    },
    {
      id: "03865",
      name: "Xã Xím Vàng",
      DistrictId: "121",
    },
    {
      id: "03868",
      name: "Xã Tà Xùa",
      DistrictId: "121",
    },
    {
      id: "03869",
      name: "Xã Háng Đồng",
      DistrictId: "121",
    },
    {
      id: "03871",
      name: "Xã Pắc Ngà",
      DistrictId: "121",
    },
    {
      id: "03874",
      name: "Xã Làng Chếu",
      DistrictId: "121",
    },
    {
      id: "03877",
      name: "Xã Chim Vàn",
      DistrictId: "121",
    },
    {
      id: "03880",
      name: "Xã Mường Khoa",
      DistrictId: "121",
    },
    {
      id: "03883",
      name: "Xã Song Pe",
      DistrictId: "121",
    },
    {
      id: "03886",
      name: "Xã Hồng Ngài",
      DistrictId: "121",
    },
    {
      id: "03889",
      name: "Xã Tạ Khoa",
      DistrictId: "121",
    },
    {
      id: "03890",
      name: "Xã Hua Nhàn",
      DistrictId: "121",
    },
    {
      id: "03892",
      name: "Xã Phiêng Côn",
      DistrictId: "121",
    },
    {
      id: "03895",
      name: "Xã Chiềng Sại",
      DistrictId: "121",
    },
    {
      id: "03898",
      name: "Thị trấn Phù Yên",
      DistrictId: "122",
    },
    {
      id: "03901",
      name: "Xã Suối Tọ",
      DistrictId: "122",
    },
    {
      id: "03904",
      name: "Xã Mường Thải",
      DistrictId: "122",
    },
    {
      id: "03907",
      name: "Xã Mường Cơi",
      DistrictId: "122",
    },
    {
      id: "03910",
      name: "Xã Quang Huy",
      DistrictId: "122",
    },
    {
      id: "03913",
      name: "Xã Huy Bắc",
      DistrictId: "122",
    },
    {
      id: "03916",
      name: "Xã Huy Thượng",
      DistrictId: "122",
    },
    {
      id: "03919",
      name: "Xã Tân Lang",
      DistrictId: "122",
    },
    {
      id: "03922",
      name: "Xã Gia Phù",
      DistrictId: "122",
    },
    {
      id: "03925",
      name: "Xã Tường Phù",
      DistrictId: "122",
    },
    {
      id: "03928",
      name: "Xã Huy Hạ",
      DistrictId: "122",
    },
    {
      id: "03931",
      name: "Xã Huy Tân",
      DistrictId: "122",
    },
    {
      id: "03934",
      name: "Xã Mường Lang",
      DistrictId: "122",
    },
    {
      id: "03937",
      name: "Xã Suối Bau",
      DistrictId: "122",
    },
    {
      id: "03940",
      name: "Xã Huy Tường",
      DistrictId: "122",
    },
    {
      id: "03943",
      name: "Xã Mường Do",
      DistrictId: "122",
    },
    {
      id: "03946",
      name: "Xã Sập Xa",
      DistrictId: "122",
    },
    {
      id: "03949",
      name: "Xã Tường Thượng",
      DistrictId: "122",
    },
    {
      id: "03952",
      name: "Xã Tường Tiến",
      DistrictId: "122",
    },
    {
      id: "03955",
      name: "Xã Tường Phong",
      DistrictId: "122",
    },
    {
      id: "03958",
      name: "Xã Tường Hạ",
      DistrictId: "122",
    },
    {
      id: "03961",
      name: "Xã Kim Bon",
      DistrictId: "122",
    },
    {
      id: "03964",
      name: "Xã Mường Bang",
      DistrictId: "122",
    },
    {
      id: "03967",
      name: "Xã Đá Đỏ",
      DistrictId: "122",
    },
    {
      id: "03970",
      name: "Xã Tân Phong",
      DistrictId: "122",
    },
    {
      id: "03973",
      name: "Xã Nam Phong",
      DistrictId: "122",
    },
    {
      id: "03976",
      name: "Xã Bắc Phong",
      DistrictId: "122",
    },
    {
      id: "03979",
      name: "Thị trấn Mộc Châu",
      DistrictId: "123",
    },
    {
      id: "03982",
      name: "Thị trấn NT Mộc Châu",
      DistrictId: "123",
    },
    {
      id: "03985",
      name: "Xã Chiềng Sơn",
      DistrictId: "123",
    },
    {
      id: "03988",
      name: "Xã Tân Hợp",
      DistrictId: "123",
    },
    {
      id: "03991",
      name: "Xã Qui Hướng",
      DistrictId: "123",
    },
    {
      id: "03994",
      name: "Xã Suối Bàng",
      DistrictId: "128",
    },
    {
      id: "03997",
      name: "Xã Tân Lập",
      DistrictId: "123",
    },
    {
      id: "04000",
      name: "Xã Nà Mường",
      DistrictId: "123",
    },
    {
      id: "04003",
      name: "Xã Tà Lai",
      DistrictId: "123",
    },
    {
      id: "04006",
      name: "Xã Song Khủa",
      DistrictId: "128",
    },
    {
      id: "04009",
      name: "Xã Liên Hoà",
      DistrictId: "128",
    },
    {
      id: "04012",
      name: "Xã Chiềng Hắc",
      DistrictId: "123",
    },
    {
      id: "04015",
      name: "Xã Hua Păng",
      DistrictId: "123",
    },
    {
      id: "04018",
      name: "Xã Tô Múa",
      DistrictId: "128",
    },
    {
      id: "04021",
      name: "Xã Mường Tè",
      DistrictId: "128",
    },
    {
      id: "04024",
      name: "Xã Chiềng Khừa",
      DistrictId: "123",
    },
    {
      id: "04027",
      name: "Xã Mường Sang",
      DistrictId: "123",
    },
    {
      id: "04030",
      name: "Xã Đông Sang",
      DistrictId: "123",
    },
    {
      id: "04033",
      name: "Xã Phiêng Luông",
      DistrictId: "123",
    },
    {
      id: "04036",
      name: "Xã Chiềng Khoa",
      DistrictId: "128",
    },
    {
      id: "04039",
      name: "Xã Mường Men",
      DistrictId: "128",
    },
    {
      id: "04042",
      name: "Xã Quang Minh",
      DistrictId: "128",
    },
    {
      id: "04045",
      name: "Xã Lóng Sập",
      DistrictId: "123",
    },
    {
      id: "04048",
      name: "Xã Vân Hồ",
      DistrictId: "128",
    },
    {
      id: "04051",
      name: "Xã Lóng Luông",
      DistrictId: "128",
    },
    {
      id: "04054",
      name: "Xã Chiềng Yên",
      DistrictId: "128",
    },
    {
      id: "04056",
      name: "Xã Chiềng Xuân",
      DistrictId: "128",
    },
    {
      id: "04057",
      name: "Xã Xuân Nha",
      DistrictId: "128",
    },
    {
      id: "04058",
      name: "Xã Tân Xuân",
      DistrictId: "128",
    },
    {
      id: "04060",
      name: "Thị trấn Yên Châu",
      DistrictId: "124",
    },
    {
      id: "04063",
      name: "Xã Chiềng Đông",
      DistrictId: "124",
    },
    {
      id: "04066",
      name: "Xã Sập Vạt",
      DistrictId: "124",
    },
    {
      id: "04069",
      name: "Xã Chiềng Sàng",
      DistrictId: "124",
    },
    {
      id: "04072",
      name: "Xã Chiềng Pằn",
      DistrictId: "124",
    },
    {
      id: "04075",
      name: "Xã Viêng Lán",
      DistrictId: "124",
    },
    {
      id: "04078",
      name: "Xã Chiềng Hặc",
      DistrictId: "124",
    },
    {
      id: "04081",
      name: "Xã Mường Lựm",
      DistrictId: "124",
    },
    {
      id: "04084",
      name: "Xã Chiềng On",
      DistrictId: "124",
    },
    {
      id: "04087",
      name: "Xã Yên Sơn",
      DistrictId: "124",
    },
    {
      id: "04090",
      name: "Xã Chiềng Khoi",
      DistrictId: "124",
    },
    {
      id: "04093",
      name: "Xã Tú Nang",
      DistrictId: "124",
    },
    {
      id: "04096",
      name: "Xã Lóng Phiêng",
      DistrictId: "124",
    },
    {
      id: "04099",
      name: "Xã Phiêng Khoài",
      DistrictId: "124",
    },
    {
      id: "04102",
      name: "Xã Chiềng Tương",
      DistrictId: "124",
    },
    {
      id: "04105",
      name: "Thị trấn Hát Lót",
      DistrictId: "125",
    },
    {
      id: "04108",
      name: "Xã Chiềng Sung",
      DistrictId: "125",
    },
    {
      id: "04111",
      name: "Xã Mường Bằng",
      DistrictId: "125",
    },
    {
      id: "04114",
      name: "Xã Chiềng Chăn",
      DistrictId: "125",
    },
    {
      id: "04117",
      name: "Xã Mương Chanh",
      DistrictId: "125",
    },
    {
      id: "04120",
      name: "Xã Chiềng Ban",
      DistrictId: "125",
    },
    {
      id: "04123",
      name: "Xã Chiềng Mung",
      DistrictId: "125",
    },
    {
      id: "04126",
      name: "Xã Mường Bon",
      DistrictId: "125",
    },
    {
      id: "04129",
      name: "Xã Chiềng Chung",
      DistrictId: "125",
    },
    {
      id: "04132",
      name: "Xã Chiềng Mai",
      DistrictId: "125",
    },
    {
      id: "04135",
      name: "Xã Hát Lót",
      DistrictId: "125",
    },
    {
      id: "04136",
      name: "Xã Nà Pó",
      DistrictId: "125",
    },
    {
      id: "04138",
      name: "Xã Cò  Nòi",
      DistrictId: "125",
    },
    {
      id: "04141",
      name: "Xã Chiềng Nơi",
      DistrictId: "125",
    },
    {
      id: "04144",
      name: "Xã Phiêng Cằm",
      DistrictId: "125",
    },
    {
      id: "04147",
      name: "Xã Chiềng Dong",
      DistrictId: "125",
    },
    {
      id: "04150",
      name: "Xã Chiềng Kheo",
      DistrictId: "125",
    },
    {
      id: "04153",
      name: "Xã Chiềng Ve",
      DistrictId: "125",
    },
    {
      id: "04156",
      name: "Xã Chiềng Lương",
      DistrictId: "125",
    },
    {
      id: "04159",
      name: "Xã Phiêng Pằn",
      DistrictId: "125",
    },
    {
      id: "04162",
      name: "Xã Nà Ơt",
      DistrictId: "125",
    },
    {
      id: "04165",
      name: "Xã Tà Hộc",
      DistrictId: "125",
    },
    {
      id: "04168",
      name: "Thị trấn Sông Mã",
      DistrictId: "126",
    },
    {
      id: "04171",
      name: "Xã Bó Sinh",
      DistrictId: "126",
    },
    {
      id: "04174",
      name: "Xã Pú Pẩu",
      DistrictId: "126",
    },
    {
      id: "04177",
      name: "Xã Chiềng Phung",
      DistrictId: "126",
    },
    {
      id: "04180",
      name: "Xã Chiềng En",
      DistrictId: "126",
    },
    {
      id: "04183",
      name: "Xã Mường Lầm",
      DistrictId: "126",
    },
    {
      id: "04186",
      name: "Xã Nậm Ty",
      DistrictId: "126",
    },
    {
      id: "04189",
      name: "Xã Đứa Mòn",
      DistrictId: "126",
    },
    {
      id: "04192",
      name: "Xã Yên Hưng",
      DistrictId: "126",
    },
    {
      id: "04195",
      name: "Xã Chiềng Sơ",
      DistrictId: "126",
    },
    {
      id: "04198",
      name: "Xã Nà Nghịu",
      DistrictId: "126",
    },
    {
      id: "04201",
      name: "Xã Nậm Mằn",
      DistrictId: "126",
    },
    {
      id: "04204",
      name: "Xã Chiềng Khoong",
      DistrictId: "126",
    },
    {
      id: "04207",
      name: "Xã Chiềng Cang",
      DistrictId: "126",
    },
    {
      id: "04210",
      name: "Xã Huổi Một",
      DistrictId: "126",
    },
    {
      id: "04213",
      name: "Xã Mường Sai",
      DistrictId: "126",
    },
    {
      id: "04216",
      name: "Xã Mường Cai",
      DistrictId: "126",
    },
    {
      id: "04219",
      name: "Xã Mường Hung",
      DistrictId: "126",
    },
    {
      id: "04222",
      name: "Xã Chiềng Khương",
      DistrictId: "126",
    },
    {
      id: "04225",
      name: "Xã Sam Kha",
      DistrictId: "127",
    },
    {
      id: "04228",
      name: "Xã Púng Bánh",
      DistrictId: "127",
    },
    {
      id: "04231",
      name: "Xã Sốp Cộp",
      DistrictId: "127",
    },
    {
      id: "04234",
      name: "Xã Dồm Cang",
      DistrictId: "127",
    },
    {
      id: "04237",
      name: "Xã Nậm Lạnh",
      DistrictId: "127",
    },
    {
      id: "04240",
      name: "Xã Mường Lèo",
      DistrictId: "127",
    },
    {
      id: "04243",
      name: "Xã Mường Và",
      DistrictId: "127",
    },
    {
      id: "04246",
      name: "Xã Mường Lạn",
      DistrictId: "127",
    },
    {
      id: "04249",
      name: "Phường Yên Thịnh",
      DistrictId: "132",
    },
    {
      id: "04252",
      name: "Phường Yên Ninh",
      DistrictId: "132",
    },
    {
      id: "04255",
      name: "Phường Minh Tân",
      DistrictId: "132",
    },
    {
      id: "04258",
      name: "Phường Nguyễn Thái Học",
      DistrictId: "132",
    },
    {
      id: "04261",
      name: "Phường Đồng Tâm",
      DistrictId: "132",
    },
    {
      id: "04264",
      name: "Phường Nguyễn Phúc",
      DistrictId: "132",
    },
    {
      id: "04267",
      name: "Phường Hồng Hà",
      DistrictId: "132",
    },
    {
      id: "04270",
      name: "Xã Minh Bảo",
      DistrictId: "132",
    },
    {
      id: "04273",
      name: "Phường Nam Cường",
      DistrictId: "132",
    },
    {
      id: "04276",
      name: "Xã Tuy Lộc",
      DistrictId: "132",
    },
    {
      id: "04279",
      name: "Xã Tân Thịnh",
      DistrictId: "132",
    },
    {
      id: "04282",
      name: "Phường Pú Trạng",
      DistrictId: "133",
    },
    {
      id: "04285",
      name: "Phường Trung Tâm",
      DistrictId: "133",
    },
    {
      id: "04288",
      name: "Phường Tân An",
      DistrictId: "133",
    },
    {
      id: "04291",
      name: "Phường Cầu Thia",
      DistrictId: "133",
    },
    {
      id: "04294",
      name: "Xã Nghĩa Lợi",
      DistrictId: "133",
    },
    {
      id: "04297",
      name: "Xã Nghĩa Phúc",
      DistrictId: "133",
    },
    {
      id: "04300",
      name: "Xã Nghĩa An",
      DistrictId: "133",
    },
    {
      id: "04303",
      name: "Thị trấn Yên Thế",
      DistrictId: "135",
    },
    {
      id: "04306",
      name: "Xã Tân Phượng",
      DistrictId: "135",
    },
    {
      id: "04309",
      name: "Xã Lâm Thượng",
      DistrictId: "135",
    },
    {
      id: "04312",
      name: "Xã Khánh Thiện",
      DistrictId: "135",
    },
    {
      id: "04315",
      name: "Xã Minh Chuẩn",
      DistrictId: "135",
    },
    {
      id: "04318",
      name: "Xã Mai Sơn",
      DistrictId: "135",
    },
    {
      id: "04321",
      name: "Xã Khai Trung",
      DistrictId: "135",
    },
    {
      id: "04324",
      name: "Xã Mường Lai",
      DistrictId: "135",
    },
    {
      id: "04327",
      name: "Xã An Lạc",
      DistrictId: "135",
    },
    {
      id: "04330",
      name: "Xã Minh Xuân",
      DistrictId: "135",
    },
    {
      id: "04333",
      name: "Xã Tô Mậu",
      DistrictId: "135",
    },
    {
      id: "04336",
      name: "Xã Tân Lĩnh",
      DistrictId: "135",
    },
    {
      id: "04339",
      name: "Xã Yên Thắng",
      DistrictId: "135",
    },
    {
      id: "04342",
      name: "Xã Khánh Hoà",
      DistrictId: "135",
    },
    {
      id: "04345",
      name: "Xã Vĩnh Lạc",
      DistrictId: "135",
    },
    {
      id: "04348",
      name: "Xã Liễu Đô",
      DistrictId: "135",
    },
    {
      id: "04351",
      name: "Xã Động Quan",
      DistrictId: "135",
    },
    {
      id: "04354",
      name: "Xã Tân Lập",
      DistrictId: "135",
    },
    {
      id: "04357",
      name: "Xã Minh Tiến",
      DistrictId: "135",
    },
    {
      id: "04360",
      name: "Xã Trúc Lâu",
      DistrictId: "135",
    },
    {
      id: "04363",
      name: "Xã Phúc Lợi",
      DistrictId: "135",
    },
    {
      id: "04366",
      name: "Xã Phan Thanh",
      DistrictId: "135",
    },
    {
      id: "04369",
      name: "Xã An Phú",
      DistrictId: "135",
    },
    {
      id: "04372",
      name: "Xã Trung Tâm",
      DistrictId: "135",
    },
    {
      id: "04375",
      name: "Thị trấn Mậu A",
      DistrictId: "136",
    },
    {
      id: "04378",
      name: "Xã Lang Thíp",
      DistrictId: "136",
    },
    {
      id: "04381",
      name: "Xã Lâm Giang",
      DistrictId: "136",
    },
    {
      id: "04384",
      name: "Xã Châu Quế Thượng",
      DistrictId: "136",
    },
    {
      id: "04387",
      name: "Xã Châu Quế Hạ",
      DistrictId: "136",
    },
    {
      id: "04390",
      name: "Xã An Bình",
      DistrictId: "136",
    },
    {
      id: "04393",
      name: "Xã Quang Minh",
      DistrictId: "136",
    },
    {
      id: "04396",
      name: "Xã Đông An",
      DistrictId: "136",
    },
    {
      id: "04399",
      name: "Xã Đông Cuông",
      DistrictId: "136",
    },
    {
      id: "04402",
      name: "Xã Phong Dụ Hạ",
      DistrictId: "136",
    },
    {
      id: "04405",
      name: "Xã Mậu Đông",
      DistrictId: "136",
    },
    {
      id: "04408",
      name: "Xã Ngòi A",
      DistrictId: "136",
    },
    {
      id: "04411",
      name: "Xã Xuân Tầm",
      DistrictId: "136",
    },
    {
      id: "04414",
      name: "Xã Tân Hợp",
      DistrictId: "136",
    },
    {
      id: "04417",
      name: "Xã An Thịnh",
      DistrictId: "136",
    },
    {
      id: "04420",
      name: "Xã Yên Thái",
      DistrictId: "136",
    },
    {
      id: "04423",
      name: "Xã Phong Dụ Thượng",
      DistrictId: "136",
    },
    {
      id: "04426",
      name: "Xã Yên Hợp",
      DistrictId: "136",
    },
    {
      id: "04429",
      name: "Xã Đại Sơn",
      DistrictId: "136",
    },
    {
      id: "04435",
      name: "Xã Đại Phác",
      DistrictId: "136",
    },
    {
      id: "04438",
      name: "Xã Yên Phú",
      DistrictId: "136",
    },
    {
      id: "04441",
      name: "Xã Xuân Ái",
      DistrictId: "136",
    },
    {
      id: "04447",
      name: "Xã Viễn Sơn",
      DistrictId: "136",
    },
    {
      id: "04450",
      name: "Xã Mỏ Vàng",
      DistrictId: "136",
    },
    {
      id: "04453",
      name: "Xã Nà Hẩu",
      DistrictId: "136",
    },
    {
      id: "04456",
      name: "Thị trấn Mù Căng Chải",
      DistrictId: "137",
    },
    {
      id: "04459",
      name: "Xã Hồ Bốn",
      DistrictId: "137",
    },
    {
      id: "04462",
      name: "Xã Nậm Có",
      DistrictId: "137",
    },
    {
      id: "04465",
      name: "Xã Khao Mang",
      DistrictId: "137",
    },
    {
      id: "04468",
      name: "Xã Mồ Dề",
      DistrictId: "137",
    },
    {
      id: "04471",
      name: "Xã Chế Cu Nha",
      DistrictId: "137",
    },
    {
      id: "04474",
      name: "Xã Lao Chải",
      DistrictId: "137",
    },
    {
      id: "04477",
      name: "Xã Kim Nọi",
      DistrictId: "137",
    },
    {
      id: "04480",
      name: "Xã Cao Phạ",
      DistrictId: "137",
    },
    {
      id: "04483",
      name: "Xã La Pán Tẩn",
      DistrictId: "137",
    },
    {
      id: "04486",
      name: "Xã Dế Su Phình",
      DistrictId: "137",
    },
    {
      id: "04489",
      name: "Xã Chế Tạo",
      DistrictId: "137",
    },
    {
      id: "04492",
      name: "Xã Púng Luông",
      DistrictId: "137",
    },
    {
      id: "04495",
      name: "Xã Nậm Khắt",
      DistrictId: "137",
    },
    {
      id: "04498",
      name: "Thị trấn Cổ Phúc",
      DistrictId: "138",
    },
    {
      id: "04501",
      name: "Xã Tân Đồng",
      DistrictId: "138",
    },
    {
      id: "04504",
      name: "Xã Báo Đáp",
      DistrictId: "138",
    },
    {
      id: "04507",
      name: "Xã Đào Thịnh",
      DistrictId: "138",
    },
    {
      id: "04510",
      name: "Xã Việt Thành",
      DistrictId: "138",
    },
    {
      id: "04513",
      name: "Xã Hòa Cuông",
      DistrictId: "138",
    },
    {
      id: "04516",
      name: "Xã Minh Quán",
      DistrictId: "138",
    },
    {
      id: "04519",
      name: "Xã Quy Mông",
      DistrictId: "138",
    },
    {
      id: "04522",
      name: "Xã Cường Thịnh",
      DistrictId: "138",
    },
    {
      id: "04525",
      name: "Xã Kiên Thành",
      DistrictId: "138",
    },
    {
      id: "04528",
      name: "Xã Nga Quán",
      DistrictId: "138",
    },
    {
      id: "04531",
      name: "Xã Y Can",
      DistrictId: "138",
    },
    {
      id: "04537",
      name: "Xã Lương Thịnh",
      DistrictId: "138",
    },
    {
      id: "04540",
      name: "Xã Âu Lâu",
      DistrictId: "132",
    },
    {
      id: "04543",
      name: "Xã Giới Phiên",
      DistrictId: "132",
    },
    {
      id: "04546",
      name: "Phường Hợp Minh",
      DistrictId: "132",
    },
    {
      id: "04558",
      name: "Xã Văn Phú",
      DistrictId: "132",
    },
    {
      id: "04561",
      name: "Xã Bảo Hưng",
      DistrictId: "138",
    },
    {
      id: "04564",
      name: "Xã Việt Cường",
      DistrictId: "138",
    },
    {
      id: "04567",
      name: "Xã Minh Quân",
      DistrictId: "138",
    },
    {
      id: "04570",
      name: "Xã Hồng Ca",
      DistrictId: "138",
    },
    {
      id: "04573",
      name: "Xã Hưng Thịnh",
      DistrictId: "138",
    },
    {
      id: "04576",
      name: "Xã Hưng Khánh",
      DistrictId: "138",
    },
    {
      id: "04579",
      name: "Xã Việt Hồng",
      DistrictId: "138",
    },
    {
      id: "04582",
      name: "Xã Vân Hội",
      DistrictId: "138",
    },
    {
      id: "04585",
      name: "Thị trấn Trạm Tấu",
      DistrictId: "139",
    },
    {
      id: "04588",
      name: "Xã Túc Đán",
      DistrictId: "139",
    },
    {
      id: "04591",
      name: "Xã Pá Lau",
      DistrictId: "139",
    },
    {
      id: "04594",
      name: "Xã Xà Hồ",
      DistrictId: "139",
    },
    {
      id: "04597",
      name: "Xã Phình Hồ",
      DistrictId: "139",
    },
    {
      id: "04600",
      name: "Xã Trạm Tấu",
      DistrictId: "139",
    },
    {
      id: "04603",
      name: "Xã Tà Si Láng",
      DistrictId: "139",
    },
    {
      id: "04606",
      name: "Xã Pá Hu",
      DistrictId: "139",
    },
    {
      id: "04609",
      name: "Xã Làng Nhì",
      DistrictId: "139",
    },
    {
      id: "04612",
      name: "Xã Bản Công",
      DistrictId: "139",
    },
    {
      id: "04615",
      name: "Xã Bản Mù",
      DistrictId: "139",
    },
    {
      id: "04618",
      name: "Xã Hát Lìu",
      DistrictId: "139",
    },
    {
      id: "04621",
      name: "Thị trấn NT Liên Sơn",
      DistrictId: "140",
    },
    {
      id: "04624",
      name: "Xã Nghĩa Lộ",
      DistrictId: "133",
    },
    {
      id: "04627",
      name: "Thị trấn NT Trần Phú",
      DistrictId: "140",
    },
    {
      id: "04630",
      name: "Xã Tú Lệ",
      DistrictId: "140",
    },
    {
      id: "04633",
      name: "Xã Nậm Búng",
      DistrictId: "140",
    },
    {
      id: "04636",
      name: "Xã Gia Hội",
      DistrictId: "140",
    },
    {
      id: "04639",
      name: "Xã Sùng Đô",
      DistrictId: "140",
    },
    {
      id: "04642",
      name: "Xã Nậm Mười",
      DistrictId: "140",
    },
    {
      id: "04645",
      name: "Xã An Lương",
      DistrictId: "140",
    },
    {
      id: "04648",
      name: "Xã Nậm Lành",
      DistrictId: "140",
    },
    {
      id: "04651",
      name: "Xã Sơn Lương",
      DistrictId: "140",
    },
    {
      id: "04654",
      name: "Xã Suối Quyền",
      DistrictId: "140",
    },
    {
      id: "04657",
      name: "Xã Suối Giàng",
      DistrictId: "140",
    },
    {
      id: "04660",
      name: "Xã Sơn A",
      DistrictId: "133",
    },
    {
      id: "04663",
      name: "Xã Phù Nham",
      DistrictId: "133",
    },
    {
      id: "04666",
      name: "Xã Nghĩa Sơn",
      DistrictId: "140",
    },
    {
      id: "04669",
      name: "Xã Suối Bu",
      DistrictId: "140",
    },
    {
      id: "04672",
      name: "Thị trấn Sơn Thịnh",
      DistrictId: "140",
    },
    {
      id: "04675",
      name: "Xã Thanh Lương",
      DistrictId: "133",
    },
    {
      id: "04678",
      name: "Xã Hạnh Sơn",
      DistrictId: "133",
    },
    {
      id: "04681",
      name: "Xã Phúc Sơn",
      DistrictId: "133",
    },
    {
      id: "04684",
      name: "Xã Thạch Lương",
      DistrictId: "133",
    },
    {
      id: "04687",
      name: "Xã Đại Lịch",
      DistrictId: "140",
    },
    {
      id: "04690",
      name: "Xã Đồng Khê",
      DistrictId: "140",
    },
    {
      id: "04693",
      name: "Xã Cát Thịnh",
      DistrictId: "140",
    },
    {
      id: "04696",
      name: "Xã Tân Thịnh",
      DistrictId: "140",
    },
    {
      id: "04699",
      name: "Xã Chấn Thịnh",
      DistrictId: "140",
    },
    {
      id: "04702",
      name: "Xã Bình Thuận",
      DistrictId: "140",
    },
    {
      id: "04705",
      name: "Xã Thượng Bằng La",
      DistrictId: "140",
    },
    {
      id: "04708",
      name: "Xã Minh An",
      DistrictId: "140",
    },
    {
      id: "04711",
      name: "Xã Nghĩa Tâm",
      DistrictId: "140",
    },
    {
      id: "04714",
      name: "Thị trấn Yên Bình",
      DistrictId: "141",
    },
    {
      id: "04717",
      name: "Thị trấn Thác Bà",
      DistrictId: "141",
    },
    {
      id: "04720",
      name: "Xã Xuân Long",
      DistrictId: "141",
    },
    {
      id: "04726",
      name: "Xã Cảm Nhân",
      DistrictId: "141",
    },
    {
      id: "04729",
      name: "Xã Ngọc Chấn",
      DistrictId: "141",
    },
    {
      id: "04732",
      name: "Xã Tân Nguyên",
      DistrictId: "141",
    },
    {
      id: "04735",
      name: "Xã Phúc Ninh",
      DistrictId: "141",
    },
    {
      id: "04738",
      name: "Xã Bảo Ái",
      DistrictId: "141",
    },
    {
      id: "04741",
      name: "Xã Mỹ Gia",
      DistrictId: "141",
    },
    {
      id: "04744",
      name: "Xã Xuân Lai",
      DistrictId: "141",
    },
    {
      id: "04747",
      name: "Xã Mông Sơn",
      DistrictId: "141",
    },
    {
      id: "04750",
      name: "Xã Cảm Ân",
      DistrictId: "141",
    },
    {
      id: "04753",
      name: "Xã Yên Thành",
      DistrictId: "141",
    },
    {
      id: "04756",
      name: "Xã Tân Hương",
      DistrictId: "141",
    },
    {
      id: "04759",
      name: "Xã Phúc An",
      DistrictId: "141",
    },
    {
      id: "04762",
      name: "Xã Bạch Hà",
      DistrictId: "141",
    },
    {
      id: "04765",
      name: "Xã Vũ Linh",
      DistrictId: "141",
    },
    {
      id: "04768",
      name: "Xã Đại Đồng",
      DistrictId: "141",
    },
    {
      id: "04771",
      name: "Xã Vĩnh Kiên",
      DistrictId: "141",
    },
    {
      id: "04774",
      name: "Xã Yên Bình",
      DistrictId: "141",
    },
    {
      id: "04777",
      name: "Xã Thịnh Hưng",
      DistrictId: "141",
    },
    {
      id: "04780",
      name: "Xã Hán Đà",
      DistrictId: "141",
    },
    {
      id: "04783",
      name: "Xã Phú Thịnh",
      DistrictId: "141",
    },
    {
      id: "04786",
      name: "Xã Đại Minh",
      DistrictId: "141",
    },
    {
      id: "04789",
      name: "Phường Thái Bình",
      DistrictId: "148",
    },
    {
      id: "04792",
      name: "Phường Tân Hòa",
      DistrictId: "148",
    },
    {
      id: "04795",
      name: "Phường Thịnh Lang",
      DistrictId: "148",
    },
    {
      id: "04798",
      name: "Phường Hữu Nghị",
      DistrictId: "148",
    },
    {
      id: "04801",
      name: "Phường Tân Thịnh",
      DistrictId: "148",
    },
    {
      id: "04804",
      name: "Phường Đồng Tiến",
      DistrictId: "148",
    },
    {
      id: "04807",
      name: "Phường Phương Lâm",
      DistrictId: "148",
    },
    {
      id: "04813",
      name: "Xã Yên Mông",
      DistrictId: "148",
    },
    {
      id: "04816",
      name: "Phường Quỳnh Lâm",
      DistrictId: "148",
    },
    {
      id: "04819",
      name: "Phường Dân Chủ",
      DistrictId: "148",
    },
    {
      id: "04825",
      name: "Xã Hòa Bình",
      DistrictId: "148",
    },
    {
      id: "04828",
      name: "Phường Thống Nhất",
      DistrictId: "148",
    },
    {
      id: "04831",
      name: "Thị trấn Đà Bắc",
      DistrictId: "150",
    },
    {
      id: "04834",
      name: "Xã Nánh Nghê",
      DistrictId: "150",
    },
    {
      id: "04840",
      name: "Xã Giáp Đắt",
      DistrictId: "150",
    },
    {
      id: "04846",
      name: "Xã Mường Chiềng",
      DistrictId: "150",
    },
    {
      id: "04849",
      name: "Xã Tân Pheo",
      DistrictId: "150",
    },
    {
      id: "04852",
      name: "Xã Đồng Chum",
      DistrictId: "150",
    },
    {
      id: "04855",
      name: "Xã Tân Minh",
      DistrictId: "150",
    },
    {
      id: "04858",
      name: "Xã Đoàn Kết",
      DistrictId: "150",
    },
    {
      id: "04861",
      name: "Xã Đồng Ruộng",
      DistrictId: "150",
    },
    {
      id: "04867",
      name: "Xã Tú Lý",
      DistrictId: "150",
    },
    {
      id: "04870",
      name: "Xã Trung Thành",
      DistrictId: "150",
    },
    {
      id: "04873",
      name: "Xã Yên Hòa",
      DistrictId: "150",
    },
    {
      id: "04876",
      name: "Xã Cao Sơn",
      DistrictId: "150",
    },
    {
      id: "04879",
      name: "Xã Toàn Sơn",
      DistrictId: "150",
    },
    {
      id: "04882",
      name: "Xã Tân Thành",
      DistrictId: "156",
    },
    {
      id: "04885",
      name: "Xã Hiền Lương",
      DistrictId: "150",
    },
    {
      id: "04888",
      name: "Xã Tiền Phong",
      DistrictId: "150",
    },
    {
      id: "04891",
      name: "Xã Vầy Nưa",
      DistrictId: "150",
    },
    {
      id: "04894",
      name: "Phường Kỳ Sơn",
      DistrictId: "148",
    },
    {
      id: "04897",
      name: "Xã Thịnh Minh",
      DistrictId: "148",
    },
    {
      id: "04903",
      name: "Xã Hợp Thành",
      DistrictId: "148",
    },
    {
      id: "04906",
      name: "Xã Quang Tiến",
      DistrictId: "148",
    },
    {
      id: "04912",
      name: "Xã Mông Hóa",
      DistrictId: "148",
    },
    {
      id: "04918",
      name: "Phường Trung Minh",
      DistrictId: "148",
    },
    {
      id: "04921",
      name: "Xã Độc Lập",
      DistrictId: "148",
    },
    {
      id: "04924",
      name: "Thị trấn Lương Sơn",
      DistrictId: "152",
    },
    {
      id: "04927",
      name: "Xã Yên Trung",
      DistrictId: "276",
    },
    {
      id: "04930",
      name: "Xã Yên Bình",
      DistrictId: "276",
    },
    {
      id: "04936",
      name: "Xã Tiến Xuân",
      DistrictId: "276",
    },
    {
      id: "04939",
      name: "Xã Đông Xuân",
      DistrictId: "275",
    },
    {
      id: "04942",
      name: "Xã Lâm Sơn",
      DistrictId: "152",
    },
    {
      id: "04945",
      name: "Xã Hòa Sơn",
      DistrictId: "152",
    },
    {
      id: "04951",
      name: "Xã Tân Vinh",
      DistrictId: "152",
    },
    {
      id: "04954",
      name: "Xã Nhuận Trạch",
      DistrictId: "152",
    },
    {
      id: "04957",
      name: "Xã Cao Sơn",
      DistrictId: "152",
    },
    {
      id: "04960",
      name: "Xã Cư Yên",
      DistrictId: "152",
    },
    {
      id: "04969",
      name: "Xã Liên Sơn",
      DistrictId: "152",
    },
    {
      id: "04978",
      name: "Thị trấn Bo",
      DistrictId: "153",
    },
    {
      id: "04981",
      name: "Thị trấn Ba Hàng Đồi",
      DistrictId: "159",
    },
    {
      id: "04984",
      name: "Xã Đú Sáng",
      DistrictId: "153",
    },
    {
      id: "04987",
      name: "Xã Hùng Sơn",
      DistrictId: "153",
    },
    {
      id: "04990",
      name: "Xã Bình Sơn",
      DistrictId: "153",
    },
    {
      id: "04999",
      name: "Xã Tú Sơn",
      DistrictId: "153",
    },
    {
      id: "05005",
      name: "Xã Vĩnh Tiến",
      DistrictId: "153",
    },
    {
      id: "05008",
      name: "Xã Cao Dương",
      DistrictId: "152",
    },
    {
      id: "05014",
      name: "Xã Đông Bắc",
      DistrictId: "153",
    },
    {
      id: "05017",
      name: "Xã Xuân Thủy",
      DistrictId: "153",
    },
    {
      id: "05026",
      name: "Xã Vĩnh Đồng",
      DistrictId: "153",
    },
    {
      id: "05035",
      name: "Xã Kim Lập",
      DistrictId: "153",
    },
    {
      id: "05038",
      name: "Xã Hợp Tiến",
      DistrictId: "153",
    },
    {
      id: "05041",
      name: "Xã Thanh Sơn",
      DistrictId: "152",
    },
    {
      id: "05047",
      name: "Xã Thanh Cao",
      DistrictId: "152",
    },
    {
      id: "05065",
      name: "Xã Kim Bôi",
      DistrictId: "153",
    },
    {
      id: "05068",
      name: "Xã Nam Thượng",
      DistrictId: "153",
    },
    {
      id: "05077",
      name: "Xã Cuối Hạ",
      DistrictId: "153",
    },
    {
      id: "05080",
      name: "Xã Sào Báy",
      DistrictId: "153",
    },
    {
      id: "05083",
      name: "Xã Mi Hòa",
      DistrictId: "153",
    },
    {
      id: "05086",
      name: "Xã Nuông Dăm",
      DistrictId: "153",
    },
    {
      id: "05089",
      name: "Thị trấn Cao Phong",
      DistrictId: "154",
    },
    {
      id: "05092",
      name: "Xã Bình Thanh",
      DistrictId: "154",
    },
    {
      id: "05095",
      name: "Xã Thung Nai",
      DistrictId: "154",
    },
    {
      id: "05098",
      name: "Xã Bắc Phong",
      DistrictId: "154",
    },
    {
      id: "05101",
      name: "Xã Thu Phong",
      DistrictId: "154",
    },
    {
      id: "05104",
      name: "Xã Hợp Phong",
      DistrictId: "154",
    },
    {
      id: "05110",
      name: "Xã Tây Phong",
      DistrictId: "154",
    },
    {
      id: "05116",
      name: "Xã Dũng Phong",
      DistrictId: "154",
    },
    {
      id: "05119",
      name: "Xã Nam Phong",
      DistrictId: "154",
    },
    {
      id: "05125",
      name: "Xã Thạch Yên",
      DistrictId: "154",
    },
    {
      id: "05128",
      name: "Thị trấn Mãn Đức",
      DistrictId: "155",
    },
    {
      id: "05134",
      name: "Xã Suối Hoa",
      DistrictId: "155",
    },
    {
      id: "05137",
      name: "Xã Phú Vinh",
      DistrictId: "155",
    },
    {
      id: "05140",
      name: "Xã Phú Cường",
      DistrictId: "155",
    },
    {
      id: "05143",
      name: "Xã Mỹ Hòa",
      DistrictId: "155",
    },
    {
      id: "05152",
      name: "Xã Quyết Chiến",
      DistrictId: "155",
    },
    {
      id: "05158",
      name: "Xã Phong Phú",
      DistrictId: "155",
    },
    {
      id: "05164",
      name: "Xã Tử Nê",
      DistrictId: "155",
    },
    {
      id: "05167",
      name: "Xã Thanh Hối",
      DistrictId: "155",
    },
    {
      id: "05170",
      name: "Xã Ngọc Mỹ",
      DistrictId: "155",
    },
    {
      id: "05173",
      name: "Xã Đông Lai",
      DistrictId: "155",
    },
    {
      id: "05176",
      name: "Xã Vân Sơn",
      DistrictId: "155",
    },
    {
      id: "05182",
      name: "Xã Nhân Mỹ",
      DistrictId: "155",
    },
    {
      id: "05191",
      name: "Xã Lỗ Sơn",
      DistrictId: "155",
    },
    {
      id: "05194",
      name: "Xã Ngổ Luông",
      DistrictId: "155",
    },
    {
      id: "05197",
      name: "Xã Gia Mô",
      DistrictId: "155",
    },
    {
      id: "05200",
      name: "Thị trấn Mai Châu",
      DistrictId: "156",
    },
    {
      id: "05206",
      name: "Xã Sơn Thủy",
      DistrictId: "156",
    },
    {
      id: "05209",
      name: "Xã Pà Cò",
      DistrictId: "156",
    },
    {
      id: "05212",
      name: "Xã Hang Kia",
      DistrictId: "156",
    },
    {
      id: "05221",
      name: "Xã Đồng Tân",
      DistrictId: "156",
    },
    {
      id: "05224",
      name: "Xã Cun Pheo",
      DistrictId: "156",
    },
    {
      id: "05227",
      name: "Xã Bao La",
      DistrictId: "156",
    },
    {
      id: "05233",
      name: "Xã Tòng Đậu",
      DistrictId: "156",
    },
    {
      id: "05242",
      name: "Xã Nà Phòn",
      DistrictId: "156",
    },
    {
      id: "05245",
      name: "Xã Săm Khóe",
      DistrictId: "156",
    },
    {
      id: "05248",
      name: "Xã Chiềng Châu",
      DistrictId: "156",
    },
    {
      id: "05251",
      name: "Xã Mai Hạ",
      DistrictId: "156",
    },
    {
      id: "05254",
      name: "Xã Thành Sơn",
      DistrictId: "156",
    },
    {
      id: "05257",
      name: "Xã Mai Hịch",
      DistrictId: "156",
    },
    {
      id: "05263",
      name: "Xã Vạn Mai",
      DistrictId: "156",
    },
    {
      id: "05266",
      name: "Thị trấn Vụ Bản",
      DistrictId: "157",
    },
    {
      id: "05269",
      name: "Xã Quý Hòa",
      DistrictId: "157",
    },
    {
      id: "05272",
      name: "Xã Miền Đồi",
      DistrictId: "157",
    },
    {
      id: "05275",
      name: "Xã Mỹ Thành",
      DistrictId: "157",
    },
    {
      id: "05278",
      name: "Xã Tuân Đạo",
      DistrictId: "157",
    },
    {
      id: "05281",
      name: "Xã Văn Nghĩa",
      DistrictId: "157",
    },
    {
      id: "05284",
      name: "Xã Văn Sơn",
      DistrictId: "157",
    },
    {
      id: "05287",
      name: "Xã Tân Lập",
      DistrictId: "157",
    },
    {
      id: "05290",
      name: "Xã Nhân Nghĩa",
      DistrictId: "157",
    },
    {
      id: "05293",
      name: "Xã Thượng Cốc",
      DistrictId: "157",
    },
    {
      id: "05299",
      name: "Xã Quyết Thắng",
      DistrictId: "157",
    },
    {
      id: "05302",
      name: "Xã Xuất Hóa",
      DistrictId: "157",
    },
    {
      id: "05305",
      name: "Xã Yên Phú",
      DistrictId: "157",
    },
    {
      id: "05308",
      name: "Xã Bình Hẻm",
      DistrictId: "157",
    },
    {
      id: "05320",
      name: "Xã Định Cư",
      DistrictId: "157",
    },
    {
      id: "05323",
      name: "Xã Chí Đạo",
      DistrictId: "157",
    },
    {
      id: "05329",
      name: "Xã Ngọc Sơn",
      DistrictId: "157",
    },
    {
      id: "05332",
      name: "Xã Hương Nhượng",
      DistrictId: "157",
    },
    {
      id: "05335",
      name: "Xã Vũ Bình",
      DistrictId: "157",
    },
    {
      id: "05338",
      name: "Xã Tự Do",
      DistrictId: "157",
    },
    {
      id: "05341",
      name: "Xã Yên Nghiệp",
      DistrictId: "157",
    },
    {
      id: "05344",
      name: "Xã Tân Mỹ",
      DistrictId: "157",
    },
    {
      id: "05347",
      name: "Xã Ân Nghĩa",
      DistrictId: "157",
    },
    {
      id: "05350",
      name: "Xã Ngọc Lâu",
      DistrictId: "157",
    },
    {
      id: "05353",
      name: "Thị trấn Hàng Trạm",
      DistrictId: "158",
    },
    {
      id: "05356",
      name: "Xã Lạc Sỹ",
      DistrictId: "158",
    },
    {
      id: "05362",
      name: "Xã Lạc Lương",
      DistrictId: "158",
    },
    {
      id: "05365",
      name: "Xã Bảo Hiệu",
      DistrictId: "158",
    },
    {
      id: "05368",
      name: "Xã Đa Phúc",
      DistrictId: "158",
    },
    {
      id: "05371",
      name: "Xã Hữu Lợi",
      DistrictId: "158",
    },
    {
      id: "05374",
      name: "Xã Lạc Thịnh",
      DistrictId: "158",
    },
    {
      id: "05380",
      name: "Xã Đoàn Kết",
      DistrictId: "158",
    },
    {
      id: "05383",
      name: "Xã Phú Lai",
      DistrictId: "158",
    },
    {
      id: "05386",
      name: "Xã Yên Trị",
      DistrictId: "158",
    },
    {
      id: "05389",
      name: "Xã Ngọc Lương",
      DistrictId: "158",
    },
    {
      id: "05392",
      name: "Thị trấn Chi Nê",
      DistrictId: "159",
    },
    {
      id: "05395",
      name: "Xã Phú Nghĩa",
      DistrictId: "159",
    },
    {
      id: "05398",
      name: "Xã Phú Thành",
      DistrictId: "159",
    },
    {
      id: "05404",
      name: "Xã Hưng Thi",
      DistrictId: "159",
    },
    {
      id: "05413",
      name: "Xã Khoan Dụ",
      DistrictId: "159",
    },
    {
      id: "05419",
      name: "Xã Đồng Tâm",
      DistrictId: "159",
    },
    {
      id: "05422",
      name: "Xã Yên Bồng",
      DistrictId: "159",
    },
    {
      id: "05425",
      name: "Xã Thống Nhất",
      DistrictId: "159",
    },
    {
      id: "05428",
      name: "Xã An Bình",
      DistrictId: "159",
    },
    {
      id: "05431",
      name: "Phường Quán Triều",
      DistrictId: "164",
    },
    {
      id: "05434",
      name: "Phường Quang Vinh",
      DistrictId: "164",
    },
    {
      id: "05437",
      name: "Phường Túc Duyên",
      DistrictId: "164",
    },
    {
      id: "05440",
      name: "Phường Hoàng Văn Thụ",
      DistrictId: "164",
    },
    {
      id: "05443",
      name: "Phường Trưng Vương",
      DistrictId: "164",
    },
    {
      id: "05446",
      name: "Phường Quang Trung",
      DistrictId: "164",
    },
    {
      id: "05449",
      name: "Phường Phan Đình Phùng",
      DistrictId: "164",
    },
    {
      id: "05452",
      name: "Phường Tân Thịnh",
      DistrictId: "164",
    },
    {
      id: "05455",
      name: "Phường Thịnh Đán",
      DistrictId: "164",
    },
    {
      id: "05458",
      name: "Phường Đồng Quang",
      DistrictId: "164",
    },
    {
      id: "05461",
      name: "Phường Gia Sàng",
      DistrictId: "164",
    },
    {
      id: "05464",
      name: "Phường Tân Lập",
      DistrictId: "164",
    },
    {
      id: "05467",
      name: "Phường Cam Giá",
      DistrictId: "164",
    },
    {
      id: "05470",
      name: "Phường Phú Xá",
      DistrictId: "164",
    },
    {
      id: "05473",
      name: "Phường Hương Sơn",
      DistrictId: "164",
    },
    {
      id: "05476",
      name: "Phường Trung Thành",
      DistrictId: "164",
    },
    {
      id: "05479",
      name: "Phường Tân Thành",
      DistrictId: "164",
    },
    {
      id: "05482",
      name: "Phường Tân Long",
      DistrictId: "164",
    },
    {
      id: "05485",
      name: "Xã Phúc Hà",
      DistrictId: "164",
    },
    {
      id: "05488",
      name: "Xã Phúc Xuân",
      DistrictId: "164",
    },
    {
      id: "05491",
      name: "Xã Quyết Thắng",
      DistrictId: "164",
    },
    {
      id: "05494",
      name: "Xã Phúc Trìu",
      DistrictId: "164",
    },
    {
      id: "05497",
      name: "Xã Thịnh Đức",
      DistrictId: "164",
    },
    {
      id: "05500",
      name: "Phường Tích Lương",
      DistrictId: "164",
    },
    {
      id: "05503",
      name: "Xã Tân Cương",
      DistrictId: "164",
    },
    {
      id: "05506",
      name: "Phường Lương Sơn",
      DistrictId: "165",
    },
    {
      id: "05509",
      name: "Phường Châu Sơn",
      DistrictId: "165",
    },
    {
      id: "05512",
      name: "Phường Mỏ Chè",
      DistrictId: "165",
    },
    {
      id: "05515",
      name: "Phường Cải Đan",
      DistrictId: "165",
    },
    {
      id: "05518",
      name: "Phường Thắng Lợi",
      DistrictId: "165",
    },
    {
      id: "05521",
      name: "Phường Phố Cò",
      DistrictId: "165",
    },
    {
      id: "05527",
      name: "Xã Tân Quang",
      DistrictId: "165",
    },
    {
      id: "05528",
      name: "Phường Bách Quang",
      DistrictId: "165",
    },
    {
      id: "05530",
      name: "Xã Bình Sơn",
      DistrictId: "165",
    },
    {
      id: "05533",
      name: "Xã Bá Xuyên",
      DistrictId: "165",
    },
    {
      id: "05536",
      name: "Thị trấn Chợ Chu",
      DistrictId: "167",
    },
    {
      id: "05539",
      name: "Xã Linh Thông",
      DistrictId: "167",
    },
    {
      id: "05542",
      name: "Xã Lam Vỹ",
      DistrictId: "167",
    },
    {
      id: "05545",
      name: "Xã Quy Kỳ",
      DistrictId: "167",
    },
    {
      id: "05548",
      name: "Xã Tân Thịnh",
      DistrictId: "167",
    },
    {
      id: "05551",
      name: "Xã Kim Phượng",
      DistrictId: "167",
    },
    {
      id: "05554",
      name: "Xã Bảo Linh",
      DistrictId: "167",
    },
    {
      id: "05560",
      name: "Xã Phúc Chu",
      DistrictId: "167",
    },
    {
      id: "05563",
      name: "Xã Tân Dương",
      DistrictId: "167",
    },
    {
      id: "05566",
      name: "Xã Phượng Tiến",
      DistrictId: "167",
    },
    {
      id: "05569",
      name: "Xã Bảo Cường",
      DistrictId: "167",
    },
    {
      id: "05572",
      name: "Xã Đồng Thịnh",
      DistrictId: "167",
    },
    {
      id: "05575",
      name: "Xã Định Biên",
      DistrictId: "167",
    },
    {
      id: "05578",
      name: "Xã Thanh Định",
      DistrictId: "167",
    },
    {
      id: "05581",
      name: "Xã Trung Hội",
      DistrictId: "167",
    },
    {
      id: "05584",
      name: "Xã Trung Lương",
      DistrictId: "167",
    },
    {
      id: "05587",
      name: "Xã Bình Yên",
      DistrictId: "167",
    },
    {
      id: "05590",
      name: "Xã Điềm Mặc",
      DistrictId: "167",
    },
    {
      id: "05593",
      name: "Xã Phú Tiến",
      DistrictId: "167",
    },
    {
      id: "05596",
      name: "Xã Bộc Nhiêu",
      DistrictId: "167",
    },
    {
      id: "05599",
      name: "Xã Sơn Phú",
      DistrictId: "167",
    },
    {
      id: "05602",
      name: "Xã Phú Đình",
      DistrictId: "167",
    },
    {
      id: "05605",
      name: "Xã Bình Thành",
      DistrictId: "167",
    },
    {
      id: "05608",
      name: "Thị trấn Giang Tiên",
      DistrictId: "168",
    },
    {
      id: "05611",
      name: "Thị trấn Đu",
      DistrictId: "168",
    },
    {
      id: "05614",
      name: "Xã Yên Ninh",
      DistrictId: "168",
    },
    {
      id: "05617",
      name: "Xã Yên Trạch",
      DistrictId: "168",
    },
    {
      id: "05620",
      name: "Xã Yên Đổ",
      DistrictId: "168",
    },
    {
      id: "05623",
      name: "Xã Yên Lạc",
      DistrictId: "168",
    },
    {
      id: "05626",
      name: "Xã Ôn Lương",
      DistrictId: "168",
    },
    {
      id: "05629",
      name: "Xã Động Đạt",
      DistrictId: "168",
    },
    {
      id: "05632",
      name: "Xã Phủ Lý",
      DistrictId: "168",
    },
    {
      id: "05635",
      name: "Xã Phú Đô",
      DistrictId: "168",
    },
    {
      id: "05638",
      name: "Xã Hợp Thành",
      DistrictId: "168",
    },
    {
      id: "05641",
      name: "Xã Tức Tranh",
      DistrictId: "168",
    },
    {
      id: "05644",
      name: "Xã Phấn Mễ",
      DistrictId: "168",
    },
    {
      id: "05647",
      name: "Xã Vô Tranh",
      DistrictId: "168",
    },
    {
      id: "05650",
      name: "Xã Cổ Lũng",
      DistrictId: "168",
    },
    {
      id: "05653",
      name: "Xã Sơn Cẩm",
      DistrictId: "164",
    },
    {
      id: "05656",
      name: "Thị trấn Sông Cầu",
      DistrictId: "169",
    },
    {
      id: "05659",
      name: "Phường Chùa Hang",
      DistrictId: "164",
    },
    {
      id: "05662",
      name: "Thị trấn Trại Cau",
      DistrictId: "169",
    },
    {
      id: "05665",
      name: "Xã Văn Lăng",
      DistrictId: "169",
    },
    {
      id: "05668",
      name: "Xã Tân Long",
      DistrictId: "169",
    },
    {
      id: "05671",
      name: "Xã Hòa Bình",
      DistrictId: "169",
    },
    {
      id: "05674",
      name: "Xã Quang Sơn",
      DistrictId: "169",
    },
    {
      id: "05677",
      name: "Xã Minh Lập",
      DistrictId: "169",
    },
    {
      id: "05680",
      name: "Xã Văn Hán",
      DistrictId: "169",
    },
    {
      id: "05683",
      name: "Xã Hóa Trung",
      DistrictId: "169",
    },
    {
      id: "05686",
      name: "Xã Khe Mo",
      DistrictId: "169",
    },
    {
      id: "05689",
      name: "Xã Cây Thị",
      DistrictId: "169",
    },
    {
      id: "05692",
      name: "Xã Hóa Thượng",
      DistrictId: "169",
    },
    {
      id: "05695",
      name: "Xã Cao Ngạn",
      DistrictId: "164",
    },
    {
      id: "05698",
      name: "Xã Hợp Tiến",
      DistrictId: "169",
    },
    {
      id: "05701",
      name: "Xã Linh Sơn",
      DistrictId: "164",
    },
    {
      id: "05704",
      name: "Xã Tân Lợi",
      DistrictId: "169",
    },
    {
      id: "05707",
      name: "Xã Nam Hòa",
      DistrictId: "169",
    },
    {
      id: "05710",
      name: "Phường Đồng Bẩm",
      DistrictId: "164",
    },
    {
      id: "05713",
      name: "Xã Huống Thượng",
      DistrictId: "164",
    },
    {
      id: "05716",
      name: "Thị trấn Đình Cả",
      DistrictId: "170",
    },
    {
      id: "05719",
      name: "Xã Sảng Mộc",
      DistrictId: "170",
    },
    {
      id: "05722",
      name: "Xã Nghinh Tường",
      DistrictId: "170",
    },
    {
      id: "05725",
      name: "Xã Thần Xa",
      DistrictId: "170",
    },
    {
      id: "05728",
      name: "Xã Vũ Chấn",
      DistrictId: "170",
    },
    {
      id: "05731",
      name: "Xã Thượng Nung",
      DistrictId: "170",
    },
    {
      id: "05734",
      name: "Xã Phú Thượng",
      DistrictId: "170",
    },
    {
      id: "05737",
      name: "Xã Cúc Đường",
      DistrictId: "170",
    },
    {
      id: "05740",
      name: "Xã La Hiên",
      DistrictId: "170",
    },
    {
      id: "05743",
      name: "Xã Lâu Thượng",
      DistrictId: "170",
    },
    {
      id: "05746",
      name: "Xã Tràng Xá",
      DistrictId: "170",
    },
    {
      id: "05749",
      name: "Xã Phương Giao",
      DistrictId: "170",
    },
    {
      id: "05752",
      name: "Xã Liên Minh",
      DistrictId: "170",
    },
    {
      id: "05755",
      name: "Xã Dân Tiến",
      DistrictId: "170",
    },
    {
      id: "05758",
      name: "Xã Bình Long",
      DistrictId: "170",
    },
    {
      id: "05761",
      name: "Thị trấn Hùng Sơn",
      DistrictId: "171",
    },
    {
      id: "05764",
      name: "Thị trấn Quân Chu",
      DistrictId: "171",
    },
    {
      id: "05767",
      name: "Xã Phúc Lương",
      DistrictId: "171",
    },
    {
      id: "05770",
      name: "Xã Minh Tiến",
      DistrictId: "171",
    },
    {
      id: "05773",
      name: "Xã Yên Lãng",
      DistrictId: "171",
    },
    {
      id: "05776",
      name: "Xã Đức Lương",
      DistrictId: "171",
    },
    {
      id: "05779",
      name: "Xã Phú Cường",
      DistrictId: "171",
    },
    {
      id: "05782",
      name: "Xã Na Mao",
      DistrictId: "171",
    },
    {
      id: "05785",
      name: "Xã Phú Lạc",
      DistrictId: "171",
    },
    {
      id: "05788",
      name: "Xã Tân Linh",
      DistrictId: "171",
    },
    {
      id: "05791",
      name: "Xã Phú Thịnh",
      DistrictId: "171",
    },
    {
      id: "05794",
      name: "Xã Phục Linh",
      DistrictId: "171",
    },
    {
      id: "05797",
      name: "Xã Phú Xuyên",
      DistrictId: "171",
    },
    {
      id: "05800",
      name: "Xã Bản Ngoại",
      DistrictId: "171",
    },
    {
      id: "05803",
      name: "Xã Tiên Hội",
      DistrictId: "171",
    },
    {
      id: "05809",
      name: "Xã Cù Vân",
      DistrictId: "171",
    },
    {
      id: "05812",
      name: "Xã Hà Thượng",
      DistrictId: "171",
    },
    {
      id: "05815",
      name: "Xã La Bằng",
      DistrictId: "171",
    },
    {
      id: "05818",
      name: "Xã Hoàng Nông",
      DistrictId: "171",
    },
    {
      id: "05821",
      name: "Xã Khôi Kỳ",
      DistrictId: "171",
    },
    {
      id: "05824",
      name: "Xã An Khánh",
      DistrictId: "171",
    },
    {
      id: "05827",
      name: "Xã Tân Thái",
      DistrictId: "171",
    },
    {
      id: "05830",
      name: "Xã Bình Thuận",
      DistrictId: "171",
    },
    {
      id: "05833",
      name: "Xã Lục Ba",
      DistrictId: "171",
    },
    {
      id: "05836",
      name: "Xã Mỹ Yên",
      DistrictId: "171",
    },
    {
      id: "05839",
      name: "Xã Vạn Thọ",
      DistrictId: "171",
    },
    {
      id: "05842",
      name: "Xã Văn Yên",
      DistrictId: "171",
    },
    {
      id: "05845",
      name: "Xã Ký Phú",
      DistrictId: "171",
    },
    {
      id: "05848",
      name: "Xã Cát Nê",
      DistrictId: "171",
    },
    {
      id: "05851",
      name: "Xã Quân Chu",
      DistrictId: "171",
    },
    {
      id: "05854",
      name: "Phường Bãi Bông",
      DistrictId: "172",
    },
    {
      id: "05857",
      name: "Phường Bắc Sơn",
      DistrictId: "172",
    },
    {
      id: "05860",
      name: "Phường Ba Hàng",
      DistrictId: "172",
    },
    {
      id: "05863",
      name: "Xã Phúc Tân",
      DistrictId: "172",
    },
    {
      id: "05866",
      name: "Xã Phúc Thuận",
      DistrictId: "172",
    },
    {
      id: "05869",
      name: "Phường Hồng Tiến",
      DistrictId: "172",
    },
    {
      id: "05872",
      name: "Xã Minh Đức",
      DistrictId: "172",
    },
    {
      id: "05875",
      name: "Phường Đắc Sơn",
      DistrictId: "172",
    },
    {
      id: "05878",
      name: "Phường Đồng Tiến",
      DistrictId: "172",
    },
    {
      id: "05881",
      name: "Xã Thành Công",
      DistrictId: "172",
    },
    {
      id: "05884",
      name: "Phường Tiên Phong",
      DistrictId: "172",
    },
    {
      id: "05887",
      name: "Xã Vạn Phái",
      DistrictId: "172",
    },
    {
      id: "05890",
      name: "Phường Nam Tiến",
      DistrictId: "172",
    },
    {
      id: "05893",
      name: "Phường Tân Hương",
      DistrictId: "172",
    },
    {
      id: "05896",
      name: "Phường Đông Cao",
      DistrictId: "172",
    },
    {
      id: "05899",
      name: "Phường Trung Thành",
      DistrictId: "172",
    },
    {
      id: "05902",
      name: "Phường Tân Phú",
      DistrictId: "172",
    },
    {
      id: "05905",
      name: "Phường Thuận Thành",
      DistrictId: "172",
    },
    {
      id: "05908",
      name: "Thị trấn Hương Sơn",
      DistrictId: "173",
    },
    {
      id: "05911",
      name: "Xã Bàn Đạt",
      DistrictId: "173",
    },
    {
      id: "05914",
      name: "Xã Đồng Liên",
      DistrictId: "164",
    },
    {
      id: "05917",
      name: "Xã Tân Khánh",
      DistrictId: "173",
    },
    {
      id: "05920",
      name: "Xã Tân Kim",
      DistrictId: "173",
    },
    {
      id: "05923",
      name: "Xã Tân Thành",
      DistrictId: "173",
    },
    {
      id: "05926",
      name: "Xã Đào Xá",
      DistrictId: "173",
    },
    {
      id: "05929",
      name: "Xã Bảo Lý",
      DistrictId: "173",
    },
    {
      id: "05932",
      name: "Xã Thượng Đình",
      DistrictId: "173",
    },
    {
      id: "05935",
      name: "Xã Tân Hòa",
      DistrictId: "173",
    },
    {
      id: "05938",
      name: "Xã Nhã Lộng",
      DistrictId: "173",
    },
    {
      id: "05941",
      name: "Xã Điềm Thụy",
      DistrictId: "173",
    },
    {
      id: "05944",
      name: "Xã Xuân Phương",
      DistrictId: "173",
    },
    {
      id: "05947",
      name: "Xã Tân Đức",
      DistrictId: "173",
    },
    {
      id: "05950",
      name: "Xã Úc Kỳ",
      DistrictId: "173",
    },
    {
      id: "05953",
      name: "Xã Lương Phú",
      DistrictId: "173",
    },
    {
      id: "05956",
      name: "Xã Nga My",
      DistrictId: "173",
    },
    {
      id: "05959",
      name: "Xã Kha Sơn",
      DistrictId: "173",
    },
    {
      id: "05962",
      name: "Xã Thanh Ninh",
      DistrictId: "173",
    },
    {
      id: "05965",
      name: "Xã Dương Thành",
      DistrictId: "173",
    },
    {
      id: "05968",
      name: "Xã Hà Châu",
      DistrictId: "173",
    },
    {
      id: "05971",
      name: "Phường Hoàng Văn Thụ",
      DistrictId: "178",
    },
    {
      id: "05974",
      name: "Phường Tam Thanh",
      DistrictId: "178",
    },
    {
      id: "05977",
      name: "Phường Vĩnh Trại",
      DistrictId: "178",
    },
    {
      id: "05980",
      name: "Phường Đông Kinh",
      DistrictId: "178",
    },
    {
      id: "05983",
      name: "Phường Chi Lăng",
      DistrictId: "178",
    },
    {
      id: "05986",
      name: "Xã Hoàng Đồng",
      DistrictId: "178",
    },
    {
      id: "05989",
      name: "Xã Quảng Lạc",
      DistrictId: "178",
    },
    {
      id: "05992",
      name: "Xã Mai Pha",
      DistrictId: "178",
    },
    {
      id: "05995",
      name: "Thị trấn Thất Khê",
      DistrictId: "180",
    },
    {
      id: "05998",
      name: "Xã Khánh Long",
      DistrictId: "180",
    },
    {
      id: "06001",
      name: "Xã Đoàn Kết",
      DistrictId: "180",
    },
    {
      id: "06004",
      name: "Xã Quốc Khánh",
      DistrictId: "180",
    },
    {
      id: "06007",
      name: "Xã Vĩnh Tiến",
      DistrictId: "180",
    },
    {
      id: "06010",
      name: "Xã Cao Minh",
      DistrictId: "180",
    },
    {
      id: "06013",
      name: "Xã Chí Minh",
      DistrictId: "180",
    },
    {
      id: "06016",
      name: "Xã Tri Phương",
      DistrictId: "180",
    },
    {
      id: "06019",
      name: "Xã Tân Tiến",
      DistrictId: "180",
    },
    {
      id: "06022",
      name: "Xã Tân Yên",
      DistrictId: "180",
    },
    {
      id: "06025",
      name: "Xã Đội Cấn",
      DistrictId: "180",
    },
    {
      id: "06028",
      name: "Xã Tân Minh",
      DistrictId: "180",
    },
    {
      id: "06031",
      name: "Xã Kim Đồng",
      DistrictId: "180",
    },
    {
      id: "06034",
      name: "Xã Chi Lăng",
      DistrictId: "180",
    },
    {
      id: "06037",
      name: "Xã Trung Thành",
      DistrictId: "180",
    },
    {
      id: "06040",
      name: "Xã Đại Đồng",
      DistrictId: "180",
    },
    {
      id: "06043",
      name: "Xã Đào Viên",
      DistrictId: "180",
    },
    {
      id: "06046",
      name: "Xã Đề Thám",
      DistrictId: "180",
    },
    {
      id: "06049",
      name: "Xã Kháng Chiến",
      DistrictId: "180",
    },
    {
      id: "06055",
      name: "Xã Hùng Sơn",
      DistrictId: "180",
    },
    {
      id: "06058",
      name: "Xã Quốc Việt",
      DistrictId: "180",
    },
    {
      id: "06061",
      name: "Xã Hùng Việt",
      DistrictId: "180",
    },
    {
      id: "06067",
      name: "Xã Hưng Đạo",
      DistrictId: "181",
    },
    {
      id: "06070",
      name: "Xã Vĩnh Yên",
      DistrictId: "181",
    },
    {
      id: "06073",
      name: "Xã Hoa Thám",
      DistrictId: "181",
    },
    {
      id: "06076",
      name: "Xã Quý Hòa",
      DistrictId: "181",
    },
    {
      id: "06079",
      name: "Xã Hồng Phong",
      DistrictId: "181",
    },
    {
      id: "06082",
      name: "Xã Yên Lỗ",
      DistrictId: "181",
    },
    {
      id: "06085",
      name: "Xã Thiện Hòa",
      DistrictId: "181",
    },
    {
      id: "06088",
      name: "Xã Quang Trung",
      DistrictId: "181",
    },
    {
      id: "06091",
      name: "Xã Thiện Thuật",
      DistrictId: "181",
    },
    {
      id: "06094",
      name: "Xã Minh Khai",
      DistrictId: "181",
    },
    {
      id: "06097",
      name: "Xã Thiện Long",
      DistrictId: "181",
    },
    {
      id: "06100",
      name: "Xã Hoàng Văn Thụ",
      DistrictId: "181",
    },
    {
      id: "06103",
      name: "Xã Hòa Bình",
      DistrictId: "181",
    },
    {
      id: "06106",
      name: "Xã Mông Ân",
      DistrictId: "181",
    },
    {
      id: "06109",
      name: "Xã Tân Hòa",
      DistrictId: "181",
    },
    {
      id: "06112",
      name: "Thị trấn Bình Gia",
      DistrictId: "181",
    },
    {
      id: "06115",
      name: "Xã Hồng Thái",
      DistrictId: "181",
    },
    {
      id: "06118",
      name: "Xã Bình La",
      DistrictId: "181",
    },
    {
      id: "06121",
      name: "Xã Tân Văn",
      DistrictId: "181",
    },
    {
      id: "06124",
      name: "Thị trấn Na Sầm",
      DistrictId: "182",
    },
    {
      id: "06127",
      name: "Xã Trùng Khánh",
      DistrictId: "182",
    },
    {
      id: "06133",
      name: "Xã Bắc La",
      DistrictId: "182",
    },
    {
      id: "06136",
      name: "Xã Thụy Hùng",
      DistrictId: "182",
    },
    {
      id: "06139",
      name: "Xã Bắc Hùng",
      DistrictId: "182",
    },
    {
      id: "06142",
      name: "Xã Tân Tác",
      DistrictId: "182",
    },
    {
      id: "06148",
      name: "Xã Thanh Long",
      DistrictId: "182",
    },
    {
      id: "06151",
      name: "Xã Hội Hoan",
      DistrictId: "182",
    },
    {
      id: "06154",
      name: "Xã Bắc Việt",
      DistrictId: "182",
    },
    {
      id: "06157",
      name: "Xã Hoàng Việt",
      DistrictId: "182",
    },
    {
      id: "06160",
      name: "Xã Gia Miễn",
      DistrictId: "182",
    },
    {
      id: "06163",
      name: "Xã Thành Hòa",
      DistrictId: "182",
    },
    {
      id: "06166",
      name: "Xã Tân Thanh",
      DistrictId: "182",
    },
    {
      id: "06172",
      name: "Xã Tân Mỹ",
      DistrictId: "182",
    },
    {
      id: "06175",
      name: "Xã Hồng Thái",
      DistrictId: "182",
    },
    {
      id: "06178",
      name: "Xã  Hoàng Văn Thụ",
      DistrictId: "182",
    },
    {
      id: "06181",
      name: "Xã Nhạc Kỳ",
      DistrictId: "182",
    },
    {
      id: "06184",
      name: "Thị trấn Đồng Đăng",
      DistrictId: "183",
    },
    {
      id: "06187",
      name: "Thị trấn Cao Lộc",
      DistrictId: "183",
    },
    {
      id: "06190",
      name: "Xã Bảo Lâm",
      DistrictId: "183",
    },
    {
      id: "06193",
      name: "Xã Thanh Lòa",
      DistrictId: "183",
    },
    {
      id: "06196",
      name: "Xã Cao Lâu",
      DistrictId: "183",
    },
    {
      id: "06199",
      name: "Xã Thạch Đạn",
      DistrictId: "183",
    },
    {
      id: "06202",
      name: "Xã Xuất Lễ",
      DistrictId: "183",
    },
    {
      id: "06205",
      name: "Xã Hồng Phong",
      DistrictId: "183",
    },
    {
      id: "06208",
      name: "Xã Thụy Hùng",
      DistrictId: "183",
    },
    {
      id: "06211",
      name: "Xã Lộc Yên",
      DistrictId: "183",
    },
    {
      id: "06214",
      name: "Xã Phú Xá",
      DistrictId: "183",
    },
    {
      id: "06217",
      name: "Xã Bình Trung",
      DistrictId: "183",
    },
    {
      id: "06220",
      name: "Xã Hải Yến",
      DistrictId: "183",
    },
    {
      id: "06223",
      name: "Xã Hòa Cư",
      DistrictId: "183",
    },
    {
      id: "06226",
      name: "Xã Hợp Thành",
      DistrictId: "183",
    },
    {
      id: "06232",
      name: "Xã Công Sơn",
      DistrictId: "183",
    },
    {
      id: "06235",
      name: "Xã Gia Cát",
      DistrictId: "183",
    },
    {
      id: "06238",
      name: "Xã Mẫu Sơn",
      DistrictId: "183",
    },
    {
      id: "06241",
      name: "Xã Xuân Long",
      DistrictId: "183",
    },
    {
      id: "06244",
      name: "Xã Tân Liên",
      DistrictId: "183",
    },
    {
      id: "06247",
      name: "Xã Yên Trạch",
      DistrictId: "183",
    },
    {
      id: "06250",
      name: "Xã Tân Thành",
      DistrictId: "183",
    },
    {
      id: "06253",
      name: "Thị trấn Văn Quan",
      DistrictId: "184",
    },
    {
      id: "06256",
      name: "Xã Trấn Ninh",
      DistrictId: "184",
    },
    {
      id: "06268",
      name: "Xã Liên Hội",
      DistrictId: "184",
    },
    {
      id: "06274",
      name: "Xã Hòa Bình",
      DistrictId: "184",
    },
    {
      id: "06277",
      name: "Xã Tú Xuyên",
      DistrictId: "184",
    },
    {
      id: "06280",
      name: "Xã Điềm He",
      DistrictId: "184",
    },
    {
      id: "06283",
      name: "Xã An Sơn",
      DistrictId: "184",
    },
    {
      id: "06286",
      name: "Xã Khánh Khê",
      DistrictId: "184",
    },
    {
      id: "06292",
      name: "Xã Lương Năng",
      DistrictId: "184",
    },
    {
      id: "06295",
      name: "Xã Đồng Giáp",
      DistrictId: "184",
    },
    {
      id: "06298",
      name: "Xã Bình Phúc",
      DistrictId: "184",
    },
    {
      id: "06301",
      name: "Xã Tràng Các",
      DistrictId: "184",
    },
    {
      id: "06307",
      name: "Xã Tân Đoàn",
      DistrictId: "184",
    },
    {
      id: "06313",
      name: "Xã Tri Lễ",
      DistrictId: "184",
    },
    {
      id: "06316",
      name: "Xã Tràng Phái",
      DistrictId: "184",
    },
    {
      id: "06319",
      name: "Xã Yên Phúc",
      DistrictId: "184",
    },
    {
      id: "06322",
      name: "Xã Hữu Lễ",
      DistrictId: "184",
    },
    {
      id: "06325",
      name: "Thị trấn Bắc Sơn",
      DistrictId: "185",
    },
    {
      id: "06328",
      name: "Xã Long Đống",
      DistrictId: "185",
    },
    {
      id: "06331",
      name: "Xã Vạn Thủy",
      DistrictId: "185",
    },
    {
      id: "06337",
      name: "Xã Đồng ý",
      DistrictId: "185",
    },
    {
      id: "06340",
      name: "Xã Tân Tri",
      DistrictId: "185",
    },
    {
      id: "06343",
      name: "Xã Bắc Quỳnh",
      DistrictId: "185",
    },
    {
      id: "06349",
      name: "Xã Hưng Vũ",
      DistrictId: "185",
    },
    {
      id: "06352",
      name: "Xã Tân Lập",
      DistrictId: "185",
    },
    {
      id: "06355",
      name: "Xã Vũ Sơn",
      DistrictId: "185",
    },
    {
      id: "06358",
      name: "Xã Chiêu Vũ",
      DistrictId: "185",
    },
    {
      id: "06361",
      name: "Xã Tân Hương",
      DistrictId: "185",
    },
    {
      id: "06364",
      name: "Xã Chiến Thắng",
      DistrictId: "185",
    },
    {
      id: "06367",
      name: "Xã Vũ Lăng",
      DistrictId: "185",
    },
    {
      id: "06370",
      name: "Xã Trấn Yên",
      DistrictId: "185",
    },
    {
      id: "06373",
      name: "Xã Vũ Lễ",
      DistrictId: "185",
    },
    {
      id: "06376",
      name: "Xã Nhất Hòa",
      DistrictId: "185",
    },
    {
      id: "06379",
      name: "Xã Tân Thành",
      DistrictId: "185",
    },
    {
      id: "06382",
      name: "Xã Nhất Tiến",
      DistrictId: "185",
    },
    {
      id: "06385",
      name: "Thị trấn Hữu Lũng",
      DistrictId: "186",
    },
    {
      id: "06388",
      name: "Xã Hữu Liên",
      DistrictId: "186",
    },
    {
      id: "06391",
      name: "Xã Yên Bình",
      DistrictId: "186",
    },
    {
      id: "06394",
      name: "Xã Quyết Thắng",
      DistrictId: "186",
    },
    {
      id: "06397",
      name: "Xã Hòa Bình",
      DistrictId: "186",
    },
    {
      id: "06400",
      name: "Xã Yên Thịnh",
      DistrictId: "186",
    },
    {
      id: "06403",
      name: "Xã Yên Sơn",
      DistrictId: "186",
    },
    {
      id: "06406",
      name: "Xã Thiện Tân",
      DistrictId: "186",
    },
    {
      id: "06412",
      name: "Xã Yên Vượng",
      DistrictId: "186",
    },
    {
      id: "06415",
      name: "Xã Minh Tiến",
      DistrictId: "186",
    },
    {
      id: "06418",
      name: "Xã Nhật Tiến",
      DistrictId: "186",
    },
    {
      id: "06421",
      name: "Xã Thanh Sơn",
      DistrictId: "186",
    },
    {
      id: "06424",
      name: "Xã Đồng Tân",
      DistrictId: "186",
    },
    {
      id: "06427",
      name: "Xã Cai Kinh",
      DistrictId: "186",
    },
    {
      id: "06430",
      name: "Xã Hòa Lạc",
      DistrictId: "186",
    },
    {
      id: "06433",
      name: "Xã Vân Nham",
      DistrictId: "186",
    },
    {
      id: "06436",
      name: "Xã Đồng Tiến",
      DistrictId: "186",
    },
    {
      id: "06442",
      name: "Xã Tân Thành",
      DistrictId: "186",
    },
    {
      id: "06445",
      name: "Xã Hòa Sơn",
      DistrictId: "186",
    },
    {
      id: "06448",
      name: "Xã Minh Sơn",
      DistrictId: "186",
    },
    {
      id: "06451",
      name: "Xã Hồ Sơn",
      DistrictId: "186",
    },
    {
      id: "06454",
      name: "Xã Sơn Hà",
      DistrictId: "186",
    },
    {
      id: "06457",
      name: "Xã Minh Hòa",
      DistrictId: "186",
    },
    {
      id: "06460",
      name: "Xã Hòa Thắng",
      DistrictId: "186",
    },
    {
      id: "06463",
      name: "Thị trấn Đồng Mỏ",
      DistrictId: "187",
    },
    {
      id: "06466",
      name: "Thị trấn Chi Lăng",
      DistrictId: "187",
    },
    {
      id: "06469",
      name: "Xã Vân An",
      DistrictId: "187",
    },
    {
      id: "06472",
      name: "Xã Vân Thủy",
      DistrictId: "187",
    },
    {
      id: "06475",
      name: "Xã Gia Lộc",
      DistrictId: "187",
    },
    {
      id: "06478",
      name: "Xã Bắc Thủy",
      DistrictId: "187",
    },
    {
      id: "06481",
      name: "Xã Chiến Thắng",
      DistrictId: "187",
    },
    {
      id: "06484",
      name: "Xã Mai Sao",
      DistrictId: "187",
    },
    {
      id: "06487",
      name: "Xã Bằng Hữu",
      DistrictId: "187",
    },
    {
      id: "06490",
      name: "Xã Thượng Cường",
      DistrictId: "187",
    },
    {
      id: "06493",
      name: "Xã Bằng Mạc",
      DistrictId: "187",
    },
    {
      id: "06496",
      name: "Xã Nhân Lý",
      DistrictId: "187",
    },
    {
      id: "06499",
      name: "Xã Lâm Sơn",
      DistrictId: "187",
    },
    {
      id: "06502",
      name: "Xã Liên Sơn",
      DistrictId: "187",
    },
    {
      id: "06505",
      name: "Xã Vạn Linh",
      DistrictId: "187",
    },
    {
      id: "06508",
      name: "Xã Hòa Bình",
      DistrictId: "187",
    },
    {
      id: "06514",
      name: "Xã Hữu Kiên",
      DistrictId: "187",
    },
    {
      id: "06517",
      name: "Xã Quan Sơn",
      DistrictId: "187",
    },
    {
      id: "06520",
      name: "Xã Y Tịch",
      DistrictId: "187",
    },
    {
      id: "06523",
      name: "Xã Chi Lăng",
      DistrictId: "187",
    },
    {
      id: "06526",
      name: "Thị trấn Na Dương",
      DistrictId: "188",
    },
    {
      id: "06529",
      name: "Thị trấn Lộc Bình",
      DistrictId: "188",
    },
    {
      id: "06532",
      name: "Xã Mẫu Sơn",
      DistrictId: "188",
    },
    {
      id: "06541",
      name: "Xã Yên Khoái",
      DistrictId: "188",
    },
    {
      id: "06544",
      name: "Xã Khánh Xuân",
      DistrictId: "188",
    },
    {
      id: "06547",
      name: "Xã Tú Mịch",
      DistrictId: "188",
    },
    {
      id: "06550",
      name: "Xã Hữu Khánh",
      DistrictId: "188",
    },
    {
      id: "06553",
      name: "Xã Đồng Bục",
      DistrictId: "188",
    },
    {
      id: "06559",
      name: "Xã Tam Gia",
      DistrictId: "188",
    },
    {
      id: "06562",
      name: "Xã Tú Đoạn",
      DistrictId: "188",
    },
    {
      id: "06565",
      name: "Xã Khuất Xá",
      DistrictId: "188",
    },
    {
      id: "06574",
      name: "Xã Tĩnh Bắc",
      DistrictId: "188",
    },
    {
      id: "06577",
      name: "Xã Thống Nhất",
      DistrictId: "188",
    },
    {
      id: "06589",
      name: "Xã Sàn Viên",
      DistrictId: "188",
    },
    {
      id: "06592",
      name: "Xã Đông Quan",
      DistrictId: "188",
    },
    {
      id: "06595",
      name: "Xã Minh Hiệp",
      DistrictId: "188",
    },
    {
      id: "06598",
      name: "Xã Hữu Lân",
      DistrictId: "188",
    },
    {
      id: "06601",
      name: "Xã Lợi Bác",
      DistrictId: "188",
    },
    {
      id: "06604",
      name: "Xã Nam Quan",
      DistrictId: "188",
    },
    {
      id: "06607",
      name: "Xã Xuân Dương",
      DistrictId: "188",
    },
    {
      id: "06610",
      name: "Xã Ái Quốc",
      DistrictId: "188",
    },
    {
      id: "06613",
      name: "Thị trấn Đình Lập",
      DistrictId: "189",
    },
    {
      id: "06616",
      name: "Thị trấn NT Thái Bình",
      DistrictId: "189",
    },
    {
      id: "06619",
      name: "Xã Bắc Xa",
      DistrictId: "189",
    },
    {
      id: "06622",
      name: "Xã Bính Xá",
      DistrictId: "189",
    },
    {
      id: "06625",
      name: "Xã Kiên Mộc",
      DistrictId: "189",
    },
    {
      id: "06628",
      name: "Xã Đình Lập",
      DistrictId: "189",
    },
    {
      id: "06631",
      name: "Xã Thái Bình",
      DistrictId: "189",
    },
    {
      id: "06634",
      name: "Xã Cường Lợi",
      DistrictId: "189",
    },
    {
      id: "06637",
      name: "Xã Châu Sơn",
      DistrictId: "189",
    },
    {
      id: "06640",
      name: "Xã Lâm Ca",
      DistrictId: "189",
    },
    {
      id: "06643",
      name: "Xã Đồng Thắng",
      DistrictId: "189",
    },
    {
      id: "06646",
      name: "Xã Bắc Lãng",
      DistrictId: "189",
    },
    {
      id: "06649",
      name: "Phường Hà Khánh",
      DistrictId: "193",
    },
    {
      id: "06652",
      name: "Phường Hà Phong",
      DistrictId: "193",
    },
    {
      id: "06655",
      name: "Phường Hà Khẩu",
      DistrictId: "193",
    },
    {
      id: "06658",
      name: "Phường Cao Xanh",
      DistrictId: "193",
    },
    {
      id: "06661",
      name: "Phường Giếng Đáy",
      DistrictId: "193",
    },
    {
      id: "06664",
      name: "Phường Hà Tu",
      DistrictId: "193",
    },
    {
      id: "06667",
      name: "Phường Hà Trung",
      DistrictId: "193",
    },
    {
      id: "06670",
      name: "Phường Hà Lầm",
      DistrictId: "193",
    },
    {
      id: "06673",
      name: "Phường Bãi Cháy",
      DistrictId: "193",
    },
    {
      id: "06676",
      name: "Phường Cao Thắng",
      DistrictId: "193",
    },
    {
      id: "06679",
      name: "Phường Hùng Thắng",
      DistrictId: "193",
    },
    {
      id: "06682",
      name: "Phường Yết Kiêu",
      DistrictId: "193",
    },
    {
      id: "06685",
      name: "Phường Trần Hưng Đạo",
      DistrictId: "193",
    },
    {
      id: "06688",
      name: "Phường Hồng Hải",
      DistrictId: "193",
    },
    {
      id: "06691",
      name: "Phường Hồng Gai",
      DistrictId: "193",
    },
    {
      id: "06694",
      name: "Phường Bạch Đằng",
      DistrictId: "193",
    },
    {
      id: "06697",
      name: "Phường Hồng Hà",
      DistrictId: "193",
    },
    {
      id: "06700",
      name: "Phường Tuần Châu",
      DistrictId: "193",
    },
    {
      id: "06703",
      name: "Phường Việt Hưng",
      DistrictId: "193",
    },
    {
      id: "06706",
      name: "Phường Đại Yên",
      DistrictId: "193",
    },
    {
      id: "06709",
      name: "Phường Ka Long",
      DistrictId: "194",
    },
    {
      id: "06712",
      name: "Phường Trần Phú",
      DistrictId: "194",
    },
    {
      id: "06715",
      name: "Phường Ninh Dương",
      DistrictId: "194",
    },
    {
      id: "06718",
      name: "Phường Hoà Lạc",
      DistrictId: "194",
    },
    {
      id: "06721",
      name: "Phường Trà Cổ",
      DistrictId: "194",
    },
    {
      id: "06724",
      name: "Xã Hải Sơn",
      DistrictId: "194",
    },
    {
      id: "06727",
      name: "Xã Bắc Sơn",
      DistrictId: "194",
    },
    {
      id: "06730",
      name: "Xã Hải Đông",
      DistrictId: "194",
    },
    {
      id: "06733",
      name: "Xã Hải Tiến",
      DistrictId: "194",
    },
    {
      id: "06736",
      name: "Phường Hải Yên",
      DistrictId: "194",
    },
    {
      id: "06739",
      name: "Xã Quảng Nghĩa",
      DistrictId: "194",
    },
    {
      id: "06742",
      name: "Phường Hải Hoà",
      DistrictId: "194",
    },
    {
      id: "06745",
      name: "Xã Hải Xuân",
      DistrictId: "194",
    },
    {
      id: "06748",
      name: "Xã Vạn Ninh",
      DistrictId: "194",
    },
    {
      id: "06751",
      name: "Phường Bình Ngọc",
      DistrictId: "194",
    },
    {
      id: "06754",
      name: "Xã Vĩnh Trung",
      DistrictId: "194",
    },
    {
      id: "06757",
      name: "Xã Vĩnh Thực",
      DistrictId: "194",
    },
    {
      id: "06760",
      name: "Phường Mông Dương",
      DistrictId: "195",
    },
    {
      id: "06763",
      name: "Phường Cửa Ông",
      DistrictId: "195",
    },
    {
      id: "06766",
      name: "Phường Cẩm Sơn",
      DistrictId: "195",
    },
    {
      id: "06769",
      name: "Phường Cẩm Đông",
      DistrictId: "195",
    },
    {
      id: "06772",
      name: "Phường Cẩm Phú",
      DistrictId: "195",
    },
    {
      id: "06775",
      name: "Phường Cẩm Tây",
      DistrictId: "195",
    },
    {
      id: "06778",
      name: "Phường Quang Hanh",
      DistrictId: "195",
    },
    {
      id: "06781",
      name: "Phường Cẩm Thịnh",
      DistrictId: "195",
    },
    {
      id: "06784",
      name: "Phường Cẩm Thủy",
      DistrictId: "195",
    },
    {
      id: "06787",
      name: "Phường Cẩm Thạch",
      DistrictId: "195",
    },
    {
      id: "06790",
      name: "Phường Cẩm Thành",
      DistrictId: "195",
    },
    {
      id: "06793",
      name: "Phường Cẩm Trung",
      DistrictId: "195",
    },
    {
      id: "06796",
      name: "Phường Cẩm Bình",
      DistrictId: "195",
    },
    {
      id: "06799",
      name: "Xã Cộng Hòa",
      DistrictId: "195",
    },
    {
      id: "06802",
      name: "Xã Cẩm Hải",
      DistrictId: "195",
    },
    {
      id: "06805",
      name: "Xã Dương Huy",
      DistrictId: "195",
    },
    {
      id: "06808",
      name: "Phường Vàng Danh",
      DistrictId: "196",
    },
    {
      id: "06811",
      name: "Phường Thanh Sơn",
      DistrictId: "196",
    },
    {
      id: "06814",
      name: "Phường Bắc Sơn",
      DistrictId: "196",
    },
    {
      id: "06817",
      name: "Phường Quang Trung",
      DistrictId: "196",
    },
    {
      id: "06820",
      name: "Phường Trưng Vương",
      DistrictId: "196",
    },
    {
      id: "06823",
      name: "Phường Nam Khê",
      DistrictId: "196",
    },
    {
      id: "06826",
      name: "Phường Yên Thanh",
      DistrictId: "196",
    },
    {
      id: "06829",
      name: "Xã Thượng Yên Công",
      DistrictId: "196",
    },
    {
      id: "06832",
      name: "Phường Phương Đông",
      DistrictId: "196",
    },
    {
      id: "06835",
      name: "Phường Phương Nam",
      DistrictId: "196",
    },
    {
      id: "06838",
      name: "Thị trấn Bình Liêu",
      DistrictId: "198",
    },
    {
      id: "06841",
      name: "Xã Hoành Mô",
      DistrictId: "198",
    },
    {
      id: "06844",
      name: "Xã Đồng Tâm",
      DistrictId: "198",
    },
    {
      id: "06847",
      name: "Xã Đồng Văn",
      DistrictId: "198",
    },
    {
      id: "06853",
      name: "Xã Vô Ngại",
      DistrictId: "198",
    },
    {
      id: "06856",
      name: "Xã Lục Hồn",
      DistrictId: "198",
    },
    {
      id: "06859",
      name: "Xã Húc Động",
      DistrictId: "198",
    },
    {
      id: "06862",
      name: "Thị trấn Tiên Yên",
      DistrictId: "199",
    },
    {
      id: "06865",
      name: "Xã Hà Lâu",
      DistrictId: "199",
    },
    {
      id: "06868",
      name: "Xã Đại Dực",
      DistrictId: "199",
    },
    {
      id: "06871",
      name: "Xã Phong Dụ",
      DistrictId: "199",
    },
    {
      id: "06874",
      name: "Xã Điền Xá",
      DistrictId: "199",
    },
    {
      id: "06877",
      name: "Xã Đông Ngũ",
      DistrictId: "199",
    },
    {
      id: "06880",
      name: "Xã Yên Than",
      DistrictId: "199",
    },
    {
      id: "06883",
      name: "Xã Đông Hải",
      DistrictId: "199",
    },
    {
      id: "06886",
      name: "Xã Hải Lạng",
      DistrictId: "199",
    },
    {
      id: "06889",
      name: "Xã Tiên Lãng",
      DistrictId: "199",
    },
    {
      id: "06892",
      name: "Xã Đồng Rui",
      DistrictId: "199",
    },
    {
      id: "06895",
      name: "Thị trấn Đầm Hà",
      DistrictId: "200",
    },
    {
      id: "06898",
      name: "Xã Quảng Lâm",
      DistrictId: "200",
    },
    {
      id: "06901",
      name: "Xã Quảng An",
      DistrictId: "200",
    },
    {
      id: "06904",
      name: "Xã Tân Bình",
      DistrictId: "200",
    },
    {
      id: "06910",
      name: "Xã Dực Yên",
      DistrictId: "200",
    },
    {
      id: "06913",
      name: "Xã Quảng Tân",
      DistrictId: "200",
    },
    {
      id: "06916",
      name: "Xã Đầm Hà",
      DistrictId: "200",
    },
    {
      id: "06917",
      name: "Xã Tân Lập",
      DistrictId: "200",
    },
    {
      id: "06919",
      name: "Xã Đại Bình",
      DistrictId: "200",
    },
    {
      id: "06922",
      name: "Thị trấn Quảng Hà",
      DistrictId: "201",
    },
    {
      id: "06925",
      name: "Xã Quảng Đức",
      DistrictId: "201",
    },
    {
      id: "06928",
      name: "Xã Quảng Sơn",
      DistrictId: "201",
    },
    {
      id: "06931",
      name: "Xã Quảng Thành",
      DistrictId: "201",
    },
    {
      id: "06937",
      name: "Xã Quảng Thịnh",
      DistrictId: "201",
    },
    {
      id: "06940",
      name: "Xã Quảng Minh",
      DistrictId: "201",
    },
    {
      id: "06943",
      name: "Xã Quảng Chính",
      DistrictId: "201",
    },
    {
      id: "06946",
      name: "Xã Quảng Long",
      DistrictId: "201",
    },
    {
      id: "06949",
      name: "Xã Đường Hoa",
      DistrictId: "201",
    },
    {
      id: "06952",
      name: "Xã Quảng Phong",
      DistrictId: "201",
    },
    {
      id: "06967",
      name: "Xã Cái Chiên",
      DistrictId: "201",
    },
    {
      id: "06970",
      name: "Thị trấn Ba Chẽ",
      DistrictId: "202",
    },
    {
      id: "06973",
      name: "Xã Thanh Sơn",
      DistrictId: "202",
    },
    {
      id: "06976",
      name: "Xã Thanh Lâm",
      DistrictId: "202",
    },
    {
      id: "06979",
      name: "Xã Đạp Thanh",
      DistrictId: "202",
    },
    {
      id: "06982",
      name: "Xã Nam Sơn",
      DistrictId: "202",
    },
    {
      id: "06985",
      name: "Xã Lương Mông",
      DistrictId: "202",
    },
    {
      id: "06988",
      name: "Xã Đồn Đạc",
      DistrictId: "202",
    },
    {
      id: "06991",
      name: "Xã Minh Cầm",
      DistrictId: "202",
    },
    {
      id: "06994",
      name: "Thị trấn Cái Rồng",
      DistrictId: "203",
    },
    {
      id: "06997",
      name: "Xã Đài Xuyên",
      DistrictId: "203",
    },
    {
      id: "07000",
      name: "Xã Bình Dân",
      DistrictId: "203",
    },
    {
      id: "07003",
      name: "Xã Vạn Yên",
      DistrictId: "203",
    },
    {
      id: "07006",
      name: "Xã Minh Châu",
      DistrictId: "203",
    },
    {
      id: "07009",
      name: "Xã Đoàn Kết",
      DistrictId: "203",
    },
    {
      id: "07012",
      name: "Xã Hạ Long",
      DistrictId: "203",
    },
    {
      id: "07015",
      name: "Xã Đông Xá",
      DistrictId: "203",
    },
    {
      id: "07018",
      name: "Xã Bản Sen",
      DistrictId: "203",
    },
    {
      id: "07021",
      name: "Xã Thắng Lợi",
      DistrictId: "203",
    },
    {
      id: "07024",
      name: "Xã Quan Lạn",
      DistrictId: "203",
    },
    {
      id: "07027",
      name: "Xã Ngọc Vừng",
      DistrictId: "203",
    },
    {
      id: "07030",
      name: "Phường Hoành Bồ",
      DistrictId: "193",
    },
    {
      id: "07033",
      name: "Xã Kỳ Thượng",
      DistrictId: "193",
    },
    {
      id: "07036",
      name: "Xã Đồng Sơn",
      DistrictId: "193",
    },
    {
      id: "07039",
      name: "Xã Tân Dân",
      DistrictId: "193",
    },
    {
      id: "07042",
      name: "Xã Đồng Lâm",
      DistrictId: "193",
    },
    {
      id: "07045",
      name: "Xã Hòa Bình",
      DistrictId: "193",
    },
    {
      id: "07048",
      name: "Xã Vũ Oai",
      DistrictId: "193",
    },
    {
      id: "07051",
      name: "Xã Dân Chủ",
      DistrictId: "193",
    },
    {
      id: "07054",
      name: "Xã Quảng La",
      DistrictId: "193",
    },
    {
      id: "07057",
      name: "Xã Bằng Cả",
      DistrictId: "193",
    },
    {
      id: "07060",
      name: "Xã Thống Nhất",
      DistrictId: "193",
    },
    {
      id: "07063",
      name: "Xã Sơn Dương",
      DistrictId: "193",
    },
    {
      id: "07066",
      name: "Xã Lê Lợi",
      DistrictId: "193",
    },
    {
      id: "07069",
      name: "Phường Mạo Khê",
      DistrictId: "205",
    },
    {
      id: "07072",
      name: "Phường Đông Triều",
      DistrictId: "205",
    },
    {
      id: "07075",
      name: "Xã An Sinh",
      DistrictId: "205",
    },
    {
      id: "07078",
      name: "Xã Tràng Lương",
      DistrictId: "205",
    },
    {
      id: "07081",
      name: "Xã Bình Khê",
      DistrictId: "205",
    },
    {
      id: "07084",
      name: "Xã Việt Dân",
      DistrictId: "205",
    },
    {
      id: "07087",
      name: "Xã Tân Việt",
      DistrictId: "205",
    },
    {
      id: "07090",
      name: "Xã Bình Dương",
      DistrictId: "205",
    },
    {
      id: "07093",
      name: "Phường Đức Chính",
      DistrictId: "205",
    },
    {
      id: "07096",
      name: "Phường Tràng An",
      DistrictId: "205",
    },
    {
      id: "07099",
      name: "Xã Nguyễn Huệ",
      DistrictId: "205",
    },
    {
      id: "07102",
      name: "Xã Thủy An",
      DistrictId: "205",
    },
    {
      id: "07105",
      name: "Phường Xuân Sơn",
      DistrictId: "205",
    },
    {
      id: "07108",
      name: "Xã Hồng Thái Tây",
      DistrictId: "205",
    },
    {
      id: "07111",
      name: "Xã Hồng Thái Đông",
      DistrictId: "205",
    },
    {
      id: "07114",
      name: "Phường Hoàng Quế",
      DistrictId: "205",
    },
    {
      id: "07117",
      name: "Phường Yên Thọ",
      DistrictId: "205",
    },
    {
      id: "07120",
      name: "Phường Hồng Phong",
      DistrictId: "205",
    },
    {
      id: "07123",
      name: "Phường Kim Sơn",
      DistrictId: "205",
    },
    {
      id: "07126",
      name: "Phường Hưng Đạo",
      DistrictId: "205",
    },
    {
      id: "07129",
      name: "Xã Yên Đức",
      DistrictId: "205",
    },
    {
      id: "07132",
      name: "Phường Quảng Yên",
      DistrictId: "206",
    },
    {
      id: "07135",
      name: "Phường Đông Mai",
      DistrictId: "206",
    },
    {
      id: "07138",
      name: "Phường Minh Thành",
      DistrictId: "206",
    },
    {
      id: "07144",
      name: "Xã Sông Khoai",
      DistrictId: "206",
    },
    {
      id: "07147",
      name: "Xã Hiệp Hòa",
      DistrictId: "206",
    },
    {
      id: "07150",
      name: "Phường Cộng Hòa",
      DistrictId: "206",
    },
    {
      id: "07153",
      name: "Xã Tiền An",
      DistrictId: "206",
    },
    {
      id: "07156",
      name: "Xã Hoàng Tân",
      DistrictId: "206",
    },
    {
      id: "07159",
      name: "Phường Tân An",
      DistrictId: "206",
    },
    {
      id: "07162",
      name: "Phường Yên Giang",
      DistrictId: "206",
    },
    {
      id: "07165",
      name: "Phường Nam Hoà",
      DistrictId: "206",
    },
    {
      id: "07168",
      name: "Phường Hà An",
      DistrictId: "206",
    },
    {
      id: "07171",
      name: "Xã Cẩm La",
      DistrictId: "206",
    },
    {
      id: "07174",
      name: "Phường Phong Hải",
      DistrictId: "206",
    },
    {
      id: "07177",
      name: "Phường Yên Hải",
      DistrictId: "206",
    },
    {
      id: "07180",
      name: "Xã Liên Hòa",
      DistrictId: "206",
    },
    {
      id: "07183",
      name: "Phường Phong Cốc",
      DistrictId: "206",
    },
    {
      id: "07186",
      name: "Xã Liên Vị",
      DistrictId: "206",
    },
    {
      id: "07189",
      name: "Xã Tiền Phong",
      DistrictId: "206",
    },
    {
      id: "07192",
      name: "Thị trấn Cô Tô",
      DistrictId: "207",
    },
    {
      id: "07195",
      name: "Xã Đồng Tiến",
      DistrictId: "207",
    },
    {
      id: "07198",
      name: "Xã Thanh Lân",
      DistrictId: "207",
    },
    {
      id: "07201",
      name: "Phường Thọ Xương",
      DistrictId: "213",
    },
    {
      id: "07204",
      name: "Phường Trần Nguyên Hãn",
      DistrictId: "213",
    },
    {
      id: "07207",
      name: "Phường Ngô Quyền",
      DistrictId: "213",
    },
    {
      id: "07210",
      name: "Phường Hoàng Văn Thụ",
      DistrictId: "213",
    },
    {
      id: "07213",
      name: "Phường Trần Phú",
      DistrictId: "213",
    },
    {
      id: "07216",
      name: "Phường Mỹ Độ",
      DistrictId: "213",
    },
    {
      id: "07219",
      name: "Phường Lê Lợi",
      DistrictId: "213",
    },
    {
      id: "07222",
      name: "Xã Song Mai",
      DistrictId: "213",
    },
    {
      id: "07225",
      name: "Phường Xương Giang",
      DistrictId: "213",
    },
    {
      id: "07228",
      name: "Phường Đa Mai",
      DistrictId: "213",
    },
    {
      id: "07231",
      name: "Phường Dĩnh Kế",
      DistrictId: "213",
    },
    {
      id: "07243",
      name: "Xã Đồng Tiến",
      DistrictId: "215",
    },
    {
      id: "07246",
      name: "Xã Canh Nậu",
      DistrictId: "215",
    },
    {
      id: "07249",
      name: "Xã Xuân Lương",
      DistrictId: "215",
    },
    {
      id: "07252",
      name: "Xã Tam Tiến",
      DistrictId: "215",
    },
    {
      id: "07255",
      name: "Xã Đồng Vương",
      DistrictId: "215",
    },
    {
      id: "07258",
      name: "Xã Đồng Hưu",
      DistrictId: "215",
    },
    {
      id: "07260",
      name: "Xã Đồng Tâm",
      DistrictId: "215",
    },
    {
      id: "07261",
      name: "Xã Tam Hiệp",
      DistrictId: "215",
    },
    {
      id: "07264",
      name: "Xã Tiến Thắng",
      DistrictId: "215",
    },
    {
      id: "07267",
      name: "Xã Hồng Kỳ",
      DistrictId: "215",
    },
    {
      id: "07270",
      name: "Xã Đồng Lạc",
      DistrictId: "215",
    },
    {
      id: "07273",
      name: "Xã Đông Sơn",
      DistrictId: "215",
    },
    {
      id: "07276",
      name: "Xã Tân Hiệp",
      DistrictId: "215",
    },
    {
      id: "07279",
      name: "Xã Hương Vĩ",
      DistrictId: "215",
    },
    {
      id: "07282",
      name: "Xã Đồng Kỳ",
      DistrictId: "215",
    },
    {
      id: "07285",
      name: "Xã An Thượng",
      DistrictId: "215",
    },
    {
      id: "07288",
      name: "Thị trấn Phồn Xương",
      DistrictId: "215",
    },
    {
      id: "07291",
      name: "Xã Tân Sỏi",
      DistrictId: "215",
    },
    {
      id: "07294",
      name: "Thị trấn Bố Hạ",
      DistrictId: "215",
    },
    {
      id: "07303",
      name: "Xã Lan Giới",
      DistrictId: "216",
    },
    {
      id: "07306",
      name: "Thị trấn Nhã Nam",
      DistrictId: "216",
    },
    {
      id: "07309",
      name: "Xã Tân Trung",
      DistrictId: "216",
    },
    {
      id: "07312",
      name: "Xã Đại Hóa",
      DistrictId: "216",
    },
    {
      id: "07315",
      name: "Xã Quang Tiến",
      DistrictId: "216",
    },
    {
      id: "07318",
      name: "Xã Phúc Sơn",
      DistrictId: "216",
    },
    {
      id: "07321",
      name: "Xã An Dương",
      DistrictId: "216",
    },
    {
      id: "07324",
      name: "Xã Phúc Hòa",
      DistrictId: "216",
    },
    {
      id: "07327",
      name: "Xã Liên Sơn",
      DistrictId: "216",
    },
    {
      id: "07330",
      name: "Xã Hợp Đức",
      DistrictId: "216",
    },
    {
      id: "07333",
      name: "Xã Lam Cốt",
      DistrictId: "216",
    },
    {
      id: "07336",
      name: "Xã Cao Xá",
      DistrictId: "216",
    },
    {
      id: "07339",
      name: "Thị trấn Cao Thượng",
      DistrictId: "216",
    },
    {
      id: "07342",
      name: "Xã Việt Ngọc",
      DistrictId: "216",
    },
    {
      id: "07345",
      name: "Xã Song Vân",
      DistrictId: "216",
    },
    {
      id: "07348",
      name: "Xã Ngọc Châu",
      DistrictId: "216",
    },
    {
      id: "07351",
      name: "Xã Ngọc Vân",
      DistrictId: "216",
    },
    {
      id: "07354",
      name: "Xã Việt Lập",
      DistrictId: "216",
    },
    {
      id: "07357",
      name: "Xã Liên Chung",
      DistrictId: "216",
    },
    {
      id: "07360",
      name: "Xã Ngọc Thiện",
      DistrictId: "216",
    },
    {
      id: "07363",
      name: "Xã Ngọc Lý",
      DistrictId: "216",
    },
    {
      id: "07366",
      name: "Xã Quế Nham",
      DistrictId: "216",
    },
    {
      id: "07375",
      name: "Thị trấn Vôi",
      DistrictId: "217",
    },
    {
      id: "07378",
      name: "Xã Nghĩa Hòa",
      DistrictId: "217",
    },
    {
      id: "07381",
      name: "Xã Nghĩa Hưng",
      DistrictId: "217",
    },
    {
      id: "07384",
      name: "Xã Quang Thịnh",
      DistrictId: "217",
    },
    {
      id: "07387",
      name: "Xã Hương Sơn",
      DistrictId: "217",
    },
    {
      id: "07390",
      name: "Xã Đào Mỹ",
      DistrictId: "217",
    },
    {
      id: "07393",
      name: "Xã Tiên Lục",
      DistrictId: "217",
    },
    {
      id: "07396",
      name: "Xã An Hà",
      DistrictId: "217",
    },
    {
      id: "07399",
      name: "Thị trấn Kép",
      DistrictId: "217",
    },
    {
      id: "07402",
      name: "Xã Mỹ Hà",
      DistrictId: "217",
    },
    {
      id: "07405",
      name: "Xã Hương Lạc",
      DistrictId: "217",
    },
    {
      id: "07408",
      name: "Xã Dương Đức",
      DistrictId: "217",
    },
    {
      id: "07411",
      name: "Xã Tân Thanh",
      DistrictId: "217",
    },
    {
      id: "07414",
      name: "Xã Yên Mỹ",
      DistrictId: "217",
    },
    {
      id: "07417",
      name: "Xã Tân Hưng",
      DistrictId: "217",
    },
    {
      id: "07420",
      name: "Xã Mỹ Thái",
      DistrictId: "217",
    },
    {
      id: "07426",
      name: "Xã Xương Lâm",
      DistrictId: "217",
    },
    {
      id: "07429",
      name: "Xã Xuân Hương",
      DistrictId: "217",
    },
    {
      id: "07432",
      name: "Xã Tân Dĩnh",
      DistrictId: "217",
    },
    {
      id: "07435",
      name: "Xã Đại Lâm",
      DistrictId: "217",
    },
    {
      id: "07438",
      name: "Xã Thái Đào",
      DistrictId: "217",
    },
    {
      id: "07441",
      name: "Xã Dĩnh Trì",
      DistrictId: "213",
    },
    {
      id: "07444",
      name: "Thị trấn Đồi Ngô",
      DistrictId: "218",
    },
    {
      id: "07450",
      name: "Xã Đông Hưng",
      DistrictId: "218",
    },
    {
      id: "07453",
      name: "Xã Đông Phú",
      DistrictId: "218",
    },
    {
      id: "07456",
      name: "Xã Tam Dị",
      DistrictId: "218",
    },
    {
      id: "07459",
      name: "Xã Bảo Sơn",
      DistrictId: "218",
    },
    {
      id: "07462",
      name: "Xã Bảo Đài",
      DistrictId: "218",
    },
    {
      id: "07465",
      name: "Xã Thanh Lâm",
      DistrictId: "218",
    },
    {
      id: "07468",
      name: "Xã Tiên Nha",
      DistrictId: "218",
    },
    {
      id: "07471",
      name: "Xã Trường Giang",
      DistrictId: "218",
    },
    {
      id: "07477",
      name: "Thị trấn Phương Sơn",
      DistrictId: "218",
    },
    {
      id: "07480",
      name: "Xã Chu Điện",
      DistrictId: "218",
    },
    {
      id: "07483",
      name: "Xã Cương Sơn",
      DistrictId: "218",
    },
    {
      id: "07486",
      name: "Xã Nghĩa Phương",
      DistrictId: "218",
    },
    {
      id: "07489",
      name: "Xã Vô Tranh",
      DistrictId: "218",
    },
    {
      id: "07492",
      name: "Xã Bình Sơn",
      DistrictId: "218",
    },
    {
      id: "07495",
      name: "Xã Lan Mẫu",
      DistrictId: "218",
    },
    {
      id: "07498",
      name: "Xã Yên Sơn",
      DistrictId: "218",
    },
    {
      id: "07501",
      name: "Xã Khám Lạng",
      DistrictId: "218",
    },
    {
      id: "07504",
      name: "Xã Huyền Sơn",
      DistrictId: "218",
    },
    {
      id: "07507",
      name: "Xã Trường Sơn",
      DistrictId: "218",
    },
    {
      id: "07510",
      name: "Xã Lục Sơn",
      DistrictId: "218",
    },
    {
      id: "07513",
      name: "Xã Bắc Lũng",
      DistrictId: "218",
    },
    {
      id: "07516",
      name: "Xã Vũ Xá",
      DistrictId: "218",
    },
    {
      id: "07519",
      name: "Xã Cẩm Lý",
      DistrictId: "218",
    },
    {
      id: "07522",
      name: "Xã Đan Hội",
      DistrictId: "218",
    },
    {
      id: "07525",
      name: "Thị trấn Chũ",
      DistrictId: "219",
    },
    {
      id: "07528",
      name: "Xã Cấm Sơn",
      DistrictId: "219",
    },
    {
      id: "07531",
      name: "Xã Tân Sơn",
      DistrictId: "219",
    },
    {
      id: "07534",
      name: "Xã Phong Minh",
      DistrictId: "219",
    },
    {
      id: "07537",
      name: "Xã Phong Vân",
      DistrictId: "219",
    },
    {
      id: "07540",
      name: "Xã Xa Lý",
      DistrictId: "219",
    },
    {
      id: "07543",
      name: "Xã Hộ Đáp",
      DistrictId: "219",
    },
    {
      id: "07546",
      name: "Xã Sơn Hải",
      DistrictId: "219",
    },
    {
      id: "07549",
      name: "Xã Thanh Hải",
      DistrictId: "219",
    },
    {
      id: "07552",
      name: "Xã Kiên Lao",
      DistrictId: "219",
    },
    {
      id: "07555",
      name: "Xã Biên Sơn",
      DistrictId: "219",
    },
    {
      id: "07558",
      name: "Xã Kiên Thành",
      DistrictId: "219",
    },
    {
      id: "07561",
      name: "Xã Hồng Giang",
      DistrictId: "219",
    },
    {
      id: "07564",
      name: "Xã Kim Sơn",
      DistrictId: "219",
    },
    {
      id: "07567",
      name: "Xã Tân Hoa",
      DistrictId: "219",
    },
    {
      id: "07570",
      name: "Xã Giáp Sơn",
      DistrictId: "219",
    },
    {
      id: "07573",
      name: "Xã Biển Động",
      DistrictId: "219",
    },
    {
      id: "07576",
      name: "Xã Quý Sơn",
      DistrictId: "219",
    },
    {
      id: "07579",
      name: "Xã Trù Hựu",
      DistrictId: "219",
    },
    {
      id: "07582",
      name: "Xã Phì Điền",
      DistrictId: "219",
    },
    {
      id: "07588",
      name: "Xã Tân Quang",
      DistrictId: "219",
    },
    {
      id: "07591",
      name: "Xã Đồng Cốc",
      DistrictId: "219",
    },
    {
      id: "07594",
      name: "Xã Tân Lập",
      DistrictId: "219",
    },
    {
      id: "07597",
      name: "Xã Phú Nhuận",
      DistrictId: "219",
    },
    {
      id: "07600",
      name: "Xã Mỹ An",
      DistrictId: "219",
    },
    {
      id: "07603",
      name: "Xã Nam Dương",
      DistrictId: "219",
    },
    {
      id: "07606",
      name: "Xã Tân Mộc",
      DistrictId: "219",
    },
    {
      id: "07609",
      name: "Xã Đèo Gia",
      DistrictId: "219",
    },
    {
      id: "07612",
      name: "Xã Phượng Sơn",
      DistrictId: "219",
    },
    {
      id: "07615",
      name: "Thị trấn An Châu",
      DistrictId: "220",
    },
    {
      id: "07616",
      name: "Thị trấn Tây Yên Tử",
      DistrictId: "220",
    },
    {
      id: "07621",
      name: "Xã Vân Sơn",
      DistrictId: "220",
    },
    {
      id: "07624",
      name: "Xã Hữu Sản",
      DistrictId: "220",
    },
    {
      id: "07627",
      name: "Xã Đại Sơn",
      DistrictId: "220",
    },
    {
      id: "07630",
      name: "Xã Phúc Sơn",
      DistrictId: "220",
    },
    {
      id: "07636",
      name: "Xã Giáo Liêm",
      DistrictId: "220",
    },
    {
      id: "07642",
      name: "Xã Cẩm Đàn",
      DistrictId: "220",
    },
    {
      id: "07645",
      name: "Xã An Lạc",
      DistrictId: "220",
    },
    {
      id: "07648",
      name: "Xã Vĩnh An",
      DistrictId: "220",
    },
    {
      id: "07651",
      name: "Xã Yên Định",
      DistrictId: "220",
    },
    {
      id: "07654",
      name: "Xã Lệ Viễn",
      DistrictId: "220",
    },
    {
      id: "07660",
      name: "Xã An Bá",
      DistrictId: "220",
    },
    {
      id: "07663",
      name: "Xã Tuấn Đạo",
      DistrictId: "220",
    },
    {
      id: "07666",
      name: "Xã Dương Hưu",
      DistrictId: "220",
    },
    {
      id: "07672",
      name: "Xã Long Sơn",
      DistrictId: "220",
    },
    {
      id: "07678",
      name: "Xã Thanh Luận",
      DistrictId: "220",
    },
    {
      id: "07681",
      name: "Thị trấn Nham Biền",
      DistrictId: "221",
    },
    {
      id: "07682",
      name: "Thị trấn Tân An",
      DistrictId: "221",
    },
    {
      id: "07684",
      name: "Xã Lão Hộ",
      DistrictId: "221",
    },
    {
      id: "07687",
      name: "Xã Tân Mỹ",
      DistrictId: "213",
    },
    {
      id: "07690",
      name: "Xã Hương Gián",
      DistrictId: "221",
    },
    {
      id: "07696",
      name: "Xã Đồng Sơn",
      DistrictId: "213",
    },
    {
      id: "07699",
      name: "Xã Tân Tiến",
      DistrictId: "213",
    },
    {
      id: "07702",
      name: "Xã Quỳnh Sơn",
      DistrictId: "221",
    },
    {
      id: "07705",
      name: "Xã Song Khê",
      DistrictId: "213",
    },
    {
      id: "07708",
      name: "Xã Nội Hoàng",
      DistrictId: "221",
    },
    {
      id: "07711",
      name: "Xã Tiền Phong",
      DistrictId: "221",
    },
    {
      id: "07714",
      name: "Xã Xuân Phú",
      DistrictId: "221",
    },
    {
      id: "07717",
      name: "Xã Tân Liễu",
      DistrictId: "221",
    },
    {
      id: "07720",
      name: "Xã Trí Yên",
      DistrictId: "221",
    },
    {
      id: "07723",
      name: "Xã Lãng Sơn",
      DistrictId: "221",
    },
    {
      id: "07726",
      name: "Xã Yên Lư",
      DistrictId: "221",
    },
    {
      id: "07729",
      name: "Xã Tiến Dũng",
      DistrictId: "221",
    },
    {
      id: "07735",
      name: "Xã Đức Giang",
      DistrictId: "221",
    },
    {
      id: "07738",
      name: "Xã Cảnh Thụy",
      DistrictId: "221",
    },
    {
      id: "07741",
      name: "Xã Tư Mại",
      DistrictId: "221",
    },
    {
      id: "07747",
      name: "Xã Đồng Việt",
      DistrictId: "221",
    },
    {
      id: "07750",
      name: "Xã Đồng Phúc",
      DistrictId: "221",
    },
    {
      id: "07759",
      name: "Xã Thượng Lan",
      DistrictId: "222",
    },
    {
      id: "07762",
      name: "Xã Việt Tiến",
      DistrictId: "222",
    },
    {
      id: "07765",
      name: "Xã Nghĩa Trung",
      DistrictId: "222",
    },
    {
      id: "07768",
      name: "Xã Minh Đức",
      DistrictId: "222",
    },
    {
      id: "07771",
      name: "Xã Hương Mai",
      DistrictId: "222",
    },
    {
      id: "07774",
      name: "Xã Tự Lạn",
      DistrictId: "222",
    },
    {
      id: "07777",
      name: "Thị trấn Bích Động",
      DistrictId: "222",
    },
    {
      id: "07780",
      name: "Xã Trung Sơn",
      DistrictId: "222",
    },
    {
      id: "07783",
      name: "Xã Hồng Thái",
      DistrictId: "222",
    },
    {
      id: "07786",
      name: "Xã Tiên Sơn",
      DistrictId: "222",
    },
    {
      id: "07789",
      name: "Xã Tăng Tiến",
      DistrictId: "222",
    },
    {
      id: "07792",
      name: "Xã Quảng Minh",
      DistrictId: "222",
    },
    {
      id: "07795",
      name: "Thị trấn Nếnh",
      DistrictId: "222",
    },
    {
      id: "07798",
      name: "Xã Ninh Sơn",
      DistrictId: "222",
    },
    {
      id: "07801",
      name: "Xã Vân Trung",
      DistrictId: "222",
    },
    {
      id: "07804",
      name: "Xã Vân Hà",
      DistrictId: "222",
    },
    {
      id: "07807",
      name: "Xã Quang Châu",
      DistrictId: "222",
    },
    {
      id: "07813",
      name: "Xã Đồng Tân",
      DistrictId: "223",
    },
    {
      id: "07816",
      name: "Xã Thanh Vân",
      DistrictId: "223",
    },
    {
      id: "07819",
      name: "Xã Hoàng Lương",
      DistrictId: "223",
    },
    {
      id: "07822",
      name: "Xã Hoàng Vân",
      DistrictId: "223",
    },
    {
      id: "07825",
      name: "Xã Hoàng Thanh",
      DistrictId: "223",
    },
    {
      id: "07828",
      name: "Xã Hoàng An",
      DistrictId: "223",
    },
    {
      id: "07831",
      name: "Xã Ngọc Sơn",
      DistrictId: "223",
    },
    {
      id: "07834",
      name: "Xã Thái Sơn",
      DistrictId: "223",
    },
    {
      id: "07837",
      name: "Xã Hòa Sơn",
      DistrictId: "223",
    },
    {
      id: "07840",
      name: "Thị trấn Thắng",
      DistrictId: "223",
    },
    {
      id: "07843",
      name: "Xã Quang Minh",
      DistrictId: "223",
    },
    {
      id: "07846",
      name: "Xã Lương Phong",
      DistrictId: "223",
    },
    {
      id: "07849",
      name: "Xã Hùng Sơn",
      DistrictId: "223",
    },
    {
      id: "07852",
      name: "Xã Đại Thành",
      DistrictId: "223",
    },
    {
      id: "07855",
      name: "Xã Thường Thắng",
      DistrictId: "223",
    },
    {
      id: "07858",
      name: "Xã Hợp Thịnh",
      DistrictId: "223",
    },
    {
      id: "07861",
      name: "Xã Danh Thắng",
      DistrictId: "223",
    },
    {
      id: "07864",
      name: "Xã Mai Trung",
      DistrictId: "223",
    },
    {
      id: "07867",
      name: "Xã Đoan Bái",
      DistrictId: "223",
    },
    {
      id: "07870",
      name: "Thị trấn Bắc Lý",
      DistrictId: "223",
    },
    {
      id: "07873",
      name: "Xã Xuân Cẩm",
      DistrictId: "223",
    },
    {
      id: "07876",
      name: "Xã Hương Lâm",
      DistrictId: "223",
    },
    {
      id: "07879",
      name: "Xã Đông Lỗ",
      DistrictId: "223",
    },
    {
      id: "07882",
      name: "Xã Châu Minh",
      DistrictId: "223",
    },
    {
      id: "07885",
      name: "Xã Mai Đình",
      DistrictId: "223",
    },
    {
      id: "07888",
      name: "Phường Dữu Lâu",
      DistrictId: "227",
    },
    {
      id: "07891",
      name: "Phường Vân Cơ",
      DistrictId: "227",
    },
    {
      id: "07894",
      name: "Phường Nông Trang",
      DistrictId: "227",
    },
    {
      id: "07897",
      name: "Phường Tân Dân",
      DistrictId: "227",
    },
    {
      id: "07900",
      name: "Phường Gia Cẩm",
      DistrictId: "227",
    },
    {
      id: "07903",
      name: "Phường Tiên Cát",
      DistrictId: "227",
    },
    {
      id: "07906",
      name: "Phường Thọ Sơn",
      DistrictId: "227",
    },
    {
      id: "07909",
      name: "Phường Thanh Miếu",
      DistrictId: "227",
    },
    {
      id: "07912",
      name: "Phường Bạch Hạc",
      DistrictId: "227",
    },
    {
      id: "07915",
      name: "Phường Bến Gót",
      DistrictId: "227",
    },
    {
      id: "07918",
      name: "Phường Vân Phú",
      DistrictId: "227",
    },
    {
      id: "07921",
      name: "Xã Phượng Lâu",
      DistrictId: "227",
    },
    {
      id: "07924",
      name: "Xã Thụy Vân",
      DistrictId: "227",
    },
    {
      id: "07927",
      name: "Phường Minh Phương",
      DistrictId: "227",
    },
    {
      id: "07930",
      name: "Xã Trưng Vương",
      DistrictId: "227",
    },
    {
      id: "07933",
      name: "Phường Minh Nông",
      DistrictId: "227",
    },
    {
      id: "07936",
      name: "Xã Sông Lô",
      DistrictId: "227",
    },
    {
      id: "07942",
      name: "Phường Hùng Vương",
      DistrictId: "228",
    },
    {
      id: "07945",
      name: "Phường Phong Châu",
      DistrictId: "228",
    },
    {
      id: "07948",
      name: "Phường Âu Cơ",
      DistrictId: "228",
    },
    {
      id: "07951",
      name: "Xã Hà Lộc",
      DistrictId: "228",
    },
    {
      id: "07954",
      name: "Xã Phú Hộ",
      DistrictId: "228",
    },
    {
      id: "07957",
      name: "Xã Văn Lung",
      DistrictId: "228",
    },
    {
      id: "07960",
      name: "Xã Thanh Minh",
      DistrictId: "228",
    },
    {
      id: "07963",
      name: "Xã Hà Thạch",
      DistrictId: "228",
    },
    {
      id: "07966",
      name: "Phường Thanh Vinh",
      DistrictId: "228",
    },
    {
      id: "07969",
      name: "Thị trấn Đoan Hùng",
      DistrictId: "230",
    },
    {
      id: "07975",
      name: "Xã Hùng Xuyên",
      DistrictId: "230",
    },
    {
      id: "07981",
      name: "Xã Bằng Luân",
      DistrictId: "230",
    },
    {
      id: "07984",
      name: "Xã Vân Du",
      DistrictId: "230",
    },
    {
      id: "07987",
      name: "Xã Phú Lâm",
      DistrictId: "230",
    },
    {
      id: "07993",
      name: "Xã Minh Lương",
      DistrictId: "230",
    },
    {
      id: "07996",
      name: "Xã Bằng Doãn",
      DistrictId: "230",
    },
    {
      id: "07999",
      name: "Xã Chí Đám",
      DistrictId: "230",
    },
    {
      id: "08005",
      name: "Xã Phúc Lai",
      DistrictId: "230",
    },
    {
      id: "08008",
      name: "Xã Ngọc Quan",
      DistrictId: "230",
    },
    {
      id: "08014",
      name: "Xã Hợp Nhất",
      DistrictId: "230",
    },
    {
      id: "08017",
      name: "Xã Sóc Đăng",
      DistrictId: "230",
    },
    {
      id: "08023",
      name: "Xã Tây Cốc",
      DistrictId: "230",
    },
    {
      id: "08026",
      name: "Xã Yên Kiện",
      DistrictId: "230",
    },
    {
      id: "08029",
      name: "Xã Hùng Long",
      DistrictId: "230",
    },
    {
      id: "08032",
      name: "Xã Vụ Quang",
      DistrictId: "230",
    },
    {
      id: "08035",
      name: "Xã Vân Đồn",
      DistrictId: "230",
    },
    {
      id: "08038",
      name: "Xã Tiêu Sơn",
      DistrictId: "230",
    },
    {
      id: "08041",
      name: "Xã Minh Tiến",
      DistrictId: "230",
    },
    {
      id: "08044",
      name: "Xã Minh Phú",
      DistrictId: "230",
    },
    {
      id: "08047",
      name: "Xã Chân Mộng",
      DistrictId: "230",
    },
    {
      id: "08050",
      name: "Xã Ca Đình",
      DistrictId: "230",
    },
    {
      id: "08053",
      name: "Thị trấn Hạ Hoà",
      DistrictId: "231",
    },
    {
      id: "08056",
      name: "Xã Đại Phạm",
      DistrictId: "231",
    },
    {
      id: "08062",
      name: "Xã Đan Thượng",
      DistrictId: "231",
    },
    {
      id: "08065",
      name: "Xã Hà Lương",
      DistrictId: "231",
    },
    {
      id: "08071",
      name: "Xã Tứ Hiệp",
      DistrictId: "231",
    },
    {
      id: "08080",
      name: "Xã Hiền Lương",
      DistrictId: "231",
    },
    {
      id: "08089",
      name: "Xã Phương Viên",
      DistrictId: "231",
    },
    {
      id: "08092",
      name: "Xã Gia Điền",
      DistrictId: "231",
    },
    {
      id: "08095",
      name: "Xã Ấm Hạ",
      DistrictId: "231",
    },
    {
      id: "08104",
      name: "Xã Hương Xạ",
      DistrictId: "231",
    },
    {
      id: "08110",
      name: "Xã Xuân Áng",
      DistrictId: "231",
    },
    {
      id: "08113",
      name: "Xã Yên Kỳ",
      DistrictId: "231",
    },
    {
      id: "08119",
      name: "Xã Minh Hạc",
      DistrictId: "231",
    },
    {
      id: "08122",
      name: "Xã Lang Sơn",
      DistrictId: "231",
    },
    {
      id: "08125",
      name: "Xã Bằng Giã",
      DistrictId: "231",
    },
    {
      id: "08128",
      name: "Xã Yên Luật",
      DistrictId: "231",
    },
    {
      id: "08131",
      name: "Xã Vô Tranh",
      DistrictId: "231",
    },
    {
      id: "08134",
      name: "Xã Văn Lang",
      DistrictId: "231",
    },
    {
      id: "08140",
      name: "Xã Minh Côi",
      DistrictId: "231",
    },
    {
      id: "08143",
      name: "Xã Vĩnh Chân",
      DistrictId: "231",
    },
    {
      id: "08152",
      name: "Thị trấn Thanh Ba",
      DistrictId: "232",
    },
    {
      id: "08156",
      name: "Xã Vân Lĩnh",
      DistrictId: "232",
    },
    {
      id: "08158",
      name: "Xã Đông Lĩnh",
      DistrictId: "232",
    },
    {
      id: "08161",
      name: "Xã Đại An",
      DistrictId: "232",
    },
    {
      id: "08164",
      name: "Xã Hanh Cù",
      DistrictId: "232",
    },
    {
      id: "08170",
      name: "Xã Đồng Xuân",
      DistrictId: "232",
    },
    {
      id: "08173",
      name: "Xã Quảng Yên",
      DistrictId: "232",
    },
    {
      id: "08179",
      name: "Xã Ninh Dân",
      DistrictId: "232",
    },
    {
      id: "08194",
      name: "Xã Võ Lao",
      DistrictId: "232",
    },
    {
      id: "08197",
      name: "Xã Khải Xuân",
      DistrictId: "232",
    },
    {
      id: "08200",
      name: "Xã Mạn Lạn",
      DistrictId: "232",
    },
    {
      id: "08203",
      name: "Xã Hoàng Cương",
      DistrictId: "232",
    },
    {
      id: "08206",
      name: "Xã Chí Tiên",
      DistrictId: "232",
    },
    {
      id: "08209",
      name: "Xã Đông Thành",
      DistrictId: "232",
    },
    {
      id: "08215",
      name: "Xã Sơn Cương",
      DistrictId: "232",
    },
    {
      id: "08218",
      name: "Xã Thanh Hà",
      DistrictId: "232",
    },
    {
      id: "08221",
      name: "Xã Đỗ Sơn",
      DistrictId: "232",
    },
    {
      id: "08224",
      name: "Xã Đỗ Xuyên",
      DistrictId: "232",
    },
    {
      id: "08227",
      name: "Xã Lương Lỗ",
      DistrictId: "232",
    },
    {
      id: "08230",
      name: "Thị trấn Phong Châu",
      DistrictId: "233",
    },
    {
      id: "08233",
      name: "Xã Phú Mỹ",
      DistrictId: "233",
    },
    {
      id: "08234",
      name: "Xã Lệ Mỹ",
      DistrictId: "233",
    },
    {
      id: "08236",
      name: "Xã Liên Hoa",
      DistrictId: "233",
    },
    {
      id: "08239",
      name: "Xã Trạm Thản",
      DistrictId: "233",
    },
    {
      id: "08242",
      name: "Xã Trị Quận",
      DistrictId: "233",
    },
    {
      id: "08245",
      name: "Xã Trung Giáp",
      DistrictId: "233",
    },
    {
      id: "08248",
      name: "Xã Tiên Phú",
      DistrictId: "233",
    },
    {
      id: "08251",
      name: "Xã Hạ Giáp",
      DistrictId: "233",
    },
    {
      id: "08254",
      name: "Xã Bảo Thanh",
      DistrictId: "233",
    },
    {
      id: "08257",
      name: "Xã Phú Lộc",
      DistrictId: "233",
    },
    {
      id: "08260",
      name: "Xã Gia Thanh",
      DistrictId: "233",
    },
    {
      id: "08263",
      name: "Xã Tiên Du",
      DistrictId: "233",
    },
    {
      id: "08266",
      name: "Xã Phú Nham",
      DistrictId: "233",
    },
    {
      id: "08272",
      name: "Xã An Đạo",
      DistrictId: "233",
    },
    {
      id: "08275",
      name: "Xã Bình Phú",
      DistrictId: "233",
    },
    {
      id: "08278",
      name: "Xã Phù Ninh",
      DistrictId: "233",
    },
    {
      id: "08281",
      name: "Xã Kim Đức",
      DistrictId: "227",
    },
    {
      id: "08287",
      name: "Xã Hùng Lô",
      DistrictId: "227",
    },
    {
      id: "08290",
      name: "Thị trấn Yên Lập",
      DistrictId: "234",
    },
    {
      id: "08293",
      name: "Xã Mỹ Lung",
      DistrictId: "234",
    },
    {
      id: "08296",
      name: "Xã Mỹ Lương",
      DistrictId: "234",
    },
    {
      id: "08299",
      name: "Xã Lương Sơn",
      DistrictId: "234",
    },
    {
      id: "08302",
      name: "Xã Xuân An",
      DistrictId: "234",
    },
    {
      id: "08305",
      name: "Xã Xuân Viên",
      DistrictId: "234",
    },
    {
      id: "08308",
      name: "Xã Xuân Thủy",
      DistrictId: "234",
    },
    {
      id: "08311",
      name: "Xã Trung Sơn",
      DistrictId: "234",
    },
    {
      id: "08314",
      name: "Xã Hưng Long",
      DistrictId: "234",
    },
    {
      id: "08317",
      name: "Xã Nga Hoàng",
      DistrictId: "234",
    },
    {
      id: "08320",
      name: "Xã Đồng Lạc",
      DistrictId: "234",
    },
    {
      id: "08323",
      name: "Xã Thượng Long",
      DistrictId: "234",
    },
    {
      id: "08326",
      name: "Xã Đồng Thịnh",
      DistrictId: "234",
    },
    {
      id: "08329",
      name: "Xã Phúc Khánh",
      DistrictId: "234",
    },
    {
      id: "08332",
      name: "Xã Minh Hòa",
      DistrictId: "234",
    },
    {
      id: "08335",
      name: "Xã Ngọc Lập",
      DistrictId: "234",
    },
    {
      id: "08338",
      name: "Xã Ngọc Đồng",
      DistrictId: "234",
    },
    {
      id: "08341",
      name: "Thị trấn Cẩm Khê",
      DistrictId: "235",
    },
    {
      id: "08344",
      name: "Xã Tiên Lương",
      DistrictId: "235",
    },
    {
      id: "08347",
      name: "Xã Tuy Lộc",
      DistrictId: "235",
    },
    {
      id: "08350",
      name: "Xã Ngô Xá",
      DistrictId: "235",
    },
    {
      id: "08353",
      name: "Xã Minh Tân",
      DistrictId: "235",
    },
    {
      id: "08356",
      name: "Xã Phượng Vĩ",
      DistrictId: "235",
    },
    {
      id: "08362",
      name: "Xã Thụy Liễu",
      DistrictId: "235",
    },
    {
      id: "08374",
      name: "Xã Tùng Khê",
      DistrictId: "235",
    },
    {
      id: "08377",
      name: "Xã Tam Sơn",
      DistrictId: "235",
    },
    {
      id: "08380",
      name: "Xã Văn Bán",
      DistrictId: "235",
    },
    {
      id: "08383",
      name: "Xã Cấp Dẫn",
      DistrictId: "235",
    },
    {
      id: "08389",
      name: "Xã Xương Thịnh",
      DistrictId: "235",
    },
    {
      id: "08392",
      name: "Xã Phú Khê",
      DistrictId: "235",
    },
    {
      id: "08395",
      name: "Xã Sơn Tình",
      DistrictId: "235",
    },
    {
      id: "08398",
      name: "Xã Yên Tập",
      DistrictId: "235",
    },
    {
      id: "08401",
      name: "Xã Hương Lung",
      DistrictId: "235",
    },
    {
      id: "08404",
      name: "Xã Tạ Xá",
      DistrictId: "235",
    },
    {
      id: "08407",
      name: "Xã Phú Lạc",
      DistrictId: "235",
    },
    {
      id: "08413",
      name: "Xã Chương Xá",
      DistrictId: "235",
    },
    {
      id: "08416",
      name: "Xã Hùng Việt",
      DistrictId: "235",
    },
    {
      id: "08419",
      name: "Xã Văn Khúc",
      DistrictId: "235",
    },
    {
      id: "08422",
      name: "Xã Yên Dưỡng",
      DistrictId: "235",
    },
    {
      id: "08428",
      name: "Xã Điêu Lương",
      DistrictId: "235",
    },
    {
      id: "08431",
      name: "Xã Đồng Lương",
      DistrictId: "235",
    },
    {
      id: "08434",
      name: "Thị trấn Hưng Hoá",
      DistrictId: "236",
    },
    {
      id: "08440",
      name: "Xã Hiền Quan",
      DistrictId: "236",
    },
    {
      id: "08443",
      name: "Xã Bắc Sơn",
      DistrictId: "236",
    },
    {
      id: "08446",
      name: "Xã Thanh Uyên",
      DistrictId: "236",
    },
    {
      id: "08461",
      name: "Xã Lam Sơn",
      DistrictId: "236",
    },
    {
      id: "08467",
      name: "Xã Vạn Xuân",
      DistrictId: "236",
    },
    {
      id: "08470",
      name: "Xã Quang Húc",
      DistrictId: "236",
    },
    {
      id: "08473",
      name: "Xã Hương Nộn",
      DistrictId: "236",
    },
    {
      id: "08476",
      name: "Xã Tề Lễ",
      DistrictId: "236",
    },
    {
      id: "08479",
      name: "Xã Thọ Văn",
      DistrictId: "236",
    },
    {
      id: "08482",
      name: "Xã Dị Nậu",
      DistrictId: "236",
    },
    {
      id: "08491",
      name: "Xã Dân Quyền",
      DistrictId: "236",
    },
    {
      id: "08494",
      name: "Thị trấn Lâm Thao",
      DistrictId: "237",
    },
    {
      id: "08497",
      name: "Xã Tiên Kiên",
      DistrictId: "237",
    },
    {
      id: "08498",
      name: "Thị trấn Hùng Sơn",
      DistrictId: "237",
    },
    {
      id: "08500",
      name: "Xã Xuân Lũng",
      DistrictId: "237",
    },
    {
      id: "08503",
      name: "Xã Hy Cương",
      DistrictId: "227",
    },
    {
      id: "08506",
      name: "Xã Chu Hóa",
      DistrictId: "227",
    },
    {
      id: "08509",
      name: "Xã Xuân Huy",
      DistrictId: "237",
    },
    {
      id: "08512",
      name: "Xã Thạch Sơn",
      DistrictId: "237",
    },
    {
      id: "08515",
      name: "Xã Thanh Đình",
      DistrictId: "227",
    },
    {
      id: "08518",
      name: "Xã Sơn Vi",
      DistrictId: "237",
    },
    {
      id: "08521",
      name: "Xã Phùng Nguyên",
      DistrictId: "237",
    },
    {
      id: "08527",
      name: "Xã Cao Xá",
      DistrictId: "237",
    },
    {
      id: "08533",
      name: "Xã Vĩnh Lại",
      DistrictId: "237",
    },
    {
      id: "08536",
      name: "Xã Tứ Xã",
      DistrictId: "237",
    },
    {
      id: "08539",
      name: "Xã Bản Nguyên",
      DistrictId: "237",
    },
    {
      id: "08542",
      name: "Thị trấn Thanh Sơn",
      DistrictId: "238",
    },
    {
      id: "08545",
      name: "Xã Thu Cúc",
      DistrictId: "240",
    },
    {
      id: "08548",
      name: "Xã Thạch Kiệt",
      DistrictId: "240",
    },
    {
      id: "08551",
      name: "Xã Thu Ngạc",
      DistrictId: "240",
    },
    {
      id: "08554",
      name: "Xã Kiệt Sơn",
      DistrictId: "240",
    },
    {
      id: "08557",
      name: "Xã Đồng Sơn",
      DistrictId: "240",
    },
    {
      id: "08560",
      name: "Xã Lai Đồng",
      DistrictId: "240",
    },
    {
      id: "08563",
      name: "Xã Sơn Hùng",
      DistrictId: "238",
    },
    {
      id: "08566",
      name: "Xã Tân Phú",
      DistrictId: "240",
    },
    {
      id: "08569",
      name: "Xã Mỹ Thuận",
      DistrictId: "240",
    },
    {
      id: "08572",
      name: "Xã Địch Quả",
      DistrictId: "238",
    },
    {
      id: "08575",
      name: "Xã Giáp Lai",
      DistrictId: "238",
    },
    {
      id: "08578",
      name: "Xã Tân Sơn",
      DistrictId: "240",
    },
    {
      id: "08581",
      name: "Xã Thục Luyện",
      DistrictId: "238",
    },
    {
      id: "08584",
      name: "Xã Võ Miếu",
      DistrictId: "238",
    },
    {
      id: "08587",
      name: "Xã Thạch Khoán",
      DistrictId: "238",
    },
    {
      id: "08590",
      name: "Xã Xuân Đài",
      DistrictId: "240",
    },
    {
      id: "08593",
      name: "Xã Minh Đài",
      DistrictId: "240",
    },
    {
      id: "08596",
      name: "Xã Văn Luông",
      DistrictId: "240",
    },
    {
      id: "08599",
      name: "Xã Xuân Sơn",
      DistrictId: "240",
    },
    {
      id: "08602",
      name: "Xã Cự Thắng",
      DistrictId: "238",
    },
    {
      id: "08605",
      name: "Xã Tất Thắng",
      DistrictId: "238",
    },
    {
      id: "08608",
      name: "Xã Long Cốc",
      DistrictId: "240",
    },
    {
      id: "08611",
      name: "Xã Văn Miếu",
      DistrictId: "238",
    },
    {
      id: "08614",
      name: "Xã Cự Đồng",
      DistrictId: "238",
    },
    {
      id: "08617",
      name: "Xã Kim Thượng",
      DistrictId: "240",
    },
    {
      id: "08620",
      name: "Xã Tam Thanh",
      DistrictId: "240",
    },
    {
      id: "08623",
      name: "Xã Thắng Sơn",
      DistrictId: "238",
    },
    {
      id: "08626",
      name: "Xã Vinh Tiền",
      DistrictId: "240",
    },
    {
      id: "08629",
      name: "Xã Tân Minh",
      DistrictId: "238",
    },
    {
      id: "08632",
      name: "Xã Hương Cần",
      DistrictId: "238",
    },
    {
      id: "08635",
      name: "Xã Khả Cửu",
      DistrictId: "238",
    },
    {
      id: "08638",
      name: "Xã Đông Cửu",
      DistrictId: "238",
    },
    {
      id: "08641",
      name: "Xã Tân Lập",
      DistrictId: "238",
    },
    {
      id: "08644",
      name: "Xã Yên Lãng",
      DistrictId: "238",
    },
    {
      id: "08647",
      name: "Xã Yên Lương",
      DistrictId: "238",
    },
    {
      id: "08650",
      name: "Xã Thượng Cửu",
      DistrictId: "238",
    },
    {
      id: "08653",
      name: "Xã Lương Nha",
      DistrictId: "238",
    },
    {
      id: "08656",
      name: "Xã Yên Sơn",
      DistrictId: "238",
    },
    {
      id: "08659",
      name: "Xã Tinh Nhuệ",
      DistrictId: "238",
    },
    {
      id: "08662",
      name: "Xã Đào Xá",
      DistrictId: "239",
    },
    {
      id: "08665",
      name: "Xã Thạch Đồng",
      DistrictId: "239",
    },
    {
      id: "08668",
      name: "Xã Xuân Lộc",
      DistrictId: "239",
    },
    {
      id: "08671",
      name: "Xã Tân Phương",
      DistrictId: "239",
    },
    {
      id: "08674",
      name: "Thị trấn Thanh Thủy",
      DistrictId: "239",
    },
    {
      id: "08677",
      name: "Xã Sơn Thủy",
      DistrictId: "239",
    },
    {
      id: "08680",
      name: "Xã Bảo Yên",
      DistrictId: "239",
    },
    {
      id: "08683",
      name: "Xã Đoan Hạ",
      DistrictId: "239",
    },
    {
      id: "08686",
      name: "Xã Đồng Trung",
      DistrictId: "239",
    },
    {
      id: "08689",
      name: "Xã Hoàng Xá",
      DistrictId: "239",
    },
    {
      id: "08701",
      name: "Xã Tu Vũ",
      DistrictId: "239",
    },
    {
      id: "08707",
      name: "Phường Tích Sơn",
      DistrictId: "243",
    },
    {
      id: "08710",
      name: "Phường Liên Bảo",
      DistrictId: "243",
    },
    {
      id: "08713",
      name: "Phường Hội Hợp",
      DistrictId: "243",
    },
    {
      id: "08716",
      name: "Phường Đống Đa",
      DistrictId: "243",
    },
    {
      id: "08719",
      name: "Phường Ngô Quyền",
      DistrictId: "243",
    },
    {
      id: "08722",
      name: "Phường Đồng Tâm",
      DistrictId: "243",
    },
    {
      id: "08725",
      name: "Xã Định Trung",
      DistrictId: "243",
    },
    {
      id: "08728",
      name: "Phường Khai Quang",
      DistrictId: "243",
    },
    {
      id: "08731",
      name: "Xã Thanh Trù",
      DistrictId: "243",
    },
    {
      id: "08734",
      name: "Phường Trưng Trắc",
      DistrictId: "244",
    },
    {
      id: "08737",
      name: "Phường Hùng Vương",
      DistrictId: "244",
    },
    {
      id: "08740",
      name: "Phường Trưng Nhị",
      DistrictId: "244",
    },
    {
      id: "08743",
      name: "Phường Phúc Thắng",
      DistrictId: "244",
    },
    {
      id: "08746",
      name: "Phường Xuân Hoà",
      DistrictId: "244",
    },
    {
      id: "08747",
      name: "Phường Đồng Xuân",
      DistrictId: "244",
    },
    {
      id: "08749",
      name: "Xã Ngọc Thanh",
      DistrictId: "244",
    },
    {
      id: "08752",
      name: "Xã Cao Minh",
      DistrictId: "244",
    },
    {
      id: "08755",
      name: "Phường Nam Viêm",
      DistrictId: "244",
    },
    {
      id: "08758",
      name: "Phường Tiền Châu",
      DistrictId: "244",
    },
    {
      id: "08761",
      name: "Thị trấn Lập Thạch",
      DistrictId: "246",
    },
    {
      id: "08764",
      name: "Xã Quang Sơn",
      DistrictId: "246",
    },
    {
      id: "08767",
      name: "Xã Ngọc Mỹ",
      DistrictId: "246",
    },
    {
      id: "08770",
      name: "Xã Hợp Lý",
      DistrictId: "246",
    },
    {
      id: "08773",
      name: "Xã Lãng Công",
      DistrictId: "253",
    },
    {
      id: "08776",
      name: "Xã Quang Yên",
      DistrictId: "253",
    },
    {
      id: "08779",
      name: "Xã Bạch Lưu",
      DistrictId: "253",
    },
    {
      id: "08782",
      name: "Xã Hải Lựu",
      DistrictId: "253",
    },
    {
      id: "08785",
      name: "Xã Bắc Bình",
      DistrictId: "246",
    },
    {
      id: "08788",
      name: "Xã Thái Hòa",
      DistrictId: "246",
    },
    {
      id: "08789",
      name: "Thị trấn Hoa Sơn",
      DistrictId: "246",
    },
    {
      id: "08791",
      name: "Xã Liễn Sơn",
      DistrictId: "246",
    },
    {
      id: "08794",
      name: "Xã Xuân Hòa",
      DistrictId: "246",
    },
    {
      id: "08797",
      name: "Xã Vân Trục",
      DistrictId: "246",
    },
    {
      id: "08800",
      name: "Xã Đồng Quế",
      DistrictId: "253",
    },
    {
      id: "08803",
      name: "Xã Nhân Đạo",
      DistrictId: "253",
    },
    {
      id: "08806",
      name: "Xã Đôn Nhân",
      DistrictId: "253",
    },
    {
      id: "08809",
      name: "Xã Phương Khoan",
      DistrictId: "253",
    },
    {
      id: "08812",
      name: "Xã Liên Hòa",
      DistrictId: "246",
    },
    {
      id: "08815",
      name: "Xã Tử Du",
      DistrictId: "246",
    },
    {
      id: "08818",
      name: "Xã Tân Lập",
      DistrictId: "253",
    },
    {
      id: "08821",
      name: "Xã Nhạo Sơn",
      DistrictId: "253",
    },
    {
      id: "08824",
      name: "Thị trấn Tam Sơn",
      DistrictId: "253",
    },
    {
      id: "08827",
      name: "Xã Như Thụy",
      DistrictId: "253",
    },
    {
      id: "08830",
      name: "Xã Yên Thạch",
      DistrictId: "253",
    },
    {
      id: "08833",
      name: "Xã Bàn Giản",
      DistrictId: "246",
    },
    {
      id: "08836",
      name: "Xã Xuân Lôi",
      DistrictId: "246",
    },
    {
      id: "08839",
      name: "Xã Đồng Ích",
      DistrictId: "246",
    },
    {
      id: "08842",
      name: "Xã Tiên Lữ",
      DistrictId: "246",
    },
    {
      id: "08845",
      name: "Xã Văn Quán",
      DistrictId: "246",
    },
    {
      id: "08848",
      name: "Xã Đồng Thịnh",
      DistrictId: "253",
    },
    {
      id: "08851",
      name: "Xã Tứ Yên",
      DistrictId: "253",
    },
    {
      id: "08854",
      name: "Xã Đức Bác",
      DistrictId: "253",
    },
    {
      id: "08857",
      name: "Xã Đình Chu",
      DistrictId: "246",
    },
    {
      id: "08860",
      name: "Xã Cao Phong",
      DistrictId: "253",
    },
    {
      id: "08863",
      name: "Xã Triệu Đề",
      DistrictId: "246",
    },
    {
      id: "08866",
      name: "Xã Sơn Đông",
      DistrictId: "246",
    },
    {
      id: "08869",
      name: "Thị trấn Hợp Hòa",
      DistrictId: "247",
    },
    {
      id: "08872",
      name: "Xã Hoàng Hoa",
      DistrictId: "247",
    },
    {
      id: "08875",
      name: "Xã Đồng Tĩnh",
      DistrictId: "247",
    },
    {
      id: "08878",
      name: "Xã Kim Long",
      DistrictId: "247",
    },
    {
      id: "08881",
      name: "Xã Hướng Đạo",
      DistrictId: "247",
    },
    {
      id: "08884",
      name: "Xã Đạo Tú",
      DistrictId: "247",
    },
    {
      id: "08887",
      name: "Xã An Hòa",
      DistrictId: "247",
    },
    {
      id: "08890",
      name: "Xã Thanh Vân",
      DistrictId: "247",
    },
    {
      id: "08893",
      name: "Xã Duy Phiên",
      DistrictId: "247",
    },
    {
      id: "08896",
      name: "Xã Hoàng Đan",
      DistrictId: "247",
    },
    {
      id: "08899",
      name: "Xã Hoàng Lâu",
      DistrictId: "247",
    },
    {
      id: "08902",
      name: "Xã Vân Hội",
      DistrictId: "247",
    },
    {
      id: "08905",
      name: "Xã Hợp Thịnh",
      DistrictId: "247",
    },
    {
      id: "08908",
      name: "Thị trấn Tam Đảo",
      DistrictId: "248",
    },
    {
      id: "08911",
      name: "Thị trấn Hợp Châu",
      DistrictId: "248",
    },
    {
      id: "08914",
      name: "Xã Đạo Trù",
      DistrictId: "248",
    },
    {
      id: "08917",
      name: "Xã Yên Dương",
      DistrictId: "248",
    },
    {
      id: "08920",
      name: "Xã Bồ Lý",
      DistrictId: "248",
    },
    {
      id: "08923",
      name: "Thị trấn Đại Đình",
      DistrictId: "248",
    },
    {
      id: "08926",
      name: "Xã Tam Quan",
      DistrictId: "248",
    },
    {
      id: "08929",
      name: "Xã Hồ Sơn",
      DistrictId: "248",
    },
    {
      id: "08932",
      name: "Xã Minh Quang",
      DistrictId: "248",
    },
    {
      id: "08935",
      name: "Thị trấn Hương Canh",
      DistrictId: "249",
    },
    {
      id: "08936",
      name: "Thị trấn Gia Khánh",
      DistrictId: "249",
    },
    {
      id: "08938",
      name: "Xã Trung Mỹ",
      DistrictId: "249",
    },
    {
      id: "08944",
      name: "Thị trấn Bá Hiến",
      DistrictId: "249",
    },
    {
      id: "08947",
      name: "Xã Thiện Kế",
      DistrictId: "249",
    },
    {
      id: "08950",
      name: "Xã Hương Sơn",
      DistrictId: "249",
    },
    {
      id: "08953",
      name: "Xã Tam Hợp",
      DistrictId: "249",
    },
    {
      id: "08956",
      name: "Xã Quất Lưu",
      DistrictId: "249",
    },
    {
      id: "08959",
      name: "Xã Sơn Lôi",
      DistrictId: "249",
    },
    {
      id: "08962",
      name: "Thị trấn Đạo Đức",
      DistrictId: "249",
    },
    {
      id: "08965",
      name: "Xã Tân Phong",
      DistrictId: "249",
    },
    {
      id: "08968",
      name: "Thị trấn Thanh Lãng",
      DistrictId: "249",
    },
    {
      id: "08971",
      name: "Xã Phú Xuân",
      DistrictId: "249",
    },
    {
      id: "08973",
      name: "Thị trấn Chi Đông",
      DistrictId: "250",
    },
    {
      id: "08974",
      name: "Xã Đại Thịnh",
      DistrictId: "250",
    },
    {
      id: "08977",
      name: "Xã Kim Hoa",
      DistrictId: "250",
    },
    {
      id: "08980",
      name: "Xã Thạch Đà",
      DistrictId: "250",
    },
    {
      id: "08983",
      name: "Xã Tiến Thắng",
      DistrictId: "250",
    },
    {
      id: "08986",
      name: "Xã Tự Lập",
      DistrictId: "250",
    },
    {
      id: "08989",
      name: "Thị trấn Quang Minh",
      DistrictId: "250",
    },
    {
      id: "08992",
      name: "Xã Thanh Lâm",
      DistrictId: "250",
    },
    {
      id: "08995",
      name: "Xã Tam Đồng",
      DistrictId: "250",
    },
    {
      id: "08998",
      name: "Xã Liên Mạc",
      DistrictId: "250",
    },
    {
      id: "09001",
      name: "Xã Vạn Yên",
      DistrictId: "250",
    },
    {
      id: "09004",
      name: "Xã Chu Phan",
      DistrictId: "250",
    },
    {
      id: "09007",
      name: "Xã Tiến Thịnh",
      DistrictId: "250",
    },
    {
      id: "09010",
      name: "Xã Mê Linh",
      DistrictId: "250",
    },
    {
      id: "09013",
      name: "Xã Văn Khê",
      DistrictId: "250",
    },
    {
      id: "09016",
      name: "Xã Hoàng Kim",
      DistrictId: "250",
    },
    {
      id: "09019",
      name: "Xã Tiền Phong",
      DistrictId: "250",
    },
    {
      id: "09022",
      name: "Xã Tráng Việt",
      DistrictId: "250",
    },
    {
      id: "09025",
      name: "Thị trấn Yên Lạc",
      DistrictId: "251",
    },
    {
      id: "09028",
      name: "Xã Đồng Cương",
      DistrictId: "251",
    },
    {
      id: "09031",
      name: "Xã Đồng Văn",
      DistrictId: "251",
    },
    {
      id: "09034",
      name: "Xã Bình Định",
      DistrictId: "251",
    },
    {
      id: "09037",
      name: "Xã Trung Nguyên",
      DistrictId: "251",
    },
    {
      id: "09040",
      name: "Xã Tề Lỗ",
      DistrictId: "251",
    },
    {
      id: "09043",
      name: "Xã Tam Hồng",
      DistrictId: "251",
    },
    {
      id: "09046",
      name: "Xã Yên Đồng",
      DistrictId: "251",
    },
    {
      id: "09049",
      name: "Xã Văn Tiến",
      DistrictId: "251",
    },
    {
      id: "09052",
      name: "Xã Nguyệt Đức",
      DistrictId: "251",
    },
    {
      id: "09055",
      name: "Xã Yên Phương",
      DistrictId: "251",
    },
    {
      id: "09058",
      name: "Xã Hồng Phương",
      DistrictId: "251",
    },
    {
      id: "09061",
      name: "Xã Trung Kiên",
      DistrictId: "251",
    },
    {
      id: "09064",
      name: "Xã Liên Châu",
      DistrictId: "251",
    },
    {
      id: "09067",
      name: "Xã Đại Tự",
      DistrictId: "251",
    },
    {
      id: "09070",
      name: "Xã Hồng Châu",
      DistrictId: "251",
    },
    {
      id: "09073",
      name: "Xã Trung Hà",
      DistrictId: "251",
    },
    {
      id: "09076",
      name: "Thị trấn Vĩnh Tường",
      DistrictId: "252",
    },
    {
      id: "09079",
      name: "Xã Kim Xá",
      DistrictId: "252",
    },
    {
      id: "09082",
      name: "Xã Yên Bình",
      DistrictId: "252",
    },
    {
      id: "09085",
      name: "Xã Chấn Hưng",
      DistrictId: "252",
    },
    {
      id: "09088",
      name: "Xã Nghĩa Hưng",
      DistrictId: "252",
    },
    {
      id: "09091",
      name: "Xã Yên Lập",
      DistrictId: "252",
    },
    {
      id: "09094",
      name: "Xã Việt Xuân",
      DistrictId: "252",
    },
    {
      id: "09097",
      name: "Xã Bồ Sao",
      DistrictId: "252",
    },
    {
      id: "09100",
      name: "Xã Đại Đồng",
      DistrictId: "252",
    },
    {
      id: "09103",
      name: "Xã Tân Tiến",
      DistrictId: "252",
    },
    {
      id: "09106",
      name: "Xã Lũng Hoà",
      DistrictId: "252",
    },
    {
      id: "09109",
      name: "Xã Cao Đại",
      DistrictId: "252",
    },
    {
      id: "09112",
      name: "Thị Trấn Thổ Tang",
      DistrictId: "252",
    },
    {
      id: "09115",
      name: "Xã Vĩnh Sơn",
      DistrictId: "252",
    },
    {
      id: "09118",
      name: "Xã Bình Dương",
      DistrictId: "252",
    },
    {
      id: "09124",
      name: "Xã Tân Phú",
      DistrictId: "252",
    },
    {
      id: "09127",
      name: "Xã Thượng Trưng",
      DistrictId: "252",
    },
    {
      id: "09130",
      name: "Xã Vũ Di",
      DistrictId: "252",
    },
    {
      id: "09133",
      name: "Xã Lý Nhân",
      DistrictId: "252",
    },
    {
      id: "09136",
      name: "Xã Tuân Chính",
      DistrictId: "252",
    },
    {
      id: "09139",
      name: "Xã Vân Xuân",
      DistrictId: "252",
    },
    {
      id: "09142",
      name: "Xã Tam Phúc",
      DistrictId: "252",
    },
    {
      id: "09145",
      name: "Thị trấn Tứ Trưng",
      DistrictId: "252",
    },
    {
      id: "09148",
      name: "Xã Ngũ Kiên",
      DistrictId: "252",
    },
    {
      id: "09151",
      name: "Xã An Tường",
      DistrictId: "252",
    },
    {
      id: "09154",
      name: "Xã Vĩnh Thịnh",
      DistrictId: "252",
    },
    {
      id: "09157",
      name: "Xã Phú Đa",
      DistrictId: "252",
    },
    {
      id: "09160",
      name: "Xã Vĩnh Ninh",
      DistrictId: "252",
    },
    {
      id: "09163",
      name: "Phường Vũ Ninh",
      DistrictId: "256",
    },
    {
      id: "09166",
      name: "Phường Đáp Cầu",
      DistrictId: "256",
    },
    {
      id: "09169",
      name: "Phường Thị Cầu",
      DistrictId: "256",
    },
    {
      id: "09172",
      name: "Phường Kinh Bắc",
      DistrictId: "256",
    },
    {
      id: "09175",
      name: "Phường Vệ An",
      DistrictId: "256",
    },
    {
      id: "09178",
      name: "Phường Tiền An",
      DistrictId: "256",
    },
    {
      id: "09181",
      name: "Phường Đại Phúc",
      DistrictId: "256",
    },
    {
      id: "09184",
      name: "Phường Ninh Xá",
      DistrictId: "256",
    },
    {
      id: "09187",
      name: "Phường Suối Hoa",
      DistrictId: "256",
    },
    {
      id: "09190",
      name: "Phường Võ Cường",
      DistrictId: "256",
    },
    {
      id: "09193",
      name: "Thị trấn Chờ",
      DistrictId: "258",
    },
    {
      id: "09196",
      name: "Xã Dũng Liệt",
      DistrictId: "258",
    },
    {
      id: "09199",
      name: "Xã Tam Đa",
      DistrictId: "258",
    },
    {
      id: "09202",
      name: "Xã Tam Giang",
      DistrictId: "258",
    },
    {
      id: "09205",
      name: "Xã Yên Trung",
      DistrictId: "258",
    },
    {
      id: "09208",
      name: "Xã Thụy Hòa",
      DistrictId: "258",
    },
    {
      id: "09211",
      name: "Xã Hòa Tiến",
      DistrictId: "258",
    },
    {
      id: "09214",
      name: "Phường Hòa Long",
      DistrictId: "256",
    },
    {
      id: "09217",
      name: "Xã Đông Tiến",
      DistrictId: "258",
    },
    {
      id: "09220",
      name: "Xã Yên Phụ",
      DistrictId: "258",
    },
    {
      id: "09223",
      name: "Xã Trung Nghĩa",
      DistrictId: "258",
    },
    {
      id: "09226",
      name: "Phường Vạn An",
      DistrictId: "256",
    },
    {
      id: "09229",
      name: "Xã Đông Phong",
      DistrictId: "258",
    },
    {
      id: "09232",
      name: "Xã Long Châu",
      DistrictId: "258",
    },
    {
      id: "09235",
      name: "Phường Khúc Xuyên",
      DistrictId: "256",
    },
    {
      id: "09238",
      name: "Xã Văn Môn",
      DistrictId: "258",
    },
    {
      id: "09241",
      name: "Xã Đông Thọ",
      DistrictId: "258",
    },
    {
      id: "09244",
      name: "Phường Phong Khê",
      DistrictId: "256",
    },
    {
      id: "09247",
      name: "Thị trấn Phố Mới",
      DistrictId: "259",
    },
    {
      id: "09250",
      name: "Xã Việt Thống",
      DistrictId: "259",
    },
    {
      id: "09253",
      name: "Xã Đại Xuân",
      DistrictId: "259",
    },
    {
      id: "09256",
      name: "Phường Kim Chân",
      DistrictId: "256",
    },
    {
      id: "09259",
      name: "Xã Nhân Hòa",
      DistrictId: "259",
    },
    {
      id: "09262",
      name: "Xã Bằng An",
      DistrictId: "259",
    },
    {
      id: "09265",
      name: "Xã Phương Liễu",
      DistrictId: "259",
    },
    {
      id: "09268",
      name: "Xã Quế Tân",
      DistrictId: "259",
    },
    {
      id: "09271",
      name: "Phường Vân Dương",
      DistrictId: "256",
    },
    {
      id: "09274",
      name: "Xã Phù Lương",
      DistrictId: "259",
    },
    {
      id: "09277",
      name: "Xã Phù Lãng",
      DistrictId: "259",
    },
    {
      id: "09280",
      name: "Xã Phượng Mao",
      DistrictId: "259",
    },
    {
      id: "09283",
      name: "Xã Việt Hùng",
      DistrictId: "259",
    },
    {
      id: "09286",
      name: "Phường Nam Sơn",
      DistrictId: "256",
    },
    {
      id: "09289",
      name: "Xã Ngọc Xá",
      DistrictId: "259",
    },
    {
      id: "09292",
      name: "Xã Châu Phong",
      DistrictId: "259",
    },
    {
      id: "09295",
      name: "Xã Bồng Lai",
      DistrictId: "259",
    },
    {
      id: "09298",
      name: "Xã Cách Bi",
      DistrictId: "259",
    },
    {
      id: "09301",
      name: "Xã Đào Viên",
      DistrictId: "259",
    },
    {
      id: "09304",
      name: "Xã Yên Giả",
      DistrictId: "259",
    },
    {
      id: "09307",
      name: "Xã Mộ Đạo",
      DistrictId: "259",
    },
    {
      id: "09310",
      name: "Xã Đức Long",
      DistrictId: "259",
    },
    {
      id: "09313",
      name: "Xã Chi Lăng",
      DistrictId: "259",
    },
    {
      id: "09316",
      name: "Xã Hán Quảng",
      DistrictId: "259",
    },
    {
      id: "09319",
      name: "Thị trấn Lim",
      DistrictId: "260",
    },
    {
      id: "09322",
      name: "Xã Phú Lâm",
      DistrictId: "260",
    },
    {
      id: "09325",
      name: "Phường Khắc Niệm",
      DistrictId: "256",
    },
    {
      id: "09328",
      name: "Xã Nội Duệ",
      DistrictId: "260",
    },
    {
      id: "09331",
      name: "Phường Hạp Lĩnh",
      DistrictId: "256",
    },
    {
      id: "09334",
      name: "Xã Liên Bão",
      DistrictId: "260",
    },
    {
      id: "09337",
      name: "Xã Hiên Vân",
      DistrictId: "260",
    },
    {
      id: "09340",
      name: "Xã Hoàn Sơn",
      DistrictId: "260",
    },
    {
      id: "09343",
      name: "Xã Lạc Vệ",
      DistrictId: "260",
    },
    {
      id: "09346",
      name: "Xã Việt Đoàn",
      DistrictId: "260",
    },
    {
      id: "09349",
      name: "Xã Phật Tích",
      DistrictId: "260",
    },
    {
      id: "09352",
      name: "Xã Tân Chi",
      DistrictId: "260",
    },
    {
      id: "09355",
      name: "Xã Đại Đồng",
      DistrictId: "260",
    },
    {
      id: "09358",
      name: "Xã Tri Phương",
      DistrictId: "260",
    },
    {
      id: "09361",
      name: "Xã Minh Đạo",
      DistrictId: "260",
    },
    {
      id: "09364",
      name: "Xã Cảnh Hưng",
      DistrictId: "260",
    },
    {
      id: "09367",
      name: "Phường Đông Ngàn",
      DistrictId: "261",
    },
    {
      id: "09370",
      name: "Phường Tam Sơn",
      DistrictId: "261",
    },
    {
      id: "09373",
      name: "Phường Hương Mạc",
      DistrictId: "261",
    },
    {
      id: "09376",
      name: "Phường Tương Giang",
      DistrictId: "261",
    },
    {
      id: "09379",
      name: "Phường Phù Khê",
      DistrictId: "261",
    },
    {
      id: "09382",
      name: "Phường Đồng Kỵ",
      DistrictId: "261",
    },
    {
      id: "09383",
      name: "Phường Trang Hạ",
      DistrictId: "261",
    },
    {
      id: "09385",
      name: "Phường Đồng Nguyên",
      DistrictId: "261",
    },
    {
      id: "09388",
      name: "Phường Châu Khê",
      DistrictId: "261",
    },
    {
      id: "09391",
      name: "Phường Tân Hồng",
      DistrictId: "261",
    },
    {
      id: "09394",
      name: "Phường Đình Bảng",
      DistrictId: "261",
    },
    {
      id: "09397",
      name: "Phường Phù Chẩn",
      DistrictId: "261",
    },
    {
      id: "09400",
      name: "Thị trấn Hồ",
      DistrictId: "262",
    },
    {
      id: "09403",
      name: "Xã Hoài Thượng",
      DistrictId: "262",
    },
    {
      id: "09406",
      name: "Xã Đại Đồng Thành",
      DistrictId: "262",
    },
    {
      id: "09409",
      name: "Xã Mão Điền",
      DistrictId: "262",
    },
    {
      id: "09412",
      name: "Xã Song Hồ",
      DistrictId: "262",
    },
    {
      id: "09415",
      name: "Xã Đình Tổ",
      DistrictId: "262",
    },
    {
      id: "09418",
      name: "Xã An Bình",
      DistrictId: "262",
    },
    {
      id: "09421",
      name: "Xã Trí Quả",
      DistrictId: "262",
    },
    {
      id: "09424",
      name: "Xã Gia Đông",
      DistrictId: "262",
    },
    {
      id: "09427",
      name: "Xã Thanh Khương",
      DistrictId: "262",
    },
    {
      id: "09430",
      name: "Xã Trạm Lộ",
      DistrictId: "262",
    },
    {
      id: "09433",
      name: "Xã Xuân Lâm",
      DistrictId: "262",
    },
    {
      id: "09436",
      name: "Xã Hà Mãn",
      DistrictId: "262",
    },
    {
      id: "09439",
      name: "Xã Ngũ Thái",
      DistrictId: "262",
    },
    {
      id: "09442",
      name: "Xã Nguyệt Đức",
      DistrictId: "262",
    },
    {
      id: "09445",
      name: "Xã Ninh Xá",
      DistrictId: "262",
    },
    {
      id: "09448",
      name: "Xã Nghĩa Đạo",
      DistrictId: "262",
    },
    {
      id: "09451",
      name: "Xã Song Liễu",
      DistrictId: "262",
    },
    {
      id: "09454",
      name: "Thị trấn Gia Bình",
      DistrictId: "263",
    },
    {
      id: "09457",
      name: "Xã Vạn Ninh",
      DistrictId: "263",
    },
    {
      id: "09460",
      name: "Xã Thái Bảo",
      DistrictId: "263",
    },
    {
      id: "09463",
      name: "Xã Giang Sơn",
      DistrictId: "263",
    },
    {
      id: "09466",
      name: "Xã Cao Đức",
      DistrictId: "263",
    },
    {
      id: "09469",
      name: "Xã Đại Lai",
      DistrictId: "263",
    },
    {
      id: "09472",
      name: "Xã Song Giang",
      DistrictId: "263",
    },
    {
      id: "09475",
      name: "Xã Bình Dương",
      DistrictId: "263",
    },
    {
      id: "09478",
      name: "Xã Lãng Ngâm",
      DistrictId: "263",
    },
    {
      id: "09481",
      name: "Xã Nhân Thắng",
      DistrictId: "263",
    },
    {
      id: "09484",
      name: "Xã Xuân Lai",
      DistrictId: "263",
    },
    {
      id: "09487",
      name: "Xã Đông Cứu",
      DistrictId: "263",
    },
    {
      id: "09490",
      name: "Xã Đại Bái",
      DistrictId: "263",
    },
    {
      id: "09493",
      name: "Xã Quỳnh Phú",
      DistrictId: "263",
    },
    {
      id: "09496",
      name: "Thị trấn Thứa",
      DistrictId: "264",
    },
    {
      id: "09499",
      name: "Xã An Thịnh",
      DistrictId: "264",
    },
    {
      id: "09502",
      name: "Xã Trung Kênh",
      DistrictId: "264",
    },
    {
      id: "09505",
      name: "Xã Phú Hòa",
      DistrictId: "264",
    },
    {
      id: "09508",
      name: "Xã Mỹ Hương",
      DistrictId: "264",
    },
    {
      id: "09511",
      name: "Xã Tân Lãng",
      DistrictId: "264",
    },
    {
      id: "09514",
      name: "Xã Quảng Phú",
      DistrictId: "264",
    },
    {
      id: "09517",
      name: "Xã Trừng Xá",
      DistrictId: "264",
    },
    {
      id: "09520",
      name: "Xã Lai Hạ",
      DistrictId: "264",
    },
    {
      id: "09523",
      name: "Xã Trung Chính",
      DistrictId: "264",
    },
    {
      id: "09526",
      name: "Xã Minh Tân",
      DistrictId: "264",
    },
    {
      id: "09529",
      name: "Xã Bình Định",
      DistrictId: "264",
    },
    {
      id: "09532",
      name: "Xã Phú Lương",
      DistrictId: "264",
    },
    {
      id: "09535",
      name: "Xã Lâm Thao",
      DistrictId: "264",
    },
    {
      id: "09538",
      name: "Phường Nguyễn Trãi",
      DistrictId: "268",
    },
    {
      id: "09541",
      name: "Phường Mộ Lao",
      DistrictId: "268",
    },
    {
      id: "09542",
      name: "Phường Văn Quán",
      DistrictId: "268",
    },
    {
      id: "09544",
      name: "Phường Vạn Phúc",
      DistrictId: "268",
    },
    {
      id: "09547",
      name: "Phường Yết Kiêu",
      DistrictId: "268",
    },
    {
      id: "09550",
      name: "Phường Quang Trung",
      DistrictId: "268",
    },
    {
      id: "09551",
      name: "Phường La Khê",
      DistrictId: "268",
    },
    {
      id: "09552",
      name: "Phường Phú La",
      DistrictId: "268",
    },
    {
      id: "09553",
      name: "Phường Phúc La",
      DistrictId: "268",
    },
    {
      id: "09556",
      name: "Phường Hà Cầu",
      DistrictId: "268",
    },
    {
      id: "09562",
      name: "Phường Yên Nghĩa",
      DistrictId: "268",
    },
    {
      id: "09565",
      name: "Phường Kiến Hưng",
      DistrictId: "268",
    },
    {
      id: "09568",
      name: "Phường Phú Lãm",
      DistrictId: "268",
    },
    {
      id: "09571",
      name: "Phường Phú Lương",
      DistrictId: "268",
    },
    {
      id: "09574",
      name: "Phường Lê Lợi",
      DistrictId: "269",
    },
    {
      id: "09577",
      name: "Phường Phú Thịnh",
      DistrictId: "269",
    },
    {
      id: "09580",
      name: "Phường Ngô Quyền",
      DistrictId: "269",
    },
    {
      id: "09583",
      name: "Phường Quang Trung",
      DistrictId: "269",
    },
    {
      id: "09586",
      name: "Phường Sơn Lộc",
      DistrictId: "269",
    },
    {
      id: "09589",
      name: "Phường Xuân Khanh",
      DistrictId: "269",
    },
    {
      id: "09592",
      name: "Xã Đường Lâm",
      DistrictId: "269",
    },
    {
      id: "09595",
      name: "Phường Viên Sơn",
      DistrictId: "269",
    },
    {
      id: "09598",
      name: "Xã Xuân Sơn",
      DistrictId: "269",
    },
    {
      id: "09601",
      name: "Phường Trung Hưng",
      DistrictId: "269",
    },
    {
      id: "09604",
      name: "Xã Thanh Mỹ",
      DistrictId: "269",
    },
    {
      id: "09607",
      name: "Phường Trung Sơn Trầm",
      DistrictId: "269",
    },
    {
      id: "09610",
      name: "Xã Kim Sơn",
      DistrictId: "269",
    },
    {
      id: "09613",
      name: "Xã Sơn Đông",
      DistrictId: "269",
    },
    {
      id: "09616",
      name: "Xã Cổ Đông",
      DistrictId: "269",
    },
    {
      id: "09619",
      name: "Thị trấn Tây Đằng",
      DistrictId: "271",
    },
    {
      id: "09625",
      name: "Xã Phú Cường",
      DistrictId: "271",
    },
    {
      id: "09628",
      name: "Xã Cổ Đô",
      DistrictId: "271",
    },
    {
      id: "09631",
      name: "Xã Tản Hồng",
      DistrictId: "271",
    },
    {
      id: "09634",
      name: "Xã Vạn Thắng",
      DistrictId: "271",
    },
    {
      id: "09637",
      name: "Xã Châu Sơn",
      DistrictId: "271",
    },
    {
      id: "09640",
      name: "Xã Phong Vân",
      DistrictId: "271",
    },
    {
      id: "09643",
      name: "Xã Phú Đông",
      DistrictId: "271",
    },
    {
      id: "09646",
      name: "Xã Phú Phương",
      DistrictId: "271",
    },
    {
      id: "09649",
      name: "Xã Phú Châu",
      DistrictId: "271",
    },
    {
      id: "09652",
      name: "Xã Thái Hòa",
      DistrictId: "271",
    },
    {
      id: "09655",
      name: "Xã Đồng Thái",
      DistrictId: "271",
    },
    {
      id: "09658",
      name: "Xã Phú Sơn",
      DistrictId: "271",
    },
    {
      id: "09661",
      name: "Xã Minh Châu",
      DistrictId: "271",
    },
    {
      id: "09664",
      name: "Xã Vật Lại",
      DistrictId: "271",
    },
    {
      id: "09667",
      name: "Xã Chu Minh",
      DistrictId: "271",
    },
    {
      id: "09670",
      name: "Xã Tòng Bạt",
      DistrictId: "271",
    },
    {
      id: "09673",
      name: "Xã Cẩm Lĩnh",
      DistrictId: "271",
    },
    {
      id: "09676",
      name: "Xã Sơn Đà",
      DistrictId: "271",
    },
    {
      id: "09679",
      name: "Xã Đông Quang",
      DistrictId: "271",
    },
    {
      id: "09682",
      name: "Xã Tiên Phong",
      DistrictId: "271",
    },
    {
      id: "09685",
      name: "Xã Thụy An",
      DistrictId: "271",
    },
    {
      id: "09688",
      name: "Xã Cam Thượng",
      DistrictId: "271",
    },
    {
      id: "09691",
      name: "Xã Thuần Mỹ",
      DistrictId: "271",
    },
    {
      id: "09694",
      name: "Xã Tản Lĩnh",
      DistrictId: "271",
    },
    {
      id: "09697",
      name: "Xã Ba Trại",
      DistrictId: "271",
    },
    {
      id: "09700",
      name: "Xã Minh Quang",
      DistrictId: "271",
    },
    {
      id: "09703",
      name: "Xã Ba Vì",
      DistrictId: "271",
    },
    {
      id: "09706",
      name: "Xã Vân Hòa",
      DistrictId: "271",
    },
    {
      id: "09709",
      name: "Xã Yên Bài",
      DistrictId: "271",
    },
    {
      id: "09712",
      name: "Xã Khánh Thượng",
      DistrictId: "271",
    },
    {
      id: "09715",
      name: "Thị trấn Phúc Thọ",
      DistrictId: "272",
    },
    {
      id: "09718",
      name: "Xã Vân Hà",
      DistrictId: "272",
    },
    {
      id: "09721",
      name: "Xã Vân Phúc",
      DistrictId: "272",
    },
    {
      id: "09724",
      name: "Xã Vân Nam",
      DistrictId: "272",
    },
    {
      id: "09727",
      name: "Xã Xuân Đình",
      DistrictId: "272",
    },
    {
      id: "09733",
      name: "Xã Sen Phương",
      DistrictId: "272",
    },
    {
      id: "09739",
      name: "Xã Võng Xuyên",
      DistrictId: "272",
    },
    {
      id: "09742",
      name: "Xã Thọ Lộc",
      DistrictId: "272",
    },
    {
      id: "09745",
      name: "Xã Long Xuyên",
      DistrictId: "272",
    },
    {
      id: "09748",
      name: "Xã Thượng Cốc",
      DistrictId: "272",
    },
    {
      id: "09751",
      name: "Xã Hát Môn",
      DistrictId: "272",
    },
    {
      id: "09754",
      name: "Xã Tích Giang",
      DistrictId: "272",
    },
    {
      id: "09757",
      name: "Xã Thanh Đa",
      DistrictId: "272",
    },
    {
      id: "09760",
      name: "Xã Trạch Mỹ Lộc",
      DistrictId: "272",
    },
    {
      id: "09763",
      name: "Xã Phúc Hòa",
      DistrictId: "272",
    },
    {
      id: "09766",
      name: "Xã Ngọc Tảo",
      DistrictId: "272",
    },
    {
      id: "09769",
      name: "Xã Phụng Thượng",
      DistrictId: "272",
    },
    {
      id: "09772",
      name: "Xã Tam Thuấn",
      DistrictId: "272",
    },
    {
      id: "09775",
      name: "Xã Tam Hiệp",
      DistrictId: "272",
    },
    {
      id: "09778",
      name: "Xã Hiệp Thuận",
      DistrictId: "272",
    },
    {
      id: "09781",
      name: "Xã Liên Hiệp",
      DistrictId: "272",
    },
    {
      id: "09784",
      name: "Thị trấn Phùng",
      DistrictId: "273",
    },
    {
      id: "09787",
      name: "Xã Trung Châu",
      DistrictId: "273",
    },
    {
      id: "09790",
      name: "Xã Thọ An",
      DistrictId: "273",
    },
    {
      id: "09793",
      name: "Xã Thọ Xuân",
      DistrictId: "273",
    },
    {
      id: "09796",
      name: "Xã Hồng Hà",
      DistrictId: "273",
    },
    {
      id: "09799",
      name: "Xã Liên Hồng",
      DistrictId: "273",
    },
    {
      id: "09802",
      name: "Xã Liên Hà",
      DistrictId: "273",
    },
    {
      id: "09805",
      name: "Xã Hạ Mỗ",
      DistrictId: "273",
    },
    {
      id: "09808",
      name: "Xã Liên Trung",
      DistrictId: "273",
    },
    {
      id: "09811",
      name: "Xã Phương Đình",
      DistrictId: "273",
    },
    {
      id: "09814",
      name: "Xã Thượng Mỗ",
      DistrictId: "273",
    },
    {
      id: "09817",
      name: "Xã Tân Hội",
      DistrictId: "273",
    },
    {
      id: "09820",
      name: "Xã Tân Lập",
      DistrictId: "273",
    },
    {
      id: "09823",
      name: "Xã Đan Phượng",
      DistrictId: "273",
    },
    {
      id: "09826",
      name: "Xã Đồng Tháp",
      DistrictId: "273",
    },
    {
      id: "09829",
      name: "Xã Song Phượng",
      DistrictId: "273",
    },
    {
      id: "09832",
      name: "Thị trấn Trạm Trôi",
      DistrictId: "274",
    },
    {
      id: "09835",
      name: "Xã Đức Thượng",
      DistrictId: "274",
    },
    {
      id: "09838",
      name: "Xã Minh Khai",
      DistrictId: "274",
    },
    {
      id: "09841",
      name: "Xã Dương Liễu",
      DistrictId: "274",
    },
    {
      id: "09844",
      name: "Xã Di Trạch",
      DistrictId: "274",
    },
    {
      id: "09847",
      name: "Xã Đức Giang",
      DistrictId: "274",
    },
    {
      id: "09850",
      name: "Xã Cát Quế",
      DistrictId: "274",
    },
    {
      id: "09853",
      name: "Xã Kim Chung",
      DistrictId: "274",
    },
    {
      id: "09856",
      name: "Xã Yên Sở",
      DistrictId: "274",
    },
    {
      id: "09859",
      name: "Xã Sơn Đồng",
      DistrictId: "274",
    },
    {
      id: "09862",
      name: "Xã Vân Canh",
      DistrictId: "274",
    },
    {
      id: "09865",
      name: "Xã Đắc Sở",
      DistrictId: "274",
    },
    {
      id: "09868",
      name: "Xã Lại Yên",
      DistrictId: "274",
    },
    {
      id: "09871",
      name: "Xã Tiền Yên",
      DistrictId: "274",
    },
    {
      id: "09874",
      name: "Xã Song Phương",
      DistrictId: "274",
    },
    {
      id: "09877",
      name: "Xã An Khánh",
      DistrictId: "274",
    },
    {
      id: "09880",
      name: "Xã An Thượng",
      DistrictId: "274",
    },
    {
      id: "09883",
      name: "Xã Vân Côn",
      DistrictId: "274",
    },
    {
      id: "09886",
      name: "Phường Dương Nội",
      DistrictId: "268",
    },
    {
      id: "09889",
      name: "Xã La Phù",
      DistrictId: "274",
    },
    {
      id: "09892",
      name: "Xã Đông La",
      DistrictId: "274",
    },
    {
      id: "09895",
      name: "Thị trấn Quốc Oai",
      DistrictId: "275",
    },
    {
      id: "09898",
      name: "Xã Sài Sơn",
      DistrictId: "275",
    },
    {
      id: "09901",
      name: "Xã Phượng Cách",
      DistrictId: "275",
    },
    {
      id: "09904",
      name: "Xã Yên Sơn",
      DistrictId: "275",
    },
    {
      id: "09907",
      name: "Xã Ngọc Liệp",
      DistrictId: "275",
    },
    {
      id: "09910",
      name: "Xã Ngọc Mỹ",
      DistrictId: "275",
    },
    {
      id: "09913",
      name: "Xã Liệp Tuyết",
      DistrictId: "275",
    },
    {
      id: "09916",
      name: "Xã Thạch Thán",
      DistrictId: "275",
    },
    {
      id: "09919",
      name: "Xã Đồng Quang",
      DistrictId: "275",
    },
    {
      id: "09922",
      name: "Xã Phú Cát",
      DistrictId: "275",
    },
    {
      id: "09925",
      name: "Xã Tuyết Nghĩa",
      DistrictId: "275",
    },
    {
      id: "09928",
      name: "Xã Nghĩa Hương",
      DistrictId: "275",
    },
    {
      id: "09931",
      name: "Xã Cộng Hòa",
      DistrictId: "275",
    },
    {
      id: "09934",
      name: "Xã Tân Phú",
      DistrictId: "275",
    },
    {
      id: "09937",
      name: "Xã Đại Thành",
      DistrictId: "275",
    },
    {
      id: "09940",
      name: "Xã Phú Mãn",
      DistrictId: "275",
    },
    {
      id: "09943",
      name: "Xã Cấn Hữu",
      DistrictId: "275",
    },
    {
      id: "09946",
      name: "Xã Tân Hòa",
      DistrictId: "275",
    },
    {
      id: "09949",
      name: "Xã Hòa Thạch",
      DistrictId: "275",
    },
    {
      id: "09952",
      name: "Xã Đông Yên",
      DistrictId: "275",
    },
    {
      id: "09955",
      name: "Thị trấn Liên Quan",
      DistrictId: "276",
    },
    {
      id: "09958",
      name: "Xã Đại Đồng",
      DistrictId: "276",
    },
    {
      id: "09961",
      name: "Xã Cẩm Yên",
      DistrictId: "276",
    },
    {
      id: "09964",
      name: "Xã Lại Thượng",
      DistrictId: "276",
    },
    {
      id: "09967",
      name: "Xã Phú Kim",
      DistrictId: "276",
    },
    {
      id: "09970",
      name: "Xã Hương Ngải",
      DistrictId: "276",
    },
    {
      id: "09973",
      name: "Xã Canh Nậu",
      DistrictId: "276",
    },
    {
      id: "09976",
      name: "Xã Kim Quan",
      DistrictId: "276",
    },
    {
      id: "09979",
      name: "Xã Dị Nậu",
      DistrictId: "276",
    },
    {
      id: "09982",
      name: "Xã Bình Yên",
      DistrictId: "276",
    },
    {
      id: "09985",
      name: "Xã Chàng Sơn",
      DistrictId: "276",
    },
    {
      id: "09988",
      name: "Xã Thạch Hoà",
      DistrictId: "276",
    },
    {
      id: "09991",
      name: "Xã Cần Kiệm",
      DistrictId: "276",
    },
    {
      id: "09994",
      name: "Xã Hữu Bằng",
      DistrictId: "276",
    },
    {
      id: "09997",
      name: "Xã Phùng Xá",
      DistrictId: "276",
    },
    {
      id: "10000",
      name: "Xã Tân Xã",
      DistrictId: "276",
    },
    {
      id: "10003",
      name: "Xã Thạch Xá",
      DistrictId: "276",
    },
    {
      id: "10006",
      name: "Xã Bình Phú",
      DistrictId: "276",
    },
    {
      id: "10009",
      name: "Xã Hạ Bằng",
      DistrictId: "276",
    },
    {
      id: "10012",
      name: "Xã Đồng Trúc",
      DistrictId: "276",
    },
    {
      id: "10015",
      name: "Thị trấn Chúc Sơn",
      DistrictId: "277",
    },
    {
      id: "10018",
      name: "Thị trấn Xuân Mai",
      DistrictId: "277",
    },
    {
      id: "10021",
      name: "Xã Phụng Châu",
      DistrictId: "277",
    },
    {
      id: "10024",
      name: "Xã Tiên Phương",
      DistrictId: "277",
    },
    {
      id: "10027",
      name: "Xã Đông Sơn",
      DistrictId: "277",
    },
    {
      id: "10030",
      name: "Xã Đông Phương Yên",
      DistrictId: "277",
    },
    {
      id: "10033",
      name: "Xã Phú Nghĩa",
      DistrictId: "277",
    },
    {
      id: "10039",
      name: "Xã Trường Yên",
      DistrictId: "277",
    },
    {
      id: "10042",
      name: "Xã Ngọc Hòa",
      DistrictId: "277",
    },
    {
      id: "10045",
      name: "Xã Thủy Xuân Tiên",
      DistrictId: "277",
    },
    {
      id: "10048",
      name: "Xã Thanh Bình",
      DistrictId: "277",
    },
    {
      id: "10051",
      name: "Xã Trung Hòa",
      DistrictId: "277",
    },
    {
      id: "10054",
      name: "Xã Đại Yên",
      DistrictId: "277",
    },
    {
      id: "10057",
      name: "Xã Thụy Hương",
      DistrictId: "277",
    },
    {
      id: "10060",
      name: "Xã Tốt Động",
      DistrictId: "277",
    },
    {
      id: "10063",
      name: "Xã Lam Điền",
      DistrictId: "277",
    },
    {
      id: "10066",
      name: "Xã Tân Tiến",
      DistrictId: "277",
    },
    {
      id: "10069",
      name: "Xã Nam Phương Tiến",
      DistrictId: "277",
    },
    {
      id: "10072",
      name: "Xã Hợp Đồng",
      DistrictId: "277",
    },
    {
      id: "10075",
      name: "Xã Hoàng Văn Thụ",
      DistrictId: "277",
    },
    {
      id: "10078",
      name: "Xã Hoàng Diệu",
      DistrictId: "277",
    },
    {
      id: "10081",
      name: "Xã Hữu Văn",
      DistrictId: "277",
    },
    {
      id: "10084",
      name: "Xã Quảng Bị",
      DistrictId: "277",
    },
    {
      id: "10087",
      name: "Xã Mỹ Lương",
      DistrictId: "277",
    },
    {
      id: "10090",
      name: "Xã Thượng Vực",
      DistrictId: "277",
    },
    {
      id: "10093",
      name: "Xã Hồng Phong",
      DistrictId: "277",
    },
    {
      id: "10096",
      name: "Xã Đồng Phú",
      DistrictId: "277",
    },
    {
      id: "10099",
      name: "Xã Trần Phú",
      DistrictId: "277",
    },
    {
      id: "10102",
      name: "Xã Văn Võ",
      DistrictId: "277",
    },
    {
      id: "10105",
      name: "Xã Đồng Lạc",
      DistrictId: "277",
    },
    {
      id: "10108",
      name: "Xã Hòa Chính",
      DistrictId: "277",
    },
    {
      id: "10111",
      name: "Xã Phú Nam An",
      DistrictId: "277",
    },
    {
      id: "10114",
      name: "Thị trấn Kim Bài",
      DistrictId: "278",
    },
    {
      id: "10117",
      name: "Phường Đồng Mai",
      DistrictId: "268",
    },
    {
      id: "10120",
      name: "Xã Cự Khê",
      DistrictId: "278",
    },
    {
      id: "10123",
      name: "Phường Biên Giang",
      DistrictId: "268",
    },
    {
      id: "10126",
      name: "Xã Bích Hòa",
      DistrictId: "278",
    },
    {
      id: "10129",
      name: "Xã Mỹ Hưng",
      DistrictId: "278",
    },
    {
      id: "10132",
      name: "Xã Cao Viên",
      DistrictId: "278",
    },
    {
      id: "10135",
      name: "Xã Bình Minh",
      DistrictId: "278",
    },
    {
      id: "10138",
      name: "Xã Tam Hưng",
      DistrictId: "278",
    },
    {
      id: "10141",
      name: "Xã Thanh Cao",
      DistrictId: "278",
    },
    {
      id: "10144",
      name: "Xã Thanh Thùy",
      DistrictId: "278",
    },
    {
      id: "10147",
      name: "Xã Thanh Mai",
      DistrictId: "278",
    },
    {
      id: "10150",
      name: "Xã Thanh Văn",
      DistrictId: "278",
    },
    {
      id: "10153",
      name: "Xã Đỗ Động",
      DistrictId: "278",
    },
    {
      id: "10156",
      name: "Xã Kim An",
      DistrictId: "278",
    },
    {
      id: "10159",
      name: "Xã Kim Thư",
      DistrictId: "278",
    },
    {
      id: "10162",
      name: "Xã Phương Trung",
      DistrictId: "278",
    },
    {
      id: "10165",
      name: "Xã Tân Ước",
      DistrictId: "278",
    },
    {
      id: "10168",
      name: "Xã Dân Hòa",
      DistrictId: "278",
    },
    {
      id: "10171",
      name: "Xã Liên Châu",
      DistrictId: "278",
    },
    {
      id: "10174",
      name: "Xã Cao Dương",
      DistrictId: "278",
    },
    {
      id: "10177",
      name: "Xã Xuân Dương",
      DistrictId: "278",
    },
    {
      id: "10180",
      name: "Xã Hồng Dương",
      DistrictId: "278",
    },
    {
      id: "10183",
      name: "Thị trấn Thường Tín",
      DistrictId: "279",
    },
    {
      id: "10186",
      name: "Xã Ninh Sở",
      DistrictId: "279",
    },
    {
      id: "10189",
      name: "Xã Nhị Khê",
      DistrictId: "279",
    },
    {
      id: "10192",
      name: "Xã Duyên Thái",
      DistrictId: "279",
    },
    {
      id: "10195",
      name: "Xã Khánh Hà",
      DistrictId: "279",
    },
    {
      id: "10198",
      name: "Xã Hòa Bình",
      DistrictId: "279",
    },
    {
      id: "10201",
      name: "Xã Văn Bình",
      DistrictId: "279",
    },
    {
      id: "10204",
      name: "Xã Hiền Giang",
      DistrictId: "279",
    },
    {
      id: "10207",
      name: "Xã Hồng Vân",
      DistrictId: "279",
    },
    {
      id: "10210",
      name: "Xã Vân Tảo",
      DistrictId: "279",
    },
    {
      id: "10213",
      name: "Xã Liên Phương",
      DistrictId: "279",
    },
    {
      id: "10216",
      name: "Xã Văn Phú",
      DistrictId: "279",
    },
    {
      id: "10219",
      name: "Xã Tự Nhiên",
      DistrictId: "279",
    },
    {
      id: "10222",
      name: "Xã Tiền Phong",
      DistrictId: "279",
    },
    {
      id: "10225",
      name: "Xã Hà Hồi",
      DistrictId: "279",
    },
    {
      id: "10228",
      name: "Xã Thư Phú",
      DistrictId: "279",
    },
    {
      id: "10231",
      name: "Xã Nguyễn Trãi",
      DistrictId: "279",
    },
    {
      id: "10234",
      name: "Xã Quất Động",
      DistrictId: "279",
    },
    {
      id: "10237",
      name: "Xã Chương Dương",
      DistrictId: "279",
    },
    {
      id: "10240",
      name: "Xã Tân Minh",
      DistrictId: "279",
    },
    {
      id: "10243",
      name: "Xã Lê Lợi",
      DistrictId: "279",
    },
    {
      id: "10246",
      name: "Xã Thắng Lợi",
      DistrictId: "279",
    },
    {
      id: "10249",
      name: "Xã Dũng Tiến",
      DistrictId: "279",
    },
    {
      id: "10252",
      name: "Xã Thống Nhất",
      DistrictId: "279",
    },
    {
      id: "10255",
      name: "Xã Nghiêm Xuyên",
      DistrictId: "279",
    },
    {
      id: "10258",
      name: "Xã Tô Hiệu",
      DistrictId: "279",
    },
    {
      id: "10261",
      name: "Xã Văn Tự",
      DistrictId: "279",
    },
    {
      id: "10264",
      name: "Xã Vạn Điểm",
      DistrictId: "279",
    },
    {
      id: "10267",
      name: "Xã Minh Cường",
      DistrictId: "279",
    },
    {
      id: "10270",
      name: "Thị trấn Phú Minh",
      DistrictId: "280",
    },
    {
      id: "10273",
      name: "Thị trấn Phú Xuyên",
      DistrictId: "280",
    },
    {
      id: "10276",
      name: "Xã Hồng Minh",
      DistrictId: "280",
    },
    {
      id: "10279",
      name: "Xã Phượng Dực",
      DistrictId: "280",
    },
    {
      id: "10282",
      name: "Xã Nam Tiến",
      DistrictId: "280",
    },
    {
      id: "10288",
      name: "Xã Tri Trung",
      DistrictId: "280",
    },
    {
      id: "10291",
      name: "Xã Đại Thắng",
      DistrictId: "280",
    },
    {
      id: "10294",
      name: "Xã Phú Túc",
      DistrictId: "280",
    },
    {
      id: "10297",
      name: "Xã Văn Hoàng",
      DistrictId: "280",
    },
    {
      id: "10300",
      name: "Xã Hồng Thái",
      DistrictId: "280",
    },
    {
      id: "10303",
      name: "Xã Hoàng Long",
      DistrictId: "280",
    },
    {
      id: "10306",
      name: "Xã Quang Trung",
      DistrictId: "280",
    },
    {
      id: "10309",
      name: "Xã Nam Phong",
      DistrictId: "280",
    },
    {
      id: "10312",
      name: "Xã Nam Triều",
      DistrictId: "280",
    },
    {
      id: "10315",
      name: "Xã Tân Dân",
      DistrictId: "280",
    },
    {
      id: "10318",
      name: "Xã Sơn Hà",
      DistrictId: "280",
    },
    {
      id: "10321",
      name: "Xã Chuyên Mỹ",
      DistrictId: "280",
    },
    {
      id: "10324",
      name: "Xã Khai Thái",
      DistrictId: "280",
    },
    {
      id: "10327",
      name: "Xã Phúc Tiến",
      DistrictId: "280",
    },
    {
      id: "10330",
      name: "Xã Vân Từ",
      DistrictId: "280",
    },
    {
      id: "10333",
      name: "Xã Tri Thủy",
      DistrictId: "280",
    },
    {
      id: "10336",
      name: "Xã Đại Xuyên",
      DistrictId: "280",
    },
    {
      id: "10339",
      name: "Xã Phú Yên",
      DistrictId: "280",
    },
    {
      id: "10342",
      name: "Xã Bạch Hạ",
      DistrictId: "280",
    },
    {
      id: "10345",
      name: "Xã Quang Lãng",
      DistrictId: "280",
    },
    {
      id: "10348",
      name: "Xã Châu Can",
      DistrictId: "280",
    },
    {
      id: "10351",
      name: "Xã Minh Tân",
      DistrictId: "280",
    },
    {
      id: "10354",
      name: "Thị trấn Vân Đình",
      DistrictId: "281",
    },
    {
      id: "10357",
      name: "Xã Viên An",
      DistrictId: "281",
    },
    {
      id: "10360",
      name: "Xã Viên Nội",
      DistrictId: "281",
    },
    {
      id: "10363",
      name: "Xã Hoa Sơn",
      DistrictId: "281",
    },
    {
      id: "10366",
      name: "Xã Quảng Phú Cầu",
      DistrictId: "281",
    },
    {
      id: "10369",
      name: "Xã Trường Thịnh",
      DistrictId: "281",
    },
    {
      id: "10372",
      name: "Xã Cao Thành",
      DistrictId: "281",
    },
    {
      id: "10375",
      name: "Xã Liên Bạt",
      DistrictId: "281",
    },
    {
      id: "10378",
      name: "Xã Sơn Công",
      DistrictId: "281",
    },
    {
      id: "10381",
      name: "Xã Đồng Tiến",
      DistrictId: "281",
    },
    {
      id: "10384",
      name: "Xã Phương Tú",
      DistrictId: "281",
    },
    {
      id: "10387",
      name: "Xã Trung Tú",
      DistrictId: "281",
    },
    {
      id: "10390",
      name: "Xã Đồng Tân",
      DistrictId: "281",
    },
    {
      id: "10393",
      name: "Xã Tảo Dương Văn",
      DistrictId: "281",
    },
    {
      id: "10396",
      name: "Xã Vạn Thái",
      DistrictId: "281",
    },
    {
      id: "10399",
      name: "Xã Minh Đức",
      DistrictId: "281",
    },
    {
      id: "10402",
      name: "Xã Hòa Lâm",
      DistrictId: "281",
    },
    {
      id: "10405",
      name: "Xã Hòa Xá",
      DistrictId: "281",
    },
    {
      id: "10408",
      name: "Xã Trầm Lộng",
      DistrictId: "281",
    },
    {
      id: "10411",
      name: "Xã Kim Đường",
      DistrictId: "281",
    },
    {
      id: "10414",
      name: "Xã Hòa Nam",
      DistrictId: "281",
    },
    {
      id: "10417",
      name: "Xã Hòa Phú",
      DistrictId: "281",
    },
    {
      id: "10420",
      name: "Xã Đội Bình",
      DistrictId: "281",
    },
    {
      id: "10423",
      name: "Xã Đại Hùng",
      DistrictId: "281",
    },
    {
      id: "10426",
      name: "Xã Đông Lỗ",
      DistrictId: "281",
    },
    {
      id: "10429",
      name: "Xã Phù Lưu",
      DistrictId: "281",
    },
    {
      id: "10432",
      name: "Xã Đại Cường",
      DistrictId: "281",
    },
    {
      id: "10435",
      name: "Xã Lưu Hoàng",
      DistrictId: "281",
    },
    {
      id: "10438",
      name: "Xã Hồng Quang",
      DistrictId: "281",
    },
    {
      id: "10441",
      name: "Thị trấn Đại Nghĩa",
      DistrictId: "282",
    },
    {
      id: "10444",
      name: "Xã Đồng Tâm",
      DistrictId: "282",
    },
    {
      id: "10447",
      name: "Xã Thượng Lâm",
      DistrictId: "282",
    },
    {
      id: "10450",
      name: "Xã Tuy Lai",
      DistrictId: "282",
    },
    {
      id: "10453",
      name: "Xã Phúc Lâm",
      DistrictId: "282",
    },
    {
      id: "10456",
      name: "Xã Mỹ Thành",
      DistrictId: "282",
    },
    {
      id: "10459",
      name: "Xã Bột Xuyên",
      DistrictId: "282",
    },
    {
      id: "10462",
      name: "Xã An Mỹ",
      DistrictId: "282",
    },
    {
      id: "10465",
      name: "Xã Hồng Sơn",
      DistrictId: "282",
    },
    {
      id: "10468",
      name: "Xã Lê Thanh",
      DistrictId: "282",
    },
    {
      id: "10471",
      name: "Xã Xuy Xá",
      DistrictId: "282",
    },
    {
      id: "10474",
      name: "Xã Phùng Xá",
      DistrictId: "282",
    },
    {
      id: "10477",
      name: "Xã Phù Lưu Tế",
      DistrictId: "282",
    },
    {
      id: "10480",
      name: "Xã Đại Hưng",
      DistrictId: "282",
    },
    {
      id: "10483",
      name: "Xã Vạn Kim",
      DistrictId: "282",
    },
    {
      id: "10486",
      name: "Xã Đốc Tín",
      DistrictId: "282",
    },
    {
      id: "10489",
      name: "Xã Hương Sơn",
      DistrictId: "282",
    },
    {
      id: "10492",
      name: "Xã Hùng Tiến",
      DistrictId: "282",
    },
    {
      id: "10495",
      name: "Xã An Tiến",
      DistrictId: "282",
    },
    {
      id: "10498",
      name: "Xã Hợp Tiến",
      DistrictId: "282",
    },
    {
      id: "10501",
      name: "Xã Hợp Thanh",
      DistrictId: "282",
    },
    {
      id: "10504",
      name: "Xã An Phú",
      DistrictId: "282",
    },
    {
      id: "10507",
      name: "Phường Cẩm Thượng",
      DistrictId: "288",
    },
    {
      id: "10510",
      name: "Phường Bình Hàn",
      DistrictId: "288",
    },
    {
      id: "10513",
      name: "Phường Ngọc Châu",
      DistrictId: "288",
    },
    {
      id: "10514",
      name: "Phường Nhị Châu",
      DistrictId: "288",
    },
    {
      id: "10516",
      name: "Phường Quang Trung",
      DistrictId: "288",
    },
    {
      id: "10519",
      name: "Phường Nguyễn Trãi",
      DistrictId: "288",
    },
    {
      id: "10522",
      name: "Phường Phạm Ngũ Lão",
      DistrictId: "288",
    },
    {
      id: "10525",
      name: "Phường Trần Hưng Đạo",
      DistrictId: "288",
    },
    {
      id: "10528",
      name: "Phường Trần Phú",
      DistrictId: "288",
    },
    {
      id: "10531",
      name: "Phường Thanh Bình",
      DistrictId: "288",
    },
    {
      id: "10532",
      name: "Phường Tân Bình",
      DistrictId: "288",
    },
    {
      id: "10534",
      name: "Phường Lê Thanh Nghị",
      DistrictId: "288",
    },
    {
      id: "10537",
      name: "Phường Hải Tân",
      DistrictId: "288",
    },
    {
      id: "10540",
      name: "Phường Tứ Minh",
      DistrictId: "288",
    },
    {
      id: "10543",
      name: "Phường Việt Hoà",
      DistrictId: "288",
    },
    {
      id: "10546",
      name: "Phường Phả Lại",
      DistrictId: "290",
    },
    {
      id: "10549",
      name: "Phường Sao Đỏ",
      DistrictId: "290",
    },
    {
      id: "10552",
      name: "Phường Bến Tắm",
      DistrictId: "290",
    },
    {
      id: "10555",
      name: "Xã Hoàng Hoa Thám",
      DistrictId: "290",
    },
    {
      id: "10558",
      name: "Xã Bắc An",
      DistrictId: "290",
    },
    {
      id: "10561",
      name: "Xã Hưng Đạo",
      DistrictId: "290",
    },
    {
      id: "10564",
      name: "Xã Lê Lợi",
      DistrictId: "290",
    },
    {
      id: "10567",
      name: "Phường Hoàng Tiến",
      DistrictId: "290",
    },
    {
      id: "10570",
      name: "Phường Cộng Hoà",
      DistrictId: "290",
    },
    {
      id: "10573",
      name: "Phường Hoàng Tân",
      DistrictId: "290",
    },
    {
      id: "10576",
      name: "Phường Cổ Thành",
      DistrictId: "290",
    },
    {
      id: "10579",
      name: "Phường Văn An",
      DistrictId: "290",
    },
    {
      id: "10582",
      name: "Phường Chí Minh",
      DistrictId: "290",
    },
    {
      id: "10585",
      name: "Phường Văn Đức",
      DistrictId: "290",
    },
    {
      id: "10588",
      name: "Phường Thái Học",
      DistrictId: "290",
    },
    {
      id: "10591",
      name: "Xã Nhân Huệ",
      DistrictId: "290",
    },
    {
      id: "10594",
      name: "Phường An Lạc",
      DistrictId: "290",
    },
    {
      id: "10600",
      name: "Phường Đồng Lạc",
      DistrictId: "290",
    },
    {
      id: "10603",
      name: "Phường Tân Dân",
      DistrictId: "290",
    },
    {
      id: "10606",
      name: "Thị trấn Nam Sách",
      DistrictId: "291",
    },
    {
      id: "10609",
      name: "Xã Nam Hưng",
      DistrictId: "291",
    },
    {
      id: "10612",
      name: "Xã Nam Tân",
      DistrictId: "291",
    },
    {
      id: "10615",
      name: "Xã Hợp Tiến",
      DistrictId: "291",
    },
    {
      id: "10618",
      name: "Xã Hiệp Cát",
      DistrictId: "291",
    },
    {
      id: "10621",
      name: "Xã Thanh Quang",
      DistrictId: "291",
    },
    {
      id: "10624",
      name: "Xã Quốc Tuấn",
      DistrictId: "291",
    },
    {
      id: "10627",
      name: "Xã Nam Chính",
      DistrictId: "291",
    },
    {
      id: "10630",
      name: "Xã An Bình",
      DistrictId: "291",
    },
    {
      id: "10633",
      name: "Xã Nam Trung",
      DistrictId: "291",
    },
    {
      id: "10636",
      name: "Xã An Sơn",
      DistrictId: "291",
    },
    {
      id: "10639",
      name: "Xã Cộng Hòa",
      DistrictId: "291",
    },
    {
      id: "10642",
      name: "Xã Thái Tân",
      DistrictId: "291",
    },
    {
      id: "10645",
      name: "Xã An Lâm",
      DistrictId: "291",
    },
    {
      id: "10648",
      name: "Xã Phú Điền",
      DistrictId: "291",
    },
    {
      id: "10651",
      name: "Xã Nam Hồng",
      DistrictId: "291",
    },
    {
      id: "10654",
      name: "Xã Hồng Phong",
      DistrictId: "291",
    },
    {
      id: "10657",
      name: "Xã Đồng Lạc",
      DistrictId: "291",
    },
    {
      id: "10660",
      name: "Phường Ái Quốc",
      DistrictId: "288",
    },
    {
      id: "10663",
      name: "Xã An Thượng",
      DistrictId: "288",
    },
    {
      id: "10666",
      name: "Xã Minh Tân",
      DistrictId: "291",
    },
    {
      id: "10672",
      name: "Phường Nam Đồng",
      DistrictId: "288",
    },
    {
      id: "10675",
      name: "Phường An Lưu",
      DistrictId: "292",
    },
    {
      id: "10678",
      name: "Xã Bạch Đằng",
      DistrictId: "292",
    },
    {
      id: "10681",
      name: "Phường Thất Hùng",
      DistrictId: "292",
    },
    {
      id: "10684",
      name: "Xã Lê Ninh",
      DistrictId: "292",
    },
    {
      id: "10687",
      name: "Xã Hoành Sơn",
      DistrictId: "292",
    },
    {
      id: "10693",
      name: "Phường Phạm Thái",
      DistrictId: "292",
    },
    {
      id: "10696",
      name: "Phường Duy Tân",
      DistrictId: "292",
    },
    {
      id: "10699",
      name: "Phường Tân Dân",
      DistrictId: "292",
    },
    {
      id: "10702",
      name: "Phường Minh Tân",
      DistrictId: "292",
    },
    {
      id: "10705",
      name: "Xã Quang Thành",
      DistrictId: "292",
    },
    {
      id: "10708",
      name: "Xã Hiệp Hòa",
      DistrictId: "292",
    },
    {
      id: "10714",
      name: "Phường Phú Thứ",
      DistrictId: "292",
    },
    {
      id: "10717",
      name: "Xã Thăng Long",
      DistrictId: "292",
    },
    {
      id: "10720",
      name: "Xã Lạc Long",
      DistrictId: "292",
    },
    {
      id: "10723",
      name: "Phường An Sinh",
      DistrictId: "292",
    },
    {
      id: "10726",
      name: "Phường Hiệp Sơn",
      DistrictId: "292",
    },
    {
      id: "10729",
      name: "Xã Thượng Quận",
      DistrictId: "292",
    },
    {
      id: "10732",
      name: "Phường An Phụ",
      DistrictId: "292",
    },
    {
      id: "10735",
      name: "Phường Hiệp An",
      DistrictId: "292",
    },
    {
      id: "10738",
      name: "Phường Long Xuyên",
      DistrictId: "292",
    },
    {
      id: "10741",
      name: "Phường Thái Thịnh",
      DistrictId: "292",
    },
    {
      id: "10744",
      name: "Phường Hiến Thành",
      DistrictId: "292",
    },
    {
      id: "10747",
      name: "Xã Minh Hòa",
      DistrictId: "292",
    },
    {
      id: "10750",
      name: "Thị trấn Phú Thái",
      DistrictId: "293",
    },
    {
      id: "10753",
      name: "Xã Lai Vu",
      DistrictId: "293",
    },
    {
      id: "10756",
      name: "Xã Cộng Hòa",
      DistrictId: "293",
    },
    {
      id: "10759",
      name: "Xã Thượng Vũ",
      DistrictId: "293",
    },
    {
      id: "10762",
      name: "Xã Cổ Dũng",
      DistrictId: "293",
    },
    {
      id: "10768",
      name: "Xã Tuấn Việt",
      DistrictId: "293",
    },
    {
      id: "10771",
      name: "Xã Kim Xuyên",
      DistrictId: "293",
    },
    {
      id: "10774",
      name: "Xã Phúc Thành A",
      DistrictId: "293",
    },
    {
      id: "10777",
      name: "Xã Ngũ Phúc",
      DistrictId: "293",
    },
    {
      id: "10780",
      name: "Xã Kim Anh",
      DistrictId: "293",
    },
    {
      id: "10783",
      name: "Xã Kim Liên",
      DistrictId: "293",
    },
    {
      id: "10786",
      name: "Xã Kim Tân",
      DistrictId: "293",
    },
    {
      id: "10792",
      name: "Xã Kim Đính",
      DistrictId: "293",
    },
    {
      id: "10798",
      name: "Xã Bình Dân",
      DistrictId: "293",
    },
    {
      id: "10801",
      name: "Xã Tam Kỳ",
      DistrictId: "293",
    },
    {
      id: "10804",
      name: "Xã Đồng Cẩm",
      DistrictId: "293",
    },
    {
      id: "10807",
      name: "Xã Liên Hòa",
      DistrictId: "293",
    },
    {
      id: "10810",
      name: "Xã Đại Đức",
      DistrictId: "293",
    },
    {
      id: "10813",
      name: "Thị trấn Thanh Hà",
      DistrictId: "294",
    },
    {
      id: "10816",
      name: "Xã Hồng Lạc",
      DistrictId: "294",
    },
    {
      id: "10819",
      name: "Xã Việt Hồng",
      DistrictId: "294",
    },
    {
      id: "10822",
      name: "Xã Quyết Thắng",
      DistrictId: "288",
    },
    {
      id: "10825",
      name: "Xã Tân Việt",
      DistrictId: "294",
    },
    {
      id: "10828",
      name: "Xã Cẩm Chế",
      DistrictId: "294",
    },
    {
      id: "10831",
      name: "Xã Thanh An",
      DistrictId: "294",
    },
    {
      id: "10834",
      name: "Xã Thanh Lang",
      DistrictId: "294",
    },
    {
      id: "10837",
      name: "Xã Tiền Tiến",
      DistrictId: "288",
    },
    {
      id: "10840",
      name: "Xã Tân An",
      DistrictId: "294",
    },
    {
      id: "10843",
      name: "Xã Liên Mạc",
      DistrictId: "294",
    },
    {
      id: "10846",
      name: "Xã Thanh Hải",
      DistrictId: "294",
    },
    {
      id: "10849",
      name: "Xã Thanh Khê",
      DistrictId: "294",
    },
    {
      id: "10852",
      name: "Xã Thanh Xá",
      DistrictId: "294",
    },
    {
      id: "10855",
      name: "Xã Thanh Xuân",
      DistrictId: "294",
    },
    {
      id: "10861",
      name: "Xã Thanh Thủy",
      DistrictId: "294",
    },
    {
      id: "10864",
      name: "Xã An Phượng",
      DistrictId: "294",
    },
    {
      id: "10867",
      name: "Xã Thanh Sơn",
      DistrictId: "294",
    },
    {
      id: "10876",
      name: "Xã Thanh Quang",
      DistrictId: "294",
    },
    {
      id: "10879",
      name: "Xã Thanh Hồng",
      DistrictId: "294",
    },
    {
      id: "10882",
      name: "Xã Thanh Cường",
      DistrictId: "294",
    },
    {
      id: "10885",
      name: "Xã Vĩnh Lập",
      DistrictId: "294",
    },
    {
      id: "10888",
      name: "Thị trấn Cẩm Giang",
      DistrictId: "295",
    },
    {
      id: "10891",
      name: "Thị trấn Lai Cách",
      DistrictId: "295",
    },
    {
      id: "10894",
      name: "Xã Cẩm Hưng",
      DistrictId: "295",
    },
    {
      id: "10897",
      name: "Xã Cẩm Hoàng",
      DistrictId: "295",
    },
    {
      id: "10900",
      name: "Xã Cẩm Văn",
      DistrictId: "295",
    },
    {
      id: "10903",
      name: "Xã Ngọc Liên",
      DistrictId: "295",
    },
    {
      id: "10906",
      name: "Xã Thạch Lỗi",
      DistrictId: "295",
    },
    {
      id: "10909",
      name: "Xã Cẩm Vũ",
      DistrictId: "295",
    },
    {
      id: "10912",
      name: "Xã Đức Chính",
      DistrictId: "295",
    },
    {
      id: "10918",
      name: "Xã Định Sơn",
      DistrictId: "295",
    },
    {
      id: "10924",
      name: "Xã Lương Điền",
      DistrictId: "295",
    },
    {
      id: "10927",
      name: "Xã Cao An",
      DistrictId: "295",
    },
    {
      id: "10930",
      name: "Xã Tân Trường",
      DistrictId: "295",
    },
    {
      id: "10933",
      name: "Xã Cẩm Phúc",
      DistrictId: "295",
    },
    {
      id: "10936",
      name: "Xã Cẩm Điền",
      DistrictId: "295",
    },
    {
      id: "10939",
      name: "Xã Cẩm Đông",
      DistrictId: "295",
    },
    {
      id: "10942",
      name: "Xã Cẩm Đoài",
      DistrictId: "295",
    },
    {
      id: "10945",
      name: "Thị trấn Kẻ Sặt",
      DistrictId: "296",
    },
    {
      id: "10951",
      name: "Xã Vĩnh Hưng",
      DistrictId: "296",
    },
    {
      id: "10954",
      name: "Xã Hùng Thắng",
      DistrictId: "296",
    },
    {
      id: "10960",
      name: "Xã Vĩnh Hồng",
      DistrictId: "296",
    },
    {
      id: "10963",
      name: "Xã Long Xuyên",
      DistrictId: "296",
    },
    {
      id: "10966",
      name: "Xã Tân Việt",
      DistrictId: "296",
    },
    {
      id: "10969",
      name: "Xã Thúc Kháng",
      DistrictId: "296",
    },
    {
      id: "10972",
      name: "Xã Tân Hồng",
      DistrictId: "296",
    },
    {
      id: "10975",
      name: "Xã Bình Minh",
      DistrictId: "296",
    },
    {
      id: "10978",
      name: "Xã Hồng Khê",
      DistrictId: "296",
    },
    {
      id: "10981",
      name: "Xã Thái Học",
      DistrictId: "296",
    },
    {
      id: "10984",
      name: "Xã Cổ Bì",
      DistrictId: "296",
    },
    {
      id: "10987",
      name: "Xã Nhân Quyền",
      DistrictId: "296",
    },
    {
      id: "10990",
      name: "Xã Thái Dương",
      DistrictId: "296",
    },
    {
      id: "10993",
      name: "Xã Thái Hòa",
      DistrictId: "296",
    },
    {
      id: "10996",
      name: "Xã Bình Xuyên",
      DistrictId: "296",
    },
    {
      id: "10999",
      name: "Thị trấn Gia Lộc",
      DistrictId: "297",
    },
    {
      id: "11002",
      name: "Phường Thạch Khôi",
      DistrictId: "288",
    },
    {
      id: "11005",
      name: "Xã Liên Hồng",
      DistrictId: "288",
    },
    {
      id: "11008",
      name: "Xã Thống Nhất",
      DistrictId: "297",
    },
    {
      id: "11011",
      name: "Phường Tân Hưng",
      DistrictId: "288",
    },
    {
      id: "11017",
      name: "Xã Gia Xuyên",
      DistrictId: "288",
    },
    {
      id: "11020",
      name: "Xã Yết Kiêu",
      DistrictId: "297",
    },
    {
      id: "11029",
      name: "Xã Gia Tân",
      DistrictId: "297",
    },
    {
      id: "11032",
      name: "Xã Tân Tiến",
      DistrictId: "297",
    },
    {
      id: "11035",
      name: "Xã Gia Khánh",
      DistrictId: "297",
    },
    {
      id: "11038",
      name: "Xã Gia Lương",
      DistrictId: "297",
    },
    {
      id: "11041",
      name: "Xã Lê Lợi",
      DistrictId: "297",
    },
    {
      id: "11044",
      name: "Xã Toàn Thắng",
      DistrictId: "297",
    },
    {
      id: "11047",
      name: "Xã Hoàng Diệu",
      DistrictId: "297",
    },
    {
      id: "11050",
      name: "Xã Hồng Hưng",
      DistrictId: "297",
    },
    {
      id: "11053",
      name: "Xã Phạm Trấn",
      DistrictId: "297",
    },
    {
      id: "11056",
      name: "Xã Đoàn Thượng",
      DistrictId: "297",
    },
    {
      id: "11059",
      name: "Xã Thống Kênh",
      DistrictId: "297",
    },
    {
      id: "11062",
      name: "Xã Quang Minh",
      DistrictId: "297",
    },
    {
      id: "11065",
      name: "Xã Đồng Quang",
      DistrictId: "297",
    },
    {
      id: "11068",
      name: "Xã Nhật Tân",
      DistrictId: "297",
    },
    {
      id: "11071",
      name: "Xã Đức Xương",
      DistrictId: "297",
    },
    {
      id: "11074",
      name: "Thị trấn Tứ Kỳ",
      DistrictId: "298",
    },
    {
      id: "11077",
      name: "Xã Ngọc Sơn",
      DistrictId: "288",
    },
    {
      id: "11083",
      name: "Xã Đại Sơn",
      DistrictId: "298",
    },
    {
      id: "11086",
      name: "Xã Hưng Đạo",
      DistrictId: "298",
    },
    {
      id: "11089",
      name: "Xã Ngọc Kỳ",
      DistrictId: "298",
    },
    {
      id: "11092",
      name: "Xã Bình Lăng",
      DistrictId: "298",
    },
    {
      id: "11095",
      name: "Xã Chí Minh",
      DistrictId: "298",
    },
    {
      id: "11098",
      name: "Xã Tái Sơn",
      DistrictId: "298",
    },
    {
      id: "11101",
      name: "Xã Quang Phục",
      DistrictId: "298",
    },
    {
      id: "11110",
      name: "Xã Dân Chủ",
      DistrictId: "298",
    },
    {
      id: "11113",
      name: "Xã Tân Kỳ",
      DistrictId: "298",
    },
    {
      id: "11116",
      name: "Xã Quang Khải",
      DistrictId: "298",
    },
    {
      id: "11119",
      name: "Xã Đại Hợp",
      DistrictId: "298",
    },
    {
      id: "11122",
      name: "Xã Quảng Nghiệp",
      DistrictId: "298",
    },
    {
      id: "11125",
      name: "Xã An Thanh",
      DistrictId: "298",
    },
    {
      id: "11128",
      name: "Xã Minh Đức",
      DistrictId: "298",
    },
    {
      id: "11131",
      name: "Xã Văn Tố",
      DistrictId: "298",
    },
    {
      id: "11134",
      name: "Xã Quang Trung",
      DistrictId: "298",
    },
    {
      id: "11137",
      name: "Xã Phượng Kỳ",
      DistrictId: "298",
    },
    {
      id: "11140",
      name: "Xã Cộng Lạc",
      DistrictId: "298",
    },
    {
      id: "11143",
      name: "Xã Tiên Động",
      DistrictId: "298",
    },
    {
      id: "11146",
      name: "Xã Nguyên Giáp",
      DistrictId: "298",
    },
    {
      id: "11149",
      name: "Xã Hà Kỳ",
      DistrictId: "298",
    },
    {
      id: "11152",
      name: "Xã Hà Thanh",
      DistrictId: "298",
    },
    {
      id: "11155",
      name: "Thị trấn Ninh Giang",
      DistrictId: "299",
    },
    {
      id: "11161",
      name: "Xã Ứng Hoè",
      DistrictId: "299",
    },
    {
      id: "11164",
      name: "Xã Nghĩa An",
      DistrictId: "299",
    },
    {
      id: "11167",
      name: "Xã Hồng Đức",
      DistrictId: "299",
    },
    {
      id: "11173",
      name: "Xã An Đức",
      DistrictId: "299",
    },
    {
      id: "11176",
      name: "Xã Vạn Phúc",
      DistrictId: "299",
    },
    {
      id: "11179",
      name: "Xã Tân Hương",
      DistrictId: "299",
    },
    {
      id: "11185",
      name: "Xã Vĩnh Hòa",
      DistrictId: "299",
    },
    {
      id: "11188",
      name: "Xã Đông Xuyên",
      DistrictId: "299",
    },
    {
      id: "11197",
      name: "Xã Tân Phong",
      DistrictId: "299",
    },
    {
      id: "11200",
      name: "Xã Ninh Hải",
      DistrictId: "299",
    },
    {
      id: "11203",
      name: "Xã Đồng Tâm",
      DistrictId: "299",
    },
    {
      id: "11206",
      name: "Xã Tân Quang",
      DistrictId: "299",
    },
    {
      id: "11209",
      name: "Xã Kiến Quốc",
      DistrictId: "299",
    },
    {
      id: "11215",
      name: "Xã Hồng Dụ",
      DistrictId: "299",
    },
    {
      id: "11218",
      name: "Xã Văn Hội",
      DistrictId: "299",
    },
    {
      id: "11224",
      name: "Xã Hồng Phong",
      DistrictId: "299",
    },
    {
      id: "11227",
      name: "Xã Hiệp Lực",
      DistrictId: "299",
    },
    {
      id: "11230",
      name: "Xã Hồng Phúc",
      DistrictId: "299",
    },
    {
      id: "11233",
      name: "Xã Hưng Long",
      DistrictId: "299",
    },
    {
      id: "11239",
      name: "Thị trấn Thanh Miện",
      DistrictId: "300",
    },
    {
      id: "11242",
      name: "Xã Thanh Tùng",
      DistrictId: "300",
    },
    {
      id: "11245",
      name: "Xã Phạm Kha",
      DistrictId: "300",
    },
    {
      id: "11248",
      name: "Xã Ngô Quyền",
      DistrictId: "300",
    },
    {
      id: "11251",
      name: "Xã Đoàn Tùng",
      DistrictId: "300",
    },
    {
      id: "11254",
      name: "Xã Hồng Quang",
      DistrictId: "300",
    },
    {
      id: "11257",
      name: "Xã Tân Trào",
      DistrictId: "300",
    },
    {
      id: "11260",
      name: "Xã Lam Sơn",
      DistrictId: "300",
    },
    {
      id: "11263",
      name: "Xã Đoàn Kết",
      DistrictId: "300",
    },
    {
      id: "11266",
      name: "Xã Lê Hồng",
      DistrictId: "300",
    },
    {
      id: "11269",
      name: "Xã Tứ Cường",
      DistrictId: "300",
    },
    {
      id: "11275",
      name: "Xã Ngũ Hùng",
      DistrictId: "300",
    },
    {
      id: "11278",
      name: "Xã Cao Thắng",
      DistrictId: "300",
    },
    {
      id: "11281",
      name: "Xã Chi Lăng Bắc",
      DistrictId: "300",
    },
    {
      id: "11284",
      name: "Xã Chi Lăng Nam",
      DistrictId: "300",
    },
    {
      id: "11287",
      name: "Xã Thanh Giang",
      DistrictId: "300",
    },
    {
      id: "11293",
      name: "Xã Hồng Phong",
      DistrictId: "300",
    },
    {
      id: "11296",
      name: "Phường Quán Toan",
      DistrictId: "303",
    },
    {
      id: "11299",
      name: "Phường Hùng Vương",
      DistrictId: "303",
    },
    {
      id: "11302",
      name: "Phường Sở Dầu",
      DistrictId: "303",
    },
    {
      id: "11305",
      name: "Phường Thượng Lý",
      DistrictId: "303",
    },
    {
      id: "11308",
      name: "Phường Hạ Lý",
      DistrictId: "303",
    },
    {
      id: "11311",
      name: "Phường Minh Khai",
      DistrictId: "303",
    },
    {
      id: "11314",
      name: "Phường Trại Chuối",
      DistrictId: "303",
    },
    {
      id: "11320",
      name: "Phường Hoàng Văn Thụ",
      DistrictId: "303",
    },
    {
      id: "11323",
      name: "Phường Phan Bội Châu",
      DistrictId: "303",
    },
    {
      id: "11329",
      name: "Phường Máy Chai",
      DistrictId: "304",
    },
    {
      id: "11332",
      name: "Phường Máy Tơ",
      DistrictId: "304",
    },
    {
      id: "11335",
      name: "Phường Vạn Mỹ",
      DistrictId: "304",
    },
    {
      id: "11338",
      name: "Phường Cầu Tre",
      DistrictId: "304",
    },
    {
      id: "11341",
      name: "Phường Lạc Viên",
      DistrictId: "304",
    },
    {
      id: "11344",
      name: "Phường Cầu Đất",
      DistrictId: "304",
    },
    {
      id: "11347",
      name: "Phường Gia Viên",
      DistrictId: "304",
    },
    {
      id: "11350",
      name: "Phường Đông Khê",
      DistrictId: "304",
    },
    {
      id: "11356",
      name: "Phường Lê Lợi",
      DistrictId: "304",
    },
    {
      id: "11359",
      name: "Phường Đằng Giang",
      DistrictId: "304",
    },
    {
      id: "11362",
      name: "Phường Lạch Tray",
      DistrictId: "304",
    },
    {
      id: "11365",
      name: "Phường Đổng Quốc Bình",
      DistrictId: "304",
    },
    {
      id: "11368",
      name: "Phường Cát Dài",
      DistrictId: "305",
    },
    {
      id: "11371",
      name: "Phường An Biên",
      DistrictId: "305",
    },
    {
      id: "11374",
      name: "Phường Lam Sơn",
      DistrictId: "305",
    },
    {
      id: "11377",
      name: "Phường An Dương",
      DistrictId: "305",
    },
    {
      id: "11380",
      name: "Phường Trần Nguyên Hãn",
      DistrictId: "305",
    },
    {
      id: "11383",
      name: "Phường Hồ Nam",
      DistrictId: "305",
    },
    {
      id: "11386",
      name: "Phường Trại Cau",
      DistrictId: "305",
    },
    {
      id: "11389",
      name: "Phường Dư Hàng",
      DistrictId: "305",
    },
    {
      id: "11392",
      name: "Phường Hàng Kênh",
      DistrictId: "305",
    },
    {
      id: "11395",
      name: "Phường Đông Hải",
      DistrictId: "305",
    },
    {
      id: "11398",
      name: "Phường Niệm Nghĩa",
      DistrictId: "305",
    },
    {
      id: "11401",
      name: "Phường Nghĩa Xá",
      DistrictId: "305",
    },
    {
      id: "11404",
      name: "Phường Dư Hàng Kênh",
      DistrictId: "305",
    },
    {
      id: "11405",
      name: "Phường Kênh Dương",
      DistrictId: "305",
    },
    {
      id: "11407",
      name: "Phường Vĩnh Niệm",
      DistrictId: "305",
    },
    {
      id: "11410",
      name: "Phường Đông Hải 1",
      DistrictId: "306",
    },
    {
      id: "11411",
      name: "Phường Đông Hải 2",
      DistrictId: "306",
    },
    {
      id: "11413",
      name: "Phường Đằng Lâm",
      DistrictId: "306",
    },
    {
      id: "11414",
      name: "Phường Thành Tô",
      DistrictId: "306",
    },
    {
      id: "11416",
      name: "Phường Đằng Hải",
      DistrictId: "306",
    },
    {
      id: "11419",
      name: "Phường Nam Hải",
      DistrictId: "306",
    },
    {
      id: "11422",
      name: "Phường Cát Bi",
      DistrictId: "306",
    },
    {
      id: "11425",
      name: "Phường Tràng Cát",
      DistrictId: "306",
    },
    {
      id: "11428",
      name: "Phường Quán Trữ",
      DistrictId: "307",
    },
    {
      id: "11429",
      name: "Phường Lãm Hà",
      DistrictId: "307",
    },
    {
      id: "11431",
      name: "Phường Đồng Hoà",
      DistrictId: "307",
    },
    {
      id: "11434",
      name: "Phường Bắc Sơn",
      DistrictId: "307",
    },
    {
      id: "11437",
      name: "Phường Nam Sơn",
      DistrictId: "307",
    },
    {
      id: "11440",
      name: "Phường Ngọc Sơn",
      DistrictId: "307",
    },
    {
      id: "11443",
      name: "Phường Trần Thành Ngọ",
      DistrictId: "307",
    },
    {
      id: "11446",
      name: "Phường Văn Đẩu",
      DistrictId: "307",
    },
    {
      id: "11449",
      name: "Phường Phù Liễn",
      DistrictId: "307",
    },
    {
      id: "11452",
      name: "Phường Tràng Minh",
      DistrictId: "307",
    },
    {
      id: "11455",
      name: "Phường Ngọc Xuyên",
      DistrictId: "308",
    },
    {
      id: "11458",
      name: "Phường Hải Sơn",
      DistrictId: "308",
    },
    {
      id: "11461",
      name: "Phường Vạn Hương",
      DistrictId: "308",
    },
    {
      id: "11465",
      name: "Phường Minh Đức",
      DistrictId: "308",
    },
    {
      id: "11467",
      name: "Phường Bàng La",
      DistrictId: "308",
    },
    {
      id: "11470",
      name: "Thị trấn Núi Đèo",
      DistrictId: "311",
    },
    {
      id: "11473",
      name: "Thị trấn Minh Đức",
      DistrictId: "311",
    },
    {
      id: "11476",
      name: "Xã Lại Xuân",
      DistrictId: "311",
    },
    {
      id: "11479",
      name: "Xã An Sơn",
      DistrictId: "311",
    },
    {
      id: "11482",
      name: "Xã Kỳ Sơn",
      DistrictId: "311",
    },
    {
      id: "11485",
      name: "Xã Liên Khê",
      DistrictId: "311",
    },
    {
      id: "11488",
      name: "Xã Lưu Kiếm",
      DistrictId: "311",
    },
    {
      id: "11491",
      name: "Xã Lưu Kỳ",
      DistrictId: "311",
    },
    {
      id: "11494",
      name: "Xã Gia Minh",
      DistrictId: "311",
    },
    {
      id: "11497",
      name: "Xã Gia Đức",
      DistrictId: "311",
    },
    {
      id: "11500",
      name: "Xã Minh Tân",
      DistrictId: "311",
    },
    {
      id: "11503",
      name: "Xã Phù Ninh",
      DistrictId: "311",
    },
    {
      id: "11506",
      name: "Xã Quảng Thanh",
      DistrictId: "311",
    },
    {
      id: "11509",
      name: "Xã Chính Mỹ",
      DistrictId: "311",
    },
    {
      id: "11512",
      name: "Xã Kênh Giang",
      DistrictId: "311",
    },
    {
      id: "11515",
      name: "Xã Hợp Thành",
      DistrictId: "311",
    },
    {
      id: "11518",
      name: "Xã Cao Nhân",
      DistrictId: "311",
    },
    {
      id: "11521",
      name: "Xã Mỹ Đồng",
      DistrictId: "311",
    },
    {
      id: "11524",
      name: "Xã Đông Sơn",
      DistrictId: "311",
    },
    {
      id: "11527",
      name: "Xã Hoà Bình",
      DistrictId: "311",
    },
    {
      id: "11530",
      name: "Xã Trung Hà",
      DistrictId: "311",
    },
    {
      id: "11533",
      name: "Xã An Lư",
      DistrictId: "311",
    },
    {
      id: "11536",
      name: "Xã Thuỷ Triều",
      DistrictId: "311",
    },
    {
      id: "11539",
      name: "Xã Ngũ Lão",
      DistrictId: "311",
    },
    {
      id: "11542",
      name: "Xã Phục Lễ",
      DistrictId: "311",
    },
    {
      id: "11545",
      name: "Xã Tam Hưng",
      DistrictId: "311",
    },
    {
      id: "11548",
      name: "Xã Phả Lễ",
      DistrictId: "311",
    },
    {
      id: "11551",
      name: "Xã Lập Lễ",
      DistrictId: "311",
    },
    {
      id: "11554",
      name: "Xã Kiền Bái",
      DistrictId: "311",
    },
    {
      id: "11557",
      name: "Xã Thiên Hương",
      DistrictId: "311",
    },
    {
      id: "11560",
      name: "Xã Thuỷ Sơn",
      DistrictId: "311",
    },
    {
      id: "11563",
      name: "Xã Thuỷ Đường",
      DistrictId: "311",
    },
    {
      id: "11566",
      name: "Xã Hoàng Động",
      DistrictId: "311",
    },
    {
      id: "11569",
      name: "Xã Lâm Động",
      DistrictId: "311",
    },
    {
      id: "11572",
      name: "Xã Hoa Động",
      DistrictId: "311",
    },
    {
      id: "11575",
      name: "Xã Tân Dương",
      DistrictId: "311",
    },
    {
      id: "11578",
      name: "Xã Dương Quan",
      DistrictId: "311",
    },
    {
      id: "11581",
      name: "Thị trấn An Dương",
      DistrictId: "312",
    },
    {
      id: "11584",
      name: "Xã Lê Thiện",
      DistrictId: "312",
    },
    {
      id: "11587",
      name: "Xã Đại Bản",
      DistrictId: "312",
    },
    {
      id: "11590",
      name: "Xã An Hoà",
      DistrictId: "312",
    },
    {
      id: "11593",
      name: "Xã Hồng Phong",
      DistrictId: "312",
    },
    {
      id: "11596",
      name: "Xã Tân Tiến",
      DistrictId: "312",
    },
    {
      id: "11599",
      name: "Xã An Hưng",
      DistrictId: "312",
    },
    {
      id: "11602",
      name: "Xã An Hồng",
      DistrictId: "312",
    },
    {
      id: "11605",
      name: "Xã Bắc Sơn",
      DistrictId: "312",
    },
    {
      id: "11608",
      name: "Xã Nam Sơn",
      DistrictId: "312",
    },
    {
      id: "11611",
      name: "Xã Lê Lợi",
      DistrictId: "312",
    },
    {
      id: "11614",
      name: "Xã Đặng Cương",
      DistrictId: "312",
    },
    {
      id: "11617",
      name: "Xã Đồng Thái",
      DistrictId: "312",
    },
    {
      id: "11620",
      name: "Xã Quốc Tuấn",
      DistrictId: "312",
    },
    {
      id: "11623",
      name: "Xã An Đồng",
      DistrictId: "312",
    },
    {
      id: "11626",
      name: "Xã Hồng Thái",
      DistrictId: "312",
    },
    {
      id: "11629",
      name: "Thị trấn An Lão",
      DistrictId: "313",
    },
    {
      id: "11632",
      name: "Xã Bát Trang",
      DistrictId: "313",
    },
    {
      id: "11635",
      name: "Xã Trường Thọ",
      DistrictId: "313",
    },
    {
      id: "11638",
      name: "Xã Trường Thành",
      DistrictId: "313",
    },
    {
      id: "11641",
      name: "Xã An Tiến",
      DistrictId: "313",
    },
    {
      id: "11644",
      name: "Xã Quang Hưng",
      DistrictId: "313",
    },
    {
      id: "11647",
      name: "Xã Quang Trung",
      DistrictId: "313",
    },
    {
      id: "11650",
      name: "Xã Quốc Tuấn",
      DistrictId: "313",
    },
    {
      id: "11653",
      name: "Xã An Thắng",
      DistrictId: "313",
    },
    {
      id: "11656",
      name: "Thị trấn Trường Sơn",
      DistrictId: "313",
    },
    {
      id: "11659",
      name: "Xã Tân Dân",
      DistrictId: "313",
    },
    {
      id: "11662",
      name: "Xã Thái Sơn",
      DistrictId: "313",
    },
    {
      id: "11665",
      name: "Xã Tân Viên",
      DistrictId: "313",
    },
    {
      id: "11668",
      name: "Xã Mỹ Đức",
      DistrictId: "313",
    },
    {
      id: "11671",
      name: "Xã Chiến Thắng",
      DistrictId: "313",
    },
    {
      id: "11674",
      name: "Xã An Thọ",
      DistrictId: "313",
    },
    {
      id: "11677",
      name: "Xã An Thái",
      DistrictId: "313",
    },
    {
      id: "11680",
      name: "Thị trấn Núi Đối",
      DistrictId: "314",
    },
    {
      id: "11683",
      name: "Phường Đa Phúc",
      DistrictId: "309",
    },
    {
      id: "11686",
      name: "Phường Hưng Đạo",
      DistrictId: "309",
    },
    {
      id: "11689",
      name: "Phường Anh Dũng",
      DistrictId: "309",
    },
    {
      id: "11692",
      name: "Phường Hải Thành",
      DistrictId: "309",
    },
    {
      id: "11695",
      name: "Xã Đông Phương",
      DistrictId: "314",
    },
    {
      id: "11698",
      name: "Xã Thuận Thiên",
      DistrictId: "314",
    },
    {
      id: "11701",
      name: "Xã Hữu Bằng",
      DistrictId: "314",
    },
    {
      id: "11704",
      name: "Xã Đại Đồng",
      DistrictId: "314",
    },
    {
      id: "11707",
      name: "Phường Hoà Nghĩa",
      DistrictId: "309",
    },
    {
      id: "11710",
      name: "Xã Ngũ Phúc",
      DistrictId: "314",
    },
    {
      id: "11713",
      name: "Xã Kiến Quốc",
      DistrictId: "314",
    },
    {
      id: "11716",
      name: "Xã Du Lễ",
      DistrictId: "314",
    },
    {
      id: "11719",
      name: "Xã Thuỵ Hương",
      DistrictId: "314",
    },
    {
      id: "11722",
      name: "Xã Thanh Sơn",
      DistrictId: "314",
    },
    {
      id: "11725",
      name: "Xã Minh Tân",
      DistrictId: "314",
    },
    {
      id: "11728",
      name: "Xã Đại Hà",
      DistrictId: "314",
    },
    {
      id: "11731",
      name: "Xã Ngũ Đoan",
      DistrictId: "314",
    },
    {
      id: "11734",
      name: "Xã Tân Phong",
      DistrictId: "314",
    },
    {
      id: "11737",
      name: "Phường Hợp Đức",
      DistrictId: "308",
    },
    {
      id: "11740",
      name: "Phường Tân Thành",
      DistrictId: "309",
    },
    {
      id: "11743",
      name: "Xã Tân Trào",
      DistrictId: "314",
    },
    {
      id: "11746",
      name: "Xã Đoàn Xá",
      DistrictId: "314",
    },
    {
      id: "11749",
      name: "Xã Tú Sơn",
      DistrictId: "314",
    },
    {
      id: "11752",
      name: "Xã Đại Hợp",
      DistrictId: "314",
    },
    {
      id: "11755",
      name: "Thị trấn Tiên Lãng",
      DistrictId: "315",
    },
    {
      id: "11758",
      name: "Xã Đại Thắng",
      DistrictId: "315",
    },
    {
      id: "11761",
      name: "Xã Tiên Cường",
      DistrictId: "315",
    },
    {
      id: "11764",
      name: "Xã Tự Cường",
      DistrictId: "315",
    },
    {
      id: "11770",
      name: "Xã Quyết Tiến",
      DistrictId: "315",
    },
    {
      id: "11773",
      name: "Xã Khởi Nghĩa",
      DistrictId: "315",
    },
    {
      id: "11776",
      name: "Xã Tiên Thanh",
      DistrictId: "315",
    },
    {
      id: "11779",
      name: "Xã Cấp Tiến",
      DistrictId: "315",
    },
    {
      id: "11782",
      name: "Xã Kiến Thiết",
      DistrictId: "315",
    },
    {
      id: "11785",
      name: "Xã Đoàn Lập",
      DistrictId: "315",
    },
    {
      id: "11788",
      name: "Xã Bạch Đằng",
      DistrictId: "315",
    },
    {
      id: "11791",
      name: "Xã Quang Phục",
      DistrictId: "315",
    },
    {
      id: "11794",
      name: "Xã Toàn Thắng",
      DistrictId: "315",
    },
    {
      id: "11797",
      name: "Xã Tiên Thắng",
      DistrictId: "315",
    },
    {
      id: "11800",
      name: "Xã Tiên Minh",
      DistrictId: "315",
    },
    {
      id: "11803",
      name: "Xã Bắc Hưng",
      DistrictId: "315",
    },
    {
      id: "11806",
      name: "Xã Nam Hưng",
      DistrictId: "315",
    },
    {
      id: "11809",
      name: "Xã Hùng Thắng",
      DistrictId: "315",
    },
    {
      id: "11812",
      name: "Xã Tây Hưng",
      DistrictId: "315",
    },
    {
      id: "11815",
      name: "Xã Đông Hưng",
      DistrictId: "315",
    },
    {
      id: "11821",
      name: "Xã Vinh Quang",
      DistrictId: "315",
    },
    {
      id: "11824",
      name: "Thị trấn Vĩnh Bảo",
      DistrictId: "316",
    },
    {
      id: "11827",
      name: "Xã Dũng Tiến",
      DistrictId: "316",
    },
    {
      id: "11830",
      name: "Xã Giang Biên",
      DistrictId: "316",
    },
    {
      id: "11833",
      name: "Xã Thắng Thuỷ",
      DistrictId: "316",
    },
    {
      id: "11836",
      name: "Xã Trung Lập",
      DistrictId: "316",
    },
    {
      id: "11839",
      name: "Xã Việt Tiến",
      DistrictId: "316",
    },
    {
      id: "11842",
      name: "Xã Vĩnh An",
      DistrictId: "316",
    },
    {
      id: "11845",
      name: "Xã Vĩnh Long",
      DistrictId: "316",
    },
    {
      id: "11848",
      name: "Xã Hiệp Hoà",
      DistrictId: "316",
    },
    {
      id: "11851",
      name: "Xã Hùng Tiến",
      DistrictId: "316",
    },
    {
      id: "11854",
      name: "Xã An Hoà",
      DistrictId: "316",
    },
    {
      id: "11857",
      name: "Xã Tân Hưng",
      DistrictId: "316",
    },
    {
      id: "11860",
      name: "Xã Tân Liên",
      DistrictId: "316",
    },
    {
      id: "11863",
      name: "Xã Nhân Hoà",
      DistrictId: "316",
    },
    {
      id: "11866",
      name: "Xã Tam Đa",
      DistrictId: "316",
    },
    {
      id: "11869",
      name: "Xã Hưng Nhân",
      DistrictId: "316",
    },
    {
      id: "11872",
      name: "Xã Vinh Quang",
      DistrictId: "316",
    },
    {
      id: "11875",
      name: "Xã Đồng Minh",
      DistrictId: "316",
    },
    {
      id: "11878",
      name: "Xã Thanh Lương",
      DistrictId: "316",
    },
    {
      id: "11881",
      name: "Xã Liên Am",
      DistrictId: "316",
    },
    {
      id: "11884",
      name: "Xã Lý Học",
      DistrictId: "316",
    },
    {
      id: "11887",
      name: "Xã Tam Cường",
      DistrictId: "316",
    },
    {
      id: "11890",
      name: "Xã Hoà Bình",
      DistrictId: "316",
    },
    {
      id: "11893",
      name: "Xã Tiền Phong",
      DistrictId: "316",
    },
    {
      id: "11896",
      name: "Xã Vĩnh Phong",
      DistrictId: "316",
    },
    {
      id: "11899",
      name: "Xã Cộng Hiền",
      DistrictId: "316",
    },
    {
      id: "11902",
      name: "Xã Cao Minh",
      DistrictId: "316",
    },
    {
      id: "11905",
      name: "Xã Cổ Am",
      DistrictId: "316",
    },
    {
      id: "11908",
      name: "Xã Vĩnh Tiến",
      DistrictId: "316",
    },
    {
      id: "11911",
      name: "Xã Trấn Dương",
      DistrictId: "316",
    },
    {
      id: "11914",
      name: "Thị trấn Cát Bà",
      DistrictId: "317",
    },
    {
      id: "11917",
      name: "Thị trấn Cát Hải",
      DistrictId: "317",
    },
    {
      id: "11920",
      name: "Xã Nghĩa Lộ",
      DistrictId: "317",
    },
    {
      id: "11923",
      name: "Xã Đồng Bài",
      DistrictId: "317",
    },
    {
      id: "11926",
      name: "Xã Hoàng Châu",
      DistrictId: "317",
    },
    {
      id: "11929",
      name: "Xã Văn Phong",
      DistrictId: "317",
    },
    {
      id: "11932",
      name: "Xã Phù Long",
      DistrictId: "317",
    },
    {
      id: "11935",
      name: "Xã Gia Luận",
      DistrictId: "317",
    },
    {
      id: "11938",
      name: "Xã Hiền Hào",
      DistrictId: "317",
    },
    {
      id: "11941",
      name: "Xã Trân Châu",
      DistrictId: "317",
    },
    {
      id: "11944",
      name: "Xã Việt Hải",
      DistrictId: "317",
    },
    {
      id: "11947",
      name: "Xã Xuân Đám",
      DistrictId: "317",
    },
    {
      id: "11950",
      name: "Phường Lam Sơn",
      DistrictId: "323",
    },
    {
      id: "11953",
      name: "Phường Hiến Nam",
      DistrictId: "323",
    },
    {
      id: "11956",
      name: "Phường An Tảo",
      DistrictId: "323",
    },
    {
      id: "11959",
      name: "Phường Lê Lợi",
      DistrictId: "323",
    },
    {
      id: "11962",
      name: "Phường Minh Khai",
      DistrictId: "323",
    },
    {
      id: "11965",
      name: "Phường Quang Trung",
      DistrictId: "323",
    },
    {
      id: "11968",
      name: "Phường Hồng Châu",
      DistrictId: "323",
    },
    {
      id: "11971",
      name: "Xã Trung Nghĩa",
      DistrictId: "323",
    },
    {
      id: "11974",
      name: "Xã Liên Phương",
      DistrictId: "323",
    },
    {
      id: "11977",
      name: "Xã Hồng Nam",
      DistrictId: "323",
    },
    {
      id: "11980",
      name: "Xã Quảng Châu",
      DistrictId: "323",
    },
    {
      id: "11983",
      name: "Xã Bảo Khê",
      DistrictId: "323",
    },
    {
      id: "11986",
      name: "Thị trấn Như Quỳnh",
      DistrictId: "325",
    },
    {
      id: "11989",
      name: "Xã Lạc Đạo",
      DistrictId: "325",
    },
    {
      id: "11992",
      name: "Xã Chỉ Đạo",
      DistrictId: "325",
    },
    {
      id: "11995",
      name: "Xã Đại Đồng",
      DistrictId: "325",
    },
    {
      id: "11998",
      name: "Xã Việt Hưng",
      DistrictId: "325",
    },
    {
      id: "12001",
      name: "Xã Tân Quang",
      DistrictId: "325",
    },
    {
      id: "12004",
      name: "Xã Đình Dù",
      DistrictId: "325",
    },
    {
      id: "12007",
      name: "Xã Minh Hải",
      DistrictId: "325",
    },
    {
      id: "12010",
      name: "Xã Lương Tài",
      DistrictId: "325",
    },
    {
      id: "12013",
      name: "Xã Trưng Trắc",
      DistrictId: "325",
    },
    {
      id: "12016",
      name: "Xã Lạc Hồng",
      DistrictId: "325",
    },
    {
      id: "12019",
      name: "Thị trấn Văn Giang",
      DistrictId: "326",
    },
    {
      id: "12022",
      name: "Xã Xuân Quan",
      DistrictId: "326",
    },
    {
      id: "12025",
      name: "Xã Cửu Cao",
      DistrictId: "326",
    },
    {
      id: "12028",
      name: "Xã Phụng Công",
      DistrictId: "326",
    },
    {
      id: "12031",
      name: "Xã Nghĩa Trụ",
      DistrictId: "326",
    },
    {
      id: "12034",
      name: "Xã Long Hưng",
      DistrictId: "326",
    },
    {
      id: "12037",
      name: "Xã Vĩnh Khúc",
      DistrictId: "326",
    },
    {
      id: "12040",
      name: "Xã Liên Nghĩa",
      DistrictId: "326",
    },
    {
      id: "12043",
      name: "Xã Tân Tiến",
      DistrictId: "326",
    },
    {
      id: "12046",
      name: "Xã Thắng Lợi",
      DistrictId: "326",
    },
    {
      id: "12049",
      name: "Xã Mễ Sở",
      DistrictId: "326",
    },
    {
      id: "12052",
      name: "Thị trấn Yên Mỹ",
      DistrictId: "327",
    },
    {
      id: "12055",
      name: "Xã Giai Phạm",
      DistrictId: "327",
    },
    {
      id: "12058",
      name: "Xã Nghĩa Hiệp",
      DistrictId: "327",
    },
    {
      id: "12061",
      name: "Xã Đồng Than",
      DistrictId: "327",
    },
    {
      id: "12064",
      name: "Xã Ngọc Long",
      DistrictId: "327",
    },
    {
      id: "12067",
      name: "Xã Liêu Xá",
      DistrictId: "327",
    },
    {
      id: "12070",
      name: "Xã Hoàn Long",
      DistrictId: "327",
    },
    {
      id: "12073",
      name: "Xã Tân Lập",
      DistrictId: "327",
    },
    {
      id: "12076",
      name: "Xã Thanh Long",
      DistrictId: "327",
    },
    {
      id: "12079",
      name: "Xã Yên Phú",
      DistrictId: "327",
    },
    {
      id: "12082",
      name: "Xã Việt Cường",
      DistrictId: "327",
    },
    {
      id: "12085",
      name: "Xã Trung Hòa",
      DistrictId: "327",
    },
    {
      id: "12088",
      name: "Xã Yên Hòa",
      DistrictId: "327",
    },
    {
      id: "12091",
      name: "Xã Minh Châu",
      DistrictId: "327",
    },
    {
      id: "12094",
      name: "Xã Trung Hưng",
      DistrictId: "327",
    },
    {
      id: "12097",
      name: "Xã Lý Thường Kiệt",
      DistrictId: "327",
    },
    {
      id: "12100",
      name: "Xã Tân Việt",
      DistrictId: "327",
    },
    {
      id: "12103",
      name: "Phường Bần Yên Nhân",
      DistrictId: "328",
    },
    {
      id: "12106",
      name: "Phường Phan Đình Phùng",
      DistrictId: "328",
    },
    {
      id: "12109",
      name: "Xã Cẩm Xá",
      DistrictId: "328",
    },
    {
      id: "12112",
      name: "Xã Dương Quang",
      DistrictId: "328",
    },
    {
      id: "12115",
      name: "Xã Hòa Phong",
      DistrictId: "328",
    },
    {
      id: "12118",
      name: "Phường Nhân Hòa",
      DistrictId: "328",
    },
    {
      id: "12121",
      name: "Phường Dị Sử",
      DistrictId: "328",
    },
    {
      id: "12124",
      name: "Phường Bạch Sam",
      DistrictId: "328",
    },
    {
      id: "12127",
      name: "Phường Minh Đức",
      DistrictId: "328",
    },
    {
      id: "12130",
      name: "Phường Phùng Chí Kiên",
      DistrictId: "328",
    },
    {
      id: "12133",
      name: "Xã Xuân Dục",
      DistrictId: "328",
    },
    {
      id: "12136",
      name: "Xã Ngọc Lâm",
      DistrictId: "328",
    },
    {
      id: "12139",
      name: "Xã Hưng Long",
      DistrictId: "328",
    },
    {
      id: "12142",
      name: "Thị trấn Ân Thi",
      DistrictId: "329",
    },
    {
      id: "12145",
      name: "Xã Phù Ủng",
      DistrictId: "329",
    },
    {
      id: "12148",
      name: "Xã Bắc Sơn",
      DistrictId: "329",
    },
    {
      id: "12151",
      name: "Xã Bãi Sậy",
      DistrictId: "329",
    },
    {
      id: "12154",
      name: "Xã Đào Dương",
      DistrictId: "329",
    },
    {
      id: "12157",
      name: "Xã Tân Phúc",
      DistrictId: "329",
    },
    {
      id: "12160",
      name: "Xã Vân Du",
      DistrictId: "329",
    },
    {
      id: "12163",
      name: "Xã Quang Vinh",
      DistrictId: "329",
    },
    {
      id: "12166",
      name: "Xã Xuân Trúc",
      DistrictId: "329",
    },
    {
      id: "12169",
      name: "Xã Hoàng Hoa Thám",
      DistrictId: "329",
    },
    {
      id: "12172",
      name: "Xã Quảng Lãng",
      DistrictId: "329",
    },
    {
      id: "12175",
      name: "Xã Văn Nhuệ",
      DistrictId: "329",
    },
    {
      id: "12178",
      name: "Xã Đặng Lễ",
      DistrictId: "329",
    },
    {
      id: "12181",
      name: "Xã Cẩm Ninh",
      DistrictId: "329",
    },
    {
      id: "12184",
      name: "Xã Nguyễn Trãi",
      DistrictId: "329",
    },
    {
      id: "12187",
      name: "Xã Đa Lộc",
      DistrictId: "329",
    },
    {
      id: "12190",
      name: "Xã Hồ Tùng Mậu",
      DistrictId: "329",
    },
    {
      id: "12193",
      name: "Xã Tiền Phong",
      DistrictId: "329",
    },
    {
      id: "12196",
      name: "Xã Hồng Vân",
      DistrictId: "329",
    },
    {
      id: "12199",
      name: "Xã Hồng Quang",
      DistrictId: "329",
    },
    {
      id: "12202",
      name: "Xã Hạ Lễ",
      DistrictId: "329",
    },
    {
      id: "12205",
      name: "Thị trấn Khoái Châu",
      DistrictId: "330",
    },
    {
      id: "12208",
      name: "Xã Đông Tảo",
      DistrictId: "330",
    },
    {
      id: "12211",
      name: "Xã Bình Minh",
      DistrictId: "330",
    },
    {
      id: "12214",
      name: "Xã Dạ Trạch",
      DistrictId: "330",
    },
    {
      id: "12217",
      name: "Xã Hàm Tử",
      DistrictId: "330",
    },
    {
      id: "12220",
      name: "Xã Ông Đình",
      DistrictId: "330",
    },
    {
      id: "12223",
      name: "Xã Tân Dân",
      DistrictId: "330",
    },
    {
      id: "12226",
      name: "Xã Tứ Dân",
      DistrictId: "330",
    },
    {
      id: "12229",
      name: "Xã An Vĩ",
      DistrictId: "330",
    },
    {
      id: "12232",
      name: "Xã Đông Kết",
      DistrictId: "330",
    },
    {
      id: "12235",
      name: "Xã Bình Kiều",
      DistrictId: "330",
    },
    {
      id: "12238",
      name: "Xã Dân Tiến",
      DistrictId: "330",
    },
    {
      id: "12241",
      name: "Xã Đồng Tiến",
      DistrictId: "330",
    },
    {
      id: "12244",
      name: "Xã Hồng Tiến",
      DistrictId: "330",
    },
    {
      id: "12247",
      name: "Xã Tân Châu",
      DistrictId: "330",
    },
    {
      id: "12250",
      name: "Xã Liên Khê",
      DistrictId: "330",
    },
    {
      id: "12253",
      name: "Xã Phùng Hưng",
      DistrictId: "330",
    },
    {
      id: "12256",
      name: "Xã Việt Hòa",
      DistrictId: "330",
    },
    {
      id: "12259",
      name: "Xã Đông Ninh",
      DistrictId: "330",
    },
    {
      id: "12262",
      name: "Xã Đại Tập",
      DistrictId: "330",
    },
    {
      id: "12265",
      name: "Xã Chí Tân",
      DistrictId: "330",
    },
    {
      id: "12268",
      name: "Xã Đại Hưng",
      DistrictId: "330",
    },
    {
      id: "12271",
      name: "Xã Thuần Hưng",
      DistrictId: "330",
    },
    {
      id: "12274",
      name: "Xã Thành Công",
      DistrictId: "330",
    },
    {
      id: "12277",
      name: "Xã Nhuế Dương",
      DistrictId: "330",
    },
    {
      id: "12280",
      name: "Thị trấn Lương Bằng",
      DistrictId: "331",
    },
    {
      id: "12283",
      name: "Xã Nghĩa Dân",
      DistrictId: "331",
    },
    {
      id: "12286",
      name: "Xã Toàn Thắng",
      DistrictId: "331",
    },
    {
      id: "12289",
      name: "Xã Vĩnh Xá",
      DistrictId: "331",
    },
    {
      id: "12292",
      name: "Xã Phạm Ngũ Lão",
      DistrictId: "331",
    },
    {
      id: "12295",
      name: "Xã Thọ Vinh",
      DistrictId: "331",
    },
    {
      id: "12298",
      name: "Xã Đồng Thanh",
      DistrictId: "331",
    },
    {
      id: "12301",
      name: "Xã Song Mai",
      DistrictId: "331",
    },
    {
      id: "12304",
      name: "Xã Chính Nghĩa",
      DistrictId: "331",
    },
    {
      id: "12307",
      name: "Xã Nhân La",
      DistrictId: "331",
    },
    {
      id: "12310",
      name: "Xã Phú Thịnh",
      DistrictId: "331",
    },
    {
      id: "12313",
      name: "Xã Mai Động",
      DistrictId: "331",
    },
    {
      id: "12316",
      name: "Xã Đức Hợp",
      DistrictId: "331",
    },
    {
      id: "12319",
      name: "Xã Hùng An",
      DistrictId: "331",
    },
    {
      id: "12322",
      name: "Xã Ngọc Thanh",
      DistrictId: "331",
    },
    {
      id: "12325",
      name: "Xã Vũ Xá",
      DistrictId: "331",
    },
    {
      id: "12328",
      name: "Xã Hiệp Cường",
      DistrictId: "331",
    },
    {
      id: "12331",
      name: "Xã Phú Cường",
      DistrictId: "323",
    },
    {
      id: "12334",
      name: "Xã Hùng Cường",
      DistrictId: "323",
    },
    {
      id: "12337",
      name: "Thị trấn Vương",
      DistrictId: "332",
    },
    {
      id: "12340",
      name: "Xã Hưng Đạo",
      DistrictId: "332",
    },
    {
      id: "12343",
      name: "Xã Ngô Quyền",
      DistrictId: "332",
    },
    {
      id: "12346",
      name: "Xã Nhật Tân",
      DistrictId: "332",
    },
    {
      id: "12349",
      name: "Xã Dị Chế",
      DistrictId: "332",
    },
    {
      id: "12352",
      name: "Xã Lệ Xá",
      DistrictId: "332",
    },
    {
      id: "12355",
      name: "Xã An Viên",
      DistrictId: "332",
    },
    {
      id: "12358",
      name: "Xã Đức Thắng",
      DistrictId: "332",
    },
    {
      id: "12361",
      name: "Xã Trung Dũng",
      DistrictId: "332",
    },
    {
      id: "12364",
      name: "Xã Hải Triều",
      DistrictId: "332",
    },
    {
      id: "12367",
      name: "Xã Thủ Sỹ",
      DistrictId: "332",
    },
    {
      id: "12370",
      name: "Xã Thiện Phiến",
      DistrictId: "332",
    },
    {
      id: "12373",
      name: "Xã Thụy Lôi",
      DistrictId: "332",
    },
    {
      id: "12376",
      name: "Xã Cương Chính",
      DistrictId: "332",
    },
    {
      id: "12379",
      name: "Xã Minh Phượng",
      DistrictId: "332",
    },
    {
      id: "12382",
      name: "Xã Phương Chiểu",
      DistrictId: "323",
    },
    {
      id: "12385",
      name: "Xã Tân Hưng",
      DistrictId: "323",
    },
    {
      id: "12388",
      name: "Xã Hoàng Hanh",
      DistrictId: "323",
    },
    {
      id: "12391",
      name: "Thị trấn Trần Cao",
      DistrictId: "333",
    },
    {
      id: "12394",
      name: "Xã Minh Tân",
      DistrictId: "333",
    },
    {
      id: "12397",
      name: "Xã Phan Sào Nam",
      DistrictId: "333",
    },
    {
      id: "12400",
      name: "Xã Quang Hưng",
      DistrictId: "333",
    },
    {
      id: "12403",
      name: "Xã Minh Hoàng",
      DistrictId: "333",
    },
    {
      id: "12406",
      name: "Xã Đoàn Đào",
      DistrictId: "333",
    },
    {
      id: "12409",
      name: "Xã Tống Phan",
      DistrictId: "333",
    },
    {
      id: "12412",
      name: "Xã Đình Cao",
      DistrictId: "333",
    },
    {
      id: "12415",
      name: "Xã Nhật Quang",
      DistrictId: "333",
    },
    {
      id: "12418",
      name: "Xã Tiền Tiến",
      DistrictId: "333",
    },
    {
      id: "12421",
      name: "Xã Tam Đa",
      DistrictId: "333",
    },
    {
      id: "12424",
      name: "Xã Minh Tiến",
      DistrictId: "333",
    },
    {
      id: "12427",
      name: "Xã Nguyên Hòa",
      DistrictId: "333",
    },
    {
      id: "12430",
      name: "Xã Tống Trân",
      DistrictId: "333",
    },
    {
      id: "12433",
      name: "Phường Lê Hồng Phong",
      DistrictId: "336",
    },
    {
      id: "12436",
      name: "Phường Bồ Xuyên",
      DistrictId: "336",
    },
    {
      id: "12439",
      name: "Phường Đề Thám",
      DistrictId: "336",
    },
    {
      id: "12442",
      name: "Phường Kỳ Bá",
      DistrictId: "336",
    },
    {
      id: "12445",
      name: "Phường Quang Trung",
      DistrictId: "336",
    },
    {
      id: "12448",
      name: "Phường Phú Khánh",
      DistrictId: "336",
    },
    {
      id: "12451",
      name: "Phường Tiền Phong",
      DistrictId: "336",
    },
    {
      id: "12452",
      name: "Phường Trần Hưng Đạo",
      DistrictId: "336",
    },
    {
      id: "12454",
      name: "Phường Trần Lãm",
      DistrictId: "336",
    },
    {
      id: "12457",
      name: "Xã Đông Hòa",
      DistrictId: "336",
    },
    {
      id: "12460",
      name: "Phường Hoàng Diệu",
      DistrictId: "336",
    },
    {
      id: "12463",
      name: "Xã Phú Xuân",
      DistrictId: "336",
    },
    {
      id: "12466",
      name: "Xã Vũ Phúc",
      DistrictId: "336",
    },
    {
      id: "12469",
      name: "Xã Vũ Chính",
      DistrictId: "336",
    },
    {
      id: "12472",
      name: "Thị trấn Quỳnh Côi",
      DistrictId: "338",
    },
    {
      id: "12475",
      name: "Xã An Khê",
      DistrictId: "338",
    },
    {
      id: "12478",
      name: "Xã An Đồng",
      DistrictId: "338",
    },
    {
      id: "12481",
      name: "Xã Quỳnh Hoa",
      DistrictId: "338",
    },
    {
      id: "12484",
      name: "Xã Quỳnh Lâm",
      DistrictId: "338",
    },
    {
      id: "12487",
      name: "Xã Quỳnh Thọ",
      DistrictId: "338",
    },
    {
      id: "12490",
      name: "Xã An Hiệp",
      DistrictId: "338",
    },
    {
      id: "12493",
      name: "Xã Quỳnh Hoàng",
      DistrictId: "338",
    },
    {
      id: "12496",
      name: "Xã Quỳnh Giao",
      DistrictId: "338",
    },
    {
      id: "12499",
      name: "Xã An Thái",
      DistrictId: "338",
    },
    {
      id: "12502",
      name: "Xã An Cầu",
      DistrictId: "338",
    },
    {
      id: "12505",
      name: "Xã Quỳnh Hồng",
      DistrictId: "338",
    },
    {
      id: "12508",
      name: "Xã Quỳnh Khê",
      DistrictId: "338",
    },
    {
      id: "12511",
      name: "Xã Quỳnh Minh",
      DistrictId: "338",
    },
    {
      id: "12514",
      name: "Xã An Ninh",
      DistrictId: "338",
    },
    {
      id: "12517",
      name: "Xã Quỳnh Ngọc",
      DistrictId: "338",
    },
    {
      id: "12520",
      name: "Xã Quỳnh Hải",
      DistrictId: "338",
    },
    {
      id: "12523",
      name: "Thị trấn An Bài",
      DistrictId: "338",
    },
    {
      id: "12526",
      name: "Xã An Ấp",
      DistrictId: "338",
    },
    {
      id: "12529",
      name: "Xã Quỳnh Hội",
      DistrictId: "338",
    },
    {
      id: "12532",
      name: "Xã Châu Sơn",
      DistrictId: "338",
    },
    {
      id: "12535",
      name: "Xã Quỳnh Mỹ",
      DistrictId: "338",
    },
    {
      id: "12538",
      name: "Xã An Quí",
      DistrictId: "338",
    },
    {
      id: "12541",
      name: "Xã An Thanh",
      DistrictId: "338",
    },
    {
      id: "12547",
      name: "Xã An Vũ",
      DistrictId: "338",
    },
    {
      id: "12550",
      name: "Xã An Lễ",
      DistrictId: "338",
    },
    {
      id: "12553",
      name: "Xã Quỳnh Hưng",
      DistrictId: "338",
    },
    {
      id: "12556",
      name: "Xã Quỳnh Bảo",
      DistrictId: "338",
    },
    {
      id: "12559",
      name: "Xã An Mỹ",
      DistrictId: "338",
    },
    {
      id: "12562",
      name: "Xã Quỳnh Nguyên",
      DistrictId: "338",
    },
    {
      id: "12565",
      name: "Xã An Vinh",
      DistrictId: "338",
    },
    {
      id: "12568",
      name: "Xã Quỳnh Xá",
      DistrictId: "338",
    },
    {
      id: "12571",
      name: "Xã An Dục",
      DistrictId: "338",
    },
    {
      id: "12574",
      name: "Xã Đông Hải",
      DistrictId: "338",
    },
    {
      id: "12577",
      name: "Xã Quỳnh Trang",
      DistrictId: "338",
    },
    {
      id: "12580",
      name: "Xã An Tràng",
      DistrictId: "338",
    },
    {
      id: "12583",
      name: "Xã Đồng Tiến",
      DistrictId: "338",
    },
    {
      id: "12586",
      name: "Thị trấn Hưng Hà",
      DistrictId: "339",
    },
    {
      id: "12589",
      name: "Xã Điệp Nông",
      DistrictId: "339",
    },
    {
      id: "12592",
      name: "Xã Tân Lễ",
      DistrictId: "339",
    },
    {
      id: "12595",
      name: "Xã Cộng Hòa",
      DistrictId: "339",
    },
    {
      id: "12598",
      name: "Xã Dân Chủ",
      DistrictId: "339",
    },
    {
      id: "12601",
      name: "Xã Canh Tân",
      DistrictId: "339",
    },
    {
      id: "12604",
      name: "Xã Hòa Tiến",
      DistrictId: "339",
    },
    {
      id: "12607",
      name: "Xã Hùng Dũng",
      DistrictId: "339",
    },
    {
      id: "12610",
      name: "Xã Tân Tiến",
      DistrictId: "339",
    },
    {
      id: "12613",
      name: "Thị trấn Hưng Nhân",
      DistrictId: "339",
    },
    {
      id: "12616",
      name: "Xã Đoan Hùng",
      DistrictId: "339",
    },
    {
      id: "12619",
      name: "Xã Duyên Hải",
      DistrictId: "339",
    },
    {
      id: "12622",
      name: "Xã Tân Hòa",
      DistrictId: "339",
    },
    {
      id: "12625",
      name: "Xã Văn Cẩm",
      DistrictId: "339",
    },
    {
      id: "12628",
      name: "Xã Bắc Sơn",
      DistrictId: "339",
    },
    {
      id: "12631",
      name: "Xã Đông Đô",
      DistrictId: "339",
    },
    {
      id: "12634",
      name: "Xã Phúc Khánh",
      DistrictId: "339",
    },
    {
      id: "12637",
      name: "Xã Liên Hiệp",
      DistrictId: "339",
    },
    {
      id: "12640",
      name: "Xã Tây Đô",
      DistrictId: "339",
    },
    {
      id: "12643",
      name: "Xã Thống Nhất",
      DistrictId: "339",
    },
    {
      id: "12646",
      name: "Xã Tiến Đức",
      DistrictId: "339",
    },
    {
      id: "12649",
      name: "Xã Thái Hưng",
      DistrictId: "339",
    },
    {
      id: "12652",
      name: "Xã Thái Phương",
      DistrictId: "339",
    },
    {
      id: "12655",
      name: "Xã Hòa Bình",
      DistrictId: "339",
    },
    {
      id: "12656",
      name: "Xã Chi Lăng",
      DistrictId: "339",
    },
    {
      id: "12658",
      name: "Xã Minh Khai",
      DistrictId: "339",
    },
    {
      id: "12661",
      name: "Xã Hồng An",
      DistrictId: "339",
    },
    {
      id: "12664",
      name: "Xã Kim Chung",
      DistrictId: "339",
    },
    {
      id: "12667",
      name: "Xã Hồng Lĩnh",
      DistrictId: "339",
    },
    {
      id: "12670",
      name: "Xã Minh Tân",
      DistrictId: "339",
    },
    {
      id: "12673",
      name: "Xã Văn Lang",
      DistrictId: "339",
    },
    {
      id: "12676",
      name: "Xã Độc Lập",
      DistrictId: "339",
    },
    {
      id: "12679",
      name: "Xã Chí Hòa",
      DistrictId: "339",
    },
    {
      id: "12682",
      name: "Xã Minh Hòa",
      DistrictId: "339",
    },
    {
      id: "12685",
      name: "Xã Hồng Minh",
      DistrictId: "339",
    },
    {
      id: "12688",
      name: "Thị trấn Đông Hưng",
      DistrictId: "340",
    },
    {
      id: "12691",
      name: "Xã Đô Lương",
      DistrictId: "340",
    },
    {
      id: "12694",
      name: "Xã Đông Phương",
      DistrictId: "340",
    },
    {
      id: "12697",
      name: "Xã Liên Giang",
      DistrictId: "340",
    },
    {
      id: "12700",
      name: "Xã An Châu",
      DistrictId: "340",
    },
    {
      id: "12703",
      name: "Xã Đông Sơn",
      DistrictId: "340",
    },
    {
      id: "12706",
      name: "Xã Đông Cường",
      DistrictId: "340",
    },
    {
      id: "12709",
      name: "Xã Phú Lương",
      DistrictId: "340",
    },
    {
      id: "12712",
      name: "Xã Mê Linh",
      DistrictId: "340",
    },
    {
      id: "12715",
      name: "Xã Lô Giang",
      DistrictId: "340",
    },
    {
      id: "12718",
      name: "Xã Đông La",
      DistrictId: "340",
    },
    {
      id: "12721",
      name: "Xã Minh Tân",
      DistrictId: "340",
    },
    {
      id: "12724",
      name: "Xã Đông Xá",
      DistrictId: "340",
    },
    {
      id: "12727",
      name: "Xã Chương Dương",
      DistrictId: "340",
    },
    {
      id: "12730",
      name: "Xã Nguyên Xá",
      DistrictId: "340",
    },
    {
      id: "12733",
      name: "Xã Phong Châu",
      DistrictId: "340",
    },
    {
      id: "12736",
      name: "Xã Hợp Tiến",
      DistrictId: "340",
    },
    {
      id: "12739",
      name: "Xã Hồng Việt",
      DistrictId: "340",
    },
    {
      id: "12745",
      name: "Xã Hà Giang",
      DistrictId: "340",
    },
    {
      id: "12748",
      name: "Xã Đông Kinh",
      DistrictId: "340",
    },
    {
      id: "12751",
      name: "Xã Đông Hợp",
      DistrictId: "340",
    },
    {
      id: "12754",
      name: "Xã Thăng Long",
      DistrictId: "340",
    },
    {
      id: "12757",
      name: "Xã Đông Các",
      DistrictId: "340",
    },
    {
      id: "12760",
      name: "Xã Phú Châu",
      DistrictId: "340",
    },
    {
      id: "12763",
      name: "Xã Liên Hoa",
      DistrictId: "340",
    },
    {
      id: "12769",
      name: "Xã Đông Tân",
      DistrictId: "340",
    },
    {
      id: "12772",
      name: "Xã Đông Vinh",
      DistrictId: "340",
    },
    {
      id: "12775",
      name: "Xã Đông Động",
      DistrictId: "340",
    },
    {
      id: "12778",
      name: "Xã Hồng Bạch",
      DistrictId: "340",
    },
    {
      id: "12784",
      name: "Xã Trọng Quan",
      DistrictId: "340",
    },
    {
      id: "12790",
      name: "Xã Hồng Giang",
      DistrictId: "340",
    },
    {
      id: "12793",
      name: "Xã Đông Quan",
      DistrictId: "340",
    },
    {
      id: "12796",
      name: "Xã Đông Quang",
      DistrictId: "340",
    },
    {
      id: "12799",
      name: "Xã Đông Xuân",
      DistrictId: "340",
    },
    {
      id: "12802",
      name: "Xã Đông Á",
      DistrictId: "340",
    },
    {
      id: "12808",
      name: "Xã Đông Hoàng",
      DistrictId: "340",
    },
    {
      id: "12811",
      name: "Xã Đông Dương",
      DistrictId: "340",
    },
    {
      id: "12817",
      name: "Xã Đông Mỹ",
      DistrictId: "336",
    },
    {
      id: "12820",
      name: "Xã Đông Thọ",
      DistrictId: "336",
    },
    {
      id: "12823",
      name: "Xã Minh Phú",
      DistrictId: "340",
    },
    {
      id: "12826",
      name: "Thị trấn Diêm Điền",
      DistrictId: "341",
    },
    {
      id: "12832",
      name: "Xã Thụy Trường",
      DistrictId: "341",
    },
    {
      id: "12841",
      name: "Xã Hồng Dũng",
      DistrictId: "341",
    },
    {
      id: "12844",
      name: "Xã Thụy Quỳnh",
      DistrictId: "341",
    },
    {
      id: "12847",
      name: "Xã An Tân",
      DistrictId: "341",
    },
    {
      id: "12850",
      name: "Xã Thụy Ninh",
      DistrictId: "341",
    },
    {
      id: "12853",
      name: "Xã Thụy Hưng",
      DistrictId: "341",
    },
    {
      id: "12856",
      name: "Xã Thụy Việt",
      DistrictId: "341",
    },
    {
      id: "12859",
      name: "Xã Thụy Văn",
      DistrictId: "341",
    },
    {
      id: "12862",
      name: "Xã Thụy Xuân",
      DistrictId: "341",
    },
    {
      id: "12865",
      name: "Xã Dương Phúc",
      DistrictId: "341",
    },
    {
      id: "12868",
      name: "Xã Thụy Trình",
      DistrictId: "341",
    },
    {
      id: "12871",
      name: "Xã Thụy Bình",
      DistrictId: "341",
    },
    {
      id: "12874",
      name: "Xã Thụy Chính",
      DistrictId: "341",
    },
    {
      id: "12877",
      name: "Xã Thụy Dân",
      DistrictId: "341",
    },
    {
      id: "12880",
      name: "Xã Thụy Hải",
      DistrictId: "341",
    },
    {
      id: "12889",
      name: "Xã Thụy Liên",
      DistrictId: "341",
    },
    {
      id: "12892",
      name: "Xã Thụy Duyên",
      DistrictId: "341",
    },
    {
      id: "12898",
      name: "Xã Thụy Thanh",
      DistrictId: "341",
    },
    {
      id: "12901",
      name: "Xã Thụy Sơn",
      DistrictId: "341",
    },
    {
      id: "12904",
      name: "Xã Thụy Phong",
      DistrictId: "341",
    },
    {
      id: "12907",
      name: "Xã Thái Thượng",
      DistrictId: "341",
    },
    {
      id: "12910",
      name: "Xã Thái Nguyên",
      DistrictId: "341",
    },
    {
      id: "12916",
      name: "Xã Dương Hồng  Thủy",
      DistrictId: "341",
    },
    {
      id: "12919",
      name: "Xã Thái Giang",
      DistrictId: "341",
    },
    {
      id: "12922",
      name: "Xã Hòa An",
      DistrictId: "341",
    },
    {
      id: "12925",
      name: "Xã Sơn Hà",
      DistrictId: "341",
    },
    {
      id: "12934",
      name: "Xã Thái Phúc",
      DistrictId: "341",
    },
    {
      id: "12937",
      name: "Xã Thái Hưng",
      DistrictId: "341",
    },
    {
      id: "12940",
      name: "Xã Thái Đô",
      DistrictId: "341",
    },
    {
      id: "12943",
      name: "Xã Thái Xuyên",
      DistrictId: "341",
    },
    {
      id: "12949",
      name: "Xã  Mỹ Lộc",
      DistrictId: "341",
    },
    {
      id: "12958",
      name: "Xã Tân Học",
      DistrictId: "341",
    },
    {
      id: "12961",
      name: "Xã Thái Thịnh",
      DistrictId: "341",
    },
    {
      id: "12964",
      name: "Xã Thuần Thành",
      DistrictId: "341",
    },
    {
      id: "12967",
      name: "Xã Thái Thọ",
      DistrictId: "341",
    },
    {
      id: "12970",
      name: "Thị trấn Tiền Hải",
      DistrictId: "342",
    },
    {
      id: "12976",
      name: "Xã Đông Trà",
      DistrictId: "342",
    },
    {
      id: "12979",
      name: "Xã Đông Long",
      DistrictId: "342",
    },
    {
      id: "12982",
      name: "Xã Đông Quí",
      DistrictId: "342",
    },
    {
      id: "12985",
      name: "Xã Vũ Lăng",
      DistrictId: "342",
    },
    {
      id: "12988",
      name: "Xã Đông Xuyên",
      DistrictId: "342",
    },
    {
      id: "12991",
      name: "Xã Tây Lương",
      DistrictId: "342",
    },
    {
      id: "12994",
      name: "Xã Tây Ninh",
      DistrictId: "342",
    },
    {
      id: "12997",
      name: "Xã Đông Trung",
      DistrictId: "342",
    },
    {
      id: "13000",
      name: "Xã Đông Hoàng",
      DistrictId: "342",
    },
    {
      id: "13003",
      name: "Xã Đông Minh",
      DistrictId: "342",
    },
    {
      id: "13009",
      name: "Xã Đông Phong",
      DistrictId: "342",
    },
    {
      id: "13012",
      name: "Xã An Ninh",
      DistrictId: "342",
    },
    {
      id: "13018",
      name: "Xã Đông Cơ",
      DistrictId: "342",
    },
    {
      id: "13021",
      name: "Xã Tây Giang",
      DistrictId: "342",
    },
    {
      id: "13024",
      name: "Xã Đông Lâm",
      DistrictId: "342",
    },
    {
      id: "13027",
      name: "Xã Phương Công",
      DistrictId: "342",
    },
    {
      id: "13030",
      name: "Xã Tây Phong",
      DistrictId: "342",
    },
    {
      id: "13033",
      name: "Xã Tây Tiến",
      DistrictId: "342",
    },
    {
      id: "13036",
      name: "Xã Nam Cường",
      DistrictId: "342",
    },
    {
      id: "13039",
      name: "Xã Vân Trường",
      DistrictId: "342",
    },
    {
      id: "13042",
      name: "Xã Nam Thắng",
      DistrictId: "342",
    },
    {
      id: "13045",
      name: "Xã Nam Chính",
      DistrictId: "342",
    },
    {
      id: "13048",
      name: "Xã Bắc Hải",
      DistrictId: "342",
    },
    {
      id: "13051",
      name: "Xã Nam Thịnh",
      DistrictId: "342",
    },
    {
      id: "13054",
      name: "Xã Nam Hà",
      DistrictId: "342",
    },
    {
      id: "13057",
      name: "Xã Nam Thanh",
      DistrictId: "342",
    },
    {
      id: "13060",
      name: "Xã Nam Trung",
      DistrictId: "342",
    },
    {
      id: "13063",
      name: "Xã Nam Hồng",
      DistrictId: "342",
    },
    {
      id: "13066",
      name: "Xã Nam Hưng",
      DistrictId: "342",
    },
    {
      id: "13069",
      name: "Xã Nam Hải",
      DistrictId: "342",
    },
    {
      id: "13072",
      name: "Xã Nam Phú",
      DistrictId: "342",
    },
    {
      id: "13075",
      name: "Thị trấn Kiến Xương",
      DistrictId: "343",
    },
    {
      id: "13078",
      name: "Xã Trà Giang",
      DistrictId: "343",
    },
    {
      id: "13081",
      name: "Xã Quốc Tuấn",
      DistrictId: "343",
    },
    {
      id: "13084",
      name: "Xã Vũ Đông",
      DistrictId: "336",
    },
    {
      id: "13087",
      name: "Xã An Bình",
      DistrictId: "343",
    },
    {
      id: "13090",
      name: "Xã Tây Sơn",
      DistrictId: "343",
    },
    {
      id: "13093",
      name: "Xã Hồng Thái",
      DistrictId: "343",
    },
    {
      id: "13096",
      name: "Xã Bình Nguyên",
      DistrictId: "343",
    },
    {
      id: "13102",
      name: "Xã Lê Lợi",
      DistrictId: "343",
    },
    {
      id: "13108",
      name: "Xã Vũ Lạc",
      DistrictId: "336",
    },
    {
      id: "13111",
      name: "Xã Vũ Lễ",
      DistrictId: "343",
    },
    {
      id: "13114",
      name: "Xã Thanh Tân",
      DistrictId: "343",
    },
    {
      id: "13117",
      name: "Xã Thượng Hiền",
      DistrictId: "343",
    },
    {
      id: "13120",
      name: "Xã Nam Cao",
      DistrictId: "343",
    },
    {
      id: "13123",
      name: "Xã Đình Phùng",
      DistrictId: "343",
    },
    {
      id: "13126",
      name: "Xã Vũ Ninh",
      DistrictId: "343",
    },
    {
      id: "13129",
      name: "Xã Vũ An",
      DistrictId: "343",
    },
    {
      id: "13132",
      name: "Xã Quang Lịch",
      DistrictId: "343",
    },
    {
      id: "13135",
      name: "Xã Hòa Bình",
      DistrictId: "343",
    },
    {
      id: "13138",
      name: "Xã Bình Minh",
      DistrictId: "343",
    },
    {
      id: "13141",
      name: "Xã Vũ Quí",
      DistrictId: "343",
    },
    {
      id: "13144",
      name: "Xã Quang Bình",
      DistrictId: "343",
    },
    {
      id: "13150",
      name: "Xã Vũ Trung",
      DistrictId: "343",
    },
    {
      id: "13153",
      name: "Xã Vũ Thắng",
      DistrictId: "343",
    },
    {
      id: "13156",
      name: "Xã Vũ Công",
      DistrictId: "343",
    },
    {
      id: "13159",
      name: "Xã Vũ Hòa",
      DistrictId: "343",
    },
    {
      id: "13162",
      name: "Xã Quang Minh",
      DistrictId: "343",
    },
    {
      id: "13165",
      name: "Xã Quang Trung",
      DistrictId: "343",
    },
    {
      id: "13171",
      name: "Xã Minh Quang",
      DistrictId: "343",
    },
    {
      id: "13174",
      name: "Xã Vũ Bình",
      DistrictId: "343",
    },
    {
      id: "13177",
      name: "Xã Minh Tân",
      DistrictId: "343",
    },
    {
      id: "13180",
      name: "Xã Nam Bình",
      DistrictId: "343",
    },
    {
      id: "13183",
      name: "Xã Bình Thanh",
      DistrictId: "343",
    },
    {
      id: "13186",
      name: "Xã Bình Định",
      DistrictId: "343",
    },
    {
      id: "13189",
      name: "Xã Hồng Tiến",
      DistrictId: "343",
    },
    {
      id: "13192",
      name: "Thị trấn Vũ Thư",
      DistrictId: "344",
    },
    {
      id: "13195",
      name: "Xã Hồng Lý",
      DistrictId: "344",
    },
    {
      id: "13198",
      name: "Xã Đồng Thanh",
      DistrictId: "344",
    },
    {
      id: "13201",
      name: "Xã Xuân Hòa",
      DistrictId: "344",
    },
    {
      id: "13204",
      name: "Xã Hiệp Hòa",
      DistrictId: "344",
    },
    {
      id: "13207",
      name: "Xã Phúc Thành",
      DistrictId: "344",
    },
    {
      id: "13210",
      name: "Xã Tân Phong",
      DistrictId: "344",
    },
    {
      id: "13213",
      name: "Xã Song Lãng",
      DistrictId: "344",
    },
    {
      id: "13216",
      name: "Xã Tân Hòa",
      DistrictId: "344",
    },
    {
      id: "13219",
      name: "Xã Việt Hùng",
      DistrictId: "344",
    },
    {
      id: "13222",
      name: "Xã Minh Lãng",
      DistrictId: "344",
    },
    {
      id: "13225",
      name: "Xã Tân Bình",
      DistrictId: "336",
    },
    {
      id: "13228",
      name: "Xã Minh Khai",
      DistrictId: "344",
    },
    {
      id: "13231",
      name: "Xã Dũng Nghĩa",
      DistrictId: "344",
    },
    {
      id: "13234",
      name: "Xã Minh Quang",
      DistrictId: "344",
    },
    {
      id: "13237",
      name: "Xã Tam Quang",
      DistrictId: "344",
    },
    {
      id: "13240",
      name: "Xã Tân Lập",
      DistrictId: "344",
    },
    {
      id: "13243",
      name: "Xã Bách Thuận",
      DistrictId: "344",
    },
    {
      id: "13246",
      name: "Xã Tự Tân",
      DistrictId: "344",
    },
    {
      id: "13249",
      name: "Xã Song An",
      DistrictId: "344",
    },
    {
      id: "13252",
      name: "Xã Trung An",
      DistrictId: "344",
    },
    {
      id: "13255",
      name: "Xã Vũ Hội",
      DistrictId: "344",
    },
    {
      id: "13258",
      name: "Xã Hòa Bình",
      DistrictId: "344",
    },
    {
      id: "13261",
      name: "Xã Nguyên Xá",
      DistrictId: "344",
    },
    {
      id: "13264",
      name: "Xã Việt Thuận",
      DistrictId: "344",
    },
    {
      id: "13267",
      name: "Xã Vũ Vinh",
      DistrictId: "344",
    },
    {
      id: "13270",
      name: "Xã Vũ Đoài",
      DistrictId: "344",
    },
    {
      id: "13273",
      name: "Xã Vũ Tiến",
      DistrictId: "344",
    },
    {
      id: "13276",
      name: "Xã Vũ Vân",
      DistrictId: "344",
    },
    {
      id: "13279",
      name: "Xã Duy Nhất",
      DistrictId: "344",
    },
    {
      id: "13282",
      name: "Xã Hồng Phong",
      DistrictId: "344",
    },
    {
      id: "13285",
      name: "Phường Quang Trung",
      DistrictId: "347",
    },
    {
      id: "13288",
      name: "Phường Lương Khánh Thiện",
      DistrictId: "347",
    },
    {
      id: "13291",
      name: "Phường Lê Hồng Phong",
      DistrictId: "347",
    },
    {
      id: "13294",
      name: "Phường Minh Khai",
      DistrictId: "347",
    },
    {
      id: "13297",
      name: "Phường Hai Bà Trưng",
      DistrictId: "347",
    },
    {
      id: "13300",
      name: "Phường Trần Hưng Đạo",
      DistrictId: "347",
    },
    {
      id: "13303",
      name: "Phường Lam Hạ",
      DistrictId: "347",
    },
    {
      id: "13306",
      name: "Xã Phù Vân",
      DistrictId: "347",
    },
    {
      id: "13309",
      name: "Phường Liêm Chính",
      DistrictId: "347",
    },
    {
      id: "13312",
      name: "Xã Liêm Chung",
      DistrictId: "347",
    },
    {
      id: "13315",
      name: "Phường Thanh Châu",
      DistrictId: "347",
    },
    {
      id: "13318",
      name: "Phường Châu Sơn",
      DistrictId: "347",
    },
    {
      id: "13321",
      name: "Phường Đồng Văn",
      DistrictId: "349",
    },
    {
      id: "13324",
      name: "Phường Hòa Mạc",
      DistrictId: "349",
    },
    {
      id: "13327",
      name: "Xã Mộc Bắc",
      DistrictId: "349",
    },
    {
      id: "13330",
      name: "Phường Châu Giang",
      DistrictId: "349",
    },
    {
      id: "13333",
      name: "Phường Bạch Thượng",
      DistrictId: "349",
    },
    {
      id: "13336",
      name: "Phường Duy Minh",
      DistrictId: "349",
    },
    {
      id: "13339",
      name: "Xã Mộc Nam",
      DistrictId: "349",
    },
    {
      id: "13342",
      name: "Phường Duy Hải",
      DistrictId: "349",
    },
    {
      id: "13345",
      name: "Xã Chuyên Ngoại",
      DistrictId: "349",
    },
    {
      id: "13348",
      name: "Phường Yên Bắc",
      DistrictId: "349",
    },
    {
      id: "13351",
      name: "Xã Trác Văn",
      DistrictId: "349",
    },
    {
      id: "13354",
      name: "Phường Tiên Nội",
      DistrictId: "349",
    },
    {
      id: "13357",
      name: "Phường Hoàng Đông",
      DistrictId: "349",
    },
    {
      id: "13360",
      name: "Xã Yên Nam",
      DistrictId: "349",
    },
    {
      id: "13363",
      name: "Xã Tiên Ngoại",
      DistrictId: "349",
    },
    {
      id: "13366",
      name: "Xã Tiên Tân",
      DistrictId: "347",
    },
    {
      id: "13369",
      name: "Xã Tiên Sơn",
      DistrictId: "349",
    },
    {
      id: "13372",
      name: "Xã Tiên Hiệp",
      DistrictId: "347",
    },
    {
      id: "13381",
      name: "Xã Tiên Hải",
      DistrictId: "347",
    },
    {
      id: "13384",
      name: "Thị trấn Quế",
      DistrictId: "350",
    },
    {
      id: "13387",
      name: "Xã Nguyễn Úy",
      DistrictId: "350",
    },
    {
      id: "13390",
      name: "Xã Đại Cương",
      DistrictId: "350",
    },
    {
      id: "13393",
      name: "Xã Lê Hồ",
      DistrictId: "350",
    },
    {
      id: "13396",
      name: "Xã Tượng Lĩnh",
      DistrictId: "350",
    },
    {
      id: "13399",
      name: "Xã Nhật Tựu",
      DistrictId: "350",
    },
    {
      id: "13402",
      name: "Xã Nhật Tân",
      DistrictId: "350",
    },
    {
      id: "13405",
      name: "Xã Đồng Hóa",
      DistrictId: "350",
    },
    {
      id: "13408",
      name: "Xã Hoàng Tây",
      DistrictId: "350",
    },
    {
      id: "13411",
      name: "Xã Tân Sơn",
      DistrictId: "350",
    },
    {
      id: "13414",
      name: "Xã Thụy Lôi",
      DistrictId: "350",
    },
    {
      id: "13417",
      name: "Xã Văn Xá",
      DistrictId: "350",
    },
    {
      id: "13420",
      name: "Xã Khả Phong",
      DistrictId: "350",
    },
    {
      id: "13423",
      name: "Xã Ngọc Sơn",
      DistrictId: "350",
    },
    {
      id: "13426",
      name: "Xã Kim Bình",
      DistrictId: "347",
    },
    {
      id: "13429",
      name: "Thị trấn Ba Sao",
      DistrictId: "350",
    },
    {
      id: "13432",
      name: "Xã Liên Sơn",
      DistrictId: "350",
    },
    {
      id: "13435",
      name: "Xã Thi Sơn",
      DistrictId: "350",
    },
    {
      id: "13438",
      name: "Xã Thanh Sơn",
      DistrictId: "350",
    },
    {
      id: "13441",
      name: "Thị trấn Kiện Khê",
      DistrictId: "351",
    },
    {
      id: "13444",
      name: "Xã Liêm Tuyền",
      DistrictId: "347",
    },
    {
      id: "13447",
      name: "Xã Liêm Tiết",
      DistrictId: "347",
    },
    {
      id: "13450",
      name: "Xã Liêm Phong",
      DistrictId: "351",
    },
    {
      id: "13453",
      name: "Xã Thanh Hà",
      DistrictId: "351",
    },
    {
      id: "13456",
      name: "Xã Liêm Cần",
      DistrictId: "351",
    },
    {
      id: "13459",
      name: "Phường Thanh Tuyền",
      DistrictId: "347",
    },
    {
      id: "13465",
      name: "Xã Liêm Thuận",
      DistrictId: "351",
    },
    {
      id: "13468",
      name: "Xã Thanh Thủy",
      DistrictId: "351",
    },
    {
      id: "13471",
      name: "Xã Thanh Phong",
      DistrictId: "351",
    },
    {
      id: "13474",
      name: "Thị trấn Tân Thanh",
      DistrictId: "351",
    },
    {
      id: "13477",
      name: "Xã Thanh Tân",
      DistrictId: "351",
    },
    {
      id: "13480",
      name: "Xã Liêm Túc",
      DistrictId: "351",
    },
    {
      id: "13483",
      name: "Xã Liêm Sơn",
      DistrictId: "351",
    },
    {
      id: "13486",
      name: "Xã Thanh Hương",
      DistrictId: "351",
    },
    {
      id: "13489",
      name: "Xã Thanh Nghị",
      DistrictId: "351",
    },
    {
      id: "13492",
      name: "Xã Thanh Tâm",
      DistrictId: "351",
    },
    {
      id: "13495",
      name: "Xã Thanh Nguyên",
      DistrictId: "351",
    },
    {
      id: "13498",
      name: "Xã Thanh Hải",
      DistrictId: "351",
    },
    {
      id: "13501",
      name: "Thị trấn Bình Mỹ",
      DistrictId: "352",
    },
    {
      id: "13504",
      name: "Xã Bình Nghĩa",
      DistrictId: "352",
    },
    {
      id: "13507",
      name: "Xã Đinh Xá",
      DistrictId: "347",
    },
    {
      id: "13510",
      name: "Xã Tràng An",
      DistrictId: "352",
    },
    {
      id: "13513",
      name: "Xã Trịnh Xá",
      DistrictId: "347",
    },
    {
      id: "13516",
      name: "Xã Đồng Du",
      DistrictId: "352",
    },
    {
      id: "13519",
      name: "Xã Ngọc Lũ",
      DistrictId: "352",
    },
    {
      id: "13522",
      name: "Xã Hưng Công",
      DistrictId: "352",
    },
    {
      id: "13525",
      name: "Xã Đồn Xá",
      DistrictId: "352",
    },
    {
      id: "13528",
      name: "Xã An Ninh",
      DistrictId: "352",
    },
    {
      id: "13531",
      name: "Xã Bồ Đề",
      DistrictId: "352",
    },
    {
      id: "13534",
      name: "Xã Bối Cầu",
      DistrictId: "352",
    },
    {
      id: "13540",
      name: "Xã An Nội",
      DistrictId: "352",
    },
    {
      id: "13543",
      name: "Xã Vũ Bản",
      DistrictId: "352",
    },
    {
      id: "13546",
      name: "Xã Trung Lương",
      DistrictId: "352",
    },
    {
      id: "13552",
      name: "Xã An Đổ",
      DistrictId: "352",
    },
    {
      id: "13555",
      name: "Xã La Sơn",
      DistrictId: "352",
    },
    {
      id: "13558",
      name: "Xã Tiêu Động",
      DistrictId: "352",
    },
    {
      id: "13561",
      name: "Xã An Lão",
      DistrictId: "352",
    },
    {
      id: "13567",
      name: "Xã Hợp Lý",
      DistrictId: "353",
    },
    {
      id: "13570",
      name: "Xã Nguyên Lý",
      DistrictId: "353",
    },
    {
      id: "13573",
      name: "Xã Chính Lý",
      DistrictId: "353",
    },
    {
      id: "13576",
      name: "Xã Chân Lý",
      DistrictId: "353",
    },
    {
      id: "13579",
      name: "Xã Đạo Lý",
      DistrictId: "353",
    },
    {
      id: "13582",
      name: "Xã Công Lý",
      DistrictId: "353",
    },
    {
      id: "13585",
      name: "Xã Văn Lý",
      DistrictId: "353",
    },
    {
      id: "13588",
      name: "Xã Bắc Lý",
      DistrictId: "353",
    },
    {
      id: "13591",
      name: "Xã Đức Lý",
      DistrictId: "353",
    },
    {
      id: "13594",
      name: "Xã Trần Hưng Đạo",
      DistrictId: "353",
    },
    {
      id: "13597",
      name: "Thị trấn Vĩnh Trụ",
      DistrictId: "353",
    },
    {
      id: "13600",
      name: "Xã Nhân Thịnh",
      DistrictId: "353",
    },
    {
      id: "13606",
      name: "Xã Nhân Khang",
      DistrictId: "353",
    },
    {
      id: "13609",
      name: "Xã Nhân Mỹ",
      DistrictId: "353",
    },
    {
      id: "13612",
      name: "Xã Nhân Nghĩa",
      DistrictId: "353",
    },
    {
      id: "13615",
      name: "Xã Nhân Chính",
      DistrictId: "353",
    },
    {
      id: "13618",
      name: "Xã Nhân Bình",
      DistrictId: "353",
    },
    {
      id: "13621",
      name: "Xã Phú Phúc",
      DistrictId: "353",
    },
    {
      id: "13624",
      name: "Xã Xuân Khê",
      DistrictId: "353",
    },
    {
      id: "13627",
      name: "Xã Tiến Thắng",
      DistrictId: "353",
    },
    {
      id: "13630",
      name: "Xã Hòa Hậu",
      DistrictId: "353",
    },
    {
      id: "13633",
      name: "Phường Hạ Long",
      DistrictId: "356",
    },
    {
      id: "13636",
      name: "Phường Trần Tế Xương",
      DistrictId: "356",
    },
    {
      id: "13639",
      name: "Phường Vị Hoàng",
      DistrictId: "356",
    },
    {
      id: "13642",
      name: "Phường Vị Xuyên",
      DistrictId: "356",
    },
    {
      id: "13645",
      name: "Phường Quang Trung",
      DistrictId: "356",
    },
    {
      id: "13648",
      name: "Phường Cửa Bắc",
      DistrictId: "356",
    },
    {
      id: "13651",
      name: "Phường Nguyễn Du",
      DistrictId: "356",
    },
    {
      id: "13654",
      name: "Phường Bà Triệu",
      DistrictId: "356",
    },
    {
      id: "13657",
      name: "Phường Trường Thi",
      DistrictId: "356",
    },
    {
      id: "13660",
      name: "Phường Phan Đình Phùng",
      DistrictId: "356",
    },
    {
      id: "13663",
      name: "Phường Ngô Quyền",
      DistrictId: "356",
    },
    {
      id: "13666",
      name: "Phường Trần Hưng Đạo",
      DistrictId: "356",
    },
    {
      id: "13669",
      name: "Phường Trần Đăng Ninh",
      DistrictId: "356",
    },
    {
      id: "13672",
      name: "Phường Năng Tĩnh",
      DistrictId: "356",
    },
    {
      id: "13675",
      name: "Phường Văn Miếu",
      DistrictId: "356",
    },
    {
      id: "13678",
      name: "Phường Trần Quang Khải",
      DistrictId: "356",
    },
    {
      id: "13681",
      name: "Phường Thống Nhất",
      DistrictId: "356",
    },
    {
      id: "13684",
      name: "Phường Lộc Hạ",
      DistrictId: "356",
    },
    {
      id: "13687",
      name: "Phường Lộc Vượng",
      DistrictId: "356",
    },
    {
      id: "13690",
      name: "Phường Cửa Nam",
      DistrictId: "356",
    },
    {
      id: "13693",
      name: "Phường Lộc Hòa",
      DistrictId: "356",
    },
    {
      id: "13696",
      name: "Xã Nam Phong",
      DistrictId: "356",
    },
    {
      id: "13699",
      name: "Phường Mỹ Xá",
      DistrictId: "356",
    },
    {
      id: "13702",
      name: "Xã Lộc An",
      DistrictId: "356",
    },
    {
      id: "13705",
      name: "Xã Nam Vân",
      DistrictId: "356",
    },
    {
      id: "13708",
      name: "Thị trấn Mỹ Lộc",
      DistrictId: "358",
    },
    {
      id: "13711",
      name: "Xã Mỹ Hà",
      DistrictId: "358",
    },
    {
      id: "13714",
      name: "Xã Mỹ Tiến",
      DistrictId: "358",
    },
    {
      id: "13717",
      name: "Xã Mỹ Thắng",
      DistrictId: "358",
    },
    {
      id: "13720",
      name: "Xã Mỹ Trung",
      DistrictId: "358",
    },
    {
      id: "13723",
      name: "Xã Mỹ Tân",
      DistrictId: "358",
    },
    {
      id: "13726",
      name: "Xã Mỹ Phúc",
      DistrictId: "358",
    },
    {
      id: "13729",
      name: "Xã Mỹ Hưng",
      DistrictId: "358",
    },
    {
      id: "13732",
      name: "Xã Mỹ Thuận",
      DistrictId: "358",
    },
    {
      id: "13735",
      name: "Xã Mỹ Thịnh",
      DistrictId: "358",
    },
    {
      id: "13738",
      name: "Xã Mỹ Thành",
      DistrictId: "358",
    },
    {
      id: "13741",
      name: "Thị trấn Gôi",
      DistrictId: "359",
    },
    {
      id: "13744",
      name: "Xã Minh Thuận",
      DistrictId: "359",
    },
    {
      id: "13747",
      name: "Xã Hiển Khánh",
      DistrictId: "359",
    },
    {
      id: "13750",
      name: "Xã Tân Khánh",
      DistrictId: "359",
    },
    {
      id: "13753",
      name: "Xã Hợp Hưng",
      DistrictId: "359",
    },
    {
      id: "13756",
      name: "Xã Đại An",
      DistrictId: "359",
    },
    {
      id: "13759",
      name: "Xã Tân Thành",
      DistrictId: "359",
    },
    {
      id: "13762",
      name: "Xã Cộng Hòa",
      DistrictId: "359",
    },
    {
      id: "13765",
      name: "Xã Trung Thành",
      DistrictId: "359",
    },
    {
      id: "13768",
      name: "Xã Quang Trung",
      DistrictId: "359",
    },
    {
      id: "13771",
      name: "Xã Minh Tân",
      DistrictId: "359",
    },
    {
      id: "13774",
      name: "Xã Liên Bảo",
      DistrictId: "359",
    },
    {
      id: "13777",
      name: "Xã Thành Lợi",
      DistrictId: "359",
    },
    {
      id: "13780",
      name: "Xã Kim Thái",
      DistrictId: "359",
    },
    {
      id: "13783",
      name: "Xã Liên Minh",
      DistrictId: "359",
    },
    {
      id: "13786",
      name: "Xã Đại Thắng",
      DistrictId: "359",
    },
    {
      id: "13789",
      name: "Xã Tam Thanh",
      DistrictId: "359",
    },
    {
      id: "13792",
      name: "Xã Vĩnh Hào",
      DistrictId: "359",
    },
    {
      id: "13795",
      name: "Thị trấn Lâm",
      DistrictId: "360",
    },
    {
      id: "13798",
      name: "Xã Yên Trung",
      DistrictId: "360",
    },
    {
      id: "13801",
      name: "Xã Yên Thành",
      DistrictId: "360",
    },
    {
      id: "13804",
      name: "Xã Yên Tân",
      DistrictId: "360",
    },
    {
      id: "13807",
      name: "Xã Yên Lợi",
      DistrictId: "360",
    },
    {
      id: "13810",
      name: "Xã Yên Thọ",
      DistrictId: "360",
    },
    {
      id: "13813",
      name: "Xã Yên Nghĩa",
      DistrictId: "360",
    },
    {
      id: "13816",
      name: "Xã Yên Minh",
      DistrictId: "360",
    },
    {
      id: "13819",
      name: "Xã Yên Phương",
      DistrictId: "360",
    },
    {
      id: "13822",
      name: "Xã Yên Chính",
      DistrictId: "360",
    },
    {
      id: "13825",
      name: "Xã Yên Bình",
      DistrictId: "360",
    },
    {
      id: "13828",
      name: "Xã Yên Phú",
      DistrictId: "360",
    },
    {
      id: "13831",
      name: "Xã Yên Mỹ",
      DistrictId: "360",
    },
    {
      id: "13834",
      name: "Xã Yên Dương",
      DistrictId: "360",
    },
    {
      id: "13840",
      name: "Xã Yên Hưng",
      DistrictId: "360",
    },
    {
      id: "13843",
      name: "Xã Yên Khánh",
      DistrictId: "360",
    },
    {
      id: "13846",
      name: "Xã Yên Phong",
      DistrictId: "360",
    },
    {
      id: "13849",
      name: "Xã Yên Ninh",
      DistrictId: "360",
    },
    {
      id: "13852",
      name: "Xã Yên Lương",
      DistrictId: "360",
    },
    {
      id: "13855",
      name: "Xã Yên Hồng",
      DistrictId: "360",
    },
    {
      id: "13858",
      name: "Xã Yên Quang",
      DistrictId: "360",
    },
    {
      id: "13861",
      name: "Xã Yên Tiến",
      DistrictId: "360",
    },
    {
      id: "13864",
      name: "Xã Yên Thắng",
      DistrictId: "360",
    },
    {
      id: "13867",
      name: "Xã Yên Phúc",
      DistrictId: "360",
    },
    {
      id: "13870",
      name: "Xã Yên Cường",
      DistrictId: "360",
    },
    {
      id: "13873",
      name: "Xã Yên Lộc",
      DistrictId: "360",
    },
    {
      id: "13876",
      name: "Xã Yên Bằng",
      DistrictId: "360",
    },
    {
      id: "13879",
      name: "Xã Yên Đồng",
      DistrictId: "360",
    },
    {
      id: "13882",
      name: "Xã Yên Khang",
      DistrictId: "360",
    },
    {
      id: "13885",
      name: "Xã Yên Nhân",
      DistrictId: "360",
    },
    {
      id: "13888",
      name: "Xã Yên Trị",
      DistrictId: "360",
    },
    {
      id: "13891",
      name: "Thị trấn Liễu Đề",
      DistrictId: "361",
    },
    {
      id: "13894",
      name: "Thị trấn Rạng Đông",
      DistrictId: "361",
    },
    {
      id: "13897",
      name: "Xã Nghĩa Đồng",
      DistrictId: "361",
    },
    {
      id: "13900",
      name: "Xã Nghĩa Thịnh",
      DistrictId: "361",
    },
    {
      id: "13903",
      name: "Xã Nghĩa Minh",
      DistrictId: "361",
    },
    {
      id: "13906",
      name: "Xã Nghĩa Thái",
      DistrictId: "361",
    },
    {
      id: "13909",
      name: "Xã Hoàng Nam",
      DistrictId: "361",
    },
    {
      id: "13912",
      name: "Xã Nghĩa Châu",
      DistrictId: "361",
    },
    {
      id: "13915",
      name: "Xã Nghĩa Trung",
      DistrictId: "361",
    },
    {
      id: "13918",
      name: "Xã Nghĩa Sơn",
      DistrictId: "361",
    },
    {
      id: "13921",
      name: "Xã Nghĩa Lạc",
      DistrictId: "361",
    },
    {
      id: "13924",
      name: "Xã Nghĩa Hồng",
      DistrictId: "361",
    },
    {
      id: "13927",
      name: "Xã Nghĩa Phong",
      DistrictId: "361",
    },
    {
      id: "13930",
      name: "Xã Nghĩa Phú",
      DistrictId: "361",
    },
    {
      id: "13933",
      name: "Xã Nghĩa Bình",
      DistrictId: "361",
    },
    {
      id: "13936",
      name: "Thị trấn Quỹ Nhất",
      DistrictId: "361",
    },
    {
      id: "13939",
      name: "Xã Nghĩa Tân",
      DistrictId: "361",
    },
    {
      id: "13942",
      name: "Xã Nghĩa Hùng",
      DistrictId: "361",
    },
    {
      id: "13945",
      name: "Xã Nghĩa Lâm",
      DistrictId: "361",
    },
    {
      id: "13948",
      name: "Xã Nghĩa Thành",
      DistrictId: "361",
    },
    {
      id: "13951",
      name: "Xã Phúc Thắng",
      DistrictId: "361",
    },
    {
      id: "13954",
      name: "Xã Nghĩa Lợi",
      DistrictId: "361",
    },
    {
      id: "13957",
      name: "Xã Nghĩa Hải",
      DistrictId: "361",
    },
    {
      id: "13963",
      name: "Xã Nam Điền",
      DistrictId: "361",
    },
    {
      id: "13966",
      name: "Thị trấn Nam Giang",
      DistrictId: "362",
    },
    {
      id: "13969",
      name: "Xã Nam Mỹ",
      DistrictId: "362",
    },
    {
      id: "13972",
      name: "Xã Điền Xá",
      DistrictId: "362",
    },
    {
      id: "13975",
      name: "Xã Nghĩa An",
      DistrictId: "362",
    },
    {
      id: "13978",
      name: "Xã Nam Thắng",
      DistrictId: "362",
    },
    {
      id: "13981",
      name: "Xã Nam Toàn",
      DistrictId: "362",
    },
    {
      id: "13984",
      name: "Xã Hồng Quang",
      DistrictId: "362",
    },
    {
      id: "13987",
      name: "Xã Tân Thịnh",
      DistrictId: "362",
    },
    {
      id: "13990",
      name: "Xã Nam Cường",
      DistrictId: "362",
    },
    {
      id: "13993",
      name: "Xã Nam Hồng",
      DistrictId: "362",
    },
    {
      id: "13996",
      name: "Xã Nam Hùng",
      DistrictId: "362",
    },
    {
      id: "13999",
      name: "Xã Nam Hoa",
      DistrictId: "362",
    },
    {
      id: "14002",
      name: "Xã Nam Dương",
      DistrictId: "362",
    },
    {
      id: "14005",
      name: "Xã Nam Thanh",
      DistrictId: "362",
    },
    {
      id: "14008",
      name: "Xã Nam Lợi",
      DistrictId: "362",
    },
    {
      id: "14011",
      name: "Xã Bình Minh",
      DistrictId: "362",
    },
    {
      id: "14014",
      name: "Xã Đồng Sơn",
      DistrictId: "362",
    },
    {
      id: "14017",
      name: "Xã Nam Tiến",
      DistrictId: "362",
    },
    {
      id: "14020",
      name: "Xã Nam Hải",
      DistrictId: "362",
    },
    {
      id: "14023",
      name: "Xã Nam Thái",
      DistrictId: "362",
    },
    {
      id: "14026",
      name: "Thị trấn Cổ Lễ",
      DistrictId: "363",
    },
    {
      id: "14029",
      name: "Xã Phương Định",
      DistrictId: "363",
    },
    {
      id: "14032",
      name: "Xã Trực Chính",
      DistrictId: "363",
    },
    {
      id: "14035",
      name: "Xã Trung Đông",
      DistrictId: "363",
    },
    {
      id: "14038",
      name: "Xã Liêm Hải",
      DistrictId: "363",
    },
    {
      id: "14041",
      name: "Xã Trực Tuấn",
      DistrictId: "363",
    },
    {
      id: "14044",
      name: "Xã Việt Hùng",
      DistrictId: "363",
    },
    {
      id: "14047",
      name: "Xã Trực Đạo",
      DistrictId: "363",
    },
    {
      id: "14050",
      name: "Xã Trực Hưng",
      DistrictId: "363",
    },
    {
      id: "14053",
      name: "Xã Trực Nội",
      DistrictId: "363",
    },
    {
      id: "14056",
      name: "Thị trấn Cát Thành",
      DistrictId: "363",
    },
    {
      id: "14059",
      name: "Xã Trực Thanh",
      DistrictId: "363",
    },
    {
      id: "14062",
      name: "Xã Trực Khang",
      DistrictId: "363",
    },
    {
      id: "14065",
      name: "Xã Trực Thuận",
      DistrictId: "363",
    },
    {
      id: "14068",
      name: "Xã Trực Mỹ",
      DistrictId: "363",
    },
    {
      id: "14071",
      name: "Xã Trực Đại",
      DistrictId: "363",
    },
    {
      id: "14074",
      name: "Xã Trực Cường",
      DistrictId: "363",
    },
    {
      id: "14077",
      name: "Thị trấn Ninh Cường",
      DistrictId: "363",
    },
    {
      id: "14080",
      name: "Xã Trực Thái",
      DistrictId: "363",
    },
    {
      id: "14083",
      name: "Xã Trực Hùng",
      DistrictId: "363",
    },
    {
      id: "14086",
      name: "Xã Trực Thắng",
      DistrictId: "363",
    },
    {
      id: "14089",
      name: "Thị trấn Xuân Trường",
      DistrictId: "364",
    },
    {
      id: "14092",
      name: "Xã Xuân Châu",
      DistrictId: "364",
    },
    {
      id: "14095",
      name: "Xã Xuân Hồng",
      DistrictId: "364",
    },
    {
      id: "14098",
      name: "Xã Xuân Thành",
      DistrictId: "364",
    },
    {
      id: "14101",
      name: "Xã Xuân Thượng",
      DistrictId: "364",
    },
    {
      id: "14104",
      name: "Xã Xuân Phong",
      DistrictId: "364",
    },
    {
      id: "14107",
      name: "Xã Xuân Đài",
      DistrictId: "364",
    },
    {
      id: "14110",
      name: "Xã Xuân Tân",
      DistrictId: "364",
    },
    {
      id: "14113",
      name: "Xã Xuân Thủy",
      DistrictId: "364",
    },
    {
      id: "14116",
      name: "Xã Xuân Ngọc",
      DistrictId: "364",
    },
    {
      id: "14119",
      name: "Xã Xuân Bắc",
      DistrictId: "364",
    },
    {
      id: "14122",
      name: "Xã Xuân Phương",
      DistrictId: "364",
    },
    {
      id: "14125",
      name: "Xã Thọ Nghiệp",
      DistrictId: "364",
    },
    {
      id: "14128",
      name: "Xã Xuân Phú",
      DistrictId: "364",
    },
    {
      id: "14131",
      name: "Xã Xuân Trung",
      DistrictId: "364",
    },
    {
      id: "14134",
      name: "Xã Xuân Vinh",
      DistrictId: "364",
    },
    {
      id: "14137",
      name: "Xã Xuân Kiên",
      DistrictId: "364",
    },
    {
      id: "14140",
      name: "Xã Xuân Tiến",
      DistrictId: "364",
    },
    {
      id: "14143",
      name: "Xã Xuân Ninh",
      DistrictId: "364",
    },
    {
      id: "14146",
      name: "Xã Xuân Hòa",
      DistrictId: "364",
    },
    {
      id: "14149",
      name: "Thị trấn Ngô Đồng",
      DistrictId: "365",
    },
    {
      id: "14152",
      name: "Thị trấn Quất Lâm",
      DistrictId: "365",
    },
    {
      id: "14155",
      name: "Xã Giao Hương",
      DistrictId: "365",
    },
    {
      id: "14158",
      name: "Xã Hồng Thuận",
      DistrictId: "365",
    },
    {
      id: "14161",
      name: "Xã Giao Thiện",
      DistrictId: "365",
    },
    {
      id: "14164",
      name: "Xã Giao Thanh",
      DistrictId: "365",
    },
    {
      id: "14167",
      name: "Xã Hoành Sơn",
      DistrictId: "365",
    },
    {
      id: "14170",
      name: "Xã Bình Hòa",
      DistrictId: "365",
    },
    {
      id: "14173",
      name: "Xã Giao Tiến",
      DistrictId: "365",
    },
    {
      id: "14176",
      name: "Xã Giao Hà",
      DistrictId: "365",
    },
    {
      id: "14179",
      name: "Xã Giao Nhân",
      DistrictId: "365",
    },
    {
      id: "14182",
      name: "Xã Giao An",
      DistrictId: "365",
    },
    {
      id: "14185",
      name: "Xã Giao Lạc",
      DistrictId: "365",
    },
    {
      id: "14188",
      name: "Xã Giao Châu",
      DistrictId: "365",
    },
    {
      id: "14191",
      name: "Xã Giao Tân",
      DistrictId: "365",
    },
    {
      id: "14194",
      name: "Xã Giao Yến",
      DistrictId: "365",
    },
    {
      id: "14197",
      name: "Xã Giao Xuân",
      DistrictId: "365",
    },
    {
      id: "14200",
      name: "Xã Giao Thịnh",
      DistrictId: "365",
    },
    {
      id: "14203",
      name: "Xã Giao Hải",
      DistrictId: "365",
    },
    {
      id: "14206",
      name: "Xã Bạch Long",
      DistrictId: "365",
    },
    {
      id: "14209",
      name: "Xã Giao Long",
      DistrictId: "365",
    },
    {
      id: "14212",
      name: "Xã Giao Phong",
      DistrictId: "365",
    },
    {
      id: "14215",
      name: "Thị trấn Yên Định",
      DistrictId: "366",
    },
    {
      id: "14218",
      name: "Thị trấn Cồn",
      DistrictId: "366",
    },
    {
      id: "14221",
      name: "Thị trấn Thịnh Long",
      DistrictId: "366",
    },
    {
      id: "14224",
      name: "Xã Hải Nam",
      DistrictId: "366",
    },
    {
      id: "14227",
      name: "Xã Hải Trung",
      DistrictId: "366",
    },
    {
      id: "14230",
      name: "Xã Hải Vân",
      DistrictId: "366",
    },
    {
      id: "14233",
      name: "Xã Hải Minh",
      DistrictId: "366",
    },
    {
      id: "14236",
      name: "Xã Hải Anh",
      DistrictId: "366",
    },
    {
      id: "14239",
      name: "Xã Hải Hưng",
      DistrictId: "366",
    },
    {
      id: "14242",
      name: "Xã Hải Bắc",
      DistrictId: "366",
    },
    {
      id: "14245",
      name: "Xã Hải Phúc",
      DistrictId: "366",
    },
    {
      id: "14248",
      name: "Xã Hải Thanh",
      DistrictId: "366",
    },
    {
      id: "14251",
      name: "Xã Hải Hà",
      DistrictId: "366",
    },
    {
      id: "14254",
      name: "Xã Hải Long",
      DistrictId: "366",
    },
    {
      id: "14257",
      name: "Xã Hải Phương",
      DistrictId: "366",
    },
    {
      id: "14260",
      name: "Xã Hải Đường",
      DistrictId: "366",
    },
    {
      id: "14263",
      name: "Xã Hải Lộc",
      DistrictId: "366",
    },
    {
      id: "14266",
      name: "Xã Hải Quang",
      DistrictId: "366",
    },
    {
      id: "14269",
      name: "Xã Hải Đông",
      DistrictId: "366",
    },
    {
      id: "14272",
      name: "Xã Hải Sơn",
      DistrictId: "366",
    },
    {
      id: "14275",
      name: "Xã Hải Tân",
      DistrictId: "366",
    },
    {
      id: "14281",
      name: "Xã Hải Phong",
      DistrictId: "366",
    },
    {
      id: "14284",
      name: "Xã Hải An",
      DistrictId: "366",
    },
    {
      id: "14287",
      name: "Xã Hải Tây",
      DistrictId: "366",
    },
    {
      id: "14290",
      name: "Xã Hải Lý",
      DistrictId: "366",
    },
    {
      id: "14293",
      name: "Xã Hải Phú",
      DistrictId: "366",
    },
    {
      id: "14296",
      name: "Xã Hải Giang",
      DistrictId: "366",
    },
    {
      id: "14299",
      name: "Xã Hải Cường",
      DistrictId: "366",
    },
    {
      id: "14302",
      name: "Xã Hải Ninh",
      DistrictId: "366",
    },
    {
      id: "14305",
      name: "Xã Hải Chính",
      DistrictId: "366",
    },
    {
      id: "14308",
      name: "Xã Hải Xuân",
      DistrictId: "366",
    },
    {
      id: "14311",
      name: "Xã Hải Châu",
      DistrictId: "366",
    },
    {
      id: "14314",
      name: "Xã Hải Triều",
      DistrictId: "366",
    },
    {
      id: "14317",
      name: "Xã Hải Hòa",
      DistrictId: "366",
    },
    {
      id: "14320",
      name: "Phường Đông Thành",
      DistrictId: "369",
    },
    {
      id: "14323",
      name: "Phường Tân Thành",
      DistrictId: "369",
    },
    {
      id: "14326",
      name: "Phường Thanh Bình",
      DistrictId: "369",
    },
    {
      id: "14329",
      name: "Phường Vân Giang",
      DistrictId: "369",
    },
    {
      id: "14332",
      name: "Phường Bích Đào",
      DistrictId: "369",
    },
    {
      id: "14335",
      name: "Phường Phúc Thành",
      DistrictId: "369",
    },
    {
      id: "14338",
      name: "Phường Nam Bình",
      DistrictId: "369",
    },
    {
      id: "14341",
      name: "Phường Nam Thành",
      DistrictId: "369",
    },
    {
      id: "14344",
      name: "Phường Ninh Khánh",
      DistrictId: "369",
    },
    {
      id: "14347",
      name: "Xã Ninh Nhất",
      DistrictId: "369",
    },
    {
      id: "14350",
      name: "Xã Ninh Tiến",
      DistrictId: "369",
    },
    {
      id: "14353",
      name: "Xã Ninh Phúc",
      DistrictId: "369",
    },
    {
      id: "14356",
      name: "Phường Ninh Sơn",
      DistrictId: "369",
    },
    {
      id: "14359",
      name: "Phường Ninh Phong",
      DistrictId: "369",
    },
    {
      id: "14362",
      name: "Phường Bắc Sơn",
      DistrictId: "370",
    },
    {
      id: "14365",
      name: "Phường Trung Sơn",
      DistrictId: "370",
    },
    {
      id: "14368",
      name: "Phường Nam Sơn",
      DistrictId: "370",
    },
    {
      id: "14369",
      name: "Phường Tây Sơn",
      DistrictId: "370",
    },
    {
      id: "14371",
      name: "Xã Yên Sơn",
      DistrictId: "370",
    },
    {
      id: "14374",
      name: "Phường Yên Bình",
      DistrictId: "370",
    },
    {
      id: "14375",
      name: "Phường Tân Bình",
      DistrictId: "370",
    },
    {
      id: "14377",
      name: "Xã Quang Sơn",
      DistrictId: "370",
    },
    {
      id: "14380",
      name: "Xã Đông Sơn",
      DistrictId: "370",
    },
    {
      id: "14383",
      name: "Thị trấn Nho Quan",
      DistrictId: "372",
    },
    {
      id: "14386",
      name: "Xã Xích Thổ",
      DistrictId: "372",
    },
    {
      id: "14389",
      name: "Xã Gia Lâm",
      DistrictId: "372",
    },
    {
      id: "14392",
      name: "Xã Gia Sơn",
      DistrictId: "372",
    },
    {
      id: "14395",
      name: "Xã Thạch Bình",
      DistrictId: "372",
    },
    {
      id: "14398",
      name: "Xã Gia Thủy",
      DistrictId: "372",
    },
    {
      id: "14401",
      name: "Xã Gia Tường",
      DistrictId: "372",
    },
    {
      id: "14404",
      name: "Xã Cúc Phương",
      DistrictId: "372",
    },
    {
      id: "14407",
      name: "Xã Phú Sơn",
      DistrictId: "372",
    },
    {
      id: "14410",
      name: "Xã Đức Long",
      DistrictId: "372",
    },
    {
      id: "14413",
      name: "Xã Lạc Vân",
      DistrictId: "372",
    },
    {
      id: "14416",
      name: "Xã Đồng Phong",
      DistrictId: "372",
    },
    {
      id: "14419",
      name: "Xã Yên Quang",
      DistrictId: "372",
    },
    {
      id: "14422",
      name: "Xã Lạng Phong",
      DistrictId: "372",
    },
    {
      id: "14425",
      name: "Xã Thượng Hòa",
      DistrictId: "372",
    },
    {
      id: "14428",
      name: "Xã Văn Phong",
      DistrictId: "372",
    },
    {
      id: "14431",
      name: "Xã Văn Phương",
      DistrictId: "372",
    },
    {
      id: "14434",
      name: "Xã Thanh Lạc",
      DistrictId: "372",
    },
    {
      id: "14437",
      name: "Xã Sơn Lai",
      DistrictId: "372",
    },
    {
      id: "14440",
      name: "Xã Sơn Thành",
      DistrictId: "372",
    },
    {
      id: "14443",
      name: "Xã Văn Phú",
      DistrictId: "372",
    },
    {
      id: "14446",
      name: "Xã Phú Lộc",
      DistrictId: "372",
    },
    {
      id: "14449",
      name: "Xã Kỳ Phú",
      DistrictId: "372",
    },
    {
      id: "14452",
      name: "Xã Quỳnh Lưu",
      DistrictId: "372",
    },
    {
      id: "14455",
      name: "Xã Sơn Hà",
      DistrictId: "372",
    },
    {
      id: "14458",
      name: "Xã Phú Long",
      DistrictId: "372",
    },
    {
      id: "14461",
      name: "Xã Quảng Lạc",
      DistrictId: "372",
    },
    {
      id: "14464",
      name: "Thị trấn Me",
      DistrictId: "373",
    },
    {
      id: "14467",
      name: "Xã Gia Hòa",
      DistrictId: "373",
    },
    {
      id: "14470",
      name: "Xã Gia Hưng",
      DistrictId: "373",
    },
    {
      id: "14473",
      name: "Xã Liên Sơn",
      DistrictId: "373",
    },
    {
      id: "14476",
      name: "Xã Gia Thanh",
      DistrictId: "373",
    },
    {
      id: "14479",
      name: "Xã Gia Vân",
      DistrictId: "373",
    },
    {
      id: "14482",
      name: "Xã Gia Phú",
      DistrictId: "373",
    },
    {
      id: "14485",
      name: "Xã Gia Xuân",
      DistrictId: "373",
    },
    {
      id: "14488",
      name: "Xã Gia Lập",
      DistrictId: "373",
    },
    {
      id: "14491",
      name: "Xã Gia Vượng",
      DistrictId: "373",
    },
    {
      id: "14494",
      name: "Xã Gia Trấn",
      DistrictId: "373",
    },
    {
      id: "14497",
      name: "Xã Gia Thịnh",
      DistrictId: "373",
    },
    {
      id: "14500",
      name: "Xã Gia Phương",
      DistrictId: "373",
    },
    {
      id: "14503",
      name: "Xã Gia Tân",
      DistrictId: "373",
    },
    {
      id: "14506",
      name: "Xã Gia Thắng",
      DistrictId: "373",
    },
    {
      id: "14509",
      name: "Xã Gia Trung",
      DistrictId: "373",
    },
    {
      id: "14512",
      name: "Xã Gia Minh",
      DistrictId: "373",
    },
    {
      id: "14515",
      name: "Xã Gia Lạc",
      DistrictId: "373",
    },
    {
      id: "14518",
      name: "Xã Gia Tiến",
      DistrictId: "373",
    },
    {
      id: "14521",
      name: "Xã Gia Sinh",
      DistrictId: "373",
    },
    {
      id: "14524",
      name: "Xã Gia Phong",
      DistrictId: "373",
    },
    {
      id: "14527",
      name: "Thị trấn Thiên Tôn",
      DistrictId: "374",
    },
    {
      id: "14530",
      name: "Xã Ninh Giang",
      DistrictId: "374",
    },
    {
      id: "14533",
      name: "Xã Trường Yên",
      DistrictId: "374",
    },
    {
      id: "14536",
      name: "Xã Ninh Khang",
      DistrictId: "374",
    },
    {
      id: "14539",
      name: "Xã Ninh Mỹ",
      DistrictId: "374",
    },
    {
      id: "14542",
      name: "Xã Ninh Hòa",
      DistrictId: "374",
    },
    {
      id: "14545",
      name: "Xã Ninh Xuân",
      DistrictId: "374",
    },
    {
      id: "14548",
      name: "Xã Ninh Hải",
      DistrictId: "374",
    },
    {
      id: "14551",
      name: "Xã Ninh Thắng",
      DistrictId: "374",
    },
    {
      id: "14554",
      name: "Xã Ninh Vân",
      DistrictId: "374",
    },
    {
      id: "14557",
      name: "Xã Ninh An",
      DistrictId: "374",
    },
    {
      id: "14560",
      name: "Thị trấn Yên Ninh",
      DistrictId: "375",
    },
    {
      id: "14563",
      name: "Xã Khánh Tiên",
      DistrictId: "375",
    },
    {
      id: "14566",
      name: "Xã Khánh Phú",
      DistrictId: "375",
    },
    {
      id: "14569",
      name: "Xã Khánh Hòa",
      DistrictId: "375",
    },
    {
      id: "14572",
      name: "Xã Khánh Lợi",
      DistrictId: "375",
    },
    {
      id: "14575",
      name: "Xã Khánh An",
      DistrictId: "375",
    },
    {
      id: "14578",
      name: "Xã Khánh Cường",
      DistrictId: "375",
    },
    {
      id: "14581",
      name: "Xã Khánh Cư",
      DistrictId: "375",
    },
    {
      id: "14584",
      name: "Xã Khánh Thiện",
      DistrictId: "375",
    },
    {
      id: "14587",
      name: "Xã Khánh Hải",
      DistrictId: "375",
    },
    {
      id: "14590",
      name: "Xã Khánh Trung",
      DistrictId: "375",
    },
    {
      id: "14593",
      name: "Xã Khánh Mậu",
      DistrictId: "375",
    },
    {
      id: "14596",
      name: "Xã Khánh Vân",
      DistrictId: "375",
    },
    {
      id: "14599",
      name: "Xã Khánh Hội",
      DistrictId: "375",
    },
    {
      id: "14602",
      name: "Xã Khánh Công",
      DistrictId: "375",
    },
    {
      id: "14608",
      name: "Xã Khánh Thành",
      DistrictId: "375",
    },
    {
      id: "14611",
      name: "Xã Khánh Nhạc",
      DistrictId: "375",
    },
    {
      id: "14614",
      name: "Xã Khánh Thủy",
      DistrictId: "375",
    },
    {
      id: "14617",
      name: "Xã Khánh Hồng",
      DistrictId: "375",
    },
    {
      id: "14620",
      name: "Thị trấn Phát Diệm",
      DistrictId: "376",
    },
    {
      id: "14623",
      name: "Thị trấn Bình Minh",
      DistrictId: "376",
    },
    {
      id: "14629",
      name: "Xã Hồi Ninh",
      DistrictId: "376",
    },
    {
      id: "14632",
      name: "Xã Xuân Chính",
      DistrictId: "376",
    },
    {
      id: "14635",
      name: "Xã Kim Định",
      DistrictId: "376",
    },
    {
      id: "14638",
      name: "Xã Ân Hòa",
      DistrictId: "376",
    },
    {
      id: "14641",
      name: "Xã Hùng Tiến",
      DistrictId: "376",
    },
    {
      id: "14647",
      name: "Xã Quang Thiện",
      DistrictId: "376",
    },
    {
      id: "14650",
      name: "Xã Như Hòa",
      DistrictId: "376",
    },
    {
      id: "14653",
      name: "Xã Chất Bình",
      DistrictId: "376",
    },
    {
      id: "14656",
      name: "Xã Đồng Hướng",
      DistrictId: "376",
    },
    {
      id: "14659",
      name: "Xã Kim Chính",
      DistrictId: "376",
    },
    {
      id: "14662",
      name: "Xã Thượng Kiệm",
      DistrictId: "376",
    },
    {
      id: "14665",
      name: "Xã Lưu Phương",
      DistrictId: "376",
    },
    {
      id: "14668",
      name: "Xã Tân Thành",
      DistrictId: "376",
    },
    {
      id: "14671",
      name: "Xã Yên Lộc",
      DistrictId: "376",
    },
    {
      id: "14674",
      name: "Xã Lai Thành",
      DistrictId: "376",
    },
    {
      id: "14677",
      name: "Xã Định Hóa",
      DistrictId: "376",
    },
    {
      id: "14680",
      name: "Xã Văn Hải",
      DistrictId: "376",
    },
    {
      id: "14683",
      name: "Xã Kim Tân",
      DistrictId: "376",
    },
    {
      id: "14686",
      name: "Xã Kim Mỹ",
      DistrictId: "376",
    },
    {
      id: "14689",
      name: "Xã Cồn Thoi",
      DistrictId: "376",
    },
    {
      id: "14692",
      name: "Xã Kim Hải",
      DistrictId: "376",
    },
    {
      id: "14695",
      name: "Xã Kim Trung",
      DistrictId: "376",
    },
    {
      id: "14698",
      name: "Xã Kim Đông",
      DistrictId: "376",
    },
    {
      id: "14701",
      name: "Thị trấn Yên Thịnh",
      DistrictId: "377",
    },
    {
      id: "14704",
      name: "Xã Khánh Thượng",
      DistrictId: "377",
    },
    {
      id: "14707",
      name: "Xã Khánh Dương",
      DistrictId: "377",
    },
    {
      id: "14710",
      name: "Xã Mai Sơn",
      DistrictId: "377",
    },
    {
      id: "14713",
      name: "Xã Khánh Thịnh",
      DistrictId: "377",
    },
    {
      id: "14719",
      name: "Xã Yên Phong",
      DistrictId: "377",
    },
    {
      id: "14722",
      name: "Xã Yên Hòa",
      DistrictId: "377",
    },
    {
      id: "14725",
      name: "Xã Yên Thắng",
      DistrictId: "377",
    },
    {
      id: "14728",
      name: "Xã Yên Từ",
      DistrictId: "377",
    },
    {
      id: "14731",
      name: "Xã Yên Hưng",
      DistrictId: "377",
    },
    {
      id: "14734",
      name: "Xã Yên Thành",
      DistrictId: "377",
    },
    {
      id: "14737",
      name: "Xã Yên Nhân",
      DistrictId: "377",
    },
    {
      id: "14740",
      name: "Xã Yên Mỹ",
      DistrictId: "377",
    },
    {
      id: "14743",
      name: "Xã Yên Mạc",
      DistrictId: "377",
    },
    {
      id: "14746",
      name: "Xã Yên Đồng",
      DistrictId: "377",
    },
    {
      id: "14749",
      name: "Xã Yên Thái",
      DistrictId: "377",
    },
    {
      id: "14752",
      name: "Xã Yên Lâm",
      DistrictId: "377",
    },
    {
      id: "14755",
      name: "Phường Hàm Rồng",
      DistrictId: "380",
    },
    {
      id: "14758",
      name: "Phường Đông Thọ",
      DistrictId: "380",
    },
    {
      id: "14761",
      name: "Phường Nam Ngạn",
      DistrictId: "380",
    },
    {
      id: "14764",
      name: "Phường Trường Thi",
      DistrictId: "380",
    },
    {
      id: "14767",
      name: "Phường Điện Biên",
      DistrictId: "380",
    },
    {
      id: "14770",
      name: "Phường Phú Sơn",
      DistrictId: "380",
    },
    {
      id: "14773",
      name: "Phường Lam Sơn",
      DistrictId: "380",
    },
    {
      id: "14776",
      name: "Phường Ba Đình",
      DistrictId: "380",
    },
    {
      id: "14779",
      name: "Phường Ngọc Trạo",
      DistrictId: "380",
    },
    {
      id: "14782",
      name: "Phường Đông Vệ",
      DistrictId: "380",
    },
    {
      id: "14785",
      name: "Phường Đông Sơn",
      DistrictId: "380",
    },
    {
      id: "14788",
      name: "Phường Tân Sơn",
      DistrictId: "380",
    },
    {
      id: "14791",
      name: "Phường Đông Cương",
      DistrictId: "380",
    },
    {
      id: "14794",
      name: "Phường Đông Hương",
      DistrictId: "380",
    },
    {
      id: "14797",
      name: "Phường Đông Hải",
      DistrictId: "380",
    },
    {
      id: "14800",
      name: "Phường Quảng Hưng",
      DistrictId: "380",
    },
    {
      id: "14803",
      name: "Phường Quảng Thắng",
      DistrictId: "380",
    },
    {
      id: "14806",
      name: "Phường Quảng Thành",
      DistrictId: "380",
    },
    {
      id: "14809",
      name: "Phường Bắc Sơn",
      DistrictId: "381",
    },
    {
      id: "14812",
      name: "Phường Ba Đình",
      DistrictId: "381",
    },
    {
      id: "14815",
      name: "Phường Lam Sơn",
      DistrictId: "381",
    },
    {
      id: "14818",
      name: "Phường Ngọc Trạo",
      DistrictId: "381",
    },
    {
      id: "14821",
      name: "Phường Đông Sơn",
      DistrictId: "381",
    },
    {
      id: "14823",
      name: "Phường Phú Sơn",
      DistrictId: "381",
    },
    {
      id: "14824",
      name: "Xã Quang Trung",
      DistrictId: "381",
    },
    {
      id: "14830",
      name: "Phường Trung Sơn",
      DistrictId: "382",
    },
    {
      id: "14833",
      name: "Phường Bắc Sơn",
      DistrictId: "382",
    },
    {
      id: "14836",
      name: "Phường Trường Sơn",
      DistrictId: "382",
    },
    {
      id: "14839",
      name: "Phường Quảng Cư",
      DistrictId: "382",
    },
    {
      id: "14842",
      name: "Phường Quảng Tiến",
      DistrictId: "382",
    },
    {
      id: "14845",
      name: "Thị trấn Mường Lát",
      DistrictId: "384",
    },
    {
      id: "14848",
      name: "Xã Tam Chung",
      DistrictId: "384",
    },
    {
      id: "14854",
      name: "Xã Mường Lý",
      DistrictId: "384",
    },
    {
      id: "14857",
      name: "Xã Trung Lý",
      DistrictId: "384",
    },
    {
      id: "14860",
      name: "Xã Quang Chiểu",
      DistrictId: "384",
    },
    {
      id: "14863",
      name: "Xã Pù Nhi",
      DistrictId: "384",
    },
    {
      id: "14864",
      name: "Xã Nhi Sơn",
      DistrictId: "384",
    },
    {
      id: "14866",
      name: "Xã Mường Chanh",
      DistrictId: "384",
    },
    {
      id: "14869",
      name: "Thị trấn Hồi Xuân",
      DistrictId: "385",
    },
    {
      id: "14872",
      name: "Xã Thành Sơn",
      DistrictId: "385",
    },
    {
      id: "14875",
      name: "Xã Trung Sơn",
      DistrictId: "385",
    },
    {
      id: "14878",
      name: "Xã Phú Thanh",
      DistrictId: "385",
    },
    {
      id: "14881",
      name: "Xã Trung Thành",
      DistrictId: "385",
    },
    {
      id: "14884",
      name: "Xã Phú Lệ",
      DistrictId: "385",
    },
    {
      id: "14887",
      name: "Xã Phú Sơn",
      DistrictId: "385",
    },
    {
      id: "14890",
      name: "Xã Phú Xuân",
      DistrictId: "385",
    },
    {
      id: "14896",
      name: "Xã Hiền Chung",
      DistrictId: "385",
    },
    {
      id: "14899",
      name: "Xã Hiền Kiệt",
      DistrictId: "385",
    },
    {
      id: "14902",
      name: "Xã Nam Tiến",
      DistrictId: "385",
    },
    {
      id: "14908",
      name: "Xã Thiên Phủ",
      DistrictId: "385",
    },
    {
      id: "14911",
      name: "Xã Phú Nghiêm",
      DistrictId: "385",
    },
    {
      id: "14914",
      name: "Xã Nam Xuân",
      DistrictId: "385",
    },
    {
      id: "14917",
      name: "Xã Nam Động",
      DistrictId: "385",
    },
    {
      id: "14923",
      name: "Thị trấn Cành Nàng",
      DistrictId: "386",
    },
    {
      id: "14926",
      name: "Xã Điền Thượng",
      DistrictId: "386",
    },
    {
      id: "14929",
      name: "Xã Điền Hạ",
      DistrictId: "386",
    },
    {
      id: "14932",
      name: "Xã Điền Quang",
      DistrictId: "386",
    },
    {
      id: "14935",
      name: "Xã Điền Trung",
      DistrictId: "386",
    },
    {
      id: "14938",
      name: "Xã Thành Sơn",
      DistrictId: "386",
    },
    {
      id: "14941",
      name: "Xã Lương Ngoại",
      DistrictId: "386",
    },
    {
      id: "14944",
      name: "Xã Ái Thượng",
      DistrictId: "386",
    },
    {
      id: "14947",
      name: "Xã Lương Nội",
      DistrictId: "386",
    },
    {
      id: "14950",
      name: "Xã Điền Lư",
      DistrictId: "386",
    },
    {
      id: "14953",
      name: "Xã Lương Trung",
      DistrictId: "386",
    },
    {
      id: "14956",
      name: "Xã Lũng Niêm",
      DistrictId: "386",
    },
    {
      id: "14959",
      name: "Xã Lũng Cao",
      DistrictId: "386",
    },
    {
      id: "14962",
      name: "Xã Hạ Trung",
      DistrictId: "386",
    },
    {
      id: "14965",
      name: "Xã Cổ Lũng",
      DistrictId: "386",
    },
    {
      id: "14968",
      name: "Xã Thành Lâm",
      DistrictId: "386",
    },
    {
      id: "14971",
      name: "Xã Ban Công",
      DistrictId: "386",
    },
    {
      id: "14974",
      name: "Xã Kỳ Tân",
      DistrictId: "386",
    },
    {
      id: "14977",
      name: "Xã Văn Nho",
      DistrictId: "386",
    },
    {
      id: "14980",
      name: "Xã Thiết Ống",
      DistrictId: "386",
    },
    {
      id: "14986",
      name: "Xã Thiết Kế",
      DistrictId: "386",
    },
    {
      id: "14995",
      name: "Xã Trung Xuân",
      DistrictId: "387",
    },
    {
      id: "14998",
      name: "Xã Trung Thượng",
      DistrictId: "387",
    },
    {
      id: "14999",
      name: "Xã Trung Tiến",
      DistrictId: "387",
    },
    {
      id: "15001",
      name: "Xã Trung Hạ",
      DistrictId: "387",
    },
    {
      id: "15004",
      name: "Xã Sơn Hà",
      DistrictId: "387",
    },
    {
      id: "15007",
      name: "Xã Tam Thanh",
      DistrictId: "387",
    },
    {
      id: "15010",
      name: "Xã Sơn Thủy",
      DistrictId: "387",
    },
    {
      id: "15013",
      name: "Xã Na Mèo",
      DistrictId: "387",
    },
    {
      id: "15016",
      name: "Thị trấn Sơn Lư",
      DistrictId: "387",
    },
    {
      id: "15019",
      name: "Xã Tam Lư",
      DistrictId: "387",
    },
    {
      id: "15022",
      name: "Xã Sơn Điện",
      DistrictId: "387",
    },
    {
      id: "15025",
      name: "Xã Mường Mìn",
      DistrictId: "387",
    },
    {
      id: "15031",
      name: "Xã Yên Khương",
      DistrictId: "388",
    },
    {
      id: "15034",
      name: "Xã Yên Thắng",
      DistrictId: "388",
    },
    {
      id: "15037",
      name: "Xã Trí Nang",
      DistrictId: "388",
    },
    {
      id: "15040",
      name: "Xã Giao An",
      DistrictId: "388",
    },
    {
      id: "15043",
      name: "Xã Giao Thiện",
      DistrictId: "388",
    },
    {
      id: "15046",
      name: "Xã Tân Phúc",
      DistrictId: "388",
    },
    {
      id: "15049",
      name: "Xã Tam Văn",
      DistrictId: "388",
    },
    {
      id: "15052",
      name: "Xã Lâm Phú",
      DistrictId: "388",
    },
    {
      id: "15055",
      name: "Thị trấn Lang Chánh",
      DistrictId: "388",
    },
    {
      id: "15058",
      name: "Xã Đồng Lương",
      DistrictId: "388",
    },
    {
      id: "15061",
      name: "Thị Trấn Ngọc Lặc",
      DistrictId: "389",
    },
    {
      id: "15064",
      name: "Xã Lam Sơn",
      DistrictId: "389",
    },
    {
      id: "15067",
      name: "Xã Mỹ Tân",
      DistrictId: "389",
    },
    {
      id: "15070",
      name: "Xã Thúy Sơn",
      DistrictId: "389",
    },
    {
      id: "15073",
      name: "Xã Thạch Lập",
      DistrictId: "389",
    },
    {
      id: "15076",
      name: "Xã Vân Âm",
      DistrictId: "389",
    },
    {
      id: "15079",
      name: "Xã Cao Ngọc",
      DistrictId: "389",
    },
    {
      id: "15085",
      name: "Xã Quang Trung",
      DistrictId: "389",
    },
    {
      id: "15088",
      name: "Xã Đồng Thịnh",
      DistrictId: "389",
    },
    {
      id: "15091",
      name: "Xã Ngọc Liên",
      DistrictId: "389",
    },
    {
      id: "15094",
      name: "Xã Ngọc Sơn",
      DistrictId: "389",
    },
    {
      id: "15097",
      name: "Xã Lộc Thịnh",
      DistrictId: "389",
    },
    {
      id: "15100",
      name: "Xã Cao Thịnh",
      DistrictId: "389",
    },
    {
      id: "15103",
      name: "Xã Ngọc Trung",
      DistrictId: "389",
    },
    {
      id: "15106",
      name: "Xã Phùng Giáo",
      DistrictId: "389",
    },
    {
      id: "15109",
      name: "Xã Phùng Minh",
      DistrictId: "389",
    },
    {
      id: "15112",
      name: "Xã Phúc Thịnh",
      DistrictId: "389",
    },
    {
      id: "15115",
      name: "Xã Nguyệt Ấn",
      DistrictId: "389",
    },
    {
      id: "15118",
      name: "Xã Kiên Thọ",
      DistrictId: "389",
    },
    {
      id: "15121",
      name: "Xã Minh Tiến",
      DistrictId: "389",
    },
    {
      id: "15124",
      name: "Xã Minh Sơn",
      DistrictId: "389",
    },
    {
      id: "15127",
      name: "Thị trấn Phong Sơn",
      DistrictId: "390",
    },
    {
      id: "15133",
      name: "Xã Cẩm Thành",
      DistrictId: "390",
    },
    {
      id: "15136",
      name: "Xã Cẩm Quý",
      DistrictId: "390",
    },
    {
      id: "15139",
      name: "Xã Cẩm Lương",
      DistrictId: "390",
    },
    {
      id: "15142",
      name: "Xã Cẩm Thạch",
      DistrictId: "390",
    },
    {
      id: "15145",
      name: "Xã Cẩm Liên",
      DistrictId: "390",
    },
    {
      id: "15148",
      name: "Xã Cẩm Giang",
      DistrictId: "390",
    },
    {
      id: "15151",
      name: "Xã Cẩm Bình",
      DistrictId: "390",
    },
    {
      id: "15154",
      name: "Xã Cẩm Tú",
      DistrictId: "390",
    },
    {
      id: "15160",
      name: "Xã Cẩm Châu",
      DistrictId: "390",
    },
    {
      id: "15163",
      name: "Xã Cẩm Tâm",
      DistrictId: "390",
    },
    {
      id: "15169",
      name: "Xã Cẩm Ngọc",
      DistrictId: "390",
    },
    {
      id: "15172",
      name: "Xã Cẩm Long",
      DistrictId: "390",
    },
    {
      id: "15175",
      name: "Xã Cẩm Yên",
      DistrictId: "390",
    },
    {
      id: "15178",
      name: "Xã Cẩm Tân",
      DistrictId: "390",
    },
    {
      id: "15181",
      name: "Xã Cẩm Phú",
      DistrictId: "390",
    },
    {
      id: "15184",
      name: "Xã Cẩm Vân",
      DistrictId: "390",
    },
    {
      id: "15187",
      name: "Thị trấn Kim Tân",
      DistrictId: "391",
    },
    {
      id: "15190",
      name: "Thị trấn Vân Du",
      DistrictId: "391",
    },
    {
      id: "15196",
      name: "Xã Thạch Lâm",
      DistrictId: "391",
    },
    {
      id: "15199",
      name: "Xã Thạch Quảng",
      DistrictId: "391",
    },
    {
      id: "15202",
      name: "Xã Thạch Tượng",
      DistrictId: "391",
    },
    {
      id: "15205",
      name: "Xã Thạch Cẩm",
      DistrictId: "391",
    },
    {
      id: "15208",
      name: "Xã Thạch Sơn",
      DistrictId: "391",
    },
    {
      id: "15211",
      name: "Xã Thạch Bình",
      DistrictId: "391",
    },
    {
      id: "15214",
      name: "Xã Thạch Định",
      DistrictId: "391",
    },
    {
      id: "15217",
      name: "Xã Thạch Đồng",
      DistrictId: "391",
    },
    {
      id: "15220",
      name: "Xã Thạch Long",
      DistrictId: "391",
    },
    {
      id: "15223",
      name: "Xã Thành Mỹ",
      DistrictId: "391",
    },
    {
      id: "15226",
      name: "Xã Thành Yên",
      DistrictId: "391",
    },
    {
      id: "15229",
      name: "Xã Thành Vinh",
      DistrictId: "391",
    },
    {
      id: "15232",
      name: "Xã Thành Minh",
      DistrictId: "391",
    },
    {
      id: "15235",
      name: "Xã Thành Công",
      DistrictId: "391",
    },
    {
      id: "15238",
      name: "Xã Thành Tân",
      DistrictId: "391",
    },
    {
      id: "15241",
      name: "Xã Thành Trực",
      DistrictId: "391",
    },
    {
      id: "15247",
      name: "Xã Thành Tâm",
      DistrictId: "391",
    },
    {
      id: "15250",
      name: "Xã Thành An",
      DistrictId: "391",
    },
    {
      id: "15253",
      name: "Xã Thành Thọ",
      DistrictId: "391",
    },
    {
      id: "15256",
      name: "Xã Thành Tiến",
      DistrictId: "391",
    },
    {
      id: "15259",
      name: "Xã Thành Long",
      DistrictId: "391",
    },
    {
      id: "15265",
      name: "Xã Thành Hưng",
      DistrictId: "391",
    },
    {
      id: "15268",
      name: "Xã Ngọc Trạo",
      DistrictId: "391",
    },
    {
      id: "15271",
      name: "Thị trấn Hà Trung",
      DistrictId: "392",
    },
    {
      id: "15274",
      name: "Xã Hà Long",
      DistrictId: "392",
    },
    {
      id: "15277",
      name: "Xã Hà Vinh",
      DistrictId: "392",
    },
    {
      id: "15280",
      name: "Xã Hà Bắc",
      DistrictId: "392",
    },
    {
      id: "15283",
      name: "Xã Hoạt Giang",
      DistrictId: "392",
    },
    {
      id: "15286",
      name: "Xã Yên Dương",
      DistrictId: "392",
    },
    {
      id: "15292",
      name: "Xã Hà Giang",
      DistrictId: "392",
    },
    {
      id: "15298",
      name: "Xã Lĩnh Toại",
      DistrictId: "392",
    },
    {
      id: "15304",
      name: "Xã Hà Ngọc",
      DistrictId: "392",
    },
    {
      id: "15307",
      name: "Xã Yến Sơn",
      DistrictId: "392",
    },
    {
      id: "15313",
      name: "Xã Hà Sơn",
      DistrictId: "392",
    },
    {
      id: "15316",
      name: "Xã Hà Lĩnh",
      DistrictId: "392",
    },
    {
      id: "15319",
      name: "Xã Hà Đông",
      DistrictId: "392",
    },
    {
      id: "15322",
      name: "Xã Hà Tân",
      DistrictId: "392",
    },
    {
      id: "15325",
      name: "Xã Hà Tiến",
      DistrictId: "392",
    },
    {
      id: "15328",
      name: "Xã Hà Bình",
      DistrictId: "392",
    },
    {
      id: "15331",
      name: "Xã Hà Lai",
      DistrictId: "392",
    },
    {
      id: "15334",
      name: "Xã Hà Châu",
      DistrictId: "392",
    },
    {
      id: "15340",
      name: "Xã Hà Thái",
      DistrictId: "392",
    },
    {
      id: "15343",
      name: "Xã Hà Hải",
      DistrictId: "392",
    },
    {
      id: "15349",
      name: "Thị trấn Vĩnh Lộc",
      DistrictId: "393",
    },
    {
      id: "15352",
      name: "Xã Vĩnh Quang",
      DistrictId: "393",
    },
    {
      id: "15355",
      name: "Xã Vĩnh Yên",
      DistrictId: "393",
    },
    {
      id: "15358",
      name: "Xã Vĩnh Tiến",
      DistrictId: "393",
    },
    {
      id: "15361",
      name: "Xã Vĩnh Long",
      DistrictId: "393",
    },
    {
      id: "15364",
      name: "Xã Vĩnh Phúc",
      DistrictId: "393",
    },
    {
      id: "15367",
      name: "Xã Vĩnh Hưng",
      DistrictId: "393",
    },
    {
      id: "15376",
      name: "Xã Vĩnh Hòa",
      DistrictId: "393",
    },
    {
      id: "15379",
      name: "Xã Vĩnh Hùng",
      DistrictId: "393",
    },
    {
      id: "15382",
      name: "Xã Minh Tân",
      DistrictId: "393",
    },
    {
      id: "15385",
      name: "Xã Ninh Khang",
      DistrictId: "393",
    },
    {
      id: "15388",
      name: "Xã Vĩnh Thịnh",
      DistrictId: "393",
    },
    {
      id: "15391",
      name: "Xã Vĩnh An",
      DistrictId: "393",
    },
    {
      id: "15397",
      name: "Thị trấn Thống Nhất",
      DistrictId: "394",
    },
    {
      id: "15403",
      name: "Thị trấn Yên Lâm",
      DistrictId: "394",
    },
    {
      id: "15406",
      name: "Xã Yên Tâm",
      DistrictId: "394",
    },
    {
      id: "15409",
      name: "Xã Yên Phú",
      DistrictId: "394",
    },
    {
      id: "15412",
      name: "Thị trấn Quý Lộc",
      DistrictId: "394",
    },
    {
      id: "15415",
      name: "Xã Yên Thọ",
      DistrictId: "394",
    },
    {
      id: "15418",
      name: "Xã Yên Trung",
      DistrictId: "394",
    },
    {
      id: "15421",
      name: "Xã Yên Trường",
      DistrictId: "394",
    },
    {
      id: "15427",
      name: "Xã Yên Phong",
      DistrictId: "394",
    },
    {
      id: "15430",
      name: "Xã Yên Thái",
      DistrictId: "394",
    },
    {
      id: "15433",
      name: "Xã Yên Hùng",
      DistrictId: "394",
    },
    {
      id: "15436",
      name: "Xã Yên Thịnh",
      DistrictId: "394",
    },
    {
      id: "15439",
      name: "Xã Yên Ninh",
      DistrictId: "394",
    },
    {
      id: "15442",
      name: "Xã Yên Lạc",
      DistrictId: "394",
    },
    {
      id: "15445",
      name: "Xã Định Tăng",
      DistrictId: "394",
    },
    {
      id: "15448",
      name: "Xã Định Hòa",
      DistrictId: "394",
    },
    {
      id: "15451",
      name: "Xã Định Thành",
      DistrictId: "394",
    },
    {
      id: "15454",
      name: "Xã Định Công",
      DistrictId: "394",
    },
    {
      id: "15457",
      name: "Xã Định Tân",
      DistrictId: "394",
    },
    {
      id: "15460",
      name: "Xã Định Tiến",
      DistrictId: "394",
    },
    {
      id: "15463",
      name: "Xã Định Long",
      DistrictId: "394",
    },
    {
      id: "15466",
      name: "Xã Định Liên",
      DistrictId: "394",
    },
    {
      id: "15469",
      name: "Thị trấn Quán Lào",
      DistrictId: "394",
    },
    {
      id: "15472",
      name: "Xã Định Hưng",
      DistrictId: "394",
    },
    {
      id: "15475",
      name: "Xã Định Hải",
      DistrictId: "394",
    },
    {
      id: "15478",
      name: "Xã Định Bình",
      DistrictId: "394",
    },
    {
      id: "15493",
      name: "Xã Xuân Hồng",
      DistrictId: "395",
    },
    {
      id: "15499",
      name: "Thị trấn Thọ Xuân",
      DistrictId: "395",
    },
    {
      id: "15502",
      name: "Xã Bắc Lương",
      DistrictId: "395",
    },
    {
      id: "15505",
      name: "Xã Nam Giang",
      DistrictId: "395",
    },
    {
      id: "15508",
      name: "Xã Xuân Phong",
      DistrictId: "395",
    },
    {
      id: "15511",
      name: "Xã Thọ Lộc",
      DistrictId: "395",
    },
    {
      id: "15514",
      name: "Xã Xuân Trường",
      DistrictId: "395",
    },
    {
      id: "15517",
      name: "Xã Xuân Hòa",
      DistrictId: "395",
    },
    {
      id: "15520",
      name: "Xã Thọ Hải",
      DistrictId: "395",
    },
    {
      id: "15523",
      name: "Xã Tây Hồ",
      DistrictId: "395",
    },
    {
      id: "15526",
      name: "Xã Xuân Giang",
      DistrictId: "395",
    },
    {
      id: "15532",
      name: "Xã Xuân Sinh",
      DistrictId: "395",
    },
    {
      id: "15535",
      name: "Xã Xuân Hưng",
      DistrictId: "395",
    },
    {
      id: "15538",
      name: "Xã Thọ Diên",
      DistrictId: "395",
    },
    {
      id: "15541",
      name: "Xã Thọ Lâm",
      DistrictId: "395",
    },
    {
      id: "15544",
      name: "Xã Thọ Xương",
      DistrictId: "395",
    },
    {
      id: "15547",
      name: "Xã Xuân Bái",
      DistrictId: "395",
    },
    {
      id: "15550",
      name: "Xã Xuân Phú",
      DistrictId: "395",
    },
    {
      id: "15553",
      name: "Thị trấn Sao Vàng",
      DistrictId: "395",
    },
    {
      id: "15556",
      name: "Thị trấn Lam Sơn",
      DistrictId: "395",
    },
    {
      id: "15559",
      name: "Xã Xuân Thiên",
      DistrictId: "395",
    },
    {
      id: "15565",
      name: "Xã Thuận Minh",
      DistrictId: "395",
    },
    {
      id: "15568",
      name: "Xã Thọ Lập",
      DistrictId: "395",
    },
    {
      id: "15571",
      name: "Xã Quảng Phú",
      DistrictId: "395",
    },
    {
      id: "15574",
      name: "Xã Xuân Tín",
      DistrictId: "395",
    },
    {
      id: "15577",
      name: "Xã Phú Xuân",
      DistrictId: "395",
    },
    {
      id: "15583",
      name: "Xã Xuân Lai",
      DistrictId: "395",
    },
    {
      id: "15586",
      name: "Xã Xuân Lập",
      DistrictId: "395",
    },
    {
      id: "15592",
      name: "Xã Xuân Minh",
      DistrictId: "395",
    },
    {
      id: "15598",
      name: "Xã Trường Xuân",
      DistrictId: "395",
    },
    {
      id: "15607",
      name: "Xã Bát Mọt",
      DistrictId: "396",
    },
    {
      id: "15610",
      name: "Xã Yên Nhân",
      DistrictId: "396",
    },
    {
      id: "15619",
      name: "Xã Xuân Lẹ",
      DistrictId: "396",
    },
    {
      id: "15622",
      name: "Xã Vạn Xuân",
      DistrictId: "396",
    },
    {
      id: "15628",
      name: "Xã Lương Sơn",
      DistrictId: "396",
    },
    {
      id: "15631",
      name: "Xã Xuân Cao",
      DistrictId: "396",
    },
    {
      id: "15634",
      name: "Xã Luận Thành",
      DistrictId: "396",
    },
    {
      id: "15637",
      name: "Xã Luận Khê",
      DistrictId: "396",
    },
    {
      id: "15640",
      name: "Xã Xuân Thắng",
      DistrictId: "396",
    },
    {
      id: "15643",
      name: "Xã Xuân Lộc",
      DistrictId: "396",
    },
    {
      id: "15646",
      name: "Thị trấn Thường Xuân",
      DistrictId: "396",
    },
    {
      id: "15649",
      name: "Xã Xuân Dương",
      DistrictId: "396",
    },
    {
      id: "15652",
      name: "Xã Thọ Thanh",
      DistrictId: "396",
    },
    {
      id: "15655",
      name: "Xã Ngọc Phụng",
      DistrictId: "396",
    },
    {
      id: "15658",
      name: "Xã Xuân Chinh",
      DistrictId: "396",
    },
    {
      id: "15661",
      name: "Xã Tân Thành",
      DistrictId: "396",
    },
    {
      id: "15664",
      name: "Thị trấn Triệu Sơn",
      DistrictId: "397",
    },
    {
      id: "15667",
      name: "Xã Thọ Sơn",
      DistrictId: "397",
    },
    {
      id: "15670",
      name: "Xã Thọ Bình",
      DistrictId: "397",
    },
    {
      id: "15673",
      name: "Xã Thọ Tiến",
      DistrictId: "397",
    },
    {
      id: "15676",
      name: "Xã Hợp Lý",
      DistrictId: "397",
    },
    {
      id: "15679",
      name: "Xã Hợp Tiến",
      DistrictId: "397",
    },
    {
      id: "15682",
      name: "Xã Hợp Thành",
      DistrictId: "397",
    },
    {
      id: "15685",
      name: "Xã Triệu Thành",
      DistrictId: "397",
    },
    {
      id: "15688",
      name: "Xã Hợp Thắng",
      DistrictId: "397",
    },
    {
      id: "15691",
      name: "Xã Minh Sơn",
      DistrictId: "397",
    },
    {
      id: "15700",
      name: "Xã Dân Lực",
      DistrictId: "397",
    },
    {
      id: "15703",
      name: "Xã Dân Lý",
      DistrictId: "397",
    },
    {
      id: "15706",
      name: "Xã Dân Quyền",
      DistrictId: "397",
    },
    {
      id: "15709",
      name: "Xã An Nông",
      DistrictId: "397",
    },
    {
      id: "15712",
      name: "Xã Văn Sơn",
      DistrictId: "397",
    },
    {
      id: "15715",
      name: "Xã Thái Hòa",
      DistrictId: "397",
    },
    {
      id: "15718",
      name: "Thị trấn Nưa",
      DistrictId: "397",
    },
    {
      id: "15721",
      name: "Xã Đồng Lợi",
      DistrictId: "397",
    },
    {
      id: "15724",
      name: "Xã Đồng Tiến",
      DistrictId: "397",
    },
    {
      id: "15727",
      name: "Xã Đồng Thắng",
      DistrictId: "397",
    },
    {
      id: "15730",
      name: "Xã Tiến Nông",
      DistrictId: "397",
    },
    {
      id: "15733",
      name: "Xã Khuyến Nông",
      DistrictId: "397",
    },
    {
      id: "15736",
      name: "Xã Xuân Thịnh",
      DistrictId: "397",
    },
    {
      id: "15739",
      name: "Xã Xuân Lộc",
      DistrictId: "397",
    },
    {
      id: "15742",
      name: "Xã Thọ Dân",
      DistrictId: "397",
    },
    {
      id: "15745",
      name: "Xã Xuân Thọ",
      DistrictId: "397",
    },
    {
      id: "15748",
      name: "Xã Thọ Tân",
      DistrictId: "397",
    },
    {
      id: "15751",
      name: "Xã Thọ Ngọc",
      DistrictId: "397",
    },
    {
      id: "15754",
      name: "Xã Thọ Cường",
      DistrictId: "397",
    },
    {
      id: "15757",
      name: "Xã Thọ Phú",
      DistrictId: "397",
    },
    {
      id: "15760",
      name: "Xã Thọ Vực",
      DistrictId: "397",
    },
    {
      id: "15763",
      name: "Xã Thọ Thế",
      DistrictId: "397",
    },
    {
      id: "15766",
      name: "Xã Nông Trường",
      DistrictId: "397",
    },
    {
      id: "15769",
      name: "Xã Bình Sơn",
      DistrictId: "397",
    },
    {
      id: "15772",
      name: "Thị trấn Thiệu Hóa",
      DistrictId: "398",
    },
    {
      id: "15775",
      name: "Xã Thiệu Ngọc",
      DistrictId: "398",
    },
    {
      id: "15778",
      name: "Xã Thiệu Vũ",
      DistrictId: "398",
    },
    {
      id: "15781",
      name: "Xã Thiệu Phúc",
      DistrictId: "398",
    },
    {
      id: "15784",
      name: "Xã Thiệu Tiến",
      DistrictId: "398",
    },
    {
      id: "15787",
      name: "Xã Thiệu Công",
      DistrictId: "398",
    },
    {
      id: "15790",
      name: "Xã Thiệu Phú",
      DistrictId: "398",
    },
    {
      id: "15793",
      name: "Xã Thiệu Long",
      DistrictId: "398",
    },
    {
      id: "15796",
      name: "Xã Thiệu Giang",
      DistrictId: "398",
    },
    {
      id: "15799",
      name: "Xã Thiệu Duy",
      DistrictId: "398",
    },
    {
      id: "15802",
      name: "Xã Thiệu Nguyên",
      DistrictId: "398",
    },
    {
      id: "15805",
      name: "Xã Thiệu Hợp",
      DistrictId: "398",
    },
    {
      id: "15808",
      name: "Xã Thiệu Thịnh",
      DistrictId: "398",
    },
    {
      id: "15811",
      name: "Xã Thiệu Quang",
      DistrictId: "398",
    },
    {
      id: "15814",
      name: "Xã Thiệu Thành",
      DistrictId: "398",
    },
    {
      id: "15817",
      name: "Xã Thiệu Toán",
      DistrictId: "398",
    },
    {
      id: "15820",
      name: "Xã Thiệu Chính",
      DistrictId: "398",
    },
    {
      id: "15823",
      name: "Xã Thiệu Hòa",
      DistrictId: "398",
    },
    {
      id: "15829",
      name: "Xã Minh Tâm",
      DistrictId: "398",
    },
    {
      id: "15832",
      name: "Xã Thiệu Viên",
      DistrictId: "398",
    },
    {
      id: "15835",
      name: "Xã Thiệu Lý",
      DistrictId: "398",
    },
    {
      id: "15838",
      name: "Xã Thiệu Vận",
      DistrictId: "398",
    },
    {
      id: "15841",
      name: "Xã Thiệu Trung",
      DistrictId: "398",
    },
    {
      id: "15847",
      name: "Xã Tân Châu",
      DistrictId: "398",
    },
    {
      id: "15850",
      name: "Xã Thiệu Vân",
      DistrictId: "380",
    },
    {
      id: "15853",
      name: "Xã Thiệu Giao",
      DistrictId: "398",
    },
    {
      id: "15856",
      name: "Phường Thiệu Khánh",
      DistrictId: "380",
    },
    {
      id: "15859",
      name: "Phường Thiệu Dương",
      DistrictId: "380",
    },
    {
      id: "15865",
      name: "Thị trấn Bút Sơn",
      DistrictId: "399",
    },
    {
      id: "15871",
      name: "Xã Hoằng Giang",
      DistrictId: "399",
    },
    {
      id: "15877",
      name: "Xã Hoằng Xuân",
      DistrictId: "399",
    },
    {
      id: "15880",
      name: "Xã Hoằng Phượng",
      DistrictId: "399",
    },
    {
      id: "15883",
      name: "Xã Hoằng Phú",
      DistrictId: "399",
    },
    {
      id: "15886",
      name: "Xã Hoằng Quỳ",
      DistrictId: "399",
    },
    {
      id: "15889",
      name: "Xã Hoằng Kim",
      DistrictId: "399",
    },
    {
      id: "15892",
      name: "Xã Hoằng Trung",
      DistrictId: "399",
    },
    {
      id: "15895",
      name: "Xã Hoằng Trinh",
      DistrictId: "399",
    },
    {
      id: "15901",
      name: "Xã Hoằng Sơn",
      DistrictId: "399",
    },
    {
      id: "15907",
      name: "Xã Hoằng Cát",
      DistrictId: "399",
    },
    {
      id: "15910",
      name: "Xã Hoằng Xuyên",
      DistrictId: "399",
    },
    {
      id: "15913",
      name: "Phường Tào Xuyên",
      DistrictId: "380",
    },
    {
      id: "15916",
      name: "Xã Hoằng Quý",
      DistrictId: "399",
    },
    {
      id: "15919",
      name: "Xã Hoằng Hợp",
      DistrictId: "399",
    },
    {
      id: "15922",
      name: "Phường Long Anh",
      DistrictId: "380",
    },
    {
      id: "15925",
      name: "Xã Hoằng Quang",
      DistrictId: "380",
    },
    {
      id: "15928",
      name: "Xã Hoằng Đức",
      DistrictId: "399",
    },
    {
      id: "15937",
      name: "Xã Hoằng Hà",
      DistrictId: "399",
    },
    {
      id: "15940",
      name: "Xã Hoằng Đạt",
      DistrictId: "399",
    },
    {
      id: "15946",
      name: "Xã Hoằng Đạo",
      DistrictId: "399",
    },
    {
      id: "15949",
      name: "Xã Hoằng Thắng",
      DistrictId: "399",
    },
    {
      id: "15952",
      name: "Xã Hoằng Đồng",
      DistrictId: "399",
    },
    {
      id: "15955",
      name: "Xã Hoằng Thái",
      DistrictId: "399",
    },
    {
      id: "15958",
      name: "Xã Hoằng Thịnh",
      DistrictId: "399",
    },
    {
      id: "15961",
      name: "Xã Hoằng Thành",
      DistrictId: "399",
    },
    {
      id: "15964",
      name: "Xã Hoằng Lộc",
      DistrictId: "399",
    },
    {
      id: "15967",
      name: "Xã Hoằng Trạch",
      DistrictId: "399",
    },
    {
      id: "15970",
      name: "Xã Hoằng Đại",
      DistrictId: "380",
    },
    {
      id: "15973",
      name: "Xã Hoằng Phong",
      DistrictId: "399",
    },
    {
      id: "15976",
      name: "Xã Hoằng Lưu",
      DistrictId: "399",
    },
    {
      id: "15979",
      name: "Xã Hoằng Châu",
      DistrictId: "399",
    },
    {
      id: "15982",
      name: "Xã Hoằng Tân",
      DistrictId: "399",
    },
    {
      id: "15985",
      name: "Xã Hoằng Yến",
      DistrictId: "399",
    },
    {
      id: "15988",
      name: "Xã Hoằng Tiến",
      DistrictId: "399",
    },
    {
      id: "15991",
      name: "Xã Hoằng Hải",
      DistrictId: "399",
    },
    {
      id: "15994",
      name: "Xã Hoằng Ngọc",
      DistrictId: "399",
    },
    {
      id: "15997",
      name: "Xã Hoằng Đông",
      DistrictId: "399",
    },
    {
      id: "16000",
      name: "Xã Hoằng Thanh",
      DistrictId: "399",
    },
    {
      id: "16003",
      name: "Xã Hoằng Phụ",
      DistrictId: "399",
    },
    {
      id: "16006",
      name: "Xã Hoằng Trường",
      DistrictId: "399",
    },
    {
      id: "16012",
      name: "Thị trấn Hậu Lộc",
      DistrictId: "400",
    },
    {
      id: "16015",
      name: "Xã Đồng Lộc",
      DistrictId: "400",
    },
    {
      id: "16018",
      name: "Xã Đại Lộc",
      DistrictId: "400",
    },
    {
      id: "16021",
      name: "Xã Triệu Lộc",
      DistrictId: "400",
    },
    {
      id: "16027",
      name: "Xã Tiến Lộc",
      DistrictId: "400",
    },
    {
      id: "16030",
      name: "Xã Lộc Sơn",
      DistrictId: "400",
    },
    {
      id: "16033",
      name: "Xã Cầu Lộc",
      DistrictId: "400",
    },
    {
      id: "16036",
      name: "Xã Thành Lộc",
      DistrictId: "400",
    },
    {
      id: "16039",
      name: "Xã Tuy Lộc",
      DistrictId: "400",
    },
    {
      id: "16042",
      name: "Xã Phong Lộc",
      DistrictId: "400",
    },
    {
      id: "16045",
      name: "Xã Mỹ Lộc",
      DistrictId: "400",
    },
    {
      id: "16048",
      name: "Xã Thuần Lộc",
      DistrictId: "400",
    },
    {
      id: "16057",
      name: "Xã Xuân Lộc",
      DistrictId: "400",
    },
    {
      id: "16063",
      name: "Xã Hoa Lộc",
      DistrictId: "400",
    },
    {
      id: "16066",
      name: "Xã Liên Lộc",
      DistrictId: "400",
    },
    {
      id: "16069",
      name: "Xã Quang Lộc",
      DistrictId: "400",
    },
    {
      id: "16072",
      name: "Xã Phú Lộc",
      DistrictId: "400",
    },
    {
      id: "16075",
      name: "Xã Hòa Lộc",
      DistrictId: "400",
    },
    {
      id: "16078",
      name: "Xã Minh Lộc",
      DistrictId: "400",
    },
    {
      id: "16081",
      name: "Xã Hưng Lộc",
      DistrictId: "400",
    },
    {
      id: "16084",
      name: "Xã Hải Lộc",
      DistrictId: "400",
    },
    {
      id: "16087",
      name: "Xã Đa Lộc",
      DistrictId: "400",
    },
    {
      id: "16090",
      name: "Xã Ngư Lộc",
      DistrictId: "400",
    },
    {
      id: "16093",
      name: "Thị trấn Nga Sơn",
      DistrictId: "401",
    },
    {
      id: "16096",
      name: "Xã Ba Đình",
      DistrictId: "401",
    },
    {
      id: "16099",
      name: "Xã Nga Vịnh",
      DistrictId: "401",
    },
    {
      id: "16102",
      name: "Xã Nga Văn",
      DistrictId: "401",
    },
    {
      id: "16105",
      name: "Xã Nga Thiện",
      DistrictId: "401",
    },
    {
      id: "16108",
      name: "Xã Nga Tiến",
      DistrictId: "401",
    },
    {
      id: "16114",
      name: "Xã Nga Phượng",
      DistrictId: "401",
    },
    {
      id: "16117",
      name: "Xã Nga Trung",
      DistrictId: "401",
    },
    {
      id: "16120",
      name: "Xã Nga Bạch",
      DistrictId: "401",
    },
    {
      id: "16123",
      name: "Xã Nga Thanh",
      DistrictId: "401",
    },
    {
      id: "16132",
      name: "Xã Nga Yên",
      DistrictId: "401",
    },
    {
      id: "16135",
      name: "Xã Nga Giáp",
      DistrictId: "401",
    },
    {
      id: "16138",
      name: "Xã Nga Hải",
      DistrictId: "401",
    },
    {
      id: "16141",
      name: "Xã Nga Thành",
      DistrictId: "401",
    },
    {
      id: "16144",
      name: "Xã Nga An",
      DistrictId: "401",
    },
    {
      id: "16147",
      name: "Xã Nga Phú",
      DistrictId: "401",
    },
    {
      id: "16150",
      name: "Xã Nga Điền",
      DistrictId: "401",
    },
    {
      id: "16153",
      name: "Xã Nga Tân",
      DistrictId: "401",
    },
    {
      id: "16156",
      name: "Xã Nga Thủy",
      DistrictId: "401",
    },
    {
      id: "16159",
      name: "Xã Nga Liên",
      DistrictId: "401",
    },
    {
      id: "16162",
      name: "Xã Nga Thái",
      DistrictId: "401",
    },
    {
      id: "16165",
      name: "Xã Nga Thạch",
      DistrictId: "401",
    },
    {
      id: "16168",
      name: "Xã Nga Thắng",
      DistrictId: "401",
    },
    {
      id: "16171",
      name: "Xã Nga Trường",
      DistrictId: "401",
    },
    {
      id: "16174",
      name: "Thị trấn Yên Cát",
      DistrictId: "402",
    },
    {
      id: "16177",
      name: "Xã Bãi Trành",
      DistrictId: "402",
    },
    {
      id: "16180",
      name: "Xã Xuân Hòa",
      DistrictId: "402",
    },
    {
      id: "16183",
      name: "Xã Xuân Bình",
      DistrictId: "402",
    },
    {
      id: "16186",
      name: "Xã Hóa Quỳ",
      DistrictId: "402",
    },
    {
      id: "16195",
      name: "Xã Cát Vân",
      DistrictId: "402",
    },
    {
      id: "16198",
      name: "Xã Cát Tân",
      DistrictId: "402",
    },
    {
      id: "16201",
      name: "Xã Tân Bình",
      DistrictId: "402",
    },
    {
      id: "16204",
      name: "Xã Bình Lương",
      DistrictId: "402",
    },
    {
      id: "16207",
      name: "Xã Thanh Quân",
      DistrictId: "402",
    },
    {
      id: "16210",
      name: "Xã Thanh Xuân",
      DistrictId: "402",
    },
    {
      id: "16213",
      name: "Xã Thanh Hòa",
      DistrictId: "402",
    },
    {
      id: "16216",
      name: "Xã Thanh Phong",
      DistrictId: "402",
    },
    {
      id: "16219",
      name: "Xã Thanh Lâm",
      DistrictId: "402",
    },
    {
      id: "16222",
      name: "Xã Thanh Sơn",
      DistrictId: "402",
    },
    {
      id: "16225",
      name: "Xã Thượng Ninh",
      DistrictId: "402",
    },
    {
      id: "16228",
      name: "Thị trấn Bến Sung",
      DistrictId: "403",
    },
    {
      id: "16231",
      name: "Xã Cán Khê",
      DistrictId: "403",
    },
    {
      id: "16234",
      name: "Xã Xuân Du",
      DistrictId: "403",
    },
    {
      id: "16240",
      name: "Xã Phượng Nghi",
      DistrictId: "403",
    },
    {
      id: "16243",
      name: "Xã Mậu Lâm",
      DistrictId: "403",
    },
    {
      id: "16246",
      name: "Xã Xuân Khang",
      DistrictId: "403",
    },
    {
      id: "16249",
      name: "Xã Phú Nhuận",
      DistrictId: "403",
    },
    {
      id: "16252",
      name: "Xã Hải Long",
      DistrictId: "403",
    },
    {
      id: "16258",
      name: "Xã Xuân Thái",
      DistrictId: "403",
    },
    {
      id: "16261",
      name: "Xã Xuân Phúc",
      DistrictId: "403",
    },
    {
      id: "16264",
      name: "Xã Yên Thọ",
      DistrictId: "403",
    },
    {
      id: "16267",
      name: "Xã Yên Lạc",
      DistrictId: "403",
    },
    {
      id: "16273",
      name: "Xã Thanh Tân",
      DistrictId: "403",
    },
    {
      id: "16276",
      name: "Xã Thanh Kỳ",
      DistrictId: "403",
    },
    {
      id: "16279",
      name: "Thị trấn Nông Cống",
      DistrictId: "404",
    },
    {
      id: "16282",
      name: "Xã Tân Phúc",
      DistrictId: "404",
    },
    {
      id: "16285",
      name: "Xã Tân Thọ",
      DistrictId: "404",
    },
    {
      id: "16288",
      name: "Xã Hoàng Sơn",
      DistrictId: "404",
    },
    {
      id: "16291",
      name: "Xã Tân Khang",
      DistrictId: "404",
    },
    {
      id: "16294",
      name: "Xã Hoàng Giang",
      DistrictId: "404",
    },
    {
      id: "16297",
      name: "Xã Trung Chính",
      DistrictId: "404",
    },
    {
      id: "16303",
      name: "Xã Trung Thành",
      DistrictId: "404",
    },
    {
      id: "16309",
      name: "Xã Tế Thắng",
      DistrictId: "404",
    },
    {
      id: "16315",
      name: "Xã Tế Lợi",
      DistrictId: "404",
    },
    {
      id: "16318",
      name: "Xã Tế Nông",
      DistrictId: "404",
    },
    {
      id: "16321",
      name: "Xã Minh Nghĩa",
      DistrictId: "404",
    },
    {
      id: "16324",
      name: "Xã Minh Khôi",
      DistrictId: "404",
    },
    {
      id: "16327",
      name: "Xã Vạn Hòa",
      DistrictId: "404",
    },
    {
      id: "16330",
      name: "Xã Trường Trung",
      DistrictId: "404",
    },
    {
      id: "16333",
      name: "Xã Vạn Thắng",
      DistrictId: "404",
    },
    {
      id: "16336",
      name: "Xã Trường Giang",
      DistrictId: "404",
    },
    {
      id: "16339",
      name: "Xã Vạn Thiện",
      DistrictId: "404",
    },
    {
      id: "16342",
      name: "Xã Thăng Long",
      DistrictId: "404",
    },
    {
      id: "16345",
      name: "Xã Trường Minh",
      DistrictId: "404",
    },
    {
      id: "16348",
      name: "Xã Trường Sơn",
      DistrictId: "404",
    },
    {
      id: "16351",
      name: "Xã Thăng Bình",
      DistrictId: "404",
    },
    {
      id: "16354",
      name: "Xã Công Liêm",
      DistrictId: "404",
    },
    {
      id: "16357",
      name: "Xã Tượng Văn",
      DistrictId: "404",
    },
    {
      id: "16360",
      name: "Xã Thăng Thọ",
      DistrictId: "404",
    },
    {
      id: "16363",
      name: "Xã Tượng Lĩnh",
      DistrictId: "404",
    },
    {
      id: "16366",
      name: "Xã Tượng Sơn",
      DistrictId: "404",
    },
    {
      id: "16369",
      name: "Xã Công Chính",
      DistrictId: "404",
    },
    {
      id: "16375",
      name: "Xã Yên Mỹ",
      DistrictId: "404",
    },
    {
      id: "16378",
      name: "Thị trấn Rừng Thông",
      DistrictId: "405",
    },
    {
      id: "16381",
      name: "Xã Đông Hoàng",
      DistrictId: "405",
    },
    {
      id: "16384",
      name: "Xã Đông Ninh",
      DistrictId: "405",
    },
    {
      id: "16390",
      name: "Xã Đông Hòa",
      DistrictId: "405",
    },
    {
      id: "16393",
      name: "Xã Đông Yên",
      DistrictId: "405",
    },
    {
      id: "16396",
      name: "Phường Đông Lĩnh",
      DistrictId: "380",
    },
    {
      id: "16399",
      name: "Xã Đông Minh",
      DistrictId: "405",
    },
    {
      id: "16402",
      name: "Xã Đông Thanh",
      DistrictId: "405",
    },
    {
      id: "16405",
      name: "Xã Đông Tiến",
      DistrictId: "405",
    },
    {
      id: "16408",
      name: "Xã Đông Khê",
      DistrictId: "405",
    },
    {
      id: "16414",
      name: "Xã Đông Thịnh",
      DistrictId: "405",
    },
    {
      id: "16417",
      name: "Xã Đông Văn",
      DistrictId: "405",
    },
    {
      id: "16420",
      name: "Xã Đông Phú",
      DistrictId: "405",
    },
    {
      id: "16423",
      name: "Xã Đông Nam",
      DistrictId: "405",
    },
    {
      id: "16426",
      name: "Xã Đông Quang",
      DistrictId: "405",
    },
    {
      id: "16429",
      name: "Xã Đông Vinh",
      DistrictId: "380",
    },
    {
      id: "16432",
      name: "Phường Đông Tân",
      DistrictId: "380",
    },
    {
      id: "16435",
      name: "Phường An Hưng",
      DistrictId: "380",
    },
    {
      id: "16438",
      name: "Thị trấn Tân Phong",
      DistrictId: "406",
    },
    {
      id: "16441",
      name: "Phường Quảng Thịnh",
      DistrictId: "380",
    },
    {
      id: "16447",
      name: "Xã Quảng Trạch",
      DistrictId: "406",
    },
    {
      id: "16453",
      name: "Xã Quảng Đức",
      DistrictId: "406",
    },
    {
      id: "16456",
      name: "Xã Quảng Định",
      DistrictId: "406",
    },
    {
      id: "16459",
      name: "Phường Quảng Đông",
      DistrictId: "380",
    },
    {
      id: "16462",
      name: "Xã Quảng Nhân",
      DistrictId: "406",
    },
    {
      id: "16465",
      name: "Xã Quảng Ninh",
      DistrictId: "406",
    },
    {
      id: "16468",
      name: "Xã Quảng Bình",
      DistrictId: "406",
    },
    {
      id: "16471",
      name: "Xã Quảng Hợp",
      DistrictId: "406",
    },
    {
      id: "16474",
      name: "Xã Quảng Văn",
      DistrictId: "406",
    },
    {
      id: "16477",
      name: "Xã Quảng Long",
      DistrictId: "406",
    },
    {
      id: "16480",
      name: "Xã Quảng Yên",
      DistrictId: "406",
    },
    {
      id: "16483",
      name: "Xã Quảng Hòa",
      DistrictId: "406",
    },
    {
      id: "16489",
      name: "Xã Quảng Khê",
      DistrictId: "406",
    },
    {
      id: "16492",
      name: "Xã Quảng Trung",
      DistrictId: "406",
    },
    {
      id: "16495",
      name: "Xã Quảng Chính",
      DistrictId: "406",
    },
    {
      id: "16498",
      name: "Xã Quảng Ngọc",
      DistrictId: "406",
    },
    {
      id: "16501",
      name: "Xã Quảng Trường",
      DistrictId: "406",
    },
    {
      id: "16507",
      name: "Phường Quảng Cát",
      DistrictId: "380",
    },
    {
      id: "16510",
      name: "Xã Quảng Phúc",
      DistrictId: "406",
    },
    {
      id: "16513",
      name: "Xã Quảng Minh",
      DistrictId: "382",
    },
    {
      id: "16516",
      name: "Xã Quảng Hùng",
      DistrictId: "382",
    },
    {
      id: "16519",
      name: "Xã Quảng Giao",
      DistrictId: "406",
    },
    {
      id: "16522",
      name: "Phường Quảng Phú",
      DistrictId: "380",
    },
    {
      id: "16525",
      name: "Phường Quảng Tâm",
      DistrictId: "380",
    },
    {
      id: "16528",
      name: "Phường Quảng Thọ",
      DistrictId: "382",
    },
    {
      id: "16531",
      name: "Phường Quảng Châu",
      DistrictId: "382",
    },
    {
      id: "16534",
      name: "Phường Quảng Vinh",
      DistrictId: "382",
    },
    {
      id: "16537",
      name: "Xã Quảng Đại",
      DistrictId: "382",
    },
    {
      id: "16540",
      name: "Xã Quảng Hải",
      DistrictId: "406",
    },
    {
      id: "16543",
      name: "Xã Quảng Lưu",
      DistrictId: "406",
    },
    {
      id: "16546",
      name: "Xã Quảng Lộc",
      DistrictId: "406",
    },
    {
      id: "16549",
      name: "Xã Tiên Trang",
      DistrictId: "406",
    },
    {
      id: "16552",
      name: "Xã Quảng Nham",
      DistrictId: "406",
    },
    {
      id: "16555",
      name: "Xã Quảng Thạch",
      DistrictId: "406",
    },
    {
      id: "16558",
      name: "Xã Quảng Thái",
      DistrictId: "406",
    },
    {
      id: "16561",
      name: "Phường Hải Hòa",
      DistrictId: "407",
    },
    {
      id: "16564",
      name: "Phường Hải Châu",
      DistrictId: "407",
    },
    {
      id: "16567",
      name: "Xã Thanh Thủy",
      DistrictId: "407",
    },
    {
      id: "16570",
      name: "Xã Thanh Sơn",
      DistrictId: "407",
    },
    {
      id: "16576",
      name: "Phường Hải Ninh",
      DistrictId: "407",
    },
    {
      id: "16579",
      name: "Xã Anh Sơn",
      DistrictId: "407",
    },
    {
      id: "16582",
      name: "Xã Ngọc Lĩnh",
      DistrictId: "407",
    },
    {
      id: "16585",
      name: "Phường Hải An",
      DistrictId: "407",
    },
    {
      id: "16591",
      name: "Xã Các Sơn",
      DistrictId: "407",
    },
    {
      id: "16594",
      name: "Phường Tân Dân",
      DistrictId: "407",
    },
    {
      id: "16597",
      name: "Phường Hải Lĩnh",
      DistrictId: "407",
    },
    {
      id: "16600",
      name: "Xã Định Hải",
      DistrictId: "407",
    },
    {
      id: "16603",
      name: "Xã Phú Sơn",
      DistrictId: "407",
    },
    {
      id: "16606",
      name: "Phường Ninh Hải",
      DistrictId: "407",
    },
    {
      id: "16609",
      name: "Phường Nguyên Bình",
      DistrictId: "407",
    },
    {
      id: "16612",
      name: "Xã Hải Nhân",
      DistrictId: "407",
    },
    {
      id: "16618",
      name: "Phường Bình Minh",
      DistrictId: "407",
    },
    {
      id: "16621",
      name: "Phường Hải Thanh",
      DistrictId: "407",
    },
    {
      id: "16624",
      name: "Xã Phú Lâm",
      DistrictId: "407",
    },
    {
      id: "16627",
      name: "Phường Xuân Lâm",
      DistrictId: "407",
    },
    {
      id: "16630",
      name: "Phường Trúc Lâm",
      DistrictId: "407",
    },
    {
      id: "16633",
      name: "Phường Hải Bình",
      DistrictId: "407",
    },
    {
      id: "16636",
      name: "Xã Tân Trường",
      DistrictId: "407",
    },
    {
      id: "16639",
      name: "Xã Tùng Lâm",
      DistrictId: "407",
    },
    {
      id: "16642",
      name: "Phường Tĩnh Hải",
      DistrictId: "407",
    },
    {
      id: "16645",
      name: "Phường Mai Lâm",
      DistrictId: "407",
    },
    {
      id: "16648",
      name: "Xã Trường Lâm",
      DistrictId: "407",
    },
    {
      id: "16651",
      name: "Xã Hải Yến",
      DistrictId: "407",
    },
    {
      id: "16654",
      name: "Phường Hải Thượng",
      DistrictId: "407",
    },
    {
      id: "16657",
      name: "Xã Nghi Sơn",
      DistrictId: "407",
    },
    {
      id: "16660",
      name: "Xã Hải Hà",
      DistrictId: "407",
    },
    {
      id: "16663",
      name: "Phường Đông Vĩnh",
      DistrictId: "412",
    },
    {
      id: "16666",
      name: "Phường Hà Huy Tập",
      DistrictId: "412",
    },
    {
      id: "16669",
      name: "Phường Lê Lợi",
      DistrictId: "412",
    },
    {
      id: "16670",
      name: "Phường Quán Bàu",
      DistrictId: "412",
    },
    {
      id: "16672",
      name: "Phường Hưng Bình",
      DistrictId: "412",
    },
    {
      id: "16673",
      name: "Phường Hưng Phúc",
      DistrictId: "412",
    },
    {
      id: "16675",
      name: "Phường Hưng Dũng",
      DistrictId: "412",
    },
    {
      id: "16678",
      name: "Phường Cửa Nam",
      DistrictId: "412",
    },
    {
      id: "16681",
      name: "Phường Quang Trung",
      DistrictId: "412",
    },
    {
      id: "16684",
      name: "Phường Đội Cung",
      DistrictId: "412",
    },
    {
      id: "16687",
      name: "Phường Lê Mao",
      DistrictId: "412",
    },
    {
      id: "16690",
      name: "Phường Trường Thi",
      DistrictId: "412",
    },
    {
      id: "16693",
      name: "Phường Bến Thủy",
      DistrictId: "412",
    },
    {
      id: "16696",
      name: "Phường Hồng Sơn",
      DistrictId: "412",
    },
    {
      id: "16699",
      name: "Phường Trung Đô",
      DistrictId: "412",
    },
    {
      id: "16702",
      name: "Xã Nghi Phú",
      DistrictId: "412",
    },
    {
      id: "16705",
      name: "Xã Hưng Đông",
      DistrictId: "412",
    },
    {
      id: "16708",
      name: "Xã Hưng Lộc",
      DistrictId: "412",
    },
    {
      id: "16711",
      name: "Xã Hưng Hòa",
      DistrictId: "412",
    },
    {
      id: "16714",
      name: "Phường Vinh Tân",
      DistrictId: "412",
    },
    {
      id: "16717",
      name: "Phường Nghi Thuỷ",
      DistrictId: "413",
    },
    {
      id: "16720",
      name: "Phường Nghi Tân",
      DistrictId: "413",
    },
    {
      id: "16723",
      name: "Phường Thu Thuỷ",
      DistrictId: "413",
    },
    {
      id: "16726",
      name: "Phường Nghi Hòa",
      DistrictId: "413",
    },
    {
      id: "16729",
      name: "Phường Nghi Hải",
      DistrictId: "413",
    },
    {
      id: "16732",
      name: "Phường Nghi Hương",
      DistrictId: "413",
    },
    {
      id: "16735",
      name: "Phường Nghi Thu",
      DistrictId: "413",
    },
    {
      id: "16738",
      name: "Thị trấn Kim Sơn",
      DistrictId: "415",
    },
    {
      id: "16741",
      name: "Xã Thông Thụ",
      DistrictId: "415",
    },
    {
      id: "16744",
      name: "Xã Đồng Văn",
      DistrictId: "415",
    },
    {
      id: "16747",
      name: "Xã Hạnh Dịch",
      DistrictId: "415",
    },
    {
      id: "16750",
      name: "Xã Tiền Phong",
      DistrictId: "415",
    },
    {
      id: "16753",
      name: "Xã Nậm Giải",
      DistrictId: "415",
    },
    {
      id: "16756",
      name: "Xã Tri Lễ",
      DistrictId: "415",
    },
    {
      id: "16759",
      name: "Xã Châu Kim",
      DistrictId: "415",
    },
    {
      id: "16763",
      name: "Xã Mường Nọc",
      DistrictId: "415",
    },
    {
      id: "16765",
      name: "Xã Châu Thôn",
      DistrictId: "415",
    },
    {
      id: "16768",
      name: "Xã Nậm Nhoóng",
      DistrictId: "415",
    },
    {
      id: "16771",
      name: "Xã Quang Phong",
      DistrictId: "415",
    },
    {
      id: "16774",
      name: "Xã Căm Muộn",
      DistrictId: "415",
    },
    {
      id: "16777",
      name: "Thị trấn Tân Lạc",
      DistrictId: "416",
    },
    {
      id: "16780",
      name: "Xã Châu Bính",
      DistrictId: "416",
    },
    {
      id: "16783",
      name: "Xã Châu Thuận",
      DistrictId: "416",
    },
    {
      id: "16786",
      name: "Xã Châu Hội",
      DistrictId: "416",
    },
    {
      id: "16789",
      name: "Xã Châu Nga",
      DistrictId: "416",
    },
    {
      id: "16792",
      name: "Xã Châu Tiến",
      DistrictId: "416",
    },
    {
      id: "16795",
      name: "Xã Châu Hạnh",
      DistrictId: "416",
    },
    {
      id: "16798",
      name: "Xã Châu Thắng",
      DistrictId: "416",
    },
    {
      id: "16801",
      name: "Xã Châu Phong",
      DistrictId: "416",
    },
    {
      id: "16804",
      name: "Xã Châu Bình",
      DistrictId: "416",
    },
    {
      id: "16807",
      name: "Xã Châu Hoàn",
      DistrictId: "416",
    },
    {
      id: "16810",
      name: "Xã Diên Lãm",
      DistrictId: "416",
    },
    {
      id: "16813",
      name: "Thị trấn Mường Xén",
      DistrictId: "417",
    },
    {
      id: "16816",
      name: "Xã Mỹ Lý",
      DistrictId: "417",
    },
    {
      id: "16819",
      name: "Xã Bắc Lý",
      DistrictId: "417",
    },
    {
      id: "16822",
      name: "Xã Keng Đu",
      DistrictId: "417",
    },
    {
      id: "16825",
      name: "Xã Đoọc Mạy",
      DistrictId: "417",
    },
    {
      id: "16828",
      name: "Xã Huồi Tụ",
      DistrictId: "417",
    },
    {
      id: "16831",
      name: "Xã Mường Lống",
      DistrictId: "417",
    },
    {
      id: "16834",
      name: "Xã Na Loi",
      DistrictId: "417",
    },
    {
      id: "16837",
      name: "Xã Nậm Cắn",
      DistrictId: "417",
    },
    {
      id: "16840",
      name: "Xã Bảo Nam",
      DistrictId: "417",
    },
    {
      id: "16843",
      name: "Xã Phà Đánh",
      DistrictId: "417",
    },
    {
      id: "16846",
      name: "Xã Bảo Thắng",
      DistrictId: "417",
    },
    {
      id: "16849",
      name: "Xã Hữu Lập",
      DistrictId: "417",
    },
    {
      id: "16852",
      name: "Xã Tà Cạ",
      DistrictId: "417",
    },
    {
      id: "16855",
      name: "Xã Chiêu Lưu",
      DistrictId: "417",
    },
    {
      id: "16858",
      name: "Xã Mường Típ",
      DistrictId: "417",
    },
    {
      id: "16861",
      name: "Xã Hữu Kiệm",
      DistrictId: "417",
    },
    {
      id: "16864",
      name: "Xã Tây Sơn",
      DistrictId: "417",
    },
    {
      id: "16867",
      name: "Xã Mường Ải",
      DistrictId: "417",
    },
    {
      id: "16870",
      name: "Xã Na Ngoi",
      DistrictId: "417",
    },
    {
      id: "16873",
      name: "Xã Nậm Càn",
      DistrictId: "417",
    },
    {
      id: "16876",
      name: "Thị trấn Thạch Giám",
      DistrictId: "418",
    },
    {
      id: "16879",
      name: "Xã Mai Sơn",
      DistrictId: "418",
    },
    {
      id: "16882",
      name: "Xã Nhôn Mai",
      DistrictId: "418",
    },
    {
      id: "16885",
      name: "Xã Hữu Khuông",
      DistrictId: "418",
    },
    {
      id: "16900",
      name: "Xã Yên Tĩnh",
      DistrictId: "418",
    },
    {
      id: "16903",
      name: "Xã Nga My",
      DistrictId: "418",
    },
    {
      id: "16904",
      name: "Xã Xiêng My",
      DistrictId: "418",
    },
    {
      id: "16906",
      name: "Xã Lưỡng Minh",
      DistrictId: "418",
    },
    {
      id: "16909",
      name: "Xã Yên Hòa",
      DistrictId: "418",
    },
    {
      id: "16912",
      name: "Xã Yên Na",
      DistrictId: "418",
    },
    {
      id: "16915",
      name: "Xã Lưu Kiền",
      DistrictId: "418",
    },
    {
      id: "16921",
      name: "Xã Xá Lượng",
      DistrictId: "418",
    },
    {
      id: "16924",
      name: "Xã Tam Thái",
      DistrictId: "418",
    },
    {
      id: "16927",
      name: "Xã Tam Đình",
      DistrictId: "418",
    },
    {
      id: "16930",
      name: "Xã Yên Thắng",
      DistrictId: "418",
    },
    {
      id: "16933",
      name: "Xã Tam Quang",
      DistrictId: "418",
    },
    {
      id: "16936",
      name: "Xã Tam Hợp",
      DistrictId: "418",
    },
    {
      id: "16939",
      name: "Phường Hoà Hiếu",
      DistrictId: "414",
    },
    {
      id: "16941",
      name: "Thị trấn Nghĩa Đàn",
      DistrictId: "419",
    },
    {
      id: "16942",
      name: "Xã Nghĩa Mai",
      DistrictId: "419",
    },
    {
      id: "16945",
      name: "Xã Nghĩa Yên",
      DistrictId: "419",
    },
    {
      id: "16948",
      name: "Xã Nghĩa Lạc",
      DistrictId: "419",
    },
    {
      id: "16951",
      name: "Xã Nghĩa Lâm",
      DistrictId: "419",
    },
    {
      id: "16954",
      name: "Xã Nghĩa Sơn",
      DistrictId: "419",
    },
    {
      id: "16957",
      name: "Xã Nghĩa Lợi",
      DistrictId: "419",
    },
    {
      id: "16960",
      name: "Xã Nghĩa Bình",
      DistrictId: "419",
    },
    {
      id: "16963",
      name: "Xã Nghĩa Thọ",
      DistrictId: "419",
    },
    {
      id: "16966",
      name: "Xã Nghĩa Minh",
      DistrictId: "419",
    },
    {
      id: "16969",
      name: "Xã Nghĩa Phú",
      DistrictId: "419",
    },
    {
      id: "16972",
      name: "Xã Nghĩa Hưng",
      DistrictId: "419",
    },
    {
      id: "16975",
      name: "Xã Nghĩa Hồng",
      DistrictId: "419",
    },
    {
      id: "16978",
      name: "Xã Nghĩa Thịnh",
      DistrictId: "419",
    },
    {
      id: "16981",
      name: "Xã Nghĩa Trung",
      DistrictId: "419",
    },
    {
      id: "16984",
      name: "Xã Nghĩa Hội",
      DistrictId: "419",
    },
    {
      id: "16987",
      name: "Xã Nghĩa Thành",
      DistrictId: "419",
    },
    {
      id: "16993",
      name: "Phường Quang Phong",
      DistrictId: "414",
    },
    {
      id: "16994",
      name: "Phường Quang Tiến",
      DistrictId: "414",
    },
    {
      id: "16996",
      name: "Xã Nghĩa Hiếu",
      DistrictId: "419",
    },
    {
      id: "17003",
      name: "Phường Long Sơn",
      DistrictId: "414",
    },
    {
      id: "17005",
      name: "Xã Nghĩa Tiến",
      DistrictId: "414",
    },
    {
      id: "17008",
      name: "Xã Nghĩa Mỹ",
      DistrictId: "414",
    },
    {
      id: "17011",
      name: "Xã Tây Hiếu",
      DistrictId: "414",
    },
    {
      id: "17014",
      name: "Xã Nghĩa Thuận",
      DistrictId: "414",
    },
    {
      id: "17017",
      name: "Xã Đông Hiếu",
      DistrictId: "414",
    },
    {
      id: "17020",
      name: "Xã Nghĩa Đức",
      DistrictId: "419",
    },
    {
      id: "17023",
      name: "Xã Nghĩa An",
      DistrictId: "419",
    },
    {
      id: "17026",
      name: "Xã Nghĩa Long",
      DistrictId: "419",
    },
    {
      id: "17029",
      name: "Xã Nghĩa Lộc",
      DistrictId: "419",
    },
    {
      id: "17032",
      name: "Xã Nghĩa Khánh",
      DistrictId: "419",
    },
    {
      id: "17035",
      name: "Thị trấn Quỳ Hợp",
      DistrictId: "420",
    },
    {
      id: "17038",
      name: "Xã Yên Hợp",
      DistrictId: "420",
    },
    {
      id: "17041",
      name: "Xã Châu Tiến",
      DistrictId: "420",
    },
    {
      id: "17044",
      name: "Xã Châu Hồng",
      DistrictId: "420",
    },
    {
      id: "17047",
      name: "Xã Đồng Hợp",
      DistrictId: "420",
    },
    {
      id: "17050",
      name: "Xã Châu Thành",
      DistrictId: "420",
    },
    {
      id: "17053",
      name: "Xã Liên Hợp",
      DistrictId: "420",
    },
    {
      id: "17056",
      name: "Xã Châu Lộc",
      DistrictId: "420",
    },
    {
      id: "17059",
      name: "Xã Tam Hợp",
      DistrictId: "420",
    },
    {
      id: "17062",
      name: "Xã Châu Cường",
      DistrictId: "420",
    },
    {
      id: "17065",
      name: "Xã Châu Quang",
      DistrictId: "420",
    },
    {
      id: "17068",
      name: "Xã Thọ Hợp",
      DistrictId: "420",
    },
    {
      id: "17071",
      name: "Xã Minh Hợp",
      DistrictId: "420",
    },
    {
      id: "17074",
      name: "Xã Nghĩa Xuân",
      DistrictId: "420",
    },
    {
      id: "17077",
      name: "Xã Châu Thái",
      DistrictId: "420",
    },
    {
      id: "17080",
      name: "Xã Châu Đình",
      DistrictId: "420",
    },
    {
      id: "17083",
      name: "Xã Văn Lợi",
      DistrictId: "420",
    },
    {
      id: "17086",
      name: "Xã Nam Sơn",
      DistrictId: "420",
    },
    {
      id: "17089",
      name: "Xã Châu Lý",
      DistrictId: "420",
    },
    {
      id: "17092",
      name: "Xã Hạ Sơn",
      DistrictId: "420",
    },
    {
      id: "17095",
      name: "Xã Bắc Sơn",
      DistrictId: "420",
    },
    {
      id: "17098",
      name: "Thị trấn Cầu Giát",
      DistrictId: "421",
    },
    {
      id: "17101",
      name: "Xã Quỳnh Thắng",
      DistrictId: "421",
    },
    {
      id: "17104",
      name: "Xã Quỳnh Vinh",
      DistrictId: "432",
    },
    {
      id: "17107",
      name: "Xã Quỳnh Lộc",
      DistrictId: "432",
    },
    {
      id: "17110",
      name: "Phường Quỳnh Thiện",
      DistrictId: "432",
    },
    {
      id: "17113",
      name: "Xã Quỳnh Lập",
      DistrictId: "432",
    },
    {
      id: "17116",
      name: "Xã Quỳnh Trang",
      DistrictId: "432",
    },
    {
      id: "17119",
      name: "Xã Quỳnh Tân",
      DistrictId: "421",
    },
    {
      id: "17122",
      name: "Xã Quỳnh Châu",
      DistrictId: "421",
    },
    {
      id: "17125",
      name: "Phường Mai Hùng",
      DistrictId: "432",
    },
    {
      id: "17128",
      name: "Phường Quỳnh Dị",
      DistrictId: "432",
    },
    {
      id: "17131",
      name: "Phường Quỳnh Xuân",
      DistrictId: "432",
    },
    {
      id: "17134",
      name: "Phường Quỳnh Phương",
      DistrictId: "432",
    },
    {
      id: "17137",
      name: "Xã Quỳnh Liên",
      DistrictId: "432",
    },
    {
      id: "17140",
      name: "Xã Tân Sơn",
      DistrictId: "421",
    },
    {
      id: "17143",
      name: "Xã Quỳnh Văn",
      DistrictId: "421",
    },
    {
      id: "17146",
      name: "Xã Ngọc Sơn",
      DistrictId: "421",
    },
    {
      id: "17149",
      name: "Xã Quỳnh Tam",
      DistrictId: "421",
    },
    {
      id: "17152",
      name: "Xã Quỳnh Hoa",
      DistrictId: "421",
    },
    {
      id: "17155",
      name: "Xã Quỳnh Thạch",
      DistrictId: "421",
    },
    {
      id: "17158",
      name: "Xã Quỳnh Bảng",
      DistrictId: "421",
    },
    {
      id: "17161",
      name: "Xã Quỳnh Mỹ",
      DistrictId: "421",
    },
    {
      id: "17164",
      name: "Xã Quỳnh Thanh",
      DistrictId: "421",
    },
    {
      id: "17167",
      name: "Xã Quỳnh Hậu",
      DistrictId: "421",
    },
    {
      id: "17170",
      name: "Xã Quỳnh Lâm",
      DistrictId: "421",
    },
    {
      id: "17173",
      name: "Xã Quỳnh Đôi",
      DistrictId: "421",
    },
    {
      id: "17176",
      name: "Xã Quỳnh Lương",
      DistrictId: "421",
    },
    {
      id: "17179",
      name: "Xã Quỳnh Hồng",
      DistrictId: "421",
    },
    {
      id: "17182",
      name: "Xã Quỳnh Yên",
      DistrictId: "421",
    },
    {
      id: "17185",
      name: "Xã Quỳnh Bá",
      DistrictId: "421",
    },
    {
      id: "17188",
      name: "Xã Quỳnh Minh",
      DistrictId: "421",
    },
    {
      id: "17191",
      name: "Xã Quỳnh Diễn",
      DistrictId: "421",
    },
    {
      id: "17194",
      name: "Xã Quỳnh Hưng",
      DistrictId: "421",
    },
    {
      id: "17197",
      name: "Xã Quỳnh Giang",
      DistrictId: "421",
    },
    {
      id: "17200",
      name: "Xã Quỳnh Ngọc",
      DistrictId: "421",
    },
    {
      id: "17203",
      name: "Xã Quỳnh Nghĩa",
      DistrictId: "421",
    },
    {
      id: "17206",
      name: "Xã An Hòa",
      DistrictId: "421",
    },
    {
      id: "17209",
      name: "Xã Tiến Thủy",
      DistrictId: "421",
    },
    {
      id: "17212",
      name: "Xã Sơn Hải",
      DistrictId: "421",
    },
    {
      id: "17215",
      name: "Xã Quỳnh Thọ",
      DistrictId: "421",
    },
    {
      id: "17218",
      name: "Xã Quỳnh Thuận",
      DistrictId: "421",
    },
    {
      id: "17221",
      name: "Xã Quỳnh Long",
      DistrictId: "421",
    },
    {
      id: "17224",
      name: "Xã Tân Thắng",
      DistrictId: "421",
    },
    {
      id: "17227",
      name: "Thị trấn Con Cuông",
      DistrictId: "422",
    },
    {
      id: "17230",
      name: "Xã Bình Chuẩn",
      DistrictId: "422",
    },
    {
      id: "17233",
      name: "Xã Lạng Khê",
      DistrictId: "422",
    },
    {
      id: "17236",
      name: "Xã Cam Lâm",
      DistrictId: "422",
    },
    {
      id: "17239",
      name: "Xã Thạch Ngàn",
      DistrictId: "422",
    },
    {
      id: "17242",
      name: "Xã Đôn Phục",
      DistrictId: "422",
    },
    {
      id: "17245",
      name: "Xã Mậu Đức",
      DistrictId: "422",
    },
    {
      id: "17248",
      name: "Xã Châu Khê",
      DistrictId: "422",
    },
    {
      id: "17251",
      name: "Xã Chi Khê",
      DistrictId: "422",
    },
    {
      id: "17254",
      name: "Xã Bồng Khê",
      DistrictId: "422",
    },
    {
      id: "17257",
      name: "Xã Yên Khê",
      DistrictId: "422",
    },
    {
      id: "17260",
      name: "Xã Lục Dạ",
      DistrictId: "422",
    },
    {
      id: "17263",
      name: "Xã Môn Sơn",
      DistrictId: "422",
    },
    {
      id: "17266",
      name: "Thị trấn Tân Kỳ",
      DistrictId: "423",
    },
    {
      id: "17269",
      name: "Xã Tân Hợp",
      DistrictId: "423",
    },
    {
      id: "17272",
      name: "Xã Tân Phú",
      DistrictId: "423",
    },
    {
      id: "17275",
      name: "Xã Tân Xuân",
      DistrictId: "423",
    },
    {
      id: "17278",
      name: "Xã Giai Xuân",
      DistrictId: "423",
    },
    {
      id: "17281",
      name: "Xã Nghĩa Bình",
      DistrictId: "423",
    },
    {
      id: "17284",
      name: "Xã Nghĩa Đồng",
      DistrictId: "423",
    },
    {
      id: "17287",
      name: "Xã Đồng Văn",
      DistrictId: "423",
    },
    {
      id: "17290",
      name: "Xã Nghĩa Thái",
      DistrictId: "423",
    },
    {
      id: "17293",
      name: "Xã Nghĩa Hợp",
      DistrictId: "423",
    },
    {
      id: "17296",
      name: "Xã Nghĩa Hoàn",
      DistrictId: "423",
    },
    {
      id: "17299",
      name: "Xã Nghĩa Phúc",
      DistrictId: "423",
    },
    {
      id: "17302",
      name: "Xã Tiên Kỳ",
      DistrictId: "423",
    },
    {
      id: "17305",
      name: "Xã Tân An",
      DistrictId: "423",
    },
    {
      id: "17308",
      name: "Xã Nghĩa Dũng",
      DistrictId: "423",
    },
    {
      id: "17311",
      name: "Xã Tân Long",
      DistrictId: "423",
    },
    {
      id: "17314",
      name: "Xã Kỳ Sơn",
      DistrictId: "423",
    },
    {
      id: "17317",
      name: "Xã Hương Sơn",
      DistrictId: "423",
    },
    {
      id: "17320",
      name: "Xã Kỳ Tân",
      DistrictId: "423",
    },
    {
      id: "17323",
      name: "Xã Phú Sơn",
      DistrictId: "423",
    },
    {
      id: "17325",
      name: "Xã Tân Hương",
      DistrictId: "423",
    },
    {
      id: "17326",
      name: "Xã Nghĩa Hành",
      DistrictId: "423",
    },
    {
      id: "17329",
      name: "Thị trấn Anh Sơn",
      DistrictId: "424",
    },
    {
      id: "17332",
      name: "Xã Thọ Sơn",
      DistrictId: "424",
    },
    {
      id: "17335",
      name: "Xã Thành Sơn",
      DistrictId: "424",
    },
    {
      id: "17338",
      name: "Xã Bình Sơn",
      DistrictId: "424",
    },
    {
      id: "17341",
      name: "Xã Tam Sơn",
      DistrictId: "424",
    },
    {
      id: "17344",
      name: "Xã Đỉnh Sơn",
      DistrictId: "424",
    },
    {
      id: "17347",
      name: "Xã Hùng Sơn",
      DistrictId: "424",
    },
    {
      id: "17350",
      name: "Xã Cẩm Sơn",
      DistrictId: "424",
    },
    {
      id: "17353",
      name: "Xã Đức Sơn",
      DistrictId: "424",
    },
    {
      id: "17356",
      name: "Xã Tường Sơn",
      DistrictId: "424",
    },
    {
      id: "17357",
      name: "Xã Hoa Sơn",
      DistrictId: "424",
    },
    {
      id: "17359",
      name: "Xã Tào Sơn",
      DistrictId: "424",
    },
    {
      id: "17362",
      name: "Xã Vĩnh Sơn",
      DistrictId: "424",
    },
    {
      id: "17365",
      name: "Xã Lạng Sơn",
      DistrictId: "424",
    },
    {
      id: "17368",
      name: "Xã Hội Sơn",
      DistrictId: "424",
    },
    {
      id: "17371",
      name: "Xã Thạch Sơn",
      DistrictId: "424",
    },
    {
      id: "17374",
      name: "Xã Phúc Sơn",
      DistrictId: "424",
    },
    {
      id: "17377",
      name: "Xã Long Sơn",
      DistrictId: "424",
    },
    {
      id: "17380",
      name: "Xã Khai Sơn",
      DistrictId: "424",
    },
    {
      id: "17383",
      name: "Xã Lĩnh Sơn",
      DistrictId: "424",
    },
    {
      id: "17386",
      name: "Xã Cao Sơn",
      DistrictId: "424",
    },
    {
      id: "17389",
      name: "Thị trấn Diễn Châu",
      DistrictId: "425",
    },
    {
      id: "17392",
      name: "Xã Diễn Lâm",
      DistrictId: "425",
    },
    {
      id: "17395",
      name: "Xã Diễn Đoài",
      DistrictId: "425",
    },
    {
      id: "17398",
      name: "Xã Diễn Trường",
      DistrictId: "425",
    },
    {
      id: "17401",
      name: "Xã Diễn Yên",
      DistrictId: "425",
    },
    {
      id: "17404",
      name: "Xã Diễn Hoàng",
      DistrictId: "425",
    },
    {
      id: "17407",
      name: "Xã Diễn Hùng",
      DistrictId: "425",
    },
    {
      id: "17410",
      name: "Xã Diễn Mỹ",
      DistrictId: "425",
    },
    {
      id: "17413",
      name: "Xã Diễn Hồng",
      DistrictId: "425",
    },
    {
      id: "17416",
      name: "Xã Diễn Phong",
      DistrictId: "425",
    },
    {
      id: "17419",
      name: "Xã Diễn Hải",
      DistrictId: "425",
    },
    {
      id: "17422",
      name: "Xã Diễn Tháp",
      DistrictId: "425",
    },
    {
      id: "17425",
      name: "Xã Diễn Liên",
      DistrictId: "425",
    },
    {
      id: "17428",
      name: "Xã Diễn Vạn",
      DistrictId: "425",
    },
    {
      id: "17431",
      name: "Xã Diễn Kim",
      DistrictId: "425",
    },
    {
      id: "17434",
      name: "Xã Diễn Kỷ",
      DistrictId: "425",
    },
    {
      id: "17437",
      name: "Xã Diễn Xuân",
      DistrictId: "425",
    },
    {
      id: "17440",
      name: "Xã Diễn Thái",
      DistrictId: "425",
    },
    {
      id: "17443",
      name: "Xã Diễn Đồng",
      DistrictId: "425",
    },
    {
      id: "17446",
      name: "Xã Diễn Bích",
      DistrictId: "425",
    },
    {
      id: "17449",
      name: "Xã Diễn Hạnh",
      DistrictId: "425",
    },
    {
      id: "17452",
      name: "Xã Diễn Ngọc",
      DistrictId: "425",
    },
    {
      id: "17455",
      name: "Xã Diễn Quảng",
      DistrictId: "425",
    },
    {
      id: "17458",
      name: "Xã Diễn Nguyên",
      DistrictId: "425",
    },
    {
      id: "17461",
      name: "Xã Diễn Hoa",
      DistrictId: "425",
    },
    {
      id: "17464",
      name: "Xã Diễn Thành",
      DistrictId: "425",
    },
    {
      id: "17467",
      name: "Xã Diễn Phúc",
      DistrictId: "425",
    },
    {
      id: "17476",
      name: "Xã Diễn Cát",
      DistrictId: "425",
    },
    {
      id: "17479",
      name: "Xã Diễn Thịnh",
      DistrictId: "425",
    },
    {
      id: "17482",
      name: "Xã Diễn Tân",
      DistrictId: "425",
    },
    {
      id: "17485",
      name: "Xã Minh Châu",
      DistrictId: "425",
    },
    {
      id: "17488",
      name: "Xã Diễn Thọ",
      DistrictId: "425",
    },
    {
      id: "17491",
      name: "Xã Diễn Lợi",
      DistrictId: "425",
    },
    {
      id: "17494",
      name: "Xã Diễn Lộc",
      DistrictId: "425",
    },
    {
      id: "17497",
      name: "Xã Diễn Trung",
      DistrictId: "425",
    },
    {
      id: "17500",
      name: "Xã Diễn An",
      DistrictId: "425",
    },
    {
      id: "17503",
      name: "Xã Diễn Phú",
      DistrictId: "425",
    },
    {
      id: "17506",
      name: "Thị trấn Yên Thành",
      DistrictId: "426",
    },
    {
      id: "17509",
      name: "Xã Mã Thành",
      DistrictId: "426",
    },
    {
      id: "17510",
      name: "Xã Tiến Thành",
      DistrictId: "426",
    },
    {
      id: "17512",
      name: "Xã Lăng Thành",
      DistrictId: "426",
    },
    {
      id: "17515",
      name: "Xã Tân Thành",
      DistrictId: "426",
    },
    {
      id: "17518",
      name: "Xã Đức Thành",
      DistrictId: "426",
    },
    {
      id: "17521",
      name: "Xã Kim Thành",
      DistrictId: "426",
    },
    {
      id: "17524",
      name: "Xã Hậu Thành",
      DistrictId: "426",
    },
    {
      id: "17525",
      name: "Xã Hùng Thành",
      DistrictId: "426",
    },
    {
      id: "17527",
      name: "Xã Đô Thành",
      DistrictId: "426",
    },
    {
      id: "17530",
      name: "Xã Thọ Thành",
      DistrictId: "426",
    },
    {
      id: "17533",
      name: "Xã Quang Thành",
      DistrictId: "426",
    },
    {
      id: "17536",
      name: "Xã Tây Thành",
      DistrictId: "426",
    },
    {
      id: "17539",
      name: "Xã Phúc Thành",
      DistrictId: "426",
    },
    {
      id: "17542",
      name: "Xã Hồng Thành",
      DistrictId: "426",
    },
    {
      id: "17545",
      name: "Xã Đồng Thành",
      DistrictId: "426",
    },
    {
      id: "17548",
      name: "Xã Phú Thành",
      DistrictId: "426",
    },
    {
      id: "17551",
      name: "Xã Hoa Thành",
      DistrictId: "426",
    },
    {
      id: "17554",
      name: "Xã Tăng Thành",
      DistrictId: "426",
    },
    {
      id: "17557",
      name: "Xã Văn Thành",
      DistrictId: "426",
    },
    {
      id: "17560",
      name: "Xã Thịnh Thành",
      DistrictId: "426",
    },
    {
      id: "17563",
      name: "Xã Hợp Thành",
      DistrictId: "426",
    },
    {
      id: "17566",
      name: "Xã Xuân Thành",
      DistrictId: "426",
    },
    {
      id: "17569",
      name: "Xã Bắc Thành",
      DistrictId: "426",
    },
    {
      id: "17572",
      name: "Xã Nhân Thành",
      DistrictId: "426",
    },
    {
      id: "17575",
      name: "Xã Trung Thành",
      DistrictId: "426",
    },
    {
      id: "17578",
      name: "Xã Long Thành",
      DistrictId: "426",
    },
    {
      id: "17581",
      name: "Xã Minh Thành",
      DistrictId: "426",
    },
    {
      id: "17584",
      name: "Xã Nam Thành",
      DistrictId: "426",
    },
    {
      id: "17587",
      name: "Xã Vĩnh Thành",
      DistrictId: "426",
    },
    {
      id: "17590",
      name: "Xã Lý Thành",
      DistrictId: "426",
    },
    {
      id: "17593",
      name: "Xã Khánh Thành",
      DistrictId: "426",
    },
    {
      id: "17596",
      name: "Xã Viên Thành",
      DistrictId: "426",
    },
    {
      id: "17599",
      name: "Xã Đại Thành",
      DistrictId: "426",
    },
    {
      id: "17602",
      name: "Xã Liên Thành",
      DistrictId: "426",
    },
    {
      id: "17605",
      name: "Xã Bảo Thành",
      DistrictId: "426",
    },
    {
      id: "17608",
      name: "Xã Mỹ Thành",
      DistrictId: "426",
    },
    {
      id: "17611",
      name: "Xã Công Thành",
      DistrictId: "426",
    },
    {
      id: "17614",
      name: "Xã Sơn Thành",
      DistrictId: "426",
    },
    {
      id: "17617",
      name: "Thị trấn Đô Lương",
      DistrictId: "427",
    },
    {
      id: "17619",
      name: "Xã Giang Sơn Đông",
      DistrictId: "427",
    },
    {
      id: "17620",
      name: "Xã Giang Sơn Tây",
      DistrictId: "427",
    },
    {
      id: "17623",
      name: "Xã Lam Sơn",
      DistrictId: "427",
    },
    {
      id: "17626",
      name: "Xã Bồi Sơn",
      DistrictId: "427",
    },
    {
      id: "17629",
      name: "Xã Hồng Sơn",
      DistrictId: "427",
    },
    {
      id: "17632",
      name: "Xã Bài Sơn",
      DistrictId: "427",
    },
    {
      id: "17635",
      name: "Xã Ngọc Sơn",
      DistrictId: "427",
    },
    {
      id: "17638",
      name: "Xã Bắc Sơn",
      DistrictId: "427",
    },
    {
      id: "17641",
      name: "Xã Tràng Sơn",
      DistrictId: "427",
    },
    {
      id: "17644",
      name: "Xã Thượng Sơn",
      DistrictId: "427",
    },
    {
      id: "17647",
      name: "Xã Hòa Sơn",
      DistrictId: "427",
    },
    {
      id: "17650",
      name: "Xã Đặng Sơn",
      DistrictId: "427",
    },
    {
      id: "17653",
      name: "Xã Đông Sơn",
      DistrictId: "427",
    },
    {
      id: "17656",
      name: "Xã Nam Sơn",
      DistrictId: "427",
    },
    {
      id: "17659",
      name: "Xã Lưu Sơn",
      DistrictId: "427",
    },
    {
      id: "17662",
      name: "Xã Yên Sơn",
      DistrictId: "427",
    },
    {
      id: "17665",
      name: "Xã Văn Sơn",
      DistrictId: "427",
    },
    {
      id: "17668",
      name: "Xã Đà Sơn",
      DistrictId: "427",
    },
    {
      id: "17671",
      name: "Xã Lạc Sơn",
      DistrictId: "427",
    },
    {
      id: "17674",
      name: "Xã Tân Sơn",
      DistrictId: "427",
    },
    {
      id: "17677",
      name: "Xã Thái Sơn",
      DistrictId: "427",
    },
    {
      id: "17680",
      name: "Xã Quang Sơn",
      DistrictId: "427",
    },
    {
      id: "17683",
      name: "Xã Thịnh Sơn",
      DistrictId: "427",
    },
    {
      id: "17686",
      name: "Xã Trung Sơn",
      DistrictId: "427",
    },
    {
      id: "17689",
      name: "Xã Xuân Sơn",
      DistrictId: "427",
    },
    {
      id: "17692",
      name: "Xã Minh Sơn",
      DistrictId: "427",
    },
    {
      id: "17695",
      name: "Xã Thuận Sơn",
      DistrictId: "427",
    },
    {
      id: "17698",
      name: "Xã Nhân Sơn",
      DistrictId: "427",
    },
    {
      id: "17701",
      name: "Xã Hiến Sơn",
      DistrictId: "427",
    },
    {
      id: "17704",
      name: "Xã Mỹ Sơn",
      DistrictId: "427",
    },
    {
      id: "17707",
      name: "Xã Trù Sơn",
      DistrictId: "427",
    },
    {
      id: "17710",
      name: "Xã Đại Sơn",
      DistrictId: "427",
    },
    {
      id: "17713",
      name: "Thị trấn Thanh Chương",
      DistrictId: "428",
    },
    {
      id: "17716",
      name: "Xã Cát Văn",
      DistrictId: "428",
    },
    {
      id: "17719",
      name: "Xã Thanh Nho",
      DistrictId: "428",
    },
    {
      id: "17722",
      name: "Xã Hạnh Lâm",
      DistrictId: "428",
    },
    {
      id: "17723",
      name: "Xã Thanh Sơn",
      DistrictId: "428",
    },
    {
      id: "17725",
      name: "Xã Thanh Hòa",
      DistrictId: "428",
    },
    {
      id: "17728",
      name: "Xã Phong Thịnh",
      DistrictId: "428",
    },
    {
      id: "17731",
      name: "Xã Thanh Phong",
      DistrictId: "428",
    },
    {
      id: "17734",
      name: "Xã Thanh Mỹ",
      DistrictId: "428",
    },
    {
      id: "17737",
      name: "Xã Thanh Tiên",
      DistrictId: "428",
    },
    {
      id: "17743",
      name: "Xã Thanh Liên",
      DistrictId: "428",
    },
    {
      id: "17749",
      name: "Xã Đại Đồng",
      DistrictId: "428",
    },
    {
      id: "17752",
      name: "Xã Thanh Đồng",
      DistrictId: "428",
    },
    {
      id: "17755",
      name: "Xã Thanh Ngọc",
      DistrictId: "428",
    },
    {
      id: "17758",
      name: "Xã Thanh Hương",
      DistrictId: "428",
    },
    {
      id: "17759",
      name: "Xã Ngọc Lâm",
      DistrictId: "428",
    },
    {
      id: "17761",
      name: "Xã Thanh Lĩnh",
      DistrictId: "428",
    },
    {
      id: "17764",
      name: "Xã Đồng Văn",
      DistrictId: "428",
    },
    {
      id: "17767",
      name: "Xã Ngọc Sơn",
      DistrictId: "428",
    },
    {
      id: "17770",
      name: "Xã Thanh Thịnh",
      DistrictId: "428",
    },
    {
      id: "17773",
      name: "Xã Thanh An",
      DistrictId: "428",
    },
    {
      id: "17776",
      name: "Xã Thanh Chi",
      DistrictId: "428",
    },
    {
      id: "17779",
      name: "Xã Xuân Tường",
      DistrictId: "428",
    },
    {
      id: "17782",
      name: "Xã Thanh Dương",
      DistrictId: "428",
    },
    {
      id: "17785",
      name: "Xã Thanh Lương",
      DistrictId: "428",
    },
    {
      id: "17788",
      name: "Xã Thanh Khê",
      DistrictId: "428",
    },
    {
      id: "17791",
      name: "Xã Võ Liệt",
      DistrictId: "428",
    },
    {
      id: "17794",
      name: "Xã Thanh Long",
      DistrictId: "428",
    },
    {
      id: "17797",
      name: "Xã Thanh Thủy",
      DistrictId: "428",
    },
    {
      id: "17800",
      name: "Xã Thanh Khai",
      DistrictId: "428",
    },
    {
      id: "17803",
      name: "Xã Thanh Yên",
      DistrictId: "428",
    },
    {
      id: "17806",
      name: "Xã Thanh Hà",
      DistrictId: "428",
    },
    {
      id: "17809",
      name: "Xã Thanh Giang",
      DistrictId: "428",
    },
    {
      id: "17812",
      name: "Xã Thanh Tùng",
      DistrictId: "428",
    },
    {
      id: "17815",
      name: "Xã Thanh Lâm",
      DistrictId: "428",
    },
    {
      id: "17818",
      name: "Xã Thanh Mai",
      DistrictId: "428",
    },
    {
      id: "17821",
      name: "Xã Thanh Xuân",
      DistrictId: "428",
    },
    {
      id: "17824",
      name: "Xã Thanh Đức",
      DistrictId: "428",
    },
    {
      id: "17827",
      name: "Thị trấn Quán Hành",
      DistrictId: "429",
    },
    {
      id: "17830",
      name: "Xã Nghi Văn",
      DistrictId: "429",
    },
    {
      id: "17833",
      name: "Xã Nghi Yên",
      DistrictId: "429",
    },
    {
      id: "17836",
      name: "Xã Nghi Tiến",
      DistrictId: "429",
    },
    {
      id: "17839",
      name: "Xã Nghi Hưng",
      DistrictId: "429",
    },
    {
      id: "17842",
      name: "Xã Nghi Đồng",
      DistrictId: "429",
    },
    {
      id: "17845",
      name: "Xã Nghi Thiết",
      DistrictId: "429",
    },
    {
      id: "17848",
      name: "Xã Nghi Lâm",
      DistrictId: "429",
    },
    {
      id: "17851",
      name: "Xã Nghi Quang",
      DistrictId: "429",
    },
    {
      id: "17854",
      name: "Xã Nghi Kiều",
      DistrictId: "429",
    },
    {
      id: "17857",
      name: "Xã Nghi Mỹ",
      DistrictId: "429",
    },
    {
      id: "17860",
      name: "Xã Nghi Phương",
      DistrictId: "429",
    },
    {
      id: "17863",
      name: "Xã Nghi Thuận",
      DistrictId: "429",
    },
    {
      id: "17866",
      name: "Xã Nghi Long",
      DistrictId: "429",
    },
    {
      id: "17869",
      name: "Xã Nghi Xá",
      DistrictId: "429",
    },
    {
      id: "17875",
      name: "Xã Nghi Hoa",
      DistrictId: "429",
    },
    {
      id: "17878",
      name: "Xã Khánh Hợp",
      DistrictId: "429",
    },
    {
      id: "17881",
      name: "Xã Nghi Thịnh",
      DistrictId: "429",
    },
    {
      id: "17884",
      name: "Xã Nghi Công Bắc",
      DistrictId: "429",
    },
    {
      id: "17887",
      name: "Xã Nghi Công Nam",
      DistrictId: "429",
    },
    {
      id: "17890",
      name: "Xã Nghi Thạch",
      DistrictId: "429",
    },
    {
      id: "17893",
      name: "Xã Nghi Trung",
      DistrictId: "429",
    },
    {
      id: "17896",
      name: "Xã Nghi Trường",
      DistrictId: "429",
    },
    {
      id: "17899",
      name: "Xã Nghi Diên",
      DistrictId: "429",
    },
    {
      id: "17902",
      name: "Xã Nghi Phong",
      DistrictId: "429",
    },
    {
      id: "17905",
      name: "Xã Nghi Xuân",
      DistrictId: "429",
    },
    {
      id: "17908",
      name: "Xã Nghi Liên",
      DistrictId: "412",
    },
    {
      id: "17911",
      name: "Xã Nghi Vạn",
      DistrictId: "429",
    },
    {
      id: "17914",
      name: "Xã Nghi Ân",
      DistrictId: "412",
    },
    {
      id: "17917",
      name: "Xã Phúc Thọ",
      DistrictId: "429",
    },
    {
      id: "17920",
      name: "Xã Nghi Kim",
      DistrictId: "412",
    },
    {
      id: "17923",
      name: "Xã Nghi Đức",
      DistrictId: "412",
    },
    {
      id: "17926",
      name: "Xã Nghi Thái",
      DistrictId: "429",
    },
    {
      id: "17932",
      name: "Xã Nam Hưng",
      DistrictId: "430",
    },
    {
      id: "17935",
      name: "Xã Nam Nghĩa",
      DistrictId: "430",
    },
    {
      id: "17938",
      name: "Xã Nam Thanh",
      DistrictId: "430",
    },
    {
      id: "17941",
      name: "Xã Nam Anh",
      DistrictId: "430",
    },
    {
      id: "17944",
      name: "Xã Nam Xuân",
      DistrictId: "430",
    },
    {
      id: "17947",
      name: "Xã Nam Thái",
      DistrictId: "430",
    },
    {
      id: "17950",
      name: "Thị trấn Nam Đàn",
      DistrictId: "430",
    },
    {
      id: "17953",
      name: "Xã Nam Lĩnh",
      DistrictId: "430",
    },
    {
      id: "17956",
      name: "Xã Nam Giang",
      DistrictId: "430",
    },
    {
      id: "17959",
      name: "Xã Xuân Hòa",
      DistrictId: "430",
    },
    {
      id: "17962",
      name: "Xã Hùng Tiến",
      DistrictId: "430",
    },
    {
      id: "17968",
      name: "Xã Thượng Tân Lộc",
      DistrictId: "430",
    },
    {
      id: "17971",
      name: "Xã Kim Liên",
      DistrictId: "430",
    },
    {
      id: "17977",
      name: "Xã Hồng Long",
      DistrictId: "430",
    },
    {
      id: "17980",
      name: "Xã Xuân Lâm",
      DistrictId: "430",
    },
    {
      id: "17983",
      name: "Xã Nam Cát",
      DistrictId: "430",
    },
    {
      id: "17986",
      name: "Xã Khánh Sơn",
      DistrictId: "430",
    },
    {
      id: "17989",
      name: "Xã Trung Phúc Cường",
      DistrictId: "430",
    },
    {
      id: "17998",
      name: "Xã Nam Kim",
      DistrictId: "430",
    },
    {
      id: "18001",
      name: "Thị trấn Hưng Nguyên",
      DistrictId: "431",
    },
    {
      id: "18004",
      name: "Xã Hưng Trung",
      DistrictId: "431",
    },
    {
      id: "18007",
      name: "Xã Hưng Yên",
      DistrictId: "431",
    },
    {
      id: "18008",
      name: "Xã Hưng Yên Bắc",
      DistrictId: "431",
    },
    {
      id: "18010",
      name: "Xã Hưng Tây",
      DistrictId: "431",
    },
    {
      id: "18013",
      name: "Xã Hưng Chính",
      DistrictId: "412",
    },
    {
      id: "18016",
      name: "Xã Hưng Đạo",
      DistrictId: "431",
    },
    {
      id: "18019",
      name: "Xã Hưng Mỹ",
      DistrictId: "431",
    },
    {
      id: "18022",
      name: "Xã Hưng Thịnh",
      DistrictId: "431",
    },
    {
      id: "18025",
      name: "Xã Hưng Lĩnh",
      DistrictId: "431",
    },
    {
      id: "18028",
      name: "Xã Hưng Thông",
      DistrictId: "431",
    },
    {
      id: "18031",
      name: "Xã Hưng Tân",
      DistrictId: "431",
    },
    {
      id: "18034",
      name: "Xã Hưng Lợi",
      DistrictId: "431",
    },
    {
      id: "18037",
      name: "Xã Hưng Nghĩa",
      DistrictId: "431",
    },
    {
      id: "18040",
      name: "Xã Hưng Phúc",
      DistrictId: "431",
    },
    {
      id: "18043",
      name: "Xã Long Xá",
      DistrictId: "431",
    },
    {
      id: "18052",
      name: "Xã Châu Nhân",
      DistrictId: "431",
    },
    {
      id: "18055",
      name: "Xã Xuân Lam",
      DistrictId: "431",
    },
    {
      id: "18064",
      name: "Xã Hưng Thành",
      DistrictId: "431",
    },
    {
      id: "18070",
      name: "Phường Trần Phú",
      DistrictId: "436",
    },
    {
      id: "18073",
      name: "Phường Nam Hà",
      DistrictId: "436",
    },
    {
      id: "18076",
      name: "Phường Bắc Hà",
      DistrictId: "436",
    },
    {
      id: "18077",
      name: "Phường Nguyễn Du",
      DistrictId: "436",
    },
    {
      id: "18079",
      name: "Phường Tân Giang",
      DistrictId: "436",
    },
    {
      id: "18082",
      name: "Phường Đại Nài",
      DistrictId: "436",
    },
    {
      id: "18085",
      name: "Phường Hà Huy Tập",
      DistrictId: "436",
    },
    {
      id: "18088",
      name: "Xã Thạch Trung",
      DistrictId: "436",
    },
    {
      id: "18091",
      name: "Phường Thạch Quý",
      DistrictId: "436",
    },
    {
      id: "18094",
      name: "Phường Thạch Linh",
      DistrictId: "436",
    },
    {
      id: "18097",
      name: "Phường Văn Yên",
      DistrictId: "436",
    },
    {
      id: "18100",
      name: "Xã Thạch Hạ",
      DistrictId: "436",
    },
    {
      id: "18103",
      name: "Xã Đồng Môn",
      DistrictId: "436",
    },
    {
      id: "18109",
      name: "Xã Thạch Hưng",
      DistrictId: "436",
    },
    {
      id: "18112",
      name: "Xã Thạch Bình",
      DistrictId: "436",
    },
    {
      id: "18115",
      name: "Phường Bắc Hồng",
      DistrictId: "437",
    },
    {
      id: "18118",
      name: "Phường Nam Hồng",
      DistrictId: "437",
    },
    {
      id: "18121",
      name: "Phường Trung Lương",
      DistrictId: "437",
    },
    {
      id: "18124",
      name: "Phường Đức Thuận",
      DistrictId: "437",
    },
    {
      id: "18127",
      name: "Phường Đậu Liêu",
      DistrictId: "437",
    },
    {
      id: "18130",
      name: "Xã Thuận Lộc",
      DistrictId: "437",
    },
    {
      id: "18133",
      name: "Thị trấn Phố Châu",
      DistrictId: "439",
    },
    {
      id: "18136",
      name: "Thị trấn  Tây Sơn",
      DistrictId: "439",
    },
    {
      id: "18139",
      name: "Xã Sơn Hồng",
      DistrictId: "439",
    },
    {
      id: "18142",
      name: "Xã Sơn Tiến",
      DistrictId: "439",
    },
    {
      id: "18145",
      name: "Xã Sơn Lâm",
      DistrictId: "439",
    },
    {
      id: "18148",
      name: "Xã Sơn Lễ",
      DistrictId: "439",
    },
    {
      id: "18157",
      name: "Xã Sơn Giang",
      DistrictId: "439",
    },
    {
      id: "18160",
      name: "Xã Sơn Lĩnh",
      DistrictId: "439",
    },
    {
      id: "18163",
      name: "Xã An Hòa Thịnh",
      DistrictId: "439",
    },
    {
      id: "18172",
      name: "Xã Sơn Tây",
      DistrictId: "439",
    },
    {
      id: "18175",
      name: "Xã Sơn Ninh",
      DistrictId: "439",
    },
    {
      id: "18178",
      name: "Xã Sơn Châu",
      DistrictId: "439",
    },
    {
      id: "18181",
      name: "Xã Tân Mỹ Hà",
      DistrictId: "439",
    },
    {
      id: "18184",
      name: "Xã Quang Diệm",
      DistrictId: "439",
    },
    {
      id: "18187",
      name: "Xã Sơn Trung",
      DistrictId: "439",
    },
    {
      id: "18190",
      name: "Xã Sơn Bằng",
      DistrictId: "439",
    },
    {
      id: "18193",
      name: "Xã Sơn Bình",
      DistrictId: "439",
    },
    {
      id: "18196",
      name: "Xã Sơn Kim 1",
      DistrictId: "439",
    },
    {
      id: "18199",
      name: "Xã Sơn Kim 2",
      DistrictId: "439",
    },
    {
      id: "18202",
      name: "Xã Sơn Trà",
      DistrictId: "439",
    },
    {
      id: "18205",
      name: "Xã Sơn Long",
      DistrictId: "439",
    },
    {
      id: "18211",
      name: "Xã Kim Hoa",
      DistrictId: "439",
    },
    {
      id: "18214",
      name: "Xã Sơn Hàm",
      DistrictId: "439",
    },
    {
      id: "18217",
      name: "Xã Sơn Phú",
      DistrictId: "439",
    },
    {
      id: "18223",
      name: "Xã Sơn Trường",
      DistrictId: "439",
    },
    {
      id: "18229",
      name: "Thị trấn Đức Thọ",
      DistrictId: "440",
    },
    {
      id: "18235",
      name: "Xã Quang Vĩnh",
      DistrictId: "440",
    },
    {
      id: "18241",
      name: "Xã Tùng Châu",
      DistrictId: "440",
    },
    {
      id: "18244",
      name: "Xã Trường Sơn",
      DistrictId: "440",
    },
    {
      id: "18247",
      name: "Xã Liên Minh",
      DistrictId: "440",
    },
    {
      id: "18253",
      name: "Xã Yên Hồ",
      DistrictId: "440",
    },
    {
      id: "18259",
      name: "Xã Tùng Ảnh",
      DistrictId: "440",
    },
    {
      id: "18262",
      name: "Xã Bùi La Nhân",
      DistrictId: "440",
    },
    {
      id: "18274",
      name: "Xã Thanh Bình Thịnh",
      DistrictId: "440",
    },
    {
      id: "18277",
      name: "Xã Lâm Trung Thủy",
      DistrictId: "440",
    },
    {
      id: "18280",
      name: "Xã Hòa Lạc",
      DistrictId: "440",
    },
    {
      id: "18283",
      name: "Xã Tân Dân",
      DistrictId: "440",
    },
    {
      id: "18298",
      name: "Xã An Dũng",
      DistrictId: "440",
    },
    {
      id: "18304",
      name: "Xã Đức Đồng",
      DistrictId: "440",
    },
    {
      id: "18307",
      name: "Xã Đức Lạng",
      DistrictId: "440",
    },
    {
      id: "18310",
      name: "Xã Tân Hương",
      DistrictId: "440",
    },
    {
      id: "18313",
      name: "Thị trấn Vũ Quang",
      DistrictId: "441",
    },
    {
      id: "18316",
      name: "Xã Ân Phú",
      DistrictId: "441",
    },
    {
      id: "18319",
      name: "Xã Đức Giang",
      DistrictId: "441",
    },
    {
      id: "18322",
      name: "Xã Đức Lĩnh",
      DistrictId: "441",
    },
    {
      id: "18325",
      name: "Xã Thọ Điền",
      DistrictId: "441",
    },
    {
      id: "18328",
      name: "Xã Đức Hương",
      DistrictId: "441",
    },
    {
      id: "18331",
      name: "Xã Đức Bồng",
      DistrictId: "441",
    },
    {
      id: "18334",
      name: "Xã Đức Liên",
      DistrictId: "441",
    },
    {
      id: "18340",
      name: "Xã Hương Minh",
      DistrictId: "441",
    },
    {
      id: "18343",
      name: "Xã Quang Thọ",
      DistrictId: "441",
    },
    {
      id: "18352",
      name: "Thị trấn Xuân An",
      DistrictId: "442",
    },
    {
      id: "18355",
      name: "Xã Xuân Hội",
      DistrictId: "442",
    },
    {
      id: "18358",
      name: "Xã Đan Trường",
      DistrictId: "442",
    },
    {
      id: "18364",
      name: "Xã Xuân Phổ",
      DistrictId: "442",
    },
    {
      id: "18367",
      name: "Xã Xuân Hải",
      DistrictId: "442",
    },
    {
      id: "18370",
      name: "Xã Xuân Giang",
      DistrictId: "442",
    },
    {
      id: "18373",
      name: "Thị trấn Tiên Điền",
      DistrictId: "442",
    },
    {
      id: "18376",
      name: "Xã Xuân Yên",
      DistrictId: "442",
    },
    {
      id: "18379",
      name: "Xã Xuân Mỹ",
      DistrictId: "442",
    },
    {
      id: "18382",
      name: "Xã Xuân Thành",
      DistrictId: "442",
    },
    {
      id: "18385",
      name: "Xã Xuân Viên",
      DistrictId: "442",
    },
    {
      id: "18388",
      name: "Xã Xuân Hồng",
      DistrictId: "442",
    },
    {
      id: "18391",
      name: "Xã Cỗ Đạm",
      DistrictId: "442",
    },
    {
      id: "18394",
      name: "Xã Xuân Liên",
      DistrictId: "442",
    },
    {
      id: "18397",
      name: "Xã Xuân Lĩnh",
      DistrictId: "442",
    },
    {
      id: "18400",
      name: "Xã Xuân Lam",
      DistrictId: "442",
    },
    {
      id: "18403",
      name: "Xã Cương Gián",
      DistrictId: "442",
    },
    {
      id: "18406",
      name: "Thị trấn Nghèn",
      DistrictId: "443",
    },
    {
      id: "18409",
      name: "Xã Tân Lộc",
      DistrictId: "448",
    },
    {
      id: "18412",
      name: "Xã Hồng Lộc",
      DistrictId: "448",
    },
    {
      id: "18415",
      name: "Xã Thiên Lộc",
      DistrictId: "443",
    },
    {
      id: "18418",
      name: "Xã Thuần Thiện",
      DistrictId: "443",
    },
    {
      id: "18421",
      name: "Xã Thịnh Lộc",
      DistrictId: "448",
    },
    {
      id: "18427",
      name: "Xã Vượng Lộc",
      DistrictId: "443",
    },
    {
      id: "18430",
      name: "Xã Bình An",
      DistrictId: "448",
    },
    {
      id: "18433",
      name: "Xã Thanh Lộc",
      DistrictId: "443",
    },
    {
      id: "18436",
      name: "Xã Kim Song Trường",
      DistrictId: "443",
    },
    {
      id: "18439",
      name: "Xã Thường Nga",
      DistrictId: "443",
    },
    {
      id: "18445",
      name: "Xã Tùng Lộc",
      DistrictId: "443",
    },
    {
      id: "18454",
      name: "Xã Phú Lộc",
      DistrictId: "443",
    },
    {
      id: "18457",
      name: "Xã Ích Hậu",
      DistrictId: "448",
    },
    {
      id: "18463",
      name: "Xã Gia Hanh",
      DistrictId: "443",
    },
    {
      id: "18466",
      name: "Xã Khánh Vĩnh Yên",
      DistrictId: "443",
    },
    {
      id: "18472",
      name: "Xã Trung Lộc",
      DistrictId: "443",
    },
    {
      id: "18475",
      name: "Xã Xuân Lộc",
      DistrictId: "443",
    },
    {
      id: "18478",
      name: "Xã Thượng Lộc",
      DistrictId: "443",
    },
    {
      id: "18481",
      name: "Xã Quang Lộc",
      DistrictId: "443",
    },
    {
      id: "18484",
      name: "Thị trấn Đồng Lộc",
      DistrictId: "443",
    },
    {
      id: "18487",
      name: "Xã Mỹ Lộc",
      DistrictId: "443",
    },
    {
      id: "18490",
      name: "Xã Sơn Lộc",
      DistrictId: "443",
    },
    {
      id: "18493",
      name: "Xã Phù Lưu",
      DistrictId: "448",
    },
    {
      id: "18496",
      name: "Thị trấn Hương Khê",
      DistrictId: "444",
    },
    {
      id: "18499",
      name: "Xã Điền Mỹ",
      DistrictId: "444",
    },
    {
      id: "18502",
      name: "Xã Hà Linh",
      DistrictId: "444",
    },
    {
      id: "18505",
      name: "Xã Hương Thủy",
      DistrictId: "444",
    },
    {
      id: "18508",
      name: "Xã Hòa Hải",
      DistrictId: "444",
    },
    {
      id: "18514",
      name: "Xã Phúc Đồng",
      DistrictId: "444",
    },
    {
      id: "18517",
      name: "Xã Hương Giang",
      DistrictId: "444",
    },
    {
      id: "18520",
      name: "Xã Lộc Yên",
      DistrictId: "444",
    },
    {
      id: "18523",
      name: "Xã Hương Bình",
      DistrictId: "444",
    },
    {
      id: "18526",
      name: "Xã Hương Long",
      DistrictId: "444",
    },
    {
      id: "18529",
      name: "Xã Phú Gia",
      DistrictId: "444",
    },
    {
      id: "18532",
      name: "Xã Gia Phố",
      DistrictId: "444",
    },
    {
      id: "18535",
      name: "Xã Phú Phong",
      DistrictId: "444",
    },
    {
      id: "18538",
      name: "Xã Hương Đô",
      DistrictId: "444",
    },
    {
      id: "18541",
      name: "Xã Hương Vĩnh",
      DistrictId: "444",
    },
    {
      id: "18544",
      name: "Xã Hương Xuân",
      DistrictId: "444",
    },
    {
      id: "18547",
      name: "Xã Phúc Trạch",
      DistrictId: "444",
    },
    {
      id: "18550",
      name: "Xã Hương Trà",
      DistrictId: "444",
    },
    {
      id: "18553",
      name: "Xã Hương Trạch",
      DistrictId: "444",
    },
    {
      id: "18556",
      name: "Xã Hương Lâm",
      DistrictId: "444",
    },
    {
      id: "18559",
      name: "Xã Hương Liên",
      DistrictId: "444",
    },
    {
      id: "18562",
      name: "Thị trấn Thạch Hà",
      DistrictId: "445",
    },
    {
      id: "18565",
      name: "Xã Ngọc Sơn",
      DistrictId: "445",
    },
    {
      id: "18568",
      name: "Thị trấn Lộc Hà",
      DistrictId: "448",
    },
    {
      id: "18571",
      name: "Xã Thạch Hải",
      DistrictId: "445",
    },
    {
      id: "18577",
      name: "Xã Thạch Mỹ",
      DistrictId: "448",
    },
    {
      id: "18580",
      name: "Xã Thạch Kim",
      DistrictId: "448",
    },
    {
      id: "18583",
      name: "Xã Thạch Châu",
      DistrictId: "448",
    },
    {
      id: "18586",
      name: "Xã Thạch Kênh",
      DistrictId: "445",
    },
    {
      id: "18589",
      name: "Xã Thạch Sơn",
      DistrictId: "445",
    },
    {
      id: "18592",
      name: "Xã Thạch Liên",
      DistrictId: "445",
    },
    {
      id: "18595",
      name: "Xã Đỉnh Bàn",
      DistrictId: "445",
    },
    {
      id: "18598",
      name: "Xã Hộ Độ",
      DistrictId: "448",
    },
    {
      id: "18601",
      name: "Xã Việt Tiến",
      DistrictId: "445",
    },
    {
      id: "18604",
      name: "Xã Thạch Khê",
      DistrictId: "445",
    },
    {
      id: "18607",
      name: "Xã Thạch Long",
      DistrictId: "445",
    },
    {
      id: "18619",
      name: "Xã Thạch Trị",
      DistrictId: "445",
    },
    {
      id: "18622",
      name: "Xã Thạch Lạc",
      DistrictId: "445",
    },
    {
      id: "18625",
      name: "Xã Thạch Ngọc",
      DistrictId: "445",
    },
    {
      id: "18628",
      name: "Xã Tượng Sơn",
      DistrictId: "445",
    },
    {
      id: "18631",
      name: "Xã Thạch Văn",
      DistrictId: "445",
    },
    {
      id: "18634",
      name: "Xã Lưu Vĩnh Sơn",
      DistrictId: "445",
    },
    {
      id: "18637",
      name: "Xã Thạch Thắng",
      DistrictId: "445",
    },
    {
      id: "18643",
      name: "Xã Thạch Đài",
      DistrictId: "445",
    },
    {
      id: "18649",
      name: "Xã Thạch Hội",
      DistrictId: "445",
    },
    {
      id: "18652",
      name: "Xã Tân Lâm Hương",
      DistrictId: "445",
    },
    {
      id: "18658",
      name: "Xã Thạch Xuân",
      DistrictId: "445",
    },
    {
      id: "18667",
      name: "Xã Nam Điền",
      DistrictId: "445",
    },
    {
      id: "18670",
      name: "Xã Mai Phụ",
      DistrictId: "448",
    },
    {
      id: "18673",
      name: "Thị trấn Cẩm Xuyên",
      DistrictId: "446",
    },
    {
      id: "18676",
      name: "Thị trấn Thiên Cầm",
      DistrictId: "446",
    },
    {
      id: "18679",
      name: "Xã Yên Hòa",
      DistrictId: "446",
    },
    {
      id: "18682",
      name: "Xã Cẩm Dương",
      DistrictId: "446",
    },
    {
      id: "18685",
      name: "Xã Cẩm Bình",
      DistrictId: "446",
    },
    {
      id: "18691",
      name: "Xã Cẩm Vĩnh",
      DistrictId: "446",
    },
    {
      id: "18694",
      name: "Xã Cẩm Thành",
      DistrictId: "446",
    },
    {
      id: "18697",
      name: "Xã Cẩm Quang",
      DistrictId: "446",
    },
    {
      id: "18706",
      name: "Xã Cẩm Thạch",
      DistrictId: "446",
    },
    {
      id: "18709",
      name: "Xã Cẩm Nhượng",
      DistrictId: "446",
    },
    {
      id: "18712",
      name: "Xã Nam Phúc Thăng",
      DistrictId: "446",
    },
    {
      id: "18715",
      name: "Xã Cẩm Duệ",
      DistrictId: "446",
    },
    {
      id: "18721",
      name: "Xã Cẩm Lĩnh",
      DistrictId: "446",
    },
    {
      id: "18724",
      name: "Xã Cẩm Quan",
      DistrictId: "446",
    },
    {
      id: "18727",
      name: "Xã Cẩm Hà",
      DistrictId: "446",
    },
    {
      id: "18730",
      name: "Xã Cẩm Lộc",
      DistrictId: "446",
    },
    {
      id: "18733",
      name: "Xã Cẩm Hưng",
      DistrictId: "446",
    },
    {
      id: "18736",
      name: "Xã Cẩm Thịnh",
      DistrictId: "446",
    },
    {
      id: "18739",
      name: "Xã Cẩm Mỹ",
      DistrictId: "446",
    },
    {
      id: "18742",
      name: "Xã Cẩm Trung",
      DistrictId: "446",
    },
    {
      id: "18745",
      name: "Xã Cẩm Sơn",
      DistrictId: "446",
    },
    {
      id: "18748",
      name: "Xã Cẩm Lạc",
      DistrictId: "446",
    },
    {
      id: "18751",
      name: "Xã Cẩm Minh",
      DistrictId: "446",
    },
    {
      id: "18754",
      name: "Phường Hưng Trí",
      DistrictId: "449",
    },
    {
      id: "18757",
      name: "Xã Kỳ Xuân",
      DistrictId: "447",
    },
    {
      id: "18760",
      name: "Xã Kỳ Bắc",
      DistrictId: "447",
    },
    {
      id: "18763",
      name: "Xã Kỳ Phú",
      DistrictId: "447",
    },
    {
      id: "18766",
      name: "Xã Kỳ Phong",
      DistrictId: "447",
    },
    {
      id: "18769",
      name: "Xã Kỳ Tiến",
      DistrictId: "447",
    },
    {
      id: "18772",
      name: "Xã Kỳ Giang",
      DistrictId: "447",
    },
    {
      id: "18775",
      name: "Xã Kỳ Đồng",
      DistrictId: "447",
    },
    {
      id: "18778",
      name: "Xã Kỳ Khang",
      DistrictId: "447",
    },
    {
      id: "18781",
      name: "Xã Kỳ Ninh",
      DistrictId: "449",
    },
    {
      id: "18784",
      name: "Xã Kỳ Văn",
      DistrictId: "447",
    },
    {
      id: "18787",
      name: "Xã Kỳ Trung",
      DistrictId: "447",
    },
    {
      id: "18790",
      name: "Xã Kỳ Thọ",
      DistrictId: "447",
    },
    {
      id: "18793",
      name: "Xã Kỳ Tây",
      DistrictId: "447",
    },
    {
      id: "18796",
      name: "Xã Kỳ Lợi",
      DistrictId: "449",
    },
    {
      id: "18799",
      name: "Xã Kỳ Thượng",
      DistrictId: "447",
    },
    {
      id: "18802",
      name: "Xã Kỳ Hải",
      DistrictId: "447",
    },
    {
      id: "18805",
      name: "Xã Kỳ Thư",
      DistrictId: "447",
    },
    {
      id: "18808",
      name: "Xã Kỳ Hà",
      DistrictId: "449",
    },
    {
      id: "18811",
      name: "Xã Kỳ Châu",
      DistrictId: "447",
    },
    {
      id: "18814",
      name: "Xã Kỳ Tân",
      DistrictId: "447",
    },
    {
      id: "18820",
      name: "Phường Kỳ Trinh",
      DistrictId: "449",
    },
    {
      id: "18823",
      name: "Phường Kỳ Thịnh",
      DistrictId: "449",
    },
    {
      id: "18829",
      name: "Xã Kỳ Hoa",
      DistrictId: "449",
    },
    {
      id: "18832",
      name: "Phường Kỳ Phương",
      DistrictId: "449",
    },
    {
      id: "18835",
      name: "Phường Kỳ Long",
      DistrictId: "449",
    },
    {
      id: "18838",
      name: "Xã Lâm Hợp",
      DistrictId: "447",
    },
    {
      id: "18841",
      name: "Phường Kỳ Liên",
      DistrictId: "449",
    },
    {
      id: "18844",
      name: "Xã Kỳ Sơn",
      DistrictId: "447",
    },
    {
      id: "18847",
      name: "Xã Kỳ Nam",
      DistrictId: "449",
    },
    {
      id: "18850",
      name: "Xã Kỳ Lạc",
      DistrictId: "447",
    },
    {
      id: "18853",
      name: "Phường Hải Thành",
      DistrictId: "450",
    },
    {
      id: "18856",
      name: "Phường Đồng Phú",
      DistrictId: "450",
    },
    {
      id: "18859",
      name: "Phường Bắc Lý",
      DistrictId: "450",
    },
    {
      id: "18865",
      name: "Phường Nam Lý",
      DistrictId: "450",
    },
    {
      id: "18868",
      name: "Phường Đồng Hải",
      DistrictId: "450",
    },
    {
      id: "18871",
      name: "Phường Đồng Sơn",
      DistrictId: "450",
    },
    {
      id: "18874",
      name: "Phường Phú Hải",
      DistrictId: "450",
    },
    {
      id: "18877",
      name: "Phường Bắc Nghĩa",
      DistrictId: "450",
    },
    {
      id: "18880",
      name: "Phường Đức Ninh Đông",
      DistrictId: "450",
    },
    {
      id: "18883",
      name: "Xã Quang Phú",
      DistrictId: "450",
    },
    {
      id: "18886",
      name: "Xã Lộc Ninh",
      DistrictId: "450",
    },
    {
      id: "18889",
      name: "Xã Bảo Ninh",
      DistrictId: "450",
    },
    {
      id: "18892",
      name: "Xã Nghĩa Ninh",
      DistrictId: "450",
    },
    {
      id: "18895",
      name: "Xã Thuận Đức",
      DistrictId: "450",
    },
    {
      id: "18898",
      name: "Xã Đức Ninh",
      DistrictId: "450",
    },
    {
      id: "18901",
      name: "Thị trấn Quy Đạt",
      DistrictId: "452",
    },
    {
      id: "18904",
      name: "Xã Dân Hóa",
      DistrictId: "452",
    },
    {
      id: "18907",
      name: "Xã Trọng Hóa",
      DistrictId: "452",
    },
    {
      id: "18910",
      name: "Xã Hóa Phúc",
      DistrictId: "452",
    },
    {
      id: "18913",
      name: "Xã Hồng Hóa",
      DistrictId: "452",
    },
    {
      id: "18916",
      name: "Xã Hóa Thanh",
      DistrictId: "452",
    },
    {
      id: "18919",
      name: "Xã Hóa Tiến",
      DistrictId: "452",
    },
    {
      id: "18922",
      name: "Xã Hóa Hợp",
      DistrictId: "452",
    },
    {
      id: "18925",
      name: "Xã Xuân Hóa",
      DistrictId: "452",
    },
    {
      id: "18928",
      name: "Xã Yên Hóa",
      DistrictId: "452",
    },
    {
      id: "18931",
      name: "Xã Minh Hóa",
      DistrictId: "452",
    },
    {
      id: "18934",
      name: "Xã Tân Hóa",
      DistrictId: "452",
    },
    {
      id: "18937",
      name: "Xã Hóa Sơn",
      DistrictId: "452",
    },
    {
      id: "18943",
      name: "Xã Trung Hóa",
      DistrictId: "452",
    },
    {
      id: "18946",
      name: "Xã Thượng Hóa",
      DistrictId: "452",
    },
    {
      id: "18949",
      name: "Thị trấn Đồng Lê",
      DistrictId: "453",
    },
    {
      id: "18952",
      name: "Xã Hương Hóa",
      DistrictId: "453",
    },
    {
      id: "18955",
      name: "Xã Kim Hóa",
      DistrictId: "453",
    },
    {
      id: "18958",
      name: "Xã Thanh Hóa",
      DistrictId: "453",
    },
    {
      id: "18961",
      name: "Xã Thanh Thạch",
      DistrictId: "453",
    },
    {
      id: "18964",
      name: "Xã Thuận Hóa",
      DistrictId: "453",
    },
    {
      id: "18967",
      name: "Xã Lâm Hóa",
      DistrictId: "453",
    },
    {
      id: "18970",
      name: "Xã Lê Hóa",
      DistrictId: "453",
    },
    {
      id: "18973",
      name: "Xã Sơn Hóa",
      DistrictId: "453",
    },
    {
      id: "18976",
      name: "Xã Đồng Hóa",
      DistrictId: "453",
    },
    {
      id: "18979",
      name: "Xã Ngư Hóa",
      DistrictId: "453",
    },
    {
      id: "18985",
      name: "Xã Thạch Hóa",
      DistrictId: "453",
    },
    {
      id: "18988",
      name: "Xã Đức Hóa",
      DistrictId: "453",
    },
    {
      id: "18991",
      name: "Xã Phong Hóa",
      DistrictId: "453",
    },
    {
      id: "18994",
      name: "Xã Mai Hóa",
      DistrictId: "453",
    },
    {
      id: "18997",
      name: "Xã Tiến Hóa",
      DistrictId: "453",
    },
    {
      id: "19000",
      name: "Xã Châu Hóa",
      DistrictId: "453",
    },
    {
      id: "19003",
      name: "Xã Cao Quảng",
      DistrictId: "453",
    },
    {
      id: "19006",
      name: "Xã Văn Hóa",
      DistrictId: "453",
    },
    {
      id: "19009",
      name: "Phường Ba Đồn",
      DistrictId: "458",
    },
    {
      id: "19012",
      name: "Xã Quảng Hợp",
      DistrictId: "454",
    },
    {
      id: "19015",
      name: "Xã Quảng Kim",
      DistrictId: "454",
    },
    {
      id: "19018",
      name: "Xã Quảng Đông",
      DistrictId: "454",
    },
    {
      id: "19021",
      name: "Xã Quảng Phú",
      DistrictId: "454",
    },
    {
      id: "19024",
      name: "Xã Quảng Châu",
      DistrictId: "454",
    },
    {
      id: "19027",
      name: "Xã Quảng Thạch",
      DistrictId: "454",
    },
    {
      id: "19030",
      name: "Xã Quảng Lưu",
      DistrictId: "454",
    },
    {
      id: "19033",
      name: "Xã Quảng Tùng",
      DistrictId: "454",
    },
    {
      id: "19036",
      name: "Xã Cảnh Dương",
      DistrictId: "454",
    },
    {
      id: "19039",
      name: "Xã Quảng Tiến",
      DistrictId: "454",
    },
    {
      id: "19042",
      name: "Xã Quảng Hưng",
      DistrictId: "454",
    },
    {
      id: "19045",
      name: "Xã Quảng Xuân",
      DistrictId: "454",
    },
    {
      id: "19048",
      name: "Xã Cảnh Hóa",
      DistrictId: "454",
    },
    {
      id: "19051",
      name: "Xã Liên Trường",
      DistrictId: "454",
    },
    {
      id: "19057",
      name: "Xã Quảng Phương",
      DistrictId: "454",
    },
    {
      id: "19060",
      name: "Phường Quảng Long",
      DistrictId: "458",
    },
    {
      id: "19063",
      name: "Xã Phù Hóa",
      DistrictId: "454",
    },
    {
      id: "19066",
      name: "Phường Quảng Thọ",
      DistrictId: "458",
    },
    {
      id: "19069",
      name: "Xã Quảng Tiên",
      DistrictId: "458",
    },
    {
      id: "19072",
      name: "Xã Quảng Thanh",
      DistrictId: "454",
    },
    {
      id: "19075",
      name: "Xã Quảng Trung",
      DistrictId: "458",
    },
    {
      id: "19078",
      name: "Phường Quảng Phong",
      DistrictId: "458",
    },
    {
      id: "19081",
      name: "Phường Quảng Thuận",
      DistrictId: "458",
    },
    {
      id: "19084",
      name: "Xã Quảng Tân",
      DistrictId: "458",
    },
    {
      id: "19087",
      name: "Xã Quảng Hải",
      DistrictId: "458",
    },
    {
      id: "19090",
      name: "Xã Quảng Sơn",
      DistrictId: "458",
    },
    {
      id: "19093",
      name: "Xã Quảng Lộc",
      DistrictId: "458",
    },
    {
      id: "19096",
      name: "Xã Quảng Thủy",
      DistrictId: "458",
    },
    {
      id: "19099",
      name: "Xã Quảng Văn",
      DistrictId: "458",
    },
    {
      id: "19102",
      name: "Phường Quảng Phúc",
      DistrictId: "458",
    },
    {
      id: "19105",
      name: "Xã Quảng Hòa",
      DistrictId: "458",
    },
    {
      id: "19108",
      name: "Xã Quảng Minh",
      DistrictId: "458",
    },
    {
      id: "19111",
      name: "Thị trấn Hoàn Lão",
      DistrictId: "455",
    },
    {
      id: "19114",
      name: "Thị trấn NT Việt Trung",
      DistrictId: "455",
    },
    {
      id: "19117",
      name: "Xã Xuân Trạch",
      DistrictId: "455",
    },
    {
      id: "19120",
      name: "Xã Mỹ Trạch",
      DistrictId: "455",
    },
    {
      id: "19123",
      name: "Xã Hạ Trạch",
      DistrictId: "455",
    },
    {
      id: "19126",
      name: "Xã Bắc Trạch",
      DistrictId: "455",
    },
    {
      id: "19129",
      name: "Xã Lâm Trạch",
      DistrictId: "455",
    },
    {
      id: "19132",
      name: "Xã Thanh Trạch",
      DistrictId: "455",
    },
    {
      id: "19135",
      name: "Xã Liên Trạch",
      DistrictId: "455",
    },
    {
      id: "19138",
      name: "Xã Phúc Trạch",
      DistrictId: "455",
    },
    {
      id: "19141",
      name: "Xã Cự Nẫm",
      DistrictId: "455",
    },
    {
      id: "19144",
      name: "Xã Hải Phú",
      DistrictId: "455",
    },
    {
      id: "19147",
      name: "Xã Thượng Trạch",
      DistrictId: "455",
    },
    {
      id: "19150",
      name: "Xã Sơn Lộc",
      DistrictId: "455",
    },
    {
      id: "19156",
      name: "Xã Hưng Trạch",
      DistrictId: "455",
    },
    {
      id: "19159",
      name: "Xã Đồng Trạch",
      DistrictId: "455",
    },
    {
      id: "19162",
      name: "Xã Đức Trạch",
      DistrictId: "455",
    },
    {
      id: "19165",
      name: "Thị trấn Phong Nha",
      DistrictId: "455",
    },
    {
      id: "19168",
      name: "Xã Vạn Trạch",
      DistrictId: "455",
    },
    {
      id: "19174",
      name: "Xã Phú Định",
      DistrictId: "455",
    },
    {
      id: "19177",
      name: "Xã Trung Trạch",
      DistrictId: "455",
    },
    {
      id: "19180",
      name: "Xã Tây Trạch",
      DistrictId: "455",
    },
    {
      id: "19183",
      name: "Xã Hòa Trạch",
      DistrictId: "455",
    },
    {
      id: "19186",
      name: "Xã Đại Trạch",
      DistrictId: "455",
    },
    {
      id: "19189",
      name: "Xã Nhân Trạch",
      DistrictId: "455",
    },
    {
      id: "19192",
      name: "Xã Tân Trạch",
      DistrictId: "455",
    },
    {
      id: "19195",
      name: "Xã Nam Trạch",
      DistrictId: "455",
    },
    {
      id: "19198",
      name: "Xã Lý Trạch",
      DistrictId: "455",
    },
    {
      id: "19201",
      name: "Thị trấn Quán Hàu",
      DistrictId: "456",
    },
    {
      id: "19204",
      name: "Xã Trường Sơn",
      DistrictId: "456",
    },
    {
      id: "19207",
      name: "Xã Lương Ninh",
      DistrictId: "456",
    },
    {
      id: "19210",
      name: "Xã Vĩnh Ninh",
      DistrictId: "456",
    },
    {
      id: "19213",
      name: "Xã Võ Ninh",
      DistrictId: "456",
    },
    {
      id: "19216",
      name: "Xã Hải Ninh",
      DistrictId: "456",
    },
    {
      id: "19219",
      name: "Xã Hàm Ninh",
      DistrictId: "456",
    },
    {
      id: "19222",
      name: "Xã Duy Ninh",
      DistrictId: "456",
    },
    {
      id: "19225",
      name: "Xã Gia Ninh",
      DistrictId: "456",
    },
    {
      id: "19228",
      name: "Xã Trường Xuân",
      DistrictId: "456",
    },
    {
      id: "19231",
      name: "Xã Hiền Ninh",
      DistrictId: "456",
    },
    {
      id: "19234",
      name: "Xã Tân Ninh",
      DistrictId: "456",
    },
    {
      id: "19237",
      name: "Xã Xuân Ninh",
      DistrictId: "456",
    },
    {
      id: "19240",
      name: "Xã An Ninh",
      DistrictId: "456",
    },
    {
      id: "19243",
      name: "Xã Vạn Ninh",
      DistrictId: "456",
    },
    {
      id: "19246",
      name: "Thị trấn NT Lệ Ninh",
      DistrictId: "457",
    },
    {
      id: "19249",
      name: "Thị trấn Kiến Giang",
      DistrictId: "457",
    },
    {
      id: "19252",
      name: "Xã Hồng Thủy",
      DistrictId: "457",
    },
    {
      id: "19255",
      name: "Xã Ngư Thủy Bắc",
      DistrictId: "457",
    },
    {
      id: "19258",
      name: "Xã Hoa Thủy",
      DistrictId: "457",
    },
    {
      id: "19261",
      name: "Xã Thanh Thủy",
      DistrictId: "457",
    },
    {
      id: "19264",
      name: "Xã An Thủy",
      DistrictId: "457",
    },
    {
      id: "19267",
      name: "Xã Phong Thủy",
      DistrictId: "457",
    },
    {
      id: "19270",
      name: "Xã Cam Thủy",
      DistrictId: "457",
    },
    {
      id: "19273",
      name: "Xã Ngân Thủy",
      DistrictId: "457",
    },
    {
      id: "19276",
      name: "Xã Sơn Thủy",
      DistrictId: "457",
    },
    {
      id: "19279",
      name: "Xã Lộc Thủy",
      DistrictId: "457",
    },
    {
      id: "19285",
      name: "Xã Liên Thủy",
      DistrictId: "457",
    },
    {
      id: "19288",
      name: "Xã Hưng Thủy",
      DistrictId: "457",
    },
    {
      id: "19291",
      name: "Xã Dương Thủy",
      DistrictId: "457",
    },
    {
      id: "19294",
      name: "Xã Tân Thủy",
      DistrictId: "457",
    },
    {
      id: "19297",
      name: "Xã Phú Thủy",
      DistrictId: "457",
    },
    {
      id: "19300",
      name: "Xã Xuân Thủy",
      DistrictId: "457",
    },
    {
      id: "19303",
      name: "Xã Mỹ Thủy",
      DistrictId: "457",
    },
    {
      id: "19306",
      name: "Xã Ngư Thủy ",
      DistrictId: "457",
    },
    {
      id: "19309",
      name: "Xã Mai Thủy",
      DistrictId: "457",
    },
    {
      id: "19312",
      name: "Xã Sen Thủy",
      DistrictId: "457",
    },
    {
      id: "19315",
      name: "Xã Thái Thủy",
      DistrictId: "457",
    },
    {
      id: "19318",
      name: "Xã Kim Thủy",
      DistrictId: "457",
    },
    {
      id: "19321",
      name: "Xã Trường Thủy",
      DistrictId: "457",
    },
    {
      id: "19327",
      name: "Xã Lâm Thủy",
      DistrictId: "457",
    },
    {
      id: "19330",
      name: "Phường Đông Giang",
      DistrictId: "461",
    },
    {
      id: "19333",
      name: "Phường 1",
      DistrictId: "461",
    },
    {
      id: "19336",
      name: "Phường Đông Lễ",
      DistrictId: "461",
    },
    {
      id: "19339",
      name: "Phường Đông Thanh",
      DistrictId: "461",
    },
    {
      id: "19342",
      name: "Phường 2",
      DistrictId: "461",
    },
    {
      id: "19345",
      name: "Phường 4",
      DistrictId: "461",
    },
    {
      id: "19348",
      name: "Phường 5",
      DistrictId: "461",
    },
    {
      id: "19351",
      name: "Phường Đông Lương",
      DistrictId: "461",
    },
    {
      id: "19354",
      name: "Phường 3",
      DistrictId: "461",
    },
    {
      id: "19357",
      name: "Phường 1",
      DistrictId: "462",
    },
    {
      id: "19358",
      name: "Phường An Đôn",
      DistrictId: "462",
    },
    {
      id: "19360",
      name: "Phường 2",
      DistrictId: "462",
    },
    {
      id: "19361",
      name: "Phường 3",
      DistrictId: "462",
    },
    {
      id: "19363",
      name: "Thị trấn Hồ Xá",
      DistrictId: "464",
    },
    {
      id: "19366",
      name: "Thị trấn Bến Quan",
      DistrictId: "464",
    },
    {
      id: "19369",
      name: "Xã Vĩnh Thái",
      DistrictId: "464",
    },
    {
      id: "19372",
      name: "Xã Vĩnh Tú",
      DistrictId: "464",
    },
    {
      id: "19375",
      name: "Xã Vĩnh Chấp",
      DistrictId: "464",
    },
    {
      id: "19378",
      name: "Xã Trung Nam",
      DistrictId: "464",
    },
    {
      id: "19384",
      name: "Xã Kim Thạch",
      DistrictId: "464",
    },
    {
      id: "19387",
      name: "Xã Vĩnh Long",
      DistrictId: "464",
    },
    {
      id: "19393",
      name: "Xã Vĩnh Khê",
      DistrictId: "464",
    },
    {
      id: "19396",
      name: "Xã Vĩnh Hòa",
      DistrictId: "464",
    },
    {
      id: "19402",
      name: "Xã Vĩnh Thủy",
      DistrictId: "464",
    },
    {
      id: "19405",
      name: "Xã Vĩnh Lâm",
      DistrictId: "464",
    },
    {
      id: "19408",
      name: "Xã Hiền Thành",
      DistrictId: "464",
    },
    {
      id: "19414",
      name: "Thị trấn Cửa Tùng",
      DistrictId: "464",
    },
    {
      id: "19417",
      name: "Xã Vĩnh Hà",
      DistrictId: "464",
    },
    {
      id: "19420",
      name: "Xã Vĩnh Sơn",
      DistrictId: "464",
    },
    {
      id: "19423",
      name: "Xã Vĩnh Giang",
      DistrictId: "464",
    },
    {
      id: "19426",
      name: "Xã Vĩnh Ô",
      DistrictId: "464",
    },
    {
      id: "19429",
      name: "Thị trấn Khe Sanh",
      DistrictId: "465",
    },
    {
      id: "19432",
      name: "Thị trấn Lao Bảo",
      DistrictId: "465",
    },
    {
      id: "19435",
      name: "Xã Hướng Lập",
      DistrictId: "465",
    },
    {
      id: "19438",
      name: "Xã Hướng Việt",
      DistrictId: "465",
    },
    {
      id: "19441",
      name: "Xã Hướng Phùng",
      DistrictId: "465",
    },
    {
      id: "19444",
      name: "Xã Hướng Sơn",
      DistrictId: "465",
    },
    {
      id: "19447",
      name: "Xã Hướng Linh",
      DistrictId: "465",
    },
    {
      id: "19450",
      name: "Xã Tân Hợp",
      DistrictId: "465",
    },
    {
      id: "19453",
      name: "Xã Hướng Tân",
      DistrictId: "465",
    },
    {
      id: "19456",
      name: "Xã Tân Thành",
      DistrictId: "465",
    },
    {
      id: "19459",
      name: "Xã Tân Long",
      DistrictId: "465",
    },
    {
      id: "19462",
      name: "Xã Tân Lập",
      DistrictId: "465",
    },
    {
      id: "19465",
      name: "Xã Tân Liên",
      DistrictId: "465",
    },
    {
      id: "19468",
      name: "Xã Húc",
      DistrictId: "465",
    },
    {
      id: "19471",
      name: "Xã Thuận",
      DistrictId: "465",
    },
    {
      id: "19474",
      name: "Xã Hướng Lộc",
      DistrictId: "465",
    },
    {
      id: "19477",
      name: "Xã Ba Tầng",
      DistrictId: "465",
    },
    {
      id: "19480",
      name: "Xã Thanh",
      DistrictId: "465",
    },
    {
      id: "19483",
      name: "Xã  A Dơi",
      DistrictId: "465",
    },
    {
      id: "19489",
      name: "Xã Lìa",
      DistrictId: "465",
    },
    {
      id: "19492",
      name: "Xã Xy",
      DistrictId: "465",
    },
    {
      id: "19495",
      name: "Thị trấn Gio Linh",
      DistrictId: "466",
    },
    {
      id: "19496",
      name: "Thị trấn Cửa Việt",
      DistrictId: "466",
    },
    {
      id: "19498",
      name: "Xã Trung Giang",
      DistrictId: "466",
    },
    {
      id: "19501",
      name: "Xã Trung Hải",
      DistrictId: "466",
    },
    {
      id: "19504",
      name: "Xã Trung Sơn",
      DistrictId: "466",
    },
    {
      id: "19507",
      name: "Xã Phong Bình",
      DistrictId: "466",
    },
    {
      id: "19510",
      name: "Xã Gio Mỹ",
      DistrictId: "466",
    },
    {
      id: "19519",
      name: "Xã Gio Hải",
      DistrictId: "466",
    },
    {
      id: "19522",
      name: "Xã Gio An",
      DistrictId: "466",
    },
    {
      id: "19525",
      name: "Xã Gio Châu",
      DistrictId: "466",
    },
    {
      id: "19531",
      name: "Xã Gio Việt",
      DistrictId: "466",
    },
    {
      id: "19534",
      name: "Xã Linh Trường",
      DistrictId: "466",
    },
    {
      id: "19537",
      name: "Xã Gio Sơn",
      DistrictId: "466",
    },
    {
      id: "19543",
      name: "Xã Gio Mai",
      DistrictId: "466",
    },
    {
      id: "19546",
      name: "Xã Hải Thái",
      DistrictId: "466",
    },
    {
      id: "19549",
      name: "Xã Linh Hải",
      DistrictId: "466",
    },
    {
      id: "19552",
      name: "Xã Gio Quang",
      DistrictId: "466",
    },
    {
      id: "19555",
      name: "Thị trấn Krông Klang",
      DistrictId: "467",
    },
    {
      id: "19558",
      name: "Xã Mò Ó",
      DistrictId: "467",
    },
    {
      id: "19561",
      name: "Xã Hướng Hiệp",
      DistrictId: "467",
    },
    {
      id: "19564",
      name: "Xã Đa Krông",
      DistrictId: "467",
    },
    {
      id: "19567",
      name: "Xã Triệu Nguyên",
      DistrictId: "467",
    },
    {
      id: "19570",
      name: "Xã Ba Lòng",
      DistrictId: "467",
    },
    {
      id: "19576",
      name: "Xã Ba Nang",
      DistrictId: "467",
    },
    {
      id: "19579",
      name: "Xã Tà Long",
      DistrictId: "467",
    },
    {
      id: "19582",
      name: "Xã Húc Nghì",
      DistrictId: "467",
    },
    {
      id: "19585",
      name: "Xã A Vao",
      DistrictId: "467",
    },
    {
      id: "19588",
      name: "Xã Tà Rụt",
      DistrictId: "467",
    },
    {
      id: "19591",
      name: "Xã A Bung",
      DistrictId: "467",
    },
    {
      id: "19594",
      name: "Xã A Ngo",
      DistrictId: "467",
    },
    {
      id: "19597",
      name: "Thị trấn Cam Lộ",
      DistrictId: "468",
    },
    {
      id: "19600",
      name: "Xã Cam Tuyền",
      DistrictId: "468",
    },
    {
      id: "19603",
      name: "Xã Thanh An",
      DistrictId: "468",
    },
    {
      id: "19606",
      name: "Xã Cam Thủy",
      DistrictId: "468",
    },
    {
      id: "19612",
      name: "Xã Cam Thành",
      DistrictId: "468",
    },
    {
      id: "19615",
      name: "Xã Cam Hiếu",
      DistrictId: "468",
    },
    {
      id: "19618",
      name: "Xã Cam Chính",
      DistrictId: "468",
    },
    {
      id: "19621",
      name: "Xã Cam Nghĩa",
      DistrictId: "468",
    },
    {
      id: "19624",
      name: "Thị Trấn Ái Tử",
      DistrictId: "469",
    },
    {
      id: "19627",
      name: "Xã Triệu An",
      DistrictId: "469",
    },
    {
      id: "19630",
      name: "Xã Triệu Vân",
      DistrictId: "469",
    },
    {
      id: "19633",
      name: "Xã Triệu Phước",
      DistrictId: "469",
    },
    {
      id: "19636",
      name: "Xã Triệu Độ",
      DistrictId: "469",
    },
    {
      id: "19639",
      name: "Xã Triệu Trạch",
      DistrictId: "469",
    },
    {
      id: "19642",
      name: "Xã Triệu Thuận",
      DistrictId: "469",
    },
    {
      id: "19645",
      name: "Xã Triệu Đại",
      DistrictId: "469",
    },
    {
      id: "19648",
      name: "Xã Triệu Hòa",
      DistrictId: "469",
    },
    {
      id: "19651",
      name: "Xã Triệu Lăng",
      DistrictId: "469",
    },
    {
      id: "19654",
      name: "Xã Triệu Sơn",
      DistrictId: "469",
    },
    {
      id: "19657",
      name: "Xã Triệu Long",
      DistrictId: "469",
    },
    {
      id: "19660",
      name: "Xã Triệu Tài",
      DistrictId: "469",
    },
    {
      id: "19666",
      name: "Xã Triệu Trung",
      DistrictId: "469",
    },
    {
      id: "19669",
      name: "Xã Triệu Ái",
      DistrictId: "469",
    },
    {
      id: "19672",
      name: "Xã Triệu Thượng",
      DistrictId: "469",
    },
    {
      id: "19675",
      name: "Xã Triệu Giang",
      DistrictId: "469",
    },
    {
      id: "19678",
      name: "Xã Triệu Thành",
      DistrictId: "469",
    },
    {
      id: "19681",
      name: "Thị trấn Diên Sanh",
      DistrictId: "470",
    },
    {
      id: "19684",
      name: "Xã Hải An",
      DistrictId: "470",
    },
    {
      id: "19687",
      name: "Xã Hải Ba",
      DistrictId: "470",
    },
    {
      id: "19693",
      name: "Xã Hải Quy",
      DistrictId: "470",
    },
    {
      id: "19696",
      name: "Xã Hải Quế",
      DistrictId: "470",
    },
    {
      id: "19699",
      name: "Xã Hải Hưng",
      DistrictId: "470",
    },
    {
      id: "19702",
      name: "Xã Hải Phú",
      DistrictId: "470",
    },
    {
      id: "19705",
      name: "Xã Hải Lệ",
      DistrictId: "462",
    },
    {
      id: "19708",
      name: "Xã Hải Thượng",
      DistrictId: "470",
    },
    {
      id: "19711",
      name: "Xã Hải Dương",
      DistrictId: "470",
    },
    {
      id: "19714",
      name: "Xã Hải Định",
      DistrictId: "470",
    },
    {
      id: "19717",
      name: "Xã Hải Lâm",
      DistrictId: "470",
    },
    {
      id: "19726",
      name: "Xã Hải Phong",
      DistrictId: "470",
    },
    {
      id: "19729",
      name: "Xã Hải Trường",
      DistrictId: "470",
    },
    {
      id: "19735",
      name: "Xã Hải Sơn",
      DistrictId: "470",
    },
    {
      id: "19738",
      name: "Xã Hải Chánh",
      DistrictId: "470",
    },
    {
      id: "19741",
      name: "Xã Hải Khê",
      DistrictId: "470",
    },
    {
      id: "19750",
      name: "Phường Tây Lộc",
      DistrictId: "474",
    },
    {
      id: "19753",
      name: "Phường Thuận Lộc",
      DistrictId: "474",
    },
    {
      id: "19756",
      name: "Phường Gia Hội",
      DistrictId: "474",
    },
    {
      id: "19759",
      name: "Phường Phú Hậu",
      DistrictId: "474",
    },
    {
      id: "19762",
      name: "Phường Thuận Hòa",
      DistrictId: "474",
    },
    {
      id: "19768",
      name: "Phường Đông Ba",
      DistrictId: "474",
    },
    {
      id: "19774",
      name: "Phường Kim Long",
      DistrictId: "474",
    },
    {
      id: "19777",
      name: "Phường Vỹ Dạ",
      DistrictId: "474",
    },
    {
      id: "19780",
      name: "Phường Phường Đúc",
      DistrictId: "474",
    },
    {
      id: "19783",
      name: "Phường Vĩnh Ninh",
      DistrictId: "474",
    },
    {
      id: "19786",
      name: "Phường Phú Hội",
      DistrictId: "474",
    },
    {
      id: "19789",
      name: "Phường Phú Nhuận",
      DistrictId: "474",
    },
    {
      id: "19792",
      name: "Phường Xuân Phú",
      DistrictId: "474",
    },
    {
      id: "19795",
      name: "Phường Trường An",
      DistrictId: "474",
    },
    {
      id: "19798",
      name: "Phường Phước Vĩnh",
      DistrictId: "474",
    },
    {
      id: "19801",
      name: "Phường An Cựu",
      DistrictId: "474",
    },
    {
      id: "19803",
      name: "Phường An Hòa",
      DistrictId: "474",
    },
    {
      id: "19804",
      name: "Phường Hương Sơ",
      DistrictId: "474",
    },
    {
      id: "19807",
      name: "Phường Thuỷ Biều",
      DistrictId: "474",
    },
    {
      id: "19810",
      name: "Phường Hương Long",
      DistrictId: "474",
    },
    {
      id: "19813",
      name: "Phường Thuỷ Xuân",
      DistrictId: "474",
    },
    {
      id: "19815",
      name: "Phường An Đông",
      DistrictId: "474",
    },
    {
      id: "19816",
      name: "Phường An Tây",
      DistrictId: "474",
    },
    {
      id: "19819",
      name: "Thị trấn Phong Điền",
      DistrictId: "476",
    },
    {
      id: "19822",
      name: "Xã Điền Hương",
      DistrictId: "476",
    },
    {
      id: "19825",
      name: "Xã Điền Môn",
      DistrictId: "476",
    },
    {
      id: "19828",
      name: "Xã Điền Lộc",
      DistrictId: "476",
    },
    {
      id: "19831",
      name: "Xã Phong Bình",
      DistrictId: "476",
    },
    {
      id: "19834",
      name: "Xã Điền Hòa",
      DistrictId: "476",
    },
    {
      id: "19837",
      name: "Xã Phong Chương",
      DistrictId: "476",
    },
    {
      id: "19840",
      name: "Xã Phong Hải",
      DistrictId: "476",
    },
    {
      id: "19843",
      name: "Xã Điền Hải",
      DistrictId: "476",
    },
    {
      id: "19846",
      name: "Xã Phong Hòa",
      DistrictId: "476",
    },
    {
      id: "19849",
      name: "Xã Phong Thu",
      DistrictId: "476",
    },
    {
      id: "19852",
      name: "Xã Phong Hiền",
      DistrictId: "476",
    },
    {
      id: "19855",
      name: "Xã Phong Mỹ",
      DistrictId: "476",
    },
    {
      id: "19858",
      name: "Xã Phong An",
      DistrictId: "476",
    },
    {
      id: "19861",
      name: "Xã Phong Xuân",
      DistrictId: "476",
    },
    {
      id: "19864",
      name: "Xã Phong Sơn",
      DistrictId: "476",
    },
    {
      id: "19867",
      name: "Thị trấn Sịa",
      DistrictId: "477",
    },
    {
      id: "19870",
      name: "Xã Quảng Thái",
      DistrictId: "477",
    },
    {
      id: "19873",
      name: "Xã Quảng Ngạn",
      DistrictId: "477",
    },
    {
      id: "19876",
      name: "Xã Quảng Lợi",
      DistrictId: "477",
    },
    {
      id: "19879",
      name: "Xã Quảng Công",
      DistrictId: "477",
    },
    {
      id: "19882",
      name: "Xã Quảng Phước",
      DistrictId: "477",
    },
    {
      id: "19885",
      name: "Xã Quảng Vinh",
      DistrictId: "477",
    },
    {
      id: "19888",
      name: "Xã Quảng An",
      DistrictId: "477",
    },
    {
      id: "19891",
      name: "Xã Quảng Thành",
      DistrictId: "477",
    },
    {
      id: "19894",
      name: "Xã Quảng Thọ",
      DistrictId: "477",
    },
    {
      id: "19897",
      name: "Xã Quảng Phú",
      DistrictId: "477",
    },
    {
      id: "19900",
      name: "Phường Thuận An",
      DistrictId: "474",
    },
    {
      id: "19903",
      name: "Xã Phú Thuận",
      DistrictId: "478",
    },
    {
      id: "19906",
      name: "Xã Phú Dương",
      DistrictId: "474",
    },
    {
      id: "19909",
      name: "Xã Phú Mậu",
      DistrictId: "474",
    },
    {
      id: "19912",
      name: "Xã Phú An",
      DistrictId: "478",
    },
    {
      id: "19915",
      name: "Xã Phú Hải",
      DistrictId: "478",
    },
    {
      id: "19918",
      name: "Xã Phú Xuân",
      DistrictId: "478",
    },
    {
      id: "19921",
      name: "Xã Phú Diên",
      DistrictId: "478",
    },
    {
      id: "19924",
      name: "Xã Phú Thanh",
      DistrictId: "474",
    },
    {
      id: "19927",
      name: "Xã Phú Mỹ",
      DistrictId: "478",
    },
    {
      id: "19930",
      name: "Phường Phú Thượng",
      DistrictId: "474",
    },
    {
      id: "19933",
      name: "Xã Phú Hồ",
      DistrictId: "478",
    },
    {
      id: "19936",
      name: "Xã Vinh Xuân",
      DistrictId: "478",
    },
    {
      id: "19939",
      name: "Xã Phú Lương",
      DistrictId: "478",
    },
    {
      id: "19942",
      name: "Thị trấn Phú Đa",
      DistrictId: "478",
    },
    {
      id: "19945",
      name: "Xã Vinh Thanh",
      DistrictId: "478",
    },
    {
      id: "19948",
      name: "Xã Vinh An",
      DistrictId: "478",
    },
    {
      id: "19954",
      name: "Xã Phú Gia",
      DistrictId: "478",
    },
    {
      id: "19957",
      name: "Xã Vinh Hà",
      DistrictId: "478",
    },
    {
      id: "19960",
      name: "Phường Phú Bài",
      DistrictId: "479",
    },
    {
      id: "19963",
      name: "Phường Thủy Vân",
      DistrictId: "474",
    },
    {
      id: "19966",
      name: "Xã Thủy Thanh",
      DistrictId: "479",
    },
    {
      id: "19969",
      name: "Phường Thủy Dương",
      DistrictId: "479",
    },
    {
      id: "19972",
      name: "Phường Thủy Phương",
      DistrictId: "479",
    },
    {
      id: "19975",
      name: "Phường Thủy Châu",
      DistrictId: "479",
    },
    {
      id: "19978",
      name: "Phường Thủy Lương",
      DistrictId: "479",
    },
    {
      id: "19981",
      name: "Xã Thủy Bằng",
      DistrictId: "474",
    },
    {
      id: "19984",
      name: "Xã Thủy Tân",
      DistrictId: "479",
    },
    {
      id: "19987",
      name: "Xã Thủy Phù",
      DistrictId: "479",
    },
    {
      id: "19990",
      name: "Xã Phú Sơn",
      DistrictId: "479",
    },
    {
      id: "19993",
      name: "Xã Dương Hòa",
      DistrictId: "479",
    },
    {
      id: "19996",
      name: "Phường Tứ Hạ",
      DistrictId: "480",
    },
    {
      id: "19999",
      name: "Xã Hải Dương",
      DistrictId: "474",
    },
    {
      id: "20002",
      name: "Xã Hương Phong",
      DistrictId: "474",
    },
    {
      id: "20005",
      name: "Xã Hương Toàn",
      DistrictId: "480",
    },
    {
      id: "20008",
      name: "Phường Hương Vân",
      DistrictId: "480",
    },
    {
      id: "20011",
      name: "Phường Hương Văn",
      DistrictId: "480",
    },
    {
      id: "20014",
      name: "Phường Hương Vinh",
      DistrictId: "474",
    },
    {
      id: "20017",
      name: "Phường Hương Xuân",
      DistrictId: "480",
    },
    {
      id: "20020",
      name: "Phường Hương Chữ",
      DistrictId: "480",
    },
    {
      id: "20023",
      name: "Phường Hương An",
      DistrictId: "474",
    },
    {
      id: "20026",
      name: "Xã Hương Bình",
      DistrictId: "480",
    },
    {
      id: "20029",
      name: "Phường Hương Hồ",
      DistrictId: "474",
    },
    {
      id: "20032",
      name: "Xã Hương Thọ",
      DistrictId: "474",
    },
    {
      id: "20035",
      name: "Xã Bình Tiến",
      DistrictId: "480",
    },
    {
      id: "20041",
      name: "Xã Bình Thành",
      DistrictId: "480",
    },
    {
      id: "20044",
      name: "Thị trấn A Lưới",
      DistrictId: "481",
    },
    {
      id: "20047",
      name: "Xã Hồng Vân",
      DistrictId: "481",
    },
    {
      id: "20050",
      name: "Xã Hồng Hạ",
      DistrictId: "481",
    },
    {
      id: "20053",
      name: "Xã Hồng Kim",
      DistrictId: "481",
    },
    {
      id: "20056",
      name: "Xã Trung Sơn",
      DistrictId: "481",
    },
    {
      id: "20059",
      name: "Xã Hương Nguyên",
      DistrictId: "481",
    },
    {
      id: "20065",
      name: "Xã Hồng Bắc",
      DistrictId: "481",
    },
    {
      id: "20068",
      name: "Xã A Ngo",
      DistrictId: "481",
    },
    {
      id: "20071",
      name: "Xã Sơn Thủy",
      DistrictId: "481",
    },
    {
      id: "20074",
      name: "Xã Phú Vinh",
      DistrictId: "481",
    },
    {
      id: "20080",
      name: "Xã Hương Phong",
      DistrictId: "481",
    },
    {
      id: "20083",
      name: "Xã Quảng Nhâm",
      DistrictId: "481",
    },
    {
      id: "20086",
      name: "Xã Hồng Thượng",
      DistrictId: "481",
    },
    {
      id: "20089",
      name: "Xã Hồng Thái",
      DistrictId: "481",
    },
    {
      id: "20095",
      name: "Xã A Roàng",
      DistrictId: "481",
    },
    {
      id: "20098",
      name: "Xã Đông Sơn",
      DistrictId: "481",
    },
    {
      id: "20101",
      name: "Xã Lâm Đớt",
      DistrictId: "481",
    },
    {
      id: "20104",
      name: "Xã Hồng Thủy",
      DistrictId: "481",
    },
    {
      id: "20107",
      name: "Thị trấn Phú Lộc",
      DistrictId: "482",
    },
    {
      id: "20110",
      name: "Thị trấn Lăng Cô",
      DistrictId: "482",
    },
    {
      id: "20113",
      name: "Xã Vinh Mỹ",
      DistrictId: "482",
    },
    {
      id: "20116",
      name: "Xã Vinh Hưng",
      DistrictId: "482",
    },
    {
      id: "20122",
      name: "Xã Giang Hải",
      DistrictId: "482",
    },
    {
      id: "20125",
      name: "Xã Vinh Hiền",
      DistrictId: "482",
    },
    {
      id: "20128",
      name: "Xã Lộc Bổn",
      DistrictId: "482",
    },
    {
      id: "20131",
      name: "Xã Lộc Sơn",
      DistrictId: "482",
    },
    {
      id: "20134",
      name: "Xã Lộc Bình",
      DistrictId: "482",
    },
    {
      id: "20137",
      name: "Xã Lộc Vĩnh",
      DistrictId: "482",
    },
    {
      id: "20140",
      name: "Xã Lộc An",
      DistrictId: "482",
    },
    {
      id: "20143",
      name: "Xã Lộc Điền",
      DistrictId: "482",
    },
    {
      id: "20146",
      name: "Xã Lộc Thủy",
      DistrictId: "482",
    },
    {
      id: "20149",
      name: "Xã Lộc Trì",
      DistrictId: "482",
    },
    {
      id: "20152",
      name: "Xã Lộc Tiến",
      DistrictId: "482",
    },
    {
      id: "20155",
      name: "Xã Lộc Hòa",
      DistrictId: "482",
    },
    {
      id: "20158",
      name: "Xã Xuân Lộc",
      DistrictId: "482",
    },
    {
      id: "20161",
      name: "Thị trấn Khe Tre",
      DistrictId: "483",
    },
    {
      id: "20164",
      name: "Xã Hương Phú",
      DistrictId: "483",
    },
    {
      id: "20167",
      name: "Xã Hương Sơn",
      DistrictId: "483",
    },
    {
      id: "20170",
      name: "Xã Hương Lộc",
      DistrictId: "483",
    },
    {
      id: "20173",
      name: "Xã Thượng Quảng",
      DistrictId: "483",
    },
    {
      id: "20179",
      name: "Xã Hương Xuân",
      DistrictId: "483",
    },
    {
      id: "20182",
      name: "Xã Hương Hữu",
      DistrictId: "483",
    },
    {
      id: "20185",
      name: "Xã Thượng Lộ",
      DistrictId: "483",
    },
    {
      id: "20188",
      name: "Xã Thượng Long",
      DistrictId: "483",
    },
    {
      id: "20191",
      name: "Xã Thượng Nhật",
      DistrictId: "483",
    },
    {
      id: "20194",
      name: "Phường Hòa Hiệp Bắc",
      DistrictId: "490",
    },
    {
      id: "20195",
      name: "Phường Hòa Hiệp Nam",
      DistrictId: "490",
    },
    {
      id: "20197",
      name: "Phường Hòa Khánh Bắc",
      DistrictId: "490",
    },
    {
      id: "20198",
      name: "Phường Hòa Khánh Nam",
      DistrictId: "490",
    },
    {
      id: "20200",
      name: "Phường Hòa Minh",
      DistrictId: "490",
    },
    {
      id: "20203",
      name: "Phường Tam Thuận",
      DistrictId: "491",
    },
    {
      id: "20206",
      name: "Phường Thanh Khê Tây",
      DistrictId: "491",
    },
    {
      id: "20207",
      name: "Phường Thanh Khê Đông",
      DistrictId: "491",
    },
    {
      id: "20209",
      name: "Phường Xuân Hà",
      DistrictId: "491",
    },
    {
      id: "20212",
      name: "Phường Tân Chính",
      DistrictId: "491",
    },
    {
      id: "20215",
      name: "Phường Chính Gián",
      DistrictId: "491",
    },
    {
      id: "20218",
      name: "Phường Vĩnh Trung",
      DistrictId: "491",
    },
    {
      id: "20221",
      name: "Phường Thạc Gián",
      DistrictId: "491",
    },
    {
      id: "20224",
      name: "Phường An Khê",
      DistrictId: "491",
    },
    {
      id: "20225",
      name: "Phường Hòa Khê",
      DistrictId: "491",
    },
    {
      id: "20227",
      name: "Phường Thanh Bình",
      DistrictId: "492",
    },
    {
      id: "20230",
      name: "Phường Thuận Phước",
      DistrictId: "492",
    },
    {
      id: "20233",
      name: "Phường Thạch Thang",
      DistrictId: "492",
    },
    {
      id: "20236",
      name: "Phường Hải Châu  I",
      DistrictId: "492",
    },
    {
      id: "20239",
      name: "Phường Hải Châu II",
      DistrictId: "492",
    },
    {
      id: "20242",
      name: "Phường Phước Ninh",
      DistrictId: "492",
    },
    {
      id: "20245",
      name: "Phường Hòa Thuận Tây",
      DistrictId: "492",
    },
    {
      id: "20246",
      name: "Phường Hòa Thuận Đông",
      DistrictId: "492",
    },
    {
      id: "20248",
      name: "Phường Nam Dương",
      DistrictId: "492",
    },
    {
      id: "20251",
      name: "Phường Bình Hiên",
      DistrictId: "492",
    },
    {
      id: "20254",
      name: "Phường Bình Thuận",
      DistrictId: "492",
    },
    {
      id: "20257",
      name: "Phường Hòa Cường Bắc",
      DistrictId: "492",
    },
    {
      id: "20258",
      name: "Phường Hòa Cường Nam",
      DistrictId: "492",
    },
    {
      id: "20260",
      name: "Phường Khuê Trung",
      DistrictId: "495",
    },
    {
      id: "20263",
      name: "Phường Thọ Quang",
      DistrictId: "493",
    },
    {
      id: "20266",
      name: "Phường Nại Hiên Đông",
      DistrictId: "493",
    },
    {
      id: "20269",
      name: "Phường Mân Thái",
      DistrictId: "493",
    },
    {
      id: "20272",
      name: "Phường An Hải Bắc",
      DistrictId: "493",
    },
    {
      id: "20275",
      name: "Phường Phước Mỹ",
      DistrictId: "493",
    },
    {
      id: "20278",
      name: "Phường An Hải Tây",
      DistrictId: "493",
    },
    {
      id: "20281",
      name: "Phường An Hải Đông",
      DistrictId: "493",
    },
    {
      id: "20284",
      name: "Phường Mỹ An",
      DistrictId: "494",
    },
    {
      id: "20285",
      name: "Phường Khuê Mỹ",
      DistrictId: "494",
    },
    {
      id: "20287",
      name: "Phường Hoà Quý",
      DistrictId: "494",
    },
    {
      id: "20290",
      name: "Phường Hoà Hải",
      DistrictId: "494",
    },
    {
      id: "20293",
      name: "Xã Hòa Bắc",
      DistrictId: "497",
    },
    {
      id: "20296",
      name: "Xã Hòa Liên",
      DistrictId: "497",
    },
    {
      id: "20299",
      name: "Xã Hòa Ninh",
      DistrictId: "497",
    },
    {
      id: "20302",
      name: "Xã Hòa Sơn",
      DistrictId: "497",
    },
    {
      id: "20305",
      name: "Phường Hòa Phát",
      DistrictId: "495",
    },
    {
      id: "20306",
      name: "Phường Hòa An",
      DistrictId: "495",
    },
    {
      id: "20308",
      name: "Xã Hòa Nhơn",
      DistrictId: "497",
    },
    {
      id: "20311",
      name: "Phường Hòa Thọ Tây",
      DistrictId: "495",
    },
    {
      id: "20312",
      name: "Phường Hòa Thọ Đông",
      DistrictId: "495",
    },
    {
      id: "20314",
      name: "Phường Hòa Xuân",
      DistrictId: "495",
    },
    {
      id: "20317",
      name: "Xã Hòa Phú",
      DistrictId: "497",
    },
    {
      id: "20320",
      name: "Xã Hòa Phong",
      DistrictId: "497",
    },
    {
      id: "20323",
      name: "Xã Hòa Châu",
      DistrictId: "497",
    },
    {
      id: "20326",
      name: "Xã Hòa Tiến",
      DistrictId: "497",
    },
    {
      id: "20329",
      name: "Xã Hòa Phước",
      DistrictId: "497",
    },
    {
      id: "20332",
      name: "Xã Hòa Khương",
      DistrictId: "497",
    },
    {
      id: "20335",
      name: "Phường Tân Thạnh",
      DistrictId: "502",
    },
    {
      id: "20338",
      name: "Phường Phước Hòa",
      DistrictId: "502",
    },
    {
      id: "20341",
      name: "Phường An Mỹ",
      DistrictId: "502",
    },
    {
      id: "20344",
      name: "Phường Hòa Hương",
      DistrictId: "502",
    },
    {
      id: "20347",
      name: "Phường An Xuân",
      DistrictId: "502",
    },
    {
      id: "20350",
      name: "Phường An Sơn",
      DistrictId: "502",
    },
    {
      id: "20353",
      name: "Phường Trường Xuân",
      DistrictId: "502",
    },
    {
      id: "20356",
      name: "Phường An Phú",
      DistrictId: "502",
    },
    {
      id: "20359",
      name: "Xã Tam Thanh",
      DistrictId: "502",
    },
    {
      id: "20362",
      name: "Xã Tam Thăng",
      DistrictId: "502",
    },
    {
      id: "20364",
      name: "Thị trấn Phú Thịnh",
      DistrictId: "518",
    },
    {
      id: "20365",
      name: "Xã Tam Thành",
      DistrictId: "518",
    },
    {
      id: "20368",
      name: "Xã Tam An",
      DistrictId: "518",
    },
    {
      id: "20371",
      name: "Xã Tam Phú",
      DistrictId: "502",
    },
    {
      id: "20374",
      name: "Xã Tam Đàn",
      DistrictId: "518",
    },
    {
      id: "20375",
      name: "Phường Hoà Thuận",
      DistrictId: "502",
    },
    {
      id: "20377",
      name: "Xã Tam Lộc",
      DistrictId: "518",
    },
    {
      id: "20380",
      name: "Xã Tam Phước",
      DistrictId: "518",
    },
    {
      id: "20383",
      name: "Xã Tam Vinh",
      DistrictId: "518",
    },
    {
      id: "20386",
      name: "Xã Tam Thái",
      DistrictId: "518",
    },
    {
      id: "20387",
      name: "Xã Tam Đại",
      DistrictId: "518",
    },
    {
      id: "20389",
      name: "Xã Tam Ngọc",
      DistrictId: "502",
    },
    {
      id: "20392",
      name: "Xã Tam Dân",
      DistrictId: "518",
    },
    {
      id: "20395",
      name: "Xã Tam Lãnh",
      DistrictId: "518",
    },
    {
      id: "20398",
      name: "Phường Minh An",
      DistrictId: "503",
    },
    {
      id: "20401",
      name: "Phường Tân An",
      DistrictId: "503",
    },
    {
      id: "20404",
      name: "Phường Cẩm Phô",
      DistrictId: "503",
    },
    {
      id: "20407",
      name: "Phường Thanh Hà",
      DistrictId: "503",
    },
    {
      id: "20410",
      name: "Phường Sơn Phong",
      DistrictId: "503",
    },
    {
      id: "20413",
      name: "Phường Cẩm Châu",
      DistrictId: "503",
    },
    {
      id: "20416",
      name: "Phường Cửa Đại",
      DistrictId: "503",
    },
    {
      id: "20419",
      name: "Phường Cẩm An",
      DistrictId: "503",
    },
    {
      id: "20422",
      name: "Xã Cẩm Hà",
      DistrictId: "503",
    },
    {
      id: "20425",
      name: "Xã Cẩm Kim",
      DistrictId: "503",
    },
    {
      id: "20428",
      name: "Phường Cẩm Nam",
      DistrictId: "503",
    },
    {
      id: "20431",
      name: "Xã Cẩm Thanh",
      DistrictId: "503",
    },
    {
      id: "20434",
      name: "Xã Tân Hiệp",
      DistrictId: "503",
    },
    {
      id: "20437",
      name: "Xã Ch'ơm",
      DistrictId: "504",
    },
    {
      id: "20440",
      name: "Xã Ga Ri",
      DistrictId: "504",
    },
    {
      id: "20443",
      name: "Xã A Xan",
      DistrictId: "504",
    },
    {
      id: "20446",
      name: "Xã Tr'Hy",
      DistrictId: "504",
    },
    {
      id: "20449",
      name: "Xã Lăng",
      DistrictId: "504",
    },
    {
      id: "20452",
      name: "Xã A Nông",
      DistrictId: "504",
    },
    {
      id: "20455",
      name: "Xã A Tiêng",
      DistrictId: "504",
    },
    {
      id: "20458",
      name: "Xã Bha Lê",
      DistrictId: "504",
    },
    {
      id: "20461",
      name: "Xã A Vương",
      DistrictId: "504",
    },
    {
      id: "20464",
      name: "Xã Dang",
      DistrictId: "504",
    },
    {
      id: "20467",
      name: "Thị trấn P Rao",
      DistrictId: "505",
    },
    {
      id: "20470",
      name: "Xã Tà Lu",
      DistrictId: "505",
    },
    {
      id: "20473",
      name: "Xã Sông Kôn",
      DistrictId: "505",
    },
    {
      id: "20476",
      name: "Xã Jơ Ngây",
      DistrictId: "505",
    },
    {
      id: "20479",
      name: "Xã A Ting",
      DistrictId: "505",
    },
    {
      id: "20482",
      name: "Xã  Tư",
      DistrictId: "505",
    },
    {
      id: "20485",
      name: "Xã Ba",
      DistrictId: "505",
    },
    {
      id: "20488",
      name: "Xã A Rooi",
      DistrictId: "505",
    },
    {
      id: "20491",
      name: "Xã Za Hung",
      DistrictId: "505",
    },
    {
      id: "20494",
      name: "Xã Mà Cooi",
      DistrictId: "505",
    },
    {
      id: "20497",
      name: "Xã Ka Dăng",
      DistrictId: "505",
    },
    {
      id: "20500",
      name: "Thị Trấn Ái Nghĩa",
      DistrictId: "506",
    },
    {
      id: "20503",
      name: "Xã Đại Sơn",
      DistrictId: "506",
    },
    {
      id: "20506",
      name: "Xã Đại Lãnh",
      DistrictId: "506",
    },
    {
      id: "20509",
      name: "Xã Đại Hưng",
      DistrictId: "506",
    },
    {
      id: "20512",
      name: "Xã Đại Hồng",
      DistrictId: "506",
    },
    {
      id: "20515",
      name: "Xã Đại Đồng",
      DistrictId: "506",
    },
    {
      id: "20518",
      name: "Xã Đại Quang",
      DistrictId: "506",
    },
    {
      id: "20521",
      name: "Xã Đại Nghĩa",
      DistrictId: "506",
    },
    {
      id: "20524",
      name: "Xã Đại Hiệp",
      DistrictId: "506",
    },
    {
      id: "20527",
      name: "Xã Đại Thạnh",
      DistrictId: "506",
    },
    {
      id: "20530",
      name: "Xã Đại Chánh",
      DistrictId: "506",
    },
    {
      id: "20533",
      name: "Xã Đại Tân",
      DistrictId: "506",
    },
    {
      id: "20536",
      name: "Xã Đại Phong",
      DistrictId: "506",
    },
    {
      id: "20539",
      name: "Xã Đại Minh",
      DistrictId: "506",
    },
    {
      id: "20542",
      name: "Xã Đại Thắng",
      DistrictId: "506",
    },
    {
      id: "20545",
      name: "Xã Đại Cường",
      DistrictId: "506",
    },
    {
      id: "20547",
      name: "Xã Đại An",
      DistrictId: "506",
    },
    {
      id: "20548",
      name: "Xã Đại Hòa",
      DistrictId: "506",
    },
    {
      id: "20551",
      name: "Phường Vĩnh Điện",
      DistrictId: "507",
    },
    {
      id: "20554",
      name: "Xã Điện Tiến",
      DistrictId: "507",
    },
    {
      id: "20557",
      name: "Xã Điện Hòa",
      DistrictId: "507",
    },
    {
      id: "20560",
      name: "Xã Điện Thắng Bắc",
      DistrictId: "507",
    },
    {
      id: "20561",
      name: "Xã Điện Thắng Trung",
      DistrictId: "507",
    },
    {
      id: "20562",
      name: "Xã Điện Thắng Nam",
      DistrictId: "507",
    },
    {
      id: "20563",
      name: "Phường Điện Ngọc",
      DistrictId: "507",
    },
    {
      id: "20566",
      name: "Xã Điện Hồng",
      DistrictId: "507",
    },
    {
      id: "20569",
      name: "Xã Điện Thọ",
      DistrictId: "507",
    },
    {
      id: "20572",
      name: "Xã Điện Phước",
      DistrictId: "507",
    },
    {
      id: "20575",
      name: "Phường Điện An",
      DistrictId: "507",
    },
    {
      id: "20578",
      name: "Phường Điện Nam Bắc",
      DistrictId: "507",
    },
    {
      id: "20579",
      name: "Phường Điện Nam Trung",
      DistrictId: "507",
    },
    {
      id: "20580",
      name: "Phường Điện Nam Đông",
      DistrictId: "507",
    },
    {
      id: "20581",
      name: "Phường Điện Dương",
      DistrictId: "507",
    },
    {
      id: "20584",
      name: "Xã Điện Quang",
      DistrictId: "507",
    },
    {
      id: "20587",
      name: "Xã Điện Trung",
      DistrictId: "507",
    },
    {
      id: "20590",
      name: "Xã Điện Phong",
      DistrictId: "507",
    },
    {
      id: "20593",
      name: "Xã Điện Minh",
      DistrictId: "507",
    },
    {
      id: "20596",
      name: "Xã Điện Phương",
      DistrictId: "507",
    },
    {
      id: "20599",
      name: "Thị trấn Nam Phước",
      DistrictId: "508",
    },
    {
      id: "20602",
      name: "Xã Duy Thu",
      DistrictId: "508",
    },
    {
      id: "20605",
      name: "Xã Duy Phú",
      DistrictId: "508",
    },
    {
      id: "20608",
      name: "Xã Duy Tân",
      DistrictId: "508",
    },
    {
      id: "20611",
      name: "Xã Duy Hòa",
      DistrictId: "508",
    },
    {
      id: "20614",
      name: "Xã Duy Châu",
      DistrictId: "508",
    },
    {
      id: "20617",
      name: "Xã Duy Trinh",
      DistrictId: "508",
    },
    {
      id: "20620",
      name: "Xã Duy Sơn",
      DistrictId: "508",
    },
    {
      id: "20623",
      name: "Xã Duy Trung",
      DistrictId: "508",
    },
    {
      id: "20626",
      name: "Xã Duy Phước",
      DistrictId: "508",
    },
    {
      id: "20629",
      name: "Xã Duy Thành",
      DistrictId: "508",
    },
    {
      id: "20632",
      name: "Xã Duy Vinh",
      DistrictId: "508",
    },
    {
      id: "20635",
      name: "Xã Duy Nghĩa",
      DistrictId: "508",
    },
    {
      id: "20638",
      name: "Xã Duy Hải",
      DistrictId: "508",
    },
    {
      id: "20641",
      name: "Thị trấn Đông Phú",
      DistrictId: "509",
    },
    {
      id: "20644",
      name: "Xã Quế Xuân 1",
      DistrictId: "509",
    },
    {
      id: "20647",
      name: "Xã Quế Xuân 2",
      DistrictId: "509",
    },
    {
      id: "20650",
      name: "Xã Quế Phú",
      DistrictId: "509",
    },
    {
      id: "20651",
      name: "Thị trấn Hương An",
      DistrictId: "509",
    },
    {
      id: "20656",
      name: "Xã Quế Trung",
      DistrictId: "519",
    },
    {
      id: "20659",
      name: "Xã Quế Hiệp",
      DistrictId: "509",
    },
    {
      id: "20662",
      name: "Xã Quế Thuận",
      DistrictId: "509",
    },
    {
      id: "20665",
      name: "Xã Quế Mỹ",
      DistrictId: "509",
    },
    {
      id: "20668",
      name: "Xã Ninh Phước",
      DistrictId: "519",
    },
    {
      id: "20669",
      name: "Xã Phước Ninh",
      DistrictId: "519",
    },
    {
      id: "20671",
      name: "Xã Quế Lộc",
      DistrictId: "519",
    },
    {
      id: "20672",
      name: "Xã Sơn Viên",
      DistrictId: "519",
    },
    {
      id: "20677",
      name: "Xã Quế Long",
      DistrictId: "509",
    },
    {
      id: "20680",
      name: "Xã Quế Châu",
      DistrictId: "509",
    },
    {
      id: "20683",
      name: "Xã Quế Phong",
      DistrictId: "509",
    },
    {
      id: "20686",
      name: "Xã Quế An",
      DistrictId: "509",
    },
    {
      id: "20689",
      name: "Xã Quế Minh",
      DistrictId: "509",
    },
    {
      id: "20692",
      name: "Xã Quế Lâm",
      DistrictId: "519",
    },
    {
      id: "20695",
      name: "Thị trấn Thạnh Mỹ",
      DistrictId: "510",
    },
    {
      id: "20698",
      name: "Xã Laêê",
      DistrictId: "510",
    },
    {
      id: "20699",
      name: "Xã Chơ Chun",
      DistrictId: "510",
    },
    {
      id: "20701",
      name: "Xã Zuôich",
      DistrictId: "510",
    },
    {
      id: "20702",
      name: "Xã Tà Pơơ",
      DistrictId: "510",
    },
    {
      id: "20704",
      name: "Xã La Dêê",
      DistrictId: "510",
    },
    {
      id: "20705",
      name: "Xã Đắc Tôi",
      DistrictId: "510",
    },
    {
      id: "20707",
      name: "Xã Chà Vàl",
      DistrictId: "510",
    },
    {
      id: "20710",
      name: "Xã Tà Bhinh",
      DistrictId: "510",
    },
    {
      id: "20713",
      name: "Xã Cà Dy",
      DistrictId: "510",
    },
    {
      id: "20716",
      name: "Xã Đắc Pre",
      DistrictId: "510",
    },
    {
      id: "20719",
      name: "Xã Đắc Pring",
      DistrictId: "510",
    },
    {
      id: "20722",
      name: "Thị trấn Khâm Đức",
      DistrictId: "511",
    },
    {
      id: "20725",
      name: "Xã Phước Xuân",
      DistrictId: "511",
    },
    {
      id: "20728",
      name: "Xã Phước Hiệp",
      DistrictId: "511",
    },
    {
      id: "20729",
      name: "Xã Phước Hoà",
      DistrictId: "511",
    },
    {
      id: "20731",
      name: "Xã Phước Đức",
      DistrictId: "511",
    },
    {
      id: "20734",
      name: "Xã Phước Năng",
      DistrictId: "511",
    },
    {
      id: "20737",
      name: "Xã Phước Mỹ",
      DistrictId: "511",
    },
    {
      id: "20740",
      name: "Xã Phước Chánh",
      DistrictId: "511",
    },
    {
      id: "20743",
      name: "Xã Phước Công",
      DistrictId: "511",
    },
    {
      id: "20746",
      name: "Xã Phước Kim",
      DistrictId: "511",
    },
    {
      id: "20749",
      name: "Xã Phước Lộc",
      DistrictId: "511",
    },
    {
      id: "20752",
      name: "Xã Phước Thành",
      DistrictId: "511",
    },
    {
      id: "20758",
      name: "Xã Hiệp Hòa",
      DistrictId: "512",
    },
    {
      id: "20761",
      name: "Xã Hiệp Thuận",
      DistrictId: "512",
    },
    {
      id: "20764",
      name: "Xã Quế Thọ",
      DistrictId: "512",
    },
    {
      id: "20767",
      name: "Xã Bình Lâm",
      DistrictId: "512",
    },
    {
      id: "20770",
      name: "Xã Sông Trà",
      DistrictId: "512",
    },
    {
      id: "20773",
      name: "Xã Phước Trà",
      DistrictId: "512",
    },
    {
      id: "20776",
      name: "Xã Phước Gia",
      DistrictId: "512",
    },
    {
      id: "20779",
      name: "Thị trấn Tân Bình",
      DistrictId: "512",
    },
    {
      id: "20782",
      name: "Xã Quế Lưu",
      DistrictId: "512",
    },
    {
      id: "20785",
      name: "Xã Thăng Phước",
      DistrictId: "512",
    },
    {
      id: "20788",
      name: "Xã Bình Sơn",
      DistrictId: "512",
    },
    {
      id: "20791",
      name: "Thị trấn Hà Lam",
      DistrictId: "513",
    },
    {
      id: "20794",
      name: "Xã Bình Dương",
      DistrictId: "513",
    },
    {
      id: "20797",
      name: "Xã Bình Giang",
      DistrictId: "513",
    },
    {
      id: "20800",
      name: "Xã Bình Nguyên",
      DistrictId: "513",
    },
    {
      id: "20803",
      name: "Xã Bình Phục",
      DistrictId: "513",
    },
    {
      id: "20806",
      name: "Xã Bình Triều",
      DistrictId: "513",
    },
    {
      id: "20809",
      name: "Xã Bình Đào",
      DistrictId: "513",
    },
    {
      id: "20812",
      name: "Xã Bình Minh",
      DistrictId: "513",
    },
    {
      id: "20815",
      name: "Xã Bình Lãnh",
      DistrictId: "513",
    },
    {
      id: "20818",
      name: "Xã Bình Trị",
      DistrictId: "513",
    },
    {
      id: "20821",
      name: "Xã Bình Định Bắc",
      DistrictId: "513",
    },
    {
      id: "20822",
      name: "Xã Bình Định Nam",
      DistrictId: "513",
    },
    {
      id: "20824",
      name: "Xã Bình Quý",
      DistrictId: "513",
    },
    {
      id: "20827",
      name: "Xã Bình Phú",
      DistrictId: "513",
    },
    {
      id: "20830",
      name: "Xã Bình Chánh",
      DistrictId: "513",
    },
    {
      id: "20833",
      name: "Xã Bình Tú",
      DistrictId: "513",
    },
    {
      id: "20836",
      name: "Xã Bình Sa",
      DistrictId: "513",
    },
    {
      id: "20839",
      name: "Xã Bình Hải",
      DistrictId: "513",
    },
    {
      id: "20842",
      name: "Xã Bình Quế",
      DistrictId: "513",
    },
    {
      id: "20845",
      name: "Xã Bình An",
      DistrictId: "513",
    },
    {
      id: "20848",
      name: "Xã Bình Trung",
      DistrictId: "513",
    },
    {
      id: "20851",
      name: "Xã Bình Nam",
      DistrictId: "513",
    },
    {
      id: "20854",
      name: "Thị trấn Tiên Kỳ",
      DistrictId: "514",
    },
    {
      id: "20857",
      name: "Xã Tiên Sơn",
      DistrictId: "514",
    },
    {
      id: "20860",
      name: "Xã Tiên Hà",
      DistrictId: "514",
    },
    {
      id: "20863",
      name: "Xã Tiên Cẩm",
      DistrictId: "514",
    },
    {
      id: "20866",
      name: "Xã Tiên Châu",
      DistrictId: "514",
    },
    {
      id: "20869",
      name: "Xã Tiên Lãnh",
      DistrictId: "514",
    },
    {
      id: "20872",
      name: "Xã Tiên Ngọc",
      DistrictId: "514",
    },
    {
      id: "20875",
      name: "Xã Tiên Hiệp",
      DistrictId: "514",
    },
    {
      id: "20878",
      name: "Xã Tiên Cảnh",
      DistrictId: "514",
    },
    {
      id: "20881",
      name: "Xã Tiên Mỹ",
      DistrictId: "514",
    },
    {
      id: "20884",
      name: "Xã Tiên Phong",
      DistrictId: "514",
    },
    {
      id: "20887",
      name: "Xã Tiên Thọ",
      DistrictId: "514",
    },
    {
      id: "20890",
      name: "Xã Tiên An",
      DistrictId: "514",
    },
    {
      id: "20893",
      name: "Xã Tiên Lộc",
      DistrictId: "514",
    },
    {
      id: "20896",
      name: "Xã Tiên Lập",
      DistrictId: "514",
    },
    {
      id: "20899",
      name: "Thị trấn Trà My",
      DistrictId: "515",
    },
    {
      id: "20900",
      name: "Xã Trà Sơn",
      DistrictId: "515",
    },
    {
      id: "20902",
      name: "Xã Trà Kót",
      DistrictId: "515",
    },
    {
      id: "20905",
      name: "Xã Trà Nú",
      DistrictId: "515",
    },
    {
      id: "20908",
      name: "Xã Trà Đông",
      DistrictId: "515",
    },
    {
      id: "20911",
      name: "Xã Trà Dương",
      DistrictId: "515",
    },
    {
      id: "20914",
      name: "Xã Trà Giang",
      DistrictId: "515",
    },
    {
      id: "20917",
      name: "Xã Trà Bui",
      DistrictId: "515",
    },
    {
      id: "20920",
      name: "Xã Trà Đốc",
      DistrictId: "515",
    },
    {
      id: "20923",
      name: "Xã Trà Tân",
      DistrictId: "515",
    },
    {
      id: "20926",
      name: "Xã Trà Giác",
      DistrictId: "515",
    },
    {
      id: "20929",
      name: "Xã Trà Giáp",
      DistrictId: "515",
    },
    {
      id: "20932",
      name: "Xã Trà Ka",
      DistrictId: "515",
    },
    {
      id: "20935",
      name: "Xã Trà Leng",
      DistrictId: "516",
    },
    {
      id: "20938",
      name: "Xã Trà Dơn",
      DistrictId: "516",
    },
    {
      id: "20941",
      name: "Xã Trà Tập",
      DistrictId: "516",
    },
    {
      id: "20944",
      name: "Xã Trà Mai",
      DistrictId: "516",
    },
    {
      id: "20947",
      name: "Xã Trà Cang",
      DistrictId: "516",
    },
    {
      id: "20950",
      name: "Xã Trà Linh",
      DistrictId: "516",
    },
    {
      id: "20953",
      name: "Xã Trà Nam",
      DistrictId: "516",
    },
    {
      id: "20956",
      name: "Xã Trà Don",
      DistrictId: "516",
    },
    {
      id: "20959",
      name: "Xã Trà Vân",
      DistrictId: "516",
    },
    {
      id: "20962",
      name: "Xã Trà Vinh",
      DistrictId: "516",
    },
    {
      id: "20965",
      name: "Thị trấn Núi Thành",
      DistrictId: "517",
    },
    {
      id: "20968",
      name: "Xã Tam Xuân I",
      DistrictId: "517",
    },
    {
      id: "20971",
      name: "Xã Tam Xuân II",
      DistrictId: "517",
    },
    {
      id: "20974",
      name: "Xã Tam Tiến",
      DistrictId: "517",
    },
    {
      id: "20977",
      name: "Xã Tam Sơn",
      DistrictId: "517",
    },
    {
      id: "20980",
      name: "Xã Tam Thạnh",
      DistrictId: "517",
    },
    {
      id: "20983",
      name: "Xã Tam Anh Bắc",
      DistrictId: "517",
    },
    {
      id: "20984",
      name: "Xã Tam Anh Nam",
      DistrictId: "517",
    },
    {
      id: "20986",
      name: "Xã Tam Hòa",
      DistrictId: "517",
    },
    {
      id: "20989",
      name: "Xã Tam Hiệp",
      DistrictId: "517",
    },
    {
      id: "20992",
      name: "Xã Tam Hải",
      DistrictId: "517",
    },
    {
      id: "20995",
      name: "Xã Tam Giang",
      DistrictId: "517",
    },
    {
      id: "20998",
      name: "Xã Tam Quang",
      DistrictId: "517",
    },
    {
      id: "21001",
      name: "Xã Tam Nghĩa",
      DistrictId: "517",
    },
    {
      id: "21004",
      name: "Xã Tam Mỹ Tây",
      DistrictId: "517",
    },
    {
      id: "21005",
      name: "Xã Tam Mỹ Đông",
      DistrictId: "517",
    },
    {
      id: "21007",
      name: "Xã Tam Trà",
      DistrictId: "517",
    },
    {
      id: "21010",
      name: "Phường Lê Hồng Phong",
      DistrictId: "522",
    },
    {
      id: "21013",
      name: "Phường Trần Phú",
      DistrictId: "522",
    },
    {
      id: "21016",
      name: "Phường Quảng Phú",
      DistrictId: "522",
    },
    {
      id: "21019",
      name: "Phường Nghĩa Chánh",
      DistrictId: "522",
    },
    {
      id: "21022",
      name: "Phường Trần Hưng Đạo",
      DistrictId: "522",
    },
    {
      id: "21025",
      name: "Phường Nguyễn Nghiêm",
      DistrictId: "522",
    },
    {
      id: "21028",
      name: "Phường Nghĩa Lộ",
      DistrictId: "522",
    },
    {
      id: "21031",
      name: "Phường Chánh Lộ",
      DistrictId: "522",
    },
    {
      id: "21034",
      name: "Xã Nghĩa Dũng",
      DistrictId: "522",
    },
    {
      id: "21037",
      name: "Xã Nghĩa Dõng",
      DistrictId: "522",
    },
    {
      id: "21040",
      name: "Thị Trấn Châu Ổ",
      DistrictId: "524",
    },
    {
      id: "21043",
      name: "Xã Bình Thuận",
      DistrictId: "524",
    },
    {
      id: "21046",
      name: "Xã Bình Thạnh",
      DistrictId: "524",
    },
    {
      id: "21049",
      name: "Xã Bình Đông",
      DistrictId: "524",
    },
    {
      id: "21052",
      name: "Xã Bình Chánh",
      DistrictId: "524",
    },
    {
      id: "21055",
      name: "Xã Bình Nguyên",
      DistrictId: "524",
    },
    {
      id: "21058",
      name: "Xã Bình Khương",
      DistrictId: "524",
    },
    {
      id: "21061",
      name: "Xã Bình Trị",
      DistrictId: "524",
    },
    {
      id: "21064",
      name: "Xã Bình An",
      DistrictId: "524",
    },
    {
      id: "21067",
      name: "Xã Bình Hải",
      DistrictId: "524",
    },
    {
      id: "21070",
      name: "Xã Bình Dương",
      DistrictId: "524",
    },
    {
      id: "21073",
      name: "Xã Bình Phước",
      DistrictId: "524",
    },
    {
      id: "21079",
      name: "Xã Bình Hòa",
      DistrictId: "524",
    },
    {
      id: "21082",
      name: "Xã Bình Trung",
      DistrictId: "524",
    },
    {
      id: "21085",
      name: "Xã Bình Minh",
      DistrictId: "524",
    },
    {
      id: "21088",
      name: "Xã Bình Long",
      DistrictId: "524",
    },
    {
      id: "21091",
      name: "Xã Bình Thanh ",
      DistrictId: "524",
    },
    {
      id: "21100",
      name: "Xã Bình Chương",
      DistrictId: "524",
    },
    {
      id: "21103",
      name: "Xã Bình Hiệp",
      DistrictId: "524",
    },
    {
      id: "21106",
      name: "Xã Bình Mỹ",
      DistrictId: "524",
    },
    {
      id: "21109",
      name: "Xã Bình Tân Phú",
      DistrictId: "524",
    },
    {
      id: "21112",
      name: "Xã Bình Châu",
      DistrictId: "524",
    },
    {
      id: "21115",
      name: "Thị trấn Trà Xuân",
      DistrictId: "525",
    },
    {
      id: "21118",
      name: "Xã Trà Giang",
      DistrictId: "525",
    },
    {
      id: "21121",
      name: "Xã Trà Thủy",
      DistrictId: "525",
    },
    {
      id: "21124",
      name: "Xã Trà Hiệp",
      DistrictId: "525",
    },
    {
      id: "21127",
      name: "Xã Trà Bình",
      DistrictId: "525",
    },
    {
      id: "21130",
      name: "Xã Trà Phú",
      DistrictId: "525",
    },
    {
      id: "21133",
      name: "Xã Trà Lâm",
      DistrictId: "525",
    },
    {
      id: "21136",
      name: "Xã Trà Tân",
      DistrictId: "525",
    },
    {
      id: "21139",
      name: "Xã Trà Sơn",
      DistrictId: "525",
    },
    {
      id: "21142",
      name: "Xã Trà Bùi",
      DistrictId: "525",
    },
    {
      id: "21145",
      name: "Xã Trà Thanh",
      DistrictId: "525",
    },
    {
      id: "21148",
      name: "Xã Sơn Trà",
      DistrictId: "525",
    },
    {
      id: "21154",
      name: "Xã Trà Phong",
      DistrictId: "525",
    },
    {
      id: "21157",
      name: "Xã Hương Trà",
      DistrictId: "525",
    },
    {
      id: "21163",
      name: "Xã Trà Xinh",
      DistrictId: "525",
    },
    {
      id: "21166",
      name: "Xã Trà Tây",
      DistrictId: "525",
    },
    {
      id: "21172",
      name: "Phường Trương Quang Trọng",
      DistrictId: "522",
    },
    {
      id: "21175",
      name: "Xã Tịnh Thọ",
      DistrictId: "527",
    },
    {
      id: "21178",
      name: "Xã Tịnh Trà",
      DistrictId: "527",
    },
    {
      id: "21181",
      name: "Xã Tịnh Phong",
      DistrictId: "527",
    },
    {
      id: "21184",
      name: "Xã Tịnh Hiệp",
      DistrictId: "527",
    },
    {
      id: "21187",
      name: "Xã Tịnh Hòa",
      DistrictId: "522",
    },
    {
      id: "21190",
      name: "Xã Tịnh Kỳ",
      DistrictId: "522",
    },
    {
      id: "21193",
      name: "Xã Tịnh Bình",
      DistrictId: "527",
    },
    {
      id: "21196",
      name: "Xã Tịnh Đông",
      DistrictId: "527",
    },
    {
      id: "21199",
      name: "Xã Tịnh Thiện",
      DistrictId: "522",
    },
    {
      id: "21202",
      name: "Xã Tịnh Ấn Đông",
      DistrictId: "522",
    },
    {
      id: "21205",
      name: "Xã Tịnh Bắc",
      DistrictId: "527",
    },
    {
      id: "21208",
      name: "Xã Tịnh Châu",
      DistrictId: "522",
    },
    {
      id: "21211",
      name: "Xã Tịnh Khê",
      DistrictId: "522",
    },
    {
      id: "21214",
      name: "Xã Tịnh Long",
      DistrictId: "522",
    },
    {
      id: "21217",
      name: "Xã Tịnh Sơn",
      DistrictId: "527",
    },
    {
      id: "21220",
      name: "Xã Tịnh Hà",
      DistrictId: "527",
    },
    {
      id: "21223",
      name: "Xã Tịnh Ấn Tây",
      DistrictId: "522",
    },
    {
      id: "21226",
      name: "Xã Tịnh Giang",
      DistrictId: "527",
    },
    {
      id: "21229",
      name: "Xã Tịnh Minh",
      DistrictId: "527",
    },
    {
      id: "21232",
      name: "Xã Tịnh An",
      DistrictId: "522",
    },
    {
      id: "21235",
      name: "Thị trấn La Hà",
      DistrictId: "528",
    },
    {
      id: "21238",
      name: "Thị trấn Sông Vệ",
      DistrictId: "528",
    },
    {
      id: "21241",
      name: "Xã Nghĩa Lâm",
      DistrictId: "528",
    },
    {
      id: "21244",
      name: "Xã Nghĩa Thắng",
      DistrictId: "528",
    },
    {
      id: "21247",
      name: "Xã Nghĩa Thuận",
      DistrictId: "528",
    },
    {
      id: "21250",
      name: "Xã Nghĩa Kỳ",
      DistrictId: "528",
    },
    {
      id: "21253",
      name: "Xã Nghĩa Phú",
      DistrictId: "522",
    },
    {
      id: "21256",
      name: "Xã Nghĩa Hà",
      DistrictId: "522",
    },
    {
      id: "21259",
      name: "Xã Nghĩa Sơn",
      DistrictId: "528",
    },
    {
      id: "21262",
      name: "Xã Nghĩa An",
      DistrictId: "522",
    },
    {
      id: "21268",
      name: "Xã Nghĩa Hòa",
      DistrictId: "528",
    },
    {
      id: "21271",
      name: "Xã Nghĩa Điền",
      DistrictId: "528",
    },
    {
      id: "21274",
      name: "Xã Nghĩa Thương",
      DistrictId: "528",
    },
    {
      id: "21277",
      name: "Xã Nghĩa Trung",
      DistrictId: "528",
    },
    {
      id: "21280",
      name: "Xã Nghĩa Hiệp",
      DistrictId: "528",
    },
    {
      id: "21283",
      name: "Xã Nghĩa Phương",
      DistrictId: "528",
    },
    {
      id: "21286",
      name: "Xã Nghĩa Mỹ",
      DistrictId: "528",
    },
    {
      id: "21289",
      name: "Thị trấn Di Lăng",
      DistrictId: "529",
    },
    {
      id: "21292",
      name: "Xã Sơn Hạ",
      DistrictId: "529",
    },
    {
      id: "21295",
      name: "Xã Sơn Thành",
      DistrictId: "529",
    },
    {
      id: "21298",
      name: "Xã Sơn Nham",
      DistrictId: "529",
    },
    {
      id: "21301",
      name: "Xã Sơn Bao",
      DistrictId: "529",
    },
    {
      id: "21304",
      name: "Xã Sơn Linh",
      DistrictId: "529",
    },
    {
      id: "21307",
      name: "Xã Sơn Giang",
      DistrictId: "529",
    },
    {
      id: "21310",
      name: "Xã Sơn Trung",
      DistrictId: "529",
    },
    {
      id: "21313",
      name: "Xã Sơn Thượng",
      DistrictId: "529",
    },
    {
      id: "21316",
      name: "Xã Sơn Cao",
      DistrictId: "529",
    },
    {
      id: "21319",
      name: "Xã Sơn Hải",
      DistrictId: "529",
    },
    {
      id: "21322",
      name: "Xã Sơn Thủy",
      DistrictId: "529",
    },
    {
      id: "21325",
      name: "Xã Sơn Kỳ",
      DistrictId: "529",
    },
    {
      id: "21328",
      name: "Xã Sơn Ba",
      DistrictId: "529",
    },
    {
      id: "21331",
      name: "Xã Sơn Bua",
      DistrictId: "530",
    },
    {
      id: "21334",
      name: "Xã Sơn Mùa",
      DistrictId: "530",
    },
    {
      id: "21335",
      name: "Xã Sơn Liên",
      DistrictId: "530",
    },
    {
      id: "21337",
      name: "Xã Sơn Tân",
      DistrictId: "530",
    },
    {
      id: "21338",
      name: "Xã Sơn Màu",
      DistrictId: "530",
    },
    {
      id: "21340",
      name: "Xã Sơn Dung",
      DistrictId: "530",
    },
    {
      id: "21341",
      name: "Xã Sơn Long",
      DistrictId: "530",
    },
    {
      id: "21343",
      name: "Xã Sơn Tinh",
      DistrictId: "530",
    },
    {
      id: "21346",
      name: "Xã Sơn Lập",
      DistrictId: "530",
    },
    {
      id: "21349",
      name: "Xã Long Sơn",
      DistrictId: "531",
    },
    {
      id: "21352",
      name: "Xã Long Mai",
      DistrictId: "531",
    },
    {
      id: "21355",
      name: "Xã Thanh An",
      DistrictId: "531",
    },
    {
      id: "21358",
      name: "Xã Long Môn",
      DistrictId: "531",
    },
    {
      id: "21361",
      name: "Xã Long Hiệp",
      DistrictId: "531",
    },
    {
      id: "21364",
      name: "Thị trấn Chợ Chùa",
      DistrictId: "532",
    },
    {
      id: "21367",
      name: "Xã Hành Thuận",
      DistrictId: "532",
    },
    {
      id: "21370",
      name: "Xã Hành Dũng",
      DistrictId: "532",
    },
    {
      id: "21373",
      name: "Xã Hành Trung",
      DistrictId: "532",
    },
    {
      id: "21376",
      name: "Xã Hành Nhân",
      DistrictId: "532",
    },
    {
      id: "21379",
      name: "Xã Hành Đức",
      DistrictId: "532",
    },
    {
      id: "21382",
      name: "Xã Hành Minh",
      DistrictId: "532",
    },
    {
      id: "21385",
      name: "Xã Hành Phước",
      DistrictId: "532",
    },
    {
      id: "21388",
      name: "Xã Hành Thiện",
      DistrictId: "532",
    },
    {
      id: "21391",
      name: "Xã Hành Thịnh",
      DistrictId: "532",
    },
    {
      id: "21394",
      name: "Xã Hành Tín Tây",
      DistrictId: "532",
    },
    {
      id: "21397",
      name: "Xã Hành Tín  Đông",
      DistrictId: "532",
    },
    {
      id: "21400",
      name: "Thị trấn Mộ Đức",
      DistrictId: "533",
    },
    {
      id: "21403",
      name: "Xã Đức Lợi",
      DistrictId: "533",
    },
    {
      id: "21406",
      name: "Xã Đức Thắng",
      DistrictId: "533",
    },
    {
      id: "21409",
      name: "Xã Đức Nhuận",
      DistrictId: "533",
    },
    {
      id: "21412",
      name: "Xã Đức Chánh",
      DistrictId: "533",
    },
    {
      id: "21415",
      name: "Xã Đức Hiệp",
      DistrictId: "533",
    },
    {
      id: "21418",
      name: "Xã Đức Minh",
      DistrictId: "533",
    },
    {
      id: "21421",
      name: "Xã Đức Thạnh",
      DistrictId: "533",
    },
    {
      id: "21424",
      name: "Xã Đức Hòa",
      DistrictId: "533",
    },
    {
      id: "21427",
      name: "Xã Đức Tân",
      DistrictId: "533",
    },
    {
      id: "21430",
      name: "Xã Đức Phú",
      DistrictId: "533",
    },
    {
      id: "21433",
      name: "Xã Đức Phong",
      DistrictId: "533",
    },
    {
      id: "21436",
      name: "Xã Đức Lân",
      DistrictId: "533",
    },
    {
      id: "21439",
      name: "Phường Nguyễn Nghiêm",
      DistrictId: "534",
    },
    {
      id: "21442",
      name: "Xã Phổ An",
      DistrictId: "534",
    },
    {
      id: "21445",
      name: "Xã Phổ Phong",
      DistrictId: "534",
    },
    {
      id: "21448",
      name: "Xã Phổ Thuận",
      DistrictId: "534",
    },
    {
      id: "21451",
      name: "Phường Phổ Văn",
      DistrictId: "534",
    },
    {
      id: "21454",
      name: "Phường Phổ Quang",
      DistrictId: "534",
    },
    {
      id: "21457",
      name: "Xã Phổ Nhơn",
      DistrictId: "534",
    },
    {
      id: "21460",
      name: "Phường Phổ Ninh",
      DistrictId: "534",
    },
    {
      id: "21463",
      name: "Phường Phổ Minh",
      DistrictId: "534",
    },
    {
      id: "21466",
      name: "Phường Phổ Vinh",
      DistrictId: "534",
    },
    {
      id: "21469",
      name: "Phường Phổ Hòa",
      DistrictId: "534",
    },
    {
      id: "21472",
      name: "Xã Phổ Cường",
      DistrictId: "534",
    },
    {
      id: "21475",
      name: "Xã Phổ Khánh",
      DistrictId: "534",
    },
    {
      id: "21478",
      name: "Phường Phổ Thạnh",
      DistrictId: "534",
    },
    {
      id: "21481",
      name: "Xã Phổ Châu",
      DistrictId: "534",
    },
    {
      id: "21484",
      name: "Thị trấn Ba Tơ",
      DistrictId: "535",
    },
    {
      id: "21487",
      name: "Xã Ba Điền",
      DistrictId: "535",
    },
    {
      id: "21490",
      name: "Xã Ba Vinh",
      DistrictId: "535",
    },
    {
      id: "21493",
      name: "Xã Ba Thành",
      DistrictId: "535",
    },
    {
      id: "21496",
      name: "Xã Ba Động",
      DistrictId: "535",
    },
    {
      id: "21499",
      name: "Xã Ba Dinh",
      DistrictId: "535",
    },
    {
      id: "21500",
      name: "Xã Ba Giang",
      DistrictId: "535",
    },
    {
      id: "21502",
      name: "Xã Ba Liên",
      DistrictId: "535",
    },
    {
      id: "21505",
      name: "Xã Ba Ngạc",
      DistrictId: "535",
    },
    {
      id: "21508",
      name: "Xã Ba Khâm",
      DistrictId: "535",
    },
    {
      id: "21511",
      name: "Xã Ba Cung",
      DistrictId: "535",
    },
    {
      id: "21517",
      name: "Xã Ba Tiêu",
      DistrictId: "535",
    },
    {
      id: "21520",
      name: "Xã Ba Trang",
      DistrictId: "535",
    },
    {
      id: "21523",
      name: "Xã Ba Tô",
      DistrictId: "535",
    },
    {
      id: "21526",
      name: "Xã Ba Bích",
      DistrictId: "535",
    },
    {
      id: "21529",
      name: "Xã Ba Vì",
      DistrictId: "535",
    },
    {
      id: "21532",
      name: "Xã Ba Lế",
      DistrictId: "535",
    },
    {
      id: "21535",
      name: "Xã Ba Nam",
      DistrictId: "535",
    },
    {
      id: "21538",
      name: "Xã Ba Xa",
      DistrictId: "535",
    },
    {
      id: "21550",
      name: "Phường Nhơn Bình",
      DistrictId: "540",
    },
    {
      id: "21553",
      name: "Phường Nhơn Phú",
      DistrictId: "540",
    },
    {
      id: "21556",
      name: "Phường Đống Đa",
      DistrictId: "540",
    },
    {
      id: "21559",
      name: "Phường Trần Quang Diệu",
      DistrictId: "540",
    },
    {
      id: "21562",
      name: "Phường Hải Cảng",
      DistrictId: "540",
    },
    {
      id: "21565",
      name: "Phường Quang Trung",
      DistrictId: "540",
    },
    {
      id: "21568",
      name: "Phường Thị Nại",
      DistrictId: "540",
    },
    {
      id: "21571",
      name: "Phường Lê Hồng Phong",
      DistrictId: "540",
    },
    {
      id: "21574",
      name: "Phường Trần Hưng Đạo",
      DistrictId: "540",
    },
    {
      id: "21577",
      name: "Phường Ngô Mây",
      DistrictId: "540",
    },
    {
      id: "21580",
      name: "Phường Lý Thường Kiệt",
      DistrictId: "540",
    },
    {
      id: "21583",
      name: "Phường Lê Lợi",
      DistrictId: "540",
    },
    {
      id: "21586",
      name: "Phường Trần Phú",
      DistrictId: "540",
    },
    {
      id: "21589",
      name: "Phường Bùi Thị Xuân",
      DistrictId: "540",
    },
    {
      id: "21592",
      name: "Phường Nguyễn Văn Cừ",
      DistrictId: "540",
    },
    {
      id: "21595",
      name: "Phường Ghềnh Ráng",
      DistrictId: "540",
    },
    {
      id: "21598",
      name: "Xã Nhơn Lý",
      DistrictId: "540",
    },
    {
      id: "21601",
      name: "Xã Nhơn Hội",
      DistrictId: "540",
    },
    {
      id: "21604",
      name: "Xã Nhơn Hải",
      DistrictId: "540",
    },
    {
      id: "21607",
      name: "Xã Nhơn Châu",
      DistrictId: "540",
    },
    {
      id: "21609",
      name: "Thị trấn An Lão",
      DistrictId: "542",
    },
    {
      id: "21610",
      name: "Xã An Hưng",
      DistrictId: "542",
    },
    {
      id: "21613",
      name: "Xã An Trung",
      DistrictId: "542",
    },
    {
      id: "21616",
      name: "Xã An Dũng",
      DistrictId: "542",
    },
    {
      id: "21619",
      name: "Xã An Vinh",
      DistrictId: "542",
    },
    {
      id: "21622",
      name: "Xã An Toàn",
      DistrictId: "542",
    },
    {
      id: "21625",
      name: "Xã An Tân",
      DistrictId: "542",
    },
    {
      id: "21628",
      name: "Xã An Hòa",
      DistrictId: "542",
    },
    {
      id: "21631",
      name: "Xã An Quang",
      DistrictId: "542",
    },
    {
      id: "21634",
      name: "Xã An Nghĩa",
      DistrictId: "542",
    },
    {
      id: "21637",
      name: "Phường Tam Quan",
      DistrictId: "543",
    },
    {
      id: "21640",
      name: "Phường Bồng Sơn",
      DistrictId: "543",
    },
    {
      id: "21643",
      name: "Xã Hoài Sơn",
      DistrictId: "543",
    },
    {
      id: "21646",
      name: "Xã Hoài Châu Bắc",
      DistrictId: "543",
    },
    {
      id: "21649",
      name: "Xã Hoài Châu",
      DistrictId: "543",
    },
    {
      id: "21652",
      name: "Xã Hoài Phú",
      DistrictId: "543",
    },
    {
      id: "21655",
      name: "Phường Tam Quan Bắc",
      DistrictId: "543",
    },
    {
      id: "21658",
      name: "Phường Tam Quan Nam",
      DistrictId: "543",
    },
    {
      id: "21661",
      name: "Phường Hoài Hảo",
      DistrictId: "543",
    },
    {
      id: "21664",
      name: "Phường Hoài Thanh Tây",
      DistrictId: "543",
    },
    {
      id: "21667",
      name: "Phường Hoài Thanh",
      DistrictId: "543",
    },
    {
      id: "21670",
      name: "Phường Hoài Hương",
      DistrictId: "543",
    },
    {
      id: "21673",
      name: "Phường Hoài Tân",
      DistrictId: "543",
    },
    {
      id: "21676",
      name: "Xã Hoài Hải",
      DistrictId: "543",
    },
    {
      id: "21679",
      name: "Phường Hoài Xuân",
      DistrictId: "543",
    },
    {
      id: "21682",
      name: "Xã Hoài Mỹ",
      DistrictId: "543",
    },
    {
      id: "21685",
      name: "Phường Hoài Đức",
      DistrictId: "543",
    },
    {
      id: "21688",
      name: "Thị trấn Tăng Bạt Hổ",
      DistrictId: "544",
    },
    {
      id: "21690",
      name: "Xã Ân Hảo Tây",
      DistrictId: "544",
    },
    {
      id: "21691",
      name: "Xã Ân Hảo Đông",
      DistrictId: "544",
    },
    {
      id: "21694",
      name: "Xã Ân Sơn",
      DistrictId: "544",
    },
    {
      id: "21697",
      name: "Xã Ân Mỹ",
      DistrictId: "544",
    },
    {
      id: "21700",
      name: "Xã Đak Mang",
      DistrictId: "544",
    },
    {
      id: "21703",
      name: "Xã Ân Tín",
      DistrictId: "544",
    },
    {
      id: "21706",
      name: "Xã Ân Thạnh",
      DistrictId: "544",
    },
    {
      id: "21709",
      name: "Xã Ân Phong",
      DistrictId: "544",
    },
    {
      id: "21712",
      name: "Xã Ân Đức",
      DistrictId: "544",
    },
    {
      id: "21715",
      name: "Xã Ân Hữu",
      DistrictId: "544",
    },
    {
      id: "21718",
      name: "Xã Bok Tới",
      DistrictId: "544",
    },
    {
      id: "21721",
      name: "Xã Ân Tường Tây",
      DistrictId: "544",
    },
    {
      id: "21724",
      name: "Xã Ân Tường Đông",
      DistrictId: "544",
    },
    {
      id: "21727",
      name: "Xã Ân Nghĩa",
      DistrictId: "544",
    },
    {
      id: "21730",
      name: "Thị trấn Phù Mỹ",
      DistrictId: "545",
    },
    {
      id: "21733",
      name: "Thị trấn Bình Dương",
      DistrictId: "545",
    },
    {
      id: "21736",
      name: "Xã Mỹ Đức",
      DistrictId: "545",
    },
    {
      id: "21739",
      name: "Xã Mỹ Châu",
      DistrictId: "545",
    },
    {
      id: "21742",
      name: "Xã Mỹ Thắng",
      DistrictId: "545",
    },
    {
      id: "21745",
      name: "Xã Mỹ Lộc",
      DistrictId: "545",
    },
    {
      id: "21748",
      name: "Xã Mỹ Lợi",
      DistrictId: "545",
    },
    {
      id: "21751",
      name: "Xã Mỹ An",
      DistrictId: "545",
    },
    {
      id: "21754",
      name: "Xã Mỹ Phong",
      DistrictId: "545",
    },
    {
      id: "21757",
      name: "Xã Mỹ Trinh",
      DistrictId: "545",
    },
    {
      id: "21760",
      name: "Xã Mỹ Thọ",
      DistrictId: "545",
    },
    {
      id: "21763",
      name: "Xã Mỹ Hòa",
      DistrictId: "545",
    },
    {
      id: "21766",
      name: "Xã Mỹ Thành",
      DistrictId: "545",
    },
    {
      id: "21769",
      name: "Xã Mỹ Chánh",
      DistrictId: "545",
    },
    {
      id: "21772",
      name: "Xã Mỹ Quang",
      DistrictId: "545",
    },
    {
      id: "21775",
      name: "Xã Mỹ Hiệp",
      DistrictId: "545",
    },
    {
      id: "21778",
      name: "Xã Mỹ Tài",
      DistrictId: "545",
    },
    {
      id: "21781",
      name: "Xã Mỹ Cát",
      DistrictId: "545",
    },
    {
      id: "21784",
      name: "Xã Mỹ Chánh Tây",
      DistrictId: "545",
    },
    {
      id: "21786",
      name: "Thị trấn Vĩnh Thạnh",
      DistrictId: "546",
    },
    {
      id: "21787",
      name: "Xã Vĩnh Sơn",
      DistrictId: "546",
    },
    {
      id: "21790",
      name: "Xã Vĩnh Kim",
      DistrictId: "546",
    },
    {
      id: "21796",
      name: "Xã Vĩnh Hiệp",
      DistrictId: "546",
    },
    {
      id: "21799",
      name: "Xã Vĩnh Hảo",
      DistrictId: "546",
    },
    {
      id: "21801",
      name: "Xã Vĩnh Hòa",
      DistrictId: "546",
    },
    {
      id: "21802",
      name: "Xã Vĩnh Thịnh",
      DistrictId: "546",
    },
    {
      id: "21804",
      name: "Xã Vĩnh Thuận",
      DistrictId: "546",
    },
    {
      id: "21805",
      name: "Xã Vĩnh Quang",
      DistrictId: "546",
    },
    {
      id: "21808",
      name: "Thị trấn Phú Phong",
      DistrictId: "547",
    },
    {
      id: "21811",
      name: "Xã Bình Tân",
      DistrictId: "547",
    },
    {
      id: "21814",
      name: "Xã Tây Thuận",
      DistrictId: "547",
    },
    {
      id: "21817",
      name: "Xã Bình Thuận",
      DistrictId: "547",
    },
    {
      id: "21820",
      name: "Xã Tây Giang",
      DistrictId: "547",
    },
    {
      id: "21823",
      name: "Xã Bình Thành",
      DistrictId: "547",
    },
    {
      id: "21826",
      name: "Xã Tây An",
      DistrictId: "547",
    },
    {
      id: "21829",
      name: "Xã Bình Hòa",
      DistrictId: "547",
    },
    {
      id: "21832",
      name: "Xã Tây Bình",
      DistrictId: "547",
    },
    {
      id: "21835",
      name: "Xã Bình Tường",
      DistrictId: "547",
    },
    {
      id: "21838",
      name: "Xã Tây Vinh",
      DistrictId: "547",
    },
    {
      id: "21841",
      name: "Xã Vĩnh An",
      DistrictId: "547",
    },
    {
      id: "21844",
      name: "Xã Tây Xuân",
      DistrictId: "547",
    },
    {
      id: "21847",
      name: "Xã Bình Nghi",
      DistrictId: "547",
    },
    {
      id: "21850",
      name: "Xã Tây Phú",
      DistrictId: "547",
    },
    {
      id: "21853",
      name: "Thị trấn Ngô Mây",
      DistrictId: "548",
    },
    {
      id: "21856",
      name: "Xã Cát Sơn",
      DistrictId: "548",
    },
    {
      id: "21859",
      name: "Xã Cát Minh",
      DistrictId: "548",
    },
    {
      id: "21862",
      name: "Xã Cát Khánh",
      DistrictId: "548",
    },
    {
      id: "21865",
      name: "Xã Cát Tài",
      DistrictId: "548",
    },
    {
      id: "21868",
      name: "Xã Cát Lâm",
      DistrictId: "548",
    },
    {
      id: "21871",
      name: "Xã Cát Hanh",
      DistrictId: "548",
    },
    {
      id: "21874",
      name: "Xã Cát Thành",
      DistrictId: "548",
    },
    {
      id: "21877",
      name: "Xã Cát Trinh",
      DistrictId: "548",
    },
    {
      id: "21880",
      name: "Xã Cát Hải",
      DistrictId: "548",
    },
    {
      id: "21883",
      name: "Xã Cát Hiệp",
      DistrictId: "548",
    },
    {
      id: "21886",
      name: "Xã Cát Nhơn",
      DistrictId: "548",
    },
    {
      id: "21889",
      name: "Xã Cát Hưng",
      DistrictId: "548",
    },
    {
      id: "21892",
      name: "Xã Cát Tường",
      DistrictId: "548",
    },
    {
      id: "21895",
      name: "Xã Cát Tân",
      DistrictId: "548",
    },
    {
      id: "21898",
      name: "Thị trấn Cát Tiến",
      DistrictId: "548",
    },
    {
      id: "21901",
      name: "Xã Cát Thắng",
      DistrictId: "548",
    },
    {
      id: "21904",
      name: "Xã Cát Chánh",
      DistrictId: "548",
    },
    {
      id: "21907",
      name: "Phường Bình Định",
      DistrictId: "549",
    },
    {
      id: "21910",
      name: "Phường Đập Đá",
      DistrictId: "549",
    },
    {
      id: "21913",
      name: "Xã Nhơn Mỹ",
      DistrictId: "549",
    },
    {
      id: "21916",
      name: "Phường Nhơn Thành",
      DistrictId: "549",
    },
    {
      id: "21919",
      name: "Xã Nhơn Hạnh",
      DistrictId: "549",
    },
    {
      id: "21922",
      name: "Xã Nhơn Hậu",
      DistrictId: "549",
    },
    {
      id: "21925",
      name: "Xã Nhơn Phong",
      DistrictId: "549",
    },
    {
      id: "21928",
      name: "Xã Nhơn An",
      DistrictId: "549",
    },
    {
      id: "21931",
      name: "Xã Nhơn Phúc",
      DistrictId: "549",
    },
    {
      id: "21934",
      name: "Phường Nhơn Hưng",
      DistrictId: "549",
    },
    {
      id: "21937",
      name: "Xã Nhơn Khánh",
      DistrictId: "549",
    },
    {
      id: "21940",
      name: "Xã Nhơn Lộc",
      DistrictId: "549",
    },
    {
      id: "21943",
      name: "Phường Nhơn Hoà",
      DistrictId: "549",
    },
    {
      id: "21946",
      name: "Xã Nhơn Tân",
      DistrictId: "549",
    },
    {
      id: "21949",
      name: "Xã Nhơn Thọ",
      DistrictId: "549",
    },
    {
      id: "21952",
      name: "Thị trấn Tuy Phước",
      DistrictId: "550",
    },
    {
      id: "21955",
      name: "Thị trấn Diêu Trì",
      DistrictId: "550",
    },
    {
      id: "21958",
      name: "Xã Phước Thắng",
      DistrictId: "550",
    },
    {
      id: "21961",
      name: "Xã Phước Hưng",
      DistrictId: "550",
    },
    {
      id: "21964",
      name: "Xã Phước Quang",
      DistrictId: "550",
    },
    {
      id: "21967",
      name: "Xã Phước Hòa",
      DistrictId: "550",
    },
    {
      id: "21970",
      name: "Xã Phước Sơn",
      DistrictId: "550",
    },
    {
      id: "21973",
      name: "Xã Phước Hiệp",
      DistrictId: "550",
    },
    {
      id: "21976",
      name: "Xã Phước Lộc",
      DistrictId: "550",
    },
    {
      id: "21979",
      name: "Xã Phước Nghĩa",
      DistrictId: "550",
    },
    {
      id: "21982",
      name: "Xã Phước Thuận",
      DistrictId: "550",
    },
    {
      id: "21985",
      name: "Xã Phước An",
      DistrictId: "550",
    },
    {
      id: "21988",
      name: "Xã Phước Thành",
      DistrictId: "550",
    },
    {
      id: "21991",
      name: "Xã Phước Mỹ",
      DistrictId: "540",
    },
    {
      id: "21994",
      name: "Thị trấn Vân Canh",
      DistrictId: "551",
    },
    {
      id: "21997",
      name: "Xã Canh Liên",
      DistrictId: "551",
    },
    {
      id: "22000",
      name: "Xã Canh Hiệp",
      DistrictId: "551",
    },
    {
      id: "22003",
      name: "Xã Canh Vinh",
      DistrictId: "551",
    },
    {
      id: "22006",
      name: "Xã Canh Hiển",
      DistrictId: "551",
    },
    {
      id: "22009",
      name: "Xã Canh Thuận",
      DistrictId: "551",
    },
    {
      id: "22012",
      name: "Xã Canh Hòa",
      DistrictId: "551",
    },
    {
      id: "22015",
      name: "Phường 1",
      DistrictId: "555",
    },
    {
      id: "22018",
      name: "Phường 8",
      DistrictId: "555",
    },
    {
      id: "22021",
      name: "Phường 2",
      DistrictId: "555",
    },
    {
      id: "22024",
      name: "Phường 9",
      DistrictId: "555",
    },
    {
      id: "22027",
      name: "Phường 3",
      DistrictId: "555",
    },
    {
      id: "22030",
      name: "Phường 4",
      DistrictId: "555",
    },
    {
      id: "22033",
      name: "Phường 5",
      DistrictId: "555",
    },
    {
      id: "22036",
      name: "Phường 7",
      DistrictId: "555",
    },
    {
      id: "22039",
      name: "Phường 6",
      DistrictId: "555",
    },
    {
      id: "22040",
      name: "Phường Phú Thạnh",
      DistrictId: "555",
    },
    {
      id: "22041",
      name: "Phường Phú Đông",
      DistrictId: "555",
    },
    {
      id: "22042",
      name: "Xã Hòa Kiến",
      DistrictId: "555",
    },
    {
      id: "22045",
      name: "Xã Bình Kiến",
      DistrictId: "555",
    },
    {
      id: "22048",
      name: "Xã Bình Ngọc",
      DistrictId: "555",
    },
    {
      id: "22051",
      name: "Phường Xuân Phú",
      DistrictId: "557",
    },
    {
      id: "22052",
      name: "Xã Xuân Lâm",
      DistrictId: "557",
    },
    {
      id: "22053",
      name: "Phường Xuân Thành",
      DistrictId: "557",
    },
    {
      id: "22054",
      name: "Xã Xuân Hải",
      DistrictId: "557",
    },
    {
      id: "22057",
      name: "Xã Xuân Lộc",
      DistrictId: "557",
    },
    {
      id: "22060",
      name: "Xã Xuân Bình",
      DistrictId: "557",
    },
    {
      id: "22066",
      name: "Xã Xuân Cảnh",
      DistrictId: "557",
    },
    {
      id: "22069",
      name: "Xã Xuân Thịnh",
      DistrictId: "557",
    },
    {
      id: "22072",
      name: "Xã Xuân Phương",
      DistrictId: "557",
    },
    {
      id: "22073",
      name: "Phường Xuân Yên",
      DistrictId: "557",
    },
    {
      id: "22075",
      name: "Xã Xuân Thọ 1",
      DistrictId: "557",
    },
    {
      id: "22076",
      name: "Phường Xuân Đài",
      DistrictId: "557",
    },
    {
      id: "22078",
      name: "Xã Xuân Thọ 2",
      DistrictId: "557",
    },
    {
      id: "22081",
      name: "Thị trấn La Hai",
      DistrictId: "558",
    },
    {
      id: "22084",
      name: "Xã Đa Lộc",
      DistrictId: "558",
    },
    {
      id: "22087",
      name: "Xã Phú Mỡ",
      DistrictId: "558",
    },
    {
      id: "22090",
      name: "Xã Xuân Lãnh",
      DistrictId: "558",
    },
    {
      id: "22093",
      name: "Xã Xuân Long",
      DistrictId: "558",
    },
    {
      id: "22096",
      name: "Xã Xuân Quang 1",
      DistrictId: "558",
    },
    {
      id: "22099",
      name: "Xã Xuân Sơn Bắc",
      DistrictId: "558",
    },
    {
      id: "22102",
      name: "Xã Xuân Quang 2",
      DistrictId: "558",
    },
    {
      id: "22105",
      name: "Xã Xuân Sơn Nam",
      DistrictId: "558",
    },
    {
      id: "22108",
      name: "Xã Xuân Quang 3",
      DistrictId: "558",
    },
    {
      id: "22111",
      name: "Xã Xuân Phước",
      DistrictId: "558",
    },
    {
      id: "22114",
      name: "Thị trấn Chí Thạnh",
      DistrictId: "559",
    },
    {
      id: "22117",
      name: "Xã An Dân",
      DistrictId: "559",
    },
    {
      id: "22120",
      name: "Xã An Ninh Tây",
      DistrictId: "559",
    },
    {
      id: "22123",
      name: "Xã An Ninh Đông",
      DistrictId: "559",
    },
    {
      id: "22126",
      name: "Xã An Thạch",
      DistrictId: "559",
    },
    {
      id: "22129",
      name: "Xã An Định",
      DistrictId: "559",
    },
    {
      id: "22132",
      name: "Xã An Nghiệp",
      DistrictId: "559",
    },
    {
      id: "22138",
      name: "Xã An Cư",
      DistrictId: "559",
    },
    {
      id: "22141",
      name: "Xã An Xuân",
      DistrictId: "559",
    },
    {
      id: "22144",
      name: "Xã An Lĩnh",
      DistrictId: "559",
    },
    {
      id: "22147",
      name: "Xã An Hòa Hải",
      DistrictId: "559",
    },
    {
      id: "22150",
      name: "Xã An Hiệp",
      DistrictId: "559",
    },
    {
      id: "22153",
      name: "Xã An Mỹ",
      DistrictId: "559",
    },
    {
      id: "22156",
      name: "Xã An Chấn",
      DistrictId: "559",
    },
    {
      id: "22159",
      name: "Xã An Thọ",
      DistrictId: "559",
    },
    {
      id: "22162",
      name: "Xã An Phú",
      DistrictId: "555",
    },
    {
      id: "22165",
      name: "Thị trấn Củng Sơn",
      DistrictId: "560",
    },
    {
      id: "22168",
      name: "Xã Phước Tân",
      DistrictId: "560",
    },
    {
      id: "22171",
      name: "Xã Sơn Hội",
      DistrictId: "560",
    },
    {
      id: "22174",
      name: "Xã Sơn Định",
      DistrictId: "560",
    },
    {
      id: "22177",
      name: "Xã Sơn Long",
      DistrictId: "560",
    },
    {
      id: "22180",
      name: "Xã Cà Lúi",
      DistrictId: "560",
    },
    {
      id: "22183",
      name: "Xã Sơn Phước",
      DistrictId: "560",
    },
    {
      id: "22186",
      name: "Xã Sơn Xuân",
      DistrictId: "560",
    },
    {
      id: "22189",
      name: "Xã Sơn Nguyên",
      DistrictId: "560",
    },
    {
      id: "22192",
      name: "Xã Eachà Rang",
      DistrictId: "560",
    },
    {
      id: "22195",
      name: "Xã Krông Pa",
      DistrictId: "560",
    },
    {
      id: "22198",
      name: "Xã Suối Bạc",
      DistrictId: "560",
    },
    {
      id: "22201",
      name: "Xã Sơn Hà",
      DistrictId: "560",
    },
    {
      id: "22204",
      name: "Xã Suối Trai",
      DistrictId: "560",
    },
    {
      id: "22207",
      name: "Thị trấn Hai Riêng",
      DistrictId: "561",
    },
    {
      id: "22210",
      name: "Xã Ea Lâm",
      DistrictId: "561",
    },
    {
      id: "22213",
      name: "Xã Đức Bình Tây",
      DistrictId: "561",
    },
    {
      id: "22216",
      name: "Xã Ea Bá",
      DistrictId: "561",
    },
    {
      id: "22219",
      name: "Xã Sơn Giang",
      DistrictId: "561",
    },
    {
      id: "22222",
      name: "Xã Đức Bình Đông",
      DistrictId: "561",
    },
    {
      id: "22225",
      name: "Xã EaBar",
      DistrictId: "561",
    },
    {
      id: "22228",
      name: "Xã EaBia",
      DistrictId: "561",
    },
    {
      id: "22231",
      name: "Xã EaTrol",
      DistrictId: "561",
    },
    {
      id: "22234",
      name: "Xã Sông Hinh",
      DistrictId: "561",
    },
    {
      id: "22237",
      name: "Xã Ealy",
      DistrictId: "561",
    },
    {
      id: "22240",
      name: "Phường Phú Lâm",
      DistrictId: "555",
    },
    {
      id: "22243",
      name: "Xã Hòa Thành",
      DistrictId: "564",
    },
    {
      id: "22246",
      name: "Phường Hòa Hiệp Bắc",
      DistrictId: "564",
    },
    {
      id: "22249",
      name: "Xã Sơn Thành Tây",
      DistrictId: "562",
    },
    {
      id: "22250",
      name: "Xã Sơn Thành Đông",
      DistrictId: "562",
    },
    {
      id: "22252",
      name: "Xã Hòa Bình 1",
      DistrictId: "562",
    },
    {
      id: "22255",
      name: "Thị trấn Phú Thứ",
      DistrictId: "562",
    },
    {
      id: "22258",
      name: "Phường Hoà Vinh",
      DistrictId: "564",
    },
    {
      id: "22261",
      name: "Phường Hoà Hiệp Trung",
      DistrictId: "564",
    },
    {
      id: "22264",
      name: "Xã Hòa Phong",
      DistrictId: "562",
    },
    {
      id: "22267",
      name: "Xã Hòa Tân Đông",
      DistrictId: "564",
    },
    {
      id: "22270",
      name: "Xã Hòa Phú",
      DistrictId: "562",
    },
    {
      id: "22273",
      name: "Xã Hòa Tân Tây",
      DistrictId: "562",
    },
    {
      id: "22276",
      name: "Xã Hòa Đồng",
      DistrictId: "562",
    },
    {
      id: "22279",
      name: "Phường Hòa Xuân Tây",
      DistrictId: "564",
    },
    {
      id: "22282",
      name: "Phường Hòa Hiệp Nam",
      DistrictId: "564",
    },
    {
      id: "22285",
      name: "Xã Hòa Mỹ Đông",
      DistrictId: "562",
    },
    {
      id: "22288",
      name: "Xã Hòa Mỹ Tây",
      DistrictId: "562",
    },
    {
      id: "22291",
      name: "Xã Hòa Xuân Đông",
      DistrictId: "564",
    },
    {
      id: "22294",
      name: "Xã Hòa Thịnh",
      DistrictId: "562",
    },
    {
      id: "22297",
      name: "Xã Hòa Tâm",
      DistrictId: "564",
    },
    {
      id: "22300",
      name: "Xã Hòa Xuân Nam",
      DistrictId: "564",
    },
    {
      id: "22303",
      name: "Xã Hòa Quang Bắc",
      DistrictId: "563",
    },
    {
      id: "22306",
      name: "Xã Hòa Quang Nam",
      DistrictId: "563",
    },
    {
      id: "22309",
      name: "Xã Hòa Hội",
      DistrictId: "563",
    },
    {
      id: "22312",
      name: "Xã Hòa Trị",
      DistrictId: "563",
    },
    {
      id: "22315",
      name: "Xã Hòa An",
      DistrictId: "563",
    },
    {
      id: "22318",
      name: "Xã Hòa Định Đông",
      DistrictId: "563",
    },
    {
      id: "22319",
      name: "Thị Trấn Phú Hoà",
      DistrictId: "563",
    },
    {
      id: "22321",
      name: "Xã Hòa Định Tây",
      DistrictId: "563",
    },
    {
      id: "22324",
      name: "Xã Hòa Thắng",
      DistrictId: "563",
    },
    {
      id: "22327",
      name: "Phường Vĩnh Hòa",
      DistrictId: "568",
    },
    {
      id: "22330",
      name: "Phường Vĩnh Hải",
      DistrictId: "568",
    },
    {
      id: "22333",
      name: "Phường Vĩnh Phước",
      DistrictId: "568",
    },
    {
      id: "22336",
      name: "Phường Ngọc Hiệp",
      DistrictId: "568",
    },
    {
      id: "22339",
      name: "Phường Vĩnh Thọ",
      DistrictId: "568",
    },
    {
      id: "22342",
      name: "Phường Xương Huân",
      DistrictId: "568",
    },
    {
      id: "22345",
      name: "Phường Vạn Thắng",
      DistrictId: "568",
    },
    {
      id: "22348",
      name: "Phường Vạn Thạnh",
      DistrictId: "568",
    },
    {
      id: "22351",
      name: "Phường Phương Sài",
      DistrictId: "568",
    },
    {
      id: "22354",
      name: "Phường Phương Sơn",
      DistrictId: "568",
    },
    {
      id: "22357",
      name: "Phường Phước Hải",
      DistrictId: "568",
    },
    {
      id: "22360",
      name: "Phường Phước Tân",
      DistrictId: "568",
    },
    {
      id: "22363",
      name: "Phường Lộc Thọ",
      DistrictId: "568",
    },
    {
      id: "22366",
      name: "Phường Phước Tiến",
      DistrictId: "568",
    },
    {
      id: "22369",
      name: "Phường Tân Lập",
      DistrictId: "568",
    },
    {
      id: "22372",
      name: "Phường Phước Hòa",
      DistrictId: "568",
    },
    {
      id: "22375",
      name: "Phường Vĩnh Nguyên",
      DistrictId: "568",
    },
    {
      id: "22378",
      name: "Phường Phước Long",
      DistrictId: "568",
    },
    {
      id: "22381",
      name: "Phường Vĩnh Trường",
      DistrictId: "568",
    },
    {
      id: "22384",
      name: "Xã Vĩnh Lương",
      DistrictId: "568",
    },
    {
      id: "22387",
      name: "Xã Vĩnh Phương",
      DistrictId: "568",
    },
    {
      id: "22390",
      name: "Xã Vĩnh Ngọc",
      DistrictId: "568",
    },
    {
      id: "22393",
      name: "Xã Vĩnh Thạnh",
      DistrictId: "568",
    },
    {
      id: "22396",
      name: "Xã Vĩnh Trung",
      DistrictId: "568",
    },
    {
      id: "22399",
      name: "Xã Vĩnh Hiệp",
      DistrictId: "568",
    },
    {
      id: "22402",
      name: "Xã Vĩnh Thái",
      DistrictId: "568",
    },
    {
      id: "22405",
      name: "Xã Phước Đồng",
      DistrictId: "568",
    },
    {
      id: "22408",
      name: "Phường Cam Nghĩa",
      DistrictId: "569",
    },
    {
      id: "22411",
      name: "Phường Cam Phúc Bắc",
      DistrictId: "569",
    },
    {
      id: "22414",
      name: "Phường Cam Phúc Nam",
      DistrictId: "569",
    },
    {
      id: "22417",
      name: "Phường Cam Lộc",
      DistrictId: "569",
    },
    {
      id: "22420",
      name: "Phường Cam Phú",
      DistrictId: "569",
    },
    {
      id: "22423",
      name: "Phường Ba Ngòi",
      DistrictId: "569",
    },
    {
      id: "22426",
      name: "Phường Cam Thuận",
      DistrictId: "569",
    },
    {
      id: "22429",
      name: "Phường Cam Lợi",
      DistrictId: "569",
    },
    {
      id: "22432",
      name: "Phường Cam Linh",
      DistrictId: "569",
    },
    {
      id: "22435",
      name: "Xã Cam Tân",
      DistrictId: "570",
    },
    {
      id: "22438",
      name: "Xã Cam Hòa",
      DistrictId: "570",
    },
    {
      id: "22441",
      name: "Xã Cam Hải Đông",
      DistrictId: "570",
    },
    {
      id: "22444",
      name: "Xã Cam Hải Tây",
      DistrictId: "570",
    },
    {
      id: "22447",
      name: "Xã Sơn Tân",
      DistrictId: "570",
    },
    {
      id: "22450",
      name: "Xã Cam Hiệp Bắc",
      DistrictId: "570",
    },
    {
      id: "22453",
      name: "Thị trấn Cam Đức",
      DistrictId: "570",
    },
    {
      id: "22456",
      name: "Xã Cam Hiệp Nam",
      DistrictId: "570",
    },
    {
      id: "22459",
      name: "Xã Cam Phước Tây",
      DistrictId: "570",
    },
    {
      id: "22462",
      name: "Xã Cam Thành Bắc",
      DistrictId: "570",
    },
    {
      id: "22465",
      name: "Xã Cam An Bắc",
      DistrictId: "570",
    },
    {
      id: "22468",
      name: "Xã Cam Thành Nam",
      DistrictId: "569",
    },
    {
      id: "22471",
      name: "Xã Cam An Nam",
      DistrictId: "570",
    },
    {
      id: "22474",
      name: "Xã Cam Phước Đông",
      DistrictId: "569",
    },
    {
      id: "22477",
      name: "Xã Cam Thịnh Tây",
      DistrictId: "569",
    },
    {
      id: "22480",
      name: "Xã Cam Thịnh Đông",
      DistrictId: "569",
    },
    {
      id: "22483",
      name: "Xã Cam Lập",
      DistrictId: "569",
    },
    {
      id: "22486",
      name: "Xã Cam Bình",
      DistrictId: "569",
    },
    {
      id: "22489",
      name: "Thị trấn Vạn Giã",
      DistrictId: "571",
    },
    {
      id: "22492",
      name: "Xã Đại Lãnh",
      DistrictId: "571",
    },
    {
      id: "22495",
      name: "Xã Vạn Phước",
      DistrictId: "571",
    },
    {
      id: "22498",
      name: "Xã Vạn Long",
      DistrictId: "571",
    },
    {
      id: "22501",
      name: "Xã Vạn Bình",
      DistrictId: "571",
    },
    {
      id: "22504",
      name: "Xã Vạn Thọ",
      DistrictId: "571",
    },
    {
      id: "22507",
      name: "Xã Vạn Khánh",
      DistrictId: "571",
    },
    {
      id: "22510",
      name: "Xã Vạn Phú",
      DistrictId: "571",
    },
    {
      id: "22513",
      name: "Xã Vạn Lương",
      DistrictId: "571",
    },
    {
      id: "22516",
      name: "Xã Vạn Thắng",
      DistrictId: "571",
    },
    {
      id: "22519",
      name: "Xã Vạn Thạnh",
      DistrictId: "571",
    },
    {
      id: "22522",
      name: "Xã Xuân Sơn",
      DistrictId: "571",
    },
    {
      id: "22525",
      name: "Xã Vạn Hưng",
      DistrictId: "571",
    },
    {
      id: "22528",
      name: "Phường Ninh Hiệp",
      DistrictId: "572",
    },
    {
      id: "22531",
      name: "Xã Ninh Sơn",
      DistrictId: "572",
    },
    {
      id: "22534",
      name: "Xã Ninh Tây",
      DistrictId: "572",
    },
    {
      id: "22537",
      name: "Xã Ninh Thượng",
      DistrictId: "572",
    },
    {
      id: "22540",
      name: "Xã Ninh An",
      DistrictId: "572",
    },
    {
      id: "22543",
      name: "Phường Ninh Hải",
      DistrictId: "572",
    },
    {
      id: "22546",
      name: "Xã Ninh Thọ",
      DistrictId: "572",
    },
    {
      id: "22549",
      name: "Xã Ninh Trung",
      DistrictId: "572",
    },
    {
      id: "22552",
      name: "Xã Ninh Sim",
      DistrictId: "572",
    },
    {
      id: "22555",
      name: "Xã Ninh Xuân",
      DistrictId: "572",
    },
    {
      id: "22558",
      name: "Xã Ninh Thân",
      DistrictId: "572",
    },
    {
      id: "22561",
      name: "Phường Ninh Diêm",
      DistrictId: "572",
    },
    {
      id: "22564",
      name: "Xã Ninh Đông",
      DistrictId: "572",
    },
    {
      id: "22567",
      name: "Phường Ninh Thủy",
      DistrictId: "572",
    },
    {
      id: "22570",
      name: "Phường Ninh Đa",
      DistrictId: "572",
    },
    {
      id: "22573",
      name: "Xã Ninh Phụng",
      DistrictId: "572",
    },
    {
      id: "22576",
      name: "Xã Ninh Bình",
      DistrictId: "572",
    },
    {
      id: "22579",
      name: "Xã Ninh Phước",
      DistrictId: "572",
    },
    {
      id: "22582",
      name: "Xã Ninh Phú",
      DistrictId: "572",
    },
    {
      id: "22585",
      name: "Xã Ninh Tân",
      DistrictId: "572",
    },
    {
      id: "22588",
      name: "Xã Ninh Quang",
      DistrictId: "572",
    },
    {
      id: "22591",
      name: "Phường Ninh Giang",
      DistrictId: "572",
    },
    {
      id: "22594",
      name: "Phường Ninh Hà",
      DistrictId: "572",
    },
    {
      id: "22597",
      name: "Xã Ninh Hưng",
      DistrictId: "572",
    },
    {
      id: "22600",
      name: "Xã Ninh Lộc",
      DistrictId: "572",
    },
    {
      id: "22603",
      name: "Xã Ninh Ích",
      DistrictId: "572",
    },
    {
      id: "22606",
      name: "Xã Ninh Vân",
      DistrictId: "572",
    },
    {
      id: "22609",
      name: "Thị trấn Khánh Vĩnh",
      DistrictId: "573",
    },
    {
      id: "22612",
      name: "Xã Khánh Hiệp",
      DistrictId: "573",
    },
    {
      id: "22615",
      name: "Xã Khánh Bình",
      DistrictId: "573",
    },
    {
      id: "22618",
      name: "Xã Khánh Trung",
      DistrictId: "573",
    },
    {
      id: "22621",
      name: "Xã Khánh Đông",
      DistrictId: "573",
    },
    {
      id: "22624",
      name: "Xã Khánh Thượng",
      DistrictId: "573",
    },
    {
      id: "22627",
      name: "Xã Khánh Nam",
      DistrictId: "573",
    },
    {
      id: "22630",
      name: "Xã Sông Cầu",
      DistrictId: "573",
    },
    {
      id: "22633",
      name: "Xã Giang Ly",
      DistrictId: "573",
    },
    {
      id: "22636",
      name: "Xã Cầu Bà",
      DistrictId: "573",
    },
    {
      id: "22639",
      name: "Xã Liên Sang",
      DistrictId: "573",
    },
    {
      id: "22642",
      name: "Xã Khánh Thành",
      DistrictId: "573",
    },
    {
      id: "22645",
      name: "Xã Khánh Phú",
      DistrictId: "573",
    },
    {
      id: "22648",
      name: "Xã Sơn Thái",
      DistrictId: "573",
    },
    {
      id: "22651",
      name: "Thị trấn Diên Khánh",
      DistrictId: "574",
    },
    {
      id: "22654",
      name: "Xã Diên Lâm",
      DistrictId: "574",
    },
    {
      id: "22657",
      name: "Xã Diên Điền",
      DistrictId: "574",
    },
    {
      id: "22660",
      name: "Xã Diên Xuân",
      DistrictId: "574",
    },
    {
      id: "22663",
      name: "Xã Diên Sơn",
      DistrictId: "574",
    },
    {
      id: "22666",
      name: "Xã Diên Đồng",
      DistrictId: "574",
    },
    {
      id: "22669",
      name: "Xã Diên Phú",
      DistrictId: "574",
    },
    {
      id: "22672",
      name: "Xã Diên Thọ",
      DistrictId: "574",
    },
    {
      id: "22675",
      name: "Xã Diên Phước",
      DistrictId: "574",
    },
    {
      id: "22678",
      name: "Xã Diên Lạc",
      DistrictId: "574",
    },
    {
      id: "22681",
      name: "Xã Diên Tân",
      DistrictId: "574",
    },
    {
      id: "22684",
      name: "Xã Diên Hòa",
      DistrictId: "574",
    },
    {
      id: "22687",
      name: "Xã Diên Thạnh",
      DistrictId: "574",
    },
    {
      id: "22690",
      name: "Xã Diên Toàn",
      DistrictId: "574",
    },
    {
      id: "22693",
      name: "Xã Diên An",
      DistrictId: "574",
    },
    {
      id: "22696",
      name: "Xã Bình Lộc",
      DistrictId: "574",
    },
    {
      id: "22702",
      name: "Xã Suối Hiệp",
      DistrictId: "574",
    },
    {
      id: "22705",
      name: "Xã Suối Tiên",
      DistrictId: "574",
    },
    {
      id: "22708",
      name: "Xã Suối Cát",
      DistrictId: "570",
    },
    {
      id: "22711",
      name: "Xã Suối Tân",
      DistrictId: "570",
    },
    {
      id: "22714",
      name: "Thị trấn Tô Hạp",
      DistrictId: "575",
    },
    {
      id: "22717",
      name: "Xã Thành Sơn",
      DistrictId: "575",
    },
    {
      id: "22720",
      name: "Xã Sơn Lâm",
      DistrictId: "575",
    },
    {
      id: "22723",
      name: "Xã Sơn Hiệp",
      DistrictId: "575",
    },
    {
      id: "22726",
      name: "Xã Sơn Bình",
      DistrictId: "575",
    },
    {
      id: "22729",
      name: "Xã Sơn Trung",
      DistrictId: "575",
    },
    {
      id: "22732",
      name: "Xã Ba Cụm Bắc",
      DistrictId: "575",
    },
    {
      id: "22735",
      name: "Xã Ba Cụm Nam",
      DistrictId: "575",
    },
    {
      id: "22736",
      name: "Thị trấn Trường Sa",
      DistrictId: "576",
    },
    {
      id: "22737",
      name: "Xã Song Tử Tây",
      DistrictId: "576",
    },
    {
      id: "22738",
      name: "Phường Đô Vinh",
      DistrictId: "582",
    },
    {
      id: "22739",
      name: "Xã Sinh Tồn",
      DistrictId: "576",
    },
    {
      id: "22741",
      name: "Phường Phước Mỹ",
      DistrictId: "582",
    },
    {
      id: "22744",
      name: "Phường Bảo An",
      DistrictId: "582",
    },
    {
      id: "22747",
      name: "Phường Phủ Hà",
      DistrictId: "582",
    },
    {
      id: "22750",
      name: "Phường Thanh Sơn",
      DistrictId: "582",
    },
    {
      id: "22753",
      name: "Phường Mỹ Hương",
      DistrictId: "582",
    },
    {
      id: "22756",
      name: "Phường Tấn Tài",
      DistrictId: "582",
    },
    {
      id: "22759",
      name: "Phường Kinh Dinh",
      DistrictId: "582",
    },
    {
      id: "22762",
      name: "Phường Đạo Long",
      DistrictId: "582",
    },
    {
      id: "22765",
      name: "Phường Đài Sơn",
      DistrictId: "582",
    },
    {
      id: "22768",
      name: "Phường Đông Hải",
      DistrictId: "582",
    },
    {
      id: "22771",
      name: "Phường Mỹ Đông",
      DistrictId: "582",
    },
    {
      id: "22774",
      name: "Xã Thành Hải",
      DistrictId: "582",
    },
    {
      id: "22777",
      name: "Phường Văn Hải",
      DistrictId: "582",
    },
    {
      id: "22779",
      name: "Phường Mỹ Bình",
      DistrictId: "582",
    },
    {
      id: "22780",
      name: "Phường Mỹ Hải",
      DistrictId: "582",
    },
    {
      id: "22783",
      name: "Xã Phước Bình",
      DistrictId: "584",
    },
    {
      id: "22786",
      name: "Xã Phước Hòa",
      DistrictId: "584",
    },
    {
      id: "22789",
      name: "Xã Phước Tân",
      DistrictId: "584",
    },
    {
      id: "22792",
      name: "Xã Phước Tiến",
      DistrictId: "584",
    },
    {
      id: "22795",
      name: "Xã Phước Thắng",
      DistrictId: "584",
    },
    {
      id: "22798",
      name: "Xã Phước Thành",
      DistrictId: "584",
    },
    {
      id: "22801",
      name: "Xã Phước Đại",
      DistrictId: "584",
    },
    {
      id: "22804",
      name: "Xã Phước Chính",
      DistrictId: "584",
    },
    {
      id: "22807",
      name: "Xã Phước Trung",
      DistrictId: "584",
    },
    {
      id: "22810",
      name: "Thị trấn Tân Sơn",
      DistrictId: "585",
    },
    {
      id: "22813",
      name: "Xã Lâm Sơn",
      DistrictId: "585",
    },
    {
      id: "22816",
      name: "Xã Lương Sơn",
      DistrictId: "585",
    },
    {
      id: "22819",
      name: "Xã Quảng Sơn",
      DistrictId: "585",
    },
    {
      id: "22822",
      name: "Xã Mỹ Sơn",
      DistrictId: "585",
    },
    {
      id: "22825",
      name: "Xã Hòa Sơn",
      DistrictId: "585",
    },
    {
      id: "22828",
      name: "Xã Ma Nới",
      DistrictId: "585",
    },
    {
      id: "22831",
      name: "Xã Nhơn Sơn",
      DistrictId: "585",
    },
    {
      id: "22834",
      name: "Thị trấn Khánh Hải",
      DistrictId: "586",
    },
    {
      id: "22837",
      name: "Xã Phước Chiến",
      DistrictId: "588",
    },
    {
      id: "22840",
      name: "Xã Công Hải",
      DistrictId: "588",
    },
    {
      id: "22843",
      name: "Xã Phước Kháng",
      DistrictId: "588",
    },
    {
      id: "22846",
      name: "Xã Vĩnh Hải",
      DistrictId: "586",
    },
    {
      id: "22849",
      name: "Xã Lợi Hải",
      DistrictId: "588",
    },
    {
      id: "22852",
      name: "Xã Phương Hải",
      DistrictId: "586",
    },
    {
      id: "22853",
      name: "Xã Bắc Sơn",
      DistrictId: "588",
    },
    {
      id: "22855",
      name: "Xã Tân Hải",
      DistrictId: "586",
    },
    {
      id: "22856",
      name: "Xã Bắc Phong",
      DistrictId: "588",
    },
    {
      id: "22858",
      name: "Xã Xuân Hải",
      DistrictId: "586",
    },
    {
      id: "22861",
      name: "Xã Hộ Hải",
      DistrictId: "586",
    },
    {
      id: "22864",
      name: "Xã Tri Hải",
      DistrictId: "586",
    },
    {
      id: "22867",
      name: "Xã Nhơn Hải",
      DistrictId: "586",
    },
    {
      id: "22868",
      name: "Xã Thanh Hải",
      DistrictId: "586",
    },
    {
      id: "22870",
      name: "Thị trấn Phước Dân",
      DistrictId: "587",
    },
    {
      id: "22873",
      name: "Xã Phước Sơn",
      DistrictId: "587",
    },
    {
      id: "22876",
      name: "Xã Phước Thái",
      DistrictId: "587",
    },
    {
      id: "22879",
      name: "Xã Phước Hậu",
      DistrictId: "587",
    },
    {
      id: "22882",
      name: "Xã Phước Thuận",
      DistrictId: "587",
    },
    {
      id: "22885",
      name: "Xã Phước Hà",
      DistrictId: "589",
    },
    {
      id: "22888",
      name: "Xã An Hải",
      DistrictId: "587",
    },
    {
      id: "22891",
      name: "Xã Phước Hữu",
      DistrictId: "587",
    },
    {
      id: "22894",
      name: "Xã Phước Hải",
      DistrictId: "587",
    },
    {
      id: "22897",
      name: "Xã Phước Nam",
      DistrictId: "589",
    },
    {
      id: "22898",
      name: "Xã Phước Ninh",
      DistrictId: "589",
    },
    {
      id: "22900",
      name: "Xã Nhị Hà",
      DistrictId: "589",
    },
    {
      id: "22903",
      name: "Xã Phước Dinh",
      DistrictId: "589",
    },
    {
      id: "22906",
      name: "Xã Phước Minh",
      DistrictId: "589",
    },
    {
      id: "22909",
      name: "Xã Phước Diêm",
      DistrictId: "589",
    },
    {
      id: "22910",
      name: "Xã Cà Ná",
      DistrictId: "589",
    },
    {
      id: "22912",
      name: "Xã Phước Vinh",
      DistrictId: "587",
    },
    {
      id: "22915",
      name: "Phường Mũi Né",
      DistrictId: "593",
    },
    {
      id: "22918",
      name: "Phường Hàm Tiến",
      DistrictId: "593",
    },
    {
      id: "22921",
      name: "Phường Phú Hài",
      DistrictId: "593",
    },
    {
      id: "22924",
      name: "Phường Phú Thủy",
      DistrictId: "593",
    },
    {
      id: "22927",
      name: "Phường Phú Tài",
      DistrictId: "593",
    },
    {
      id: "22930",
      name: "Phường Phú Trinh",
      DistrictId: "593",
    },
    {
      id: "22933",
      name: "Phường Xuân An",
      DistrictId: "593",
    },
    {
      id: "22936",
      name: "Phường Thanh Hải",
      DistrictId: "593",
    },
    {
      id: "22939",
      name: "Phường Bình Hưng",
      DistrictId: "593",
    },
    {
      id: "22942",
      name: "Phường Đức Nghĩa",
      DistrictId: "593",
    },
    {
      id: "22945",
      name: "Phường Lạc Đạo",
      DistrictId: "593",
    },
    {
      id: "22948",
      name: "Phường Đức Thắng",
      DistrictId: "593",
    },
    {
      id: "22951",
      name: "Phường Hưng Long",
      DistrictId: "593",
    },
    {
      id: "22954",
      name: "Phường Đức Long",
      DistrictId: "593",
    },
    {
      id: "22957",
      name: "Xã Thiện Nghiệp",
      DistrictId: "593",
    },
    {
      id: "22960",
      name: "Xã Phong Nẫm",
      DistrictId: "593",
    },
    {
      id: "22963",
      name: "Xã Tiến Lợi",
      DistrictId: "593",
    },
    {
      id: "22966",
      name: "Xã Tiến Thành",
      DistrictId: "593",
    },
    {
      id: "22969",
      name: "Thị trấn Liên Hương",
      DistrictId: "595",
    },
    {
      id: "22972",
      name: "Thị trấn Phan Rí Cửa",
      DistrictId: "595",
    },
    {
      id: "22975",
      name: "Xã Phan Dũng",
      DistrictId: "595",
    },
    {
      id: "22978",
      name: "Xã Phong Phú",
      DistrictId: "595",
    },
    {
      id: "22981",
      name: "Xã Vĩnh Hảo",
      DistrictId: "595",
    },
    {
      id: "22984",
      name: "Xã Vĩnh Tân",
      DistrictId: "595",
    },
    {
      id: "22987",
      name: "Xã Phú Lạc",
      DistrictId: "595",
    },
    {
      id: "22990",
      name: "Xã Phước Thể",
      DistrictId: "595",
    },
    {
      id: "22993",
      name: "Xã Hòa Minh",
      DistrictId: "595",
    },
    {
      id: "22996",
      name: "Xã Chí Công",
      DistrictId: "595",
    },
    {
      id: "22999",
      name: "Xã Bình Thạnh",
      DistrictId: "595",
    },
    {
      id: "23005",
      name: "Thị trấn Chợ Lầu",
      DistrictId: "596",
    },
    {
      id: "23008",
      name: "Xã Phan Sơn",
      DistrictId: "596",
    },
    {
      id: "23011",
      name: "Xã Phan Lâm",
      DistrictId: "596",
    },
    {
      id: "23014",
      name: "Xã Bình An",
      DistrictId: "596",
    },
    {
      id: "23017",
      name: "Xã Phan Điền",
      DistrictId: "596",
    },
    {
      id: "23020",
      name: "Xã Hải Ninh",
      DistrictId: "596",
    },
    {
      id: "23023",
      name: "Xã Sông Lũy",
      DistrictId: "596",
    },
    {
      id: "23026",
      name: "Xã Phan Tiến",
      DistrictId: "596",
    },
    {
      id: "23029",
      name: "Xã Sông Bình",
      DistrictId: "596",
    },
    {
      id: "23032",
      name: "Thị trấn Lương Sơn",
      DistrictId: "596",
    },
    {
      id: "23035",
      name: "Xã Phan Hòa",
      DistrictId: "596",
    },
    {
      id: "23038",
      name: "Xã Phan Thanh",
      DistrictId: "596",
    },
    {
      id: "23041",
      name: "Xã Hồng Thái",
      DistrictId: "596",
    },
    {
      id: "23044",
      name: "Xã Phan Hiệp",
      DistrictId: "596",
    },
    {
      id: "23047",
      name: "Xã Bình Tân",
      DistrictId: "596",
    },
    {
      id: "23050",
      name: "Xã Phan Rí Thành",
      DistrictId: "596",
    },
    {
      id: "23053",
      name: "Xã Hòa Thắng",
      DistrictId: "596",
    },
    {
      id: "23056",
      name: "Xã Hồng Phong",
      DistrictId: "596",
    },
    {
      id: "23059",
      name: "Thị trấn Ma Lâm",
      DistrictId: "597",
    },
    {
      id: "23062",
      name: "Thị trấn Phú Long",
      DistrictId: "597",
    },
    {
      id: "23065",
      name: "Xã La Dạ",
      DistrictId: "597",
    },
    {
      id: "23068",
      name: "Xã Đông Tiến",
      DistrictId: "597",
    },
    {
      id: "23071",
      name: "Xã Thuận Hòa",
      DistrictId: "597",
    },
    {
      id: "23074",
      name: "Xã Đông Giang",
      DistrictId: "597",
    },
    {
      id: "23077",
      name: "Xã Hàm Phú",
      DistrictId: "597",
    },
    {
      id: "23080",
      name: "Xã Hồng Liêm",
      DistrictId: "597",
    },
    {
      id: "23083",
      name: "Xã Thuận Minh",
      DistrictId: "597",
    },
    {
      id: "23086",
      name: "Xã Hồng Sơn",
      DistrictId: "597",
    },
    {
      id: "23089",
      name: "Xã Hàm Trí",
      DistrictId: "597",
    },
    {
      id: "23092",
      name: "Xã Hàm Đức",
      DistrictId: "597",
    },
    {
      id: "23095",
      name: "Xã Hàm Liêm",
      DistrictId: "597",
    },
    {
      id: "23098",
      name: "Xã Hàm Chính",
      DistrictId: "597",
    },
    {
      id: "23101",
      name: "Xã Hàm Hiệp",
      DistrictId: "597",
    },
    {
      id: "23104",
      name: "Xã Hàm Thắng",
      DistrictId: "597",
    },
    {
      id: "23107",
      name: "Xã Đa Mi",
      DistrictId: "597",
    },
    {
      id: "23110",
      name: "Thị trấn Thuận Nam",
      DistrictId: "598",
    },
    {
      id: "23113",
      name: "Xã Mỹ Thạnh",
      DistrictId: "598",
    },
    {
      id: "23116",
      name: "Xã Hàm Cần",
      DistrictId: "598",
    },
    {
      id: "23119",
      name: "Xã Mương Mán",
      DistrictId: "598",
    },
    {
      id: "23122",
      name: "Xã Hàm Thạnh",
      DistrictId: "598",
    },
    {
      id: "23125",
      name: "Xã Hàm Kiệm",
      DistrictId: "598",
    },
    {
      id: "23128",
      name: "Xã Hàm Cường",
      DistrictId: "598",
    },
    {
      id: "23131",
      name: "Xã Hàm Mỹ",
      DistrictId: "598",
    },
    {
      id: "23134",
      name: "Xã Tân Lập",
      DistrictId: "598",
    },
    {
      id: "23137",
      name: "Xã Hàm Minh",
      DistrictId: "598",
    },
    {
      id: "23140",
      name: "Xã Thuận Quí",
      DistrictId: "598",
    },
    {
      id: "23143",
      name: "Xã Tân Thuận",
      DistrictId: "598",
    },
    {
      id: "23146",
      name: "Xã Tân Thành",
      DistrictId: "598",
    },
    {
      id: "23149",
      name: "Thị trấn Lạc Tánh",
      DistrictId: "599",
    },
    {
      id: "23152",
      name: "Xã Bắc Ruộng",
      DistrictId: "599",
    },
    {
      id: "23158",
      name: "Xã Nghị Đức",
      DistrictId: "599",
    },
    {
      id: "23161",
      name: "Xã La Ngâu",
      DistrictId: "599",
    },
    {
      id: "23164",
      name: "Xã Huy Khiêm",
      DistrictId: "599",
    },
    {
      id: "23167",
      name: "Xã Măng Tố",
      DistrictId: "599",
    },
    {
      id: "23170",
      name: "Xã Đức Phú",
      DistrictId: "599",
    },
    {
      id: "23173",
      name: "Xã Đồng Kho",
      DistrictId: "599",
    },
    {
      id: "23176",
      name: "Xã Gia An",
      DistrictId: "599",
    },
    {
      id: "23179",
      name: "Xã Đức Bình",
      DistrictId: "599",
    },
    {
      id: "23182",
      name: "Xã Gia Huynh",
      DistrictId: "599",
    },
    {
      id: "23185",
      name: "Xã Đức Thuận",
      DistrictId: "599",
    },
    {
      id: "23188",
      name: "Xã Suối Kiết",
      DistrictId: "599",
    },
    {
      id: "23191",
      name: "Thị trấn Võ Xu",
      DistrictId: "600",
    },
    {
      id: "23194",
      name: "Thị trấn Đức Tài",
      DistrictId: "600",
    },
    {
      id: "23197",
      name: "Xã Đa Kai",
      DistrictId: "600",
    },
    {
      id: "23200",
      name: "Xã Sùng Nhơn",
      DistrictId: "600",
    },
    {
      id: "23203",
      name: "Xã Mê Pu",
      DistrictId: "600",
    },
    {
      id: "23206",
      name: "Xã Nam Chính",
      DistrictId: "600",
    },
    {
      id: "23212",
      name: "Xã Đức Hạnh",
      DistrictId: "600",
    },
    {
      id: "23215",
      name: "Xã Đức Tín",
      DistrictId: "600",
    },
    {
      id: "23218",
      name: "Xã Vũ Hoà",
      DistrictId: "600",
    },
    {
      id: "23221",
      name: "Xã Tân Hà",
      DistrictId: "600",
    },
    {
      id: "23224",
      name: "Xã Đông Hà",
      DistrictId: "600",
    },
    {
      id: "23227",
      name: "Xã Trà Tân",
      DistrictId: "600",
    },
    {
      id: "23230",
      name: "Thị trấn Tân Minh",
      DistrictId: "601",
    },
    {
      id: "23231",
      name: "Phường Phước Hội",
      DistrictId: "594",
    },
    {
      id: "23232",
      name: "Phường Phước Lộc",
      DistrictId: "594",
    },
    {
      id: "23234",
      name: "Phường Tân Thiện",
      DistrictId: "594",
    },
    {
      id: "23235",
      name: "Phường Tân An",
      DistrictId: "594",
    },
    {
      id: "23236",
      name: "Thị trấn Tân Nghĩa",
      DistrictId: "601",
    },
    {
      id: "23237",
      name: "Phường Bình Tân",
      DistrictId: "594",
    },
    {
      id: "23239",
      name: "Xã Sông Phan",
      DistrictId: "601",
    },
    {
      id: "23242",
      name: "Xã Tân Phúc",
      DistrictId: "601",
    },
    {
      id: "23245",
      name: "Xã Tân Hải",
      DistrictId: "594",
    },
    {
      id: "23246",
      name: "Xã Tân Tiến",
      DistrictId: "594",
    },
    {
      id: "23248",
      name: "Xã Tân Bình",
      DistrictId: "594",
    },
    {
      id: "23251",
      name: "Xã Tân Đức",
      DistrictId: "601",
    },
    {
      id: "23254",
      name: "Xã Tân Thắng",
      DistrictId: "601",
    },
    {
      id: "23255",
      name: "Xã Thắng Hải",
      DistrictId: "601",
    },
    {
      id: "23257",
      name: "Xã Tân Hà",
      DistrictId: "601",
    },
    {
      id: "23260",
      name: "Xã Tân Xuân",
      DistrictId: "601",
    },
    {
      id: "23266",
      name: "Xã Sơn Mỹ",
      DistrictId: "601",
    },
    {
      id: "23268",
      name: "Xã Tân Phước",
      DistrictId: "594",
    },
    {
      id: "23272",
      name: "Xã Ngũ Phụng",
      DistrictId: "602",
    },
    {
      id: "23275",
      name: "Xã Long Hải",
      DistrictId: "602",
    },
    {
      id: "23278",
      name: "Xã Tam Thanh",
      DistrictId: "602",
    },
    {
      id: "23281",
      name: "Phường Quang Trung",
      DistrictId: "608",
    },
    {
      id: "23284",
      name: "Phường Duy Tân",
      DistrictId: "608",
    },
    {
      id: "23287",
      name: "Phường Quyết Thắng",
      DistrictId: "608",
    },
    {
      id: "23290",
      name: "Phường Trường Chinh",
      DistrictId: "608",
    },
    {
      id: "23293",
      name: "Phường Thắng Lợi",
      DistrictId: "608",
    },
    {
      id: "23296",
      name: "Phường Ngô Mây",
      DistrictId: "608",
    },
    {
      id: "23299",
      name: "Phường Thống Nhất",
      DistrictId: "608",
    },
    {
      id: "23302",
      name: "Phường Lê Lợi",
      DistrictId: "608",
    },
    {
      id: "23305",
      name: "Phường Nguyễn Trãi",
      DistrictId: "608",
    },
    {
      id: "23308",
      name: "Phường Trần Hưng Đạo",
      DistrictId: "608",
    },
    {
      id: "23311",
      name: "Xã Đắk Cấm",
      DistrictId: "608",
    },
    {
      id: "23314",
      name: "Xã Kroong",
      DistrictId: "608",
    },
    {
      id: "23317",
      name: "Xã Ngọk Bay",
      DistrictId: "608",
    },
    {
      id: "23320",
      name: "Xã Vinh Quang",
      DistrictId: "608",
    },
    {
      id: "23323",
      name: "Xã Đắk Blà",
      DistrictId: "608",
    },
    {
      id: "23326",
      name: "Xã Ia Chim",
      DistrictId: "608",
    },
    {
      id: "23327",
      name: "Xã Đăk Năng",
      DistrictId: "608",
    },
    {
      id: "23329",
      name: "Xã Đoàn Kết",
      DistrictId: "608",
    },
    {
      id: "23332",
      name: "Xã Chư Hreng",
      DistrictId: "608",
    },
    {
      id: "23335",
      name: "Xã Đắk Rơ Wa",
      DistrictId: "608",
    },
    {
      id: "23338",
      name: "Xã Hòa Bình",
      DistrictId: "608",
    },
    {
      id: "23341",
      name: "Thị trấn Đắk Glei",
      DistrictId: "610",
    },
    {
      id: "23344",
      name: "Xã Đắk Blô",
      DistrictId: "610",
    },
    {
      id: "23347",
      name: "Xã Đắk Man",
      DistrictId: "610",
    },
    {
      id: "23350",
      name: "Xã Đắk Nhoong",
      DistrictId: "610",
    },
    {
      id: "23353",
      name: "Xã Đắk Pék",
      DistrictId: "610",
    },
    {
      id: "23356",
      name: "Xã Đắk Choong",
      DistrictId: "610",
    },
    {
      id: "23359",
      name: "Xã Xốp",
      DistrictId: "610",
    },
    {
      id: "23362",
      name: "Xã Mường Hoong",
      DistrictId: "610",
    },
    {
      id: "23365",
      name: "Xã Ngọc Linh",
      DistrictId: "610",
    },
    {
      id: "23368",
      name: "Xã Đắk Long",
      DistrictId: "610",
    },
    {
      id: "23371",
      name: "Xã Đắk KRoong",
      DistrictId: "610",
    },
    {
      id: "23374",
      name: "Xã Đắk Môn",
      DistrictId: "610",
    },
    {
      id: "23377",
      name: "Thị trấn Plei Kần",
      DistrictId: "611",
    },
    {
      id: "23380",
      name: "Xã Đắk Ang",
      DistrictId: "611",
    },
    {
      id: "23383",
      name: "Xã Đắk Dục",
      DistrictId: "611",
    },
    {
      id: "23386",
      name: "Xã Đắk Nông",
      DistrictId: "611",
    },
    {
      id: "23389",
      name: "Xã Đắk Xú",
      DistrictId: "611",
    },
    {
      id: "23392",
      name: "Xã Đắk Kan",
      DistrictId: "611",
    },
    {
      id: "23395",
      name: "Xã Bờ Y",
      DistrictId: "611",
    },
    {
      id: "23398",
      name: "Xã Sa Loong",
      DistrictId: "611",
    },
    {
      id: "23401",
      name: "Thị trấn Đắk Tô",
      DistrictId: "612",
    },
    {
      id: "23404",
      name: "Xã Ngọc Lây",
      DistrictId: "617",
    },
    {
      id: "23407",
      name: "Xã Đắk Na",
      DistrictId: "617",
    },
    {
      id: "23410",
      name: "Xã Măng Ri",
      DistrictId: "617",
    },
    {
      id: "23413",
      name: "Xã Ngọc Yêu",
      DistrictId: "617",
    },
    {
      id: "23416",
      name: "Xã Đắk Sao",
      DistrictId: "617",
    },
    {
      id: "23417",
      name: "Xã Đắk Rơ Ông",
      DistrictId: "617",
    },
    {
      id: "23419",
      name: "Xã Đắk Tờ Kan",
      DistrictId: "617",
    },
    {
      id: "23422",
      name: "Xã Tu Mơ Rông",
      DistrictId: "617",
    },
    {
      id: "23425",
      name: "Xã Đắk Hà",
      DistrictId: "617",
    },
    {
      id: "23427",
      name: "Xã Đắk Rơ Nga",
      DistrictId: "612",
    },
    {
      id: "23428",
      name: "Xã Ngọk Tụ",
      DistrictId: "612",
    },
    {
      id: "23430",
      name: "Xã Đắk Trăm",
      DistrictId: "612",
    },
    {
      id: "23431",
      name: "Xã Văn Lem",
      DistrictId: "612",
    },
    {
      id: "23434",
      name: "Xã Kon Đào",
      DistrictId: "612",
    },
    {
      id: "23437",
      name: "Xã Tân Cảnh",
      DistrictId: "612",
    },
    {
      id: "23440",
      name: "Xã Diên Bình",
      DistrictId: "612",
    },
    {
      id: "23443",
      name: "Xã Pô Kô",
      DistrictId: "612",
    },
    {
      id: "23446",
      name: "Xã Tê Xăng",
      DistrictId: "617",
    },
    {
      id: "23449",
      name: "Xã Văn Xuôi",
      DistrictId: "617",
    },
    {
      id: "23452",
      name: "Xã Đắk Nên",
      DistrictId: "613",
    },
    {
      id: "23455",
      name: "Xã Đắk Ring",
      DistrictId: "613",
    },
    {
      id: "23458",
      name: "Xã Măng Buk",
      DistrictId: "613",
    },
    {
      id: "23461",
      name: "Xã Đắk Tăng",
      DistrictId: "613",
    },
    {
      id: "23464",
      name: "Xã Ngok Tem",
      DistrictId: "613",
    },
    {
      id: "23467",
      name: "Xã Pờ Ê",
      DistrictId: "613",
    },
    {
      id: "23470",
      name: "Xã Măng Cành",
      DistrictId: "613",
    },
    {
      id: "23473",
      name: "Thị trấn Măng Đen",
      DistrictId: "613",
    },
    {
      id: "23476",
      name: "Xã Hiếu",
      DistrictId: "613",
    },
    {
      id: "23479",
      name: "Thị trấn Đắk Rve",
      DistrictId: "614",
    },
    {
      id: "23482",
      name: "Xã Đắk Kôi",
      DistrictId: "614",
    },
    {
      id: "23485",
      name: "Xã Đắk Tơ Lung",
      DistrictId: "614",
    },
    {
      id: "23488",
      name: "Xã Đắk Ruồng",
      DistrictId: "614",
    },
    {
      id: "23491",
      name: "Xã Đắk Pne",
      DistrictId: "614",
    },
    {
      id: "23494",
      name: "Xã Đắk Tờ Re",
      DistrictId: "614",
    },
    {
      id: "23497",
      name: "Xã Tân Lập",
      DistrictId: "614",
    },
    {
      id: "23500",
      name: "Thị trấn Đắk Hà",
      DistrictId: "615",
    },
    {
      id: "23503",
      name: "Xã Đắk PXi",
      DistrictId: "615",
    },
    {
      id: "23504",
      name: "Xã Đăk Long",
      DistrictId: "615",
    },
    {
      id: "23506",
      name: "Xã Đắk HRing",
      DistrictId: "615",
    },
    {
      id: "23509",
      name: "Xã Đắk Ui",
      DistrictId: "615",
    },
    {
      id: "23510",
      name: "Xã Đăk Ngọk",
      DistrictId: "615",
    },
    {
      id: "23512",
      name: "Xã Đắk Mar",
      DistrictId: "615",
    },
    {
      id: "23515",
      name: "Xã Ngok Wang",
      DistrictId: "615",
    },
    {
      id: "23518",
      name: "Xã Ngok Réo",
      DistrictId: "615",
    },
    {
      id: "23521",
      name: "Xã Hà Mòn",
      DistrictId: "615",
    },
    {
      id: "23524",
      name: "Xã Đắk La",
      DistrictId: "615",
    },
    {
      id: "23527",
      name: "Thị trấn Sa Thầy",
      DistrictId: "616",
    },
    {
      id: "23530",
      name: "Xã Rơ Kơi",
      DistrictId: "616",
    },
    {
      id: "23533",
      name: "Xã Sa Nhơn",
      DistrictId: "616",
    },
    {
      id: "23534",
      name: "Xã Hơ Moong",
      DistrictId: "616",
    },
    {
      id: "23535",
      name: "Xã Ia Đal",
      DistrictId: "618",
    },
    {
      id: "23536",
      name: "Xã Mô Rai",
      DistrictId: "616",
    },
    {
      id: "23537",
      name: "Xã Ia Dom",
      DistrictId: "618",
    },
    {
      id: "23538",
      name: "Xã Ia Tơi",
      DistrictId: "618",
    },
    {
      id: "23539",
      name: "Xã Sa Sơn",
      DistrictId: "616",
    },
    {
      id: "23542",
      name: "Xã Sa Nghĩa",
      DistrictId: "616",
    },
    {
      id: "23545",
      name: "Xã Sa Bình",
      DistrictId: "616",
    },
    {
      id: "23548",
      name: "Xã Ya Xiêr",
      DistrictId: "616",
    },
    {
      id: "23551",
      name: "Xã Ya Tăng",
      DistrictId: "616",
    },
    {
      id: "23554",
      name: "Xã Ya ly",
      DistrictId: "616",
    },
    {
      id: "23557",
      name: "Phường Yên Đỗ",
      DistrictId: "622",
    },
    {
      id: "23560",
      name: "Phường Diên Hồng",
      DistrictId: "622",
    },
    {
      id: "23563",
      name: "Phường Ia Kring",
      DistrictId: "622",
    },
    {
      id: "23566",
      name: "Phường Hội Thương",
      DistrictId: "622",
    },
    {
      id: "23569",
      name: "Phường Hội Phú",
      DistrictId: "622",
    },
    {
      id: "23570",
      name: "Phường Phù Đổng",
      DistrictId: "622",
    },
    {
      id: "23572",
      name: "Phường Hoa Lư",
      DistrictId: "622",
    },
    {
      id: "23575",
      name: "Phường Tây Sơn",
      DistrictId: "622",
    },
    {
      id: "23578",
      name: "Phường Thống Nhất",
      DistrictId: "622",
    },
    {
      id: "23579",
      name: "Phường Đống Đa",
      DistrictId: "622",
    },
    {
      id: "23581",
      name: "Phường Trà Bá",
      DistrictId: "622",
    },
    {
      id: "23582",
      name: "Phường Thắng Lợi",
      DistrictId: "622",
    },
    {
      id: "23584",
      name: "Phường Yên Thế",
      DistrictId: "622",
    },
    {
      id: "23586",
      name: "Phường Chi Lăng",
      DistrictId: "622",
    },
    {
      id: "23590",
      name: "Xã Biển Hồ",
      DistrictId: "622",
    },
    {
      id: "23593",
      name: "Xã Tân Sơn",
      DistrictId: "622",
    },
    {
      id: "23596",
      name: "Xã Trà Đa",
      DistrictId: "622",
    },
    {
      id: "23599",
      name: "Xã Chư Á",
      DistrictId: "622",
    },
    {
      id: "23602",
      name: "Xã An Phú",
      DistrictId: "622",
    },
    {
      id: "23605",
      name: "Xã Diên Phú",
      DistrictId: "622",
    },
    {
      id: "23608",
      name: "Xã Ia Kênh",
      DistrictId: "622",
    },
    {
      id: "23611",
      name: "Xã Gào",
      DistrictId: "622",
    },
    {
      id: "23614",
      name: "Phường An Bình",
      DistrictId: "623",
    },
    {
      id: "23617",
      name: "Phường Tây Sơn",
      DistrictId: "623",
    },
    {
      id: "23620",
      name: "Phường An Phú",
      DistrictId: "623",
    },
    {
      id: "23623",
      name: "Phường An Tân",
      DistrictId: "623",
    },
    {
      id: "23626",
      name: "Xã Tú An",
      DistrictId: "623",
    },
    {
      id: "23627",
      name: "Xã Xuân An",
      DistrictId: "623",
    },
    {
      id: "23629",
      name: "Xã Cửu An",
      DistrictId: "623",
    },
    {
      id: "23630",
      name: "Phường An Phước",
      DistrictId: "623",
    },
    {
      id: "23632",
      name: "Xã Song An",
      DistrictId: "623",
    },
    {
      id: "23633",
      name: "Phường Ngô Mây",
      DistrictId: "623",
    },
    {
      id: "23635",
      name: "Xã Thành An",
      DistrictId: "623",
    },
    {
      id: "23638",
      name: "Thị trấn KBang",
      DistrictId: "625",
    },
    {
      id: "23641",
      name: "Xã Kon Pne",
      DistrictId: "625",
    },
    {
      id: "23644",
      name: "Xã Đăk Roong",
      DistrictId: "625",
    },
    {
      id: "23647",
      name: "Xã Sơn Lang",
      DistrictId: "625",
    },
    {
      id: "23650",
      name: "Xã KRong",
      DistrictId: "625",
    },
    {
      id: "23653",
      name: "Xã Sơ Pai",
      DistrictId: "625",
    },
    {
      id: "23656",
      name: "Xã Lơ Ku",
      DistrictId: "625",
    },
    {
      id: "23659",
      name: "Xã Đông",
      DistrictId: "625",
    },
    {
      id: "23660",
      name: "Xã Đak SMar",
      DistrictId: "625",
    },
    {
      id: "23662",
      name: "Xã Nghĩa An",
      DistrictId: "625",
    },
    {
      id: "23665",
      name: "Xã Tơ Tung",
      DistrictId: "625",
    },
    {
      id: "23668",
      name: "Xã Kông Lơng Khơng",
      DistrictId: "625",
    },
    {
      id: "23671",
      name: "Xã Kông Pla",
      DistrictId: "625",
    },
    {
      id: "23674",
      name: "Xã Đăk HLơ",
      DistrictId: "625",
    },
    {
      id: "23677",
      name: "Thị trấn Đăk Đoa",
      DistrictId: "626",
    },
    {
      id: "23680",
      name: "Xã Hà Đông",
      DistrictId: "626",
    },
    {
      id: "23683",
      name: "Xã Đăk Sơmei",
      DistrictId: "626",
    },
    {
      id: "23684",
      name: "Xã Đăk Krong",
      DistrictId: "626",
    },
    {
      id: "23686",
      name: "Xã Hải Yang",
      DistrictId: "626",
    },
    {
      id: "23689",
      name: "Xã Kon Gang",
      DistrictId: "626",
    },
    {
      id: "23692",
      name: "Xã Hà Bầu",
      DistrictId: "626",
    },
    {
      id: "23695",
      name: "Xã Nam Yang",
      DistrictId: "626",
    },
    {
      id: "23698",
      name: "Xã K' Dang",
      DistrictId: "626",
    },
    {
      id: "23701",
      name: "Xã H' Neng",
      DistrictId: "626",
    },
    {
      id: "23704",
      name: "Xã Tân Bình",
      DistrictId: "626",
    },
    {
      id: "23707",
      name: "Xã Glar",
      DistrictId: "626",
    },
    {
      id: "23710",
      name: "Xã A Dơk",
      DistrictId: "626",
    },
    {
      id: "23713",
      name: "Xã Trang",
      DistrictId: "626",
    },
    {
      id: "23714",
      name: "Xã HNol",
      DistrictId: "626",
    },
    {
      id: "23716",
      name: "Xã Ia Pết",
      DistrictId: "626",
    },
    {
      id: "23719",
      name: "Xã Ia Băng",
      DistrictId: "626",
    },
    {
      id: "23722",
      name: "Thị trấn Phú Hòa",
      DistrictId: "627",
    },
    {
      id: "23725",
      name: "Xã Hà Tây",
      DistrictId: "627",
    },
    {
      id: "23728",
      name: "Xã Ia Khươl",
      DistrictId: "627",
    },
    {
      id: "23731",
      name: "Xã Ia Phí",
      DistrictId: "627",
    },
    {
      id: "23734",
      name: "Thị trấn Ia Ly",
      DistrictId: "627",
    },
    {
      id: "23737",
      name: "Xã Ia Mơ Nông",
      DistrictId: "627",
    },
    {
      id: "23738",
      name: "Xã Ia Kreng",
      DistrictId: "627",
    },
    {
      id: "23740",
      name: "Xã Đăk Tơ Ver",
      DistrictId: "627",
    },
    {
      id: "23743",
      name: "Xã Hòa Phú",
      DistrictId: "627",
    },
    {
      id: "23746",
      name: "Xã Chư Đăng Ya",
      DistrictId: "627",
    },
    {
      id: "23749",
      name: "Xã Ia Ka",
      DistrictId: "627",
    },
    {
      id: "23752",
      name: "Xã Ia Nhin",
      DistrictId: "627",
    },
    {
      id: "23755",
      name: "Xã Nghĩa Hòa",
      DistrictId: "627",
    },
    {
      id: "23761",
      name: "Xã Nghĩa Hưng",
      DistrictId: "627",
    },
    {
      id: "23764",
      name: "Thị trấn Ia Kha",
      DistrictId: "628",
    },
    {
      id: "23767",
      name: "Xã Ia Sao",
      DistrictId: "628",
    },
    {
      id: "23768",
      name: "Xã Ia Yok",
      DistrictId: "628",
    },
    {
      id: "23770",
      name: "Xã Ia Hrung",
      DistrictId: "628",
    },
    {
      id: "23771",
      name: "Xã Ia Bă",
      DistrictId: "628",
    },
    {
      id: "23773",
      name: "Xã Ia Khai",
      DistrictId: "628",
    },
    {
      id: "23776",
      name: "Xã Ia KRai",
      DistrictId: "628",
    },
    {
      id: "23778",
      name: "Xã Ia Grăng",
      DistrictId: "628",
    },
    {
      id: "23779",
      name: "Xã Ia Tô",
      DistrictId: "628",
    },
    {
      id: "23782",
      name: "Xã Ia O",
      DistrictId: "628",
    },
    {
      id: "23785",
      name: "Xã Ia Dêr",
      DistrictId: "628",
    },
    {
      id: "23788",
      name: "Xã Ia Chia",
      DistrictId: "628",
    },
    {
      id: "23791",
      name: "Xã Ia Pếch",
      DistrictId: "628",
    },
    {
      id: "23794",
      name: "Thị trấn Kon Dơng",
      DistrictId: "629",
    },
    {
      id: "23797",
      name: "Xã Ayun",
      DistrictId: "629",
    },
    {
      id: "23798",
      name: "Xã Đak Jơ Ta",
      DistrictId: "629",
    },
    {
      id: "23799",
      name: "Xã Đak Ta Ley",
      DistrictId: "629",
    },
    {
      id: "23800",
      name: "Xã Hra",
      DistrictId: "629",
    },
    {
      id: "23803",
      name: "Xã Đăk Yă",
      DistrictId: "629",
    },
    {
      id: "23806",
      name: "Xã Đăk Djrăng",
      DistrictId: "629",
    },
    {
      id: "23809",
      name: "Xã Lơ Pang",
      DistrictId: "629",
    },
    {
      id: "23812",
      name: "Xã Kon Thụp",
      DistrictId: "629",
    },
    {
      id: "23815",
      name: "Xã Đê Ar",
      DistrictId: "629",
    },
    {
      id: "23818",
      name: "Xã Kon Chiêng",
      DistrictId: "629",
    },
    {
      id: "23821",
      name: "Xã Đăk Trôi",
      DistrictId: "629",
    },
    {
      id: "23824",
      name: "Thị trấn Kông Chro",
      DistrictId: "630",
    },
    {
      id: "23827",
      name: "Xã Chư Krêy",
      DistrictId: "630",
    },
    {
      id: "23830",
      name: "Xã An Trung",
      DistrictId: "630",
    },
    {
      id: "23833",
      name: "Xã Kông Yang",
      DistrictId: "630",
    },
    {
      id: "23836",
      name: "Xã Đăk Tơ Pang",
      DistrictId: "630",
    },
    {
      id: "23839",
      name: "Xã SRó",
      DistrictId: "630",
    },
    {
      id: "23840",
      name: "Xã Đắk Kơ Ning",
      DistrictId: "630",
    },
    {
      id: "23842",
      name: "Xã Đăk Song",
      DistrictId: "630",
    },
    {
      id: "23843",
      name: "Xã Đăk Pling",
      DistrictId: "630",
    },
    {
      id: "23845",
      name: "Xã Yang Trung",
      DistrictId: "630",
    },
    {
      id: "23846",
      name: "Xã Đăk Pơ Pho",
      DistrictId: "630",
    },
    {
      id: "23848",
      name: "Xã Ya Ma",
      DistrictId: "630",
    },
    {
      id: "23851",
      name: "Xã Chơ Long",
      DistrictId: "630",
    },
    {
      id: "23854",
      name: "Xã Yang Nam",
      DistrictId: "630",
    },
    {
      id: "23857",
      name: "Thị trấn Chư Ty",
      DistrictId: "631",
    },
    {
      id: "23860",
      name: "Xã Ia Dơk",
      DistrictId: "631",
    },
    {
      id: "23863",
      name: "Xã Ia Krêl",
      DistrictId: "631",
    },
    {
      id: "23866",
      name: "Xã Ia Din",
      DistrictId: "631",
    },
    {
      id: "23869",
      name: "Xã Ia Kla",
      DistrictId: "631",
    },
    {
      id: "23872",
      name: "Xã Ia Dom",
      DistrictId: "631",
    },
    {
      id: "23875",
      name: "Xã Ia Lang",
      DistrictId: "631",
    },
    {
      id: "23878",
      name: "Xã Ia Kriêng",
      DistrictId: "631",
    },
    {
      id: "23881",
      name: "Xã Ia Pnôn",
      DistrictId: "631",
    },
    {
      id: "23884",
      name: "Xã Ia Nan",
      DistrictId: "631",
    },
    {
      id: "23887",
      name: "Thị trấn Chư Prông",
      DistrictId: "632",
    },
    {
      id: "23888",
      name: "Xã Ia Kly",
      DistrictId: "632",
    },
    {
      id: "23890",
      name: "Xã Bình Giáo",
      DistrictId: "632",
    },
    {
      id: "23893",
      name: "Xã Ia Drăng",
      DistrictId: "632",
    },
    {
      id: "23896",
      name: "Xã Thăng Hưng",
      DistrictId: "632",
    },
    {
      id: "23899",
      name: "Xã Bàu Cạn",
      DistrictId: "632",
    },
    {
      id: "23902",
      name: "Xã Ia Phìn",
      DistrictId: "632",
    },
    {
      id: "23905",
      name: "Xã Ia Băng",
      DistrictId: "632",
    },
    {
      id: "23908",
      name: "Xã Ia Tôr",
      DistrictId: "632",
    },
    {
      id: "23911",
      name: "Xã Ia Boòng",
      DistrictId: "632",
    },
    {
      id: "23914",
      name: "Xã Ia O",
      DistrictId: "632",
    },
    {
      id: "23917",
      name: "Xã Ia Púch",
      DistrictId: "632",
    },
    {
      id: "23920",
      name: "Xã Ia Me",
      DistrictId: "632",
    },
    {
      id: "23923",
      name: "Xã Ia Vê",
      DistrictId: "632",
    },
    {
      id: "23924",
      name: "Xã Ia Bang",
      DistrictId: "632",
    },
    {
      id: "23926",
      name: "Xã Ia Pia",
      DistrictId: "632",
    },
    {
      id: "23929",
      name: "Xã Ia Ga",
      DistrictId: "632",
    },
    {
      id: "23932",
      name: "Xã Ia Lâu",
      DistrictId: "632",
    },
    {
      id: "23935",
      name: "Xã Ia Piơr",
      DistrictId: "632",
    },
    {
      id: "23938",
      name: "Xã Ia Mơ",
      DistrictId: "632",
    },
    {
      id: "23941",
      name: "Thị trấn Chư Sê",
      DistrictId: "633",
    },
    {
      id: "23942",
      name: "Thị trấn Nhơn Hoà",
      DistrictId: "639",
    },
    {
      id: "23944",
      name: "Xã Ia Tiêm",
      DistrictId: "633",
    },
    {
      id: "23945",
      name: "Xã Chư Pơng",
      DistrictId: "633",
    },
    {
      id: "23946",
      name: "Xã Bar Măih",
      DistrictId: "633",
    },
    {
      id: "23947",
      name: "Xã Bờ Ngoong",
      DistrictId: "633",
    },
    {
      id: "23950",
      name: "Xã Ia Glai",
      DistrictId: "633",
    },
    {
      id: "23953",
      name: "Xã AL Bá",
      DistrictId: "633",
    },
    {
      id: "23954",
      name: "Xã Kông HTok",
      DistrictId: "633",
    },
    {
      id: "23956",
      name: "Xã AYun",
      DistrictId: "633",
    },
    {
      id: "23959",
      name: "Xã Ia HLốp",
      DistrictId: "633",
    },
    {
      id: "23962",
      name: "Xã Ia Blang",
      DistrictId: "633",
    },
    {
      id: "23965",
      name: "Xã Dun",
      DistrictId: "633",
    },
    {
      id: "23966",
      name: "Xã Ia Pal",
      DistrictId: "633",
    },
    {
      id: "23968",
      name: "Xã H Bông",
      DistrictId: "633",
    },
    {
      id: "23971",
      name: "Xã Ia Hrú",
      DistrictId: "639",
    },
    {
      id: "23972",
      name: "Xã Ia Rong",
      DistrictId: "639",
    },
    {
      id: "23974",
      name: "Xã Ia Dreng",
      DistrictId: "639",
    },
    {
      id: "23977",
      name: "Xã Ia Ko",
      DistrictId: "633",
    },
    {
      id: "23978",
      name: "Xã Ia Hla",
      DistrictId: "639",
    },
    {
      id: "23980",
      name: "Xã Chư Don",
      DistrictId: "639",
    },
    {
      id: "23983",
      name: "Xã Ia Phang",
      DistrictId: "639",
    },
    {
      id: "23986",
      name: "Xã Ia Le",
      DistrictId: "639",
    },
    {
      id: "23987",
      name: "Xã Ia BLứ",
      DistrictId: "639",
    },
    {
      id: "23989",
      name: "Xã Hà Tam",
      DistrictId: "634",
    },
    {
      id: "23992",
      name: "Xã An Thành",
      DistrictId: "634",
    },
    {
      id: "23995",
      name: "Thị trấn Đak Pơ",
      DistrictId: "634",
    },
    {
      id: "23998",
      name: "Xã Yang Bắc",
      DistrictId: "634",
    },
    {
      id: "24001",
      name: "Xã Cư An",
      DistrictId: "634",
    },
    {
      id: "24004",
      name: "Xã Tân An",
      DistrictId: "634",
    },
    {
      id: "24007",
      name: "Xã Phú An",
      DistrictId: "634",
    },
    {
      id: "24010",
      name: "Xã Ya Hội",
      DistrictId: "634",
    },
    {
      id: "24013",
      name: "Xã Pờ Tó",
      DistrictId: "635",
    },
    {
      id: "24016",
      name: "Xã Chư Răng",
      DistrictId: "635",
    },
    {
      id: "24019",
      name: "Xã Ia KDăm",
      DistrictId: "635",
    },
    {
      id: "24022",
      name: "Xã Kim Tân",
      DistrictId: "635",
    },
    {
      id: "24025",
      name: "Xã Chư Mố",
      DistrictId: "635",
    },
    {
      id: "24028",
      name: "Xã Ia Tul",
      DistrictId: "635",
    },
    {
      id: "24031",
      name: "Xã Ia Ma Rơn",
      DistrictId: "635",
    },
    {
      id: "24034",
      name: "Xã Ia Broăi",
      DistrictId: "635",
    },
    {
      id: "24037",
      name: "Xã Ia Trok",
      DistrictId: "635",
    },
    {
      id: "24041",
      name: "Phường Cheo Reo",
      DistrictId: "624",
    },
    {
      id: "24042",
      name: "Phường Hòa Bình",
      DistrictId: "624",
    },
    {
      id: "24043",
      name: "Thị trấn Phú Thiện",
      DistrictId: "638",
    },
    {
      id: "24044",
      name: "Phường Đoàn Kết",
      DistrictId: "624",
    },
    {
      id: "24045",
      name: "Phường Sông Bờ",
      DistrictId: "624",
    },
    {
      id: "24046",
      name: "Xã Chư A Thai",
      DistrictId: "638",
    },
    {
      id: "24048",
      name: "Xã Ayun Hạ",
      DistrictId: "638",
    },
    {
      id: "24049",
      name: "Xã Ia Ake",
      DistrictId: "638",
    },
    {
      id: "24052",
      name: "Xã Ia Sol",
      DistrictId: "638",
    },
    {
      id: "24055",
      name: "Xã Ia Piar",
      DistrictId: "638",
    },
    {
      id: "24058",
      name: "Xã Ia Peng",
      DistrictId: "638",
    },
    {
      id: "24060",
      name: "Xã Chrôh Pơnan",
      DistrictId: "638",
    },
    {
      id: "24061",
      name: "Xã Ia Hiao",
      DistrictId: "638",
    },
    {
      id: "24064",
      name: "Xã Ia RBol",
      DistrictId: "624",
    },
    {
      id: "24065",
      name: "Xã Chư Băh",
      DistrictId: "624",
    },
    {
      id: "24067",
      name: "Xã Ia Yeng",
      DistrictId: "638",
    },
    {
      id: "24070",
      name: "Xã Ia RTô",
      DistrictId: "624",
    },
    {
      id: "24073",
      name: "Xã Ia Sao",
      DistrictId: "624",
    },
    {
      id: "24076",
      name: "Thị trấn Phú Túc",
      DistrictId: "637",
    },
    {
      id: "24079",
      name: "Xã Ia RSai",
      DistrictId: "637",
    },
    {
      id: "24082",
      name: "Xã Ia RSươm",
      DistrictId: "637",
    },
    {
      id: "24085",
      name: "Xã Chư Gu",
      DistrictId: "637",
    },
    {
      id: "24088",
      name: "Xã Đất Bằng",
      DistrictId: "637",
    },
    {
      id: "24091",
      name: "Xã Ia Mláh",
      DistrictId: "637",
    },
    {
      id: "24094",
      name: "Xã Chư Drăng",
      DistrictId: "637",
    },
    {
      id: "24097",
      name: "Xã Phú Cần",
      DistrictId: "637",
    },
    {
      id: "24100",
      name: "Xã Ia HDreh",
      DistrictId: "637",
    },
    {
      id: "24103",
      name: "Xã Ia RMok",
      DistrictId: "637",
    },
    {
      id: "24106",
      name: "Xã Chư Ngọc",
      DistrictId: "637",
    },
    {
      id: "24109",
      name: "Xã Uar",
      DistrictId: "637",
    },
    {
      id: "24112",
      name: "Xã Chư Rcăm",
      DistrictId: "637",
    },
    {
      id: "24115",
      name: "Xã Krông Năng",
      DistrictId: "637",
    },
    {
      id: "24118",
      name: "Phường Tân Lập",
      DistrictId: "643",
    },
    {
      id: "24121",
      name: "Phường Tân Hòa",
      DistrictId: "643",
    },
    {
      id: "24124",
      name: "Phường Tân An",
      DistrictId: "643",
    },
    {
      id: "24127",
      name: "Phường Thống Nhất",
      DistrictId: "643",
    },
    {
      id: "24130",
      name: "Phường Thành Nhất",
      DistrictId: "643",
    },
    {
      id: "24133",
      name: "Phường Thắng Lợi",
      DistrictId: "643",
    },
    {
      id: "24136",
      name: "Phường Tân Lợi",
      DistrictId: "643",
    },
    {
      id: "24139",
      name: "Phường Thành Công",
      DistrictId: "643",
    },
    {
      id: "24142",
      name: "Phường Tân Thành",
      DistrictId: "643",
    },
    {
      id: "24145",
      name: "Phường Tân Tiến",
      DistrictId: "643",
    },
    {
      id: "24148",
      name: "Phường Tự An",
      DistrictId: "643",
    },
    {
      id: "24151",
      name: "Phường Ea Tam",
      DistrictId: "643",
    },
    {
      id: "24154",
      name: "Phường Khánh Xuân",
      DistrictId: "643",
    },
    {
      id: "24157",
      name: "Xã Hòa Thuận",
      DistrictId: "643",
    },
    {
      id: "24160",
      name: "Xã Cư ÊBur",
      DistrictId: "643",
    },
    {
      id: "24163",
      name: "Xã Ea Tu",
      DistrictId: "643",
    },
    {
      id: "24166",
      name: "Xã Hòa Thắng",
      DistrictId: "643",
    },
    {
      id: "24169",
      name: "Xã Ea Kao",
      DistrictId: "643",
    },
    {
      id: "24172",
      name: "Xã Hòa Phú",
      DistrictId: "643",
    },
    {
      id: "24175",
      name: "Xã Hòa Khánh",
      DistrictId: "643",
    },
    {
      id: "24178",
      name: "Xã Hòa Xuân",
      DistrictId: "643",
    },
    {
      id: "24181",
      name: "Thị trấn Ea Drăng",
      DistrictId: "645",
    },
    {
      id: "24184",
      name: "Xã Ea H'leo",
      DistrictId: "645",
    },
    {
      id: "24187",
      name: "Xã Ea Sol",
      DistrictId: "645",
    },
    {
      id: "24190",
      name: "Xã Ea Ral",
      DistrictId: "645",
    },
    {
      id: "24193",
      name: "Xã Ea Wy",
      DistrictId: "645",
    },
    {
      id: "24194",
      name: "Xã Cư A Mung",
      DistrictId: "645",
    },
    {
      id: "24196",
      name: "Xã Cư Mốt",
      DistrictId: "645",
    },
    {
      id: "24199",
      name: "Xã Ea Hiao",
      DistrictId: "645",
    },
    {
      id: "24202",
      name: "Xã Ea Khal",
      DistrictId: "645",
    },
    {
      id: "24205",
      name: "Xã Dliê Yang",
      DistrictId: "645",
    },
    {
      id: "24207",
      name: "Xã Ea Tir",
      DistrictId: "645",
    },
    {
      id: "24208",
      name: "Xã Ea Nam",
      DistrictId: "645",
    },
    {
      id: "24211",
      name: "Thị trấn Ea Súp",
      DistrictId: "646",
    },
    {
      id: "24214",
      name: "Xã Ia Lốp",
      DistrictId: "646",
    },
    {
      id: "24215",
      name: "Xã Ia JLơi",
      DistrictId: "646",
    },
    {
      id: "24217",
      name: "Xã Ea Rốk",
      DistrictId: "646",
    },
    {
      id: "24220",
      name: "Xã Ya Tờ Mốt",
      DistrictId: "646",
    },
    {
      id: "24221",
      name: "Xã Ia RVê",
      DistrictId: "646",
    },
    {
      id: "24223",
      name: "Xã Ea Lê",
      DistrictId: "646",
    },
    {
      id: "24226",
      name: "Xã Cư KBang",
      DistrictId: "646",
    },
    {
      id: "24229",
      name: "Xã Ea Bung",
      DistrictId: "646",
    },
    {
      id: "24232",
      name: "Xã Cư M'Lan",
      DistrictId: "646",
    },
    {
      id: "24235",
      name: "Xã Krông Na",
      DistrictId: "647",
    },
    {
      id: "24238",
      name: "Xã Ea Huar",
      DistrictId: "647",
    },
    {
      id: "24241",
      name: "Xã Ea Wer",
      DistrictId: "647",
    },
    {
      id: "24244",
      name: "Xã Tân Hoà",
      DistrictId: "647",
    },
    {
      id: "24247",
      name: "Xã Cuôr KNia",
      DistrictId: "647",
    },
    {
      id: "24250",
      name: "Xã Ea Bar",
      DistrictId: "647",
    },
    {
      id: "24253",
      name: "Xã Ea Nuôl",
      DistrictId: "647",
    },
    {
      id: "24256",
      name: "Thị trấn Ea Pốk",
      DistrictId: "648",
    },
    {
      id: "24259",
      name: "Thị trấn Quảng Phú",
      DistrictId: "648",
    },
    {
      id: "24262",
      name: "Xã Quảng Tiến",
      DistrictId: "648",
    },
    {
      id: "24264",
      name: "Xã Ea Kuêh",
      DistrictId: "648",
    },
    {
      id: "24265",
      name: "Xã Ea Kiết",
      DistrictId: "648",
    },
    {
      id: "24268",
      name: "Xã Ea Tar",
      DistrictId: "648",
    },
    {
      id: "24271",
      name: "Xã Cư Dliê M'nông",
      DistrictId: "648",
    },
    {
      id: "24274",
      name: "Xã Ea H'đinh",
      DistrictId: "648",
    },
    {
      id: "24277",
      name: "Xã Ea Tul",
      DistrictId: "648",
    },
    {
      id: "24280",
      name: "Xã Ea KPam",
      DistrictId: "648",
    },
    {
      id: "24283",
      name: "Xã Ea M'DRóh",
      DistrictId: "648",
    },
    {
      id: "24286",
      name: "Xã Quảng Hiệp",
      DistrictId: "648",
    },
    {
      id: "24289",
      name: "Xã Cư M'gar",
      DistrictId: "648",
    },
    {
      id: "24292",
      name: "Xã Ea D'Rơng",
      DistrictId: "648",
    },
    {
      id: "24295",
      name: "Xã Ea M'nang",
      DistrictId: "648",
    },
    {
      id: "24298",
      name: "Xã Cư Suê",
      DistrictId: "648",
    },
    {
      id: "24301",
      name: "Xã Cuor Đăng",
      DistrictId: "648",
    },
    {
      id: "24305",
      name: "Phường An Lạc",
      DistrictId: "644",
    },
    {
      id: "24307",
      name: "Xã Cư Né",
      DistrictId: "649",
    },
    {
      id: "24308",
      name: "Phường An Bình",
      DistrictId: "644",
    },
    {
      id: "24310",
      name: "Xã Chư KBô",
      DistrictId: "649",
    },
    {
      id: "24311",
      name: "Phường Thiện An",
      DistrictId: "644",
    },
    {
      id: "24313",
      name: "Xã Cư Pơng",
      DistrictId: "649",
    },
    {
      id: "24314",
      name: "Xã Ea Sin",
      DistrictId: "649",
    },
    {
      id: "24316",
      name: "Xã Pơng Drang",
      DistrictId: "649",
    },
    {
      id: "24317",
      name: "Xã Tân Lập",
      DistrictId: "649",
    },
    {
      id: "24318",
      name: "Phường Đạt Hiếu",
      DistrictId: "644",
    },
    {
      id: "24319",
      name: "Xã Ea Ngai",
      DistrictId: "649",
    },
    {
      id: "24322",
      name: "Phường Đoàn Kết",
      DistrictId: "644",
    },
    {
      id: "24325",
      name: "Xã Ea Blang",
      DistrictId: "644",
    },
    {
      id: "24328",
      name: "Xã Ea Drông",
      DistrictId: "644",
    },
    {
      id: "24331",
      name: "Phường Thống Nhất",
      DistrictId: "644",
    },
    {
      id: "24332",
      name: "Phường Bình Tân",
      DistrictId: "644",
    },
    {
      id: "24334",
      name: "Xã Ea Siên",
      DistrictId: "644",
    },
    {
      id: "24337",
      name: "Xã Bình Thuận",
      DistrictId: "644",
    },
    {
      id: "24340",
      name: "Xã Cư Bao",
      DistrictId: "644",
    },
    {
      id: "24343",
      name: "Thị trấn Krông Năng",
      DistrictId: "650",
    },
    {
      id: "24346",
      name: "Xã ĐLiê Ya",
      DistrictId: "650",
    },
    {
      id: "24349",
      name: "Xã Ea Tóh",
      DistrictId: "650",
    },
    {
      id: "24352",
      name: "Xã Ea Tam",
      DistrictId: "650",
    },
    {
      id: "24355",
      name: "Xã Phú Lộc",
      DistrictId: "650",
    },
    {
      id: "24358",
      name: "Xã Tam Giang",
      DistrictId: "650",
    },
    {
      id: "24359",
      name: "Xã Ea Puk",
      DistrictId: "650",
    },
    {
      id: "24360",
      name: "Xã Ea Dăh",
      DistrictId: "650",
    },
    {
      id: "24361",
      name: "Xã Ea Hồ",
      DistrictId: "650",
    },
    {
      id: "24364",
      name: "Xã Phú Xuân",
      DistrictId: "650",
    },
    {
      id: "24367",
      name: "Xã Cư Klông",
      DistrictId: "650",
    },
    {
      id: "24370",
      name: "Xã Ea Tân",
      DistrictId: "650",
    },
    {
      id: "24373",
      name: "Thị trấn Ea Kar",
      DistrictId: "651",
    },
    {
      id: "24376",
      name: "Thị trấn Ea Knốp",
      DistrictId: "651",
    },
    {
      id: "24379",
      name: "Xã Ea Sô",
      DistrictId: "651",
    },
    {
      id: "24380",
      name: "Xã Ea Sar",
      DistrictId: "651",
    },
    {
      id: "24382",
      name: "Xã Xuân Phú",
      DistrictId: "651",
    },
    {
      id: "24385",
      name: "Xã Cư Huê",
      DistrictId: "651",
    },
    {
      id: "24388",
      name: "Xã Ea Tih",
      DistrictId: "651",
    },
    {
      id: "24391",
      name: "Xã Ea Đar",
      DistrictId: "651",
    },
    {
      id: "24394",
      name: "Xã Ea Kmút",
      DistrictId: "651",
    },
    {
      id: "24397",
      name: "Xã Cư Ni",
      DistrictId: "651",
    },
    {
      id: "24400",
      name: "Xã Ea Păl",
      DistrictId: "651",
    },
    {
      id: "24401",
      name: "Xã Cư Prông",
      DistrictId: "651",
    },
    {
      id: "24403",
      name: "Xã Ea Ô",
      DistrictId: "651",
    },
    {
      id: "24404",
      name: "Xã Cư ELang",
      DistrictId: "651",
    },
    {
      id: "24406",
      name: "Xã Cư Bông",
      DistrictId: "651",
    },
    {
      id: "24409",
      name: "Xã Cư Jang",
      DistrictId: "651",
    },
    {
      id: "24412",
      name: "Thị trấn M'Đrắk",
      DistrictId: "652",
    },
    {
      id: "24415",
      name: "Xã Cư Prao",
      DistrictId: "652",
    },
    {
      id: "24418",
      name: "Xã Ea Pil",
      DistrictId: "652",
    },
    {
      id: "24421",
      name: "Xã Ea Lai",
      DistrictId: "652",
    },
    {
      id: "24424",
      name: "Xã Ea H'MLay",
      DistrictId: "652",
    },
    {
      id: "24427",
      name: "Xã Krông Jing",
      DistrictId: "652",
    },
    {
      id: "24430",
      name: "Xã Ea M' Doal",
      DistrictId: "652",
    },
    {
      id: "24433",
      name: "Xã Ea Riêng",
      DistrictId: "652",
    },
    {
      id: "24436",
      name: "Xã Cư M'ta",
      DistrictId: "652",
    },
    {
      id: "24439",
      name: "Xã Cư K Róa",
      DistrictId: "652",
    },
    {
      id: "24442",
      name: "Xã Krông Á",
      DistrictId: "652",
    },
    {
      id: "24444",
      name: "Xã Cư San",
      DistrictId: "652",
    },
    {
      id: "24445",
      name: "Xã Ea Trang",
      DistrictId: "652",
    },
    {
      id: "24448",
      name: "Thị trấn Krông Kmar",
      DistrictId: "653",
    },
    {
      id: "24451",
      name: "Xã Dang Kang",
      DistrictId: "653",
    },
    {
      id: "24454",
      name: "Xã Cư KTy",
      DistrictId: "653",
    },
    {
      id: "24457",
      name: "Xã Hòa Thành",
      DistrictId: "653",
    },
    {
      id: "24460",
      name: "Xã Hòa Tân",
      DistrictId: "653",
    },
    {
      id: "24463",
      name: "Xã Hòa Phong",
      DistrictId: "653",
    },
    {
      id: "24466",
      name: "Xã Hòa Lễ",
      DistrictId: "653",
    },
    {
      id: "24469",
      name: "Xã Yang Reh",
      DistrictId: "653",
    },
    {
      id: "24472",
      name: "Xã Ea Trul",
      DistrictId: "653",
    },
    {
      id: "24475",
      name: "Xã Khuê Ngọc Điền",
      DistrictId: "653",
    },
    {
      id: "24478",
      name: "Xã Cư Pui",
      DistrictId: "653",
    },
    {
      id: "24481",
      name: "Xã Hòa Sơn",
      DistrictId: "653",
    },
    {
      id: "24484",
      name: "Xã Cư Drăm",
      DistrictId: "653",
    },
    {
      id: "24487",
      name: "Xã Yang Mao",
      DistrictId: "653",
    },
    {
      id: "24490",
      name: "Thị trấn Phước An",
      DistrictId: "654",
    },
    {
      id: "24493",
      name: "Xã KRông Búk",
      DistrictId: "654",
    },
    {
      id: "24496",
      name: "Xã Ea Kly",
      DistrictId: "654",
    },
    {
      id: "24499",
      name: "Xã Ea Kênh",
      DistrictId: "654",
    },
    {
      id: "24502",
      name: "Xã Ea Phê",
      DistrictId: "654",
    },
    {
      id: "24505",
      name: "Xã Ea KNuec",
      DistrictId: "654",
    },
    {
      id: "24508",
      name: "Xã Ea Yông",
      DistrictId: "654",
    },
    {
      id: "24511",
      name: "Xã Hòa An",
      DistrictId: "654",
    },
    {
      id: "24514",
      name: "Xã Ea Kuăng",
      DistrictId: "654",
    },
    {
      id: "24517",
      name: "Xã Hòa Đông",
      DistrictId: "654",
    },
    {
      id: "24520",
      name: "Xã Ea Hiu",
      DistrictId: "654",
    },
    {
      id: "24523",
      name: "Xã Hòa Tiến",
      DistrictId: "654",
    },
    {
      id: "24526",
      name: "Xã Tân Tiến",
      DistrictId: "654",
    },
    {
      id: "24529",
      name: "Xã Vụ Bổn",
      DistrictId: "654",
    },
    {
      id: "24532",
      name: "Xã Ea Uy",
      DistrictId: "654",
    },
    {
      id: "24535",
      name: "Xã Ea Yiêng",
      DistrictId: "654",
    },
    {
      id: "24538",
      name: "Thị trấn Buôn Trấp",
      DistrictId: "655",
    },
    {
      id: "24540",
      name: "Xã Ea Ning",
      DistrictId: "657",
    },
    {
      id: "24541",
      name: "Xã Cư Ê Wi",
      DistrictId: "657",
    },
    {
      id: "24544",
      name: "Xã Ea Ktur",
      DistrictId: "657",
    },
    {
      id: "24547",
      name: "Xã Ea Tiêu",
      DistrictId: "657",
    },
    {
      id: "24550",
      name: "Xã Ea BHốk",
      DistrictId: "657",
    },
    {
      id: "24553",
      name: "Xã Ea Hu",
      DistrictId: "657",
    },
    {
      id: "24556",
      name: "Xã Dray Sáp",
      DistrictId: "655",
    },
    {
      id: "24559",
      name: "Xã Ea Na",
      DistrictId: "655",
    },
    {
      id: "24561",
      name: "Xã Dray Bhăng",
      DistrictId: "657",
    },
    {
      id: "24562",
      name: "Xã Hòa Hiệp",
      DistrictId: "657",
    },
    {
      id: "24565",
      name: "Xã Ea Bông",
      DistrictId: "655",
    },
    {
      id: "24568",
      name: "Xã Băng A Drênh",
      DistrictId: "655",
    },
    {
      id: "24571",
      name: "Xã Dur KMăl",
      DistrictId: "655",
    },
    {
      id: "24574",
      name: "Xã Bình Hòa",
      DistrictId: "655",
    },
    {
      id: "24577",
      name: "Xã Quảng Điền",
      DistrictId: "655",
    },
    {
      id: "24580",
      name: "Thị trấn Liên Sơn",
      DistrictId: "656",
    },
    {
      id: "24583",
      name: "Xã Yang Tao",
      DistrictId: "656",
    },
    {
      id: "24586",
      name: "Xã Bông Krang",
      DistrictId: "656",
    },
    {
      id: "24589",
      name: "Xã Đắk Liêng",
      DistrictId: "656",
    },
    {
      id: "24592",
      name: "Xã Buôn Triết",
      DistrictId: "656",
    },
    {
      id: "24595",
      name: "Xã Buôn Tría",
      DistrictId: "656",
    },
    {
      id: "24598",
      name: "Xã Đắk Phơi",
      DistrictId: "656",
    },
    {
      id: "24601",
      name: "Xã Đắk Nuê",
      DistrictId: "656",
    },
    {
      id: "24604",
      name: "Xã Krông Nô",
      DistrictId: "656",
    },
    {
      id: "24607",
      name: "Xã Nam Ka",
      DistrictId: "656",
    },
    {
      id: "24610",
      name: "Xã Ea R'Bin",
      DistrictId: "656",
    },
    {
      id: "24611",
      name: "Phường Nghĩa Đức",
      DistrictId: "660",
    },
    {
      id: "24612",
      name: "Phường Nghĩa Thành",
      DistrictId: "660",
    },
    {
      id: "24614",
      name: "Phường Nghĩa Phú",
      DistrictId: "660",
    },
    {
      id: "24615",
      name: "Phường Nghĩa Tân",
      DistrictId: "660",
    },
    {
      id: "24616",
      name: "Xã Quảng Sơn",
      DistrictId: "661",
    },
    {
      id: "24617",
      name: "Phường Nghĩa Trung",
      DistrictId: "660",
    },
    {
      id: "24618",
      name: "Xã Đăk R'Moan",
      DistrictId: "660",
    },
    {
      id: "24619",
      name: "Phường Quảng Thành",
      DistrictId: "660",
    },
    {
      id: "24620",
      name: "Xã Quảng Hoà",
      DistrictId: "661",
    },
    {
      id: "24622",
      name: "Xã Đắk Ha",
      DistrictId: "661",
    },
    {
      id: "24625",
      name: "Xã Đắk R'Măng",
      DistrictId: "661",
    },
    {
      id: "24628",
      name: "Xã Đắk Nia",
      DistrictId: "660",
    },
    {
      id: "24631",
      name: "Xã Quảng Khê",
      DistrictId: "661",
    },
    {
      id: "24634",
      name: "Xã Đắk Plao",
      DistrictId: "661",
    },
    {
      id: "24637",
      name: "Xã Đắk Som",
      DistrictId: "661",
    },
    {
      id: "24640",
      name: "Thị trấn Ea T'Ling",
      DistrictId: "662",
    },
    {
      id: "24643",
      name: "Xã Đắk Wil",
      DistrictId: "662",
    },
    {
      id: "24646",
      name: "Xã Ea Pô",
      DistrictId: "662",
    },
    {
      id: "24649",
      name: "Xã Nam Dong",
      DistrictId: "662",
    },
    {
      id: "24652",
      name: "Xã Đắk DRông",
      DistrictId: "662",
    },
    {
      id: "24655",
      name: "Xã Tâm Thắng",
      DistrictId: "662",
    },
    {
      id: "24658",
      name: "Xã Cư Knia",
      DistrictId: "662",
    },
    {
      id: "24661",
      name: "Xã Trúc Sơn",
      DistrictId: "662",
    },
    {
      id: "24664",
      name: "Thị trấn Đắk Mil",
      DistrictId: "663",
    },
    {
      id: "24667",
      name: "Xã  Đắk Lao",
      DistrictId: "663",
    },
    {
      id: "24670",
      name: "Xã Đắk R'La",
      DistrictId: "663",
    },
    {
      id: "24673",
      name: "Xã Đắk Gằn",
      DistrictId: "663",
    },
    {
      id: "24676",
      name: "Xã Đức Mạnh",
      DistrictId: "663",
    },
    {
      id: "24677",
      name: "Xã Đắk N'Drót",
      DistrictId: "663",
    },
    {
      id: "24678",
      name: "Xã Long Sơn",
      DistrictId: "663",
    },
    {
      id: "24679",
      name: "Xã Đắk Sắk",
      DistrictId: "663",
    },
    {
      id: "24682",
      name: "Xã Thuận An",
      DistrictId: "663",
    },
    {
      id: "24685",
      name: "Xã Đức Minh",
      DistrictId: "663",
    },
    {
      id: "24688",
      name: "Thị trấn Đắk Mâm",
      DistrictId: "664",
    },
    {
      id: "24691",
      name: "Xã Đắk Sôr",
      DistrictId: "664",
    },
    {
      id: "24692",
      name: "Xã Nam Xuân",
      DistrictId: "664",
    },
    {
      id: "24694",
      name: "Xã Buôn Choah",
      DistrictId: "664",
    },
    {
      id: "24697",
      name: "Xã Nam Đà",
      DistrictId: "664",
    },
    {
      id: "24699",
      name: "Xã Tân Thành",
      DistrictId: "664",
    },
    {
      id: "24700",
      name: "Xã Đắk Drô",
      DistrictId: "664",
    },
    {
      id: "24703",
      name: "Xã Nâm Nung",
      DistrictId: "664",
    },
    {
      id: "24706",
      name: "Xã Đức Xuyên",
      DistrictId: "664",
    },
    {
      id: "24709",
      name: "Xã Đắk Nang",
      DistrictId: "664",
    },
    {
      id: "24712",
      name: "Xã Quảng Phú",
      DistrictId: "664",
    },
    {
      id: "24715",
      name: "Xã Nâm N'Đir",
      DistrictId: "664",
    },
    {
      id: "24717",
      name: "Thị trấn Đức An",
      DistrictId: "665",
    },
    {
      id: "24718",
      name: "Xã Đắk Môl",
      DistrictId: "665",
    },
    {
      id: "24719",
      name: "Xã Đắk Hòa",
      DistrictId: "665",
    },
    {
      id: "24721",
      name: "Xã Nam Bình",
      DistrictId: "665",
    },
    {
      id: "24722",
      name: "Xã Thuận Hà",
      DistrictId: "665",
    },
    {
      id: "24724",
      name: "Xã Thuận Hạnh",
      DistrictId: "665",
    },
    {
      id: "24727",
      name: "Xã Đắk N'Dung",
      DistrictId: "665",
    },
    {
      id: "24728",
      name: "Xã Nâm N'Jang",
      DistrictId: "665",
    },
    {
      id: "24730",
      name: "Xã Trường Xuân",
      DistrictId: "665",
    },
    {
      id: "24733",
      name: "Thị trấn Kiến Đức",
      DistrictId: "666",
    },
    {
      id: "24736",
      name: "Xã Quảng Trực",
      DistrictId: "667",
    },
    {
      id: "24739",
      name: "Xã Đắk Búk So",
      DistrictId: "667",
    },
    {
      id: "24740",
      name: "Xã Quảng Tâm",
      DistrictId: "667",
    },
    {
      id: "24742",
      name: "Xã Đắk R'Tíh",
      DistrictId: "667",
    },
    {
      id: "24745",
      name: "Xã Quảng Tín",
      DistrictId: "666",
    },
    {
      id: "24746",
      name: "Xã Đắk Ngo",
      DistrictId: "667",
    },
    {
      id: "24748",
      name: "Xã Quảng Tân",
      DistrictId: "667",
    },
    {
      id: "24750",
      name: "Xã Đắk Wer",
      DistrictId: "666",
    },
    {
      id: "24751",
      name: "Xã Nhân Cơ",
      DistrictId: "666",
    },
    {
      id: "24754",
      name: "Xã Kiến Thành",
      DistrictId: "666",
    },
    {
      id: "24756",
      name: "Xã Nghĩa Thắng",
      DistrictId: "666",
    },
    {
      id: "24757",
      name: "Xã Đạo Nghĩa",
      DistrictId: "666",
    },
    {
      id: "24760",
      name: "Xã Đắk Sin",
      DistrictId: "666",
    },
    {
      id: "24761",
      name: "Xã Hưng Bình",
      DistrictId: "666",
    },
    {
      id: "24763",
      name: "Xã Đắk Ru",
      DistrictId: "666",
    },
    {
      id: "24766",
      name: "Xã Nhân Đạo",
      DistrictId: "666",
    },
    {
      id: "24769",
      name: "Phường 7",
      DistrictId: "672",
    },
    {
      id: "24772",
      name: "Phường 8",
      DistrictId: "672",
    },
    {
      id: "24775",
      name: "Phường 12",
      DistrictId: "672",
    },
    {
      id: "24778",
      name: "Phường 9",
      DistrictId: "672",
    },
    {
      id: "24781",
      name: "Phường 2",
      DistrictId: "672",
    },
    {
      id: "24784",
      name: "Phường 1",
      DistrictId: "672",
    },
    {
      id: "24787",
      name: "Phường 6",
      DistrictId: "672",
    },
    {
      id: "24790",
      name: "Phường 5",
      DistrictId: "672",
    },
    {
      id: "24793",
      name: "Phường 4",
      DistrictId: "672",
    },
    {
      id: "24796",
      name: "Phường 10",
      DistrictId: "672",
    },
    {
      id: "24799",
      name: "Phường 11",
      DistrictId: "672",
    },
    {
      id: "24802",
      name: "Phường 3",
      DistrictId: "672",
    },
    {
      id: "24805",
      name: "Xã Xuân Thọ",
      DistrictId: "672",
    },
    {
      id: "24808",
      name: "Xã Tà Nung",
      DistrictId: "672",
    },
    {
      id: "24810",
      name: "Xã Trạm Hành",
      DistrictId: "672",
    },
    {
      id: "24811",
      name: "Xã Xuân Trường",
      DistrictId: "672",
    },
    {
      id: "24814",
      name: "Phường Lộc Phát",
      DistrictId: "673",
    },
    {
      id: "24817",
      name: "Phường Lộc Tiến",
      DistrictId: "673",
    },
    {
      id: "24820",
      name: "Phường 2",
      DistrictId: "673",
    },
    {
      id: "24823",
      name: "Phường 1",
      DistrictId: "673",
    },
    {
      id: "24826",
      name: "Phường B'lao",
      DistrictId: "673",
    },
    {
      id: "24829",
      name: "Phường Lộc Sơn",
      DistrictId: "673",
    },
    {
      id: "24832",
      name: "Xã Đạm Bri",
      DistrictId: "673",
    },
    {
      id: "24835",
      name: "Xã Lộc Thanh",
      DistrictId: "673",
    },
    {
      id: "24838",
      name: "Xã Lộc Nga",
      DistrictId: "673",
    },
    {
      id: "24841",
      name: "Xã Lộc Châu",
      DistrictId: "673",
    },
    {
      id: "24844",
      name: "Xã Đại Lào",
      DistrictId: "673",
    },
    {
      id: "24846",
      name: "Thị trấn Lạc Dương",
      DistrictId: "675",
    },
    {
      id: "24847",
      name: "Xã Đạ Chais",
      DistrictId: "675",
    },
    {
      id: "24848",
      name: "Xã Đạ Nhim",
      DistrictId: "675",
    },
    {
      id: "24850",
      name: "Xã Đưng KNớ",
      DistrictId: "675",
    },
    {
      id: "24853",
      name: "Xã Đạ Tông",
      DistrictId: "674",
    },
    {
      id: "24856",
      name: "Xã Đạ Long",
      DistrictId: "674",
    },
    {
      id: "24859",
      name: "Xã Đạ M' Rong",
      DistrictId: "674",
    },
    {
      id: "24862",
      name: "Xã Lát",
      DistrictId: "675",
    },
    {
      id: "24865",
      name: "Xã Đạ Sar",
      DistrictId: "675",
    },
    {
      id: "24868",
      name: "Thị trấn Nam Ban",
      DistrictId: "676",
    },
    {
      id: "24871",
      name: "Thị trấn Đinh Văn",
      DistrictId: "676",
    },
    {
      id: "24874",
      name: "Xã Liêng Srônh",
      DistrictId: "674",
    },
    {
      id: "24875",
      name: "Xã Đạ Rsal",
      DistrictId: "674",
    },
    {
      id: "24877",
      name: "Xã Rô Men",
      DistrictId: "674",
    },
    {
      id: "24880",
      name: "Xã Phú Sơn",
      DistrictId: "676",
    },
    {
      id: "24883",
      name: "Xã Phi Tô",
      DistrictId: "676",
    },
    {
      id: "24886",
      name: "Xã Phi Liêng",
      DistrictId: "674",
    },
    {
      id: "24889",
      name: "Xã Đạ K' Nàng",
      DistrictId: "674",
    },
    {
      id: "24892",
      name: "Xã Mê Linh",
      DistrictId: "676",
    },
    {
      id: "24895",
      name: "Xã Đạ Đờn",
      DistrictId: "676",
    },
    {
      id: "24898",
      name: "Xã Phúc Thọ",
      DistrictId: "676",
    },
    {
      id: "24901",
      name: "Xã Đông Thanh",
      DistrictId: "676",
    },
    {
      id: "24904",
      name: "Xã Gia Lâm",
      DistrictId: "676",
    },
    {
      id: "24907",
      name: "Xã Tân Thanh",
      DistrictId: "676",
    },
    {
      id: "24910",
      name: "Xã Tân Văn",
      DistrictId: "676",
    },
    {
      id: "24913",
      name: "Xã Hoài Đức",
      DistrictId: "676",
    },
    {
      id: "24916",
      name: "Xã Tân Hà",
      DistrictId: "676",
    },
    {
      id: "24919",
      name: "Xã Liên Hà",
      DistrictId: "676",
    },
    {
      id: "24922",
      name: "Xã Đan Phượng",
      DistrictId: "676",
    },
    {
      id: "24925",
      name: "Xã Nam Hà",
      DistrictId: "676",
    },
    {
      id: "24928",
      name: "Thị trấn D'Ran",
      DistrictId: "677",
    },
    {
      id: "24931",
      name: "Thị trấn Thạnh Mỹ",
      DistrictId: "677",
    },
    {
      id: "24934",
      name: "Xã Lạc Xuân",
      DistrictId: "677",
    },
    {
      id: "24937",
      name: "Xã Đạ Ròn",
      DistrictId: "677",
    },
    {
      id: "24940",
      name: "Xã Lạc Lâm",
      DistrictId: "677",
    },
    {
      id: "24943",
      name: "Xã Ka Đô",
      DistrictId: "677",
    },
    {
      id: "24946",
      name: "Xã Quảng Lập",
      DistrictId: "677",
    },
    {
      id: "24949",
      name: "Xã Ka Đơn",
      DistrictId: "677",
    },
    {
      id: "24952",
      name: "Xã Tu Tra",
      DistrictId: "677",
    },
    {
      id: "24955",
      name: "Xã Pró",
      DistrictId: "677",
    },
    {
      id: "24958",
      name: "Thị trấn Liên Nghĩa",
      DistrictId: "678",
    },
    {
      id: "24961",
      name: "Xã Hiệp An",
      DistrictId: "678",
    },
    {
      id: "24964",
      name: "Xã Liên Hiệp",
      DistrictId: "678",
    },
    {
      id: "24967",
      name: "Xã Hiệp Thạnh",
      DistrictId: "678",
    },
    {
      id: "24970",
      name: "Xã Bình Thạnh",
      DistrictId: "678",
    },
    {
      id: "24973",
      name: "Xã N'Thol Hạ",
      DistrictId: "678",
    },
    {
      id: "24976",
      name: "Xã Tân Hội",
      DistrictId: "678",
    },
    {
      id: "24979",
      name: "Xã Tân Thành",
      DistrictId: "678",
    },
    {
      id: "24982",
      name: "Xã Phú Hội",
      DistrictId: "678",
    },
    {
      id: "24985",
      name: "Xã Ninh Gia",
      DistrictId: "678",
    },
    {
      id: "24988",
      name: "Xã Tà Năng",
      DistrictId: "678",
    },
    {
      id: "24989",
      name: "Xã Đa Quyn",
      DistrictId: "678",
    },
    {
      id: "24991",
      name: "Xã Tà Hine",
      DistrictId: "678",
    },
    {
      id: "24994",
      name: "Xã Đà Loan",
      DistrictId: "678",
    },
    {
      id: "24997",
      name: "Xã Ninh Loan",
      DistrictId: "678",
    },
    {
      id: "25000",
      name: "Thị trấn Di Linh",
      DistrictId: "679",
    },
    {
      id: "25003",
      name: "Xã Đinh Trang Thượng",
      DistrictId: "679",
    },
    {
      id: "25006",
      name: "Xã Tân Thượng",
      DistrictId: "679",
    },
    {
      id: "25007",
      name: "Xã Tân Lâm",
      DistrictId: "679",
    },
    {
      id: "25009",
      name: "Xã Tân Châu",
      DistrictId: "679",
    },
    {
      id: "25012",
      name: "Xã Tân Nghĩa",
      DistrictId: "679",
    },
    {
      id: "25015",
      name: "Xã Gia Hiệp",
      DistrictId: "679",
    },
    {
      id: "25018",
      name: "Xã Đinh Lạc",
      DistrictId: "679",
    },
    {
      id: "25021",
      name: "Xã Tam Bố",
      DistrictId: "679",
    },
    {
      id: "25024",
      name: "Xã Đinh Trang Hòa",
      DistrictId: "679",
    },
    {
      id: "25027",
      name: "Xã Liên Đầm",
      DistrictId: "679",
    },
    {
      id: "25030",
      name: "Xã Gung Ré",
      DistrictId: "679",
    },
    {
      id: "25033",
      name: "Xã Bảo Thuận",
      DistrictId: "679",
    },
    {
      id: "25036",
      name: "Xã Hòa Ninh",
      DistrictId: "679",
    },
    {
      id: "25039",
      name: "Xã Hòa Trung",
      DistrictId: "679",
    },
    {
      id: "25042",
      name: "Xã Hòa Nam",
      DistrictId: "679",
    },
    {
      id: "25045",
      name: "Xã Hòa Bắc",
      DistrictId: "679",
    },
    {
      id: "25048",
      name: "Xã Sơn Điền",
      DistrictId: "679",
    },
    {
      id: "25051",
      name: "Xã Gia Bắc",
      DistrictId: "679",
    },
    {
      id: "25054",
      name: "Thị trấn Lộc Thắng",
      DistrictId: "680",
    },
    {
      id: "25057",
      name: "Xã Lộc Bảo",
      DistrictId: "680",
    },
    {
      id: "25060",
      name: "Xã Lộc Lâm",
      DistrictId: "680",
    },
    {
      id: "25063",
      name: "Xã Lộc Phú",
      DistrictId: "680",
    },
    {
      id: "25066",
      name: "Xã Lộc Bắc",
      DistrictId: "680",
    },
    {
      id: "25069",
      name: "Xã B' Lá",
      DistrictId: "680",
    },
    {
      id: "25072",
      name: "Xã Lộc Ngãi",
      DistrictId: "680",
    },
    {
      id: "25075",
      name: "Xã Lộc Quảng",
      DistrictId: "680",
    },
    {
      id: "25078",
      name: "Xã Lộc Tân",
      DistrictId: "680",
    },
    {
      id: "25081",
      name: "Xã Lộc Đức",
      DistrictId: "680",
    },
    {
      id: "25084",
      name: "Xã Lộc An",
      DistrictId: "680",
    },
    {
      id: "25087",
      name: "Xã Tân Lạc",
      DistrictId: "680",
    },
    {
      id: "25090",
      name: "Xã Lộc Thành",
      DistrictId: "680",
    },
    {
      id: "25093",
      name: "Xã Lộc Nam",
      DistrictId: "680",
    },
    {
      id: "25096",
      name: "Thị trấn Đạ M'ri",
      DistrictId: "681",
    },
    {
      id: "25099",
      name: "Thị trấn Ma Đa Guôi",
      DistrictId: "681",
    },
    {
      id: "25105",
      name: "Xã Hà Lâm",
      DistrictId: "681",
    },
    {
      id: "25108",
      name: "Xã Đạ Tồn",
      DistrictId: "681",
    },
    {
      id: "25111",
      name: "Xã Đạ Oai",
      DistrictId: "681",
    },
    {
      id: "25114",
      name: "Xã Đạ Ploa",
      DistrictId: "681",
    },
    {
      id: "25117",
      name: "Xã Ma Đa Guôi",
      DistrictId: "681",
    },
    {
      id: "25120",
      name: "Xã Đoàn Kết",
      DistrictId: "681",
    },
    {
      id: "25123",
      name: "Xã Phước Lộc",
      DistrictId: "681",
    },
    {
      id: "25126",
      name: "Thị trấn Đạ Tẻh",
      DistrictId: "682",
    },
    {
      id: "25129",
      name: "Xã An Nhơn",
      DistrictId: "682",
    },
    {
      id: "25132",
      name: "Xã Quốc Oai",
      DistrictId: "682",
    },
    {
      id: "25135",
      name: "Xã Mỹ Đức",
      DistrictId: "682",
    },
    {
      id: "25138",
      name: "Xã Quảng Trị",
      DistrictId: "682",
    },
    {
      id: "25141",
      name: "Xã Đạ Lây",
      DistrictId: "682",
    },
    {
      id: "25147",
      name: "Xã Triệu Hải",
      DistrictId: "682",
    },
    {
      id: "25153",
      name: "Xã Đạ Kho",
      DistrictId: "682",
    },
    {
      id: "25156",
      name: "Xã Đạ Pal",
      DistrictId: "682",
    },
    {
      id: "25159",
      name: "Thị trấn Cát Tiên",
      DistrictId: "683",
    },
    {
      id: "25162",
      name: "Xã Tiên Hoàng",
      DistrictId: "683",
    },
    {
      id: "25165",
      name: "Xã Phước Cát 2",
      DistrictId: "683",
    },
    {
      id: "25168",
      name: "Xã Gia Viễn",
      DistrictId: "683",
    },
    {
      id: "25171",
      name: "Xã Nam Ninh",
      DistrictId: "683",
    },
    {
      id: "25180",
      name: "Thị trấn Phước Cát ",
      DistrictId: "683",
    },
    {
      id: "25183",
      name: "Xã Đức Phổ",
      DistrictId: "683",
    },
    {
      id: "25189",
      name: "Xã Quảng Ngãi",
      DistrictId: "683",
    },
    {
      id: "25192",
      name: "Xã Đồng Nai Thượng",
      DistrictId: "683",
    },
    {
      id: "25195",
      name: "Phường Tân Phú",
      DistrictId: "689",
    },
    {
      id: "25198",
      name: "Phường Tân Đồng",
      DistrictId: "689",
    },
    {
      id: "25201",
      name: "Phường Tân Bình",
      DistrictId: "689",
    },
    {
      id: "25204",
      name: "Phường Tân Xuân",
      DistrictId: "689",
    },
    {
      id: "25205",
      name: "Phường Tân Thiện",
      DistrictId: "689",
    },
    {
      id: "25207",
      name: "Xã Tân Thành",
      DistrictId: "689",
    },
    {
      id: "25210",
      name: "Phường Tiến Thành",
      DistrictId: "689",
    },
    {
      id: "25213",
      name: "Xã Tiến Hưng",
      DistrictId: "689",
    },
    {
      id: "25216",
      name: "Phường Thác Mơ",
      DistrictId: "688",
    },
    {
      id: "25217",
      name: "Phường Long Thủy",
      DistrictId: "688",
    },
    {
      id: "25219",
      name: "Phường Phước Bình",
      DistrictId: "688",
    },
    {
      id: "25220",
      name: "Phường Long Phước",
      DistrictId: "688",
    },
    {
      id: "25222",
      name: "Xã Bù Gia Mập",
      DistrictId: "691",
    },
    {
      id: "25225",
      name: "Xã Đak Ơ",
      DistrictId: "691",
    },
    {
      id: "25228",
      name: "Xã Đức Hạnh",
      DistrictId: "691",
    },
    {
      id: "25229",
      name: "Xã Phú Văn",
      DistrictId: "691",
    },
    {
      id: "25231",
      name: "Xã Đa Kia",
      DistrictId: "691",
    },
    {
      id: "25232",
      name: "Xã Phước Minh",
      DistrictId: "691",
    },
    {
      id: "25234",
      name: "Xã Bình Thắng",
      DistrictId: "691",
    },
    {
      id: "25237",
      name: "Phường Sơn Giang",
      DistrictId: "688",
    },
    {
      id: "25240",
      name: "Xã Long Bình",
      DistrictId: "698",
    },
    {
      id: "25243",
      name: "Xã Bình Tân",
      DistrictId: "698",
    },
    {
      id: "25244",
      name: "Xã Bình Sơn",
      DistrictId: "698",
    },
    {
      id: "25245",
      name: "Xã Long Giang",
      DistrictId: "688",
    },
    {
      id: "25246",
      name: "Xã Long Hưng",
      DistrictId: "698",
    },
    {
      id: "25249",
      name: "Xã Phước Tín",
      DistrictId: "688",
    },
    {
      id: "25250",
      name: "Xã Phước Tân",
      DistrictId: "698",
    },
    {
      id: "25252",
      name: "Xã Bù Nho",
      DistrictId: "698",
    },
    {
      id: "25255",
      name: "Xã Long Hà",
      DistrictId: "698",
    },
    {
      id: "25258",
      name: "Xã Long Tân",
      DistrictId: "698",
    },
    {
      id: "25261",
      name: "Xã Phú Trung",
      DistrictId: "698",
    },
    {
      id: "25264",
      name: "Xã Phú Riềng",
      DistrictId: "698",
    },
    {
      id: "25267",
      name: "Xã Phú Nghĩa",
      DistrictId: "691",
    },
    {
      id: "25270",
      name: "Thị trấn Lộc Ninh",
      DistrictId: "692",
    },
    {
      id: "25273",
      name: "Xã Lộc Hòa",
      DistrictId: "692",
    },
    {
      id: "25276",
      name: "Xã Lộc An",
      DistrictId: "692",
    },
    {
      id: "25279",
      name: "Xã Lộc Tấn",
      DistrictId: "692",
    },
    {
      id: "25280",
      name: "Xã Lộc Thạnh",
      DistrictId: "692",
    },
    {
      id: "25282",
      name: "Xã Lộc Hiệp",
      DistrictId: "692",
    },
    {
      id: "25285",
      name: "Xã Lộc Thiện",
      DistrictId: "692",
    },
    {
      id: "25288",
      name: "Xã Lộc Thuận",
      DistrictId: "692",
    },
    {
      id: "25291",
      name: "Xã Lộc Quang",
      DistrictId: "692",
    },
    {
      id: "25292",
      name: "Xã Lộc Phú",
      DistrictId: "692",
    },
    {
      id: "25294",
      name: "Xã Lộc Thành",
      DistrictId: "692",
    },
    {
      id: "25297",
      name: "Xã Lộc Thái",
      DistrictId: "692",
    },
    {
      id: "25300",
      name: "Xã Lộc Điền",
      DistrictId: "692",
    },
    {
      id: "25303",
      name: "Xã Lộc Hưng",
      DistrictId: "692",
    },
    {
      id: "25305",
      name: "Xã Lộc Thịnh",
      DistrictId: "692",
    },
    {
      id: "25306",
      name: "Xã Lộc Khánh",
      DistrictId: "692",
    },
    {
      id: "25308",
      name: "Thị trấn Thanh Bình",
      DistrictId: "693",
    },
    {
      id: "25309",
      name: "Xã Hưng Phước",
      DistrictId: "693",
    },
    {
      id: "25310",
      name: "Xã Phước Thiện",
      DistrictId: "693",
    },
    {
      id: "25312",
      name: "Xã Thiện Hưng",
      DistrictId: "693",
    },
    {
      id: "25315",
      name: "Xã Thanh Hòa",
      DistrictId: "693",
    },
    {
      id: "25318",
      name: "Xã Tân Thành",
      DistrictId: "693",
    },
    {
      id: "25320",
      name: "Phường Hưng Chiến",
      DistrictId: "690",
    },
    {
      id: "25321",
      name: "Xã Tân Tiến",
      DistrictId: "693",
    },
    {
      id: "25324",
      name: "Phường An Lộc",
      DistrictId: "690",
    },
    {
      id: "25325",
      name: "Phường Phú Thịnh",
      DistrictId: "690",
    },
    {
      id: "25326",
      name: "Phường Phú Đức",
      DistrictId: "690",
    },
    {
      id: "25327",
      name: "Xã Thanh An",
      DistrictId: "694",
    },
    {
      id: "25330",
      name: "Xã An Khương",
      DistrictId: "694",
    },
    {
      id: "25333",
      name: "Xã Thanh Lương",
      DistrictId: "690",
    },
    {
      id: "25336",
      name: "Xã Thanh Phú",
      DistrictId: "690",
    },
    {
      id: "25339",
      name: "Xã An Phú",
      DistrictId: "694",
    },
    {
      id: "25342",
      name: "Xã Tân Lợi",
      DistrictId: "694",
    },
    {
      id: "25345",
      name: "Xã Tân Hưng",
      DistrictId: "694",
    },
    {
      id: "25348",
      name: "Xã Minh Đức",
      DistrictId: "694",
    },
    {
      id: "25349",
      name: "Xã Minh Tâm",
      DistrictId: "694",
    },
    {
      id: "25351",
      name: "Xã Phước An",
      DistrictId: "694",
    },
    {
      id: "25354",
      name: "Xã Thanh Bình",
      DistrictId: "694",
    },
    {
      id: "25357",
      name: "Thị trấn Tân Khai",
      DistrictId: "694",
    },
    {
      id: "25360",
      name: "Xã Đồng Nơ",
      DistrictId: "694",
    },
    {
      id: "25361",
      name: "Xã Tân Hiệp",
      DistrictId: "694",
    },
    {
      id: "25363",
      name: "Thị trấn Tân Phú",
      DistrictId: "695",
    },
    {
      id: "25366",
      name: "Xã Thuận Lợi",
      DistrictId: "695",
    },
    {
      id: "25369",
      name: "Xã Đồng Tâm",
      DistrictId: "695",
    },
    {
      id: "25372",
      name: "Xã Tân Phước",
      DistrictId: "695",
    },
    {
      id: "25375",
      name: "Xã Tân Hưng",
      DistrictId: "695",
    },
    {
      id: "25378",
      name: "Xã Tân Lợi",
      DistrictId: "695",
    },
    {
      id: "25381",
      name: "Xã Tân Lập",
      DistrictId: "695",
    },
    {
      id: "25384",
      name: "Xã Tân Hòa",
      DistrictId: "695",
    },
    {
      id: "25387",
      name: "Xã Thuận Phú",
      DistrictId: "695",
    },
    {
      id: "25390",
      name: "Xã Đồng Tiến",
      DistrictId: "695",
    },
    {
      id: "25393",
      name: "Xã Tân Tiến",
      DistrictId: "695",
    },
    {
      id: "25396",
      name: "Thị trấn Đức Phong",
      DistrictId: "696",
    },
    {
      id: "25398",
      name: "Xã Đường 10",
      DistrictId: "696",
    },
    {
      id: "25399",
      name: "Xã Đak Nhau",
      DistrictId: "696",
    },
    {
      id: "25400",
      name: "Xã Phú Sơn",
      DistrictId: "696",
    },
    {
      id: "25402",
      name: "Xã Thọ Sơn",
      DistrictId: "696",
    },
    {
      id: "25404",
      name: "Xã Bình Minh",
      DistrictId: "696",
    },
    {
      id: "25405",
      name: "Xã Bom Bo",
      DistrictId: "696",
    },
    {
      id: "25408",
      name: "Xã Minh Hưng",
      DistrictId: "696",
    },
    {
      id: "25411",
      name: "Xã Đoàn Kết",
      DistrictId: "696",
    },
    {
      id: "25414",
      name: "Xã Đồng Nai",
      DistrictId: "696",
    },
    {
      id: "25417",
      name: "Xã Đức Liễu",
      DistrictId: "696",
    },
    {
      id: "25420",
      name: "Xã Thống Nhất",
      DistrictId: "696",
    },
    {
      id: "25423",
      name: "Xã Nghĩa Trung",
      DistrictId: "696",
    },
    {
      id: "25424",
      name: "Xã Nghĩa Bình",
      DistrictId: "696",
    },
    {
      id: "25426",
      name: "Xã Đăng Hà",
      DistrictId: "696",
    },
    {
      id: "25429",
      name: "Xã Phước Sơn",
      DistrictId: "696",
    },
    {
      id: "25432",
      name: "Phường Hưng Long",
      DistrictId: "697",
    },
    {
      id: "25433",
      name: "Phường Thành Tâm",
      DistrictId: "697",
    },
    {
      id: "25435",
      name: "Xã Minh Lập",
      DistrictId: "697",
    },
    {
      id: "25438",
      name: "Xã Tân Quan",
      DistrictId: "694",
    },
    {
      id: "25439",
      name: "Xã Quang Minh",
      DistrictId: "697",
    },
    {
      id: "25441",
      name: "Phường Minh Hưng",
      DistrictId: "697",
    },
    {
      id: "25444",
      name: "Phường Minh Long",
      DistrictId: "697",
    },
    {
      id: "25447",
      name: "Phường Minh Thành",
      DistrictId: "697",
    },
    {
      id: "25450",
      name: "Xã Nha Bích",
      DistrictId: "697",
    },
    {
      id: "25453",
      name: "Xã Minh Thắng",
      DistrictId: "697",
    },
    {
      id: "25456",
      name: "Phường 1",
      DistrictId: "703",
    },
    {
      id: "25459",
      name: "Phường 3",
      DistrictId: "703",
    },
    {
      id: "25462",
      name: "Phường 4",
      DistrictId: "703",
    },
    {
      id: "25465",
      name: "Phường Hiệp Ninh",
      DistrictId: "703",
    },
    {
      id: "25468",
      name: "Phường 2",
      DistrictId: "703",
    },
    {
      id: "25471",
      name: "Xã Thạnh Tân",
      DistrictId: "703",
    },
    {
      id: "25474",
      name: "Xã Tân Bình",
      DistrictId: "703",
    },
    {
      id: "25477",
      name: "Xã Bình Minh",
      DistrictId: "703",
    },
    {
      id: "25480",
      name: "Phường Ninh Sơn",
      DistrictId: "703",
    },
    {
      id: "25483",
      name: "Phường Ninh Thạnh",
      DistrictId: "703",
    },
    {
      id: "25486",
      name: "Thị trấn Tân Biên",
      DistrictId: "705",
    },
    {
      id: "25489",
      name: "Xã Tân Lập",
      DistrictId: "705",
    },
    {
      id: "25492",
      name: "Xã Thạnh Bắc",
      DistrictId: "705",
    },
    {
      id: "25495",
      name: "Xã Tân Bình",
      DistrictId: "705",
    },
    {
      id: "25498",
      name: "Xã Thạnh Bình",
      DistrictId: "705",
    },
    {
      id: "25501",
      name: "Xã Thạnh Tây",
      DistrictId: "705",
    },
    {
      id: "25504",
      name: "Xã Hòa Hiệp",
      DistrictId: "705",
    },
    {
      id: "25507",
      name: "Xã Tân Phong",
      DistrictId: "705",
    },
    {
      id: "25510",
      name: "Xã Mỏ Công",
      DistrictId: "705",
    },
    {
      id: "25513",
      name: "Xã Trà Vong",
      DistrictId: "705",
    },
    {
      id: "25516",
      name: "Thị trấn Tân Châu",
      DistrictId: "706",
    },
    {
      id: "25519",
      name: "Xã Tân Hà",
      DistrictId: "706",
    },
    {
      id: "25522",
      name: "Xã Tân Đông",
      DistrictId: "706",
    },
    {
      id: "25525",
      name: "Xã Tân Hội",
      DistrictId: "706",
    },
    {
      id: "25528",
      name: "Xã Tân Hòa",
      DistrictId: "706",
    },
    {
      id: "25531",
      name: "Xã Suối Ngô",
      DistrictId: "706",
    },
    {
      id: "25534",
      name: "Xã Suối Dây",
      DistrictId: "706",
    },
    {
      id: "25537",
      name: "Xã Tân Hiệp",
      DistrictId: "706",
    },
    {
      id: "25540",
      name: "Xã Thạnh Đông",
      DistrictId: "706",
    },
    {
      id: "25543",
      name: "Xã Tân Thành",
      DistrictId: "706",
    },
    {
      id: "25546",
      name: "Xã Tân Phú",
      DistrictId: "706",
    },
    {
      id: "25549",
      name: "Xã Tân Hưng",
      DistrictId: "706",
    },
    {
      id: "25552",
      name: "Thị trấn Dương Minh Châu",
      DistrictId: "707",
    },
    {
      id: "25555",
      name: "Xã Suối Đá",
      DistrictId: "707",
    },
    {
      id: "25558",
      name: "Xã Phan",
      DistrictId: "707",
    },
    {
      id: "25561",
      name: "Xã Phước Ninh",
      DistrictId: "707",
    },
    {
      id: "25564",
      name: "Xã Phước Minh",
      DistrictId: "707",
    },
    {
      id: "25567",
      name: "Xã Bàu Năng",
      DistrictId: "707",
    },
    {
      id: "25570",
      name: "Xã Chà Là",
      DistrictId: "707",
    },
    {
      id: "25573",
      name: "Xã Cầu Khởi",
      DistrictId: "707",
    },
    {
      id: "25576",
      name: "Xã Bến Củi",
      DistrictId: "707",
    },
    {
      id: "25579",
      name: "Xã Lộc Ninh",
      DistrictId: "707",
    },
    {
      id: "25582",
      name: "Xã Truông Mít",
      DistrictId: "707",
    },
    {
      id: "25585",
      name: "Thị trấn Châu Thành",
      DistrictId: "708",
    },
    {
      id: "25588",
      name: "Xã Hảo Đước",
      DistrictId: "708",
    },
    {
      id: "25591",
      name: "Xã Phước Vinh",
      DistrictId: "708",
    },
    {
      id: "25594",
      name: "Xã Đồng Khởi",
      DistrictId: "708",
    },
    {
      id: "25597",
      name: "Xã Thái Bình",
      DistrictId: "708",
    },
    {
      id: "25600",
      name: "Xã An Cơ",
      DistrictId: "708",
    },
    {
      id: "25603",
      name: "Xã Biên Giới",
      DistrictId: "708",
    },
    {
      id: "25606",
      name: "Xã Hòa Thạnh",
      DistrictId: "708",
    },
    {
      id: "25609",
      name: "Xã Trí Bình",
      DistrictId: "708",
    },
    {
      id: "25612",
      name: "Xã Hòa Hội",
      DistrictId: "708",
    },
    {
      id: "25615",
      name: "Xã An Bình",
      DistrictId: "708",
    },
    {
      id: "25618",
      name: "Xã Thanh Điền",
      DistrictId: "708",
    },
    {
      id: "25621",
      name: "Xã Thành Long",
      DistrictId: "708",
    },
    {
      id: "25624",
      name: "Xã Ninh Điền",
      DistrictId: "708",
    },
    {
      id: "25627",
      name: "Xã Long Vĩnh",
      DistrictId: "708",
    },
    {
      id: "25630",
      name: "Phường Long Hoa",
      DistrictId: "709",
    },
    {
      id: "25633",
      name: "Phường Hiệp Tân",
      DistrictId: "709",
    },
    {
      id: "25636",
      name: "Phường Long Thành Bắc",
      DistrictId: "709",
    },
    {
      id: "25639",
      name: "Xã Trường Hòa",
      DistrictId: "709",
    },
    {
      id: "25642",
      name: "Xã Trường Đông",
      DistrictId: "709",
    },
    {
      id: "25645",
      name: "Phường Long Thành Trung",
      DistrictId: "709",
    },
    {
      id: "25648",
      name: "Xã Trường Tây",
      DistrictId: "709",
    },
    {
      id: "25651",
      name: "Xã Long Thành Nam",
      DistrictId: "709",
    },
    {
      id: "25654",
      name: "Thị trấn Gò Dầu",
      DistrictId: "710",
    },
    {
      id: "25657",
      name: "Xã Thạnh Đức",
      DistrictId: "710",
    },
    {
      id: "25660",
      name: "Xã Cẩm Giang",
      DistrictId: "710",
    },
    {
      id: "25663",
      name: "Xã Hiệp Thạnh",
      DistrictId: "710",
    },
    {
      id: "25666",
      name: "Xã Bàu Đồn",
      DistrictId: "710",
    },
    {
      id: "25669",
      name: "Xã Phước Thạnh",
      DistrictId: "710",
    },
    {
      id: "25672",
      name: "Xã Phước Đông",
      DistrictId: "710",
    },
    {
      id: "25675",
      name: "Xã Phước Trạch",
      DistrictId: "710",
    },
    {
      id: "25678",
      name: "Xã Thanh Phước",
      DistrictId: "710",
    },
    {
      id: "25681",
      name: "Thị trấn Bến Cầu",
      DistrictId: "711",
    },
    {
      id: "25684",
      name: "Xã Long Chữ",
      DistrictId: "711",
    },
    {
      id: "25687",
      name: "Xã Long Phước",
      DistrictId: "711",
    },
    {
      id: "25690",
      name: "Xã Long Giang",
      DistrictId: "711",
    },
    {
      id: "25693",
      name: "Xã Tiên Thuận",
      DistrictId: "711",
    },
    {
      id: "25696",
      name: "Xã Long Khánh",
      DistrictId: "711",
    },
    {
      id: "25699",
      name: "Xã Lợi Thuận",
      DistrictId: "711",
    },
    {
      id: "25702",
      name: "Xã Long Thuận",
      DistrictId: "711",
    },
    {
      id: "25705",
      name: "Xã An Thạnh",
      DistrictId: "711",
    },
    {
      id: "25708",
      name: "Phường Trảng Bàng",
      DistrictId: "712",
    },
    {
      id: "25711",
      name: "Xã Đôn Thuận",
      DistrictId: "712",
    },
    {
      id: "25714",
      name: "Xã Hưng Thuận",
      DistrictId: "712",
    },
    {
      id: "25717",
      name: "Phường Lộc Hưng",
      DistrictId: "712",
    },
    {
      id: "25720",
      name: "Phường Gia Lộc",
      DistrictId: "712",
    },
    {
      id: "25723",
      name: "Phường Gia Bình",
      DistrictId: "712",
    },
    {
      id: "25729",
      name: "Xã Phước Bình",
      DistrictId: "712",
    },
    {
      id: "25732",
      name: "Phường An Tịnh",
      DistrictId: "712",
    },
    {
      id: "25735",
      name: "Phường An Hòa",
      DistrictId: "712",
    },
    {
      id: "25738",
      name: "Xã Phước Chỉ",
      DistrictId: "712",
    },
    {
      id: "25741",
      name: "Phường Hiệp Thành",
      DistrictId: "718",
    },
    {
      id: "25744",
      name: "Phường Phú Lợi",
      DistrictId: "718",
    },
    {
      id: "25747",
      name: "Phường Phú Cường",
      DistrictId: "718",
    },
    {
      id: "25750",
      name: "Phường Phú Hòa",
      DistrictId: "718",
    },
    {
      id: "25753",
      name: "Phường Phú Thọ",
      DistrictId: "718",
    },
    {
      id: "25756",
      name: "Phường Chánh Nghĩa",
      DistrictId: "718",
    },
    {
      id: "25759",
      name: "Phường Định Hoà",
      DistrictId: "718",
    },
    {
      id: "25760",
      name: "Phường Hoà Phú",
      DistrictId: "718",
    },
    {
      id: "25762",
      name: "Phường Phú Mỹ",
      DistrictId: "718",
    },
    {
      id: "25763",
      name: "Phường Phú Tân",
      DistrictId: "718",
    },
    {
      id: "25765",
      name: "Phường Tân An",
      DistrictId: "718",
    },
    {
      id: "25768",
      name: "Phường Hiệp An",
      DistrictId: "718",
    },
    {
      id: "25771",
      name: "Phường Tương Bình Hiệp",
      DistrictId: "718",
    },
    {
      id: "25774",
      name: "Phường Chánh Mỹ",
      DistrictId: "718",
    },
    {
      id: "25777",
      name: "Thị trấn Dầu Tiếng",
      DistrictId: "720",
    },
    {
      id: "25780",
      name: "Xã Minh Hoà",
      DistrictId: "720",
    },
    {
      id: "25783",
      name: "Xã Minh Thạnh",
      DistrictId: "720",
    },
    {
      id: "25786",
      name: "Xã Minh Tân",
      DistrictId: "720",
    },
    {
      id: "25789",
      name: "Xã Định An",
      DistrictId: "720",
    },
    {
      id: "25792",
      name: "Xã Long Hoà",
      DistrictId: "720",
    },
    {
      id: "25795",
      name: "Xã Định Thành",
      DistrictId: "720",
    },
    {
      id: "25798",
      name: "Xã Định Hiệp",
      DistrictId: "720",
    },
    {
      id: "25801",
      name: "Xã An Lập",
      DistrictId: "720",
    },
    {
      id: "25804",
      name: "Xã Long Tân",
      DistrictId: "720",
    },
    {
      id: "25807",
      name: "Xã Thanh An",
      DistrictId: "720",
    },
    {
      id: "25810",
      name: "Xã Thanh Tuyền",
      DistrictId: "720",
    },
    {
      id: "25813",
      name: "Phường Mỹ Phước",
      DistrictId: "721",
    },
    {
      id: "25816",
      name: "Xã Trừ Văn Thố",
      DistrictId: "719",
    },
    {
      id: "25819",
      name: "Xã Cây Trường II",
      DistrictId: "719",
    },
    {
      id: "25822",
      name: "Thị trấn Lai Uyên",
      DistrictId: "719",
    },
    {
      id: "25825",
      name: "Xã Tân Hưng",
      DistrictId: "719",
    },
    {
      id: "25828",
      name: "Xã Long Nguyên",
      DistrictId: "719",
    },
    {
      id: "25831",
      name: "Xã Hưng Hòa",
      DistrictId: "719",
    },
    {
      id: "25834",
      name: "Xã Lai Hưng",
      DistrictId: "719",
    },
    {
      id: "25837",
      name: "Phường Chánh Phú Hòa",
      DistrictId: "721",
    },
    {
      id: "25840",
      name: "Xã An Điền",
      DistrictId: "721",
    },
    {
      id: "25843",
      name: "Xã An Tây",
      DistrictId: "721",
    },
    {
      id: "25846",
      name: "Phường Thới Hòa",
      DistrictId: "721",
    },
    {
      id: "25849",
      name: "Phường Hòa Lợi",
      DistrictId: "721",
    },
    {
      id: "25852",
      name: "Phường Tân Định",
      DistrictId: "721",
    },
    {
      id: "25855",
      name: "Xã Phú An",
      DistrictId: "721",
    },
    {
      id: "25858",
      name: "Thị trấn Phước Vĩnh",
      DistrictId: "722",
    },
    {
      id: "25861",
      name: "Xã An Linh",
      DistrictId: "722",
    },
    {
      id: "25864",
      name: "Xã Phước Sang",
      DistrictId: "722",
    },
    {
      id: "25865",
      name: "Xã An Thái",
      DistrictId: "722",
    },
    {
      id: "25867",
      name: "Xã An Long",
      DistrictId: "722",
    },
    {
      id: "25870",
      name: "Xã An Bình",
      DistrictId: "722",
    },
    {
      id: "25873",
      name: "Xã Tân Hiệp",
      DistrictId: "722",
    },
    {
      id: "25876",
      name: "Xã Tam Lập",
      DistrictId: "722",
    },
    {
      id: "25879",
      name: "Xã Tân Long",
      DistrictId: "722",
    },
    {
      id: "25882",
      name: "Xã Vĩnh Hoà",
      DistrictId: "722",
    },
    {
      id: "25885",
      name: "Xã Phước Hoà",
      DistrictId: "722",
    },
    {
      id: "25888",
      name: "Phường Uyên Hưng",
      DistrictId: "723",
    },
    {
      id: "25891",
      name: "Phường Tân Phước Khánh",
      DistrictId: "723",
    },
    {
      id: "25894",
      name: "Xã Tân Định",
      DistrictId: "726",
    },
    {
      id: "25897",
      name: "Xã Bình Mỹ",
      DistrictId: "726",
    },
    {
      id: "25900",
      name: "Thị trấn Tân Bình",
      DistrictId: "726",
    },
    {
      id: "25903",
      name: "Xã Tân Lập",
      DistrictId: "726",
    },
    {
      id: "25906",
      name: "Thị trấn Tân Thành",
      DistrictId: "726",
    },
    {
      id: "25907",
      name: "Xã Đất Cuốc",
      DistrictId: "726",
    },
    {
      id: "25908",
      name: "Xã Hiếu Liêm",
      DistrictId: "726",
    },
    {
      id: "25909",
      name: "Xã Lạc An",
      DistrictId: "726",
    },
    {
      id: "25912",
      name: "Phường Vĩnh Tân",
      DistrictId: "723",
    },
    {
      id: "25915",
      name: "Phường Hội Nghĩa",
      DistrictId: "723",
    },
    {
      id: "25918",
      name: "Xã Tân Mỹ",
      DistrictId: "726",
    },
    {
      id: "25920",
      name: "Phường Tân Hiệp",
      DistrictId: "723",
    },
    {
      id: "25921",
      name: "Phường Khánh Bình",
      DistrictId: "723",
    },
    {
      id: "25924",
      name: "Phường Phú Chánh",
      DistrictId: "723",
    },
    {
      id: "25927",
      name: "Xã Thường Tân",
      DistrictId: "726",
    },
    {
      id: "25930",
      name: "Xã Bạch Đằng",
      DistrictId: "723",
    },
    {
      id: "25933",
      name: "Phường Tân Vĩnh Hiệp",
      DistrictId: "723",
    },
    {
      id: "25936",
      name: "Phường Thạnh Phước",
      DistrictId: "723",
    },
    {
      id: "25937",
      name: "Xã Thạnh Hội",
      DistrictId: "723",
    },
    {
      id: "25939",
      name: "Phường Thái Hòa",
      DistrictId: "723",
    },
    {
      id: "25942",
      name: "Phường Dĩ An",
      DistrictId: "724",
    },
    {
      id: "25945",
      name: "Phường Tân Bình",
      DistrictId: "724",
    },
    {
      id: "25948",
      name: "Phường Tân Đông Hiệp",
      DistrictId: "724",
    },
    {
      id: "25951",
      name: "Phường Bình An",
      DistrictId: "724",
    },
    {
      id: "25954",
      name: "Phường Bình Thắng",
      DistrictId: "724",
    },
    {
      id: "25957",
      name: "Phường Đông Hòa",
      DistrictId: "724",
    },
    {
      id: "25960",
      name: "Phường An Bình",
      DistrictId: "724",
    },
    {
      id: "25963",
      name: "Phường An Thạnh",
      DistrictId: "725",
    },
    {
      id: "25966",
      name: "Phường Lái Thiêu",
      DistrictId: "725",
    },
    {
      id: "25969",
      name: "Phường Bình Chuẩn",
      DistrictId: "725",
    },
    {
      id: "25972",
      name: "Phường Thuận Giao",
      DistrictId: "725",
    },
    {
      id: "25975",
      name: "Phường An Phú",
      DistrictId: "725",
    },
    {
      id: "25978",
      name: "Phường Hưng Định",
      DistrictId: "725",
    },
    {
      id: "25981",
      name: "Xã An Sơn",
      DistrictId: "725",
    },
    {
      id: "25984",
      name: "Phường Bình Nhâm",
      DistrictId: "725",
    },
    {
      id: "25987",
      name: "Phường Bình Hòa",
      DistrictId: "725",
    },
    {
      id: "25990",
      name: "Phường Vĩnh Phú",
      DistrictId: "725",
    },
    {
      id: "25993",
      name: "Phường Trảng Dài",
      DistrictId: "731",
    },
    {
      id: "25996",
      name: "Phường Tân Phong",
      DistrictId: "731",
    },
    {
      id: "25999",
      name: "Phường Tân Biên",
      DistrictId: "731",
    },
    {
      id: "26002",
      name: "Phường Hố Nai",
      DistrictId: "731",
    },
    {
      id: "26005",
      name: "Phường Tân Hòa",
      DistrictId: "731",
    },
    {
      id: "26008",
      name: "Phường Tân Hiệp",
      DistrictId: "731",
    },
    {
      id: "26011",
      name: "Phường Bửu Long",
      DistrictId: "731",
    },
    {
      id: "26014",
      name: "Phường Tân Tiến",
      DistrictId: "731",
    },
    {
      id: "26017",
      name: "Phường Tam Hiệp",
      DistrictId: "731",
    },
    {
      id: "26020",
      name: "Phường Long Bình",
      DistrictId: "731",
    },
    {
      id: "26023",
      name: "Phường Quang Vinh",
      DistrictId: "731",
    },
    {
      id: "26026",
      name: "Phường Tân Mai",
      DistrictId: "731",
    },
    {
      id: "26029",
      name: "Phường Thống Nhất",
      DistrictId: "731",
    },
    {
      id: "26032",
      name: "Phường Trung Dũng",
      DistrictId: "731",
    },
    {
      id: "26035",
      name: "Phường Tam Hòa",
      DistrictId: "731",
    },
    {
      id: "26038",
      name: "Phường Hòa Bình",
      DistrictId: "731",
    },
    {
      id: "26041",
      name: "Phường Quyết Thắng",
      DistrictId: "731",
    },
    {
      id: "26044",
      name: "Phường Thanh Bình",
      DistrictId: "731",
    },
    {
      id: "26047",
      name: "Phường Bình Đa",
      DistrictId: "731",
    },
    {
      id: "26050",
      name: "Phường An Bình",
      DistrictId: "731",
    },
    {
      id: "26053",
      name: "Phường Bửu Hòa",
      DistrictId: "731",
    },
    {
      id: "26056",
      name: "Phường Long Bình Tân",
      DistrictId: "731",
    },
    {
      id: "26059",
      name: "Phường Tân Vạn",
      DistrictId: "731",
    },
    {
      id: "26062",
      name: "Phường Tân Hạnh",
      DistrictId: "731",
    },
    {
      id: "26065",
      name: "Phường Hiệp Hòa",
      DistrictId: "731",
    },
    {
      id: "26068",
      name: "Phường Hóa An",
      DistrictId: "731",
    },
    {
      id: "26071",
      name: "Phường Xuân Trung",
      DistrictId: "732",
    },
    {
      id: "26074",
      name: "Phường Xuân Thanh",
      DistrictId: "732",
    },
    {
      id: "26077",
      name: "Phường Xuân Bình",
      DistrictId: "732",
    },
    {
      id: "26080",
      name: "Phường Xuân An",
      DistrictId: "732",
    },
    {
      id: "26083",
      name: "Phường Xuân Hoà",
      DistrictId: "732",
    },
    {
      id: "26086",
      name: "Phường Phú Bình",
      DistrictId: "732",
    },
    {
      id: "26089",
      name: "Xã Bình Lộc",
      DistrictId: "732",
    },
    {
      id: "26092",
      name: "Xã Bảo Quang",
      DistrictId: "732",
    },
    {
      id: "26095",
      name: "Phường Suối Tre",
      DistrictId: "732",
    },
    {
      id: "26098",
      name: "Phường Bảo Vinh",
      DistrictId: "732",
    },
    {
      id: "26101",
      name: "Phường Xuân Lập",
      DistrictId: "732",
    },
    {
      id: "26104",
      name: "Phường Bàu Sen",
      DistrictId: "732",
    },
    {
      id: "26107",
      name: "Xã Bàu Trâm",
      DistrictId: "732",
    },
    {
      id: "26110",
      name: "Phường Xuân Tân",
      DistrictId: "732",
    },
    {
      id: "26113",
      name: "Xã Hàng Gòn",
      DistrictId: "732",
    },
    {
      id: "26116",
      name: "Thị trấn Tân Phú",
      DistrictId: "734",
    },
    {
      id: "26119",
      name: "Xã Dak Lua",
      DistrictId: "734",
    },
    {
      id: "26122",
      name: "Xã Nam Cát Tiên",
      DistrictId: "734",
    },
    {
      id: "26125",
      name: "Xã Phú An",
      DistrictId: "734",
    },
    {
      id: "26128",
      name: "Xã Núi Tượng",
      DistrictId: "734",
    },
    {
      id: "26131",
      name: "Xã Tà Lài",
      DistrictId: "734",
    },
    {
      id: "26134",
      name: "Xã Phú Lập",
      DistrictId: "734",
    },
    {
      id: "26137",
      name: "Xã Phú Sơn",
      DistrictId: "734",
    },
    {
      id: "26140",
      name: "Xã Phú Thịnh",
      DistrictId: "734",
    },
    {
      id: "26143",
      name: "Xã Thanh Sơn",
      DistrictId: "734",
    },
    {
      id: "26146",
      name: "Xã Phú Trung",
      DistrictId: "734",
    },
    {
      id: "26149",
      name: "Xã Phú Xuân",
      DistrictId: "734",
    },
    {
      id: "26152",
      name: "Xã Phú Lộc",
      DistrictId: "734",
    },
    {
      id: "26155",
      name: "Xã Phú Lâm",
      DistrictId: "734",
    },
    {
      id: "26158",
      name: "Xã Phú Bình",
      DistrictId: "734",
    },
    {
      id: "26161",
      name: "Xã Phú Thanh",
      DistrictId: "734",
    },
    {
      id: "26164",
      name: "Xã Trà Cổ",
      DistrictId: "734",
    },
    {
      id: "26167",
      name: "Xã Phú Điền",
      DistrictId: "734",
    },
    {
      id: "26170",
      name: "Thị trấn Vĩnh An",
      DistrictId: "735",
    },
    {
      id: "26173",
      name: "Xã Phú Lý",
      DistrictId: "735",
    },
    {
      id: "26176",
      name: "Xã Trị An",
      DistrictId: "735",
    },
    {
      id: "26179",
      name: "Xã Tân An",
      DistrictId: "735",
    },
    {
      id: "26182",
      name: "Xã Vĩnh Tân",
      DistrictId: "735",
    },
    {
      id: "26185",
      name: "Xã Bình Lợi",
      DistrictId: "735",
    },
    {
      id: "26188",
      name: "Xã Thạnh Phú",
      DistrictId: "735",
    },
    {
      id: "26191",
      name: "Xã Thiện Tân",
      DistrictId: "735",
    },
    {
      id: "26194",
      name: "Xã Tân Bình",
      DistrictId: "735",
    },
    {
      id: "26197",
      name: "Xã Bình Hòa",
      DistrictId: "735",
    },
    {
      id: "26200",
      name: "Xã Mã Đà",
      DistrictId: "735",
    },
    {
      id: "26203",
      name: "Xã Hiếu Liêm",
      DistrictId: "735",
    },
    {
      id: "26206",
      name: "Thị trấn Định Quán",
      DistrictId: "736",
    },
    {
      id: "26209",
      name: "Xã Thanh Sơn",
      DistrictId: "736",
    },
    {
      id: "26212",
      name: "Xã Phú Tân",
      DistrictId: "736",
    },
    {
      id: "26215",
      name: "Xã Phú Vinh",
      DistrictId: "736",
    },
    {
      id: "26218",
      name: "Xã Phú Lợi",
      DistrictId: "736",
    },
    {
      id: "26221",
      name: "Xã Phú Hòa",
      DistrictId: "736",
    },
    {
      id: "26224",
      name: "Xã Ngọc Định",
      DistrictId: "736",
    },
    {
      id: "26227",
      name: "Xã La Ngà",
      DistrictId: "736",
    },
    {
      id: "26230",
      name: "Xã Gia Canh",
      DistrictId: "736",
    },
    {
      id: "26233",
      name: "Xã Phú Ngọc",
      DistrictId: "736",
    },
    {
      id: "26236",
      name: "Xã Phú Cường",
      DistrictId: "736",
    },
    {
      id: "26239",
      name: "Xã Túc Trưng",
      DistrictId: "736",
    },
    {
      id: "26242",
      name: "Xã Phú Túc",
      DistrictId: "736",
    },
    {
      id: "26245",
      name: "Xã Suối Nho",
      DistrictId: "736",
    },
    {
      id: "26248",
      name: "Thị trấn Trảng Bom",
      DistrictId: "737",
    },
    {
      id: "26251",
      name: "Xã Thanh Bình",
      DistrictId: "737",
    },
    {
      id: "26254",
      name: "Xã Cây Gáo",
      DistrictId: "737",
    },
    {
      id: "26257",
      name: "Xã Bàu Hàm",
      DistrictId: "737",
    },
    {
      id: "26260",
      name: "Xã Sông Thao",
      DistrictId: "737",
    },
    {
      id: "26263",
      name: "Xã Sông Trầu",
      DistrictId: "737",
    },
    {
      id: "26266",
      name: "Xã Đông Hoà",
      DistrictId: "737",
    },
    {
      id: "26269",
      name: "Xã Bắc Sơn",
      DistrictId: "737",
    },
    {
      id: "26272",
      name: "Xã Hố Nai 3",
      DistrictId: "737",
    },
    {
      id: "26275",
      name: "Xã Tây Hoà",
      DistrictId: "737",
    },
    {
      id: "26278",
      name: "Xã Bình Minh",
      DistrictId: "737",
    },
    {
      id: "26281",
      name: "Xã Trung Hoà",
      DistrictId: "737",
    },
    {
      id: "26284",
      name: "Xã Đồi 61",
      DistrictId: "737",
    },
    {
      id: "26287",
      name: "Xã Hưng Thịnh",
      DistrictId: "737",
    },
    {
      id: "26290",
      name: "Xã Quảng Tiến",
      DistrictId: "737",
    },
    {
      id: "26293",
      name: "Xã Giang Điền",
      DistrictId: "737",
    },
    {
      id: "26296",
      name: "Xã An Viễn",
      DistrictId: "737",
    },
    {
      id: "26299",
      name: "Xã Gia Tân 1",
      DistrictId: "738",
    },
    {
      id: "26302",
      name: "Xã Gia Tân 2",
      DistrictId: "738",
    },
    {
      id: "26305",
      name: "Xã Gia Tân 3",
      DistrictId: "738",
    },
    {
      id: "26308",
      name: "Xã Gia Kiệm",
      DistrictId: "738",
    },
    {
      id: "26311",
      name: "Xã Quang Trung",
      DistrictId: "738",
    },
    {
      id: "26314",
      name: "Xã Bàu Hàm 2",
      DistrictId: "738",
    },
    {
      id: "26317",
      name: "Xã Hưng Lộc",
      DistrictId: "738",
    },
    {
      id: "26320",
      name: "Xã Lộ 25",
      DistrictId: "738",
    },
    {
      id: "26323",
      name: "Xã Xuân Thiện",
      DistrictId: "738",
    },
    {
      id: "26326",
      name: "Thị trấn Dầu Giây",
      DistrictId: "738",
    },
    {
      id: "26329",
      name: "Xã Sông Nhạn",
      DistrictId: "739",
    },
    {
      id: "26332",
      name: "Xã Xuân Quế",
      DistrictId: "739",
    },
    {
      id: "26335",
      name: "Xã Nhân Nghĩa",
      DistrictId: "739",
    },
    {
      id: "26338",
      name: "Xã Xuân Đường",
      DistrictId: "739",
    },
    {
      id: "26341",
      name: "Thị trấn Long Giao",
      DistrictId: "739",
    },
    {
      id: "26344",
      name: "Xã Xuân Mỹ",
      DistrictId: "739",
    },
    {
      id: "26347",
      name: "Xã Thừa Đức",
      DistrictId: "739",
    },
    {
      id: "26350",
      name: "Xã Bảo Bình",
      DistrictId: "739",
    },
    {
      id: "26353",
      name: "Xã Xuân Bảo",
      DistrictId: "739",
    },
    {
      id: "26356",
      name: "Xã Xuân Tây",
      DistrictId: "739",
    },
    {
      id: "26359",
      name: "Xã Xuân Đông",
      DistrictId: "739",
    },
    {
      id: "26362",
      name: "Xã Sông Ray",
      DistrictId: "739",
    },
    {
      id: "26365",
      name: "Xã Lâm San",
      DistrictId: "739",
    },
    {
      id: "26368",
      name: "Thị trấn Long Thành",
      DistrictId: "740",
    },
    {
      id: "26371",
      name: "Phường An Hòa",
      DistrictId: "731",
    },
    {
      id: "26374",
      name: "Phường Tam Phước",
      DistrictId: "731",
    },
    {
      id: "26377",
      name: "Phường Phước Tân",
      DistrictId: "731",
    },
    {
      id: "26380",
      name: "Xã Long Hưng",
      DistrictId: "731",
    },
    {
      id: "26383",
      name: "Xã An Phước",
      DistrictId: "740",
    },
    {
      id: "26386",
      name: "Xã Bình An",
      DistrictId: "740",
    },
    {
      id: "26389",
      name: "Xã Long Đức",
      DistrictId: "740",
    },
    {
      id: "26392",
      name: "Xã Lộc An",
      DistrictId: "740",
    },
    {
      id: "26395",
      name: "Xã Bình Sơn",
      DistrictId: "740",
    },
    {
      id: "26398",
      name: "Xã Tam An",
      DistrictId: "740",
    },
    {
      id: "26401",
      name: "Xã Cẩm Đường",
      DistrictId: "740",
    },
    {
      id: "26404",
      name: "Xã Long An",
      DistrictId: "740",
    },
    {
      id: "26410",
      name: "Xã Bàu Cạn",
      DistrictId: "740",
    },
    {
      id: "26413",
      name: "Xã Long Phước",
      DistrictId: "740",
    },
    {
      id: "26416",
      name: "Xã Phước Bình",
      DistrictId: "740",
    },
    {
      id: "26419",
      name: "Xã Tân Hiệp",
      DistrictId: "740",
    },
    {
      id: "26422",
      name: "Xã Phước Thái",
      DistrictId: "740",
    },
    {
      id: "26425",
      name: "Thị trấn Gia Ray",
      DistrictId: "741",
    },
    {
      id: "26428",
      name: "Xã Xuân Bắc",
      DistrictId: "741",
    },
    {
      id: "26431",
      name: "Xã Suối Cao",
      DistrictId: "741",
    },
    {
      id: "26434",
      name: "Xã Xuân Thành",
      DistrictId: "741",
    },
    {
      id: "26437",
      name: "Xã Xuân Thọ",
      DistrictId: "741",
    },
    {
      id: "26440",
      name: "Xã Xuân Trường",
      DistrictId: "741",
    },
    {
      id: "26443",
      name: "Xã Xuân Hòa",
      DistrictId: "741",
    },
    {
      id: "26446",
      name: "Xã Xuân Hưng",
      DistrictId: "741",
    },
    {
      id: "26449",
      name: "Xã Xuân Tâm",
      DistrictId: "741",
    },
    {
      id: "26452",
      name: "Xã Suối Cát",
      DistrictId: "741",
    },
    {
      id: "26455",
      name: "Xã Xuân Hiệp",
      DistrictId: "741",
    },
    {
      id: "26458",
      name: "Xã Xuân Phú",
      DistrictId: "741",
    },
    {
      id: "26461",
      name: "Xã Xuân Định",
      DistrictId: "741",
    },
    {
      id: "26464",
      name: "Xã Bảo Hoà",
      DistrictId: "741",
    },
    {
      id: "26467",
      name: "Xã Lang Minh",
      DistrictId: "741",
    },
    {
      id: "26470",
      name: "Xã Phước Thiền",
      DistrictId: "742",
    },
    {
      id: "26473",
      name: "Xã Long Tân",
      DistrictId: "742",
    },
    {
      id: "26476",
      name: "Xã Đại Phước",
      DistrictId: "742",
    },
    {
      id: "26479",
      name: "Thị trấn Hiệp Phước",
      DistrictId: "742",
    },
    {
      id: "26482",
      name: "Xã Phú Hữu",
      DistrictId: "742",
    },
    {
      id: "26485",
      name: "Xã Phú Hội",
      DistrictId: "742",
    },
    {
      id: "26488",
      name: "Xã Phú Thạnh",
      DistrictId: "742",
    },
    {
      id: "26491",
      name: "Xã Phú Đông",
      DistrictId: "742",
    },
    {
      id: "26494",
      name: "Xã Long Thọ",
      DistrictId: "742",
    },
    {
      id: "26497",
      name: "Xã Vĩnh Thanh",
      DistrictId: "742",
    },
    {
      id: "26500",
      name: "Xã Phước Khánh",
      DistrictId: "742",
    },
    {
      id: "26503",
      name: "Xã Phước An",
      DistrictId: "742",
    },
    {
      id: "26506",
      name: "Phường 1",
      DistrictId: "747",
    },
    {
      id: "26508",
      name: "Phường Thắng Tam",
      DistrictId: "747",
    },
    {
      id: "26509",
      name: "Phường 2",
      DistrictId: "747",
    },
    {
      id: "26512",
      name: "Phường 3",
      DistrictId: "747",
    },
    {
      id: "26515",
      name: "Phường 4",
      DistrictId: "747",
    },
    {
      id: "26518",
      name: "Phường 5",
      DistrictId: "747",
    },
    {
      id: "26521",
      name: "Phường Thắng Nhì",
      DistrictId: "747",
    },
    {
      id: "26524",
      name: "Phường 7",
      DistrictId: "747",
    },
    {
      id: "26526",
      name: "Phường Nguyễn An Ninh",
      DistrictId: "747",
    },
    {
      id: "26527",
      name: "Phường 8",
      DistrictId: "747",
    },
    {
      id: "26530",
      name: "Phường 9",
      DistrictId: "747",
    },
    {
      id: "26533",
      name: "Phường Thắng Nhất",
      DistrictId: "747",
    },
    {
      id: "26535",
      name: "Phường Rạch Dừa",
      DistrictId: "747",
    },
    {
      id: "26536",
      name: "Phường 10",
      DistrictId: "747",
    },
    {
      id: "26539",
      name: "Phường 11",
      DistrictId: "747",
    },
    {
      id: "26542",
      name: "Phường 12",
      DistrictId: "747",
    },
    {
      id: "26545",
      name: "Xã Long Sơn",
      DistrictId: "747",
    },
    {
      id: "26548",
      name: "Phường Phước Hưng",
      DistrictId: "748",
    },
    {
      id: "26551",
      name: "Phường Phước Hiệp",
      DistrictId: "748",
    },
    {
      id: "26554",
      name: "Phường Phước Nguyên",
      DistrictId: "748",
    },
    {
      id: "26557",
      name: "Phường Long Toàn",
      DistrictId: "748",
    },
    {
      id: "26558",
      name: "Phường Long Tâm",
      DistrictId: "748",
    },
    {
      id: "26560",
      name: "Phường Phước Trung",
      DistrictId: "748",
    },
    {
      id: "26563",
      name: "Phường Long Hương",
      DistrictId: "748",
    },
    {
      id: "26566",
      name: "Phường Kim Dinh",
      DistrictId: "748",
    },
    {
      id: "26567",
      name: "Xã Tân Hưng",
      DistrictId: "748",
    },
    {
      id: "26569",
      name: "Xã Long Phước",
      DistrictId: "748",
    },
    {
      id: "26572",
      name: "Xã Hoà Long",
      DistrictId: "748",
    },
    {
      id: "26574",
      name: "Xã Bàu Chinh",
      DistrictId: "750",
    },
    {
      id: "26575",
      name: "Thị trấn Ngãi Giao",
      DistrictId: "750",
    },
    {
      id: "26578",
      name: "Xã Bình Ba",
      DistrictId: "750",
    },
    {
      id: "26581",
      name: "Xã Suối Nghệ",
      DistrictId: "750",
    },
    {
      id: "26584",
      name: "Xã Xuân Sơn",
      DistrictId: "750",
    },
    {
      id: "26587",
      name: "Xã Sơn Bình",
      DistrictId: "750",
    },
    {
      id: "26590",
      name: "Xã Bình Giã",
      DistrictId: "750",
    },
    {
      id: "26593",
      name: "Xã Bình Trung",
      DistrictId: "750",
    },
    {
      id: "26596",
      name: "Xã Xà Bang",
      DistrictId: "750",
    },
    {
      id: "26599",
      name: "Xã Cù Bị",
      DistrictId: "750",
    },
    {
      id: "26602",
      name: "Xã Láng Lớn",
      DistrictId: "750",
    },
    {
      id: "26605",
      name: "Xã Quảng Thành",
      DistrictId: "750",
    },
    {
      id: "26608",
      name: "Xã Kim Long",
      DistrictId: "750",
    },
    {
      id: "26611",
      name: "Xã Suối Rao",
      DistrictId: "750",
    },
    {
      id: "26614",
      name: "Xã Đá Bạc",
      DistrictId: "750",
    },
    {
      id: "26617",
      name: "Xã Nghĩa Thành",
      DistrictId: "750",
    },
    {
      id: "26620",
      name: "Thị trấn Phước Bửu",
      DistrictId: "751",
    },
    {
      id: "26623",
      name: "Xã Phước Thuận",
      DistrictId: "751",
    },
    {
      id: "26626",
      name: "Xã Phước Tân",
      DistrictId: "751",
    },
    {
      id: "26629",
      name: "Xã Xuyên Mộc",
      DistrictId: "751",
    },
    {
      id: "26632",
      name: "Xã Bông Trang",
      DistrictId: "751",
    },
    {
      id: "26635",
      name: "Xã Tân Lâm",
      DistrictId: "751",
    },
    {
      id: "26638",
      name: "Xã Bàu Lâm",
      DistrictId: "751",
    },
    {
      id: "26641",
      name: "Xã Hòa Bình",
      DistrictId: "751",
    },
    {
      id: "26644",
      name: "Xã Hòa Hưng",
      DistrictId: "751",
    },
    {
      id: "26647",
      name: "Xã Hòa Hiệp",
      DistrictId: "751",
    },
    {
      id: "26650",
      name: "Xã Hòa Hội",
      DistrictId: "751",
    },
    {
      id: "26653",
      name: "Xã Bưng Riềng",
      DistrictId: "751",
    },
    {
      id: "26656",
      name: "Xã Bình Châu",
      DistrictId: "751",
    },
    {
      id: "26659",
      name: "Thị trấn Long Điền",
      DistrictId: "752",
    },
    {
      id: "26662",
      name: "Thị trấn Long Hải",
      DistrictId: "752",
    },
    {
      id: "26665",
      name: "Xã An Ngãi",
      DistrictId: "752",
    },
    {
      id: "26668",
      name: "Xã Tam Phước",
      DistrictId: "752",
    },
    {
      id: "26671",
      name: "Xã An Nhứt",
      DistrictId: "752",
    },
    {
      id: "26674",
      name: "Xã Phước Tỉnh",
      DistrictId: "752",
    },
    {
      id: "26677",
      name: "Xã Phước Hưng",
      DistrictId: "752",
    },
    {
      id: "26680",
      name: "Thị trấn Đất Đỏ",
      DistrictId: "753",
    },
    {
      id: "26683",
      name: "Xã Phước Long Thọ",
      DistrictId: "753",
    },
    {
      id: "26686",
      name: "Xã Phước Hội",
      DistrictId: "753",
    },
    {
      id: "26689",
      name: "Xã Long Mỹ",
      DistrictId: "753",
    },
    {
      id: "26692",
      name: "Thị trấn Phước Hải",
      DistrictId: "753",
    },
    {
      id: "26695",
      name: "Xã Long Tân",
      DistrictId: "753",
    },
    {
      id: "26698",
      name: "Xã Láng Dài",
      DistrictId: "753",
    },
    {
      id: "26701",
      name: "Xã Lộc An",
      DistrictId: "753",
    },
    {
      id: "26704",
      name: "Phường Phú Mỹ",
      DistrictId: "754",
    },
    {
      id: "26707",
      name: "Xã Tân Hoà",
      DistrictId: "754",
    },
    {
      id: "26710",
      name: "Xã Tân Hải",
      DistrictId: "754",
    },
    {
      id: "26713",
      name: "Phường Phước Hoà",
      DistrictId: "754",
    },
    {
      id: "26716",
      name: "Phường Tân Phước",
      DistrictId: "754",
    },
    {
      id: "26719",
      name: "Phường Mỹ Xuân",
      DistrictId: "754",
    },
    {
      id: "26722",
      name: "Xã Sông Xoài",
      DistrictId: "754",
    },
    {
      id: "26725",
      name: "Phường Hắc Dịch",
      DistrictId: "754",
    },
    {
      id: "26728",
      name: "Xã Châu Pha",
      DistrictId: "754",
    },
    {
      id: "26731",
      name: "Xã Tóc Tiên",
      DistrictId: "754",
    },
    {
      id: "26734",
      name: "Phường Tân Định",
      DistrictId: "760",
    },
    {
      id: "26737",
      name: "Phường Đa Kao",
      DistrictId: "760",
    },
    {
      id: "26740",
      name: "Phường Bến Nghé",
      DistrictId: "760",
    },
    {
      id: "26743",
      name: "Phường Bến Thành",
      DistrictId: "760",
    },
    {
      id: "26746",
      name: "Phường Nguyễn Thái Bình",
      DistrictId: "760",
    },
    {
      id: "26749",
      name: "Phường Phạm Ngũ Lão",
      DistrictId: "760",
    },
    {
      id: "26752",
      name: "Phường Cầu Ông Lãnh",
      DistrictId: "760",
    },
    {
      id: "26755",
      name: "Phường Cô Giang",
      DistrictId: "760",
    },
    {
      id: "26758",
      name: "Phường Nguyễn Cư Trinh",
      DistrictId: "760",
    },
    {
      id: "26761",
      name: "Phường Cầu Kho",
      DistrictId: "760",
    },
    {
      id: "26764",
      name: "Phường Thạnh Xuân",
      DistrictId: "761",
    },
    {
      id: "26767",
      name: "Phường Thạnh Lộc",
      DistrictId: "761",
    },
    {
      id: "26770",
      name: "Phường Hiệp Thành",
      DistrictId: "761",
    },
    {
      id: "26773",
      name: "Phường Thới An",
      DistrictId: "761",
    },
    {
      id: "26776",
      name: "Phường Tân Chánh Hiệp",
      DistrictId: "761",
    },
    {
      id: "26779",
      name: "Phường An Phú Đông",
      DistrictId: "761",
    },
    {
      id: "26782",
      name: "Phường Tân Thới Hiệp",
      DistrictId: "761",
    },
    {
      id: "26785",
      name: "Phường Trung Mỹ Tây",
      DistrictId: "761",
    },
    {
      id: "26787",
      name: "Phường Tân Hưng Thuận",
      DistrictId: "761",
    },
    {
      id: "26788",
      name: "Phường Đông Hưng Thuận",
      DistrictId: "761",
    },
    {
      id: "26791",
      name: "Phường Tân Thới Nhất",
      DistrictId: "761",
    },
    {
      id: "26794",
      name: "Phường Linh Xuân",
      DistrictId: "769",
    },
    {
      id: "26797",
      name: "Phường Bình Chiểu",
      DistrictId: "769",
    },
    {
      id: "26800",
      name: "Phường Linh Trung",
      DistrictId: "769",
    },
    {
      id: "26803",
      name: "Phường Tam Bình",
      DistrictId: "769",
    },
    {
      id: "26806",
      name: "Phường Tam Phú",
      DistrictId: "769",
    },
    {
      id: "26809",
      name: "Phường Hiệp Bình Phước",
      DistrictId: "769",
    },
    {
      id: "26812",
      name: "Phường Hiệp Bình Chánh",
      DistrictId: "769",
    },
    {
      id: "26815",
      name: "Phường Linh Chiểu",
      DistrictId: "769",
    },
    {
      id: "26818",
      name: "Phường Linh Tây",
      DistrictId: "769",
    },
    {
      id: "26821",
      name: "Phường Linh Đông",
      DistrictId: "769",
    },
    {
      id: "26824",
      name: "Phường Bình Thọ",
      DistrictId: "769",
    },
    {
      id: "26827",
      name: "Phường Trường Thọ",
      DistrictId: "769",
    },
    {
      id: "26830",
      name: "Phường Long Bình",
      DistrictId: "769",
    },
    {
      id: "26833",
      name: "Phường Long Thạnh Mỹ",
      DistrictId: "769",
    },
    {
      id: "26836",
      name: "Phường Tân Phú",
      DistrictId: "769",
    },
    {
      id: "26839",
      name: "Phường Hiệp Phú",
      DistrictId: "769",
    },
    {
      id: "26842",
      name: "Phường Tăng Nhơn Phú A",
      DistrictId: "769",
    },
    {
      id: "26845",
      name: "Phường Tăng Nhơn Phú B",
      DistrictId: "769",
    },
    {
      id: "26848",
      name: "Phường Phước Long B",
      DistrictId: "769",
    },
    {
      id: "26851",
      name: "Phường Phước Long A",
      DistrictId: "769",
    },
    {
      id: "26854",
      name: "Phường Trường Thạnh",
      DistrictId: "769",
    },
    {
      id: "26857",
      name: "Phường Long Phước",
      DistrictId: "769",
    },
    {
      id: "26860",
      name: "Phường Long Trường",
      DistrictId: "769",
    },
    {
      id: "26863",
      name: "Phường Phước Bình",
      DistrictId: "769",
    },
    {
      id: "26866",
      name: "Phường Phú Hữu",
      DistrictId: "769",
    },
    {
      id: "26869",
      name: "Phường 15",
      DistrictId: "764",
    },
    {
      id: "26872",
      name: "Phường 13",
      DistrictId: "764",
    },
    {
      id: "26875",
      name: "Phường 17",
      DistrictId: "764",
    },
    {
      id: "26876",
      name: "Phường 6",
      DistrictId: "764",
    },
    {
      id: "26878",
      name: "Phường 16",
      DistrictId: "764",
    },
    {
      id: "26881",
      name: "Phường 12",
      DistrictId: "764",
    },
    {
      id: "26882",
      name: "Phường 14",
      DistrictId: "764",
    },
    {
      id: "26884",
      name: "Phường 10",
      DistrictId: "764",
    },
    {
      id: "26887",
      name: "Phường 05",
      DistrictId: "764",
    },
    {
      id: "26890",
      name: "Phường 07",
      DistrictId: "764",
    },
    {
      id: "26893",
      name: "Phường 04",
      DistrictId: "764",
    },
    {
      id: "26896",
      name: "Phường 01",
      DistrictId: "764",
    },
    {
      id: "26897",
      name: "Phường 9",
      DistrictId: "764",
    },
    {
      id: "26898",
      name: "Phường 8",
      DistrictId: "764",
    },
    {
      id: "26899",
      name: "Phường 11",
      DistrictId: "764",
    },
    {
      id: "26902",
      name: "Phường 03",
      DistrictId: "764",
    },
    {
      id: "26905",
      name: "Phường 13",
      DistrictId: "765",
    },
    {
      id: "26908",
      name: "Phường 11",
      DistrictId: "765",
    },
    {
      id: "26911",
      name: "Phường 27",
      DistrictId: "765",
    },
    {
      id: "26914",
      name: "Phường 26",
      DistrictId: "765",
    },
    {
      id: "26917",
      name: "Phường 12",
      DistrictId: "765",
    },
    {
      id: "26920",
      name: "Phường 25",
      DistrictId: "765",
    },
    {
      id: "26923",
      name: "Phường 05",
      DistrictId: "765",
    },
    {
      id: "26926",
      name: "Phường 07",
      DistrictId: "765",
    },
    {
      id: "26929",
      name: "Phường 24",
      DistrictId: "765",
    },
    {
      id: "26932",
      name: "Phường 06",
      DistrictId: "765",
    },
    {
      id: "26935",
      name: "Phường 14",
      DistrictId: "765",
    },
    {
      id: "26938",
      name: "Phường 15",
      DistrictId: "765",
    },
    {
      id: "26941",
      name: "Phường 02",
      DistrictId: "765",
    },
    {
      id: "26944",
      name: "Phường 01",
      DistrictId: "765",
    },
    {
      id: "26947",
      name: "Phường 03",
      DistrictId: "765",
    },
    {
      id: "26950",
      name: "Phường 17",
      DistrictId: "765",
    },
    {
      id: "26953",
      name: "Phường 21",
      DistrictId: "765",
    },
    {
      id: "26956",
      name: "Phường 22",
      DistrictId: "765",
    },
    {
      id: "26959",
      name: "Phường 19",
      DistrictId: "765",
    },
    {
      id: "26962",
      name: "Phường 28",
      DistrictId: "765",
    },
    {
      id: "26965",
      name: "Phường 02",
      DistrictId: "766",
    },
    {
      id: "26968",
      name: "Phường 04",
      DistrictId: "766",
    },
    {
      id: "26971",
      name: "Phường 12",
      DistrictId: "766",
    },
    {
      id: "26974",
      name: "Phường 13",
      DistrictId: "766",
    },
    {
      id: "26977",
      name: "Phường 01",
      DistrictId: "766",
    },
    {
      id: "26980",
      name: "Phường 03",
      DistrictId: "766",
    },
    {
      id: "26983",
      name: "Phường 11",
      DistrictId: "766",
    },
    {
      id: "26986",
      name: "Phường 07",
      DistrictId: "766",
    },
    {
      id: "26989",
      name: "Phường 05",
      DistrictId: "766",
    },
    {
      id: "26992",
      name: "Phường 10",
      DistrictId: "766",
    },
    {
      id: "26995",
      name: "Phường 06",
      DistrictId: "766",
    },
    {
      id: "26998",
      name: "Phường 08",
      DistrictId: "766",
    },
    {
      id: "27001",
      name: "Phường 09",
      DistrictId: "766",
    },
    {
      id: "27004",
      name: "Phường 14",
      DistrictId: "766",
    },
    {
      id: "27007",
      name: "Phường 15",
      DistrictId: "766",
    },
    {
      id: "27010",
      name: "Phường Tân Sơn Nhì",
      DistrictId: "767",
    },
    {
      id: "27013",
      name: "Phường Tây Thạnh",
      DistrictId: "767",
    },
    {
      id: "27016",
      name: "Phường Sơn Kỳ",
      DistrictId: "767",
    },
    {
      id: "27019",
      name: "Phường Tân Quý",
      DistrictId: "767",
    },
    {
      id: "27022",
      name: "Phường Tân Thành",
      DistrictId: "767",
    },
    {
      id: "27025",
      name: "Phường Phú Thọ Hòa",
      DistrictId: "767",
    },
    {
      id: "27028",
      name: "Phường Phú Thạnh",
      DistrictId: "767",
    },
    {
      id: "27031",
      name: "Phường Phú Trung",
      DistrictId: "767",
    },
    {
      id: "27034",
      name: "Phường Hòa Thạnh",
      DistrictId: "767",
    },
    {
      id: "27037",
      name: "Phường Hiệp Tân",
      DistrictId: "767",
    },
    {
      id: "27040",
      name: "Phường Tân Thới Hòa",
      DistrictId: "767",
    },
    {
      id: "27043",
      name: "Phường 04",
      DistrictId: "768",
    },
    {
      id: "27046",
      name: "Phường 05",
      DistrictId: "768",
    },
    {
      id: "27049",
      name: "Phường 09",
      DistrictId: "768",
    },
    {
      id: "27052",
      name: "Phường 07",
      DistrictId: "768",
    },
    {
      id: "27055",
      name: "Phường 03",
      DistrictId: "768",
    },
    {
      id: "27058",
      name: "Phường 01",
      DistrictId: "768",
    },
    {
      id: "27061",
      name: "Phường 02",
      DistrictId: "768",
    },
    {
      id: "27064",
      name: "Phường 08",
      DistrictId: "768",
    },
    {
      id: "27067",
      name: "Phường 15",
      DistrictId: "768",
    },
    {
      id: "27070",
      name: "Phường 10",
      DistrictId: "768",
    },
    {
      id: "27073",
      name: "Phường 11",
      DistrictId: "768",
    },
    {
      id: "27076",
      name: "Phường 17",
      DistrictId: "768",
    },
    {
      id: "27085",
      name: "Phường 13",
      DistrictId: "768",
    },
    {
      id: "27088",
      name: "Phường Thảo Điền",
      DistrictId: "769",
    },
    {
      id: "27091",
      name: "Phường An Phú",
      DistrictId: "769",
    },
    {
      id: "27094",
      name: "Phường An Khánh",
      DistrictId: "769",
    },
    {
      id: "27097",
      name: "Phường Bình Trưng Đông",
      DistrictId: "769",
    },
    {
      id: "27100",
      name: "Phường Bình Trưng Tây",
      DistrictId: "769",
    },
    {
      id: "27109",
      name: "Phường Cát Lái",
      DistrictId: "769",
    },
    {
      id: "27112",
      name: "Phường Thạnh Mỹ Lợi",
      DistrictId: "769",
    },
    {
      id: "27115",
      name: "Phường An Lợi Đông",
      DistrictId: "769",
    },
    {
      id: "27118",
      name: "Phường Thủ Thiêm",
      DistrictId: "769",
    },
    {
      id: "27127",
      name: "Phường 14",
      DistrictId: "770",
    },
    {
      id: "27130",
      name: "Phường 12",
      DistrictId: "770",
    },
    {
      id: "27133",
      name: "Phường 11",
      DistrictId: "770",
    },
    {
      id: "27136",
      name: "Phường 13",
      DistrictId: "770",
    },
    {
      id: "27139",
      name: "Phường Võ Thị Sáu",
      DistrictId: "770",
    },
    {
      id: "27142",
      name: "Phường 09",
      DistrictId: "770",
    },
    {
      id: "27145",
      name: "Phường 10",
      DistrictId: "770",
    },
    {
      id: "27148",
      name: "Phường 04",
      DistrictId: "770",
    },
    {
      id: "27151",
      name: "Phường 05",
      DistrictId: "770",
    },
    {
      id: "27154",
      name: "Phường 03",
      DistrictId: "770",
    },
    {
      id: "27157",
      name: "Phường 02",
      DistrictId: "770",
    },
    {
      id: "27160",
      name: "Phường 01",
      DistrictId: "770",
    },
    {
      id: "27163",
      name: "Phường 15",
      DistrictId: "771",
    },
    {
      id: "27166",
      name: "Phường 13",
      DistrictId: "771",
    },
    {
      id: "27169",
      name: "Phường 14",
      DistrictId: "771",
    },
    {
      id: "27172",
      name: "Phường 12",
      DistrictId: "771",
    },
    {
      id: "27175",
      name: "Phường 11",
      DistrictId: "771",
    },
    {
      id: "27178",
      name: "Phường 10",
      DistrictId: "771",
    },
    {
      id: "27181",
      name: "Phường 09",
      DistrictId: "771",
    },
    {
      id: "27184",
      name: "Phường 01",
      DistrictId: "771",
    },
    {
      id: "27187",
      name: "Phường 08",
      DistrictId: "771",
    },
    {
      id: "27190",
      name: "Phường 02",
      DistrictId: "771",
    },
    {
      id: "27193",
      name: "Phường 04",
      DistrictId: "771",
    },
    {
      id: "27196",
      name: "Phường 07",
      DistrictId: "771",
    },
    {
      id: "27199",
      name: "Phường 05",
      DistrictId: "771",
    },
    {
      id: "27202",
      name: "Phường 06",
      DistrictId: "771",
    },
    {
      id: "27208",
      name: "Phường 15",
      DistrictId: "772",
    },
    {
      id: "27211",
      name: "Phường 05",
      DistrictId: "772",
    },
    {
      id: "27214",
      name: "Phường 14",
      DistrictId: "772",
    },
    {
      id: "27217",
      name: "Phường 11",
      DistrictId: "772",
    },
    {
      id: "27220",
      name: "Phường 03",
      DistrictId: "772",
    },
    {
      id: "27223",
      name: "Phường 10",
      DistrictId: "772",
    },
    {
      id: "27226",
      name: "Phường 13",
      DistrictId: "772",
    },
    {
      id: "27229",
      name: "Phường 08",
      DistrictId: "772",
    },
    {
      id: "27232",
      name: "Phường 09",
      DistrictId: "772",
    },
    {
      id: "27235",
      name: "Phường 12",
      DistrictId: "772",
    },
    {
      id: "27238",
      name: "Phường 07",
      DistrictId: "772",
    },
    {
      id: "27241",
      name: "Phường 06",
      DistrictId: "772",
    },
    {
      id: "27244",
      name: "Phường 04",
      DistrictId: "772",
    },
    {
      id: "27247",
      name: "Phường 01",
      DistrictId: "772",
    },
    {
      id: "27250",
      name: "Phường 02",
      DistrictId: "772",
    },
    {
      id: "27253",
      name: "Phường 16",
      DistrictId: "772",
    },
    {
      id: "27259",
      name: "Phường 13",
      DistrictId: "773",
    },
    {
      id: "27262",
      name: "Phường 09",
      DistrictId: "773",
    },
    {
      id: "27265",
      name: "Phường 06",
      DistrictId: "773",
    },
    {
      id: "27268",
      name: "Phường 08",
      DistrictId: "773",
    },
    {
      id: "27271",
      name: "Phường 10",
      DistrictId: "773",
    },
    {
      id: "27277",
      name: "Phường 18",
      DistrictId: "773",
    },
    {
      id: "27280",
      name: "Phường 14",
      DistrictId: "773",
    },
    {
      id: "27283",
      name: "Phường 04",
      DistrictId: "773",
    },
    {
      id: "27286",
      name: "Phường 03",
      DistrictId: "773",
    },
    {
      id: "27289",
      name: "Phường 16",
      DistrictId: "773",
    },
    {
      id: "27292",
      name: "Phường 02",
      DistrictId: "773",
    },
    {
      id: "27295",
      name: "Phường 15",
      DistrictId: "773",
    },
    {
      id: "27298",
      name: "Phường 01",
      DistrictId: "773",
    },
    {
      id: "27301",
      name: "Phường 04",
      DistrictId: "774",
    },
    {
      id: "27304",
      name: "Phường 09",
      DistrictId: "774",
    },
    {
      id: "27307",
      name: "Phường 03",
      DistrictId: "774",
    },
    {
      id: "27310",
      name: "Phường 12",
      DistrictId: "774",
    },
    {
      id: "27313",
      name: "Phường 02",
      DistrictId: "774",
    },
    {
      id: "27316",
      name: "Phường 08",
      DistrictId: "774",
    },
    {
      id: "27322",
      name: "Phường 07",
      DistrictId: "774",
    },
    {
      id: "27325",
      name: "Phường 01",
      DistrictId: "774",
    },
    {
      id: "27328",
      name: "Phường 11",
      DistrictId: "774",
    },
    {
      id: "27331",
      name: "Phường 14",
      DistrictId: "774",
    },
    {
      id: "27334",
      name: "Phường 05",
      DistrictId: "774",
    },
    {
      id: "27337",
      name: "Phường 06",
      DistrictId: "774",
    },
    {
      id: "27340",
      name: "Phường 10",
      DistrictId: "774",
    },
    {
      id: "27343",
      name: "Phường 13",
      DistrictId: "774",
    },
    {
      id: "27346",
      name: "Phường 14",
      DistrictId: "775",
    },
    {
      id: "27349",
      name: "Phường 13",
      DistrictId: "775",
    },
    {
      id: "27352",
      name: "Phường 09",
      DistrictId: "775",
    },
    {
      id: "27355",
      name: "Phường 06",
      DistrictId: "775",
    },
    {
      id: "27358",
      name: "Phường 12",
      DistrictId: "775",
    },
    {
      id: "27361",
      name: "Phường 05",
      DistrictId: "775",
    },
    {
      id: "27364",
      name: "Phường 11",
      DistrictId: "775",
    },
    {
      id: "27367",
      name: "Phường 02",
      DistrictId: "775",
    },
    {
      id: "27370",
      name: "Phường 01",
      DistrictId: "775",
    },
    {
      id: "27373",
      name: "Phường 04",
      DistrictId: "775",
    },
    {
      id: "27376",
      name: "Phường 08",
      DistrictId: "775",
    },
    {
      id: "27379",
      name: "Phường 03",
      DistrictId: "775",
    },
    {
      id: "27382",
      name: "Phường 07",
      DistrictId: "775",
    },
    {
      id: "27385",
      name: "Phường 10",
      DistrictId: "775",
    },
    {
      id: "27388",
      name: "Phường 08",
      DistrictId: "776",
    },
    {
      id: "27391",
      name: "Phường 02",
      DistrictId: "776",
    },
    {
      id: "27394",
      name: "Phường 01",
      DistrictId: "776",
    },
    {
      id: "27397",
      name: "Phường 03",
      DistrictId: "776",
    },
    {
      id: "27400",
      name: "Phường 11",
      DistrictId: "776",
    },
    {
      id: "27403",
      name: "Phường 09",
      DistrictId: "776",
    },
    {
      id: "27406",
      name: "Phường 10",
      DistrictId: "776",
    },
    {
      id: "27409",
      name: "Phường 04",
      DistrictId: "776",
    },
    {
      id: "27412",
      name: "Phường 13",
      DistrictId: "776",
    },
    {
      id: "27415",
      name: "Phường 12",
      DistrictId: "776",
    },
    {
      id: "27418",
      name: "Phường 05",
      DistrictId: "776",
    },
    {
      id: "27421",
      name: "Phường 14",
      DistrictId: "776",
    },
    {
      id: "27424",
      name: "Phường 06",
      DistrictId: "776",
    },
    {
      id: "27427",
      name: "Phường 15",
      DistrictId: "776",
    },
    {
      id: "27430",
      name: "Phường 16",
      DistrictId: "776",
    },
    {
      id: "27433",
      name: "Phường 07",
      DistrictId: "776",
    },
    {
      id: "27436",
      name: "Phường Bình Hưng Hòa",
      DistrictId: "777",
    },
    {
      id: "27439",
      name: "Phường Bình Hưng Hoà A",
      DistrictId: "777",
    },
    {
      id: "27442",
      name: "Phường Bình Hưng Hoà B",
      DistrictId: "777",
    },
    {
      id: "27445",
      name: "Phường Bình Trị Đông",
      DistrictId: "777",
    },
    {
      id: "27448",
      name: "Phường Bình Trị Đông A",
      DistrictId: "777",
    },
    {
      id: "27451",
      name: "Phường Bình Trị Đông B",
      DistrictId: "777",
    },
    {
      id: "27454",
      name: "Phường Tân Tạo",
      DistrictId: "777",
    },
    {
      id: "27457",
      name: "Phường Tân Tạo A",
      DistrictId: "777",
    },
    {
      id: "27460",
      name: "Phường  An Lạc",
      DistrictId: "777",
    },
    {
      id: "27463",
      name: "Phường An Lạc A",
      DistrictId: "777",
    },
    {
      id: "27466",
      name: "Phường Tân Thuận Đông",
      DistrictId: "778",
    },
    {
      id: "27469",
      name: "Phường Tân Thuận Tây",
      DistrictId: "778",
    },
    {
      id: "27472",
      name: "Phường Tân Kiểng",
      DistrictId: "778",
    },
    {
      id: "27475",
      name: "Phường Tân Hưng",
      DistrictId: "778",
    },
    {
      id: "27478",
      name: "Phường Bình Thuận",
      DistrictId: "778",
    },
    {
      id: "27481",
      name: "Phường Tân Quy",
      DistrictId: "778",
    },
    {
      id: "27484",
      name: "Phường Phú Thuận",
      DistrictId: "778",
    },
    {
      id: "27487",
      name: "Phường Tân Phú",
      DistrictId: "778",
    },
    {
      id: "27490",
      name: "Phường Tân Phong",
      DistrictId: "778",
    },
    {
      id: "27493",
      name: "Phường Phú Mỹ",
      DistrictId: "778",
    },
    {
      id: "27496",
      name: "Thị trấn Củ Chi",
      DistrictId: "783",
    },
    {
      id: "27499",
      name: "Xã Phú Mỹ Hưng",
      DistrictId: "783",
    },
    {
      id: "27502",
      name: "Xã An Phú",
      DistrictId: "783",
    },
    {
      id: "27505",
      name: "Xã Trung Lập Thượng",
      DistrictId: "783",
    },
    {
      id: "27508",
      name: "Xã An Nhơn Tây",
      DistrictId: "783",
    },
    {
      id: "27511",
      name: "Xã Nhuận Đức",
      DistrictId: "783",
    },
    {
      id: "27514",
      name: "Xã Phạm Văn Cội",
      DistrictId: "783",
    },
    {
      id: "27517",
      name: "Xã Phú Hòa Đông",
      DistrictId: "783",
    },
    {
      id: "27520",
      name: "Xã Trung Lập Hạ",
      DistrictId: "783",
    },
    {
      id: "27523",
      name: "Xã Trung An",
      DistrictId: "783",
    },
    {
      id: "27526",
      name: "Xã Phước Thạnh",
      DistrictId: "783",
    },
    {
      id: "27529",
      name: "Xã Phước Hiệp",
      DistrictId: "783",
    },
    {
      id: "27532",
      name: "Xã Tân An Hội",
      DistrictId: "783",
    },
    {
      id: "27535",
      name: "Xã Phước Vĩnh An",
      DistrictId: "783",
    },
    {
      id: "27538",
      name: "Xã Thái Mỹ",
      DistrictId: "783",
    },
    {
      id: "27541",
      name: "Xã Tân Thạnh Tây",
      DistrictId: "783",
    },
    {
      id: "27544",
      name: "Xã Hòa Phú",
      DistrictId: "783",
    },
    {
      id: "27547",
      name: "Xã Tân Thạnh Đông",
      DistrictId: "783",
    },
    {
      id: "27550",
      name: "Xã Bình Mỹ",
      DistrictId: "783",
    },
    {
      id: "27553",
      name: "Xã Tân Phú Trung",
      DistrictId: "783",
    },
    {
      id: "27556",
      name: "Xã Tân Thông Hội",
      DistrictId: "783",
    },
    {
      id: "27559",
      name: "Thị trấn Hóc Môn",
      DistrictId: "784",
    },
    {
      id: "27562",
      name: "Xã Tân Hiệp",
      DistrictId: "784",
    },
    {
      id: "27565",
      name: "Xã Nhị Bình",
      DistrictId: "784",
    },
    {
      id: "27568",
      name: "Xã Đông Thạnh",
      DistrictId: "784",
    },
    {
      id: "27571",
      name: "Xã Tân Thới Nhì",
      DistrictId: "784",
    },
    {
      id: "27574",
      name: "Xã Thới Tam Thôn",
      DistrictId: "784",
    },
    {
      id: "27577",
      name: "Xã Xuân Thới Sơn",
      DistrictId: "784",
    },
    {
      id: "27580",
      name: "Xã Tân Xuân",
      DistrictId: "784",
    },
    {
      id: "27583",
      name: "Xã Xuân Thới Đông",
      DistrictId: "784",
    },
    {
      id: "27586",
      name: "Xã Trung Chánh",
      DistrictId: "784",
    },
    {
      id: "27589",
      name: "Xã Xuân Thới Thượng",
      DistrictId: "784",
    },
    {
      id: "27592",
      name: "Xã Bà Điểm",
      DistrictId: "784",
    },
    {
      id: "27595",
      name: "Thị trấn Tân Túc",
      DistrictId: "785",
    },
    {
      id: "27598",
      name: "Xã Phạm Văn Hai",
      DistrictId: "785",
    },
    {
      id: "27601",
      name: "Xã Vĩnh Lộc A",
      DistrictId: "785",
    },
    {
      id: "27604",
      name: "Xã Vĩnh Lộc B",
      DistrictId: "785",
    },
    {
      id: "27607",
      name: "Xã Bình Lợi",
      DistrictId: "785",
    },
    {
      id: "27610",
      name: "Xã Lê Minh Xuân",
      DistrictId: "785",
    },
    {
      id: "27613",
      name: "Xã Tân Nhựt",
      DistrictId: "785",
    },
    {
      id: "27616",
      name: "Xã Tân Kiên",
      DistrictId: "785",
    },
    {
      id: "27619",
      name: "Xã Bình Hưng",
      DistrictId: "785",
    },
    {
      id: "27622",
      name: "Xã Phong Phú",
      DistrictId: "785",
    },
    {
      id: "27625",
      name: "Xã An Phú Tây",
      DistrictId: "785",
    },
    {
      id: "27628",
      name: "Xã Hưng Long",
      DistrictId: "785",
    },
    {
      id: "27631",
      name: "Xã Đa Phước",
      DistrictId: "785",
    },
    {
      id: "27634",
      name: "Xã Tân Quý Tây",
      DistrictId: "785",
    },
    {
      id: "27637",
      name: "Xã Bình Chánh",
      DistrictId: "785",
    },
    {
      id: "27640",
      name: "Xã Quy Đức",
      DistrictId: "785",
    },
    {
      id: "27643",
      name: "Thị trấn Nhà Bè",
      DistrictId: "786",
    },
    {
      id: "27646",
      name: "Xã Phước Kiển",
      DistrictId: "786",
    },
    {
      id: "27649",
      name: "Xã Phước Lộc",
      DistrictId: "786",
    },
    {
      id: "27652",
      name: "Xã Nhơn Đức",
      DistrictId: "786",
    },
    {
      id: "27655",
      name: "Xã Phú Xuân",
      DistrictId: "786",
    },
    {
      id: "27658",
      name: "Xã Long Thới",
      DistrictId: "786",
    },
    {
      id: "27661",
      name: "Xã Hiệp Phước",
      DistrictId: "786",
    },
    {
      id: "27664",
      name: "Thị trấn Cần Thạnh",
      DistrictId: "787",
    },
    {
      id: "27667",
      name: "Xã Bình Khánh",
      DistrictId: "787",
    },
    {
      id: "27670",
      name: "Xã Tam Thôn Hiệp",
      DistrictId: "787",
    },
    {
      id: "27673",
      name: "Xã An Thới Đông",
      DistrictId: "787",
    },
    {
      id: "27676",
      name: "Xã Thạnh An",
      DistrictId: "787",
    },
    {
      id: "27679",
      name: "Xã Long Hòa",
      DistrictId: "787",
    },
    {
      id: "27682",
      name: "Xã Lý Nhơn",
      DistrictId: "787",
    },
    {
      id: "27685",
      name: "Phường 5",
      DistrictId: "794",
    },
    {
      id: "27688",
      name: "Phường 2",
      DistrictId: "794",
    },
    {
      id: "27691",
      name: "Phường 4",
      DistrictId: "794",
    },
    {
      id: "27692",
      name: "Phường Tân Khánh",
      DistrictId: "794",
    },
    {
      id: "27694",
      name: "Phường 1",
      DistrictId: "794",
    },
    {
      id: "27697",
      name: "Phường 3",
      DistrictId: "794",
    },
    {
      id: "27698",
      name: "Phường 7",
      DistrictId: "794",
    },
    {
      id: "27700",
      name: "Phường 6",
      DistrictId: "794",
    },
    {
      id: "27703",
      name: "Xã Hướng Thọ Phú",
      DistrictId: "794",
    },
    {
      id: "27706",
      name: "Xã Nhơn Thạnh Trung",
      DistrictId: "794",
    },
    {
      id: "27709",
      name: "Xã Lợi Bình Nhơn",
      DistrictId: "794",
    },
    {
      id: "27712",
      name: "Xã Bình Tâm",
      DistrictId: "794",
    },
    {
      id: "27715",
      name: "Phường Khánh Hậu",
      DistrictId: "794",
    },
    {
      id: "27718",
      name: "Xã An Vĩnh Ngãi",
      DistrictId: "794",
    },
    {
      id: "27721",
      name: "Thị trấn Tân Hưng",
      DistrictId: "796",
    },
    {
      id: "27724",
      name: "Xã Hưng Hà",
      DistrictId: "796",
    },
    {
      id: "27727",
      name: "Xã Hưng Điền B",
      DistrictId: "796",
    },
    {
      id: "27730",
      name: "Xã Hưng Điền",
      DistrictId: "796",
    },
    {
      id: "27733",
      name: "Xã Thạnh Hưng",
      DistrictId: "796",
    },
    {
      id: "27736",
      name: "Xã Hưng Thạnh",
      DistrictId: "796",
    },
    {
      id: "27739",
      name: "Xã Vĩnh Thạnh",
      DistrictId: "796",
    },
    {
      id: "27742",
      name: "Xã Vĩnh Châu B",
      DistrictId: "796",
    },
    {
      id: "27745",
      name: "Xã Vĩnh Lợi",
      DistrictId: "796",
    },
    {
      id: "27748",
      name: "Xã Vĩnh Đại",
      DistrictId: "796",
    },
    {
      id: "27751",
      name: "Xã Vĩnh Châu A",
      DistrictId: "796",
    },
    {
      id: "27754",
      name: "Xã Vĩnh Bửu",
      DistrictId: "796",
    },
    {
      id: "27757",
      name: "Thị trấn Vĩnh Hưng",
      DistrictId: "797",
    },
    {
      id: "27760",
      name: "Xã Hưng Điền A",
      DistrictId: "797",
    },
    {
      id: "27763",
      name: "Xã Khánh Hưng",
      DistrictId: "797",
    },
    {
      id: "27766",
      name: "Xã Thái Trị",
      DistrictId: "797",
    },
    {
      id: "27769",
      name: "Xã Vĩnh Trị",
      DistrictId: "797",
    },
    {
      id: "27772",
      name: "Xã Thái Bình Trung",
      DistrictId: "797",
    },
    {
      id: "27775",
      name: "Xã Vĩnh Bình",
      DistrictId: "797",
    },
    {
      id: "27778",
      name: "Xã Vĩnh Thuận",
      DistrictId: "797",
    },
    {
      id: "27781",
      name: "Xã Tuyên Bình",
      DistrictId: "797",
    },
    {
      id: "27784",
      name: "Xã Tuyên Bình Tây",
      DistrictId: "797",
    },
    {
      id: "27787",
      name: "Phường 1",
      DistrictId: "795",
    },
    {
      id: "27788",
      name: "Phường 2",
      DistrictId: "795",
    },
    {
      id: "27790",
      name: "Xã Thạnh Trị",
      DistrictId: "795",
    },
    {
      id: "27793",
      name: "Xã Bình Hiệp",
      DistrictId: "795",
    },
    {
      id: "27796",
      name: "Xã Bình Hòa Tây",
      DistrictId: "798",
    },
    {
      id: "27799",
      name: "Xã Bình Tân",
      DistrictId: "795",
    },
    {
      id: "27802",
      name: "Xã Bình Thạnh",
      DistrictId: "798",
    },
    {
      id: "27805",
      name: "Xã Tuyên Thạnh",
      DistrictId: "795",
    },
    {
      id: "27806",
      name: "Phường 3",
      DistrictId: "795",
    },
    {
      id: "27808",
      name: "Xã Bình Hòa Trung",
      DistrictId: "798",
    },
    {
      id: "27811",
      name: "Xã Bình Hòa Đông",
      DistrictId: "798",
    },
    {
      id: "27814",
      name: "Thị trấn Bình Phong Thạnh",
      DistrictId: "798",
    },
    {
      id: "27817",
      name: "Xã Thạnh Hưng",
      DistrictId: "795",
    },
    {
      id: "27820",
      name: "Xã Tân Lập",
      DistrictId: "798",
    },
    {
      id: "27823",
      name: "Xã Tân Thành",
      DistrictId: "798",
    },
    {
      id: "27826",
      name: "Thị trấn Tân Thạnh",
      DistrictId: "799",
    },
    {
      id: "27829",
      name: "Xã Bắc Hòa",
      DistrictId: "799",
    },
    {
      id: "27832",
      name: "Xã Hậu Thạnh Tây",
      DistrictId: "799",
    },
    {
      id: "27835",
      name: "Xã Nhơn Hòa Lập",
      DistrictId: "799",
    },
    {
      id: "27838",
      name: "Xã Tân Lập",
      DistrictId: "799",
    },
    {
      id: "27841",
      name: "Xã Hậu Thạnh Đông",
      DistrictId: "799",
    },
    {
      id: "27844",
      name: "Xã Nhơn Hoà",
      DistrictId: "799",
    },
    {
      id: "27847",
      name: "Xã Kiến Bình",
      DistrictId: "799",
    },
    {
      id: "27850",
      name: "Xã Tân Thành",
      DistrictId: "799",
    },
    {
      id: "27853",
      name: "Xã Tân Bình",
      DistrictId: "799",
    },
    {
      id: "27856",
      name: "Xã Tân Ninh",
      DistrictId: "799",
    },
    {
      id: "27859",
      name: "Xã Nhơn Ninh",
      DistrictId: "799",
    },
    {
      id: "27862",
      name: "Xã Tân Hòa",
      DistrictId: "799",
    },
    {
      id: "27865",
      name: "Thị trấn Thạnh Hóa",
      DistrictId: "800",
    },
    {
      id: "27868",
      name: "Xã Tân Hiệp",
      DistrictId: "800",
    },
    {
      id: "27871",
      name: "Xã Thuận Bình",
      DistrictId: "800",
    },
    {
      id: "27874",
      name: "Xã Thạnh Phước",
      DistrictId: "800",
    },
    {
      id: "27877",
      name: "Xã Thạnh Phú",
      DistrictId: "800",
    },
    {
      id: "27880",
      name: "Xã Thuận Nghĩa Hòa",
      DistrictId: "800",
    },
    {
      id: "27883",
      name: "Xã Thủy Đông",
      DistrictId: "800",
    },
    {
      id: "27886",
      name: "Xã Thủy Tây",
      DistrictId: "800",
    },
    {
      id: "27889",
      name: "Xã Tân Tây",
      DistrictId: "800",
    },
    {
      id: "27892",
      name: "Xã Tân Đông",
      DistrictId: "800",
    },
    {
      id: "27895",
      name: "Xã Thạnh An",
      DistrictId: "800",
    },
    {
      id: "27898",
      name: "Thị trấn Đông Thành",
      DistrictId: "801",
    },
    {
      id: "27901",
      name: "Xã Mỹ Quý Đông",
      DistrictId: "801",
    },
    {
      id: "27904",
      name: "Xã Mỹ Thạnh Bắc",
      DistrictId: "801",
    },
    {
      id: "27907",
      name: "Xã Mỹ Quý Tây",
      DistrictId: "801",
    },
    {
      id: "27910",
      name: "Xã Mỹ Thạnh Tây",
      DistrictId: "801",
    },
    {
      id: "27913",
      name: "Xã Mỹ Thạnh Đông",
      DistrictId: "801",
    },
    {
      id: "27916",
      name: "Xã Bình Thành",
      DistrictId: "801",
    },
    {
      id: "27919",
      name: "Xã Bình Hòa Bắc",
      DistrictId: "801",
    },
    {
      id: "27922",
      name: "Xã Bình Hòa Hưng",
      DistrictId: "801",
    },
    {
      id: "27925",
      name: "Xã Bình Hòa Nam",
      DistrictId: "801",
    },
    {
      id: "27928",
      name: "Xã Mỹ Bình",
      DistrictId: "801",
    },
    {
      id: "27931",
      name: "Thị trấn Hậu Nghĩa",
      DistrictId: "802",
    },
    {
      id: "27934",
      name: "Thị trấn Hiệp Hòa",
      DistrictId: "802",
    },
    {
      id: "27937",
      name: "Thị trấn Đức Hòa",
      DistrictId: "802",
    },
    {
      id: "27940",
      name: "Xã Lộc Giang",
      DistrictId: "802",
    },
    {
      id: "27943",
      name: "Xã An Ninh Đông",
      DistrictId: "802",
    },
    {
      id: "27946",
      name: "Xã An Ninh Tây",
      DistrictId: "802",
    },
    {
      id: "27949",
      name: "Xã Tân Mỹ",
      DistrictId: "802",
    },
    {
      id: "27952",
      name: "Xã Hiệp Hòa",
      DistrictId: "802",
    },
    {
      id: "27955",
      name: "Xã Đức Lập Thượng",
      DistrictId: "802",
    },
    {
      id: "27958",
      name: "Xã Đức Lập Hạ",
      DistrictId: "802",
    },
    {
      id: "27961",
      name: "Xã Tân Phú",
      DistrictId: "802",
    },
    {
      id: "27964",
      name: "Xã Mỹ Hạnh Bắc",
      DistrictId: "802",
    },
    {
      id: "27967",
      name: "Xã Đức Hòa Thượng",
      DistrictId: "802",
    },
    {
      id: "27970",
      name: "Xã Hòa Khánh Tây",
      DistrictId: "802",
    },
    {
      id: "27973",
      name: "Xã Hòa Khánh Đông",
      DistrictId: "802",
    },
    {
      id: "27976",
      name: "Xã Mỹ Hạnh Nam",
      DistrictId: "802",
    },
    {
      id: "27979",
      name: "Xã Hòa Khánh Nam",
      DistrictId: "802",
    },
    {
      id: "27982",
      name: "Xã Đức Hòa Đông",
      DistrictId: "802",
    },
    {
      id: "27985",
      name: "Xã Đức Hòa Hạ",
      DistrictId: "802",
    },
    {
      id: "27988",
      name: "Xã Hựu Thạnh",
      DistrictId: "802",
    },
    {
      id: "27991",
      name: "Thị trấn Bến Lức",
      DistrictId: "803",
    },
    {
      id: "27994",
      name: "Xã Thạnh Lợi",
      DistrictId: "803",
    },
    {
      id: "27997",
      name: "Xã Lương Bình",
      DistrictId: "803",
    },
    {
      id: "28000",
      name: "Xã Thạnh Hòa",
      DistrictId: "803",
    },
    {
      id: "28003",
      name: "Xã Lương Hòa",
      DistrictId: "803",
    },
    {
      id: "28006",
      name: "Xã Tân Hòa",
      DistrictId: "803",
    },
    {
      id: "28009",
      name: "Xã Tân Bửu",
      DistrictId: "803",
    },
    {
      id: "28012",
      name: "Xã An Thạnh",
      DistrictId: "803",
    },
    {
      id: "28015",
      name: "Xã Bình Đức",
      DistrictId: "803",
    },
    {
      id: "28018",
      name: "Xã Mỹ Yên",
      DistrictId: "803",
    },
    {
      id: "28021",
      name: "Xã Thanh Phú",
      DistrictId: "803",
    },
    {
      id: "28024",
      name: "Xã Long Hiệp",
      DistrictId: "803",
    },
    {
      id: "28027",
      name: "Xã Thạnh Đức",
      DistrictId: "803",
    },
    {
      id: "28030",
      name: "Xã Phước Lợi",
      DistrictId: "803",
    },
    {
      id: "28033",
      name: "Xã Nhựt Chánh",
      DistrictId: "803",
    },
    {
      id: "28036",
      name: "Thị trấn Thủ Thừa",
      DistrictId: "804",
    },
    {
      id: "28039",
      name: "Xã Long Thạnh",
      DistrictId: "804",
    },
    {
      id: "28042",
      name: "Xã Tân Thành",
      DistrictId: "804",
    },
    {
      id: "28045",
      name: "Xã Long Thuận",
      DistrictId: "804",
    },
    {
      id: "28048",
      name: "Xã Mỹ Lạc",
      DistrictId: "804",
    },
    {
      id: "28051",
      name: "Xã Mỹ Thạnh",
      DistrictId: "804",
    },
    {
      id: "28054",
      name: "Xã Bình An",
      DistrictId: "804",
    },
    {
      id: "28057",
      name: "Xã Nhị Thành",
      DistrictId: "804",
    },
    {
      id: "28060",
      name: "Xã Mỹ An",
      DistrictId: "804",
    },
    {
      id: "28063",
      name: "Xã Bình Thạnh",
      DistrictId: "804",
    },
    {
      id: "28066",
      name: "Xã Mỹ Phú",
      DistrictId: "804",
    },
    {
      id: "28072",
      name: "Xã Tân Long",
      DistrictId: "804",
    },
    {
      id: "28075",
      name: "Thị trấn Tân Trụ",
      DistrictId: "805",
    },
    {
      id: "28078",
      name: "Xã Tân Bình",
      DistrictId: "805",
    },
    {
      id: "28084",
      name: "Xã Quê Mỹ Thạnh",
      DistrictId: "805",
    },
    {
      id: "28087",
      name: "Xã Lạc Tấn",
      DistrictId: "805",
    },
    {
      id: "28090",
      name: "Xã Bình Trinh Đông",
      DistrictId: "805",
    },
    {
      id: "28093",
      name: "Xã Tân Phước Tây",
      DistrictId: "805",
    },
    {
      id: "28096",
      name: "Xã Bình Lãng",
      DistrictId: "805",
    },
    {
      id: "28099",
      name: "Xã Bình Tịnh",
      DistrictId: "805",
    },
    {
      id: "28102",
      name: "Xã Đức Tân",
      DistrictId: "805",
    },
    {
      id: "28105",
      name: "Xã Nhựt Ninh",
      DistrictId: "805",
    },
    {
      id: "28108",
      name: "Thị trấn Cần Đước",
      DistrictId: "806",
    },
    {
      id: "28111",
      name: "Xã Long Trạch",
      DistrictId: "806",
    },
    {
      id: "28114",
      name: "Xã Long Khê",
      DistrictId: "806",
    },
    {
      id: "28117",
      name: "Xã Long Định",
      DistrictId: "806",
    },
    {
      id: "28120",
      name: "Xã Phước Vân",
      DistrictId: "806",
    },
    {
      id: "28123",
      name: "Xã Long Hòa",
      DistrictId: "806",
    },
    {
      id: "28126",
      name: "Xã Long Cang",
      DistrictId: "806",
    },
    {
      id: "28129",
      name: "Xã Long Sơn",
      DistrictId: "806",
    },
    {
      id: "28132",
      name: "Xã Tân Trạch",
      DistrictId: "806",
    },
    {
      id: "28135",
      name: "Xã Mỹ Lệ",
      DistrictId: "806",
    },
    {
      id: "28138",
      name: "Xã Tân Lân",
      DistrictId: "806",
    },
    {
      id: "28141",
      name: "Xã Phước Tuy",
      DistrictId: "806",
    },
    {
      id: "28144",
      name: "Xã Long Hựu Đông",
      DistrictId: "806",
    },
    {
      id: "28147",
      name: "Xã Tân Ân",
      DistrictId: "806",
    },
    {
      id: "28150",
      name: "Xã Phước Đông",
      DistrictId: "806",
    },
    {
      id: "28153",
      name: "Xã Long Hựu Tây",
      DistrictId: "806",
    },
    {
      id: "28156",
      name: "Xã Tân Chánh",
      DistrictId: "806",
    },
    {
      id: "28159",
      name: "Thị trấn Cần Giuộc",
      DistrictId: "807",
    },
    {
      id: "28162",
      name: "Xã Phước Lý",
      DistrictId: "807",
    },
    {
      id: "28165",
      name: "Xã Long Thượng",
      DistrictId: "807",
    },
    {
      id: "28168",
      name: "Xã Long Hậu",
      DistrictId: "807",
    },
    {
      id: "28174",
      name: "Xã Phước Hậu",
      DistrictId: "807",
    },
    {
      id: "28177",
      name: "Xã Mỹ Lộc",
      DistrictId: "807",
    },
    {
      id: "28180",
      name: "Xã Phước Lại",
      DistrictId: "807",
    },
    {
      id: "28183",
      name: "Xã Phước Lâm",
      DistrictId: "807",
    },
    {
      id: "28189",
      name: "Xã Thuận Thành",
      DistrictId: "807",
    },
    {
      id: "28192",
      name: "Xã Phước Vĩnh Tây",
      DistrictId: "807",
    },
    {
      id: "28195",
      name: "Xã Phước Vĩnh Đông",
      DistrictId: "807",
    },
    {
      id: "28198",
      name: "Xã Long An",
      DistrictId: "807",
    },
    {
      id: "28201",
      name: "Xã Long Phụng",
      DistrictId: "807",
    },
    {
      id: "28204",
      name: "Xã Đông Thạnh",
      DistrictId: "807",
    },
    {
      id: "28207",
      name: "Xã Tân Tập",
      DistrictId: "807",
    },
    {
      id: "28210",
      name: "Thị trấn Tầm Vu",
      DistrictId: "808",
    },
    {
      id: "28213",
      name: "Xã Bình Quới",
      DistrictId: "808",
    },
    {
      id: "28216",
      name: "Xã Hòa Phú",
      DistrictId: "808",
    },
    {
      id: "28219",
      name: "Xã Phú Ngãi Trị",
      DistrictId: "808",
    },
    {
      id: "28222",
      name: "Xã Vĩnh Công",
      DistrictId: "808",
    },
    {
      id: "28225",
      name: "Xã Thuận Mỹ",
      DistrictId: "808",
    },
    {
      id: "28228",
      name: "Xã Hiệp Thạnh",
      DistrictId: "808",
    },
    {
      id: "28231",
      name: "Xã Phước Tân Hưng",
      DistrictId: "808",
    },
    {
      id: "28234",
      name: "Xã Thanh Phú Long",
      DistrictId: "808",
    },
    {
      id: "28237",
      name: "Xã Dương Xuân Hội",
      DistrictId: "808",
    },
    {
      id: "28240",
      name: "Xã An Lục Long",
      DistrictId: "808",
    },
    {
      id: "28243",
      name: "Xã Long Trì",
      DistrictId: "808",
    },
    {
      id: "28246",
      name: "Xã Thanh Vĩnh Đông",
      DistrictId: "808",
    },
    {
      id: "28249",
      name: "Phường 5",
      DistrictId: "815",
    },
    {
      id: "28252",
      name: "Phường 4",
      DistrictId: "815",
    },
    {
      id: "28255",
      name: "Phường 7",
      DistrictId: "815",
    },
    {
      id: "28258",
      name: "Phường 3",
      DistrictId: "815",
    },
    {
      id: "28261",
      name: "Phường 1",
      DistrictId: "815",
    },
    {
      id: "28264",
      name: "Phường 2",
      DistrictId: "815",
    },
    {
      id: "28267",
      name: "Phường 8",
      DistrictId: "815",
    },
    {
      id: "28270",
      name: "Phường 6",
      DistrictId: "815",
    },
    {
      id: "28273",
      name: "Phường 9",
      DistrictId: "815",
    },
    {
      id: "28276",
      name: "Phường 10",
      DistrictId: "815",
    },
    {
      id: "28279",
      name: "Phường Tân Long",
      DistrictId: "815",
    },
    {
      id: "28282",
      name: "Xã Đạo Thạnh",
      DistrictId: "815",
    },
    {
      id: "28285",
      name: "Xã Trung An",
      DistrictId: "815",
    },
    {
      id: "28288",
      name: "Xã Mỹ Phong",
      DistrictId: "815",
    },
    {
      id: "28291",
      name: "Xã Tân Mỹ Chánh",
      DistrictId: "815",
    },
    {
      id: "28294",
      name: "Phường 3",
      DistrictId: "816",
    },
    {
      id: "28297",
      name: "Phường 2",
      DistrictId: "816",
    },
    {
      id: "28300",
      name: "Phường 4",
      DistrictId: "816",
    },
    {
      id: "28303",
      name: "Phường 1",
      DistrictId: "816",
    },
    {
      id: "28306",
      name: "Phường 5",
      DistrictId: "816",
    },
    {
      id: "28309",
      name: "Xã Long Hưng",
      DistrictId: "816",
    },
    {
      id: "28312",
      name: "Xã Long Thuận",
      DistrictId: "816",
    },
    {
      id: "28315",
      name: "Xã Long Chánh",
      DistrictId: "816",
    },
    {
      id: "28318",
      name: "Xã Long Hòa",
      DistrictId: "816",
    },
    {
      id: "28321",
      name: "Thị trấn Mỹ Phước",
      DistrictId: "818",
    },
    {
      id: "28324",
      name: "Xã Tân Hòa Đông",
      DistrictId: "818",
    },
    {
      id: "28327",
      name: "Xã Thạnh Tân",
      DistrictId: "818",
    },
    {
      id: "28330",
      name: "Xã Thạnh Mỹ",
      DistrictId: "818",
    },
    {
      id: "28333",
      name: "Xã Thạnh Hoà",
      DistrictId: "818",
    },
    {
      id: "28336",
      name: "Xã Phú Mỹ",
      DistrictId: "818",
    },
    {
      id: "28339",
      name: "Xã Tân Hòa Thành",
      DistrictId: "818",
    },
    {
      id: "28342",
      name: "Xã Hưng Thạnh",
      DistrictId: "818",
    },
    {
      id: "28345",
      name: "Xã Tân Lập 1",
      DistrictId: "818",
    },
    {
      id: "28348",
      name: "Xã Tân Hòa Tây",
      DistrictId: "818",
    },
    {
      id: "28354",
      name: "Xã Tân Lập 2",
      DistrictId: "818",
    },
    {
      id: "28357",
      name: "Xã Phước Lập",
      DistrictId: "818",
    },
    {
      id: "28360",
      name: "Thị trấn Cái Bè",
      DistrictId: "819",
    },
    {
      id: "28363",
      name: "Xã Hậu Mỹ Bắc B",
      DistrictId: "819",
    },
    {
      id: "28366",
      name: "Xã Hậu Mỹ Bắc A",
      DistrictId: "819",
    },
    {
      id: "28369",
      name: "Xã Mỹ Trung",
      DistrictId: "819",
    },
    {
      id: "28372",
      name: "Xã Hậu Mỹ Trinh",
      DistrictId: "819",
    },
    {
      id: "28375",
      name: "Xã Hậu Mỹ Phú",
      DistrictId: "819",
    },
    {
      id: "28378",
      name: "Xã Mỹ Tân",
      DistrictId: "819",
    },
    {
      id: "28381",
      name: "Xã Mỹ Lợi B",
      DistrictId: "819",
    },
    {
      id: "28384",
      name: "Xã Thiện Trung",
      DistrictId: "819",
    },
    {
      id: "28387",
      name: "Xã Mỹ Hội",
      DistrictId: "819",
    },
    {
      id: "28390",
      name: "Xã An Cư",
      DistrictId: "819",
    },
    {
      id: "28393",
      name: "Xã Hậu Thành",
      DistrictId: "819",
    },
    {
      id: "28396",
      name: "Xã Mỹ Lợi A",
      DistrictId: "819",
    },
    {
      id: "28399",
      name: "Xã Hòa Khánh",
      DistrictId: "819",
    },
    {
      id: "28402",
      name: "Xã Thiện Trí",
      DistrictId: "819",
    },
    {
      id: "28405",
      name: "Xã Mỹ Đức Đông",
      DistrictId: "819",
    },
    {
      id: "28408",
      name: "Xã Mỹ Đức Tây",
      DistrictId: "819",
    },
    {
      id: "28411",
      name: "Xã Đông Hòa Hiệp",
      DistrictId: "819",
    },
    {
      id: "28414",
      name: "Xã An Thái Đông",
      DistrictId: "819",
    },
    {
      id: "28417",
      name: "Xã Tân Hưng",
      DistrictId: "819",
    },
    {
      id: "28420",
      name: "Xã Mỹ Lương",
      DistrictId: "819",
    },
    {
      id: "28423",
      name: "Xã Tân Thanh",
      DistrictId: "819",
    },
    {
      id: "28426",
      name: "Xã An Thái Trung",
      DistrictId: "819",
    },
    {
      id: "28429",
      name: "Xã An Hữu",
      DistrictId: "819",
    },
    {
      id: "28432",
      name: "Xã Hòa Hưng",
      DistrictId: "819",
    },
    {
      id: "28435",
      name: "Phường 1",
      DistrictId: "817",
    },
    {
      id: "28436",
      name: "Phường 2",
      DistrictId: "817",
    },
    {
      id: "28437",
      name: "Phường 3",
      DistrictId: "817",
    },
    {
      id: "28438",
      name: "Xã Thạnh Lộc",
      DistrictId: "820",
    },
    {
      id: "28439",
      name: "Phường 4",
      DistrictId: "817",
    },
    {
      id: "28440",
      name: "Phường 5",
      DistrictId: "817",
    },
    {
      id: "28441",
      name: "Xã Mỹ Thành Bắc",
      DistrictId: "820",
    },
    {
      id: "28444",
      name: "Xã Phú Cường",
      DistrictId: "820",
    },
    {
      id: "28447",
      name: "Xã Mỹ Phước Tây",
      DistrictId: "817",
    },
    {
      id: "28450",
      name: "Xã Mỹ Hạnh Đông",
      DistrictId: "817",
    },
    {
      id: "28453",
      name: "Xã Mỹ Hạnh Trung",
      DistrictId: "817",
    },
    {
      id: "28456",
      name: "Xã Mỹ Thành Nam",
      DistrictId: "820",
    },
    {
      id: "28459",
      name: "Xã Tân Phú",
      DistrictId: "817",
    },
    {
      id: "28462",
      name: "Xã Tân Bình",
      DistrictId: "817",
    },
    {
      id: "28465",
      name: "Xã Phú Nhuận",
      DistrictId: "820",
    },
    {
      id: "28468",
      name: "Xã Tân Hội",
      DistrictId: "817",
    },
    {
      id: "28471",
      name: "Thị trấn Bình Phú",
      DistrictId: "820",
    },
    {
      id: "28474",
      name: "Phường Nhị Mỹ",
      DistrictId: "817",
    },
    {
      id: "28477",
      name: "Xã Nhị Quý",
      DistrictId: "817",
    },
    {
      id: "28480",
      name: "Xã Thanh Hòa",
      DistrictId: "817",
    },
    {
      id: "28483",
      name: "Xã Phú Quý",
      DistrictId: "817",
    },
    {
      id: "28486",
      name: "Xã Long Khánh",
      DistrictId: "817",
    },
    {
      id: "28489",
      name: "Xã Cẩm Sơn",
      DistrictId: "820",
    },
    {
      id: "28492",
      name: "Xã Phú An",
      DistrictId: "820",
    },
    {
      id: "28495",
      name: "Xã Mỹ Long",
      DistrictId: "820",
    },
    {
      id: "28498",
      name: "Xã Long Tiên",
      DistrictId: "820",
    },
    {
      id: "28501",
      name: "Xã Hiệp Đức",
      DistrictId: "820",
    },
    {
      id: "28504",
      name: "Xã Long Trung",
      DistrictId: "820",
    },
    {
      id: "28507",
      name: "Xã Hội Xuân",
      DistrictId: "820",
    },
    {
      id: "28510",
      name: "Xã Tân Phong",
      DistrictId: "820",
    },
    {
      id: "28513",
      name: "Xã Tam Bình",
      DistrictId: "820",
    },
    {
      id: "28516",
      name: "Xã Ngũ Hiệp",
      DistrictId: "820",
    },
    {
      id: "28519",
      name: "Thị trấn Tân Hiệp",
      DistrictId: "821",
    },
    {
      id: "28522",
      name: "Xã Tân Hội Đông",
      DistrictId: "821",
    },
    {
      id: "28525",
      name: "Xã Tân Hương",
      DistrictId: "821",
    },
    {
      id: "28528",
      name: "Xã Tân Lý Đông",
      DistrictId: "821",
    },
    {
      id: "28531",
      name: "Xã Tân Lý Tây",
      DistrictId: "821",
    },
    {
      id: "28534",
      name: "Xã Thân Cửu Nghĩa",
      DistrictId: "821",
    },
    {
      id: "28537",
      name: "Xã Tam Hiệp",
      DistrictId: "821",
    },
    {
      id: "28540",
      name: "Xã Điềm Hy",
      DistrictId: "821",
    },
    {
      id: "28543",
      name: "Xã Nhị Bình",
      DistrictId: "821",
    },
    {
      id: "28546",
      name: "Xã Dưỡng Điềm",
      DistrictId: "821",
    },
    {
      id: "28549",
      name: "Xã Đông Hòa",
      DistrictId: "821",
    },
    {
      id: "28552",
      name: "Xã Long Định",
      DistrictId: "821",
    },
    {
      id: "28555",
      name: "Xã Hữu Đạo",
      DistrictId: "821",
    },
    {
      id: "28558",
      name: "Xã Long An",
      DistrictId: "821",
    },
    {
      id: "28561",
      name: "Xã Long Hưng",
      DistrictId: "821",
    },
    {
      id: "28564",
      name: "Xã Bình Trưng",
      DistrictId: "821",
    },
    {
      id: "28567",
      name: "Xã Phước Thạnh",
      DistrictId: "815",
    },
    {
      id: "28570",
      name: "Xã Thạnh Phú",
      DistrictId: "821",
    },
    {
      id: "28573",
      name: "Xã Bàn Long",
      DistrictId: "821",
    },
    {
      id: "28576",
      name: "Xã Vĩnh Kim",
      DistrictId: "821",
    },
    {
      id: "28579",
      name: "Xã Bình Đức",
      DistrictId: "821",
    },
    {
      id: "28582",
      name: "Xã Song Thuận",
      DistrictId: "821",
    },
    {
      id: "28585",
      name: "Xã Kim Sơn",
      DistrictId: "821",
    },
    {
      id: "28588",
      name: "Xã Phú Phong",
      DistrictId: "821",
    },
    {
      id: "28591",
      name: "Xã Thới Sơn",
      DistrictId: "815",
    },
    {
      id: "28594",
      name: "Thị trấn Chợ Gạo",
      DistrictId: "822",
    },
    {
      id: "28597",
      name: "Xã Trung Hòa",
      DistrictId: "822",
    },
    {
      id: "28600",
      name: "Xã Hòa Tịnh",
      DistrictId: "822",
    },
    {
      id: "28603",
      name: "Xã Mỹ Tịnh An",
      DistrictId: "822",
    },
    {
      id: "28606",
      name: "Xã Tân Bình Thạnh",
      DistrictId: "822",
    },
    {
      id: "28609",
      name: "Xã Phú Kiết",
      DistrictId: "822",
    },
    {
      id: "28612",
      name: "Xã Lương Hòa Lạc",
      DistrictId: "822",
    },
    {
      id: "28615",
      name: "Xã Thanh Bình",
      DistrictId: "822",
    },
    {
      id: "28618",
      name: "Xã Quơn Long",
      DistrictId: "822",
    },
    {
      id: "28621",
      name: "Xã Bình Phục Nhứt",
      DistrictId: "822",
    },
    {
      id: "28624",
      name: "Xã Đăng Hưng Phước",
      DistrictId: "822",
    },
    {
      id: "28627",
      name: "Xã Tân Thuận Bình",
      DistrictId: "822",
    },
    {
      id: "28630",
      name: "Xã Song Bình",
      DistrictId: "822",
    },
    {
      id: "28633",
      name: "Xã Bình Phan",
      DistrictId: "822",
    },
    {
      id: "28636",
      name: "Xã Long Bình Điền",
      DistrictId: "822",
    },
    {
      id: "28639",
      name: "Xã An Thạnh Thủy",
      DistrictId: "822",
    },
    {
      id: "28642",
      name: "Xã Xuân Đông",
      DistrictId: "822",
    },
    {
      id: "28645",
      name: "Xã Hòa Định",
      DistrictId: "822",
    },
    {
      id: "28648",
      name: "Xã Bình Ninh",
      DistrictId: "822",
    },
    {
      id: "28651",
      name: "Thị trấn Vĩnh Bình",
      DistrictId: "823",
    },
    {
      id: "28654",
      name: "Xã Đồng Sơn",
      DistrictId: "823",
    },
    {
      id: "28657",
      name: "Xã Bình Phú",
      DistrictId: "823",
    },
    {
      id: "28660",
      name: "Xã Đồng Thạnh",
      DistrictId: "823",
    },
    {
      id: "28663",
      name: "Xã Thành Công",
      DistrictId: "823",
    },
    {
      id: "28666",
      name: "Xã Bình Nhì",
      DistrictId: "823",
    },
    {
      id: "28669",
      name: "Xã Yên Luông",
      DistrictId: "823",
    },
    {
      id: "28672",
      name: "Xã Thạnh Trị",
      DistrictId: "823",
    },
    {
      id: "28675",
      name: "Xã Thạnh Nhựt",
      DistrictId: "823",
    },
    {
      id: "28678",
      name: "Xã Long Vĩnh",
      DistrictId: "823",
    },
    {
      id: "28681",
      name: "Xã Bình Tân",
      DistrictId: "823",
    },
    {
      id: "28684",
      name: "Xã Vĩnh Hựu",
      DistrictId: "823",
    },
    {
      id: "28687",
      name: "Xã Long Bình",
      DistrictId: "823",
    },
    {
      id: "28690",
      name: "Xã Tân Thới",
      DistrictId: "825",
    },
    {
      id: "28693",
      name: "Xã Tân Phú",
      DistrictId: "825",
    },
    {
      id: "28696",
      name: "Xã Phú Thạnh",
      DistrictId: "825",
    },
    {
      id: "28699",
      name: "Xã Tân Thạnh",
      DistrictId: "825",
    },
    {
      id: "28702",
      name: "Thị trấn Tân Hòa",
      DistrictId: "824",
    },
    {
      id: "28705",
      name: "Xã Tăng Hoà",
      DistrictId: "824",
    },
    {
      id: "28708",
      name: "Xã Bình Đông",
      DistrictId: "816",
    },
    {
      id: "28711",
      name: "Xã Tân Phước",
      DistrictId: "824",
    },
    {
      id: "28714",
      name: "Xã Gia Thuận",
      DistrictId: "824",
    },
    {
      id: "28717",
      name: "Xã Bình Xuân",
      DistrictId: "816",
    },
    {
      id: "28720",
      name: "Thị trấn Vàm Láng",
      DistrictId: "824",
    },
    {
      id: "28723",
      name: "Xã Tân Tây",
      DistrictId: "824",
    },
    {
      id: "28726",
      name: "Xã Kiểng Phước",
      DistrictId: "824",
    },
    {
      id: "28729",
      name: "Xã Tân Trung",
      DistrictId: "816",
    },
    {
      id: "28732",
      name: "Xã Tân Đông",
      DistrictId: "824",
    },
    {
      id: "28735",
      name: "Xã Bình Ân",
      DistrictId: "824",
    },
    {
      id: "28738",
      name: "Xã Tân Điền",
      DistrictId: "824",
    },
    {
      id: "28741",
      name: "Xã Bình Nghị",
      DistrictId: "824",
    },
    {
      id: "28744",
      name: "Xã Phước Trung",
      DistrictId: "824",
    },
    {
      id: "28747",
      name: "Xã Tân Thành",
      DistrictId: "824",
    },
    {
      id: "28750",
      name: "Xã Phú Đông",
      DistrictId: "825",
    },
    {
      id: "28753",
      name: "Xã Phú Tân",
      DistrictId: "825",
    },
    {
      id: "28756",
      name: "Phường Phú Khương",
      DistrictId: "829",
    },
    {
      id: "28757",
      name: "Phường Phú Tân",
      DistrictId: "829",
    },
    {
      id: "28759",
      name: "Phường 8",
      DistrictId: "829",
    },
    {
      id: "28762",
      name: "Phường 6",
      DistrictId: "829",
    },
    {
      id: "28765",
      name: "Phường 4",
      DistrictId: "829",
    },
    {
      id: "28768",
      name: "Phường 5",
      DistrictId: "829",
    },
    {
      id: "28777",
      name: "Phường An Hội",
      DistrictId: "829",
    },
    {
      id: "28780",
      name: "Phường 7",
      DistrictId: "829",
    },
    {
      id: "28783",
      name: "Xã Sơn Đông",
      DistrictId: "829",
    },
    {
      id: "28786",
      name: "Xã Phú Hưng",
      DistrictId: "829",
    },
    {
      id: "28789",
      name: "Xã Bình Phú",
      DistrictId: "829",
    },
    {
      id: "28792",
      name: "Xã Mỹ Thạnh An",
      DistrictId: "829",
    },
    {
      id: "28795",
      name: "Xã Nhơn Thạnh",
      DistrictId: "829",
    },
    {
      id: "28798",
      name: "Xã Phú Nhuận",
      DistrictId: "829",
    },
    {
      id: "28801",
      name: "Thị trấn Châu Thành",
      DistrictId: "831",
    },
    {
      id: "28804",
      name: "Xã Tân Thạch",
      DistrictId: "831",
    },
    {
      id: "28807",
      name: "Xã Qưới Sơn",
      DistrictId: "831",
    },
    {
      id: "28810",
      name: "Xã An Khánh",
      DistrictId: "831",
    },
    {
      id: "28813",
      name: "Xã Giao Long",
      DistrictId: "831",
    },
    {
      id: "28819",
      name: "Xã Phú Túc",
      DistrictId: "831",
    },
    {
      id: "28822",
      name: "Xã Phú Đức",
      DistrictId: "831",
    },
    {
      id: "28825",
      name: "Xã Phú An Hòa",
      DistrictId: "831",
    },
    {
      id: "28828",
      name: "Xã An Phước",
      DistrictId: "831",
    },
    {
      id: "28831",
      name: "Xã Tam Phước",
      DistrictId: "831",
    },
    {
      id: "28834",
      name: "Xã Thành Triệu",
      DistrictId: "831",
    },
    {
      id: "28837",
      name: "Xã Tường Đa",
      DistrictId: "831",
    },
    {
      id: "28840",
      name: "Xã Tân Phú",
      DistrictId: "831",
    },
    {
      id: "28843",
      name: "Xã Quới Thành",
      DistrictId: "831",
    },
    {
      id: "28846",
      name: "Xã Phước Thạnh",
      DistrictId: "831",
    },
    {
      id: "28849",
      name: "Xã An Hóa",
      DistrictId: "831",
    },
    {
      id: "28852",
      name: "Xã Tiên Long",
      DistrictId: "831",
    },
    {
      id: "28855",
      name: "Xã An Hiệp",
      DistrictId: "831",
    },
    {
      id: "28858",
      name: "Xã Hữu Định",
      DistrictId: "831",
    },
    {
      id: "28861",
      name: "Xã Tiên Thủy",
      DistrictId: "831",
    },
    {
      id: "28864",
      name: "Xã Sơn Hòa",
      DistrictId: "831",
    },
    {
      id: "28870",
      name: "Thị trấn Chợ Lách",
      DistrictId: "832",
    },
    {
      id: "28873",
      name: "Xã Phú Phụng",
      DistrictId: "832",
    },
    {
      id: "28876",
      name: "Xã Sơn Định",
      DistrictId: "832",
    },
    {
      id: "28879",
      name: "Xã Vĩnh Bình",
      DistrictId: "832",
    },
    {
      id: "28882",
      name: "Xã Hòa Nghĩa",
      DistrictId: "832",
    },
    {
      id: "28885",
      name: "Xã Long Thới",
      DistrictId: "832",
    },
    {
      id: "28888",
      name: "Xã Phú Sơn",
      DistrictId: "832",
    },
    {
      id: "28889",
      name: "Xã Phú Mỹ",
      DistrictId: "838",
    },
    {
      id: "28891",
      name: "Xã Tân Thiềng",
      DistrictId: "832",
    },
    {
      id: "28894",
      name: "Xã Vĩnh Thành",
      DistrictId: "832",
    },
    {
      id: "28897",
      name: "Xã Vĩnh Hòa",
      DistrictId: "832",
    },
    {
      id: "28900",
      name: "Xã Hưng Khánh Trung B",
      DistrictId: "832",
    },
    {
      id: "28901",
      name: "Xã Hưng Khánh Trung A",
      DistrictId: "838",
    },
    {
      id: "28903",
      name: "Thị trấn Mỏ Cày",
      DistrictId: "833",
    },
    {
      id: "28906",
      name: "Xã Thanh Tân",
      DistrictId: "838",
    },
    {
      id: "28909",
      name: "Xã Thạnh Ngãi",
      DistrictId: "838",
    },
    {
      id: "28912",
      name: "Xã Tân Phú Tây",
      DistrictId: "838",
    },
    {
      id: "28915",
      name: "Xã Phước Mỹ Trung",
      DistrictId: "838",
    },
    {
      id: "28918",
      name: "Xã Tân Thành Bình",
      DistrictId: "838",
    },
    {
      id: "28921",
      name: "Xã Thành An",
      DistrictId: "838",
    },
    {
      id: "28924",
      name: "Xã Hòa Lộc",
      DistrictId: "838",
    },
    {
      id: "28927",
      name: "Xã Tân Thanh Tây",
      DistrictId: "838",
    },
    {
      id: "28930",
      name: "Xã Định Thủy",
      DistrictId: "833",
    },
    {
      id: "28933",
      name: "Xã Tân Bình",
      DistrictId: "838",
    },
    {
      id: "28936",
      name: "Xã Nhuận Phú Tân",
      DistrictId: "838",
    },
    {
      id: "28939",
      name: "Xã Đa Phước Hội",
      DistrictId: "833",
    },
    {
      id: "28940",
      name: "Xã Tân Hội",
      DistrictId: "833",
    },
    {
      id: "28942",
      name: "Xã Phước Hiệp",
      DistrictId: "833",
    },
    {
      id: "28945",
      name: "Xã Bình Khánh ",
      DistrictId: "833",
    },
    {
      id: "28948",
      name: "Xã Khánh Thạnh Tân",
      DistrictId: "838",
    },
    {
      id: "28951",
      name: "Xã An Thạnh",
      DistrictId: "833",
    },
    {
      id: "28957",
      name: "Xã An Định",
      DistrictId: "833",
    },
    {
      id: "28960",
      name: "Xã Thành Thới B",
      DistrictId: "833",
    },
    {
      id: "28963",
      name: "Xã Tân Trung",
      DistrictId: "833",
    },
    {
      id: "28966",
      name: "Xã An Thới",
      DistrictId: "833",
    },
    {
      id: "28969",
      name: "Xã Thành Thới A",
      DistrictId: "833",
    },
    {
      id: "28972",
      name: "Xã Minh Đức",
      DistrictId: "833",
    },
    {
      id: "28975",
      name: "Xã Ngãi Đăng",
      DistrictId: "833",
    },
    {
      id: "28978",
      name: "Xã Cẩm Sơn",
      DistrictId: "833",
    },
    {
      id: "28981",
      name: "Xã Hương Mỹ",
      DistrictId: "833",
    },
    {
      id: "28984",
      name: "Thị trấn Giồng Trôm",
      DistrictId: "834",
    },
    {
      id: "28987",
      name: "Xã Phong Nẫm",
      DistrictId: "834",
    },
    {
      id: "28993",
      name: "Xã Mỹ Thạnh",
      DistrictId: "834",
    },
    {
      id: "28996",
      name: "Xã Châu Hòa",
      DistrictId: "834",
    },
    {
      id: "28999",
      name: "Xã Lương Hòa",
      DistrictId: "834",
    },
    {
      id: "29002",
      name: "Xã Lương Quới",
      DistrictId: "834",
    },
    {
      id: "29005",
      name: "Xã Lương Phú",
      DistrictId: "834",
    },
    {
      id: "29008",
      name: "Xã Châu Bình",
      DistrictId: "834",
    },
    {
      id: "29011",
      name: "Xã Thuận Điền",
      DistrictId: "834",
    },
    {
      id: "29014",
      name: "Xã Sơn Phú",
      DistrictId: "834",
    },
    {
      id: "29017",
      name: "Xã Bình Hoà",
      DistrictId: "834",
    },
    {
      id: "29020",
      name: "Xã Phước Long",
      DistrictId: "834",
    },
    {
      id: "29023",
      name: "Xã Hưng Phong",
      DistrictId: "834",
    },
    {
      id: "29026",
      name: "Xã Long Mỹ",
      DistrictId: "834",
    },
    {
      id: "29029",
      name: "Xã Tân Hào",
      DistrictId: "834",
    },
    {
      id: "29032",
      name: "Xã Bình Thành",
      DistrictId: "834",
    },
    {
      id: "29035",
      name: "Xã Tân Thanh",
      DistrictId: "834",
    },
    {
      id: "29038",
      name: "Xã Tân Lợi Thạnh",
      DistrictId: "834",
    },
    {
      id: "29041",
      name: "Xã Thạnh Phú Đông",
      DistrictId: "834",
    },
    {
      id: "29044",
      name: "Xã Hưng Nhượng",
      DistrictId: "834",
    },
    {
      id: "29047",
      name: "Xã Hưng Lễ",
      DistrictId: "834",
    },
    {
      id: "29050",
      name: "Thị trấn Bình Đại",
      DistrictId: "835",
    },
    {
      id: "29053",
      name: "Xã Tam Hiệp",
      DistrictId: "835",
    },
    {
      id: "29056",
      name: "Xã Long Định",
      DistrictId: "835",
    },
    {
      id: "29059",
      name: "Xã Long Hòa",
      DistrictId: "835",
    },
    {
      id: "29062",
      name: "Xã Phú Thuận",
      DistrictId: "835",
    },
    {
      id: "29065",
      name: "Xã Vang Quới Tây",
      DistrictId: "835",
    },
    {
      id: "29068",
      name: "Xã Vang Quới Đông",
      DistrictId: "835",
    },
    {
      id: "29071",
      name: "Xã Châu Hưng",
      DistrictId: "835",
    },
    {
      id: "29074",
      name: "Xã Phú Vang",
      DistrictId: "835",
    },
    {
      id: "29077",
      name: "Xã Lộc Thuận",
      DistrictId: "835",
    },
    {
      id: "29080",
      name: "Xã Định Trung",
      DistrictId: "835",
    },
    {
      id: "29083",
      name: "Xã Thới Lai",
      DistrictId: "835",
    },
    {
      id: "29086",
      name: "Xã Bình Thới",
      DistrictId: "835",
    },
    {
      id: "29089",
      name: "Xã Phú Long",
      DistrictId: "835",
    },
    {
      id: "29092",
      name: "Xã Bình Thắng",
      DistrictId: "835",
    },
    {
      id: "29095",
      name: "Xã Thạnh Trị",
      DistrictId: "835",
    },
    {
      id: "29098",
      name: "Xã Đại Hòa Lộc",
      DistrictId: "835",
    },
    {
      id: "29101",
      name: "Xã Thừa Đức",
      DistrictId: "835",
    },
    {
      id: "29104",
      name: "Xã Thạnh Phước",
      DistrictId: "835",
    },
    {
      id: "29107",
      name: "Xã Thới Thuận",
      DistrictId: "835",
    },
    {
      id: "29110",
      name: "Thị trấn Ba Tri",
      DistrictId: "836",
    },
    {
      id: "29113",
      name: "Xã Tân Mỹ",
      DistrictId: "836",
    },
    {
      id: "29116",
      name: "Xã Mỹ Hòa",
      DistrictId: "836",
    },
    {
      id: "29119",
      name: "Xã Tân Xuân",
      DistrictId: "836",
    },
    {
      id: "29122",
      name: "Xã Mỹ Chánh",
      DistrictId: "836",
    },
    {
      id: "29125",
      name: "Xã Bảo Thạnh",
      DistrictId: "836",
    },
    {
      id: "29128",
      name: "Xã An Phú Trung",
      DistrictId: "836",
    },
    {
      id: "29131",
      name: "Xã Mỹ Thạnh",
      DistrictId: "836",
    },
    {
      id: "29134",
      name: "Xã Mỹ Nhơn",
      DistrictId: "836",
    },
    {
      id: "29137",
      name: "Xã Phước Ngãi",
      DistrictId: "836",
    },
    {
      id: "29143",
      name: "Xã An Ngãi Trung",
      DistrictId: "836",
    },
    {
      id: "29146",
      name: "Xã Phú Lễ",
      DistrictId: "836",
    },
    {
      id: "29149",
      name: "Xã An Bình Tây",
      DistrictId: "836",
    },
    {
      id: "29152",
      name: "Xã Bảo Thuận",
      DistrictId: "836",
    },
    {
      id: "29155",
      name: "Xã Tân Hưng",
      DistrictId: "836",
    },
    {
      id: "29158",
      name: "Xã An Ngãi Tây",
      DistrictId: "836",
    },
    {
      id: "29161",
      name: "Xã An Hiệp",
      DistrictId: "836",
    },
    {
      id: "29164",
      name: "Xã Vĩnh Hòa",
      DistrictId: "836",
    },
    {
      id: "29167",
      name: "Xã Tân Thủy",
      DistrictId: "836",
    },
    {
      id: "29170",
      name: "Xã Vĩnh An",
      DistrictId: "836",
    },
    {
      id: "29173",
      name: "Xã An Đức",
      DistrictId: "836",
    },
    {
      id: "29176",
      name: "Xã An Hòa Tây",
      DistrictId: "836",
    },
    {
      id: "29179",
      name: "Xã An Thủy",
      DistrictId: "836",
    },
    {
      id: "29182",
      name: "Thị trấn Thạnh Phú",
      DistrictId: "837",
    },
    {
      id: "29185",
      name: "Xã Phú Khánh",
      DistrictId: "837",
    },
    {
      id: "29188",
      name: "Xã Đại Điền",
      DistrictId: "837",
    },
    {
      id: "29191",
      name: "Xã Quới Điền",
      DistrictId: "837",
    },
    {
      id: "29194",
      name: "Xã Tân Phong",
      DistrictId: "837",
    },
    {
      id: "29197",
      name: "Xã Mỹ Hưng",
      DistrictId: "837",
    },
    {
      id: "29200",
      name: "Xã An Thạnh",
      DistrictId: "837",
    },
    {
      id: "29203",
      name: "Xã Thới Thạnh",
      DistrictId: "837",
    },
    {
      id: "29206",
      name: "Xã Hòa Lợi",
      DistrictId: "837",
    },
    {
      id: "29209",
      name: "Xã An Điền",
      DistrictId: "837",
    },
    {
      id: "29212",
      name: "Xã Bình Thạnh",
      DistrictId: "837",
    },
    {
      id: "29215",
      name: "Xã An Thuận",
      DistrictId: "837",
    },
    {
      id: "29218",
      name: "Xã An Quy",
      DistrictId: "837",
    },
    {
      id: "29221",
      name: "Xã Thạnh Hải",
      DistrictId: "837",
    },
    {
      id: "29224",
      name: "Xã An Nhơn",
      DistrictId: "837",
    },
    {
      id: "29227",
      name: "Xã Giao Thạnh",
      DistrictId: "837",
    },
    {
      id: "29230",
      name: "Xã Thạnh Phong",
      DistrictId: "837",
    },
    {
      id: "29233",
      name: "Xã Mỹ An",
      DistrictId: "837",
    },
    {
      id: "29236",
      name: "Phường 4",
      DistrictId: "842",
    },
    {
      id: "29239",
      name: "Phường 1",
      DistrictId: "842",
    },
    {
      id: "29242",
      name: "Phường 3",
      DistrictId: "842",
    },
    {
      id: "29245",
      name: "Phường 2",
      DistrictId: "842",
    },
    {
      id: "29248",
      name: "Phường 5",
      DistrictId: "842",
    },
    {
      id: "29251",
      name: "Phường 6",
      DistrictId: "842",
    },
    {
      id: "29254",
      name: "Phường 7",
      DistrictId: "842",
    },
    {
      id: "29257",
      name: "Phường 8",
      DistrictId: "842",
    },
    {
      id: "29260",
      name: "Phường 9",
      DistrictId: "842",
    },
    {
      id: "29263",
      name: "Xã Long Đức",
      DistrictId: "842",
    },
    {
      id: "29266",
      name: "Thị trấn Càng Long",
      DistrictId: "844",
    },
    {
      id: "29269",
      name: "Xã Mỹ Cẩm",
      DistrictId: "844",
    },
    {
      id: "29272",
      name: "Xã An Trường A",
      DistrictId: "844",
    },
    {
      id: "29275",
      name: "Xã An Trường",
      DistrictId: "844",
    },
    {
      id: "29278",
      name: "Xã Huyền Hội",
      DistrictId: "844",
    },
    {
      id: "29281",
      name: "Xã Tân An",
      DistrictId: "844",
    },
    {
      id: "29284",
      name: "Xã Tân Bình",
      DistrictId: "844",
    },
    {
      id: "29287",
      name: "Xã Bình Phú",
      DistrictId: "844",
    },
    {
      id: "29290",
      name: "Xã Phương Thạnh",
      DistrictId: "844",
    },
    {
      id: "29293",
      name: "Xã Đại Phúc",
      DistrictId: "844",
    },
    {
      id: "29296",
      name: "Xã Đại Phước",
      DistrictId: "844",
    },
    {
      id: "29299",
      name: "Xã Nhị Long Phú",
      DistrictId: "844",
    },
    {
      id: "29302",
      name: "Xã Nhị Long",
      DistrictId: "844",
    },
    {
      id: "29305",
      name: "Xã Đức Mỹ",
      DistrictId: "844",
    },
    {
      id: "29308",
      name: "Thị trấn Cầu Kè",
      DistrictId: "845",
    },
    {
      id: "29311",
      name: "Xã Hòa Ân",
      DistrictId: "845",
    },
    {
      id: "29314",
      name: "Xã Châu Điền",
      DistrictId: "845",
    },
    {
      id: "29317",
      name: "Xã An Phú Tân",
      DistrictId: "845",
    },
    {
      id: "29320",
      name: "Xã Hoà Tân",
      DistrictId: "845",
    },
    {
      id: "29323",
      name: "Xã Ninh Thới",
      DistrictId: "845",
    },
    {
      id: "29326",
      name: "Xã Phong Phú",
      DistrictId: "845",
    },
    {
      id: "29329",
      name: "Xã Phong Thạnh",
      DistrictId: "845",
    },
    {
      id: "29332",
      name: "Xã Tam Ngãi",
      DistrictId: "845",
    },
    {
      id: "29335",
      name: "Xã Thông Hòa",
      DistrictId: "845",
    },
    {
      id: "29338",
      name: "Xã Thạnh Phú",
      DistrictId: "845",
    },
    {
      id: "29341",
      name: "Thị trấn Tiểu Cần",
      DistrictId: "846",
    },
    {
      id: "29344",
      name: "Thị trấn Cầu Quan",
      DistrictId: "846",
    },
    {
      id: "29347",
      name: "Xã Phú Cần",
      DistrictId: "846",
    },
    {
      id: "29350",
      name: "Xã Hiếu Tử",
      DistrictId: "846",
    },
    {
      id: "29353",
      name: "Xã Hiếu Trung",
      DistrictId: "846",
    },
    {
      id: "29356",
      name: "Xã Long Thới",
      DistrictId: "846",
    },
    {
      id: "29359",
      name: "Xã Hùng Hòa",
      DistrictId: "846",
    },
    {
      id: "29362",
      name: "Xã Tân Hùng",
      DistrictId: "846",
    },
    {
      id: "29365",
      name: "Xã Tập Ngãi",
      DistrictId: "846",
    },
    {
      id: "29368",
      name: "Xã Ngãi Hùng",
      DistrictId: "846",
    },
    {
      id: "29371",
      name: "Xã Tân Hòa",
      DistrictId: "846",
    },
    {
      id: "29374",
      name: "Thị trấn Châu Thành",
      DistrictId: "847",
    },
    {
      id: "29377",
      name: "Xã Đa Lộc",
      DistrictId: "847",
    },
    {
      id: "29380",
      name: "Xã Mỹ Chánh",
      DistrictId: "847",
    },
    {
      id: "29383",
      name: "Xã Thanh Mỹ",
      DistrictId: "847",
    },
    {
      id: "29386",
      name: "Xã Lương Hoà A",
      DistrictId: "847",
    },
    {
      id: "29389",
      name: "Xã Lương Hòa",
      DistrictId: "847",
    },
    {
      id: "29392",
      name: "Xã Song Lộc",
      DistrictId: "847",
    },
    {
      id: "29395",
      name: "Xã Nguyệt Hóa",
      DistrictId: "847",
    },
    {
      id: "29398",
      name: "Xã Hòa Thuận",
      DistrictId: "847",
    },
    {
      id: "29401",
      name: "Xã Hòa Lợi",
      DistrictId: "847",
    },
    {
      id: "29404",
      name: "Xã Phước Hảo",
      DistrictId: "847",
    },
    {
      id: "29407",
      name: "Xã Hưng Mỹ",
      DistrictId: "847",
    },
    {
      id: "29410",
      name: "Xã Hòa Minh",
      DistrictId: "847",
    },
    {
      id: "29413",
      name: "Xã Long Hòa",
      DistrictId: "847",
    },
    {
      id: "29416",
      name: "Thị trấn Cầu Ngang",
      DistrictId: "848",
    },
    {
      id: "29419",
      name: "Thị trấn Mỹ Long",
      DistrictId: "848",
    },
    {
      id: "29422",
      name: "Xã Mỹ Long Bắc",
      DistrictId: "848",
    },
    {
      id: "29425",
      name: "Xã Mỹ Long Nam",
      DistrictId: "848",
    },
    {
      id: "29428",
      name: "Xã Mỹ Hòa",
      DistrictId: "848",
    },
    {
      id: "29431",
      name: "Xã Vĩnh Kim",
      DistrictId: "848",
    },
    {
      id: "29434",
      name: "Xã Kim Hòa",
      DistrictId: "848",
    },
    {
      id: "29437",
      name: "Xã Hiệp Hòa",
      DistrictId: "848",
    },
    {
      id: "29440",
      name: "Xã Thuận Hòa",
      DistrictId: "848",
    },
    {
      id: "29443",
      name: "Xã Long Sơn",
      DistrictId: "848",
    },
    {
      id: "29446",
      name: "Xã Nhị Trường",
      DistrictId: "848",
    },
    {
      id: "29449",
      name: "Xã Trường Thọ",
      DistrictId: "848",
    },
    {
      id: "29452",
      name: "Xã Hiệp Mỹ Đông",
      DistrictId: "848",
    },
    {
      id: "29455",
      name: "Xã Hiệp Mỹ Tây",
      DistrictId: "848",
    },
    {
      id: "29458",
      name: "Xã Thạnh Hòa Sơn",
      DistrictId: "848",
    },
    {
      id: "29461",
      name: "Thị trấn Trà Cú",
      DistrictId: "849",
    },
    {
      id: "29462",
      name: "Thị trấn Định An",
      DistrictId: "849",
    },
    {
      id: "29464",
      name: "Xã Phước Hưng",
      DistrictId: "849",
    },
    {
      id: "29467",
      name: "Xã Tập Sơn",
      DistrictId: "849",
    },
    {
      id: "29470",
      name: "Xã Tân Sơn",
      DistrictId: "849",
    },
    {
      id: "29473",
      name: "Xã An Quảng Hữu",
      DistrictId: "849",
    },
    {
      id: "29476",
      name: "Xã Lưu Nghiệp Anh",
      DistrictId: "849",
    },
    {
      id: "29479",
      name: "Xã Ngãi Xuyên",
      DistrictId: "849",
    },
    {
      id: "29482",
      name: "Xã Kim Sơn",
      DistrictId: "849",
    },
    {
      id: "29485",
      name: "Xã Thanh Sơn",
      DistrictId: "849",
    },
    {
      id: "29488",
      name: "Xã Hàm Giang",
      DistrictId: "849",
    },
    {
      id: "29489",
      name: "Xã Hàm Tân",
      DistrictId: "849",
    },
    {
      id: "29491",
      name: "Xã Đại An",
      DistrictId: "849",
    },
    {
      id: "29494",
      name: "Xã Định An",
      DistrictId: "849",
    },
    {
      id: "29497",
      name: "Xã Đôn Xuân",
      DistrictId: "850",
    },
    {
      id: "29500",
      name: "Xã Đôn Châu",
      DistrictId: "850",
    },
    {
      id: "29503",
      name: "Xã Ngọc Biên",
      DistrictId: "849",
    },
    {
      id: "29506",
      name: "Xã Long Hiệp",
      DistrictId: "849",
    },
    {
      id: "29509",
      name: "Xã Tân Hiệp",
      DistrictId: "849",
    },
    {
      id: "29512",
      name: "Phường 1",
      DistrictId: "851",
    },
    {
      id: "29513",
      name: "Thị trấn Long Thành",
      DistrictId: "850",
    },
    {
      id: "29515",
      name: "Xã Long Toàn",
      DistrictId: "851",
    },
    {
      id: "29516",
      name: "Phường 2",
      DistrictId: "851",
    },
    {
      id: "29518",
      name: "Xã Long Hữu",
      DistrictId: "851",
    },
    {
      id: "29521",
      name: "Xã Long Khánh",
      DistrictId: "850",
    },
    {
      id: "29524",
      name: "Xã Dân Thành",
      DistrictId: "851",
    },
    {
      id: "29527",
      name: "Xã Trường Long Hòa",
      DistrictId: "851",
    },
    {
      id: "29530",
      name: "Xã Ngũ Lạc",
      DistrictId: "850",
    },
    {
      id: "29533",
      name: "Xã Long Vĩnh",
      DistrictId: "850",
    },
    {
      id: "29536",
      name: "Xã Đông Hải",
      DistrictId: "850",
    },
    {
      id: "29539",
      name: "Xã Hiệp Thạnh",
      DistrictId: "851",
    },
    {
      id: "29542",
      name: "Phường 9",
      DistrictId: "855",
    },
    {
      id: "29545",
      name: "Phường 5",
      DistrictId: "855",
    },
    {
      id: "29548",
      name: "Phường 1",
      DistrictId: "855",
    },
    {
      id: "29551",
      name: "Phường 2",
      DistrictId: "855",
    },
    {
      id: "29554",
      name: "Phường 4",
      DistrictId: "855",
    },
    {
      id: "29557",
      name: "Phường 3",
      DistrictId: "855",
    },
    {
      id: "29560",
      name: "Phường 8",
      DistrictId: "855",
    },
    {
      id: "29563",
      name: "Phường Tân Ngãi",
      DistrictId: "855",
    },
    {
      id: "29566",
      name: "Phường Tân Hòa",
      DistrictId: "855",
    },
    {
      id: "29569",
      name: "Phường Tân Hội",
      DistrictId: "855",
    },
    {
      id: "29572",
      name: "Phường Trường An",
      DistrictId: "855",
    },
    {
      id: "29575",
      name: "Thị trấn Long Hồ",
      DistrictId: "857",
    },
    {
      id: "29578",
      name: "Xã Đồng Phú",
      DistrictId: "857",
    },
    {
      id: "29581",
      name: "Xã Bình Hòa Phước",
      DistrictId: "857",
    },
    {
      id: "29584",
      name: "Xã Hòa Ninh",
      DistrictId: "857",
    },
    {
      id: "29587",
      name: "Xã An Bình",
      DistrictId: "857",
    },
    {
      id: "29590",
      name: "Xã Thanh Đức",
      DistrictId: "857",
    },
    {
      id: "29593",
      name: "Xã Tân Hạnh",
      DistrictId: "857",
    },
    {
      id: "29596",
      name: "Xã Phước Hậu",
      DistrictId: "857",
    },
    {
      id: "29599",
      name: "Xã Long Phước",
      DistrictId: "857",
    },
    {
      id: "29602",
      name: "Xã Phú Đức",
      DistrictId: "857",
    },
    {
      id: "29605",
      name: "Xã Lộc Hòa",
      DistrictId: "857",
    },
    {
      id: "29608",
      name: "Xã Long An",
      DistrictId: "857",
    },
    {
      id: "29611",
      name: "Xã Phú Quới",
      DistrictId: "857",
    },
    {
      id: "29614",
      name: "Xã Thạnh Quới",
      DistrictId: "857",
    },
    {
      id: "29617",
      name: "Xã Hòa Phú",
      DistrictId: "857",
    },
    {
      id: "29623",
      name: "Xã Mỹ An",
      DistrictId: "858",
    },
    {
      id: "29626",
      name: "Xã Mỹ Phước",
      DistrictId: "858",
    },
    {
      id: "29629",
      name: "Xã An Phước",
      DistrictId: "858",
    },
    {
      id: "29632",
      name: "Xã Nhơn Phú",
      DistrictId: "858",
    },
    {
      id: "29635",
      name: "Xã Long Mỹ",
      DistrictId: "858",
    },
    {
      id: "29638",
      name: "Xã Hòa Tịnh",
      DistrictId: "858",
    },
    {
      id: "29641",
      name: "Thị trấn Cái Nhum",
      DistrictId: "858",
    },
    {
      id: "29644",
      name: "Xã Bình Phước",
      DistrictId: "858",
    },
    {
      id: "29647",
      name: "Xã Chánh An",
      DistrictId: "858",
    },
    {
      id: "29650",
      name: "Xã Tân An Hội",
      DistrictId: "858",
    },
    {
      id: "29653",
      name: "Xã Tân Long",
      DistrictId: "858",
    },
    {
      id: "29656",
      name: "Xã Tân Long Hội",
      DistrictId: "858",
    },
    {
      id: "29659",
      name: "Thị trấn Vũng Liêm",
      DistrictId: "859",
    },
    {
      id: "29662",
      name: "Xã Tân Quới Trung",
      DistrictId: "859",
    },
    {
      id: "29665",
      name: "Xã Quới Thiện",
      DistrictId: "859",
    },
    {
      id: "29668",
      name: "Xã Quới An",
      DistrictId: "859",
    },
    {
      id: "29671",
      name: "Xã Trung Chánh",
      DistrictId: "859",
    },
    {
      id: "29674",
      name: "Xã Tân An Luông",
      DistrictId: "859",
    },
    {
      id: "29677",
      name: "Xã Thanh Bình",
      DistrictId: "859",
    },
    {
      id: "29680",
      name: "Xã Trung Thành Tây",
      DistrictId: "859",
    },
    {
      id: "29683",
      name: "Xã Trung Hiệp",
      DistrictId: "859",
    },
    {
      id: "29686",
      name: "Xã Hiếu Phụng",
      DistrictId: "859",
    },
    {
      id: "29689",
      name: "Xã Trung Thành Đông",
      DistrictId: "859",
    },
    {
      id: "29692",
      name: "Xã Trung Thành",
      DistrictId: "859",
    },
    {
      id: "29695",
      name: "Xã Trung Hiếu",
      DistrictId: "859",
    },
    {
      id: "29698",
      name: "Xã Trung Ngãi",
      DistrictId: "859",
    },
    {
      id: "29701",
      name: "Xã Hiếu Thuận",
      DistrictId: "859",
    },
    {
      id: "29704",
      name: "Xã Trung Nghĩa",
      DistrictId: "859",
    },
    {
      id: "29707",
      name: "Xã Trung An",
      DistrictId: "859",
    },
    {
      id: "29710",
      name: "Xã Hiếu Nhơn",
      DistrictId: "859",
    },
    {
      id: "29713",
      name: "Xã Hiếu Thành",
      DistrictId: "859",
    },
    {
      id: "29716",
      name: "Xã Hiếu Nghĩa",
      DistrictId: "859",
    },
    {
      id: "29719",
      name: "Thị trấn Tam Bình",
      DistrictId: "860",
    },
    {
      id: "29722",
      name: "Xã Tân Lộc",
      DistrictId: "860",
    },
    {
      id: "29725",
      name: "Xã Phú Thịnh",
      DistrictId: "860",
    },
    {
      id: "29728",
      name: "Xã Hậu Lộc",
      DistrictId: "860",
    },
    {
      id: "29731",
      name: "Xã Hòa Thạnh",
      DistrictId: "860",
    },
    {
      id: "29734",
      name: "Xã Hoà Lộc",
      DistrictId: "860",
    },
    {
      id: "29737",
      name: "Xã Phú Lộc",
      DistrictId: "860",
    },
    {
      id: "29740",
      name: "Xã Song Phú",
      DistrictId: "860",
    },
    {
      id: "29743",
      name: "Xã Hòa Hiệp",
      DistrictId: "860",
    },
    {
      id: "29746",
      name: "Xã Mỹ Lộc",
      DistrictId: "860",
    },
    {
      id: "29749",
      name: "Xã Tân Phú",
      DistrictId: "860",
    },
    {
      id: "29752",
      name: "Xã Long Phú",
      DistrictId: "860",
    },
    {
      id: "29755",
      name: "Xã Mỹ Thạnh Trung",
      DistrictId: "860",
    },
    {
      id: "29758",
      name: "Xã Tường Lộc",
      DistrictId: "860",
    },
    {
      id: "29761",
      name: "Xã Loan Mỹ",
      DistrictId: "860",
    },
    {
      id: "29764",
      name: "Xã Ngãi Tứ",
      DistrictId: "860",
    },
    {
      id: "29767",
      name: "Xã Bình Ninh",
      DistrictId: "860",
    },
    {
      id: "29770",
      name: "Phường Cái Vồn",
      DistrictId: "861",
    },
    {
      id: "29771",
      name: "Phường Thành Phước",
      DistrictId: "861",
    },
    {
      id: "29773",
      name: "Xã Tân Hưng",
      DistrictId: "863",
    },
    {
      id: "29776",
      name: "Xã Tân Thành",
      DistrictId: "863",
    },
    {
      id: "29779",
      name: "Xã Thành Trung",
      DistrictId: "863",
    },
    {
      id: "29782",
      name: "Xã Tân An Thạnh",
      DistrictId: "863",
    },
    {
      id: "29785",
      name: "Xã Tân Lược",
      DistrictId: "863",
    },
    {
      id: "29788",
      name: "Xã Nguyễn Văn Thảnh",
      DistrictId: "863",
    },
    {
      id: "29791",
      name: "Xã Thành Lợi",
      DistrictId: "863",
    },
    {
      id: "29794",
      name: "Xã Mỹ Thuận",
      DistrictId: "863",
    },
    {
      id: "29797",
      name: "Xã Tân Bình",
      DistrictId: "863",
    },
    {
      id: "29800",
      name: "Thị trấn Tân Quới",
      DistrictId: "863",
    },
    {
      id: "29806",
      name: "Xã Thuận An",
      DistrictId: "861",
    },
    {
      id: "29809",
      name: "Xã Đông Thạnh",
      DistrictId: "861",
    },
    {
      id: "29812",
      name: "Xã Đông Bình",
      DistrictId: "861",
    },
    {
      id: "29813",
      name: "Phường Đông Thuận",
      DistrictId: "861",
    },
    {
      id: "29815",
      name: "Xã Mỹ Hòa",
      DistrictId: "861",
    },
    {
      id: "29818",
      name: "Xã Đông Thành",
      DistrictId: "861",
    },
    {
      id: "29821",
      name: "Thị trấn Trà Ôn",
      DistrictId: "862",
    },
    {
      id: "29824",
      name: "Xã Xuân Hiệp",
      DistrictId: "862",
    },
    {
      id: "29827",
      name: "Xã Nhơn Bình",
      DistrictId: "862",
    },
    {
      id: "29830",
      name: "Xã Hòa Bình",
      DistrictId: "862",
    },
    {
      id: "29833",
      name: "Xã Thới Hòa",
      DistrictId: "862",
    },
    {
      id: "29836",
      name: "Xã Trà Côn",
      DistrictId: "862",
    },
    {
      id: "29839",
      name: "Xã Tân Mỹ",
      DistrictId: "862",
    },
    {
      id: "29842",
      name: "Xã Hựu Thành",
      DistrictId: "862",
    },
    {
      id: "29845",
      name: "Xã Vĩnh Xuân",
      DistrictId: "862",
    },
    {
      id: "29848",
      name: "Xã Thuận Thới",
      DistrictId: "862",
    },
    {
      id: "29851",
      name: "Xã Phú Thành",
      DistrictId: "862",
    },
    {
      id: "29854",
      name: "Xã Thiện Mỹ",
      DistrictId: "862",
    },
    {
      id: "29857",
      name: "Xã Lục Sỹ Thành",
      DistrictId: "862",
    },
    {
      id: "29860",
      name: "Xã Tích Thiện",
      DistrictId: "862",
    },
    {
      id: "29863",
      name: "Phường 11",
      DistrictId: "866",
    },
    {
      id: "29866",
      name: "Phường 1",
      DistrictId: "866",
    },
    {
      id: "29869",
      name: "Phường 2",
      DistrictId: "866",
    },
    {
      id: "29872",
      name: "Phường 4",
      DistrictId: "866",
    },
    {
      id: "29875",
      name: "Phường 3",
      DistrictId: "866",
    },
    {
      id: "29878",
      name: "Phường 6",
      DistrictId: "866",
    },
    {
      id: "29881",
      name: "Xã Mỹ Ngãi",
      DistrictId: "866",
    },
    {
      id: "29884",
      name: "Xã Mỹ Tân",
      DistrictId: "866",
    },
    {
      id: "29887",
      name: "Xã Mỹ Trà",
      DistrictId: "866",
    },
    {
      id: "29888",
      name: "Phường Mỹ Phú",
      DistrictId: "866",
    },
    {
      id: "29890",
      name: "Xã Tân Thuận Tây",
      DistrictId: "866",
    },
    {
      id: "29892",
      name: "Phường Hoà Thuận",
      DistrictId: "866",
    },
    {
      id: "29893",
      name: "Xã Hòa An",
      DistrictId: "866",
    },
    {
      id: "29896",
      name: "Xã Tân Thuận Đông",
      DistrictId: "866",
    },
    {
      id: "29899",
      name: "Xã Tịnh Thới",
      DistrictId: "866",
    },
    {
      id: "29902",
      name: "Phường 3",
      DistrictId: "867",
    },
    {
      id: "29905",
      name: "Phường 1",
      DistrictId: "867",
    },
    {
      id: "29908",
      name: "Phường 4",
      DistrictId: "867",
    },
    {
      id: "29911",
      name: "Phường 2",
      DistrictId: "867",
    },
    {
      id: "29914",
      name: "Xã Tân Khánh Đông",
      DistrictId: "867",
    },
    {
      id: "29917",
      name: "Phường Tân Quy Đông",
      DistrictId: "867",
    },
    {
      id: "29919",
      name: "Phường An Hoà",
      DistrictId: "867",
    },
    {
      id: "29920",
      name: "Xã Tân Quy Tây",
      DistrictId: "867",
    },
    {
      id: "29923",
      name: "Xã Tân Phú Đông",
      DistrictId: "867",
    },
    {
      id: "29926",
      name: "Thị trấn Sa Rài",
      DistrictId: "869",
    },
    {
      id: "29929",
      name: "Xã Tân Hộ Cơ",
      DistrictId: "869",
    },
    {
      id: "29932",
      name: "Xã Thông Bình",
      DistrictId: "869",
    },
    {
      id: "29935",
      name: "Xã Bình Phú",
      DistrictId: "869",
    },
    {
      id: "29938",
      name: "Xã Tân Thành A",
      DistrictId: "869",
    },
    {
      id: "29941",
      name: "Xã Tân Thành B",
      DistrictId: "869",
    },
    {
      id: "29944",
      name: "Xã Tân Phước",
      DistrictId: "869",
    },
    {
      id: "29947",
      name: "Xã Tân Công Chí",
      DistrictId: "869",
    },
    {
      id: "29950",
      name: "Xã An Phước",
      DistrictId: "869",
    },
    {
      id: "29954",
      name: "Phường An Lộc",
      DistrictId: "868",
    },
    {
      id: "29955",
      name: "Phường An Thạnh",
      DistrictId: "868",
    },
    {
      id: "29956",
      name: "Xã Thường Phước 1",
      DistrictId: "870",
    },
    {
      id: "29959",
      name: "Xã Bình Thạnh",
      DistrictId: "868",
    },
    {
      id: "29962",
      name: "Xã Thường Thới Hậu A",
      DistrictId: "870",
    },
    {
      id: "29965",
      name: "Xã Tân Hội",
      DistrictId: "868",
    },
    {
      id: "29971",
      name: "Thị trấn Thường Thới Tiền",
      DistrictId: "870",
    },
    {
      id: "29974",
      name: "Xã Thường Phước 2",
      DistrictId: "870",
    },
    {
      id: "29977",
      name: "Xã Thường Lạc",
      DistrictId: "870",
    },
    {
      id: "29978",
      name: "Phường An Lạc",
      DistrictId: "868",
    },
    {
      id: "29980",
      name: "Xã Long Khánh A",
      DistrictId: "870",
    },
    {
      id: "29983",
      name: "Xã Long Khánh B",
      DistrictId: "870",
    },
    {
      id: "29986",
      name: "Phường An Bình B",
      DistrictId: "868",
    },
    {
      id: "29989",
      name: "Phường An Bình A",
      DistrictId: "868",
    },
    {
      id: "29992",
      name: "Xã Long Thuận",
      DistrictId: "870",
    },
    {
      id: "29995",
      name: "Xã Phú Thuận B",
      DistrictId: "870",
    },
    {
      id: "29998",
      name: "Xã Phú Thuận A",
      DistrictId: "870",
    },
    {
      id: "30001",
      name: "Thị trấn Tràm Chim",
      DistrictId: "871",
    },
    {
      id: "30004",
      name: "Xã Hoà Bình",
      DistrictId: "871",
    },
    {
      id: "30007",
      name: "Xã Tân Công Sính",
      DistrictId: "871",
    },
    {
      id: "30010",
      name: "Xã Phú Hiệp",
      DistrictId: "871",
    },
    {
      id: "30013",
      name: "Xã Phú Đức",
      DistrictId: "871",
    },
    {
      id: "30016",
      name: "Xã Phú Thành B",
      DistrictId: "871",
    },
    {
      id: "30019",
      name: "Xã An Hòa",
      DistrictId: "871",
    },
    {
      id: "30022",
      name: "Xã An Long",
      DistrictId: "871",
    },
    {
      id: "30025",
      name: "Xã Phú Cường",
      DistrictId: "871",
    },
    {
      id: "30028",
      name: "Xã Phú Ninh",
      DistrictId: "871",
    },
    {
      id: "30031",
      name: "Xã Phú Thọ",
      DistrictId: "871",
    },
    {
      id: "30034",
      name: "Xã Phú Thành A",
      DistrictId: "871",
    },
    {
      id: "30037",
      name: "Thị trấn Mỹ An",
      DistrictId: "872",
    },
    {
      id: "30040",
      name: "Xã Thạnh Lợi",
      DistrictId: "872",
    },
    {
      id: "30043",
      name: "Xã Hưng Thạnh",
      DistrictId: "872",
    },
    {
      id: "30046",
      name: "Xã Trường Xuân",
      DistrictId: "872",
    },
    {
      id: "30049",
      name: "Xã Tân Kiều",
      DistrictId: "872",
    },
    {
      id: "30052",
      name: "Xã Mỹ Hòa",
      DistrictId: "872",
    },
    {
      id: "30055",
      name: "Xã Mỹ Quý",
      DistrictId: "872",
    },
    {
      id: "30058",
      name: "Xã Mỹ Đông",
      DistrictId: "872",
    },
    {
      id: "30061",
      name: "Xã Đốc Binh Kiều",
      DistrictId: "872",
    },
    {
      id: "30064",
      name: "Xã Mỹ An",
      DistrictId: "872",
    },
    {
      id: "30067",
      name: "Xã Phú Điền",
      DistrictId: "872",
    },
    {
      id: "30070",
      name: "Xã Láng Biển",
      DistrictId: "872",
    },
    {
      id: "30073",
      name: "Xã Thanh Mỹ",
      DistrictId: "872",
    },
    {
      id: "30076",
      name: "Thị trấn Mỹ Thọ",
      DistrictId: "873",
    },
    {
      id: "30079",
      name: "Xã Gáo Giồng",
      DistrictId: "873",
    },
    {
      id: "30082",
      name: "Xã Phương Thịnh",
      DistrictId: "873",
    },
    {
      id: "30085",
      name: "Xã Ba Sao",
      DistrictId: "873",
    },
    {
      id: "30088",
      name: "Xã Phong Mỹ",
      DistrictId: "873",
    },
    {
      id: "30091",
      name: "Xã Tân Nghĩa",
      DistrictId: "873",
    },
    {
      id: "30094",
      name: "Xã Phương Trà",
      DistrictId: "873",
    },
    {
      id: "30097",
      name: "Xã Nhị Mỹ",
      DistrictId: "873",
    },
    {
      id: "30100",
      name: "Xã Mỹ Thọ",
      DistrictId: "873",
    },
    {
      id: "30103",
      name: "Xã Tân Hội Trung",
      DistrictId: "873",
    },
    {
      id: "30106",
      name: "Xã An Bình",
      DistrictId: "873",
    },
    {
      id: "30109",
      name: "Xã Mỹ Hội",
      DistrictId: "873",
    },
    {
      id: "30112",
      name: "Xã Mỹ Hiệp",
      DistrictId: "873",
    },
    {
      id: "30115",
      name: "Xã Mỹ Long",
      DistrictId: "873",
    },
    {
      id: "30118",
      name: "Xã Bình Hàng Trung",
      DistrictId: "873",
    },
    {
      id: "30121",
      name: "Xã Mỹ Xương",
      DistrictId: "873",
    },
    {
      id: "30124",
      name: "Xã Bình Hàng Tây",
      DistrictId: "873",
    },
    {
      id: "30127",
      name: "Xã Bình Thạnh",
      DistrictId: "873",
    },
    {
      id: "30130",
      name: "Thị trấn Thanh Bình",
      DistrictId: "874",
    },
    {
      id: "30133",
      name: "Xã Tân Quới",
      DistrictId: "874",
    },
    {
      id: "30136",
      name: "Xã Tân Hòa",
      DistrictId: "874",
    },
    {
      id: "30139",
      name: "Xã An Phong",
      DistrictId: "874",
    },
    {
      id: "30142",
      name: "Xã Phú Lợi",
      DistrictId: "874",
    },
    {
      id: "30145",
      name: "Xã Tân Mỹ",
      DistrictId: "874",
    },
    {
      id: "30148",
      name: "Xã Bình Tấn",
      DistrictId: "874",
    },
    {
      id: "30151",
      name: "Xã Tân Huề",
      DistrictId: "874",
    },
    {
      id: "30154",
      name: "Xã Tân Bình",
      DistrictId: "874",
    },
    {
      id: "30157",
      name: "Xã Tân Thạnh",
      DistrictId: "874",
    },
    {
      id: "30160",
      name: "Xã Tân Phú",
      DistrictId: "874",
    },
    {
      id: "30163",
      name: "Xã Bình Thành",
      DistrictId: "874",
    },
    {
      id: "30166",
      name: "Xã Tân Long",
      DistrictId: "874",
    },
    {
      id: "30169",
      name: "Thị trấn Lấp Vò",
      DistrictId: "875",
    },
    {
      id: "30172",
      name: "Xã Mỹ An Hưng A",
      DistrictId: "875",
    },
    {
      id: "30175",
      name: "Xã Tân Mỹ",
      DistrictId: "875",
    },
    {
      id: "30178",
      name: "Xã Mỹ An Hưng B",
      DistrictId: "875",
    },
    {
      id: "30181",
      name: "Xã Tân  Khánh Trung",
      DistrictId: "875",
    },
    {
      id: "30184",
      name: "Xã Long Hưng A",
      DistrictId: "875",
    },
    {
      id: "30187",
      name: "Xã Vĩnh Thạnh",
      DistrictId: "875",
    },
    {
      id: "30190",
      name: "Xã Long Hưng B",
      DistrictId: "875",
    },
    {
      id: "30193",
      name: "Xã Bình Thành",
      DistrictId: "875",
    },
    {
      id: "30196",
      name: "Xã Định An",
      DistrictId: "875",
    },
    {
      id: "30199",
      name: "Xã Định Yên",
      DistrictId: "875",
    },
    {
      id: "30202",
      name: "Xã Hội An Đông",
      DistrictId: "875",
    },
    {
      id: "30205",
      name: "Xã Bình Thạnh Trung",
      DistrictId: "875",
    },
    {
      id: "30208",
      name: "Thị trấn Lai Vung",
      DistrictId: "876",
    },
    {
      id: "30211",
      name: "Xã Tân Dương",
      DistrictId: "876",
    },
    {
      id: "30214",
      name: "Xã Hòa Thành",
      DistrictId: "876",
    },
    {
      id: "30217",
      name: "Xã Long Hậu",
      DistrictId: "876",
    },
    {
      id: "30220",
      name: "Xã Tân Phước",
      DistrictId: "876",
    },
    {
      id: "30223",
      name: "Xã Hòa Long",
      DistrictId: "876",
    },
    {
      id: "30226",
      name: "Xã Tân Thành",
      DistrictId: "876",
    },
    {
      id: "30229",
      name: "Xã Long Thắng",
      DistrictId: "876",
    },
    {
      id: "30232",
      name: "Xã Vĩnh Thới",
      DistrictId: "876",
    },
    {
      id: "30235",
      name: "Xã Tân Hòa",
      DistrictId: "876",
    },
    {
      id: "30238",
      name: "Xã Định Hòa",
      DistrictId: "876",
    },
    {
      id: "30241",
      name: "Xã Phong Hòa",
      DistrictId: "876",
    },
    {
      id: "30244",
      name: "Thị trấn Cái Tàu Hạ",
      DistrictId: "877",
    },
    {
      id: "30247",
      name: "Xã An Hiệp",
      DistrictId: "877",
    },
    {
      id: "30250",
      name: "Xã An Nhơn",
      DistrictId: "877",
    },
    {
      id: "30253",
      name: "Xã Tân Nhuận Đông",
      DistrictId: "877",
    },
    {
      id: "30256",
      name: "Xã Tân Bình",
      DistrictId: "877",
    },
    {
      id: "30259",
      name: "Xã Tân Phú Trung",
      DistrictId: "877",
    },
    {
      id: "30262",
      name: "Xã Phú Long",
      DistrictId: "877",
    },
    {
      id: "30265",
      name: "Xã An Phú Thuận",
      DistrictId: "877",
    },
    {
      id: "30268",
      name: "Xã Phú Hựu",
      DistrictId: "877",
    },
    {
      id: "30271",
      name: "Xã An Khánh",
      DistrictId: "877",
    },
    {
      id: "30274",
      name: "Xã Tân Phú",
      DistrictId: "877",
    },
    {
      id: "30277",
      name: "Xã Hòa Tân",
      DistrictId: "877",
    },
    {
      id: "30280",
      name: "Phường Mỹ Bình",
      DistrictId: "883",
    },
    {
      id: "30283",
      name: "Phường Mỹ Long",
      DistrictId: "883",
    },
    {
      id: "30285",
      name: "Phường Đông Xuyên",
      DistrictId: "883",
    },
    {
      id: "30286",
      name: "Phường Mỹ Xuyên",
      DistrictId: "883",
    },
    {
      id: "30289",
      name: "Phường Bình Đức",
      DistrictId: "883",
    },
    {
      id: "30292",
      name: "Phường Bình Khánh",
      DistrictId: "883",
    },
    {
      id: "30295",
      name: "Phường Mỹ Phước",
      DistrictId: "883",
    },
    {
      id: "30298",
      name: "Phường Mỹ Quý",
      DistrictId: "883",
    },
    {
      id: "30301",
      name: "Phường Mỹ Thới",
      DistrictId: "883",
    },
    {
      id: "30304",
      name: "Phường Mỹ Thạnh",
      DistrictId: "883",
    },
    {
      id: "30307",
      name: "Phường Mỹ Hòa",
      DistrictId: "883",
    },
    {
      id: "30310",
      name: "Xã Mỹ Khánh",
      DistrictId: "883",
    },
    {
      id: "30313",
      name: "Xã Mỹ Hoà Hưng",
      DistrictId: "883",
    },
    {
      id: "30316",
      name: "Phường Châu Phú B",
      DistrictId: "884",
    },
    {
      id: "30319",
      name: "Phường Châu Phú A",
      DistrictId: "884",
    },
    {
      id: "30322",
      name: "Phường Vĩnh Mỹ",
      DistrictId: "884",
    },
    {
      id: "30325",
      name: "Phường Núi Sam",
      DistrictId: "884",
    },
    {
      id: "30328",
      name: "Phường Vĩnh Ngươn",
      DistrictId: "884",
    },
    {
      id: "30331",
      name: "Xã Vĩnh Tế",
      DistrictId: "884",
    },
    {
      id: "30334",
      name: "Xã Vĩnh Châu",
      DistrictId: "884",
    },
    {
      id: "30337",
      name: "Thị trấn An Phú",
      DistrictId: "886",
    },
    {
      id: "30340",
      name: "Xã Khánh An",
      DistrictId: "886",
    },
    {
      id: "30341",
      name: "Thị Trấn Long Bình",
      DistrictId: "886",
    },
    {
      id: "30343",
      name: "Xã Khánh Bình",
      DistrictId: "886",
    },
    {
      id: "30346",
      name: "Xã Quốc Thái",
      DistrictId: "886",
    },
    {
      id: "30349",
      name: "Xã Nhơn Hội",
      DistrictId: "886",
    },
    {
      id: "30352",
      name: "Xã Phú Hữu",
      DistrictId: "886",
    },
    {
      id: "30355",
      name: "Xã Phú Hội",
      DistrictId: "886",
    },
    {
      id: "30358",
      name: "Xã Phước Hưng",
      DistrictId: "886",
    },
    {
      id: "30361",
      name: "Xã Vĩnh Lộc",
      DistrictId: "886",
    },
    {
      id: "30364",
      name: "Xã Vĩnh Hậu",
      DistrictId: "886",
    },
    {
      id: "30367",
      name: "Xã Vĩnh Trường",
      DistrictId: "886",
    },
    {
      id: "30370",
      name: "Xã Vĩnh Hội Đông",
      DistrictId: "886",
    },
    {
      id: "30373",
      name: "Xã Đa Phước",
      DistrictId: "886",
    },
    {
      id: "30376",
      name: "Phường Long Thạnh",
      DistrictId: "887",
    },
    {
      id: "30377",
      name: "Phường Long Hưng",
      DistrictId: "887",
    },
    {
      id: "30378",
      name: "Phường Long Châu",
      DistrictId: "887",
    },
    {
      id: "30379",
      name: "Xã Phú Lộc",
      DistrictId: "887",
    },
    {
      id: "30382",
      name: "Xã Vĩnh Xương",
      DistrictId: "887",
    },
    {
      id: "30385",
      name: "Xã Vĩnh Hòa",
      DistrictId: "887",
    },
    {
      id: "30387",
      name: "Xã Tân Thạnh",
      DistrictId: "887",
    },
    {
      id: "30388",
      name: "Xã Tân An",
      DistrictId: "887",
    },
    {
      id: "30391",
      name: "Xã Long An",
      DistrictId: "887",
    },
    {
      id: "30394",
      name: "Phường Long Phú",
      DistrictId: "887",
    },
    {
      id: "30397",
      name: "Xã Châu Phong",
      DistrictId: "887",
    },
    {
      id: "30400",
      name: "Xã Phú Vĩnh",
      DistrictId: "887",
    },
    {
      id: "30403",
      name: "Xã Lê Chánh",
      DistrictId: "887",
    },
    {
      id: "30406",
      name: "Thị trấn Phú Mỹ",
      DistrictId: "888",
    },
    {
      id: "30409",
      name: "Thị trấn Chợ Vàm",
      DistrictId: "888",
    },
    {
      id: "30412",
      name: "Phường Long Sơn",
      DistrictId: "887",
    },
    {
      id: "30415",
      name: "Xã Long Hoà",
      DistrictId: "888",
    },
    {
      id: "30418",
      name: "Xã Phú Long",
      DistrictId: "888",
    },
    {
      id: "30421",
      name: "Xã Phú Lâm",
      DistrictId: "888",
    },
    {
      id: "30424",
      name: "Xã Phú Hiệp",
      DistrictId: "888",
    },
    {
      id: "30427",
      name: "Xã Phú Thạnh",
      DistrictId: "888",
    },
    {
      id: "30430",
      name: "Xã Hoà Lạc",
      DistrictId: "888",
    },
    {
      id: "30433",
      name: "Xã Phú Thành",
      DistrictId: "888",
    },
    {
      id: "30436",
      name: "Xã Phú An",
      DistrictId: "888",
    },
    {
      id: "30439",
      name: "Xã Phú Xuân",
      DistrictId: "888",
    },
    {
      id: "30442",
      name: "Xã Hiệp Xương",
      DistrictId: "888",
    },
    {
      id: "30445",
      name: "Xã Phú Bình",
      DistrictId: "888",
    },
    {
      id: "30448",
      name: "Xã Phú Thọ",
      DistrictId: "888",
    },
    {
      id: "30451",
      name: "Xã Phú Hưng",
      DistrictId: "888",
    },
    {
      id: "30454",
      name: "Xã Bình Thạnh Đông",
      DistrictId: "888",
    },
    {
      id: "30457",
      name: "Xã Tân Hòa",
      DistrictId: "888",
    },
    {
      id: "30460",
      name: "Xã Tân Trung",
      DistrictId: "888",
    },
    {
      id: "30463",
      name: "Thị trấn Cái Dầu",
      DistrictId: "889",
    },
    {
      id: "30466",
      name: "Xã Khánh Hòa",
      DistrictId: "889",
    },
    {
      id: "30469",
      name: "Xã Mỹ Đức",
      DistrictId: "889",
    },
    {
      id: "30472",
      name: "Xã Mỹ Phú",
      DistrictId: "889",
    },
    {
      id: "30475",
      name: "Xã Ô Long Vỹ",
      DistrictId: "889",
    },
    {
      id: "30478",
      name: "Thị trấn Vĩnh Thạnh Trung",
      DistrictId: "889",
    },
    {
      id: "30481",
      name: "Xã Thạnh Mỹ Tây",
      DistrictId: "889",
    },
    {
      id: "30484",
      name: "Xã Bình Long",
      DistrictId: "889",
    },
    {
      id: "30487",
      name: "Xã Bình Mỹ",
      DistrictId: "889",
    },
    {
      id: "30490",
      name: "Xã Bình Thủy",
      DistrictId: "889",
    },
    {
      id: "30493",
      name: "Xã Đào Hữu Cảnh",
      DistrictId: "889",
    },
    {
      id: "30496",
      name: "Xã Bình Phú",
      DistrictId: "889",
    },
    {
      id: "30499",
      name: "Xã Bình Chánh",
      DistrictId: "889",
    },
    {
      id: "30502",
      name: "Thị trấn Nhà Bàng",
      DistrictId: "890",
    },
    {
      id: "30505",
      name: "Thị trấn Chi Lăng",
      DistrictId: "890",
    },
    {
      id: "30508",
      name: "Xã Núi Voi",
      DistrictId: "890",
    },
    {
      id: "30511",
      name: "Xã Nhơn Hưng",
      DistrictId: "890",
    },
    {
      id: "30514",
      name: "Xã An Phú",
      DistrictId: "890",
    },
    {
      id: "30517",
      name: "Xã Thới Sơn",
      DistrictId: "890",
    },
    {
      id: "30520",
      name: "Thị trấn Tịnh Biên",
      DistrictId: "890",
    },
    {
      id: "30523",
      name: "Xã Văn Giáo",
      DistrictId: "890",
    },
    {
      id: "30526",
      name: "Xã An Cư",
      DistrictId: "890",
    },
    {
      id: "30529",
      name: "Xã An Nông",
      DistrictId: "890",
    },
    {
      id: "30532",
      name: "Xã Vĩnh Trung",
      DistrictId: "890",
    },
    {
      id: "30535",
      name: "Xã Tân Lợi",
      DistrictId: "890",
    },
    {
      id: "30538",
      name: "Xã An Hảo",
      DistrictId: "890",
    },
    {
      id: "30541",
      name: "Xã Tân Lập",
      DistrictId: "890",
    },
    {
      id: "30544",
      name: "Thị trấn Tri Tôn",
      DistrictId: "891",
    },
    {
      id: "30547",
      name: "Thị trấn Ba Chúc",
      DistrictId: "891",
    },
    {
      id: "30550",
      name: "Xã Lạc Quới",
      DistrictId: "891",
    },
    {
      id: "30553",
      name: "Xã Lê Trì",
      DistrictId: "891",
    },
    {
      id: "30556",
      name: "Xã Vĩnh Gia",
      DistrictId: "891",
    },
    {
      id: "30559",
      name: "Xã Vĩnh Phước",
      DistrictId: "891",
    },
    {
      id: "30562",
      name: "Xã Châu Lăng",
      DistrictId: "891",
    },
    {
      id: "30565",
      name: "Xã Lương Phi",
      DistrictId: "891",
    },
    {
      id: "30568",
      name: "Xã Lương An Trà",
      DistrictId: "891",
    },
    {
      id: "30571",
      name: "Xã Tà Đảnh",
      DistrictId: "891",
    },
    {
      id: "30574",
      name: "Xã Núi Tô",
      DistrictId: "891",
    },
    {
      id: "30577",
      name: "Xã An Tức",
      DistrictId: "891",
    },
    {
      id: "30580",
      name: "Thị trấn Cô Tô",
      DistrictId: "891",
    },
    {
      id: "30583",
      name: "Xã Tân Tuyến",
      DistrictId: "891",
    },
    {
      id: "30586",
      name: "Xã Ô Lâm",
      DistrictId: "891",
    },
    {
      id: "30589",
      name: "Thị trấn An Châu",
      DistrictId: "892",
    },
    {
      id: "30592",
      name: "Xã An Hòa",
      DistrictId: "892",
    },
    {
      id: "30595",
      name: "Xã Cần Đăng",
      DistrictId: "892",
    },
    {
      id: "30598",
      name: "Xã Vĩnh Hanh",
      DistrictId: "892",
    },
    {
      id: "30601",
      name: "Xã Bình Thạnh",
      DistrictId: "892",
    },
    {
      id: "30604",
      name: "Thị trấn Vĩnh Bình",
      DistrictId: "892",
    },
    {
      id: "30607",
      name: "Xã Bình Hòa",
      DistrictId: "892",
    },
    {
      id: "30610",
      name: "Xã Vĩnh An",
      DistrictId: "892",
    },
    {
      id: "30613",
      name: "Xã Hòa Bình Thạnh",
      DistrictId: "892",
    },
    {
      id: "30616",
      name: "Xã Vĩnh Lợi",
      DistrictId: "892",
    },
    {
      id: "30619",
      name: "Xã Vĩnh Nhuận",
      DistrictId: "892",
    },
    {
      id: "30622",
      name: "Xã Tân Phú",
      DistrictId: "892",
    },
    {
      id: "30625",
      name: "Xã Vĩnh Thành",
      DistrictId: "892",
    },
    {
      id: "30628",
      name: "Thị trấn Chợ Mới",
      DistrictId: "893",
    },
    {
      id: "30631",
      name: "Thị trấn Mỹ Luông",
      DistrictId: "893",
    },
    {
      id: "30634",
      name: "Xã Kiến An",
      DistrictId: "893",
    },
    {
      id: "30637",
      name: "Xã Mỹ Hội Đông",
      DistrictId: "893",
    },
    {
      id: "30640",
      name: "Xã Long Điền A",
      DistrictId: "893",
    },
    {
      id: "30643",
      name: "Xã Tấn Mỹ",
      DistrictId: "893",
    },
    {
      id: "30646",
      name: "Xã Long Điền B",
      DistrictId: "893",
    },
    {
      id: "30649",
      name: "Xã Kiến Thành",
      DistrictId: "893",
    },
    {
      id: "30652",
      name: "Xã Mỹ Hiệp",
      DistrictId: "893",
    },
    {
      id: "30655",
      name: "Xã Mỹ An",
      DistrictId: "893",
    },
    {
      id: "30658",
      name: "Xã Nhơn Mỹ",
      DistrictId: "893",
    },
    {
      id: "30661",
      name: "Xã Long Giang",
      DistrictId: "893",
    },
    {
      id: "30664",
      name: "Xã Long Kiến",
      DistrictId: "893",
    },
    {
      id: "30667",
      name: "Xã Bình Phước Xuân",
      DistrictId: "893",
    },
    {
      id: "30670",
      name: "Xã An Thạnh Trung",
      DistrictId: "893",
    },
    {
      id: "30673",
      name: "Xã Hội An",
      DistrictId: "893",
    },
    {
      id: "30676",
      name: "Xã Hòa Bình",
      DistrictId: "893",
    },
    {
      id: "30679",
      name: "Xã Hòa An",
      DistrictId: "893",
    },
    {
      id: "30682",
      name: "Thị trấn Núi Sập",
      DistrictId: "894",
    },
    {
      id: "30685",
      name: "Thị trấn Phú Hoà",
      DistrictId: "894",
    },
    {
      id: "30688",
      name: "Thị Trấn Óc Eo",
      DistrictId: "894",
    },
    {
      id: "30691",
      name: "Xã Tây Phú",
      DistrictId: "894",
    },
    {
      id: "30692",
      name: "Xã An Bình",
      DistrictId: "894",
    },
    {
      id: "30694",
      name: "Xã Vĩnh Phú",
      DistrictId: "894",
    },
    {
      id: "30697",
      name: "Xã Vĩnh Trạch",
      DistrictId: "894",
    },
    {
      id: "30700",
      name: "Xã Phú Thuận",
      DistrictId: "894",
    },
    {
      id: "30703",
      name: "Xã Vĩnh Chánh",
      DistrictId: "894",
    },
    {
      id: "30706",
      name: "Xã Định Mỹ",
      DistrictId: "894",
    },
    {
      id: "30709",
      name: "Xã Định Thành",
      DistrictId: "894",
    },
    {
      id: "30712",
      name: "Xã Mỹ Phú Đông",
      DistrictId: "894",
    },
    {
      id: "30715",
      name: "Xã Vọng Đông",
      DistrictId: "894",
    },
    {
      id: "30718",
      name: "Xã Vĩnh Khánh",
      DistrictId: "894",
    },
    {
      id: "30721",
      name: "Xã Thoại Giang",
      DistrictId: "894",
    },
    {
      id: "30724",
      name: "Xã Bình Thành",
      DistrictId: "894",
    },
    {
      id: "30727",
      name: "Xã Vọng Thê",
      DistrictId: "894",
    },
    {
      id: "30730",
      name: "Phường Vĩnh Thanh Vân",
      DistrictId: "899",
    },
    {
      id: "30733",
      name: "Phường Vĩnh Thanh",
      DistrictId: "899",
    },
    {
      id: "30736",
      name: "Phường Vĩnh Quang",
      DistrictId: "899",
    },
    {
      id: "30739",
      name: "Phường Vĩnh Hiệp",
      DistrictId: "899",
    },
    {
      id: "30742",
      name: "Phường Vĩnh Bảo",
      DistrictId: "899",
    },
    {
      id: "30745",
      name: "Phường Vĩnh Lạc",
      DistrictId: "899",
    },
    {
      id: "30748",
      name: "Phường An Hòa",
      DistrictId: "899",
    },
    {
      id: "30751",
      name: "Phường An Bình",
      DistrictId: "899",
    },
    {
      id: "30754",
      name: "Phường Rạch Sỏi",
      DistrictId: "899",
    },
    {
      id: "30757",
      name: "Phường Vĩnh Lợi",
      DistrictId: "899",
    },
    {
      id: "30760",
      name: "Phường Vĩnh Thông",
      DistrictId: "899",
    },
    {
      id: "30763",
      name: "Xã Phi Thông",
      DistrictId: "899",
    },
    {
      id: "30766",
      name: "Phường Tô Châu",
      DistrictId: "900",
    },
    {
      id: "30769",
      name: "Phường Đông Hồ",
      DistrictId: "900",
    },
    {
      id: "30772",
      name: "Phường Bình San",
      DistrictId: "900",
    },
    {
      id: "30775",
      name: "Phường Pháo Đài",
      DistrictId: "900",
    },
    {
      id: "30778",
      name: "Phường Mỹ Đức",
      DistrictId: "900",
    },
    {
      id: "30781",
      name: "Xã Tiên Hải",
      DistrictId: "900",
    },
    {
      id: "30784",
      name: "Xã Thuận Yên",
      DistrictId: "900",
    },
    {
      id: "30787",
      name: "Thị trấn Kiên Lương",
      DistrictId: "902",
    },
    {
      id: "30790",
      name: "Xã Kiên Bình",
      DistrictId: "902",
    },
    {
      id: "30791",
      name: "Xã Vĩnh Phú",
      DistrictId: "914",
    },
    {
      id: "30793",
      name: "Xã Vĩnh Điều",
      DistrictId: "914",
    },
    {
      id: "30796",
      name: "Xã Tân Khánh Hòa",
      DistrictId: "914",
    },
    {
      id: "30797",
      name: "Xã Phú Lợi",
      DistrictId: "914",
    },
    {
      id: "30799",
      name: "Xã Phú Mỹ",
      DistrictId: "914",
    },
    {
      id: "30802",
      name: "Xã Hòa Điền",
      DistrictId: "902",
    },
    {
      id: "30805",
      name: "Xã Dương Hòa",
      DistrictId: "902",
    },
    {
      id: "30808",
      name: "Xã Bình An",
      DistrictId: "902",
    },
    {
      id: "30809",
      name: "Xã Bình Trị",
      DistrictId: "902",
    },
    {
      id: "30811",
      name: "Xã Sơn Hải",
      DistrictId: "902",
    },
    {
      id: "30814",
      name: "Xã Hòn Nghệ",
      DistrictId: "902",
    },
    {
      id: "30817",
      name: "Thị trấn Hòn Đất",
      DistrictId: "903",
    },
    {
      id: "30820",
      name: "Thị trấn Sóc Sơn",
      DistrictId: "903",
    },
    {
      id: "30823",
      name: "Xã Bình Sơn",
      DistrictId: "903",
    },
    {
      id: "30826",
      name: "Xã Bình Giang",
      DistrictId: "903",
    },
    {
      id: "30828",
      name: "Xã Mỹ Thái",
      DistrictId: "903",
    },
    {
      id: "30829",
      name: "Xã Nam Thái Sơn",
      DistrictId: "903",
    },
    {
      id: "30832",
      name: "Xã Mỹ Hiệp Sơn",
      DistrictId: "903",
    },
    {
      id: "30835",
      name: "Xã Sơn Kiên",
      DistrictId: "903",
    },
    {
      id: "30836",
      name: "Xã Sơn Bình",
      DistrictId: "903",
    },
    {
      id: "30838",
      name: "Xã Mỹ Thuận",
      DistrictId: "903",
    },
    {
      id: "30840",
      name: "Xã Lình Huỳnh",
      DistrictId: "903",
    },
    {
      id: "30841",
      name: "Xã Thổ Sơn",
      DistrictId: "903",
    },
    {
      id: "30844",
      name: "Xã Mỹ Lâm",
      DistrictId: "903",
    },
    {
      id: "30847",
      name: "Xã Mỹ Phước",
      DistrictId: "903",
    },
    {
      id: "30850",
      name: "Thị trấn Tân Hiệp",
      DistrictId: "904",
    },
    {
      id: "30853",
      name: "Xã Tân Hội",
      DistrictId: "904",
    },
    {
      id: "30856",
      name: "Xã Tân Thành",
      DistrictId: "904",
    },
    {
      id: "30859",
      name: "Xã Tân Hiệp B",
      DistrictId: "904",
    },
    {
      id: "30860",
      name: "Xã Tân Hoà",
      DistrictId: "904",
    },
    {
      id: "30862",
      name: "Xã Thạnh Đông B",
      DistrictId: "904",
    },
    {
      id: "30865",
      name: "Xã Thạnh Đông",
      DistrictId: "904",
    },
    {
      id: "30868",
      name: "Xã Tân Hiệp A",
      DistrictId: "904",
    },
    {
      id: "30871",
      name: "Xã Tân An",
      DistrictId: "904",
    },
    {
      id: "30874",
      name: "Xã Thạnh Đông A",
      DistrictId: "904",
    },
    {
      id: "30877",
      name: "Xã Thạnh Trị",
      DistrictId: "904",
    },
    {
      id: "30880",
      name: "Thị trấn Minh Lương",
      DistrictId: "905",
    },
    {
      id: "30883",
      name: "Xã Mong Thọ A",
      DistrictId: "905",
    },
    {
      id: "30886",
      name: "Xã Mong Thọ B",
      DistrictId: "905",
    },
    {
      id: "30887",
      name: "Xã Mong Thọ",
      DistrictId: "905",
    },
    {
      id: "30889",
      name: "Xã Giục Tượng",
      DistrictId: "905",
    },
    {
      id: "30892",
      name: "Xã Vĩnh Hòa Hiệp",
      DistrictId: "905",
    },
    {
      id: "30893",
      name: "Xã Vĩnh Hoà Phú",
      DistrictId: "905",
    },
    {
      id: "30895",
      name: "Xã Minh Hòa",
      DistrictId: "905",
    },
    {
      id: "30898",
      name: "Xã Bình An",
      DistrictId: "905",
    },
    {
      id: "30901",
      name: "Xã Thạnh Lộc",
      DistrictId: "905",
    },
    {
      id: "30904",
      name: "Thị Trấn Giồng Riềng",
      DistrictId: "906",
    },
    {
      id: "30907",
      name: "Xã Thạnh Hưng",
      DistrictId: "906",
    },
    {
      id: "30910",
      name: "Xã Thạnh Phước",
      DistrictId: "906",
    },
    {
      id: "30913",
      name: "Xã Thạnh Lộc",
      DistrictId: "906",
    },
    {
      id: "30916",
      name: "Xã Thạnh Hòa",
      DistrictId: "906",
    },
    {
      id: "30917",
      name: "Xã Thạnh Bình",
      DistrictId: "906",
    },
    {
      id: "30919",
      name: "Xã Bàn Thạch",
      DistrictId: "906",
    },
    {
      id: "30922",
      name: "Xã Bàn Tân Định",
      DistrictId: "906",
    },
    {
      id: "30925",
      name: "Xã Ngọc Thành",
      DistrictId: "906",
    },
    {
      id: "30928",
      name: "Xã Ngọc Chúc",
      DistrictId: "906",
    },
    {
      id: "30931",
      name: "Xã Ngọc Thuận",
      DistrictId: "906",
    },
    {
      id: "30934",
      name: "Xã Hòa Hưng",
      DistrictId: "906",
    },
    {
      id: "30937",
      name: "Xã Hoà Lợi",
      DistrictId: "906",
    },
    {
      id: "30940",
      name: "Xã Hoà An",
      DistrictId: "906",
    },
    {
      id: "30943",
      name: "Xã Long Thạnh",
      DistrictId: "906",
    },
    {
      id: "30946",
      name: "Xã Vĩnh Thạnh",
      DistrictId: "906",
    },
    {
      id: "30947",
      name: "Xã Vĩnh Phú",
      DistrictId: "906",
    },
    {
      id: "30949",
      name: "Xã  Hòa Thuận",
      DistrictId: "906",
    },
    {
      id: "30950",
      name: "Xã Ngọc Hoà",
      DistrictId: "906",
    },
    {
      id: "30952",
      name: "Thị trấn Gò Quao",
      DistrictId: "907",
    },
    {
      id: "30955",
      name: "Xã Vĩnh Hòa Hưng Bắc",
      DistrictId: "907",
    },
    {
      id: "30958",
      name: "Xã Định Hòa",
      DistrictId: "907",
    },
    {
      id: "30961",
      name: "Xã Thới Quản",
      DistrictId: "907",
    },
    {
      id: "30964",
      name: "Xã Định An",
      DistrictId: "907",
    },
    {
      id: "30967",
      name: "Xã Thủy Liễu",
      DistrictId: "907",
    },
    {
      id: "30970",
      name: "Xã Vĩnh Hòa Hưng Nam",
      DistrictId: "907",
    },
    {
      id: "30973",
      name: "Xã Vĩnh Phước A",
      DistrictId: "907",
    },
    {
      id: "30976",
      name: "Xã Vĩnh Phước B",
      DistrictId: "907",
    },
    {
      id: "30979",
      name: "Xã Vĩnh Tuy",
      DistrictId: "907",
    },
    {
      id: "30982",
      name: "Xã Vĩnh Thắng",
      DistrictId: "907",
    },
    {
      id: "30985",
      name: "Thị trấn Thứ Ba",
      DistrictId: "908",
    },
    {
      id: "30988",
      name: "Xã Tây Yên",
      DistrictId: "908",
    },
    {
      id: "30991",
      name: "Xã Tây Yên A",
      DistrictId: "908",
    },
    {
      id: "30994",
      name: "Xã Nam Yên",
      DistrictId: "908",
    },
    {
      id: "30997",
      name: "Xã Hưng Yên",
      DistrictId: "908",
    },
    {
      id: "31000",
      name: "Xã Nam Thái",
      DistrictId: "908",
    },
    {
      id: "31003",
      name: "Xã Nam Thái A",
      DistrictId: "908",
    },
    {
      id: "31006",
      name: "Xã Đông Thái",
      DistrictId: "908",
    },
    {
      id: "31009",
      name: "Xã Đông Yên",
      DistrictId: "908",
    },
    {
      id: "31012",
      name: "Xã Thạnh Yên",
      DistrictId: "913",
    },
    {
      id: "31015",
      name: "Xã Thạnh Yên A",
      DistrictId: "913",
    },
    {
      id: "31018",
      name: "Thị trấn Thứ Mười Một",
      DistrictId: "909",
    },
    {
      id: "31021",
      name: "Xã Thuận Hoà",
      DistrictId: "909",
    },
    {
      id: "31024",
      name: "Xã Đông Hòa",
      DistrictId: "909",
    },
    {
      id: "31027",
      name: "Xã An Minh Bắc",
      DistrictId: "913",
    },
    {
      id: "31030",
      name: "Xã Đông Thạnh",
      DistrictId: "909",
    },
    {
      id: "31031",
      name: "Xã Tân Thạnh",
      DistrictId: "909",
    },
    {
      id: "31033",
      name: "Xã Đông Hưng",
      DistrictId: "909",
    },
    {
      id: "31036",
      name: "Xã Đông Hưng A",
      DistrictId: "909",
    },
    {
      id: "31039",
      name: "Xã Đông Hưng B",
      DistrictId: "909",
    },
    {
      id: "31042",
      name: "Xã Vân Khánh",
      DistrictId: "909",
    },
    {
      id: "31045",
      name: "Xã Vân Khánh Đông",
      DistrictId: "909",
    },
    {
      id: "31048",
      name: "Xã Vân Khánh Tây",
      DistrictId: "909",
    },
    {
      id: "31051",
      name: "Thị trấn Vĩnh Thuận",
      DistrictId: "910",
    },
    {
      id: "31054",
      name: "Xã Vĩnh Hòa",
      DistrictId: "913",
    },
    {
      id: "31057",
      name: "Xã Hoà Chánh",
      DistrictId: "913",
    },
    {
      id: "31060",
      name: "Xã Vĩnh Bình Bắc",
      DistrictId: "910",
    },
    {
      id: "31063",
      name: "Xã Vĩnh Bình Nam",
      DistrictId: "910",
    },
    {
      id: "31064",
      name: "Xã Bình Minh",
      DistrictId: "910",
    },
    {
      id: "31066",
      name: "Xã Minh Thuận",
      DistrictId: "913",
    },
    {
      id: "31069",
      name: "Xã Vĩnh Thuận",
      DistrictId: "910",
    },
    {
      id: "31072",
      name: "Xã Tân Thuận",
      DistrictId: "910",
    },
    {
      id: "31074",
      name: "Xã Phong Đông",
      DistrictId: "910",
    },
    {
      id: "31075",
      name: "Xã Vĩnh Phong",
      DistrictId: "910",
    },
    {
      id: "31078",
      name: "Phường Dương Đông",
      DistrictId: "911",
    },
    {
      id: "31081",
      name: "Phường An Thới",
      DistrictId: "911",
    },
    {
      id: "31084",
      name: "Xã Cửa Cạn",
      DistrictId: "911",
    },
    {
      id: "31087",
      name: "Xã Gành Dầu",
      DistrictId: "911",
    },
    {
      id: "31090",
      name: "Xã Cửa Dương",
      DistrictId: "911",
    },
    {
      id: "31093",
      name: "Xã Hàm Ninh",
      DistrictId: "911",
    },
    {
      id: "31096",
      name: "Xã Dương Tơ",
      DistrictId: "911",
    },
    {
      id: "31102",
      name: "Xã Bãi Thơm",
      DistrictId: "911",
    },
    {
      id: "31105",
      name: "Xã Thổ Châu",
      DistrictId: "911",
    },
    {
      id: "31108",
      name: "Xã Hòn Tre",
      DistrictId: "912",
    },
    {
      id: "31111",
      name: "Xã Lại Sơn",
      DistrictId: "912",
    },
    {
      id: "31114",
      name: "Xã An Sơn",
      DistrictId: "912",
    },
    {
      id: "31115",
      name: "Xã Nam Du",
      DistrictId: "912",
    },
    {
      id: "31117",
      name: "Phường Cái Khế",
      DistrictId: "916",
    },
    {
      id: "31120",
      name: "Phường An Hòa",
      DistrictId: "916",
    },
    {
      id: "31123",
      name: "Phường Thới Bình",
      DistrictId: "916",
    },
    {
      id: "31126",
      name: "Phường An Nghiệp",
      DistrictId: "916",
    },
    {
      id: "31129",
      name: "Phường An Cư",
      DistrictId: "916",
    },
    {
      id: "31135",
      name: "Phường Tân An",
      DistrictId: "916",
    },
    {
      id: "31141",
      name: "Phường An Phú",
      DistrictId: "916",
    },
    {
      id: "31144",
      name: "Phường Xuân Khánh",
      DistrictId: "916",
    },
    {
      id: "31147",
      name: "Phường Hưng Lợi",
      DistrictId: "916",
    },
    {
      id: "31149",
      name: "Phường An Khánh",
      DistrictId: "916",
    },
    {
      id: "31150",
      name: "Phường An Bình",
      DistrictId: "916",
    },
    {
      id: "31153",
      name: "Phường Châu Văn Liêm",
      DistrictId: "917",
    },
    {
      id: "31154",
      name: "Phường Thới Hòa",
      DistrictId: "917",
    },
    {
      id: "31156",
      name: "Phường Thới Long",
      DistrictId: "917",
    },
    {
      id: "31157",
      name: "Phường Long Hưng",
      DistrictId: "917",
    },
    {
      id: "31159",
      name: "Phường Thới An",
      DistrictId: "917",
    },
    {
      id: "31162",
      name: "Phường Phước Thới",
      DistrictId: "917",
    },
    {
      id: "31165",
      name: "Phường Trường Lạc",
      DistrictId: "917",
    },
    {
      id: "31168",
      name: "Phường Bình Thủy",
      DistrictId: "918",
    },
    {
      id: "31169",
      name: "Phường Trà An",
      DistrictId: "918",
    },
    {
      id: "31171",
      name: "Phường Trà Nóc",
      DistrictId: "918",
    },
    {
      id: "31174",
      name: "Phường Thới An Đông",
      DistrictId: "918",
    },
    {
      id: "31177",
      name: "Phường An Thới",
      DistrictId: "918",
    },
    {
      id: "31178",
      name: "Phường Bùi Hữu Nghĩa",
      DistrictId: "918",
    },
    {
      id: "31180",
      name: "Phường Long Hòa",
      DistrictId: "918",
    },
    {
      id: "31183",
      name: "Phường Long Tuyền",
      DistrictId: "918",
    },
    {
      id: "31186",
      name: "Phường Lê Bình",
      DistrictId: "919",
    },
    {
      id: "31189",
      name: "Phường Hưng Phú",
      DistrictId: "919",
    },
    {
      id: "31192",
      name: "Phường Hưng Thạnh",
      DistrictId: "919",
    },
    {
      id: "31195",
      name: "Phường Ba Láng",
      DistrictId: "919",
    },
    {
      id: "31198",
      name: "Phường Thường Thạnh",
      DistrictId: "919",
    },
    {
      id: "31201",
      name: "Phường Phú Thứ",
      DistrictId: "919",
    },
    {
      id: "31204",
      name: "Phường Tân Phú",
      DistrictId: "919",
    },
    {
      id: "31207",
      name: "Phường Thốt Nốt",
      DistrictId: "923",
    },
    {
      id: "31210",
      name: "Phường Thới Thuận",
      DistrictId: "923",
    },
    {
      id: "31211",
      name: "Xã Vĩnh Bình",
      DistrictId: "924",
    },
    {
      id: "31212",
      name: "Phường Thuận An",
      DistrictId: "923",
    },
    {
      id: "31213",
      name: "Phường Tân Lộc",
      DistrictId: "923",
    },
    {
      id: "31216",
      name: "Phường Trung Nhứt",
      DistrictId: "923",
    },
    {
      id: "31217",
      name: "Phường Thạnh Hoà",
      DistrictId: "923",
    },
    {
      id: "31219",
      name: "Phường Trung Kiên",
      DistrictId: "923",
    },
    {
      id: "31222",
      name: "Xã Trung An",
      DistrictId: "925",
    },
    {
      id: "31225",
      name: "Xã Trung Thạnh",
      DistrictId: "925",
    },
    {
      id: "31227",
      name: "Phường Tân Hưng",
      DistrictId: "923",
    },
    {
      id: "31228",
      name: "Phường Thuận Hưng",
      DistrictId: "923",
    },
    {
      id: "31231",
      name: "Thị trấn Thanh An",
      DistrictId: "924",
    },
    {
      id: "31232",
      name: "Thị trấn Vĩnh Thạnh",
      DistrictId: "924",
    },
    {
      id: "31234",
      name: "Xã Thạnh Mỹ",
      DistrictId: "924",
    },
    {
      id: "31237",
      name: "Xã Vĩnh Trinh",
      DistrictId: "924",
    },
    {
      id: "31240",
      name: "Xã Thạnh An",
      DistrictId: "924",
    },
    {
      id: "31241",
      name: "Xã Thạnh Tiến",
      DistrictId: "924",
    },
    {
      id: "31243",
      name: "Xã Thạnh Thắng",
      DistrictId: "924",
    },
    {
      id: "31244",
      name: "Xã Thạnh Lợi",
      DistrictId: "924",
    },
    {
      id: "31246",
      name: "Xã Thạnh Qưới",
      DistrictId: "924",
    },
    {
      id: "31249",
      name: "Xã Thạnh Phú",
      DistrictId: "925",
    },
    {
      id: "31252",
      name: "Xã Thạnh Lộc",
      DistrictId: "924",
    },
    {
      id: "31255",
      name: "Xã Trung Hưng",
      DistrictId: "925",
    },
    {
      id: "31258",
      name: "Thị trấn Thới Lai",
      DistrictId: "927",
    },
    {
      id: "31261",
      name: "Thị trấn Cờ Đỏ",
      DistrictId: "925",
    },
    {
      id: "31264",
      name: "Xã Thới Hưng",
      DistrictId: "925",
    },
    {
      id: "31267",
      name: "Xã Thới Thạnh",
      DistrictId: "927",
    },
    {
      id: "31268",
      name: "Xã Tân Thạnh",
      DistrictId: "927",
    },
    {
      id: "31270",
      name: "Xã Xuân Thắng",
      DistrictId: "927",
    },
    {
      id: "31273",
      name: "Xã Đông Hiệp",
      DistrictId: "925",
    },
    {
      id: "31274",
      name: "Xã Đông Thắng",
      DistrictId: "925",
    },
    {
      id: "31276",
      name: "Xã Thới Đông",
      DistrictId: "925",
    },
    {
      id: "31277",
      name: "Xã Thới Xuân",
      DistrictId: "925",
    },
    {
      id: "31279",
      name: "Xã Đông Bình",
      DistrictId: "927",
    },
    {
      id: "31282",
      name: "Xã Đông Thuận",
      DistrictId: "927",
    },
    {
      id: "31285",
      name: "Xã Thới Tân",
      DistrictId: "927",
    },
    {
      id: "31286",
      name: "Xã Trường Thắng",
      DistrictId: "927",
    },
    {
      id: "31288",
      name: "Xã Định Môn",
      DistrictId: "927",
    },
    {
      id: "31291",
      name: "Xã Trường Thành",
      DistrictId: "927",
    },
    {
      id: "31294",
      name: "Xã Trường Xuân",
      DistrictId: "927",
    },
    {
      id: "31297",
      name: "Xã Trường Xuân A",
      DistrictId: "927",
    },
    {
      id: "31298",
      name: "Xã Trường Xuân B",
      DistrictId: "927",
    },
    {
      id: "31299",
      name: "Thị trấn Phong Điền",
      DistrictId: "926",
    },
    {
      id: "31300",
      name: "Xã Nhơn Ái",
      DistrictId: "926",
    },
    {
      id: "31303",
      name: "Xã Giai Xuân",
      DistrictId: "926",
    },
    {
      id: "31306",
      name: "Xã Tân Thới",
      DistrictId: "926",
    },
    {
      id: "31309",
      name: "Xã Trường Long",
      DistrictId: "926",
    },
    {
      id: "31312",
      name: "Xã Mỹ Khánh",
      DistrictId: "926",
    },
    {
      id: "31315",
      name: "Xã Nhơn Nghĩa",
      DistrictId: "926",
    },
    {
      id: "31318",
      name: "Phường I",
      DistrictId: "930",
    },
    {
      id: "31321",
      name: "Phường III",
      DistrictId: "930",
    },
    {
      id: "31324",
      name: "Phường IV",
      DistrictId: "930",
    },
    {
      id: "31327",
      name: "Phường V",
      DistrictId: "930",
    },
    {
      id: "31330",
      name: "Phường VII",
      DistrictId: "930",
    },
    {
      id: "31333",
      name: "Xã Vị Tân",
      DistrictId: "930",
    },
    {
      id: "31336",
      name: "Xã Hoả Lựu",
      DistrictId: "930",
    },
    {
      id: "31338",
      name: "Xã Tân Tiến",
      DistrictId: "930",
    },
    {
      id: "31339",
      name: "Xã Hoả Tiến",
      DistrictId: "930",
    },
    {
      id: "31340",
      name: "Phường Ngã Bảy",
      DistrictId: "931",
    },
    {
      id: "31341",
      name: "Phường Lái Hiếu",
      DistrictId: "931",
    },
    {
      id: "31342",
      name: "Thị trấn Một Ngàn",
      DistrictId: "932",
    },
    {
      id: "31343",
      name: "Phường Hiệp Thành",
      DistrictId: "931",
    },
    {
      id: "31344",
      name: "Phường Hiệp Lợi",
      DistrictId: "931",
    },
    {
      id: "31345",
      name: "Xã Tân Hoà",
      DistrictId: "932",
    },
    {
      id: "31346",
      name: "Thị trấn Bảy Ngàn",
      DistrictId: "932",
    },
    {
      id: "31348",
      name: "Xã Trường Long Tây",
      DistrictId: "932",
    },
    {
      id: "31351",
      name: "Xã Trường Long A",
      DistrictId: "932",
    },
    {
      id: "31357",
      name: "Xã Nhơn Nghĩa A",
      DistrictId: "932",
    },
    {
      id: "31359",
      name: "Thị trấn Rạch Gòi",
      DistrictId: "932",
    },
    {
      id: "31360",
      name: "Xã Thạnh Xuân",
      DistrictId: "932",
    },
    {
      id: "31362",
      name: "Thị trấn Cái Tắc",
      DistrictId: "932",
    },
    {
      id: "31363",
      name: "Xã Tân Phú Thạnh",
      DistrictId: "932",
    },
    {
      id: "31366",
      name: "Thị Trấn Ngã Sáu",
      DistrictId: "933",
    },
    {
      id: "31369",
      name: "Xã Đông Thạnh",
      DistrictId: "933",
    },
    {
      id: "31375",
      name: "Xã Đông Phú",
      DistrictId: "933",
    },
    {
      id: "31378",
      name: "Xã Phú Hữu",
      DistrictId: "933",
    },
    {
      id: "31379",
      name: "Xã Phú Tân",
      DistrictId: "933",
    },
    {
      id: "31381",
      name: "Thị trấn Mái Dầm",
      DistrictId: "933",
    },
    {
      id: "31384",
      name: "Xã Đông Phước",
      DistrictId: "933",
    },
    {
      id: "31387",
      name: "Xã Đông Phước A",
      DistrictId: "933",
    },
    {
      id: "31393",
      name: "Thị trấn Kinh Cùng",
      DistrictId: "934",
    },
    {
      id: "31396",
      name: "Thị trấn Cây Dương",
      DistrictId: "934",
    },
    {
      id: "31399",
      name: "Xã Tân Bình",
      DistrictId: "934",
    },
    {
      id: "31402",
      name: "Xã Bình Thành",
      DistrictId: "934",
    },
    {
      id: "31405",
      name: "Xã Thạnh Hòa",
      DistrictId: "934",
    },
    {
      id: "31408",
      name: "Xã Long Thạnh",
      DistrictId: "934",
    },
    {
      id: "31411",
      name: "Xã Đại Thành",
      DistrictId: "931",
    },
    {
      id: "31414",
      name: "Xã Tân Thành",
      DistrictId: "931",
    },
    {
      id: "31417",
      name: "Xã Phụng Hiệp",
      DistrictId: "934",
    },
    {
      id: "31420",
      name: "Xã Hòa Mỹ",
      DistrictId: "934",
    },
    {
      id: "31423",
      name: "Xã Hòa An",
      DistrictId: "934",
    },
    {
      id: "31426",
      name: "Xã Phương Bình",
      DistrictId: "934",
    },
    {
      id: "31429",
      name: "Xã Hiệp Hưng",
      DistrictId: "934",
    },
    {
      id: "31432",
      name: "Xã Tân Phước Hưng",
      DistrictId: "934",
    },
    {
      id: "31433",
      name: "Thị trấn Búng Tàu",
      DistrictId: "934",
    },
    {
      id: "31435",
      name: "Xã Phương Phú",
      DistrictId: "934",
    },
    {
      id: "31438",
      name: "Xã Tân Long",
      DistrictId: "934",
    },
    {
      id: "31441",
      name: "Thị trấn Nàng Mau",
      DistrictId: "935",
    },
    {
      id: "31444",
      name: "Xã Vị Trung",
      DistrictId: "935",
    },
    {
      id: "31447",
      name: "Xã Vị Thuỷ",
      DistrictId: "935",
    },
    {
      id: "31450",
      name: "Xã Vị Thắng",
      DistrictId: "935",
    },
    {
      id: "31453",
      name: "Xã Vĩnh Thuận Tây",
      DistrictId: "935",
    },
    {
      id: "31456",
      name: "Xã Vĩnh Trung",
      DistrictId: "935",
    },
    {
      id: "31459",
      name: "Xã Vĩnh Tường",
      DistrictId: "935",
    },
    {
      id: "31462",
      name: "Xã Vị Đông",
      DistrictId: "935",
    },
    {
      id: "31465",
      name: "Xã Vị Thanh",
      DistrictId: "935",
    },
    {
      id: "31468",
      name: "Xã Vị Bình",
      DistrictId: "935",
    },
    {
      id: "31471",
      name: "Phường Thuận An",
      DistrictId: "937",
    },
    {
      id: "31472",
      name: "Phường Trà Lồng",
      DistrictId: "937",
    },
    {
      id: "31473",
      name: "Phường Bình Thạnh",
      DistrictId: "937",
    },
    {
      id: "31474",
      name: "Xã Long Bình",
      DistrictId: "937",
    },
    {
      id: "31475",
      name: "Phường Vĩnh Tường",
      DistrictId: "937",
    },
    {
      id: "31477",
      name: "Xã Long Trị",
      DistrictId: "937",
    },
    {
      id: "31478",
      name: "Xã Long Trị A",
      DistrictId: "937",
    },
    {
      id: "31480",
      name: "Xã Long Phú",
      DistrictId: "937",
    },
    {
      id: "31481",
      name: "Xã Tân Phú",
      DistrictId: "937",
    },
    {
      id: "31483",
      name: "Xã Thuận Hưng",
      DistrictId: "936",
    },
    {
      id: "31484",
      name: "Xã Thuận Hòa",
      DistrictId: "936",
    },
    {
      id: "31486",
      name: "Xã Vĩnh Thuận Đông",
      DistrictId: "936",
    },
    {
      id: "31489",
      name: "Thị trấn Vĩnh Viễn",
      DistrictId: "936",
    },
    {
      id: "31490",
      name: "Xã Vĩnh Viễn A",
      DistrictId: "936",
    },
    {
      id: "31492",
      name: "Xã Lương Tâm",
      DistrictId: "936",
    },
    {
      id: "31493",
      name: "Xã Lương Nghĩa",
      DistrictId: "936",
    },
    {
      id: "31495",
      name: "Xã Xà Phiên",
      DistrictId: "936",
    },
    {
      id: "31498",
      name: "Phường 5",
      DistrictId: "941",
    },
    {
      id: "31501",
      name: "Phường 7",
      DistrictId: "941",
    },
    {
      id: "31504",
      name: "Phường 8",
      DistrictId: "941",
    },
    {
      id: "31507",
      name: "Phường 6",
      DistrictId: "941",
    },
    {
      id: "31510",
      name: "Phường 2",
      DistrictId: "941",
    },
    {
      id: "31513",
      name: "Phường 1",
      DistrictId: "941",
    },
    {
      id: "31516",
      name: "Phường 4",
      DistrictId: "941",
    },
    {
      id: "31519",
      name: "Phường 3",
      DistrictId: "941",
    },
    {
      id: "31522",
      name: "Phường 9",
      DistrictId: "941",
    },
    {
      id: "31525",
      name: "Phường 10",
      DistrictId: "941",
    },
    {
      id: "31528",
      name: "Thị trấn Kế Sách",
      DistrictId: "943",
    },
    {
      id: "31531",
      name: "Thị trấn An Lạc Thôn",
      DistrictId: "943",
    },
    {
      id: "31534",
      name: "Xã Xuân Hòa",
      DistrictId: "943",
    },
    {
      id: "31537",
      name: "Xã Phong Nẫm",
      DistrictId: "943",
    },
    {
      id: "31540",
      name: "Xã An Lạc Tây",
      DistrictId: "943",
    },
    {
      id: "31543",
      name: "Xã Trinh Phú",
      DistrictId: "943",
    },
    {
      id: "31546",
      name: "Xã Ba Trinh",
      DistrictId: "943",
    },
    {
      id: "31549",
      name: "Xã Thới An Hội",
      DistrictId: "943",
    },
    {
      id: "31552",
      name: "Xã Nhơn Mỹ",
      DistrictId: "943",
    },
    {
      id: "31555",
      name: "Xã Kế Thành",
      DistrictId: "943",
    },
    {
      id: "31558",
      name: "Xã Kế An",
      DistrictId: "943",
    },
    {
      id: "31561",
      name: "Xã Đại Hải",
      DistrictId: "943",
    },
    {
      id: "31564",
      name: "Xã An Mỹ",
      DistrictId: "943",
    },
    {
      id: "31567",
      name: "Thị trấn Huỳnh Hữu Nghĩa",
      DistrictId: "944",
    },
    {
      id: "31569",
      name: "Thị trấn Châu Thành",
      DistrictId: "942",
    },
    {
      id: "31570",
      name: "Xã Hồ Đắc Kiện",
      DistrictId: "942",
    },
    {
      id: "31573",
      name: "Xã Phú Tâm",
      DistrictId: "942",
    },
    {
      id: "31576",
      name: "Xã Thuận Hòa",
      DistrictId: "942",
    },
    {
      id: "31579",
      name: "Xã Long Hưng",
      DistrictId: "944",
    },
    {
      id: "31582",
      name: "Xã Phú Tân",
      DistrictId: "942",
    },
    {
      id: "31585",
      name: "Xã Thiện Mỹ",
      DistrictId: "942",
    },
    {
      id: "31588",
      name: "Xã Hưng Phú",
      DistrictId: "944",
    },
    {
      id: "31591",
      name: "Xã Mỹ Hương",
      DistrictId: "944",
    },
    {
      id: "31594",
      name: "Xã An Hiệp",
      DistrictId: "942",
    },
    {
      id: "31597",
      name: "Xã Mỹ Tú",
      DistrictId: "944",
    },
    {
      id: "31600",
      name: "Xã An Ninh",
      DistrictId: "942",
    },
    {
      id: "31603",
      name: "Xã Mỹ Phước",
      DistrictId: "944",
    },
    {
      id: "31606",
      name: "Xã Thuận Hưng",
      DistrictId: "944",
    },
    {
      id: "31609",
      name: "Xã Mỹ Thuận",
      DistrictId: "944",
    },
    {
      id: "31612",
      name: "Xã Phú Mỹ",
      DistrictId: "944",
    },
    {
      id: "31615",
      name: "Thị trấn Cù Lao Dung",
      DistrictId: "945",
    },
    {
      id: "31618",
      name: "Xã An Thạnh 1",
      DistrictId: "945",
    },
    {
      id: "31621",
      name: "Xã An Thạnh Tây",
      DistrictId: "945",
    },
    {
      id: "31624",
      name: "Xã An Thạnh Đông",
      DistrictId: "945",
    },
    {
      id: "31627",
      name: "Xã Đại Ân 1",
      DistrictId: "945",
    },
    {
      id: "31630",
      name: "Xã An Thạnh 2",
      DistrictId: "945",
    },
    {
      id: "31633",
      name: "Xã An Thạnh 3",
      DistrictId: "945",
    },
    {
      id: "31636",
      name: "Xã An Thạnh Nam",
      DistrictId: "945",
    },
    {
      id: "31639",
      name: "Thị trấn Long Phú",
      DistrictId: "946",
    },
    {
      id: "31642",
      name: "Xã Song Phụng",
      DistrictId: "946",
    },
    {
      id: "31645",
      name: "Thị trấn Đại Ngãi",
      DistrictId: "946",
    },
    {
      id: "31648",
      name: "Xã Hậu Thạnh",
      DistrictId: "946",
    },
    {
      id: "31651",
      name: "Xã Long Đức",
      DistrictId: "946",
    },
    {
      id: "31654",
      name: "Xã Trường Khánh",
      DistrictId: "946",
    },
    {
      id: "31657",
      name: "Xã Phú Hữu",
      DistrictId: "946",
    },
    {
      id: "31660",
      name: "Xã Tân Hưng",
      DistrictId: "946",
    },
    {
      id: "31663",
      name: "Xã Châu Khánh",
      DistrictId: "946",
    },
    {
      id: "31666",
      name: "Xã Tân Thạnh",
      DistrictId: "946",
    },
    {
      id: "31669",
      name: "Xã Long Phú",
      DistrictId: "946",
    },
    {
      id: "31672",
      name: "Xã Đại Ân  2",
      DistrictId: "951",
    },
    {
      id: "31673",
      name: "Thị trấn Trần Đề",
      DistrictId: "951",
    },
    {
      id: "31675",
      name: "Xã Liêu Tú",
      DistrictId: "951",
    },
    {
      id: "31678",
      name: "Xã Lịch Hội Thượng",
      DistrictId: "951",
    },
    {
      id: "31679",
      name: "Thị trấn Lịch Hội Thượng",
      DistrictId: "951",
    },
    {
      id: "31681",
      name: "Xã Trung Bình",
      DistrictId: "951",
    },
    {
      id: "31684",
      name: "Thị trấn Mỹ Xuyên",
      DistrictId: "947",
    },
    {
      id: "31687",
      name: "Xã Tài Văn",
      DistrictId: "951",
    },
    {
      id: "31690",
      name: "Xã Đại Tâm",
      DistrictId: "947",
    },
    {
      id: "31693",
      name: "Xã Tham Đôn",
      DistrictId: "947",
    },
    {
      id: "31696",
      name: "Xã Viên An",
      DistrictId: "951",
    },
    {
      id: "31699",
      name: "Xã Thạnh Thới An",
      DistrictId: "951",
    },
    {
      id: "31702",
      name: "Xã Thạnh Thới Thuận",
      DistrictId: "951",
    },
    {
      id: "31705",
      name: "Xã Viên Bình",
      DistrictId: "951",
    },
    {
      id: "31708",
      name: "Xã Thạnh Phú",
      DistrictId: "947",
    },
    {
      id: "31711",
      name: "Xã Ngọc Đông",
      DistrictId: "947",
    },
    {
      id: "31714",
      name: "Xã Thạnh Quới",
      DistrictId: "947",
    },
    {
      id: "31717",
      name: "Xã Hòa Tú 1",
      DistrictId: "947",
    },
    {
      id: "31720",
      name: "Xã Gia Hòa 1",
      DistrictId: "947",
    },
    {
      id: "31723",
      name: "Xã Ngọc Tố",
      DistrictId: "947",
    },
    {
      id: "31726",
      name: "Xã Gia Hòa 2",
      DistrictId: "947",
    },
    {
      id: "31729",
      name: "Xã Hòa Tú II",
      DistrictId: "947",
    },
    {
      id: "31732",
      name: "Phường 1",
      DistrictId: "948",
    },
    {
      id: "31735",
      name: "Phường 2",
      DistrictId: "948",
    },
    {
      id: "31738",
      name: "Xã Vĩnh Quới",
      DistrictId: "948",
    },
    {
      id: "31741",
      name: "Xã Tân Long",
      DistrictId: "948",
    },
    {
      id: "31744",
      name: "Xã Long Bình",
      DistrictId: "948",
    },
    {
      id: "31747",
      name: "Phường 3",
      DistrictId: "948",
    },
    {
      id: "31750",
      name: "Xã Mỹ Bình",
      DistrictId: "948",
    },
    {
      id: "31753",
      name: "Xã Mỹ Quới",
      DistrictId: "948",
    },
    {
      id: "31756",
      name: "Thị trấn Phú Lộc",
      DistrictId: "949",
    },
    {
      id: "31757",
      name: "Thị trấn Hưng Lợi",
      DistrictId: "949",
    },
    {
      id: "31759",
      name: "Xã Lâm Tân",
      DistrictId: "949",
    },
    {
      id: "31762",
      name: "Xã Thạnh Tân",
      DistrictId: "949",
    },
    {
      id: "31765",
      name: "Xã Lâm Kiết",
      DistrictId: "949",
    },
    {
      id: "31768",
      name: "Xã Tuân Tức",
      DistrictId: "949",
    },
    {
      id: "31771",
      name: "Xã Vĩnh Thành",
      DistrictId: "949",
    },
    {
      id: "31774",
      name: "Xã Thạnh Trị",
      DistrictId: "949",
    },
    {
      id: "31777",
      name: "Xã Vĩnh Lợi",
      DistrictId: "949",
    },
    {
      id: "31780",
      name: "Xã Châu Hưng",
      DistrictId: "949",
    },
    {
      id: "31783",
      name: "Phường 1",
      DistrictId: "950",
    },
    {
      id: "31786",
      name: "Xã Hòa Đông",
      DistrictId: "950",
    },
    {
      id: "31789",
      name: "Phường Khánh Hòa",
      DistrictId: "950",
    },
    {
      id: "31792",
      name: "Xã Vĩnh Hiệp",
      DistrictId: "950",
    },
    {
      id: "31795",
      name: "Xã Vĩnh Hải",
      DistrictId: "950",
    },
    {
      id: "31798",
      name: "Xã Lạc Hòa",
      DistrictId: "950",
    },
    {
      id: "31801",
      name: "Phường 2",
      DistrictId: "950",
    },
    {
      id: "31804",
      name: "Phường Vĩnh Phước",
      DistrictId: "950",
    },
    {
      id: "31807",
      name: "Xã Vĩnh Tân",
      DistrictId: "950",
    },
    {
      id: "31810",
      name: "Xã Lai Hòa",
      DistrictId: "950",
    },
    {
      id: "31813",
      name: "Phường 2",
      DistrictId: "954",
    },
    {
      id: "31816",
      name: "Phường 3",
      DistrictId: "954",
    },
    {
      id: "31819",
      name: "Phường 5",
      DistrictId: "954",
    },
    {
      id: "31822",
      name: "Phường 7",
      DistrictId: "954",
    },
    {
      id: "31825",
      name: "Phường 1",
      DistrictId: "954",
    },
    {
      id: "31828",
      name: "Phường 8",
      DistrictId: "954",
    },
    {
      id: "31831",
      name: "Phường Nhà Mát",
      DistrictId: "954",
    },
    {
      id: "31834",
      name: "Xã Vĩnh Trạch",
      DistrictId: "954",
    },
    {
      id: "31837",
      name: "Xã Vĩnh Trạch Đông",
      DistrictId: "954",
    },
    {
      id: "31840",
      name: "Xã Hiệp Thành",
      DistrictId: "954",
    },
    {
      id: "31843",
      name: "Thị trấn Ngan Dừa",
      DistrictId: "956",
    },
    {
      id: "31846",
      name: "Xã Ninh Quới",
      DistrictId: "956",
    },
    {
      id: "31849",
      name: "Xã Ninh Quới A",
      DistrictId: "956",
    },
    {
      id: "31852",
      name: "Xã Ninh Hòa",
      DistrictId: "956",
    },
    {
      id: "31855",
      name: "Xã Lộc Ninh",
      DistrictId: "956",
    },
    {
      id: "31858",
      name: "Xã Vĩnh Lộc",
      DistrictId: "956",
    },
    {
      id: "31861",
      name: "Xã Vĩnh Lộc A",
      DistrictId: "956",
    },
    {
      id: "31863",
      name: "Xã Ninh Thạnh Lợi A",
      DistrictId: "956",
    },
    {
      id: "31864",
      name: "Xã Ninh Thạnh Lợi",
      DistrictId: "956",
    },
    {
      id: "31867",
      name: "Thị trấn Phước Long",
      DistrictId: "957",
    },
    {
      id: "31870",
      name: "Xã Vĩnh Phú Đông",
      DistrictId: "957",
    },
    {
      id: "31873",
      name: "Xã Vĩnh Phú Tây",
      DistrictId: "957",
    },
    {
      id: "31876",
      name: "Xã Phước Long",
      DistrictId: "957",
    },
    {
      id: "31879",
      name: "Xã Hưng Phú",
      DistrictId: "957",
    },
    {
      id: "31882",
      name: "Xã Vĩnh Thanh",
      DistrictId: "957",
    },
    {
      id: "31885",
      name: "Xã Phong Thạnh Tây A",
      DistrictId: "957",
    },
    {
      id: "31888",
      name: "Xã Phong Thạnh Tây B",
      DistrictId: "957",
    },
    {
      id: "31891",
      name: "Thị trấn Hòa Bình",
      DistrictId: "961",
    },
    {
      id: "31894",
      name: "Xã Vĩnh Hưng",
      DistrictId: "958",
    },
    {
      id: "31897",
      name: "Xã Vĩnh Hưng A",
      DistrictId: "958",
    },
    {
      id: "31900",
      name: "Thị trấn Châu Hưng",
      DistrictId: "958",
    },
    {
      id: "31903",
      name: "Xã Châu Hưng A",
      DistrictId: "958",
    },
    {
      id: "31906",
      name: "Xã Hưng Thành",
      DistrictId: "958",
    },
    {
      id: "31909",
      name: "Xã Hưng Hội",
      DistrictId: "958",
    },
    {
      id: "31912",
      name: "Xã Châu Thới",
      DistrictId: "958",
    },
    {
      id: "31915",
      name: "Xã Minh Diệu",
      DistrictId: "961",
    },
    {
      id: "31918",
      name: "Xã Vĩnh Bình",
      DistrictId: "961",
    },
    {
      id: "31921",
      name: "Xã Long Thạnh",
      DistrictId: "958",
    },
    {
      id: "31924",
      name: "Xã Vĩnh Mỹ B",
      DistrictId: "961",
    },
    {
      id: "31927",
      name: "Xã Vĩnh Hậu",
      DistrictId: "961",
    },
    {
      id: "31930",
      name: "Xã Vĩnh Hậu A",
      DistrictId: "961",
    },
    {
      id: "31933",
      name: "Xã Vĩnh Mỹ A",
      DistrictId: "961",
    },
    {
      id: "31936",
      name: "Xã Vĩnh Thịnh",
      DistrictId: "961",
    },
    {
      id: "31942",
      name: "Phường 1",
      DistrictId: "959",
    },
    {
      id: "31945",
      name: "Phường Hộ Phòng",
      DistrictId: "959",
    },
    {
      id: "31948",
      name: "Xã Phong Thạnh Đông",
      DistrictId: "959",
    },
    {
      id: "31951",
      name: "Phường Láng Tròn",
      DistrictId: "959",
    },
    {
      id: "31954",
      name: "Xã Phong Tân",
      DistrictId: "959",
    },
    {
      id: "31957",
      name: "Xã Tân Phong",
      DistrictId: "959",
    },
    {
      id: "31960",
      name: "Xã Phong Thạnh",
      DistrictId: "959",
    },
    {
      id: "31963",
      name: "Xã Phong Thạnh A",
      DistrictId: "959",
    },
    {
      id: "31966",
      name: "Xã Phong Thạnh Tây",
      DistrictId: "959",
    },
    {
      id: "31969",
      name: "Xã Tân Thạnh",
      DistrictId: "959",
    },
    {
      id: "31972",
      name: "Thị trấn Gành Hào",
      DistrictId: "960",
    },
    {
      id: "31975",
      name: "Xã Long Điền Đông",
      DistrictId: "960",
    },
    {
      id: "31978",
      name: "Xã Long Điền Đông A",
      DistrictId: "960",
    },
    {
      id: "31981",
      name: "Xã Long Điền",
      DistrictId: "960",
    },
    {
      id: "31984",
      name: "Xã Long Điền Tây",
      DistrictId: "960",
    },
    {
      id: "31985",
      name: "Xã Điền Hải",
      DistrictId: "960",
    },
    {
      id: "31987",
      name: "Xã An Trạch",
      DistrictId: "960",
    },
    {
      id: "31988",
      name: "Xã An Trạch A",
      DistrictId: "960",
    },
    {
      id: "31990",
      name: "Xã An Phúc",
      DistrictId: "960",
    },
    {
      id: "31993",
      name: "Xã Định Thành",
      DistrictId: "960",
    },
    {
      id: "31996",
      name: "Xã Định Thành A",
      DistrictId: "960",
    },
    {
      id: "31999",
      name: "Phường 9",
      DistrictId: "964",
    },
    {
      id: "32002",
      name: "Phường 4",
      DistrictId: "964",
    },
    {
      id: "32005",
      name: "Phường 1",
      DistrictId: "964",
    },
    {
      id: "32008",
      name: "Phường 5",
      DistrictId: "964",
    },
    {
      id: "32011",
      name: "Phường 2",
      DistrictId: "964",
    },
    {
      id: "32014",
      name: "Phường 8",
      DistrictId: "964",
    },
    {
      id: "32017",
      name: "Phường 6",
      DistrictId: "964",
    },
    {
      id: "32020",
      name: "Phường 7",
      DistrictId: "964",
    },
    {
      id: "32022",
      name: "Phường Tân Xuyên",
      DistrictId: "964",
    },
    {
      id: "32023",
      name: "Xã An Xuyên",
      DistrictId: "964",
    },
    {
      id: "32025",
      name: "Phường Tân Thành",
      DistrictId: "964",
    },
    {
      id: "32026",
      name: "Xã Tân Thành",
      DistrictId: "964",
    },
    {
      id: "32029",
      name: "Xã Tắc Vân",
      DistrictId: "964",
    },
    {
      id: "32032",
      name: "Xã Lý Văn Lâm",
      DistrictId: "964",
    },
    {
      id: "32035",
      name: "Xã Định Bình",
      DistrictId: "964",
    },
    {
      id: "32038",
      name: "Xã Hòa Thành",
      DistrictId: "964",
    },
    {
      id: "32041",
      name: "Xã Hòa Tân",
      DistrictId: "964",
    },
    {
      id: "32044",
      name: "Thị trấn U Minh",
      DistrictId: "966",
    },
    {
      id: "32047",
      name: "Xã Khánh Hòa",
      DistrictId: "966",
    },
    {
      id: "32048",
      name: "Xã Khánh Thuận",
      DistrictId: "966",
    },
    {
      id: "32050",
      name: "Xã Khánh Tiến",
      DistrictId: "966",
    },
    {
      id: "32053",
      name: "Xã Nguyễn Phích",
      DistrictId: "966",
    },
    {
      id: "32056",
      name: "Xã Khánh Lâm",
      DistrictId: "966",
    },
    {
      id: "32059",
      name: "Xã Khánh An",
      DistrictId: "966",
    },
    {
      id: "32062",
      name: "Xã Khánh Hội",
      DistrictId: "966",
    },
    {
      id: "32065",
      name: "Thị trấn Thới Bình",
      DistrictId: "967",
    },
    {
      id: "32068",
      name: "Xã Biển Bạch",
      DistrictId: "967",
    },
    {
      id: "32069",
      name: "Xã Tân Bằng",
      DistrictId: "967",
    },
    {
      id: "32071",
      name: "Xã Trí Phải",
      DistrictId: "967",
    },
    {
      id: "32072",
      name: "Xã Trí Lực",
      DistrictId: "967",
    },
    {
      id: "32074",
      name: "Xã Biển Bạch Đông",
      DistrictId: "967",
    },
    {
      id: "32077",
      name: "Xã Thới Bình",
      DistrictId: "967",
    },
    {
      id: "32080",
      name: "Xã Tân Phú",
      DistrictId: "967",
    },
    {
      id: "32083",
      name: "Xã Tân Lộc Bắc",
      DistrictId: "967",
    },
    {
      id: "32086",
      name: "Xã Tân Lộc",
      DistrictId: "967",
    },
    {
      id: "32089",
      name: "Xã Tân Lộc Đông",
      DistrictId: "967",
    },
    {
      id: "32092",
      name: "Xã Hồ Thị Kỷ",
      DistrictId: "967",
    },
    {
      id: "32095",
      name: "Thị trấn Trần Văn Thời",
      DistrictId: "968",
    },
    {
      id: "32098",
      name: "Thị trấn Sông Đốc",
      DistrictId: "968",
    },
    {
      id: "32101",
      name: "Xã Khánh Bình Tây Bắc",
      DistrictId: "968",
    },
    {
      id: "32104",
      name: "Xã Khánh Bình Tây",
      DistrictId: "968",
    },
    {
      id: "32107",
      name: "Xã Trần Hợi",
      DistrictId: "968",
    },
    {
      id: "32108",
      name: "Xã Khánh Lộc",
      DistrictId: "968",
    },
    {
      id: "32110",
      name: "Xã Khánh Bình",
      DistrictId: "968",
    },
    {
      id: "32113",
      name: "Xã Khánh Hưng",
      DistrictId: "968",
    },
    {
      id: "32116",
      name: "Xã Khánh Bình Đông",
      DistrictId: "968",
    },
    {
      id: "32119",
      name: "Xã Khánh Hải",
      DistrictId: "968",
    },
    {
      id: "32122",
      name: "Xã Lợi An",
      DistrictId: "968",
    },
    {
      id: "32124",
      name: "Xã Phong Điền",
      DistrictId: "968",
    },
    {
      id: "32125",
      name: "Xã Phong Lạc",
      DistrictId: "968",
    },
    {
      id: "32128",
      name: "Thị trấn Cái Nước",
      DistrictId: "969",
    },
    {
      id: "32130",
      name: "Xã Thạnh Phú",
      DistrictId: "969",
    },
    {
      id: "32131",
      name: "Xã Lương Thế Trân",
      DistrictId: "969",
    },
    {
      id: "32134",
      name: "Xã Phú Hưng",
      DistrictId: "969",
    },
    {
      id: "32137",
      name: "Xã Tân Hưng",
      DistrictId: "969",
    },
    {
      id: "32140",
      name: "Xã Hưng Mỹ",
      DistrictId: "969",
    },
    {
      id: "32141",
      name: "Xã Hoà Mỹ",
      DistrictId: "969",
    },
    {
      id: "32142",
      name: "Xã Đông Hưng",
      DistrictId: "969",
    },
    {
      id: "32143",
      name: "Xã Đông Thới",
      DistrictId: "969",
    },
    {
      id: "32146",
      name: "Xã Tân Hưng Đông",
      DistrictId: "969",
    },
    {
      id: "32149",
      name: "Xã Trần Thới",
      DistrictId: "969",
    },
    {
      id: "32152",
      name: "Thị trấn Đầm Dơi",
      DistrictId: "970",
    },
    {
      id: "32155",
      name: "Xã Tạ An Khương",
      DistrictId: "970",
    },
    {
      id: "32158",
      name: "Xã Tạ An Khương  Đông",
      DistrictId: "970",
    },
    {
      id: "32161",
      name: "Xã Trần Phán",
      DistrictId: "970",
    },
    {
      id: "32162",
      name: "Xã Tân Trung",
      DistrictId: "970",
    },
    {
      id: "32164",
      name: "Xã Tân Đức",
      DistrictId: "970",
    },
    {
      id: "32167",
      name: "Xã Tân Thuận",
      DistrictId: "970",
    },
    {
      id: "32170",
      name: "Xã Tạ An Khương  Nam",
      DistrictId: "970",
    },
    {
      id: "32173",
      name: "Xã Tân Duyệt",
      DistrictId: "970",
    },
    {
      id: "32174",
      name: "Xã Tân Dân",
      DistrictId: "970",
    },
    {
      id: "32176",
      name: "Xã Tân Tiến",
      DistrictId: "970",
    },
    {
      id: "32179",
      name: "Xã Quách Phẩm Bắc",
      DistrictId: "970",
    },
    {
      id: "32182",
      name: "Xã Quách Phẩm",
      DistrictId: "970",
    },
    {
      id: "32185",
      name: "Xã Thanh Tùng",
      DistrictId: "970",
    },
    {
      id: "32186",
      name: "Xã Ngọc Chánh",
      DistrictId: "970",
    },
    {
      id: "32188",
      name: "Xã Nguyễn Huân",
      DistrictId: "970",
    },
    {
      id: "32191",
      name: "Thị Trấn Năm Căn",
      DistrictId: "971",
    },
    {
      id: "32194",
      name: "Xã Hàm Rồng",
      DistrictId: "971",
    },
    {
      id: "32197",
      name: "Xã Hiệp Tùng",
      DistrictId: "971",
    },
    {
      id: "32200",
      name: "Xã Đất Mới",
      DistrictId: "971",
    },
    {
      id: "32201",
      name: "Xã Lâm Hải",
      DistrictId: "971",
    },
    {
      id: "32203",
      name: "Xã Hàng Vịnh",
      DistrictId: "971",
    },
    {
      id: "32206",
      name: "Xã Tam Giang",
      DistrictId: "971",
    },
    {
      id: "32209",
      name: "Xã Tam Giang Đông",
      DistrictId: "971",
    },
    {
      id: "32212",
      name: "Thị trấn Cái Đôi Vàm",
      DistrictId: "972",
    },
    {
      id: "32214",
      name: "Xã Phú Thuận",
      DistrictId: "972",
    },
    {
      id: "32215",
      name: "Xã Phú Mỹ",
      DistrictId: "972",
    },
    {
      id: "32218",
      name: "Xã Phú Tân",
      DistrictId: "972",
    },
    {
      id: "32221",
      name: "Xã Tân Hải",
      DistrictId: "972",
    },
    {
      id: "32224",
      name: "Xã Việt Thắng",
      DistrictId: "972",
    },
    {
      id: "32227",
      name: "Xã Tân Hưng Tây",
      DistrictId: "972",
    },
    {
      id: "32228",
      name: "Xã Rạch Chèo",
      DistrictId: "972",
    },
    {
      id: "32230",
      name: "Xã Nguyễn Việt Khái",
      DistrictId: "972",
    },
    {
      id: "32233",
      name: "Xã Tam Giang Tây",
      DistrictId: "973",
    },
    {
      id: "32236",
      name: "Xã Tân Ân Tây",
      DistrictId: "973",
    },
    {
      id: "32239",
      name: "Xã Viên An Đông",
      DistrictId: "973",
    },
    {
      id: "32242",
      name: "Xã Viên An",
      DistrictId: "973",
    },
    {
      id: "32244",
      name: "Thị trấn Rạch Gốc",
      DistrictId: "973",
    },
    {
      id: "32245",
      name: "Xã Tân Ân",
      DistrictId: "973",
    },
    {
      id: "32248",
      name: "Xã Đất Mũi",
      DistrictId: "973",
    },
  ],
};
