import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      name: 'Thivpph24307',
      email: 'thivpph24307@fpt.edu.vn',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Cline',
      email: 'client@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: '1',
      name: 'Những Câu Chuyện Truyền Cảm Hứng - I Will Be Better: Nguồn Năng Lượng Tích Cực',
      slug: 'nhung-cau-chuyen-truyen-cam-hung-i-will-be-better-nguon-nang-luong-tich-cuc',
      category: 'Sách thiếu nhi',
      image: 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_244718_1_3598.jpg',
      price: 40600,
      countInStock: 10,
      brand: 'Yunan',
      rating: 0,
      numReviews: 0,
      description: 'Cuốn sách kể những câu chuyện giúp chúng ta hướng thiện Mỗi nhân vật trong cuốn sách này đều kể những câu chuyện rất riêng về quá trình học tập của mình. Trên con đường trưởng thành, nếu biết tự nhận thức bản thân, hiểu rõ mục tiêu phát triển của mình, bồi đắp lòng tự tin, dám đối mặt với thử thách và kiên trì phát huy năng lực bản thân, chúng ta đều có thể thực hiện được ước mơ và trở nên tốt đẹp hơn, thành công hơn.Bộ sách Những câu chuyện truyền cảm hứng được chia thành các chủ đề thiết thực, giúp bạn đọc nhỏ tuổi tìm hiểu và rèn những thói quen, đức tính tốt. Mỗi cuốn gồm nhiều câu chuyện nhỏ, trong đó có cả những hồi ức đáng nhớ của các nhân vật nổi tiếng trên thế giới... Mong rằng bộ sách sẽ trở thành bạn đồng hành tích cực, cùng các em bước vào tương lai rực rỡ.',
    },
    {
      // _id: '2',
      name: '[Sale Black Friday] Vầng Trăng Máu',
      slug: 'sale-black-friday-vang-trang-mau',
      category: 'Văn học',
      image: 'https://cdn0.fahasa.com/media/catalog/product/8/9/8935278602361_1_3.jpg',
      price: 120000,
      countInStock: 5,
      brand: 'David Grann',
      rating: 0,
      numReviews: 0,
      description: 'Vầng Trăng Máu Trong bối cảnh thế giới ngày nay, khi các nguồn nhiên liệu tái tạo được tôn vinh là nguồn nhiên liệu phát triển bền vững, không phát thải và thân thiện với môi trường, dầu mỏ cùng các nhiên liệu hóa thạch khác bị buộc tội là thủ phạm gây ra biến đổi khí hậu cùng hàng loạt các cáo buộc khác về ô nhiễm môi trường. Tiềm ẩn trong giá trị của dầu mỏ là quyền lực, có thể tác động và quyết định cục diện chính trị toàn cầu. Lịch sử thế giới ghi nhận nhiều cuộc chiến tranh đẫm máu quy mô lớn nổ ra đểgiành quyền kiểm soát tài nguyên được ví là “vàng đen” này.',
    },
    {
      // _id: '3',
      name: 'Quán Bar Trong Bụng Cá Voi',
      slug: 'quan-bar-trong-bung-ca-voi',
      category: 'TRUYỆN NGẮN',
      image: 'https://cdn0.fahasa.com/media/catalog/product/8/9/8935235239937.jpg',
      price: 121500,
      countInStock: 15,
      brand: 'Hiền Trang',
      rating: 0,
      numReviews: 0,
      description: 'Sau khi bị nhà xuất bản từ chối bản thảo tiểu thuyết mới nhất, một nhà văn nhận ra rằng, trong thế giới cô đang sống, người ta không được quyền nhắc tới "biển". Cô tìm mọi cách để xuất bản cuốn sách của mình, và rồi hành trình kỳ lạ mở ra, dẫn cô tới một thư viện nơi những hồn ma thủ thư còn sống mãi, một quán bar như lọt thỏm trong chốn phi-thời-gian, một nhà xuất bản hoạt động trong thế giới ngầm, và những nhà văn không ai rõ danh tính.',
    },
    {
      // _id: '4',
      name: 'Thống Khổ Và Phiêu Linh - Ấn Bản Giới Hạn - Bìa Da',
      slug: 'thong-kho-va-phieu-linh-an-ban-gioi-han-bia-da',
      category: 'KINH ĐIỂN',
      image: 'https://cdn0.fahasa.com/media/catalog/product/8/9/8936203363319.jpg',
      price: 1350000,
      countInStock: 5,
      brand: 'Irving Stone',
      rating: 0,
      numReviews: 0,
      description: 'Tác phẩm Thống Khổ Và Phiêu Linh dựng lại cuộc đời và sự nghiệp kì vĩ của bậc thầy Michelangelo. Để viết ra cuốn tiểu thuyết tiểu sử này, Irving Stone đã dành ra bốn năm để nghiên cứu tư liệu, lại cất công sang tận đất Italy để lần theo dấu tích của “người khổng lồ thời Phục hưng”, thậm chí còn học cả cách tạc tượng cẩm thạch. Công phu nghiên cứu và tài năng văn chương của Irving Stone đã giúp tác phẩm nhận được sự tưởng thưởng xứng đáng. Chỉ trong vòng hai năm sau ngày sách ra mắt, Thống khổ và phiêu linh đã phát hành được hàng triệu cuốn, và nhanh chóng được chuyển thể thành phiên bản điện ảnh, khiến cho tác phẩm trở thành tiểu thuyết thành công nhất của Irving Stone. Ngoài việc lột tả sâu sắc những mảng sáng lẫn mảng tối trong cuộc đời nhiều thăng trầm, đầy vinh quang tột bực và cũng không ít bi thương cùng cực của danh họa Michelangelo, tác phẩm đồng thời làm sống dậy những giá trị vượt thời gian của thời đại Phục hưng.',
    },
  ],
};
export default data;
