const https = require("https");
urlStr =
"https://tiki.vn/dien-thoai-vsmart-live-64gb-6gb-hang-chinh-hang-p27927726.html?src=category-page-1789&2hi=0&_lc=Vk4wMzkwMjQwMDg%3D"

str = "Điện thoại Vsmart Live (64GB/6GB) - Hàng"
i = str.indexOf(" -");
str = str.substring(1, i);
console.log(str);

https
  .get(urlStr, res => {
    let data = "";
    ogtitle = '<meta property="og:title" content="';
    ogdes = '<meta property="og:description" content="';
    ogurl = '<meta property="og:image" content="';
    ogend = '" />';
    costs = '<span id="span-price">';
    coste = "</span>";

    const result = { name: "", des: "", price: "" };
    //   A chunk of data has been recieved.
    res.on("data", chunk => {
      data += chunk;
      if (data.indexOf(ogtitle) != -1) {
        name = parseString(data, ogtitle, ogend);
        console.log('{"name": "' + name + '",');
        result.name = name;
      }
      if (data.indexOf(ogdes) != -1) {
        des = parseString(data, ogdes, ogend);
        console.log('"description": "' + des + '",');
        result.des = des;
      }
      if (data.indexOf(ogurl, ogend) != -1) {
        image = parseString(data, ogurl, ogend);
        console.log('"image": "' + image + '",');
      }
      if (data.indexOf(costs) != -1) {
        price = parseString(data, costs, coste);
        console.log('"price": "' + price + '", "brand": ""}');
        result.price = price;
      }
      data = "";
    });

    // The whole response has been received. Print out the result.
    //   res.on("end", () => {
    //     console.log(JSON.parse(data).explanation);
    //   });
  })
  .on("error", err => {
    console.log("Error: " + err.message);
  });

function parseString(data, startStr, endStr) {
  startIndex = data.indexOf(startStr);
  data = data.substring(startIndex);
  endIndex = data.indexOf(endStr);
  str = data.substring(startStr.length, endIndex);
  return str;
}

// if (data.indexOf(ogdes) != -1){
//     des = parseString(data, ogdes, ogend);
// }
// if (data.indexOf(costs) != -1){
//     cost = parseString(data, costs, coste);
// }

v = {
  "name": "Điện Thoại iPhone 7 Plus 128GB - Hàng Nhập Khẩu Chính Hãng",
  description:
    "Thiết kế siêu mỏng iPhone 7 Plus 128GB với kích thước  158.2 x 77.9 x 7.3 mm mỏng nhẹ và thiết kế tương tự như bộ đôi...",
  image:
    "https://salt.tikicdn.com/cache/200x200/ts/product/b8/07/c0/844fa4273cec4570f9128474c69066f7.jpg",
  price: "11.490.000đ",
  brand: ""
};
